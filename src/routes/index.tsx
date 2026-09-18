import { createFileRoute, Link } from "@tanstack/react-router";
import heroPort from "@/assets/hero-port.jpg";
import logoMark from "@/assets/brave_logo_cropped.png";
import businessExim from "@/assets/business-exim.jpg";
import businessTech from "@/assets/business-tech.jpg";
import businessStructures from "@/assets/business-structures.jpg";
import businessEnergy from "@/assets/business-energy.jpg";
import businessMinerals from "@/assets/business-minerals.jpg";
import leaderAbduljaleel from "@/assets/leader-abduljaleel.jpg";
import leaderUsmanYakubu from "@/assets/leader-usman-yakubu.jpg";
import leaderFahad from "@/assets/leader-fahad.jpg";
import leaderUsmanMusa from "@/assets/leader-usman-musa.jpg";
import leaderSelimat from "@/assets/leader-selimat.jpg";
import {
  ArrowUpRight,
  Ship,
  Cpu,
  Building2,
  Sun,
  Mountain,
  Shield,
  Sparkles,
  Award,
  Leaf,
  Users,
  Linkedin,
  Twitter,
  Quote,
} from "lucide-react";
import { SectionHeader } from "@/components/site/PageHero";
import { CountUp, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Braventi Holdings — Building Businesses That Matter" },
      {
        name: "description",
        content:
          "The official corporate site of Braventi Holdings — a diversified investment and operating company across trade, technology, infrastructure and sustainable industries.",
      },
      { property: "og:title", content: "Braventi Holdings" },
      {
        property: "og:description",
        content:
          "Building enduring businesses across trade, technology, infrastructure and sustainable industries.",
      },
    ],
  }),
  component: Home,
});

const values = [
  { icon: Shield, title: "Integrity", desc: "We hold ourselves to the highest standards of honesty and accountability." },
  { icon: Sparkles, title: "Innovation", desc: "We build forward — pursuing ideas that create meaningful, lasting impact." },
  { icon: Award, title: "Excellence", desc: "We pursue mastery in every discipline and every business we operate." },
  { icon: Leaf, title: "Stewardship", desc: "We invest for the long-term, protecting value for the next generation." },
  { icon: Users, title: "Collaboration", desc: "We build with partners, teams and communities who share our ambition." },
];

const businesses = [
  {
    slug: "/businesses/exim",
    tag: "Trade & Commodities",
    name: "Braventi EXIM",
    img: businessExim,
    icon: Ship,
    desc: "International trade, export development and commodity sourcing connecting African producers with global markets.",
  },
  {
    slug: "/businesses/techworks",
    tag: "Technology",
    name: "Braventi Techworks",
    img: businessTech,
    icon: Cpu,
    desc: "Digital solutions across software engineering, artificial intelligence and enterprise technology.",
  },
  {
    slug: "/businesses/structures",
    tag: "Real Estate & Infrastructure",
    name: "Braventi Structures",
    img: businessStructures,
    icon: Building2,
    desc: "Responsible real estate development, property solutions and infrastructure projects designed to last.",
  },
  {
    slug: "/businesses/energies",
    tag: "Renewable Energy",
    name: "Braventi Energies",
    img: businessEnergy,
    icon: Sun,
    desc: "Sustainable energy solutions for cleaner communities and long-term energy resilience.",
    upcoming: true,
  },
];

const heroStats = [
  { value: 5, label: "Subsidiaries in the group" },
  { value: 4, label: "Operating today" },
  { value: 1, label: "Unified company" },
];

const sectors = [
  "Trade & Export",
  "Technology",
  "Real Estate",
  "Renewable Energy",
  "Minerals",
];

type Leader = {
  name: string;
  role: string;
  org: string;
  photo: string;
  photoClassName?: string;
  quote?: string;
  linkedin?: string;
  twitter?: string;
};

