import React, { useState, useEffect } from 'react';
import { 
  Brain, Sparkles, BookOpen, Clock, Bot, Shield, AlertTriangle, 
  CheckCircle2, RefreshCw, Download, FileText, BarChart2, Zap,
  TrendingUp, Award, Moon, Smartphone, HelpCircle, Layers, ArrowUpRight,
  Play, Loader2, Server, Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_STUDENT_DATA, PRESETS } from '../utils/mlEngine';
import { predictStudent, checkBackendStatus } from '../utils/api';

export default function PredictorPage() {
  const [formData, setFormData] = useState(DEFAULT_STUDENT_DATA);
  const [activeTab, setActiveTab] = useState('academic'); // 'academic' | 'ai' | 'lifestyle'
  const [reportCopied, setReportCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [result, setResult] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [serverOnline, setServerOnline] = useState(false);

  // Check FastAPI backend connection on mount
  useEffect(() => {
    async function verifyBackend() {
      const status = await checkBackendStatus();
      setServerOnline(status.online);
    }
    verifyBackend();
  }, []);

  // Handle field change
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  // Run the ML Prediction when the user clicks "Test Predictor" button
  const handleRunPrediction = async () => {
    setIsCalculating(true);

    try {
      // Call FastAPI Backend Model (.pkl)
      const outcome = await predictStudent(formData);
      setResult(outcome);
      setHasPredicted(true);
      setIsCalculating(false);
      setIsDirty(false);

      if (outcome.isPassed && outcome.passProbability >= 75) {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.65 }
        });
      }
    } catch (error) {
      console.error('Prediction failed:', error);
      setIsCalculating(false);
    }
  };

  // Load a preset
  const applyPreset = (preset) => {
    setFormData({ ...preset.data });
    setIsDirty(true);
  };

  // Reset to default
  const resetForm = () => {
    setFormData(DEFAULT_STUDENT_DATA);
    setHasPredicted(false);
    setResult(null);
    setIsDirty(false);
  };

  // Copy or download summary
  const downloadReport = () => {
    if (!result) {
      alert("Please click 'Test Predictor' first to generate your prediction report.");
      return;
    }

    const report = {
      project: "Student Learner Type & Performance Prediction System",
      timestamp: new Date().toISOString(),
      serverSource: result.source || 'FastAPI ML Engine',
      studentInput: formData,
      prediction: {
        passOutcome: result.isPassed ? "Passed" : "Failed",
        passProbability: `${result.passProbability}%`,
        predictedFinalScore: `${result.predictedFinalScore} / 100`,
        performanceCategory: result.performanceCategory,
        learnerArchetype: result.archetype.title,
        aiHealthScore: `${result.aiHealthScore} / 100`,
        actionPlan: result.recommendations.map(r => `${r.title}: ${r.desc}`)
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Student_Prediction_Report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6" data-aos="fade-down">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 text-cyan-400 text-xs font-mono border border-cyan-800/60">
              <Brain className="w-3.5 h-3.5" />
              Decision Tree Engine (Depth 4) • Real-Time Inference
            </div>

            {/* FastAPI Status Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
              serverOnline 
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' 
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60'
            }`}>
              <Server className="w-3 h-3" />
              <span>{serverOnline ? 'FastAPI Backend Live (.pkl)' : 'Client ML Engine Active'}</span>
            </div>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            AI Prediction & Strategy Studio
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Input student metrics across 22 parameters, then click <span className="text-cyan-400 font-semibold">Test Predictor</span> to calculate pass probability, performance tier, and customized study roadmaps.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={resetForm}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {reportCopied ? 'Report Saved!' : 'Export JSON'}
          </button>
        </div>
      </div>

      {/* Preset Archetype Fast-Picks */}
      <div className="space-y-3" data-aos="fade-up">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          Quick Load Student Archetypes (Select & click Test Predictor)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="text-left p-4 rounded-2xl glass-panel hover:border-cyan-400/50 hover:bg-slate-800/60 transition-all duration-200 group cursor-pointer"
            >
              <div className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                {preset.name}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs (Left) & Prediction Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 3 Input Tabs + Execute Button */}
        <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
          
          {/* Tab Selection */}
          <div className="flex rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800">
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'academic'
                  ? 'bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 text-white border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>1. Academics</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>2. AI Footprint</span>
            </button>
            <button
              onClick={() => setActiveTab('lifestyle')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'lifestyle'
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4 text-purple-400" />
              <span>3. Lifestyle</span>
            </button>
          </div>

          {/* Tab 1: Academic Parameters */}
          {activeTab === 'academic' && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  Academic Profile & Cognitive Metrics
                </h3>
                <span className="text-xs text-slate-400 font-mono">Dataset Top Predictors</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Concept Understanding */}
                <div className="space-y-1.5 sm:col-span-2 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-cyan-300">Concept Understanding Score (Highest ML Weight: 38.4%)</span>
                    <span className="font-mono text-cyan-400 font-bold">{formData.concept_understanding_score} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={formData.concept_understanding_score}
                    onChange={(e) => handleChange('concept_understanding_score', Number(e.target.value))}
                    className="w-full cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 (Rote Memory Only)</span>
                    <span>5 (Moderate)</span>
                    <span>10 (Deep First-Principles Mastery)</span>
                  </div>
                </div>

                {/* Study Consistency Index */}
                <div className="space-y-1.5 sm:col-span-2 p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-indigo-300">Study Consistency Index (ML Weight: 17.5%)</span>
                    <span className="font-mono text-indigo-400 font-bold">{formData.study_consistency_index} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={formData.study_consistency_index}
                    onChange={(e) => handleChange('study_consistency_index', Number(e.target.value))}
                    className="w-full cursor-pointer accent-indigo-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 (Random Cramming)</span>
                    <span>10 (Daily Disciplined Routine)</span>
                  </div>
                </div>

                {/* Last Exam Score */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Last Exam Score</span>
                    <span className="font-mono text-cyan-400 font-bold">{formData.last_exam_score}%</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.last_exam_score}
                    onChange={(e) => handleChange('last_exam_score', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Assignment Avg */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Assignment Scores Avg</span>
                    <span className="font-mono text-cyan-400 font-bold">{formData.assignment_scores_avg}%</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={formData.assignment_scores_avg}
                    onChange={(e) => handleChange('assignment_scores_avg', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Attendance Percentage */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Attendance %</span>
                    <span className="font-mono text-cyan-400 font-bold">{formData.attendance_percentage}%</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendance_percentage}
                    onChange={(e) => handleChange('attendance_percentage', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Class Participation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Class Participation Score (1-10)</span>
                    <span className="font-mono text-cyan-400 font-bold">{formData.class_participation_score}</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.class_participation_score}
                    onChange={(e) => handleChange('class_participation_score', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Improvement Rate */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Improvement Rate (%)</span>
                    <span className="font-mono text-emerald-400 font-bold">{formData.improvement_rate > 0 ? `+${formData.improvement_rate}` : formData.improvement_rate}%</span>
                  </label>
                  <input
                    type="range"
                    min="-20"
                    max="30"
                    step="0.5"
                    value={formData.improvement_rate}
                    onChange={(e) => handleChange('improvement_rate', Number(e.target.value))}
                    className="w-full cursor-pointer accent-emerald-400"
                  />
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: AI & Digital Study Footprint */}
          {activeTab === 'ai' && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  AI Tool Adoption & Digital Dependency
                </h3>
                <span className="text-xs text-slate-400 font-mono">Generative Footprint</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Uses AI Toggle */}
                <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-white">Uses AI Tools for Studies</div>
                    <div className="text-xs text-slate-400">Enables ChatGPT, Claude, Copilot, Gemini integration analysis</div>
                  </div>
                  <button
                    onClick={() => handleChange('uses_ai', formData.uses_ai ? 0 : 1)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                      formData.uses_ai 
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {formData.uses_ai ? 'YES (Active)' : 'NO (Disabled)'}
                  </button>
                </div>

                {/* AI Dependency Score */}
                <div className="space-y-1.5 sm:col-span-2 p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-rose-300">AI Dependency Score (1: Tool, 10: Dependent)</span>
                    <span className="font-mono text-rose-400 font-bold">{formData.ai_dependency_score} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.ai_dependency_score}
                    onChange={(e) => handleChange('ai_dependency_score', Number(e.target.value))}
                    className="w-full cursor-pointer accent-rose-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 (Independent Thinking)</span>
                    <span>5 (Balanced Co-Pilot)</span>
                    <span>10 (Cannot Solve Without AI)</span>
                  </div>
                </div>

                {/* AI Usage Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>AI Usage Time (min/day)</span>
                    <span className="font-mono text-indigo-400 font-bold">{formData.ai_usage_time_minutes} min</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={formData.ai_usage_time_minutes}
                    onChange={(e) => handleChange('ai_usage_time_minutes', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* AI Generated Content % */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>AI Generated Content %</span>
                    <span className="font-mono text-indigo-400 font-bold">{formData.ai_generated_content_percentage}%</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.ai_generated_content_percentage}
                    onChange={(e) => handleChange('ai_generated_content_percentage', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* AI Prompts per week */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>AI Prompts Per Week</span>
                    <span className="font-mono text-indigo-400 font-bold">{formData.ai_prompts_per_week}</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    value={formData.ai_prompts_per_week}
                    onChange={(e) => handleChange('ai_prompts_per_week', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* AI Ethics Score */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>AI Ethics & Citation Score (1-5)</span>
                    <span className="font-mono text-emerald-400 font-bold">{formData.ai_ethics_score} / 5</span>
                  </label>
                  <select
                    value={formData.ai_ethics_score}
                    onChange={(e) => handleChange('ai_ethics_score', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm bg-slate-900"
                  >
                    <option value={5}>5 - High Integrity & Verified Citations</option>
                    <option value={4}>4 - Proper Attribution & Verification</option>
                    <option value={3}>3 - Moderate Use with Occasional Checks</option>
                    <option value={2}>2 - Direct Copying with Minor Edits</option>
                    <option value={1}>1 - Unchecked Plagiarism / High Risk</option>
                  </select>
                </div>

                {/* Primary AI Purpose */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-slate-300">
                    Primary AI Usage Purpose
                  </label>
                  <select
                    value={formData.ai_usage_purpose}
                    onChange={(e) => handleChange('ai_usage_purpose', e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm bg-slate-900"
                  >
                    <option value="Exam Prep">Exam Prep & Conceptual Explanations</option>
                    <option value="Coding">Research & Code Debugging</option>
                    <option value="Notes">Summarization & Notes</option>
                    <option value="Doubt Solving">Doubt Solving & Flashcards</option>
                    <option value="Homework">Homework / Fast Submission</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Lifestyle & Study Habits */}
          {activeTab === 'lifestyle' && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Lifestyle, Time Allocation & Support
                </h3>
                <span className="text-xs text-slate-400 font-mono">Habits</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Study Hours */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Study Hours Per Day</span>
                    <span className="font-mono text-cyan-400 font-bold">{formData.study_hours_per_day} hrs</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="14"
                    step="0.5"
                    value={formData.study_hours_per_day}
                    onChange={(e) => handleChange('study_hours_per_day', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Sleep Hours */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Sleep Hours Per Night</span>
                    <span className="font-mono text-indigo-400 font-bold">{formData.sleep_hours} hrs</span>
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="12"
                    step="0.5"
                    value={formData.sleep_hours}
                    onChange={(e) => handleChange('sleep_hours', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Social Media Hours */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Social Media Screen Time</span>
                    <span className="font-mono text-purple-400 font-bold">{formData.social_media_hours} hrs</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    step="0.5"
                    value={formData.social_media_hours}
                    onChange={(e) => handleChange('social_media_hours', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Tutoring Hours */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex justify-between">
                    <span>Tutoring / Mentorship Hours</span>
                    <span className="font-mono text-emerald-400 font-bold">{formData.tutoring_hours} hrs</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={formData.tutoring_hours}
                    onChange={(e) => handleChange('tutoring_hours', Number(e.target.value))}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                {/* Grade Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Grade Level</label>
                  <select
                    value={formData.grade_level}
                    onChange={(e) => handleChange('grade_level', e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm bg-slate-900"
                  >
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                    <option value="1st Year">1st Year University</option>
                    <option value="2nd Year">2nd Year University</option>
                    <option value="3rd Year">3rd Year University</option>
                  </select>
                </div>

                {/* Age & Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm bg-slate-900"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* Dedicated Primary "Test Predictor" Action Button */}
          <div className="p-6 rounded-3xl glass-panel-glow border border-cyan-500/40 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Ready to Calculate Prediction?
                </h4>
                <p className="text-xs text-slate-400">
                  {serverOnline ? 'Connected to FastAPI Backend (Scikit-Learn .pkl Pipeline)' : 'Using Embedded ML Inference Engine'}
                </p>
              </div>

              <button
                onClick={handleRunPrediction}
                disabled={isCalculating}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Running ML Inference...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-slate-950" />
                    <span>{hasPredicted ? 'Update Prediction' : 'Test Predictor'}</span>
                  </>
                )}
              </button>
            </div>

            {isDirty && hasPredicted && (
              <div className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Parameters changed — Click 'Update Prediction' to refresh results.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Prediction Results (Only shown after clicking Test Predictor) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24" data-aos="fade-left">
          
          {hasPredicted && result ? (
            /* Active Result Card */
            <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-500/40 relative overflow-hidden space-y-6 animate-fade-in">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  {result.source === 'fastapi' ? 'FastAPI Server Output' : 'ML Prediction Result'}
                </span>
                <div 
                  className="px-3.5 py-1 rounded-full text-xs font-bold font-mono uppercase"
                  style={{ 
                    backgroundColor: `${result.categoryColor}20`, 
                    color: result.categoryColor,
                    border: `1px solid ${result.categoryColor}60`
                  }}
                >
                  {result.performanceCategory} Performance Tier
                </div>
              </div>

              {/* Probability Gauge */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <div className="text-center">
                    <div className="font-display font-black text-2xl text-white">
                      {result.passProbability}%
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono uppercase">Pass Prob</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-slate-400">Status Classification</div>
                  <div className="flex items-center gap-2 font-display font-black text-xl text-white">
                    {result.isPassed ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400">Target Passed</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-rose-400" />
                        <span className="text-rose-400">Academic Risk Alert</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-slate-300">
                    Predicted Final Score: <span className="font-mono font-bold text-white">{result.predictedFinalScore} / 100</span>
                  </div>
                </div>
              </div>

              {/* Learner Archetype Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Assigned Learner Persona</div>
                <div className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{result.archetype.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.archetype.tagline}
                </p>
              </div>

              {/* Radar / Core Strength Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Cognitive & Habit Radar</span>
                  <span>Score (0-100)</span>
                </div>

                <div className="space-y-2.5">
                  {result.radarMetrics.map((metric, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-300">
                        <span>{metric.label}</span>
                        <span className="font-mono text-cyan-400">{metric.value}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescriptive Action Plan */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Personalized Study Strategy Roadmap
                </div>

                <div className="space-y-2.5">
                  {result.recommendations.map((rec, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {rec.title}
                      </div>
                      <p className="text-slate-400 leading-relaxed pl-3">
                        {rec.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pipeline Engine Signature Footer */}
              <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Pipeline: DecisionTree (.pkl)</span>
                <span className="text-cyan-400">{result.modelEngine || 'FastAPI Server (Port 8000)'}</span>
              </div>

            </div>
          ) : (
            /* Awaiting Calculation State */
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-700/80 mx-auto flex items-center justify-center text-cyan-400 shadow-inner">
                <Brain className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-white">
                  Awaiting Input Evaluation
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Enter student parameters across the 3 tabs on the left, or select a preset archetype above, then click <span className="text-cyan-400 font-semibold">Test Predictor</span> to execute the live ML model.
                </p>
              </div>

              <button
                onClick={handleRunPrediction}
                disabled={isCalculating}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <Play className="w-4 h-4 fill-cyan-300" />
                <span>Test Predictor Now</span>
              </button>

              <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{serverOnline ? 'FastAPI Model Server Active (Port 8000)' : 'Decision Tree Model Ready (Depth 4)'}</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
