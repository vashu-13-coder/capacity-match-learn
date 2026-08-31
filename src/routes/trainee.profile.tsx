import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TraineeShell } from "@/components/layout/TraineeShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, UploadCloud, FileText, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { currentTraineeProfile } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainee/profile")({
  head: () => ({
    meta: [
      { title: "Trainee Profile & Credentials — CapacityConnect" },
      { name: "description", content: "Manage skills, qualifications, and uploaded compliance documents." },
    ],
  }),
  component: TraineeProfilePage,
});

function TraineeProfilePage() {
  const [profile, setProfile] = useState(currentTraineeProfile);
  const [newSkill, setNewSkill] = useState("");
  const [docs, setDocs] = useState(currentTraineeProfile.certificationsUploaded);

  function handleAddSkill() {
    if (!newSkill.trim()) return;
    const tag = newSkill.toLowerCase().replace(/\s+/g, "-");
    if (profile.skills.includes(tag)) return;
    setProfile({ ...profile, skills: [...profile.skills, tag] });
    setNewSkill("");
    toast.success(`Skill #${tag} added to competency matrix!`);
  }

  function handleRemoveSkill(tag: string) {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== tag) });
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const newDoc = {
      name: file.name,
      date: new Date().toISOString().split("T")[0],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };
    setDocs([newDoc, ...docs]);
    toast.success(`Document ${file.name} uploaded successfully.`);
  }

  return (
    <TraineeShell
      title="Trainee Profile & Credentials"
      description="Update your skills, academic background, and upload official certification documents for verification."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="size-5 text-emerald-600" /> Personal & Professional Details
            </CardTitle>
            <CardDescription>Verified corporate identity details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Work Email</Label>
                <Input value={profile.email} disabled className="bg-accent/50" />
              </div>
              <div className="space-y-1.5">
                <Label>Job Title</Label>
                <Input value={profile.jobTitle} onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Department</Label>
                <Input value={profile.department} onChange={(e) => setProfile({ ...profile, department: e.target.value })} />
              </div>
            </div>

            {/* Skills & Tag Management */}
            <div className="pt-4 border-t border-border space-y-3">
              <Label className="text-sm font-semibold">Competency Skill Tags</Label>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-2.5 py-1 text-xs gap-1 font-mono">
                    #{skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-destructive">
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 max-w-sm">
                <Input
                  placeholder="Add skill tag (e.g. six-sigma)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                />
                <Button onClick={handleAddSkill} variant="outline">
                  <Plus className="size-4" /> Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Document Box */}
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UploadCloud className="size-4 text-emerald-600" /> Upload Certificates
              </CardTitle>
              <CardDescription>PDF, DOCX up to 200 MB</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-emerald-500/50 transition-colors">
                <UploadCloud className="size-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs font-semibold text-foreground">Click to upload document</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">External OSHA, ISO, or degree verification</p>
                <Input type="file" onChange={handleFileUpload} className="hidden" id="doc-upload" accept=".pdf,.docx,.pptx" />
                <Button asChild size="sm" variant="outline" className="mt-3 text-xs">
                  <label htmlFor="doc-upload" className="cursor-pointer">Select File</label>
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Uploaded Verification Docs</p>
                {docs.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-accent/40 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="size-4 text-emerald-600 shrink-0" />
                      <span className="truncate font-medium">{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{doc.size}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TraineeShell>
  );
}
