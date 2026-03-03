'use client';

import { createContext, useState, ReactNode } from 'react';

export type PanelContent = "files" | "tasks";

export type PreviewViewMode = "source" | "rendered";

export interface PanelContextValue {
    panelOpen: boolean;
    setPanelOpen: (open: boolean) => void;
    panelContent: PanelContent;
    setPanelContent: (content: PanelContent) => void;
    workingDirectory: string;
    setWorkingDirectory: (dir: string) => void;
    sessionId: string;
    setSessionId: (id: string) => void;
    sessionTitle: string;
    setSessionTitle: (title: string) => void;
    streamingSessionId: string;
    setStreamingSessionId: (id: string) => void;
    pendingApprovalSessionId: string;
    setPendingApprovalSessionId: (id: string) => void;
    /** All sessions with active streams (supports multi-session streaming) */
    activeStreamingSessions: Set<string>;
    /** All sessions with pending permission approval */
    pendingApprovalSessionIds: Set<string>;
    previewFile: string | null;
    setPreviewFile: (path: string | null) => void;
    previewViewMode: PreviewViewMode;
    setPreviewViewMode: (mode: PreviewViewMode) => void;
}

export const PanelContext = createContext<PanelContextValue | null>(null);

export function PanelProvider({ children }: { children: ReactNode }) {
    const [panelOpen, setPanelOpen] = useState(false);
    const [panelContent, setPanelContent] = useState<PanelContent>('files');
    const [workingDirectory, setWorkingDirectory] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [sessionTitle, setSessionTitle] = useState('');
    const [streamingSessionId, setStreamingSessionId] = useState('');
    const [pendingApprovalSessionId, setPendingApprovalSessionId] = useState('');
    const [activeStreamingSessions] = useState<Set<string>>(new Set());
    const [pendingApprovalSessionIds] = useState<Set<string>>(new Set());
    const [previewFile, setPreviewFile] = useState<string | null>(null);
    const [previewViewMode, setPreviewViewMode] = useState<PreviewViewMode>('source');

    const value: PanelContextValue = {
        panelOpen,
        setPanelOpen,
        panelContent,
        setPanelContent,
        workingDirectory,
        setWorkingDirectory,
        sessionId,
        setSessionId,
        sessionTitle,
        setSessionTitle,
        streamingSessionId,
        setStreamingSessionId,
        pendingApprovalSessionId,
        setPendingApprovalSessionId,
        activeStreamingSessions,
        pendingApprovalSessionIds,
        previewFile,
        setPreviewFile,
        previewViewMode,
        setPreviewViewMode,
    };

    return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}
