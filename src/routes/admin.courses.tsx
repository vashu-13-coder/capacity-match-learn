import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { courses as seedCourses, type Course } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/courses")({
  head: () => ({
    meta: [
      { title: "Course Management — CapacityConnect" },
      {
        name: "description",
        content: "Create, publish and archive courses, and assign trainers to each subject.",
      },
      { property: "og:title", content: "Course Management — CapacityConnect" },
      { property: "og:description", content: "Manage your organization's course catalog." },
    ],
  }),
  component: CourseManagement,
});

function CourseManagement() {
  const [rows, setRows] = useState<Course[]>(seedCourses);
  const [open, setOpen] = useState(false);

  function createCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get("title") ?? "").trim().slice(0, 120);
    const subject = String(data.get("subject") ?? "").trim().slice(0, 60);
    const skills = String(data.get("skills") ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 12);
    if (!title || !subject) {
      toast.error("Title and subject are required.");
      return;
    }
    setRows((prev) => [
      {
        id: `c${prev.length + 1}${Date.now()}`,
        title,
        subject,
        trainer: null,
        enrolled: 0,
        completion: 0,
        status: "draft",
        requiredSkills: skills,
      },
      ...prev,
    ]);
    setOpen(false);
    toast.success("Course created as draft. Competency matching queued.");
  }

  function archive(id: string) {
    setRows((prev) => prev.map((c) => (c.id === id ? { ...c, status: "archived" } : c)));
    toast.success("Course archived.");
  }

  return (
    <AdminShell
      title="Course Management"
      description="Courses declare the competencies a trainer must hold."
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" /> New course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create course</DialogTitle>
              <DialogDescription>
                Required skill tags feed the competency mapping engine.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createCourse} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Course title</Label>
                <Input id="title" name="title" maxLength={120} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" maxLength={60} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="skills">Required skill tags</Label>
                <Input id="skills" name="skills" placeholder="sql, statistics, dmaic" maxLength={200} />
              </div>
              <DialogFooter>
                <Button type="submit">Create course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map((c) => (
          <article key={c.id} className="card-elevated p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base">{c.title}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.subject}</p>
              </div>
              <Badge
                variant="secondary"
                className={
                  c.status === "published"
                    ? "bg-success/12 text-success"
                    : c.status === "draft"
                      ? "bg-warning/15 text-warning"
                      : "bg-muted text-muted-foreground"
                }
              >
                {c.status}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.requiredSkills.map((s) => (
                <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                  {s}
                </span>
              ))}
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Trainer</dt>
                <dd className={c.trainer ? "" : "text-warning"}>{c.trainer ?? "Unassigned"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Enrolled</dt>
                <dd>{c.enrolled}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Completion</span>
                <span>{c.completion}%</span>
              </div>
              <Progress value={c.completion} className="mt-1.5" />
            </div>

            {c.status !== "archived" && (
              <Button variant="outline" size="sm" className="mt-4" onClick={() => archive(c.id)}>
                Archive course
              </Button>
            )}
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
