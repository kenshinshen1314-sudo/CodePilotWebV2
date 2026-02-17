/**
 * [INPUT]: 依赖 @/components/ui/card，依赖 lucide-react 的 Palette 图标
 * [OUTPUT]: 对外提供颜色展示章节组件
 * [POS]: src/components/design-system 的颜色展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Palette } from "lucide-react"

const COLORS = [
  { name: "Background", var: "--background" },
  { name: "Foreground", var: "--foreground" },
  { name: "Primary", var: "--primary" },
  { name: "Secondary", var: "--secondary" },
  { name: "Muted", var: "--muted" },
  { name: "Accent", var: "--accent" },
  { name: "Destructive", var: "--destructive" },
  { name: "Border", var: "--border" },
  { name: "Input", var: "--input" },
  { name: "Ring", var: "--ring" },
] as const

export function ColorShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5" />
        <h2 className="text-2xl font-bold">1. Colors</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {COLORS.map((color) => (
          <Card key={color.var}>
            <CardHeader className="pb-3">
              <div
                className="h-20 w-full rounded-md border"
                style={{ backgroundColor: `var(${color.var})` }}
              />
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{color.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
