
-- 1. Create private schema for internal helpers
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- 2. has_role & is_admin -> private
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION private.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('super_admin','admin')
  );
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_admin(uuid) TO authenticated, service_role;

-- 3. Drop dependent policies, drop old public helpers, recreate policies against private
DROP POLICY IF EXISTS "Admins update launch config" ON public.launch_config;
DROP POLICY IF EXISTS "Admins write launch progress" ON public.launch_progress;
DROP POLICY IF EXISTS "Admins read all referrals" ON public.referrals;
DROP POLICY IF EXISTS "Admins read all roles" ON public.user_roles;

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP FUNCTION IF EXISTS public.is_admin(uuid);

CREATE POLICY "Admins update launch config" ON public.launch_config
  FOR UPDATE TO authenticated
  USING (private.is_admin(auth.uid()))
  WITH CHECK (private.is_admin(auth.uid()));

CREATE POLICY "Admins write launch progress" ON public.launch_progress
  FOR ALL TO authenticated
  USING (private.is_admin(auth.uid()))
  WITH CHECK (private.is_admin(auth.uid()));

CREATE POLICY "Admins read all referrals" ON public.referrals
  FOR SELECT TO authenticated
  USING (private.is_admin(auth.uid()));

CREATE POLICY "Admins read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (private.is_admin(auth.uid()));

-- 4. community_stats -> private definer, public invoker wrapper
DROP FUNCTION IF EXISTS public.community_stats();

CREATE OR REPLACE FUNCTION private.community_stats()
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_members', (SELECT count(*) FROM public.profiles),
    'today_growth', (SELECT count(*) FROM public.profiles WHERE created_at >= current_date),
    'week_growth', (SELECT count(*) FROM public.profiles WHERE created_at >= current_date - INTERVAL '7 days'),
    'states_represented', (SELECT count(DISTINCT state) FROM public.profiles WHERE state IS NOT NULL AND state <> ''),
    'total_referrals', (SELECT count(*) FROM public.referrals WHERE referred_user_id IS NOT NULL),
    'by_category', (
      SELECT COALESCE(jsonb_object_agg(category, cnt), '{}'::jsonb)
      FROM (SELECT category::text, count(*) AS cnt FROM public.profiles GROUP BY category) c
    ),
    'by_state', (
      SELECT COALESCE(jsonb_object_agg(state, cnt), '{}'::jsonb)
      FROM (
        SELECT state, count(*) AS cnt
        FROM public.profiles
        WHERE state IS NOT NULL AND state <> ''
        GROUP BY state
      ) s
    )
  ) INTO result;
  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION private.community_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.community_stats() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.community_stats()
RETURNS jsonb
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public, private
AS $$
  SELECT private.community_stats();
$$;

REVOKE ALL ON FUNCTION public.community_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.community_stats() TO authenticated;

-- 5. handle_new_user: keep in public (auth.users trigger already wired), but restrict EXECUTE.
--    Trigger fires under supabase_auth_admin, which retains privileges.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;

-- 6. Explicit search_path on remaining non-definer helpers
ALTER FUNCTION public.generate_referral_code() SET search_path = public;
ALTER FUNCTION public.compute_profile_completion(public.profiles) SET search_path = public;
ALTER FUNCTION public.profiles_before_upsert() SET search_path = public;
