# CodePilot Web - Next.js + TailwindCSS v4
TypeScript + Next.js 15 + React 19 + TailwindCSS v4 + shadcn/ui

<directory>
src/ - 源代码 (3子目录: app, components, lib)
  app/ - App Router 页面与布局
    layout.tsx - 根布局，包装 TooltipProvider 和 Toaster
    page.tsx - 首页，Hero + Features + Tech Stack
    design-system/page.tsx - 设计系统展示页面
    landing/page.tsx - Landing Page 落地页
    globals.css - 全局样式，TailwindCSS v4 + shadcn CSS 变量
  components/ - 组件库
    layout/header.tsx - 头部导航，Logo + Design System 入口
    landing/ - Landing Page 章节组件（Hero, FeaturesSection, TopFeatures, ConnectionStatus, FinalCTA, Footer）
    ui/ - shadcn/ui 组件（36个：accordion, alert, aspect-ratio, avatar, badge, button, card, checkbox, collapsible, command, context-menu, dialog, dropdown-menu, form, hover-card, input, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip）
  lib/ - 工具函数
    utils.ts - cn() 样式合并函数
    motion.ts - Framer Motion 动效变体预设
</directory>

<config>
package.json - 项目依赖与脚本
tsconfig.json - TypeScript 配置，路径别名 @/*
next.config.ts - Next.js 配置
postcss.config.mjs - PostCSS 配置，TailwindCSS v4 插件
eslint.config.mjs - ESLint 配置
components.json - shadcn/ui 配置
</config>

设计系统: Kodama Grove 主题 + Landing Page 专用变体（premium/glass/elevated/glow），所有颜色来自 CSS 变量
路由: / (首页), /design-system (设计系统展示), /landing (Landing Page)
法则: 极简·稳定·导航·版本精确

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
