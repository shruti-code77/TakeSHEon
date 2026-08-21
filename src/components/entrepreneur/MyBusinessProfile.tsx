import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Store, MapPin, ShieldCheck, IndianRupee, Users, Wallet, TrendingUp, Edit3, Check, Calendar, Tag } from 'lucide-react';

export const MyBusinessProfile: React.FC = () => {
  const { currentBusiness, updateBusinessProfile, currentUser } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState(currentBusiness?.businessName || "Priya's Boutique");
  const [category, setCategory] = useState(currentBusiness?.category || 'Clothing');
  const [city, setCity] = useState(currentBusiness?.city || 'Akola');
  const [businessAge, setBusinessAge] = useState(currentBusiness?.businessAge || '2 Years');
  const [description, setDescription] = useState(
    currentBusiness?.description ||
      'Custom ethnic wear, festive kurtis, and designer bridal blouses crafted with precision for modern women in Vidarbha.'
  );
  const [averageCustomers, setAverageCustomers] = useState(currentBusiness?.averageCustomers || 135);
  const [monthlyRevenue, setMonthlyRevenue] = useState(currentBusiness?.monthlyRevenue || 67000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(currentBusiness?.monthlyExpenses || 40000);

  const monthlyProfit = Math.max(0, monthlyRevenue - monthlyExpenses);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessProfile({
      businessName,
      category,
      city,
      businessAge,
      description,
      averageCustomers: Number(averageCustomers),
      monthlyRevenue: Number(monthlyRevenue),
      monthlyExpenses: Number(monthlyExpenses),
      monthlyProfit,
    });
    setIsEditing(false);
  };

  if (!currentBusiness) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header Banner Card */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xs overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700 relative">
          <div className="absolute top-4 right-4">
            {currentBusiness.verified && (
              <span className="flex items-center gap-1 bg-white/95 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Business
              </span>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={currentBusiness.imageUrl || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80'}
                alt={currentBusiness.businessName}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-lg bg-white"
              />
              <div className="mb-1">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {currentBusiness.businessName}
                </h1>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-600" />
                  {currentBusiness.city}, Maharashtra • {currentBusiness.category}
                </p>
              </div>
            </div>

            <button
              id="edit-profile-btn"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold transition self-start sm:self-end"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Business Profile'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {currentBusiness.description}
          </p>
        </div>
      </div>

      {/* Profile Form / View */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-purple-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Edit Business Information</h3>
            <span className="text-xs text-purple-700 font-semibold">Live Profile Sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Business Name</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
              >
                <option value="Clothing">Clothing / Boutique</option>
                <option value="Tailoring">Tailoring</option>
                <option value="Beauty">Beauty Studio</option>
                <option value="Bakery">Bakery</option>
                <option value="Food">Home Food</option>
                <option value="Jewellery">Handmade Jewellery</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Business Age</label>
              <input
                type="text"
                value={businessAge}
                onChange={(e) => setBusinessAge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Monthly Revenue (₹)</label>
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Monthly Expenses (₹)</label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-purple-100/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Monthly Revenue
            </span>
            <p className="text-xl font-extrabold text-slate-900">
              ₹{currentBusiness.monthlyRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Verified records</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-purple-100/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Monthly Expenses
            </span>
            <p className="text-xl font-extrabold text-slate-900">
              ₹{currentBusiness.monthlyExpenses.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Raw materials & rent</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-purple-100/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Monthly Profit
            </span>
            <p className="text-xl font-extrabold text-emerald-700">
              ₹{currentBusiness.monthlyProfit.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">
              {Math.round((currentBusiness.monthlyProfit / currentBusiness.monthlyRevenue) * 100)}% Margin
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-purple-100/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Average Customers
            </span>
            <p className="text-xl font-extrabold text-indigo-900">
              {currentBusiness.averageCustomers} / month
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">{currentBusiness.businessAge} in business</p>
          </div>
        </div>
      )}
    </div>
  );
};
