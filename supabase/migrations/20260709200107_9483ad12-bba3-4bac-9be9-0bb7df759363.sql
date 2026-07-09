
-- ==========================================
-- ENUMS
-- ==========================================
CREATE TYPE public.app_role AS ENUM (
  'super_admin', 'admin', 'support',
  'farmer', 'trader', 'exporter', 'warehouse_owner',
  'logistics_provider', 'buyer', 'input_supplier', 'growth_partner'
);

CREATE TYPE public.user_category AS ENUM (
  'farmer', 'trader', 'exporter', 'warehouse_owner',
  'logistics_provider', 'growth_partner', 'input_supplier', 'buyer'
);

CREATE TYPE public.module_status AS ENUM ('done', 'in_progress', 'planned');

-- ==========================================
-- PROFILES
-- ==========================================
CREATE SEQUENCE public.founding_member_seq START 1;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  phone TEXT NOT NULL DEFAULT '',
  category public.user_category NOT NULL,
  state TEXT,
  lga TEXT,
  address TEXT,
  business_name TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by_code TEXT,
  founding_member BOOLEAN NOT NULL DEFAULT true,
  founding_member_number INTEGER NOT NULL DEFAULT nextval('public.founding_member_seq'),
  profile_completion INTEGER NOT NULL DEFAULT 20,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT USAGE ON SEQUENCE public.founding_member_seq TO authenticated, service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- ==========================================
-- USER ROLES
-- ==========================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('super_admin','admin')
  );
$$;

CREATE POLICY "Admins read all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

-- ==========================================
-- INTERESTS & COMMODITIES
-- ==========================================
CREATE TABLE public.user_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  interest TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, interest)
);
GRANT SELECT, INSERT, DELETE ON public.user_interests TO authenticated;
GRANT ALL ON public.user_interests TO service_role;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own interests" ON public.user_interests
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.user_commodities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  commodity TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, commodity)
);
GRANT SELECT, INSERT, DELETE ON public.user_commodities TO authenticated;
GRANT ALL ON public.user_commodities TO service_role;
ALTER TABLE public.user_commodities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own commodities" ON public.user_commodities
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- LAUNCH CONFIG & PROGRESS
-- ==========================================
CREATE TABLE public.launch_config (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  launch_date TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.launch_config TO authenticated;
GRANT ALL ON public.launch_config TO service_role;
ALTER TABLE public.launch_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone signed in reads launch config" ON public.launch_config
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins update launch config" ON public.launch_config
  FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

INSERT INTO public.launch_config (id, launch_date)
VALUES (1, now() + INTERVAL '90 days');

CREATE TABLE public.launch_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_name TEXT NOT NULL,
  status public.module_status NOT NULL DEFAULT 'planned',
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.launch_progress TO authenticated;
GRANT ALL ON public.launch_progress TO service_role;
ALTER TABLE public.launch_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone signed in reads launch progress" ON public.launch_progress
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins write launch progress" ON public.launch_progress
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

INSERT INTO public.launch_progress (module_name, status, sort_order) VALUES
  ('Authentication', 'done', 1),
  ('User Profiles', 'done', 2),
  ('Marketplace', 'in_progress', 3),
  ('Financing', 'in_progress', 4),
  ('AI Market Intelligence', 'in_progress', 5),
  ('Logistics', 'planned', 6),
  ('Warehousing', 'planned', 7),
  ('Public Launch', 'planned', 8);

-- ==========================================
-- REFERRALS
-- ==========================================
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.referrals TO authenticated;
GRANT ALL ON public.referrals TO service_role;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own referrals" ON public.referrals
  FOR SELECT TO authenticated USING (auth.uid() = referrer_id);
CREATE POLICY "Admins read all referrals" ON public.referrals
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

-- ==========================================
-- COMMUNITY STATS (aggregate, no PII)
-- ==========================================
CREATE OR REPLACE FUNCTION public.community_stats()
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

GRANT EXECUTE ON FUNCTION public.community_stats() TO authenticated, anon;

-- ==========================================
-- SIGNUP TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  code TEXT;
  attempt INT := 0;
BEGIN
  LOOP
    code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE referral_code = code) OR attempt > 5;
    attempt := attempt + 1;
  END LOOP;
  RETURN code;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _category public.user_category;
  _full_name TEXT;
  _phone TEXT;
  _ref_code TEXT;
  _referred_by TEXT;
BEGIN
  _full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
  _phone := COALESCE(NEW.raw_user_meta_data->>'phone', '');
  _referred_by := NULLIF(NEW.raw_user_meta_data->>'referred_by_code', '');

  BEGIN
    _category := (COALESCE(NEW.raw_user_meta_data->>'category', 'farmer'))::public.user_category;
  EXCEPTION WHEN OTHERS THEN
    _category := 'farmer';
  END;

  _ref_code := public.generate_referral_code();

  INSERT INTO public.profiles (id, full_name, email, phone, category, referral_code, referred_by_code)
  VALUES (NEW.id, _full_name, NEW.email, _phone, _category, _ref_code, _referred_by);

  -- Assign role matching category
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, _category::text::public.app_role)
  ON CONFLICT DO NOTHING;

  -- Auto super admin for known email
  IF lower(NEW.email) = 'braventitechnologies@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'super_admin') ON CONFLICT DO NOTHING;
  END IF;

  -- Record referral link
  IF _referred_by IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_user_id, referral_code)
    SELECT p.id, NEW.id, _referred_by FROM public.profiles p WHERE p.referral_code = _referred_by;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- PROFILE COMPLETION AUTO-UPDATE
-- ==========================================
CREATE OR REPLACE FUNCTION public.compute_profile_completion(p public.profiles)
RETURNS INTEGER LANGUAGE sql IMMUTABLE AS $$
  SELECT LEAST(100, (
    (CASE WHEN p.full_name <> '' THEN 15 ELSE 0 END) +
    (CASE WHEN p.phone <> '' THEN 15 ELSE 0 END) +
    (CASE WHEN p.category IS NOT NULL THEN 15 ELSE 0 END) +
    (CASE WHEN p.state IS NOT NULL AND p.state <> '' THEN 15 ELSE 0 END) +
    (CASE WHEN p.lga IS NOT NULL AND p.lga <> '' THEN 10 ELSE 0 END) +
    (CASE WHEN p.address IS NOT NULL AND p.address <> '' THEN 10 ELSE 0 END) +
    (CASE WHEN p.business_name IS NOT NULL AND p.business_name <> '' THEN 20 ELSE 0 END)
  ));
$$;

CREATE OR REPLACE FUNCTION public.profiles_before_upsert()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.profile_completion := public.compute_profile_completion(NEW);
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_completion
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.profiles_before_upsert();
