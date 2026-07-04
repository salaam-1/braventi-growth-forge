import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";
import businessExim from "@/assets/business-exim.jpg";
import { ArrowLeft, Ship, Package, Globe2, ShieldCheck, FileText, Handshake, Warehouse, Search } from "lucide-react";

export const Route = createFileRoute("/businesses/exim")({
  head: () => ({
    meta: [
      { title: "Braventi EXIM — International Trade & Commodities" },
      {
        name: "description",
        content:
          "Braventi EXIM specializes in international trade, export development and commodity sourcing across agricultural and strategic products.",
      },
      { property: "og:title", content: "Braventi EXIM" },
      {
        property: "og:description",
        content:
          "Export development, import services and commodity sourcing that connect African producers with global markets.",
      },
    ],
  }),
  component: EximPage,
});

const services = [
  { icon: Package, title: "Export Services", desc: "End-to-end export execution for agricultural and strategic commodities." },
  { icon: Ship, title: "Import Services", desc: "Structured import programs that deliver reliability and cost efficiency." },
  { icon: Search, title: "Commodity Sourcing", desc: "Origin-verified sourcing built on producer relationships and quality control." },
  { icon: Handshake, title: "Trade Facilitation", desc: "Trade finance coordination, banking and buyer-seller structuring." },
  { icon: Globe2, title: "Global Partnerships", desc: "Long-term partnerships with importers, distributors and off-takers." },
  { icon: Warehouse, title: "Supply Chain", desc: "Integrated logistics, warehousing and freight coordination." },
  { icon: ShieldCheck, title: "Quality Assurance", desc: "Rigorous grading, inspection and pre-shipment quality control." },
  { icon: FileText, title: "Export Documentation", desc: "Full compliance across regulatory, customs and shipping documentation." },
];

const commodities = ["Ginger", "Sesame", "Cashew", "Chili Pepper", "Charcoal", "Soybeans", "Others"];

function EximPage() {
  return (
    <>
      <PageHero
        eyebrow="Braventi EXIM · Formerly Hexagon Trades LTD"
        title="Connecting producers with global markets."
        subtitle="Braventi EXIM specializes in international trade, export development and commodity sourcing. We build efficient, sustainable supply chains across agricultural commodities and strategic products."
        image={businessExim}
      >
        <div className="mt-8">
          <Link to="/businesses" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold">
            <ArrowLeft size={14} /> All Businesses
          </Link>
        </div>
      </PageHero>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Our Mission" title="Creating demand where markets are underserved." />
          </div>
          <div className="lg:col-span-7 text-lg text-muted-foreground leading-relaxed">
            <p>
              We focus on creating demand by identifying underserved markets
              and building sustainable export opportunities that create
              long-term value for producers, partners and customers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="What We Do" title="A full-service international trade partner." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-sm border border-border bg-white p-8 hover:border-primary/40 transition">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  <s.icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Featured Commodities" title="What we source and ship." />
          <div className="mt-12 flex flex-wrap gap-3">
            {commodities.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-medium text-primary"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-white py-20">
        <div className="container-x text-center">
          <h3 className="text-2xl md:text-3xl text-white font-display">
            Ready to explore a trade partnership?
          </h3>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium text-charcoal hover:bg-gold-soft">
              Contact Braventi EXIM
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
