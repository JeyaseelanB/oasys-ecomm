"use client";

import { useEffect } from "react";
import { useSidebarContext } from "./sidebar/sidebar-context";

interface HideSidebarLayoutClientProps {
  children: React.ReactNode;
}

/**
 * Client component that hides the sidebar for pages that need full width.
 */
export function HideSidebarLayoutClient({
  children,
}: HideSidebarLayoutClientProps) {
  const { setIsOpen } = useSidebarContext();

  useEffect(() => {
    // Hide sidebar on mount
    setIsOpen(false);
  }, [setIsOpen]);

  return <>{children}</>;
}

/**
 * Server-side layout wrapper factory.
 * Returns a layout component that hides the sidebar.
 * 
 * Usage in layout.tsx:
 * ```
 * import { createHideSidebarLayout } from "@/components/Layouts/HideSidebarLayout";
 * export default createHideSidebarLayout();
 * ```
 */
export function createHideSidebarLayout() {
  return function Layout({ children }: { children: React.ReactNode }) {
    return <HideSidebarLayoutClient>{children}</HideSidebarLayoutClient>;
  };
}
