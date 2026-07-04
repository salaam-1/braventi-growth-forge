import { createFileRoute, Link } from "@tanstack/react-router";
import heroPort from "@/assets/hero-port.jpg";
import businessExim from "@/assets/business-exim.jpg";
import businessTech from "@/assets/business-tech.jpg";
import businessStructures from "@/assets/business-structures.jpg";
import businessEnergy from "@/assets/business-energy.jpg";
import businessMinerals from "@/assets/business-minerals.jpg";
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
} from "lucide-react";
import { SectionHeader } from "@/components/site/PageHero";

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

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[92vh] flex items-center overflow-hidden bg-charcoal text-white">
        <img
          src={heroPort}
          alt="Global port operations"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/95" />
        <div className="container-x relative py-32 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold font-semibold">
            <span className="inline-block w-10 h-px bg-gold align-middle mr-3" />
            Braventi Holdings
          </p>
          <h1 className="mt-6 max-w-5xl text-5xl md:text-7xl leading-[1.02] text-white font-normal">
            Building Businesses<br />That Matter.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
            Braventi Holdings is a diversified investment and operating company
            building enduring businesses across trade, technology, infrastructure
            and sustainable industries.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
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
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Who We Are"
              title="A diversified group building for the long term."
            />
          </div>
          <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
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
      <section className="bg-bone py-24 md:py-32">
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
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="Core Values"
            title="The principles behind every business we build."
            align="center"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="group rounded-sm border border-border bg-white p-8 transition hover:border-primary/50 hover:shadow-[0_20px_60px_-30px_rgba(1,77,64,0.35)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESSES */}
      <section className="bg-charcoal text-white py-24 md:py-32">
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
            {businesses.map((b) => (
              <Link
                key={b.slug}
                to={b.slug}
                className="group relative block overflow-hidden rounded-sm bg-charcoal border border-white/10 hover:border-gold/60 transition"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
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

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="rounded-sm border border-border bg-bone p-12 md:p-20 text-center">
            <p className="eyebrow"><span className="gold-rule" />Partner with us</p>
            <h2 className="mt-4 text-3xl md:text-5xl max-w-3xl mx-auto leading-tight">
              Let's build the next generation of enduring businesses — together.
            </h2>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground hover:bg-emerald-deep transition"
              >
                Start a conversation <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
