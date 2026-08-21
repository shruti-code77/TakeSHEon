import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  LineChart as ChartIcon,
  TrendingUp,
  IndianRupee,
  Users,
  BrainCircuit,
  ArrowUpRight,
  Sparkles,
  Calendar,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { metrics, currentBusiness, setActiveView } = useApp();

  const biz = currentBusiness;
  const bizMetrics = metrics.filter((m) => m.businessId === biz?.id);

  // Format data for Recharts
  const chartData = bizMetrics.map((m) => ({
    month: m.month,
    Revenue: m.revenue,
    Expenses: m.expenses,
    Profit: m.profit,
    Customers: m.customers,
    Orders: m.orders,
    NewCustomers: m.newCustomers || 0,
    RepeatCustomers: m.repeatCustomers || 0,
  }));

  const latest = bizMetrics[bizMetrics.length - 1] || {
    revenue: 67000,
    expenses: 40000,
    profit: 27000,
    customers: 135,
  };

  const initial = bizMetrics[0] || {
    revenue: 45000,
    expenses: 30000,
    profit: 15000,
    customers: 80,
  };

  const overallRevGrowth = initial.revenue > 0 ? Math.round(((latest.revenue - initial.revenue) / initial.revenue) * 100) : 0;
  const overallProfitGrowth = initial.profit > 0 ? Math.round(((latest.profit - initial.profit) / initial.profit) * 100) : 0;
  const overallCustGrowth = initial.customers > 0 ? Math.round(((latest.customers - initial.customers) / initial.customers) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ChartIcon className="w-6 h-6 text-[#7C3AED]" />
            <h1 className="text-2xl font-black text-[#1F2937]">Business Growth Analytics</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Tracking verified financial progress from baseline to community-powered experiments.
          </p>
        </div>

        <button
          onClick={() => setActiveView('entrepreneur-ai-insights')}
          className="flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] hover:from-[#6D28D9] hover:to-[#BE185D] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <BrainCircuit className="w-4 h-4 text-pink-300" />
          <span>AI Growth Analysis</span>
        </button>
      </div>

      {/* KPI Growth Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#F3E8FF] shadow-xs">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Revenue Growth</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-[#1F2937]">+{overallRevGrowth}%</span>
            <span className="text-xs font-semibold text-emerald-600">₹{initial.revenue.toLocaleString('en-IN')} → ₹{latest.revenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#F3E8FF] shadow-xs">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Net Profit Surge</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-600">+{overallProfitGrowth}%</span>
            <span className="text-xs font-semibold text-emerald-600">₹{initial.profit.toLocaleString('en-IN')} → ₹{latest.profit.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#F3E8FF] shadow-xs">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Expansion</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-[#7C3AED]">+{overallCustGrowth}%</span>
            <span className="text-xs font-semibold text-[#7C3AED]">{initial.customers} → {latest.customers} monthly clients</span>
          </div>
        </div>
      </div>

      {/* Primary Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Revenue & Profit Growth Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#1F2937]">Revenue & Profit Progression (₹)</h3>
              <p className="text-xs text-gray-500">Monthly trajectory before & after experiment</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              Profits +{overallProfitGrowth}%
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="Revenue"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                  name="Monthly Revenue (₹)"
                />
                <Line
                  type="monotone"
                  dataKey="Profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                  name="Net Profit (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Revenue vs Expenses Stacked / Bar Comparison */}
        <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#1F2937]">Revenue vs Operating Expenses (₹)</h3>
              <p className="text-xs text-gray-500">Demonstrating healthy operating leverage</p>
            </div>
            <span className="text-xs font-bold text-[#7C3AED] bg-[#F5F3FF] px-2.5 py-1 rounded-xl border border-[#E9D5FF]">
              Controlled Costs
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="Revenue" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Revenue" />
                <Bar dataKey="Expenses" fill="#db2777" radius={[6, 6, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Customer Growth & Repeat Retention */}
        <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#1F2937]">Customer Base Expansion & Repeat Retention</h3>
              <p className="text-xs text-gray-500">Breakdown of new walk-ins vs repeat clients</p>
            </div>
            <span className="text-xs font-bold text-[#7C3AED] bg-[#F5F3FF] px-2.5 py-1 rounded-xl border border-[#E9D5FF]">
              Repeat Customers Surge
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="Customers" stroke="#7c3aed" fill="#ede9fe" strokeWidth={2} name="Total Customers" />
                <Area type="monotone" dataKey="Orders" stroke="#db2777" fill="#fce7f3" strokeWidth={2} name="Total Orders" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
