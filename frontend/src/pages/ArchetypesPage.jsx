import React, { useState } from 'react';
import { 
  Users, Sparkles, Brain, BookOpen, Clock, AlertTriangle, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Compass, Target,
  Flame, ShieldAlert, Award, Star, ArrowUpRight
} from 'lucide-react';

export default function ArchetypesPage({ setActivePage }) {
  const [selectedArchetype, setSelectedArchetype] = useState(0);

  const archetypes = [
    {
      id: 'ai-innovator',
      name: 'AI-Augmented Innovator',
      tagline: 'Uses AI as a smart study partner to learn faster while truly understanding every topic.',
      badge: '🤖 Tech-Smart Pilot',
      cohortPercent: '28.4%',
      passRate: '96.2%',
      color: '#06b6d4',
      gradient: 'from-cyan-500/20 to-blue-600/20',
      border: 'border-cyan-500/50',
      strengths: [
        { title: '⚡ Fast Concept Grasp', desc: 'Uses AI prompts to turn hard topics into simple analogies.' },
        { title: '🛡️ Honest & Ethical', desc: 'Always double-checks facts and never blindly copies text.' },
        { title: '💡 Problem Solver', desc: 'Excels at coding, creative projects, and deep research.' }
      ],
      blindspots: [
        { title: '🔋 Screen Fatigue', desc: 'Risk of getting tired from opening too many browser tabs.' },
        { title: '📝 Real-Exam Speed', desc: 'May feel slower when writing by hand without computer tools.' }
      ],
      studyPlan: [
        { step: '1. AI Quiz Mode', action: 'Ask AI to test you with tricky questions instead of giving direct answers.' },
        { step: '2. 30-Min Paper Drill', action: 'Spend 30 minutes daily writing solutions on real paper without any screen.' }
      ],
      toolStack: 'ChatGPT Plus, Claude 3.5, Notion, Anki Flashcards'
    },
    {
      id: 'deep-scholar',
      name: 'Disciplined Deep Scholar',
      tagline: 'Master of textbooks and handwritten notes with incredible focus and high memory power.',
      badge: '📚 Book Master',
      cohortPercent: '24.1%',
      passRate: '98.5%',
      color: '#10b981',
      gradient: 'from-emerald-500/20 to-teal-600/20',
      border: 'border-emerald-500/50',
      strengths: [
        { title: '🧠 Rock-Solid Memory', desc: 'Understands fundamental concepts from first principles.' },
        { title: '🛡️ Zero Exam Panic', desc: 'Never depends on gadgets; totally confident in closed-book exams.' },
        { title: '📅 Daily Consistency', desc: 'Follows a strict study schedule with 8+ hours of healthy sleep.' }
      ],
      blindspots: [
        { title: '⏳ Slower Research', desc: 'Spends too much time manually searching through big books.' },
        { title: '⚡ Fast Prototyping', desc: 'Slower to adopt modern digital shortcuts for quick summaries.' }
      ],
      studyPlan: [
        { step: '1. Smart Search', action: 'Use AI only to quickly find book chapters and generate summary flashcards.' },
        { step: '2. Peer Teaching', action: 'Explain hard math & theory topics to friends to lock in 95% retention.' }
      ],
      toolStack: 'Physical Textbooks, Handwritten Notebooks, Google Scholar, LaTeX'
    },
    {
      id: 'balanced-achiever',
      name: 'Balanced Strategic Achiever',
      tagline: 'Balances good grades, proper sleep, and hobbies with steady and calm study habits.',
      badge: '⚖️ Steady Runner',
      cohortPercent: '26.8%',
      passRate: '84.6%',
      color: '#6366f1',
      gradient: 'from-indigo-500/20 to-purple-600/20',
      border: 'border-indigo-500/50',
      strengths: [
        { title: '📈 High Attendance', desc: 'Attends 85%+ classes and submits assignments right on time.' },
        { title: '😴 Great Sleep Balance', desc: 'Sleeps 7 to 8 hours every night without late-night stress.' },
        { title: '🎯 Practical Revision', desc: 'Focuses on past exam papers and syllabus summaries.' }
      ],
      blindspots: [
        { title: '⏸️ Score Plateau', desc: 'Can get stuck in the 70-80% zone by avoiding the hardest challenge questions.' },
        { title: '⚠️ Fear of Complex Tasks', desc: 'Prefers standard easy questions over difficult edge-cases.' }
      ],
      studyPlan: [
        { step: '1. The 80/20 Rule', action: 'Dedicate your final study hours only to the 3 hardest chapter topics.' },
        { step: '2. Timed Mock Tests', action: 'Take weekly 1-hour practice tests with a timer to reach 90%+ A-grades.' }
      ],
      toolStack: 'Quizlet, Google Docs, Pomodoro Timer, ChatGPT (For Summaries)'
    },
    {
      id: 'high-risk-dependent',
      name: 'High-Risk AI Dependent',
      tagline: 'Relies on AI to generate answers without understanding. High risk of failing real proctored exams.',
      badge: '⚠️ Copy-Paste Risk',
      cohortPercent: '11.5%',
      passRate: '28.1%',
      color: '#ef4444',
      gradient: 'from-rose-500/20 to-red-600/20',
      border: 'border-rose-500/50',
      strengths: [
        { title: '🚀 Fast Submissions', desc: 'Finishes homework in minutes using automated AI tools.' },
        { title: '💻 Tech Savvy', desc: 'Comfortable with prompt typing and digital web apps.' }
      ],
      blindspots: [
        { title: '❌ Exam Hall Trap', desc: 'Fails closed-book exams because AI did all the real thinking.' },
        { title: '🌫️ False Confidence', desc: 'Feels like they know the topic just by reading AI answers.' },
        { title: '📉 Weak Memory', desc: 'Unable to explain or derive solutions out loud to a teacher.' }
      ],
      studyPlan: [
        { step: '1. AI-Free Practice', action: 'Complete at least 2 full assignments per week with 0 AI assistance.' },
        { step: '2. Feynman Active Recall', action: 'Close your laptop and explain the topic in 3 simple sentences out loud.' },
        { step: '3. Peer Tutoring', action: 'Attend 2 hours of weekly study group help to rebuild basics.' }
      ],
      toolStack: 'Unchecked ChatGPT copying (Needs immediate habit fix!)'
    },
    {
      id: 'nocturnal-crammer',
      name: 'Social Nocturnal Crammer',
      tagline: 'High phone screen time, irregular sleep, and intense adrenaline sprints right before deadlines.',
      badge: '🌙 Night-Owl Sprinter',
      cohortPercent: '9.2%',
      passRate: '46.0%',
      color: '#f59e0b',
      gradient: 'from-amber-500/20 to-orange-600/20',
      border: 'border-amber-500/50',
      strengths: [
        { title: '⚡ Super Sprint Speed', desc: 'Can pull high-energy focus in the final 6 hours before a deadline.' },
        { title: '🤝 Social Learner', desc: 'Shares notes and talks through questions in Discord/WhatsApp study groups.' }
      ],
      blindspots: [
        { title: '😴 Heavy Sleep Debt', desc: 'Sleeps under 5.5 hours; loses energy during morning classes.' },
        { title: '🗑️ Fast Forgetting', desc: 'Crammed memory vanishes 2 days after the test is over.' },
        { title: '📱 Social Distraction', desc: 'Spends 4+ hours daily on Instagram, TikTok, and gaming.' }
      ],
      studyPlan: [
        { step: '1. Morning Alarm Fix', action: 'Wake up at the same time every day to reset your internal body clock.' },
        { step: '2. App Screen Limit', action: 'Lock social media apps during your afternoon 3-hour study block.' }
      ],
      toolStack: 'Discord Study Rooms, Forest Focus App, YouTube 10-Min Revision'
    }
  ];

  const current = archetypes[selectedArchetype];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6" data-aos="fade-down">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 text-cyan-400 text-xs font-mono border border-cyan-800/60 mb-2">
          <Users className="w-3.5 h-3.5" />
          5 Distinct Student Behavioral Profiles
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
          Student Learner Personas & Archetypes
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Discovered from 8,000 students. Click any character below to explore their <span className="text-emerald-400 font-semibold">Superpowers</span>, <span className="text-rose-400 font-semibold">Blindspots</span>, and <span className="text-cyan-400 font-semibold">A+ Study Plan</span>.
        </p>
      </div>

      {/* Archetype Tab Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" data-aos="fade-up">
        {archetypes.map((arch, index) => {
          const isSelected = selectedArchetype === index;
          return (
            <button
              key={arch.id}
              onClick={() => setSelectedArchetype(index)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-2 shadow-lg scale-[1.02]'
                  : 'glass-panel hover:bg-slate-800/60'
              }`}
              style={{
                borderColor: isSelected ? arch.color : 'rgba(51, 65, 85, 0.5)',
                boxShadow: isSelected ? `0 0 20px ${arch.color}35` : 'none'
              }}
            >
              <div className="text-xs font-mono font-bold flex items-center justify-between" style={{ color: arch.color }}>
                <span>{arch.badge}</span>
                {isSelected && <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: arch.color }} />}
              </div>
              <div className="font-display font-bold text-sm text-white mt-1.5">
                {arch.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 flex justify-between font-mono">
                <span>Share: {arch.cohortPercent}</span>
                <span className="text-emerald-400 font-semibold">Pass: {arch.passRate}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Archetype Deep-Dive Card */}
      <div className="glass-panel-glow p-6 sm:p-9 rounded-3xl border relative overflow-hidden" style={{ borderColor: `${current.color}60` }} data-aos="zoom-in">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Profile Summary & Superpowers */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold shadow-sm" style={{ backgroundColor: `${current.color}25`, color: current.color, border: `1px solid ${current.color}60` }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{current.badge}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
                {current.name}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {current.tagline}
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                <div className="text-[11px] text-slate-400 font-mono uppercase">Cohort Share</div>
                <div className="font-display font-black text-2xl text-white mt-0.5">{current.cohortPercent}</div>
                <div className="text-[10px] text-slate-500">In 8,000 Students</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                <div className="text-[11px] text-slate-400 font-mono uppercase">Pass Probability</div>
                <div className="font-display font-black text-2xl text-emerald-400 mt-0.5">{current.passRate}</div>
                <div className="text-[10px] text-emerald-500/80">Historical Benchmark</div>
              </div>
            </div>

            {/* BOX 1: Key Cognitive Strengths (Glowing Emerald Box) */}
            <div className="p-5 rounded-3xl bg-emerald-950/25 border border-emerald-500/30 space-y-3.5 shadow-lg shadow-emerald-950/30">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-sm text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Superpowers & Strengths
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  {current.strengths.length} Superpowers
                </span>
              </div>

              <div className="space-y-2.5">
                {current.strengths.map((item, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-900/85 border border-emerald-500/20 text-xs flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_8px_#34d399]" />
                    <div>
                      <span className="font-bold text-white block text-[13px]">{item.title}</span>
                      <span className="text-slate-300 text-xs leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Blindspots & Action Blueprint */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* BOX 2: Critical Blindspots (Glowing Warning Box) */}
            <div className="p-5 rounded-3xl bg-rose-950/25 border border-rose-500/35 space-y-3.5 shadow-lg shadow-rose-950/30">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-sm text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Critical Blindspots & Risks
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-300 border border-rose-700/50">
                  Watch Out!
                </span>
              </div>

              <div className="space-y-2.5">
                {current.blindspots.map((item, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-900/85 border border-rose-500/20 text-xs flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0 shadow-[0_0_8px_#f43f5e]" />
                    <div>
                      <span className="font-bold text-white block text-[13px]">{item.title}</span>
                      <span className="text-slate-300 text-xs leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 3: Action Blueprint / Study Plan (Glowing Cyan Box) */}
            <div className="p-5 rounded-3xl bg-cyan-950/25 border border-cyan-500/35 space-y-3.5 shadow-lg shadow-cyan-950/30">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-sm text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Prescribed Blueprint (How to Get Top Grades)
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                  Action Plan
                </span>
              </div>

              <div className="space-y-2.5">
                {current.studyPlan.map((plan, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-900/85 border border-cyan-500/20 text-xs flex items-start gap-2.5">
                    <span className="font-mono font-bold text-cyan-400 shrink-0 text-xs bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-800/60">
                      {plan.step}
                    </span>
                    <span className="text-slate-200 text-xs leading-relaxed">{plan.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool Stack & Test CTA */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
              <div>
                <div className="text-[11px] text-slate-400 font-mono uppercase">Optimized Tool Stack</div>
                <div className="text-xs font-semibold text-white mt-0.5">{current.toolStack}</div>
              </div>
              <button
                onClick={() => setActivePage('predictor')}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-all shrink-0 cursor-pointer shadow-lg shadow-cyan-500/20 hover:scale-105"
              >
                <span>Test Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
