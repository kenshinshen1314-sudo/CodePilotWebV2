/**
 * [INPUT]: 无依赖，纯常量定义
 * [OUTPUT]: 对外提供项目级常量
 * [POS]: src/lib 的常量模块，消除魔法数字
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ========================================
   时间相关常量（毫秒）
   ======================================== */
export const TIMING = {
  /** 轮播自动播放间隔 */
  CAROUSEL_AUTO_PLAY: 5000,
  /** 用户交互后恢复自动播放的延迟 */
  CAROUSEL_RESUME_DELAY: 5000,
  /** 复制成功提示显示时长 */
  COPY_TOAST_DELAY: 2000,
  /** 防抖延迟 */
  DEBOUNCE_DELAY: 300,
} as const

/* ========================================
   动画相关常量
   ======================================== */
export const ANIMATION = {
  /** 序列子项延迟（毫秒） */
  STAGGER_DELAY: 80,
  /** 序列容器延迟子项（毫秒） */
  DELAY_CHILDREN: 100,
  /** 淡入动画时长（毫秒） */
  FADE_DURATION: 600,
  /** 缩放动画时长（毫秒） */
  SCALE_DURATION: 500,
  /** 滑入动画时长（毫秒） */
  SLIDE_DURATION: 600,
} as const

/* ========================================
   尺寸相关常量（像素）
   ======================================== */
export const DIMENSIONS = {
  /** Hero 渐变装饰圆的尺寸 */
  HERO_GRADIENT_SIZE: 800,
  /** Hero 渐变装饰圆的模糊半径 */
  HERO_GRADIENT_BLUR: 120,
  /** 背景网格图案的尺寸 */
  GRID_PATTERN_SIZE: 40,
} as const

/* ========================================
   滚动触发配置
   ======================================== */
export const VIEWPORT = {
  /** 只触发一次 */
  ONCE: true,
  /** 提前触发边距 */
  MARGIN: "-50px",
  /** 触发阈值（0-1） */
  AMOUNT: 0.3,
} as const

/* ========================================
   iOS 风格缓动曲线
   ======================================== */
export const EASE = {
  /** iOS 标准缓出曲线 */
  OUT: [0.22, 1, 0.36, 1] as const,
} as const
