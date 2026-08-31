import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Compass, BookOpen, User, Check, Sparkles } from "lucide-react";
import { courses } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainee/catalog")({
  head: () => ({
    meta: [
      { title: "Course Catalog — CapacityConnect Trainee" },
      { name: "description", content: "Browse and enroll in available operational and competency development courses." },
    ],
  }),
  component: CourseCatalog,
});

function CourseCatalog() {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [enrolledIds, setEnrolledIds] = useState<string[]>(["c1", "c2", "c3"]);

  const subjects = ["all", "EHS", "Analytics", "Leadership", "Quality"];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === "all" || c.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  function handleEnroll(courseId: string, courseTitle: string) {
    if (enrolledIds.includes(courseId)) return;
    setEnrolledIds([...enrolledIds, courseId]);
    toast.success(`Successfully enrolled in "${courseTitle}"`);
  }

  return (
    <TraineeShell
      title="Course Catalog"
      description="Explore available corporate training modules and enroll in subject tracks matching your skills."
    >
      <div className="space-y-6">
        {/* Search & Subject Filter Header */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search courses or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {subjects.map((sub) => (
              <Button
                key={sub}
                variant={selectedSubject === sub ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject(sub)}
                className={selectedSubject === sub ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
              >
                {sub === "all" ? "All Subjects" : sub}
              </Button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledIds.includes(course.id);

            return (
              <Card key={course.id} className="flex flex-col justify-between border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-xs uppercase font-medium">
                      {course.subject}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {course.level || "Intermediate"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-snug">{course.title}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2 mt-1">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="size-3.5 shrink-0" />
                    <span>Instructor: {course.trainer || "Assigned Specialist"}</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Required Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {course.requiredSkills.map((skill) => (
                        <span key={skill} className="rounded bg-accent px-1.5 py-0.5 text-[10px] text-accent-foreground font-mono">
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-border pt-4">
                  {isEnrolled ? (
                    <Button disabled variant="outline" className="w-full text-emerald-600 border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20">
                      <Check className="mr-1.5 size-4" /> Enrolled
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEnroll(course.id, course.title)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                    >
                      <Sparkles className="mr-1.5 size-4" /> Enroll Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </TraineeShell>
  );
}
