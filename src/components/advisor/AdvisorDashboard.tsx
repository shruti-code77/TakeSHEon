import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Gift,
  Trophy,
  Compass,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const AdvisorDashboard: React.FC = () => {
  const { currentUser, suggestions, posts, setActiveView, setSelectedPostId } = useApp();

  const mySuggestions = suggestions.filter((s) => s.userId === currentUser.id);
  const selectedCount = mySuggestions.filter((s) => s.isSelected).length;
  const implementedCount = 2; // Demo verified

  const pointsToNextReward = Math.max(0, 100 - currentUser.points);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-pink-950 via-purple-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              Business Advisor Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {currentUser.name} 🌟
            </h1>
            <p className="text-xs sm:text-sm text-pink-200">
              Share actionable growth ideas for women-led micro-enterprises and earn redeemable rewards as their revenue grows.
            </p>
          </div>

          {/* Points Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 sm:w-64 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs text-pink-200">
              <span className="font-bold uppercase tracking-wider">Impact Points</span>
              <span className="text-amber-300 font-bold">{currentUser.points} / 100</span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {currentUser.points} <span className="text-xs text-pink-300 font-normal">Pts</span>
            </div>

            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-pink-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentUser.points / 100) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-pink-200">
              {pointsToNextReward > 0
                ? `Earn ${pointsToNextReward} more points to unlock a ₹100 voucher!`
                : 'Reward unlocked! Claim your voucher now.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Advisor Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Impact Points
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-pink-600">{currentUser.points}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Level 2 Advisor</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Suggestions Given
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{mySuggestions.length + 8}</p>
          <p className="text-[11px] text-purple-700 font-semibold mt-1">+5 pts per idea</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Ideas Selected
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-900">{selectedCount + 3}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">+10 pts per selection</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Successful Growth
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{implementedCount}</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">+50 pts verified!</p>
        </div>
      </div>

      {/* Grid: Challenges Needing Advice & Recent Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challenges seeking advisors */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-700" />
              <h3 className="font-extrabold text-slate-900 text-base">Challenges Seeking Advice</h3>
            </div>
            <button
              onClick={() => setActiveView('community-feed')}
              className="text-xs font-bold text-purple-700 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPostId(post.id);
                  setActiveView('discussion');
                }}
                className="p-4 rounded-2xl border border-purple-100 hover:border-purple-300 bg-slate-50/50 hover:bg-purple-50/30 transition cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{post.businessName}</span>
                  <span className="text-[10px] text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-md">
                    {post.category}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">{post.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>📍 {post.city}</span>
                  <span className="text-pink-600 font-bold flex items-center gap-1">
                    Give Suggestion →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Suggestions Status */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-pink-600" />
              <h3 className="font-extrabold text-slate-900 text-base">My Recent Suggestions</h3>
            </div>
            <button
              onClick={() => setActiveView('advisor-impact')}
              className="text-xs font-bold text-pink-700 hover:underline"
            >
              Points History
            </button>
          </div>

          <div className="space-y-3">
            {mySuggestions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                You have not posted any ideas yet. Explore challenges to start earning points!
              </div>
            ) : (
              mySuggestions.map((sug) => (
                <div key={sug.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                      “{sug.suggestion}”
                    </p>
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md shrink-0">
                      AI {sug.aiScore}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400">{sug.createdAt}</span>
                    {sug.isSelected ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected (+10 pts)
                      </span>
                    ) : (
                      <span className="text-purple-700 font-medium">Idea Posted (+5 pts)</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
