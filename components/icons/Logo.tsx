import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 22c-3-2-5-5-5-8 0-4 3-8 7-8h1" />
    <path d="M11 2h1c4 0 7 4 7 8 0 3-2 6-5 8" />
    <path d="M7 14a5.002 5.002 0 005-5" />
    <path d="M12 12a5.002 5.002 0 005-5" />
  </svg>
);
