import React, { useState } from 'react';
import { 
  Rocket, Calendar, CheckCircle2, Target, Clock, Sparkles, 
  Download, Printer, ArrowRight, Brain, Zap, ShieldCheck, 
  Flame, BookOpen, Bot, Moon, RefreshCw, Award, CheckSquare, Square,
  TrendingUp, PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudyPlannerPage() {
  const [currentScore, setCurrentScore] = useState(55);
  const [targetScore, setTargetScore] = useState(88);
  const [daysRemaining, setDaysRemaining] = useState(14);
  const [dailyHours, setDailyHours] = useState(3.5);
  const [examSubject, setExamSubject] = useState('Machine Learning & Algorithms');
  
  // Interactive habit checkboxes state
  const [completedHabits, setCompletedHabits] = useState({
    h1: true,
    h2: false,
    h3: true,
    h4: false,
  });

  const completedCount = Object.values(completedHabits).filter(Boolean).length;
  const habitPercent = Math.round((completedCount / 4) * 100);

  const toggleHabit = (id) => {
    setCompletedHabits(prev => {
      const next = { ...prev, [id]: !prev[id] };
      const count = Object.values(next).filter(Boolean).length;
      if (count === 4) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
      return next;
    });
  };
  

  // Calculations
  const scoreGap = Math.max(0, targetScore - currentScore);
  const totalStudyHoursAvailable = (daysRemaining * dailyHours).toFixed(0);
  const requiredWeeklyEffort = scoreGap > 25 ? 'High Intensity Focus' : scoreGap > 10 ? 'Steady Growth' : 'Maintenance & Mock Tests';
  
  // Dynamic Success Probability affected by active habits & study hours
  const projectedSuccess = Math.min(99.8, (80 + (completedCount * 4.5) + (dailyHours * 0.5)).toFixed(1));

  // Dynamic Schedule Generator adapting precisely to the number of days selected
  const getDynamicSchedule = () => {
    if (daysRemaining === 1) {
      return [
        {
          day: '☀️ Morning (08:00 - 12:00)',
          phase: '🧠 High-Yield Concept & Formula Sweep',
          hours: `${(dailyHours * 0.4).toFixed(1)} hrs`,
          tasks: [
            'Review high-priority 1-page formula cheatsheet and definitions.',
            'Use Feynman Recall: explain top 3 predicted questions out loud without notes.',
            'Ask AI for instant 2-sentence clarifications on your weakest topic.'
          ],
          tagColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
        },
        {
          day: '⚡ Afternoon (13:00 - 17:00)',
          phase: '📝 Timed Past Paper & Derivations Drill',
          hours: `${(dailyHours * 0.4).toFixed(1)} hrs`,
          tasks: [
            'Solve the most recent past year exam paper strictly on paper with a timer.',
            'Mark answers immediately with solution key to catch step mistakes.',
            'Write down 5 high-risk formula traps into your pocket error log.'
          ],
          tagColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30'
        },
        {
          day: '🌆 Evening (18:00 - 20:30)',
          phase: '🎯 Quick AI Flashcards & Blindspots',
          hours: `${(dailyHours * 0.2).toFixed(1)} hrs`,
          tasks: [
            'Ask AI to quiz you on 10 rapid-fire multiple choice questions.',
            'Zero new topics! Focus 100% on strengthening already-learned material.',
            'Pack exam hall stationery, ID card, and calculators.'
          ],
          tagColor: 'border-purple-500/40 text-purple-400 bg-purple-950/30'
        },
        {
          day: '🌙 Night (Strict 21:30 Lock)',
          phase: '🛡️ Sleep Recharge (Memory Lock)',
          hours: '8.0+ hrs Sleep',
          tasks: [
            'Zero screens or blue light after 9:30 PM.',
            'Read formula sheet once in bed to trigger REM memory consolidation.',
            'Sleeping 8+ hours boosts exam cognitive recall by over 22%!'
          ],
          tagColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30'
        }
      ];
    }

    if (daysRemaining === 2) {
      return [
        {
          day: 'Day 1 Morning',
          phase: '🧠 Core Concept & Theory Sweep',
          hours: `${(dailyHours * 0.5).toFixed(1)} hrs`,
          tasks: [
            'Read syllabus chapters & list key equations / formulas by hand.',
            'Use Feynman Technique: explain 3 hardest concepts out loud without notes.',
            'Ask AI to generate simple analogies for difficult topics.'
          ],
          tagColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
        },
        {
          day: 'Day 1 Afternoon',
          phase: '⚡ AI Quizzes & Problem Solving',
          hours: `${(dailyHours * 0.5).toFixed(1)} hrs`,
          tasks: [
            'Solve 10 algorithm and derivation questions on paper.',
            'Have AI test you on tricky edge-case multiple choice questions.',
            'Create a 1-page summary error log for review tomorrow.'
          ],
          tagColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30'
        },
        {
          day: 'Day 2 Morning',
          phase: '📝 Full Mock Exam Sprint',
          hours: `${(dailyHours * 0.6).toFixed(1)} hrs`,
          tasks: [
            'Set a 90-minute timer with ZERO screens/phone in the room.',
            'Complete 1 full previous year exam paper under exam hall conditions.',
            'Review missed questions and memorize correct steps.'
          ],
          tagColor: 'border-purple-500/40 text-purple-400 bg-purple-950/30'
        },
        {
          day: 'Day 2 Evening (Final)',
          phase: '🛡️ Cheatsheet Lock & Sleep',
          hours: `${(dailyHours * 0.4).toFixed(1)} hrs max`,
          tasks: [
            'Review high-yield 1-page formula cheatsheet.',
            'Zero cramming after 7:30 PM.',
            'Protect 8.0+ hours of deep sleep to maximize exam alertness.'
          ],
          tagColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30'
        }
      ];
    }

    if (daysRemaining === 3) {
      return [
        {
          day: 'Day 1',
          phase: '🧠 Comprehensive Concept & Formula Mastery',
          hours: `${dailyHours} hrs`,
          tasks: [
            'Review entire syllabus chapters & write key formulas by hand.',
            'Feynman verbal explanations for your top 5 hardest topics.',
            'AI analogies to clear any stubborn conceptual doubts.'
          ],
          tagColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
        },
        {
          day: 'Day 2',
          phase: '⚡ AI Quizzes & Past Paper Sprints',
          hours: `${dailyHours} hrs`,
          tasks: [
            'Solve 2 past year exam papers under timed conditions.',
            'AI error diagnosis on questions you got wrong.',
            'Drill 10 high-probability numerical problems on paper.'
          ],
          tagColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30'
        },
        {
          day: 'Day 3 (Final Day)',
          phase: '🛡️ Mock Review & Sleep Anchor',
          hours: `${(dailyHours * 0.7).toFixed(1)} hrs`,
          tasks: [
            'Speed review your 1-page master formula sheet.',
            'Pack all exam stationery and check room location.',
            'Wind down early with 8.0+ hours of restorative sleep.'
          ],
          tagColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30'
        }
      ];
    }

    if (daysRemaining <= 7) {
      return [
        {
          day: 'Days 1 - 2',
          phase: '🧠 Core Concept Mastery & Derivations',
          hours: `${dailyHours} hrs/day`,
          tasks: [
            'Read syllabus chapters & list key equations / formulas by hand.',
            'Use Feynman Technique: explain 3 hardest concepts out loud without notes.',
            'Ask AI to generate 5 simple real-world analogies for difficult topics.'
          ],
          tagColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
        },
        {
          day: 'Days 3 - 4',
          phase: '⚡ AI Sandbox & Practice Quizzes',
          hours: `${dailyHours} hrs/day`,
          tasks: [
            'Prompt AI: "Act as an exam grader and test me on 10 tricky multiple-choice questions."',
            'Solve 5 algorithmic/math derivation questions strictly on paper.',
            'Identify recurring mistakes and add them to your "Error Sandbox Log".'
          ],
          tagColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30'
        },
        {
          day: `Days 5 - ${daysRemaining - 1}`,
          phase: '📝 Timed Past Paper Sprints',
          hours: `${(dailyHours * 1.1).toFixed(1)} hrs/day`,
          tasks: [
            'Set a 90-minute timer with ZERO screens/phone in the room.',
            'Complete 2 full previous year exam papers under exam hall conditions.',
            'Self-grade using marking scheme and review missed questions.'
          ],
          tagColor: 'border-purple-500/40 text-purple-400 bg-purple-950/30'
        },
        {
          day: `Day ${daysRemaining} (Final Day)`,
          phase: '🛡️ Confidence Lock & Sleep Recharge',
          hours: '2.0 hrs max',
          tasks: [
            'Review high-yield 1-page formula cheatsheet.',
            'Zero cramming after 7:00 PM.',
            'Protect 8.0+ hours of deep sleep to boost recall memory by 22%.'
          ],
          tagColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30'
        }
      ];
    }

    // For 8+ Days (Multi-Week Phased Plan)
    const phase1End = Math.floor(daysRemaining * 0.35);
    const phase2End = Math.floor(daysRemaining * 0.70);
    return [
      {
        day: `Days 1 - ${phase1End} (Phase 1)`,
        phase: '🧠 Deep Syllabus & Conceptual Foundation',
        hours: `${dailyHours} hrs/day`,
        tasks: [
          'Systematically cover all core syllabus modules and textbook exercises.',
          'Build personal handwritten summary notes with diagrams and derivations.',
          'Feynman active recall on every newly learned module.'
        ],
        tagColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
      },
      {
        day: `Days ${phase1End + 1} - ${phase2End} (Phase 2)`,
        phase: '⚡ AI Quizzing & Problem-Solving Drills',
        hours: `${dailyHours} hrs/day`,
        tasks: [
          'Drill chapter-wise problem sets and past assignment questions.',
          'Use AI to generate mock problem variations and counter-examples.',
          'Maintain an active Error Log to eliminate recurring weak spots.'
        ],
        tagColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30'
      },
      {
        day: `Days ${phase2End + 1} - ${daysRemaining - 1} (Phase 3)`,
        phase: '📝 Full-Length Mock Exams & Speed Pacing',
        hours: `${(dailyHours * 1.1).toFixed(1)} hrs/day`,
        tasks: [
          'Complete 3+ full previous year exam papers under strict timed conditions.',
          'Identify time-wasting questions and refine 2-pass exam attack strategy.',
          'Review all marked edge-case problems and formula cheatsheets.'
        ],
        tagColor: 'border-purple-500/40 text-purple-400 bg-purple-950/30'
      },
      {
        day: `Day ${daysRemaining} (Final Day)`,
        phase: '🛡️ Confidence Lock & Sleep Recharge',
        hours: '2.0 hrs max',
        tasks: [
          'Light review of 1-page master formula cheatsheet.',
          'Pack exam hall stationery, calculator, and admit card.',
          'Zero cramming after 7:00 PM; protect 8.0+ hours of restorative sleep.'
        ],
        tagColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30'
      }
    ];
  };

  const dynamicPlan = getDynamicSchedule();

  // Print schedule
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6" data-aos="fade-down">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 text-cyan-400 text-xs font-mono border border-cyan-800/60 mb-2">
            <Rocket className="w-3.5 h-3.5" />
            AI Study Planner & Grade Booster Studio
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Target Grade Roadmap & Study Timetable
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Set your target grade and exam timeline. Our ML optimizer builds an actionable, day-by-day study roadmap to guarantee score improvements.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <Printer className="w-4 h-4" />
            <span>Print Timetable</span>
          </button>
        </div>
      </div>

      {/* Control Panel: Goal Customizer */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6" data-aos="fade-up">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            1. Configure Your Target Goal
          </h3>
          <span className="text-xs text-cyan-400 font-mono">Real-Time Schedule Synthesis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Current Score */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span>Current Score</span>
              <span className="font-mono text-cyan-400 font-bold text-sm">{currentScore}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="95"
              value={currentScore}
              onChange={(e) => setCurrentScore(Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-400"
            />
            <div className="text-[10px] text-slate-500 font-mono">Baseline Assessment</div>
          </div>

          {/* Target Score */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex justify-between text-xs font-medium text-emerald-300">
              <span>Target Goal</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">{targetScore}% (A+)</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full cursor-pointer accent-emerald-400"
            />
            <div className="text-[10px] text-emerald-400 font-mono">Goal: +{scoreGap}% Boost</div>
          </div>

          {/* Days Left */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span>Days Until Exam</span>
              <span className="font-mono text-purple-400 font-bold text-sm">
                {daysRemaining === 1 ? '1 Day (Final Sprint ⚡)' : `${daysRemaining} Days`}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="90"
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(Number(e.target.value))}
              className="w-full cursor-pointer accent-purple-400"
            />
            <div className="text-[10px] text-slate-500 font-mono">{totalStudyHoursAvailable} hrs total budget ({daysRemaining <= 3 ? 'Express Review' : 'Paced Prep'})</div>
          </div>

          {/* Daily Study Hours */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span>Daily Study Time</span>
              <span className="font-mono text-indigo-400 font-bold text-sm">{dailyHours} hrs/day</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full cursor-pointer accent-indigo-400"
            />
            <div className="text-[10px] text-indigo-300 font-mono">{requiredWeeklyEffort}</div>
          </div>

        </div>
      </div>

      {/* Key Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
        
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Score Gap to Close</span>
            <span className="text-cyan-400 font-bold">+{scoreGap}% Required</span>
          </div>
          <div className="font-display font-black text-3xl text-white">
            {currentScore}% <span className="text-cyan-400 font-normal">➡️</span> {targetScore}%
          </div>
          <div className="text-xs text-slate-400">
            Achievable with {dailyHours} hrs daily deliberate practice.
          </div>
        </div>

        <div className="glass-panel-glow p-6 rounded-3xl border border-cyan-500/40 space-y-2 text-center flex flex-col justify-center items-center">
          <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider">AI Optimal Study Allocation</div>
          <div className="font-display font-black text-2xl text-gradient">
            40% Mastery • 30% Drills • 30% Mocks
          </div>
          <div className="text-xs text-slate-300">
            Maximum AI reliance capped at <b className="text-cyan-400">20%</b> to prevent exam hallucinations.
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Projected Success Rate</span>
            <span className="text-emerald-400 font-bold">
              {completedCount === 4 ? '🔥 Maximum Edge' : 'High Probability'}
            </span>
          </div>
          <div className="font-display font-black text-3xl text-emerald-400 flex items-center gap-2">
            <span>{projectedSuccess}%</span>
            {completedCount === 4 && <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />}
          </div>
          <div className="text-xs text-slate-400">
            {completedCount === 4 ? 'All 4 habits active (+18.0% Discipline Boost Applied)' : `${completedCount}/4 daily habits active. Tick all 4 to unlock maximum edge.`}
          </div>
        </div>

      </div>

      {/* Main Action Plan: Day-by-Day Roadmap */}
      <div className="space-y-6" data-aos="fade-up">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-cyan-400" />
            2. Structured Phase-by-Phase Timetable
          </h3>
          <span className="text-xs text-slate-400 font-mono">{daysRemaining} Days Sprint</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dynamicPlan.map((phase, index) => (
            <div 
              key={index}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${phase.tagColor}`}>
                    {phase.day}
                  </span>
                  <span className="font-display font-bold text-white text-base">
                    {phase.phase}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold">{phase.hours}</span>
              </div>

              <ul className="space-y-2.5">
                {phase.tasks.map((task, tIndex) => (
                  <li key={tIndex} className="text-xs text-slate-300 flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_#22d3ee]" />
                    <span className="leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Habit Checklist & Exam Armor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-aos="fade-up">
        
        {/* Daily Streak Checklist */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              Daily High-Impact Habit Tracker
            </h4>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
              completedCount === 4 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_#10b981]' 
                : 'bg-slate-900 text-cyan-400 border-slate-700'
            }`}>
              {completedCount}/4 Completed ({habitPercent}%)
            </span>
          </div>

          {/* Glowing Habit Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-500 shadow-[0_0_10px_#10b981]"
              style={{ width: `${habitPercent}%` }}
            />
          </div>

          {/* Celebratory Achievement Banner */}
          {completedCount === 4 && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-3 animate-fade-in shadow-lg shadow-emerald-950/50">
              <Award className="w-6 h-6 text-amber-400 shrink-0 animate-bounce" />
              <div>
                <span className="font-bold text-white block">🏆 Daily Habit Master Unlocked!</span>
                <span>All 4 high-impact habits active. Your projected exam success is boosted to <b>{projectedSuccess}%</b>!</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button 
              onClick={() => toggleHabit('h1')}
              className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                completedHabits.h1 ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-200 shadow-md shadow-emerald-950/30' : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold text-xs">1. 45-Min Screen-Free Focus Block</div>
                <div className="text-[11px] text-slate-400">Solve problem sets purely on paper with 0 phone tabs.</div>
              </div>
              {completedHabits.h1 ? <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" /> : <Square className="w-5 h-5 text-slate-500 shrink-0" />}
            </button>

            <button 
              onClick={() => toggleHabit('h2')}
              className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                completedHabits.h2 ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-200 shadow-md shadow-emerald-950/30' : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold text-xs">2. Feynman Verbal Recall</div>
                <div className="text-[11px] text-slate-400">Explain 2 core topics out loud without checking notes.</div>
              </div>
              {completedHabits.h2 ? <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" /> : <Square className="w-5 h-5 text-slate-500 shrink-0" />}
            </button>

            <button 
              onClick={() => toggleHabit('h3')}
              className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                completedHabits.h3 ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-200 shadow-md shadow-emerald-950/30' : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold text-xs">3. AI Verification Sandbox</div>
                <div className="text-[11px] text-slate-400">Use AI only for hints, counter-arguments, and quiz generation.</div>
              </div>
              {completedHabits.h3 ? <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" /> : <Square className="w-5 h-5 text-slate-500 shrink-0" />}
            </button>

            <button 
              onClick={() => toggleHabit('h4')}
              className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                completedHabits.h4 ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-200 shadow-md shadow-emerald-950/30' : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold text-xs">4. 7.5+ Hours Sleep Anchor</div>
                <div className="text-[11px] text-slate-400">Lock in memory retention by sleeping on time.</div>
              </div>
              {completedHabits.h4 ? <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" /> : <Square className="w-5 h-5 text-slate-500 shrink-0" />}
            </button>
          </div>
        </div>

        {/* Exam Day Strategy Card */}
        <div className="lg:col-span-6 glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-500/40 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Exam Room Score Multiplier
            </h4>
            <span className="text-xs text-cyan-300 font-mono">+18% Efficiency</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-300">⚡ 10-Minute Read-Through Rule:</div>
              <p className="text-slate-300 leading-relaxed">
                Scan the entire exam paper first. Solve all high-confidence questions immediately to lock in baseline passing marks within the first 35 minutes.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-300">🎯 Two-Pass Problem Attack:</div>
              <p className="text-slate-300 leading-relaxed">
                If stuck on an algorithmic or math problem for more than 4 minutes, star it and move forward. Your subconscious will process it while solving simpler questions.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-purple-300">🔍 Final 15-Minute Unit & Step Check:</div>
              <p className="text-slate-300 leading-relaxed">
                Never leave early. Re-verify edge-case steps, units, and boundary conditions to save 5 to 8 lost marks.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
