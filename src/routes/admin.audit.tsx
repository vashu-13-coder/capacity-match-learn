import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auditLog, type AuditEntry } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit Logs — CapacityConnect" },
      {
        name: "description",
        content: "Immutable record of administrator approvals, role changes and content publishing.",
      },
      { property: "og:title", content: "Audit Logs — CapacityConnect" },
      { property: "og:description", content: "Trace every privileged action in your workspace." },
    ],
  }),
  component: AuditLogs,
});

const severity: Record<AuditEntry["severity"], string> = {
  info: "bg-secondary text-secondary-foreground",
  warning: "bg-warning/15 text-warning",
  critical: "bg-destructive/12 text-destructive",
};

function AuditLogs() {
  const [query, setQuery] = useState("");
  const rows = auditLog.filter((e) =>
    `${e.actor} ${e.action} ${e.target}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AdminShell title="Audit Logs" description="Retained for the life of the subscription plus 30 days.">
      <div className="card-elevated overflow-hidden">
        <div className="border-b border-border p-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search actor, action or target"
            aria-label="Search audit log"
            maxLength={120}
            className="max-w-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{e.at}</TableCell>
                  <TableCell className="font-medium">{e.actor}</TableCell>
                  <TableCell>{e.action}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{e.target}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={severity[e.severity]}>
                      {e.severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {rows.length === 0 && (
          <p className="p-10 text-center text-sm text-muted-foreground">No entries match that search.</p>
        )}
      </div>
    </AdminShell>
  );
}
