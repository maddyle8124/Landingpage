import React, { useState, useEffect } from 'react';
import LiquidFolder from './components/LiquidFolder';
import { AboutPage } from './components/AboutPage';
import { CONFIG } from './components/Config';

export default function App() {
  // Set website title from Config
  useEffect(() => {
    document.title = CONFIG.title;
  }, []);

  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [shouldOpenNotebook, setShouldOpenNotebook] = useState(false);

  const handleNavigateToNotebook = () => {
    setCurrentPage('home');
    setShouldOpenNotebook(true);
  };

  return (
    <div className="min-h-screen w-full relative">
      
      {/* VIEW: HOME */}
      {currentPage === 'home' && (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 overflow-x-hidden relative animate-in fade-in duration-500">
          {/* Background Image for Home */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://wallpapercave.com/wp/wp5483623.jpg')",
            }}
          />
          
          <div className="w-[90vw] max-w-[340px] relative z-10">
            <LiquidFolder 
              onNavigate={(page) => setCurrentPage(page as 'home' | 'about')} 
              shouldOpenNotebook={shouldOpenNotebook}
              onNotebookOpened={() => setShouldOpenNotebook(false)}
            />
          </div>
        </div>
      )}

      {/* VIEW: ABOUT */}
      {currentPage === 'about' && (
        <div className="animate-in slide-in-from-right-4 duration-500">
          <AboutPage 
            onBack={() => setCurrentPage('home')} 
            onOpenNotebook={handleNavigateToNotebook}
          />
        </div>
      )}
    </div>
  );
}