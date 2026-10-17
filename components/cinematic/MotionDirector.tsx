"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const LegacyMotionDirector = dynamic(() => import("./LegacyMotionDirector"), {
  ssr: false,
});

/** The editorial chapters use a small native observer instead of the GSAP runtime. */
export function MotionDirector() {
  const pathname = usePathname();
  if (pathname === "/process" || pathname === "/services") return null;
  return <LegacyMotionDirector />;
}
