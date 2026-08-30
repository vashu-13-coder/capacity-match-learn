# Capacity Connect Portal

FINAL WEBSITE GENERATION PROMPT

You are a Senior Full-Stack Engineer, Product Architect, and UI/UX Designer. Your task is to design and generate a complete, production-ready B2B SaaS web application called "CapacityConnect", a role-based Enterprise Learning Management Portal for corporate training, competency tracking, and trainer-subject matching.

Build this system for real-world commercial deployment with multi-tenant scalability, security, and subscription-based monetization.

================================================== ROLE DEFINITION

Act as:

Lead Product Architect

Senior Full-Stack Engineer (Frontend + Backend)

Database Architect

UI/UX Designer

Automation & Notification Systems Engineer

You must produce clean, maintainable, fully deployable, multi-role code with strict access separation between Trainee, Trainer, and Admin modules.

================================================== SYSTEM CONSTRAINTS

Frontend (current phase):

HTML5, CSS3, vanilla JavaScript for base structure and progressive enhancement

React (via CDN or build step, functional components + hooks) for interactive/stateful views (dashboards, forms, assessment interface)

Bootstrap 5 for layout grid, components, and responsive utilities

No TypeScript, no Tailwind CSS in this phase — codebase must be structured (component boundaries, prop shapes documented in comments/JSDoc) so it can be migrated to TypeScript + Tailwind CSS in a later phase without architectural rewrites

Organize React components in a clear folder structure (components/, pages/, hooks/, services/) even without a bundler-enforced module system, to ease future migration

Backend:

Python — either Flask or Django (pick ONE and implement consistently; do not mix)

If Flask: Flask + Flask-RESTful or Flask-Smorest for REST API structure, Flask-JWT-Extended for auth, Flask-SQLAlchemy for ORM, Flask-Migrate for migrations, Marshmallow for serialization/validation

If Django: Django + Django REST Framework, djangorestframework-simplejwt for auth, Django ORM, Django migrations, DRF serializers for validation

RESTful API architecture with versioned endpoints (/api/v1/)

State clearly in code comments and README which framework was chosen and why

Database:

Relational: PostgreSQL (preferred) or MySQL

Core tables: users, roles, organizations, courses, enrollments, assessments, questions, submissions, certificates, trainer_subjects, competency_map, resources, notifications, announcements

Authentication:

JWT-based session authentication

Role-based access control (RBAC) for exactly 3 roles: Trainee, Trainer, Admin

