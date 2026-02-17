/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 AddProviderDialog 添加/编辑 Provider 对话框
 * [POS]: src/components/dialogs 的添加 Provider 对话框组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, Info } from "lucide-react"

export type ProviderType = "anthropic" | "openai" | "openrouter" | "custom"

interface Provider {
  id?: string
  name: string
  type: ProviderType
  apiKey: string
  baseUrl?: string
  extraEnvVars?: string
  notes?: string
}

interface AddProviderDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  mode?: "add" | "edit"
  provider?: Provider | null
  onSaveProvider?: (provider: Provider) => void
  onAddProvider?: (provider: Provider) => void
  trigger?: React.ReactNode
}

const PROVIDER_TYPES: readonly { value: ProviderType; label: string; description: string }[] = [
  {
    value: "anthropic",
    label: "Anthropic",
    description: "Claude API",
  },
  {
    value: "openai",
    label: "OpenAI",
    description: "GPT-4, GPT-3.5",
  },
  {
    value: "openrouter",
    label: "OpenRouter",
    description: "统一 API 接入",
  },
  {
    value: "custom",
    label: "自定义",
    description: "自托管或其他兼容 API",
  },
] as const

export function AddProviderDialog({
  open: controlledOpen,
  onOpenChange,
  mode = "add",
  provider,
  onSaveProvider,
  onAddProvider,
  trigger,
}: AddProviderDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState<ProviderType>("anthropic")
  const [apiKey, setApiKey] = useState("")
  const [baseUrl, setBaseUrl] = useState("")
  const [extraEnvVars, setExtraEnvVars] = useState("")
  const [notes, setNotes] = useState("")
  const [advancedOpen, setAdvancedOpen] = useState(false)

  // 支持受控和非受控模式
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  // 当 provider 变化时，更新表单值
  useEffect(() => {
    if (provider) {
      setName(provider.name)
      setType(provider.type)
      setApiKey(provider.apiKey)
      setBaseUrl(provider.baseUrl || "")
      setExtraEnvVars(provider.extraEnvVars || "")
      setNotes(provider.notes || "")
    } else {
      setName("")
      setType("anthropic")
      setApiKey("")
      setBaseUrl("")
      setExtraEnvVars("")
      setNotes("")
    }
  }, [provider, open])

  const isEditMode = mode === "edit"

  const handleSubmit = () => {
    if (!name.trim() || !apiKey.trim()) return

    const providerData: Provider = {
      ...provider,
      name: name.trim(),
      type,
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim() || undefined,
      extraEnvVars: extraEnvVars.trim() || undefined,
      notes: notes.trim() || undefined,
    }

    if (isEditMode && onSaveProvider) {
      onSaveProvider(providerData)
    } else if (!isEditMode && onAddProvider) {
      onAddProvider(providerData)
    }

    // 重置表单
    setName("")
    setType("anthropic")
    setApiKey("")
    setBaseUrl("")
    setExtraEnvVars("")
    setNotes("")
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Provider" : "Add Provider"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edit the API provider configuration"
              : "Add a new API provider to CodePilot"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Provider Name */}
          <div className="space-y-2">
            <Label htmlFor="provider-name">
              Provider Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="provider-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Anthropic"
            />
          </div>

          {/* Provider Type */}
          <div className="space-y-2">
            <Label htmlFor="provider-type">
              Provider Type <span className="text-destructive">*</span>
            </Label>
            <Select value={type} onValueChange={(v) => setType(v as ProviderType)}>
              <SelectTrigger id="provider-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROVIDER_TYPES.map((providerType) => (
                  <SelectItem key={providerType.value} value={providerType.value}>
                    <div>
                      <div className="font-medium">{providerType.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {providerType.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="api-key">
              API Key <span className="text-destructive">*</span>
            </Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
            />
          </div>

          {/* API Base URL - 所有类型都显示 */}
          <div className="space-y-2">
            <Label htmlFor="base-url">
              API Base URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="base-url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.anthropic.com/v1/"
            />
          </div>

          {/* Advanced Settings */}
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Advanced Options
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    advancedOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              {/* Extra Environment Variables (JSON) */}
              <div className="space-y-2">
                <Label htmlFor="extra-env-vars">Extra Environment Variables (JSON)</Label>
                <Textarea
                  id="extra-env-vars"
                  value={extraEnvVars}
                  onChange={(e) => setExtraEnvVars(e.target.value)}
                  className="font-mono text-sm min-h-[80px] bg-background"
                  placeholder='{"CUSTOM_VAR": "value"}'
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-sm min-h-[60px] bg-background"
                  placeholder="Add any notes about this provider..."
                />
              </div>

              {/* Static Info */}
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Request Timeout:</strong> 120 seconds
                </p>
                <p>
                  <strong>Max Retries:</strong> 3
                </p>
                <p>
                  <strong>Models:</strong> Auto-detected from provider
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !apiKey.trim() || !baseUrl.trim()}
          >
            {isEditMode ? "Save Changes" : "Add Provider"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { PROVIDER_TYPES }
export type { Provider }
