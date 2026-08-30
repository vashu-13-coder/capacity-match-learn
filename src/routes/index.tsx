import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Sparkles,
  BarChart3,
  FileBadge,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CapacityConnect — Enterprise Learning & Competency Platform" },
      {
        name: "description",
        content:
          "Multi-tenant corporate LMS with competency mapping, trainer-subject matching, MCQ assessments and automated certification for L&D teams.",
      },
      { property: "og:title", content: "CapacityConnect — Enterprise Learning & Competency Platform" },
      {
        property: "og:description",
        content:
          "Unify trainee learning, trainer content delivery and admin oversight with an automated competency-mapping engine.",
      },
    ],
  }),
  component: Landing,
});

const PILLARS = [
  {
    icon: Sparkles,
    title: "Competency mapping engine",
    body: "Weighted skill-tag overlap ranks the best-fit trainer for every subject, recalculated whenever profiles or courses change.",
  },
  {
    icon: ShieldCheck,
    title: "Organization-scoped isolation",
    body: "Every record belongs to one organization. Role-based access separates Trainee, Trainer and Admin surfaces end to end.",
  },
  {
    icon: BarChart3,
    title: "Participation analytics",
    body: "Enrollment trends, assessment completion and certification counts across every subject in one admin console.",
  },
  {
    icon: FileBadge,
    title: "Automated certification",
    body: "Auto-scored MCQ assessments trigger org-branded PDF certificates and notify the trainee the moment they pass.",
  },
];

function Landing() {
  return (
    <MarketingPage>
      <section className="bg-hero-gradient">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="text-primary-foreground">
            <p className="inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
              Enterprise L&amp;D · Multi-tenant SaaS
            </p>
            <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">
              Match the right trainer to every subject, automatically.
            </h1>
            <p className="mt-4 max-w-xl text-primary-foreground/85">
              CapacityConnect unifies corporate training delivery, competency tracking and
              trainer-subject matching in one role-based portal built for L&amp;D teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/signup">
                  Create your workspace <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/features">Explore the platform</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              {["14-day trial", "No card required", "SSO-ready"].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-elevated p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Competency console preview
            </p>
            <p className="mt-1 text-sm font-medium">Advanced Data Analytics for Ops</p>
            <div className="mt-4 space-y-3">
              {[
                { name: "Marcus Feld", score: 91 },
                { name: "Daniel Okoye", score: 62 },
                { name: "Aarav Mehta", score: 44 },
              ].map((t) => (
                <div key={t.name} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted-foreground">{t.score}% fit</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${t.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl">Everything L&amp;D operations need</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Three separated role surfaces, one governed data layer.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="card-elevated p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3">
          {[
            { k: "42%", v: "faster trainer allocation" },
            { k: "3 roles", v: "strictly separated access" },
            { k: "99.5%", v: "uptime target" },
          ].map((s) => (
            <div key={s.k}>
              <p className="text-3xl font-semibold text-primary">{s.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl">Ready to map your capacity?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Spin up an organization workspace, invite your trainers and let the matching engine do the
          allocation work.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/signup">Start free trial</Link>
        </Button>
      </section>
    </MarketingPage>
  );
}
