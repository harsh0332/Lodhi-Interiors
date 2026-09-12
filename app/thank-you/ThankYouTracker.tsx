'use client';

import { useEffect } from 'react';
import { trackThankYouView } from '@/lib/analytics';

export function ThankYouTracker() {
  useEffect(() => {
    trackThankYouView();
  }, []);

  return null;
}
