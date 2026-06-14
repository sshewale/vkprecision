import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconCheck = (p: IconProps) => (
  <svg {...baseProps} {...p}><polyline points="20 6 9 17 4 12" /></svg>
);

export const IconBuilding = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M9 21V18h6v3" />
  </svg>
);

export const IconHome = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9v11h14V9" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

export const IconFactory = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M3 21V9l5 3V9l5 3V9l5 3V21z" />
    <path d="M7 17h.01M11 17h.01M15 17h.01" />
  </svg>
);

export const IconLand = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M2 20h20" />
    <path d="M4 20l4-9 4 5 3-3 5 7" />
    <circle cx="17" cy="6" r="2" />
  </svg>
);

export const IconBriefcase = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const IconClipboard = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <rect x="4" y="4" width="16" height="18" rx="2" />
    <path d="M9 2h6v4H9z" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export const IconBank = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M3 21h18" />
    <path d="M3 10h18" />
    <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
    <path d="M12 3 3 8h18z" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
    <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M15 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconUser = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </svg>
);

export const IconChart = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconAward = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
  </svg>
);

export const IconEye = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconLayers = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M12 2 2 7l10 5 10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export const IconMapPin = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M12 22s7-7 7-13a7 7 0 0 0-14 0c0 6 7 13 7 13z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.32 1.91.6 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.28 1.85.48 2.81.6A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18" />
    <path d="M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const IconSparkle = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <path d="M12 2v6" />
    <path d="M12 16v6" />
    <path d="M4.93 4.93l4.24 4.24" />
    <path d="M14.83 14.83l4.24 4.24" />
    <path d="M2 12h6" />
    <path d="M16 12h6" />
    <path d="M4.93 19.07l4.24-4.24" />
    <path d="M14.83 9.17l4.24-4.24" />
  </svg>
);

export const IconTarget = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...baseProps} {...p}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

export const IconLinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73a1.78 1.78 0 1 1 0-3.56 1.78 1.78 0 0 1 0 3.56zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.77c1.4-2.59 7-2.78 7 2.48V19z" />
  </svg>
);

export const IconFacebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
