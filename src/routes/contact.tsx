import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MarketingPage } from "@/components/marketing/MarketingPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sales — CapacityConnect" },
      {
        name: "description",
        content:
          "Talk to the CapacityConnect team about enterprise rollout, migration and pricing for your corporate learning program.",
      },
      { property: "og:title", content: "Contact Sales — CapacityConnect" },
      {
        property: "og:description",
        content: "Reach the CapacityConnect team about enterprise deployment and pricing.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(1, "Company is required").max(120),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    e.currentTarget.reset();
    toast.success("Thanks — our team will reply within one business day.");
  }

  return (
    <MarketingPage title="Contact our team" intro="Tell us about your training program and we'll map a rollout plan.">
      <div className="mx-auto max-w-xl px-4 py-16">
        <form onSubmit={onSubmit} noValidate className="card-elevated space-y-4 p-6">
          <Field id="name" label="Full name" error={errors["name"]}>
            <Input id="name" name="name" maxLength={100} autoComplete="name" required />
          </Field>
          <Field id="email" label="Work email" error={errors["email"]}>
            <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" required />
          </Field>
          <Field id="company" label="Company" error={errors["company"]}>
            <Input id="company" name="company" maxLength={120} autoComplete="organization" required />
          </Field>
          <Field id="message" label="How can we help?" error={errors["message"]}>
            <Textarea id="message" name="message" rows={5} maxLength={1000} required />
          </Field>
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>
      </div>
    </MarketingPage>
  );
}

function Field({
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
