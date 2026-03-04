"use client";

import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading02Icon } from "@hugeicons/core-free-icons";
import { Sidebar } from "@/components/layout/Sidebar"
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { UpdateProvider } from "@/components/settings/UpdateProvider";

export default function SettingsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        <UpdateProvider>
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <HugeiconsIcon icon={Loading02Icon} className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            }
          >
            <SettingsLayout />
          </Suspense>
        </UpdateProvider>
      </main>
    </div>
  );
}
