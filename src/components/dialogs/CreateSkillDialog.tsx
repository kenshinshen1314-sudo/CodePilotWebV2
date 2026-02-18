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
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Globe, FolderOpen, FilePlus, GitCommit, Eye } from "lucide-react"

interface CreateSkillDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const scopeOptions = [
  {
    value: "global",
    label: "Global",
    icon: Globe,
    description: "Available to all projects",
  },
  {
    value: "project",
    label: "Project",
    icon: FolderOpen,
    description: "Only for current project",
  },
]

const templateOptions = [
  {
    value: "blank",
    label: "Blank",
    icon: FilePlus,
    description: "Start from scratch",
  },
  {
    value: "commit-helper",
    label: "Commit Helper",
    icon: GitCommit,
    description: "Generate commit messages",
  },
  {
    value: "code-reviewer",
    label: "Code Reviewer",
    icon: Eye,
    description: "Review code quality",
  },
]

export function CreateSkillDialog({ open, onOpenChange }: CreateSkillDialogProps) {
  const [name, setName] = useState("")
  const [scope, setScope] = useState<string>("")
  const [template, setTemplate] = useState<string>("")

  const handleSubmit = () => {
    console.log("Creating skill:", { name, scope, template })
    onOpenChange?.(false)
    setName("")
    setScope("")
    setTemplate("")
  }

  const handleCancel = () => {
    onOpenChange?.(false)
    setName("")
    setScope("")
    setTemplate("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogTitle className="sr-only">Create new skill</DialogTitle>

        <div className="p-6 space-y-6">
          {/* 标题 */}
          <h2 className="text-lg font-semibold">Create new skill</h2>

          {/* Skill Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              placeholder="Enter skill name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Scope */}
          <div className="space-y-2">
            <Label>Scope</Label>
            <div className="grid grid-cols-2 gap-3">
              {scopeOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setScope(option.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      scope === option.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        scope === option.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Template */}
          <div className="space-y-2">
            <Label>Template</Label>
            <div className="grid grid-cols-3 gap-3">
              {templateOptions.map((option) => {
                const Icon = option.icon
                return (
                  <HoverCard key={option.value} openDelay={200}>
                    <HoverCardTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setTemplate(option.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                          template === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            template === option.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent
                      className="w-48"
                      side="top"
                      align="center"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                )
              })}
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name || !scope || !template}
              className="bg-primary hover:bg-primary/90"
            >
              Create Skill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