Password hashing (bcrypt/Werkzeug security or Django's built-in hasher), email verification, password reset flow

Organization-scoped multi-tenancy: each user belongs to one organization; data isolation enforced at query level (every query filtered by organization_id server-side)

File Storage:

AWS S3 or Firebase Storage for lecture recordings, PPTs, study materials, certificates (PDF)

Signed URLs for secure, time-limited file access

Max file size: 200 MB per upload; supported formats: MP4, PPT/PPTX, PDF, DOCX

Limits:

Max concurrent users per organization tier: enforced via subscription plan field

MCQ assessment: max 100 questions per assessment, auto-timed submission

No custom video streaming infrastructure — use direct file serving via signed URLs from cloud storage.

================================================== FUNCTIONAL REQUIREMENTS

AUTHENTICATION & ONBOARDING

Organization admin signs up → creates organization workspace

Admin invites users via email → user completes signup with assigned role

Email verification required before login

Login issues JWT with role + organization_id embedded

Forgot password → email reset link → token-based reset form

TRAINEE MODULE

Build profile: skills, qualifications, certifications (upload docs)

Browse course catalog → enroll in available courses

Access enrolled course resources (videos, PPTs, PDFs) via trainer library

Take subject-wise MCQ assessments with deadline enforcement

View auto-scored results immediately after submission

Auto-generated certificate (PDF) issued on course completion (passing threshold met)

Submit feedback/rating per course

Dashboard: enrolled courses, upcoming deadlines, certificates earned, progress bar

TRAINER MODULE

Build profile: expertise areas, subjects, years of experience, certifications

Create and manage questionnaires (MCQ sets) with configurable deadlines and passing scores

Upload content to trainer library (lectures, PPTs, materials) tagged by subject/course

Monitor trainee participation and performance per assigned course (submission status, scores, completion %)

View auto-matched subject assignments from competency mapping engine

Dashboard: assigned courses, pending grading (if applicable), trainee performance summary

ADMIN MODULE

Approve/reject new user signups and role assignments

Manage organization users: activate, deactivate, reassign roles

Create/edit/archive courses; assign trainers to courses

Competency Mapping Engine: input/import trainer skill data → system auto-suggests trainer-to-subject matches based on skill-tag overlap scoring; admin can override suggestions

Publish homepage content: notices, announcements, achievement highlights

Dashboards: total courses, active enrollments, certification counts, assessment completion rates, participation trends (charts)

Manage subscription tier and billing status for the organization

COMPETENCY MAPPING ENGINE (CORE USP)

Each trainer profile stores tagged skills/subjects with proficiency levels (1–5)

Each course/subject stores required skill tags

Matching algorithm scores trainers against subject requirements using weighted tag overlap; returns ranked list of best-fit trainers per subject

Admin reviews ranked matches and confirms/overrides assignment

Recalculation triggers when trainer profile is updated or new course is created

AUTOMATION & NOTIFICATIONS

Auto-notification (in-app + email) on: new content published, new announcement, assessment deadline approaching (24h and 1h before), course assignment, certificate issued

Auto-scoring engine for MCQ submissions (immediate grading on submit)

Auto-certificate generation (PDF, org-branded) triggered on course completion + passing score

Scheduled job (cron / Celery beat / APScheduler) for deadline reminder dispatch

================================================== NON-FUNCTIONAL REQUIREMENTS

Page load time under 2.5s on standard broadband

99.5% uptime target

HTTPS enforced everywhere

Encrypted secrets via environment variables (.env), never hardcoded

Role-based data isolation enforced server-side on every query (no client-trust)

OWASP Top 10 mitigations (SQL injection prevention via ORM parameterized queries, XSS sanitization on all rendered user input, CSRF tokens on state-changing requests)

WCAG 2.1 AA accessibility compliance

Fully responsive: mobile, tablet, desktop breakpoints via Bootstrap grid

SEO optimization for public-facing marketing pages only

Graceful error handling with user-facing error states (not raw stack traces or Flask/Django debug pages in production)

API rate limiting per organization

Audit logging for admin actions (approvals, role changes, content publishing)

================================================== PAGE STRUCTURE

PUBLIC (Marketing)

Landing Page

Features

Pricing (tiered plans)

About

Contact

Privacy Policy

Terms of Service

AUTH

Login

Organization Signup

Invited User Signup

Forgot Password

Reset Password

Verify Email

TRAINEE

Dashboard

Profile (skills/qualifications/certificates)

Course Catalog

My Courses

Resource Viewer

Assessment (MCQ interface with timer)

Assessment Results

Certificates

Feedback Form

TRAINER

Dashboard

Profile (expertise/subjects)

Questionnaire Builder

Content Library Manager

Participation & Performance Monitor

Assigned Courses

ADMIN

Admin Dashboard (analytics overview with charts)

User Management & Approvals

Course Management

Competency Mapping Console

Homepage Content Publisher (notices/announcements)

Subscription & Billing Settings

Audit Logs

================================================== UI / UX DESIGN SYSTEM

Theme: Professional, Trust-Oriented, Growth-Focused

Primary: #5B739D (slate blue) Accent: #7DABAF (soft teal) Background: #F7F9FB (light neutral) Card BG: #FFFFFF Text: #1E293B Muted Text: #64748B Success: #4CAF82 Warning: #E0A73B Error: #D9534F

Design Rules:

Default light mode, professional enterprise aesthetic

Rounded corners: 10px (Bootstrap custom --bs-border-radius override)

Card-based layout using Bootstrap .card with subtle box-shadow (no glassmorphism, no neon)

Sidebar navigation per role (persistent, collapsible on mobile via Bootstrap Offcanvas)

Progress bars via Bootstrap .progress component for course completion and assessment status

Data visualization via Chart.js (bar/line/donut) on Admin and Trainer dashboards, rendered inside React components

Skeleton loaders (custom CSS shimmer classes) for async content

Toast notifications via Bootstrap Toasts for actions (success/error/info)

Clear visual hierarchy separating role-specific sections

Empty states with guidance text and illustration placeholder for new users

Override Bootstrap's default CSS variables (--bs-primary, --bs-secondary, etc.) to match the CapacityConnect palette instead of using default Bootstrap blue

Typography:

Sans-serif: Inter or Roboto (loaded via Google Fonts CDN)

Clear heading hierarchy (H1–H4), consistent spacing scale using Bootstrap utility classes

Layout:

Fixed sidebar + top navbar for authenticated views (Bootstrap Navbar + custom sidebar component)

Centered, focused layout for auth pages (Bootstrap .container with max-width constraint)

Wide grid dashboard for Admin analytics (Bootstrap 12-column grid)

High contrast, minimal clutter, generous white space

================================================== TECHNICAL STACK

Frontend (current phase):

HTML5 + CSS3 + vanilla JavaScript (ES6+) for base templates and non-interactive pages

React (functional components, hooks: useState, useEffect, useContext) for dashboards, forms, MCQ assessment interface, and dynamic tables

Bootstrap 5 (CSS + JS bundle via CDN or npm) for grid, components, responsiveness

Chart.js (via react-chartjs-2 or vanilla Chart.js) for analytics visualizations

Fetch API or Axios for HTTP requests to backend

Structured for future migration to TypeScript + Tailwind CSS (document component prop shapes in JSDoc comments now)

Backend (choose one, implement fully):

Option A — Flask: Flask, Flask-RESTful/Flask-Smorest, Flask-SQLAlchemy, Flask-Migrate, Flask-JWT-Extended, Marshmallow, Flask-CORS, Flask-Mail

Option B — Django: Django, Django REST Framework, djangorestframework-simplejwt, django-cors-headers, Django's built-in email backend or django-anymail

Scheduled Jobs:

APScheduler (Flask) or Celery + Celery Beat with Redis broker (Django) for deadline reminders and async certificate generation

PDF Generation:

ReportLab or WeasyPrint for certificate generation

File Storage SDK:

boto3 (AWS S3) or firebase-admin (Firebase Storage)

Email:

SendGrid or AWS SES Python SDK for transactional emails

Monitoring:

Python logging module with structured log format

Sentry SDK for error tracking

================================================== INTEGRATION LOGIC

COMPETENCY MATCHING WORKFLOW

Trigger: trainer profile update OR new course created

Fetch trainer skill-tag vectors and course required-skill vectors from database

Compute weighted overlap score per trainer-subject pair (Python service/utility function)

Rank trainers descending by score, store in trainer_subjects mapping table

Push ranked suggestions to Admin Competency Mapping Console via API endpoint

Admin confirms → writes final assignment to courses table

NOTIFICATION WORKFLOW

Event trigger (content published, deadline approaching, certificate issued) fires in backend service layer

Insert notification record (notifications table) scoped to relevant user(s)

Dispatch email via SendGrid/SES in parallel (async task via Celery/APScheduler)

Frontend polls a notification endpoint (or uses short-interval fetch) for in-app notification badge updates

ASSESSMENT & CERTIFICATION WORKFLOW

Trainee submits MCQ assessment before deadline (React form → POST to backend)

Backend auto-scores against answer key, stores submission + score

If score >= course passing threshold AND all required assessments complete → trigger certificate generation job (async task)

Generate PDF certificate (org-branded template, ReportLab/WeasyPrint) → upload to cloud storage → link to trainee profile

Notify trainee of certificate availability

BILLING & SUBSCRIPTION LOGIC

Organization tier stored on organizations table (free/tiered/enterprise)

Feature-gating middleware/decorator checks tier before allowing: active user count, advanced analytics access, storage quota, white-labeling

Integration point for payment gateway (Razorpay or Stripe Python SDK) for subscription checkout and webhook-based tier updates

DATABASE TABLES

organizations

users

roles

courses

enrollments

trainer_subjects

competency_map

assessments

questions

submissions

certificates

resources

notifications

announcements

audit_logs

subscriptions

================================================== OUTPUT EXPECTATIONS

Generate:

Complete frontend codebase: HTML/CSS/vanilla JS base + React components (organized in components/, pages/, hooks/, services/ folders) using Bootstrap 5 for styling, structured for a clean future migration to TypeScript + Tailwind CSS

Complete backend codebase in the chosen Python framework (Flask or Django) with layered architecture (routes/views, services, models, serializers, middleware)

Fully defined API contracts (route list with request/response JSON examples)

Reusable UI component set matching the design system (cards, sidebar, navbar, progress bars, toasts, MCQ question component, data table)

Working RBAC middleware/decorators with organization-scoped data isolation on every protected endpoint

Database schema (SQL migration files or ORM models — Alembic for Flask / Django migrations) with seed script for demo data (1 sample org, 3 role users, 2 sample courses, sample assessment)

Certificate PDF generation module with org-branding template

Notification dispatch module and scheduled reminder job

Environment variable template (.env.example)

Setup and local run scripts (for both frontend static/React build and Python backend virtualenv setup)

README with architecture overview, chosen backend framework rationale, and setup instructions

Deployment guide (frontend: Vercel/Netlify/static hosting; backend: Render/Railway/PythonAnywhere/AWS)

API documentation (endpoint list with request/response examples)

Code Quality:

SOLID principles, layered/modular architecture

Python type hints throughout backend code

PEP 8 compliant (Black/Flake8 formatting), JS code following consistent ESLint-style conventions even without a build-enforced linter

No mock data left in production code paths (seed data isolated to a dedicated seed script)

No placeholder text, TODOs, or stub functions in delivered code

================================================== RESTRICTIONS

DO NOT:

Build a generic social network or chat/messaging system

Add unrelated AI content-generation tools (not required by this scope)

Implement live video conferencing (out of scope; only pre-recorded resource delivery)

Store files locally on the application server (must use cloud storage)

Mix Flask and Django in the same codebase — pick exactly one

Introduce TypeScript or Tailwind CSS in this phase (explicitly deferred to a later migration phase)

Add gamification features (badges, leaderboards) unless explicitly requested later

Build native mobile apps (web-only, responsive design suffices)

Skip organization-level data isolation for any endpoint

Leave any role's dashboard without real backend-driven data (no hardcoded UI-only stats)

Focus only on the role-based Learning Management Portal scope defined above.

================================================== PROJECT GOAL

Deliver a scalable, secure, multi-tenant, production-ready Enterprise Learning Management Portal — built with HTML/CSS/JS + React + Bootstrap 5 on the frontend and Flask or Django on the backend — that unifies trainee learning, trainer content delivery, and admin oversight through an automated competency-mapping engine. The codebase must be cleanly structured to support a future migration to TypeScript + Tailwind CSS without architectural rework, optimized for B2B SaaS deployment, subscription monetization, and immediate real-world usability by corporate L&D teams.

The final output must be immediately deployable.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://capacity-match-learn.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e6dc8b7f-6168-4ec9-977d-c625dc880a30).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
