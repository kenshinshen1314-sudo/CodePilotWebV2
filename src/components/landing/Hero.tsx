/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标，依赖 @/components/ui/button，依赖 @/lib/utils 的 cn
 * [OUTPUT]: 对外提供 Hero 首屏章节组件
 * [POS]: src/components/landing 的首屏章节
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Terminal, Zap } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={[
        "min-h-[90vh] flex items-center justify-center relative overflow-hidden",
        "bg-gradient-to-b from-background via-background to-muted/20",
        className || ""
      ].join(" ")}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Badge 标签 */}
          <Badge variant="glass" className="gap-2 px-4 py-2">
            <Zap className="h-4 w-4" />
            <span>Claude Code 原生桌面客户端</span>
          </Badge>

          {/* 主标题 */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            可视化界面
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {" "}取代终端
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            通过可视化界面进行对话、编码和项目管理，无需在终端中操作
          </p>

          {/* CTA 按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button variant="premium" size="lg" className="group" asChild>
              <Link href="#download">
                立即下载
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link href="#features">
                了解功能
              </Link>
            </Button>
          </div>

          {/* 社会证明 */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span>支持 Claude Code 核心功能</span>
            </div>
            <span className="text-border">|</span>
            <span>完全开源</span>
          </div>
        </div>
      </div>
    </section>
  )
}
