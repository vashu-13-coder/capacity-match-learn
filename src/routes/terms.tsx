import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — CapacityConnect" },
      {
        name: "description",
        content:
          "Subscription terms, acceptable use, service levels and liability terms for organizations using the CapacityConnect learning platform.",
      },
      { property: "og:title", content: "Terms of Service — CapacityConnect" },
      { property: "og:description", content: "Subscription, usage and service level terms." },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  { h: "1. Subscription", p: "Access is licensed per organization on a per-seat basis for the term selected at checkout. Seat counts and storage quotas are enforced by the subscription tier recorded on your organization." },
  { h: "2. Acceptable use", p: "Customers may not upload unlawful content, attempt to access other organizations' data, or resell platform access without written agreement." },
  { h: "3. Service levels", p: "We target 99.5% monthly availability excluding scheduled maintenance announced at least 48 hours in advance." },
  { h: "4. Customer content", p: "You retain ownership of all training materials, learner records and branding assets you upload. We process them solely to operate the service." },
  { h: "5. Termination", p: "Either party may terminate at the end of a billing term. On termination, customer data is available for export for 30 days before deletion." },
  { h: "6. Liability", p: "Liability is limited to fees paid in the twelve months preceding the claim, to the extent permitted by applicable law." },
];

function Terms() {
  return (
    <MarketingPage title="Terms of Service" intro="Last updated 30 August 2026.">
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-16">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg">{s.h}</h2>
            <p className="mt-2 text-muted-foreground">{s.p}</p>
          </section>
        ))}
      </div>
    </MarketingPage>
  );
}
