import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  NIGERIAN_STATES,
  COMMODITIES,
  INTERESTS,
  CATEGORY_LABEL,
} from "@/lib/loamy-constants";
import {
  Award, Copy, LogOut, Loader2, Check, Share2,
  MapPin, TrendingUp, Users, Sparkles, Calendar,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/businesses/techworks/loamy/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Loamy Dashboard — Founding Member" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

type Profile = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  category: string;
  state: string | null;
  lga: string | null;
  address: string | null;
  business_name: string | null;
  referral_code: string;
  founding_member: boolean;
  founding_member_number: number;
  profile_completion: number;
  created_at: string;
};

type LaunchProgress = { id: string; module_name: string; status: string; sort_order: number };
type Stats = {
  total_members: number;
  today_growth: number;
  week_growth: number;
  states_represented: number;
  total_referrals: number;
  by_category: Record<string, number>;
  by_state: Record<string, number>;
};

function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<LaunchProgress[]>([]);
  const [launchDate, setLaunchDate] = useState<Date | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [commodities, setCommodities] = useState<string[]>([]);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate({ to: "/businesses/techworks/loamy/auth", search: { mode: "login" } });
        return;
      }
      const uid = session.session.user.id;
      const [p, lp, lc, st, ui, uc, ref] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
        supabase.from("launch_progress").select("*").order("sort_order"),
        supabase.from("launch_config").select("*").eq("id", 1).maybeSingle(),
        supabase.rpc("community_stats"),
        supabase.from("user_interests").select("interest").eq("user_id", uid),
        supabase.from("user_commodities").select("commodity").eq("user_id", uid),
        supabase.from("referrals").select("id", { count: "exact", head: true }).eq("referrer_id", uid),
      ]);
      if (!mounted) return;
      if (p.data) setProfile(p.data as Profile);
      if (lp.data) setProgress(lp.data as LaunchProgress[]);
      if (lc.data) setLaunchDate(new Date(lc.data.launch_date));
      if (st.data) setStats(st.data as Stats);
      setInterests((ui.data ?? []).map((r: { interest: string }) => r.interest));
      setCommodities((uc.data ?? []).map((r: { commodity: string }) => r.commodity));
      setReferralCount(ref.count ?? 0);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/businesses/techworks/loamy" });
  }

  if (loading || !profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const firstName = profile.full_name.split(" ")[0] || "Founder";
  const registrationId = `LMY-${String(profile.founding_member_number).padStart(5, "0")}`;
  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/businesses/techworks/loamy/auth?mode=signup&ref=${profile.referral_code}`
    : "";

  return (
    <div className="min-h-screen bg-bone">
      <div className="container-x py-10 md:py-16 space-y-8">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow"><span className="gold-rule" />Loamy Founding Member Portal</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-display">Welcome back, {firstName}</h1>
          </div>
          <button onClick={handleSignOut} className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-4 py-2 text-sm hover:border-primary/40">
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {/* WELCOME CARD */}
        <div className="rounded-sm border border-border bg-white overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="p-8 md:p-10 md:col-span-2 bg-gradient-to-br from-emerald-deep to-primary text-white">
              <div className="inline-flex items-center gap-2 rounded-sm bg-gold/20 border border-gold/40 px-3 py-1.5 text-xs uppercase tracking-widest text-gold">
                <Award size={12} /> Founding Member
              </div>
              <h2 className="mt-6 text-2xl md:text-3xl font-display">{profile.full_name}</h2>
              <p className="mt-1 text-white/70">{CATEGORY_LABEL[profile.category] ?? profile.category}</p>
              <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest">Registration ID</p>
                  <p className="mt-1 font-mono">{registrationId}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest">Joined</p>
                  <p className="mt-1">{new Date(profile.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Profile Completion</p>
              <p className="mt-3 text-4xl font-display text-primary">{profile.profile_completion}%</p>
              <div className="mt-3 h-2 w-full bg-muted rounded-sm overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${profile.profile_completion}%` }} />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Complete your profile to unlock more.</p>
            </div>
          </div>
        </div>

        {/* COUNTDOWN + PROGRESS */}
        <div className="grid gap-6 lg:grid-cols-3">
          <CountdownCard launchDate={launchDate} />
          <LaunchProgressCard progress={progress} />
        </div>

        {/* COMMUNITY STATS */}
        {stats && <CommunityCard stats={stats} referralCount={referralCount} />}

        {/* PROFILE FORM */}
        <ProfileCard profile={profile} onUpdate={setProfile} />

        {/* INTERESTS & COMMODITIES */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TagPickerCard
            title="Interest Centre"
            description="What Loamy features matter most to you?"
            available={INTERESTS}
            selected={interests}
            onChange={setInterests}
            table="user_interests"
            column="interest"
            userId={profile.id}
          />
          <TagPickerCard
            title="Commodities"
            description="Select the commodities you work with."
            available={COMMODITIES}
            selected={commodities}
            onChange={setCommodities}
            table="user_commodities"
            column="commodity"
            userId={profile.id}
            allowCustom
          />
        </div>

        {/* REFERRALS */}
        <ReferralCard code={profile.referral_code} link={referralLink} count={referralCount} name={profile.full_name} />
      </div>
    </div>
  );
}

