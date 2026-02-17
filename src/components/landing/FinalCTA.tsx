/**
 * [INPUT]: 依赖 react，依赖 framer-motion，依赖 lucide-react 图标，依赖 @/components/ui/button，依赖 @/lib/motion 的动画配置
 * [OUTPUT]: 对外提供 FinalCTA 最终行动号召章节组件（含 Apple 风格动画）
 * [POS]: src/components/landing 的最终 CTA 章节
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "@/lib/motion"

interface FinalCTAProps {
  className?: string
}

export function FinalCTA({ className }: FinalCTAProps) {
  return (
    <motion.section
      id="download"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={[
        "py-20 md:py-28 lg:py-32 relative overflow-hidden",
        className || ""
      ].join(" ")}
    >
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 主标题 */}
          <motion.div variants={staggerItem}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              让 Claude Code 更好用
            </h2>
          </motion.div>

          {/* 副标题 */}
          <motion.div variants={staggerItem}>
            <p className="text-xl text-muted-foreground mb-8">
              可视化界面取代终端操作，聊天记录永不丢失，配置管理一目了然
            </p>
          </motion.div>

          {/* CTA 按钮 */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button variant="premium" size="lg" className="group text-base px-8 py-6 hover:scale-105 active:scale-95 transition-all duration-200" asChild>
              <Link href="/download">
                <Download className="mr-2 h-5 w-5" />
                立即下载
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" className="text-base px-8 py-6 hover:scale-105 active:scale-95 transition-all duration-200" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </motion.div>

          {/* 平台支持 */}
          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span>支持 macOS / Windows / Linux</span>
            <span className="text-border">|</span>
            <span>完全开源免费</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
