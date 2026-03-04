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
import { CodePilotLogo } from "@/components/chat/CodePilotLogo"
import { useTranslation } from "@/hooks/useTranslation"

export default function ChatPage() {
  const pathname = usePathname()
  const { t } = useTranslation()

  // 判断是否在会话详情页
  const isInSession = /^\/chat\/[^/]+$/.test(pathname)

  return (
    <ChatLayout
      leftSidebar={<ChatListPanel open={true} width={256} />}
      mainContent={
        isInSession ? null : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="flex size-full flex-col items-center justify-center gap-3 p-8 text-center">
              <CodePilotLogo className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-1">
                <h3 className="font-medium text-sm">{t('chat.newConversation')}</h3>
                <p className="text-muted-foreground text-sm">{t('messageList.emptyDescription')}</p>
              </div>
            </div>
          </div>
        )
      }
      rightSidebar={null}
    />
  )
}
