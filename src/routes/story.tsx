import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Braventi Holdings" },
      {
        name: "description",
        content:
          "The founding vision of Braventi Holdings — a young company built by experienced, repeat entrepreneurs.",
      },
      { property: "og:title", content: "Our Story — Braventi Holdings" },
      {
        property: "og:description",
        content: "How Braventi Holdings came to be, and where it is going.",
      },
    ],
  }),
  component: StoryPage,
});

const timeline = [
  {
    marker: "The Founding Vision",
    title: "A group built with intention.",
    body:
      "Braventi Holdings was founded with a clear thesis: Africa needs long-term operating companies capable of building enduring businesses across industries. Not a fund. Not a portfolio. A group.",
  },
  {
    marker: "Experienced Founders",
    title: "Not a first attempt.",
    body:
      "Braventi is a young company — but the founders are not first-time entrepreneurs. They are experienced, repeat operators who have built and led ventures before. That prior track record is what allowed Braventi to be structured, from day one, as a multi-subsidiary group rather than a single-product startup.",
  },
  {
    marker: "The Journey So Far",
    title: "Building the subsidiaries.",
    body:
      "Braventi is actively building across trade, technology and infrastructure. Braventi EXIM (formerly Hexagon Trades LTD) operates in international trade and commodity sourcing. Braventi Techworks is developing digital platforms including Loamy, an agricultural operating system. Braventi Structures pursues responsible real estate and infrastructure work.",
  },
  {
    marker: "Future Ambition",
    title: "Building for generations.",
    body:
      "Braventi Energies and Braventi Minerals are being prepared as the group's next subsidiaries. Our commitment is to build companies that outlast trends — companies that contribute to industries, communities and economies over the very long term.",
  },
  {
    marker: "Long-Term Thinking",
    title: "Decades, not quarters.",
    body:
      "We measure success in decades. Every subsidiary, every hire, every partnership is chosen with that horizon in mind.",
  },
];

function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A young company, built by experienced hands."
        subtitle="Braventi Holdings is new — but the people behind it are not. This is a group built by repeat entrepreneurs, structured from day one for the long term."
      />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeader eyebrow="Timeline" title="How Braventi is being built." />

          <div className="mt-20 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" aria-hidden />
            <ul className="space-y-16">
              {timeline.map((t, i) => (
                <li key={t.marker} className="relative grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className={`md:${i % 2 === 0 ? "text-right pr-8 md:pr-16" : "col-start-2 pl-8 md:pl-16"} pl-12 md:pl-0`}>
                    <span className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-2 inline-flex h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                    <p className="eyebrow"><span className="gold-rule" />{t.marker}</p>
                    <h3 className="mt-4 text-2xl md:text-3xl font-display leading-snug">
                      {t.title}
                    </h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {t.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
