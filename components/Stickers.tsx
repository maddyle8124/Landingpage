import React from 'react';
import { CONFIG } from './Config';

const BASE_URL = CONFIG.baseImageURL;

export const FlowerSticker = ({ className }: { className?: string }) => (
  <img 
    src={`${BASE_URL}/1.png`} 
    alt="Flower Sticker" 
    className={`${className} object-contain`}
  />
);

export const BitcoinSticker = ({ className }: { className?: string }) => (
  <img 
    src={`${BASE_URL}/2.png`} 
    alt="Bitcoin Sticker" 
    className={`${className} object-contain`}
    onError={(e) => {
      e.currentTarget.style.display = 'none'; 
    }}
  />
);

export const HeadphoneSticker = ({ className }: { className?: string }) => (
  <img 
    src={`${BASE_URL}/3.png`} 
    alt="Headphone Sticker" 
    className={`${className} object-contain`}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
);

export const CameraSticker = ({ className }: { className?: string }) => (
  <img 
    src={`${BASE_URL}/4.png`} 
    alt="Camera Sticker" 
    className={`${className} object-contain`}
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
);