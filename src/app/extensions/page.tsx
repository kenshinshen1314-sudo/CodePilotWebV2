/**
 * [INPUT]: 依赖 react、"use client"，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 Extensions 页面，按 ui/3.png 结构组织
 * [POS]: src/app/extensions 的扩展管理页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Plus, Trash2, Save } from "lucide-react"
import { CreateSkillDialog } from "@/components/dialogs/CreateSkillDialog"
import { cn } from "@/lib/utils"

// 模拟数据
const mockSkills = [
  {
    id: "1",
    name: "代码审查",
    description: "对代码进行全面的审查，识别潜在问题和改进点",
    prompt: "请审查以下代码，检查代码质量，安全性和性能问题。",
  },
  {
    id: "2",
    name: "文档生成",
    description: "自动为代码生成详细的文档注释",
    prompt: "为以下代码生成详细的文档注释，包括函数说明、参数和返回值。",
  },
  {
    id: "3",
    name: "性能优化",
    description: "分析代码性能并提供优化建议",
    prompt: "分析以下代码的性能瓶颈，提供优化建议。",
  },
]

const mockMCPServers: { id: string; name: string; status: string }[] = []

export default function ExtensionsPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>("1")
  const [showCreateSkillDialog, setShowCreateSkillDialog] = useState(false)

  const selectedSkillData = mockSkills.find((s) => s.id === selectedSkill)

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex">
        {/* 左侧：Installed Skills */}
        <div className="w-[280px] flex flex-col shrink-0">
          {/* 头部 */}
          <div className="h-12 flex items-center px-4 border-b bg-card">
            <span className="text-sm font-medium">Installed Skills</span>
            <Badge variant="secondary" className="ml-2 text-xs">
              {mockSkills.length}
            </Badge>
          </div>

          {/* Skills 列表 */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {mockSkills.map((skill) => (
                <div
                  key={skill.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border border-border cursor-pointer transition-all",
                    selectedSkill === skill.id
                      ? "bg-accent border-primary/50"
                      : "hover:bg-accent/50"
                  )}
                  onClick={() => setSelectedSkill(skill.id)}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                    selectedSkill === skill.id
                      ? "bg-primary"
                      : "bg-muted"
                  )}>
                    <Zap className={cn(
                      "w-4 h-4",
                      selectedSkill === skill.id
                        ? "text-primary-foreground"
                        : "text-primary"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{skill.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {skill.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* 底部按钮 */}
          <div className="p-2 border-t bg-card">
            <Button
              variant="outline"
              className="w-full justify-start h-9"
              onClick={() => setShowCreateSkillDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create new skill
            </Button>
          </div>
        </div>

        {/* 中间：Skill Detail */}
        {selectedSkillData && (
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-6 max-w-3xl">
                <Card className="bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{selectedSkillData.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedSkillData.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Prompt</h3>
                      <div className="p-4 rounded-lg bg-muted text-sm font-mono whitespace-pre-wrap">
                        {selectedSkillData.prompt}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>

            {/* 底部操作按钮 */}
            <div className="h-14 px-6 flex items-center justify-end gap-3 border-t bg-card">
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:border-destructive/50">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Skill
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        )}

        {/* 右侧：Installed MCP Servers */}
        <div className="w-[260px] flex flex-col shrink-0 border-l">
          {/* 头部 */}
          <div className="h-12 flex items-center px-4 border-b bg-card">
            <span className="text-sm font-medium">Installed MCP Servers</span>
            <Badge variant="secondary" className="ml-2 text-xs">
              {mockMCPServers.length}
            </Badge>
          </div>

          {/* 服务器列表或空状态 */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              {mockMCPServers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    No MCP Servers installed
                  </p>
                  <Button variant="outline" size="sm">
                    <Plus className="w-3 h-3 mr-1" />
                    Add MCP Server
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {mockMCPServers.map((server) => (
                    <div
                      key={server.id}
                      className="p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-all"
                    >
                      <p className="text-sm font-medium">{server.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{server.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* 底部 */}
          <div className="p-2 border-t bg-card">
            <Button variant="outline" className="w-full justify-start h-9">
              Configure MCP Servers
            </Button>
          </div>
        </div>
      </main>

      <CreateSkillDialog
        open={showCreateSkillDialog}
        onOpenChange={setShowCreateSkillDialog}
      />
    </div>
  )
}
