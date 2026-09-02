import React, { useState } from 'react';
import Hero3D from '../components/Hero3D';
import { 
  Brain, Sparkles, TrendingUp, Cpu, Compass, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronRight, Zap, Target, Award,
  Users, BarChart3, HelpCircle, Layers, Activity
} from 'lucide-react';
import { DATASET_STATS, predictStudentOutcome, DEFAULT_STUDENT_DATA } from '../utils/mlEngine';

export default function LandingPage({ setActivePage }) {
  // Interactive mini-calculator on landing page for instant engagement
  const [miniConcept, setMiniConcept] = useState(8);
  const [miniAiDep, setMiniAiDep] = useState(3);
  const [miniExam, setMiniExam] = useState(78);

  const miniResult = predictStudentOutcome({
    ...DEFAULT_STUDENT_DATA,
    concept_understanding_score: miniConcept,
    ai_dependency_score: miniAiDep,
    last_exam_score: miniExam,
  });

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-20" data-aos="fade-right" data-aos-duration="900">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>Next-Gen Machine Learning • Decision Tree Depth 4</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12]">
                Decode Your <span className="text-gradient">Learner Type</span> & Predict Success.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                A state-of-the-art predictive ML intelligence framework analyzing study consistency, conceptual grasp, and AI tool dependency across <span className="text-cyan-400 font-semibold">8,000+ student trajectories</span>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('predictor')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Brain className="w-5 h-5" />
                  <span>Launch AI Predictor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('analytics')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl glass-panel text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all duration-300 text-sm font-semibold"
                >
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Explore 8,000 Dataset EDA</span>
                </button>
              </div>

              {/* Mini Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>94.8% Test Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>22 Behavioral Features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>5 Learner Personas</span>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Interactive Canvas */}
            <div className="lg:col-span-6 relative" data-aos="fade-left" data-aos-duration="900">
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-indigo-500/10 to-transparent shadow-2xl border border-cyan-500/20">
                <Hero3D />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Dataset Metric Banner */}
      <section className="relative z-20 py-8 border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-white">8,000</div>
                <div className="text-xs text-slate-400">Student Dataset Records</div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-emerald-400">94.8%</div>
                <div className="text-xs text-slate-400">Model Test Accuracy</div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-white">22</div>
                <div className="text-xs text-slate-400">Behavioral Features</div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4" data-aos="fade-up" data-aos-delay="400">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-black text-2xl text-purple-400">Depth 4</div>
                <div className="text-xs text-slate-400">Optimized Decision Tree</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Live Instant Assessment Mini-Console */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 border border-cyan-500/30 relative overflow-hidden" data-aos="zoom-in-up" data-aos-duration="800">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 text-xs font-mono border border-cyan-800">
                  <Zap className="w-3.5 h-3.5" />
                  Instant Live Simulation
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                  Experience ML Inference in Real-Time
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Drag the sliders below to see how our trained Decision Tree calculates pass trajectory and assigns student personas on the fly.
                </p>

                {/* Mini Sliders */}
                <div className="space-y-5 pt-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Concept Understanding Score</span>
                      <span className="font-mono text-cyan-400 font-bold">{miniConcept} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={miniConcept}
                      onChange={(e) => setMiniConcept(Number(e.target.value))}
                      className="w-full cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">AI Dependency Score</span>
                      <span className="font-mono text-indigo-400 font-bold">{miniAiDep} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={miniAiDep}
                      onChange={(e) => setMiniAiDep(Number(e.target.value))}
                      className="w-full cursor-pointer accent-indigo-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Last Exam Score</span>
                      <span className="font-mono text-purple-400 font-bold">{miniExam}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={miniExam}
                      onChange={(e) => setMiniExam(Number(e.target.value))}
                      className="w-full cursor-pointer accent-purple-400"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('predictor')}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm group"
                  >
                    <span>Open Full 22-Feature Predictor Console</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Output Preview Card */}
              <div className="lg:col-span-6">
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-700/80 relative space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Live Outcome</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${miniResult.categoryColor}25`, color: miniResult.categoryColor, border: `1px solid ${miniResult.categoryColor}60` }}>
                      {miniResult.performanceCategory} Tier
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
                      <div className="text-center">
                        <span className="font-display font-black text-3xl text-white">{miniResult.passProbability}%</span>
                        <div className="text-[10px] text-slate-400 font-mono">Pass Prob</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="text-xs text-slate-400 font-medium">Assigned Learner Archetype:</div>
                      <div className="font-display font-bold text-lg text-white flex items-center gap-2">
                        <span>{miniResult.archetype.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {miniResult.archetype.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Predicted Final Score:</span>
                    <span className="font-mono font-bold text-cyan-400 text-base">{miniResult.predictedFinalScore} / 100</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Why LearnAI Outperforms Basic Averages
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Traditional GPA models ignore digital learning patterns. LearnAI combines cognitive mastery with AI ethical usage indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-700/50 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Cognitive Mastery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prioritizes conceptual comprehension and consistency index over mere passive study time.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">AI Reliance Auditing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates prompt frequency, generative content %, and ethics to prevent shallow dependency traps.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-700/50 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Prescriptive Action Plan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates personalized Feynman technique schedules, Pomodoro anchors, and sleep habit corrections.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="400">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Early Warning Shield</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identifies students on the verge of falling behind before midterm exams with 94.8% test precision.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" data-aos="zoom-in" data-aos-duration="800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-panel-glow p-10 sm:p-14 rounded-3xl border border-cyan-500/40 relative overflow-hidden">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">
              Ready to Run a Full Student Diagnosis?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
              Explore your learner archetype, test hypothetical score improvements, or evaluate an entire student cohort with our trained Decision Tree.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActivePage('predictor')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all duration-300"
              >
                Go to AI Prediction Studio
              </button>
              <button
                onClick={() => setActivePage('archetypes')}
                className="px-8 py-4 rounded-xl glass-panel text-white hover:border-cyan-400 transition-all duration-300 text-sm font-semibold"
              >
                Explore Learner Personas
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
