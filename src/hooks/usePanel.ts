"use client";

import { useContext } from "react";
import { PanelContext } from "@/components/panel/PanelProvider";
export type { PanelContextValue, PanelContent, PreviewViewMode } from "@/components/panel/PanelProvider";

export function usePanel() {
    const ctx = useContext(PanelContext);
    if (!ctx) {
        throw new Error("usePanel must be used within a PanelProvider");
    }
    return ctx;
}
