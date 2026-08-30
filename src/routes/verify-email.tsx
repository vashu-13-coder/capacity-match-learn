import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — CapacityConnect" },
      {
        name: "description",
        content: "Confirm your email address to activate your CapacityConnect workspace.",
      },
      { property: "og:title", content: "Verify your email — CapacityConnect" },
      { property: "og:description", content: "One last step before you can sign in." },
    ],
  }),
  component: VerifyEmail,
});

function VerifyEmail() {
  return (
    <AuthShell
      title="Verify your email"
      description="Email verification is required before your first login."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      }
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
          <MailCheck className="size-6" aria-hidden />
        </span>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to your work email. Open it on this device to activate your
          workspace.
        </p>
        <Button variant="outline" onClick={() => toast.success("Verification email resent.")}>
          Resend verification email
        </Button>
      </div>
    </AuthShell>
  );
}
