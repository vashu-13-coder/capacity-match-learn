import { createFileRoute, Link } from "@tanstack/react-router";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlayCircle, Award, FileCheck, CheckCircle2, Clock } from "lucide-react";
import { traineeEnrollments } from "@/lib/mock-data";

export const Route = createFileRoute("/trainee/courses")({
  head: () => ({
    meta: [
      { title: "My Enrolled Courses — CapacityConnect Trainee" },
      { name: "description", content: "Access your enrolled learning programs, lecture materials, and completion progress." },
    ],
  }),
  component: MyCourses,
});

function MyCourses() {
  return (
    <TraineeShell
      title="Enrolled Courses"
      description="Manage active courses, complete required lecture modules, and unlock course completion certificates."
      actions={
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link to="/trainee/catalog">Explore New Courses</Link>
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-6">
          {traineeEnrollments.map((course) => (
            <Card key={course.courseId} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs uppercase font-semibold">
                      {course.subject}
                    </Badge>
                    {course.status === "completed" ? (
                      <Badge className="bg-emerald-600 text-white text-xs">
                        <CheckCircle2 className="mr-1 size-3" /> Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="mr-1 size-3 text-amber-500" /> In Progress
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">Enrolled: {course.enrolledAt}</span>
                </div>
                <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                <CardDescription>Instructor: {course.trainerName}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Overall Completion</span>
                    <span className="text-foreground">{course.progressPercent}%</span>
                  </div>
                  <Progress value={course.progressPercent} className="h-2.5" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Deadline: </span>
                      <span className="font-medium text-foreground">{course.nextDeadline}</span>
                    </div>
                    {course.assessmentScore && (
                      <div>
                        <span className="text-muted-foreground">Exam Score: </span>
                        <span className="font-bold text-emerald-600">{course.assessmentScore}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/trainee/resource-viewer">
                        <PlayCircle className="mr-1.5 size-4 text-emerald-600" /> View Lectures & PPTs
                      </Link>
                    </Button>

                    <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Link to="/trainee/assessment">
                        <FileCheck className="mr-1.5 size-4" /> Take Assessment
                      </Link>
                    </Button>

                    {course.certificateId && (
                      <Button asChild size="sm" variant="outline" className="border-amber-500/40 text-amber-600">
                        <Link to="/trainee/certificates">
                          <Award className="mr-1.5 size-4 text-amber-500" /> View Certificate
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TraineeShell>
  );
}
