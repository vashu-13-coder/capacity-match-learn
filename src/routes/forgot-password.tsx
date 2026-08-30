import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — CapacityConnect" },
      { name: "description", content: "Request a password reset link for your CapacityConnect account." },
      { property: "og:title", content: "Reset your password — CapacityConnect" },
      { property: "og:description", content: "Get a secure reset link by email." },
    ],
  }),
  component: ForgotPassword,
});

const schema = z.object({ email: z.string().trim().email("Enter a valid email").max(255) });

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <AuthShell
      title="Forgot your password?"
      description="We'll email you a secure link valid for 30 minutes."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm text-muted-foreground">
          If an account exists for that address, a reset link is on its way. Check your spam folder if
          it doesn't arrive within a few minutes.
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" required />
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
