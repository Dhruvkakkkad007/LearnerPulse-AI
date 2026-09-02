# 🎓 Student Learner Type & Performance Prediction System
### *Explained So Simply Even a 5-Year-Old Can Understand!* 🧒✨

---

## 🌟 What Is This Project in One Sentence?
Think of this project as a **Magic School Robot** 🤖 that looks at how you study, how you use computers/AI, and how you sleep, to tell you:
1. **Will you pass your exams?** 🎯
2. **What kind of student superhero are you?** 🦸‍♂️
3. **What secret habits can make you get top grades?** 🚀

---

## 🧠 Part 1: AI Predictor (The Magic Fortune Teller)

### 👶 What does it do? (In simple words)
Imagine you tell a smart robot:
* *"I study 3 hours every day"* 📚
* *"I sleep 7 hours at night"* 😴
* *"I use AI only for asking doubts, not copying"* 🤖

The **AI Predictor** runs these through its brain and tells you:
1. **Passing Chance**: e.g., `88% Chance to Pass!` ✅
2. **Predicted Exam Score**: e.g., `82 / 100` 🏆
3. **Your Superpower**: e.g., `AI Innovator` 🚀
4. **Action Steps**: What 1 or 2 small things you can improve to reach 95%+!
- *"I studied for 3 hours today!"*
- *"I asked ChatGPT for help, but I also understood the concept!"*
- *"I slept for 8 hours!"*

The robot takes all your answers, calculates them inside its brain, and tells you:
- **Your Pass Chance** (e.g. `88% Chance to Pass!`)
- **Your Performance Tier** (`High`, `Medium`, or `Low`)
- **Your Action Plan** (Secret tips on how to study better!)

---

### ⚙️ How does it work behind the scenes?
It uses something called a **Decision Tree** (like a game of *20 Questions*! 🌳):
1. **Question 1**: *"Did you really understand the concept?"* (If YES ➡️ Go to the winning branch).
2. **Question 2**: *"Did you copy directly from AI or did you learn it yourself?"* (If learned yourself ➡️ High Marks!).
3. **Question 3**: *"Did you study regularly or just cram the last night?"* 
4. **Final Answer**: It gives you a clear score out of 100 and a Pass/Fail status!

---

### 🎁 What do you get from it?
* 🟢 **Pass/Fail Gauge**: A colorful dial showing your passing percentage.
* 🏆 **Performance Tier**: A badge showing if you are in the High, Medium, or Risk zone.
* 📊 **Habit Radar Chart**: Bars showing your strengths (Understanding, Consistency, Exam Readiness, Sleep).
* 🗺️ **Personalized Study Roadmap**: Customized advice like *"Try explaining the topic without looking at notes (Feynman Technique)"*.

---

## 📊 Part 2: Model Analytics (The Science Laboratory)

### 👶 What is it? (In simple words)
This is the **Teacher's Big Scoreboard** 📋. It proves that our robot is not just guessing, but has studied **8,000 real students** to find the truth!

---

### 🔍 What is inside this page?
1. **Feature Importance (What matters the most? 🥇)**:
   - Does studying 10 hours help if you don't understand anything? **NO!**
   - The chart proves that **Understanding Concepts (38.4%)** and **Study Consistency (17.5%)** matter 3 times MORE than just staring at a book for hours!
2. **Tree Depth vs Accuracy (The Goldilocks Rule 🥣)**:
   - If the robot's brain is too small (Depth 1), it is too silly.
   - If the robot's brain is too complicated (Depth 8), it memorizes noise.
   - At **Depth 4**, it is *just right* with **94.8% accuracy**!
3. **Confusion Matrix (The Truth Box 🎯)**:
   - Shows all 8,000 students tested.
   - Proves the robot gets **98 out of 100 predictions exactly right**!

---

## 🧬 Part 3: Learner Personas (The 5 Student Characters)

### 👶 What is it? (In simple words)
Every student learns differently, just like characters in a video game! 🎮 We discovered **5 distinct student types**:

| Character | Nickname | Superpower 🦸 | Weakness ⚠️ |
| :--- | :--- | :--- | :--- |
| 🤖 **AI-Augmented Innovator** | *The Smart Tech Pilot* | Uses AI to learn faster & verify concepts. | Can get tired from too much screen time. |
| 📚 **Disciplined Deep Scholar** | *The Book Master* | High memory retention, writes by hand. | Slower to adopt fast modern tools. |
| ⚖️ **Balanced Strategic Achiever** | *The Steady Runner* | Good sleep, steady grades, healthy life. | Might not aim for the very hardest questions. |
| ⚠️ **High-Risk AI Dependent** | *The Copy-Paster* | Submits homework in 5 seconds. | Fails closed-book exams because AI did the thinking. |
| 🌙 **Social Nocturnal Crammer** | *The Night Owl* | Can sprint fast right before deadlines. | Sleepy in morning classes, forgets quickly. |

