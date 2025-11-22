
import React, { useState, useRef, useEffect } from 'react';
import { ExpandIcon, RefreshIcon } from './Icons';
import { FlowerSticker, BitcoinSticker, HeadphoneSticker, CameraSticker } from './Stickers';
import { CompositionNotebookIcon, OpenCompositionNotebookIcon } from './CustomIcons';
import { NotebookModal } from './NotebookModal';
import { CONFIG } from './Config';

// Use Config for Base URL
const BASE_URL = CONFIG.baseImageURL;

type FolderItem = 
  | { id: number; type: 'img'; src: string; alt: string; label: string; component?: never }
  | { id: number; type: 'component'; component: React.ReactNode; alt: string; label: string; src?: never }
  | { id: number; type: 'smart_component'; component: (isOpen: boolean) => React.ReactNode; alt: string; label: string; src?: never };

// Use Config for Sticker Texts
const STICKER_TEXTS = CONFIG.stickerTooltips;

// Wrapper for Stickers to handle Click Tooltips controlled by parent
const StickerTooltipWrapper = ({ 
  id, 
  children, 
  className = "",
  isOpen,
  onToggle,
  placement = 'top'
}: { 
  id: number; 
  children?: React.ReactNode; 
  className?: string;
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
  placement?: 'top' | 'bottom';
}) => {
  const text = STICKER_TEXTS[id] || "";

  return (
    <div 
      className={`relative group ${className} pointer-events-auto cursor-pointer touch-manipulation transition-all duration-300`}
      // High Z-Index when open to prevent overlay by other stickers
      style={{ zIndex: isOpen ? 100 : 'auto' }} 
      onClick={onToggle}
    >
      {/* Sticker Content with Scale Effect */}
      <div className="transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95">
        {children}
      </div>

      {/* Glass Tooltip - Click to Show - 2x Smaller Text (approx 6-7px) */}
      <div 
        className={`
          absolute left-1/2 -translate-x-1/2 
          w-max max-w-[100px]
          bg-white/80 backdrop-blur-md border border-white/50 text-gray-800
          text-[7px] font-medium leading-[1.1] text-center px-2 py-1.5 rounded-lg
          shadow-[0_4px_20px_rgba(0,0,0,0.1)] pointer-events-none
          transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)
          ${placement === 'top' ? 'bottom-full mb-[2px] origin-bottom' : 'top-full mt-[2px] origin-top'}
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : `opacity-0 scale-90 ${placement === 'top' ? 'translate-y-1' : '-translate-y-1'}`}
        `}
      >
        {text}
      </div>
    </div>
  );
};

interface LiquidFolderProps {
  onNavigate: (page: string) => void;
  shouldOpenNotebook?: boolean;
  onNotebookOpened?: () => void;
}

