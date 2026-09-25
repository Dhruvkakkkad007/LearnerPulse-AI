import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, BarChart3, Users, Rocket, Menu, X, Cpu, ArrowRight } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', shortLabel: 'Overview', icon: Sparkles },
    { id: 'predictor', label: 'AI Predictor', shortLabel: 'Predictor', icon: Brain, badge: 'ML Live' },
    { id: 'analytics', label: 'Model Analytics', shortLabel: 'Analytics', icon: BarChart3 },
    { id: 'archetypes', label: 'Learner Personas', shortLabel: 'Personas', icon: Users },
    { id: 'planner', label: 'AI Study Planner', shortLabel: 'Planner', icon: Rocket, badge: 'New' },
  ];

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const goTo = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="backdrop-blur-xl bg-[#080c14]/85 supports-[backdrop-filter]:bg-[#080c14]/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-4 min-h-[4.5rem] py-3 lg:py-0 lg:h-[4.75rem]">
            {/* Brand */}
            <button
              type="button"
              onClick={() => goTo('landing')}
              className="flex items-center gap-3 group select-none text-left min-w-0 justify-self-start"
            >
              <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
                <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white whitespace-nowrap">
                    Learn<span className="text-gradient">AI</span>
                  </span>
                  <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                    ML Model
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate hidden md:block max-w-[220px] lg:max-w-none">
                  Student Learner Type & Performance AI
                </p>
              </div>
            </button>

            {/* Desktop navigation — centered in viewport via equal side columns */}
            <nav
              className="hidden lg:flex items-center justify-center justify-self-center"
              aria-label="Main navigation"
            >
              <div className="flex items-center gap-0.5 p-1 rounded-2xl bg-slate-900/70 border border-slate-700/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(item.id)}
                      className={`relative flex items-center gap-2 px-3 xl:px-3.5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-gradient-to-b from-slate-800/90 to-slate-900/90 ring-1 ring-cyan-500/35 shadow-sm shadow-cyan-500/10'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/45'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}
                        aria-hidden
                      />
                      <span className="hidden xl:inline">{item.label}</span>
                      <span className="xl:hidden">{item.shortLabel}</span>
                      {item.badge && (
                        <span className="hidden 2xl:inline text-[9px] font-mono font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-indigo-500/25 text-indigo-200 border border-indigo-500/30">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <span
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Actions + mobile toggle */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 justify-self-end col-start-2 lg:col-start-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-xs font-mono shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="whitespace-nowrap">Acc: 94.8%</span>
              </div>

              <button
                type="button"
                onClick={() => goTo('predictor')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-[0.98] shrink-0"
              >
                <span className="whitespace-nowrap">Test Predictor</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-slate-800/80 ${
            mobileMenuOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0 border-t-transparent'
          }`}
        >
          <div className="px-4 sm:px-6 pb-5 pt-2 space-y-1.5 bg-[#090d16]/95 backdrop-blur-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-cyan-950/60 to-indigo-950/40 border border-cyan-500/35'
                      : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? 'bg-cyan-500/15 text-cyan-400' : 'bg-slate-800/80 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-left truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 flex flex-col sm:flex-row gap-2">
              <div className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono sm:flex-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Model accuracy: 94.8%</span>
              </div>
              <button
                type="button"
                onClick={() => goTo('predictor')}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-sm sm:flex-1"
              >
                <span>Test ML Predictor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
