import React, { useState, useEffect } from 'react';
import { OfficialEmblem } from './OfficialEmblem';
import type { NavigationPage } from '../types';
import { Menu, X, ShieldAlert, UserPlus, Bell, MessageSquare, Info, Users, Home } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: NavigationPage; icon?: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-4 h-4" /> },
    { label: 'About Us', page: 'about', icon: <Info className="w-4 h-4" /> },
    { label: 'Report an Issue', page: 'report-an-issue', icon: <ShieldAlert className="w-4 h-4 text-red-500" /> },
    { label: 'Become a Member', page: 'membership', icon: <UserPlus className="w-4 h-4" /> },
    { label: 'Notices', page: 'notices', icon: <Bell className="w-4 h-4" /> },
    { label: 'Our Team', page: 'our-team', icon: <Users className="w-4 h-4" /> },
    { label: 'Contact', page: 'contact', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#181719]/95 backdrop-blur-md shadow-lg border-b border-[#C5A36A]/20 py-2.5'
          : 'bg-gradient-to-b from-[#250812]/90 via-[#250812]/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Zone 1: Brand Wordmark + Emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="Students Federation of Bikaner - Home"
          >
            <OfficialEmblem size="sm" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-[#F8F4EC] group-hover:text-[#C5A36A] transition-colors whitespace-nowrap tracking-tight">
                Students Federation of Bikaner
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-[#C5A36A]/90 hidden sm:inline-block">
                For People · For Education · For Change
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#E4CEA4]'
                      : 'text-[#F8F4EC]/85 hover:text-[#C5A36A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A36A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('membership')}
              className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#181719] bg-gradient-to-r from-[#E4CEA4] via-[#C5A36A] to-[#D4B681] hover:brightness-110 active:scale-[0.98] rounded shadow-md border border-[#C5A36A] transition-all whitespace-nowrap cursor-pointer focus:ring-2 focus:ring-[#C5A36A] focus:outline-none"
            >
              Join the Federation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => handleNavClick('membership')}
              className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#181719] bg-[#C5A36A] hover:bg-[#E4CEA4] rounded transition-colors whitespace-nowrap cursor-pointer md:inline-block hidden"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F8F4EC] hover:text-[#C5A36A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A36A] cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#181719]/98 border-b border-[#C5A36A]/20 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#651D32] text-white font-semibold'
                      : 'text-[#F8F4EC]/90 hover:bg-[#250812] hover:text-[#C5A36A]'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
            
            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('membership')}
                className="w-full py-3 text-center text-xs font-bold tracking-wider uppercase text-[#181719] bg-gradient-to-r from-[#E4CEA4] to-[#C5A36A] rounded font-sans shadow-md cursor-pointer"
              >
                Join the Federation
              </button>
              <button
                onClick={() => handleNavClick('report-an-issue')}
                className="w-full py-2.5 text-center text-xs font-semibold tracking-wider uppercase text-red-300 hover:text-white bg-red-950/40 border border-red-800/40 rounded cursor-pointer"
              >
                Confidential Report An Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
