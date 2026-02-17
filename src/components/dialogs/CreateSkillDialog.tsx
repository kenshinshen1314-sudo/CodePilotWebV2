/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 CreateSkillDialog 创建技能对话框
 * [POS]: src/components/dialogs 的创建技能对话框组件
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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateSkillDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onCreateSkill?: (skill: {
    name: string
    description: string
    prompt: string
  }) => void
}

export function CreateSkillDialog({
  open: controlledOpen,
  onOpenChange,
  onCreateSkill,
}: CreateSkillDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [prompt, setPrompt] = useState("")

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const handleSubmit = () => {
    if (!name.trim() || !prompt.trim()) return

    onCreateSkill?.({
      name: name.trim(),
      description: description.trim(),
      prompt: prompt.trim(),
    })

    // 重置表单
    setName("")
    setDescription("")
    setPrompt("")
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建新 Skill</DialogTitle>
          <DialogDescription>
            创建一个自定义技能，让 AI 助手能够执行特定任务
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">
              Skill 名称 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="skill-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：代码审查"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill-description">描述</Label>
            <Input
              id="skill-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="简要描述这个 Skill 的用途"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill-prompt">
              Prompt <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="skill-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="输入你的提示词模板..."
              rows={6}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || !prompt.trim()}>
            创建
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
