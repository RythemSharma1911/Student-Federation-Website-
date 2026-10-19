import React from 'react';
import { OfficialEmblem } from './OfficialEmblem';
import type { NavigationPage } from '../types';
import { Instagram, ShieldAlert, Sparkles, ExternalLink, ShieldCheck, FileText, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#181719] text-[#F8F4EC] border-t border-[#C5A36A]/20 pt-16 pb-12 overflow-hidden">
      {/* Subtle sandstone ambient pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A36A_1px,_transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Identity & Collective Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <OfficialEmblem size="md" />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F8F4EC] tracking-tight">
                  Students Federation of Bikaner
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#C5A36A] font-medium">
                  For People · For Education · For Change
                </p>
              </div>
            </div>
            
            <p className="text-sm text-[#F8F4EC]/70 leading-relaxed max-w-md pt-2">
              A collective student movement dedicated to education, cyber awareness, 
              safe grievance reporting, and constructive youth participation across 
              Bikaner, Rajasthan.
            </p>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/students_federation_bkn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-white/5 hover:bg-[#651D32] border border-[#C5A36A]/30 rounded text-[#E4CEA4] hover:text-white transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#E4CEA4]" />
                <span>@students_federation_bkn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#C5A36A]">
              Organization
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('our-team')} className="text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  Our Team & Collective
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('notices')} className="text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  Official Notices Board
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Action & Privacy */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#C5A36A]">
              Student Support & Action
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('report-an-issue')} 
                  className="flex items-center gap-1.5 text-red-300 hover:text-red-200 font-medium transition-colors cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Report an Issue (Private & Anonymous)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('membership')} className="text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  Become a Member & Volunteer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('share-an-idea')} className="text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  Share Your Idea or Suggestion
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy-policy')} className="flex items-center gap-1 text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 opacity-70" />
                  <span>Privacy Policy & Confidentiality</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="flex items-center gap-1 text-white/70 hover:text-[#C5A36A] transition-colors cursor-pointer">
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                  <span>Terms & Legal Disclaimer</span>
                </button>
              </li>
            </ul>

            <div className="pt-2 flex flex-col gap-1.5">
              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C5A36A]/80 hover:text-[#E4CEA4] transition-colors cursor-pointer text-left"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Replay Opening Experience</span>
                </button>
              )}
              <button
                onClick={() => handleNav('admin')}
                className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-[#C5A36A] transition-colors cursor-pointer text-left"
              >
                <span>Leadership & Requests Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 text-center md:text-left">
          <p>© {currentYear} Students Federation of Bikaner. All rights reserved.</p>
          <p className="max-w-xl text-[11px] leading-relaxed text-white/40">
            SFB is an independent student collective movement. Submitting a report does not constitute 
            a legal police filing or emergency response. For imminent danger, contact local emergency services immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};
