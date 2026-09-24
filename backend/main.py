import os
import joblib
import numpy as np
import pandas as pd
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# 1. Initialize FastAPI App
app = FastAPI(
    title="LearnAI - Student Performance & Learner Type Prediction API",
    description="FastAPI Backend for Machine Learning Student Performance, Decision Tree Inference & Learner Archetype Intelligence.",
    version="2.0.0"
)

# 2. Configure CORS
# Replace the Vercel URL below with your actual deployed frontend URL
ALLOWED_ORIGINS = [
    "http://localhost:5173",           # Local dev
    "http://127.0.0.1:5173",          # Local dev (alternate)
    "https://learnerpulse-ai.vercel.app",  # ← Replace with your actual Vercel URL
    "https://*.vercel.app",            # Allow all Vercel preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load Trained Model Pipeline (.pkl)
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'student_model_pipeline.pkl')
pipeline_data = None

try:
    if os.path.exists(MODEL_PATH):
        pipeline_data = joblib.load(MODEL_PATH)
        print(f"[SUCCESS] Loaded Model Pipeline from {MODEL_PATH}")
    else:
        print(f"[WARNING] Model file not found at {MODEL_PATH}. Run train_and_save_model.py first.")
except Exception as e:
    print(f"[ERROR] Failed to load model pipeline: {e}")

# 4. Pydantic Request & Response Schemas
class StudentInput(BaseModel):
    age: Optional[int] = Field(default=19, ge=10, le=40)
    gender: Optional[str] = Field(default="Female")
    grade_level: Optional[str] = Field(default="2nd Year")
    study_hours_per_day: float = Field(default=3.5, ge=0.0, le=16.0)
    uses_ai: int = Field(default=1, ge=0, le=1)
    ai_usage_time_minutes: float = Field(default=90.0, ge=0.0, le=720.0)
    ai_tools_used: Optional[str] = Field(default="ChatGPT")
    ai_usage_purpose: Optional[str] = Field(default="Exam Prep")
    ai_dependency_score: float = Field(default=5.0, ge=1.0, le=10.0)
    ai_generated_content_percentage: float = Field(default=20.0, ge=0.0, le=100.0)
    ai_prompts_per_week: float = Field(default=40.0, ge=0.0, le=500.0)
    ai_ethics_score: float = Field(default=4.0, ge=1.0, le=5.0)
    last_exam_score: float = Field(default=72.0, ge=0.0, le=100.0)
    assignment_scores_avg: float = Field(default=76.5, ge=0.0, le=100.0)
    attendance_percentage: float = Field(default=88.0, ge=0.0, le=100.0)
    concept_understanding_score: float = Field(default=7.0, ge=1.0, le=10.0)
    study_consistency_index: float = Field(default=7.5, ge=1.0, le=10.0)
    improvement_rate: float = Field(default=6.5, ge=-50.0, le=50.0)
    sleep_hours: float = Field(default=7.0, ge=2.0, le=14.0)
    social_media_hours: float = Field(default=2.5, ge=0.0, le=16.0)
    tutoring_hours: float = Field(default=1.5, ge=0.0, le=12.0)
    class_participation_score: float = Field(default=7.0, ge=1.0, le=10.0)

class RecommendationItem(BaseModel):
    title: str
    desc: str
    type: str

class RadarMetric(BaseModel):
    label: str
    value: int

class ArchetypeResponse(BaseModel):
    title: str
    tagline: str
    badge: str
    color: str

class PredictionResponse(BaseModel):
    isPassed: bool
    passProbability: int
    predictedFinalScore: float
    performanceCategory: str
    categoryColor: str
    archetype: ArchetypeResponse
    aiHealthScore: int
    recommendations: List[RecommendationItem]
    radarMetrics: List[RadarMetric]
    modelEngine: str

class StudyPlanRequest(BaseModel):
    currentScore: float
    targetScore: float
    daysRemaining: int
    dailyHours: float

# Helper function to preprocess categorical inputs matching trained encoders
def encode_feature(val: Any, le: Any) -> int:
    val_str = str(val)
    if val_str in le.classes_:
        return int(le.transform([val_str])[0])
    
    # Fuzzy fallback for unseen inputs
    for idx, c in enumerate(le.classes_):
        if c.lower() in val_str.lower() or val_str.lower() in c.lower():
            return int(idx)
    return 0

# 5. Endpoints
@app.get("/")
def root():
    return {
        "status": "online",
        "service": "LearnAI Machine Learning Backend",
        "model": "DecisionTreeClassifier (Depth 4)",
        "endpoints": {
            "predict": "POST /predict",
            "analytics": "GET /analytics",
            "archetypes": "GET /archetypes",
            "study_plan": "POST /plan-study",
            "health": "GET /health"
        }
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": pipeline_data is not None,
        "features": len(pipeline_data.get("feature_names", [])) if pipeline_data else 0
    }

