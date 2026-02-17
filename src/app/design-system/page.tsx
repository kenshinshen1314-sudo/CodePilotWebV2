/**
 * [INPUT]: 依赖 @/components/design-system 的所有展示组件
 * [OUTPUT]: 对外提供 DesignSystem 展示页面，展示所有 36 个 shadcn/ui 组件
 * [POS]: src/app/design-system 的设计系统展示页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { Separator } from "@/components/ui/separator"
import {
  ColorShowcase,
  TypographyShowcase,
  ButtonShowcase,
  InputShowcase,
  SelectRadioShowcase,
  CardBadgeShowcase,
  AlertShowcase,
  DialogSheetShowcase,
  PopoverDropdownShowcase,
  NavigationShowcase,
  AccordionCollapsibleShowcase,
  CommandShowcase,
  HoverTooltipShowcase,
  ScrollShowcase,
  FeedbackShowcase,
  AvatarTableShowcase,
  SliderToggleShowcase,
  MenuShowcase,
  AspectRatioShowcase,
  ComponentSummary,
} from "@/components/design-system"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="container py-8">
          <div className="flex items-center gap-3">
            {/* Palette icon omitted for brevity, can be added if needed */}
            <div>
              <h1 className="text-3xl font-bold">Design System</h1>
              <p className="text-muted-foreground">Kodama Grove Theme + 36 shadcn/ui Components</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-12">
        <ColorShowcase />
        <Separator />
        <TypographyShowcase />
        <Separator />
        <ButtonShowcase />
        <Separator />
        <InputShowcase />
        <Separator />
        <SelectRadioShowcase />
        <Separator />
        <CardBadgeShowcase />
        <Separator />
        <AlertShowcase />
        <Separator />
        <DialogSheetShowcase />
        <Separator />
        <PopoverDropdownShowcase />
        <Separator />
        <NavigationShowcase />
        <Separator />
        <AccordionCollapsibleShowcase />
        <Separator />
        <CommandShowcase />
        <Separator />
        <HoverTooltipShowcase />
        <Separator />
        <ScrollShowcase />
        <Separator />
        <FeedbackShowcase />
        <Separator />
        <AvatarTableShowcase />
        <Separator />
        <SliderToggleShowcase />
        <Separator />
        <MenuShowcase />
        <Separator />
        <AspectRatioShowcase />
        <Separator />
        <ComponentSummary />
      </div>
    </div>
  )
}
