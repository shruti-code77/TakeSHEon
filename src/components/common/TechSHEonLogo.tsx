import React from 'react';
import officialLogoImage from '../../assets/images/techsheon_official_logo_1787326068816.jpg';

interface TechSHEonIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  circular?: boolean;
}

export const TechSHEonIcon: React.FC<TechSHEonIconProps> = ({
  className = '',
  size = 'md',
  circular = true,
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  };

  const roundedStyle = circular ? 'rounded-full' : 'rounded-2xl';

  return (
    <div
      className={`relative shrink-0 overflow-hidden shadow-md shadow-pink-500/10 border-2 border-[#DB2777]/30 bg-white p-[1px] ${roundedStyle} ${sizeMap[size]} ${className}`}
    >
      <img
        src={officialLogoImage}
        alt="TechSHEon Official Logo"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover ${roundedStyle}`}
      />
    </div>
  );
};

export const TechSHEonFullLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-28',
    md: 'w-36',
    lg: 'w-48',
    xl: 'w-64',
  };

  return (
    <div className={`relative inline-block ${sizeMap[size]} ${className}`}>
      <img
        src={officialLogoImage}
        alt="TechSHEon - Empowering Her Business With Smart Tech"
        referrerPolicy="no-referrer"
        className="w-full h-auto object-contain rounded-full shadow-lg border-2 border-pink-500/20"
      />
    </div>
  );
};

interface TechSHEonBrandProps {
  showTagline?: boolean;
  showBadge?: boolean;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const TechSHEonBrand: React.FC<TechSHEonBrandProps> = ({
  showTagline = true,
  showBadge = true,
  theme = 'light',
  size = 'md',
  onClick,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 text-left group select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <TechSHEonIcon size={size} circular className="group-hover:scale-105 transition-transform duration-200 shadow-md shadow-pink-500/20 border-pink-400" />
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-xl font-black tracking-tight">
            <span className="text-[#1E1B4B]">Tech</span>
            <span className="bg-gradient-to-r from-[#DB2777] via-[#E11D48] to-[#9333EA] bg-clip-text text-transparent font-extrabold">
              SHEon
            </span>
          </span>
          {showBadge && (
            <span
              className={`text-[10px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded-md ${
                isDark
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                  : 'bg-[#FDF2F8] text-[#BE185D] border border-[#FCE7F3]'
              }`}
            >
              MVP
            </span>
          )}
        </div>
        {showTagline && (
          <p
            className={`text-[11px] font-medium mt-1 tracking-tight ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`}
          >
            Empowering <span className="text-pink-600 font-semibold italic">Her</span> Business, With Smart Tech.
          </p>
        )}
      </div>
    </div>
  );
};

