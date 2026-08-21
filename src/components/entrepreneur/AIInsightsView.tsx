import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BrainCircuit,
  TrendingUp,
  Sparkles,
  Award,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  ShieldCheck,
  Send,
  Zap,
} from 'lucide-react';

export const AIInsightsView: React.FC = () => {
  const {
    currentBusiness,
    latestGrowthReport,
    runLiveGrowthAnalysis,
    isAiAnalyzing,
    experiments,
    metrics,
    setActiveView,
  } = useApp();

  const biz = currentBusiness;
  const activeExp = experiments.find((e) => e.businessId === biz?.id) || experiments[0];
  const [successNotice, setSuccessNotice] = useState(false);

  const report = latestGrowthReport || {
    id: 'rep-initial',
    businessId: biz?.id || 'biz-priya',
    month: 'Jul 2026',
    revenueGrowthPct: 34,
    customerGrowthPct: 35,
    profitGrowthPct: 50,
    summary:
      'Your customer referral program significantly increased repeat customers, leading to a ₹17,000 revenue increase with only ₹8,000 additional inventory costs.',
    recommendations: [
      'Continue the referral program permanently as customer acquisition cost is near ₹0.',
      'Introduce festive ethnic wear combo packages (Kurti + Dupatta + Alteration) for the upcoming festival season.',
      'Start collecting customer WhatsApp numbers with explicit consent to broadcast new weekly catalog arrivals.',
    ],
    timestamp: 'Just now',
  };

  const handleRefreshAI = async () => {
    await runLiveGrowthAnalysis();
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-[#1F2937] text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        {/* Artistic glowing background blobs */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#DB2777] rounded-full filter blur-[60px] opacity-25 pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-[#7C3AED] rounded-full filter blur-[40px] opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DB2777]/20 text-pink-300 border border-[#DB2777]/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
              AI Impact & Attribution Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              AI Business Growth Report
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Verified metric changes attributed to <span className="font-semibold text-white">{activeExp?.suggestionTitle}</span>.
            </p>
          </div>

          <button
            id="run-live-ai-growth-btn"
            onClick={handleRefreshAI}
            disabled={isAiAnalyzing}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#DB2777] to-[#BE185D] hover:from-[#BE185D] hover:to-[#9D174D] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg transition self-start sm:self-auto shrink-0"
          >
            {isAiAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Metrics...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>Run Live AI Growth Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>New Gemini AI Growth Report computed successfully and impact points verified!</span>
        </div>
      )}

      {/* 3 Core Growth Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs text-center space-y-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue Growth</span>
          <p className="text-3xl sm:text-4xl font-black text-[#7C3AED]">
            +{report.revenueGrowthPct}%
          </p>
          <p className="text-xs text-emerald-600 font-semibold">Positive revenue trajectory</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs text-center space-y-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Growth</span>
          <p className="text-3xl sm:text-4xl font-black text-[#DB2777]">
            +{report.customerGrowthPct}%
          </p>
          <p className="text-xs text-emerald-600 font-semibold">Repeat client expansion</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs text-center space-y-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Profit Growth</span>
          <p className="text-3xl sm:text-4xl font-black text-emerald-600">
            +{report.profitGrowthPct}%
          </p>
          <p className="text-xs text-emerald-600 font-bold">Healthy net operating margin</p>
        </div>
      </div>

      {/* AI Summary Card */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#F3E8FF] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-[#7C3AED]" />
          <h3 className="font-extrabold text-[#1F2937] text-base">AI Growth Analysis Summary</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed bg-[#FDF2F8] p-4 rounded-xl border border-[#FCE7F3] font-medium italic">
          “{report.summary}”
        </p>
      </div>

      {/* AI Action Recommendations */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#F3E8FF] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#DB2777]" />
            <h3 className="font-extrabold text-[#1F2937] text-base">Recommended Next Steps</h3>
          </div>
          <span className="text-xs text-gray-400 font-medium">Auto-generated for {biz?.category}</span>
        </div>

        <div className="space-y-3">
          {report.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#F3E8FF] bg-[#FDFCFE] hover:bg-[#F5F3FF]/50 hover:border-[#E9D5FF] transition flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#F5F3FF] text-[#7C3AED] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#E9D5FF]">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                {rec}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Experiment mentor <strong className="text-gray-800">{activeExp?.advisorName}</strong> earned <strong className="text-[#7C3AED]">+50 Impact Points</strong> for verified improvement!
          </span>
          <button
            onClick={() => setActiveView('advisor-rewards')}
            className="text-xs font-bold text-[#DB2777] hover:text-[#BE185D] flex items-center gap-1"
          >
            <span>See Advisor Rewards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
