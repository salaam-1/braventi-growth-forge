import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sprout, TrendingUp, Users, Zap, ShieldCheck, Globe2 } from "lucide-react";
import loamyDashboard from "@/assets/loamy-dashboard.jpg";

export const Route = createFileRoute("/businesses/techworks/loamy")({
  head: () => ({
    meta: [
      { title: "Loamy — Nigeria's Agricultural Operating System" },
      {
        name: "description",
        content:
          "Become a Founding Member of Loamy — the intelligent platform connecting Nigeria's entire agricultural value chain through financing, marketplace and market intelligence.",
      },
      { property: "og:title", content: "Loamy — Founding Members" },
      {
        property: "og:description",
        content:
          "Join Loamy as a Founding Member. One account today becomes your key to the full platform at launch — no re-registration required.",
      },
    ],
  }),
  component: LoamyLanding,
});

const pillars = [
  { icon: Sprout, title: "Marketplace", desc: "A digital marketplace linking farmers, traders, exporters and buyers." },
  { icon: TrendingUp, title: "Financing", desc: "Input and commodity financing built for the realities of Nigerian agriculture." },
  { icon: Zap, title: "AI Market Intelligence", desc: "Live insight into pricing, demand and movement across the value chain." },
  { icon: Globe2, title: "Logistics & Export", desc: "Movement, warehousing and export orchestration in one operating layer." },
];

const benefits = [
  { title: "Permanent Founding Member badge", desc: "Members who join before launch keep their status forever." },
  { title: "Priority beta access", desc: "First to use marketplace, financing and AI intelligence modules." },
  { title: "One account, one platform", desc: "Your Founding Member account becomes your Loamy account at launch — no migration." },
  { title: "Early influence", desc: "Suggest features and shape the product before the public sees it." },
];

function LoamyLanding() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-emerald-deep text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,160,69,0.15),transparent_50%)]" />
        <div className="container-x relative py-24 md:py-36">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-gold"><span className="gold-rule" />A Braventi Techworks Product</p>
              <h1 className="mt-6 text-5xl md:text-6xl font-display leading-[1.05]">
                Nigeria's Agricultural Operating System.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
                Loamy unifies agricultural financing, market intelligence and a digital marketplace
                into one intelligent platform — connecting the entire value chain.
              </p>
              <p className="mt-6 max-w-xl text-base text-gold/90">
                Register once as a Founding Member. Your account will carry through to the full public launch.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/businesses/techworks/loamy/auth"
                  search={{ mode: "signup" }}
                  className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-emerald-deep hover:bg-gold-soft transition"
                >
                  Become a Founding Member <ArrowRight size={16} />
                </Link>
                <Link
                  to="/businesses/techworks/loamy/auth"
                  search={{ mode: "login" }}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-8 py-4 text-sm font-medium text-white hover:bg-white/5 transition"
                >
                  Sign in
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-widest text-white/60">
                <div className="flex items-center gap-2"><ShieldCheck size={14} /> Secure by design</div>
                <div className="flex items-center gap-2"><Users size={14} /> Pre-launch access</div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-sm bg-gold/10 blur-2xl" />
              <img
                src={loamyDashboard}
                alt="Loamy dashboard preview"
                className="relative w-full rounded-sm shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow"><span className="gold-rule" />What Loamy will do</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
              Four pillars. One operating layer for Nigerian agriculture.
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-sm border border-border bg-white p-8 hover:border-primary/40 transition">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  <p.icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDING MEMBER */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow"><span className="gold-rule" />Founding Members</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
                Join before launch. Stay for the platform.
              </h2>
              <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                Founding Members receive a permanent status on the Loamy platform.
                The account you create today becomes your account on launch day —
                no re-registration, no migration.
              </p>
              <div className="mt-10">
                <Link
                  to="/businesses/techworks/loamy/auth"
                  search={{ mode: "signup" }}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-emerald-deep transition"
                >
                  Register in under 2 minutes <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-sm border border-border bg-white p-6">
                  <h3 className="text-base font-medium">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
