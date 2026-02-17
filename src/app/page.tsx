/**
 * [INPUT]: 依赖 react，依赖 @/components/layout/header 的 Header
 * [OUTPUT]: 对外提供首页组件
 * [POS]: src/app 的入口页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Palette, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Code2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">CodePilot Web</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI 驱动的代码助手，让编程更高效
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/design-system">查看设计系统</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>快速高效</CardTitle>
              <CardDescription>基于 Next.js 15 和 React 19，提供极致的性能体验</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Palette className="h-8 w-8 text-primary mb-2" />
              <CardTitle>设计系统</CardTitle>
              <CardDescription>集成 shadcn/ui 和 Kodama Grove 主题，统一的设计语言</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>类型安全</CardTitle>
              <CardDescription>TypeScript 全覆盖，代码提示更智能，重构更安全</CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Tech Stack */}
        <section className="py-12">
          <Card>
            <CardHeader>
              <CardTitle>技术栈</CardTitle>
              <CardDescription>项目使用的核心技术和版本</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="font-medium">Next.js</p>
                  <p className="text-sm text-muted-foreground">15.5.12</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">React</p>
                  <p className="text-sm text-muted-foreground">19.0.0</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">TypeScript</p>
                  <p className="text-sm text-muted-foreground">5.x</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">TailwindCSS</p>
                  <p className="text-sm text-muted-foreground">v4.1.18</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
