export function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] dark:opacity-[0.04]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="topo" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0 60 Q30 30 60 60 Q90 90 120 60" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M0 80 Q30 50 60 80 Q90 110 120 80" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M0 40 Q30 10 60 40 Q90 70 120 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>
    </div>
  );
}
