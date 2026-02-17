/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件
 * [OUTPUT]: 对外提供 ChatMessage 消息组件
 * [POS]: src/components/chat 的消息展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Copy, Check } from "lucide-react"
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

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row-reverse" : ""}`}>
        {/* 头像 */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* 消息内容 */}
        <div>
          {/* 消息 */}
          <div
            className={`rounded-2xl px-4 py-2.5 ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {message.content.split("```").map((part, i) => {
                if (i % 2 === 1) {
                  const codeLines = part.split("\n")
                  const code = codeLines.join("\n")
                  return (
                    <pre key={i} className="mt-2 p-3 rounded-lg bg-muted overflow-x-auto text-sm">
                      <code>{code}</code>
                    </pre>
                  )
                }
                return (
                  <p key={i} className="whitespace-pre-wrap leading-relaxed">
                    {part}
                  </p>
                )
              })}
            </div>
          </div>

          {/* 元信息 */}
          {!isUser && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 ml-1">
              <span>{message.tokens} tokens</span>
              <span>·</span>
              <span>{message.cost}</span>
            </div>
          )}

          {/* 操作按钮 */}
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
                    {copied ? "已复制" : "复制"}
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
