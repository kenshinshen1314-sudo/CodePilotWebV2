/**
 * [INPUT]: 依赖 next/link 的 Link，依赖 lucide-react 的 Code2, Palette
 * [OUTPUT]: 对外提供 Header 组件
 * [POS]: src/components/layout 的头部导航，被页面使用
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import Link from "next/link";
import { Code2, Palette } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Code2 className="h-6 w-6" />
            <span>CodePilot Web</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/design-system"
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Palette className="h-4 w-4" />
              Design System
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
