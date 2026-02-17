/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 FolderDialog 文件夹/文件选择对话框
 * [POS]: src/components/dialogs 的文件夹选择对话框组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  File,
  ChevronRight,
  Home,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FolderDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSelect?: (path: string) => void
  mode?: "folder" | "file"
}

interface FolderNode {
  id: string
  name: string
  path: string
  type: "folder" | "file"
  expanded?: boolean
  children?: FolderNode[]
  loaded?: boolean
}

const getFileIcon = (name: string) => {
  if (name.endsWith(".tsx") || name.endsWith(".ts")) {
    return <FileCode className="h-4 w-4 text-blue-500" />
  }
  if (name.endsWith(".js") || name.endsWith(".jsx")) {
    return <FileCode className="h-4 w-4 text-yellow-500" />
  }
  if (name.endsWith(".json")) {
    return <FileCode className="h-4 w-4 text-green-500" />
  }
  if (name.endsWith(".md") || name.endsWith(".txt")) {
    return <FileText className="h-4 w-4 text-gray-500" />
  }
  return <File className="h-4 w-4 text-gray-400" />
}

export function FolderDialog({ open, onOpenChange, onSelect, mode = "folder" }: FolderDialogProps) {
  const [folders, setFolders] = useState<FolderNode[]>([])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState("/Users/kenshin")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      loadDirectory("/Users/kenshin")
    }
  }, [open])

  const loadDirectory = async (dirPath: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/folders?path=${encodeURIComponent(dirPath)}`)
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setFolders(data.items)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load directory")
    } finally {
      setLoading(false)
    }
  }

  const loadChildren = async (node: FolderNode): Promise<FolderNode[]> => {
    try {
      const res = await fetch(`/api/folders?path=${encodeURIComponent(node.path)}`)
      const data = await res.json()
      if (data.error) return []
      return data.items
    } catch {
      return []
    }
  }

  const handleGo = async () => {
    await loadDirectory(currentPath)
  }

  const handleToggle = async (id: string) => {
    const updateTree = async (nodes: FolderNode[]): Promise<FolderNode[]> => {
      return Promise.all(
        nodes.map(async (node) => {
          if (node.id === id && node.type === "folder") {
            if (!node.loaded) {
              const children = await loadChildren(node)
              return { ...node, expanded: true, children, loaded: true }
            }
            return { ...node, expanded: !node.expanded }
          }
          if (node.children) {
            return { ...node, children: await updateTree(node.children) }
          }
          return node
        })
      )
    }
    setFolders(await updateTree(folders))
  }

  const handleSelect = (node: FolderNode) => {
    setSelectedPath(node.path)
    if (node.type === "folder" && !node.loaded) {
      handleToggle(node.id)
    }
  }

  const handleConfirm = () => {
    if (selectedPath) {
      onSelect?.(selectedPath)
      onOpenChange?.(false)
    }
  }

  const renderNode = (node: FolderNode, level: number = 0) => {
    const isSelected = selectedPath === node.path
    const isExpanded = node.expanded
    const isSelectable = mode === "folder" ? node.type === "folder" : node.type === "file"

    return (
      <div key={node.id}>
        <div
          onClick={() => isSelectable && handleSelect(node)}
          className={cn(
            "flex items-center gap-1 px-2 py-1.5 rounded text-sm transition-colors cursor-pointer",
            isSelected ? "bg-primary/10 text-foreground" : "hover:bg-muted text-foreground"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {node.type === "folder" && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggle(node.id)
              }}
              className="p-0.5 hover:bg-muted rounded"
            >
              {isExpanded ? (
                <ChevronRight className="h-3 w-3 rotate-90" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          {node.type === "folder" ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-amber-500 shrink-0" />
            ) : (
              <Folder className="h-4 w-4 text-amber-500 shrink-0" />
            )
          ) : (
            getFileIcon(node.name)
          )}
          <span className="truncate max-w-[200px]">{node.name}</span>
        </div>
        {node.type === "folder" && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const dialogTitle = mode === "folder" ? "Select Folder" : "Select File"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              value={currentPath}
              onChange={(e) => setCurrentPath(e.target.value)}
              className="flex-1 truncate"
              onKeyDown={(e) => e.key === "Enter" && handleGo()}
            />
            <Button onClick={handleGo} disabled={loading} size="sm">
              Go
            </Button>
          </div>

          {error && (
            <div className="text-sm text-red-500 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <ScrollArea className="h-[280px] w-full border rounded-md overflow-hidden">
            <div className="p-3 text-sm min-h-full overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-10 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Loading...</span>
                </div>
              ) : folders.length > 0 ? (
                <div className="space-y-0.5">
                  {folders.map((node) => renderNode(node))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  No files or folders
                </div>
              )}
            </div>
          </ScrollArea>

          {selectedPath && (
            <div className="text-sm text-muted-foreground truncate">
              Selected: <span className="text-foreground truncate block max-w-[250px] align-bottom">{selectedPath}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedPath}>
            {mode === "folder" ? "Select" : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
