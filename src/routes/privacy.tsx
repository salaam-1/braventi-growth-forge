import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Braventi Holdings" },
      {
        name: "description",
        content: "How Braventi Holdings collects, uses and protects your information.",
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Who we are",
    body: [
      "Braventi Holdings is a diversified investment and operating company headquartered in Abuja, Nigeria. This Privacy Policy explains how we collect, use and protect personal information when you use our websites, including braventiholdings.com.ng and its subdomains (together, the “Sites”).",
      "Individual Braventi products — such as Loamy, our agricultural platform — may collect additional information governed by their own product terms, presented to you when you create an account.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "Contact form submissions: when you contact us through the Sites, we receive the details you choose to provide — typically your name, email address, company, subject and message.",
      "Account information: if you register for one of our products (for example a Loamy founding-member account), we collect the registration details you provide, such as your name, email address, phone number, business category and state.",
      "Technical information: our hosting providers automatically process basic technical data (such as IP addresses and browser type) as part of serving the Sites securely. We do not run advertising trackers on the Sites.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "To respond to enquiries you send us; to operate, maintain and improve the Sites and our products; to communicate with you about products you have registered for, including launch updates; and to meet legal and regulatory obligations.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "4. How your information is stored and shared",
    body: [
      "Our Sites are hosted on reputable cloud infrastructure providers. Product account data is stored in access-controlled databases with row-level security, so members of a product community cannot view one another's personal records.",
      "Contact form messages are delivered to our team mailbox through a form relay service. We share information with service providers only to the extent needed to operate the Sites, and with authorities where required by law.",
    ],
  },
  {
    title: "5. Your rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information at any time by emailing braventitechnologies@gmail.com. We will respond within a reasonable period and in line with the Nigeria Data Protection Act (NDPA) and other applicable law.",
    ],
  },
  {
    title: "6. Data retention",
    body: [
      "We keep personal information only for as long as it is needed for the purposes described above, or as required by law. Product account information is retained while your account remains active; you may request account deletion at any time.",
    ],
  },
  {
    title: "7. Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. The latest version will always be available on this page, and material changes to how we handle product account data will be communicated to registered users.",
    ],
  },
  {
    title: "8. Contact",
    body: [
      "Questions about this policy or your data can be sent to braventitechnologies@gmail.com.",
    ],
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How Braventi Holdings collects, uses and protects your information."
      />
      <section className="py-20 md:py-28">
        <div className="container-x max-w-3xl">
          <p className="text-sm text-muted-foreground">Last updated: July 12, 2026</p>
          <div className="mt-10 space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl md:text-2xl">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-4 text-base text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
