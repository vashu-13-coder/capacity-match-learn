"""
Seed Script for CapacityConnect Demo Database.
Populates PostgreSQL/SQLite database with sample Organization, 3 Role Users, Courses, and Competency Data.
"""
from app import create_app
from models import db, Organization, User, Course, Assessment, Question
import uuid

def seed_database():
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()

        org_id = "org-northwind-1"
        org = Organization(id=org_id, name="Northwind Industries", tier="Growth", seats=250)
        db.session.add(org)

        # Users for 3 Roles
        admin = User(
            id="u5", organization_id=org_id, name="Kenji Watanabe",
            email="kenji.watanabe@northwind.co", role_name="admin", status="active"
        )
        admin.set_password("password123")

        trainer = User(
            id="u3", organization_id=org_id, name="Daniel Okoye",
            email="daniel.okoye@northwind.co", role_name="trainer", status="active"
        )
        trainer.set_password("password123")

        trainee = User(
            id="u4", organization_id=org_id, name="Hannah Berg",
            email="hannah.berg@northwind.co", role_name="trainee", status="active"
        )
        trainee.set_password("password123")

        db.session.add_all([admin, trainer, trainee])

        # Courses
        c1 = Course(
            id="c1", organization_id=org_id, title="Industrial Safety Fundamentals",
            subject="EHS", trainer_id="u3", trainer_name="Daniel Okoye", status="published",
            required_skills="safety-compliance,risk-assessment,iso-45001"
        )
        db.session.add(c1)

        db.session.commit()
        print("[OK] Database successfully seeded with CapacityConnect demo records.")

if __name__ == "__main__":
    seed_database()
