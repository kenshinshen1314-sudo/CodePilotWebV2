/**
 * [INPUT]: 依赖 react，依赖 @/components/landing 中的章节组件
 * [OUTPUT]: 对外提供 Landing Page 完整页面
 * [POS]: src/app/landing 的落地页入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import {
  Hero,
  DesignShowcase,
  FeaturesSection,
  TopFeatures,
  ConnectionStatus,
  FinalCTA,
  Footer
} from "@/components/landing"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DesignShowcase />
      <FeaturesSection />
      <TopFeatures />
      <ConnectionStatus />
      <FinalCTA />
      <Footer />
    </main>
  )
}
