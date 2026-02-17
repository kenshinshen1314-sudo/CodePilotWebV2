/**
 * [INPUT]: 依赖 react，依赖 radix-ui 的 AspectRatio
 * [OUTPUT]: 对外提供 AspectRatio 宽高比组件
 * [POS]: src/components/ui 的展示宽高比组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
