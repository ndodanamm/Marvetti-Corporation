
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  loading?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 50, loading = false }) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className={loading ? "animate-pulse" : ""}
      >
        <defs>
          <clipPath id="m-logo-silhouette">
            <path d="
              M 0,100 
              V 20 
              C 0,8 10,0 22,0 
              H 28 
              V 45 
              L 50,75 
              L 72,45 
              V 0 
              H 78 
              C 90,0 100,8 100,20 
              V 100 
              H 75 
              V 65 
              L 50,95 
              L 25,65 
              V 100 
              H 0 Z
            " />
          </clipPath>
          
          {loading && (
            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="white" stopOpacity="0.4">
                <animate attributeName="offset" values="-1; 2" dur="1.5s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          )}
        </defs>
        
        <g clipPath="url(#m-logo-silhouette)">
          {/* Using brand color #EC1B23 */}
          <rect width="100" height="100" fill="#0A0B2D" />
          <path d="M -10,-10 L 110,-10 L 110,110 Z" fill="#EC1B23" />
          
          {{loading && (
            <rect width="100" height="100" fill="url(#shimmer)" />
          )}}
          
          <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.5" opacity="0.1" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;