/**
 * [INPUT]: 依赖 next 的类型，依赖 react 的组件类型，依赖 @/components/ui/tooltip 的 TooltipProvider，依赖 @/components/ui/sonner 的 Toaster
 * [OUTPUT]: 对外提供根布局组件，包装全局 Provider
 * [POS]: src/app 的根布局，所有页面的容器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ProviderProvider } from "@/lib/provider-context";
import { I18nProvider } from "@/components/layout/I18nProvider";
import { PanelProvider } from "@/components/panel/PanelProvider";
import { SplitProvider } from "@/components/split/SplitProvider";
import { BatchImageGenProvider } from "@/components/chat/batch-image-gen";
import { ImageGenProvider } from "@/components/ai-elements/ImageGenProvider";

export const metadata: Metadata = {
  title: "CodePilot Web",
  description: "AI-powered coding assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <TooltipProvider>
          <I18nProvider>
            <PanelProvider>
              <SplitProvider>
                <BatchImageGenProvider>
                <ImageGenProvider>
                  <ProviderProvider>
                    {children}
                  </ProviderProvider>
                </ImageGenProvider>
              </BatchImageGenProvider>
              </SplitProvider>
            </PanelProvider>
          </I18nProvider>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
