import { env } from '@/lib/env';

/**
 * Google Analytics 4 typed event helpers.
 * Privacy rule: strictly zero personally identifiable information (PII) tracked.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export function pageview(url: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

export function trackFormStart() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'form_start', {
      form_name: 'project_enquiry',
    });
  }
}

export function trackFormSubmit(projectType: string, budgetBand: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Strictly structural metadata: no names, phones, or emails
    window.gtag('event', 'form_submit', {
      form_name: 'project_enquiry',
      project_type: projectType,
      budget_band: budgetBand,
    });
  }
}

export function trackWhatsAppClick(sourcePage: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', {
      source_page: sourcePage,
    });
  }
}

export function trackCallClick(sourcePage: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'call_click', {
      source_page: sourcePage,
    });
  }
}

export function trackThankYouView() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'thank_you_view', {
      page_location: window.location.href,
    });
  }
}
