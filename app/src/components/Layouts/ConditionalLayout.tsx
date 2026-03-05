"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useSidebarContext } from "./sidebar/sidebar-context";

export function ConditionalLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const { isOpen, isMobile } = useSidebarContext();

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Calculate left margin based on sidebar state (only on desktop)
  const sidebarWidth = !isMobile && isOpen ? 290 : 0;

  return (
    <div className="flex min-h-screen bg-gray-2 dark:bg-[#020d1a]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content - shifts based on sidebar width */}
      <div
        className="flex flex-1 flex-col overflow-hidden transition-[margin-left] duration-200 ease-linear"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* Header - Fixed */}
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
