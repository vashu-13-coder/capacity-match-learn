import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — CapacityConnect Learning Portal" },
      {
        name: "description",
        content:
          "Role-based dashboards, competency mapping, MCQ assessments, content libraries, notifications and audit logging for corporate training teams.",
      },
      { property: "og:title", content: "Features — CapacityConnect Learning Portal" },
      {
        property: "og:description",
        content: "Explore trainee, trainer and admin capabilities of the CapacityConnect platform.",
      },
    ],
  }),
  component: Features,
});

const GROUPS = [
  {
    role: "Trainee",
    items: [
      "Skills, qualification and certification profile",
      "Course catalog browsing and self-enrollment",
      "Resource viewer for recordings, decks and PDFs",
      "Timed MCQ assessments with deadline enforcement",
      "Instant auto-scored results and PDF certificates",
      "Per-course feedback and rating submission",
    ],
  },
  {
    role: "Trainer",
    items: [
      "Expertise profile with proficiency-rated skill tags",
      "Questionnaire builder with passing score and deadline",
      "Content library upload tagged by subject and course",
      "Participation and performance monitoring per course",
      "Auto-matched subject assignments from the engine",
      "Trainee completion and score summaries",
    ],
  },
  {
    role: "Admin",
    items: [
      "Signup approvals and role assignment",
      "User activation, deactivation and reassignment",
      "Course creation, trainer allocation and archiving",
      "Competency mapping console with override control",
      "Announcement and notice publishing",
      "Analytics dashboards, billing and audit logs",
    ],
  },
];

function Features() {
  return (
    <MarketingPage
      title="Built around three distinct roles"
      intro="Every capability is scoped to a role and isolated to your organization."
    >
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <section key={g.role} className="card-elevated p-6">
            <h2 className="text-lg">{g.role}</h2>
            <ul className="mt-4 space-y-3">
              {g.items.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </MarketingPage>
  );
}
