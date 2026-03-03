"use client";

import { useContext } from "react";
import { SplitContext } from "@/components/split/SplitProvider";

export type { SplitSession, SplitContextValue } from "@/components/split/SplitProvider";

export function useSplit() {
    const ctx = useContext(SplitContext);
    if (!ctx) {
        throw new Error("useSplit must be used within a SplitProvider");
    }
    return ctx;
}
