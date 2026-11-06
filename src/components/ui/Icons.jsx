// Small inline SVG icons (no icon library needed).
const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const RobotIcon = ({ className = "h-5 w-5" }) => (
  <svg {...base} className={className}>
    <path d="M12 3v2" />
    <circle cx="12" cy="2.5" r="1" fill="currentColor" stroke="none" />
    <rect x="4" y="5" width="16" height="14" rx="4" />
    <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
    <path d="M9 15c1.5 1 4.5 1 6 0" />
    <path d="M4 10H2.5M20 10h1.5" />
  </svg>
);

export const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const MenuIcon = ({ className = "h-5 w-5" }) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const SearchIcon = ({ className = "h-5 w-5" }) => (
  <svg {...base} strokeWidth={2} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const PencilIcon = ({ className = "h-4 w-4" }) => (
  <svg {...base} className={className}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
    <path d="m13.5 6.5 4 4" />
  </svg>
);

export const TrashIcon = ({ className = "h-4 w-4" }) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M10 11v6M14 11v6" />
    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
);

export const PlusIcon = ({ className = "h-4 w-4" }) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
