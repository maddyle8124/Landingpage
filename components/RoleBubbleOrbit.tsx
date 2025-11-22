
import React, { useState, useEffect } from 'react';
import { CONFIG } from './Config';

export const RoleBubbleOrbit: React.FC = () => {
  const roles = CONFIG.smileyProfile.roles;
  const count = roles.length;
  
  // Responsive Radius State
  // Significantly reduced for the narrower card layout (max-w-[420px])
  // Mobile: 85px radius
  // Desktop: 105px radius
  const [radius, setRadius] = useState(105);

  useEffect(() => {
    const handleResize = () => {
      // Mobile (<640px): 85px radius, Desktop: 105px radius
      setRadius(window.innerWidth < 640 ? 85 : 105);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      {/* Rotating Container */}
      <div className="relative w-full h-full flex items-center justify-center animate-spin-slow">
        {roles.map((role, index) => {
          // Calculate position on the circle
          const angle = (360 / count) * index;
          const angleRad = (angle * Math.PI) / 180;
          
          const x = radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);

          return (
            <div
              key={index}
              className="absolute w-0 h-0 flex items-center justify-center"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* 
                  Bubble Content
                  - Reduced size to fit tight container
                  - Mobile/Desktop: w-[64px] h-[64px]
                  - Style: bg-white/35, backdrop-blur-md, border border-white/50
               */}
              <div 
                className="
                  animate-spin-slow-reverse 
                  pointer-events-auto cursor-default
                  flex flex-col items-center justify-center text-center
                  w-[64px] h-[64px]
                  bg-white/35 backdrop-blur-md border border-white/50
                  shadow-lg
                  rounded-full
                  transition-all duration-300 hover:scale-110 hover:bg-white/50 hover:shadow-xl
                  px-1
                "
              >
                {/* Inner Highlights for Liquid Feel */}
                <div className="absolute top-2 left-3 w-1/3 h-[2px] bg-white/60 rounded-full blur-[1px]"></div>
                
                {/* Content */}
                <span className="text-lg mb-0.5 drop-shadow-sm filter leading-none">{role.emoji}</span>
                <span className="text-[7px] font-bold text-gray-900 leading-none uppercase tracking-wide max-w-[50px] line-clamp-2 drop-shadow-sm">
                    {role.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};