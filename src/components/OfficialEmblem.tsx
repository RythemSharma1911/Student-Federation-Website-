import React from 'react';
import emblemImg from '../assets/images/real_sfb_logo_1792390559972.jpg';

interface OfficialEmblemProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  priority?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-32 h-32',
  hero: 'w-48 h-48 md:w-60 md:h-60',
};

export const OfficialEmblem: React.FC<OfficialEmblemProps> = ({
  className = '',
  size = 'md',
  showText = false,
  onClick,
}) => {
  return (
    <div 
      className={`inline-flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-full p-[2px] bg-gradient-to-br from-[#E4CEA4] via-[#C5A36A] to-[#8A6B38] shadow-md ring-1 ring-[#651D32]/30 overflow-hidden`}>
        <img
          src={emblemImg}
          alt="Students Federation of Bikaner Official Emblem"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
        />
        {/* Subtle inner gold rim highlight */}
        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-serif text-base md:text-lg font-bold tracking-tight text-[#181719] leading-tight">
            Students Federation of Bikaner
          </span>
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#651D32]">
            For People · For Education · For Change
          </span>
        </div>
      )}
    </div>
  );
};
