/**
 * [INPUT]: 依赖 react，依赖 @/components/layout/Sidebar
 * [OUTPUT]: 对外提供 ChatLayout 聊天布局组件
 * [POS]: src/components/chat 的布局容器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Sidebar } from "@/components/layout/Sidebar"

interface ChatLayoutProps {
  leftSidebar: React.ReactNode
  mainContent: React.ReactNode
  rightSidebar?: React.ReactNode | null
}

export function ChatLayout({ leftSidebar, mainContent, rightSidebar }: ChatLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      {/* Sessions sidebar */}
      <aside className="w-64 shrink-0">{leftSidebar}</aside>
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {mainContent}
        </div>
        {rightSidebar && (
          <aside className="w-64 flex flex-col shrink-0">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  )
}
