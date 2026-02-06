interface IconProps {
  className?: string;
}

function SmartCatalogingIcon({ className }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M17.5 7h.01" />
    </svg>
  );
}

function AIOutfitIcon({ className }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2l4 3 4-3v5l4 3-4 3v5l-4-3-4 3v-5l-4-3 4-3V2z" />
      <path d="M20 5l.8-.8M20 5l-.8-.8M22 7h-1.2" />
    </svg>
  );
}

function WeatherIcon({ className }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="17" cy="7" r="3" />
      <path d="M17 4V2M17 12v-2M21 7h2M12 7h2M20 4l1-1M14 4l-1-1M20 10l1 1M14 10l-1 1" />
      <path d="M6 19a4 4 0 0 1-.88-7.9A5.5 5.5 0 0 1 16 11.1 3 3 0 0 1 16.5 17H6z" />
    </svg>
  );
}

function AnalyticsIcon({ className }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}

function CapsuleIcon({ className }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 10h18" />
      <path d="M8 2v4M16 2v4" />
      <path d="M9 15l2 2 4-4" />
    </svg>
  );
}

export const featureIconMap: Record<string, React.FC<IconProps>> = {
  'smart-cataloging': SmartCatalogingIcon,
  'ai-outfit': AIOutfitIcon,
  'weather': WeatherIcon,
  'analytics': AnalyticsIcon,
  'capsule': CapsuleIcon,
  'calendar': CalendarIcon,
};
