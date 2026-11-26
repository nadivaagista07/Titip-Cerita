import React from 'react';
import { AppShell } from './components/Layout';
import { useTitipCeritaStore } from './hooks/useTitipCeritaStore';
import { BookingScreen } from './pages/BookingScreen';
import { BuddyProfileScreen } from './pages/BuddyProfileScreen';
import { CommunityScreen } from './pages/CommunityScreen';
import { FindBuddyScreen } from './pages/FindBuddyScreen';
import { HomeScreen } from './pages/HomeScreen';
import { LoginScreen } from './pages/LoginScreen';
import { MySessionsScreen } from './pages/MySessionsScreen';
import { OnboardingScreen } from './pages/OnboardingScreen';
import { PaymentScreen } from './pages/PaymentScreen';
import { ProfessionalHelpScreen } from './pages/ProfessionalHelpScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { RatingModal } from './pages/RatingModal';
import { RegisterScreen } from './pages/RegisterScreen';
import { SessionRoomScreen } from './pages/SessionRoomScreen';
import { SplashScreen } from './pages/SplashScreen';

export default function App() {
  const store = useTitipCeritaStore();

  const showNav =
    store.currentScreen === 'home' ||
    store.currentScreen === 'community' ||
    store.currentScreen === 'my-sessions' ||
    store.currentScreen === 'profile';

  const selectedBuddy =
    store.allBuddies.find((b) => b.id === store.selectedBuddyId) ||
    store.buddies[0] ||
    store.allBuddies[0];

  const bookingBuddy =
    store.allBuddies.find((b) => b.id === store.bookingDraft.buddyId) ||
    selectedBuddy;

  const activeSession =
    store.sessions.find((s) => s.id === store.activeSessionId) ||
    store.sessions.find((s) => s.status === 'ongoing') ||
    store.sessions[0];

  const lastBookedSession =
    store.sessions.find((s) => s.id === store.lastBookedSessionId) || null;

  const reviewTargetSession = store.reviewTargetSessionId
    ? store.sessions.find((s) => s.id === store.reviewTargetSessionId) || null
    : null;

  return (
    <AppShell
      currentScreen={store.currentScreen}
      showNav={showNav}
      userNickname={store.user.nickname}
      userMascot={store.user.mascot}
      onSwitchTab={store.switchMainTab}
      onNavigate={store.navigate}
    >
      {store.currentScreen === 'splash' && (
        <SplashScreen
          onContinueLogin={() => store.navigate('login')}
          onContinueRegister={() => store.navigate('register')}
        />
      )}

      {store.currentScreen === 'login' && (
        <LoginScreen
          defaultEmail={store.user.email}
          onLogin={(email) => store.loginUser(email)}
          onGoRegister={() => store.navigate('register')}
        />
      )}

      {store.currentScreen === 'register' && (
        <RegisterScreen
          onBack={store.goBack}
          onRegister={store.registerUser}
          onGoLogin={() => store.navigate('login')}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'onboarding-age' && (
        <OnboardingScreen
          step={1}
          user={store.user}
          onUpdateUser={store.updateUser}
          onBack={store.goBack}
          onNextStep={() => store.navigate('onboarding-need')}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'onboarding-need' && (
        <OnboardingScreen
          step={2}
          user={store.user}
          onUpdateUser={store.updateUser}
          onBack={store.goBack}
          onNextStep={() => store.navigate('onboarding-interests')}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'onboarding-interests' && (
        <OnboardingScreen
          step={3}
          user={store.user}
          onUpdateUser={store.updateUser}
          onBack={store.goBack}
          onNextStep={() => store.completeOnboarding()}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'home' && (
        <HomeScreen
          user={store.user}
          buddies={store.buddies}
          notifications={store.notifications}
          onMarkNotificationsRead={store.markNotificationsRead}
          onNavigate={store.navigate}
          onOpenFindBuddy={store.openFindBuddy}
          onOpenBuddyProfile={store.openBuddyProfile}
          onQuickBook={store.startBooking}
        />
      )}

      {store.currentScreen === 'find-buddy' && (
        <FindBuddyScreen
          user={store.user}
          buddies={store.buddies}
          initialService={store.findBuddyServiceFilter}
          onChangeService={store.setFindBuddyServiceFilter}
          onBack={store.goBack}
          onSelectBuddy={store.openBuddyProfile}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'buddy-profile' && (
        <BuddyProfileScreen
          buddy={selectedBuddy}
          onBack={store.goBack}
          onStartBooking={store.startBooking}
          onBlockBuddy={(id) => {
            store.toggleBlockBuddy(id);
            store.showToast(`${selectedBuddy.name} telah diblokir.`);
            store.navigate('find-buddy', { replace: true });
          }}
          onReportBuddy={(name, reason) => {
            store.showToast(`Laporan profil ${name} (${reason}) telah dikirim.`);
          }}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'booking' && (
        <BookingScreen
          buddy={bookingBuddy}
          draft={store.bookingDraft}
          onUpdateDraft={store.updateBookingDraft}
          onChangeBuddy={() => store.navigate('find-buddy')}
          onBack={store.goBack}
          onContinuePayment={() => store.navigate('payment-method')}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {(store.currentScreen === 'payment-method' ||
        store.currentScreen === 'payment-bank' ||
        store.currentScreen === 'payment-qris' ||
        store.currentScreen === 'payment-success') && (
        <PaymentScreen
          mode={store.currentScreen}
          user={store.user}
          buddy={bookingBuddy}
          draft={store.bookingDraft}
          lastBookedSession={lastBookedSession}
          onSelectMethod={store.setPaymentMethod}
          onNavigate={store.navigate}
          onBack={store.goBack}
          onConfirmPayment={store.confirmPayment}
          onGoMySessions={() => {
            store.setMySessionsTab('upcoming');
            store.switchMainTab('my-sessions');
          }}
          onGoHome={() => store.switchMainTab('home')}
          onShowToast={store.showToast}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'my-sessions' && (
        <MySessionsScreen
          sessions={store.sessions}
          buddies={store.allBuddies}
          activeTab={store.mySessionsTab}
          onChangeTab={store.setMySessionsTab}
          onEnterSessionRoom={store.enterSessionRoom}
          onOpenReview={(sid) => store.setReviewTargetSessionId(sid)}
          onBookAgain={store.startBooking}
          onFindBuddy={() => store.openFindBuddy()}
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {(store.currentScreen === 'chat-room' || store.currentScreen === 'study-room') &&
        activeSession && (
          <SessionRoomScreen
            session={activeSession}
            isBuddyTyping={store.typingSessionId === activeSession.id}
            onBack={() => store.switchMainTab('my-sessions')}
            onSendMessage={store.sendMessageToSession}
            onEndSession={store.endSession}
            onProfessionalHelp={() => store.navigate('professional-help')}
            onReportSession={(buddyName, reason) =>
              store.showToast(`Laporan sesi ${buddyName} (${reason}) telah dikirim.`)
            }
          />
        )}

      {store.currentScreen === 'community' && (
        <CommunityScreen
          user={store.user}
          posts={store.posts}
          onCreatePost={store.createPost}
          onToggleReaction={store.togglePostReaction}
          onToggleSave={store.toggleSavePost}
          onAddReply={store.addPostReply}
          onReportPost={() =>
            store.showToast('Laporan diterima. Moderator akan meninjau cerita ini.')
          }
          onHelpClick={() => store.navigate('professional-help')}
        />
      )}

      {store.currentScreen === 'profile' && (
        <ProfileScreen
          user={store.user}
          allBuddies={store.allBuddies}
          blockedBuddyIds={store.blockedBuddyIds}
          onUpdateUser={store.updateUser}
          onUnblockBuddy={(id) => {
            store.toggleBlockBuddy(id);
            store.showToast('Blokir akun dibuka.');
          }}
          onNavigate={store.navigate}
          onLogout={store.logoutUser}
          onResetAccount={store.resetAllData}
          onShowToast={store.showToast}
        />
      )}

      {store.currentScreen === 'professional-help' && (
        <ProfessionalHelpScreen onBack={store.goBack} />
      )}

      {/* Rating & Review Bottom Sheet */}
      {reviewTargetSession && (
        <RatingModal
          session={reviewTargetSession}
          onClose={() => store.setReviewTargetSessionId(null)}
          onSubmit={store.submitSessionReview}
        />
      )}

      {/* Global Toast Notification */}
      {store.toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] max-w-sm w-[calc(100%-2.5rem)] bg-[#162333] text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl text-center"
        >
          {store.toastMessage}
        </div>
      )}
    </AppShell>
  );
}
