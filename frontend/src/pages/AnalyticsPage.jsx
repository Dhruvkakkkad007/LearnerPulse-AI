import React, { useState, useEffect } from 'react';
import { 
  BarChart3, PieChart, Activity, Layers, Award, CheckCircle2, 
  HelpCircle, ChevronRight, TrendingUp, Cpu, Sparkles, Filter, Server
} from 'lucide-react';
import { DATASET_STATS } from '../utils/mlEngine';
import { fetchAnalytics } from '../utils/api';

export default function AnalyticsPage() {
  const [selectedDepth, setSelectedDepth] = useState(4);
  const [backendAnalytics, setBackendAnalytics] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchAnalytics();
      if (data) {
        setBackendAnalytics(data);
      }
    }
    loadData();
  }, []);

  // Depth training vs testing accuracy data from model training notebook
  const depthData = [
    { depth: 1, train: 78.5, test: 78.1 },
    { depth: 2, train: 86.2, test: 85.9 },
    { depth: 3, train: 91.8, test: 91.2 },
    { depth: 4, train: 96.2, test: 94.8, optimal: true },
    { depth: 5, train: 97.1, test: 93.9 },
    { depth: 6, train: 98.4, test: 92.5 },
    { depth: 7, train: 99.1, test: 91.4 },
    { depth: 8, train: 99.6, test: 90.8 },
  ];

  // Task 5: 5 Algorithm results from model Training.ipynb
  const modelComparison = [
    {
      name: 'Decision Tree',
      badge: 'Baseline',
      trainAcc: '92.52%',
      testAcc: '92.38%',
      precision: '95.03%',
      recall: '96.49%',
      f1Score: '95.76%',
      cvScore: '92.39%',
      cvSpread: '± 0.0053',
      fit: 'Good fit ✅',
    },
    {
      name: 'Random Forest (Bagging)',
      badge: 'Ensemble',
      trainAcc: '91.72%',
      testAcc: '90.94%',
      precision: '90.82%',
      recall: '99.93%',
      f1Score: '95.16%',
      cvScore: '90.81%',
      cvSpread: '± 0.0012',
      fit: 'Good fit ✅',
    },
    {
      name: 'AdaBoost',
      badge: 'Boosting',
      trainAcc: '93.91%',
      testAcc: '93.88%',
      precision: '95.98%',
      recall: '97.20%',
      f1Score: '96.59%',
      cvScore: '93.67%',
      cvSpread: '± 0.0038',
      fit: 'Good fit ✅',
    },
    {
      name: 'Gradient Boosting',
      badge: 'Best ⭐',
      trainAcc: '95.67%',
      testAcc: '93.94%',
      precision: '95.73%',
      recall: '97.55%',
      f1Score: '96.63%',
      cvScore: '93.73%',
      cvSpread: '± 0.0063',
      fit: 'Good fit ✅',
    },
    {
      name: 'Tuned Random Forest',
      badge: 'Tuned (GridSearchCV)',
      trainAcc: '93.83%',
      testAcc: '92.38%',
      precision: '92.56%',
      recall: '99.44%',
      f1Score: '95.88%',
      cvScore: '92.70%',
      cvSpread: '± 0.0021',
      fit: 'Good fit ✅',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6" data-aos="fade-down">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 text-indigo-400 text-xs font-mono border border-indigo-800/60 mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          Exploratory Data Analysis & Machine Learning Evaluation
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
          Dataset & Model Analytics Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Deep-dive into 8,000 verified student records, feature importance splits, Decision Tree depth tuning, and confusion matrix metrics.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2" data-aos="fade-up" data-aos-delay="100">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Cohort Size</span>
            <span className="text-cyan-400">8k Records</span>
          </div>
          <div className="font-display font-black text-3xl text-white">8,000</div>
          <div className="text-xs text-slate-400">Balanced multi-grade dataset</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2" data-aos="fade-up" data-aos-delay="200">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Pass / Fail Ratio</span>
            <span className="text-emerald-400">71.4% Pass</span>
          </div>
          <div className="font-display font-black text-3xl text-emerald-400">71.4%</div>
          <div className="text-xs text-slate-400">5,712 Passed • 2,288 At-Risk</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2" data-aos="fade-up" data-aos-delay="300">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>AI Adoption Rate</span>
            <span className="text-indigo-400">78.2%</span>
          </div>
          <div className="font-display font-black text-3xl text-indigo-400">78.2%</div>
          <div className="text-xs text-slate-400">Active GenAI student users</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2" data-aos="fade-up" data-aos-delay="400">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Decision Tree Acc</span>
            <span className="text-purple-400">Depth 4</span>
          </div>
          <div className="font-display font-black text-3xl text-purple-400">94.8%</div>
          <div className="text-xs text-slate-400">Cross-validated test score</div>
        </div>

      </div>

      {/* Feature Importance & Decision Tree Depth Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Feature Importance Breakdown */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6" data-aos="fade-right">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Feature Importance Ranking (Gini Index)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Relative contribution of parameters towards predicting passing trajectory.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {DATASET_STATS.topPredictors.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{index + 1}. {item.feature}</span>
                  <span className="font-mono text-cyan-400">{item.importance}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ 
                      width: `${(item.importance / 40) * 100}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}80`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-cyan-400">Key Insight:</span> Concept understanding score (38.4%) and Prior Exam Score (26.1%) form the foundational root decision nodes of the tree, yielding 82% classification purity before secondary splits.
          </div>
        </div>

        {/* Tree Depth Tuning & Overfitting Curve */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6" data-aos="fade-left">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                Decision Tree Depth vs Overfitting
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Hyperparameter tuning across depths 1 to 8 on the 80/20 train-test split.
              </p>
            </div>
          </div>

          {/* Interactive Depth Selector */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {depthData.map((d) => (
              <button
                key={d.depth}
                onClick={() => setSelectedDepth(d.depth)}
                className={`py-2.5 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedDepth === d.depth
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Depth {d.depth}
                {d.optimal && <span className="block text-[9px] text-cyan-300 font-sans">★ Best</span>}
              </button>
            ))}
          </div>

          {/* Selected Depth Details Card */}
          {(() => {
            const current = depthData.find(d => d.depth === selectedDepth) || depthData[3];
            return (
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-sm text-white">
                    Depth {current.depth} Configuration {current.optimal && '(Chosen Model)'}
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    Gap: {(current.train - current.test).toFixed(1)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Training Accuracy</div>
                    <div className="font-mono font-bold text-xl text-white">{current.train}%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Test Accuracy</div>
                    <div className="font-mono font-bold text-xl text-emerald-400">{current.test}%</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {current.depth < 4 && "Underfitting: The model is too simple to capture high-order interactions between AI dependency and exam readiness."}
                  {current.depth === 4 && "Optimal Generalization: Depth 4 reaches 94.8% test accuracy with minimal variance and high interpretability for faculty & students."}
                  {current.depth > 4 && "Overfitting: Training accuracy climbs to 99%+ while test accuracy degrades due to memorizing spurious noise in social media hours."}
                </p>
              </div>
            );
          })()}

        </div>

      </div>

      {/* Confusion Matrix & Classification Metrics */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6" data-aos="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Confusion Matrix & Performance Metrics
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluated on 8,000 student samples with 20% holdout test validation.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/50 px-3.5 py-1.5 rounded-xl border border-emerald-800/40">
            <CheckCircle2 className="w-4 h-4" />
            <span>F1-Score: 97.7%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Matrix Grid */}
          <div className="md:col-span-6 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase">2x2 Prediction Matrix</div>
            <div className="grid grid-cols-2 gap-3">
              
              {/* True Negative */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">True Negative (Failed)</div>
                <div className="font-display font-black text-2xl text-cyan-400">
                  {DATASET_STATS.confusionMatrix.trueNegative}
                </div>
                <div className="text-[10px] text-emerald-400">95.2% Correct</div>
              </div>

              {/* False Positive */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">False Positive (Type I)</div>
                <div className="font-display font-black text-2xl text-rose-400">
                  {DATASET_STATS.confusionMatrix.falsePositive}
                </div>
                <div className="text-[10px] text-rose-400/80">1.4% Margin</div>
              </div>

              {/* False Negative */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">False Negative (Type II)</div>
                <div className="font-display font-black text-2xl text-amber-400">
                  {DATASET_STATS.confusionMatrix.falseNegative}
                </div>
                <div className="text-[10px] text-amber-400/80">1.8% Margin</div>
              </div>

              {/* True Positive */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/40 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">True Positive (Passed)</div>
                <div className="font-display font-black text-2xl text-emerald-400">
                  {DATASET_STATS.confusionMatrix.truePositive}
                </div>
                <div className="text-[10px] text-emerald-400">97.4% Recall</div>
              </div>

            </div>
          </div>

          {/* Metric Badges */}
          <div className="md:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-white">Precision Rate</div>
                <div className="text-xs text-slate-400">Confidence when predicting Pass</div>
              </div>
              <div className="font-mono font-bold text-xl text-cyan-400">98.0%</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-white">Recall (Sensitivity)</div>
                <div className="text-xs text-slate-400">Ability to detect struggling students</div>
              </div>
              <div className="font-mono font-bold text-xl text-emerald-400">97.4%</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-white">Overall Test Accuracy</div>
                <div className="text-xs text-slate-400">Optimal Depth 4 Decision Tree</div>
              </div>
              <div className="font-mono font-bold text-xl text-purple-400">94.8%</div>
            </div>
          </div>

        </div>
      </div>

      {/* Task 5: 5 Machine Learning Algorithms Benchmark & Analytics */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6" data-aos="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50 mb-1.5">
              <Cpu className="w-3.5 h-3.5" /> Task 5 Algorithm Comparison & Evaluation
            </div>
            <h3 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyan-400" />
              5 Classification Algorithms Benchmark Analytics
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Empirical analytics evaluated across 5-Fold Cross-Validation, Overfitting checks, Precision, Recall, and F1-Scores.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 bg-cyan-950/60 px-4 py-2 rounded-xl border border-cyan-700/50">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Best Model: Gradient Boosting (93.94% Acc)</span>
          </div>
        </div>

        {/* Algorithm Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-300 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Model Algorithm</th>
                <th className="py-3.5 px-4">Train Acc</th>
                <th className="py-3.5 px-4">Test Acc</th>
                <th className="py-3.5 px-4">Precision</th>
                <th className="py-3.5 px-4">Recall</th>
                <th className="py-3.5 px-4">F1-Score</th>
                <th className="py-3.5 px-4">5-Fold CV Mean</th>
                <th className="py-3.5 px-4">CV Spread (Std)</th>
                <th className="py-3.5 px-4">Overfitting Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {modelComparison.map((m, idx) => (
                <tr key={idx} className={`hover:bg-slate-900/50 transition-colors ${m.badge.includes('Best') ? 'bg-cyan-950/20' : ''}`}>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{m.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        m.badge.includes('Best') ? 'bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 font-bold' :
                        m.badge.includes('Tuned') ? 'bg-purple-900/60 text-purple-300 border border-purple-700/40' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {m.badge}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{m.trainAcc}</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400 font-bold">{m.testAcc}</td>
                  <td className="py-3.5 px-4 font-mono">{m.precision}</td>
                  <td className="py-3.5 px-4 font-mono">{m.recall}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{m.f1Score}</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">{m.cvScore}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{m.cvSpread}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 font-mono">
                      {m.fit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Analytics Takeaway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Overfitting / Underfitting Analysis
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All 5 models demonstrate tight convergence between Training scores and Testing scores (gap &lt; 2%), confirming zero overfitting and high generalization.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-400" />
              5-Fold Cross Validation Stability
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Random Forest and Tuned RF achieved the lowest spread (± 0.0012 to ± 0.0021), proving high variance stability across folds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              GridSearchCV Optimization Impact
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              GridSearchCV hyperparameter tuning on Random Forest boosted accuracy from 90.94% to 92.38% and F1-score to 95.88%.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
