/**
 * [INPUT]: 依赖 framer-motion
 * [OUTPUT]: 对外提供 Apple 风格动画配置
 * [POS]: src/lib 的动画配置模块
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ========================================
   Apple 风格动画配置
   ======================================== */

// iOS 缓动曲线
const easeOut = [0.22, 1, 0.36, 1] as const

// 滚动进入动画（带阻尼感）
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
}

// 序列进场容器
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

// 序列项动画
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
}

// 滚动触发配置
export const viewportConfig = {
  once: true,
  margin: "-50px",
  amount: 0.3
}

/* ========================================
   设计令牌
   ======================================== */

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
