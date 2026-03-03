/**
 * [INPUT]: 依赖 react、"use client"，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 Skills 页面
 * [POS]: src/app/skills 的 Skills 管理页面
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
import { Search, Plus, Sparkles as SparklesIcon, Store, Package, Download, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateSkillDialog } from "@/components/dialogs/CreateSkillDialog"

// Mock data for skills
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

// Mock data for marketplace items
const mockMarketplaceItems = [
  {
    id: "m1",
    name: "Database Query Builder",
    description: "Generate optimized SQL queries based on natural language descriptions",
    category: "Database",
    author: "CodePilot Team",
    rating: 4.8,
    downloads: "12.5k",
    installed: false,
  },
  {
    id: "m2",
    name: "API Endpoint Generator",
    description: "Create RESTful API endpoints with proper error handling and validation",
    category: "Backend",
    author: "DevTools Inc",
    rating: 4.9,
    downloads: "8.2k",
    installed: true,
  },
  {
    id: "m3",
    name: "UI Component Templater",
    description: "Generate responsive UI components with Tailwind CSS and shadcn/ui",
    category: "Frontend",
    author: "UI Master",
    rating: 4.7,
    downloads: "15.3k",
    installed: false,
  },
  {
    id: "m4",
    name: "Test Case Generator",
    description: "Automatically generate comprehensive unit and integration tests",
    category: "Testing",
    author: "QA Labs",
    rating: 4.6,
    downloads: "6.8k",
    installed: false,
  },
  {
    id: "m5",
    name: "Code Refactoring Assistant",
    description: "Suggest and apply code refactoring patterns to improve code quality",
    category: "Code Quality",
    author: "Clean Code Co",
    rating: 4.8,
    downloads: "9.1k",
    installed: true,
  },
]

type TabType = "skills" | "marketplace"

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("skills")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [selectedMarketItem, setSelectedMarketItem] = useState<string | null>(null)
  const [showCreateSkillDialog, setShowCreateSkillDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingSkill, setEditingSkill] = useState<typeof mockSkills[0] | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editContent, setEditContent] = useState("")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const selectedSkillData = mockSkills.find((s) => s.id === selectedSkill)
  const selectedMarketItemData = mockMarketplaceItems.find((i) => i.id === selectedMarketItem)

  // Filter skills based on search query
  const filteredSkills = mockSkills.filter((skill) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return skill.name.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query)
  })

  // Filter marketplace items based on search query
  const filteredMarketItems = mockMarketplaceItems.filter((item) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
  })

  const handleCreateSkill = (skillData: { name: string; description: string; content: string }) => {
    console.log("Creating skill:", skillData)
    setShowCreateSkillDialog(false)
    // Here you would call an API to create the skill
  }

  const handleUpdateSkill = () => {
    if (!editingSkill) return
    console.log("Updating skill:", {
      id: editingSkill.id,
      name: editName,
      description: editDescription,
      content: editContent,
    })
    setShowEditDialog(false)
    setEditingSkill(null)
    // Here you would call an API to update the skill
  }

  const handleDeleteSkill = () => {
    if (!selectedSkill) return
    console.log("Deleting skill:", selectedSkill)
    setShowDeleteDialog(false)
    setSelectedSkill(null)
    // Here you would call an API to delete the skill
  }

  const openEditDialog = () => {
    if (!selectedSkillData) return
    setEditingSkill(selectedSkillData)
    setEditName(selectedSkillData.name)
    setEditDescription(selectedSkillData.description)
    setEditContent(selectedSkillData.content)
    setShowEditDialog(true)
  }

  const handleInstallToggle = (itemId: string, currentlyInstalled: boolean) => {
    console.log(currentlyInstalled ? "Uninstalling" : "Installing", "item:", itemId)
    // Here you would call an API to install/uninstall the item
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* 顶部标题和标签 */}
        <div className="flex flex-col justify-center px-4 pt-4 shrink-0 bg-background">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Skills</h1>
            {activeTab === "skills" ? (
              <Button size="sm" onClick={() => setShowCreateSkillDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Skill
              </Button>
            ) : null}
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
                activeTab === "marketplace"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab("marketplace")}
            >
              Marketplace
            </button>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="pb-2 pt-4 ml-4">
          <div className="w-[280px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={activeTab === "skills" ? "Search skills..." : "Search marketplace..."}
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
                        {searchQuery ? "No skills found" : "No skills yet"}
                      </div>
                    ) : (
                      filteredSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1 group",
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
                            <SparklesIcon
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
                  <>
                    {/* Skill 详情 */}
                    <ScrollArea className="flex-1">
                      <div className="p-8 max-w-3xl">
                        {/* 顶部：标题和操作按钮 */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                              <SparklesIcon className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                              <h2 className="text-xl font-semibold">{selectedSkillData.name}</h2>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedSkillData.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={openEditDialog}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowDeleteDialog(true)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>

                        {/* System Prompt 内容 */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">System Prompt</label>
                          </div>
                          <div className="p-4 rounded-lg bg-muted text-sm font-mono whitespace-pre-wrap min-h-[200px] max-h-[600px] overflow-y-auto">
                            {selectedSkillData.content}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                        <SparklesIcon className="w-8 h-8 text-muted-foreground" />
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
              {/* 左侧：Marketplace 列表 */}
              <div className="w-[280px] shrink-0 flex flex-col bg-muted/30">
                <ScrollArea className="flex-1 w-full h-full">
                  <div className="p-3 w-[280px]">
                    {filteredMarketItems.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No items found
                      </div>
                    ) : (
                      filteredMarketItems.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1 group",
                            selectedMarketItem === item.id
                              ? "bg-muted"
                              : "hover:bg-muted/50"
                          )}
                          onClick={() => setSelectedMarketItem(item.id)}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                              selectedMarketItem === item.id ? "bg-foreground" : "bg-muted"
                            )}
                          >
                            <Package
                              className={cn(
                                "w-4 h-4",
                                selectedMarketItem === item.id ? "text-background" : "text-foreground"
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              {item.installed && (
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-xs text-muted-foreground">{item.category}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <div className="flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                <span className="text-xs text-muted-foreground">{item.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* 中间：Marketplace Item 详情或空状态 */}
              <div className="flex-1 flex flex-col overflow-hidden bg-background">
                {selectedMarketItemData ? (
                  <ScrollArea className="flex-1">
                    <div className="p-8 max-w-3xl">
                      {/* 顶部：图标和标题 */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">{selectedMarketItemData.name}</h2>
                            {selectedMarketItemData.installed && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                                Installed
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedMarketItemData.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span>By {selectedMarketItemData.author}</span>
                            <span>•</span>
                            <span>{selectedMarketItemData.category}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                              <span>{selectedMarketItemData.rating}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Download className="w-3.5 h-3.5" />
                              <span>{selectedMarketItemData.downloads}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={selectedMarketItemData.installed ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleInstallToggle(selectedMarketItemData.id, selectedMarketItemData.installed)}
                        >
                          {selectedMarketItemData.installed ? "Uninstall" : "Install"}
                        </Button>
                      </div>

                      {/* 详细信息 */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <h3 className="text-sm font-medium mb-2">About this extension</h3>
                          <p className="text-sm text-muted-foreground">
                            This extension provides enhanced capabilities for your workflow.
                            It has been tested and verified by the community.
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/50">
                          <h3 className="text-sm font-medium mb-2">Version</h3>
                          <p className="text-sm text-muted-foreground">1.0.0</p>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/50">
                          <h3 className="text-sm font-medium mb-2">Category</h3>
                          <p className="text-sm text-muted-foreground">{selectedMarketItemData.category}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                        <Store className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium mb-2">Browse the Marketplace</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Discover and install extensions to enhance your workflow
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Create Skill Dialog */}
      <CreateSkillDialog
        open={showCreateSkillDialog}
        onOpenChange={setShowCreateSkillDialog}
        onCreate={handleCreateSkill}
      />

      {/* Edit Skill Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle>Edit Skill</DialogTitle>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Skill name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Short description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">System Prompt</Label>
              <textarea
                id="edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Enter the system prompt..."
                rows={12}
                className="w-full min-h-[200px] max-h-[400px] p-3 rounded-lg border bg-muted/30 text-sm font-mono whitespace-pre-wrap resize-y-auto focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSkill}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogTitle>Delete Skill</DialogTitle>
          <div className="pt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <span className="font-medium text-foreground">"{selectedSkillData?.name}"</span>?
            </p>
            <p className="text-xs text-muted-foreground">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteSkill}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
