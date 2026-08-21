import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Building,
  Users,
  MessageSquare,
  FlaskConical,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { businesses, posts, experiments, toggleBusinessVerification } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
          TechSHEon Supervisory Console
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Administration</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Manage micro-enterprise verifications, oversee 30-day experiment trials, and monitor verified growth impact.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Registered Businesses
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{businesses.length}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Community Challenges
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-900">{posts.length}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Tracked Experiments
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-900">{experiments.length}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Verified Growth Cases
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">2</p>
        </div>
      </div>

      {/* Businesses Verification Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">Women-Led Businesses Verification</h3>
          <span className="text-xs text-slate-400">Click to toggle verified badge</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-bold">Business Name</th>
                <th className="pb-3 font-bold">Category & City</th>
                <th className="pb-3 font-bold">Monthly Revenue</th>
                <th className="pb-3 font-bold text-center">Status</th>
                <th className="pb-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {businesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 font-bold text-slate-900">{biz.businessName}</td>
                  <td className="py-3 text-slate-500">
                    {biz.category} • 📍 {biz.city}
                  </td>
                  <td className="py-3 font-extrabold text-slate-800">
                    ₹{biz.monthlyRevenue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 text-center">
                    {biz.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => toggleBusinessVerification(biz.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                        biz.verified
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {biz.verified ? 'Revoke' : 'Verify'}
                    </button>
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
