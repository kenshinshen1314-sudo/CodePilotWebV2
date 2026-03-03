"use client";

import { Sidebar } from "@/components/layout/Sidebar"
import { SkillsManager } from "@/components/skills/SkillsManager"

export default function SkillsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        <div className="flex-1 overflow-hidden p-6 flex flex-col min-h-0">
          <SkillsManager />
        </div>
      </main>
    </div>
  );
}
