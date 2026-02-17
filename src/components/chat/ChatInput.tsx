/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标，依赖 @/lib/provider-context 的 useProvider
 * [OUTPUT]: 对外提供 ChatInput 输入组件
 * [POS]: src/components/chat 的输入组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState, useEffect } from "react"
import { Code2, FolderOpen, Lightbulb, MessageCircle, Paperclip, Send, X, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProvider, getModelsForProvider } from "@/lib/provider-context"

export type ChatMode = "code" | "plan" | "ask"

interface UploadedFile {
  name: string
  path: string
}

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  mode?: ChatMode
  onModeChange?: (mode: ChatMode) => void
  onFolderSelect?: () => void
  onFileSelect?: () => void
  uploadedFiles?: UploadedFile[]
  onRemoveFile?: (index: number) => void
  selectedModel?: string
  onModelChange?: (model: string) => void
}

const MODES: { value: ChatMode; label: string; icon: typeof Code2 }[] = [
  { value: "code", label: "Code", icon: Code2 },
  { value: "plan", label: "Plan", icon: Lightbulb },
  { value: "ask", label: "Ask", icon: MessageCircle },
]

export function ChatInput({ value, onChange, onSend, mode = "code", onModeChange, onFolderSelect, onFileSelect, uploadedFiles = [], onRemoveFile, selectedModel, onModelChange }: ChatInputProps) {
  const { activeProvider } = useProvider()
  const availableModels = getModelsForProvider(activeProvider)
  const [model, setModel] = useState<string>("")

  useEffect(() => {
    if (selectedModel) {
      setModel(selectedModel)
    } else if (availableModels.length > 0 && !model) {
      setModel(availableModels[0])
    }
  }, [selectedModel, availableModels, model])

  const handleModelChange = (newModel: string) => {
    setModel(newModel)
    onModelChange?.(newModel)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        onSend()
      }
    }
  }

  const currentMode = MODES.find(m => m.value === mode)

  return (
    <Card className="p-2 w-full">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="min-h-[60px] max-h-[150px] border-0 resize-none focus-visible:ring-0 py-3 shadow-none outline-none"
      />
      {/* Uploaded files display */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 px-3 pb-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs"
            >
              <Paperclip className="h-3 w-3" />
              <span className="max-w-[150px] truncate">{file.name}</span>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2">
          {onFileSelect ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={onFileSelect}
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          )}
          {onFolderSelect && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={onFolderSelect}
              title="Select folder"
            >
              <FolderOpen className="h-4 w-4" />
            </Button>
          )}
          {onModeChange ? (
            <Select
              value={mode}
              onValueChange={(v) => onModeChange(v as ChatMode)}
            >
              <SelectTrigger className="w-[100px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODES.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    <div className="flex items-center gap-2">
                      <m.icon className="w-3.5 h-3.5" />
                      <span>{m.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : currentMode && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <currentMode.icon className="w-4 h-4" />
              <span>{currentMode.label}</span>
            </div>
          )}
          {/* Model selector */}
          {availableModels.length > 0 && (
            <Select value={model} onValueChange={handleModelChange}>
              <SelectTrigger className="w-[180px] h-8">
                <Bot className="w-3.5 h-3.5 mr-1.5" />
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <Button
          onClick={onSend}
          disabled={!value.trim()}
          size="icon"
          className="h-8 w-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
