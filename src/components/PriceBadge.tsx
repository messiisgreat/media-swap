import React, { ReactNode } from 'react';

type PriceBadgeProps = {
  children: ReactNode;
  className?: string;
};

const PriceBadge: React.FC<PriceBadgeProps> = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <svg
        width="60"
        height="24"
        viewBox="0 0 60 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.03125 0C-1.07332 0 -1.96875 0.895431 -1.96875 2V22.6094C-1.96875 23.7139 -1.07332 24.6094 0.0312489 24.6094H48.5313H50.0313C50.4923 24.6094 50.9169 24.4534 51.2552 24.1913C55.7336 22.7854 59.0313 17.9964 59.0313 12.3047C59.0313 6.61301 55.7336 1.82393 51.2552 0.418091C50.9169 0.155999 50.4923 0 50.0313 0H48.5313H0.03125Z"
          fill="#171A1F"
          fillOpacity="0.41"
        />
      </svg>
      <div className="absolute left-1 top-0 z-10 text-white">
        {children}
      </div>
    </div>
  );
};

export default PriceBadge;
