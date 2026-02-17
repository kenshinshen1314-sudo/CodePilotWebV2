/**
 * [INPUT]: 依赖 @/components/ui/card、scroll-area，依赖 lucide-react 的 Layers 图标
 * [OUTPUT]: 对外提供滚动区域展示章节组件
 * [POS]: src/components/design-system 的滚动区域展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Layers } from "lucide-react"

export function ScrollShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5" />
        <h2 className="text-2xl font-bold">14. Scroll Area</h2>
      </div>
      <Card>
        <CardContent className="pt-6">
          <ScrollArea className="h-48 w-full rounded-md border p-4">
            <div className="space-y-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Nullam auctor, nisl eget ultricies tincidunt.</p>
              <p>Fusce at leo vel libero pretium placerat.</p>
              <p>Donec eget ex magna. Interdum et malesuada fames ac ante.</p>
              <p>Curabitur vel sem a metus facilisis congue.</p>
              <p>Sed do eiusmod tempor incididunt ut labore.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  )
}
