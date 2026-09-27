import React from 'react';

interface PorzuuLogoProps {
  className?: string;
  size?: number;
}

export const PorzuuLogo: React.FC<PorzuuLogoProps> = ({ className = 'w-10 h-10', size }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Porzuu Logo"
    >
      {/* Outer black stroke outline */}
      <path
        d="M 100 16
           C 107 28, 114 44, 120 54
           C 126 44, 142 28, 154 30
           C 157 32, 160 55, 158 84
           C 178 100, 186 124, 182 148
           C 176 174, 148 188, 100 188
           C 52 188, 24 174, 18 148
           C 14 124, 22 100, 42 84
           C 40 55, 43 32, 46 30
           C 58 28, 74 44, 80 54
           C 86 44, 93 28, 100 16 Z"
        fill="#000000"
      />
      {/* Inner white contour */}
      <path
        d="M 100 24
           C 106 35, 113 49, 118 58
           C 125 48, 139 34, 149 36
           C 152 40, 154 62, 152 87
           C 170 102, 176 123, 173 144
           C 168 166, 143 178, 100 178
           C 57 178, 32 166, 27 144
           C 24 123, 30 102, 48 87
           C 46 62, 48 40, 51 36
           C 61 34, 75 48, 82 58
           C 87 49, 94 35, 100 24 Z"
        fill="#FFFFFF"
      />
      {/* Core Porzuu Body: Vibrant Pink */}
      <path
        d="M 100 32
           C 105 42, 111 54, 116 62
           C 123 52, 136 40, 144 42
           C 147 46, 148 68, 146 90
           C 162 104, 166 122, 163 140
           C 158 158, 136 168, 100 168
           C 64 168, 42 158, 37 140
           C 34 122, 38 104, 54 90
           C 52 68, 53 46, 56 42
           C 64 40, 77 52, 84 62
           C 89 54, 95 42, 100 32 Z"
        fill="#E02B69"
      />
      {/* Left Vertical Eye */}
      <ellipse cx="80" cy="118" rx="8" ry="21" fill="#FFFFFF" />
      {/* Right Vertical Eye */}
      <ellipse cx="120" cy="118" rx="8" ry="21" fill="#FFFFFF" />
    </svg>
  );
};
