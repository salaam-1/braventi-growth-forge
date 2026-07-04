import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";
import { useState } from "react";
import { Upload, Check } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Braventi Holdings" },
      {
        name: "description",
        content:
          "Build the future with Braventi Holdings. Submit your CV for future opportunities across the group.",
      },
      { property: "og:title", content: "Careers — Braventi Holdings" },
      {
        property: "og:description",
        content: "Join the team building Braventi Holdings.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the Future With Us"
        subtitle="We are always looking for exceptional people who share our commitment to innovation, integrity and excellence."
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Current openings" title="No current openings." />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              While we don't have open roles right now, we're always
              interested in meeting exceptional people. Submit your CV and
              we'll keep you in mind as new opportunities emerge across the
              group.
            </p>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="rounded-sm border border-border bg-white p-8 md:p-10 space-y-6"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={22} />
                  </div>
                  <h3 className="mt-6 text-2xl font-display">Thank you.</h3>
                  <p className="mt-3 text-muted-foreground">
                    We've received your submission and will reach out if a
                    relevant opportunity arises.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full Name" name="name" required />
                    <Field label="Email Address" name="email" type="email" required />
                    <Field label="Phone" name="phone" />
                    <Field label="Area of Interest" name="area" placeholder="e.g. Technology, Trade, Real Estate" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                      Cover message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Tell us briefly about yourself and what you'd like to contribute."
                    />
                  </div>
                  <div>
                    <label className="flex items-center justify-between rounded-sm border border-dashed border-input px-5 py-4 cursor-pointer hover:border-primary transition">
                      <span className="flex items-center gap-3 text-sm">
                        <Upload size={16} className="text-primary" />
                        <span className="text-muted-foreground">
                          {fileName ?? "Attach your CV (PDF or DOCX)"}
                        </span>
                      </span>
                      <span className="text-xs uppercase tracking-widest text-primary">Browse</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:bg-emerald-deep transition"
                  >
                    Submit Application
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
