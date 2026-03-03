/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标，依赖 @/components/ui 的组件
 * [OUTPUT]: 对外提供 ChatSidebar 侧边栏组件，包含功能切换和会话列表
 * [POS]: src/components/chat 的侧边栏组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Plus,
  Clock,
  Search,
  Trash2,
  Folder,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ConnectionStatus } from "@/components/layout/ConnectionStatus"

export interface Session {
  id: string
  title: string
  updatedAt: string
  messageCount: number
  workingDirectory?: string
}

interface ChatSidebarProps {
  sessions: Session[]
  currentSessionId: string | null
  onSessionSelect: (sessionId: string) => void
  onNewSession: () => void
  onSessionDelete?: (sessionId: string) => void
  onImportSession?: () => void
  showWorkingDirectory?: boolean
}

export function ChatSidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onSessionDelete,
  onImportSession,
  showWorkingDirectory = false,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      {/* Logo and new button */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <span className="font-semibold">CodePilot</span>
        </div>
        <div className="flex items-center gap-2">
          <ConnectionStatus />
          <Button
            variant="ghost"
            className="flex-1 justify-start"
            onClick={onNewSession}
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="text-sm">New session</span>
          </Button>
        </div>

        {/* Import CLI Session entry */}
        {onImportSession && (
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
            onClick={onImportSession}
          >
            Import CLI Session
          </Button>
        )}

        {/* Search box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sessions..."
            className="pl-9 h-9 w-full"
          />
        </div>
      </div>

      {/* Session list */}
      <ScrollArea className="flex-1 px-3 pb-3">
        <div className="space-y-1">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group relative rounded-lg p-3 cursor-pointer transition-colors",
                currentSessionId === session.id
                  ? "bg-primary/10"
                  : "hover:bg-muted/50"
              )}
              onClick={() => onSessionSelect(session.id)}
            >
              <div className="flex items-start justify-between gap-2 pr-8">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h4
                    className={cn(
                      "text-sm font-medium truncate",
                      currentSessionId === session.id
                        ? "text-foreground"
                        : "text-foreground"
                    )}
                  >
                    {session.title}
                  </h4>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 text-xs mt-1 truncate",
                      currentSessionId === session.id
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Clock className="h-3 w-3 shrink-0" />
                    <span className="shrink-0">{session.updatedAt}</span>
                    <span className="shrink-0">·</span>
                    <span className="shrink-0">{session.messageCount} messages</span>
                    {showWorkingDirectory && session.workingDirectory && (
                      <>
                        <span className="shrink-0">·</span>
                        <Folder className="h-3 w-3 shrink-0" />
                        <span className="truncate">{session.workingDirectory.split("/").pop()}</span>
                      </>
                    )}
                  </div>
                </div>

                {onSessionDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSessionDelete(session.id)
                    }}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-md transition-opacity",
                      "text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10",
                      "opacity-0 group-hover:opacity-100",
                      currentSessionId === session.id && "opacity-100"
                    )}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredSessions.length === 0 && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              {searchQuery ? "No matching sessions found" : "No sessions yet"}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
