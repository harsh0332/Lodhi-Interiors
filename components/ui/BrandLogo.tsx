"use client";
import Link from "next/link";
export interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark" | "auto";
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}
export function BrandLogo({
  className = "",
  onClick,
  showTagline = true,
  size = "md",
  tone = "auto",
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`brand brand-animated brand-${size} brand-${tone} ${className}`}
      aria-label="Lodhi Interiors home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none">
          <g
            className="insignia-guides"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path pathLength="1" d="M4 12V4H12" />
            <path pathLength="1" d="M32 4H40V12" />
            <path pathLength="1" d="M40 32V40H32" />
            <path pathLength="1" d="M12 40H4V32" />
          </g>
          <g
            className="insignia-grid"
            stroke="currentColor"
            strokeWidth=".5"
            strokeDasharray="1.5 3"
          >
            <path d="M22 2V42M2 22H42" />
          </g>
          <path
            className="insignia-pillar"
            d="M22 10V34"
            stroke="currentColor"
            strokeWidth="3"
            pathLength="1"
          />
          <path
            className="insignia-beam"
            d="M13 14V33.5H31"
            stroke="currentColor"
            strokeWidth="2.4"
            pathLength="1"
          />
          <circle
            className="insignia-orbit"
            cx="22"
            cy="22"
            r="7"
            stroke="var(--brass)"
            strokeWidth=".75"
          />
          <circle
            className="insignia-node"
            cx="22"
            cy="22"
            r="2.5"
            fill="var(--brass)"
          />
          <path d="M29 32h3v3h-3zM12 12h2v2h-2z" fill="var(--brass)" />
        </svg>
      </span>
      <span className="brand-lockup">
        <span className="brand-name">
          LODHI<span>INTERIORS</span>
        </span>
        <span className="brand-rule" aria-hidden="true" />
        {showTagline && <span className="brand-caption">BY SOUMYA LODHI</span>}
      </span>
    </Link>
  );
}
