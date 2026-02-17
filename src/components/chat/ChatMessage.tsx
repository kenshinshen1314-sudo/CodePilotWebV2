/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 ChatMessage 消息组件
 * [POS]: src/components/chat 的消息展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Copy, Check, Paperclip } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  tokens: number
  cost: string
  attachments?: Array<{ name: string; path: string }>
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = message.role === "user"

  // Check if message has file attachments
  const hasAttachments = message.attachments && message.attachments.length > 0
  const isFileContentMessage = message.content.includes("Attached files:")

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row-reverse" : ""}`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Message content */}
        <div>
          {/* Attachments indicator */}
          {hasAttachments && (
            <div className="flex items-center gap-1.5 mb-2 ml-1">
              <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {message.attachments!.length} file(s) attached
              </span>
            </div>
          )}

          {/* Message */}
          <div
            className={`rounded-2xl px-4 py-2.5 max-w-[90%] ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">
              {isFileContentMessage ? message.content.split("---")[0].trim() : message.content}
            </div>
          </div>

          {/* Metadata */}
          {!isUser && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 ml-1">
              <span>{message.tokens} tokens</span>
              <span>·</span>
              <span>{message.cost}</span>
            </div>
          )}

          {/* Actions */}
          {!isUser && (
            <div className="flex items-center gap-1 mt-1 ml-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {copied ? "Copied" : "Copy"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
