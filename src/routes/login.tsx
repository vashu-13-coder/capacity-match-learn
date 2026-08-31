import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import type { Role } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CapacityConnect" },
      { name: "description", content: "Sign in to your CapacityConnect role workspace." },
      { property: "og:title", content: "Log in — CapacityConnect" },
      { property: "og:description", content: "Access your enterprise learning portal." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>("trainee");
  const [email, setEmail] = useState("hannah.berg@northwind.co");
  const [password, setPassword] = useState("password123");

  const demoAccounts = {
    admin: { email: "kenji.watanabe@northwind.co", target: "/admin" as const, label: "Admin Workspace" },
    trainer: { email: "daniel.okoye@northwind.co", target: "/trainer" as const, label: "Trainer Workspace" },
    trainee: { email: "hannah.berg@northwind.co", target: "/trainee" as const, label: "Trainee Workspace" },
  };

  function selectRolePreset(role: Role) {
    setSelectedRole(role);
    setEmail(demoAccounts[role].email);
    setPassword("password123");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const targetRoute = selectedRole === "admin" ? "/admin" : selectedRole === "trainer" ? "/trainer" : "/trainee";
    const roleLabel = selectedRole === "admin" ? "Organization Administrator" : selectedRole === "trainer" ? "Accredited Trainer" : "Trainee";

    toast.success(`Signed in as ${roleLabel}`);
    void navigate({ to: targetRoute });
  }

  return (
    <AuthShell
      title="Welcome to CapacityConnect"
      description="Sign in to your corporate learning portal or select a role workspace below."
      footer={
        <>
          New organization?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Create a workspace
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        {/* Instant One-Click Workspace Launchers */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            ⚡ One-Click Direct Portal Access
          </p>
          <div className="grid gap-2">
            <Button asChild className="w-full justify-between bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              <Link to="/trainee">
                <span className="flex items-center gap-2">
                  <GraduationCap className="size-4" /> Enter Trainee Portal
                </span>
                <ArrowRight className="size-4 opacity-80" />
              </Link>
            </Button>

            <Button asChild className="w-full justify-between bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              <Link to="/trainer">
                <span className="flex items-center gap-2">
                  <Briefcase className="size-4" /> Enter Trainer Portal
                </span>
                <ArrowRight className="size-4 opacity-80" />
              </Link>
            </Button>

            <Button asChild className="w-full justify-between bg-amber-600 hover:bg-amber-700 text-white font-semibold">
              <Link to="/admin">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4" /> Enter Admin Portal
                </span>
                <ArrowRight className="size-4 opacity-80" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <span className="absolute inset-x-0 border-t border-border" />
          <span className="relative bg-card px-3 text-xs uppercase text-muted-foreground font-semibold">
            Or Sign In Manually
          </span>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => selectRolePreset("trainee")}
              className={`flex-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                selectedRole === "trainee" ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold" : "border-border"
              }`}
            >
              Trainee Mode
            </button>
            <button
              type="button"
              onClick={() => selectRolePreset("trainer")}
              className={`flex-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                selectedRole === "trainer" ? "border-sky-500 bg-sky-50 text-sky-900 font-bold" : "border-border"
              }`}
            >
              Trainer Mode
            </button>
            <button
              type="button"
              onClick={() => selectRolePreset("admin")}
              className={`flex-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                selectedRole === "admin" ? "border-amber-500 bg-amber-50 text-amber-900 font-bold" : "border-border"
              }`}
            >
              Admin Mode
            </button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="w-full font-semibold">
            Log in to Workspace
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}
