export type ScreenRoute =
  | 'splash'
  | 'login'
  | 'register'
  | 'onboarding-age'
  | 'onboarding-need'
  | 'onboarding-interests'
  | 'home'
  | 'find-buddy'
  | 'buddy-profile'
  | 'booking'
  | 'payment-method'
  | 'payment-bank'
  | 'payment-qris'
  | 'payment-success'
  | 'my-sessions'
  | 'chat-room'
  | 'study-room'
  | 'community'
  | 'profile'
  | 'professional-help';

export type ServiceType = 'Story' | 'Chat' | 'Study';

export type PaymentMethodType = 'ewallet' | 'bank' | 'qris';

export type EwalletProvider = 'GoPay' | 'OVO' | 'DANA' | 'ShopeePay';

export type MascotVariant = 'blue' | 'mint';

export interface BuddyReview {
  id: string;
  author: string;
  age?: number;
  service: ServiceType;
  rating: number;
  tags: string[];
  comment: string;
  date: string;
}

export interface ServicePricing {
  durationMinutes: number;
  label: string;
  price: number;
}

export interface Buddy {
  id: string;
  name: string;
  age: number;
  language: string;
  verified: boolean;
  mascot: MascotVariant;
  tagline: string;
  bio: string[];
  rating: number;
  reviewCount: number;
  sessionCount: number;
  interests: string[];
  services: ServiceType[];
  availableToday: boolean;
  pricing: Record<ServiceType, ServicePricing[]>;
  reviews: BuddyReview[];
}

export interface ChatMessage {
  id: string;
  sender: 'buddy' | 'user';
  text: string;
  time: string;
  status?: 'Terkirim' | 'Dibaca';
}

export interface SessionReview {
  rating: number;
  tags: string[];
  comment: string;
  anonymous: boolean;
  submittedAt: string;
}

export interface Session {
  id: string;
  orderId: string;
  buddyId: string;
  buddyName: string;
  buddyMascot: MascotVariant;
  service: ServiceType;
  durationMinutes: number;
  durationLabel: string;
  dateLabel: string;
  timeRange: string;
  price: number;
  paymentMethodLabel: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  remainingSeconds: number;
  messages: ChatMessage[];
  review?: SessionReview;
}

export interface CommunityReply {
  id: string;
  author: string;
  mascot: MascotVariant;
  timeAgo: string;
  text: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  mascot: MascotVariant;
  timeAgo: string;
  isAnonymous: boolean;
  tag: string;
  content: string;
  hugCount: number;
  spiritCount: number;
  relateCount: number;
  userReactedHug?: boolean;
  userReactedSpirit?: boolean;
  userReactedRelate?: boolean;
  saved?: boolean;
  replies: CommunityReply[];
}

export interface UserProfile {
  nickname: string;
  email: string;
  birthDate: string; // YYYY-MM-DD
  joinedLabel: string;
  mascot: MascotVariant;
  preferredNeed: ServiceType;
  interests: string[];
  notificationsEnabled: boolean;
  parentalConsentGiven: boolean;
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
}

export interface BookingDraft {
  buddyId: string;
  service: ServiceType;
  durationMinutes: number;
  durationLabel: string;
  price: number;
  dateId: string;
  dateLabel: string;
  startTime: string;
  paymentMethod: PaymentMethodType;
  ewalletProvider: EwalletProvider;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  targetScreen?: ScreenRoute;
}
