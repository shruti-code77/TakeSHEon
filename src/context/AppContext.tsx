import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Business,
  Post,
  Suggestion,
  BusinessMetrics,
  Experiment,
  Reward,
  UserReward,
  ImpactPointLog,
  NotificationItem,
  LeaderboardUser,
  AIGrowthReport,
  UserRole,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_BUSINESSES,
  INITIAL_POSTS,
  INITIAL_SUGGESTIONS,
  INITIAL_EXPERIMENTS,
  INITIAL_METRICS,
  INITIAL_REWARDS,
  INITIAL_IMPACT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_LEADERBOARD,
} from '../data/initialData';

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  currentBusiness: Business | null;
  users: User[];
  businesses: Business[];
  posts: Post[];
  suggestions: Suggestion[];
  experiments: Experiment[];
  metrics: BusinessMetrics[];
  rewards: Reward[];
  userRewards: UserReward[];
  impactLogs: ImpactPointLog[];
  notifications: NotificationItem[];
  leaderboard: LeaderboardUser[];
  activeView: string;
  selectedPostId: string | null;
  latestAiReport: AIGrowthReport | null;
  isAiAnalyzing: boolean;
  isEvaluatingIdea: boolean;
  isAiChatOpen: boolean;

  // Actions
  setActiveView: (view: string) => void;
  setSelectedPostId: (id: string | null) => void;
  setIsAiChatOpen: (open: boolean) => void;
  switchUser: (role: UserRole) => void;
  loginUser: (email: string, role: UserRole) => boolean;
  signupUser: (formData: any) => void;
  logout: () => void;

  createPost: (postData: Omit<Post, 'id' | 'businessName' | 'ownerName' | 'city' | 'createdAt' | 'suggestionsCount' | 'votesCount'>) => { success: boolean; error?: string };
  addSuggestion: (postId: string, suggestionText: string, detailedPlan?: string) => Promise<void>;
  upvoteSuggestion: (suggestionId: string) => { success: boolean; error?: string };
  selectIdeaForExperiment: (suggestionId: string, customDurationDays?: number) => void;
  markExperimentImplemented: (experimentId: string) => void;
  addBusinessMetrics: (newMetrics: Omit<BusinessMetrics, 'id' | 'profit'>) => Promise<AIGrowthReport | null>;
  runAiGrowthAnalysis: () => Promise<AIGrowthReport | null>;
  redeemReward: (rewardId: string) => { success: boolean; error?: string; voucherCode?: string };
  updateBusinessProfile: (updates: Partial<Business>) => void;
  toggleBusinessVerified: (businessId: string) => void;
  toggleProSubscription: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or initialData
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('techsheon_users') || localStorage.getItem('shegrow_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem('techsheon_current_user_id') || localStorage.getItem('shegrow_current_user_id');
    return saved || 'user-priya';
  });

  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem('techsheon_businesses') || localStorage.getItem('shegrow_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('techsheon_posts') || localStorage.getItem('shegrow_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [suggestions, setSuggestions] = useState<Suggestion[]>(() => {
    const saved = localStorage.getItem('techsheon_suggestions') || localStorage.getItem('shegrow_suggestions');
    return saved ? JSON.parse(saved) : INITIAL_SUGGESTIONS;
  });

  const [experiments, setExperiments] = useState<Experiment[]>(() => {
    const saved = localStorage.getItem('techsheon_experiments') || localStorage.getItem('shegrow_experiments');
    return saved ? JSON.parse(saved) : INITIAL_EXPERIMENTS;
  });

  const [metrics, setMetrics] = useState<BusinessMetrics[]>(() => {
    const saved = localStorage.getItem('techsheon_metrics') || localStorage.getItem('shegrow_metrics');
    return saved ? JSON.parse(saved) : INITIAL_METRICS;
  });

  const [rewards] = useState<Reward[]>(INITIAL_REWARDS);

  const [userRewards, setUserRewards] = useState<UserReward[]>(() => {
    const saved = localStorage.getItem('techsheon_user_rewards') || localStorage.getItem('shegrow_user_rewards');
    return saved ? JSON.parse(saved) : [];
  });

  const [impactLogs, setImpactLogs] = useState<ImpactPointLog[]>(() => {
    const saved = localStorage.getItem('techsheon_impact_logs') || localStorage.getItem('shegrow_impact_logs');
    return saved ? JSON.parse(saved) : INITIAL_IMPACT_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('techsheon_notifications') || localStorage.getItem('shegrow_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(() => {
    const saved = localStorage.getItem('techsheon_leaderboard') || localStorage.getItem('shegrow_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  const [activeView, setActiveView] = useState<string>('landing');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [latestAiReport, setLatestAiReport] = useState<AIGrowthReport | null>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [isEvaluatingIdea, setIsEvaluatingIdea] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('techsheon_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('techsheon_current_user_id', currentUserId);
  }, [currentUserId]);
  useEffect(() => {
    localStorage.setItem('techsheon_businesses', JSON.stringify(businesses));
  }, [businesses]);
  useEffect(() => {
    localStorage.setItem('techsheon_posts', JSON.stringify(posts));
  }, [posts]);
  useEffect(() => {
    localStorage.setItem('techsheon_suggestions', JSON.stringify(suggestions));
  }, [suggestions]);
  useEffect(() => {
    localStorage.setItem('techsheon_experiments', JSON.stringify(experiments));
  }, [experiments]);
  useEffect(() => {
    localStorage.setItem('techsheon_metrics', JSON.stringify(metrics));
  }, [metrics]);
  useEffect(() => {
    localStorage.setItem('techsheon_user_rewards', JSON.stringify(userRewards));
  }, [userRewards]);
  useEffect(() => {
    localStorage.setItem('techsheon_impact_logs', JSON.stringify(impactLogs));
  }, [impactLogs]);
  useEffect(() => {
    localStorage.setItem('techsheon_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const currentUser = users.find((u) => u.id === currentUserId) || users[0];
  const currentRole = currentUser.role;
  const currentBusiness = businesses.find((b) => b.ownerId === currentUser.id || b.id === currentUser.businessId) || businesses[0];

  // Helper to add impact points
  const addImpactPoints = (userId: string, points: number, activity: string, relatedBusiness?: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, points: (u.points || 0) + points } : u))
    );
    setLeaderboard((prev) =>
      prev.map((l) => (l.id === userId ? { ...l, points: l.points + points } : l))
    );
    const newLog: ImpactPointLog = {
      id: `log-${Date.now()}`,
      userId,
      activity,
      points,
      timestamp: 'Just now',
      relatedBusiness: relatedBusiness || "Priya's Boutique",
    };
    setImpactLogs((prev) => [newLog, ...prev]);

    // Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId,
      title: `+${points} Impact Points Earned! ⭐`,
      message: `${activity} (${relatedBusiness || 'TechSHEon Community'})`,
      time: 'Just now',
      read: false,
      type: 'points',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Switch demo user
  const switchUser = (role: UserRole) => {
    let target = users.find((u) => u.role === role);
    if (!target) {
      if (role === 'entrepreneur') target = users[0];
      else if (role === 'advisor') target = users[1];
      else target = users[3] || users[0];
    }
    setCurrentUserId(target.id);
    if (role === 'entrepreneur') setActiveView('entrepreneur-dashboard');
    else if (role === 'advisor') setActiveView('advisor-dashboard');
    else if (role === 'admin') setActiveView('admin-dashboard');
  };

  const loginUser = (email: string, role: UserRole): boolean => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (found) {
      setCurrentUserId(found.id);
      if (found.role === 'entrepreneur') setActiveView('entrepreneur-dashboard');
      else if (found.role === 'advisor') setActiveView('advisor-dashboard');
      else setActiveView('admin-dashboard');
      return true;
    }
    // Create new temporary user if not found
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      points: role === 'advisor' ? 50 : 20,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: 'Today',
      isPro: false,
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    if (role === 'entrepreneur') setActiveView('entrepreneur-dashboard');
    else if (role === 'advisor') setActiveView('advisor-dashboard');
    else setActiveView('admin-dashboard');
    return true;
  };

  const signupUser = (formData: any) => {
    const newUserId = `user-${Date.now()}`;
    const newBizId = formData.role === 'entrepreneur' ? `biz-${Date.now()}` : undefined;

    const newUser: User = {
      id: newUserId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      points: formData.role === 'advisor' ? 20 : 10,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      createdAt: 'Today',
      businessId: newBizId,
      areasOfInterest: formData.areasOfInterest ? [formData.areasOfInterest] : [],
      isPro: false,
    };

    if (formData.role === 'entrepreneur') {
      const newBiz: Business = {
        id: newBizId!,
        ownerId: newUserId,
        ownerName: formData.name,
        businessName: formData.businessName || `${formData.name}'s Studio`,
        category: formData.category || 'Clothing',
        city: formData.city || 'Akola',
        businessAge: 'New Business',
        description: formData.description || 'Passionate small business owner delivering authentic products.',
        verified: true,
        averageCustomers: 80,
        monthlyRevenue: 35000,
        monthlyExpenses: 22000,
        monthlyProfit: 13000,
        imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
      };
      setBusinesses((prev) => [newBiz, ...prev]);
    }

    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUserId);
    if (formData.role === 'entrepreneur') setActiveView('entrepreneur-dashboard');
    else setActiveView('advisor-dashboard');
  };

  const logout = () => {
    setActiveView('landing');
  };

  // Create post
  const createPost = (postData: Omit<Post, 'id' | 'businessName' | 'ownerName' | 'city' | 'createdAt' | 'suggestionsCount' | 'votesCount'>) => {
    // Check post limit (Basic Premium: 2 posts for 1 month for new users, Accelerated Growth: 5 posts)
    const userPosts = posts.filter((p) => p.businessId === currentBusiness?.id);
    const limit = currentUser.isPro ? 5 : 2;
    if (userPosts.length >= limit) {
      return {
        success: false,
        error: `Post limit reached (${limit}/${limit}). Upgrade to Accelerated Growth (₹999/mo) for 5 community posts!`,
      };
    }

    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      businessId: currentBusiness?.id || 'biz-priya',
      businessName: currentBusiness?.businessName || "Priya's Boutique",
      ownerName: currentBusiness?.ownerName || 'Priya Sharma',
      city: currentBusiness?.city || 'Akola',
      createdAt: 'Just now',
      suggestionsCount: 0,
      votesCount: 0,
      imageUrl: postData.imageUrl || currentBusiness?.imageUrl || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
    };

    setPosts((prev) => [newPost, ...prev]);
    return { success: true };
  };

  // Add suggestion with AI Evaluation & +5 Points
  const addSuggestion = async (postId: string, suggestionText: string, detailedPlan?: string) => {
    setIsEvaluatingIdea(true);
    const targetPost = posts.find((p) => p.id === postId);

    let evaluation = {
      aiScore: 91,
      feasibility: 'High' as const,
      estimatedCost: 'Free / Low' as const,
      potentialImpact: 'High' as const,
      implementationDifficulty: 'Easy' as const,
      explanation: 'This solution directly incentivizes repeat purchases and builds organic loyalty at minimal operational cost.',
      actionStep: 'Draft a quick promotional template and test it with 10 walk-in customers.',
    };

    try {
      const response = await fetch('/api/gemini/evaluate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: targetPost?.businessName,
          category: targetPost?.category,
          problemTitle: targetPost?.title,
          problemDescription: targetPost?.description,
          suggestion: suggestionText,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        evaluation = {
          aiScore: data.aiScore || 91,
          feasibility: data.feasibility || 'High',
          estimatedCost: data.estimatedCost || 'Low',
          potentialImpact: data.potentialImpact || 'High',
          implementationDifficulty: data.implementationDifficulty || 'Easy',
          explanation: data.explanation || evaluation.explanation,
          actionStep: data.actionStep || evaluation.actionStep,
        };
      }
    } catch (e) {
      console.warn('AI evaluation error, using fallback:', e);
    } finally {
      setIsEvaluatingIdea(false);
    }

    const newSug: Suggestion = {
      id: `sug-${Date.now()}`,
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role === 'advisor' ? 'Business Advisor' : 'Community Member',
      userBadge: currentUser.points > 300 ? '🏆 Impact Champion' : '💡 Idea Contributor',
      suggestion: suggestionText,
      detailedPlan: detailedPlan || suggestionText,
      votes: 1,
      votedUserIds: [currentUser.id],
      aiScore: evaluation.aiScore,
      aiFeasibility: evaluation.feasibility,
      aiEstimatedCost: evaluation.estimatedCost,
      aiPotentialImpact: evaluation.potentialImpact,
      aiDifficulty: evaluation.implementationDifficulty,
      aiExplanation: evaluation.explanation,
      aiActionStep: evaluation.actionStep,
      status: 'pending',
      createdAt: 'Just now',
      isAiRecommended: evaluation.aiScore >= 90,
    };

    setSuggestions((prev) => [newSug, ...prev]);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, suggestionsCount: p.suggestionsCount + 1 } : p))
    );

    // Award +5 Impact points
    addImpactPoints(currentUser.id, 5, 'Suggestion posted on business challenge', targetPost?.businessName);

    // Notify entrepreneur
    if (targetPost) {
      const biz = businesses.find((b) => b.id === targetPost.businessId);
      if (biz) {
        setNotifications((prev) => [
          {
            id: `notif-${Date.now()}-sug`,
            userId: biz.ownerId,
            title: 'New Idea Received! 💡',
            message: `${currentUser.name} suggested a solution for: "${targetPost.title.slice(0, 45)}..."`,
            time: 'Just now',
            read: false,
            type: 'suggestion',
          },
          ...prev,
        ]);
      }
    }
  };

  // Upvote suggestion
  const upvoteSuggestion = (suggestionId: string) => {
    const sug = suggestions.find((s) => s.id === suggestionId);
    if (!sug) return { success: false, error: 'Suggestion not found' };

    if (sug.userId === currentUser.id) {
      return { success: false, error: 'You cannot vote on your own suggestion.' };
    }
    if (sug.votedUserIds.includes(currentUser.id)) {
      return { success: false, error: 'You have already voted on this suggestion.' };
    }

    setSuggestions((prev) =>
      prev.map((s) =>
        s.id === suggestionId
          ? { ...s, votes: s.votes + 1, votedUserIds: [...s.votedUserIds, currentUser.id] }
          : s
      )
    );
    return { success: true };
  };

  // Select idea & create business experiment (+10 Points to advisor)
  const selectIdeaForExperiment = (suggestionId: string, customDurationDays = 30) => {
    const sug = suggestions.find((s) => s.id === suggestionId);
    if (!sug) return;
    const post = posts.find((p) => p.id === sug.postId);
    const biz = currentBusiness || businesses[0];

    // Update suggestion status
    setSuggestions((prev) =>
      prev.map((s) => (s.id === suggestionId ? { ...s, status: 'selected' } : s))
    );

    // Update post selected idea
    if (post) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, selectedSuggestionId: suggestionId } : p))
      );
    }

    // Create Experiment
    const newExp: Experiment = {
      id: `exp-${Date.now()}`,
      businessId: biz.id,
      businessName: biz.businessName,
      suggestionId: sug.id,
      suggestionTitle: sug.suggestion,
      advisorName: sug.userName,
      advisorId: sug.userId,
      startDate: new Date().toISOString().split('T')[0],
      durationDays: customDurationDays,
      baselineCustomers: biz.averageCustomers || 100,
      targetCustomers: Math.round((biz.averageCustomers || 100) * 1.2),
      currentCustomers: biz.averageCustomers || 100,
      baselineRevenue: biz.monthlyRevenue || 50000,
      targetRevenue: Math.round((biz.monthlyRevenue || 50000) * 1.2),
      currentRevenue: biz.monthlyRevenue || 50000,
      status: 'In Progress',
      impactResult: 'Pending',
      notes: `Experiment initiated from community idea by ${sug.userName}. Target +20% growth over ${customDurationDays} days.`,
    };

    setExperiments((prev) => [newExp, ...prev]);

    // Award +10 Impact Points to advisor
    addImpactPoints(sug.userId, 10, 'Idea selected by entrepreneur for business experiment', biz.businessName);

    // Notify advisor
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}-selected`,
        userId: sug.userId,
        title: 'Your Idea Was Selected! 🎯',
        message: `${biz.businessName} chose your suggestion for a ${customDurationDays}-day business experiment! (+10 Impact Points)`,
        time: 'Just now',
        read: false,
        type: 'selected',
      },
      ...prev,
    ]);

    setActiveView('entrepreneur-experiments');
  };

  // Mark experiment implemented (+20 Points to advisor)
  const markExperimentImplemented = (experimentId: string) => {
    const exp = experiments.find((e) => e.id === experimentId);
    if (!exp) return;

    setExperiments((prev) =>
      prev.map((e) => (e.id === experimentId ? { ...e, status: 'In Progress' } : e))
    );
    setSuggestions((prev) =>
      prev.map((s) => (s.id === exp.suggestionId ? { ...s, status: 'implemented' } : s))
    );

    // Award +20 Impact points
    addImpactPoints(exp.advisorId, 20, 'Idea fully implemented into active business operations', exp.businessName);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}-impl`,
        userId: exp.advisorId,
        title: 'Idea Implemented! 🚀',
        message: `${exp.businessName} started active execution of your experiment! (+20 Impact Points)`,
        time: 'Just now',
        read: false,
        type: 'experiment',
      },
      ...prev,
    ]);
  };

  // Add monthly business data & Trigger AI Analysis (+50 Points to advisor if verified growth)
  const addBusinessMetrics = async (newMetricsData: Omit<BusinessMetrics, 'id' | 'profit'>): Promise<AIGrowthReport | null> => {
    const profit = Math.max(0, newMetricsData.revenue - newMetricsData.expenses);
    const newMetric: BusinessMetrics = {
      ...newMetricsData,
      id: `met-${Date.now()}`,
      profit,
    };

    setMetrics((prev) => [...prev, newMetric]);

    // Update business profile stats
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === newMetricsData.businessId
          ? {
              ...b,
              monthlyRevenue: newMetricsData.revenue,
              monthlyExpenses: newMetricsData.expenses,
              monthlyProfit: profit,
              averageCustomers: newMetricsData.customers,
            }
          : b
      )
    );

    // Run AI Growth Report
    const report = await runAiGrowthAnalysisWithData(newMetric);

    // If active experiment exists and profit/revenue grew, mark experiment as Positive and award +50 points!
    const activeExp = experiments.find((e) => e.businessId === newMetricsData.businessId && e.status === 'In Progress');
    if (activeExp && report && report.revenueGrowth > 5) {
      setExperiments((prev) =>
        prev.map((e) =>
          e.id === activeExp.id
            ? {
                ...e,
                status: 'Completed',
                impactResult: 'Positive',
                customerGrowthPct: report.customerGrowth,
                revenueGrowthPct: report.revenueGrowth,
                profitGrowthPct: report.profitGrowth,
                currentCustomers: newMetricsData.customers,
                currentRevenue: newMetricsData.revenue,
              }
            : e
        )
      );

      // Award +50 Impact Points to Advisor for successful result
      addImpactPoints(
        activeExp.advisorId,
        50,
        `Suggestion verified with +${report.revenueGrowth}% revenue and +${report.profitGrowth}% profit growth!`,
        activeExp.businessName
      );

      // Confetti celebrate!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // silent
      }
    }

    return report;
  };

  const runAiGrowthAnalysisWithData = async (currentMetricItem?: BusinessMetrics): Promise<AIGrowthReport | null> => {
    setIsAiAnalyzing(true);
    const biz = currentBusiness || businesses[0];
    const bizMetrics = metrics.filter((m) => m.businessId === biz.id);

    const curr = currentMetricItem || bizMetrics[bizMetrics.length - 1] || {
      revenue: 67000,
      expenses: 40000,
      customers: 135,
      newCustomers: 50,
      repeatCustomers: 85,
    };
    const prev = bizMetrics[bizMetrics.length - (currentMetricItem ? 1 : 2)] || {
      revenue: 50000,
      expenses: 32000,
      customers: 100,
      newCustomers: 25,
      repeatCustomers: 75,
    };

    let resultReport: AIGrowthReport | null = null;

    try {
      const response = await fetch('/api/gemini/analyze-growth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: biz.businessName,
          category: biz.category,
          currentMetrics: curr,
          previousMetrics: prev,
          activeExperiments: experiments.filter((e) => e.businessId === biz.id).map((e) => e.suggestionTitle),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        resultReport = {
          generatedAt: 'Just now',
          revenueGrowth: data.revenueGrowth ?? 34,
          customerGrowth: data.customerGrowth ?? 35,
          profitGrowth: data.profitGrowth ?? 50,
          summary: data.summary || 'Your revenue and customer volume increased substantially this cycle. The implemented customer referral strategy indicates strong product-market fit and high community advocacy.',
          keyHighlights: data.keyHighlights || [
            'Net profit surged by +50% from ₹18,000 to ₹27,000',
            '35 new customers acquired with minimal promotional cost',
            'Repeat buyer percentage improved to 63%',
          ],
          recommendations: data.recommendations || [
            'Continue the referral program for another 30-day cycle',
            'Introduce a 5-purchase physical stamp loyalty card',
            'Create 2 weekly behind-the-scenes Instagram Reels',
            'Offer VIP preview discounts to your top 10 repeat customers',
          ],
          experimentVerdict: data.experimentVerdict || 'Positive Impact',
          learningNote: data.learningNote || 'Peer referral rewards produce the highest return on investment for neighbourhood boutiques.',
        };
      }
    } catch (e) {
      console.warn('AI analysis error, using fallback report:', e);
    } finally {
      setIsAiAnalyzing(false);
    }

    if (!resultReport) {
      const revGrowth = Math.round(((curr.revenue - prev.revenue) / prev.revenue) * 100);
      const custGrowth = Math.round(((curr.customers - prev.customers) / prev.customers) * 100);
      const prevProf = prev.revenue - prev.expenses;
      const currProf = curr.revenue - curr.expenses;
      const profGrowth = prevProf > 0 ? Math.round(((currProf - prevProf) / prevProf) * 100) : 50;

      resultReport = {
        generatedAt: 'Just now',
        revenueGrowth: revGrowth || 34,
        customerGrowth: custGrowth || 35,
        profitGrowth: profGrowth || 50,
        summary: `Your revenue and customer count increased significantly this month (+${revGrowth || 34}% revenue, +${custGrowth || 35}% customers). The referral strategy generated strong organic footfall. Continue monitoring repeat retention for another month.`,
        keyHighlights: [
          `Net profit grew +${profGrowth || 50}% from ₹${prevProf.toLocaleString('en-IN')} to ₹${currProf.toLocaleString('en-IN')}`,
          `Acquired ${(curr as any).newCustomers || 35} new customers this reporting cycle`,
          `Maintained healthy 40% operating margin`,
        ],
        recommendations: [
          'Continue the referral program for another 30-day validation cycle',
          'Introduce a physical loyalty card (stamp after every 5 visits/orders)',
          'Post 2 weekly behind-the-scenes Instagram Reels highlighting top creations',
          'Test a weekend special bundle or VIP discount for top 10 repeat customers',
        ],
        experimentVerdict: 'Positive Impact',
        learningNote: 'Low-friction peer referral rewards produce the highest return on investment for neighbourhood boutiques and local studios.',
      };
    }

    setLatestAiReport(resultReport);
    return resultReport;
  };

  const runAiGrowthAnalysis = async () => {
    return runAiGrowthAnalysisWithData();
  };

  // Redeem reward
  const redeemReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return { success: false, error: 'Reward not found' };

    if (currentUser.points < reward.pointsRequired) {
      return {
        success: false,
        error: `You need ${reward.pointsRequired - currentUser.points} more Impact Points to unlock this reward.`,
      };
    }

    const voucherCode = `SG-${reward.category.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRedemption: UserReward = {
      id: `ur-${Date.now()}`,
      userId: currentUser.id,
      rewardId: reward.id,
      rewardName: reward.name,
      partner: reward.partner,
      redeemedAt: new Date().toLocaleDateString('en-IN'),
      voucherCode,
      status: 'active',
    };

    setUserRewards((prev) => [newRedemption, ...prev]);

    // Confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // silent
    }

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}-rew`,
        userId: currentUser.id,
        title: '🎉 Reward Unlocked & Claimed!',
        message: `Your voucher for ${reward.name} is ready: Code ${voucherCode}`,
        time: 'Just now',
        read: false,
        type: 'reward',
      },
      ...prev,
    ]);

    return { success: true, voucherCode };
  };

  // Update business profile
  const updateBusinessProfile = (updates: Partial<Business>) => {
    if (!currentBusiness) return;
    setBusinesses((prev) =>
      prev.map((b) => (b.id === currentBusiness.id ? { ...b, ...updates } : b))
    );
  };

  // Admin: Toggle business verification
  const toggleBusinessVerified = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === businessId ? { ...b, verified: !b.verified } : b))
    );
  };

  // Toggle pro subscription
  const toggleProSubscription = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, isPro: !u.isPro } : u))
    );
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch (e) {}
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetDemoData = () => {
    setUsers(INITIAL_USERS);
    setBusinesses(INITIAL_BUSINESSES);
    setPosts(INITIAL_POSTS);
    setSuggestions(INITIAL_SUGGESTIONS);
    setExperiments(INITIAL_EXPERIMENTS);
    setMetrics(INITIAL_METRICS);
    setUserRewards([]);
    setImpactLogs(INITIAL_IMPACT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setLeaderboard(INITIAL_LEADERBOARD);
    setCurrentUserId('user-priya');
    setActiveView('entrepreneur-dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentBusiness,
        users,
        businesses,
        posts,
        suggestions,
        experiments,
        metrics,
        rewards,
        userRewards,
        impactLogs,
        notifications,
        leaderboard,
        activeView,
        selectedPostId,
        latestAiReport,
        isAiAnalyzing,
        isEvaluatingIdea,
        isAiChatOpen,
        setActiveView,
        setSelectedPostId,
        setIsAiChatOpen,
        switchUser,
        loginUser,
        signupUser,
        logout,
        createPost,
        addSuggestion,
        upvoteSuggestion,
        selectIdeaForExperiment,
        markExperimentImplemented,
        addBusinessMetrics,
        runAiGrowthAnalysis,
        redeemReward,
        updateBusinessProfile,
        toggleBusinessVerified,
        toggleProSubscription,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
