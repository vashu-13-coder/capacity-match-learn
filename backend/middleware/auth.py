from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import get_jwt, verify_jwt_in_request

def role_required(allowed_roles):
    """
    Decorator enforcing role-based access control (RBAC) for API endpoints.
    
    :param allowed_roles: List of allowed roles, e.g. ['trainee', 'trainer', 'admin']
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            user_role = claims.get("role")
            
            if user_role not in allowed_roles:
                return jsonify({"error": "Forbidden", "message": "Access restricted to required role"}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator

def org_scoped(fn):
    """
    Decorator extracting organization_id from JWT token and injecting it into endpoint logic
    to enforce server-side query isolation.
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        org_id = claims.get("organization_id")
        
        if not org_id:
            return jsonify({"error": "Unauthorized", "message": "Missing organization scope in token"}), 401
            
        kwargs["organization_id"] = org_id
        return fn(*args, **kwargs)
    return wrapper
