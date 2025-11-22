
import React, { useState, useEffect } from 'react';
import { CompositionNotebookIcon, OpenCompositionNotebookIcon } from './CustomIcons';

interface NotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotebookModal: React.FC<NotebookModalProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState<'form' | 'writing' | 'success'>('form');
  const [userName, setUserName] = useState("");
  const [userTopic, setUserTopic] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [userContact, setUserContact] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStage('form');
        setUserName("");
        setUserTopic("");
        setUserMessage("");
        setUserContact("");
        setIsSending(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleStartWriting = () => {
    if (!userName.trim() || !userTopic.trim()) return;
    setStage('writing');
  };

  const handleSend = async () => {
    setIsSending(true);

    // Capture the data structure for "Excel"
    const payload = {
        Timestamp: new Date().toLocaleString(),
        From: userName,
        Contact: userContact,
        Topic: userTopic,
        Content: userMessage
    };

    // --- SIMULATING BACKEND SAVE ---
    // In a real app, you would use fetch() here to POST 'payload' to your API or Google Sheets endpoint.
    console.table(payload); 
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSending(false);
    setStage('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300 pointer-events-none">
      {/* Note: pointer-events-none on container lets clicks pass through to background if not hitting modal, 
          but we enable pointer-events-auto on the modal itself. */}
      
      {/* 
          Container:
          - Form Stage: Portrait aspect ratio (Closed book)
          - Writing/Success Stage: Landscape aspect ratio (Open book)
          - Floating Liquid Glass Style (No dark overlay)
      */}
      <div 
        className={`
            relative w-full transition-all duration-500 ease-in-out flex items-center justify-center pointer-events-auto
            ${stage === 'form' ? 'max-w-sm aspect-[3/4]' : 'max-w-3xl aspect-[1.4/1]'}
            bg-white/30 backdrop-blur-xl border border-white/40 rounded-[32px] 
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            p-5
        `}
      >
        
        {/* Close Button (Moved Inside the Glass Frame) */}
        <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-800/70 hover:text-red-600 transition-colors p-2 z-[60] bg-white/40 hover:bg-white/80 rounded-full backdrop-blur-sm shadow-sm"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {/* Background Icons (Inset to show glass border) */}
        <div className="absolute inset-5 drop-shadow-2xl transition-all duration-500 pointer-events-none">
           {stage === 'form' ? (
              <CompositionNotebookIcon className="w-full h-full" />
           ) : (
              <OpenCompositionNotebookIcon className="w-full h-full" />
           )}
        </div>

        {/* --- STAGE 1: INPUT FORM --- */}
        {stage === 'form' && (
          <div className="relative z-10 w-[85%] bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
              
              <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md leading-tight">
                  thanks for jumping in!
              </h3>
              
              {/* Name Field */}
              <p className="text-white/90 text-xs mb-2 font-medium drop-shadow-sm mt-2">
                  your name is?
              </p>
              <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name..." 
                  className="w-full bg-white/80 backdrop-blur-sm border-none rounded-xl px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 outline-none transition-all mb-3 text-center font-medium shadow-inner"
                  autoFocus
              />

              {/* Topic Field */}
              <p className="text-white/90 text-xs mb-2 font-medium drop-shadow-sm">
                  what you want to talk about :) ?
              </p>
              <textarea 
                  value={userTopic}
                  onChange={(e) => setUserTopic(e.target.value)}
                  placeholder="share me your topic" 
                  className="w-full bg-white/80 backdrop-blur-sm border-none rounded-xl px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 outline-none transition-all mb-4 text-center font-medium shadow-inner resize-none h-16"
              />
              
              {/* Start Writing Button */}
              <button 
                  onClick={handleStartWriting}
                  className="w-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/50 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!userName.trim() || !userTopic.trim()}
              >
                  Start Writing
              </button>
          </div>
        )}

        {/* --- STAGE 2: WRITING PAGE --- */}
        {stage === 'writing' && (
            <div className="absolute inset-5 flex pointer-events-auto animate-in fade-in duration-500">
                
                {/* --- LEFT PAGE: WRITING CONTENT --- */}
                <div className="absolute top-[10%] bottom-[10%] left-[4%] width-[44%] right-[52%] px-4 py-2 flex flex-col">
                    
                    <div className="mb-2 text-gray-700 font-serif text-[10px] sm:text-xs space-y-1 border-b border-gray-300/60 pb-2">
                        <div className="flex items-baseline">
                            <span className="font-bold w-10 opacity-70">From:</span>
                            <span className="font-medium italic truncate">{userName}</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="font-bold w-10 opacity-70">To:</span>
                            <span className="font-medium">Maddy</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="font-bold w-10 opacity-70">Topic:</span>
                            <span className="font-medium text-blue-800 truncate">{userTopic}</span>
                        </div>
                    </div>

                    <div className="flex-1 relative overflow-hidden">
                        <textarea 
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            className="w-full h-full bg-transparent border-none resize-none outline-none text-gray-800 font-serif p-0 leading-loose"
                            style={{
                                fontSize: '14px',
                                lineHeight: '24px', 
                            }}
                            placeholder="Click here to start writing..."
                            autoFocus
                        />
                    </div>
                </div>

                {/* --- RIGHT PAGE: ACTIONS --- */}
                <div className="absolute top-[10%] bottom-[10%] left-[52%] right-[4%] px-4 py-6 flex flex-col justify-center items-center text-center">
                    
                    <div className="w-full max-w-[80%] space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Leave your contact (optional)
                            </label>
                            <input 
                                type="text"
                                value={userContact}
                                onChange={(e) => setUserContact(e.target.value)}
                                placeholder="Email or Phone..."
                                className="w-full bg-transparent border-b border-gray-400 text-center py-1 text-sm font-serif text-gray-800 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
                            />
                        </div>

                        <button 
                            onClick={handleSend}
                            disabled={isSending}
                            className="group relative w-full overflow-hidden bg-black text-white font-medium py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isSending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving...</span>
                                </span>
                            ) : (
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span>Send to Maddy</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* --- STAGE 3: SUCCESS MESSAGE --- */}
        {stage === 'success' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6 animate-in zoom-in-95 duration-500">
                 <div className="bg-white/90 backdrop-blur-md border border-white/50 p-8 rounded-2xl shadow-xl text-center max-w-md transform rotate-1">
                     <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     </div>
                     <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">thanks !</h3>
                     <p className="text-gray-600 font-medium mb-1">I'll soon read it and get back to you!</p>
                     <p className="text-gray-500 text-sm italic">hope you have a nice day</p>
                     
                     <button 
                        onClick={onClose}
                        className="mt-6 px-8 py-2 bg-black text-white font-medium rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-gray-900"
                     >
                        Close
                     </button>
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};
