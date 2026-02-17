/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标，依赖 @/components/ui/card
 * [OUTPUT]: 对外提供 TopFeatures 核心功能章节组件
 * [POS]: src/components/landing 的核心功能章节
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Settings as SettingsIcon, FolderOpen, Sparkles } from "lucide-react"

interface TopFeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  highlight: string
}

interface TopFeaturesProps {
  className?: string
}

const topFeatures: TopFeatureItem[] = [
  {
    icon: <History className="h-8 w-8" />,
    title: "聊天记录管理",
    description: "Claude Code 最让小白头疼的问题就是找不到聊天记录。你明明知道之前聊的内容很有价值，但就是翻不出来。",
    highlight: "现在所有聊天记录都保存在侧边栏，跟文件夹绑定，随时能翻回去看。每条消息还会显示花了多少钱，这个透明度很重要。"
  },
  {
    icon: <SettingsIcon className="h-8 w-8" />,
    title: "可视化配置管理",
    description: "Claude Code 的配置文件、Skills、MCP、插件，以前都得去命令行里折腾。",
    highlight: "现在有个可视化界面，直接在这里改、预览、保存，跟用普通应用一样。文件夹内容预览。右边栏能看到当前文件夹里所有东西，文本文件可以直接预览。这个功能看起来简单，但实际用起来真的方便。"
  },
  {
    icon: <FolderOpen className="h-8 w-8" />,
    title: "第三方 API 配置",
    description: "如果你用的是官方授权登录或者已经配好环境变量，直接就能用，不需要额外设置。",
    highlight: "但如果你想用第三方的 Claude API（比如一些国内转发的服务），也可以在设置里配置。这个灵活性很重要，毕竟不是每个人都能直接访问官方 API。"
  }
]

export function TopFeatures({ className }: TopFeaturesProps) {
  return (
    <section className={["py-20 md:py-28 lg:py-32", className || ""].join(" ")}>
      <div className="container">
        {/* 章节标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">核心价值</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            最有价值的 3 个功能
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            解决 Claude Code 命令行版最痛的痛点
          </p>
        </div>

        {/* 核心功能列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {topFeatures.map((feature, index) => (
            <Card
              key={index}
              variant="elevated"
              className="relative overflow-hidden group"
            >
              {/* 渐变背景装饰 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors" />

              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base mt-3">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm text-foreground">
                    {feature.highlight}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
