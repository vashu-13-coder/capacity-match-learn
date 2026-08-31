import { createFileRoute, Link } from "@tanstack/react-router";
import { TrainerShell } from "@/components/layout/TrainerShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FolderKanban, Users, Sparkles, FileQuestion } from "lucide-react";
import { courses, currentTrainerProfile } from "@/lib/mock-data";

export const Route = createFileRoute("/trainer/courses")({
  head: () => ({
    meta: [
      { title: "Assigned Courses — CapacityConnect Trainer" },
      { name: "description", content: "Review course assignments and competency tag mappings." },
    ],
  }),
  component: TrainerAssignedCourses,
});

function TrainerAssignedCourses() {
  return (
    <TrainerShell
      title="Assigned Courses & Competency Tracks"
      description="Overview of subject areas assigned to you by organization administrators based on competency scoring."
    >
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-xs uppercase font-bold">
                    {course.subject}
                  </Badge>
                  <Badge className="bg-sky-600 text-white text-[10px]">
                    {course.trainer === currentTrainerProfile.name ? "Assigned Lead" : "Available Track"}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                <CardDescription className="text-xs">{course.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Required Skill Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {course.requiredSkills.map((skill) => (
                      <span key={skill} className="rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-2 py-0.5 text-xs font-mono">
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>Enrolled: <strong>{course.enrolled}</strong> Trainees</span>
                  <span>Completion: <strong>{course.completion}%</strong></span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link to="/trainer/library">
                      <FolderKanban className="mr-1.5 size-4" /> Manage Content
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-sky-600 hover:bg-sky-700 text-white flex-1">
                    <Link to="/trainer/questionnaires">
                      <FileQuestion className="mr-1.5 size-4" /> Edit Exam
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TrainerShell>
  );
}
