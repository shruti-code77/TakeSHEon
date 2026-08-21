import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Store, Award, User, Lock, Mail, Phone, MapPin, Building, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';
import { TechSHEonIcon } from '../common/TechSHEonLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  initialRole?: 'entrepreneur' | 'advisor';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'entrepreneur',
}) => {
  const { loginUser, signupUser, switchUser } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Clothing');
  const [city, setCity] = useState('Akola');
  const [description, setDescription] = useState('');
  const [areasOfInterest, setAreasOfInterest] = useState('Customer Retention');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!email) {
        setErrorMsg('Please enter your email address');
        return;
      }
      loginUser(email, role);
      onClose();
    } else {
      if (!name || !email) {
        setErrorMsg('Name and email are required');
        return;
      }
      signupUser({
        name,
        email,
        phone,
        role,
        businessName,
        category,
        city,
        description,
        areasOfInterest,
      });
      onClose();
    }
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    switchUser(demoRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <TechSHEonIcon size="lg" className="border-cyan-400/50" />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-widest text-pink-300">
                  {mode === 'login' ? 'Welcome Back' : 'Get Started'}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white leading-tight">
                {mode === 'login' ? 'Login to TechSHEon' : 'Create Your TechSHEon Account'}
              </h2>
              <p className="text-xs text-purple-200 mt-0.5">
                Community Ideas. Real Business Growth.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Demo Selector for Judges */}
        <div className="bg-purple-50/70 p-3.5 px-6 border-b border-purple-100 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-purple-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Hackathon 1-Click Login:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuickDemo('entrepreneur')}
              className="text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1 rounded-lg shadow-xs transition"
            >
              Priya (Entrepreneur)
            </button>
            <button
              onClick={() => handleQuickDemo('advisor')}
              className="text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white px-2.5 py-1 rounded-lg shadow-xs transition"
            >
              Anjali (Advisor)
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'login' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'signup' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Role Choice */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Select Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('entrepreneur')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition ${
                  role === 'entrepreneur'
                    ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Store className={`w-5 h-5 mt-0.5 ${role === 'entrepreneur' ? 'text-purple-700' : 'text-slate-400'}`} />
                <div>
                  <p className="text-xs font-bold text-slate-800">Woman Entrepreneur</p>
                  <p className="text-[10px] text-slate-500">I own a small business</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('advisor')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition ${
                  role === 'advisor'
                    ? 'border-pink-600 bg-pink-50/50 ring-2 ring-pink-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Award className={`w-5 h-5 mt-0.5 ${role === 'advisor' ? 'text-pink-600' : 'text-slate-400'}`} />
                <div>
                  <p className="text-xs font-bold text-slate-800">Business Advisor</p>
                  <p className="text-[10px] text-slate-500">I give advice & earn points</p>
                </div>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={role === 'entrepreneur' ? 'e.g. Priya Sharma' : 'e.g. Anjali Deshmukh'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder={
                    mode === 'login'
                      ? role === 'entrepreneur'
                        ? 'entrepreneur@techsheon.demo'
                        : 'advisor@techsheon.demo'
                      : 'yourname@example.com'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="+91 98234 56789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Entrepreneur specific signup fields */}
            {mode === 'signup' && role === 'entrepreneur' && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">
                  Business Information
                </span>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya's Boutique"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
                    >
                      <option value="Clothing">Clothing / Boutique</option>
                      <option value="Tailoring">Tailoring</option>
                      <option value="Beauty">Beauty Parlour</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Food">Home Food / Papad</option>
                      <option value="Jewellery">Handmade Jewellery</option>
                      <option value="Chakki">Chakki / Flour Mill</option>
                      <option value="Mehendi">Mehendi Designer</option>
                      <option value="Services">Local Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
                    >
                      <option value="Akola">Akola</option>
                      <option value="Shegaon">Shegaon</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Amravati">Amravati</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Business Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of what you make or sell..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Advisor specific signup fields */}
            {mode === 'signup' && role === 'advisor' && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Areas of Interest / Expertise</label>
                  <select
                    value={areasOfInterest}
                    onChange={(e) => setAreasOfInterest(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-pink-600 focus:outline-hidden bg-white"
                  >
                    <option value="Customer Retention">Customer Retention & Repeat Sales</option>
                    <option value="Digital Marketing">Social Media & WhatsApp Marketing</option>
                    <option value="Pricing Strategy">Pricing, Combos & Margins</option>
                    <option value="Packaging">Product Packaging & Logistics</option>
                    <option value="Cost Reduction">Cost Optimization & Bulk Sourcing</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition mt-4"
            >
              {mode === 'login' ? 'Log In to Account' : 'Create TechSHEon Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
