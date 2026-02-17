/**
 * [INPUT]: 依赖 @/components/ui/card，依赖 lucide-react 的 Type 图标
 * [OUTPUT]: 对外提供排版展示章节组件
 * [POS]: src/components/design-system 的排版展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent } from "@/components/ui/card"
import { Type } from "lucide-react"

export function TypographyShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Type className="h-5 w-5" />
        <h2 className="text-2xl font-bold">2. Typography</h2>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">text-4xl font-bold</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">text-3xl font-semibold</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <p className="text-sm text-muted-foreground font-mono mt-1">text-2xl font-semibold</p>
          </div>
          <div>
            <p className="text-base">Body text - The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm text-muted-foreground font-mono mt-1">text-base</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Small muted text - Additional context information.</p>
            <p className="text-sm text-muted-foreground font-mono mt-1">text-sm text-muted-foreground</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
