/**
 * [INPUT]: 依赖 @/components/ui/alert，依赖 lucide-react 的 AlertCircle、CheckCircle2、Info、AlertTriangle 图标
 * [OUTPUT]: 对外提供警告提示展示章节组件
 * [POS]: src/components/design-system 的警告提示展示组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

export function AlertShowcase() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5" />
        <h2 className="text-2xl font-bold">7. Alerts</h2>
      </div>
      <div className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>This is an informational alert message.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong. Please try again.</AlertDescription>
        </Alert>
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your changes have been saved successfully.</AlertDescription>
        </Alert>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Please review this information before proceeding.</AlertDescription>
        </Alert>
      </div>
    </section>
  )
}
