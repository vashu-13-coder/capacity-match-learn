import io
from typing import Dict

def generate_pdf_certificate_bytes(
    trainee_name: str, course_title: str, cert_no: str, score_percent: int, issue_date: str, org_name: str
) -> bytes:
    """
    Generates a PDF certificate document for course completion.
    Returns raw PDF bytes suitable for S3 upload or HTTP response streaming.
    """
    try:
        from reportlab.lib.pagesizes import letter, landscape
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib import colors

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=landscape(letter), rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            'CertTitle',
            parent=styles['Heading1'],
            fontSize=28,
            leading=34,
            textColor=colors.HexColor('#5B739D'),
            alignment=1
        )
        
        name_style = ParagraphStyle(
            'CertName',
            parent=styles['Heading2'],
            fontSize=24,
            leading=30,
            textColor=colors.HexColor('#1E293B'),
            alignment=1
        )

        body_style = ParagraphStyle(
            'CertBody',
            parent=styles['Normal'],
            fontSize=12,
            leading=18,
            textColor=colors.HexColor('#64748B'),
            alignment=1
        )

        elements = [
            Spacer(1, 40),
            Paragraph(f"<b>{org_name.upper()}</b>", body_style),
            Spacer(1, 15),
            Paragraph("CERTIFICATE OF COMPLETION", title_style),
            Spacer(1, 25),
            Paragraph("This is proudly awarded to", body_style),
            Spacer(1, 10),
            Paragraph(f"<b>{trainee_name}</b>", name_style),
            Spacer(1, 15),
            Paragraph(f"For passing the official assessment with a score of <b>{score_percent}%</b> in <b>{course_title}</b>.", body_style),
            Spacer(1, 30),
            Paragraph(f"Certificate No: <b>{cert_no}</b> • Date Issued: {issue_date}", body_style),
        ]

        doc.build(elements)
        buffer.seek(0)
        return buffer.getvalue()
    except ImportError:
        # Fallback raw byte placeholder if reportlab is not installed in local environment
        header = f"%PDF-1.4 Certificate for {trainee_name} - {cert_no} ({score_percent}%)"
        return header.encode('utf-8')
