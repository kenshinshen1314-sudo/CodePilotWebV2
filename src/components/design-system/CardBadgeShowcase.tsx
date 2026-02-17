/**
 * [INPUT]: 依赖 @/components/ui/card、badge，依赖 lucide-react 的 Layout 图标
 * [OUTPUT]: 对外提供卡片和徽章展示章节组件
 * [POS]: src/components/design-system 的卡片和徽章展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layout } from "lucide-react"

export function CardBadgeShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Layout className="h-5 w-5" />
        <h2 className="text-2xl font-bold">6. Cards & Badges</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>完整 Card</CardTitle>
            <CardDescription>包含所有子组件的 Card</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Card content with additional information.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Action</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>带 CardAction</CardTitle>
            <CardDescription>使用 CardAction 的示例</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm">Setting</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">CardAction 通常放在 Header 中用于放置操作按钮。</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Badges</CardTitle>
              <Badge>Default</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Badge 组件展示：</p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