function CountdownCard({ launchDate }: { launchDate: Date | null }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = launchDate ? Math.max(0, launchDate.getTime() - now) : 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return (
    <div className="rounded-sm border border-border bg-white p-8">
      <p className="eyebrow"><span className="gold-rule" />Public Launch</p>
      <h3 className="mt-3 text-xl font-display flex items-center gap-2"><Calendar size={16} /> Countdown</h3>
      <div className="mt-6 grid grid-cols-4 gap-3 text-center">
        {[{ v: days, l: "Days" }, { v: hours, l: "Hours" }, { v: mins, l: "Mins" }, { v: secs, l: "Secs" }].map((b) => (
          <div key={b.l} className="rounded-sm bg-bone p-3">
            <div className="text-2xl md:text-3xl font-display text-primary">{String(b.v).padStart(2, "0")}</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{b.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaunchProgressCard({ progress }: { progress: LaunchProgress[] }) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 lg:col-span-2">
      <p className="eyebrow"><span className="gold-rule" />Build Progress</p>
      <h3 className="mt-3 text-xl font-display">The Loamy Roadmap</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {progress.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-sm bg-bone px-4 py-3">
            <span className="text-sm">{m.module_name}</span>
            <StatusBadge status={m.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    done: { label: "✓ Done", cls: "bg-primary/10 text-primary" },
    in_progress: { label: "In progress", cls: "bg-gold/20 text-charcoal" },
    planned: { label: "Planned", cls: "bg-muted text-muted-foreground" },
  };
  const s = map[status] ?? map.planned;
  return <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm ${s.cls}`}>{s.label}</span>;
}

function CommunityCard({ stats, referralCount }: { stats: Stats; referralCount: number }) {
  const tiles = [
    { icon: Users, label: "Total Members", value: stats.total_members },
    { icon: TrendingUp, label: "Joined today", value: stats.today_growth },
    { icon: Sparkles, label: "This week", value: stats.week_growth },
    { icon: MapPin, label: "States represented", value: stats.states_represented },
    { icon: Share2, label: "Total referrals", value: stats.total_referrals },
    { icon: Award, label: "Your referrals", value: referralCount },
  ];
  return (
    <div className="rounded-sm border border-border bg-white p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow"><span className="gold-rule" />The Loamy Network</p>
          <h3 className="mt-3 text-xl font-display">Community Growth</h3>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-sm bg-bone p-4">
            <t.icon size={16} className="text-primary" />
            <div className="mt-3 text-2xl font-display text-charcoal">{t.value}</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{t.label}</div>
          </div>
        ))}
      </div>

      {Object.keys(stats.by_category).length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">By Category</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(stats.by_category).map(([k, v]) => (
              <span key={k} className="text-xs rounded-sm bg-primary/5 text-primary px-3 py-1.5">
                {CATEGORY_LABEL[k] ?? k}: <b>{v}</b>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileCard({ profile, onUpdate }: { profile: Profile; onUpdate: (p: Profile) => void }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: profile.full_name,
    phone: profile.phone,
    state: profile.state ?? "",
    lga: profile.lga ?? "",
    address: profile.address ?? "",
    business_name: profile.business_name ?? "",
  });
  async function save() {
    setSaving(true);
    const { data, error } = await supabase
      .from("profiles")
      .update(form)
      .eq("id", profile.id)
      .select()
      .maybeSingle();
    setSaving(false);
    if (error) return toast.error(error.message);
    if (data) {
      onUpdate(data as Profile);
      toast.success("Profile updated");
    }
  }
  const F = (k: keyof typeof form, label: string, type = "text") => (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={form[k]}
        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
        className="mt-2 w-full rounded-sm border border-input bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
  return (
    <div className="rounded-sm border border-border bg-white p-8">
      <p className="eyebrow"><span className="gold-rule" />Your Profile</p>
      <h3 className="mt-3 text-xl font-display">Complete your information</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {F("full_name", "Full Name")}
        {F("phone", "Phone")}
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">State</span>
          <select
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="mt-2 w-full rounded-sm border border-input bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
          >
            <option value="">Select a state</option>
            {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        {F("lga", "LGA")}
        {F("business_name", "Business Name")}
        {F("address", "Address")}
      </div>
      <button
        onClick={save}
        disabled={saving}
        className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-emerald-deep disabled:opacity-60"
      >
        {saving && <Loader2 size={14} className="animate-spin" />} Save profile
      </button>
    </div>
  );
}

function TagPickerCard({
  title, description, available, selected, onChange, table, column, userId, allowCustom,
}: {
  title: string; description: string; available: string[]; selected: string[];
  onChange: (s: string[]) => void; table: "user_interests" | "user_commodities";
  column: "interest" | "commodity"; userId: string; allowCustom?: boolean;
}) {
  const [custom, setCustom] = useState("");
  const all = useMemo(() => Array.from(new Set([...available, ...selected])), [available, selected]);

  async function toggle(tag: string) {
    if (selected.includes(tag)) {
      const { error } = await supabase.from(table).delete().eq("user_id", userId).eq(column as never, tag);
      if (error) return toast.error(error.message);
      onChange(selected.filter((t) => t !== tag));
    } else {
      const { error } = await supabase.from(table).insert({ user_id: userId, [column]: tag } as never);
      if (error) return toast.error(error.message);
      onChange([...selected, tag]);
    }
  }
  async function addCustom() {
    const v = custom.trim();
    if (!v) return;
    setCustom("");
    if (selected.includes(v)) return;
    await toggle(v);
  }
  return (
    <div className="rounded-sm border border-border bg-white p-8">
      <p className="eyebrow"><span className="gold-rule" />{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {all.map((tag) => {
          const on = selected.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`text-xs rounded-sm px-3 py-1.5 transition ${
                on ? "bg-primary text-primary-foreground" : "bg-bone text-charcoal hover:bg-muted"
              }`}
            >
              {on && <Check size={12} className="inline mr-1" />}{tag}
            </button>
          );
        })}
      </div>
      {allowCustom && (
        <div className="mt-4 flex gap-2">
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Add another..."
            className="flex-1 rounded-sm border border-input bg-white px-3 py-2 text-sm"
          />
          <button onClick={addCustom} className="rounded-sm border border-primary text-primary px-4 text-xs uppercase tracking-widest">Add</button>
        </div>
      )}
    </div>
  );
}

function ReferralCard({ code, link, count, name }: { code: string; link: string; count: number; name: string }) {
  const shareText = encodeURIComponent(`${name} invited you to join Loamy — Nigeria's agricultural operating system as a Founding Member. ${link}`);
  const shares = [
    { label: "WhatsApp", url: `https://wa.me/?text=${shareText}` },
    { label: "X", url: `https://twitter.com/intent/tweet?text=${shareText}` },
    { label: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}` },
    { label: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}` },
  ];
  return (
    <div className="rounded-sm border border-border bg-white p-8">
      <p className="eyebrow"><span className="gold-rule" />Referral Centre</p>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-xl font-display">Invite others to Loamy</h3>
        <span className="text-sm text-muted-foreground"><b className="text-primary">{count}</b> successful referrals</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Your Code</p>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 rounded-sm border border-input bg-bone px-4 py-3 text-sm font-mono">{code}</div>
            <CopyBtn value={code} />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Your Link</p>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 rounded-sm border border-input bg-bone px-4 py-3 text-xs truncate">{link}</div>
            <CopyBtn value={link} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {shares.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-bone hover:bg-muted text-xs uppercase tracking-widest px-4 py-2"
          >
            Share on {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        toast.success("Copied");
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-sm border border-primary bg-primary/5 text-primary px-3 text-xs uppercase tracking-widest"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
    </button>
  );
}
