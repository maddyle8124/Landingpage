import React from 'react';

export const ToriGateIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 10h20" stroke="#E74C3C" strokeWidth="2.5" />
    <path d="M4 10v11" stroke="#E74C3C" strokeWidth="2.5" />
    <path d="M20 10v11" stroke="#E74C3C" strokeWidth="2.5" />
    <path d="M1 5h22" stroke="#E74C3C" strokeWidth="2.5" />
    <path d="M6 5v5" stroke="#E74C3C" />
    <path d="M18 5v5" stroke="#E74C3C" />
    <path d="M6 14h12" stroke="#E74C3C" />
  </svg>
);

export const ExpandIcon = ({ className }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 3h6v6" />
    <path d="M9 21H3v-6" />
    <path d="M21 3l-7 7" />
    <path d="M3 21l7-7" />
  </svg>
);

export const RefreshIcon = ({ className }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);