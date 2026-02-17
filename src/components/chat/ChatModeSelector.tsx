/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标，依赖 @/components/ui/button
 * [OUTPUT]: 对外提供 ChatModeSelector 模式选择器组件
 * [POS]: src/components/chat 的模式选择器组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Code2, Lightbulb, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ChatMode = "code" | "plan" | "ask"

interface ChatModeOption {
  value: ChatMode
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const CHAT_MODES: readonly ChatModeOption[] = [
  {
    value: "code",
    label: "Code",
    icon: Code2,
    description: "代码编写与优化",
  },
  {
    value: "plan",
    label: "Plan",
    icon: Lightbulb,
    description: "架构规划与设计",
  },
  {
    value: "ask",
    label: "Ask",
    icon: MessageCircle,
    description: "问答与咨询",
  },
] as const

interface ChatModeSelectorProps {
  currentMode: ChatMode
  onModeChange: (mode: ChatMode) => void
}

export function ChatModeSelector({
  currentMode,
  onModeChange,
}: ChatModeSelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
      {CHAT_MODES.map((mode) => (
        <Button
          key={mode.value}
          variant="ghost"
          size="sm"
          onClick={() => onModeChange(mode.value)}
          className={cn(
            "h-8 px-3 gap-2 rounded-lg transition-all",
            currentMode === mode.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
          )}
        >
          <mode.icon className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{mode.label}</span>
        </Button>
      ))}
    </div>
  )
}

export { CHAT_MODES }
export type { ChatModeOption }
