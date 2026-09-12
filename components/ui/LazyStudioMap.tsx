'use client';

import React, { useState } from 'react';
import { env } from '@/lib/env';

export function LazyStudioMap() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Google Maps embed URL centered near Capital Petrol Pump, Bhopal
  const mapEmbedSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.082596541604!2d77.4126!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzM1LjYiTiA3N8KwMjQnNDUuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin';

  return (
    <div className="flex h-full flex-col border border-greige/30 bg-bone p-6 md:p-8">
      <span className="mb-2 block font-mono text-ui-label font-medium uppercase tracking-wider text-accent">
        Studio Headquarters
      </span>
      <h3 className="mb-4 font-serif text-[1.375rem] font-normal text-charcoal">
        Lodhi Interiors Bhopal
      </h3>

      <address className="mb-6 space-y-1 font-sans text-[0.9375rem] not-italic leading-relaxed text-charcoal/85">
        <p>Plot No 02, near Capital Petrol Pump,</p>
        <p>Bhopal, Madhya Pradesh 462023</p>
        <p className="pt-2">
          <a
            href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
            className="font-mono text-charcoal transition-colors hover:text-accent"
          >
            {env.NEXT_PUBLIC_PHONE_NUMBER}
          </a>
        </p>
      </address>

      <div className="mb-6 space-y-1 border-t border-greige/20 pt-4 font-sans text-xs text-charcoal/80">
        <div className="flex justify-between">
          <span className="text-greige">Monday — Saturday</span>
          <span>10:00 AM — 7:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-greige">Sunday</span>
          <span>By prior appointment</span>
        </div>
      </div>

      {/* Embedded Map: Loaded Strictly on Interaction to Protect LCP */}
      <div className="relative mt-auto flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden border border-greige/20 bg-paper p-6 text-center">
        {isMapLoaded ? (
          <iframe
            title="Lodhi Interiors Bhopal Studio Map"
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[0.8125rem] text-greige">
              Coordinates: 23.2599° N, 77.4126° E
            </span>
            <button
              type="button"
              onClick={() => setIsMapLoaded(true)}
              className="rounded-sm bg-charcoal px-4 py-2.5 font-sans text-xs text-bone transition-colors hover:bg-charcoal-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Load interactive studio map
            </button>
            <span className="font-sans text-[0.8125rem] text-greige/80">
              Interactive map loads only on request to maintain fast page speed.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
