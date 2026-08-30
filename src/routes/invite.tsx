import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/invite")({
  head: () => ({
    meta: [
      { title: "Accept your invitation — CapacityConnect" },
      {
        name: "description",
        content: "Complete your CapacityConnect profile to join your organization's learning portal.",
      },
      { property: "og:title", content: "Accept your invitation — CapacityConnect" },
      { property: "og:description", content: "Finish setting up your invited account." },
    ],
  }),
  component: InvitedSignup,
});

const schema = z
  .object({
    name: z.string().trim().min(2, "Your name is required").max(100),
    password: z.string().min(8, "Use at least 8 characters").max(128),
    confirm: z.string().min(8, "Confirm your password").max(128),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

function InvitedSignup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] = i.message;
      setErrors(next);
      return;
    }
    setErrors({});
    toast.success("Account created — pending administrator approval.");
    void navigate({ to: "/login" });
  }

  return (
    <AuthShell
      title="You've been invited"
      description="Northwind Industries invited you to join their learning portal."
    >
      <div className="mb-5 flex items-center gap-2 rounded-lg border border-border bg-muted/60 p-3 text-sm">
        <span className="text-muted-foreground">sofia.almeida@northwind.co</span>
        <Badge variant="secondary" className="ml-auto">
          Trainee
        </Badge>
      </div>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" maxLength={100} autoComplete="name" required />
          {errors["name"] && <p role="alert" className="text-sm text-destructive">{errors["name"]}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Create password</Label>
          <Input id="password" name="password" type="password" autoComplete="new-password" required />
          {errors["password"] && (
            <p role="alert" className="text-sm text-destructive">{errors["password"]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required />
          {errors["confirm"] && (
            <p role="alert" className="text-sm text-destructive">{errors["confirm"]}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Join organization
        </Button>
      </form>
    </AuthShell>
  );
}
