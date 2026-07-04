import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";
import businessEnergy from "@/assets/business-energy.jpg";
import { ArrowLeft, Sun } from "lucide-react";

export const Route = createFileRoute("/businesses/energies")({
  head: () => ({
    meta: [
      { title: "Braventi Energies — Sustainable Energy Solutions" },
      {
        name: "description",
        content:
          "Braventi Energies is focused on developing sustainable energy solutions that contribute to cleaner communities and long-term energy resilience.",
      },
      { property: "og:title", content: "Braventi Energies" },
      {
        property: "og:description",
        content: "Sustainable energy solutions for cleaner communities and long-term resilience.",
      },
    ],
  }),
  component: EnergiesPage,
});

function EnergiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Braventi Energies · Upcoming"
        title="A cleaner, more resilient energy future."
        subtitle="Braventi Energies is focused on developing sustainable energy solutions that contribute to cleaner communities and long-term energy resilience."
        image={businessEnergy}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs uppercase tracking-widest text-gold">
            <Sun size={12} className="mr-2" /> Coming Soon
          </span>
          <Link to="/businesses" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold">
            <ArrowLeft size={14} /> All Businesses
          </Link>
        </div>
      </PageHero>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="The Opportunity" title="Nigeria's renewable energy landscape." />
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Nigeria stands at an inflection point in its energy transition.
              A large and growing population, rising commercial demand, and
              persistent access gaps together define one of the most
              significant renewable energy opportunities on the continent.
            </p>
            <p>
              The country's abundant solar resource, geographic diversity and
              maturing regulatory environment create meaningful room for
              distributed generation, utility-scale renewables and storage
              infrastructure to reshape how energy is produced, delivered and
              consumed over the coming decades.
            </p>
            <p>
              Braventi Energies is being built to participate in this
              transition — with a long-term view on generation, resilience and
              access.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="container-x text-center">
          <p className="eyebrow"><span className="gold-rule" />Status</p>
          <h3 className="mt-3 text-2xl md:text-3xl font-display">
            More details will be shared as Braventi Energies takes shape.
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We prefer to share specifics once real projects and activity exist to describe.
          </p>
        </div>
      </section>
    </>
  );
}
