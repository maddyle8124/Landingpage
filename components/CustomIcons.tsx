import React from 'react';

export const CustomSmileyIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    style={{ filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.2))' }}
  >
    <defs>
      <radialGradient id="faceGrad" cx="35%" cy="35%" r="80%">
        <stop offset="0%" stopColor="#FFEB3B" />
        <stop offset="40%" stopColor="#FDD835" />
        <stop offset="100%" stopColor="#F57F17" />
      </radialGradient>
      <radialGradient id="eyeShine" cx="30%" cy="30%" r="50%">
         <stop offset="0%" stopColor="white" stopOpacity="0.9"/>
         <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    {/* Main Face Body */}
    <circle cx="50" cy="50" r="48" fill="url(#faceGrad)" />
    <circle cx="50" cy="50" r="48" fill="none" stroke="#F9A825" strokeWidth="1.5" opacity="0.5" />
    
    {/* Highlight */}
    <ellipse cx="30" cy="25" rx="12" ry="6" fill="white" opacity="0.3" transform="rotate(-30 30 25)" />

    {/* Eyes */}
    <g fill="#263238">
        <ellipse cx="32" cy="42" rx="6" ry="9" />
        <ellipse cx="68" cy="42" rx="6" ry="9" />
    </g>
    
    {/* Eye Shines */}
    <ellipse cx="34" cy="39" rx="2" ry="3" fill="white" opacity="0.8" />
    <ellipse cx="70" cy="39" rx="2" ry="3" fill="white" opacity="0.8" />

    {/* Cheeks */}
    <ellipse cx="22" cy="58" rx="7" ry="4" fill="#FF5252" opacity="0.2" />
    <ellipse cx="78" cy="58" rx="7" ry="4" fill="#FF5252" opacity="0.2" />

    {/* Smile */}
    <path 
      d="M 28 62 Q 50 82 72 62" 
      fill="none" 
      stroke="#263238" 
      strokeWidth="5" 
      strokeLinecap="round" 
    />
  </svg>
);

export const CompositionNotebookIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 260" 
    className={className} 
    style={{ filter: 'drop-shadow(5px 10px 15px rgba(0,0,0,0.25))' }}
  >
    <defs>
      {/* Pattern to simulate the marble texture roughly */}
      <pattern id="marblePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#121212"/>
        <path d="M5 5q5 -5 10 0t5 10q-5 5 -10 0t-5 -10" fill="none" stroke="#e0e0e0" strokeWidth="1" opacity="0.5"/>
        <path d="M25 25q5 -5 10 0t5 10q-5 5 -10 0t-5 -10" fill="none" stroke="#e0e0e0" strokeWidth="1" opacity="0.5"/>
        <circle cx="10" cy="30" r="1" fill="#e0e0e0" opacity="0.6" />
        <circle cx="30" cy="10" r="1.5" fill="#e0e0e0" opacity="0.4" />
        <circle cx="20" cy="20" r="0.8" fill="#e0e0e0" opacity="0.7" />
        <path d="M0 0l40 40M40 0l-40 40" stroke="#333" strokeWidth="0.5" opacity="0.2"/>
      </pattern>
      <filter id="paperTexture">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </defs>

    {/* Book Cover */}
    <rect x="10" y="5" width="180" height="250" rx="4" fill="url(#marblePattern)" />
    
    {/* Black Spine */}
    <rect x="10" y="5" width="28" height="250" rx="2" fill="#0a0a0a" />
    <line x1="38" y1="5" x2="38" y2="255" stroke="#222" strokeWidth="1" />

    {/* Label Box */}
    <g transform="translate(45, 60)">
      {/* Paper Label Background */}
      <rect x="0" y="0" width="120" height="80" rx="2" fill="#fdf5e6" filter="url(#paperTexture)" />
      <rect x="0" y="0" width="120" height="80" rx="2" fill="none" stroke="#dcdcdc" strokeWidth="1" />
      
      {/* Inner Border */}
      <rect x="6" y="6" width="108" height="68" fill="none" stroke="#000" strokeWidth="1.5" />
      <rect x="8" y="8" width="104" height="64" fill="none" stroke="#000" strokeWidth="0.5" />

      {/* Text */}
      <path d="M 20 32 Q 60 22 100 32" fill="none" stroke="transparent" id="curve" />
      <text x="60" y="38" textAnchor="middle" fontFamily="serif" fontWeight="900" fontSize="15" letterSpacing="0.5" fill="black" style={{transform: 'scale(1, 1.2)'}}>
        COMPOSITIONS
      </text>

      {/* Writing Lines */}
      <line x1="15" y1="50" x2="105" y2="50" stroke="#000" strokeWidth="0.5" />
      <line x1="15" y1="62" x2="105" y2="62" stroke="#000" strokeWidth="0.5" />
      <text x="15" y="48" fontSize="6" fontFamily="sans-serif" fontWeight="bold">NAME</text>
    </g>

    {/* Pages edge hint at bottom */}
    <path d="M15 255 L185 255" stroke="#eee" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

export const OpenCompositionNotebookIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 280 200" 
    className={className} 
    style={{ filter: 'drop-shadow(10px 15px 20px rgba(0,0,0,0.2))' }}
  >
    <defs>
      {/* Removed noisy filter for cleaner look */}
      <linearGradient id="spineShadow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(0,0,0,0)" />
        <stop offset="50%" stopColor="rgba(0,0,0,0.1)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
    </defs>

    {/* Cover visible on edges */}
    <rect x="0" y="10" width="280" height="180" rx="2" fill="#121212" />
    
    {/* Left Page (No Filter) */}
    <rect x="10" y="15" width="125" height="170" fill="#fdf5e6" />
    {/* Lines Left */}
    <g stroke="#a0a0a0" strokeWidth="0.5">
       {[...Array(8)].map((_, i) => (
          <line key={`l-${i}`} x1="20" y1={40 + i * 18} x2="125" y2={40 + i * 18} />
       ))}
    </g>
    
    {/* Right Page (No Filter) */}
    <rect x="135" y="15" width="125" height="170" fill="#fdf5e6" />
    {/* Lines Right */}
    <g stroke="#a0a0a0" strokeWidth="0.5">
       {[...Array(8)].map((_, i) => (
          <line key={`r-${i}`} x1="145" y1={40 + i * 18} x2="250" y2={40 + i * 18} />
       ))}
    </g>

    {/* Spine Area */}
    <rect x="125" y="15" width="20" height="170" fill="url(#spineShadow)" />
    <line x1="135" y1="15" x2="135" y2="185" stroke="#000" strokeWidth="1" opacity="0.1" />

    {/* Red Margin Lines */}
    <line x1="30" y1="15" x2="30" y2="185" stroke="#ffcccc" strokeWidth="1" />
    <line x1="155" y1="15" x2="155" y2="185" stroke="#ffcccc" strokeWidth="1" />

  </svg>
);