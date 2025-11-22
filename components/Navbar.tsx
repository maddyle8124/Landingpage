
import React from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-6 px-4">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 flex gap-2 shadow-lg">
        <button
          onClick={() => onNavigate('home')}
          className={`
            px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${currentPage === 'home' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-white hover:bg-white/10'
            }
          `}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`
            px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${currentPage === 'about' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:bg-black/5' // Darker text when inactive on about page (light bg)
            }
          `}
        >
          About
        </button>
      </div>
    </nav>
  );
};