import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import os from "os"

export const dynamic = "force-dynamic"

interface BrowseResponse {
  current: string
  parent: string | null
  directories: Array<{ name: string; path: string }>
  drives?: string[]
}

function getUserHome(): string {
  return os.homedir()
}

function getParentDirectory(dirPath: string): string | null {
  const parent = path.dirname(dirPath)
  // On Unix systems, root's parent is still root
  // On Windows, we need to handle drive letters differently
  if (parent === dirPath) return null
  if (process.platform === 'win32') {
    // Check if we're at drive root (e.g., C:\)
    if (/^[a-zA-Z]:\\$/.test(dirPath)) return null
  } else {
    // Unix root
    if (dirPath === '/') return null
  }
  return parent
}

function getDrives(): string[] {
  if (process.platform !== 'win32') {
    return ['/']
  }
  // On Windows, we would need to enumerate drives
  // For now, just return common ones
  return ['C:\\', 'D:\\', 'E:\\'].filter(drive => {
    try {
      fs.existsSync(drive)
      return true
    } catch {
      return false
    }
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dirParam = searchParams.get("dir")

  let targetDir = dirParam

  // If no directory specified, start from user's home directory
  if (!targetDir) {
    targetDir = getUserHome()
  }

  try {
    const resolvedPath = path.resolve(targetDir)

    // Security check and validation
    const stats = fs.statSync(resolvedPath)
    if (!stats.isDirectory()) {
      return NextResponse.json({ error: "Not a directory" }, { status: 400 })
    }

    // Read directory contents
    const entries = fs.readdirSync(resolvedPath, { withFileTypes: true })

    // Filter and map only directories
    const directories = entries
      .filter(entry => entry.isDirectory())
      .filter(entry => {
        // Filter out hidden directories (starting with .) except .. and .
        const name = entry.name
        if (name === '.' || name === '..') return false
        if (name.startsWith('.')) return false
        // Optionally filter out system directories
        if (name === 'node_modules') return false
        if (name === '.git') return false
        if (name === 'DS_Store') return false
        return true
      })
      .map(entry => ({
        name: entry.name,
        path: path.join(resolvedPath, entry.name),
      }))
      .sort((a, b) => a.name.localeCompare(b.name))

    const parentDir = getParentDirectory(resolvedPath)
    const drives = process.platform === 'win32' ? getDrives() : undefined

    const response: BrowseResponse = {
      current: resolvedPath,
      parent: parentDir,
      directories,
      drives,
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to browse directory" },
      { status: 500 }
    )
  }
}
