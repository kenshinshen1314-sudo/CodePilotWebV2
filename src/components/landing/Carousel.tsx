/**
 * [INPUT]: 依赖 react，依赖 framer-motion，依赖 next/image
 * [OUTPUT]: 对外提供 DesignShowcase 轮播组件
 * [POS]: src/components/landing 的轮播展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  { src: "/images/1.png", alt: "设计系统 - 颜色系统" },
  { src: "/images/2.png", alt: "设计系统 - 排版规范" },
  { src: "/images/3.png", alt: "设计系统 - 按钮组件" },
  { src: "/images/4.png", alt: "设计系统 - 卡片设计" },
  { src: "/images/5.png", alt: "设计系统 - 表单控件" },
  { src: "/images/6.png", alt: "设计系统 - 导航组件" },
  { src: "/images/7.png", alt: "设计系统 - 反馈组件" },
]

export function DesignShowcase() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goTo = (index: number) => {
    setCurrent(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="py-12 md:py-16 bg-muted/20">
      <div className="container max-w-6xl">
        {/* 轮播容器 */}
        <div
          className="relative w-full aspect-[16/10] md:aspect-[21/9] lg:aspect-[21/10] max-h-[400px] md:max-h-[500px] overflow-hidden rounded-2xl shadow-xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].src}
                alt={slides[current].alt}
                fill
                className="object-contain p-3 md:p-4"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* 导航箭头 */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white transition-all"
            aria-label="上一张"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white transition-all"
            aria-label="下一张"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* 指示器 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`transition-all duration-300 ${
                  index === current ? "scale-125" : "scale-100"
                }`}
                aria-label={`跳转到第 ${index + 1} 张`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
