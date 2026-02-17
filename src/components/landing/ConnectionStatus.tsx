/**
 * [INPUT]: 依赖 react，依赖 lucide-react 图标，依赖 @/components/ui/card
 * [OUTPUT]: 对外提供 ConnectionStatus 连接状态章节组件
 * [POS]: src/components/landing 的连接状态章节
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, AlertCircle, CheckCircle2 } from "lucide-react"

interface ConnectionStatusProps {
  className?: string
}

const connectionStates = [
  {
    icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    status: "已连接",
    description: "Claude Code 正常运行，所有功能可用",
    variant: "glow" as const
  },
  {
    icon: <WifiOff className="h-6 w-6 text-orange-500" />,
    status: "未连接",
    description: "检测到 Claude Code 未运行，请先启动服务",
    variant: "glass" as const
  },
  {
    icon: <AlertCircle className="h-6 w-6 text-destructive" />,
    status: "配置错误",
    description: "请检查 Claude Code 安装路径和配置",
    variant: "glass" as const
  }
]

export function ConnectionStatus({ className }: ConnectionStatusProps) {
  return (
    <section className={["py-20 md:py-28 lg:py-32 bg-muted/30", className || ""].join(" ")}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* 章节标题 */}
          <div className="text-center mb-12">
            <Badge variant="glass" className="mb-4 gap-2">
              <Wifi className="h-4 w-4" />
              <span>连接状态</span>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              一目了然
            </h2>
            <p className="text-xl text-muted-foreground">
              状态栏实时显示 Claude Code 连接状态
            </p>
          </div>

          {/* 状态展示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {connectionStates.map((state, index) => (
              <Card
                key={index}
                variant={index === 0 ? "elevated" : "glass"}
                className={`text-center p-6 ${index === 0 ? 'ring-2 ring-primary/20' : ''}`}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center shadow-sm">
                      {state.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{state.status}</h3>
                  <p className="text-sm text-muted-foreground">
                    {state.description}
                  </p>
                  {index === 0 && (
                    <Badge variant="glow" className="mt-4">
                      当前状态
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 帮助提示 */}
          <Card variant="glass" className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">连接失败？</h4>
                  <p className="text-sm text-muted-foreground">
                    应用会提示你如何安装和启动 Claude Code。确保已安装 Node.js 和 Claude Code CLI，
                    然后在设置中配置正确的路径。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
