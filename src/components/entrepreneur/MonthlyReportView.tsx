import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Calendar,
  IndianRupee,
  Users,
  Wallet,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const MonthlyReportView: React.FC = () => {
  const {
    currentBusiness,
    metrics,
    addBusinessMetrics,
    isAiAnalyzing,
    setActiveView,
  } = useApp();

  const biz = currentBusiness;
  const bizMetrics = metrics.filter((m) => m.businessId === biz?.id);
  const previousMetric = bizMetrics[bizMetrics.length - 1] || {
    month: 'Jun 2026',
    revenue: 50000,
    expenses: 32000,
    profit: 18000,
    customers: 100,
    orders: 125,
    newCustomers: 25,
    repeatCustomers: 75,
  };

  // Form states with realistic default test values (Priya's Boutique after referral program)
  const [month, setMonth] = useState('Aug 2026');
  const [revenue, setRevenue] = useState<number>(67000);
  const [expenses, setExpenses] = useState<number>(40000);
  const [customers, setCustomers] = useState<number>(135);
  const [orders, setOrders] = useState<number>(168);
  const [newCustomers, setNewCustomers] = useState<number>(50);
  const [repeatCustomers, setRepeatCustomers] = useState<number>(85);
  const [notes, setNotes] = useState('Referral voucher slips distributed to 90 walk-ins with strong repeat traction.');

  const [errorMsg, setErrorMsg] = useState('');
  const [successReportMsg, setSuccessReportMsg] = useState(false);

  // Auto calculate profit
  const calculatedProfit = Math.max(0, (Number(revenue) || 0) - (Number(expenses) || 0));

  // Quick compare calculations
  const revDiff = revenue - previousMetric.revenue;
  const revPct = previousMetric.revenue > 0 ? Math.round((revDiff / previousMetric.revenue) * 100) : 0;
  const profDiff = calculatedProfit - previousMetric.profit;
  const profPct = previousMetric.profit > 0 ? Math.round((profDiff / previousMetric.profit) * 100) : 0;
  const custDiff = customers - previousMetric.customers;
  const custPct = previousMetric.customers > 0 ? Math.round((custDiff / previousMetric.customers) * 100) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (revenue < 0 || expenses < 0 || customers < 0 || orders < 0) {
      setErrorMsg('Metrics values cannot be negative numbers.');
      return;
    }

    try {
      const report = await addBusinessMetrics({
        businessId: biz?.id || 'biz-priya',
        month,
        revenue: Number(revenue),
        expenses: Number(expenses),
        customers: Number(customers),
        orders: Number(orders),
        newCustomers: Number(newCustomers),
        repeatCustomers: Number(repeatCustomers),
        notes,
      });

      setSuccessReportMsg(true);
      setTimeout(() => {
        setActiveView('entrepreneur-ai-insights');
      }, 1200);
    } catch (err: any) {
      setErrorMsg('Could not submit metrics, please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Monthly Business Report</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enter this month's key numbers to compute automatic profit growth and trigger real-time AI impact analysis.
          </p>
        </div>

        <button
          onClick={() => setActiveView('entrepreneur-analytics')}
          className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-4 py-2.5 rounded-2xl transition self-start sm:self-auto"
        >
          View Analytics Charts →
        </button>
      </div>

      {/* Comparison Preview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Month */}
        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Previous Month ({previousMetric.month})
            </span>
            <span className="text-xs font-semibold text-slate-500">Baseline</span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-600">Revenue:</span>
              <span className="font-bold text-slate-800">₹{previousMetric.revenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-600">Expenses:</span>
              <span className="font-bold text-slate-800">₹{previousMetric.expenses.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-600">Net Profit:</span>
              <span className="font-bold text-emerald-700">₹{previousMetric.profit.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Customers:</span>
              <span className="font-bold text-indigo-700">{previousMetric.customers}</span>
            </div>
          </div>
        </div>

        {/* Current Month Projected */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50/40 to-emerald-50/40 p-5 rounded-3xl border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
              Current Entry ({month})
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              {revPct >= 0 ? `+${revPct}% Growth` : `${revPct}%`}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between py-1 border-b border-purple-100">
              <span className="text-slate-600">Revenue:</span>
              <span className="font-bold text-slate-900">₹{Number(revenue).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-purple-100">
              <span className="text-slate-600">Expenses:</span>
              <span className="font-bold text-slate-900">₹{Number(expenses).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-purple-100">
              <span className="text-slate-600">Calculated Profit:</span>
              <span className="font-extrabold text-emerald-700 text-sm">
                ₹{calculatedProfit.toLocaleString('en-IN')}
                {profPct > 0 && <span className="text-xs ml-1 text-emerald-600">(+{profPct}%)</span>}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Customers:</span>
              <span className="font-bold text-indigo-900">{customers} ({custPct >= 0 ? `+${custPct}%` : custPct})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Entry Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xs space-y-6">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successReportMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-bounce">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Monthly Data Logged! Generating TechSHEon AI Growth Report...</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Reporting Month *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jul 2026"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Monthly Revenue (₹) *
            </label>
            <div className="relative">
              <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="number"
                min="0"
                required
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-bold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Monthly Expenses (₹) *
            </label>
            <div className="relative">
              <Wallet className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="number"
                min="0"
                required
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Calculated Profit Display */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Auto-Calculated Profit (Revenue − Expenses)
            </span>
            <p className="text-xs text-slate-600">Zero errors guaranteed; negative figures clamped safely.</p>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-800">
            ₹{calculatedProfit.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Customers Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Total Customers *
            </label>
            <input
              type="number"
              min="0"
              required
              value={customers}
              onChange={(e) => setCustomers(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Total Orders *
            </label>
            <input
              type="number"
              min="0"
              required
              value={orders}
              onChange={(e) => setOrders(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              New Customers
            </label>
            <input
              type="number"
              min="0"
              value={newCustomers}
              onChange={(e) => setNewCustomers(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Repeat Customers
            </label>
            <input
              type="number"
              min="0"
              value={repeatCustomers}
              onChange={(e) => setRepeatCustomers(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Month's Observations & Experiment Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
          />
        </div>

        <div className="pt-2">
          <button
            id="submit-monthly-report-btn"
            type="submit"
            disabled={isAiAnalyzing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-800 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-purple-600/25 transition flex items-center justify-center gap-2"
          >
            {isAiAnalyzing ? (
              <>
                <BrainCircuit className="w-4 h-4 animate-spin text-pink-300" />
                <span>Running Gemini AI Business Growth Analyzer...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-4 h-4 text-pink-300" />
                <span>Submit & Generate AI Business Growth Report</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
