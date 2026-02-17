/**
 * [INPUT]: 依赖 @/components/ui/card、aspect-ratio、label，依赖 lucide-react 的 Frame 图标
 * [OUTPUT]: 对外提供宽高比展示章节组件
 * [POS]: src/components/design-system 的宽高比展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Label } from "@/components/ui/label"
import { Frame } from "lucide-react"

export function AspectRatioShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Frame className="h-5 w-5" />
        <h2 className="text-2xl font-bold">19. Aspect Ratio</h2>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>16:9</Label>
              <AspectRatio ratio={16 / 9}>
                <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                  16:9
                </div>
              </AspectRatio>
            </div>
            <div className="space-y-2">
              <Label>4:3</Label>
              <AspectRatio ratio={4 / 3}>
                <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                  4:3
                </div>
              </AspectRatio>
            </div>
            <div className="space-y-2">
              <Label>1:1</Label>
              <AspectRatio ratio={1 / 1}>
                <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                  1:1
                </div>
              </AspectRatio>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
