import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your organization — CapacityConnect" },
      {
        name: "description",
        content:
          "Set up a CapacityConnect workspace for your organization and invite trainers and trainees.",
      },
      { property: "og:title", content: "Create your organization — CapacityConnect" },
      { property: "og:description", content: "Start a 14-day organization trial." },
    ],
  }),
  component: Signup,
});

const schema = z.object({
  organization: z.string().trim().min(2, "Organization name is required").max(120),
  name: z.string().trim().min(2, "Your name is required").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  password: z.string().min(8, "Use at least 8 characters").max(128),
});

function Signup() {
  const navigate = useNavigate();
  const [size, setSize] = useState("51-250");
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
    toast.success("Workspace created. Check your inbox to verify your email.");
    void navigate({ to: "/verify-email" });
  }

  return (
    <AuthShell
      title="Create your organization workspace"
      description="You'll become the first administrator and can invite your team next."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <FormField id="organization" label="Organization name" error={errors["organization"]}>
          <Input id="organization" name="organization" maxLength={120} autoComplete="organization" required />
        </FormField>
        <FormField id="name" label="Your full name" error={errors["name"]}>
          <Input id="name" name="name" maxLength={100} autoComplete="name" required />
        </FormField>
        <FormField id="email" label="Work email" error={errors["email"]}>
          <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" required />
        </FormField>
        <FormField id="password" label="Password" error={errors["password"]}>
          <Input id="password" name="password" type="password" autoComplete="new-password" required />
        </FormField>
        <div className="space-y-1.5">
          <Label htmlFor="size">Workforce size</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger id="size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-50">1–50 employees</SelectItem>
              <SelectItem value="51-250">51–250 employees</SelectItem>
              <SelectItem value="251+">251+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Create workspace
        </Button>
        <p className="text-xs text-muted-foreground">
          By continuing you agree to our{" "}
          <Link to="/terms" className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
