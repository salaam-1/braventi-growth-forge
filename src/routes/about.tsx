import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-port.jpg";
import { Shield, Sparkles, Award, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Braventi Holdings" },
      {
        name: "description",
        content:
          "Braventi Holdings is a diversified investment and operating company building enduring businesses across multiple industries.",
      },
      { property: "og:title", content: "About Braventi Holdings" },
      {
        property: "og:description",
        content:
          "A diversified investment and operating company building enduring businesses.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Shield, title: "Integrity" },
  { icon: Sparkles, title: "Innovation" },
  { icon: Award, title: "Excellence" },
  { icon: Leaf, title: "Stewardship" },
  { icon: Users, title: "Collaboration" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Braventi Holdings"
        title="A diversified group building businesses that matter."
        subtitle="We combine long-term thinking, operational excellence and innovation to create companies that contribute to economic growth and generate lasting value."
        image={heroImg}
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Who we are" title="An operating company, not a fund." />
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Braventi Holdings is a diversified investment and operating
              company focused on building businesses that solve meaningful
              challenges across multiple industries.
            </p>
            <p>
              We do not follow trends. We identify durable problems, build the
              teams and capabilities needed to address them, and hold for the
              long term. Every subsidiary in our group is operated with
              conviction and discipline.
            </p>
            <p>
              Our subsidiaries span international trade, technology, real
              estate and infrastructure, renewable energy and minerals — each
              contributing to a unified group that thinks in decades, not
              quarters.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 md:py-32">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div className="bg-white p-10 md:p-14 rounded-sm border border-border">
            <p className="eyebrow"><span className="gold-rule" />Vision</p>
            <h3 className="mt-4 text-2xl md:text-3xl leading-snug">
              To become one of Africa's most respected diversified business
              groups — building industry-leading companies that create lasting
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

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Core Values" title="What we hold ourselves to." align="center" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-sm border border-border bg-white p-8 text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <v.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 text-lg">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
