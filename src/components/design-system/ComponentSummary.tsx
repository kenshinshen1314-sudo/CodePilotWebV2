/**
 * [INPUT]: 依赖 @/components/ui/card，依赖 lucide-react 的 CheckCircle2 图标
 * [OUTPUT]: 对外提供组件清单汇总组件
 * [POS]: src/components/design-system 的组件清单汇总组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const COMPONENT_LIST = [
  "Accordion", "Alert", "Aspect Ratio", "Avatar", "Badge", "Button",
  "Card", "Checkbox", "Collapsible", "Command", "Context Menu", "Dialog",
  "Dropdown Menu", "Form", "Hover Card", "Input", "Label", "Menubar",
  "Navigation Menu", "Popover", "Progress", "Radio Group", "Scroll Area",
  "Select", "Separator", "Sheet", "Skeleton", "Slider", "Sonner (Toast)",
  "Switch", "Table", "Tabs", "Textarea", "Toggle", "Toggle Group", "Tooltip"
] as const

export function ComponentSummary() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>全部 36 个组件清单</CardTitle>
          <CardDescription>已展示所有 shadcn/ui 组件</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
            {COMPONENT_LIST.map((component) => (
              <div key={component} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> {component}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
