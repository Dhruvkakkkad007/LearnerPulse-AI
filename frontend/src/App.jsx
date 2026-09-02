import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PredictorPage from './pages/PredictorPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ArchetypesPage from './pages/ArchetypesPage';
import StudyPlannerPage from './pages/StudyPlannerPage';

export default function App() {
  const [activePage, setActivePage] = useState('landing');

  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      offset: 50,
    });
  }, []);

  // Refresh AOS & Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-cyan-500 selection:text-black relative">
      
      {/* Background Cyber Grid Pattern */}
      <div className="fixed inset-0 cyber-grid opacity-35 pointer-events-none z-0" />

      {/* Top Ambient Glow Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-56 bg-cyan-500/10 blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-10 w-96 h-96 bg-purple-500/10 blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 left-0 w-80 h-80 bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Header / Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <main className="flex-grow z-10">
        {activePage === 'landing' && <LandingPage setActivePage={setActivePage} />}
        {activePage === 'predictor' && <PredictorPage />}
        {activePage === 'analytics' && <AnalyticsPage />}
        {activePage === 'archetypes' && <ArchetypesPage setActivePage={setActivePage} />}
        {activePage === 'planner' && <StudyPlannerPage />}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
