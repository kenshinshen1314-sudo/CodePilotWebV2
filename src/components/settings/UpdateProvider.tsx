"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { UpdateInfo, UpdateContextValue } from "@/hooks/useUpdate";
import { UpdateContext } from "@/hooks/useUpdate";

interface UpdateProviderProps {
  children: ReactNode;
}

export function UpdateProvider({ children }: UpdateProviderProps) {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [checking, setChecking] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const checkForUpdates = useCallback(async () => {
    setChecking(true);
    try {
      // Simulate checking for updates
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For web version, just show current version info
      const currentVersion = process.env.NEXT_PUBLIC_APP_VERSION || "0.8.4";

      // In a real app, this would call an API to check for updates
      // For now, we'll just set updateAvailable to false
      setUpdateInfo({
        updateAvailable: false,
        latestVersion: currentVersion,
        currentVersion,
        releaseName: "",
        releaseNotes: "",
        releaseUrl: "",
        publishedAt: "",
        downloadProgress: null,
        readyToInstall: false,
        isNativeUpdate: false,
        lastError: null,
      });
    } catch (error) {
      console.error("Failed to check for updates:", error);
      setUpdateInfo({
        updateAvailable: false,
        latestVersion: process.env.NEXT_PUBLIC_APP_VERSION || "0.8.4",
        currentVersion: process.env.NEXT_PUBLIC_APP_VERSION || "0.8.4",
        releaseName: "",
        releaseNotes: "",
        releaseUrl: "",
        publishedAt: "",
        downloadProgress: null,
        readyToInstall: false,
        isNativeUpdate: false,
        lastError: error instanceof Error ? error.message : "Failed to check for updates",
      });
    } finally {
      setChecking(false);
    }
  }, []);

  const downloadUpdate = useCallback(() => {
    // For web version, updates are handled differently
    console.log("Download update - not applicable for web version");
  }, []);

  const dismissUpdate = useCallback(() => {
    setShowDialog(false);
  }, []);

  const quitAndInstall = useCallback(() => {
    // For web version, this would reload the page
    console.log("Quit and install - not applicable for web version");
  }, []);

  const value: UpdateContextValue = {
    updateInfo,
    checking,
    checkForUpdates,
    downloadUpdate,
    dismissUpdate,
    showDialog,
    setShowDialog,
    quitAndInstall,
  };

  return <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>;
}
