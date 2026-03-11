"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

// Check if any descendant URL matches the current pathname
function hasActiveChild(items: any[], pathname: string): boolean {
  return items.some(
    (item) =>
      item.url === pathname ||
      (item.items && hasActiveChild(item.items, pathname)),
  );
}

// Collect all parent titles that should be expanded for the current pathname
function getExpandedTitles(items: any[], pathname: string): string[] {
  const titles: string[] = [];
  for (const item of items) {
    if (item.items && item.items.length > 0) {
      if (hasActiveChild(item.items, pathname)) {
        titles.push(item.title);
      }
      titles.push(...getExpandedTitles(item.items, pathname));
    }
  }
  return titles;
}

// Recursive sub-menu component
function SubMenuItems({
  items,
  pathname,
  expandedItems,
  toggleExpanded,
  depth,
}: {
  items: any[];
  pathname: string;
  expandedItems: string[];
  toggleExpanded: (title: string) => void;
  depth: number;
}) {
  return (
    <ul
      className={cn(
        "space-y-1 pb-1 pt-1.5",
        depth === 0 ? "ml-9 mr-0 pb-[15px] pr-0 pt-2" : "ml-4",
      )}
      role="menu"
    >
      {items.map((subItem: any) => {
        const hasChildren = subItem.items && subItem.items.length > 0;
        const isExpanded = expandedItems.includes(subItem.title);
        const isActive = subItem.url === pathname;
        const isChildActive = hasChildren && hasActiveChild(subItem.items, pathname);

        if (hasChildren) {
          return (
            <li key={subItem.title} role="none">
              <button
                onClick={() => toggleExpanded(subItem.title)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive || isChildActive
                    ? "text-primary dark:text-white"
                    : "text-dark-4 hover:bg-gray-100 hover:text-dark dark:text-dark-6 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white",
                )}
              >
                <span>{subItem.title}</span>
                <ChevronUp
                  className={cn(
                    "ml-auto size-4 rotate-180 transition-transform duration-200",
                    isExpanded && "rotate-0",
                  )}
                  aria-hidden="true"
                />
              </button>
              {isExpanded && (
                <SubMenuItems
                  items={subItem.items}
                  pathname={pathname}
                  expandedItems={expandedItems}
                  toggleExpanded={toggleExpanded}
                  depth={depth + 1}
                />
              )}
            </li>
          );
        }

        return (
          <li key={subItem.title} role="none">
            <MenuItem
              as="link"
              href={subItem.url}
              isActive={isActive}
            >
              <span>{subItem.title}</span>
            </MenuItem>
          </li>
        );
      })}
    </ul>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  useEffect(() => {
    // Auto-expand all ancestors for the current pathname
    const allItems = NAV_DATA.flatMap((section) => section.items);
    const titlesToExpand: string[] = [];

    for (const item of allItems) {
      // Check top-level items
      if (item.items && hasActiveChild(item.items, pathname)) {
        if (!expandedItems.includes(item.title)) {
          titlesToExpand.push(item.title);
        }
      }
      // Check nested items recursively
      const nestedTitles = getExpandedTitles(item.items, pathname);
      for (const t of nestedTitles) {
        if (!expandedItems.includes(t)) {
          titlesToExpand.push(t);
        }
      }
    }

    if (titlesToExpand.length > 0) {
      setExpandedItems((prev) => [...new Set([...prev, ...titlesToExpand])]);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark",
          isMobile
            ? cn(
                "fixed bottom-0 top-0 z-50 w-[290px] transition-[margin-left] duration-200 ease-linear",
                isOpen ? "ml-0" : "-ml-[290px]",
              )
            : cn(
                "fixed bottom-0 top-0 left-0 z-40 h-screen transition-[width] duration-200 ease-linear",
                isOpen ? "w-[290px] overflow-hidden" : "w-0 overflow-hidden",
              ),
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>

                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-2 min-[850px]:mt-10">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.items.length ? (
                          <div>
                            <MenuItem
                              isActive={hasActiveChild(item.items, pathname)}
                              onClick={() => toggleExpanded(item.title)}
                            >
                              <item.icon
                                className="size-6 shrink-0"
                                aria-hidden="true"
                              />

                              <span>{item.title}</span>

                              <ChevronUp
                                className={cn(
                                  "ml-auto rotate-180 transition-transform duration-200",
                                  expandedItems.includes(item.title) &&
                                    "rotate-0",
                                )}
                                aria-hidden="true"
                              />
                            </MenuItem>

                            {expandedItems.includes(item.title) && (
                              <SubMenuItems
                                items={item.items}
                                pathname={pathname}
                                expandedItems={expandedItems}
                                toggleExpanded={toggleExpanded}
                                depth={0}
                              />
                            )}
                          </div>
                        ) : (
                          (() => {
                            const href =
                              "url" in item
                                ? item.url + ""
                                : "/" +
                                  item.title.toLowerCase().split(" ").join("-");

                            return (
                              <MenuItem
                                className="flex items-center gap-3 py-3"
                                as="link"
                                href={href}
                                isActive={pathname === href}
                              >
                                <item.icon
                                  className="size-6 shrink-0"
                                  aria-hidden="true"
                                />

                                <span>{item.title}</span>
                              </MenuItem>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
