// src/app/api/generate/route.ts

export async function GET() {
  const webhookUrl = 'https://abdulsaboor.app.n8n.cloud/webhook-test/b6c24eb9-19bd-4e00-a778-fbf93d2a027a';

  try {
    const response = await fetch(webhookUrl, { cache: 'no-store' });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: 'Non-JSON response', text }), {
        status: 500,
      });
    }

    const json = await response.json();
    return new Response(JSON.stringify(json), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch from webhook' }), {
      status: 500,
    });
  }
}
