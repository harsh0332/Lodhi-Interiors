import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/contact/route';

async function main() {
  const originalFetch = globalThis.fetch;
  const originalWebhook = process.env.CRM_WEBHOOK_URL;
  const payload = {
    name: 'Test enquiry',
    phone: '9876543210',
    locality: 'Bhopal',
    projectType: 'Home interiors',
    scope: 'Design and execution (turnkey)',
    startTimeline: 'Within 3 months',
    budgetRange: 'Prefer to discuss',
    _hp_website: '',
  };
  let address = 0;
  const request = (body: unknown) =>
    new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `192.0.2.${++address}` },
      body: JSON.stringify(body),
    });
  try {
    globalThis.fetch = async () => {
      throw new Error('Unexpected network request');
    };
    delete process.env.CRM_WEBHOOK_URL;
    assert.equal((await POST(request({ ...payload, phone: '123' }))).status, 400);
    assert.equal(
      (await POST(request(payload))).status,
      503,
      'Missing delivery endpoint must not acknowledge success',
    );
    process.env.CRM_WEBHOOK_URL = 'https://example.invalid/test-only';
    globalThis.fetch = async () => new Response('Unavailable', { status: 500 });
    assert.equal((await POST(request(payload))).status, 502, 'Upstream errors must reach the form');
    globalThis.fetch = async () => {
      throw new Error('Network unavailable');
    };
    assert.equal((await POST(request(payload))).status, 502);
    let dispatched = false;
    globalThis.fetch = async (_url, init) => {
      const sent = JSON.parse(String(init?.body));
      assert.equal(sent.name, payload.name);
      assert.equal(sent.phone, payload.phone);
      dispatched = true;
      return new Response('{}', { status: 200 });
    };
    const response = await POST(request(payload));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).success, true);
    assert.equal(dispatched, true);
    console.log(
      'PASS: validation, missing delivery, upstream rejection, network failure, accepted delivery. No external requests sent.',
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (originalWebhook === undefined) delete process.env.CRM_WEBHOOK_URL;
    else process.env.CRM_WEBHOOK_URL = originalWebhook;
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
