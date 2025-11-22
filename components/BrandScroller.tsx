
import React from 'react';
import { CONFIG } from './Config';

export const BrandScroller: React.FC = () => {
  const { logos, title } = CONFIG.smileyProfile.brands;

  return (
    <div className="
      relative overflow-hidden
      w-full max-w-[420px] sm:max-w-[480px] mx-auto
      rounded-[34px] sm:rounded-[40px]
      px-6 sm:px-8 py-6 sm:py-8
      bg-gradient-to-b from-[#2466c7]/10 via-[#1e4b8a]/15 to-[#0b2450]/40
      backdrop-blur-xl
      border border-white/10
      shadow-[0_24px_60px_rgba(0,0,0,0.25)]
    ">
      
      {/* Top Fade */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-white/5 to-transparent rounded-t-[40px] pointer-events-none z-0"></div>

      <h3 className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white/80 text-center mb-4 sm:mb-6 relative z-10 drop-shadow-md">
        {title}
      </h3>

      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 relative z-10">
           {logos.map((brand, index) => (
             <a 
                key={`${brand.name}-${index}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                    group relative flex items-center justify-center 
                    w-24 h-12 sm:w-28 sm:h-14
                    opacity-80 hover:opacity-100 transition-all duration-300 
                    hover:scale-105
                    drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]
                    animate-float
                "
                style={{ animationDelay: `${index * 0.2}s` }}
             >
                <img 
                    src={brand.src} 
                    alt={brand.name} 
                    className={`
                        w-full h-full object-contain 
                        brightness-0 invert opacity-70 group-hover:opacity-100 transition-all
                    `} 
                />
             </a>
           ))}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-black/10 to-transparent rounded-b-[40px] pointer-events-none z-0"></div>
    </div>
  );
};