import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, FileText, Presentation, Download, CheckCircle, ExternalLink, HardDrive } from "lucide-react";
import { courseResources } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainee/resource-viewer")({
  head: () => ({
    meta: [
      { title: "Resource Library & Media Viewer — CapacityConnect Trainee" },
      { name: "description", content: "Access lecture recordings, slide decks, and study guides for your enrolled subjects." },
    ],
  }),
  component: ResourceViewer,
});

function ResourceViewer() {
  const [activeResource, setActiveResource] = useState(courseResources[0]);
  const [completedIds, setCompletedIds] = useState<string[]>(["res-1"]);

  function toggleComplete(id: string) {
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter((item) => item !== id));
    } else {
      setCompletedIds([...completedIds, id]);
      toast.success("Resource marked as completed!");
    }
  }

  return (
    <TraineeShell
      title="Course Resource Library"
      description="View video lectures (MP4), presentation decks (PPTX), and study manuals (PDF) uploaded by accredited trainers."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Media Player / Document Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border overflow-hidden">
            <div className="bg-black aspect-video flex items-center justify-center relative">
              {activeResource.type === "video" ? (
                <video
                  src={activeResource.url}
                  controls
                  className="w-full h-full object-contain"
                  poster="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white w-full h-full">
                  <FileText className="size-16 text-emerald-400 mb-3 animate-pulse" />
                  <h3 className="text-lg font-semibold">{activeResource.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeResource.format} Document • {activeResource.durationOrPages}
                  </p>
                  <Button
                    onClick={() => toast.info(`Opening ${activeResource.title} viewer...`)}
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <ExternalLink className="mr-1.5 size-4" /> Open Interactive Document Reader
                  </Button>
                </div>
              )}
            </div>

            <CardContent className="p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">
                    {activeResource.subjectTag}
                  </Badge>
                  <h2 className="text-xl font-bold mt-1">{activeResource.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Format: {activeResource.format} • Size: {activeResource.fileSizeMb} MB • Uploaded: {activeResource.uploadedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => toggleComplete(activeResource.id)}
                    variant={completedIds.includes(activeResource.id) ? "default" : "outline"}
                    className={completedIds.includes(activeResource.id) ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
                  >
                    <CheckCircle className="mr-1.5 size-4" />
                    {completedIds.includes(activeResource.id) ? "Completed" : "Mark Complete"}
                  </Button>

                  <Button variant="secondary" onClick={() => toast.success(`Downloading ${activeResource.title}...`)}>
                    <Download className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Playlist & Resource Selection */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Course Modules & Assets</span>
                <Badge variant="secondary" className="text-xs">
                  {completedIds.length}/{courseResources.length} Done
                </Badge>
              </CardTitle>
              <CardDescription>Select a resource below to stream or review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {courseResources.map((res) => {
                const isSelected = activeResource.id === res.id;
                const isDone = completedIds.includes(res.id);

                return (
                  <div
                    key={res.id}
                    onClick={() => setActiveResource(res)}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 font-medium"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {res.type === "video" ? (
                        <PlayCircle className="size-5 text-emerald-600" />
                      ) : res.type === "presentation" ? (
                        <Presentation className="size-5 text-sky-600" />
                      ) : (
                        <FileText className="size-5 text-amber-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold truncate text-foreground">{res.title}</p>
                        {isDone && <CheckCircle className="size-3.5 text-emerald-600 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {res.format} • {res.durationOrPages}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </TraineeShell>
  );
}
