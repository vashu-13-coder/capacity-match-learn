import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingPage } from "@/components/marketing/MarketingPage";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — CapacityConnect Plans for L&D Teams" },
      {
        name: "description",
        content:
          "Transparent per-seat pricing: Starter, Growth and Enterprise tiers with storage quotas, analytics and white-labeling options.",
      },
      { property: "og:title", content: "Pricing — CapacityConnect Plans for L&D Teams" },
      {
        property: "og:description",
        content: "Compare Starter, Growth and Enterprise plans for corporate learning teams.",
      },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Starter",
    price: "$249",
    note: "per month · up to 50 seats",
    features: ["50 active users", "50 GB storage", "Unlimited courses", "MCQ assessments", "Email support"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$749",
    note: "per month · up to 250 seats",
    features: [
      "250 active users",
      "500 GB storage",
      "Competency mapping engine",
      "Advanced analytics",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "annual contract",
    features: [
      "Unlimited users",
      "Custom storage quota",
      "White-labeled certificates",
      "SSO and audit exports",
      "Dedicated success manager",
    ],
    highlight: false,
  },
];

function Pricing() {
  return (
    <MarketingPage title="Plans that scale with your workforce" intro="Every plan includes organization-level data isolation and role-based access control.">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 lg:grid-cols-3">
        {PLANS.map((p) => (
          <section
            key={p.name}
            className={`card-elevated flex flex-col p-6 ${p.highlight ? "ring-2 ring-primary" : ""}`}
          >
            {p.highlight && (
              <span className="mb-3 self-start rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
                Most popular
              </span>
            )}
            <h2 className="text-lg">{p.name}</h2>
            <p className="mt-3 text-3xl font-semibold">{p.price}</p>
            <p className="text-sm text-muted-foreground">{p.note}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6" variant={p.highlight ? "default" : "outline"}>
              <Link to={p.name === "Enterprise" ? "/contact" : "/signup"}>
                {p.name === "Enterprise" ? "Talk to sales" : "Start free trial"}
              </Link>
            </Button>
          </section>
        ))}
      </div>
    </MarketingPage>
  );
}
