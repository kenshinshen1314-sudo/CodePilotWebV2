import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get("path")

  if (!filePath) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 })
  }

  try {
    const resolvedPath = path.resolve(filePath)

    // Security check: ensure it's within allowed directories
    const stats = fs.statSync(resolvedPath)
    if (!stats.isFile()) {
      return NextResponse.json({ error: "Not a file" }, { status: 400 })
    }

    // Limit file size to 1MB
    if (stats.size > 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    const content = fs.readFileSync(resolvedPath, "utf-8")

    return NextResponse.json({ content, path: resolvedPath, size: stats.size })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read file" },
      { status: 500 }
    )
  }
}
