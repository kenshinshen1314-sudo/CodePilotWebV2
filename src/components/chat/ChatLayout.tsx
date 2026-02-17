/**
 * [INPUT]: 依赖 react
 * [OUTPUT]: 对外提供 ChatLayout 聊天布局组件
 * [POS]: src/components/chat 的布局容器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

interface ChatLayoutProps {
  leftSidebar: React.ReactNode
  mainContent: React.ReactNode
  rightSidebar?: React.ReactNode | null
}

export function ChatLayout({ leftSidebar, mainContent, rightSidebar }: ChatLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      <aside className="w-64 shrink-0">{leftSidebar}</aside>
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
