/**
 * [INPUT]: 依赖 @/components/ui/card、navigation-menu，依赖 lucide-react 的 Menu、Frame、Box 图标
 * [OUTPUT]: 对外提供导航菜单展示章节组件
 * [POS]: src/components/design-system 的导航菜单展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent } from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, Frame, Box } from "lucide-react"

export function NavigationShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Menu className="h-5 w-5" />
        <h2 className="text-2xl font-bold">10. Navigation Menu</h2>
      </div>
      <Card>
        <CardContent className="pt-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a className="flex gap-4 p-3 rounded-md hover:bg-accent">
                          <Frame className="h-6 w-6" />
                          <div>
                            <p className="font-medium">Product One</p>
                            <p className="text-sm text-muted-foreground">Description for product one</p>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a className="flex gap-4 p-3 rounded-md hover:bg-accent">
                          <Box className="h-6 w-6" />
                          <div>
                            <p className="font-medium">Product Two</p>
                            <p className="text-sm text-muted-foreground">Description for product two</p>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a className="block p-3 rounded-md hover:bg-accent">
                          <p className="font-medium">Getting Started</p>
                          <p className="text-sm text-muted-foreground">Introduction to the platform</p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </CardContent>
      </Card>
    </section>
  )
}
