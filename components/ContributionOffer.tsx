
import React, { useState } from 'react';
import { CONFIG } from './Config';

interface ContributionOfferProps {
  onOpenNotebook?: () => void;
}

export const ContributionOffer: React.FC<ContributionOfferProps> = ({ onOpenNotebook }) => {
  const { title, subText, branches, cta } = CONFIG.smileyProfile.contribution;
  const [openBranchIndex, setOpenBranchIndex] = useState<number | null>(null);

  const toggleBranch = (index: number) => {
    setOpenBranchIndex(openBranchIndex === index ? null : index);
  };

  return (
    <div 
      className="
        w-full max-w-[420px] mx-auto
        rounded-[40px]
        px-6 sm:px-8 py-8 sm:py-10
        bg-gradient-to-b from-[#2466c7]/10 via-[#1e4b8a]/15 to-[#0b2450]/40
        backdrop-blur-xl border border-white/10
        shadow-[0_24px_60px_rgba(0,0,0,0.25)]
        flex flex-col
      "
    >
      {/* Intro Copy Layout */}
      <div className="mt-2 sm:mt-4 flex flex-col items-center text-center gap-3 sm:gap-4">
        {/* Didone Style Title with Floating Effect */}
        <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-snug drop-shadow-md animate-float">
          {title}
        </h2>
        
        {/* Intro Paragraph - Simple Text */}
        <p className="mt-4 text-xs sm:text-sm text-white/90 leading-relaxed max-w-md mx-auto text-center">
          {subText}
        </p>
      </div>

      {/* Hanging Branch Interaction List */}
      <div className="mt-6 sm:mt-8 flex flex-col gap-4 w-full">
        {branches.map((branch, index) => {
          const isOpen = openBranchIndex === index;

          return (
            <div 
                key={index} 
                className="relative animate-float"
                style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* White Glass Pill - Closed State */}
              <div 
                className={`
                  w-full rounded-full
                  bg-white/15 backdrop-blur-md border border-white/30
                  px-5 py-3
                  flex items-center justify-between
                  transition-all duration-300 ease-out
                  cursor-pointer 
                  shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                  hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]
                  ${isOpen ? 'bg-white/25' : ''}
                `}
                onClick={() => toggleBranch(index)}
              >
                <span className="text-sm font-medium text-white text-left pr-2 drop-shadow-sm">
                  {branch.label}
                </span>
                {/* Chevron Icon */}
                <svg 
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`text-white/90 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* Expanded Text (Collapsible) */}
              <div 
                className={`
                  grid transition-all duration-300 ease-out
                  ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}
                `}
              >
                <div className="overflow-hidden">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 shadow-inner">
                    <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed">
                      {branch.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="mt-10 flex flex-col items-center text-center">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
            
            {/* Primary: Book a Call */}
            <button 
              onClick={() => window.open(cta.url, '_blank')}
              className="
                px-6 py-3 rounded-full 
                bg-white text-[#0b2450] 
                font-semibold text-sm 
                shadow-[0_14px_35px_rgba(0,0,0,0.35)] 
                hover:translate-y-[-2px] hover:shadow-[0_18px_45px_rgba(0,0,0,0.4)] 
                transition-all
                whitespace-nowrap
            ">
              {cta.label}
            </button>

            {/* Secondary: Notebook Interaction */}
            <button 
                onClick={onOpenNotebook}
                className="
                    px-6 py-3 rounded-full 
                    bg-white/10 border border-white/30 
                    text-white text-sm font-medium 
                    backdrop-blur-md 
                    hover:bg-white/20 
                    transition-all
                    whitespace-nowrap
                "
            >
                Write something in my notebook
            </button>
        </div>
      </div>

    </div>
  );
};
