import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ArrowUpRight, Ship, Cpu, Building2, Sun, Mountain } from "lucide-react";
import businessExim from "@/assets/business-exim.jpg";
import businessTech from "@/assets/business-tech.jpg";
import businessStructures from "@/assets/business-structures.jpg";
import businessEnergy from "@/assets/business-energy.jpg";
import businessMinerals from "@/assets/business-minerals.jpg";

export const Route = createFileRoute("/businesses/")({
  head: () => ({
    meta: [
      { title: "Our Businesses — Braventi Holdings" },
      {
        name: "description",
        content:
          "Explore the subsidiaries of Braventi Holdings — EXIM, Techworks, Structures, Energies and Minerals.",
      },
      { property: "og:title", content: "Our Businesses — Braventi Holdings" },
      {
        property: "og:description",
        content:
          "Five subsidiaries across trade, technology, infrastructure, energy and minerals.",
      },
    ],
  }),
  component: BusinessesPage,
});

const businesses = [
  {
    slug: "/businesses/exim",
    tag: "Trade & Commodities",
    name: "Braventi EXIM",
    img: businessExim,
    icon: Ship,
    desc: "International trade, export development and commodity sourcing that connects producers with global markets.",
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
    desc: "Responsible real estate development, property solutions and infrastructure designed to last.",
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

function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Businesses"
        title="Five subsidiaries. One unified group."
        subtitle="Each Braventi company is built to lead its industry — held together by a shared commitment to integrity, excellence and long-term value."
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {businesses.map((b) => (
            <Link
              key={b.slug}
              to={b.slug}
              className="group relative block overflow-hidden rounded-sm border border-border bg-white transition hover:border-primary/50 hover:shadow-[0_25px_70px_-40px_rgba(1,77,64,0.4)]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={b.img}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-gold">
                  <b.icon size={14} />
                  {b.tag}
                  {b.upcoming && (
                    <span className="rounded-full border border-gold/50 px-2 py-0.5 text-[9px] text-gold">
                      Upcoming
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-2xl md:text-3xl font-display text-charcoal">
                  {b.name}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                  Explore <ArrowUpRight size={15} />
                </div>
              </div>
            </Link>
          ))}

          {/* Minerals locked */}
          <div className="md:col-span-2 relative overflow-hidden rounded-sm border border-border">
            <div className="relative h-72">
              <img
                src={businessMinerals}
                alt="Braventi Minerals"
                loading="lazy"
                className="h-full w-full object-cover blur-sm opacity-70 scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <Mountain size={28} className="text-gold" />
                <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-gold">
                  Braventi Minerals
                </p>
                <h3 className="mt-3 text-3xl text-white font-display">
                  Coming Soon
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
