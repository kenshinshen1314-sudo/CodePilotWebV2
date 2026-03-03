/**
 * [INPUT]: 依赖 clsx 的 ClassValue，依赖 tailwind-merge 的 twMerge
 * [OUTPUT]: 对外提供 cn() 样式合并函数，parseDBDate 日期解析函数
 * [POS]: src/lib 的工具函数，被所有 shadcn/ui 组件使用
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse database date string to Date object.
 * Handles ISO 8601 format and other common date formats.
 */
export function parseDBDate(dateStr: string): Date {
  return new Date(dateStr)
}
