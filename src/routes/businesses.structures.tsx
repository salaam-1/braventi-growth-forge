import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";
import businessStructures from "@/assets/business-structures.jpg";
import { ArrowLeft, Building2, ClipboardList, HardHat, Landmark, Compass } from "lucide-react";

export const Route = createFileRoute("/businesses/structures")({
  head: () => ({
    meta: [
      { title: "Braventi Structures — Real Estate & Infrastructure" },
      {
        name: "description",
        content:
          "Responsible real estate development, property solutions and infrastructure projects designed to create lasting value.",
      },
      { property: "og:title", content: "Braventi Structures" },
      {
        property: "og:description",
        content: "Real estate, property solutions and infrastructure built to last.",
      },
    ],
  }),
  component: StructuresPage,
});

const services = [
  { icon: Building2, title: "Property Development", desc: "Residential, commercial and mixed-use developments built with intent." },
  { icon: ClipboardList, title: "Project Management", desc: "Disciplined delivery from concept through completion." },
  { icon: HardHat, title: "Construction", desc: "Construction execution rooted in quality, safety and craftsmanship." },
  { icon: Landmark, title: "Infrastructure", desc: "Infrastructure projects designed for public and private value." },
  { icon: Compass, title: "Facility Advisory", desc: "Strategic advisory across facility planning and asset performance." },
];

function StructuresPage() {
  return (
    <>
      <PageHero
        eyebrow="Braventi Structures"
        title="Building environments that endure."
        subtitle="Braventi Structures focuses on responsible real estate development, property solutions and infrastructure projects designed to create lasting value."
        image={businessStructures}
      >
        <div className="mt-8">
          <Link to="/businesses" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold">
            <ArrowLeft size={14} /> All Businesses
          </Link>
        </div>
      </PageHero>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Services" title="Property, construction and infrastructure." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}
