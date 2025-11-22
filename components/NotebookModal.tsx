
import React, { useState, useEffect } from 'react';
import { CompositionNotebookIcon, OpenCompositionNotebookIcon } from './CustomIcons';
import { CONFIG } from './Config';

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
    
    // If NO Google URL is set in Config, simulate success (Development Mode)
    if (!CONFIG.googleSheetsWebhookUrl) {
        console.log("DEV MODE: Simulation Data Sent", {
            Timestamp: new Date().toISOString(),
            Name: userName,
            Contact: userContact,
            Topic: userTopic,
            Content: userMessage
        });
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSending(false);
        setStage('success');
        return;
    }

    // If URL exists, send REAL data to Google Sheet
    try {
        const formData = new FormData();
        formData.append("timestamp", new Date().toLocaleString());
        formData.append("name", userName);
        formData.append("topic", userTopic);
        formData.append("message", userMessage);
        formData.append("contact", userContact);

        await fetch(CONFIG.googleSheetsWebhookUrl, {
            method: "POST",
            body: formData
        });
        
        // Assuming success if no network error thrown
        setIsSending(false);
        setStage('success');
    } catch (error) {
        console.error("Error sending data", error);
        alert("Something went wrong. Please check your connection and try again.");
        setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      
      {/* Invisible backdrop to catch clicks outside */}
      <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>

      {/* 
          MODAL CONTAINER 
          - Floating Liquid Glass Card
          - No dark backdrop
          - Subtle shadow
      */}
      <div 
        className="relative z-[110] bg-white/30 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-5 overflow-hidden transition-all duration-500"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        
        {/* CLOSE BUTTON - Inside the glass frame */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[120] p-2 text-gray-800 hover:bg-white/40 rounded-full transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {/* --- STAGE 1: COVER FORM --- */}
        {stage === 'form' && (
          <div className="relative w-full max-w-[340px] aspect-[200/260] animate-in zoom-in-95 duration-500">
            
            {/* Rounded Glass Frame for Notebook Graphic */}
            <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/20 shadow-inner">
                <CompositionNotebookIcon className="w-full h-full object-cover drop-shadow-2xl" />
            </div>
            
            {/* Inputs Overlay - Glass Card */}
            <div className="absolute top-[20%] left-[15%] right-[15%] bottom-[20%] bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg px-4 py-6 flex flex-col gap-4">
               <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="space-y-1">
                     <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 text-center">Your Name</label>
                     <input 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-transparent border-b border-gray-400 text-center font-serif font-bold text-lg text-gray-900 focus:border-black focus:outline-none placeholder-gray-400"
                        placeholder="Maddy?"
                        autoFocus
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 text-center">Topic</label>
                     <input 
                        value={userTopic}
                        onChange={(e) => setUserTopic(e.target.value)}
                        className="w-full bg-transparent border-b border-gray-400 text-center font-serif text-base text-gray-900 focus:border-black focus:outline-none placeholder-gray-400"
                        placeholder="Collab?"
                     />
                  </div>
               </div>
               <button 
                  onClick={handleStartWriting}
                  disabled={!userName.trim() || !userTopic.trim()}
                  className="w-full py-3 bg-black text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-md"
               >
                  START WRITING
               </button>
            </div>
          </div>
        )}

        {/* --- STAGE 2: WRITING (OPEN BOOK) --- */}
        {stage === 'writing' && (
          <div className="relative w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-500">
              
              {/* DESKTOP LAYOUT: Full SVG Background */}
              <div className="hidden md:block relative aspect-[280/200]">
                  <OpenCompositionNotebookIcon className="w-full h-full" />
                  
                  {/* Left Page Content (Writing) */}
                  <div className="absolute top-[8%] left-[4%] w-[44%] bottom-[8%] px-6 py-4 flex flex-col">
                      {/* Header */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 border-b border-red-200 pb-2 mb-2">
                          <span><strong className="text-gray-400 uppercase text-[9px]">From:</strong> <span className="font-serif text-gray-900">{userName}</span></span>
                          <span><strong className="text-gray-400 uppercase text-[9px]">To:</strong> <span className="font-serif text-gray-900">Maddy</span></span>
                          <span className="ml-auto"><strong className="text-gray-400 uppercase text-[9px]">Re:</strong> <span className="font-serif text-blue-700">{userTopic}</span></span>
                      </div>
                      {/* Lined Text Area */}
                      <textarea 
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          className="flex-1 w-full bg-transparent border-none resize-none outline-none font-serif text-gray-800 text-lg leading-[2rem] p-0"
                          style={{
                              backgroundImage: 'linear-gradient(transparent 31px, #e5e7eb 32px)',
                              backgroundSize: '100% 2rem',
                              backgroundAttachment: 'local',
                              lineHeight: '2rem'
                          }}
                          placeholder="Start writing..."
                          autoFocus
                      />
                  </div>

                  {/* Right Page Content (Contact + Send) */}
                  <div className="absolute top-[8%] right-[4%] w-[44%] bottom-[8%] px-6 py-4 flex flex-col justify-between">
                      <div className="mt-8">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Contact (Optional)</label>
                          <input 
                              value={userContact}
                              onChange={(e) => setUserContact(e.target.value)}
                              className="w-full bg-transparent border-b border-blue-200 focus:border-blue-500 text-gray-700 font-serif py-1 focus:outline-none"
                              placeholder="Email or @handle"
                          />
                      </div>
                      <div className="mb-4">
                          <button 
                              onClick={handleSend}
                              disabled={isSending}
                              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-serif italic text-lg rounded-xl shadow-lg hover:-translate-y-1 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                          >
                              {isSending ? "Sending..." : "Send it"}
                          </button>
                      </div>
                  </div>
              </div>

              {/* MOBILE LAYOUT: CSS-styled Paper Stack (Collapses to 1 column) */}
              <div className="md:hidden bg-[#fdf5e6] w-full rounded-2xl border-l-[12px] border-[#121212] shadow-none overflow-hidden flex flex-col min-h-[60vh]">
                  {/* Mobile Header */}
                  <div className="bg-white/10 p-4 border-b border-red-100">
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                           <div><span className="text-gray-400 text-[9px] uppercase">From:</span> <span className="font-serif font-bold">{userName}</span></div>
                           <div><span className="text-gray-400 text-[9px] uppercase">Topic:</span> <span className="font-serif text-blue-600">{userTopic}</span></div>
                      </div>
                  </div>
                  
                  {/* Mobile Writing Area */}
                  <div className="flex-1 p-4 relative">
                      {/* CSS Lines */}
                      <div className="absolute inset-0 pointer-events-none" 
                           style={{ backgroundImage: 'linear-gradient(transparent 31px, #e5e7eb 32px)', backgroundSize: '100% 2rem' }}>
                      </div>
                      <textarea 
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          className="w-full h-full bg-transparent border-none resize-none outline-none font-serif text-gray-800 text-base leading-[2rem] p-0 relative z-10"
                          placeholder="Tap to write..."
                      />
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-4 bg-white/30 border-t border-red-100 space-y-4">
                       <input 
                          value={userContact}
                          onChange={(e) => setUserContact(e.target.value)}
                          className="w-full bg-transparent border-b border-gray-300 py-1 text-sm font-serif placeholder-gray-400 focus:outline-none focus:border-gray-800"
                          placeholder="Contact info (optional)"
                       />
                       <button 
                          onClick={handleSend}
                          disabled={isSending}
                          className="w-full py-3 bg-gray-900 text-white font-serif italic rounded-lg shadow-md"
                       >
                          {isSending ? "Sending..." : "Send to Maddy"}
                       </button>
                  </div>
              </div>

          </div>
        )}

        {/* --- STAGE 3: SUCCESS --- */}
        {stage === 'success' && (
          <div className="relative bg-[#fdf5e6] p-8 max-w-sm w-full text-center shadow-none rounded-xl rotate-1 animate-in zoom-in-95 duration-500 border border-gray-200/50">
              {/* Tape Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 rotate-[-2deg] shadow-sm backdrop-blur-sm"></div>
              
              <h3 className="font-serif italic text-2xl text-gray-900 mb-2">Received!</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Thanks for the note, {userName}.<br/>I'll read it shortly.
              </p>
              <button 
                  onClick={onClose}
                  className="text-xs font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                  Close Notebook
              </button>
          </div>
        )}

      </div>
    </div>
  );
};
