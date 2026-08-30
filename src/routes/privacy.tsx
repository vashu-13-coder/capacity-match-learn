import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CapacityConnect" },
      {
        name: "description",
        content:
          "How CapacityConnect collects, processes, stores and protects organization and learner data across its multi-tenant platform.",
      },
      { property: "og:title", content: "Privacy Policy — CapacityConnect" },
      { property: "og:description", content: "Our data protection and processing commitments." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    h: "Data we process",
    p: "Account identity data (name, work email, role), learning records (enrollments, assessment submissions, scores, certificates) and uploaded training materials belonging to your organization.",
  },
  {
    h: "Tenancy and isolation",
    p: "Every record is bound to a single organization identifier. Access is scoped server-side on every request; no cross-organization read path exists in the application.",
  },
  {
    h: "Storage and retention",
    p: "Learning content and certificates are held in encrypted object storage and served through short-lived signed URLs. Records are retained for the life of the subscription plus 30 days.",
  },
  {
    h: "Your rights",
    p: "Organization administrators can export or permanently delete learner records at any time. Individual users may request access to their own data through their administrator.",
  },
  {
    h: "Contact",
    p: "Privacy questions can be directed to your organization administrator or to the CapacityConnect team via the contact page.",
  },
];

function Privacy() {
  return (
    <MarketingPage title="Privacy Policy" intro="Last updated 30 August 2026.">
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
