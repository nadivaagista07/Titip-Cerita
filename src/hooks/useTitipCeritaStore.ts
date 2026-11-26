import { useCallback, useEffect, useState } from 'react';
import {
  BOOKING_DATES,
  BUDDIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_POSTS,
  INITIAL_SESSIONS,
  INITIAL_USER,
  generateBuddyReply,
} from '../data/mockData';
import type {
  BookingDraft,
  Buddy,
  CommunityPost,
  EwalletProvider,
  NotificationItem,
  PaymentMethodType,
  ScreenRoute,
  ServiceType,
  Session,
  SessionReview,
  UserProfile,
} from '../types';

const STORAGE_KEY = 'titipcerita_app_state_v1';

interface PersistedState {
  user: UserProfile;
  sessions: Session[];
  posts: CommunityPost[];
  blockedBuddyIds: string[];
  notifications: NotificationItem[];
  lastBookedSessionId: string | null;
}

const DEFAULT_PERSISTED: PersistedState = {
  user: INITIAL_USER,
  sessions: INITIAL_SESSIONS,
  posts: INITIAL_POSTS,
  blockedBuddyIds: [],
  notifications: INITIAL_NOTIFICATIONS,
  lastBookedSessionId: null,
};

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PERSISTED;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      user: { ...INITIAL_USER, ...(parsed.user || {}) },
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : INITIAL_SESSIONS,
      posts: Array.isArray(parsed.posts) ? parsed.posts : INITIAL_POSTS,
      blockedBuddyIds: Array.isArray(parsed.blockedBuddyIds) ? parsed.blockedBuddyIds : [],
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications : INITIAL_NOTIFICATIONS,
      lastBookedSessionId: parsed.lastBookedSessionId ?? null,
    };
  } catch {
    return DEFAULT_PERSISTED;
  }
}

