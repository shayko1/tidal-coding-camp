import type { APIRoute } from 'astro';
import { collections, items } from '@wix/data';
import { auth } from '@wix/essentials';
import { PROJECTS } from '../../data/projects';

export const prerender = false;

// One-time provisioning endpoint. Creates the CMS collections used by the site
// (CamperProjects gallery + Applications inquiries) and seeds the projects.
// Guarded by a token. Idempotent: skips collections that already exist.
const SETUP_TOKEN = 'tcc-setup-9f3b2a7c1d';

// String literals to avoid any enum-resolution surprises in the bundle.
const camperProjects = {
  _id: 'CamperProjects',
  displayName: 'CamperProjects',
  fields: [
    { key: 'title', displayName: 'Title', type: 'TEXT' },
    { key: 'who', displayName: 'Camper', type: 'TEXT' },
    { key: 'cohort', displayName: 'Cohort', type: 'TEXT' },
    { key: 'year', displayName: 'Year', type: 'NUMBER' },
    { key: 'dataset', displayName: 'Dataset', type: 'TEXT' },
    { key: 'summary', displayName: 'Summary', type: 'TEXT' },
    { key: 'techStack', displayName: 'Tech stack', type: 'ARRAY_STRING' },
  ],
  permissions: { insert: 'ADMIN', update: 'ADMIN', remove: 'ADMIN', read: 'ANYONE' },
};

const applications = {
  _id: 'Applications',
  displayName: 'Applications',
  fields: [
    { key: 'camperFirstName', displayName: 'Camper first name', type: 'TEXT' },
    { key: 'camperAge', displayName: 'Camper age', type: 'NUMBER' },
    { key: 'parentName', displayName: 'Parent name', type: 'TEXT' },
    { key: 'parentEmail', displayName: 'Parent email', type: 'TEXT' },
    { key: 'preferredSession', displayName: 'Preferred session', type: 'TEXT' },
    { key: 'codingExperience', displayName: 'Coding experience', type: 'TEXT' },
    { key: 'parentConsentAcknowledged', displayName: 'Consent acknowledged', type: 'BOOLEAN' },
    { key: 'questionForUs', displayName: 'Question for us', type: 'TEXT' },
    { key: 'submittedAt', displayName: 'Submitted at', type: 'DATETIME' },
    { key: 'status', displayName: 'Status', type: 'TEXT' },
  ],
  // Visitors can submit (insert); only editors can read/manage the inquiries.
  permissions: { insert: 'ANYONE', update: 'ADMIN', remove: 'ADMIN', read: 'ADMIN' },
};

export const GET: APIRoute = async ({ url }) => {
  if (url.searchParams.get('token') !== SETUP_TOKEN) {
    return json({ ok: false, error: 'forbidden' }, 403);
  }
  const forceSeed = url.searchParams.get('seed') === '1';
  const log: Record<string, unknown> = {};

  const create = auth.elevate(collections.createDataCollection);
  const list = auth.elevate(collections.listDataCollections);
  const bulk = auth.elevate(items.bulkInsert);

  let existing: string[] = [];
  try {
    const res: any = await list({});
    existing = (res?.collections ?? res?.dataCollections ?? []).map((c: any) => c._id ?? c.id).filter(Boolean);
    log.existing = existing;
  } catch (e) { log.listError = errMsg(e); }

  for (const c of [camperProjects, applications]) {
    const name = c._id;
    if (existing.includes(name)) { log[name] = 'exists'; continue; }
    try { await create(c as any); log[name] = 'created'; }
    catch (e) { log[name] = 'ERROR: ' + errMsg(e); }
  }

  // Seed CamperProjects (only when just created, or when ?seed=1).
  if (log['CamperProjects'] === 'created' || forceSeed) {
    try {
      const rows = PROJECTS.map((p) => ({
        title: p.title, who: p.who, cohort: p.cohort, year: p.year,
        dataset: p.dataset, summary: p.summary, techStack: p.stack,
      }));
      const r: any = await bulk('CamperProjects', rows);
      log.seed = `inserted ${r?.insertedItemIds?.length ?? r?.results?.length ?? rows.length}`;
    } catch (e) { log.seedError = errMsg(e); }
  }

  return json({ ok: true, log }, 200);
};

function errMsg(e: unknown) {
  if (e instanceof Error) return e.message;
  try { return JSON.stringify(e); } catch { return String(e); }
}
function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data, null, 2), { status, headers: { 'content-type': 'application/json' } });
}
