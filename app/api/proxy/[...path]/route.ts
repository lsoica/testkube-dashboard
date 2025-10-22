import { NextRequest, NextResponse } from 'next/server';

/**
 * API Proxy Route
 *
 * This route proxies all requests to the Testkube agent to avoid CORS issues.
 * Requests from the browser go to: /api/proxy/* and are forwarded to the agent.
 */

const DEFAULT_AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL || 'http://localhost:8088/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('GET', request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('POST', request, params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('PUT', request, params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('DELETE', request, params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('PATCH', request, params);
}

async function handleRequest(
  method: string,
  request: NextRequest,
  params: { path: string[] }
) {
  try {
    // Get the target agent URL from header or use default
    const agentUrl = request.headers.get('x-agent-url') || DEFAULT_AGENT_URL;

    // Reconstruct the path
    const path = params.path.join('/');

    // Get query parameters
    const searchParams = request.nextUrl.searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : '';

    // Build the target URL
    const targetUrl = `${agentUrl}/${path}${queryString}`;

    console.log(`[Proxy] ${method} ${targetUrl}`);

    // Get request body if present
    let body = undefined;
    if (method !== 'GET' && method !== 'DELETE') {
      try {
        body = await request.text();
      } catch {
        // No body is fine
      }
    }

    // Forward the request
    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body || undefined,
    });

    // Get response data
    const data = await response.text();

    // Return the response
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('[Proxy] Error:', error);
    return NextResponse.json(
      {
        error: 'Proxy error',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to connect to Testkube agent. Ensure the agent is running and accessible.'
      },
      { status: 502 }
    );
  }
}
