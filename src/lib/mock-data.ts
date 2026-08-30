/**
 * Front-end demo data for CapacityConnect.
 *
 * This module is the single seam where the UI reads its data. When the backend
 * is added, replace each export with an API call (services/ layer) — component
 * prop shapes below stay identical.
 */

export type Role = "trainee" | "trainer" | "admin";
export type UserStatus = "active" | "pending" | "deactivated";

export interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  invitedAt: string;
  lastActive: string;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  trainer: string | null;
  enrolled: number;
  completion: number;
  status: "published" | "draft" | "archived";
  requiredSkills: string[];
}

export interface TrainerMatch {
  trainerId: string;
  trainer: string;
  score: number;
  matchedSkills: { tag: string; proficiency: number }[];
  confirmed: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: "All" | "Trainees" | "Trainers";
  publishedAt: string;
  pinned: boolean;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
  severity: "info" | "warning" | "critical";
}

export const organization = {
  name: "Northwind Industries",
  tier: "Growth" as const,
  seats: 250,
  seatsUsed: 186,
  storageGb: 500,
  storageUsedGb: 213,
  renewsOn: "2026-09-14",
  billingStatus: "active" as const,
};

export const users: OrgUser[] = [
  { id: "u1", name: "Aarav Mehta", email: "aarav.mehta@northwind.co", role: "trainer", status: "pending", invitedAt: "2026-08-27", lastActive: "—" },
  { id: "u2", name: "Sofia Almeida", email: "sofia.almeida@northwind.co", role: "trainee", status: "pending", invitedAt: "2026-08-28", lastActive: "—" },
  { id: "u3", name: "Daniel Okoye", email: "daniel.okoye@northwind.co", role: "trainer", status: "active", invitedAt: "2026-05-02", lastActive: "2h ago" },
  { id: "u4", name: "Hannah Berg", email: "hannah.berg@northwind.co", role: "trainee", status: "active", invitedAt: "2026-04-11", lastActive: "1d ago" },
  { id: "u5", name: "Kenji Watanabe", email: "kenji.watanabe@northwind.co", role: "admin", status: "active", invitedAt: "2026-01-09", lastActive: "12m ago" },
  { id: "u6", name: "Priya Nair", email: "priya.nair@northwind.co", role: "trainee", status: "deactivated", invitedAt: "2025-11-20", lastActive: "62d ago" },
  { id: "u7", name: "Marcus Feld", email: "marcus.feld@northwind.co", role: "trainer", status: "active", invitedAt: "2026-02-14", lastActive: "4h ago" },
];

export const courses: Course[] = [
  { id: "c1", title: "Industrial Safety Fundamentals", subject: "EHS", trainer: "Daniel Okoye", enrolled: 84, completion: 71, status: "published", requiredSkills: ["safety-compliance", "risk-assessment", "iso-45001"] },
  { id: "c2", title: "Advanced Data Analytics for Ops", subject: "Analytics", trainer: null, enrolled: 46, completion: 22, status: "published", requiredSkills: ["sql", "statistics", "visualisation"] },
  { id: "c3", title: "Frontline Leadership Program", subject: "Leadership", trainer: "Marcus Feld", enrolled: 62, completion: 55, status: "published", requiredSkills: ["coaching", "conflict-resolution"] },
  { id: "c4", title: "Lean Six Sigma — Green Belt", subject: "Quality", trainer: null, enrolled: 0, completion: 0, status: "draft", requiredSkills: ["process-mapping", "statistics", "dmaic"] },
];

export const competencyMatches: Record<string, TrainerMatch[]> = {
  c2: [
    { trainerId: "u7", trainer: "Marcus Feld", score: 0.91, matchedSkills: [{ tag: "sql", proficiency: 5 }, { tag: "statistics", proficiency: 4 }, { tag: "visualisation", proficiency: 4 }], confirmed: false },
    { trainerId: "u3", trainer: "Daniel Okoye", score: 0.62, matchedSkills: [{ tag: "statistics", proficiency: 3 }, { tag: "visualisation", proficiency: 3 }], confirmed: false },
    { trainerId: "u1", trainer: "Aarav Mehta", score: 0.44, matchedSkills: [{ tag: "sql", proficiency: 3 }], confirmed: false },
  ],
  c4: [
    { trainerId: "u3", trainer: "Daniel Okoye", score: 0.86, matchedSkills: [{ tag: "process-mapping", proficiency: 5 }, { tag: "dmaic", proficiency: 4 }], confirmed: false },
    { trainerId: "u7", trainer: "Marcus Feld", score: 0.58, matchedSkills: [{ tag: "statistics", proficiency: 4 }], confirmed: false },
  ],
};

export const announcements: Announcement[] = [
  { id: "a1", title: "Q3 compliance window opens Monday", body: "All operations staff must complete Industrial Safety Fundamentals before 30 September.", audience: "All", publishedAt: "2026-08-26", pinned: true },
  { id: "a2", title: "New analytics library published", body: "Twelve new recordings and workbooks are now available in the Analytics library.", audience: "Trainees", publishedAt: "2026-08-21", pinned: false },
];

export const auditLog: AuditEntry[] = [
  { id: "l1", actor: "Kenji Watanabe", action: "Approved signup", target: "hannah.berg@northwind.co", at: "2026-08-29 14:02", severity: "info" },
  { id: "l2", actor: "Kenji Watanabe", action: "Changed role Trainee → Trainer", target: "marcus.feld@northwind.co", at: "2026-08-29 11:41", severity: "warning" },
  { id: "l3", actor: "System", action: "Competency recalculation", target: "Advanced Data Analytics for Ops", at: "2026-08-28 22:00", severity: "info" },
  { id: "l4", actor: "Kenji Watanabe", action: "Deactivated user", target: "priya.nair@northwind.co", at: "2026-08-27 09:15", severity: "critical" },
  { id: "l5", actor: "Kenji Watanabe", action: "Published announcement", target: "Q3 compliance window opens Monday", at: "2026-08-26 08:30", severity: "info" },
];

export const enrollmentTrend = [
  { month: "Mar", enrollments: 42, completions: 18 },
  { month: "Apr", enrollments: 61, completions: 29 },
  { month: "May", enrollments: 74, completions: 41 },
  { month: "Jun", enrollments: 88, completions: 52 },
  { month: "Jul", enrollments: 103, completions: 68 },
  { month: "Aug", enrollments: 121, completions: 84 },
];

export const assessmentMix = [
  { name: "Passed", value: 148 },
  { name: "Failed", value: 27 },
  { name: "Pending", value: 61 },
];

export const participationBySubject = [
  { subject: "EHS", rate: 88 },
  { subject: "Analytics", rate: 54 },
  { subject: "Leadership", rate: 72 },
  { subject: "Quality", rate: 31 },
];
