import type { APIRoute } from 'astro';

export const prerender = false;

// Fields we accept from the application form (mirrors the "Applications" CMS collection).
const FIELDS = [
  'camperFirstName', 'camperAge', 'parentName', 'parentEmail',
  'preferredSession', 'codingExperience', 'parentConsentAcknowledged', 'questionForUs',
] as const;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Server-side validation — never trust the client.
  const errors: string[] = [];
  const first = String(body.camperFirstName ?? '').trim();
  const age = Number(body.camperAge);
  const parentName = String(body.parentName ?? '').trim();
  const parentEmail = String(body.parentEmail ?? '').trim();
  const session = String(body.preferredSession ?? '').trim();
  const consent = body.parentConsentAcknowledged === true || body.parentConsentAcknowledged === 'on';
  if (!first) errors.push('camperFirstName');
  if (!Number.isFinite(age) || age < 13 || age > 17) errors.push('camperAge');
  if (!parentName) errors.push('parentName');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(parentEmail)) errors.push('parentEmail');
  if (!session) errors.push('preferredSession');
  if (!consent) errors.push('parentConsentAcknowledged');
  if (errors.length) return json({ ok: false, error: 'validation', fields: errors }, 422);

  const record: Record<string, unknown> = {};
  for (const f of FIELDS) record[f] = body[f] ?? null;
  record.camperAge = age;
  record.parentConsentAcknowledged = consent;
  record.submittedAt = new Date().toISOString();
  record.status = 'new';

  try {
    // Insert into the Wix CMS "Applications" collection via the SDK (ambient auth from @wix/astro).
    const { items } = await import('@wix/data');
    await items.insert('Applications', record);
    return json({ ok: true, stored: true }, 200);
  } catch (err) {
    // Collection not created yet, or a transient data error: log for recovery, tell the client to show the fallback.
    console.error('[apply] could not store application:', err instanceof Error ? err.message : err, record);
    return json({ ok: false, error: 'store_failed' }, 502);
  }
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });
}
