import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Sparkles,
  Megaphone,
  CreditCard,
  ScrollText,
  Bell,
  Menu,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { organization } from "@/lib/mock-data";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users & Approvals", icon: Users },
  { to: "/admin/courses", label: "Course Management", icon: BookOpen },
  { to: "/admin/competency", label: "Competency Mapping", icon: Sparkles },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/billing", label: "Subscription", icon: CreditCard },
  { to: "/admin/audit", label: "Audit Logs", icon: ScrollText },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1 p-3">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/admin" }}
          activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Icon className="size-4 shrink-0" aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}

/** Authenticated admin layout: fixed sidebar + top bar. */
export function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4" aria-hidden />
          </span>
          CapacityConnect
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavList />
        </div>
        <div className="border-t border-sidebar-border p-4">
          <p className="text-xs text-muted-foreground">Organization</p>
          <p className="truncate text-sm font-medium">{organization.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{organization.tier} plan</p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="flex h-16 items-center px-5 text-base">CapacityConnect</SheetTitle>
              <NavList onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{title}</p>
          </div>

          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Sign out">
            <Link to="/login">
              <LogOut className="size-5" />
            </Link>
          </Button>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl">{title}</h1>
              {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
            </div>
            {actions}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
