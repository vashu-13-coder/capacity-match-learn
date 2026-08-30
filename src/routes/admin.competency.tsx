import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { competencyMatches, courses, type TrainerMatch } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/competency")({
  head: () => ({
    meta: [
      { title: "Competency Mapping Console — CapacityConnect" },
      {
        name: "description",
        content:
          "Review ranked trainer-to-subject matches generated from weighted skill-tag overlap and confirm assignments.",
      },
      { property: "og:title", content: "Competency Mapping Console — CapacityConnect" },
      { property: "og:description", content: "Confirm or override automated trainer matching." },
    ],
  }),
  component: CompetencyConsole,
});

function CompetencyConsole() {
  const [matches, setMatches] = useState<Record<string, TrainerMatch[]>>(competencyMatches);
  const [recalculating, setRecalculating] = useState(false);

  const unassigned = courses.filter((c) => !c.trainer && matches[c.id]);

  function confirm(courseId: string, trainerId: string) {
    setMatches((prev) => ({
      ...prev,
      [courseId]: (prev[courseId] ?? []).map((m) => ({ ...m, confirmed: m.trainerId === trainerId })),
    }));
    toast.success("Assignment confirmed and written to the course record.");
  }

  function recalculate() {
    setRecalculating(true);
    window.setTimeout(() => {
      setRecalculating(false);
      toast.success("Match scores recalculated from current trainer profiles.");
    }, 900);
  }

  return (
    <AdminShell
      title="Competency Mapping Console"
      description="Scores are weighted skill-tag overlap between trainer proficiency and course requirements."
      actions={
        <Button variant="outline" onClick={recalculate} disabled={recalculating}>
          <RefreshCw className={`size-4 ${recalculating ? "animate-spin" : ""}`} />
          {recalculating ? "Recalculating…" : "Recalculate matches"}
        </Button>
      }
    >
      {unassigned.length === 0 ? (
        <div className="card-elevated p-10 text-center">
          <p className="font-medium">Every subject has a confirmed trainer</p>
          <p className="mt-1 text-sm text-muted-foreground">
            New suggestions appear here when a course is created or a trainer profile changes.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {unassigned.map((course) => (
            <section key={course.id} className="card-elevated p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base">{course.title}</h2>
                  <p className="text-sm text-muted-foreground">{course.subject}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.requiredSkills.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {recalculating
                  ? [0, 1, 2].map((i) => <li key={i} className="shimmer h-24 rounded-lg" />)
                  : (matches[course.id] ?? []).map((m, index) => (
                      <li key={m.trainerId} className="rounded-lg border border-border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-primary">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-medium">{m.trainer}</p>
                              <p className="text-xs text-muted-foreground">
                                {m.matchedSkills.map((s) => `${s.tag} (L${s.proficiency})`).join(" · ")}
                              </p>
                            </div>
                          </div>
                          {m.confirmed ? (
                            <Badge variant="secondary" className="bg-success/12 text-success">
                              Assigned
                            </Badge>
                          ) : (
                            <Button size="sm" onClick={() => confirm(course.id, m.trainerId)}>
                              Confirm assignment
                            </Button>
                          )}
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <Progress value={Math.round(m.score * 100)} className="h-2" />
                          <span className="w-12 shrink-0 text-right text-sm text-muted-foreground">
                            {Math.round(m.score * 100)}%
                          </span>
                        </div>
                      </li>
                    ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
