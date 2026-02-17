/**
 * [INPUT]: 无依赖，纯配置导出
 * [OUTPUT]: 对外提供 Framer Motion 动效变体预设
 * [POS]: src/lib 的动效配置模块
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ========================================
   动效变体预设 - 用于 Landing Page
   ======================================== */

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

// 设计令牌
export const designTokens = {
  typography: {
    hero: 'text-5xl md:text-6xl lg:text-7xl',
    display: 'text-4xl md:text-5xl',
    title: 'text-2xl md:text-3xl',
    subtitle: 'text-lg md:text-xl',
    body: 'text-base',
    caption: 'text-sm',
  },
  spacing: {
    section: 'py-20 md:py-28 lg:py-32',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    stack: 'space-y-4',
  },
}
