import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Sparkles,
  Award,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  BrainCircuit,
  IndianRupee,
  Users,
  Send,
  AlertCircle,
  FlaskConical,
  X,
  HelpCircle,
} from 'lucide-react';
import { Suggestion } from '../../types';

export const DiscussionView: React.FC = () => {
  const {
    posts,
    selectedPostId,
    setActiveView,
    suggestions,
    addSuggestion,
    voteSuggestion,
    selectIdeaForExperiment,
    currentUser,
    currentRole,
    isAiAnalyzing,
  } = useApp();

  const post = posts.find((p) => p.id === selectedPostId) || posts[0];
  const postSuggestions = suggestions.filter((s) => s.postId === post?.id);

  // Suggestion form states
  const [newIdeaText, setNewIdeaText] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('Low (< ₹1,000)');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Experiment Confirmation Modal state
  const [selectedSuggestionForModal, setSelectedSuggestionForModal] = useState<Suggestion | null>(null);
  const [durationDays, setDurationDays] = useState(30);
  const [targetCust, setTargetCust] = useState(post ? Math.round(post.currentCustomers * 1.2) : 120);
  const [targetRev, setTargetRev] = useState(post ? Math.round(post.currentRevenue * 1.2) : 60000);

  if (!post) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-purple-100">
        <p className="text-sm font-semibold text-slate-600">Challenge not found.</p>
        <button
          onClick={() => setActiveView('community-feed')}
          className="mt-3 text-xs font-bold text-purple-700 hover:underline"
        >
          Back to Feed
        </button>
      </div>
    );
  }

  const handleSubmitSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!newIdeaText.trim()) {
      setSubmitError('Please enter your suggestion details.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addSuggestion({
        postId: post.id,
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        userBadge: currentUser.role === 'advisor' ? 'Business Advisor' : 'Community Contributor',
        suggestion: newIdeaText,
        actionPlan: actionPlan || '1. Prepare promo material. 2. Announce to customers. 3. Track response for 30 days.',
      });

      setNewIdeaText('');
      setActionPlan('');
    } catch (err: any) {
      setSubmitError('Error adding suggestion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmExperiment = () => {
    if (!selectedSuggestionForModal) return;

    selectIdeaForExperiment({
      postId: post.id,
      suggestionId: selectedSuggestionForModal.id,
      suggestionTitle: selectedSuggestionForModal.suggestion.slice(0, 70),
      advisorId: selectedSuggestionForModal.userId,
      advisorName: selectedSuggestionForModal.userName,
      baselineCustomers: post.currentCustomers,
      baselineRevenue: post.currentRevenue,
      targetCustomers: Number(targetCust),
      targetRevenue: Number(targetRev),
      durationDays: Number(durationDays),
      notes: selectedSuggestionForModal.actionPlan || 'Testing customer response in Akola.',
    });

    setSelectedSuggestionForModal(null);
    setActiveView('entrepreneur-experiments');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Back Button */}
      <button
        onClick={() => setActiveView('community-feed')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Community Challenges</span>
      </button>

      {/* Main Challenge Post Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-md">
                {post.category}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                {post.city}
              </span>
              {post.verified && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> Verified Business
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="text-xs text-slate-400 shrink-0">
            Posted {post.createdAt}
          </div>
        </div>

        {/* Situation Data Callout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gradient-to-r from-purple-50 via-pink-50/40 to-purple-50/40 p-4 rounded-2xl border border-purple-100">
          <div>
            <span className="text-[10px] text-purple-900 font-bold uppercase tracking-wider block">
              Business
            </span>
            <p className="text-xs font-extrabold text-slate-900 mt-0.5">{post.businessName}</p>
          </div>
          <div>
            <span className="text-[10px] text-purple-900 font-bold uppercase tracking-wider block">
              Current Customers
            </span>
            <p className="text-xs font-extrabold text-indigo-900 mt-0.5">
              {post.currentCustomers} / month
            </p>
          </div>
          <div>
            <span className="text-[10px] text-purple-900 font-bold uppercase tracking-wider block">
              Current Monthly Revenue
            </span>
            <p className="text-xs font-extrabold text-purple-900 mt-0.5">
              ₹{post.currentRevenue.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Main Challenge Identified:
          </h4>
          <p className="text-xs font-semibold text-pink-700 bg-pink-50 p-2.5 rounded-xl border border-pink-100">
            {post.mainChallenge}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Context & Details:
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {post.description}
          </p>
        </div>
      </div>

      {/* Give Your Suggestion Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-700" />
            <h3 className="text-base font-extrabold text-slate-900">
              Suggest an Actionable Business Idea
            </h3>
          </div>
          <span className="text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-xl">
            +5 Impact Points
          </span>
        </div>

        {submitError && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitSuggestion} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Your Core Idea / Recommendation *
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Launch a 'Refer a Neighbour, Get ₹50 Voucher' campaign with printed discount slips..."
              value={newIdeaText}
              onChange={(e) => setNewIdeaText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Practical Step-by-Step Implementation Plan
            </label>
            <textarea
              rows={2}
              placeholder="1. Print 100 slips (₹300). 2. Hand to every visiting customer. 3. Validate with phone number on second visit."
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              id="submit-suggestion-btn"
              type="submit"
              disabled={isSubmitting || isAiAnalyzing}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-xs font-bold px-6 py-2.5 rounded-2xl shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <BrainCircuit className="w-4 h-4 animate-spin text-pink-200" />
                  <span>Evaluating with AI...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Idea & Evaluate with AI</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Community Suggestions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-700" />
            <span>Community Suggestions ({postSuggestions.length})</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Ranked by AI Feasibility & Votes</span>
        </div>

        {postSuggestions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-purple-100 p-8 text-center text-slate-500 text-xs">
            No suggestions yet. Be the first advisor to propose a practical idea!
          </div>
        ) : (
          postSuggestions.map((sug) => (
            <div
              key={sug.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-xs space-y-5 hover:border-purple-200 transition"
            >
              {/* Advisor Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {sug.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{sug.userName}</h4>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.2 rounded-md">
                        {sug.userBadge || 'Business Advisor'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{sug.createdAt}</p>
                  </div>
                </div>

                {/* Upvote button */}
                <button
                  id={`upvote-sug-${sug.id}`}
                  onClick={() => voteSuggestion(sug.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{sug.votes}</span>
                </button>
              </div>

              {/* Suggestion Text & Action Plan */}
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  “{sug.suggestion}”
                </h4>
                {sug.actionPlan && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 block">Action Plan:</span>
                    <p className="whitespace-pre-line leading-relaxed">{sug.actionPlan}</p>
                  </div>
                )}
              </div>

              {/* AI IDEA ANALYZER CARD */}
              <div className="bg-gradient-to-br from-purple-50 via-pink-50/40 to-purple-100/40 p-4 sm:p-5 rounded-2xl border border-purple-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4 text-purple-700" />
                    AI Idea Analyzer
                  </span>
                  <span className="text-xs font-extrabold bg-purple-700 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    Score: {sug.aiScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-700">
                  <div className="bg-white/80 p-2 rounded-xl border border-purple-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Feasibility</span>
                    <span className="text-emerald-700 font-bold">{sug.aiFeasibility || 'High'}</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-purple-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Est. Cost</span>
                    <span className="text-slate-900 font-bold">{sug.aiEstimatedCost || 'Low (< ₹1K)'}</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-purple-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Potential Impact</span>
                    <span className="text-purple-700 font-bold">{sug.aiPotentialImpact || 'High'}</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-purple-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Difficulty</span>
                    <span className="text-slate-900 font-bold">{sug.aiDifficulty || 'Easy'}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  “{sug.aiExplanation || 'Low financial risk with fast turnaround time and direct word-of-mouth leverage.'}”
                </p>

                <p className="text-[10px] text-slate-400">
                  * Note: AI provides feasibility analysis to guide decisions. Results depend on execution.
                </p>
              </div>

              {/* Select Idea Button */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">
                  {sug.isSelected ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Active 30-Day Experiment
                    </span>
                  ) : (
                    'Ready for testing'
                  )}
                </span>

                {!sug.isSelected && (
                  <button
                    id={`select-idea-btn-${sug.id}`}
                    onClick={() => setSelectedSuggestionForModal(sug)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Select This Idea & Test</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Turn Into Experiment Modal */}
      {selectedSuggestionForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedSuggestionForModal(null)}
                className="absolute top-5 right-5 text-purple-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-300 flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5" /> Start Business Experiment
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Turn Idea into 30-Day Experiment
              </h2>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-xs space-y-1">
                <span className="font-bold text-purple-900">Selected Suggestion:</span>
                <p className="text-slate-700 font-medium">“{selectedSuggestionForModal.suggestion}”</p>
                <p className="text-[11px] text-purple-700 pt-1">
                  Advisor: <strong>{selectedSuggestionForModal.userName}</strong> (+10 Impact Points awarded)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Target Customers
                  </label>
                  <input
                    type="number"
                    value={targetCust}
                    onChange={(e) => setTargetCust(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400">Baseline: {post.currentCustomers}</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Target Revenue (₹)
                  </label>
                  <input
                    type="number"
                    value={targetRev}
                    onChange={(e) => setTargetRev(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400">Baseline: ₹{post.currentRevenue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Trial Duration
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
                >
                  <option value={15}>15 Days Rapid Trial</option>
                  <option value={30}>30 Days Standard Experiment</option>
                  <option value={60}>60 Days Extended Program</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  id="confirm-start-experiment-btn"
                  onClick={handleConfirmExperiment}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-xs font-bold shadow-md transition"
                >
                  Launch Experiment & Go to Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
