import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldCheck } from "lucide-react";
import { sampleAssessments } from "@/lib/mock-data";

export const Route = createFileRoute("/trainee/results")({
  validateSearch: (search: Record<string, unknown>) => ({
    score: Number(search.score ?? 92),
    passed: String(search.passed ?? "true") === "true",
    correct: Number(search.correct ?? 4),
    total: Number(search.total ?? 5),
  }),
  head: () => ({
    meta: [
      { title: "Assessment Results — CapacityConnect Trainee" },
      { name: "description", content: "Instant auto-scored assessment results breakdown." },
    ],
  }),
  component: AssessmentResults,
});

function AssessmentResults() {
  const { score, passed, correct, total } = useSearch({ from: "/trainee/results" });
  const assessment = sampleAssessments["asm-c1"];

  return (
    <TraineeShell
      title="Assessment Performance Report"
      description="Immediate auto-scored evaluation results and certification eligibility report."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-border text-center overflow-hidden">
          <div className={`p-8 ${passed ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40"}`}>
            {passed ? (
              <CheckCircle2 className="size-16 text-emerald-600 mx-auto mb-2" />
            ) : (
              <XCircle className="size-16 text-rose-600 mx-auto mb-2" />
            )}
            <Badge className={passed ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}>
              {passed ? "EXAM PASSED" : "RETAKE REQUIRED"}
            </Badge>
            <h2 className="text-3xl font-extrabold mt-3">{score}% Final Score</h2>
            <p className="text-sm text-muted-foreground mt-1">
              You correctly answered {correct} out of {total} questions. (Passing threshold: {assessment.passingScorePercent}%)
            </p>
          </div>

          <CardContent className="p-6 space-y-4 text-left">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Answer Key Analysis</h3>
            <div className="space-y-3">
              {assessment.questions.map((q, idx) => (
                <div key={q.id} className="rounded-lg border border-border p-3.5 space-y-1.5 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">
                      Q{idx + 1}. {q.questionText}
                    </p>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      Correct Answer: Option {q.correctOptionIndex + 1}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground bg-accent/50 p-2 rounded">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap items-center justify-between border-t border-border p-5 bg-card">
            <Button asChild variant="outline">
              <Link to="/trainee/courses">
                <RotateCcw className="mr-1.5 size-4" /> Back to My Courses
              </Link>
            </Button>

            {passed ? (
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                <Link to="/trainee/certificates">
                  <Award className="mr-1.5 size-4 text-amber-300" /> Issue Certificate Now
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                <Link to="/trainee/assessment">Retake Assessment</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </TraineeShell>
  );
}
