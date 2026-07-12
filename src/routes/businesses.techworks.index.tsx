import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";
import businessTech from "@/assets/business-tech.jpg";
import loamyDashboard from "@/assets/loamy-dashboard.jpg";
import { ArrowLeft, ArrowUpRight, Code2, Brain, Building, Cloud, Rocket, Lightbulb, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/businesses/techworks/")({
  head: () => ({
    meta: [
      { title: "Braventi Techworks — Software, AI & Enterprise Technology" },
      {
        name: "description",
        content:
          "Braventi Techworks builds digital solutions across software engineering, artificial intelligence and enterprise technology.",
      },
      { property: "og:title", content: "Braventi Techworks" },
      {
        property: "og:description",
        content:
          "Digital solutions that transform businesses through software, AI and enterprise technology.",
      },
    ],
  }),
  component: TechworksPage,
});

const services = [
  { icon: Code2, title: "Software Development", desc: "Custom software built for scale, reliability and long-term maintainability." },
  { icon: Brain, title: "Artificial Intelligence", desc: "Applied AI and machine learning that solve real operational problems." },
  { icon: Building, title: "Enterprise Solutions", desc: "Systems engineered for the demands of large-scale organizations." },
  { icon: Cloud, title: "Cloud Applications", desc: "Modern, cloud-native platforms built for global reach." },
  { icon: Rocket, title: "Digital Transformation", desc: "End-to-end transformation programs for legacy operations." },
  { icon: Lightbulb, title: "Technology Consulting", desc: "Strategic technology advisory grounded in engineering reality." },
  { icon: FlaskConical, title: "Research & Innovation", desc: "Deep exploration of emerging technologies and applied research." },
];

function TechworksPage() {
  return (
    <>
      <PageHero
        eyebrow="Braventi Techworks"
        title="Digital solutions that transform businesses."
        subtitle="Braventi Techworks builds digital solutions through software engineering, artificial intelligence and enterprise technology — designed to scale, integrate and endure."
        image={businessTech}
      >
        <div className="mt-8">
          <Link to="/businesses" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold">
            <ArrowLeft size={14} /> All Businesses
          </Link>
        </div>
      </PageHero>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Capabilities" title="Engineering across the modern stack." />
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

      {/* FEATURED PRODUCT — LOAMY */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <div className="rounded-sm border border-border bg-white overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <p className="eyebrow"><span className="gold-rule" />Featured Product</p>
                <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
                  Loamy
                </h2>
                <p className="mt-3 text-sm uppercase tracking-widest text-primary font-medium">
                  Nigeria's Agricultural Operating System
                </p>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Loamy combines agricultural financing infrastructure, market
                  intelligence and a digital marketplace into one intelligent
                  platform — connecting the entire value chain.
                </p>
                <div className="mt-8">
                  <a
                    href="https://loamy.braventiholdings.com.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-emerald-deep transition"
                  >
                    Visit Official Loamy Website
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <div className="relative bg-bone p-8 md:p-12 flex items-center justify-center">
                <img
                  src={loamyDashboard}
                  alt="Loamy dashboard"
                  loading="lazy"
                  className="w-full max-w-xl rounded-sm shadow-[0_30px_80px_-30px_rgba(1,77,64,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
