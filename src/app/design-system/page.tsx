/**
 * [INPUT]: 依赖 @/components/ui 的所有组件，依赖 lucide-react 的图标
 * [OUTPUT]: 对外提供 DesignSystem 展示页面，展示所有 36 个 shadcn/ui 组件
 * [POS]: src/app/design-system 的设计系统展示页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Palette,
  Type,
  Box,
  Layout,
  Keyboard,
  Menu,
  Loader2,
  ChevronDown,
  Plus,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Layers,
  ChevronRight,
  Search,
  Frame,
  Circle,
  Scale,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";

const COLORS = [
  { name: "Background", var: "--background" },
  { name: "Foreground", var: "--foreground" },
  { name: "Primary", var: "--primary" },
  { name: "Secondary", var: "--secondary" },
  { name: "Muted", var: "--muted" },
  { name: "Accent", var: "--accent" },
  { name: "Destructive", var: "--destructive" },
  { name: "Border", var: "--border" },
  { name: "Input", var: "--input" },
  { name: "Ring", var: "--ring" },
];

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="container py-8">
          <div className="flex items-center gap-3">
            <Palette className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Design System</h1>
              <p className="text-muted-foreground">Kodama Grove Theme + 36 shadcn/ui Components</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-12">
        {/* 1. Colors */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5" />
            <h2 className="text-2xl font-bold">1. Colors</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {COLORS.map((color) => (
              <Card key={color.var}>
                <CardHeader className="pb-3">
                  <div
                    className="h-20 w-full rounded-md border"
                    style={{ backgroundColor: `var(${color.var})` }}
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">{color.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* 2. Typography */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-5 w-5" />
            <h2 className="text-2xl font-bold">2. Typography</h2>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <p className="text-sm text-muted-foreground font-mono mt-1">text-4xl font-bold</p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold">Heading 2</h2>
                <p className="text-sm text-muted-foreground font-mono mt-1">text-3xl font-semibold</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Heading 3</h3>
                <p className="text-sm text-muted-foreground font-mono mt-1">text-2xl font-semibold</p>
              </div>
              <div>
                <p className="text-base">Body text - The quick brown fox jumps over the lazy dog.</p>
                <p className="text-sm text-muted-foreground font-mono mt-1">text-base</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Small muted text - Additional context information.</p>
                <p className="text-sm text-muted-foreground font-mono mt-1">text-sm text-muted-foreground</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 3. Buttons */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Box className="h-5 w-5" />
            <h2 className="text-2xl font-bold">3. Buttons</h2>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label>Variants</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <div>
                <Label>Sizes</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <div>
                <Label>With Icon</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button>
                  <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 4. Inputs */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Keyboard className="h-5 w-5" />
            <h2 className="text-2xl font-bold">4. Inputs</h2>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input-default">Input</Label>
                <Input id="input-default" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input-disabled">Disabled</Label>
                <Input id="input-disabled" disabled placeholder="Disabled..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textarea">Textarea</Label>
                <Textarea id="textarea" placeholder="Enter multiple lines..." rows={3} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch id="switch-default" />
                  <Label htmlFor="switch-default">Switch</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="checkbox-default" />
                  <Label htmlFor="checkbox-default">Checkbox</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 5. Select & Radio */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5" />
            <h2 className="text-2xl font-bold">5. Select & Radio Group</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Radio Group</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="r1" />
                    <Label htmlFor="r1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="r2" />
                    <Label htmlFor="r2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="r3" />
                    <Label htmlFor="r3">Option 3</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 6. Cards & Badges */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layout className="h-5 w-5" />
            <h2 className="text-2xl font-bold">6. Cards & Badges</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>完整 Card</CardTitle>
                <CardDescription>包含所有子组件的 Card</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card content with additional information.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>带 CardAction</CardTitle>
                <CardDescription>使用 CardAction 的示例</CardDescription>
                <CardAction>
                  <Button variant="ghost" size="sm">Setting</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">CardAction 通常放在 Header 中用于放置操作按钮。</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Badges</CardTitle>
                  <Badge>Default</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Badge 组件展示：</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 7. Alerts */}
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

        <Separator />

        {/* 8. Dialog & Sheet */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Frame className="h-5 w-5" />
            <h2 className="text-2xl font-bold">8. Dialog & Sheet</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog component with title, description, and footer.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">Dialog content goes here.</div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>
                    This is a sheet component that slides in from the side.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">Sheet content goes here.</div>
                <SheetFooter>
                  <Button variant="outline" onClick={() => setSheetOpen(false)}>Close</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </section>

        <Separator />

        {/* 9. Popover & Dropdown */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Circle className="h-5 w-5" />
            <h2 className="text-2xl font-bold">9. Popover & Dropdown Menu</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <h4 className="font-medium">Popover Title</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a popover component with additional content.
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" /> Account
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        <Separator />

        {/* 10. Navigation Menu */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Menu className="h-5 w-5" />
            <h2 className="text-2xl font-bold">10. Navigation Menu</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[400px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <a className="flex gap-4 p-3 rounded-md hover:bg-accent">
                              <Frame className="h-6 w-6" />
                              <div>
                                <p className="font-medium">Product One</p>
                                <p className="text-sm text-muted-foreground">Description for product one</p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a className="flex gap-4 p-3 rounded-md hover:bg-accent">
                              <Box className="h-6 w-6" />
                              <div>
                                <p className="font-medium">Product Two</p>
                                <p className="text-sm text-muted-foreground">Description for product two</p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[400px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <a className="block p-3 rounded-md hover:bg-accent">
                              <p className="font-medium">Getting Started</p>
                              <p className="text-sm text-muted-foreground">Introduction to the platform</p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 11. Accordion & Collapsible */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5" />
            <h2 className="text-2xl font-bold">11. Accordion & Collapsible</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that match the other components.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collapsible</CardTitle>
              </CardHeader>
              <CardContent>
                <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <span>Collapsible Content</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
                    This is collapsible content that can be expanded and collapsed.
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 12. Command Palette */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5" />
            <h2 className="text-2xl font-bold">12. Command Palette</h2>
          </div>
          <div className="flex justify-start">
            <Button onClick={() => setCommandOpen(true)}>
              <Search className="mr-2 h-4 w-4" />
              Open Command (⌘K)
            </Button>
          </div>
          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Frame className="mr-2 h-4 w-4" />
                  <span>Projects</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Project</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </section>

        <Separator />

        {/* 13. Hover Card & Tooltip */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5" />
            <h2 className="text-2xl font-bold">13. Hover Card & Tooltip</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline">Hover Me</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Shadcn</p>
                    <p className="text-sm text-muted-foreground">
                      Hover card component with rich content.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Tooltip Button</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip with additional information.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>

        <Separator />

        {/* 14. Scroll Area */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5" />
            <h2 className="text-2xl font-bold">14. Scroll Area</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ScrollArea className="h-48 w-full rounded-md border p-4">
                <div className="space-y-4">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>Nullam auctor, nisl eget ultricies tincidunt.</p>
                  <p>Fusce at leo vel libero pretium placerat.</p>
                  <p>Donec eget ex magna. Interdum et malesuada fames ac ante.</p>
                  <p>Curabitur vel sem a metus facilisis congue.</p>
                  <p>Sed do eiusmod tempor incididunt ut labore.</p>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 15. Feedback Components */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Loader2 className="h-5 w-5" />
            <h2 className="text-2xl font-bold">15. Feedback Components</h2>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>Progress</Label>
                <Progress value={66} />
              </div>
              <div className="space-y-2">
                <Label>Skeleton</Label>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tabs</Label>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-2">
                    <p className="text-sm text-muted-foreground">Content for Tab 1</p>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-2">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-2">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-2">
                <Label>Sonner (Toast)</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toast.success("Operation successful!")}
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.error("Something went wrong!")}
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.info("Here is some information")}
                  >
                    Info Toast
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* 16. Avatar & Table */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ChevronRight className="h-5 w-5" />
            <h2 className="text-2xl font-bold">16. Avatar & Table</h2>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">XY</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alice Johnson</TableCell>
                      <TableCell><Badge variant="outline">Active</Badge></TableCell>
                      <TableCell>Developer</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bob Smith</TableCell>
                      <TableCell><Badge>Active</Badge></TableCell>
                      <TableCell>Designer</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Carol White</TableCell>
                      <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 17. Slider & Toggle */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-5 w-5" />
            <h2 className="text-2xl font-bold">17. Slider & Toggle</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Slider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Slider</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <Label>Range Slider</Label>
                  <Slider defaultValue={[25, 75]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Toggle & Toggle Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Toggle</Label>
                  <div className="flex gap-2">
                    <Toggle>Bold</Toggle>
                    <Toggle variant="outline">Italic</Toggle>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Toggle Group</Label>
                  <ToggleGroup type="single" defaultValue="left">
                    <ToggleGroupItem value="left">
                      <PanelLeft className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center">
                      <Frame className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right">
                      <Box className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 18. Menu Components */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Menu className="h-5 w-5" />
            <h2 className="text-2xl font-bold">18. Menubar & Context Menu</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Menubar</CardTitle>
              </CardHeader>
              <CardContent>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>New Window</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                  </MenubarMenu>
                </Menubar>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Context Menu</CardTitle>
                <CardDescription>Right-click anywhere to test</CardDescription>
              </CardHeader>
              <CardContent>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <div className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm">
                      Right click here
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <p className="px-2 py-1.5 text-sm font-medium">Actions</p>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                      Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>Paste</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuItem>Option 1</ContextMenuItem>
                        <ContextMenuItem>Option 2</ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* 19. Aspect Ratio */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Frame className="h-5 w-5" />
            <h2 className="text-2xl font-bold">19. Aspect Ratio</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>16:9</Label>
                  <AspectRatio ratio={16 / 9}>
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                      16:9
                    </div>
                  </AspectRatio>
                </div>
                <div className="space-y-2">
                  <Label>4:3</Label>
                  <AspectRatio ratio={4 / 3}>
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                      4:3
                    </div>
                  </AspectRatio>
                </div>
                <div className="space-y-2">
                  <Label>1:1</Label>
                  <AspectRatio ratio={1 / 1}>
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                      1:1
                    </div>
                  </AspectRatio>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Component Summary */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>全部 36 个组件清单</CardTitle>
              <CardDescription>已展示所有 shadcn/ui 组件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Accordion</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Alert</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Aspect Ratio</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Avatar</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Badge</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Button</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Card</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Checkbox</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Collapsible</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Command</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Context Menu</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Dialog</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Dropdown Menu</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Form</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Hover Card</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Input</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Label</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Menubar</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Navigation Menu</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Popover</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Progress</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Radio Group</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Scroll Area</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Select</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Separator</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Sheet</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Skeleton</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Slider</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Sonner (Toast)</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Switch</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Table</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Tabs</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Textarea</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Toggle</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Toggle Group</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Tooltip</div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