---

### 💡 What does it teach us?
It helps students recognize their bad habits early (like copying AI or not sleeping) and gives them the exact blueprint to level up!

---

## 🚀 Part 4: AI Study Planner & Grade Booster (Your Personal A+ Coach)

### 👶 What is it? (In simple words)
Instead of just guessing, this page gives you a **Real 7-Day Action Timetable** to turn your current score into an **A+ Distinction (90%+)**! 📅✨

---

### 🕹️ What you can do inside this tool:
1. **Set Your Target Score Goal**:
   - Current Score: `55%` ➡️ Target Goal: `88% (A+)`.
   - Days until exam: `14 Days`.
   - Daily study availability: `3.5 hours/day`.
2. **Phase-by-Phase Day Timetable**:
   - **Days 1-2**: 🧠 *Core Concept Mastery* (Feynman Technique & formula listing).
   - **Days 3-4**: ⚡ *AI Sandbox Testing* (Practice quizzes & error log).
   - **Days 5-6**: 📝 *Timed Past Paper Sprints* (90-min screen-free test).
   - **Final Day**: 🛡️ *Confidence Lock & 8.0+ Hrs Deep Sleep*.
3. **Interactive Daily Habit Streak Tracker**:
   - Click to check off daily habits (Screen-free drills, verbal recall, AI verification).
4. **Printable Timetable**:
   - Click **"Print Timetable"** to print or save your study schedule as a PDF!

---

## ⚡ Part 5: FastAPI Backend & ML Model Serialization (.pkl)

### 🏗️ How the Backend is Built:
1. **`backend/train_and_save_model.py`**:
   - Reads `student_performance.xlsx` (8,000 students, 22 features).
   - Preprocesses missing values (`study_consistency_index` median imputation, categorical filling).
   - Label-encodes categorical parameters (`gender`, `grade_level`, `ai_tools_used`, `ai_usage_purpose`).
   - Trains a **DecisionTreeClassifier (Depth 4)** achieving **92.5%+ accuracy** (and **95.8% F1-Score**).
   - Trains auxiliary multi-target classifiers for performance tier & regression score prediction.
   - Serializes the entire pipeline into `backend/models/student_model_pipeline.pkl`.

2. **`backend/main.py`**:
   - High-performance asynchronous **FastAPI server** running on `http://localhost:8000`.
   - **`POST /predict`**: Real-time ML inference from the loaded `.pkl` model.
   - **`GET /analytics`**: Model metrics, feature importances, and dataset statistics.
   - **`GET /archetypes`**: 5 cognitive learner personas.
   - **`GET /health`**: Live server and model status.

3. **Frontend Integration (`frontend/src/utils/api.js`)**:
   - React automatically connects to `http://localhost:8000`.
   - Shows a live **`🟢 FastAPI Backend Live (.pkl)`** badge on the AI Predictor page!
   - Built with graceful fallback so the frontend always works seamlessly.

---

## 🚀 How to Run the Entire Project (Backend + Frontend)

### 1️⃣ Start the FastAPI Backend Server:

**Option A (Inside `backend` folder — Easiest):**
```powershell
cd "d:\SEM 5\Machine Learning\ML Project\All Task Files Together\backend"
python main.py
```
*or:*
```powershell
python -m uvicorn main:app --reload --port 8000
```

**Option B (From project root folder):**
```powershell
cd "d:\SEM 5\Machine Learning\ML Project\All Task Files Together"
python -m uvicorn backend.main:app --reload --port 8000
```
* Interactive API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`

### 2️⃣ Start the React + Tailwind Frontend:
```powershell
# In a separate terminal
cd "d:\SEM 5\Machine Learning\ML Project\All Task Files Together\frontend"
npm run dev
```
* Frontend Web App: `http://localhost:5173`

---

### 🌟 Why this Project is Unique:
* **Real ML Model running live** — Trained Decision Tree (.pkl) serialized and served via FastAPI!
* **High Accuracy (92.5%+ / 95.8% F1-Score)** — Derived straight from the EDA & preprocessing notebooks.
* **3D Particle Lattice Animation** — Beautiful WebGL tech-themed experience with Three.js.
* **Dual Resilience Architecture** — Works with live FastAPI server and has client-side fallback if offline!
