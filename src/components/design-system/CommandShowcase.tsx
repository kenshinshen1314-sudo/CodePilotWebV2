/**
 * [INPUT]: 依赖 react、@/components/ui/button、command，依赖 lucide-react 的 Search、Frame、Settings、User、Plus 图标
 * [OUTPUT]: 对外提供命令面板展示章节组件
 * [POS]: src/components/design-system 的命令面板展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Search, Frame, Settings, User, Plus } from "lucide-react"

export function CommandShowcase() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-5 w-5" />
        <h2 className="text-2xl font-bold">12. Command Palette</h2>
      </div>
      <div className="flex justify-start">
        <Button onClick={() => setCommandOpen(true)}>
          <Search className="mr-2 h-4 w-4" />
          Open Command (⌘K)
        </Button>
      </div>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Frame className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Project</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </section>
  )
}
