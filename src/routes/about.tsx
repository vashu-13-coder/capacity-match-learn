import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CapacityConnect — Corporate Learning Infrastructure" },
      {
        name: "description",
        content:
          "CapacityConnect builds competency infrastructure for corporate L&D teams, connecting trainer expertise to organizational skill demand.",
      },
      { property: "og:title", content: "About CapacityConnect" },
      {
        property: "og:description",
        content: "Why we built a competency-first learning portal for enterprise training teams.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <MarketingPage title="Competency infrastructure for enterprise L&D" intro="We believe training programs fail on allocation, not content.">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-muted-foreground">
        <p>
          Most learning platforms stop at content delivery. The hard part inside a large organization
          is knowing which trainer should own which subject, which teams are falling behind on
          compliance, and which competencies are thinning out as people move on.
        </p>
        <p>
          CapacityConnect starts from the skills graph. Trainers publish proficiency-rated expertise,
          courses declare required competencies, and the matching engine keeps allocation current as
          both sides change — while administrators retain full override authority.
        </p>
        <p>
          The platform is multi-tenant by design. Each organization operates an isolated workspace
          with its own users, courses, branding and subscription tier, and every request is scoped
          server-side to that organization.
        </p>
      </div>
    </MarketingPage>
  );
}
