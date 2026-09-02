import React from 'react';
import { Cpu, Code2, BookOpen, Layers, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060910] text-slate-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px]">
                <div className="w-full h-full bg-[#090d16] rounded-xl flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Learn<span className="text-gradient">AI</span> Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Machine Learning intelligent framework evaluating student learner types, digital habits, AI reliance, and academic success trajectory.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Decision Tree (Depth 4) • 94.8% Acc</span>
            </div>
          </div>

          {/* Column 2: System Architecture */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Model Architecture
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                8,000 Verified Student Records
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                22 Academic & AI Behavior Features
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                MinMax Scaler & Label Encoding
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Confusion Matrix: 94.8% Test Score
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('landing')} className="hover:text-cyan-400 transition-colors">
                  System Overview & 3D Visualizer
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('predictor')} className="hover:text-cyan-400 transition-colors">
                  AI Predictor & Strategy Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('analytics')} className="hover:text-cyan-400 transition-colors">
                  Dataset EDA & Model Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('archetypes')} className="hover:text-cyan-400 transition-colors">
                  Student Learner Archetypes
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('planner')} className="hover:text-cyan-400 transition-colors">
                  AI Study Planner & Grade Booster
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Insights */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              Project Takeaway
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conceptual understanding and study consistency are 3.8x stronger predictors of student pass rates than pure study duration alone.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Semester 5 ML Project</span>
              <span className="text-cyan-400">v2.0 UI</span>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Student Learner Type & Performance Prediction System. Built for Machine Learning Research.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with modern React, Tailwind CSS & Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
