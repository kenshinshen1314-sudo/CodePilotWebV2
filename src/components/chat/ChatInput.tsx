/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 ChatInput 输入组件
 * [POS]: src/components/chat 的输入组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Code2, FolderOpen, Lightbulb, MessageCircle, Paperclip, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type ChatMode = "code" | "plan" | "ask"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  mode?: ChatMode
  onModeChange?: (mode: ChatMode) => void
  onFolderSelect?: () => void
}

const MODES: { value: ChatMode; label: string; icon: typeof Code2 }[] = [
  { value: "code", label: "Code", icon: Code2 },
  { value: "plan", label: "Plan", icon: Lightbulb },
  { value: "ask", label: "Ask", icon: MessageCircle },
]

export function ChatInput({ value, onChange, onSend, mode = "code", onModeChange, onFolderSelect }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        onSend()
      }
    }
  }

  const currentMode = MODES.find(m => m.value === mode)

  return (
    <Card className="p-2 w-full">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="min-h-[60px] max-h-[150px] border-0 resize-none focus-visible:ring-0 py-3 shadow-none outline-none"
      />
      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2">
          {onModeChange ? (
            <Select
              value={mode}
              onValueChange={(v) => onModeChange(v as ChatMode)}
            >
              <SelectTrigger className="w-[100px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODES.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    <div className="flex items-center gap-2">
                      <m.icon className="w-3.5 h-3.5" />
                      <span>{m.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : currentMode && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <currentMode.icon className="w-4 h-4" />
              <span>{currentMode.label}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          {onFolderSelect && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={onFolderSelect}
            >
              <FolderOpen className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          onClick={onSend}
          disabled={!value.trim()}
          size="icon"
          className="h-8 w-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
