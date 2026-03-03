/**
 * [INPUT]: 依赖 react、"use client"
 * [OUTPUT]: 对外提供 Chat 页面，使用 ChatListPanel 作为左侧边栏
 * [POS]: src/app/chat 的主页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { usePathname } from "next/navigation"
import { ChatLayout } from "@/components/chat"
import { ChatListPanel } from "@/components/layout/ChatListPanel"
import { MessageSquare } from "lucide-react"

export default function ChatPage() {
  const pathname = usePathname()

  // 判断是否在会话详情页
  const isInSession = /^\/chat\/[^/]+$/.test(pathname)

  return (
    <ChatLayout
      leftSidebar={<ChatListPanel open={true} width={256} />}
      mainContent={
        isInSession ? null : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-4">
              <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground/40" />
              <div>
                <p className="text-lg font-medium">Welcome to CodePilot</p>
                <p className="text-sm mt-2">Select a conversation from the sidebar or create a new one</p>
              </div>
            </div>
          </div>
        )
      }
      rightSidebar={null}
    />
  )
}