const leaders: Leader[] = [
  {
    name: "Sulaiman Abduljaleel Mahmud",
    role: "Chairman & CEO",
    org: "Braventi Holdings",
    photo: leaderAbduljaleel,
    quote:
      "I don't pick industries. I pick broken systems, then I build companies to fix them.",
    linkedin: "https://ng.linkedin.com/in/abduljaleel-sulaiman-57baa31a6",
    twitter: "https://x.com/2_blacktiger?s=11",
  },
  {
    name: "Usman Yakubu",
    role: "Chief Strategist & Head of Technology",
    org: "Braventi Holdings",
    photo: leaderUsmanYakubu,
    quote:
      "I don't chase every idea. I chase the ones that survive contact with reality.",
    twitter: "https://x.com/Novjid_Usman",
  },
  {
    name: "Fahad Zakariyya Ishaq",
    role: "Head of Operations",
    org: "Braventi Holdings",
    photo: leaderFahad,
    photoClassName: "scale-110 origin-top",
    quote:
      "History remembers those who transformed obstacles into opportunities for a nation, not just themselves.",
    twitter: "https://x.com/FahadZakar2548",
  },
  {
    name: "Selimat Akinwale",
    role: "Head of Product",
    org: "Braventi Holdings",
    photo: leaderSelimat,
    quote:
      "We don't start with what's possible. We start with what people have learned to put up with and ask why it's still true.",
    linkedin: "https://www.linkedin.com/in/akinwale-selimat",
    twitter: "https://x.com/OlayemiAAA",
  },
  {
    name: "Usman Musa",
    role: "Head of Growth Partners",
    org: "Braventi Holdings",
    photo: leaderUsmanMusa,
    photoClassName: "scale-110 origin-top",
    quote:
      "Every community deserves opportunities to grow. I am committed to connecting people with the resources, support, and partnerships that drive sustainable development.",
    twitter: "https://x.com/MusaUsman637655",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[92vh] flex items-center overflow-hidden bg-charcoal text-white">
        <img
          src={heroPort}
          alt="Global port operations"
          className="hero-pan absolute inset-0 h-full w-full object-cover opacity-55"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/95" />
        <div className="container-x relative py-32 md:py-40">
          <p className="hero-rise text-[11px] uppercase tracking-[0.32em] text-gold font-semibold">
            <span className="rule-drawn inline-block w-10 h-px bg-gold align-middle mr-3" />
            Braventi Holdings
          </p>
          <h1
            className="hero-rise mt-6 max-w-5xl text-5xl md:text-7xl leading-[1.02] text-white font-normal"
            style={{ animationDelay: "120ms" }}
          >
            Building Businesses<br />That Matter.
          </h1>
          <p
            className="hero-rise mt-8 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed"
            style={{ animationDelay: "240ms" }}
          >
            Braventi Holdings is a diversified investment and operating company
            building enduring businesses across trade, technology, infrastructure
            and sustainable industries.
          </p>
          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              to="/businesses"
              className="group inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-charcoal transition hover:bg-gold-soft"
            >
              Explore Our Businesses
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-white hover:text-charcoal"
            >
              Contact Us
            </Link>
          </div>

          <div
            className="hero-rise mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/15 pt-8"
            style={{ animationDelay: "520ms" }}
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl md:text-5xl text-gold">
                  <CountUp to={s.value} />
                </div>
                <div className="mt-2 text-xs md:text-sm text-white/70 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS — a slow band of the industries the group operates in */}
      <section className="border-y border-border bg-bone py-5 overflow-hidden">
        <div className="sector-drift flex w-max items-center gap-10 whitespace-nowrap">
          {[...sectors, ...sectors].map((s, i) => (
            <span key={`${s}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-lg md:text-2xl text-primary/80">
                {s}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 opacity-[0.045] lg:block"
        />
        <div className="container-x relative grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="Who We Are"
              title="A diversified group building for the long term."
            />
          </div>

          {/* Two of the group's worlds — trade and the built environment. */}
          <Reveal className="lg:col-span-6 lg:row-span-2">
            <div className="relative">
              <img
                src={businessExim}
                alt="Cargo moving through port operations"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-sm object-cover shadow-[0_30px_80px_-40px_rgba(1,77,64,0.55)]"
              />
              <img
                src={businessStructures}
                alt="A Braventi Structures development"
                loading="lazy"
                decoding="async"
                className="absolute -bottom-10 -left-6 hidden w-2/5 rounded-sm border-4 border-background object-cover shadow-[0_25px_60px_-30px_rgba(0,0,0,0.45)] sm:block"
              />
              <span
                aria-hidden="true"
                className="absolute -right-4 -top-4 h-24 w-24 border-t-2 border-r-2 border-gold"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Braventi Holdings is a diversified investment and operating
              company focused on building businesses that solve meaningful
              challenges across multiple industries.
            </p>
            <p>
              We combine long-term thinking, operational excellence and
              innovation to create companies that contribute to economic
              growth, strengthen industries and generate lasting value.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-8 border-t border-border">
              <div className="pt-8">
                <div className="text-4xl font-display text-primary">4</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Active Subsidiaries
                </div>
              </div>
              <div className="pt-8">
                <div className="text-4xl font-display text-primary">1</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Unified Group
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="bg-bone py-20 md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div className="bg-white p-10 md:p-14 rounded-sm border border-border">
            <p className="eyebrow"><span className="gold-rule" />Vision</p>
            <h3 className="mt-4 text-2xl md:text-3xl leading-snug">
              To become one of Africa's most respected diversified business
              groups, building industry-leading companies that create lasting
              value for generations.
            </h3>
          </div>
          <div className="bg-primary text-primary-foreground p-10 md:p-14 rounded-sm">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold">
              <span className="inline-block w-10 h-px bg-gold align-middle mr-3" />
              Mission
            </p>
            <h3 className="mt-4 text-2xl md:text-3xl leading-snug text-white font-display">
              To build enduring businesses that solve real-world challenges
              through innovation, operational excellence and strategic
              investment in industries that drive economic growth and
              sustainable development.
            </h3>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <div className="pattern-weave absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="Core Values"
            title="The principles behind every business we build."
            align="center"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal key={v.title} index={i} className="h-full">
                <div className="group h-full rounded-sm border border-border bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_20px_60px_-30px_rgba(1,77,64,0.35)]">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <v.icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* A photographic pause between the group's principles and its companies */}
      <section
        className="relative flex min-h-[22rem] items-center justify-center overflow-hidden bg-cover bg-center md:min-h-[26rem] md:bg-fixed"
        style={{ backgroundImage: `url(${businessEnergy})` }}
      >
        <div className="absolute inset-0 bg-emerald-deep/85" />
        <div className="container-x relative text-center">
          <img
            src={logoMark}
            alt=""
            aria-hidden="true"
            className="mx-auto w-20 opacity-90"
          />
          <p className="mt-6 font-display text-3xl md:text-5xl text-white leading-tight">
            Building businesses that matter.
          </p>
          <p className="mt-4 text-sm md:text-base text-white/70">
            Nigeria — and the markets we trade with.
          </p>
        </div>
      </section>

      {/* BUSINESSES */}
      <section className="bg-charcoal text-white py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="eyebrow"><span className="gold-rule" />Our Businesses</p>
              <h2 className="mt-4 text-3xl md:text-5xl text-white font-normal leading-tight">
                Five subsidiaries. One unified group.
              </h2>
            </div>
            <Link
              to="/businesses"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft"
            >
              View all businesses <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {businesses.map((b, i) => (
              <Reveal key={b.slug} index={i} className="h-full">
              <Link
                to={b.slug}
                className="group relative block h-full overflow-hidden rounded-sm bg-charcoal border border-white/10 transition duration-300 hover:-translate-y-1.5 hover:border-gold/60"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                  />
                  {/* Hovering lifts the veil: the photograph reads clearer. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-transparent transition-opacity duration-700 group-hover:opacity-70" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-gold">
                    <b.icon size={14} />
                    {b.tag}
                    {b.upcoming && (
                      <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[9px] text-gold-soft">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl text-white font-display">
                    {b.name}
                  </h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {b.desc}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-gold group-hover:gap-3 transition-all">
                    Explore <ArrowUpRight size={15} />
                  </div>
                </div>
              </Link>
              </Reveal>
            ))}

            {/* Minerals — locked */}
            <div className="relative overflow-hidden rounded-sm border border-white/10 md:col-span-2">
              <div className="relative h-72">
                <img
                  src={businessMinerals}
                  alt="Braventi Minerals"
                  loading="lazy"
                  className="h-full w-full object-cover blur-sm opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <Mountain size={28} className="text-gold" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-gold">
                    Braventi Minerals
                  </p>
                  <h3 className="mt-3 text-2xl md:text-3xl text-white font-display">
                    Coming Soon
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section
        id="leadership"
        className="relative overflow-hidden bg-secondary py-20 md:py-28 scroll-mt-24"
      >
        <div className="pattern-dots absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeader
            eyebrow="Leadership"
            title="The people building Braventi Holdings."
          />
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Our leadership team brings entrepreneurial experience, deep operating
            discipline and a shared commitment to building enduring businesses.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {leaders.map((p, i) => (
              <Reveal
                key={p.name}
                index={i}
                className={`${
                  i === leaders.length - 1 && leaders.length % 2 === 1
                    ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1rem)]"
                    : ""
                }`}
              >
              <div className="group h-full rounded-xl border border-border bg-white overflow-hidden shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)] transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_25px_60px_-30px_rgba(1,77,64,0.35)]">
                <div className="grid grid-cols-5">
                  <div className="col-span-2 relative aspect-square bg-bone overflow-hidden">
                    <img
                      src={p.photo}
                      alt={p.name}
                      loading="lazy"
                      className={`h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-105 ${p.photoClassName ?? ""}`}
                    />
                  </div>
                  <div className="col-span-3 p-8 flex flex-col">

                    <h3 className="text-xl md:text-2xl font-display leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-primary font-medium">
                      {p.role}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {p.org}
                    </p>
                    {p.quote && (
                      <blockquote className="mt-5 relative border-l-2 border-gold/60 pl-4">
                        <Quote
                          size={14}
                          className="absolute -left-[7px] -top-1 bg-white text-gold"
                        />
                        <p className="italic text-sm text-foreground/80 leading-relaxed">
                          {p.quote}
                        </p>
                      </blockquote>
                    )}
                    <div className="mt-auto pt-6 flex items-center gap-2">
                      {p.linkedin && (
                        <a
                          href={p.linkedin}
                          aria-label={`${p.name} on LinkedIn`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition"
                        >
                          <Linkedin size={14} />
                        </a>
                      )}
                      {p.twitter && (
                        <a
                          href={p.twitter}
                          aria-label={`${p.name} on Twitter`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition"
                        >
                          <Twitter size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-sm bg-primary p-12 md:p-20 text-center">
            <div className="pattern-dots absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold">
              <span className="inline-block w-10 h-px bg-gold align-middle mr-3" />
              Partner with us
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl max-w-3xl mx-auto leading-tight text-white font-display">
              Let's build the next generation of enduring businesses — together.
            </h2>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 text-sm font-medium tracking-wide text-charcoal transition hover:bg-gold-soft"
              >
                Start a conversation <ArrowUpRight size={16} />
              </Link>
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
