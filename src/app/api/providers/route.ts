import { NextRequest, NextResponse } from 'next/server';
import { getAllProviders } from '@/lib/db';
import type { ProvidersResponse, ErrorResponse, ApiProvider } from '@/types';

function maskApiKey(provider: ApiProvider): ApiProvider {
  let maskedKey = provider.api_key;
  if (maskedKey && maskedKey.length > 8) {
    maskedKey = '***' + maskedKey.slice(-8);
  }
  return { ...provider, api_key: maskedKey };
}

// Detect environment variables for quick setup
function detectEnvVars(): Record<string, string> {
  const env: Record<string, string> = {};

  // Check for common API key environment variables
  const envVars = [
    'ANTHROPIC_API_KEY',
    'OPENAI_API_KEY',
    'OPENROUTER_API_KEY',
    'GEMINI_API_KEY',
    'COHERE_API_KEY',
  ];

  for (const key of envVars) {
    if (process.env[key]) {
      env[key] = 'detected';
    }
  }

  return env;
}

export async function GET(_request: NextRequest) {
  try {
    const providers = getAllProviders();
    const maskedProviders = providers.map(maskApiKey);

    return NextResponse.json<ProvidersResponse>({
      providers: maskedProviders,
      env_detected: detectEnvVars(),
    });
  } catch (error) {
    return NextResponse.json<ErrorResponse>(
      { error: error instanceof Error ? error.message : 'Failed to load providers' },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new provider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Import createProvider to avoid circular dependency
    const { createProvider } = await import('@/lib/db');

    const newProvider = createProvider(body);

    return NextResponse.json<{ provider: ApiProvider }>({
      provider: maskApiKey(newProvider)
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json<ErrorResponse>(
      { error: error instanceof Error ? error.message : 'Failed to create provider' },
      { status: 500 }
    );
  }
}
