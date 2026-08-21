import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Users,
  IndianRupee,
  Wallet,
  ArrowUpRight,
  Sparkles,
  PlusCircle,
  FlaskConical,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Crown,
  FileQuestion,
} from 'lucide-react';
import { AskCommunityModal } from './AskCommunityModal';

export const EntrepreneurDashboard: React.FC = () => {
  const {
    currentUser,
    currentBusiness,
    experiments,
    suggestions,
    posts,
    metrics,
    setActiveView,
    setSelectedPostId,
    markExperimentImplemented,
  } = useApp();

  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  const biz = currentBusiness;
  const userPosts = posts.filter((p) => p.businessId === biz?.id);
  const activeExp = experiments.find((e) => e.businessId === biz?.id && e.status === 'In Progress') || experiments[0];
  const postLimit = currentUser.isPro ? 5 : 2;
  const postsUsed = userPosts.length;
  const postsRemaining = Math.max(0, postLimit - postsUsed);

  // Latest metrics
  const latestMetric = metrics[metrics.length - 1] || {
    revenue: 67000,
    expenses: 40000,
    profit: 27000,
    customers: 135,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Greeting & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1F2937]">
              Welcome back, {currentUser.name.split(' ')[0]} 👋
            </h1>
            {biz?.verified && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Business
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {biz?.businessName} • 📍 {biz?.city} ({biz?.category})
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="dash-ask-community-btn"
            onClick={() => setIsAskModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] hover:from-[#6D28D9] hover:to-[#BE185D] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-[#7C3AED]/20 hover:shadow-lg transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ask the Community</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-md font-semibold ml-1">
              {postsRemaining}/{postLimit}
            </span>
          </button>

          <button
            id="dash-monthly-report-btn"
            onClick={() => setActiveView('entrepreneur-monthly-report')}
            className="flex items-center gap-1.5 bg-[#F5F3FF] hover:bg-[#ede9fe] text-[#7C3AED] text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#E9D5FF] transition"
          >
            <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
            <span>Enter Monthly Data</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-[#F3E8FF] shadow-xs hover:border-[#E9D5FF] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] font-bold">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mt-2">
            ₹{latestMetric.revenue.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-2">
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +28.9%
            </span>
            <span className="text-gray-400 font-normal ml-1">vs baseline</span>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white p-5 rounded-2xl border border-[#F3E8FF] shadow-xs hover:border-[#E9D5FF] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Expenses</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mt-2">
            ₹{latestMetric.expenses.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 mt-2">
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
              Controlled overheads (40%)
            </span>
          </div>
        </div>

        {/* Monthly Profit */}
        <div className="bg-white p-5 rounded-2xl border border-[#F3E8FF] shadow-xs hover:border-[#E9D5FF] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Profit</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">
            ₹{latestMetric.profit.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-2">
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +60% profit
            </span>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-white p-5 rounded-2xl border border-[#F3E8FF] shadow-xs hover:border-[#E9D5FF] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customers</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] mt-2">
            {latestMetric.customers}
          </p>
          <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 mt-2">
            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +35% clients
            </span>
          </div>
        </div>
      </div>

      {/* Active Business Experiment Showcase */}
      {activeExp && (
        <div className="bg-[#1F2937] text-white p-6 sm:p-7 rounded-2xl shadow-xl relative overflow-hidden">
          {/* Decorative artistic glowing blur */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#DB2777] rounded-full filter blur-[60px] opacity-20 pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-[#7C3AED] rounded-full filter blur-[40px] opacity-15 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#DB2777]/20 text-pink-300 border border-[#DB2777]/30 text-[11px] font-bold flex items-center gap-1">
                  <FlaskConical className="w-3.5 h-3.5 text-pink-300" /> Active Business Experiment
                </span>
                <span className="text-xs text-purple-300 font-medium">
                  {activeExp.durationDays} Days Trial ({activeExp.status})
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {activeExp.suggestionTitle}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Mentor: <span className="font-semibold text-white">{activeExp.advisorName}</span> • Target: Boost customers from {activeExp.baselineCustomers} to {activeExp.targetCustomers} and revenue to ₹{activeExp.targetRevenue.toLocaleString('en-IN')}.
              </p>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold text-purple-200">
                  <span>Current Progress: {activeExp.currentCustomers} / {activeExp.targetCustomers} Customers</span>
                  <span className="text-emerald-400 font-bold">Goal Exceeded (+35%)</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#DB2777] to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => setActiveView('entrepreneur-monthly-report')}
                className="bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold text-xs px-5 py-3 rounded-xl shadow-md transition text-center"
              >
                Update Monthly Results
              </button>
              <button
                onClick={() => setActiveView('entrepreneur-ai-insights')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3 rounded-xl border border-white/20 transition text-center flex items-center justify-center gap-1.5"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-pink-300" />
                <span>View AI Growth Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Recent Ideas & Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Ideas Received */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#7C3AED]" />
              <h3 className="font-bold text-[#1F2937] text-base">Ideas Received From Community</h3>
            </div>
            <button
              onClick={() => setActiveView('community-feed')}
              className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1"
            >
              <span>View All Discussions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {suggestions.slice(0, 3).map((sug) => (
              <div
                key={sug.id}
                className="p-4 rounded-xl border border-[#F3E8FF] hover:border-[#E9D5FF] transition bg-[#FDFCFE] space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#1F2937]">{sug.userName}</span>
                      <span className="text-[10px] text-[#7C3AED] font-semibold bg-[#F5F3FF] px-2 py-0.5 rounded-md border border-[#E9D5FF]">
                        {sug.userBadge || 'Business Advisor'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 font-medium mt-1 leading-relaxed">
                      {sug.suggestion}
                    </p>
                  </div>

                  {/* AI Score Badge */}
                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#BE185D] bg-[#FDF2F8] border border-[#FCE7F3] px-2.5 py-1 rounded-xl">
                      <Sparkles className="w-3 h-3 text-[#DB2777]" />
                      AI {sug.aiScore}/100
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span>Feasibility: <strong className="text-emerald-700">{sug.aiFeasibility}</strong></span>
                    <span>Cost: <strong className="text-gray-700">{sug.aiEstimatedCost}</strong></span>
                    <span>Impact: <strong className="text-[#7C3AED]">{sug.aiPotentialImpact}</strong></span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPostId(sug.postId);
                      setActiveView('discussion');
                    }}
                    className="text-[#7C3AED] font-bold hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Links & Plan Info */}
        <div className="space-y-4">
          {/* Post Limit & Pro Banner */}
          <div className="bg-[#F5F3FF] p-5 rounded-2xl border border-[#E9D5FF] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4 text-[#7C3AED]" />
                Community Posts
              </span>
              <span className="text-xs font-extrabold text-[#7C3AED] bg-white px-2 py-0.5 rounded-lg border border-[#E9D5FF]">
                {postsRemaining} Left
              </span>
            </div>

            <div className="w-full bg-[#E9D5FF] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#7C3AED] h-full rounded-full"
                style={{ width: `${(postsUsed / postLimit) * 100}%` }}
              />
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed">
              Basic Premium plan includes 2 community posts for 1 month for new users. Need priority advisor visibility and 5 posts/month?
            </p>

            <button
              onClick={() => setActiveView('entrepreneur-subscription')}
              className="w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>Explore Accelerated Growth (₹999)</span>
            </button>
          </div>

          {/* Quick AI Assist Card */}
          <div className="bg-[#FDF2F8] p-5 rounded-2xl border border-[#FCE7F3] space-y-2.5">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-[#DB2777]" />
              <h4 className="font-bold text-[#BE185D] text-sm">AI Growth Intelligence</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Review automated AI business reports, profit analysis, and actionable growth recommendations.
            </p>
            <button
              onClick={() => setActiveView('entrepreneur-ai-insights')}
              className="w-full py-2 rounded-xl bg-white hover:bg-pink-50 text-[#BE185D] border border-[#FCE7F3] text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs"
            >
              <span>Open Growth Intelligence</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Ask Community Modal */}
      <AskCommunityModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
      />
    </div>
  );
};
