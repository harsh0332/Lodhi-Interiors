import { NextRequest, NextResponse } from 'next/server';

/**
 * In-memory rate limiting tracker
 * Maps IP address to timestamps of recent requests.
 */
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps outside the active window
  const recentTimestamps = timestamps.filter((t) => t > windowStart);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recentTimestamps);
    return true;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction and rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0]?.trim() || 'unknown' : '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            'Submission limit exceeded for this network. Please contact Soumya directly on WhatsApp or telephone.',
        },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request payload. Expected JSON body.' },
        { status: 400 },
      );
    }

    // 2. Honeypot check: reject bot submissions
    if (body._hp_website && body._hp_website.trim() !== '') {
      // Fake success response to misdirect spam bots
      return NextResponse.json({ success: true, redirectUrl: '/thank-you' }, { status: 200 });
    }

    const fieldErrors: Record<string, string> = {};

    // 3. Name validation
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (name.length < 2) {
      fieldErrors.name = 'Full name must contain at least 2 characters.';
    }

    // 4. Indian Mobile Phone validation
    const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const cleanPhone = rawPhone.replace(/[\s\-()]/g, '');
    const indianPhoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    if (!cleanPhone || !indianPhoneRegex.test(cleanPhone)) {
      fieldErrors.phone =
        'Valid 10-digit Indian mobile number required (e.g. 98765 43210 or +91 98765 43210).';
    }

    // 5. Locality validation
    const locality = typeof body.locality === 'string' ? body.locality.trim() : '';
    if (locality.length < 2) {
      fieldErrors.locality = 'Property location required (e.g. Arera Colony, Bhopal).';
    }

    // 6. Project Type validation
    const validProjectTypes = [
      'Home interiors',
      'Luxury home or villa',
      'Modular kitchen',
      'Office',
      'Retail or showroom',
      'Restaurant or hospitality',
      'Other',
    ];
    const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
    if (!projectType || !validProjectTypes.includes(projectType)) {
      fieldErrors.projectType = 'Select a valid project typology from the list.';
    }

    // 7. Scope validation
    const validScopes = ['Design only', 'Design and execution (turnkey)', 'Not sure yet'];
    const scope = typeof body.scope === 'string' ? body.scope.trim() : '';
    if (!scope || !validScopes.includes(scope)) {
      fieldErrors.scope = 'Select a project scope.';
    }

    // 8. Start Timeline validation
    const validTimelines = ['Immediately', 'Within 3 months', 'Later this year', 'Just exploring'];
    const startTimeline = typeof body.startTimeline === 'string' ? body.startTimeline.trim() : '';
    if (!startTimeline || !validTimelines.includes(startTimeline)) {
      fieldErrors.startTimeline = 'Select an intended project start timeline.';
    }

    // 9. Budget Range validation
    const validBudgets = [
      '₹15L — ₹30L',
      '₹30L — ₹60L',
      '₹60L — ₹1.2 Cr',
      '₹1.2 Cr+',
      'Prefer to discuss',
    ];
    const budgetRange = typeof body.budgetRange === 'string' ? body.budgetRange.trim() : '';
    if (!budgetRange || !validBudgets.includes(budgetRange)) {
      fieldErrors.budgetRange = 'Select an indicative budget range.';
    }

    // 10. Optional Email validation
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = 'Enter a valid email address or leave blank.';
    }

    // Return field validation errors if any exist
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: 'Please correct the highlighted fields before proceeding.',
          fieldErrors,
        },
        { status: 400 },
      );
    }

    const payload = {
      name,
      phone: cleanPhone,
      preferWhatsApp: Boolean(body.preferWhatsApp),
      email: email || undefined,
      projectType,
      locality,
      scope,
      areaSqft: body.areaSqft ? String(body.areaSqft).trim() : undefined,
      startTimeline,
      budgetRange,
      notes: body.notes ? String(body.notes).trim() : undefined,
      ip,
      submittedAt: new Date().toISOString(),
    };

    // 11. Dispatch notifications (Studio Email & CRM Webhook)
    console.log('[Lodhi Interiors Lead Captured]:', {
      name: payload.name,
      phone: payload.phone,
      projectType: payload.projectType,
      locality: payload.locality,
      budgetRange: payload.budgetRange,
      submittedAt: payload.submittedAt,
    });

    // If external CRM or webhook is configured:
    if (process.env.CRM_WEBHOOK_URL) {
      try {
        await fetch(process.env.CRM_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (webhookErr) {
        console.error('[Webhook Dispatch Error]:', webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        redirectUrl: '/thank-you',
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('[API Contact Error]:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please message Soumya directly on WhatsApp.' },
      { status: 500 },
    );
  }
}
