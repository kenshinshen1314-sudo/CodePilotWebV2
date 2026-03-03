"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, DownloadIcon } from "lucide-react";
import { useCallback } from "react";

// Simple conversation components (no StickToBottom dependency)

export type ConversationProps = React.HTMLAttributes<HTMLDivElement>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
    <div className={cn("relative flex flex-col h-full", className)} {...props} />
);

export type ConversationContentProps = React.HTMLAttributes<HTMLDivElement>;

export const ConversationContent = ({ className, ...props }: ConversationContentProps) => (
    <div className={cn("flex flex-col gap-6", className)} {...props} />
);

export type ConversationEmptyStateProps = {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
};

export const ConversationEmptyState = ({
    className,
    title = "No messages yet",
    description = "Start a conversation to see messages here",
    icon,
    children,
}: ConversationEmptyStateProps) => (
    <div
        className={cn(
            "flex size-full flex-col items-center justify-center gap-3 p-8 text-center",
            className
        )}
    >
        {children ?? (
            <>
                {icon && <div className="text-muted-foreground">{icon}</div>}
                <div className="space-y-1">
                    <h3 className="font-medium text-sm">{title}</h3>
                    {description && (
                        <p className="text-muted-foreground text-sm">{description}</p>
                    )}
                </div>
            </>
        )}
    </div>
);

export type ConversationScrollButtonProps = React.ComponentProps<typeof Button>;

export const ConversationScrollButton = ({
    className,
    onClick,
    ...props
}: ConversationScrollButtonProps) => {
    return (
        <Button
            className={cn(
                "absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full shadow-sm",
                className
            )}
            onClick={onClick}
            size="icon"
            type="button"
            variant="outline"
            {...props}
        >
            <ArrowDownIcon className="size-4" />
        </Button>
    );
};

export interface ConversationMessage {
    role: "user" | "assistant" | "system" | "data" | "tool";
    content: string;
}

export type ConversationDownloadProps = Omit<
    React.ComponentProps<typeof Button>,
    "onClick"
> & {
    messages: ConversationMessage[];
    filename?: string;
    formatMessage?: (message: ConversationMessage, index: number) => string;
};

const defaultFormatMessage = (message: ConversationMessage): string => {
    const roleLabel =
        message.role.charAt(0).toUpperCase() + message.role.slice(1);
    return `**${roleLabel}:** ${message.content}`;
};

export const messagesToMarkdown = (
    messages: ConversationMessage[],
    formatMessage: (
        message: ConversationMessage,
        index: number
    ) => string = defaultFormatMessage
): string => messages.map((msg, i) => formatMessage(msg, i)).join("\n\n");

export const ConversationDownload = ({
    messages,
    filename = "conversation.md",
    formatMessage = defaultFormatMessage,
    className,
    children,
    ...props
}: ConversationDownloadProps) => {
    const handleDownload = useCallback(() => {
        const markdown = messagesToMarkdown(messages, formatMessage);
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }, [messages, filename, formatMessage]);

    return (
        <Button
            className={cn(
                "absolute top-4 right-4 rounded-full shadow-sm",
                className
            )}
            onClick={handleDownload}
            size="icon"
            type="button"
            variant="outline"
            {...props}
        >
            {children ?? <DownloadIcon className="size-4" />}
        </Button>
    );
};
