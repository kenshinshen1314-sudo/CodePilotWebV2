import { streamClaude } from "@/lib/claude-client"
import { consumeSSEStream } from "@/hooks/useSSEStream"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const abortController = new AbortController()

  try {
    const body = await request.json()
    const {
      session_id,
      content,
      mode,
      model,
      provider_id,
      files,
      systemPromptAppend
    } = body

    if (!session_id || !content) {
      return new Response(JSON.stringify({ error: "session_id and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Create a TransformStream to convert the stream to SSE format
    const stream = streamClaude({
      prompt: content,
      sessionId: session_id,
      sdkSessionId: undefined,
      model: model || 'claude-sonnet-4-20250514',
      systemPrompt: undefined,
      workingDirectory: undefined,
      mcpServers: undefined,
      abortController,
      permissionMode: undefined,
      files,
      toolTimeoutSeconds: 0,
      conversationHistory: undefined,
      onRuntimeStatusChange: undefined,
      imageAgentMode: undefined,
      provider: provider_id ? { id: provider_id } : undefined,
    })

    // Return SSE stream
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
