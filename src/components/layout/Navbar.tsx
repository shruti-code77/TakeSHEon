import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { TechSHEonBrand } from '../common/TechSHEonLogo';
import {
  Menu,
  X,
  Award,
  Crown,
  ChevronRight,
  LogIn,
  UserPlus,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onToggleSidebar }) => {
  const { currentUser, currentRole, activeView, setActiveView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = activeView === 'landing';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#F3E8FF] sticky top-0 sm:top-[37px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            {!isLanding && (
              <button
                id="sidebar-toggle-btn"
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-[#F5F3FF] hover:text-[#7C3AED] transition"
                aria-label="Toggle Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div id="brand-logo-container">
              <TechSHEonBrand onClick={() => setActiveView('landing')} />
            </div>
          </div>

          {/* Center Navigation for Landing or Global Shortcuts */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveView('community-feed')}
              className={`text-sm font-semibold transition ${
                activeView === 'community-feed' || activeView === 'discussion'
                  ? 'text-[#7C3AED]'
                  : 'text-gray-600 hover:text-[#7C3AED]'
              }`}
            >
              Community Challenges
            </button>
            <button
              onClick={() => setActiveView('landing')}
              className="text-sm font-medium text-gray-600 hover:text-[#7C3AED] transition"
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveView('entrepreneur-subscription')}
              className="text-sm font-medium text-gray-600 hover:text-[#7C3AED] transition flex items-center gap-1"
            >
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              Plans
            </button>
            <button
              onClick={() => setActiveView('advisor-leaderboard')}
              className="text-sm font-medium text-gray-600 hover:text-[#7C3AED] transition"
            >
              Top Advisors
            </button>
          </nav>

          {/* Right Action Center */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <NotificationDropdown />

            {/* User Profile / Dashboard Switch */}
            {currentUser && !isLanding ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#F3E8FF]">
                {currentRole === 'advisor' && (
                  <div
                    onClick={() => setActiveView('advisor-impact')}
                    className="cursor-pointer flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDF2F8] border border-[#FCE7F3] text-[#BE185D] text-xs font-bold shadow-2xs hover:bg-pink-100 transition"
                  >
                    <Award className="w-3.5 h-3.5 text-[#DB2777]" />
                    <span>{currentUser.points} Pts</span>
                  </div>
                )}

                {currentUser.isPro && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F5F3FF] text-[#7C3AED] text-[11px] font-bold border border-[#E9D5FF]">
                    <Crown className="w-3 h-3 text-amber-500" /> Pro
                  </span>
                )}

                <button
                  id="navbar-profile-btn"
                  onClick={() => {
                    if (currentRole === 'entrepreneur') setActiveView('entrepreneur-profile');
                    else if (currentRole === 'advisor') setActiveView('advisor-dashboard');
                    else setActiveView('admin-dashboard');
                  }}
                  className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-[#F5F3FF] transition text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#E9D5FF] shadow-2xs"
                  />
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-gray-800 leading-tight truncate max-w-[120px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-[#7C3AED] font-medium capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#7C3AED] px-3 py-2 rounded-xl hover:bg-[#F5F3FF] transition"
                >
                  Login
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#DB2777] hover:from-[#6D28D9] hover:to-[#BE185D] px-3.5 py-2 rounded-xl shadow-md shadow-[#7C3AED]/20 hover:shadow-lg transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Join Now</span>
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-[#F5F3FF]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F3E8FF] bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              setActiveView('community-feed');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left font-medium text-gray-700 py-2 hover:text-[#7C3AED] border-b border-gray-50 flex items-center justify-between"
          >
            <span>Community Challenges</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => {
              setActiveView('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left font-medium text-gray-700 py-2 hover:text-[#7C3AED] border-b border-gray-50 flex items-center justify-between"
          >
            <span>How TechSHEon Works</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => {
              setActiveView('advisor-leaderboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left font-medium text-gray-700 py-2 hover:text-[#7C3AED] border-b border-gray-50 flex items-center justify-between"
          >
            <span>Top Advisors Leaderboard</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => {
              setActiveView('entrepreneur-subscription');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left font-medium text-gray-700 py-2 hover:text-[#7C3AED] flex items-center justify-between"
          >
            <span>Pro Plans</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      )}
    </header>
  );
};
