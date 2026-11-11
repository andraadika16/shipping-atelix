'use client';

import React from 'react';

export const HeroBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden -z-0 select-none"
    >
      {/* 1. Subtle Grid Pattern Layer */}
      <div
        className="absolute inset-0 w-full h-full opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px)',
          backgroundSize: 'var(--grid-size, 32px 32px)',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, black 35%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, black 35%, transparent 100%)',
        }}
      >
        {/* Responsive grid sizing (32px on mobile, 40px on md/desktop) */}
        <style jsx>{`
          div {
            --grid-size: 32px 32px;
          }
          @media (min-width: 768px) {
            div {
              --grid-size: 40px 40px;
            }
          }
        `}</style>
      </div>

      {/* 2. Gradient Glows (Primary Blue & Secondary Violet) */}
      <div className="absolute inset-0 flex justify-center items-start overflow-hidden">
        {/* Primary Blue Radial Glow behind title */}
        <div
          className="absolute -top-12 md:-top-8 left-1/2 -translate-x-1/2 w-[320px] h-[320px] md:w-[600px] md:h-[600px] rounded-full bg-[#547BFF]/15 md:bg-[#547BFF]/20 blur-2xl md:blur-3xl transform-gpu pointer-events-none motion-reduce:blur-none"
        />

        {/* Secondary Violet-Blue Glow shifted top-right for visual depth */}
        <div
          className="absolute -top-16 md:-top-20 left-[55%] md:left-[58%] -translate-x-1/2 w-[220px] h-[220px] md:w-[420px] md:h-[420px] rounded-full bg-[#7C5CFF]/10 blur-2xl md:blur-3xl transform-gpu pointer-events-none motion-reduce:blur-none"
        />
      </div>

      {/* 3. Logistics Network Nodes & Interconnecting Lines (Desktop only: hidden md:block) */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="netLineGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#547BFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#547BFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#547BFF" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="netLineGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#547BFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#547BFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#547BFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Left Network Constellation */}
        <g className="opacity-90">
          <line
            x1="8%"
            y1="28%"
            x2="18%"
            y2="42%"
            stroke="url(#netLineGradLeft)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <line
            x1="18%"
            y1="42%"
            x2="12%"
            y2="64%"
            stroke="url(#netLineGradLeft)"
            strokeWidth="1.2"
          />
          <line
            x1="18%"
            y1="42%"
            x2="25%"
            y2="52%"
            stroke="url(#netLineGradLeft)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Left Nodes with subtle staggered pulse */}
          <circle cx="8%" cy="28%" r="4" fill="#547BFF" fillOpacity="0.3" />
          <circle
            cx="8%"
            cy="28%"
            r="2"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '0s' }}
          />

          <circle cx="18%" cy="42%" r="5" fill="#547BFF" fillOpacity="0.25" />
          <circle
            cx="18%"
            cy="42%"
            r="2.5"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '1.2s' }}
          />

          <circle cx="12%" cy="64%" r="4" fill="#547BFF" fillOpacity="0.2" />
          <circle
            cx="12%"
            cy="64%"
            r="2"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '2.4s' }}
          />

          <circle cx="25%" cy="52%" r="3.5" fill="#547BFF" fillOpacity="0.25" />
          <circle
            cx="25%"
            cy="52%"
            r="1.8"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '0.6s' }}
          />
        </g>

        {/* Right Network Constellation */}
        <g className="opacity-90">
          <line
            x1="92%"
            y1="32%"
            x2="82%"
            y2="46%"
            stroke="url(#netLineGradRight)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <line
            x1="82%"
            y1="46%"
            x2="88%"
            y2="68%"
            stroke="url(#netLineGradRight)"
            strokeWidth="1.2"
          />
          <line
            x1="82%"
            y1="46%"
            x2="75%"
            y2="54%"
            stroke="url(#netLineGradRight)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Right Nodes with subtle staggered pulse */}
          <circle cx="92%" cy="32%" r="4" fill="#547BFF" fillOpacity="0.3" />
          <circle
            cx="92%"
            cy="32%"
            r="2"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '1.8s' }}
          />

          <circle cx="82%" cy="46%" r="5" fill="#547BFF" fillOpacity="0.25" />
          <circle
            cx="82%"
            cy="46%"
            r="2.5"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '0.4s' }}
          />

          <circle cx="88%" cy="68%" r="4" fill="#547BFF" fillOpacity="0.2" />
          <circle
            cx="88%"
            cy="68%"
            r="2"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '2.8s' }}
          />

          <circle cx="75%" cy="54%" r="3.5" fill="#547BFF" fillOpacity="0.25" />
          <circle
            cx="75%"
            cy="54%"
            r="1.8"
            fill="#547BFF"
            className="animate-node-pulse motion-reduce:animate-none"
            style={{ animationDelay: '1.4s' }}
          />
        </g>
      </svg>
    </div>
  );
};

