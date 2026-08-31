from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Organization(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    tier = db.Column(db.String(32), default="Growth")  # Free, Growth, Enterprise
    seats = db.Column(db.Integer, default=250)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), unique=True, nullable=False)  # trainee, trainer, admin

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), db.ForeignKey("organizations.id"), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role_name = db.Column(db.String(32), nullable=False)  # trainee, trainer, admin
    status = db.Column(db.String(32), default="active")
    invited_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password: str):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

class Course(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), db.ForeignKey("organizations.id"), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    subject = db.Column(db.String(64), nullable=False)
    description = db.Column(db.Text, nullable=True)
    trainer_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=True)
    trainer_name = db.Column(db.String(128), nullable=True)
    status = db.Column(db.String(32), default="published")
    required_skills = db.Column(db.Text, nullable=True)  # JSON or comma-separated tags

class Enrollment(db.Model):
    __tablename__ = "enrollments"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    course_id = db.Column(db.String(36), db.ForeignKey("courses.id"), nullable=False)
    trainee_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    progress_percent = db.Column(db.Integer, default=0)
    status = db.Column(db.String(32), default="in_progress")
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

class TrainerSubject(db.Model):
    __tablename__ = "trainer_subjects"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    trainer_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    subject_tag = db.Column(db.String(64), nullable=False)
    proficiency_level = db.Column(db.Integer, default=3)  # 1 to 5

class CompetencyMap(db.Model):
    __tablename__ = "competency_map"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    course_id = db.Column(db.String(36), db.ForeignKey("courses.id"), nullable=False)
    trainer_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    overlap_score = db.Column(db.Float, default=0.0)
    confirmed_by_admin = db.Column(db.Boolean, default=False)

class Assessment(db.Model):
    __tablename__ = "assessments"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    course_id = db.Column(db.String(36), db.ForeignKey("courses.id"), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    time_limit_minutes = db.Column(db.Integer, default=15)
    passing_score_percent = db.Column(db.Integer, default=70)

class Question(db.Model):
    __tablename__ = "questions"
    id = db.Column(db.String(36), primary_key=True)
    assessment_id = db.Column(db.String(36), db.ForeignKey("assessments.id"), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    options_json = db.Column(db.Text, nullable=False)  # JSON array of options
    correct_option_index = db.Column(db.Integer, nullable=False)
    explanation = db.Column(db.Text, nullable=True)

class Submission(db.Model):
    __tablename__ = "submissions"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    assessment_id = db.Column(db.String(36), db.ForeignKey("assessments.id"), nullable=False)
    trainee_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    score_percent = db.Column(db.Integer, nullable=False)
    passed = db.Column(db.Boolean, nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

class Certificate(db.Model):
    __tablename__ = "certificates"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    certificate_no = db.Column(db.String(64), unique=True, nullable=False)
    course_id = db.Column(db.String(36), db.ForeignKey("courses.id"), nullable=False)
    trainee_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    score_percent = db.Column(db.Integer, nullable=False)
    pdf_url = db.Column(db.String(512), nullable=False)
    issued_at = db.Column(db.DateTime, default=datetime.utcnow)

class Resource(db.Model):
    __tablename__ = "resources"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    course_id = db.Column(db.String(36), db.ForeignKey("courses.id"), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    resource_type = db.Column(db.String(32), nullable=False)  # video, presentation, document
    format = db.Column(db.String(16), nullable=False)  # MP4, PPTX, PDF, DOCX
    url = db.Column(db.String(512), nullable=False)
    file_size_mb = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Notification(db.Model):
    __tablename__ = "notifications"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    body = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Announcement(db.Model):
    __tablename__ = "announcements"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    body = db.Column(db.Text, nullable=False)
    audience = db.Column(db.String(32), default="All")  # All, Trainees, Trainers
    published_at = db.Column(db.DateTime, default=datetime.utcnow)

class AuditLog(db.Model):
    __tablename__ = "audit_logs"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), nullable=False)
    actor_name = db.Column(db.String(128), nullable=False)
    action = db.Column(db.String(128), nullable=False)
    target = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Subscription(db.Model):
    __tablename__ = "subscriptions"
    id = db.Column(db.String(36), primary_key=True)
    organization_id = db.Column(db.String(36), db.ForeignKey("organizations.id"), nullable=False)
    plan_tier = db.Column(db.String(32), default="Growth")
    status = db.Column(db.String(32), default="active")
    renews_on = db.Column(db.DateTime, nullable=False)
