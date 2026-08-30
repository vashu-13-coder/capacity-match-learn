import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, X, Search } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users as seedUsers, type OrgUser, type Role } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management & Approvals — CapacityConnect" },
      {
        name: "description",
        content: "Approve signups, assign roles and manage user status inside your organization.",
      },
      { property: "og:title", content: "User Management & Approvals — CapacityConnect" },
      { property: "og:description", content: "Govern who has access to your learning portal." },
    ],
  }),
  component: UserManagement,
});

const statusVariant: Record<OrgUser["status"], string> = {
  active: "bg-success/12 text-success",
  pending: "bg-warning/15 text-warning",
  deactivated: "bg-muted text-muted-foreground",
};

function UserManagement() {
  const [rows, setRows] = useState<OrgUser[]>(seedUsers);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | OrgUser["status"]>("all");

  const filtered = useMemo(
    () =>
      rows.filter(
        (u) =>
          (filter === "all" || u.status === filter) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [rows, query, filter],
  );

  function update(id: string, patch: Partial<OrgUser>, message: string) {
    setRows((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    toast.success(message);
  }

  return (
    <AdminShell
      title="User Management & Approvals"
      description="Every action here is written to the organization audit log."
    >
      <div className="card-elevated overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or email"
              aria-label="Search users"
              className="pl-9"
              maxLength={120}
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-44" aria-label="Filter by status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="deactivated">Deactivated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={u.role}
                      onValueChange={(v) =>
                        update(u.id, { role: v as Role }, `${u.name} is now a ${v}.`)
                      }
                    >
                      <SelectTrigger className="w-32" aria-label={`Role for ${u.name}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trainee">Trainee</SelectItem>
                        <SelectItem value="trainer">Trainer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusVariant[u.status]}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.lastActive}</TableCell>
                  <TableCell className="text-right">
                    {u.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            update(u.id, { status: "active", lastActive: "just now" }, `Approved ${u.name}.`)
                          }
                        >
                          <Check className="size-4" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => update(u.id, { status: "deactivated" }, `Rejected ${u.name}.`)}
                        >
                          <X className="size-4" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          update(
                            u.id,
                            { status: u.status === "active" ? "deactivated" : "active" },
                            u.status === "active" ? `Deactivated ${u.name}.` : `Reactivated ${u.name}.`,
                          )
                        }
                      >
                        {u.status === "active" ? "Deactivate" : "Reactivate"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="p-10 text-center">
            <p className="font-medium">No users match this view</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Adjust the search term or status filter to see more people.
            </p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