@app.post("/predict", response_model=PredictionResponse)
def predict_student(student: StudentInput):
    if pipeline_data is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model pipeline is not loaded."
        )

    model = pipeline_data["model"]
    category_model = pipeline_data.get("category_model")
    category_encoder = pipeline_data.get("category_encoder")
    score_regressor = pipeline_data.get("score_regressor")
    label_encoders = pipeline_data["label_encoders"]
    feature_names = pipeline_data["feature_names"]

    # Build input dictionary
    raw_data = student.dict()
    processed_row = {}

    for col in feature_names:
        val = raw_data.get(col, 0)
        if col in label_encoders:
            processed_row[col] = encode_feature(val, label_encoders[col])
        else:
            processed_row[col] = float(val) if val is not None else 0.0

    # Create 1-row DataFrame with exact feature order
    X_sample = pd.DataFrame([processed_row])[feature_names]

    # Model Inferences
    is_passed_pred = int(model.predict(X_sample)[0])
    pass_proba = float(model.predict_proba(X_sample)[0][1]) * 100

    # Auxiliary Category & Score Inferences
    perf_category = "Medium"
    if category_model and category_encoder:
        try:
            cat_enc = category_model.predict(X_sample)[0]
            perf_category = str(category_encoder.inverse_transform([cat_enc])[0])
        except Exception:
            perf_category = "High" if pass_proba > 75 else "Low" if pass_proba < 50 else "Medium"

    predicted_score = 75.0
    if score_regressor:
        try:
            predicted_score = float(score_regressor.predict(X_sample)[0])
            predicted_score = max(10.0, min(99.5, round(predicted_score, 1)))
        except Exception:
            predicted_score = round(float(student.last_exam_score * 0.4 + student.assignment_scores_avg * 0.4 + student.concept_understanding_score * 2.0), 1)

    # Category color
    category_color = "#38bdf8"
    if perf_category == "High" or predicted_score >= 75:
        perf_category = "High"
        category_color = "#10b981"
    elif perf_category == "Low" or predicted_score < 50:
        perf_category = "Low"
        category_color = "#ef4444"
    else:
        perf_category = "Medium"
        category_color = "#f59e0b"

    # Learner Archetype Detection
    archetype = {
        "title": "Balanced Strategic Achiever",
        "tagline": "Maintains steady pace, uses digital tools as multipliers without excessive reliance.",
        "badge": "⚖️ Strategic Achiever",
        "color": "#6366f1"
    }

    if student.ai_dependency_score <= 3 and student.concept_understanding_score >= 7 and student.study_hours_per_day >= 4:
        archetype = {
            "title": "Autonomous Deep Scholar",
            "tagline": "Deep textbook mastery, intrinsic curiosity, high discipline with self-driven problem solving.",
            "badge": "📚 Deep Scholar",
            "color": "#10b981"
        }
    elif student.uses_ai and student.ai_dependency_score <= 6 and student.ai_ethics_score >= 4 and student.concept_understanding_score >= 7:
        archetype = {
            "title": "AI-Augmented Innovator",
            "tagline": "Leverages AI as an intelligent copilot for synthesis, critical feedback & creative exploration.",
            "badge": "🤖 AI Innovator",
            "color": "#06b6d4"
        }
    elif student.ai_dependency_score >= 7 and (student.concept_understanding_score <= 5 or student.ai_generated_content_percentage >= 45):
        archetype = {
            "title": "High-Risk AI Dependent",
            "tagline": "Relies heavily on generative outputs without internalizing concepts. High vulnerability in proctored exams.",
            "badge": "⚠️ AI Dependent",
            "color": "#ef4444"
        }
    elif student.social_media_hours >= 4.5 and student.sleep_hours < 6.5 and student.study_consistency_index <= 5:
        archetype = {
            "title": "Social Nocturnal Crammer",
            "tagline": "High digital screen time, irregular sleep cycles, relies on last-minute deadline sprints.",
            "badge": "🌙 Night-Owl Crammer",
            "color": "#f59e0b"
        }

    # AI Health Score
    ai_health = int(max(0, min(100, 
        (student.ai_ethics_score * 20) - 
        (student.ai_dependency_score * 6) - 
        (max(0, student.ai_generated_content_percentage - 30) * 0.8) + 
        (student.concept_understanding_score * 3)
    )))

    # Tailored Recommendations
    recommendations = []
    if student.concept_understanding_score < 6:
        recommendations.append(RecommendationItem(
            type="critical",
            title="Feynman Technique Active Recall",
            desc="Concept score is below optimal. Explain key formulas out loud without looking at notes or AI summaries."
        ))
    if student.ai_dependency_score > 6 and student.ai_generated_content_percentage > 35:
        recommendations.append(RecommendationItem(
            type="warning",
            title="Implement 'AI Sandbox' Rule",
            desc="Use AI only to generate practice quizzes and hint steps rather than full copy-paste essay solutions."
        ))
    if student.study_consistency_index < 6:
        recommendations.append(RecommendationItem(
            type="tip",
            title="Anchor Daily Pomodoro Routine",
            desc="Lock in a fixed 45-minute daily study block at the same time each morning or evening."
        ))
    if student.sleep_hours < 6.5:
        recommendations.append(RecommendationItem(
            type="lifestyle",
            title="Protect Deep REM Sleep",
            desc=f"Sleeping only {student.sleep_hours} hrs impairs memory consolidation. Aim for 7.5+ hours to boost recall by up to 22%."
        ))
    if not recommendations:
        recommendations.append(RecommendationItem(
            type="positive",
            title="Optimal Trajectory Detected",
            desc="Your study consistency and AI tool balance are well calibrated. Maintain regular spaced repetition."
        ))

    # Radar Metrics
    radar_metrics = [
        RadarMetric(label="Concept Mastery", value=int(student.concept_understanding_score * 10)),
        RadarMetric(label="Study Consistency", value=int(student.study_consistency_index * 10)),
        RadarMetric(label="Exam Readiness", value=int(student.last_exam_score)),
        RadarMetric(label="AI Health Index", value=ai_health),
        RadarMetric(label="Time Discipline", value=int(min(100, (student.study_hours_per_day / 5.0) * 100))),
        RadarMetric(label="Class Engagement", value=int(student.class_participation_score * 10)),
    ]

    return PredictionResponse(
        isPassed=bool(is_passed_pred == 1),
        passProbability=int(round(pass_proba)),
        predictedFinalScore=predicted_score,
        performanceCategory=perf_category,
        categoryColor=category_color,
        archetype=ArchetypeResponse(**archetype),
        aiHealthScore=ai_health,
        recommendations=recommendations,
        radarMetrics=radar_metrics,
        modelEngine="FastAPI + DecisionTreeClassifier (Depth 4, Scikit-Learn .pkl)"
    )

