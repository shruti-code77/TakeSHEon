import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { JudgeDemoBar } from './components/layout/JudgeDemoBar';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { EntrepreneurDashboard } from './components/entrepreneur/EntrepreneurDashboard';
import { MyBusinessProfile } from './components/entrepreneur/MyBusinessProfile';
import { ExperimentsView } from './components/entrepreneur/ExperimentsView';
import { MonthlyReportView } from './components/entrepreneur/MonthlyReportView';
import { AnalyticsView } from './components/entrepreneur/AnalyticsView';
import { AIInsightsView } from './components/entrepreneur/AIInsightsView';
import { SubscriptionView } from './components/entrepreneur/SubscriptionView';
import { CommunityFeed } from './components/community/CommunityFeed';
import { DiscussionView } from './components/community/DiscussionView';
import { AdvisorDashboard } from './components/advisor/AdvisorDashboard';
import { ImpactPointsView } from './components/advisor/ImpactPointsView';
import { LeaderboardView } from './components/advisor/LeaderboardView';
import { RewardsView } from './components/rewards/RewardsView';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
    role?: 'entrepreneur' | 'advisor';
  }>({
    isOpen: false,
    mode: 'login',
  });

  const isLanding = activeView === 'landing';

  const renderMainContent = () => {
    switch (activeView) {
      case 'landing':
        return (
          <LandingPage
            onOpenAuth={(mode, role) =>
              setAuthModalState({ isOpen: true, mode, role })
            }
          />
        );

      // Entrepreneur Views
      case 'entrepreneur-dashboard':
        return <EntrepreneurDashboard />;
      case 'entrepreneur-profile':
        return <MyBusinessProfile />;
      case 'entrepreneur-my-posts':
      case 'community-feed':
        return <CommunityFeed />;
      case 'discussion':
      case 'entrepreneur-ideas':
        return <DiscussionView />;
      case 'entrepreneur-experiments':
        return <ExperimentsView />;
      case 'entrepreneur-monthly-report':
        return <MonthlyReportView />;
      case 'entrepreneur-analytics':
        return <AnalyticsView />;
      case 'entrepreneur-ai-insights':
        return <AIInsightsView />;
      case 'entrepreneur-subscription':
        return <SubscriptionView />;

      // Advisor Views
      case 'advisor-dashboard':
      case 'advisor-suggestions':
        return <AdvisorDashboard />;
      case 'advisor-impact':
        return <ImpactPointsView />;
      case 'advisor-leaderboard':
        return <LeaderboardView />;
      case 'advisor-rewards':
        return <RewardsView />;

      // Admin Views
      case 'admin-dashboard':
      case 'admin-businesses':
        return <AdminDashboard />;

      default:
        return <EntrepreneurDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-[#1F2937] font-sans flex flex-col selection:bg-[#F5F3FF] selection:text-[#7C3AED]">
      {/* Hackathon Top Bar for Judges */}
      <JudgeDemoBar />

      {/* Main App Navigation */}
      <Navbar
        onOpenAuth={(mode) => setAuthModalState({ isOpen: true, mode })}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      {isLanding ? (
        <main className="flex-1">{renderMainContent()}</main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Role Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Dashboard Canvas */}
          <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 min-w-0 bg-[#F9FAFB]/60">
            <div className="max-w-6xl mx-auto">{renderMainContent()}</div>
          </main>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'login' })}
        initialMode={authModalState.mode}
        initialRole={authModalState.role}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

