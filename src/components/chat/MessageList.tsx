'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Message, PermissionRequestEvent } from '@/types';
import { MessageItem } from './MessageItem';
import { StreamingMessage } from './StreamingMessage';
import { CodePilotLogo } from './CodePilotLogo';

interface ToolUseInfo {
    id: string;
    name: string;
    input: unknown;
}

interface ToolResultInfo {
    tool_use_id: string;
    content: string;
    is_error?: boolean;
}

interface MessageListProps {
    messages: Message[];
    streamingContent: string;
    isStreaming: boolean;
    toolUses?: ToolUseInfo[];
    toolResults?: ToolResultInfo[];
    streamingToolOutput?: string;
    statusText?: string;
    pendingPermission?: PermissionRequestEvent | null;
    onPermissionResponse?: (decision: 'allow' | 'allow_session' | 'deny') => void;
    permissionResolved?: 'allow' | 'deny' | null;
    onForceStop?: () => void;
    hasMore?: boolean;
    loadingMore?: boolean;
    onLoadMore?: () => void;
}

export function MessageList({
    messages,
    streamingContent,
    isStreaming,
    toolUses = [],
    toolResults = [],
    streamingToolOutput,
    statusText,
    pendingPermission,
    onPermissionResponse,
    permissionResolved,
    onForceStop,
    hasMore,
    loadingMore,
    onLoadMore,
}: MessageListProps) {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const anchorIdRef = useRef<string | null>(null);
    const prevMessageCountRef = useRef(messages.length);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Before loading more, record the first visible message ID
    const handleLoadMore = () => {
        if (messages.length > 0) {
            anchorIdRef.current = messages[0].id;
        }
        onLoadMore?.();
    };

    // After messages are prepended, scroll the anchor element back into view
    useEffect(() => {
        if (anchorIdRef.current && messages.length > prevMessageCountRef.current) {
            const el = document.getElementById(`msg-${anchorIdRef.current}`);
            if (el && scrollRef.current) {
                const scrollTop = el.offsetTop - scrollRef.current.offsetTop;
                scrollRef.current.scrollTop = scrollTop;
            }
            anchorIdRef.current = null;
        }
        prevMessageCountRef.current = messages.length;
    }, [messages]);

    // Scroll to bottom when new messages are added or streaming starts
    useEffect(() => {
        const messageCount = messages.length;
        if (messageCount > prevMessageCountRef.current) {
            scrollToBottom();
            prevMessageCountRef.current = messageCount;
        }
    }, [messages.length]);

    // Auto-scroll during streaming
    useEffect(() => {
        if (isStreaming) {
            scrollToBottom();
        }
    }, [streamingContent, isStreaming]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    // Check scroll position to show/hide scroll button
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
            setShowScrollButton(!isAtBottom);
        }
    };

    if (messages.length === 0 && !isStreaming) {
        return (
            <div className="flex size-full flex-col items-center justify-center gap-3 p-8 text-center">
                <CodePilotLogo className="h-16 w-16 text-muted-foreground" />
                <div className="space-y-1">
                    <h3 className="font-medium text-sm">{t('chat.newConversation')}</h3>
                    <p className="text-muted-foreground text-sm">{t('messageList.emptyDescription')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-full flex-col">
            {/* Scrollable message area */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6"
            >
                <div className="mx-auto max-w-3xl space-y-6">
                    {hasMore && (
                        <div className="flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                            >
                                {loadingMore ? t('messageList.loading') : t('messageList.loadEarlier')}
                            </button>
                        </div>
                    )}
                    {messages.map((message) => (
                        <div key={message.id} id={`msg-${message.id}`}>
                            <MessageItem message={message} />
                        </div>
                    ))}

                    {isStreaming && (
                        <StreamingMessage
                            content={streamingContent}
                            isStreaming={isStreaming}
                            toolUses={toolUses}
                            toolResults={toolResults}
                            streamingToolOutput={streamingToolOutput}
                            statusText={statusText}
                            pendingPermission={pendingPermission}
                            onPermissionResponse={onPermissionResponse}
                            permissionResolved={permissionResolved}
                            onForceStop={onForceStop}
                        />
                    )}
                </div>
            </div>

            {/* Scroll to bottom button */}
            {showScrollButton && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full h-8 w-8 shadow-md"
                        onClick={scrollToBottom}
                    >
                        <ArrowDown className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