export function useTitipCeritaStore() {
  const [persisted, setPersisted] = useState<PersistedState>(loadInitialState);

  const initialScreen: ScreenRoute = persisted.user.isLoggedIn
    ? persisted.user.hasCompletedOnboarding
      ? 'home'
      : 'onboarding-age'
    : 'splash';

  const [history, setHistory] = useState<ScreenRoute[]>([initialScreen]);
  const currentScreen = history[history.length - 1];

  const [selectedBuddyId, setSelectedBuddyId] = useState<string>('nara');
  const [findBuddyServiceFilter, setFindBuddyServiceFilter] = useState<ServiceType>('Chat');
  const [activeSessionId, setActiveSessionId] = useState<string>('ses-ongoing-1');
  const [mySessionsTab, setMySessionsTab] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming');
  const [reviewTargetSessionId, setReviewTargetSessionId] = useState<string | null>(null);
  const [typingSessionId, setTypingSessionId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    buddyId: 'nara',
    service: 'Chat',
    durationMinutes: 30,
    durationLabel: '30 menit',
    price: 15000,
    dateId: BOOKING_DATES[2].id,
    dateLabel: BOOKING_DATES[2].fullLabel,
    startTime: '19.00',
    paymentMethod: 'ewallet',
    ewalletProvider: 'GoPay',
  });

  // Save persisted state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // Ignore storage quota errors
    }
  }, [persisted]);

  // Live session countdown for ongoing sessions
  useEffect(() => {
    const hasOngoing = persisted.sessions.some((s) => s.status === 'ongoing' && s.remainingSeconds > 0);
    if (!hasOngoing) return;
    const timer = window.setInterval(() => {
      setPersisted((prev) => ({
        ...prev,
        sessions: prev.sessions.map((s) =>
          s.status === 'ongoing' && s.remainingSeconds > 0
            ? { ...s, remainingSeconds: Math.max(0, s.remainingSeconds - 1) }
            : s
        ),
      }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [persisted.sessions]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(t);
  }, [toastMessage]);

  const navigate = useCallback((screen: ScreenRoute, opts?: { replace?: boolean }) => {
    setHistory((prev) => {
      if (opts?.replace) {
        return [...prev.slice(0, -1), screen];
      }
      if (prev[prev.length - 1] === screen) return prev;
      return [...prev, screen];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const switchMainTab = useCallback((tab: 'home' | 'community' | 'my-sessions' | 'profile') => {
    setHistory([tab]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length <= 1) return ['home'];
      return prev.slice(0, -1);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auth & User Actions
  const updateUser = useCallback((patch: Partial<UserProfile>) => {
    setPersisted((prev) => ({
      ...prev,
      user: { ...prev.user, ...patch },
    }));
  }, []);

  const loginUser = useCallback(
    (email: string, nickname?: string) => {
      setPersisted((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          email: email.trim() || prev.user.email,
          nickname: nickname || prev.user.nickname || 'Alya',
          isLoggedIn: true,
          hasCompletedOnboarding: true,
        },
      }));
      setHistory(['home']);
    },
    []
  );

  const registerUser = useCallback((nickname: string, email: string, birthDate: string) => {
    setPersisted((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        nickname: nickname.trim() || 'Alya',
        email: email.trim() || 'alya@email.com',
        birthDate: birthDate || '2005-05-12',
        isLoggedIn: true,
        hasCompletedOnboarding: false,
      },
    }));
    navigate('onboarding-age');
  }, [navigate]);

  const completeOnboarding = useCallback(() => {
    setPersisted((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        isLoggedIn: true,
        hasCompletedOnboarding: true,
      },
    }));
    setHistory(['home']);
  }, []);

  const logoutUser = useCallback(() => {
    setPersisted((prev) => ({
      ...prev,
      user: { ...prev.user, isLoggedIn: false },
    }));
    setHistory(['login']);
  }, []);

  const resetAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPersisted(DEFAULT_PERSISTED);
    setHistory(['splash']);
    showToast('Data akun dikembalikan ke awal.');
  }, [showToast]);

  // Buddy & Booking Actions
  const openBuddyProfile = useCallback(
    (buddyId: string) => {
      setSelectedBuddyId(buddyId);
      navigate('buddy-profile');
    },
    [navigate]
  );

  const openFindBuddy = useCallback(
    (service?: ServiceType) => {
      if (service) setFindBuddyServiceFilter(service);
      navigate('find-buddy');
    },
    [navigate]
  );

  const startBooking = useCallback(
    (buddy: Buddy, service: ServiceType, durationMinutes?: number) => {
      const options = buddy.pricing[service] || buddy.pricing.Chat;
      const chosen =
        options.find((o) => o.durationMinutes === durationMinutes) || options[0];
      setSelectedBuddyId(buddy.id);
      setBookingDraft((prev) => ({
        ...prev,
        buddyId: buddy.id,
        service,
        durationMinutes: chosen.durationMinutes,
        durationLabel: chosen.label,
        price: chosen.price,
      }));
      navigate('booking');
    },
    [navigate]
  );

  const updateBookingDraft = useCallback((patch: Partial<BookingDraft>) => {
    setBookingDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethodType, provider?: EwalletProvider) => {
    setBookingDraft((prev) => ({
      ...prev,
      paymentMethod: method,
      ewalletProvider: provider || prev.ewalletProvider,
    }));
  }, []);

  const confirmPayment = useCallback(() => {
    const buddy = BUDDIES.find((b) => b.id === bookingDraft.buddyId) || BUDDIES[0];
    const startHour = parseInt(bookingDraft.startTime.split('.')[0] || '19', 10);
    const totalMins = startHour * 60 + bookingDraft.durationMinutes;
    const endHour = Math.floor(totalMins / 60);
    const endMin = totalMins % 60;
    const timeRange = `${bookingDraft.startTime}–${String(endHour).padStart(2, '0')}.${String(endMin).padStart(2, '0')} WIB`;

    const methodText =
      bookingDraft.paymentMethod === 'ewallet'
        ? bookingDraft.ewalletProvider
        : bookingDraft.paymentMethod === 'bank'
          ? 'BCA Virtual Account'
          : 'QRIS';

    const orderNum = Math.floor(100000 + Math.random() * 899999);
    const newSessionId = `ses-${Date.now()}`;
    const newSession: Session = {
      id: newSessionId,
      orderId: `TC${orderNum}`,
      buddyId: buddy.id,
      buddyName: buddy.name,
      buddyMascot: buddy.mascot,
      service: bookingDraft.service,
      durationMinutes: bookingDraft.durationMinutes,
      durationLabel: bookingDraft.durationLabel,
      dateLabel: bookingDraft.dateLabel,
      timeRange,
      price: bookingDraft.price,
      paymentMethodLabel: `${methodText} · Rp${bookingDraft.price.toLocaleString('id-ID')}`,
      status: 'upcoming',
      remainingSeconds: bookingDraft.durationMinutes * 60,
      messages: [
        {
          id: `msg-init-${Date.now()}`,
          sender: 'buddy',
          text:
            bookingDraft.service === 'Study'
              ? `Hai ${persisted.user.nickname}, aku ${buddy.name}! Kita fokus ${bookingDraft.durationMinutes >= 60 ? '25 menit dulu, lalu istirahat 5 menit' : 'pelan-pelan bareng'}. Target kecilmu hari ini apa?`
              : `Hai ${persisted.user.nickname}, aku ${buddy.name}. Makasih sudah datang. Mau mulai dari kabarmu hari ini?`,
          time: bookingDraft.startTime,
        },
      ],
    };

    setPersisted((prev) => ({
      ...prev,
      sessions: [newSession, ...prev.sessions],
      lastBookedSessionId: newSessionId,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `Sesi dengan ${buddy.name} terjadwal`,
          body: `${bookingDraft.service} · ${bookingDraft.durationLabel} (${bookingDraft.dateLabel}, ${timeRange})`,
          time: 'Baru saja',
          read: false,
          targetScreen: 'my-sessions',
        },
        ...prev.notifications,
      ],
    }));

    navigate('payment-success', { replace: true });
  }, [bookingDraft, navigate, persisted.user.nickname]);

  // Session Room Actions
  const enterSessionRoom = useCallback(
    (sessionId: string) => {
      const target = persisted.sessions.find((s) => s.id === sessionId);
      if (!target) return;
      if (target.status === 'upcoming') {
        setPersisted((prev) => ({
          ...prev,
          sessions: prev.sessions.map((s) =>
            s.id === sessionId ? { ...s, status: 'ongoing' } : s
          ),
        }));
      }
      setActiveSessionId(sessionId);
      navigate(target.service === 'Study' ? 'study-room' : 'chat-room');
    },
    [navigate, persisted.sessions]
  );

  const sendMessageToSession = useCallback(
    (sessionId: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
      const msgId = `msg-${Date.now()}`;

      const targetSession = persisted.sessions.find((s) => s.id === sessionId);
      if (!targetSession) return;

      setPersisted((prev) => ({
        ...prev,
        sessions: prev.sessions.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                messages: [
                  ...s.messages,
                  { id: msgId, sender: 'user', text: trimmed, time: timeStr, status: 'Terkirim' },
                ],
              }
            : s
        ),
      }));

      setTypingSessionId(sessionId);
      window.setTimeout(() => {
        const replyText = generateBuddyReply(targetSession.buddyName, targetSession.service, trimmed);
        const replyNow = new Date();
        const replyTime = `${String(replyNow.getHours()).padStart(2, '0')}.${String(replyNow.getMinutes()).padStart(2, '0')}`;
        setPersisted((prev) => ({
          ...prev,
          sessions: prev.sessions.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: [
                    ...s.messages.map((m) => (m.id === msgId ? { ...m, status: 'Dibaca' as const } : m)),
                    {
                      id: `msg-rep-${Date.now()}`,
                      sender: 'buddy',
                      text: replyText,
                      time: replyTime,
                    },
                  ],
                }
              : s
          ),
        }));
        setTypingSessionId(null);
      }, 950);
    },
    [persisted.sessions]
  );

  const endSession = useCallback(
    (sessionId: string) => {
      setPersisted((prev) => ({
        ...prev,
        sessions: prev.sessions.map((s) =>
          s.id === sessionId ? { ...s, status: 'completed', remainingSeconds: 0 } : s
        ),
      }));
      setReviewTargetSessionId(sessionId);
      setMySessionsTab('completed');
      setHistory(['my-sessions']);
    },
    []
  );

  const submitSessionReview = useCallback(
    (sessionId: string, review: SessionReview) => {
      setPersisted((prev) => ({
        ...prev,
        sessions: prev.sessions.map((s) =>
          s.id === sessionId ? { ...s, review } : s
        ),
      }));
      setReviewTargetSessionId(null);
      showToast('Ulasan terkirim. Terima kasih sudah berbagi!');
    },
    [showToast]
  );

  // Community Actions
  const createPost = useCallback(
    (content: string, tag: string, isAnonymous: boolean) => {
      const cleanTag = tag.startsWith('#') ? tag : `#${tag.replace(/\s+/g, '')}`;
      const newPost: CommunityPost = {
        id: `post-${Date.now()}`,
        author: isAnonymous ? 'Teman senja' : persisted.user.nickname,
        mascot: persisted.user.mascot,
        timeAgo: 'Baru saja',
        isAnonymous,
        tag: cleanTag || '#CeritaHariIni',
        content: content.trim(),
        hugCount: 1,
        spiritCount: 0,
        relateCount: 0,
        userReactedHug: true,
        replies: [],
      };
      setPersisted((prev) => ({
        ...prev,
        posts: [newPost, ...prev.posts],
      }));
      showToast('Ceritamu sudah dibagikan ke ruang komunitas.');
    },
    [persisted.user.mascot, persisted.user.nickname, showToast]
  );

  const togglePostReaction = useCallback(
    (postId: string, kind: 'hug' | 'spirit' | 'relate') => {
      setPersisted((prev) => ({
        ...prev,
        posts: prev.posts.map((p) => {
          if (p.id !== postId) return p;
          if (kind === 'hug') {
            const active = !p.userReactedHug;
            return { ...p, userReactedHug: active, hugCount: p.hugCount + (active ? 1 : -1) };
          }
          if (kind === 'spirit') {
            const active = !p.userReactedSpirit;
            return { ...p, userReactedSpirit: active, spiritCount: p.spiritCount + (active ? 1 : -1) };
          }
          const active = !p.userReactedRelate;
          return { ...p, userReactedRelate: active, relateCount: p.relateCount + (active ? 1 : -1) };
        }),
      }));
    },
    []
  );

  const toggleSavePost = useCallback(
    (postId: string) => {
      setPersisted((prev) => ({
        ...prev,
        posts: prev.posts.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p)),
      }));
    },
    []
  );

  const addPostReply = useCallback(
    (postId: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setPersisted((prev) => ({
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                replies: [
                  ...p.replies,
                  {
                    id: `rep-${Date.now()}`,
                    author: 'Teman sebaya',
                    mascot: prev.user.mascot,
                    timeAgo: 'Baru saja',
                    text: trimmed,
                  },
                ],
              }
            : p
        ),
      }));
      showToast('Balasan yang menguatkan terkirim.');
    },
    [showToast]
  );

  // Safety & Notifications
  const toggleBlockBuddy = useCallback(
    (buddyId: string) => {
      setPersisted((prev) => {
        const exists = prev.blockedBuddyIds.includes(buddyId);
        const next = exists
          ? prev.blockedBuddyIds.filter((id) => id !== buddyId)
          : [...prev.blockedBuddyIds, buddyId];
        return { ...prev, blockedBuddyIds: next };
      });
    },
    []
  );

  const markNotificationsRead = useCallback(() => {
    setPersisted((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  return {
    currentScreen,
    canGoBack: history.length > 1,
    navigate,
    switchMainTab,
    goBack,
    user: persisted.user,
    updateUser,
    loginUser,
    registerUser,
    completeOnboarding,
    logoutUser,
    resetAllData,
    buddies: BUDDIES.filter((b) => !persisted.blockedBuddyIds.includes(b.id)),
    allBuddies: BUDDIES,
    blockedBuddyIds: persisted.blockedBuddyIds,
    toggleBlockBuddy,
    selectedBuddyId,
    setSelectedBuddyId,
    openBuddyProfile,
    findBuddyServiceFilter,
    setFindBuddyServiceFilter,
    openFindBuddy,
    bookingDraft,
    startBooking,
    updateBookingDraft,
    setPaymentMethod,
    confirmPayment,
    lastBookedSessionId: persisted.lastBookedSessionId,
    sessions: persisted.sessions,
    activeSessionId,
    setActiveSessionId,
    mySessionsTab,
    setMySessionsTab,
    enterSessionRoom,
    sendMessageToSession,
    typingSessionId,
    endSession,
    reviewTargetSessionId,
    setReviewTargetSessionId,
    submitSessionReview,
    posts: persisted.posts,
    createPost,
    togglePostReaction,
    toggleSavePost,
    addPostReply,
    notifications: persisted.notifications,
    markNotificationsRead,
    toastMessage,
    showToast,
  };
}
