import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Braventi Holdings" },
      {
        name: "description",
        content: "The terms that govern use of the Braventi Holdings websites.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "By accessing braventiholdings.com.ng or any of its subdomains (the “Sites”), you agree to these Terms of Use. If you do not agree, please do not use the Sites.",
      "Individual Braventi products — such as Loamy — may present their own product terms at registration. Where product terms exist, they apply to that product in addition to these Terms.",
    ],
  },
  {
    title: "2. Use of the Sites",
    body: [
      "You may use the Sites for lawful purposes only. You agree not to interfere with the operation or security of the Sites, attempt to gain unauthorised access to any systems or data, or use the Sites to transmit unlawful, misleading or harmful content.",
    ],
  },
  {
    title: "3. Accounts",
    body: [
      "Some Braventi products allow you to create an account. You are responsible for the accuracy of the information you provide and for keeping your login credentials confidential. We may suspend accounts that provide false information or breach these Terms.",
    ],
  },
  {
    title: "4. Intellectual property",
    body: [
      "The Sites and their content — including the Braventi and Loamy names, logos, text, graphics and design — are the property of Braventi Holdings or its licensors and are protected by applicable intellectual-property laws. You may not reproduce or use them commercially without our prior written consent.",
    ],
  },
  {
    title: "5. No offer or advice",
    body: [
      "Content on the Sites is provided for general information about Braventi Holdings and its businesses. It does not constitute investment, legal, tax or other professional advice, and does not form an offer or solicitation of any kind.",
    ],
  },
  {
    title: "6. Pre-launch products",
    body: [
      "Certain products described on the Sites may be in development or early access. Features, timelines and availability described for such products are indicative and may change without notice.",
    ],
  },
  {
    title: "7. Limitation of liability",
    body: [
      "The Sites are provided on an “as is” and “as available” basis. To the maximum extent permitted by law, Braventi Holdings will not be liable for indirect or consequential losses arising from use of, or inability to use, the Sites.",
    ],
  },
  {
    title: "8. Third-party links",
    body: [
      "The Sites may link to third-party websites and services (for example social media platforms). We are not responsible for their content or privacy practices.",
    ],
  },
  {
    title: "9. Governing law",
    body: [
      "These Terms are governed by the laws of the Federal Republic of Nigeria, and any disputes are subject to the jurisdiction of the Nigerian courts.",
    ],
  },
  {
    title: "10. Changes and contact",
    body: [
      "We may update these Terms from time to time; the latest version will always be available on this page. Questions can be sent to braventitechnologies@gmail.com.",
    ],
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="The terms that govern use of the Braventi Holdings websites."
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
