import React from "react";

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle/Ring */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-30" />
      
      {/* V and H Monogram */}
      <g className="text-brass">
        {/* V */}
        <path
          d="M30 35L50 75L70 35"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          fill="none"
        />
        {/* H */}
        <path
          d="M40 45V65M60 45V65M40 55H60"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          fill="none"
        />
      </g>
      
      {/* Decorative Accents */}
      <path d="M45 25L50 20L55 25" stroke="#c5a059" strokeWidth="1" fill="none" />
      <path d="M45 80L50 85L55 80" stroke="#c5a059" strokeWidth="1" fill="none" />
    </svg>
  );
};
