/**
 * Application Environment Configuration
 * Validates and exposes strictly typed environment variables.
 * Never read process.env inline; import `env` from `@/lib/env`.
 */

export interface EnvConfig {
  readonly NEXT_PUBLIC_GA4_MEASUREMENT_ID: string;
  readonly NEXT_PUBLIC_WHATSAPP_NUMBER: string;
  readonly NEXT_PUBLIC_PHONE_NUMBER: string;
  readonly NEXT_PUBLIC_SITE_URL: string;
}

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
  'NEXT_PUBLIC_WHATSAPP_NUMBER',
  'NEXT_PUBLIC_PHONE_NUMBER',
  'NEXT_PUBLIC_SITE_URL',
] as const;

export type RequiredEnvKey = (typeof REQUIRED_ENV_VARS)[number];

export function validateEnv(source: Record<string, string | undefined> = process.env): EnvConfig {
  const missing: RequiredEnvKey[] = [];

  for (const key of REQUIRED_ENV_VARS) {
    const value = source[key];
    if (!value || value.trim() === '') {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[Environment Config Error] Missing required environment variable(s): ${missing.join(
        ', ',
      )}. Please refer to .env.example to configure the environment.`,
    );
  }

  const siteUrl = source.NEXT_PUBLIC_SITE_URL as string;
  try {
    new URL(siteUrl);
  } catch {
    throw new Error(
      `[Environment Config Error] Invalid URL format for NEXT_PUBLIC_SITE_URL: "${siteUrl}". It must include the protocol (e.g. https://lodhiinteriors.com).`,
    );
  }

  return Object.freeze({
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: source.NEXT_PUBLIC_GA4_MEASUREMENT_ID as string,
    NEXT_PUBLIC_WHATSAPP_NUMBER: source.NEXT_PUBLIC_WHATSAPP_NUMBER as string,
    NEXT_PUBLIC_PHONE_NUMBER: source.NEXT_PUBLIC_PHONE_NUMBER as string,
    NEXT_PUBLIC_SITE_URL: siteUrl.replace(/\/$/, ''),
  });
}

// Lazy or eager validation based on execution context
// In build time or client bundle, Next.js inlines NEXT_PUBLIC_* variables.
// Fallback defaults for CI/build environments if not provided during static analysis:
function resolveEnv(): EnvConfig {
  try {
    return validateEnv(process.env);
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      throw error;
    }
    // In build/prerender phase when Next.js may evaluate modules before reading .env
    const fallbackSource: Record<string, string | undefined> = {
      NEXT_PUBLIC_GA4_MEASUREMENT_ID:
        process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-BUILD_FALLBACK',
      NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919131569865',
      NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 91315 69865',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://lodhiinteriors.com',
    };
    return validateEnv(fallbackSource);
  }
}

export const env: EnvConfig = resolveEnv();
