import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  FolderKanban,
  Users,
  UserCheck,
  Bell,
  Menu,
  GraduationCap,
  LogOut,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { currentTrainerProfile, organization } from "@/lib/mock-data";
import { RoleSwitcher } from "./RoleSwitcher";

const NAV = [
  { to: "/trainer", label: "Trainer Dashboard", icon: LayoutDashboard },
  { to: "/trainer/courses", label: "Assigned Courses", icon: BookOpen },
  { to: "/trainer/questionnaires", label: "MCQ Builder", icon: FileQuestion },
  { to: "/trainer/library", label: "Content Library", icon: FolderKanban },
  { to: "/trainer/trainees", label: "Trainee Performance", icon: Users },
  { to: "/trainer/profile", label: "Competency Profile", icon: UserCheck },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Trainer" className="flex flex-col gap-1 p-3">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/trainer" }}
          activeProps={{ className: "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 font-medium" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-950/30"
        >
          <Icon className="size-4 shrink-0" aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}

/** Trainer layout shell: sidebar + topbar + role switcher. */
export function TrainerShell({
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
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-sky-600 text-white">
            <Briefcase className="size-4" aria-hidden />
          </span>
          <div>
            <div className="text-sm font-semibold leading-tight">CapacityConnect</div>
            <div className="text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">Trainer Portal</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavList />
        </div>
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">Logged in as Trainer</p>
          <p className="truncate text-sm font-medium">{currentTrainerProfile.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{organization.name}</p>
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
              <SheetTitle className="flex h-16 items-center px-5 text-base">CapacityConnect Trainer</SheetTitle>
              <NavList onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{title}</p>
          </div>

          <RoleSwitcher currentRole="trainer" />

          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-sky-500" />
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
              <h1 className="text-2xl font-bold">{title}</h1>
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
