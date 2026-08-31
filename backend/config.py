import os
from datetime import timedelta

class Config:
    """Production Flask configuration for CapacityConnect Enterprise LMS."""
    SECRET_KEY = os.getenv("SECRET_KEY", "capacity-connect-enterprise-secret-key-2026")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "sqlite:///capacity_connect.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-capacity-connect-secret-key-9841")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)
    
    # AWS S3 / Cloud Storage Settings
    AWS_S3_BUCKET = os.getenv("AWS_S3_BUCKET", "capacity-connect-media-storage")
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "mock-aws-access-key")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "mock-aws-secret-key")
    AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
    
    # Max file size: 200 MB
    MAX_CONTENT_LENGTH = 200 * 1024 * 1024
