import React from 'react';
import { useApp } from '../../context/AppContext';
import { TechSHEonIcon } from '../common/TechSHEonLogo';
import {
  ArrowRight,
  TrendingUp,
  Users,
  Lightbulb,
  CheckCircle,
  BarChart3,
  Award,
  Sparkles,
  ShieldCheck,
  Building,
  CheckCircle2,
  ChevronRight,
  Store,
  Layers,
  HeartHandshake,
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'signup', role?: 'entrepreneur' | 'advisor') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { setActiveView, switchUser, businesses, posts } = useApp();

  const businessCategories = [
    { label: 'Tailoring & Stitching', icon: '✂️' },
    { label: 'Beauty Parlour & Spa', icon: '💄' },
    { label: 'Boutique & Clothing', icon: '👗' },
    { label: 'Home Bakeries & Snacks', icon: '🧁' },
    { label: 'Papad & Masala Units', icon: '🌶️' },
    { label: 'Chakki & Flour Mills', icon: '🌾' },
    { label: 'Handmade Jewellery', icon: '💍' },
    { label: 'Mehendi & Artistry', icon: '✨' },
    { label: 'Local Micro Services', icon: '🧺' },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-purple-50/80 via-white to-pink-50/30 border-b border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Official Logo Display */}
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="relative group">
                <TechSHEonIcon size="2xl" circular className="border-4 border-white shadow-2xl shadow-pink-500/25 ring-4 ring-pink-500/10 hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-purple-900 text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-pink-600 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Empowering Her Business, With Smart Tech.</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Turn Ideas Into <br />
              <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Real Business Growth
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              TechSHEon connects women entrepreneurs with a community of people who provide practical ideas, while AI measures which ideas actually improve business performance.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                id="hero-join-entrepreneur-btn"
                onClick={() => {
                  switchUser('entrepreneur');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-purple-600/25 hover:shadow-xl transition-all duration-200 text-sm"
              >
                <Store className="w-4 h-4 text-purple-200" />
                <span>Join as Entrepreneur</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                id="hero-join-advisor-btn"
                onClick={() => {
                  switchUser('advisor');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-pink-50 text-slate-800 hover:text-pink-700 font-bold px-7 py-3.5 rounded-2xl border border-slate-200 hover:border-pink-300 shadow-sm transition-all duration-200 text-sm"
              >
                <Award className="w-4 h-4 text-pink-600" />
                <span>Join as Business Advisor</span>
              </button>

              <button
                id="hero-explore-btn"
                onClick={() => setActiveView('community-feed')}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-slate-600 hover:text-purple-700 font-semibold px-4 py-3.5 rounded-2xl hover:bg-purple-50 transition text-sm"
              >
                <span>Explore Community</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Process Cycle Pill */}
            <div className="pt-8">
              <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-2xl border border-purple-100 shadow-md shadow-purple-500/5 text-xs sm:text-sm font-semibold text-slate-700 flex-wrap justify-center">
                <span className="text-purple-800 font-bold">Problem</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-purple-800 font-bold">Ideas</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-purple-800 font-bold">Implementation</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-pink-600 font-bold">AI Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Real Growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE TECHSHEON DISTINCTION */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-3 mb-8">
              <span className="text-pink-400 font-bold text-xs uppercase tracking-widest">
                Our Core Value Proposition
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                “We don't just give women entrepreneurs advice — we measure whether the advice actually grows their business.”
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Traditional */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traditional Communities</span>
                  <span className="text-xs text-rose-300 font-bold">No accountability</span>
                </div>
                <div className="text-lg font-bold text-slate-300">
                  Ask <span className="text-slate-500">→</span> Answer
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Entrepreneurs receive endless subjective tips, but nobody verifies if the ideas worked, caused losses, or went untested.
                </p>
              </div>

              {/* TechSHEon */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-800/60 to-pink-900/60 border border-purple-400/40 space-y-2 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">TechSHEon Closed-Loop Model</span>
                  <span className="text-xs text-emerald-300 font-bold">AI Measured</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-emerald-300">
                  Ask → Ideas → Select → Implement → Measure → Learn → Reward
                </div>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Every suggestion turns into a tracked 30-day experiment. Monthly data proves real revenue growth, awarding Impact Points to mentors!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW TECHSHEON WORKS (5 STEPS) */}
      <section className="py-20 bg-slate-50/70 border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              5-Step Growth Engine
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">How TechSHEon Works</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A structured, low-risk ecosystem tailored specifically for micro-business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
            {[
              {
                step: '1',
                title: 'Share Challenge',
                desc: 'Post a specific business problem (e.g. repeat customer retention, slow afternoon footfall, packaging).',
                icon: Lightbulb,
                color: 'from-purple-500 to-indigo-600',
              },
              {
                step: '2',
                title: 'Get Community Ideas',
                desc: 'Advisors submit actionable, low-cost ideas. AI computes feasibility scores (94/100) & estimated costs.',
                icon: Users,
                color: 'from-indigo-500 to-purple-600',
              },
              {
                step: '3',
                title: 'Select & Implement',
                desc: 'Turn the top voted idea into a 30-day business experiment with baseline metrics & target goals.',
                icon: CheckCircle,
                color: 'from-purple-600 to-pink-600',
              },
              {
                step: '4',
                title: 'Track Monthly Results',
                desc: 'Log simple monthly revenue, expenses, and customer count with automated profit calculations.',
                icon: BarChart3,
                color: 'from-pink-600 to-rose-600',
              },
              {
                step: '5',
                title: 'Measure Real Growth',
                desc: 'AI generates verified growth reports. Mentors earn Impact Points and unlock redeemable vouchers!',
                icon: TrendingUp,
                color: 'from-rose-600 to-emerald-600',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`w-8 h-8 rounded-xl bg-gradient-to-r ${item.color} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                        {item.step}
                      </span>
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. IMPACT NUMBERS */}
      <section className="py-16 bg-white border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-900 tracking-tight">1,450+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Women Entrepreneurs Supported</p>
            </div>
            <div className="p-6 rounded-2xl bg-pink-50/50 border border-pink-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-pink-900 tracking-tight">4,800+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Business Ideas Shared</p>
            </div>
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-900 tracking-tight">1,220+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Ideas Implemented & Tested</p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-800 tracking-tight">₹2.4 Cr+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Business Growth Tracked</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUSINESS CATEGORIES SUPPORTED */}
      <section className="py-16 bg-slate-50/50 border-b border-purple-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Designed for Everyday Micro-Enterprises
            </h2>
            <p className="text-slate-600 text-sm">
              Tailored growth frameworks for women-run businesses across Indian towns and cities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
            {businessCategories.map((cat) => (
              <div
                key={cat.label}
                onClick={() => setActiveView('community-feed')}
                className="cursor-pointer bg-white hover:bg-purple-50/70 p-4 rounded-2xl border border-slate-200/80 hover:border-purple-300 transition-all flex items-center gap-3 shadow-xs"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-bold text-slate-700">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-br from-purple-950 via-purple-900 to-pink-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="flex justify-center mb-2">
            <TechSHEonIcon size="lg" className="border-cyan-400/50 shadow-xl" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to grow your business with community intelligence?
          </h2>
          <p className="text-purple-200 text-sm sm:text-base max-w-xl mx-auto">
            Join hundreds of women micro-entrepreneurs in Akola, Nagpur, Pune, and Mumbai who are testing practical ideas and proving real growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => switchUser('entrepreneur')}
              className="w-full sm:w-auto bg-white text-purple-950 hover:bg-purple-50 font-bold px-8 py-3.5 rounded-2xl shadow-lg transition text-sm"
            >
              Start as Entrepreneur
            </button>
            <button
              onClick={() => switchUser('advisor')}
              className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition text-sm"
            >
              Start as Advisor & Earn Rewards
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
