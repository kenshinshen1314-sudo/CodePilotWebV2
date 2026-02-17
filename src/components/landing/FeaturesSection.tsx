/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标，依赖 @/components/ui/card，依赖 @/components/ui/badge
 * [OUTPUT]: 对外提供 Features 功能展示章节组件
 * [POS]: src/components/landing 的功能章节
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Database,
  FolderTree,
  Server,
  Shield,
  Settings,
  Palette,
  TrendingUp
} from "lucide-react"

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  highlighted?: boolean
}

interface FeaturesSectionProps {
  className?: string
}

const features: FeatureItem[] = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "实时流式对话",
    description: "通过 Agent SDK 与 Claude Code 进行实时流式对话，响应迅速如丝般顺滑"
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "会话本地持久化",
    description: "基于 SQLite 的本地会话管理，所有聊天记录自动保存，永不丢失"
  },
  {
    icon: <FolderTree className="h-6 w-6" />,
    title: "项目文件树预览",
    description: "右侧栏显示当前文件夹所有内容，文本文件可直接预览，一目了然"
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "MCP 服务器管理",
    description: "可视化配置 MCP 服务器和自定义 Skills，无需命令行操作"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "权限模式控制",
    description: "支持 Code / Plan / Ask 三种权限模式，安全可控"
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "第三方 API 配置",
    description: "支持自定义 Anthropic API 端点，灵活适配各种服务"
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "深浅色主题",
    description: "内置深色和浅色主题，跟随系统自动切换，护眼舒适"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Token 用量追踪",
    description: "实时显示 Token 使用量和费用，透明清晰，心中有数"
  }
]

export function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section id="features" className={["py-20 md:py-28 lg:py-32 bg-muted/30", className || ""].join(" ")}>
      <div className="container">
        {/* 章节标题 */}
        <div className="text-center mb-16">
          <Badge variant="glow" className="mb-4">功能亮点</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            强大的功能
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            支持 Claude Code 核心功能，与命令行版能力完全一致
          </p>
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="glass"
              className="group hover:scale-[1.02] transition-all duration-300"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
