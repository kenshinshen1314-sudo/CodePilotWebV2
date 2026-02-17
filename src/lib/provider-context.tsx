/**
 * [INPUT]: 无
 * [OUTPUT]: 对外提供 ProviderContext 和 useProvider hook
 * [POS]: src/lib 的上下文
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type ProviderType = "anthropic" | "openrouter" | "custom"

export interface Provider {
  id: string
  name: string
  url: string
  type?: ProviderType
  apiKey?: string
  extraEnvVars?: string
  notes?: string
  isActive: boolean
}

interface ProviderContextType {
  providers: Provider[]
  activeProvider: Provider | null
  setActiveProvider: (providerId: string) => void
  addProvider: (provider: Omit<Provider, "id">) => void
  updateProvider: (provider: Provider) => void
  deleteProvider: (providerId: string) => void
}

const ProviderContext = createContext<ProviderContextType | null>(null)

// Models available for each provider type
const PROVIDER_MODELS: Record<string, string[]> = {
  anthropic: [
    "claude-sonnet-4-20250514",
    "claude-sonnet-4-20250401",
    "claude-opus-4-20250514",
    "claude-opus-4-20250401",
    "claude-haiku-4-20250514",
    "claude-haiku-4-20250401",
    "claude-3-7-sonnet-20250514",
    "claude-3-5-sonnet-20241022",
    "claude-3-5-haiku-20241022",
  ],
  openrouter: [
    "anthropic/claude-sonnet-4",
    "anthropic/claude-opus-4",
    "anthropic/claude-haiku-4",
    "anthropic/claude-3.5-sonnet",
    "google/gemini-2.5-pro",
    "google/gemini-2.5-flash",
    "openai/gpt-4.5",
    "openai/gpt-4o",
    "deepseek/deepseek-chat",
    "mistral/mistral-large",
    "meta-llama/llama-4-maverick",
  ],
  custom: [
    "glm-4-plus",
    "glm-4",
    "glm-4-air",
    "glm-4-airx",
    "glm-4-flash",
    "moonshot-v1-8k",
    "moonshot-v1-32k",
    "moonshot-v1-128k",
    "MiniMax-Abab6.5s-chat",
    "MiniMax-Abab6.5-chat",
  ],
}

export function getModelsForProvider(provider: Provider | null): string[] {
  if (!provider) return []
  const type = provider.type || "custom"
  return PROVIDER_MODELS[type] || PROVIDER_MODELS.custom
}

export function ProviderProvider({ children }: { children: ReactNode }) {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      name: "GLM (CN)",
      url: "https://open.bigmodel.cn/api/paas/v3/",
      type: "custom",
      isActive: true,
    },
    {
      id: "2",
      name: "Anthropic",
      url: "https://api.anthropic.com/v1/",
      type: "anthropic",
      isActive: false,
    },
    {
      id: "3",
      name: "OpenRouter",
      url: "https://openrouter.ai/api/v1/",
      type: "openrouter",
      isActive: false,
    },
  ])

  const activeProvider = providers.find((p) => p.isActive) || null

  const setActiveProvider = useCallback((providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => ({
        ...p,
        isActive: p.id === providerId,
      }))
    )
  }, [])

  const addProvider = useCallback((provider: Omit<Provider, "id">) => {
    setProviders((prev) => [
      ...prev,
      { ...provider, id: Date.now().toString() },
    ])
  }, [])

  const updateProvider = useCallback((provider: Provider) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === provider.id ? provider : p))
    )
  }, [])

  const deleteProvider = useCallback((providerId: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== providerId))
  }, [])

  return (
    <ProviderContext.Provider
      value={{
        providers,
        activeProvider,
        setActiveProvider,
        addProvider,
        updateProvider,
        deleteProvider,
      }}
    >
      {children}
    </ProviderContext.Provider>
  )
}

export function useProvider() {
  const context = useContext(ProviderContext)
  if (!context) {
    throw new Error("useProvider must be used within a ProviderProvider")
  }
  return context
}
