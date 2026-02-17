import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dirPath = searchParams.get("path")

  if (!dirPath) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 })
  }

  try {
    // Security check: prevent directory traversal
    const resolvedPath = path.resolve(dirPath)

    // Check if directory exists and is readable
    const stats = fs.statSync(resolvedPath)
    if (!stats.isDirectory()) {
      return NextResponse.json({ error: "Not a directory" }, { status: 400 })
    }

    // Read directory contents
    const entries = fs.readdirSync(resolvedPath, { withFileTypes: true })

    const items = entries
      .map((entry) => {
        try {
          const entryPath = path.join(resolvedPath, entry.name)
          return {
            id: entryPath,
            name: entry.name,
            path: entryPath,
            type: entry.isDirectory() ? "folder" : "file",
            expanded: false,
            children: entry.isDirectory() ? [] : undefined,
          }
        } catch {
          return null
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      // Sort: folders first, then files, alphabetically
      .sort((a, b) => {
        if (a.type === "folder" && b.type !== "folder") return -1
        if (a.type !== "folder" && b.type === "folder") return 1
        return a.name.localeCompare(b.name)
      })

    return NextResponse.json({ items, path: resolvedPath })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read directory" },
      { status: 500 }
    )
  }
}
