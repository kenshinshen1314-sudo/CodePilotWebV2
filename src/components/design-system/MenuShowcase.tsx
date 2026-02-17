/**
 * [INPUT]: 依赖 @/components/ui/card、menubar、context-menu，依赖 lucide-react 的 Menu 图标
 * [OUTPUT]: 对外提供菜单栏和右键菜单展示章节组件
 * [POS]: src/components/design-system 的菜单栏和右键菜单展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Menu } from "lucide-react"

export function MenuShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Menu className="h-5 w-5" />
        <h2 className="text-2xl font-bold">18. Menubar & Context Menu</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Menubar</CardTitle>
          </CardHeader>
          <CardContent>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Undo</MenubarItem>
                  <MenubarItem>Redo</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Context Menu</CardTitle>
            <CardDescription>Right-click anywhere to test</CardDescription>
          </CardHeader>
          <CardContent>
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <p className="px-2 py-1.5 text-sm font-medium">Actions</p>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Option 1</ContextMenuItem>
                    <ContextMenuItem>Option 2</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuContent>
            </ContextMenu>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
