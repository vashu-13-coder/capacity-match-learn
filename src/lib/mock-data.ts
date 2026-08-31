/**
 * Front-end demo data for CapacityConnect.
 *
 * This module is the single seam where the UI reads its data for demo mode.
 * Fully typed shapes matching the PostgreSQL database schema for seamless API transition.
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
  avatarUrl?: string;
}

export interface CourseResource {
  id: string;
  courseId: string;
  title: string;
  type: "video" | "presentation" | "document";
  format: "MP4" | "PPTX" | "PDF" | "DOCX";
  durationOrPages: string;
  url: string;
  fileSizeMb: number;
  uploadedAt: string;
  subjectTag: string;
}

export interface MCQQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface MCQAssessment {
  id: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScorePercent: number;
  totalQuestions: number;
  questions: MCQQuestion[];
  deadline: string;
}

export interface TraineeAssessmentSubmission {
  id: string;
  assessmentId: string;
  traineeId: string;
  scorePercent: number;
  passed: boolean;
  submittedAt: string;
  answers: Record<string, number>; // questionId -> optionIndex
}

export interface CourseCertificate {
  id: string;
  certificateNo: string;
  courseId: string;
  courseTitle: string;
  traineeName: string;
  issuedAt: string;
  scorePercent: number;
  pdfUrl: string;
  verificationCode: string;
}

export interface TraineeCourseEnrollment {
  courseId: string;
  title: string;
  subject: string;
  trainerName: string;
  enrolledAt: string;
  progressPercent: number;
  status: "in_progress" | "completed" | "expired";
  nextDeadline: string;
  assessmentId?: string;
  assessmentScore?: number;
  certificateId?: string;
}

export interface TraineeProfile {
  userId: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  skills: string[];
  qualifications: string[];
  certificationsUploaded: { name: string; date: string; size: string }[];
}

export interface TrainerSkill {
  tag: string;
  proficiency: number; // 1 to 5
}

export interface TrainerProfile {
  userId: string;
  name: string;
  email: string;
  title: string;
  yearsExperience: number;
  bio: string;
  skills: TrainerSkill[];
  subjectAreas: string[];
  certifications: string[];
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
  description?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
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

export interface CourseFeedback {
  id: string;
  courseId: string;
  traineeName: string;
  rating: number;
  comment: string;
  submittedAt: string;
}

export interface TraineePerformanceItem {
  traineeId: string;
  traineeName: string;
  email: string;
  courseTitle: string;
  progressPercent: number;
  assessmentScore: number | null;
  status: "Passed" | "In Progress" | "Needs Attention";
  lastActive: string;
}

// Demo Organization Data
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

// Demo Users Across Roles
export const users: OrgUser[] = [
  { id: "u5", name: "Kenji Watanabe", email: "kenji.watanabe@northwind.co", role: "admin", status: "active", invitedAt: "2026-01-09", lastActive: "12m ago" },
  { id: "u3", name: "Daniel Okoye", email: "daniel.okoye@northwind.co", role: "trainer", status: "active", invitedAt: "2026-05-02", lastActive: "2h ago" },
  { id: "u7", name: "Marcus Feld", email: "marcus.feld@northwind.co", role: "trainer", status: "active", invitedAt: "2026-02-14", lastActive: "4h ago" },
  { id: "u4", name: "Hannah Berg", email: "hannah.berg@northwind.co", role: "trainee", status: "active", invitedAt: "2026-04-11", lastActive: "1d ago" },
  { id: "u2", name: "Sofia Almeida", email: "sofia.almeida@northwind.co", role: "trainee", status: "pending", invitedAt: "2026-08-28", lastActive: "Just now" },
  { id: "u1", name: "Aarav Mehta", email: "aarav.mehta@northwind.co", role: "trainer", status: "pending", invitedAt: "2026-08-27", lastActive: "—" },
  { id: "u6", name: "Priya Nair", email: "priya.nair@northwind.co", role: "trainee", status: "deactivated", invitedAt: "2025-11-20", lastActive: "62d ago" },
];

// Courses Dataset
export const courses: Course[] = [
  {
    id: "c1",
    title: "Industrial Safety Fundamentals",
    subject: "EHS",
    trainer: "Daniel Okoye",
    enrolled: 84,
    completion: 71,
    status: "published",
    requiredSkills: ["safety-compliance", "risk-assessment", "iso-45001"],
    description: "Core OSHA & ISO-45001 safety guidelines for industrial facilities, hazardous material handling, and emergency protocol management.",
    level: "Intermediate",
  },
  {
    id: "c2",
    title: "Advanced Data Analytics for Ops",
    subject: "Analytics",
    trainer: "Marcus Feld",
    enrolled: 46,
    completion: 22,
    status: "published",
    requiredSkills: ["sql", "statistics", "visualisation"],
    description: "Master modern SQL querying, operational metric forecasting, data pipeline monitoring, and automated dashboard building.",
    level: "Advanced",
  },
  {
    id: "c3",
    title: "Frontline Leadership Program",
    subject: "Leadership",
    trainer: "Marcus Feld",
    enrolled: 62,
    completion: 55,
    status: "published",
    requiredSkills: ["coaching", "conflict-resolution"],
    description: "Essential supervisory skills for team leads: performance coaching, conflict de-escalation, and operational goal alignment.",
    level: "Beginner",
  },
  {
    id: "c4",
    title: "Lean Six Sigma — Green Belt",
    subject: "Quality",
    trainer: null,
    enrolled: 0,
    completion: 0,
    status: "draft",
    requiredSkills: ["process-mapping", "statistics", "dmaic"],
    description: "Comprehensive DMAIC framework training for manufacturing process optimization and defect reduction.",
    level: "Advanced",
  },
];

// Trainee Profile Details
export const currentTraineeProfile: TraineeProfile = {
  userId: "u4",
  name: "Hannah Berg",
  email: "hannah.berg@northwind.co",
  jobTitle: "Operations Specialist",
  department: "Industrial Engineering",
  skills: ["safety-compliance", "risk-assessment", "process-mapping", "excel-advanced"],
  qualifications: ["B.Sc. Industrial Engineering — TU Munich", "IOSH Managing Safely (2024)"],
  certificationsUploaded: [
    { name: "OSHA_Compliance_Certificate.pdf", date: "2026-01-15", size: "2.4 MB" },
    { name: "First_Aid_Responder_Level2.pdf", date: "2025-09-10", size: "1.1 MB" },
  ],
};

// Trainee Enrollments
export const traineeEnrollments: TraineeCourseEnrollment[] = [
  {
    courseId: "c1",
    title: "Industrial Safety Fundamentals",
    subject: "EHS",
    trainerName: "Daniel Okoye",
    enrolledAt: "2026-05-10",
    progressPercent: 100,
    status: "completed",
    nextDeadline: "Passed",
    assessmentId: "asm-c1",
    assessmentScore: 92,
    certificateId: "cert-c1-u4",
  },
  {
    courseId: "c2",
    title: "Advanced Data Analytics for Ops",
    subject: "Analytics",
    trainerName: "Marcus Feld",
    enrolledAt: "2026-07-01",
    progressPercent: 65,
    status: "in_progress",
    nextDeadline: "2026-09-05",
    assessmentId: "asm-c2",
  },
  {
    courseId: "c3",
    title: "Frontline Leadership Program",
    subject: "Leadership",
    trainerName: "Marcus Feld",
    enrolledAt: "2026-08-12",
    progressPercent: 30,
    status: "in_progress",
    nextDeadline: "2026-09-18",
  },
];

// Course Resources
export const courseResources: CourseResource[] = [
  {
    id: "res-1",
    courseId: "c1",
    title: "Module 1: OSHA Safety Protocol & PPE Standards",
    type: "video",
    format: "MP4",
    durationOrPages: "24 mins",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    fileSizeMb: 145,
    uploadedAt: "2026-05-02",
    subjectTag: "EHS",
  },
  {
    id: "res-2",
    courseId: "c1",
    title: "Hazard Identification Checklist & Risk Assessment Guide",
    type: "presentation",
    format: "PPTX",
    durationOrPages: "38 slides",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSizeMb: 12.4,
    uploadedAt: "2026-05-03",
    subjectTag: "EHS",
  },
  {
    id: "res-3",
    courseId: "c1",
    title: "Emergency Response & Chemical Spill Containment Manual",
    type: "document",
    format: "PDF",
    durationOrPages: "14 pages",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSizeMb: 4.8,
    uploadedAt: "2026-05-04",
    subjectTag: "EHS",
  },
  {
    id: "res-4",
    courseId: "c2",
    title: "SQL Query Optimization for Big Data Pipelines",
    type: "video",
    format: "MP4",
    durationOrPages: "42 mins",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    fileSizeMb: 185,
    uploadedAt: "2026-06-28",
    subjectTag: "Analytics",
  },
  {
    id: "res-5",
    courseId: "c2",
    title: "Statistical Process Control Dashboard Workbench",
    type: "presentation",
    format: "PPTX",
    durationOrPages: "52 slides",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSizeMb: 18.2,
    uploadedAt: "2026-07-02",
    subjectTag: "Analytics",
  },
];

// MCQ Assessments
export const sampleAssessments: Record<string, MCQAssessment> = {
  "asm-c1": {
    id: "asm-c1",
    courseId: "c1",
    courseTitle: "Industrial Safety Fundamentals",
    subject: "EHS",
    title: "Industrial Safety & Hazardous Materials Final Exam",
    description: "Evaluates workplace safety, ISO 45001 compliance, hazard control procedures, and emergency protocol readiness.",
    timeLimitMinutes: 15,
    passingScorePercent: 70,
    totalQuestions: 5,
    deadline: "2026-09-10",
    questions: [
      {
        id: "q1",
        questionText: "Which ISO standard specifies requirements for an occupational health and safety (OH&S) management system?",
        options: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001"],
        correctOptionIndex: 2,
        explanation: "ISO 45001 is the global standard for occupational health and safety management systems.",
      },
      {
        id: "q2",
        questionText: "What is the primary objective of a Hierarchy of Controls in workplace safety?",
        options: [
          "To reduce workers' compensation premiums",
          "To systematically eliminate or minimize hazards starting from the most effective control",
          "To replace all human labor with automated equipment",
          "To shift liability to equipment manufacturers",
        ],
        correctOptionIndex: 1,
        explanation: "The Hierarchy of Controls prioritizes elimination, substitution, engineering controls, administrative controls, and PPE.",
      },
      {
        id: "q3",
        questionText: "When handling class 3 flammable liquids, what is the mandatory immediate safety requirement?",
        options: [
          "Ensure local exhaust ventilation and remove all ignition sources",
          "Wear standard cotton gloves only",
          "Dilute the substance with tap water",
          "Store the container near heating elements",
        ],
        correctOptionIndex: 0,
        explanation: "Class 3 flammable liquids require grounded containers, adequate ventilation, and strict ignition source isolation.",
      },
      {
        id: "q4",
        questionText: "In Lockout/Tagout (LOTO) procedures, who is authorized to remove a safety lock?",
        options: [
          "Any employee working on the shift",
          "Only the authorized employee who placed the lock or designated safety officer following protocol",
          "The department secretary",
          "The facility receptionist",
        ],
        correctOptionIndex: 1,
        explanation: "Only the authorized lock owner or designated safety officer after standard emergency verification can remove a LOTO lock.",
      },
      {
        id: "q5",
        questionText: "What document provides essential emergency and health hazard details for workplace chemicals?",
        options: ["Purchase Order", "Safety Data Sheet (SDS)", "Bill of Lading", "Maintenance Logbook"],
        correctOptionIndex: 1,
        explanation: "Safety Data Sheets (SDS) contain chemical identification, hazard classification, first-aid measures, and handling guidelines.",
      },
    ],
  },
  "asm-c2": {
    id: "asm-c2",
    courseId: "c2",
    courseTitle: "Advanced Data Analytics for Ops",
    subject: "Analytics",
    title: "SQL & Operational Analytics Competency Test",
    description: "Measures proficiency in SQL aggregation, analytical window functions, metric calculation, and pipeline debugging.",
    timeLimitMinutes: 20,
    passingScorePercent: 75,
    totalQuestions: 4,
    deadline: "2026-09-05",
    questions: [
      {
        id: "q2-1",
        questionText: "Which SQL clause is used to filter aggregated groups after a GROUP BY expression?",
        options: ["WHERE", "HAVING", "ORDER BY", "QUALIFY"],
        correctOptionIndex: 1,
        explanation: "HAVING filters groups post-aggregation, whereas WHERE filters individual rows prior to grouping.",
      },
      {
        id: "q2-2",
        questionText: "What does the ROW_NUMBER() window function compute?",
        options: [
          "The total count of rows in the table",
          "A unique sequential integer assigned to rows within a partition",
          "The average value of the specified column",
          "The total memory size of the query result",
        ],
        correctOptionIndex: 1,
        explanation: "ROW_NUMBER() assigns a unique 1-based sequential integer to each row in the partition order.",
      },
      {
        id: "q2-3",
        questionText: "In manufacturing analytics, what does Overall Equipment Effectiveness (OEE) measure?",
        options: [
          "Availability × Performance × Quality",
          "Cost × Velocity × Downtime",
          "Yield ÷ Energy Consumption",
          "Total Shift Hours ÷ Labor Count",
        ],
        correctOptionIndex: 0,
        explanation: "OEE is calculated as the product of Availability, Performance rate, and Quality rate.",
      },
      {
        id: "q2-4",
        questionText: "Which index type is optimal for fast point lookups on unique primary keys in PostgreSQL?",
        options: ["B-Tree", "GIN", "GiST", "BRIN"],
        correctOptionIndex: 0,
        explanation: "B-Tree is the default and most efficient index for equality and range queries on scalar values.",
      },
    ],
  },
};

// Earned Certificates
export const certificatesList: CourseCertificate[] = [
  {
    id: "cert-c1-u4",
    certificateNo: "CC-2026-EHS-89412",
    courseId: "c1",
    courseTitle: "Industrial Safety Fundamentals",
    traineeName: "Hannah Berg",
    issuedAt: "2026-06-01",
    scorePercent: 92,
    pdfUrl: "/demo/certificates/CC-2026-EHS-89412.pdf",
    verificationCode: "VER-9841-NORTHWIND",
  },
];

// Trainer Profile Details
export const currentTrainerProfile: TrainerProfile = {
  userId: "u3",
  name: "Daniel Okoye",
  email: "daniel.okoye@northwind.co",
  title: "Senior Industrial Safety & EHS Lead",
  yearsExperience: 12,
  bio: "Certified OSHA Master Trainer with 12+ years leading industrial safety compliance across automotive, chemical manufacturing, and heavy logistics facilities.",
  skills: [
    { tag: "safety-compliance", proficiency: 5 },
    { tag: "risk-assessment", proficiency: 5 },
    { tag: "iso-45001", proficiency: 4 },
    { tag: "process-mapping", proficiency: 5 },
    { tag: "dmaic", proficiency: 4 },
    { tag: "statistics", proficiency: 3 },
  ],
  subjectAreas: ["EHS", "Quality", "Industrial Safety"],
  certifications: ["OSHA Authorized Trainer (500)", "Certified Safety Professional (CSP)", "Six Sigma Black Belt"],
};

// Competency Matches Matrix
export const competencyMatches: Record<string, TrainerMatch[]> = {
  c2: [
    { trainerId: "u7", trainer: "Marcus Feld", score: 0.91, matchedSkills: [{ tag: "sql", proficiency: 5 }, { tag: "statistics", proficiency: 4 }, { tag: "visualisation", proficiency: 4 }], confirmed: true },
    { trainerId: "u3", trainer: "Daniel Okoye", score: 0.62, matchedSkills: [{ tag: "statistics", proficiency: 3 }, { tag: "visualisation", proficiency: 3 }], confirmed: false },
    { trainerId: "u1", trainer: "Aarav Mehta", score: 0.44, matchedSkills: [{ tag: "sql", proficiency: 3 }], confirmed: false },
  ],
  c4: [
    { trainerId: "u3", trainer: "Daniel Okoye", score: 0.86, matchedSkills: [{ tag: "process-mapping", proficiency: 5 }, { tag: "dmaic", proficiency: 4 }], confirmed: false },
    { trainerId: "u7", trainer: "Marcus Feld", score: 0.58, matchedSkills: [{ tag: "statistics", proficiency: 4 }], confirmed: false },
  ],
};

// Trainer Trainee Performance Track
export const traineePerformanceList: TraineePerformanceItem[] = [
  { traineeId: "u4", traineeName: "Hannah Berg", email: "hannah.berg@northwind.co", courseTitle: "Industrial Safety Fundamentals", progressPercent: 100, assessmentScore: 92, status: "Passed", lastActive: "1d ago" },
  { traineeId: "u2", traineeName: "Sofia Almeida", email: "sofia.almeida@northwind.co", courseTitle: "Industrial Safety Fundamentals", progressPercent: 45, assessmentScore: null, status: "In Progress", lastActive: "3h ago" },
  { traineeId: "u8", traineeName: "Liam Vance", email: "liam.vance@northwind.co", courseTitle: "Industrial Safety Fundamentals", progressPercent: 12, assessmentScore: 48, status: "Needs Attention", lastActive: "4d ago" },
  { traineeId: "u4", traineeName: "Hannah Berg", email: "hannah.berg@northwind.co", courseTitle: "Advanced Data Analytics for Ops", progressPercent: 65, assessmentScore: null, status: "In Progress", lastActive: "1d ago" },
];

// Announcements
export const announcements: Announcement[] = [
  { id: "a1", title: "Q3 compliance window opens Monday", body: "All operations staff must complete Industrial Safety Fundamentals before 30 September.", audience: "All", publishedAt: "2026-08-26", pinned: true },
  { id: "a2", title: "New analytics library published", body: "Twelve new recordings and workbooks are now available in the Analytics library.", audience: "Trainees", publishedAt: "2026-08-21", pinned: false },
  { id: "a3", title: "Trainer Q3 Curriculum Review Scheduled", body: "All accredited trainers please submit questionnaire updates prior to 10 September.", audience: "Trainers", publishedAt: "2026-08-29", pinned: true },
];

// Course Feedback
export const courseFeedbackList: CourseFeedback[] = [
  { id: "fb-1", courseId: "c1", traineeName: "Hannah Berg", rating: 5, comment: "Exceptional real-world OSHA safety breakdown! The hazard identification checklist was immediately applicable.", submittedAt: "2026-06-02" },
  { id: "fb-2", courseId: "c1", traineeName: "Rohan Gupta", rating: 5, comment: "Daniel Okoye explained emergency containment with extreme clarity. Great course!", submittedAt: "2026-06-15" },
];

// Audit Log
export const auditLog: AuditEntry[] = [
  { id: "l1", actor: "Kenji Watanabe", action: "Approved signup", target: "hannah.berg@northwind.co", at: "2026-08-29 14:02", severity: "info" },
  { id: "l2", actor: "Kenji Watanabe", action: "Changed role Trainee → Trainer", target: "marcus.feld@northwind.co", at: "2026-08-29 11:41", severity: "warning" },
  { id: "l3", actor: "System", action: "Competency recalculation", target: "Advanced Data Analytics for Ops", at: "2026-08-28 22:00", severity: "info" },
  { id: "l4", actor: "Kenji Watanabe", action: "Deactivated user", target: "priya.nair@northwind.co", at: "2026-08-27 09:15", severity: "critical" },
  { id: "l5", actor: "Kenji Watanabe", action: "Published announcement", target: "Q3 compliance window opens Monday", at: "2026-08-26 08:30", severity: "info" },
];

// Analytics Charts Data
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
