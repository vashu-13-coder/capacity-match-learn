import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrainerShell } from "@/components/layout/TrainerShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderKanban, UploadCloud, PlayCircle, FileText, Presentation, Trash2, CheckCircle2 } from "lucide-react";
import { courseResources, courses } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/library")({
  head: () => ({
    meta: [
      { title: "Content Library Manager — CapacityConnect Trainer" },
      { name: "description", content: "Upload and manage course lectures, PPT decks, and study resources." },
    ],
  }),
  component: ContentLibraryManager,
});

function ContentLibraryManager() {
  const [resources, setResources] = useState(courseResources);
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState<"MP4" | "PPTX" | "PDF" | "DOCX">("MP4");
  const [courseId, setCourseId] = useState("c1");

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter resource title.");
      return;
    }

    const newRes = {
      id: `res-${Date.now()}`,
      courseId,
      title,
      type: format === "MP4" ? ("video" as const) : format === "PPTX" ? ("presentation" as const) : ("document" as const),
      format,
      durationOrPages: format === "MP4" ? "18 mins" : "24 slides/pages",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileSizeMb: 45.2,
      uploadedAt: "Just now",
      subjectTag: "EHS",
    };

    setResources([newRes, ...resources]);
    setTitle("");
    toast.success(`Resource "${title}" uploaded and tagged to course!`);
  }

  function handleDelete(id: string) {
    setResources(resources.filter((r) => r.id !== id));
    toast.info("Resource removed from library.");
  }

  return (
    <TrainerShell
      title="Content Library Manager"
      description="Upload pre-recorded lectures (MP4), presentation slide decks (PPTX), and PDFs (up to 200 MB limit)."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <UploadCloud className="size-4 text-sky-600" /> Upload Course Material
            </CardTitle>
            <CardDescription>Tagged by subject and course</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Target Course</Label>
                <Select value={courseId} onValueChange={setCourseId}>
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
                <Label>Material Title</Label>
                <Input
                  placeholder="e.g. Module 3: Chemical Containment & LOTO"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>File Format</Label>
                <Select value={format} onValueChange={(val) => setFormat(val as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MP4">MP4 Video Recording</SelectItem>
                    <SelectItem value="PPTX">PPTX Slide Presentation</SelectItem>
                    <SelectItem value="PDF">PDF Reference Manual</SelectItem>
                    <SelectItem value="DOCX">DOCX Guidebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                <UploadCloud className="size-6 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs font-medium">Select file (Max 200 MB)</p>
                <Input type="file" className="hidden" id="file-select" />
                <Button asChild size="sm" variant="outline" className="mt-2 text-xs">
                  <label htmlFor="file-select" className="cursor-pointer">Choose File</label>
                </Button>
              </div>

              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold">
                Upload & Tag Resource
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Content Library Stream */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-base">Published Course Resources ({resources.length})</h3>
          <div className="grid gap-3">
            {resources.map((res) => (
              <Card key={res.id} className="border-border">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center shrink-0">
                      {res.format === "MP4" ? (
                        <PlayCircle className="size-5" />
                      ) : res.format === "PPTX" ? (
                        <Presentation className="size-5" />
                      ) : (
                        <FileText className="size-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold">
                          {res.subjectTag}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{res.uploadedAt}</span>
                      </div>
                      <h4 className="font-semibold text-sm truncate mt-0.5">{res.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {res.format} • {res.durationOrPages} • {res.fileSizeMb} MB
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => handleDelete(res.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TrainerShell>
  );
}
