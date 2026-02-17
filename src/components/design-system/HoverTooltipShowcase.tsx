/**
 * [INPUT]: 依赖 @/components/ui/button、hover-card、tooltip、avatar，依赖 lucide-react 的 HelpCircle 图标
 * [OUTPUT]: 对外提供悬停卡片和提示框展示章节组件
 * [POS]: src/components/design-system 的悬停卡片和提示框展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { HelpCircle } from "lucide-react"

export function HoverTooltipShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5" />
        <h2 className="text-2xl font-bold">13. Hover Card & Tooltip</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Hover Me</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">Shadcn</p>
                <p className="text-sm text-muted-foreground">
                  Hover card component with rich content.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Tooltip Button</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip with additional information.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  )
}
