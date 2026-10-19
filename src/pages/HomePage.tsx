import React from 'react';
import { OfficialEmblem } from '../components/OfficialEmblem';
import type { NavigationPage, Notice } from '../types';
import heroBg from '../assets/images/bikaner_sandstone_hero_1792348303028.jpg';
import movementBg from '../assets/images/collective_movement_1792348302729.jpg';
import shieldVisual from '../assets/images/student_support_shield_1792348302683.jpg';
import { 
  ShieldCheck, 
  GlobeLock, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  Instagram, 
  Lightbulb, 
  Bell, 
  Lock, 
  ChevronRight,
  Calendar,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavigationPage) => void;
  notices: Notice[];
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, notices }) => {
  const latestNotices = notices.slice(0, 3);

  return (
    <div className="w-full">
      {/* ===================================================================
          HERO SECTION
          =================================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#250812]">
        {/* Background Image with Cinematic Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Bikaner Sandstone Heritage Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          {/* Gradients for depth and legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#250812] via-[#250812]/75 to-[#250812]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(101,29,50,0.6)_0%,_rgba(37,8,18,0.95)_75%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Emblem Anchor */}
          <div className="mb-6 relative">
            <div className="absolute -inset-4 bg-[#C5A36A]/20 blur-xl rounded-full" />
            <OfficialEmblem size="xl" className="transform transition-transform hover:scale-105" />
          </div>

          {/* Slogan Kicker */}
          <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#E4CEA4] mb-3">
            For People · For Education · For Change
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F8F4EC] tracking-tight leading-[1.1] max-w-4xl text-balance">
            A Generation That Speaks. <br className="hidden sm:inline" />
            A Movement That Acts.
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg text-[#F8F4EC]/85 max-w-2xl leading-relaxed">
            Building a stronger student community through awareness, education, 
            collective action, and meaningful support across the educational landscape of Bikaner.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('membership')}
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#181719] bg-gradient-to-r from-[#E4CEA4] via-[#C5A36A] to-[#D4B681] hover:brightness-110 active:scale-[0.98] rounded shadow-xl border border-[#C5A36A] transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Become a Member</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('report-an-issue')}
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F8F4EC] bg-white/5 hover:bg-white/10 active:scale-[0.98] rounded border border-white/20 hover:border-[#C5A36A]/60 backdrop-blur-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#C5A36A]" />
              <span>Report an Issue (Private)</span>
            </button>
          </div>

          {/* Quick Pillar Ticker */}
          <div className="mt-14 pt-8 border-t border-white/10 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="px-3">
              <span className="block text-[11px] uppercase tracking-wider text-[#C5A36A]">Foundation</span>
              <span className="font-serif text-sm font-medium text-white/90">Student-Led Collective</span>
            </div>
            <div className="px-3">
              <span className="block text-[11px] uppercase tracking-wider text-[#C5A36A]">Integrity</span>
              <span className="font-serif text-sm font-medium text-white/90">100% Anonymous Leadership</span>
            </div>
            <div className="px-3">
              <span className="block text-[11px] uppercase tracking-wider text-[#C5A36A]">Protection</span>
              <span className="font-serif text-sm font-medium text-white/90">Encrypted Grievance Safe</span>
            </div>
            <div className="px-3">
              <span className="block text-[11px] uppercase tracking-wider text-[#C5A36A]">Location</span>
              <span className="font-serif text-sm font-medium text-white/90">Bikaner, Rajasthan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION A — OUR PURPOSE
          =================================================================== */}
      <section className="py-20 bg-[#F8F4EC] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-[#651D32]">
                Our Institutional Purpose
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#181719] tracking-tight leading-tight">
                More Than a Name. <br />
                A Collective Purpose.
              </h2>
              <div className="w-20 h-1 bg-[#651D32]" />
              
              <p className="text-base sm:text-lg text-[#181719]/80 leading-relaxed">
                The Students Federation of Bikaner was established around a singular conviction: 
                students must have a dedicated, uncompromising platform where their educational welfare, 
                digital security, and civic dignity are actively championed.
              </p>

              <p className="text-sm sm:text-base text-[#181719]/75 leading-relaxed">
                We operate not as a political syndicate or a personality cult, but as an anonymous, 
                decentralized student federation. Our work focuses on resolving student grievances, 
                educating the youth against digital harms, promoting educational equity, and fostering 
                meaningful, constructive engagement across universities, colleges, and schools in Bikaner.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#651D32] hover:text-[#3D101E] group cursor-pointer"
                >
                  <span>Read Our Full Story & Principles</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-[#C5A36A]/40 bg-[#250812]">
                <img
                  src={movementBg}
                  alt="Student Collective Assembly"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#250812] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded border border-white/10 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#C5A36A] font-semibold block">
                    The Federation Philosophy
                  </span>
                  <p className="font-serif text-sm italic text-white/90">
                    "When students unite without individual ego, truth becomes unbreakable."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION B — OUR CORE INITIATIVES
          =================================================================== */}
      <section className="py-20 bg-[#3D101E] text-[#F8F4EC] relative overflow-hidden">
        {/* Subtle background grain */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A36A_1px,_transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E4CEA4] block mb-2">
              Action Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Our Core Initiatives
            </h2>
            <div className="w-16 h-0.5 mx-auto mt-3 bg-[#C5A36A]" />
            <p className="mt-4 text-sm sm:text-base text-white/80">
              Four fundamental avenues through which the Federation supports, defends, and empowers students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Student Support */}
            <div className="bg-[#250812]/90 p-6 rounded-lg border border-[#C5A36A]/25 hover:border-[#C5A36A] transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#651D32] border border-[#C5A36A]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-[#E4CEA4]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Student Support
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  A channel for students to raise concerns and seek guidance.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  onClick={() => onNavigate('report-an-issue')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#C5A36A] hover:text-[#E4CEA4] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Submit Concern</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Cyber Awareness */}
            <div className="bg-[#250812]/90 p-6 rounded-lg border border-[#C5A36A]/25 hover:border-[#C5A36A] transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#651D32] border border-[#C5A36A]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <GlobeLock className="w-6 h-6 text-[#E4CEA4]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Cyber Awareness
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Encouraging safer, more responsible digital participation.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#C5A36A] hover:text-[#E4CEA4] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Learn Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Education & Welfare */}
            <div className="bg-[#250812]/90 p-6 rounded-lg border border-[#C5A36A]/25 hover:border-[#C5A36A] transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#651D32] border border-[#C5A36A]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 text-[#E4CEA4]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Education & Welfare
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Supporting conversations around educational access and student welfare.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  onClick={() => onNavigate('share-an-idea')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#C5A36A] hover:text-[#E4CEA4] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Propose Idea</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 4: Student Participation */}
            <div className="bg-[#250812]/90 p-6 rounded-lg border border-[#C5A36A]/25 hover:border-[#C5A36A] transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#651D32] border border-[#C5A36A]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-[#E4CEA4]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  Student Participation
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Creating space for ideas, collaboration, and positive action.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  onClick={() => onNavigate('membership')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#C5A36A] hover:text-[#E4CEA4] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Join Movement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION C — REPORT A CONCERN
          =================================================================== */}
      <section className="py-20 bg-[#F8F4EC] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl border border-[#E4DCCE] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted · Private Channel</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181719] tracking-tight">
                Your Voice Deserves to Be Heard.
              </h2>
              
              <p className="mt-4 text-base text-[#181719]/80 leading-relaxed">
                If you or someone in your institution is facing cyberbullying, online blackmail, 
                impersonation, or campus harassment, you do not have to struggle in silence. 
                Students can submit concerns confidentially or 100% anonymously.
              </p>

              <div className="mt-4 p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">Strict Privacy Protection:</span> Anonymous submissions require 
                zero personal identifiers (no name, email, or phone). Reports are never published or made public.
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('report-an-issue')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#651D32] hover:bg-[#3D101E] active:scale-[0.98] rounded shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#C5A36A]" />
                  <span>Report an Issue</span>
                </button>

                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#181719] hover:text-[#651D32] transition-colors cursor-pointer"
                >
                  Read Privacy Disclosures
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#250812] p-8 flex flex-col justify-center relative overflow-hidden">
              <img
                src={shieldVisual}
                alt="Confidential Student Protection Shield"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center absolute inset-0 opacity-40 mix-blend-luminosity"
              />
              <div className="relative z-10 text-white space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#C5A36A] font-semibold block">
                  Reporting Scope
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A]" />
                    <span>Cyberbullying & Online Threats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A]" />
                    <span>Online Blackmail & Extortion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A]" />
                    <span>Fake Accounts & Identity Theft</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A36A]" />
                    <span>Student Welfare & Institutional Grievances</span>
                  </li>
                </ul>
                <p className="text-[11px] text-white/60 pt-2 border-t border-white/10">
                  Note: The federation is not a police or emergency dispatch. Urgent threats should be referred to emergency authorities.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION D — JOIN THE MOVEMENT
          =================================================================== */}
      <section className="py-20 bg-[#250812] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={movementBg}
            alt="Federation Movement"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#250812] via-[#250812]/90 to-[#250812]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E4CEA4] block mb-2">
            Youth Leadership Without Personal Vanity
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Be Part of Something That Matters.
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Apply to join our student collective. Whether you want to volunteer for campus awareness 
            events, assist in educational outreach, or champion digital safety among your peers, 
            your contribution makes a difference.
          </p>
          <button
            onClick={() => onNavigate('membership')}
            className="px-8 py-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#181719] bg-gradient-to-r from-[#E4CEA4] via-[#C5A36A] to-[#D4B681] hover:brightness-110 active:scale-[0.98] rounded shadow-xl border border-[#C5A36A] transition-all cursor-pointer"
          >
            Join the Federation
          </button>
        </div>
      </section>

      {/* ===================================================================
          SECTION E — LATEST NOTICES
          =================================================================== */}
      <section className="py-20 bg-[#F8F4EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4 pb-4 border-b border-[#E4DCCE]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#651D32] block mb-1">
                Official Bulletins
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#181719] tracking-tight">
                Latest Notices & Advisories
              </h2>
            </div>
            <button
              onClick={() => onNavigate('notices')}
              className="text-xs font-bold uppercase tracking-wider text-[#651D32] hover:text-[#3D101E] flex items-center gap-1 group cursor-pointer"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {latestNotices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-[#E4DCCE]">
              <Bell className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-stone-600">
                No official notices have been published yet. Please check back for updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => onNavigate('notices')}
                  className="bg-white p-6 rounded-lg border border-[#E4DCCE] shadow-sm hover:shadow-md hover:border-[#C5A36A] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs text-[#77716E]">
                      <span className="font-semibold text-[#651D32]">{notice.category}</span>
                      <span>·</span>
                      <span className="font-mono">{notice.publicationDate}</span>
                    </div>
                    
                    <h3 className="font-serif text-lg font-bold text-[#181719] group-hover:text-[#651D32] transition-colors mb-3 leading-snug">
                      {notice.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#181719]/75 line-clamp-3 leading-relaxed">
                      {notice.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-[#651D32] font-semibold">
                    <span>Read Advisory</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          SECTION F — SHARE AN IDEA
          =================================================================== */}
      <section className="py-20 bg-stone-100 border-t border-[#E4DCCE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#651D32] to-[#3D101E] rounded-xl text-white p-8 sm:p-12 shadow-xl border border-[#C5A36A]/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E4CEA4]">
                <Lightbulb className="w-4 h-4" />
                <span>Student Innovation & Feedback</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Have an Idea That Could Make a Difference?
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Invite suggestions for improving student life, education, digital awareness, or community 
                initiatives. All ideas can be submitted with or without your name.
              </p>
            </div>

            <button
              onClick={() => onNavigate('share-an-idea')}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#181719] bg-gradient-to-r from-[#E4CEA4] via-[#C5A36A] to-[#D4B681] hover:brightness-110 active:scale-[0.98] rounded shadow-lg whitespace-nowrap cursor-pointer shrink-0"
            >
              Share Your Idea
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION G — INSTAGRAM
          =================================================================== */}
      <section className="py-16 bg-[#181719] text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#651D32] to-[#C5A36A] flex items-center justify-center mx-auto text-white shadow-lg">
            <Instagram className="w-6 h-6" />
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Follow Our Official Instagram
          </h2>
          
          <p className="text-sm text-white/70 max-w-md mx-auto">
            Stay updated with real-time student advisories, digital awareness campaigns, 
            and verified notifications on our official handle.
          </p>

          <p className="font-mono text-base font-bold text-[#E4CEA4]">
            @students_federation_bkn
          </p>

          <div>
            <a
              href="https://www.instagram.com/students_federation_bkn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase text-[#181719] bg-[#C5A36A] hover:bg-[#E4CEA4] rounded transition-all cursor-pointer shadow-md"
            >
              <span>Follow on Instagram</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
