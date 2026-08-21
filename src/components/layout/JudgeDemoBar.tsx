import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Users, UserCheck, Shield, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

export const JudgeDemoBar: React.FC = () => {
  const { currentRole, currentUser, switchUser, setActiveView, resetDemoData, isAiAnalyzing } = useApp();

  return (
    <div id="judge-demo-bar" className="bg-[#1F2937] text-white border-b border-[#374151] text-xs px-3 py-2 sm:px-6 sm:py-2 flex flex-wrap items-center justify-between gap-3 shadow-md z-50 sticky top-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#C084FC] font-semibold border border-[#7C3AED]/30">
          <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
          Hackathon Demo Mode
        </span>
        <span className="text-gray-300 hidden md:inline">Quick Role Switcher:</span>

        {/* Role buttons */}
        <div className="inline-flex rounded-xl bg-gray-800 p-0.5 border border-gray-700">
          <button
            id="switch-entrepreneur-btn"
            onClick={() => switchUser('entrepreneur')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-semibold text-xs ${
              currentRole === 'entrepreneur'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Priya (Entrepreneur)</span>
          </button>

          <button
            id="switch-advisor-btn"
            onClick={() => switchUser('advisor')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-semibold text-xs ${
              currentRole === 'advisor'
                ? 'bg-[#DB2777] text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/60'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Anjali (Advisor - 75 pts)</span>
          </button>

          <button
            id="switch-admin-btn"
            onClick={() => switchUser('admin')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-semibold text-xs ${
              currentRole === 'admin'
                ? 'bg-[#6366F1] text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Quick Story Flow Jumper */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-gray-400 hidden xl:inline">Live Story:</span>
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-gray-300 bg-gray-800/80 px-2.5 py-1 rounded-xl border border-gray-700/80">
          <button onClick={() => setActiveView('community-feed')} className="hover:text-purple-300 transition underline decoration-dotted">1. Post Problem</button>
          <ArrowRight className="w-3 h-3 text-gray-500" />
          <button onClick={() => setActiveView('community-feed')} className="hover:text-purple-300 transition underline decoration-dotted">2. AI Suggestion</button>
          <ArrowRight className="w-3 h-3 text-gray-500" />
          <button onClick={() => setActiveView('entrepreneur-experiments')} className="hover:text-purple-300 transition underline decoration-dotted">3. Experiment</button>
          <ArrowRight className="w-3 h-3 text-gray-500" />
          <button onClick={() => setActiveView('entrepreneur-monthly-report')} className="hover:text-purple-300 transition underline decoration-dotted">4. Monthly Data</button>
          <ArrowRight className="w-3 h-3 text-gray-500" />
          <button onClick={() => setActiveView('entrepreneur-analytics')} className="hover:text-purple-300 transition underline decoration-dotted font-semibold text-emerald-400">5. +50% Growth</button>
          <ArrowRight className="w-3 h-3 text-gray-500" />
          <button onClick={() => setActiveView('advisor-rewards')} className="hover:text-pink-300 transition underline decoration-dotted font-semibold text-pink-300">6. Rewards</button>
        </div>

        <button
          id="reset-demo-data-btn"
          onClick={resetDemoData}
          title="Reset database to initial pristine state"
          className="flex items-center gap-1 text-gray-300 hover:text-white px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline font-medium">Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
