import React, { useState } from 'react';
import { 
  Sliders, Sparkles, TrendingUp, ArrowRight, CheckCircle2, 
  AlertTriangle, RefreshCw, Zap, ShieldCheck, Flame
} from 'lucide-react';
import { DEFAULT_STUDENT_DATA, predictStudentOutcome } from '../utils/mlEngine';

export default function SimulatorPage() {
  // Baseline student (Struggling with high AI reliance)
  const baseline = {
    ...DEFAULT_STUDENT_DATA,
    study_hours_per_day: 1.8,
    concept_understanding_score: 4,
    study_consistency_index: 3.5,
    ai_dependency_score: 8,
    ai_generated_content_percentage: 55,
    last_exam_score: 48,
    assignment_scores_avg: 58.0,
    sleep_hours: 5.5,
    social_media_hours: 5.0,
  };

  // Simulated modified state
  const [simState, setSimState] = useState({ ...baseline });

  const baseResult = predictStudentOutcome(baseline);
  const simResult = predictStudentOutcome(simState);

  const probDelta = simResult.passProbability - baseResult.passProbability;
  const scoreDelta = (simResult.predictedFinalScore - baseResult.predictedFinalScore).toFixed(1);

  const handleSimChange = (field, val) => {
    setSimState(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const resetSimulation = () => {
    setSimState({ ...baseline });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6" data-aos="fade-down">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 text-purple-400 text-xs font-mono border border-purple-800/60 mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Counterfactual & Sensitivity Analysis
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            What-If Habit Simulator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Simulate how strategic behavioral interventions (reducing AI reliance, increasing concept drills, fixing sleep) shift predicted academic trajectory.
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-medium self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Baseline
        </button>
      </div>

      {/* Before vs After Outcome Comparison Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
        
        {/* Baseline Card */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Current Baseline</span>
            <span className="text-rose-400">At-Risk State</span>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-3xl text-slate-300">
              {baseResult.passProbability}%
            </div>
            <div className="text-xs text-slate-400">Baseline Pass Probability</div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Score: <b className="text-white">{baseResult.predictedFinalScore}</b></span>
            <span style={{ color: baseResult.categoryColor }}>{baseResult.performanceCategory} Tier</span>
          </div>
        </div>

        {/* Delta Shift Card */}
        <div className="glass-panel-glow p-6 sm:p-7 rounded-3xl border border-cyan-500/40 space-y-4 text-center flex flex-col justify-center items-center">
          <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider">Simulated Trajectory Delta</div>
          <div className="font-display font-black text-4xl text-gradient">
            {probDelta >= 0 ? `+${probDelta}%` : `${probDelta}%`}
          </div>
          <div className="text-xs text-slate-300">
            Score Shift: <span className="font-mono font-bold text-cyan-400">{scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} pts</span>
          </div>
        </div>

        {/* Simulated Projected Outcome */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Simulated Outcome</span>
            <span className="text-emerald-400">Projected State</span>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-3xl text-emerald-400">
              {simResult.passProbability}%
            </div>
            <div className="text-xs text-slate-400">Optimized Pass Probability</div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Score: <b className="text-emerald-400">{simResult.predictedFinalScore}</b></span>
            <span style={{ color: simResult.categoryColor }}>{simResult.performanceCategory} Tier</span>
          </div>
        </div>

      </div>

      {/* Interactive Sensitivity Sliders */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-8" data-aos="fade-up" data-aos-delay="200">
        
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Adjust Behavioral Levers
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Interact with the sliders below to observe model sensitivity and elasticity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Lever 1: Concept Understanding Score */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-display font-bold text-sm text-white">1. Concept Understanding Score</span>
                <div className="text-[11px] text-cyan-400">Largest Single Impact (+38.4% Gini)</div>
              </div>
              <span className="font-mono font-bold text-cyan-400 text-base">{simState.concept_understanding_score} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={simState.concept_understanding_score}
              onChange={(e) => handleSimChange('concept_understanding_score', Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Baseline: {baseline.concept_understanding_score}</span>
              <span>Target: 9-10</span>
            </div>
          </div>

          {/* Lever 2: AI Dependency Score */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-display font-bold text-sm text-white">2. AI Dependency Score</span>
                <div className="text-[11px] text-rose-400">Lower is better for proctored retention</div>
              </div>
              <span className="font-mono font-bold text-rose-400 text-base">{simState.ai_dependency_score} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={simState.ai_dependency_score}
              onChange={(e) => handleSimChange('ai_dependency_score', Number(e.target.value))}
              className="w-full cursor-pointer accent-rose-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Baseline: {baseline.ai_dependency_score}</span>
              <span>Target: 2-4</span>
            </div>
          </div>

          {/* Lever 3: Study Consistency Index */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-display font-bold text-sm text-white">3. Daily Study Consistency</span>
                <div className="text-[11px] text-indigo-400">Habit stability multiplier</div>
              </div>
              <span className="font-mono font-bold text-indigo-400 text-base">{simState.study_consistency_index} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={simState.study_consistency_index}
              onChange={(e) => handleSimChange('study_consistency_index', Number(e.target.value))}
              className="w-full cursor-pointer accent-indigo-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Baseline: {baseline.study_consistency_index}</span>
              <span>Target: 8+</span>
            </div>
          </div>

          {/* Lever 4: Sleep & Digital Screentime */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-display font-bold text-sm text-white">4. Nightly Sleep Duration</span>
                <div className="text-[11px] text-purple-400">Memory consolidation foundation</div>
              </div>
              <span className="font-mono font-bold text-purple-400 text-base">{simState.sleep_hours} hrs</span>
            </div>
            <input
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={simState.sleep_hours}
              onChange={(e) => handleSimChange('sleep_hours', Number(e.target.value))}
              className="w-full cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Baseline: {baseline.sleep_hours} hrs</span>
              <span>Target: 7.5 - 8.5 hrs</span>
            </div>
          </div>

        </div>

        {/* Dynamic Model Persona Shift Feedback */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-mono uppercase">Projected Learner Persona Shift:</div>
            <div className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="text-rose-400 line-through text-sm">{baseResult.archetype.title}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span className="text-emerald-400 font-black">{simResult.archetype.title}</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 max-w-sm text-right">
            {simResult.isPassed 
              ? "🎉 Interventions successfully converted high-risk trajectory into a passing grade!" 
              : "⚠️ Continue increasing conceptual grasp and consistency to cross the 50% passing threshold."}
          </div>
        </div>

      </div>

    </div>
  );
}
