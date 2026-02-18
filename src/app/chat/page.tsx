/**
 * [INPUT]: 依赖 react、"use client"，依赖 @/components/chat 的组件，依赖 lucide-react 图标
 * [OUTPUT]: 对外提供 Chat 页面，包含侧边栏、消息列表、输入区域
 * [POS]: src/app/chat 的主页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChatLayout,
  ChatMessage,
  ChatInput,
  ChatSidebar,
  FileTree,
  type FileNode,
  type Message,
  type Session,
  ChatMode,
} from "@/components/chat"
import { FolderDialog } from "@/components/dialogs/FolderDialog"
import { ImportSessionDialog, type CLISession } from "@/components/dialogs/ImportSessionDialog"

// Mock data
const mockSessions: Session[] = [
  {
    id: "1",
    title: "优化 Next.js 性能",
    updatedAt: "2 hours ago",
    messageCount: 12,
  },
  {
    id: "2",
    title: "设计系统组件开发",
    updatedAt: "Yesterday",
    messageCount: 8,
  },
  {
    id: "3",
    title: "TypeScript 类型问题",
    updatedAt: "3 days ago",
    messageCount: 5,
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "帮我优化这个 Next.js 应用的性能",
    timestamp: "14:30",
    tokens: 0,
    cost: "",
  },
  {
    id: "2",
    role: "assistant",
    content: "好的，我来帮你分析和优化这个 Next.js 应用的性能。\n\n首先，让我看一下你的项目结构和配置...",
    timestamp: "14:30",
    tokens: 1245,
    cost: "$0.002",
  },
]

// Build file tree helper function
function buildFileTree(paths: string[], basePath: string = ""): FileNode[] {
  const tree: FileNode[] = []
  const folderMap = new Map<string, FileNode>()

  paths.sort().forEach((path) => {
    const parts = path.split("/")
    let currentPath = basePath

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part

      if (index === parts.length - 1) {
        const fileNode: FileNode = {
          id: `file-${currentPath}`,
          name: part,
          type: "file",
          path: currentPath,
          selected: false,
        }
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"))
        const parent = folderMap.get(parentPath)
        if (parent && parent.children) {
          parent.children.push(fileNode)
        } else {
          tree.push(fileNode)
        }
      } else {
        if (!folderMap.has(currentPath)) {
          const folderNode: FileNode = {
            id: `folder-${currentPath}`,
            name: part,
            type: "folder",
            path: currentPath,
            expanded: false,
            children: [],
          }
          folderMap.set(currentPath, folderNode)
          const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"))
          const parent = folderMap.get(parentPath)
          if (parent && parent.children) {
            parent.children.push(folderNode)
          } else {
            tree.push(folderNode)
          }
        }
      }
    })
  })

  return tree
}

// Mock project file structure
const mockProjectFiles = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/globals.css",
  "src/components/ui/button.tsx",
  "src/components/ui/input.tsx",
  "src/lib/utils.ts",
  "package.json",
  "tsconfig.json",
  "next.config.ts",
]

export default function ChatPage() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>("1")
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState("")
  const [chatMode, setChatMode] = useState<ChatMode>("code")

  // File tree state
  const [showFileTree, setShowFileTree] = useState(false)
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)

  // Folder dialog state
  const [folderDialogOpen, setFolderDialogOpen] = useState(false)

  // Uploaded files state
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; path: string; content: string }>>([])

  // Import session dialog state
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  // New session folder selection state
  const [isCreatingSession, setIsCreatingSession] = useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return

    // Store attachments separately, only keep user message content
    const attachments = uploadedFiles.map((file) => ({
      name: file.name,
      path: file.path,
    }))

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      tokens: 0,
      cost: "",
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    setMessages([...messages, newMessage])
    setInputValue("")
    setUploadedFiles([])
  }

  const handleNewSession = () => {
    // First, open the folder dialog to select working directory
    setIsCreatingSession(true)
    setFolderDialogOpen(true)
  }

  const handleNewSessionWithFolder = (folderPath: string) => {
    // Extract folder name from path
    const folderName = folderPath.split("/").pop() || "New Chat"

    const newSession: Session = {
      id: Date.now().toString(),
      title: folderName,
      updatedAt: "Just now",
      messageCount: 0,
      workingDirectory: folderPath,
    }

    setSessions([newSession, ...sessions])
    setCurrentSessionId(newSession.id)
    setMessages([])

    // Load folder contents for this session
    loadFolderContents(folderPath)
    setIsCreatingSession(false)
  }

  const handleSessionDelete = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId))
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null)
      setMessages([])
    }
  }

  const handleOpenFolderDialog = () => {
    setFolderDialogOpen(true)
  }

  const handleOpenFileDialog = () => {
    // Now handled by native file picker in ChatInput
  }

  const handleFileSelect = async (filePath: string, fileContent?: string) => {
    console.log("handleFileSelect called:", filePath)
    console.log("Current uploadedFiles:", uploadedFiles.length)
    // Add file to uploaded files list
    const fileName = filePath.split("/").pop() || filePath
    // Check if file is already uploaded
    if (!uploadedFiles.find((f) => f.path === filePath)) {
      const newFile = { name: fileName, path: filePath, content: fileContent || "" }
      console.log("Adding file:", newFile)
      setUploadedFiles(prev => {
        console.log("Previous state:", prev)
        console.log("New state:", [...prev, newFile])
        return [...prev, newFile]
      })
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleOpenImportDialog = () => {
    setImportDialogOpen(true)
  }

  const handleImportSession = (cliSession: CLISession) => {
    // Convert CLI session to chat session
    const newSession: Session = {
      id: cliSession.id,
      title: cliSession.title,
      updatedAt: cliSession.updatedAt,
      messageCount: cliSession.messageCount,
    }

    // Convert CLI messages to chat messages
    const importedMessages: Message[] = cliSession.messages.map((msg) => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp,
      tokens: 0,
      cost: "",
    }))

    setSessions([newSession, ...sessions])
    setCurrentSessionId(newSession.id)
    setMessages(importedMessages)
  }

  // Load folder contents from API
  const loadFolderContents = async (folderPath: string) => {
    try {
      const res = await fetch(`/api/folders?path=${encodeURIComponent(folderPath)}`)
      const data = await res.json()
      if (data.items) {
        // Convert API response to FileNode format
        const convertToFileNode = (items: { id: string; name: string; path: string; type: "folder" | "file" }[]): FileNode[] => {
          return items.map((item) => ({
            id: item.id,
            name: item.name,
            path: item.path,
            type: item.type,
            expanded: false,
            children: item.type === "folder" ? [] : undefined,
          }))
        }
        setFileTree(convertToFileNode(data.items))
        setShowFileTree(true)
      }
    } catch (error) {
      console.error("Failed to load folder:", error)
    }
  }

  const handleFolderSelect = (folderPath: string) => {
    if (isCreatingSession) {
      handleNewSessionWithFolder(folderPath)
    } else {
      loadFolderContents(folderPath)
    }
  }

  const handleTreeFileSelect = async (file: FileNode) => {
    const updateSelected = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        const newNode = { ...node, selected: node.id === file.id }
        if (newNode.children) {
          newNode.children = updateSelected(newNode.children)
        }
        return newNode
      })
    }

    setFileTree(updateSelected(fileTree))
    setSelectedFile(file)

    // Load file content from API
    try {
      const res = await fetch(`/api/files?path=${encodeURIComponent(file.path)}`)
      const data = await res.json()
      if (data.content !== undefined) {
        setFileContent(data.content)
      } else {
        setFileContent(`// ${file.name}\n// Unable to load file content: ${data.error || "Unknown error"}`)
      }
    } catch (error) {
      setFileContent(`// ${file.name}\n// Failed to load file content`)
    }
  }

  const handleCloseFileTree = () => {
    setShowFileTree(false)
    setSelectedFile(null)
    setFileContent(null)
  }

  const leftSidebar = (
    <ChatSidebar
      sessions={sessions}
      currentSessionId={currentSessionId}
      onSessionSelect={setCurrentSessionId}
      onNewSession={handleNewSession}
      onSessionDelete={handleSessionDelete}
      onImportSession={handleOpenImportDialog}
      showWorkingDirectory
    />
  )

  const mainContent = (
    <div className="flex flex-col h-full">
      {/* Header title */}
      <div className="h-14 flex items-center px-8 shrink-0">
        <h2 className="font-medium text-lg">
          {sessions.find((s) => s.id === currentSessionId)?.title || "New Chat"}
        </h2>
      </div>

      {/* Message list */}
      <ScrollArea className="flex-1 px-8">
        <div className="max-w-3xl mx-auto space-y-8 pt-8">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-muted-foreground">
              <p className="text-lg mb-2">Start a new chat</p>
              <p className="text-sm">Select a mode below and enter your question</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="px-8 py-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            mode={chatMode}
            onModeChange={setChatMode}
            onFolderSelect={handleOpenFolderDialog}
            onFileSelect={handleFileSelect}
            uploadedFiles={uploadedFiles}
            onRemoveFile={handleRemoveFile}
          />
        </div>
      </div>
    </div>
  )

  // Load children for a folder (lazy loading)
  const handleLoadChildren = async (node: FileNode): Promise<FileNode[]> => {
    try {
      const res = await fetch(`/api/folders?path=${encodeURIComponent(node.path)}`)
      const data = await res.json()
      if (data.items) {
        return data.items.map((item: { id: string; name: string; path: string; type: "folder" | "file" }) => ({
          id: item.id,
          name: item.name,
          path: item.path,
          type: item.type,
          expanded: false,
          children: item.type === "folder" ? [] : undefined,
        }))
      }
    } catch (error) {
      console.error("Failed to load children:", error)
    }
    return []
  }

  const rightSidebar = showFileTree ? (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        {/* 文件树区域 - 可滚动 */}
        <div className="flex-1 overflow-auto">
          <FileTree
            files={fileTree}
            selectedFile={selectedFile}
            onFilesChange={setFileTree}
            onFileSelect={handleTreeFileSelect}
            onClose={handleCloseFileTree}
            onLoadChildren={handleLoadChildren}
          />
        </div>
        {/* 文件内容区域 */}
        {fileContent && (
          <div className="h-1/2 min-h-[150px] shrink-0">
            <div className="h-full overflow-auto p-4">
              <p className="text-xs text-muted-foreground mb-2">{selectedFile?.path}</p>
              <pre className="text-xs font-mono whitespace-pre-wrap">{fileContent}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  ) : null

  return (
    <>
      <ChatLayout leftSidebar={leftSidebar} mainContent={mainContent} rightSidebar={rightSidebar} />
      <FolderDialog
        open={folderDialogOpen}
        onOpenChange={setFolderDialogOpen}
        onSelect={handleFolderSelect}
        mode="folder"
      />
      <ImportSessionDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImportSession}
      />
    </>
  )
}
