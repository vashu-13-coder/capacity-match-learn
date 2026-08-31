import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrainerShell } from "@/components/layout/TrainerShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { UserCheck, Sparkles, Plus, Trash2, Save, Award } from "lucide-react";
import { currentTrainerProfile, type TrainerSkill } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/profile")({
  head: () => ({
    meta: [
      { title: "Trainer Competency Profile — CapacityConnect" },
      { name: "description", content: "Manage skill proficiency ratings (1-5) for automated competency matching." },
    ],
  }),
  component: TrainerCompetencyProfile,
});

function TrainerCompetencyProfile() {
  const [profile, setProfile] = useState(currentTrainerProfile);
  const [skills, setSkills] = useState<TrainerSkill[]>(currentTrainerProfile.skills);
  const [newTag, setNewTag] = useState("");
  const [newProf, setNewProf] = useState(4);

  function handleAddSkill() {
    if (!newTag.trim()) return;
    const tag = newTag.toLowerCase().replace(/\s+/g, "-");
    if (skills.some((s) => s.tag === tag)) return;

    setSkills([...skills, { tag, proficiency: newProf }]);
    setNewTag("");
    toast.success(`Skill #${tag} with proficiency ${newProf}/5 added. Competency recalculation queued!`);
  }

  function handleRemoveSkill(tag: string) {
    setSkills(skills.filter((s) => s.tag !== tag));
  }

  function handleProfChange(tag: string, val: number) {
    setSkills(skills.map((s) => (s.tag === tag ? { ...s, proficiency: val } : s)));
  }

  function handleSaveProfile() {
    toast.success("Trainer profile updated! Automated Competency Engine trigger fired.");
  }

  return (
    <TrainerShell
      title="Trainer Competency Profile & Skill Ratings"
      description="Input skill tags with 1–5 proficiency ratings. The Competency Mapping Engine uses these to auto-suggest course assignments."
      actions={
        <Button onClick={handleSaveProfile} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
          <Save className="mr-1.5 size-4" /> Save Competency Profile
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="size-5 text-sky-600" /> Instructor Profile Details
            </CardTitle>
            <CardDescription>Public credentials shown on assigned course pages</CardDescription>
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
                <Label>Title / Role</Label>
                <Input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Years of Industry Experience</Label>
                <Input
                  type="number"
                  value={profile.yearsExperience}
                  onChange={(e) => setProfile({ ...profile, yearsExperience: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Professional Bio</Label>
              <Textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>

            {/* Competency Skill Ratings 1-5 */}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-1.5 text-foreground">
                  <Sparkles className="size-4 text-sky-600" /> Skill Proficiency Vector (1–5 Scale)
                </h3>
                <span className="text-xs text-muted-foreground">{skills.length} Tagged Skills</span>
              </div>

              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.tag} className="p-3 rounded-lg border border-border space-y-2 bg-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs text-sky-600 border-sky-500/30">
                          #{skill.tag}
                        </Badge>
                        <span className="text-xs font-bold text-foreground">Level {skill.proficiency} / 5</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 h-7 w-7"
                        onClick={() => handleRemoveSkill(skill.tag)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>

                    <Slider
                      value={[skill.proficiency]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={([val]) => handleProfChange(skill.tag, val)}
                    />
                  </div>
                ))}
              </div>

              {/* Add New Skill Tag */}
              <div className="p-3 rounded-lg border border-border bg-accent/40 space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Add Skill Vector</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Skill tag (e.g. iso-45001)..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    className="w-20"
                    value={newProf}
                    onChange={(e) => setNewProf(Number(e.target.value))}
                  />
                  <Button onClick={handleAddSkill} className="bg-sky-600 hover:bg-sky-700 text-white">
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications Sidebar */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="size-4 text-amber-500" /> Instructor Accreditation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.certifications.map((cert, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-border text-xs font-medium bg-accent/30 flex items-center gap-2">
                <Award className="size-4 text-amber-500 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TrainerShell>
  );
}
