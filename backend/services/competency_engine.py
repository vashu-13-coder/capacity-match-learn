from typing import List, Dict, Any

def compute_trainer_subject_overlap(
    trainer_skills: List[Dict[str, Any]], required_skills: List[str]
) -> float:
    """
    Computes a weighted competency overlap score between a trainer's skill vector
    and a course's required skill tags.
    
    :param trainer_skills: List of dicts [{'tag': 'sql', 'proficiency': 5}, ...]
    :param required_skills: List of required skill tags ['sql', 'statistics', 'dmaic']
    :return: Overlap score between 0.0 and 1.0 (float)
    """
    if not required_skills:
        return 0.0

    trainer_map = {s["tag"].lower(): s["proficiency"] for s in trainer_skills}
    total_max_possible = len(required_skills) * 5.0
    accumulated_score = 0.0

    for req_tag in required_skills:
        tag_lower = req_tag.lower()
        if tag_lower in trainer_map:
            accumulated_score += float(trainer_map[tag_lower])

    score = round(accumulated_score / total_max_possible, 2)
    return min(max(score, 0.0), 1.0)
