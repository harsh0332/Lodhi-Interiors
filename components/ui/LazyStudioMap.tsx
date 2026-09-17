'use client';

import React from 'react';
import { env } from '@/lib/env';

export const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/vUjqWdot6fNntShv9';
export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.258839846879!2d77.4506303!3d23.279524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa2d32a3da72a8083%3A0x67edecd563e96895!2sLodhi%20Interiors!5e0!3m2!1sen!2sin!4v1789661850000';

export function LazyStudioMap() {
  return (
    <div className="flex h-full flex-col border border-greige/30 bg-bone p-6 sm:p-8">
      {/* Top Header with Google Maps Verified Pill */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          Studio Headquarters
        </span>
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[0.6875rem] font-medium text-accent transition-colors hover:bg-accent/20"
          title="Open in Google Maps"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Google Maps Location
        </a>
      </div>

      <h3 className="mb-3 font-serif text-[1.5rem] font-medium text-charcoal">
        Lodhi Interiors Bhopal
      </h3>

      <address className="mb-4 space-y-1 font-sans text-[0.9375rem] not-italic leading-relaxed text-charcoal/85">
        <p className="font-medium text-charcoal">Shop No 10, Sagar High Street,</p>
        <p>Near Dmart, Ayodhya Bypass Road,</p>
        <p>Bhopal, Madhya Pradesh 462021</p>
      </address>

      {/* Quick Action Contacts */}
      <div className="mb-5 flex flex-wrap gap-2.5">
        <a
          href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
          className="inline-flex items-center gap-1.5 border border-greige/30 bg-paper/60 px-3 py-1.5 font-mono text-xs text-charcoal transition-colors hover:border-charcoal hover:bg-paper"
        >
          <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {env.NEXT_PUBLIC_PHONE_NUMBER}
        </a>
        <a
          href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border border-greige/30 bg-paper/60 px-3 py-1.5 font-mono text-xs text-charcoal transition-colors hover:border-[#25D366] hover:bg-paper"
        >
          <span className="h-2 w-2 rounded-full bg-[#25D366]" />
          WhatsApp
        </a>
      </div>

      <div className="mb-5 space-y-1.5 border-t border-greige/20 pt-3.5 font-sans text-xs text-charcoal/80">
        <div className="flex justify-between">
          <span className="text-greige">Studio Hours:</span>
          <span className="font-medium text-charcoal">Mon — Sat: 10 AM — 7 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-greige">Sunday:</span>
          <span>By prior appointment</span>
        </div>
      </div>

      {/* Embedded Interactive Google Map */}
      <div className="relative mt-auto w-full overflow-hidden border border-greige/30 bg-paper">
        <div className="aspect-[16/11] w-full">
          <iframe
            title="Lodhi Interiors Bhopal Google Maps"
            src={GOOGLE_MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full grayscale-[15%] contrast-[1.05] transition-all duration-300 hover:grayscale-0"
          />
        </div>

        {/* Bottom Action Bar: Open Google Maps Navigation */}
        <div className="border-t border-greige/20 bg-bone/95 p-3 sm:p-3.5 backdrop-blur-sm">
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 bg-charcoal px-4 py-2.5 font-sans text-xs font-medium text-bone transition-all duration-200 hover:bg-charcoal-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Get Directions on Google Maps</span>
            </span>
            <span className="font-mono text-accent text-sm">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
