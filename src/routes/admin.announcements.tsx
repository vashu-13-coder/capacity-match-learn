import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Pin } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { announcements as seed, type Announcement } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/announcements")({
  head: () => ({
    meta: [
      { title: "Homepage Content Publisher — CapacityConnect" },
      {
        name: "description",
        content: "Publish notices, announcements and achievement highlights to your organization.",
      },
      { property: "og:title", content: "Homepage Content Publisher — CapacityConnect" },
      { property: "og:description", content: "Broadcast notices to trainees and trainers." },
    ],
  }),
  component: Announcements,
});

function Announcements() {
  const [items, setItems] = useState<Announcement[]>(seed);
  const [audience, setAudience] = useState<Announcement["audience"]>("All");
  const [pinned, setPinned] = useState(false);

  function publish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim().slice(0, 140);
    const body = String(data.get("body") ?? "").trim().slice(0, 1000);
    if (!title || !body) {
      toast.error("Title and message are required.");
      return;
    }
    setItems((prev) => [
      {
        id: `a${Date.now()}`,
        title,
        body,
        audience,
        pinned,
        publishedAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    form.reset();
    setPinned(false);
    toast.success("Announcement published and notifications dispatched.");
  }

  return (
    <AdminShell
      title="Homepage Content Publisher"
      description="Published notices appear on role dashboards and trigger in-app plus email notifications."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <form onSubmit={publish} className="card-elevated space-y-4 p-5 lg:col-span-2">
          <h2 className="text-base">New announcement</h2>
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" maxLength={140} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="body">Message</Label>
            <Textarea id="body" name="body" rows={5} maxLength={1000} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="audience">Audience</Label>
            <Select value={audience} onValueChange={(v) => setAudience(v as Announcement["audience"])}>
              <SelectTrigger id="audience">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Everyone</SelectItem>
                <SelectItem value="Trainees">Trainees</SelectItem>
                <SelectItem value="Trainers">Trainers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="pinned" className="font-normal">
              Pin to top of dashboards
            </Label>
            <Switch id="pinned" checked={pinned} onCheckedChange={setPinned} />
          </div>
          <Button type="submit" className="w-full">
            Publish announcement
          </Button>
        </form>

        <section className="space-y-4 lg:col-span-3">
          {items.map((a) => (
            <article key={a.id} className="card-elevated p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base">{a.title}</h2>
                {a.pinned && (
                  <Badge variant="secondary" className="bg-warning/15 text-warning">
                    <Pin className="size-3" /> Pinned
                  </Badge>
                )}
                <Badge variant="outline" className="ml-auto">
                  {a.audience}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              <p className="mt-3 text-xs text-muted-foreground">Published {a.publishedAt}</p>
            </article>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
