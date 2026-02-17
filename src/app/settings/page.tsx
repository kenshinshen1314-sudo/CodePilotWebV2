/**
 * [INPUT]: 依赖 react、"use client"，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 Settings 页面，完整的长页面设计
 * [POS]: src/app/settings 的设置页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AddProviderDialog,
  type Provider as DialogProvider,
  type ProviderType,
} from "@/components/dialogs/AddProviderDialog"
import {
  Check,
  X,
  Plus,
  RotateCcw,
  Save,
  Edit,
  Trash2,
  Eye,
  Code2,
} from "lucide-react"

// Provider 数据类型
interface Provider {
  id: string
  name: string
  url: string
  type?: ProviderType
  apiKey?: string
  extraEnvVars?: string
  notes?: string
  isActive: boolean
}

// Provider Type 默认配置
const PROVIDER_DEFAULTS: Record<string, { type: ProviderType; url: string }> = {
  "Anthropic": { type: "anthropic", url: "https://api.anthropic.com/v1/" },
  "OpenRouter": { type: "openrouter", url: "https://openrouter.ai/api/v1/" },
  "GLM (CN)": { type: "custom", url: "https://open.bigmodel.cn/api/paas/v3/" },
  "GLM(Global)": { type: "custom", url: "https://open.bigmodel.cn/api/paas/v4/" },
  "Moonshot": { type: "custom", url: "https://api.moonshot.cn/v1/" },
  "MiniMax (CN)": { type: "custom", url: "https://api.minimax.chat/v1/" },
  "MiniMax (Global)": { type: "custom", url: "https://api.minimax.com/v1/" },
  "AWS Bedrock": { type: "custom", url: "https://bedrock-runtime.us-east-1.amazonaws.com/" },
  "Google Vertex": { type: "custom", url: "https://us-central1-aiplatform.googleapis.com/v1/" },
  "LiteLLM": { type: "custom", url: "http://0.0.0.0:4000/" },
  "Kimi Coding Plan": { type: "custom", url: "https://api.moonshot.cn/v1/" },
}

// 模拟数据
const mockProviders: Provider[] = [
  {
    id: "1",
    name: "GLM (CN)",
    url: "https://open.bigmodel.cn/api/paas/v3/",
    type: "custom",
    apiKey: "",
    extraEnvVars: "",
    notes: "",
    isActive: true,
  },
  {
    id: "2",
    name: "Anthropic",
    url: "https://api.anthropic.com/v1/",
    type: "anthropic",
    apiKey: "",
    extraEnvVars: "",
    notes: "",
    isActive: false,
  },
  {
    id: "3",
    name: "OpenRouter",
    url: "https://openrouter.ai/api/v1/",
    type: "openrouter",
    apiKey: "",
    extraEnvVars: "",
    notes: "",
    isActive: false,
  },
  {
    id: "4",
    name: "GLM(Global)",
    url: "https://open.bigmodel.cn/api/paas/v4/",
    type: "custom",
    apiKey: "",
    extraEnvVars: "",
    notes: "",
    isActive: false,
  },
]

const quickAddOptions = [
  "Anthropic",
  "OpenRouter",
  "GLM (CN)",
  "GLM(Global)",
  "Moonshot",
  "MiniMax (CN)",
  "MiniMax (Global)",
  "AWS Bedrock",
  "Google Vertex",
  "LiteLLM",
  "Kimi Coding Plan",
]

const envVarsData = {
  ANTHROPIC_AUTH_TOKEN: "sk-ant-xxxxx",
  ANTHROPIC_BASE_URL: "https://api.anthropic.com",
  CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: "true",
  ANTHROPIC_MODEL: "claude-sonnet-4-20250514",
  ANTHROPIC_MAX_TOKENS: "8192",
}

const permissionsData = {
  allow: [
    "WebSearch",
    "Bash(cmd=['python3', '-c', 'import sys; print(sys.version)'])",
    "Bash(cmd=['pip', 'list'])",
    "Bash(cmd=['npm', 'list'])",
  ],
}

export default function SettingsPage() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders)
  const [language, setLanguage] = useState("chinese")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null)
  const [quickAddProvider, setQuickAddProvider] = useState<string | null>(null)

  // 可编辑的配置内容
  const [autoApprove, setAutoApprove] = useState(false)
  const [editorMode, setEditorMode] = useState<"visual" | "json">("visual")
  const [permissions, setPermissions] = useState(JSON.stringify(permissionsData, null, 2))
  const [envVars, setEnvVars] = useState(JSON.stringify(envVarsData, null, 2))
  const [enabledPlugins, setEnabledPlugins] = useState(JSON.stringify({ "rust-analyzer-lsp@claude-plugins-official": true }, null, 2))

  // 打开添加 Provider 对话框
  const handleOpenAddDialog = () => {
    setEditingProvider(null)
    setQuickAddProvider(null)
    setAddDialogOpen(true)
  }

  // 打开编辑 Provider 对话框
  const handleOpenEditDialog = (provider: Provider) => {
    setEditingProvider(provider)
    setQuickAddProvider(null)
    setAddDialogOpen(true)
  }

  // QUICK ADD 点击处理
  const handleQuickAdd = (option: string) => {
    if (option === "ExternalMCP Tools") {
      // TODO: 处理 MCP Tools 添加
      return
    }
    setEditingProvider(null)
    setQuickAddProvider(option)
    setAddDialogOpen(true)
  }

  // 添加 Provider
  const handleAddProvider = (providerData: DialogProvider) => {
    const newProvider: Provider = {
      id: Date.now().toString(),
      name: providerData.name,
      url: providerData.baseUrl || PROVIDER_DEFAULTS[providerData.name]?.url || providerData.name.toLowerCase(),
      type: providerData.type,
      apiKey: providerData.apiKey,
      extraEnvVars: providerData.extraEnvVars,
      notes: providerData.notes,
      isActive: false,
    }
    setProviders([...providers, newProvider])
    setAddDialogOpen(false)
    setQuickAddProvider(null)
  }

  // 保存 Provider 编辑
  const handleSaveProvider = (providerData: DialogProvider) => {
    if (!editingProvider) return
    setProviders(providers.map((p) =>
      p.id === editingProvider.id
        ? {
            ...p,
            name: providerData.name,
            url: providerData.baseUrl || p.url,
            type: providerData.type,
            apiKey: providerData.apiKey,
            extraEnvVars: providerData.extraEnvVars,
            notes: providerData.notes,
          }
        : p
    ))
    setAddDialogOpen(false)
    setEditingProvider(null)
  }

  const handleSetActiveProvider = (providerId: string) => {
    setProviders(providers.map((p) => ({
      ...p,
      isActive: p.id === providerId,
    })))
  }

  const handleDeleteProvider = (providerId: string) => {
    setProviders(providers.filter((p) => p.id !== providerId))
  }

  // 构建对话框的默认 provider 数据
  const getDialogProvider = (): DialogProvider | undefined => {
    if (editingProvider) {
      return {
        id: editingProvider.id,
        name: editingProvider.name,
        type: editingProvider.type || "anthropic",
        apiKey: editingProvider.apiKey || "",
        baseUrl: editingProvider.url,
        extraEnvVars: editingProvider.extraEnvVars,
        notes: editingProvider.notes,
      }
    }
    if (quickAddProvider && PROVIDER_DEFAULTS[quickAddProvider]) {
      const defaults = PROVIDER_DEFAULTS[quickAddProvider]
      return {
        name: quickAddProvider,
        type: defaults.type,
        apiKey: "",
        baseUrl: defaults.url,
        extraEnvVars: "",
        notes: "",
      }
    }
    return undefined
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {/* 页面头部 */}
        <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage CodePilot and Claude CLI settings</p>
      </div>

      <div className="container max-w-3xl mx-auto px-4 pb-12 space-y-6">
        {/* 第一部分：CodePilot Settings */}
        <Card className="bg-card shadow-sm">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">CodePilot</h2>
                <p className="text-sm text-muted-foreground mt-1">Version: 0.8.4</p>
                <p className="text-sm text-muted-foreground">You&apos;re on the latest version</p>
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Check for Updates
              </Button>
            </div>
          </div>
        </Card>

        {/* 第二部分：API Providers */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">API Providers ({providers.length})</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                Manage API providers for CodePilot. The active provider will be used for all sessions.
              </p>
            </div>
            <Button onClick={handleOpenAddDialog} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Add Provider
            </Button>
          </div>

          {/* Provider Items */}
          <div className="space-y-2">
            {providers.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono mt-1 truncate">{provider.url}</p>
                </div>

                <div className="flex items-center gap-3">
                  {provider.isActive ? (
                    <Badge className="bg-primary text-primary-foreground border-0">
                      <Check className="h-3 w-3 mr-1" />
                      Apply
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-muted-foreground">
                      Inactive
                    </Badge>
                  )}

                  <div className="flex items-center gap-1">
                    {!provider.isActive && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:bg-primary/10"
                        onClick={() => handleSetActiveProvider(provider.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {provider.isActive && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleOpenEditDialog(provider)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteProvider(provider.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ADD 部分 */}
        <div>
          <h3 className="text-sm font-bold text-muted-foreground mb-3">QUICK ADD</h3>
          <div className="flex flex-wrap gap-2">
            {quickAddOptions.map((option) => (
              <Button
                key={option}
                variant="outline"
                onClick={() => handleQuickAdd(option)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* 第三部分：Permissions Configuration */}
        <Card className="bg-card shadow-sm">
          <div className="p-6 space-y-6">
            {/* Auto-approve All Actions */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Auto-approve All Actions</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Skip all permission checks and auto-approve every tool action. This is dangerous and should only be used for trusted tasks.
                </p>
              </div>
              <Switch
                checked={autoApprove}
                onCheckedChange={setAutoApprove}
              />
            </div>

            {/* Editor Mode */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-muted-foreground">Editor Mode</Label>
              <div className="flex gap-2">
                <Button
                  variant={editorMode === "visual" ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setEditorMode("visual")}
                >
                  <Eye className="h-4 w-4" />
                  Visual Editor
                </Button>
                <Button
                  variant={editorMode === "json" ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setEditorMode("json")}
                >
                  <Code2 className="h-4 w-4" />
                  JSON Editor
                </Button>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-2">
              <Label className="text-foreground font-semibold">Permissions</Label>
              <p className="text-sm text-muted-foreground">Configure permission settings for Claude CLI</p>
              <Textarea
                value={permissions}
                onChange={(e) => setPermissions(e.target.value)}
                className="font-mono text-sm min-h-[120px] bg-background"
                placeholder="编辑 Permissions 配置..."
              />
            </div>
          </div>
        </Card>

        {/* 第四部分：Plugin Settings */}
        <div className="space-y-6">
          {/* Environment Variables */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Environment Variables</Label>
            <p className="text-sm text-muted-foreground">Environment variables passed to Claude</p>
            <Textarea
              value={envVars}
              onChange={(e) => setEnvVars(e.target.value)}
              className="font-mono text-sm min-h-[120px] bg-background"
              placeholder="编辑 Environment Variables 配置..."
            />
          </div>

          {/* Enabled Plugins */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">enabledPlugins</Label>
            <Textarea
              value={enabledPlugins}
              onChange={(e) => setEnabledPlugins(e.target.value)}
              className="font-mono text-sm min-h-[80px] bg-background"
              placeholder="编辑 enabledPlugins 配置..."
            />
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Add/Edit Provider Dialog */}
      <AddProviderDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        mode={editingProvider ? "edit" : "add"}
        provider={getDialogProvider()}
        onAddProvider={handleAddProvider}
        onSaveProvider={handleSaveProvider}
      />
      </div>
    </div>
  )
}
