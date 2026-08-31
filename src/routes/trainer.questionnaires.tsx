import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrainerShell } from "@/components/layout/TrainerShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileQuestion, Plus, Trash2, Save, Clock, CheckCircle2 } from "lucide-react";
import { sampleAssessments, courses } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/questionnaires")({
  head: () => ({
    meta: [
      { title: "Questionnaire Builder — CapacityConnect Trainer" },
      { name: "description", content: "Create and edit auto-timed MCQ question sets with configurable pass scores." },
    ],
  }),
  component: QuestionnaireBuilder,
});

function QuestionnaireBuilder() {
  const [assessment, setAssessment] = useState(sampleAssessments["asm-c1"]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [correctIdx, setCorrectIdx] = useState(0);

  function handleAddQuestion() {
    if (!newQuestionText.trim() || opts.some((o) => !o.trim())) {
      toast.error("Please fill in question text and all 4 options.");
      return;
    }

    const newQ = {
      id: `q-${Date.now()}`,
      questionText: newQuestionText,
      options: [...opts],
      correctOptionIndex: correctIdx,
      explanation: "Added by trainer during curriculum review.",
    };

    setAssessment({
      ...assessment,
      totalQuestions: assessment.questions.length + 1,
      questions: [...assessment.questions, newQ],
    });

    setNewQuestionText("");
    setOpts(["", "", "", ""]);
    toast.success("New question added to questionnaire!");
  }

  function handleDeleteQuestion(id: string) {
    setAssessment({
      ...assessment,
      totalQuestions: assessment.questions.length - 1,
      questions: assessment.questions.filter((q) => q.id !== id),
    });
    toast.info("Question deleted.");
  }

  function handleSaveAll() {
    toast.success("Questionnaire saved and published to trainee portal!");
  }

  return (
    <TrainerShell
      title="Questionnaire & MCQ Builder"
      description="Design subject questionnaires, configure auto-timed deadlines, and set passing thresholds."
      actions={
        <Button onClick={handleSaveAll} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
          <Save className="mr-1.5 size-4" /> Save & Publish Exam
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Exam Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileQuestion className="size-4 text-sky-600" /> Exam Configuration
            </CardTitle>
            <CardDescription>Configure rules and thresholds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Target Course</Label>
              <Select value={assessment.courseId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Questionnaire Title</Label>
              <Input
                value={assessment.title}
                onChange={(e) => setAssessment({ ...assessment, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Time Limit (Mins)</Label>
                <Input
                  type="number"
                  value={assessment.timeLimitMinutes}
                  onChange={(e) => setAssessment({ ...assessment, timeLimitMinutes: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Pass Score (%)</Label>
                <Input
                  type="number"
                  value={assessment.passingScorePercent}
                  onChange={(e) => setAssessment({ ...assessment, passingScorePercent: Number(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Addition & List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Question Card */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Add New MCQ Question</CardTitle>
              <CardDescription>Enter question text, options, and select correct answer index</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Question Text</Label>
                <Textarea
                  placeholder="e.g. What is the mandatory immediate safety requirement for Class 3 flammable liquids?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {opts.map((opt, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <Label className="text-xs">Option {i + 1}</Label>
                      {correctIdx === i && <Badge className="bg-emerald-600 text-[10px]">Correct Answer</Badge>}
                    </div>
                    <Input
                      placeholder={`Choice ${i + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const copy = [...opts];
                        copy[i] = e.target.value;
                        setOpts(copy);
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs shrink-0">Correct Answer:</Label>
                <Select value={String(correctIdx)} onValueChange={(val) => setCorrectIdx(Number(val))}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {opts.map((_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        Option {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddQuestion} className="ml-auto bg-sky-600 hover:bg-sky-700 text-white">
                  <Plus className="mr-1.5 size-4" /> Add Question
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Question List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Current Question Set ({assessment.questions.length})</h3>
            {assessment.questions.map((q, idx) => (
              <Card key={q.id} className="border-border">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm">
                      Q{idx + 1}. {q.questionText}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 shrink-0"
                      onClick={() => handleDeleteQuestion(q.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded border ${
                          optIdx === q.correctOptionIndex
                            ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {optIdx + 1}. {opt}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TrainerShell>
  );
}
