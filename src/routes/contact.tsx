import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeader } from "@/components/site/PageHero";
import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Braventi Holdings" },
      {
        name: "description",
        content: "Get in touch with Braventi Holdings.",
      },
      { property: "og:title", content: "Contact — Braventi Holdings" },
      {
        property: "og:description",
        content: "Reach the Braventi Holdings team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation."
        subtitle="Whether you're exploring a partnership, an investment opportunity or a career at Braventi Holdings — we'd like to hear from you."
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-10">
            <SectionHeader eyebrow="Reach us" title="Corporate Headquarters" />

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Office</p>
                  <p className="mt-1 text-foreground">Abuja, Nigeria</p>
                  <p className="text-sm text-muted-foreground">Full address to be published</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                  <a href="mailto:braventitechnologies@gmail.com" className="mt-1 block text-foreground hover:text-primary">
                    braventitechnologies@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                  <p className="mt-1 text-foreground">To be published</p>
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-4">
              <a href="#" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition">
                <Linkedin size={15} />
              </a>
              <a href="#" aria-label="Twitter" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition">
                <Twitter size={15} />
              </a>
            </div>

            <div className="rounded-sm overflow-hidden border border-border">
              <div className="aspect-[4/3] bg-bone flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center">
                  <MapPin size={28} className="mx-auto text-primary" />
                  <p className="mt-3">Map placeholder</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-sm border border-border bg-white p-8 md:p-10 space-y-6"
            >
              {sent ? (
                <div className="text-center py-10">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={22} />
                  </div>
                  <h3 className="mt-6 text-2xl font-display">Message received.</h3>
                  <p className="mt-3 text-muted-foreground">
                    Thank you for reaching out. A member of our team will
                    respond shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full Name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Company" name="company" />
                    <Field label="Subject" name="subject" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:bg-emerald-deep transition"
                  >
                    Send Message
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
  label, name, type = "text", required,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
