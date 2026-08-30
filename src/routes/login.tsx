import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CapacityConnect" },
      { name: "description", content: "Sign in to your CapacityConnect organization workspace." },
      { property: "og:title", content: "Log in — CapacityConnect" },
      { property: "og:description", content: "Access your learning portal." },
    ],
  }),
  component: Login,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid work email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

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
    setPending(true);
    toast.success("Signed in as organization administrator");
    void navigate({ to: "/admin" });
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in with your work email to continue."
      footer={
        <>
          New organization?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Create a workspace
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" maxLength={255} required />
          {errors["email"] && (
            <p role="alert" className="text-sm text-destructive">
              {errors["email"]}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" autoComplete="current-password" required />
          {errors["password"] && (
            <p role="alert" className="text-sm text-destructive">
              {errors["password"]}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </AuthShell>
  );
}
