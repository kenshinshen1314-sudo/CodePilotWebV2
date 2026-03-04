import { NextRequest } from 'next/server';
import { addMessage } from '@/lib/db';
import type { Message } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, role, content, token_usage } = body;

    if (!session_id || !role || content === undefined) {
      return Response.json(
        { error: 'session_id, role, and content are required' },
        { status: 400 }
      );
    }

    if (role !== 'user' && role !== 'assistant') {
      return Response.json(
        { error: 'role must be either "user" or "assistant"' },
        { status: 400 }
      );
    }

    const message = addMessage(session_id, role, content, token_usage || null);

    return Response.json({ message }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save message';
    console.error('[POST /api/chat/messages] Error:', message);
    return Response.json({ error: message }, { status: 500 });
  }
}
