import React from 'react';
import teddyLogo from '../assets/teddy-logo.png';

interface TeddyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TeddyLogo: React.FC<TeddyLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-white rounded-md flex items-center justify-center p-1 overflow-hidden ${className}`}
    >
      <img
        src={teddyLogo}
        alt="Teddy Logo"
        className="w-full h-full object-contain"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </div>
  );
};

export default TeddyLogo;
