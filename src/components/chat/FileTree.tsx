/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 FileTree 文件树组件
 * [POS]: src/components/chat 的文件树组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from "react"
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  File,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface FileNode {
  id: string
  name: string
  type: "folder" | "file"
  path: string
  expanded?: boolean
  children?: FileNode[]
  selected?: boolean
}

interface FileTreeProps {
  files: FileNode[]
  selectedFile: FileNode | null
  onFilesChange?: (files: FileNode[]) => void
  onFileSelect?: (file: FileNode) => void
  onClose?: () => void
  onLoadChildren?: (node: FileNode) => Promise<FileNode[]>
}

const getFileIcon = (name: string) => {
  if (name.endsWith(".tsx") || name.endsWith(".ts")) {
    return <FileCode className="h-4 w-4 text-chart-1" />
  }
  if (name.endsWith(".css") || name.endsWith(".scss")) {
    return <FileCode className="h-4 w-4 text-chart-2" />
  }
  if (name.endsWith(".json")) {
    return <FileCode className="h-4 w-4 text-chart-3" />
  }
  if (name.endsWith(".md")) {
    return <FileText className="h-4 w-4 text-chart-4" />
  }
  return <File className="h-4 w-4 text-muted-foreground" />
}

const FileTreeNode = ({
  node,
  level = 0,
  onToggle,
  onSelect,
  isSelected,
  onLoadChildren,
}: {
  node: FileNode
  level?: number
  onToggle?: (id: string) => void
  onSelect?: (file: FileNode) => void
  isSelected?: boolean
  onLoadChildren?: (node: FileNode) => Promise<FileNode[]>
}) => {
  const isFolder = node.type === "folder"
  const isExpanded = node.expanded

  const handleClick = () => {
    if (isFolder && onToggle) {
      onToggle(node.id)
    } else if (onSelect) {
      onSelect(node)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-sm
          transition-colors
          ${isSelected ? "bg-accent" : "hover:bg-muted"}
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {isFolder && (
          <span className="shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </span>
        )}
        <span className="shrink-0">
          {isFolder ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-amber-500" />
            ) : (
              <Folder className="h-4 w-4 text-amber-500" />
            )
          ) : (
            getFileIcon(node.name)
          )}
        </span>
        <span className="truncate">{node.name}</span>
      </button>

      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              onSelect={onSelect}
              isSelected={child.selected}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({ files, selectedFile, onFilesChange, onFileSelect, onClose, onLoadChildren }: FileTreeProps) {
  const handleToggle = async (id: string) => {
    if (!onFilesChange) return

    // Find the node to toggle
    const findNode = (nodes: FileNode[], targetId: string): FileNode | null => {
      for (const node of nodes) {
        if (node.id === targetId) return node
        if (node.children) {
          const found = findNode(node.children, targetId)
          if (found) return found
        }
      }
      return null
    }

    const targetNode = findNode(files, id)
    if (!targetNode || targetNode.type !== "folder") return

    // If expanding and children not loaded, load them first
    if (!targetNode.expanded && (!targetNode.children || targetNode.children.length === 0) && onLoadChildren) {
      const children = await onLoadChildren(targetNode)
      const updateWithChildren = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === id) {
            return { ...node, expanded: true, children }
          }
          if (node.children) {
            return { ...node, children: updateWithChildren(node.children) }
          }
          return node
        })
      }
      onFilesChange(updateWithChildren(files))
      return
    }

    const toggleNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, expanded: !node.expanded }
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) }
        }
        return node
      })
    }

    onFilesChange(toggleNode(files))
  }

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0">
        <span className="text-sm font-medium">文件</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* 文件树 */}
      <ScrollArea className="flex-1">
        <div className="p-2 font-mono text-sm">
          {files.map((node) => (
            <FileTreeNode
              key={node.id}
              node={node}
              onToggle={handleToggle}
              onSelect={onFileSelect}
              isSelected={node.selected}
              onLoadChildren={onLoadChildren}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
