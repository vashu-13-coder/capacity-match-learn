import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ArrowRight, ArrowLeft, FileCheck } from "lucide-react";
import { sampleAssessments } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainee/assessment")({
  head: () => ({
    meta: [
      { title: "MCQ Assessment Engine — CapacityConnect Trainee" },
      { name: "description", content: "Auto-timed subject MCQ exam interface." },
    ],
  }),
  component: TraineeAssessment,
});

function TraineeAssessment() {
  const navigate = useNavigate();
  const assessment = sampleAssessments["asm-c1"]; // EHS Exam Demo
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(assessment.timeLimitMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmittedRef = useRef(false);

  const handleSubmit = useCallback(() => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setIsSubmitting(true);

    let correctCount = 0;
    assessment.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / assessment.questions.length) * 100);
    const passed = scorePercent >= assessment.passingScorePercent;

    toast.success("Assessment submitted successfully!");
    void navigate({
      to: "/trainee/results",
      search: { score: scorePercent, passed: passed ? "true" : "false", correct: correctCount, total: assessment.questions.length },
    });
  }, [assessment, userAnswers, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      if (!hasSubmittedRef.current) {
        toast.warning("Time limit expired! Auto-submitting assessment...");
        handleSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, handleSubmit]);

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const currentQ = assessment.questions[currentIdx];

  function handleSelectOption(optIdx: number) {
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
  }

  return (
    <TraineeShell
      title="Interactive Assessment Engine"
      description="Answer all subject questions prior to timer expiration. Results are calculated instantly upon submission."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Bar with Countdown & Progress */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
          <div>
            <Badge variant="outline" className="text-xs uppercase font-bold text-emerald-600">
              {assessment.subject} Track
            </Badge>
            <h2 className="text-lg font-bold truncate mt-0.5">{assessment.title}</h2>
            <p className="text-xs text-muted-foreground">
              Question {currentIdx + 1} of {assessment.questions.length} • Passing score: {assessment.passingScorePercent}%
            </p>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm shrink-0 ${
              timeLeftSeconds < 180
                ? "border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-950/50 animate-pulse"
                : "border-border bg-accent text-foreground"
            }`}
          >
            <Clock className="size-4" />
            <span>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Question Switcher Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {assessment.questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`size-9 rounded-lg font-semibold text-xs transition-all ${
                  isCurrent
                    ? "bg-emerald-600 text-white ring-2 ring-emerald-500/50"
                    : isAnswered
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300"
                    : "bg-accent text-muted-foreground border border-border hover:bg-accent/80"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold leading-relaxed">
              <span className="text-emerald-600 font-bold mr-2">Q{currentIdx + 1}.</span>
              {currentQ.questionText}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <RadioGroup
              value={userAnswers[currentQ.id] !== undefined ? String(userAnswers[currentQ.id]) : ""}
              onValueChange={(val) => handleSelectOption(Number(val))}
              className="space-y-3"
            >
              {currentQ.options.map((option, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 font-medium"
                        : "border-border hover:bg-accent/60"
                    }`}
                  >
                    <RadioGroupItem value={String(optIdx)} id={`opt-${optIdx}`} />
                    <Label htmlFor={`opt-${optIdx}`} className="cursor-pointer text-sm font-medium flex-1">
                      {option}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-border pt-4">
            <Button
              variant="outline"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => prev - 1)}
            >
              <ArrowLeft className="mr-1.5 size-4" /> Previous
            </Button>

            {currentIdx < assessment.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentIdx((prev) => prev + 1)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Next Question <ArrowRight className="ml-1.5 size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                <FileCheck className="mr-1.5 size-4" /> Submit Assessment
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </TraineeShell>
  );
}
