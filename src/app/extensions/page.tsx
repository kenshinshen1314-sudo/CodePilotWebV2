/**
 * [INPUT]: 依赖 react、"use client"，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 Extensions 页面
 * [POS]: src/app/extensions 的扩展管理页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Search, Zap, Plus, Server, CircleCheck, CircleX } from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateSkillDialog } from "@/components/dialogs/CreateSkillDialog"



// 模拟数据
const mockSkills = [
  {
    id: "1",
    name: "Code Review",
    description: "Review code for quality, security, and performance issues",
    content: "# Code Review Skill\n\nThis skill helps you review code for quality, security, and performance issues.\n\n## Features\n- Check for security vulnerabilities\n- Identify performance bottlenecks\n- Suggest code improvements",
  },
  {
    id: "2",
    name: "Generate Docs",
    description: "Automatically generate detailed documentation for code",
    content: "# Generate Documentation Skill\n\nAutomatically generate detailed documentation for your code.\n\n## Usage\nSimply share your code and this skill will create comprehensive documentation.",
  },
  {
    id: "3",
    name: "Optimize Performance",
    description: "Analyze code performance and suggest improvements",
    content: "# Performance Optimization Skill\n\nAnalyze your code and suggest performance improvements.\n\n## What it does\n- Identifies slow algorithms\n- Suggests better data structures\n- Recommends caching strategies",
  },
]

const mockMCPServers = [
  { id: "1", name: "filesystem", status: "connected" },
  { id: "2", name: "github", status: "connected" },
  { id: "3", name: "database", status: "disconnected" },
]

type TabType = "skills" | "mcp"

export default function ExtensionsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("skills")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [showCreateSkillDialog, setShowCreateSkillDialog] = useState(false)
  const [showAddMCPServerDialog, setShowAddMCPServerDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedSkillData = mockSkills.find((s) => s.id === selectedSkill)

  // Filter skills based on search query
  const filteredSkills = mockSkills.filter((skill) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const matches = skill.name.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query)
    console.log("Skill:", skill.name, "query:", searchQuery, "matches:", matches)
    return matches
  })
  console.log("filteredSkills count:", filteredSkills.length)

  // Filter MCP servers based on search query
  const filteredMCPServers = mockMCPServers.filter((server) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return server.name.toLowerCase().includes(query)
  })

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* 顶部标题和标签 */}
        <div className="flex flex-col justify-center px-4 pt-4 shrink-0 bg-background">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Extensions</h1>
            {activeTab === "skills" ? (
              <Button size="sm" onClick={() => setShowCreateSkillDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Skill
              </Button>
            ) : (
              <Button size="sm" onClick={() => setShowAddMCPServerDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Server
              </Button>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <button
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                activeTab === "skills"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
            <button
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                activeTab === "mcp"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab("mcp")}
            >
              MCP Servers
            </button>
          </div>
        </div>
        {/* 搜索框 */}
        <div className="pb-2 pt-4 ml-4">
          <div className="w-[280px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-8"
              />
            </div>
          </div>
        </div>
        {/* 主体内容 */}
        <div className="flex-1 flex overflow-hidden pt-4 ml-4">
          {activeTab === "skills" ? (
            <>
              {/* 左侧：Skills 列表 */}
              <div className="w-[280px] shrink-0 flex flex-col bg-muted/30">
                <ScrollArea className="flex-1 w-full h-full">
                  <div className="p-3 w-[280px]">
                    {filteredSkills.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No skills found
                      </div>
                    ) : (
                      filteredSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1",
                            selectedSkill === skill.id
                              ? "bg-muted"
                              : "hover:bg-muted/50"
                          )}
                          onClick={() => setSelectedSkill(skill.id)}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                              selectedSkill === skill.id ? "bg-foreground" : "bg-muted"
                            )}
                          >
                            <Zap
                              className={cn(
                                "w-4 h-4",
                                selectedSkill === skill.id ? "text-background" : "text-foreground"
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{skill.name}</p>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* 中间：Skill 内容或空状态 */}
              <div className="flex-1 flex flex-col overflow-hidden bg-background">
                {selectedSkillData ? (
                  <ScrollArea className="flex-1">
                    <div className="p-8 max-w-3xl">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Zap className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold">{selectedSkillData.name}</h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedSkillData.description}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">System prompt</label>
                        <div className="p-4 rounded-lg bg-muted text-sm font-mono whitespace-pre-wrap min-h-[200px]">
                          {selectedSkillData.content}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium mb-2">You haven&apos;t created any skills yet</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create your first skill to get started
                      </p>
                      <Button onClick={() => setShowCreateSkillDialog(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create new skill
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* 左侧：MCP Servers 列表 */}
              <div className="w-[280px] shrink-0 flex flex-col bg-muted/30">
                <ScrollArea className="flex-1 w-full h-full">
                  <div className="p-3 w-[280px]">
                    {filteredMCPServers.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No MCP servers found
                      </div>
                    ) : (
                      filteredMCPServers.map((server) => (
                        <div
                          key={server.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1",
                            selectedServer === server.id
                              ? "bg-muted"
                              : "hover:bg-muted/50"
                          )}
                          onClick={() => setSelectedServer(server.id)}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                              selectedServer === server.id ? "bg-foreground" : "bg-muted"
                            )}
                          >
                            <Server
                              className={cn(
                                "w-4 h-4",
                                selectedServer === server.id ? "text-background" : "text-foreground"
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{server.name}</p>
                          </div>
                          {server.status === "connected" ? (
                            <CircleCheck className="w-5 h-5 text-green-500 shrink-0" />
                          ) : (
                            <CircleX className="w-5 h-5 text-red-500 shrink-0" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* 中间：MCP Server 内容或空状态 */}
              <div className="flex-1 flex items-center justify-center bg-background">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Server className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium mb-2">You haven&apos;t configured any MCP servers yet</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an MCP server to extend Claude&apos;s capabilities
                  </p>
                  <Button onClick={() => setShowAddMCPServerDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add MCP server
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Create Skill Dialog */}
      <CreateSkillDialog
        open={showCreateSkillDialog}
        onOpenChange={setShowCreateSkillDialog}
      />

      {/* Add MCP Server Dialog */}
      <AddMCPServerDialog
        open={showAddMCPServerDialog}
        onOpenChange={setShowAddMCPServerDialog}
      />
    </div>
  )
}

// Add MCP Server Dialog Component
function AddMCPServerDialog({
  open,
  onOpenChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [serverName, setServerName] = useState("")
  const [editMode, setEditMode] = useState<"form" | "json">("form")
  const [serverType, setServerType] = useState<string>("")
  const [command, setCommand] = useState("")
  const [args, setArgs] = useState("")
  const [envVars, setEnvVars] = useState("")

  const handleSubmit = () => {
    console.log("Adding MCP server:", { serverName, editMode, serverType, command, args, envVars })
    onOpenChange?.(false)
  }

  const handleCancel = () => {
    onOpenChange?.(false)
  }

  const editModeOptions = [
    { value: "form", label: "Form" },
    { value: "json", label: "JSON" },
  ]

  const serverTypeOptions = [
    { value: "studio", label: "Studio" },
    { value: "sse", label: "SSE" },
    { value: "http", label: "HTTP" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogTitle className="sr-only">Add MCP Server</DialogTitle>

        <div className="p-6 space-y-6">
          {/* 标题 */}
          <h2 className="text-lg font-semibold">Add MCP Server</h2>

          {/* 表单内容 */}
          <div className="space-y-4">
            {/* Server Name */}
            <div className="space-y-2">
              <Label htmlFor="server-name">Server Name</Label>
              <Input
                id="server-name"
                placeholder="Enter server name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />
            </div>

            {/* Edit Mode */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Edit Mode:</Label>
                <Tabs value={editMode} onValueChange={(v) => setEditMode(v as "form" | "json")}>
                  <TabsList className="grid grid-cols-2 w-40">
                    {editModeOptions.map((option) => (
                      <TabsTrigger key={option.value} value={option.value}>
                        {option.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Server Type */}
            <div className="space-y-2">
              <Label>Server Type</Label>
              <Tabs value={serverType} onValueChange={setServerType}>
                <TabsList className="grid grid-cols-3 w-full">
                  {serverTypeOptions.map((option) => (
                    <TabsTrigger key={option.value} value={option.value}>
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Command */}
            <div className="space-y-2">
              <Label htmlFor="server-command">Command</Label>
              <Input
                id="server-command"
                placeholder="npx -s server-name"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
            </div>

            {/* Arguments (one per line) */}
            <div className="space-y-2">
              <Label>Arguments (one per line)</Label>
              <div className="p-3 rounded-lg border bg-muted/30">
                <textarea
                  className="w-full min-h-[60px] bg-transparent text-sm resize-none focus:outline-none"
                  placeholder="Enter arguments, one per line"
                  value={args}
                  onChange={(e) => setArgs(e.target.value)}
                />
              </div>
            </div>

            {/* Environment Variables (JSON) */}
            <div className="space-y-2">
              <Label>Environment Variables (JSON)</Label>
              <div className="p-3 rounded-lg border bg-muted/30">
                <textarea
                  className="w-full min-h-[80px] bg-transparent text-sm font-mono resize-none focus:outline-none"
                  placeholder="{}"
                  value={envVars}
                  onChange={(e) => setEnvVars(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleSubmit}>
              Add Server
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
