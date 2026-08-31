import { Link } from "@tanstack/react-router";
import { ShieldCheck, GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type ActiveRole = "admin" | "trainer" | "trainee";

interface RoleSwitcherProps {
  currentRole: ActiveRole;
}

export function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const roleInfo = {
    admin: { label: "Admin Workspace", icon: ShieldCheck, color: "text-amber-500", target: "/admin" },
    trainer: { label: "Trainer Workspace", icon: Briefcase, color: "text-sky-500", target: "/trainer" },
    trainee: { label: "Trainee Workspace", icon: GraduationCap, color: "text-emerald-500", target: "/trainee" },
  };

  const CurrentIcon = roleInfo[currentRole].icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-border bg-card font-medium text-foreground">
          <CurrentIcon className={`size-4 ${roleInfo[currentRole].color}`} />
          <span className="hidden sm:inline">{roleInfo[currentRole].label}</span>
          <ChevronDown className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Active Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className={currentRole === "admin" ? "bg-accent font-semibold text-accent-foreground" : ""}>
          <Link to="/admin" className="flex items-center w-full cursor-pointer">
            <ShieldCheck className="mr-2 size-4 text-amber-500" />
            <span>Admin Portal</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={currentRole === "trainer" ? "bg-accent font-semibold text-accent-foreground" : ""}>
          <Link to="/trainer" className="flex items-center w-full cursor-pointer">
            <Briefcase className="mr-2 size-4 text-sky-500" />
            <span>Trainer Portal</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={currentRole === "trainee" ? "bg-accent font-semibold text-accent-foreground" : ""}>
          <Link to="/trainee" className="flex items-center w-full cursor-pointer">
            <GraduationCap className="mr-2 size-4 text-emerald-500" />
            <span>Trainee Portal</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
