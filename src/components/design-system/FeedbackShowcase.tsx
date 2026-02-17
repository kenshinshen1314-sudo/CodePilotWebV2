/**
 * [INPUT]: 依赖 @/components/ui/card、button、label、progress、skeleton、tabs，依赖 sonner 的 toast，依赖 lucide-react 的 Loader2 图标
 * [OUTPUT]: 对外提供反馈组件展示章节组件
 * [POS]: src/components/design-system 的反馈组件展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function FeedbackShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Loader2 className="h-5 w-5" />
        <h2 className="text-2xl font-bold">15. Feedback Components</h2>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Progress</Label>
            <Progress value={66} />
          </div>
          <div className="space-y-2">
            <Label>Skeleton</Label>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tabs</Label>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-2">
                <p className="text-sm text-muted-foreground">Content for Tab 1</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-2">
                <p className="text-sm text-muted-foreground">Content for Tab 2</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-2">
                <p className="text-sm text-muted-foreground">Content for Tab 3</p>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-2">
            <Label>Sonner (Toast)</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => toast.success("Operation successful!")}
              >
                Success Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.error("Something went wrong!")}
              >
                Error Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.info("Here is some information")}
              >
                Info Toast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
