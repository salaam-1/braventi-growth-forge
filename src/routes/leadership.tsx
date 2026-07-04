import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Linkedin, Twitter, User } from "lucide-react";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — Braventi Holdings" },
      {
        name: "description",
        content: "Meet the leadership team building Braventi Holdings.",
      },
      { property: "og:title", content: "Leadership — Braventi Holdings" },
      {
        property: "og:description",
        content: "The people leading Braventi Holdings and its subsidiaries.",
      },
    ],
  }),
  component: LeadershipPage,
});

type Person = {
  name: string;
  role: string;
  org: string;
  linkedin?: string;
  twitter?: string;
};

const people: Person[] = [
  {
    name: "Sulaiman Abduljaleel Mahmud",
    role: "Chairman & CEO",
    org: "Braventi Holdings",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Usman Yakubu",
    role: "Head of Product & Technology",
    org: "Braventi Holdings",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Fahad Zakariyya Ishaq",
    role: "Head of Operations",
    org: "Braventi Holdings",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Usman Musa",
    role: "Research and Development",
    org: "Braventi Holdings",
    linkedin: "#",
    twitter: "#",
  },
];

function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The people building Braventi Holdings."
        subtitle="Our leadership team brings entrepreneurial experience, deep operating discipline and a shared commitment to building enduring businesses."
      />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {people.map((p, i) => (
              <div
                key={p.name}
                className="group rounded-sm border border-border bg-white overflow-hidden hover:border-primary/40 hover:shadow-[0_25px_60px_-40px_rgba(1,77,64,0.35)] transition"
              >
                <div className="grid grid-cols-5">
                  <div className="col-span-2 relative aspect-square bg-bone flex items-center justify-center overflow-hidden">
                    <User size={64} strokeWidth={1} className="text-primary/30" />
                    <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                      Photo pending
                    </div>
                  </div>
                  <div className="col-span-3 p-8 flex flex-col">
                    {i === 0 && (
                      <span className="mb-4 inline-flex self-start rounded-full bg-gold/10 border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                        Chairman
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-display leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-primary font-medium">
                      {p.role}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {p.org}
                    </p>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
