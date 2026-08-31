from flask import Blueprint, request, jsonify
from middleware.auth import role_required, org_scoped
from services.competency_engine import compute_trainer_subject_overlap
import uuid

trainer_bp = Blueprint("trainer", __name__, url_prefix="/api/v1/trainer")

@trainer_bp.route("/profile/skills", methods=["POST"])
@role_required(["trainer", "admin"])
@org_scoped
def update_skills(organization_id):
    data = request.get_json() or {}
    skills = data.get("skills", [])  # [{'tag': 'sql', 'proficiency': 5}]
    
    # Recalculate match overlap score for sample course
    req_skills = ["sql", "statistics", "visualisation"]
    score = compute_trainer_subject_overlap(skills, req_skills)

    return jsonify({
        "message": "Trainer skills updated successfully",
        "skills_count": len(skills),
        "recalculated_match_score": score
    }), 200

@trainer_bp.route("/questionnaires", methods=["POST"])
@role_required(["trainer", "admin"])
@org_scoped
def create_questionnaire(organization_id):
    data = request.get_json() or {}
    title = data.get("title")
    questions = data.get("questions", [])

    return jsonify({
        "questionnaire_id": str(uuid.uuid4()),
        "title": title,
        "total_questions": len(questions),
        "message": "Questionnaire published"
    }), 201
