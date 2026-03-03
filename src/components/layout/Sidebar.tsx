/**
 * [INPUT]: 依赖 next/link 的 Link，依赖 lucide-react 图标，依赖 @/lib/utils
 * [OUTPUT]: 对外提供 Sidebar 组件，全局共享的左侧导航栏
 * [POS]: src/components/layout 的侧边栏，被所有页面使用
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Puzzle, Settings, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/chat", icon: MessageSquare, label: "Chat" },
  { href: "/skills", icon: Sparkles, label: "Skills" },
  { href: "/extensions", icon: Puzzle, label: "Extensions" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-12 shrink-0 flex flex-col items-center py-4 gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={item.label}
          >
            <item.icon className="h-4 w-4" />
          </Link>
        )
      })}
    </aside>
  )
}
