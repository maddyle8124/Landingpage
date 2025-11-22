
import React from 'react';
import { CONFIG } from './Config';
import { RoleBubbleOrbit } from './RoleBubbleOrbit';
import { BrandScroller } from './BrandScroller';
import { ContributionOffer } from './ContributionOffer';

interface AboutPageProps {
  onBack: () => void;
  onOpenNotebook: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onOpenNotebook }) => {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-[#f9fafb]">
      {/* Background Styling */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
            backgroundImage: "url('https://wallpapercave.com/wp/wp12254035.jpg')" 
        }} 
      />
      
      {/* Scrollable Content Wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center py-8 sm:py-12">
      
          {/* Back Button - Positioned relative to the viewport/content */}
          <div className="w-full max-w-[420px] px-4 mb-4 flex justify-start">
            <button 
                onClick={onBack}
                className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors shadow-lg group"
                aria-label="Back to Home"
            >
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover:-translate-x-1 transition-transform"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </button>
          </div>
          
          {/* 
              MAIN CARD CONTAINER
              - w-full max-w-[420px] (Matches Home Card width constraints)
              - rounded-[34px] sm:rounded-[40px]
              - px-6 sm:px-8 py-6 sm:py-8
              - Glass aesthetic
          */}
          <div className="
            relative w-[90vw] max-w-[420px] 
            bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-[34px] sm:rounded-[40px] 
            shadow-2xl 
            px-6 py-8 sm:px-8 sm:py-10
            flex flex-col items-center text-center
          ">
            
            {/* 
                HERO SECTION (Avatar + Bubbles)
                - Reduced height to reduce density
                - Bubbles contained within padding
            */}
            <div className="relative w-full h-[260px] sm:h-[300px] flex items-center justify-center shrink-0">
                
                {/* Decorative Floating Image (Moved Here) */}
                <img 
                    src="https://maddyleescorner.wordpress.com/wp-content/uploads/2025/11/10.png" 
                    alt="Decorative Header"
                    className="absolute -top-10 z-30 w-28 sm:w-32 object-contain drop-shadow-lg animate-float"
                />

                {/* The Orbit System */}
                <RoleBubbleOrbit />

                {/* Central Avatar - Clickable to go Home */}
                <div 
                    className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center z-20 animate-float cursor-pointer group"
                    onClick={onBack}
                >
                    <div className="w-full h-full rounded-full border-2 border-white/70 shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden bg-white/10 backdrop-blur-sm group-hover:border-white transition-colors">
                        <img 
                            src="https://maddyleescorner.wordpress.com/wp-content/uploads/2025/11/11.png" 
                            alt="Smiley Hero" 
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>

            {/* 
                PERSONALITY CHIPS
                - Moved out of Hero, placed below as a flex row
                - mt-3 gap-2
                - Added animate-float with delays
            */}
            <div className="mt-2 flex flex-wrap justify-center gap-2 w-full z-20 relative">
                {CONFIG.smileyProfile.tags.map((tag, index) => (
                    <div 
                        key={tag}
                        className="
                            bg-blue-600/50 backdrop-blur-xl border border-white/30 
                            text-white text-[10px] font-semibold italic tracking-wide
                            px-5 py-2.5 rounded-full 
                            shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] animate-float
                        "
                        style={{ animationDelay: `${index * 0.3}s` }}
                    >
                        {tag}
                    </div>
                ))}
            </div>

            {/* 
                TEXT CONTENT BLOCK
                - Airy spacing matching home card
            */}
            <div className="w-full mt-6 sm:mt-8 flex flex-col items-center space-y-4 z-20">
                
                {/* Headline */}
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md leading-none">
                    Hi, I’m <span className="font-serif italic font-normal">Maddy</span>.
                </h1>
                
                {/* Description Block (Removed Glass Frame) */}
                <div className="
                    px-4 py-2 
                    max-w-[280px] mx-auto 
                    text-xs sm:text-sm text-white font-medium leading-relaxed text-center
                    drop-shadow-sm
                ">
                    {CONFIG.smileyProfile.hero.subHeadline}
                </div>
                
                {/* Tagline Chip */}
                <div className="
                    mt-4 w-full
                    bg-white/15 border border-white/25
                    rounded-xl px-5 py-3
                    text-white/90 text-xs sm:text-sm font-medium italic
                    backdrop-blur-md shadow-sm
                ">
                    {CONFIG.smileyProfile.hero.descriptor}
                </div>
            </div>

          </div>

          {/* 
             SECTION 2: BRAND SCROLLER (New Grid Layout)
             - Matches new spacing/layout requirements
          */}
          <div className="w-full mt-10 sm:mt-14 mb-10 sm:mb-14 px-4">
             <BrandScroller />
          </div>

          {/* 
             SECTION 3: CONTRIBUTION + OFFER
             New glass card section with light gradient theme and Notebook CTA
          */}
          <div className="w-full px-4 flex flex-col items-center justify-center">
             <ContributionOffer onOpenNotebook={onOpenNotebook} />
             
             {/* Moved CTA Subtext with specific typography */}
             <p className="mt-12 mb-8 text-2xl sm:text-3xl font-serif italic text-white text-center opacity-90 drop-shadow-md max-w-lg leading-normal px-4 animate-wavy">
                {CONFIG.smileyProfile.contribution.cta.subCopy}
             </p>
          </div>

          <div className="h-12"></div>

      </div>
    </div>
  );
};
