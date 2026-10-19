interface ContactEnvironment {
  N8N_CONTACT_WEBHOOK_URL: string;
  CF_ACCESS_CLIENT_ID: string;
  CF_ACCESS_CLIENT_SECRET: string;
}

interface PagesFunctionContext {
  request: Request;
  env: ContactEnvironment;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  b_address?: unknown;
}

const maxRequestBytes = 16_384;
const maxNameLength = 100;
const maxEmailLength = 254;
const maxMessageLength = 5_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, string | boolean>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function isConfigured(env: ContactEnvironment) {
  return Boolean(
    env.N8N_CONTACT_WEBHOOK_URL &&
      env.CF_ACCESS_CLIENT_ID &&
      env.CF_ACCESS_CLIENT_SECRET,
  );
}

function isContactPayload(value: unknown): value is ContactPayload {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTrustedOrigin(request: Request) {
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
}

function parseContactPayload(payload: ContactPayload) {
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const honeypot = typeof payload.b_address === 'string' ? payload.b_address.trim() : '';

  if (
    name.length > maxNameLength ||
    email.length > maxEmailLength ||
    message.length > maxMessageLength
  ) {
    return { error: 'One or more fields are too long.' };
  }

  if (!email || !emailPattern.test(email) || !message) {
    return { error: 'Enter a valid email address and message.' };
  }

  return {
    contact: {
      name,
      email,
      message,
      b_address: honeypot,
    },
  };
}

export async function onRequest(context: PagesFunctionContext) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
        'Cache-Control': 'no-store',
      },
    });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  if (!isTrustedOrigin(request)) {
    return json({ error: 'Invalid request origin.' }, 403);
  }

  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return json({ error: 'Unsupported content type.' }, 415);
  }

  const contentLength = Number(request.headers.get('Content-Length'));
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return json({ error: 'Request is too large.' }, 413);
  }

  let payload: unknown;

  try {
    const body = await request.text();

    if (new TextEncoder().encode(body).byteLength > maxRequestBytes) {
      return json({ error: 'Request is too large.' }, 413);
    }

    payload = JSON.parse(body);
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (!isContactPayload(payload)) {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const parsedPayload = parseContactPayload(payload);
  if ('error' in parsedPayload) {
    return json({ error: parsedPayload.error ?? 'Invalid contact details.' }, 400);
  }

  if (parsedPayload.contact.b_address) {
    return json({ ok: true }, 200);
  }

  if (!isConfigured(env)) {
    console.error('Contact endpoint configuration is incomplete.');
    return json({ error: 'Contact delivery is unavailable.' }, 503);
  }

  try {
    const n8nResponse = await fetch(env.N8N_CONTACT_WEBHOOK_URL, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'CF-Access-Client-Id': env.CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': env.CF_ACCESS_CLIENT_SECRET,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedPayload.contact),
    });

    if (!n8nResponse.ok) {
      console.error('n8n contact webhook returned a non-success response.', n8nResponse.status);
      return json({ error: 'Contact delivery is unavailable.' }, 502);
    }
  } catch (error) {
    console.error('n8n contact webhook request failed.', error);
    return json({ error: 'Contact delivery is unavailable.' }, 502);
  }

  return json({ ok: true }, 200);
}
