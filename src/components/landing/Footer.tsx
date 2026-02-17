/**
 * [INPUT]: 依赖 react，依赖 framer-motion，依赖 lucide-react 图标，依赖 @/lib/motion 的动画配置
 * [OUTPUT]: 对外提供 Footer 页脚组件（含 Apple 风格动画）
 * [POS]: src/components/landing 的页脚组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { Github, Twitter, Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/motion"

interface FooterProps {
  className?: string
}

const footerLinks = {
  product: [
    { label: "功能", href: "#features" },
    { label: "下载", href: "#download" },
    { label: "更新日志", href: "/changelog" },
  ],
  resources: [
    { label: "文档", href: "/docs" },
    { label: "API", href: "/api" },
    { label: "社区", href: "/community" },
  ],
  company: [
    { label: "关于", href: "/about" },
    { label: "GitHub", href: "https://github.com" },
    { label: "联系", href: "/contact" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export function Footer({ className }: FooterProps) {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={["border-t bg-muted/30", className || ""].join(" ")}
    >
      <div className="container py-12">
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* 品牌 */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h3 className="font-semibold text-lg">Claude Code Desktop</h3>
            <p className="text-sm text-muted-foreground">
              Claude Code 的原生桌面客户端
            </p>
          </motion.div>

          {/* 链接列 */}
          <motion.div variants={staggerItem}>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="font-semibold mb-4">关于</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* 底部栏 */}
        <motion.div
          variants={staggerItem}
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            用 <Heart className="h-4 w-4 text-destructive fill-destructive" /> 构建
          </p>

          {/* 社交链接 */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
