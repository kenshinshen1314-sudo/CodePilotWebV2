/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 ImportSessionDialog 导入 CLI Session 对话框
 * [POS]: src/components/dialogs 的导入会话对话框组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Import, Search, Terminal, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock CLI session data
export interface CLISession {
  id: string
  title: string
  lastMessage: string
  updatedAt: string
  messageCount: number
  messages: Array<{
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
  }>
}

const mockCLISessions: CLISession[] = [
  {
    id: "session-1",
    title: "优化 Next.js 性能",
    lastMessage: "优化了图片加载和代码分割",
    updatedAt: "2 hours ago",
    messageCount: 45,
    messages: [
      { id: "1", role: "user", content: "帮我优化这个 Next.js 应用的性能", timestamp: "14:30" },
      { id: "2", role: "assistant", content: "好的，我来帮你分析和优化这个 Next.js 应用的性能。\n\n首先，让我分析一下项目的结构和配置...", timestamp: "14:31" },
      { id: "3", role: "user", content: "有哪些具体的优化建议？", timestamp: "14:35" },
      { id: "4", role: "assistant", content: "我建议从以下几个方面优化：\n1. 图片使用 next/image 组件\n2. 动态导入不必要的模块\n3. 启用 bundle 分析", timestamp: "14:36" },
    ],
  },
  {
    id: "session-2",
    title: "设计系统组件开发",
    lastMessage: "创建了 Button 和 Input 组件",
    updatedAt: "Yesterday",
    messageCount: 32,
    messages: [
      { id: "1", role: "user", content: "帮我创建一套设计系统组件", timestamp: "10:00" },
      { id: "2", role: "assistant", content: "好的，我将为你们创建设计系统组件。首先需要确定组件列表和设计规范。", timestamp: "10:01" },
    ],
  },
  {
    id: "session-3",
    title: "TypeScript 类型问题",
    lastMessage: "修复了泛型类型推导问题",
    updatedAt: "3 days ago",
    messageCount: 18,
    messages: [
      { id: "1", role: "user", content: "这个 TypeScript 类型报错怎么解决？", timestamp: "09:00" },
    ],
  },
  {
    id: "session-4",
    title: "API 接口调试",
    lastMessage: "完成了用户认证接口",
    updatedAt: "1 week ago",
    messageCount: 56,
    messages: [
      { id: "1", role: "user", content: "需要调试用户认证接口", timestamp: "15:00" },
    ],
  },
  {
    id: "session-5",
    title: "数据库迁移",
    lastMessage: "执行了 schema 迁移脚本",
    updatedAt: "2 weeks ago",
    messageCount: 28,
    messages: [
      { id: "1", role: "user", content: "需要执行数据库迁移", timestamp: "11:00" },
    ],
  },
]

interface ImportSessionDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onImport?: (session: CLISession) => void
}

export function ImportSessionDialog({
  open,
  onOpenChange,
  onImport,
}: ImportSessionDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

  // Fuzzy search filter
  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return mockCLISessions
    const query = searchQuery.toLowerCase()
    return mockCLISessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query) ||
        session.lastMessage.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleImport = () => {
    if (selectedSessionId) {
      const session = mockCLISessions.find((s) => s.id === selectedSessionId)
      if (session) {
        onImport?.(session)
      }
      setSelectedSessionId(null)
      setSearchQuery("")
      onOpenChange?.(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Import className="w-5 h-5" />
            Import CLI Session
          </DialogTitle>
          <DialogDescription>
            Select a session from your Claude Code CLI history to import
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Search box */}
          <div className="relative w-full pr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions..."
              className="w-full pl-9"
            />
          </div>

          {/* Session list */}
          <ScrollArea className="h-[300px] w-full pr-4">
            <div className="space-y-2">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-colors",
                      selectedSessionId === session.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedSessionId(session.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Terminal className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-medium truncate">{session.title}</h4>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {session.updatedAt}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {session.lastMessage}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MessageSquare className="h-3 w-3" />
                          <span>{session.messageCount} messages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No matching sessions found
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!selectedSessionId}>
            Import Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
