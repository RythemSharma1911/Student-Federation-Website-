import React, { useState, useEffect } from 'react';
import type { NavigationPage, Notice } from './types';
import { fetchNotices } from './lib/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CinematicOpening } from './components/CinematicOpening';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ReportAnIssuePage } from './pages/ReportAnIssuePage';
import { BecomeAMemberPage } from './pages/BecomeAMemberPage';
import { NoticesPage } from './pages/NoticesPage';
import { OurTeamPage } from './pages/OurTeamPage';
import { ShareAnIdeaPage } from './pages/ShareAnIdeaPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsAndDisclaimerPage } from './pages/TermsAndDisclaimerPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Check if previously seen in this session or prefers reduced motion
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('sfb_cinematic_intro_seen');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !seen && !prefersReduced;
    }
    return false;
  });

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationPage;
      const validPages: NavigationPage[] = [
        'home', 
        'about', 
        'report-an-issue', 
        'membership', 
        'notices', 
        'our-team', 
        'share-an-idea', 
        'contact', 
        'privacy-policy', 
        'terms',
        'admin'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    async function loadData() {
      const items = await fetchNotices();
      setNotices(items);
    }
    loadData();
  }, []);

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#181719] font-sans selection:bg-[#651D32] selection:text-[#F8F4EC]">
      
      {/* Cinematic Opening Intro (Skippable & Non-intrusive) */}
      {showIntro && (
        <CinematicOpening 
          onComplete={() => setShowIntro(false)} 
          forceShow={showIntro}
        />
      )}

      {/* Main Global Top Bar Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} notices={notices} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'report-an-issue' && (
          <ReportAnIssuePage />
        )}
        {currentPage === 'membership' && (
          <BecomeAMemberPage />
        )}
        {currentPage === 'notices' && (
          <NoticesPage notices={notices} />
        )}
        {currentPage === 'our-team' && (
          <OurTeamPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'share-an-idea' && (
          <ShareAnIdeaPage />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'privacy-policy' && (
          <PrivacyPolicyPage />
        )}
        {currentPage === 'terms' && (
          <TermsAndDisclaimerPage />
        )}
        {currentPage === 'admin' && (
          <AdminPortalPage />
        )}
      </main>

      {/* Floating Confidential Report Action for Mobile & Quick Assistance */}
      {currentPage !== 'report-an-issue' && (
        <div className="fixed bottom-5 right-5 z-30">
          <button
            onClick={() => handleNavigate('report-an-issue')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#651D32] hover:bg-[#3D101E] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xl border border-[#C5A36A]/50 transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A36A]"
            aria-label="Confidential Report an Issue"
          >
            <ShieldAlert className="w-4 h-4 text-[#C5A36A]" />
            <span className="hidden sm:inline">Report Concern (Private)</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onReplayIntro={handleReplayIntro} />
    </div>
  );
}
