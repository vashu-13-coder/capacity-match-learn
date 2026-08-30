import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BookOpen, Users, Award, ClipboardCheck } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  assessmentMix,
  courses,
  enrollmentTrend,
  organization,
  participationBySubject,
  users,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — CapacityConnect" },
      {
        name: "description",
        content: "Organization-wide training analytics: enrollments, completions and certifications.",
      },
      { property: "og:title", content: "Admin Dashboard — CapacityConnect" },
      { property: "og:description", content: "Learning analytics for your organization." },
    ],
  }),
  component: AdminDashboard,
});

const PIE_COLORS = ["var(--color-success)", "var(--color-destructive)", "var(--color-warning)"];

function AdminDashboard() {
  const pending = users.filter((u) => u.status === "pending").length;

  return (
    <AdminShell
      title="Admin Dashboard"
      description={`Training activity across ${organization.name}.`}
      actions={
        <Button asChild variant="outline">
          <Link to="/admin/users">{pending} pending approvals</Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={BookOpen} label="Active courses" value="12" delta="+2 this month" />
        <Stat icon={Users} label="Active enrollments" value="384" delta="+18% vs. July" />
        <Stat icon={Award} label="Certificates issued" value="148" delta="+31 this month" />
        <Stat icon={ClipboardCheck} label="Assessment completion" value="71%" delta="+6 pts" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="card-elevated p-5 lg:col-span-2">
          <h2 className="text-base">Enrollments vs. completions</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "10px",
                  }}
                />
                <Line type="monotone" dataKey="enrollments" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="completions" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card-elevated p-5">
          <h2 className="text-base">Assessment outcomes</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assessmentMix} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                  {assessmentMix.map((entry, i) => (
                    <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card-elevated p-5 lg:col-span-2">
          <h2 className="text-base">Participation rate by subject</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationBySubject}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="subject" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} unit="%" />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "10px",
                  }}
                />
                <Bar dataKey="rate" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card-elevated p-5">
          <h2 className="text-base">Course completion</h2>
          <ul className="mt-4 space-y-4">
            {courses
              .filter((c) => c.status === "published")
              .map((c) => (
                <li key={c.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate pr-3">{c.title}</span>
                    <span className="text-muted-foreground">{c.completion}%</span>
                  </div>
                  <Progress value={c.completion} className="mt-2" />
                </li>
              ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-success">{delta}</p>
    </div>
  );
}
