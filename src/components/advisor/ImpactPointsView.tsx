import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Sparkles, TrendingUp, CheckCircle2, Gift, ArrowRight, ShieldCheck } from 'lucide-react';

export const ImpactPointsView: React.FC = () => {
  const { currentUser, setActiveView } = useApp();

  const rules = [
    { action: 'Post a practical suggestion', points: '+5 Points', desc: 'When you share an actionable idea on any challenge' },
    { action: 'Suggestion selected for experiment', points: '+10 Points', desc: 'When a woman entrepreneur selects your idea to test' },
    { action: 'Experiment marked as implemented', points: '+20 Points', desc: 'When the business successfully rolls out your strategy' },
    { action: 'Business shows verified improvement', points: '+50 Points', desc: 'When monthly revenue or customers grow in AI report' },
  ];

  const transactions = [
    { id: 'tx-1', date: 'Jul 28, 2026', activity: 'Business showed +34% verified growth (Priya Boutique)', points: '+50 Pts', type: 'growth' },
    { id: 'tx-2', date: 'Jul 04, 2026', activity: 'Experiment marked implemented (Referral Program)', points: '+20 Pts', type: 'implemented' },
    { id: 'tx-3', date: 'Jun 28, 2026', activity: 'Suggestion selected by Priya Sharma', points: '+10 Pts', type: 'selected' },
    { id: 'tx-4', date: 'Jun 28, 2026', activity: 'Suggestion posted on Boutique challenge', points: '+5 Pts', type: 'posted' },
    { id: 'tx-5', date: 'Jun 15, 2026', activity: 'Claimed ₹100 Partner Discount Voucher', points: '-100 Pts', type: 'redeem' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-pink-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-yellow-300" />
            Gamified Impact Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Impact Points Ledger
          </h1>
          <p className="text-xs sm:text-sm text-pink-200 mt-1">
            Earn points when your advice translates into real, measured business growth.
          </p>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-[10px] text-pink-200 uppercase font-bold tracking-wider">Current Balance</span>
          <p className="text-3xl font-extrabold text-white">{currentUser.points} Pts</p>
          <button
            onClick={() => setActiveView('advisor-rewards')}
            className="mt-2 text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-xl transition"
          >
            Redeem Rewards →
          </button>
        </div>
      </div>

      {/* Rules Breakdown Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-extrabold text-slate-800">How to Earn Impact Points</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rules.map((rule, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{rule.action}</h4>
                  <span className="text-xs font-extrabold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md shrink-0">
                    {rule.points}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Points Activity Ledger</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-bold">Date</th>
                <th className="pb-3 font-bold">Activity Description</th>
                <th className="pb-3 font-bold text-right">Points Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-purple-50/30 transition">
                  <td className="py-3 text-slate-500 font-medium whitespace-nowrap">{tx.date}</td>
                  <td className="py-3 text-slate-800 font-medium">{tx.activity}</td>
                  <td className="py-3 text-right font-extrabold whitespace-nowrap">
                    <span className={tx.points.startsWith('+') ? 'text-emerald-700' : 'text-rose-600'}>
                      {tx.points}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