const LiquidFolder: React.FC<LiquidFolderProps> = ({ onNavigate, shouldOpenNotebook, onNotebookOpened }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Track which individual item is focused (hovered or clicked)
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [clickedItemId, setClickedItemId] = useState<number | null>(null);

  // Track active sticker tooltip
  const [activeStickerId, setActiveStickerId] = useState<number | null>(null);
  
  // Modal States
  const [showNameModal, setShowNameModal] = useState(false);
  
  // Ref to track timestamp of last manual interaction (click)
  const lastManualAction = useRef(0);
  
  // Ref to track touch interaction to prevent phantom hover events on mobile
  const isTouchRef = useRef(false);

  // Check for external trigger to open notebook
  useEffect(() => {
    if (shouldOpenNotebook) {
        setShowNameModal(true);
        setIsExpanded(true); // Optionally open folder too
        if (onNotebookOpened) onNotebookOpened();
    }
  }, [shouldOpenNotebook, onNotebookOpened]);

  // Combine hover and click state for the "folder open" effect
  const isFolderOpen = isExpanded || isHovered;
  
  // Logic for individual item focus
  const focusedId = hoveredItemId || clickedItemId;

  const handleFolderMouseEnter = () => {
    // Only set hover if not coming from a touch event (prevents mobile double-tap issue)
    if (!isTouchRef.current) {
        setIsHovered(true);
    }
  };
  
  const handleFolderMouseLeave = () => {
    setIsHovered(false);
    setHoveredItemId(null);
  };
  
  const handleFolderClick = () => {
    // Record timestamp of manual toggle
    lastManualAction.current = Date.now();
    setIsExpanded(!isExpanded);
    // Close any open sticker tooltip when interacting with folder controls
    setActiveStickerId(null); 
  };

  // Global click handler for the container to close tooltips AND folder when clicking away
  const handleBackgroundClick = () => {
    if (activeStickerId !== null) {
      setActiveStickerId(null);
    }
    // Close folder if open and background is clicked
    if (isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleStickerToggle = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent closing immediately
    // Toggle: if active, close it; if not, set it active
    setActiveStickerId(prev => prev === id ? null : id);
  };

  // Device orientation handling for mobile tilt
  useEffect(() => {
      const handleOrientation = (event: DeviceOrientationEvent) => {
          // Safety check for manual override
          // If user manually clicked in the last 2 seconds, ignore tilt to prevent fighting
          if (Date.now() - lastManualAction.current < 2000) return;

          const beta = event.beta; // Front-to-back tilt in degrees
          if (beta === null) return;
          
          // If phone is held upright (beta > 45), open folder
          if (beta > 45 && !isExpanded) {
              setIsExpanded(true);
          } 
          // If phone is flat (beta < 25), close folder
          else if (beta < 25 && isExpanded) {
              setIsExpanded(false);
          }
      };

      // Check if permission is needed (iOS 13+)
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          window.addEventListener('deviceorientation', handleOrientation);
      } else {
          window.addEventListener('deviceorientation', handleOrientation);
      }

      return () => {
          window.removeEventListener('deviceorientation', handleOrientation);
      };
  }, [isExpanded]);


  // Data for the 3D icons that will pop out (Main Items)
  // Using labels from CONFIG
  const items: FolderItem[] = [
    { 
      id: 1, 
      src: "https://img.icons8.com/3d-fluency/375/instagram-new.png", 
      alt: "Instagram",
      label: CONFIG.mainIconLabels.instagram,
      type: "img"
    },
    { 
      id: 2, 
      src: "https://img.icons8.com/3d-fluency/375/linkedin.png", 
      alt: "LinkedIn",
      label: CONFIG.mainIconLabels.linkedin,
      type: "img"
    },
    { 
      id: 3, 
      src: "https://maddyleescorner.wordpress.com/wp-content/uploads/2025/11/11.png",
      alt: "Smiley",
      label: CONFIG.mainIconLabels.smiley,
      type: "img"
    },
    { 
      id: 4, 
      src: "https://img.icons8.com/3d-fluency/375/wordpress.png", 
      alt: "Wordpress",
      label: CONFIG.mainIconLabels.wordpress,
      type: "img"
    },
    { 
      id: 5, 
      component: (isOpen: boolean) => isOpen ? 
        <OpenCompositionNotebookIcon className="w-full h-full scale-110" /> : 
        <CompositionNotebookIcon className="w-full h-full" />,
      alt: "Notebook",
      label: CONFIG.mainIconLabels.notebook,
      type: "smart_component"
    },
  ];

  // Decorative floating elements (5.png - 9.png)
  const decorativeItems = [
    { id: 5, src: `${BASE_URL}/5.png`, size: 'w-16 h-16', delay: '0s' },
    { id: 6, src: `${BASE_URL}/6.png`, size: 'w-24 h-24', delay: '1s' },
    { id: 7, src: `${BASE_URL}/7.png`, size: 'w-16 h-16', delay: '2.5s' },
    { id: 8, src: `${BASE_URL}/8.png`, size: 'w-28 h-28', delay: '1.5s' },
    { id: 9, src: `${BASE_URL}/9.png`, size: 'w-20 h-20', delay: '0.5s' },
  ];

  return (
    <div 
        className="relative w-full bg-black/5 backdrop-blur-xl border border-white/20 rounded-[50px] p-6 sm:p-8 shadow-2xl overflow-visible transition-all duration-300 flex flex-col scale-90 sm:scale-100 origin-top ring-1 ring-white/10"
        onClick={handleBackgroundClick} 
    >
      
      {/* Main Interactive Area */}
      <div 
        className="relative w-full h-[340px] sm:h-[380px] flex items-center justify-center cursor-pointer perspective-1000 mt-4 sm:mt-8"
        onMouseEnter={handleFolderMouseEnter}
        onMouseLeave={handleFolderMouseLeave}
        onTouchStart={() => { isTouchRef.current = true; }}
        onMouseMove={() => { isTouchRef.current = false; }} // Reset on mouse move to allow hybrid use
        onClick={(e) => {
            e.stopPropagation();
            
            // iOS Permission Request for Orientation
            if (typeof DeviceOrientationEvent !== 'undefined' && 
                typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                (DeviceOrientationEvent as any).requestPermission()
                    .then((response: string) => {
                         if (response === 'granted') {
                             // Permission granted
                         }
                    })
                    .catch(console.error);
            }

            handleFolderClick();
        }}
      >
        
        {/* --- Folder Back Plate [Z-0] --- */}
        <div 
          className={`
            absolute top-24 w-56 sm:w-64 h-40 sm:h-48 bg-white/20 backdrop-blur-md rounded-3xl border border-white/20 shadow-inner transform transition-all duration-500 origin-bottom z-[0]
            ${isFolderOpen ? 'translate-y-4 scale-95' : ''}
          `}
        ></div>

        {/* --- Decorative Items Stack (Upper Part) [Z-15] --- */}
        {/* Set to Z-15 so they are BEHIND main icons (Z-20+) but VISIBLE */}
        <div className="absolute inset-0 flex items-center justify-center top-16 pointer-events-none">
            {decorativeItems.map((item, index) => {
                let transformClass = "";
                
                // Arc Distribution - Moving Upwards by adding -15px to Y axis logic (more negative)
                switch(index) {
                    case 0: // Far Left (PNG 5)
                        transformClass = isFolderOpen ? "translate-x-[-120px] translate-y-[-170px] -rotate-12 opacity-100 scale-100" : "translate-y-0 opacity-0";
                        break;
                    case 1: // Mid Left (PNG 6)
                        transformClass = isFolderOpen ? "translate-x-[-60px] translate-y-[-200px] -rotate-6 opacity-100 scale-110" : "translate-y-0 opacity-0";
                        break;
                    case 2: // Center High (PNG 7)
                        transformClass = isFolderOpen ? "translate-x-0 translate-y-[-225px] rotate-0 opacity-100 scale-110" : "translate-y-0 opacity-0";
                        break;
                    case 3: // Mid Right (PNG 8)
                        transformClass = isFolderOpen ? "translate-x-[60px] translate-y-[-210px] rotate-6 opacity-100 scale-110" : "translate-y-0 opacity-0";
                        break;
                    case 4: // Far Right (PNG 9)
                        transformClass = isFolderOpen ? "translate-x-[120px] translate-y-[-190px] rotate-12 opacity-100 scale-100" : "translate-y-0 opacity-0";
                        break;
                }

                return (
                    <div 
                        key={item.id}
                        // Z-15 to sit behind main icons (Z-20)
                        className={`absolute ${item.size} transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) z-[15] ${transformClass}`}
                    >
                        <div className="w-full h-full animate-float" style={{ animationDelay: item.delay }}>
                            <StickerTooltipWrapper 
                                id={item.id} 
                                className="w-full h-full"
                                isOpen={activeStickerId === item.id}
                                onToggle={(e) => handleStickerToggle(e, item.id)}
                                placement="top"
                            >
                                <img 
                                    src={item.src} 
                                    alt="Decorative Sticker" 
                                    className="w-full h-full object-contain drop-shadow-lg opacity-90"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </StickerTooltipWrapper>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* --- The Main Items Stack [Z-20 to Z-30] --- */}
        <div className="absolute inset-0 flex items-center justify-center top-16 pointer-events-none">
          {items.map((item, index) => {
            const isItemFocused = focusedId === item.id;
            const isSmiley = item.id === 3;
            
            // Tighter grouping for overlap
            let baseX = 0;
            let baseY = 0;
            let baseRot = 0;
            
            // Initial stacking order for the fan
            let baseZIndex = 20; 

            switch(index) {
                case 0: // Instagram (Left)
                    baseX = -125; baseY = -70; baseRot = -25; 
                    baseZIndex = 20; 
                    break;
                case 1: // LinkedIn (Mid-Left)
                    baseX = -65;  baseY = -100; baseRot = -12; 
                    baseZIndex = 25;
                    break;
                case 2: // Smiley (Center)
                    baseX = 0;    baseY = -120; baseRot = 0; 
                    baseZIndex = 30;
                    break;
                case 3: // Wordpress (Mid-Right)
                    baseX = 65;   baseY = -100; baseRot = 12; 
                    baseZIndex = 25;
                    break;
                case 4: // Notebook (Right)
                    baseX = 125;  baseY = -70;  baseRot = 25; 
                    baseZIndex = 20;
                    break;
            }

            // Dynamic Interaction Logic
            let offsetX = 0;
            let offsetY = 0;
            let scale = 1;
            let opacity = isFolderOpen ? 1 : 0.9; // High opacity when closed
            let blur = isFolderOpen ? 'none' : 'blur(0px)';

            // Increase base size for smiley specifically
            if (isSmiley) scale = 1.25;

            let zIndex = baseZIndex; 

            if (isFolderOpen && focusedId) {
                if (isItemFocused) {
                    // TARGET ITEM: Pops to front (Swapping Order) without excessive zoom
                    scale = isSmiley ? 1.4 : 1.15; 
                    zIndex = 50; // Top priority
                    offsetY = -15; // Gentle lift
                } else {
                    // NEIGHBOR ITEMS: Slight push away, standard scale
                    const focusedIndex = items.findIndex(i => i.id === focusedId);
                    const dist = index - focusedIndex;
                    
                    // Separation logic: Neighboring scale increased from 0.95 to 1.15 if focusing on Smiley
                    offsetX = dist > 0 ? 15 : -15;
                    scale = isSmiley ? 1.15 : 0.95; 
                    zIndex = baseZIndex; // Keep original relative depth
                }
            } else if (!isFolderOpen) {
                // CLOSED STATE: Enhanced Visibility Logic
                // Only obscure slightly if it's behind others
                if (index === 0 || index === 4) {
                    opacity = 0.9; // Outer items visible
                }
                if (index === 1 || index === 3 || index === 2) {
                    blur = 'blur(2px)'; // Slight blur for inner items behind glass
                    opacity = 0.9;
                }
            }

            // Closed state: stacked loosely inside the folder (translated down)
            // UPDATED: Lifted higher (0px) and scaled up (0.8) with spread rotation
            const finalTransform = isFolderOpen 
                ? `translate(${baseX + offsetX}px, ${baseY + offsetY}px) rotate(${baseRot}deg) scale(${scale})`
                : `translateY(0px) rotate(${(index - 2) * 10}deg) scale(0.8)`;

            return (
              <div 
                key={item.id}
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHoveredItemId(item.id);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    if (hoveredItemId === item.id) setHoveredItemId(null);
                }}
                onClick={(e) => {
                    e.stopPropagation(); 
                    
                    // If folder is closed, clicking any item should just open the folder
                    if (!isFolderOpen) {
                        handleFolderClick();
                        return;
                    }

                    // Also close any sticker if we interact with icons
                    setActiveStickerId(null);
                    
                    // Special handling for Notebook (ID 5)
                    if (item.id === 5) {
                      setShowNameModal(true);
                    } 
                    // Special handling for Smiley (ID 3) - Navigate to About Page
                    else if (item.id === 3) {
                        onNavigate('about');
                    }
                    // Special handling for External Links
                    else if (item.id === 1) {
                         window.open(CONFIG.socialUrls.instagram, '_blank');
                    }
                    else if (item.id === 2) {
                         window.open(CONFIG.socialUrls.linkedin, '_blank');
                    }
                    else if (item.id === 4) {
                         window.open(CONFIG.socialUrls.wordpress, '_blank');
                    }
                    else {
                      setClickedItemId(clickedItemId === item.id ? null : item.id);
                    }
                }}
                className={`
                  absolute w-24 h-24 sm:w-28 sm:h-28
                  transition-all duration-500 cubic-bezier(0.25, 0.8, 0.25, 1)
                  pointer-events-auto cursor-pointer
                `}
                style={{
                   transform: finalTransform,
                   zIndex: zIndex,
                   opacity: opacity,
                   filter: blur,
                }}
              >
                 {/* Hover Label - GLASS EFFECT - ONLY SHOWS ON HOVER (NOT CLICK) */}
                 <div 
                    className={`
                      absolute -top-12 left-1/2 -translate-x-1/2 
                      bg-white/60 backdrop-blur-md border border-white/40 text-gray-900
                      text-[10px] sm:text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full 
                      whitespace-nowrap shadow-xl z-50
                      transition-all duration-300 delay-75
                      ${(hoveredItemId === item.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                    `}
                 >
                   {item.label}
                 </div>

                {item.type === 'component' ? (
                    item.component
                ) : item.type === 'smart_component' ? (
                    item.component(isItemFocused)
                ) : (
                    <img 
                        src={item.src} 
                        alt={item.alt} 
                        className="w-full h-full object-contain drop-shadow-2xl" 
                        draggable={false}
                    />
                )}
              </div>
            );
          })}
        </div>

        {/* --- The Front Glass Folder [Z-40] --- */}
        <div className="relative z-[40] w-56 sm:w-64 h-40 sm:h-48 mt-24 pointer-events-none">
          <div 
            className={`
              relative w-full h-full 
              rounded-3xl 
              bg-gradient-to-br from-white/30 via-white/10 to-transparent
              backdrop-blur-[2px]
              border border-white/30
              shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
              flex flex-col items-center justify-center
              transition-all duration-500 ease-out
              transform origin-bottom
              ${isFolderOpen ? 'rotate-x-12 translate-y-6' : ''}
            `}
          >
             <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay rounded-3xl pointer-events-none"></div>
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl pointer-events-none"></div>

             {/* --- Stickers on Front --- */}
             {/* Flower (PNG 1): Top Right Corner */}
             <div className={`absolute -top-10 -right-8 w-28 h-28 sm:w-32 sm:h-32 transform rotate-12 transition-transform duration-300 ${isFolderOpen ? 'scale-105' : ''}`}>
                <div className="w-full h-full animate-float" style={{ animationDelay: '0s' }}>
                   <StickerTooltipWrapper 
                      id={1} 
                      className="w-full h-full"
                      isOpen={activeStickerId === 1}
                      onToggle={(e) => handleStickerToggle(e, 1)}
                  >
                      <FlowerSticker className="w-full h-full drop-shadow-md" />
                   </StickerTooltipWrapper>
                </div>
             </div>
             
             {/* Headphone (PNG 3): Top Left (Resized & Moved Up for Separation) */}
             <div className={`absolute -top-4 -left-2 w-14 h-14 sm:w-16 sm:h-16 transform -rotate-12 transition-transform duration-300 ${isFolderOpen ? 'scale-105' : ''}`}>
                <div className="w-full h-full animate-float" style={{ animationDelay: '1.2s' }}>
                   <StickerTooltipWrapper 
                      id={3} 
                      className="w-full h-full"
                      isOpen={activeStickerId === 3}
                      onToggle={(e) => handleStickerToggle(e, 3)}
                   >
                      <HeadphoneSticker className="w-full h-full drop-shadow-md" />
                   </StickerTooltipWrapper>
                </div>
             </div>
             
             {/* Camera (PNG 4): Bottom Left (Resized & Moved Down for Separation) */}
             <div className={`absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 transform rotate-6 transition-transform duration-300 ${isFolderOpen ? 'scale-105' : ''}`}>
                 <div className="w-full h-full animate-float" style={{ animationDelay: '0.5s' }}>
                   <StickerTooltipWrapper 
                      id={4} 
                      className="w-full h-full"
                      isOpen={activeStickerId === 4}
                      onToggle={(e) => handleStickerToggle(e, 4)}
                   >
                      <CameraSticker className="w-full h-full drop-shadow-md" />
                   </StickerTooltipWrapper>
                 </div>
             </div>
             
             {/* Bitcoin (PNG 2): Bottom Right Corner */}
             <div className={`absolute bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 transform rotate-12 transition-transform duration-300 ${isFolderOpen ? 'scale-105' : ''}`}>
                 <div className="w-full h-full animate-float" style={{ animationDelay: '2s' }}>
                   <StickerTooltipWrapper 
                      id={2} 
                      className="w-full h-full"
                      isOpen={activeStickerId === 2}
                      onToggle={(e) => handleStickerToggle(e, 2)}
                   >
                      <BitcoinSticker className="w-full h-full drop-shadow-md" />
                   </StickerTooltipWrapper>
                 </div>
             </div>

          </div>
        </div>

      </div>

      {/* Footer Section: Title + Text + Controls */}
      <div className="mt-4 sm:mt-8 flex flex-col items-center text-center z-50 relative pb-2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight drop-shadow-sm">
          Welcome, It's <span className="font-serif italic font-normal">Maddy</span>
        </h2>
        <div className="mt-2 mb-6 px-4">
             <p className="text-white text-xs sm:text-sm font-medium bg-white/20 px-6 py-3 rounded-2xl border border-white/30 max-w-sm leading-relaxed backdrop-blur-sm shadow-lg">
                {CONFIG.description}
            </p>
        </div>

        {/* Controls */}
        <div className="w-full flex items-center justify-between px-4">
            <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors bg-white/20 text-white backdrop-blur-sm shadow-sm border border-white/10`}>
            5 items
            </div>
            
            <div className="flex gap-4 text-white/80">
                <button 
                onClick={(e) => {
                    e.stopPropagation();
                    handleFolderClick();
                }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors hover:text-white"
                >
                    <ExpandIcon className={`w-5 h-5 transition-transform duration-300 ${isFolderOpen ? 'rotate-180' : ''}`} />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors hover:text-white">
                    <RefreshIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>

      {/* Notebook Modal */}
      <NotebookModal 
         isOpen={showNameModal} 
         onClose={() => setShowNameModal(false)} 
      />

    </div>
  );
};

export default LiquidFolder;
