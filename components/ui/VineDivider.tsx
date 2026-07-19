export const VineDivider = () => (
  <div className="vine-divider" aria-hidden="true">
    <svg viewBox="0 0 1200 32" preserveAspectRatio="none" fill="none">
      <path
        d="M0 16 C 150 16, 180 4, 300 16 S 450 28, 600 16 S 750 4, 900 16 S 1050 28, 1200 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {[150, 300, 450, 600, 750, 900, 1050].map((x, i) => (
        <circle key={x} cx={x} cy={16 + (i % 2 === 0 ? -1 : 1) * 6} r="3" fill="currentColor" />
      ))}
    </svg>
  </div>
);