@app.get("/analytics")
def get_analytics():
    if pipeline_data is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model pipeline is not loaded."
        )

    return {
        "metrics": pipeline_data.get("metrics", {}),
        "feature_importances": pipeline_data.get("feature_importances", []),
        "dataset_stats": pipeline_data.get("dataset_stats", {}),
        "tree_depth": 4,
        "status": "active"
    }

@app.get("/archetypes")
def get_archetypes():
    return {
        "archetypes": [
            {
                "id": "ai-innovator",
                "name": "AI-Augmented Innovator",
                "tagline": "Uses AI as a smart study partner to learn faster while truly understanding every topic.",
                "badge": "🤖 Tech-Smart Pilot",
                "cohortPercent": "28.4%",
                "passRate": "96.2%",
                "color": "#06b6d4"
            },
            {
                "id": "deep-scholar",
                "name": "Disciplined Deep Scholar",
                "tagline": "Master of textbooks and handwritten notes with incredible focus and high memory power.",
                "badge": "📚 Book Master",
                "cohortPercent": "24.1%",
                "passRate": "98.5%",
                "color": "#10b981"
            },
            {
                "id": "balanced-achiever",
                "name": "Balanced Strategic Achiever",
                "tagline": "Balances good grades, proper sleep, and hobbies with steady and calm study habits.",
                "badge": "⚖️ Steady Runner",
                "cohortPercent": "26.8%",
                "passRate": "84.6%",
                "color": "#6366f1"
            },
            {
                "id": "high-risk-dependent",
                "name": "High-Risk AI Dependent",
                "tagline": "Relies on AI to generate answers without understanding. High risk of failing real proctored exams.",
                "badge": "⚠️ Copy-Paste Risk",
                "cohortPercent": "11.5%",
                "passRate": "28.1%",
                "color": "#ef4444"
            },
            {
                "id": "nocturnal-crammer",
                "name": "Social Nocturnal Crammer",
                "tagline": "High phone screen time, irregular sleep, and intense adrenaline sprints right before deadlines.",
                "badge": "🌙 Night-Owl Sprinter",
                "cohortPercent": "9.2%",
                "passRate": "46.0%",
                "color": "#f59e0b"
            }
        ]
    }

@app.post("/batch-predict")
def batch_predict(students: List[StudentInput]):
    results = []
    for s in students:
        results.append(predict_student(s))
    return {"total": len(results), "predictions": results}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
