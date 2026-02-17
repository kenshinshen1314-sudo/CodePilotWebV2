/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 AddMCPServerDialog 添加 MCP 服务器对话框
 * [POS]: src/components/dialogs 的添加 MCP 服务器对话框组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface AddMCPServerDialogProps {
  onAddServer?: (server: {
    name: string
    command: string
    args: string
  }) => void
}

export function AddMCPServerDialog({ onAddServer }: AddMCPServerDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [command, setCommand] = useState("")
  const [args, setArgs] = useState("")

  const handleSubmit = () => {
    if (!name.trim() || !command.trim()) return

    onAddServer?.({
      name: name.trim(),
      command: command.trim(),
      args: args.trim(),
    })

    // 重置表单
    setName("")
    setCommand("")
    setArgs("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          添加服务器
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>添加 MCP 服务器</DialogTitle>
          <DialogDescription>
            添加一个 Model Context Protocol 服务器以扩展功能
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="server-name">
              服务器名称 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="server-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：filesystem"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="server-command">
              命令 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="server-command"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="例如：npx"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="server-args">参数</Label>
            <Input
              id="server-args"
              value={args}
              onChange={(e) => setArgs(e.target.value)}
              placeholder="例如：-y @modelcontextprotocol/server-filesystem"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || !command.trim()}>
            添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
