import React from 'react';
import { useApp } from '../../context/AppContext';
import { Crown, Check, Sparkles, Zap, ShieldCheck, Star } from 'lucide-react';

export const SubscriptionView: React.FC = () => {
  const { currentUser, toggleProSubscription } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#E9D5FF] text-[#7C3AED] text-xs font-bold">
          <Crown className="w-3.5 h-3.5 text-amber-500" />
          TechSHEon Subscription Plans
        </div>
        <h1 className="text-3xl font-black text-[#1F2937]">
          Scale Your Micro-Enterprise
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm">
          Select the tier that fits your stage of business growth. Upgrade anytime with 1-click activation.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Basic Premium Plan */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F3E8FF] shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Starter Tier</span>
              <h3 className="text-2xl font-black text-[#1F2937] mt-1">Basic Premium</h3>
              <p className="text-xs text-gray-500 mt-0.5">Essential growth tools for new micro-entrepreneurs.</p>
            </div>

            <div className="text-3xl font-black text-[#1F2937]">
              ₹499 <span className="text-xs text-gray-400 font-normal">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span><strong>2 Community challenge posts</strong> for 1 month (for new users)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>Basic monthly revenue & profit logger</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>Standard AI Idea Feasibility scoring</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>Access to public community feed</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              if (currentUser.isPro) toggleProSubscription();
            }}
            className={`w-full py-3 rounded-xl text-xs font-bold transition ${
              !currentUser.isPro
                ? 'bg-[#F5F3FF] text-[#7C3AED] border border-[#E9D5FF] cursor-default'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {!currentUser.isPro ? 'Current Active Plan (Basic Premium)' : 'Switch to Basic Premium (₹499)'}
          </button>
        </div>

        {/* Accelerated Growth Plan */}
        <div className="bg-[#1F2937] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden border-2 border-[#7C3AED]/50">
          {/* Glowing Blur */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#DB2777] rounded-full filter blur-[50px] opacity-25 pointer-events-none" />
          <div className="absolute -left-8 -top-8 w-40 h-40 bg-[#7C3AED] rounded-full filter blur-[40px] opacity-20 pointer-events-none" />

          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-to-r from-[#DB2777] to-amber-400 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Accelerated
            </span>
          </div>

          <div className="space-y-4 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-300">TechSHEon Pro</span>
              <h3 className="text-2xl font-black text-white mt-1">Accelerated Growth</h3>
              <p className="text-xs text-gray-300 mt-0.5">Advanced AI diagnostics and high-velocity community experiments.</p>
            </div>

            <div className="text-3xl font-black text-white">
              ₹999 <span className="text-xs text-purple-300 font-normal">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-purple-100">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                <span><strong>5 Community challenge posts</strong> per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                <span><strong>Priority advisor visibility</strong> & top pin</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                <span><strong>Gemini AI Business Growth Reports</strong> & Action plans</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                <span><strong>Automated Profit & Margin Optimization</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                <span><strong>Verified Business Badge</strong> on profile</span>
              </li>
            </ul>
          </div>

          <button
            id="toggle-pro-plan-btn"
            onClick={toggleProSubscription}
            className={`w-full py-3.5 rounded-xl text-xs font-extrabold shadow-lg transition flex items-center justify-center gap-2 relative z-10 ${
              currentUser.isPro
                ? 'bg-emerald-500 hover:bg-emerald-600 text-gray-950'
                : 'bg-gradient-to-r from-[#DB2777] to-[#7C3AED] hover:from-[#BE185D] hover:to-[#6D28D9] text-white'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>{currentUser.isPro ? 'Accelerated Growth Active (Toggle Plan)' : 'Upgrade to Accelerated Growth (₹999/mo)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

