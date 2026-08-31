from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db
from routes.auth_routes import auth_bp
from routes.trainee_routes import trainee_bp
from routes.trainer_routes import trainer_bp
from routes.admin_routes import admin_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register API v1 Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(trainee_bp)
    app.register_blueprint(trainer_bp)
    app.register_blueprint(admin_bp)

    @app.route("/api/v1/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "CapacityConnect Enterprise LMS API",
            "version": "v1.0.0"
        }), 200

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
