import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emblemImg from '../assets/images/real_sfb_logo_1792390559972.jpg';

interface CinematicOpeningProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !forceShow) {
      onComplete();
      setIsVisible(false);
      return;
    }

    // Check if user already saw the intro during this session
    const hasSeen = sessionStorage.getItem('sfb_cinematic_intro_seen');
    if (hasSeen && !forceShow) {
      onComplete();
      setIsVisible(false);
      return;
    }

    // Auto-advance after 3.2 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 3200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow, onComplete]);

  const handleDismiss = () => {
    sessionStorage.setItem('sfb_cinematic_intro_seen', 'true');
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#250812] overflow-hidden"
          role="dialog"
          aria-label="Welcome presentation"
        >
          {/* Subtle cinematic radial amber / maroon glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(101,29,50,0.55)_0%,_rgba(37,8,18,0.98)_70%)] pointer-events-none" />
          
          {/* Subtle architectural silhouette backdrop */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A36A_1px,_transparent_1px)] [background-size:32px_32px] pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-6 right-6 z-20 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-[#E4CEA4] hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded border border-[#C5A36A]/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A36A]"
            aria-label="Skip introduction animation"
          >
            Skip Intro [Esc]
          </button>

          {/* Central Emblem & Typography Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
            {/* Emblem with dimensional aura */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="absolute -inset-4 rounded-full bg-[#C5A36A]/20 blur-xl animate-pulse" />
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-[#8A6B38] via-[#E4CEA4] to-[#C5A36A] shadow-2xl ring-2 ring-[#C5A36A]/40">
                <img
                  src={emblemImg}
                  alt="Students Federation of Bikaner Emblem"
                  className="w-full h-full object-cover rounded-full shadow-inner"
                />
              </div>
            </motion.div>

            {/* Title Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-2xl md:text-4xl text-[#F8F4EC] tracking-tight font-bold">
                Students Federation of Bikaner
              </h1>
              
              <div className="w-16 h-0.5 mx-auto my-3 bg-gradient-to-r from-transparent via-[#C5A36A] to-transparent" />
              
              <p className="text-xs md:text-sm tracking-widest uppercase font-medium text-[#C5A36A]">
                For People · For Education · For Change
              </p>
            </motion.div>

            {/* Motto / Movement reveal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xs text-[#E4CEA4]/75 mt-4 font-serif italic"
            >
              "A Generation That Speaks. A Movement That Acts."
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
