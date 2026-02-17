/**
 * [INPUT]: 依赖 react、@/components/ui/button、dialog、sheet，依赖 lucide-react 的 Frame 图标
 * [OUTPUT]: 对外提供对话框和侧边栏展示章节组件
 * [POS]: src/components/design-system 的对话框和侧边栏展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Frame } from "lucide-react"

export function DialogSheetShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Frame className="h-5 w-5" />
        <h2 className="text-2xl font-bold">8. Dialog & Sheet</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog component with title, description, and footer.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">Dialog content goes here.</div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>
                This is a sheet component that slides in from the side.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">Sheet content goes here.</div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setSheetOpen(false)}>Close</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  )
}
