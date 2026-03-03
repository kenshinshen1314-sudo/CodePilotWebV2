'use client';

import { useEffect, useState, useRef, useCallback, use } from 'react';
import Link from 'next/link';
import type { Message, MessagesResponse, ChatSession } from '@/types';
import type { FileNode } from '@/components/chat';
import { ChatView } from '@/components/chat/ChatView';
import { ChatLayout } from '@/components/chat/ChatLayout';
import { ChatListPanel } from '@/components/layout/ChatListPanel';
import { FileTree } from '@/components/chat/FileTree';
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading02Icon, PencilEdit01Icon, File01Icon } from "@hugeicons/core-free-icons";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { usePanel } from '@/hooks/usePanel';
import { useTranslation } from '@/hooks/useTranslation';
import { ImportSessionDialog } from '@/components/layout/ImportSessionDialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatSessionPageProps {
    params: Promise<{ id: string }>;
}

export default function ChatSessionPage({ params }: ChatSessionPageProps) {
    const { id } = use(params);
    const [messages, setMessages] = useState<Message[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sessionTitle, setSessionTitle] = useState<string>('');
    const [sessionModel, setSessionModel] = useState<string>('');
    const [sessionProviderId, setSessionProviderId] = useState<string>('');
    const [sessionMode, setSessionMode] = useState<string>('');
    const [projectName, setProjectName] = useState<string>('');
    const [sessionWorkingDir, setSessionWorkingDir] = useState<string>('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const titleInputRef = useRef<HTMLInputElement>(null);
    const { setWorkingDirectory, setSessionId, setSessionTitle: setPanelSessionTitle, setPanelOpen, panelOpen } = usePanel();
    const { t } = useTranslation();

    // File tree state
    const [fileTree, setFileTree] = useState<FileNode[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);

    // Load folder contents
    const loadFolderContents = async (folderPath: string) => {
        try {
            const res = await fetch(`/api/folders?path=${encodeURIComponent(folderPath)}`);
            const data = await res.json();
            if (data.items) {
                const convertToFileNode = (items: { id: string; name: string; path: string; type: "folder" | "file" }[]): FileNode[] => {
                    return items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        path: item.path,
                        type: item.type,
                        expanded: false,
                        children: item.type === "folder" ? [] : undefined,
                    }));
                };
                setFileTree(convertToFileNode(data.items));
            }
        } catch (error) {
            console.error("Failed to load folder:", error);
        }
    };

    const handleTreeFileSelect = async (file: FileNode) => {
        const updateSelected = (nodes: FileNode[]): FileNode[] => {
            return nodes.map((node) => {
                const newNode = { ...node, selected: node.id === file.id };
                if (newNode.children) {
                    newNode.children = updateSelected(newNode.children);
                }
                return newNode;
            });
        };

        setFileTree(updateSelected(fileTree));
        setSelectedFile(file);

        // Load file content from API
        try {
            const res = await fetch(`/api/files?path=${encodeURIComponent(file.path)}`);
            const data = await res.json();
            if (data.content !== undefined) {
                setFileContent(data.content);
            } else {
                setFileContent(`// ${file.name}\n// Unable to load file content: ${data.error || "Unknown error"}`);
            }
        } catch (error) {
            setFileContent(`// ${file.name}\n// Failed to load file content`);
        }
    };

    const handleCloseFileTree = () => {
        setPanelOpen(false);
        setSelectedFile(null);
        setFileContent(null);
    };

    // Load children for a folder (lazy loading)
    const handleLoadChildren = async (node: FileNode): Promise<FileNode[]> => {
        try {
            const res = await fetch(`/api/folders?path=${encodeURIComponent(node.path)}`);
            const data = await res.json();
            if (data.items) {
                return data.items.map((item: { id: string; name: string; path: string; type: "folder" | "file" }) => ({
                    id: item.id,
                    name: item.name,
                    path: item.path,
                    type: item.type,
                    expanded: false,
                    children: item.type === "folder" ? [] : undefined,
                }));
            }
        } catch (error) {
            console.error("Failed to load children:", error);
        }
        return [];
    };

    // Listen for file tree refresh events
    useEffect(() => {
        const handleRefresh = () => {
            if (sessionWorkingDir) {
                loadFolderContents(sessionWorkingDir);
            }
        };

        window.addEventListener('refresh-file-tree', handleRefresh);
        return () => window.removeEventListener('refresh-file-tree', handleRefresh);
    }, [sessionWorkingDir]);

    const handleStartEditTitle = useCallback(() => {
        setEditTitle(sessionTitle || t('chat.newConversation'));
        setIsEditingTitle(true);
    }, [sessionTitle]);

    const handleSaveTitle = useCallback(async () => {
        const trimmed = editTitle.trim();
        if (!trimmed) {
            setIsEditingTitle(false);
            return;
        }
        try {
            const res = await fetch(`/api/chat/sessions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: trimmed }),
            });
            if (res.ok) {
                setSessionTitle(trimmed);
                setPanelSessionTitle(trimmed);
                window.dispatchEvent(new CustomEvent('session-updated', { detail: { id, title: trimmed } }));
            }
        } catch {
            // silently fail
        }
        setIsEditingTitle(false);
    }, [editTitle, id, setPanelSessionTitle]);

    const handleTitleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveTitle();
        } else if (e.key === 'Escape') {
            setIsEditingTitle(false);
        }
    }, [handleSaveTitle]);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);

    // Load session info and set working directory
    useEffect(() => {
        let cancelled = false;

        async function loadSession() {
            try {
                const res = await fetch(`/api/chat/sessions/${id}`);
                if (cancelled) return;
                if (res.ok) {
                    const data: { session: ChatSession } = await res.json();
                    if (cancelled) return;
                    if (data.session.working_directory) {
                        setWorkingDirectory(data.session.working_directory);
                        setSessionWorkingDir(data.session.working_directory);
                        localStorage.setItem("codepilot:last-working-directory", data.session.working_directory);
                        // Load folder contents immediately
                        loadFolderContents(data.session.working_directory);
                    }
                    setSessionId(id);
                    setPanelOpen(true);
                    const title = data.session.title || t('chat.newConversation');
                    setSessionTitle(title);
                    setPanelSessionTitle(title);
                    setSessionModel(data.session.model || '');
                    setSessionProviderId(data.session.provider_id || '');
                    setSessionMode(data.session.mode || 'code');
                    setProjectName(data.session.project_name || '');
                }
            } catch {
                // Session info load failed - panel will still work without directory
            }
        }

        loadSession();
        return () => { cancelled = true; };
    }, [id, setWorkingDirectory, setSessionId, setPanelSessionTitle, setPanelOpen]);

    useEffect(() => {
        // Reset state when switching sessions
        setLoading(true);
        setError(null);
        setMessages([]);
        setHasMore(false);

        let cancelled = false;

        async function loadMessages() {
            try {
                const res = await fetch(`/api/chat/sessions/${id}/messages?limit=30`);
                if (cancelled) return;
                if (!res.ok) {
                    if (res.status === 404) {
                        setError('Session not found');
                        return;
                    }
                    throw new Error('Failed to load messages');
                }
                const data: MessagesResponse = await res.json();
                if (cancelled) return;
                setMessages(data.messages);
                setHasMore(data.hasMore ?? false);
            } catch (err) {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : 'Failed to load messages');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadMessages();

        return () => { cancelled = true; };
    }, [id]);

    if (loading) {
        return (
            <ChatLayout
                leftSidebar={<ChatListPanel open={true} width={256} />}
                mainContent={
                    <div className="flex h-full items-center justify-center">
                        <HugeiconsIcon icon={Loading02Icon} className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                }
            />
        );
    }

    if (error) {
        return (
            <ChatLayout
                leftSidebar={<ChatListPanel open={true} width={256} />}
                mainContent={
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center space-y-2">
                            <p className="text-destructive font-medium">{error}</p>
                            <Link href="/chat" className="text-sm text-muted-foreground hover:underline">
                                Start a new chat
                            </Link>
                        </div>
                    </div>
                }
            />
        );
    }

    // Main content area
    const mainContent = (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Chat title bar */}
            {sessionTitle && (
                <div
                    className="flex h-12 shrink-0 items-center justify-center px-4 gap-1"
                    style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
                >
                    {projectName && (
                        <>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="text-xs text-muted-foreground shrink-0 hover:text-foreground transition-colors cursor-pointer"
                                        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
                                        onClick={() => {
                                            if (sessionWorkingDir) {
                                                if (window.electronAPI?.shell?.openPath) {
                                                    window.electronAPI.shell.openPath(sessionWorkingDir);
                                                } else {
                                                    fetch('/api/files/open', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ path: sessionWorkingDir }),
                                                    }).catch(() => { });
                                                }
                                            }
                                        }}
                                    >
                                        {projectName}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs break-all">{sessionWorkingDir || projectName}</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">Click to open in Finder</p>
                                </TooltipContent>
                            </Tooltip>
                            <span className="text-xs text-muted-foreground shrink-0">/</span>
                        </>
                    )}
                    {isEditingTitle ? (
                        <div style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
                            <Input
                                ref={titleInputRef}
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={handleTitleKeyDown}
                                onBlur={handleSaveTitle}
                                className="h-7 text-sm max-w-md text-center"
                            />
                        </div>
                    ) : (
                        <div
                            className="flex items-center gap-1 group cursor-default max-w-md"
                            style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
                        >
                            <h2 className="text-sm font-medium text-foreground/80 truncate">
                                {sessionTitle}
                            </h2>
                            <button
                                onClick={handleStartEditTitle}
                                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-0.5 rounded hover:bg-muted"
                            >
                                <HugeiconsIcon icon={PencilEdit01Icon} className="h-3 w-3 text-muted-foreground" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Content area with optional file preview */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
                {/* Chat area */}
                <div className={cn("flex flex-col min-h-0 transition-all duration-300", selectedFile ? "flex-1" : "flex-1")}>
                    <ChatView key={id} sessionId={id} initialMessages={messages} initialHasMore={hasMore} modelName={sessionModel} initialMode={sessionMode} providerId={sessionProviderId} />
                </div>

                {/* File preview panel */}
                {selectedFile && (
                    <div className="w-80 lg:w-96 flex flex-col border-l border-border/40 bg-muted/30">
                        {/* File preview header */}
                        <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-border/40 bg-background/50 backdrop-blur-sm">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <HugeiconsIcon icon={File01Icon} className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <span className="text-sm font-medium truncate">{selectedFile.name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setFileContent(null);
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* File path */}
                        <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border/20 bg-background/30">
                            {selectedFile.path}
                        </div>

                        {/* File content */}
                        <ScrollArea className="flex-1">
                            <div className="p-4">
                                {fileContent ? (
                                    <pre className="text-xs font-mono whitespace-pre-wrap break-words leading-relaxed">
                                        {fileContent}
                                    </pre>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                                        Loading...
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
        </div>
    );

    // Right sidebar with file tree
    const rightSidebar = panelOpen ? (
        <div className="flex flex-col h-full overflow-hidden">
            <FileTree
                files={fileTree}
                selectedFile={selectedFile}
                onFilesChange={setFileTree}
                onFileSelect={handleTreeFileSelect}
                onClose={handleCloseFileTree}
                onLoadChildren={handleLoadChildren}
            />
        </div>
    ) : null;

    return (
        <ChatLayout
            leftSidebar={<ChatListPanel open={true} width={256} />}
            mainContent={mainContent}
            rightSidebar={rightSidebar}
        />
    );
}
