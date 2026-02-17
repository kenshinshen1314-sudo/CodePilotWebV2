/**
 * [INPUT]: 依赖 react，依赖 @/components/ui 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 FolderDialog 文件夹选择对话框
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
  ChevronRight,
  Home,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FolderDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSelect?: (path: string) => void
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

export function FolderDialog({ open, onOpenChange, onSelect }: FolderDialogProps) {
  const [folders, setFolders] = useState<FolderNode[]>([])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState("/Users/kenshin")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load root directories on mount
  useEffect(() => {
    if (open) {
      loadDirectory("/Users/kenshin")
    }
  }, [open])

  // Load directory contents
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

  // Load children when expanding a folder
  const loadChildren = async (node: FolderNode): Promise<FolderNode[]> => {
    try {
      const res = await fetch(`/api/folders?path=${encodeURIComponent(node.path)}`)
      const data = await res.json()
      if (data.error) {
        return []
      }
      return data.items
    } catch {
      return []
    }
  }

  // Handle Go button - navigate to path
  const handleGo = async () => {
    await loadDirectory(currentPath)
  }

  // Toggle folder expansion
  const handleToggle = async (id: string) => {
    const updateTree = async (nodes: FolderNode[]): Promise<FolderNode[]> => {
      return Promise.all(
        nodes.map(async (node) => {
          if (node.id === id && node.type === "folder") {
            // Load children if not loaded
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
    // Auto-expand if it's a folder and not loaded
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

    return (
      <div key={node.id}>
        <div
          onClick={() => handleSelect(node)}
          className={cn(
            "w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-sm transition-colors cursor-pointer",
            isSelected ? "bg-primary/10 text-foreground" : "hover:bg-muted/50 text-foreground"
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
              {loading && node.expanded ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isExpanded ? (
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
            <span className="h-4 w-4" />
          )}
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === "folder" && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Folder</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Path input with Go button */}
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              value={currentPath}
              onChange={(e) => setCurrentPath(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleGo()}
            />
            <Button onClick={handleGo} disabled={loading} className="shrink-0">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Go"}
            </Button>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-sm text-destructive p-2 bg-destructive/10 rounded">
              {error}
            </div>
          )}

          {/* Folder tree */}
          <ScrollArea className="h-[300px] border rounded-md p-2">
            <div className="font-mono text-sm">
              {loading && folders.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                folders.map((node) => renderNode(node))
              )}
            </div>
          </ScrollArea>

          {/* Selected path */}
          {selectedPath && (
            <div className="text-sm text-muted-foreground">
              Selected: <span className="text-foreground font-mono">{selectedPath}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedPath}>
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
