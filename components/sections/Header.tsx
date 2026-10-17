"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Arrow } from "@/components/editorial/Elements";
import { env } from "@/lib/env";
export interface HeaderProps {
  initialTone?: "bone" | "charcoal";
}
const links: [string, string][] = [
  ["Work", "/work"],
  ["Studio", "/studio"],
  ["Services", "/services"],
  ["Process", "/process"],
  ["Journal", "/insights"],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    } else dialog.current?.close();
    return undefined;
  }, [open]);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  return (
    <>
      <header
        className={`site-header ${pathname === "/" ? "header-on-film" : "header-on-page"} ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="header-inner">
          <BrandLogo />
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname.startsWith(href) ? "page" : undefined}
              >
                {name}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="header-cta">
            <span className="header-long-label">Start a project</span>
            <span className="header-short-label">Enquire</span>{" "}
            <Arrow diagonal />
          </Link>
          <button
            ref={trigger}
            className="menu-toggle"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="site-menu"
        className="site-menu"
        onCancel={close}
        onClose={() => setOpen(false)}
        aria-label="Main navigation"
      >
        <div className="menu-top">
          <BrandLogo onClick={close} />
          <button autoFocus onClick={close} aria-label="Close navigation menu">
            ×
          </button>
        </div>
        <nav>
          {[...links, ["Contact", "/contact"] as [string, string]].map(
            ([name, href], i) => (
              <Link href={href} key={href} onClick={close}>
                <span className="eyebrow">0{i + 1}</span>
                {name}
                <Arrow diagonal />
              </Link>
            ),
          )}
        </nav>
        <a
          className="menu-contact"
          href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER.replace(/\s/g, "")}`}
        >
          {env.NEXT_PUBLIC_PHONE_NUMBER}
        </a>
        <p className="eyebrow">Bhopal, Madhya Pradesh</p>
      </dialog>
    </>
  );
}
