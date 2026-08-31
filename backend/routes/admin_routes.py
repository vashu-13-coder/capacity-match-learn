from flask import Blueprint, request, jsonify
from middleware.auth import role_required, org_scoped

admin_bp = Blueprint("admin", __name__, url_prefix="/api/v1/admin")

@admin_bp.route("/competency/matches", methods=["GET"])
@role_required(["admin"])
@org_scoped
def get_competency_matches(organization_id):
    return jsonify({
        "course_id": "c2",
        "course_title": "Advanced Data Analytics for Ops",
        "required_skills": ["sql", "statistics", "visualisation"],
        "ranked_trainers": [
            {
                "trainer_id": "u7",
                "name": "Marcus Feld",
                "score": 0.91,
                "matched_skills": [
                    {"tag": "sql", "proficiency": 5},
                    {"tag": "statistics", "proficiency": 4},
                    {"tag": "visualisation", "proficiency": 4}
                ],
                "confirmed": True
            },
            {
                "trainer_id": "u3",
                "name": "Daniel Okoye",
                "score": 0.62,
                "matched_skills": [
                    {"tag": "statistics", "proficiency": 3},
                    {"tag": "visualisation", "proficiency": 3}
                ],
                "confirmed": False
            }
        ]
    }), 200

@admin_bp.route("/competency/confirm", methods=["POST"])
@role_required(["admin"])
@org_scoped
def confirm_assignment(organization_id):
    data = request.get_json() or {}
    course_id = data.get("course_id")
    trainer_id = data.get("trainer_id")

    return jsonify({
        "message": f"Trainer {trainer_id} confirmed and assigned to course {course_id}",
        "status": "success"
    }), 200
