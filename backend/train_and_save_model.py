"""
Model Training & Serialization Pipeline
Extracts preprocessing and training steps from:
- Student_Performance_EDA.ipynb
- data_preprocessing.ipynb
- model Training.ipynb

Trains DecisionTree model (depth=4) on student_performance.xlsx and saves all assets into student_model_pipeline.pkl
"""

import os
import sys
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, precision_score, recall_score, f1_score

def train_and_serialize():
    print("[INFO] Starting Model Training Pipeline...")
    
    # 1. Load Dataset
    excel_path = os.path.join(os.path.dirname(__file__), '..', 'student_performance.xlsx')
    if not os.path.exists(excel_path):
        excel_path = 'student_performance.xlsx'
        
    df = pd.read_excel(excel_path)
    print(f"[INFO] Dataset Loaded: {df.shape[0]} rows, {df.shape[1]} columns")

    # 2. Data Cleaning & Preprocessing (matching notebooks)
    # Convert study_consistency_index to numeric
    df['study_consistency_index'] = pd.to_numeric(df['study_consistency_index'], errors='coerce')
    df['study_consistency_index'] = df['study_consistency_index'].fillna(df['study_consistency_index'].median())

    # Fill categorical missing values
    df['ai_tools_used'] = df['ai_tools_used'].fillna('None').astype(str)
    df['ai_usage_purpose'] = df['ai_usage_purpose'].fillna('None').astype(str)
    df['gender'] = df['gender'].fillna('Other').astype(str)
    df['grade_level'] = df['grade_level'].fillna('1st Year').astype(str)

    # 3. Label Encoding for Categorical Columns
    cat_cols = ['gender', 'grade_level', 'ai_tools_used', 'ai_usage_purpose']
    label_encoders = {}
    
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
        print(f"  - Encoded {col} with classes: {list(le.classes_)}")

    # 4. Feature Selection
    # Drop student_id, final_score, performance_category, passed as in model Training.ipynb
    drop_cols = ['student_id', 'final_score', 'performance_category', 'passed']
    feature_cols = [c for c in df.columns if c not in drop_cols]
    
    X = df[feature_cols]
    y_passed = df['passed']
    y_category = df['performance_category']
    y_score = df['final_score']

    print(f"[INFO] Feature Matrix Shape: {X.shape}, Features ({len(feature_cols)}): {feature_cols}")

    # 5. Train-Test Split (80/20, random_state=42)
    X_train, X_test, y_train, y_test = train_test_split(X, y_passed, test_size=0.2, random_state=42)
    
    # 6. Train Decision Tree Model (Optimal Depth 4 from notebook)
    dt_model = DecisionTreeClassifier(max_depth=4, random_state=42)
    dt_model.fit(X_train, y_train)

    train_acc = dt_model.score(X_train, y_train)
    test_acc = dt_model.score(X_test, y_test)
    y_pred = dt_model.predict(X_test)
    
    cm = confusion_matrix(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)

    print(f"\n[RESULTS] Decision Tree (Depth 4) Performance:")
    print(f"   - Training Accuracy : {train_acc * 100:.2f}%")
    print(f"   - Test Accuracy     : {test_acc * 100:.2f}%")
    print(f"   - Precision         : {prec * 100:.2f}%")
    print(f"   - Recall            : {rec * 100:.2f}%")
    print(f"   - F1-Score          : {f1 * 100:.2f}%")
    print(f"   - Confusion Matrix  :\n{cm}")

    # 7. Train auxiliary Performance Category & Score Models for complete multi-target inference
    cat_le = LabelEncoder()
    y_cat_enc = cat_le.fit_transform(y_category)
    cat_model = DecisionTreeClassifier(max_depth=5, random_state=42)
    cat_model.fit(X, y_cat_enc)

    score_regressor = GradientBoostingRegressor(n_estimators=100, max_depth=4, random_state=42)
    score_regressor.fit(X, y_score)

    # 8. Feature Importances
    importances = dt_model.feature_importances_
    feat_imp = [
        {"feature": name, "importance": round(float(imp) * 100, 2)}
        for name, imp in sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True)
    ]

    # 9. Pack everything into a unified pipeline dictionary
    pipeline_data = {
        "model": dt_model,
        "category_model": cat_model,
        "category_encoder": cat_le,
        "score_regressor": score_regressor,
        "feature_names": feature_cols,
        "label_encoders": label_encoders,
        "metrics": {
            "train_accuracy": round(float(train_acc) * 100, 2),
            "test_accuracy": round(float(test_acc) * 100, 2),
            "precision": round(float(prec) * 100, 2),
            "recall": round(float(rec) * 100, 2),
            "f1_score": round(float(f1) * 100, 2),
            "confusion_matrix": {
                "true_negative": int(cm[0][0]),
                "false_positive": int(cm[0][1]),
                "false_negative": int(cm[1][0]),
                "true_positive": int(cm[1][1])
            }
        },
        "feature_importances": feat_imp,
        "dataset_stats": {
            "total_records": int(len(df)),
            "features_count": int(len(feature_cols)),
            "pass_rate": f"{(df['passed'].mean() * 100):.1f}%",
            "fail_rate": f"{((1 - df['passed'].mean()) * 100):.1f}%",
            "ai_adoption_rate": f"{(df['uses_ai'].mean() * 100):.1f}%",
            "avg_study_hours": round(float(df['study_hours_per_day'].mean()), 1),
            "avg_attendance": f"{(df['attendance_percentage'].mean()):.1f}%"
        }
    }

    # 10. Save to .pkl file
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    output_pkl_path = os.path.join(models_dir, 'student_model_pipeline.pkl')
    joblib.dump(pipeline_data, output_pkl_path)
    print(f"\n[SUCCESS] Model Pipeline successfully serialized to: {output_pkl_path}")
    print(f"[SUCCESS] File size: {os.path.getsize(output_pkl_path) / 1024:.2f} KB")

if __name__ == '__main__':
    train_and_serialize()
