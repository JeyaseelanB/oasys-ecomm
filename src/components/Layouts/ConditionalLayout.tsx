"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useSidebarContext } from "./sidebar/sidebar-context";

export function ConditionalLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const { isOpen, isMobile, isMinimized } = useSidebarContext();

  if (isAuthPage) {
    return <>{children}</>;
  }

  const sidebarWidth = !isMobile && isOpen ? (isMinimized ? 70 : 290) : 0;

  return (
    <div className="flex h-screen bg-gray-2 dark:bg-[#020d1a]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Placeholder div that mirrors the sidebar width so flex-1 content gets correct width */}
      <div
        aria-hidden="true"
        className="shrink-0 transition-[width] duration-200 ease-linear"
        style={{ width: `${sidebarWidth}px` }}
      />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0">
          <Header />
        </div>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
