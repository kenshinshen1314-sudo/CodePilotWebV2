/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标，依赖 @/lib/provider-context 的 useProvider
 * [OUTPUT]: 对外提供 ChatInput 输入组件
 * [POS]: src/components/chat 的输入组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState, useEffect, useRef } from "react"
import { Code2, FolderOpen, Lightbulb, MessageCircle, Paperclip, Send, X, FileCode } from "lucide-react"
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
  content?: string
}

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  mode?: ChatMode
  onModeChange?: (mode: ChatMode) => void
  onFolderSelect?: () => void
  onFileSelect?: (filePath: string, fileContent?: string) => void
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
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log("Files selected:", files?.length)
    if (files && files.length > 0 && onFileSelect) {
      // Process each file
      Array.from(files).forEach((file) => {
        const filePath = file.webkitRelativePath || file.name
        const fileName = file.name
        console.log("Processing file:", fileName)

        // Check if it's a text-based file that we can read
        const isTextFile = file.type.startsWith("text/") ||
          fileName.endsWith(".md") ||
          fileName.endsWith(".txt") ||
          fileName.endsWith(".json") ||
          fileName.endsWith(".tsx") ||
          fileName.endsWith(".ts") ||
          fileName.endsWith(".jsx") ||
          fileName.endsWith(".js") ||
          fileName.endsWith(".py") ||
          fileName.endsWith(".html") ||
          fileName.endsWith(".css")

        if (isTextFile) {
          // Read file content
          const reader = new FileReader()
          reader.onload = (event) => {
            const content = event.target?.result as string
            console.log("File content length:", content?.length)
            console.log("Calling onFileSelect with:", filePath)
            if (onFileSelect) {
              onFileSelect(filePath, content || "")
            } else {
              console.log("onFileSelect is not defined!")
            }
          }
          reader.onerror = () => {
            console.error("Error reading file")
            onFileSelect(filePath, "")
          }
          reader.readAsText(file)
        } else {
          // For non-text files, just pass the path
          console.log("Non-text file, passing path only")
          onFileSelect(filePath, "")
        }
      })
    }
    // Reset input
    e.target.value = ""
  }

  const currentMode = MODES.find(m => m.value === mode)

  return (
    <Card className="p-2 w-full">
      {/* Native file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple
      />
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="min-h-[60px] max-h-[150px] border-0 resize-none focus-visible:ring-0 py-3 shadow-none outline-none"
      />
      {/* Uploaded files display */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2 px-3 pb-2">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm truncate">{file.name}</span>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(index)}
                  className="ml-auto p-1 hover:text-destructive rounded shrink-0"
                >
                  <X className="h-4 w-4" />
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
              onClick={handleFileButtonClick}
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
