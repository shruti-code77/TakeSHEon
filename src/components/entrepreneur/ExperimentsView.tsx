import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FlaskConical,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  IndianRupee,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';

export const ExperimentsView: React.FC = () => {
  const {
    experiments,
    currentBusiness,
    markExperimentImplemented,
    setActiveView,
  } = useApp();

  const biz = currentBusiness;
  const bizExperiments = experiments.filter((e) => e.businessId === biz?.id);

  const inProgressList = bizExperiments.filter((e) => e.status === 'In Progress');
  const completedList = bizExperiments.filter((e) => e.status === 'Completed');

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-purple-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-purple-700" />
            <h1 className="text-2xl font-extrabold text-slate-900">Business Experiments</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transform high-voted community suggestions into structured, low-risk 30-day trials.
          </p>
        </div>

        <button
          onClick={() => setActiveView('community-feed')}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-md transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Browse Ideas to Test</span>
        </button>
      </div>

      {/* In Progress Experiments */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
          <Clock className="w-4 h-4 text-pink-600" />
          <span>Active Experiments ({inProgressList.length})</span>
        </h2>

        {inProgressList.length === 0 ? (
          <div className="bg-white rounded-3xl border border-purple-100 p-8 text-center space-y-3">
            <FlaskConical className="w-10 h-10 text-purple-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No active experiments right now</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Select a high-voted suggestion from your community discussions to turn it into your next 30-day experiment.
            </p>
            <button
              onClick={() => setActiveView('community-feed')}
              className="mt-2 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition"
            >
              Explore Community Suggestions
            </button>
          </div>
        ) : (
          inProgressList.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl border-2 border-purple-200/80 p-6 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase tracking-wider">
                      {exp.durationDays} Days Trial
                    </span>
                    <span className="text-xs text-slate-500">
                      Advisor: <strong className="text-slate-800">{exp.advisorName}</strong>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    {exp.suggestionTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">{exp.notes}</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold self-start shrink-0 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  In Progress
                </span>
              </div>

              {/* Target vs Baseline stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Baseline Customers</span>
                  <p className="text-sm font-extrabold text-slate-800 mt-0.5">{exp.baselineCustomers}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Customers</span>
                  <p className="text-sm font-extrabold text-purple-700 mt-0.5">{exp.targetCustomers}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Baseline Revenue</span>
                  <p className="text-sm font-extrabold text-slate-800 mt-0.5">₹{exp.baselineRevenue.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Revenue</span>
                  <p className="text-sm font-extrabold text-purple-700 mt-0.5">₹{exp.targetRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markExperimentImplemented(exp.id)}
                    className="text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-800 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Mark as Implemented</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveView('entrepreneur-monthly-report')}
                  className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-xs transition"
                >
                  Enter Monthly Results →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SECTION: IDEAS THAT CHANGED MY BUSINESS */}
      <div className="space-y-4 pt-4 border-t border-purple-100">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span>Ideas That Changed My Business</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            TechSHEon tracks both successful and low-impact experiments so micro-enterprises learn what delivers real ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedList.map((exp) => {
            const isPositive = exp.impactResult === 'Positive';
            return (
              <div
                key={exp.id}
                className={`p-6 rounded-3xl border bg-white shadow-xs space-y-4 ${
                  isPositive ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-amber-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isPositive ? '🟢 Positive Impact' : '🟡 Low Impact Learning'}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1.5">
                      {exp.suggestionTitle}
                    </h3>
                  </div>

                  <span className="text-xs text-slate-400 font-medium shrink-0">
                    Status: <strong className="text-slate-700">Completed</strong>
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-600">Customers:</span>
                    <span className={isPositive ? 'text-emerald-700' : 'text-slate-700'}>
                      +{exp.customerGrowthPct || 2}%
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-600">Revenue:</span>
                    <span className={isPositive ? 'text-emerald-700' : 'text-slate-700'}>
                      +{exp.revenueGrowthPct || 2}%
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-600">Profit Growth:</span>
                    <span className={isPositive ? 'text-emerald-700 font-extrabold' : 'text-slate-700'}>
                      +{exp.profitGrowthPct || 1}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-purple-50/40 p-3 rounded-xl">
                  <strong>Key Takeaway:</strong> {exp.notes}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
