from flask import Blueprint, request, jsonify
from middleware.auth import role_required, org_scoped
from services.pdf_generator import generate_pdf_certificate_bytes
import uuid

trainee_bp = Blueprint("trainee", __name__, url_prefix="/api/v1/trainee")

@trainee_bp.route("/dashboard", methods=["GET"])
@role_required(["trainee", "admin"])
@org_scoped
def trainee_dashboard(organization_id):
    return jsonify({
        "enrolled_courses": 3,
        "completed_courses": 1,
        "certificates_earned": 1,
        "pending_assessments": 1,
        "active_tracks": [
            {
                "course_id": "c1",
                "title": "Industrial Safety Fundamentals",
                "subject": "EHS",
                "progress": 100,
                "status": "completed",
                "certificate_id": "cert-c1-u4"
            },
            {
                "course_id": "c2",
                "title": "Advanced Data Analytics for Ops",
                "subject": "Analytics",
                "progress": 65,
                "status": "in_progress",
                "next_deadline": "2026-09-05"
            }
        ]
    }), 200

@trainee_bp.route("/assessment/submit", methods=["POST"])
@role_required(["trainee"])
@org_scoped
def submit_assessment(organization_id):
    data = request.get_json() or {}
    assessment_id = data.get("assessment_id")
    answers = data.get("answers", {})

    # Mock scoring evaluation logic
    score_percent = 92
    passed = score_percent >= 70
    cert_id = None

    if passed:
        cert_id = f"cert-{uuid.uuid4().hex[:8]}"

    return jsonify({
        "submission_id": str(uuid.uuid4()),
        "score_percent": score_percent,
        "passed": passed,
        "certificate_id": cert_id,
        "message": "Assessment processed successfully"
    }), 200

@trainee_bp.route("/certificate/<cert_id>/download", methods=["GET"])
def download_certificate(cert_id):
    pdf_bytes = generate_pdf_certificate_bytes(
        trainee_name="Hannah Berg",
        course_title="Industrial Safety Fundamentals",
        cert_no="CC-2026-EHS-89412",
        score_percent=92,
        issue_date="2026-06-01",
        org_name="Northwind Industries"
    )
    return pdf_bytes, 200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": f"attachment; filename={cert_id}.pdf"
    }
