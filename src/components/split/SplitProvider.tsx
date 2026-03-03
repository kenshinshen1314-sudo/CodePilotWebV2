'use client';

import { createContext, useState, ReactNode } from 'react';
import type { SplitContextValue, SplitSession } from '@/hooks/useSplit';

export const SplitContext = createContext<SplitContextValue | null>(null);

export function SplitProvider({ children }: { children: ReactNode }) {
    const [splitSessions, setSplitSessions] = useState<SplitSession[]>([]);
    const [activeColumnId, setActiveColumn] = useState<string>('');

    const addToSplit = (session: SplitSession) => {
        setSplitSessions(prev => [...prev, session]);
        if (!activeColumnId) {
            setActiveColumn(session.sessionId);
        }
    };

    const removeFromSplit = (sessionId: string) => {
        setSplitSessions(prev => prev.filter(s => s.sessionId !== sessionId));
        if (activeColumnId === sessionId) {
            const remaining = splitSessions.filter(s => s.sessionId !== sessionId);
            setActiveColumn(remaining.length > 0 ? remaining[0].sessionId : '');
        }
    };

    const exitSplit = () => {
        setSplitSessions([]);
        setActiveColumn('');
    };

    const isInSplit = (sessionId: string) => {
        return splitSessions.some(s => s.sessionId === sessionId);
    };

    const isSplitActive = splitSessions.length > 0;

    const value: SplitContextValue = {
        splitSessions,
        activeColumnId,
        isSplitActive,
        addToSplit,
        removeFromSplit,
        setActiveColumn,
        exitSplit,
        isInSplit,
    };

    return <SplitContext.Provider value={value}>{children}</SplitContext.Provider>;
}
