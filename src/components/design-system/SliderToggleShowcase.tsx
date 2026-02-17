/**
 * [INPUT]: 依赖 @/components/ui/card、slider、toggle、toggle-group、label，依赖 lucide-react 的 Scale、PanelLeft、Frame、Box 图标
 * [OUTPUT]: 对外提供滑块和切换展示章节组件
 * [POS]: src/components/design-system 的滑块和切换展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Scale, PanelLeft, Frame, Box } from "lucide-react"

export function SliderToggleShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Scale className="h-5 w-5" />
        <h2 className="text-2xl font-bold">17. Slider & Toggle</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Slider</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Slider</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label>Range Slider</Label>
              <Slider defaultValue={[25, 75]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Toggle & Toggle Group</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Toggle</Label>
              <div className="flex gap-2">
                <Toggle>Bold</Toggle>
                <Toggle variant="outline">Italic</Toggle>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Toggle Group</Label>
              <ToggleGroup type="single" defaultValue="left">
                <ToggleGroupItem value="left">
                  <PanelLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Frame className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <Box className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
