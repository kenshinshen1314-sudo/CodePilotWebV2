/**
 * [INPUT]: 依赖 @/components/ui/button，依赖 @/components/ui/card，依赖 @/components/ui/label，依赖 lucide-react 的 Box 和 Plus 图标
 * [OUTPUT]: 对外提供按钮展示章节组件
 * [POS]: src/components/design-system 的按钮展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Box, Plus, Settings } from "lucide-react"

export function ButtonShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Box className="h-5 w-5" />
        <h2 className="text-2xl font-bold">3. Buttons</h2>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Variants</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div>
            <Label>Sizes</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <Label>With Icon</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button>
              <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
