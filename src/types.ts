export type UserRole = 'entrepreneur' | 'advisor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  points: number;
  avatar?: string;
  areasOfInterest?: string[];
  createdAt: string;
  businessId?: string;
  isPro?: boolean;
}

export interface Business {
  id: string;
  ownerId: string;
  businessName: string;
  ownerName: string;
  category: string;
  city: string;
  businessAge: string;
  description: string;
  verified: boolean;
  averageCustomers: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  imageUrl?: string;
}

export interface Post {
  id: string;
  businessId: string;
  businessName: string;
  ownerName: string;
  city: string;
  category: string;
  title: string;
  description: string;
  currentCustomers: number;
  currentRevenue: number;
  mainChallenge: string;
  imageUrl?: string;
  createdAt: string;
  suggestionsCount: number;
  votesCount: number;
  selectedSuggestionId?: string;
}

export interface Suggestion {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userRole?: string;
  userBadge?: string;
  suggestion: string;
  detailedPlan?: string;
  votes: number;
  votedUserIds: string[];
  aiScore: number;
  aiFeasibility: 'High' | 'Medium' | 'Low';
  aiEstimatedCost: 'Free / Low' | 'Low' | 'Medium' | 'High';
  aiPotentialImpact: 'High' | 'Moderate' | 'Low';
  aiDifficulty: 'Easy' | 'Moderate' | 'Challenging';
  aiExplanation: string;
  aiActionStep?: string;
  status: 'pending' | 'selected' | 'implemented' | 'evaluated';
  createdAt: string;
  isAiRecommended?: boolean;
}

export interface BusinessMetrics {
  id: string;
  businessId: string;
  month: string; // e.g. "May 2026", "Jun 2026", "Jul 2026"
  revenue: number;
  expenses: number;
  profit: number;
  customers: number;
  orders: number;
  newCustomers: number;
  repeatCustomers: number;
  notes?: string;
  associatedExperimentId?: string;
}

export interface Experiment {
  id: string;
  businessId: string;
  businessName: string;
  suggestionId: string;
  suggestionTitle: string;
  advisorName: string;
  advisorId: string;
  startDate: string;
  durationDays: number;
  baselineCustomers: number;
  targetCustomers: number;
  currentCustomers?: number;
  baselineRevenue: number;
  targetRevenue: number;
  currentRevenue?: number;
  status: 'In Progress' | 'Completed' | 'Paused';
  impactResult?: 'Positive' | 'Low Impact' | 'Pending';
  customerGrowthPct?: number;
  revenueGrowthPct?: number;
  profitGrowthPct?: number;
  costIncurred?: number;
  notes?: string;
}

export interface ImpactPointLog {
  id: string;
  userId: string;
  activity: string;
  points: number;
  timestamp: string;
  relatedBusiness?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  suggestionsCount: number;
  selectedCount: number;
  badge: string;
  avatar: string;
  tier: string;
}

export interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  description: string;
  partner: string;
  category: 'Voucher' | 'Masterclass' | 'Grant' | 'Tools';
  code?: string;
}

export interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  rewardName: string;
  partner: string;
  redeemedAt: string;
  voucherCode: string;
  status: 'active' | 'used';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'suggestion' | 'selected' | 'experiment' | 'points' | 'reward';
}

export interface AIGrowthReport {
  generatedAt: string;
  revenueGrowth: number;
  customerGrowth: number;
  profitGrowth: number;
  summary: string;
  keyHighlights: string[];
  recommendations: string[];
  experimentVerdict: string;
  learningNote: string;
}
