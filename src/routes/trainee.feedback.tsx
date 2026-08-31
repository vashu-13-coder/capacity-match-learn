import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { courses, courseFeedbackList } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainee/feedback")({
  head: () => ({
    meta: [
      { title: "Course Feedback — CapacityConnect Trainee" },
      { name: "description", content: "Submit course ratings and trainer feedback." },
    ],
  }),
  component: CourseFeedbackPage,
});

function CourseFeedbackPage() {
  const [selectedCourseId, setSelectedCourseId] = useState("c1");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState(courseFeedbackList);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter your feedback comments.");
      return;
    }

    const newFeedback = {
      id: `fb-${Date.now()}`,
      courseId: selectedCourseId,
      traineeName: "Hannah Berg",
      rating,
      comment,
      submittedAt: "Just now",
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setComment("");
    toast.success("Thank you! Your course feedback has been recorded.");
  }

  return (
    <TraineeShell
      title="Course Ratings & Feedback"
      description="Provide constructive reviews for completed courses and trainer instruction quality."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Feedback Form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="size-5 text-emerald-600" /> Submit Course Review
            </CardTitle>
            <CardDescription>Select a course and rate instruction quality</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Course</label>
                <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.title} ({c.subject})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`size-6 ${
                          star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-bold ml-2 text-foreground">{rating} / 5 Stars</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Review & Suggestions</label>
                <Textarea
                  placeholder="Share your experience regarding course content, clarity, pace, and trainer effectiveness..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                <Send className="mr-1.5 size-4" /> Submit Course Review
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Feedback Stream */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Organization Reviews</CardTitle>
            <CardDescription>Peer feedback submitted across corporate subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="rounded-lg border border-border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{fb.traineeName}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{fb.comment}</p>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-1">
                  <span>Industrial Safety Fundamentals</span>
                  <span>{fb.submittedAt}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TraineeShell>
  );
}
