import { NextResponse } from 'next/server';
import { listClaudeSessions } from '@/lib/claude-session-parser';

export async function GET() {
    try {
        const sessions = listClaudeSessions();
        return NextResponse.json({ sessions });
    } catch (error) {
        const message = error instanceof Error ? error.stack || error.message : String(error);
        console.error('[GET /api/claude-sessions] Error:', message);
        return NextResponse.json(
            { error: message, sessions: [] },
            { status: 500 }
        );
    }
}
