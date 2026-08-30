import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { organization } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/billing")({
  head: () => ({
    meta: [
      { title: "Subscription & Billing — CapacityConnect" },
      {
        name: "description",
        content: "Review your organization's plan tier, seat usage, storage quota and billing status.",
      },
      { property: "og:title", content: "Subscription & Billing — CapacityConnect" },
      { property: "og:description", content: "Manage plan, seats and storage for your workspace." },
    ],
  }),
  component: Billing,
});

const INVOICES = [
  { id: "INV-2026-08", date: "2026-08-14", amount: "$749.00", status: "Paid" },
  { id: "INV-2026-07", date: "2026-07-14", amount: "$749.00", status: "Paid" },
  { id: "INV-2026-06", date: "2026-06-14", amount: "$749.00", status: "Paid" },
];

function Billing() {
  const seatPct = Math.round((organization.seatsUsed / organization.seats) * 100);
  const storagePct = Math.round((organization.storageUsedGb / organization.storageGb) * 100);

  return (
    <AdminShell
      title="Subscription & Billing"
      description="Plan limits are enforced server-side on every request."
      actions={
        <Button onClick={() => toast.info("Checkout opens once payments are connected.")}>
          Upgrade plan
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card-elevated p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base">Current plan</h2>
            <Badge variant="secondary" className="bg-success/12 text-success">
              {organization.billingStatus}
            </Badge>
          </div>
          <p className="mt-4 text-3xl font-semibold">{organization.tier}</p>
          <p className="text-sm text-muted-foreground">Renews on {organization.renewsOn}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Competency mapping engine</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
          </ul>
        </section>

        <section className="card-elevated p-5">
          <h2 className="text-base">Seat usage</h2>
          <p className="mt-4 text-3xl font-semibold">
            {organization.seatsUsed}
            <span className="text-base font-normal text-muted-foreground"> / {organization.seats}</span>
          </p>
          <Progress value={seatPct} className="mt-3" />
          <p className="mt-2 text-sm text-muted-foreground">
            {organization.seats - organization.seatsUsed} seats remaining on this tier.
          </p>
        </section>

        <section className="card-elevated p-5">
          <h2 className="text-base">Storage quota</h2>
          <p className="mt-4 text-3xl font-semibold">
            {organization.storageUsedGb} GB
            <span className="text-base font-normal text-muted-foreground"> / {organization.storageGb} GB</span>
          </p>
          <Progress value={storagePct} className="mt-3" />
          <p className="mt-2 text-sm text-muted-foreground">
            Lecture recordings and certificates count toward this quota.
          </p>
        </section>
      </div>

      <section className="card-elevated mt-6 p-5">
        <h2 className="text-base">Invoices</h2>
        <ul className="mt-4 divide-y divide-border">
          {INVOICES.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
              <span className="font-medium">{i.id}</span>
              <span className="text-muted-foreground">{i.date}</span>
              <span className="ml-auto">{i.amount}</span>
              <Badge variant="secondary" className="bg-success/12 text-success">
                {i.status}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}
