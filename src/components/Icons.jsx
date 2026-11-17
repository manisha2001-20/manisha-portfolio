const base = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const GitHubIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none" viewBox="0 0 24 24">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
export const LinkedInIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none" viewBox="0 0 24 24">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)
export const MailIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>)
export const DownloadIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" /></svg>)
export const ArrowIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>)
export const ExternalIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>)
export const CloseIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>)
export const MenuIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>)
export const CapIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c0 1 2.7 3 6 3s6-2 6-3v-5" /></svg>)
export const AwardIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></svg>)
export const PinIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>)
export const CopyIcon = (p) => (<svg {...base} {...p} viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></svg>)
