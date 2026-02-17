/**
 * [INPUT]: 依赖 @/components/ui/card、input、label、switch、checkbox、textarea，依赖 lucide-react 的 Keyboard 图标
 * [OUTPUT]: 对外提供输入框展示章节组件
 * [POS]: src/components/design-system 的输入框展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Keyboard } from "lucide-react"

export function InputShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Keyboard className="h-5 w-5" />
        <h2 className="text-2xl font-bold">4. Inputs</h2>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-default">Input</Label>
            <Input id="input-default" placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input-disabled">Disabled</Label>
            <Input id="input-disabled" disabled placeholder="Disabled..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="textarea">Textarea</Label>
            <Textarea id="textarea" placeholder="Enter multiple lines..." rows={3} />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch id="switch-default" />
              <Label htmlFor="switch-default">Switch</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="checkbox-default" />
              <Label htmlFor="checkbox-default">Checkbox</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
