import { createFileRoute, Link } from "@tanstack/react-router";
import { TrainerShell } from "@/components/layout/TrainerShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileQuestion, FolderKanban, Users, Sparkles, Plus, TrendingUp, CheckCircle2 } from "lucide-react";
import { courses, currentTrainerProfile, traineePerformanceList, sampleAssessments } from "@/lib/mock-data";

export const Route = createFileRoute("/trainer/")({
  head: () => ({
    meta: [
      { title: "Trainer Dashboard — CapacityConnect" },
      { name: "description", content: "Manage assigned courses, build MCQ questionnaires, and monitor trainee scores." },
    ],
  }),
  component: TrainerDashboard,
});

function TrainerDashboard() {
  const assignedCourses = courses.filter((c) => c.trainer === currentTrainerProfile.name || c.id === "c1");

  return (
    <TrainerShell
      title={`Welcome back, ${currentTrainerProfile.name.split(" ")[0]}!`}
      description="Manage assigned corporate training courses, publish study materials, and monitor trainee completion rates."
      actions={
        <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white font-medium">
          <Link to="/trainer/questionnaires">
            <Plus className="mr-1.5 size-4" /> Create MCQ Set
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assigned Courses</CardTitle>
              <BookOpen className="size-4 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedCourses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">EHS & Operational Safety</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Trainees</CardTitle>
              <Users className="size-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">130</div>
              <p className="text-xs text-emerald-600 font-medium mt-1">84% completion rate</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Questionnaires Built</CardTitle>
              <FileQuestion className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Sets</div>
              <p className="text-xs text-muted-foreground mt-1">Auto-timed & graded</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Competency Match</CardTitle>
              <Sparkles className="size-4 text-sky-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-sky-600 font-medium mt-1">Ranked #1 for EHS</p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Courses Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Your Assigned Courses</h2>
              <Link to="/trainer/courses" className="text-xs font-medium text-sky-600 hover:underline">
                View detail list
              </Link>
            </div>

            <div className="grid gap-4">
              {assignedCourses.map((course) => (
                <Card key={course.id} className="border-border">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-bold">
                            {course.subject}
                          </Badge>
                          <Badge className="bg-sky-600 text-white text-[10px]">Active Instructor</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mt-1">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">{course.enrolled} Enrolled Trainees • {course.completion}% Completion Rate</p>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link to="/trainer/library">Upload Content</Link>
                        </Button>
                        <Button asChild size="sm" className="bg-sky-600 hover:bg-sky-700 text-white">
                          <Link to="/trainer/trainees">View Scores</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Performance Summary Column */}
          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="size-4 text-sky-600" /> Trainee Performance Summary
                </CardTitle>
                <CardDescription>Recent assessment score submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {traineePerformanceList.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-border text-xs">
                    <div>
                      <p className="font-semibold text-foreground">{item.traineeName}</p>
                      <p className="text-[10px] text-muted-foreground">{item.courseTitle}</p>
                    </div>
                    <Badge className={item.status === "Passed" ? "bg-emerald-600" : "bg-amber-500"}>
                      {item.assessmentScore ? `${item.assessmentScore}%` : "In Progress"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TrainerShell>
  );
}
