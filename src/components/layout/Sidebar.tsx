import React from 'react';
import { useApp } from '../../context/AppContext';
import { TechSHEonIcon } from '../common/TechSHEonLogo';
import {
  LayoutDashboard,
  Store,
  Users2,
  FileQuestion,
  Lightbulb,
  FlaskConical,
  LineChart,
  BrainCircuit,
  Gift,
  UserCheck2,
  LogOut,
  Compass,
  Trophy,
  Award,
  Crown,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  count?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentRole, activeView, setActiveView, logout, currentBusiness, currentUser } = useApp();

  const entrepreneurNav: NavItem[] = [
    { id: 'entrepreneur-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'entrepreneur-profile', label: 'My Business', icon: Store, badge: currentBusiness?.verified ? 'Verified' : undefined },
    { id: 'community-feed', label: 'Community', icon: Users2 },
    { id: 'entrepreneur-my-posts', label: 'My Posts', icon: FileQuestion },
    { id: 'entrepreneur-ideas', label: 'Ideas Received', icon: Lightbulb },
    { id: 'entrepreneur-experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'entrepreneur-monthly-report', label: 'Monthly Report', icon: CheckCircle2 },
    { id: 'entrepreneur-analytics', label: 'Business Analytics', icon: LineChart },
    { id: 'entrepreneur-ai-insights', label: 'AI Insights', icon: BrainCircuit, highlight: true },
    { id: 'entrepreneur-subscription', label: 'Pro Upgrade', icon: Crown },
    { id: 'advisor-rewards', label: 'Rewards', icon: Gift },
  ];

  const advisorNav: NavItem[] = [
    { id: 'advisor-dashboard', label: 'Advisor Home', icon: LayoutDashboard },
    { id: 'community-feed', label: 'Explore Challenges', icon: Compass },
    { id: 'advisor-suggestions', label: 'My Suggestions', icon: Lightbulb },
    { id: 'advisor-impact', label: 'Impact Points', icon: Award, count: `${currentUser.points} Pts` },
    { id: 'advisor-leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'advisor-rewards', label: 'Rewards', icon: Gift },
  ];

  const adminNav: NavItem[] = [
    { id: 'admin-dashboard', label: 'Admin Overview', icon: ShieldCheck },
    { id: 'admin-businesses', label: 'Businesses Verification', icon: Building2 },
    { id: 'community-feed', label: 'All Community Posts', icon: Users2 },
    { id: 'advisor-rewards', label: 'Rewards Management', icon: Gift },
  ];

  const currentNav =
    currentRole === 'entrepreneur'
      ? entrepreneurNav
      : currentRole === 'advisor'
      ? advisorNav
      : adminNav;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed top-16 sm:top-[98px] bottom-0 left-0 w-64 bg-white border-r border-[#F3E8FF] flex flex-col justify-between p-4 z-40 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Active Business / Role Mini Card */}
          {currentRole === 'entrepreneur' && currentBusiness ? (
            <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7C3AED]">
                  Active Business
                </span>
                {currentBusiness.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-lg border border-emerald-200">
                    ✓ Verified
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-[#1F2937] truncate">
                {currentBusiness.businessName}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                📍 {currentBusiness.city} • {currentBusiness.category}
              </p>
            </div>
          ) : currentRole === 'advisor' ? (
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#C026D3] rounded-2xl p-5 text-white shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-pink-100">Impact Points</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">Top 5%</span>
              </div>
              <div className="text-2xl font-bold">{currentUser.points} / 100</div>
              <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentUser.points / 100) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-pink-100 pt-0.5">
                {100 - currentUser.points} pts until next reward tier
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#E9D5FF] flex items-center gap-3">
              <TechSHEonIcon size="sm" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7C3AED]">
                  Platform Admin
                </span>
                <h4 className="text-sm font-bold text-[#1F2937]">TechSHEon Operations</h4>
                <p className="text-xs text-gray-500">Supervisory Dashboard</p>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-link-${item.id}`}
                  onClick={() => {
                    setActiveView(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#F5F3FF] text-[#7C3AED] shadow-2xs'
                      : 'text-gray-600 hover:text-[#7C3AED] hover:bg-[#F5F3FF]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#7C3AED]' : item.highlight ? 'text-[#DB2777]' : 'text-gray-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${
                        isActive ? 'bg-[#7C3AED] text-white' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-[#7C3AED] text-white' : 'bg-[#FDF2F8] text-[#BE185D] border border-[#FCE7F3]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#DB2777] animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[#F3E8FF] space-y-1.5">
          <button
            onClick={() => {
              setActiveView('landing');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-gray-500 hover:text-[#7C3AED] hover:bg-[#F5F3FF] rounded-xl transition"
          >
            <Compass className="w-4 h-4" />
            <span>Landing Page</span>
          </button>
          <button
            id="sidebar-logout-btn"
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout / Exit</span>
          </button>
        </div>
      </aside>
    </>
  );
};
