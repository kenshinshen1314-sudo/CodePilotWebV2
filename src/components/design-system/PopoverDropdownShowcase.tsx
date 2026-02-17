/**
 * [INPUT]: 依赖 @/components/ui/button、popover、dropdown-menu，依赖 lucide-react 的 Circle、User、Settings、LogOut、ChevronDown 图标
 * [OUTPUT]: 对外提供气泡卡片和下拉菜单展示章节组件
 * [POS]: src/components/design-system 的气泡卡片和下拉菜单展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Circle, User, Settings, LogOut, ChevronDown } from "lucide-react"

export function PopoverDropdownShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Circle className="h-5 w-5" />
        <h2 className="text-2xl font-bold">9. Popover & Dropdown Menu</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <h4 className="font-medium">Popover Title</h4>
              <p className="text-sm text-muted-foreground">
                This is a popover component with additional content.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" /> Account
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  )
}
