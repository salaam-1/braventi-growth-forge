import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { USER_CATEGORIES } from "@/lib/loamy-constants";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const searchSchema = z.object({
  mode: z.enum(["signup", "login", "reset"]).catch("signup"),
  ref: z.string().optional(),
});

export const Route = createFileRoute("/businesses/techworks/loamy/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Loamy — Founding Member Access" },
      { name: "description", content: "Sign in or register as a Loamy Founding Member." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode, ref } = Route.useSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // If already logged in, go to dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/businesses/techworks/loamy/dashboard" });
    });
  }, [navigate]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    category: "farmer" as (typeof USER_CATEGORIES)[number]["value"],
  });

  const setField = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/businesses/techworks/loamy/dashboard`,
          data: {
            full_name: form.fullName.trim(),
            phone: form.phone.trim(),
            category: form.category,
            referred_by_code: ref ?? "",
          },
        },
      });
      if (error) throw error;
      toast.success("Welcome — you're a Founding Member.");
      navigate({ to: "/businesses/techworks/loamy/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      if (error) throw error;
      navigate({ to: "/businesses/techworks/loamy/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        form.email.trim().toLowerCase(),
        { redirectTo: `${window.location.origin}/businesses/techworks/loamy/auth?mode=login` },
      );
      if (error) throw error;
      toast.success("Password reset link sent — check your email.");
      navigate({ to: "/businesses/techworks/loamy/auth", search: { mode: "login" } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-8rem)] bg-bone py-16 md:py-24">
      <div className="container-x max-w-md">
        <Link
          to="/businesses/techworks/loamy"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={14} /> Back to Loamy
        </Link>

        <div className="mt-8 rounded-sm border border-border bg-white p-8 md:p-10">
          <p className="eyebrow"><span className="gold-rule" />
            {mode === "signup" ? "Founding Member" : mode === "reset" ? "Reset Password" : "Sign In"}
          </p>
          <h1 className="mt-3 text-3xl font-display leading-tight">
            {mode === "signup"
              ? "Become a Founding Member"
              : mode === "reset"
                ? "Reset your password"
                : "Welcome back"}
          </h1>

          {mode === "signup" && (
            <form onSubmit={handleSignup} className="mt-8 space-y-4">
              <Field label="Full Name" required>
                <input required value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Email" required>
                <input type="email" required value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Phone Number" required>
                <input type="tel" required value={form.phone} onChange={(e) => setField("phone", e.target.value)} className={inputCls} placeholder="+234..." />
              </Field>
              <Field label="I am a" required>
                <select value={form.category} onChange={(e) => setField("category", e.target.value as typeof form.category)} className={inputCls}>
                  {USER_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="Password" required>
                <input type="password" required minLength={8} value={form.password} onChange={(e) => setField("password", e.target.value)} className={inputCls} placeholder="Minimum 8 characters" />
              </Field>
              <SubmitButton loading={loading} label="Create Account" />
              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link to="/businesses/techworks/loamy/auth" search={{ mode: "login" }} className="text-primary hover:underline">Sign in</Link>
              </p>
            </form>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <Field label="Email" required>
                <input type="email" required value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Password" required>
                <input type="password" required value={form.password} onChange={(e) => setField("password", e.target.value)} className={inputCls} />
              </Field>
              <SubmitButton loading={loading} label="Sign In" />
              <div className="flex items-center justify-between text-xs">
                <Link to="/businesses/techworks/loamy/auth" search={{ mode: "reset" }} className="text-muted-foreground hover:text-primary">Forgot password?</Link>
                <Link to="/businesses/techworks/loamy/auth" search={{ mode: "signup" }} className="text-primary hover:underline">Become a Founding Member</Link>
              </div>
            </form>
          )}

          {mode === "reset" && (
            <form onSubmit={handleReset} className="mt-8 space-y-4">
              <Field label="Email" required>
                <input type="email" required value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputCls} />
              </Field>
              <SubmitButton loading={loading} label="Send reset link" />
              <p className="text-center text-xs">
                <Link to="/businesses/techworks/loamy/auth" search={{ mode: "login" }} className="text-muted-foreground hover:text-primary">Back to sign in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-sm border border-input bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}{required && <span className="text-destructive"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-emerald-deep disabled:opacity-60 transition"
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {label}
    </button>
  );
}
