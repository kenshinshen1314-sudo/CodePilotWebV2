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
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Session {
  id: string
  title: string
  updatedAt: string
  messageCount: number
}

interface ChatSidebarProps {
  sessions: Session[]
  currentSessionId: string | null
  onSessionSelect: (sessionId: string) => void
  onNewSession: () => void
  onSessionDelete?: (sessionId: string) => void
  onImportSession?: () => void
}

export function ChatSidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onSessionDelete,
  onImportSession,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      {/* Logo and new button */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span className="font-semibold">CodePilot</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onNewSession}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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
            className="pl-9 h-9"
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
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
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
                      "flex items-center gap-1.5 text-xs mt-1",
                      currentSessionId === session.id
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Clock className="h-3 w-3" />
                    <span>{session.updatedAt}</span>
                    <span>·</span>
                    <span>{session.messageCount} messages</span>
                  </div>
                </div>

                {onSessionDelete && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
                          currentSessionId === session.id && "opacity-100"
                        )}
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onSessionDelete(session.id)
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
