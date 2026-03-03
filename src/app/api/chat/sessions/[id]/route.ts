import { NextRequest, NextResponse } from 'next/server';
import { getSession, deleteSession, updateSessionTitle, updateSessionModel, updateSessionProviderId, updateSessionMode, clearSessionMessages } from '@/lib/db';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        // Delete the session from database
        deleteSession(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete session:', error);
        return NextResponse.json(
            { error: 'Failed to delete session' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        const session = getSession(id);

        if (!session) {
            return NextResponse.json(
                { error: 'Session not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ session });
    } catch (error) {
        console.error('Failed to get session:', error);
        return NextResponse.json(
            { error: 'Failed to get session' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const { title, model, provider_id, mode, clear_messages } = body;

        // Handle clear_messages
        if (clear_messages) {
            clearSessionMessages(id);
        }

        // Update fields
        if (title !== undefined) {
            updateSessionTitle(id, title);
        }
        if (model !== undefined) {
            updateSessionModel(id, model);
        }
        if (provider_id !== undefined) {
            updateSessionProviderId(id, provider_id);
        }
        if (mode !== undefined) {
            updateSessionMode(id, mode);
        }

        const session = getSession(id);

        return NextResponse.json({ session });
    } catch (error) {
        console.error('Failed to update session:', error);
        return NextResponse.json(
            { error: 'Failed to update session' },
            { status: 500 }
        );
    }
}
