/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标，依赖 next/navigation
 * [OUTPUT]: 对外提供 Sidebar 侧边栏组件
 * [POS]: src/components/layout 的侧边栏导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Puzzle, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/chat", icon: MessageSquare, label: "Messages" },
  { href: "/extensions", icon: Puzzle, label: "Extensions" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[60px] h-screen bg-[#F5F5F5] flex flex-col items-center py-4 gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              isActive
                ? "bg-white shadow-sm"
                : "hover:bg-[#E5E5E5]"
            )}
            title={item.label}
          >
            <item.icon
              className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </Link>
        )
      })}
    </aside>
  )
}
