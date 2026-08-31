import { createFileRoute, Link } from "@tanstack/react-router";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, FileCheck, Clock, ArrowRight, PlayCircle, Megaphone, CheckCircle2 } from "lucide-react";
import { traineeEnrollments, certificatesList, announcements, sampleAssessments } from "@/lib/mock-data";

export const Route = createFileRoute("/trainee/")({
  head: () => ({
    meta: [
      { title: "Trainee Dashboard — CapacityConnect" },
      { name: "description", content: "Track your corporate learning progress, upcoming assessments, and earned certificates." },
    ],
  }),
  component: TraineeDashboard,
});

function TraineeDashboard() {
  const activeCourses = traineeEnrollments.filter((c) => c.status === "in_progress");
  const completedCourses = traineeEnrollments.filter((c) => c.status === "completed");

  return (
    <TraineeShell
      title="Welcome back, Hannah!"
      description="Track your operational training progress, upcoming deadlines, and certification achievements."
      actions={
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
          <Link to="/trainee/catalog">Browse Catalog</Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Courses</CardTitle>
              <BookOpen className="size-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{traineeEnrollments.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{activeCourses.length} active in progress</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Course Completions</CardTitle>
              <CheckCircle2 className="size-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-emerald-600 font-medium mt-1">100% compliance rate</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Earned Certificates</CardTitle>
              <Award className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificatesList.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Verified org badge issued</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Assessment</CardTitle>
              <Clock className="size-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-rose-600 font-medium mt-1">Due in 5 days (5 Sep)</p>
            </CardContent>
          </Card>
        </div>

        {/* In Progress Courses */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Active Learning Tracks</h2>
              <Link to="/trainee/courses" className="text-xs font-medium text-emerald-600 hover:underline">
                View all courses
              </Link>
            </div>

            <div className="grid gap-4">
              {traineeEnrollments.map((course) => (
                <Card key={course.courseId} className="border-border hover:border-emerald-500/30 transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                            {course.subject}
                          </Badge>
                          {course.status === "completed" && (
                            <Badge className="bg-emerald-600 text-white text-[10px]">Completed</Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-base truncate">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">Instructor: {course.trainerName}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {course.status === "in_progress" ? (
                          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Link to="/trainee/resource-viewer">
                              <PlayCircle className="mr-1.5 size-4" /> Continue
                            </Link>
                          </Button>
                        ) : (
                          <Button asChild size="sm" variant="outline">
                            <Link to="/trainee/certificates">
                              <Award className="mr-1.5 size-4 text-amber-500" /> Certificate
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{course.progressPercent}%</span>
                      </div>
                      <Progress value={course.progressPercent} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Deadlines & Notices */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileCheck className="size-4 text-rose-500" />
                  Upcoming Assessment
                </CardTitle>
                <CardDescription>Timed exam deadline countdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-rose-200 bg-rose-50/50 dark:border-rose-900/50 dark:bg-rose-950/20 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-rose-700 dark:text-rose-400">Due 5 Sep 2026</span>
                    <Badge variant="destructive" className="text-[10px]">15 Mins</Badge>
                  </div>
                  <h4 className="font-semibold text-sm">SQL & Operational Analytics Competency Test</h4>
                  <p className="text-xs text-muted-foreground">4 questions • 75% passing threshold required</p>
                  <Button asChild size="sm" className="w-full mt-2 bg-rose-600 hover:bg-rose-700 text-white font-medium">
                    <Link to="/trainee/assessment">Start Assessment Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Megaphone className="size-4 text-emerald-600" />
                  Organization Notices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {announcements.slice(0, 2).map((notice) => (
                  <div key={notice.id} className="text-xs space-y-1 pb-2 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{notice.title}</span>
                      <span className="text-[10px] text-muted-foreground">{notice.publishedAt}</span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">{notice.body}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TraineeShell>
  );
}
