"use client";

import { Sidebar } from "@/components/layout/Sidebar"
import { McpManager } from "@/components/plugins/McpManager";

export default function McpPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        <div className="flex-1 overflow-hidden p-6 flex flex-col min-h-0">
          <McpManager />
        </div>
      </main>
    </div>
  );
}
