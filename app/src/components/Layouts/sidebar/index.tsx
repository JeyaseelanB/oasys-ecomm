"use client";

import { LogoIcon } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronLeft, ChevronRight, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

<<<<<<< HEAD
function NestedMenu({
  title,
  children,
=======
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
>>>>>>> a22f03293d02fb793bae480f8a971bddaa75eedb
  pathname,
  expandedItems,
  toggleExpanded,
  depth,
<<<<<<< HEAD
  toggleSidebar,
  isMobile,
}: {
  title: string;
  children: any[];
=======
}: {
  items: any[];
>>>>>>> a22f03293d02fb793bae480f8a971bddaa75eedb
  pathname: string;
  expandedItems: string[];
  toggleExpanded: (title: string) => void;
  depth: number;
<<<<<<< HEAD
  toggleSidebar: () => void;
  isMobile: boolean;
}) {
  const isExpanded = expandedItems.includes(title);

  const hasActiveChild = (items: any[]): boolean => {
    return items.some((item: any) => {
      if (item.url && item.url === pathname) return true;
      if (item.children) return hasActiveChild(item.children);
      return false;
    });
  };

  return (
    <div>
      <button
        onClick={() => toggleExpanded(title)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
          hasActiveChild(children)
            ? "text-primary dark:text-white"
            : "text-dark-4 hover:text-dark dark:text-dark-6 dark:hover:text-white",
        )}
      >
        <span>{title}</span>
        <ChevronUp
          className={cn(
            "size-4 rotate-180 transition-transform duration-200",
            isExpanded && "rotate-0",
          )}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <ul className={cn("ml-4 space-y-1 pt-1", depth > 0 && "ml-3")}>
          {children.map((child: any) => (
            <li key={child.title}>
              {child.children ? (
                <NestedMenu
                  title={child.title}
                  children={child.children}
=======
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
>>>>>>> a22f03293d02fb793bae480f8a971bddaa75eedb
                  pathname={pathname}
                  expandedItems={expandedItems}
                  toggleExpanded={toggleExpanded}
                  depth={depth + 1}
<<<<<<< HEAD
                  toggleSidebar={toggleSidebar}
                  isMobile={isMobile}
                />
              ) : (
                <Link
                  href={child.url}
                  onClick={() => isMobile && toggleSidebar()}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    pathname === child.url
                      ? "bg-[rgba(87,80,241,0.07)] text-primary dark:bg-[#FFFFFF1A] dark:text-white"
                      : "text-dark-4 hover:bg-gray-100 hover:text-dark dark:text-dark-6 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white",
                  )}
                >
                  {child.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
=======
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
>>>>>>> a22f03293d02fb793bae480f8a971bddaa75eedb
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar, isMinimized, toggleMinimize } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
<<<<<<< HEAD
  };

  // Recursively check if a URL exists within nested children
  const hasActiveUrl = (items: any[]): boolean => {
    return items.some((item: any) => {
      if (item.url && item.url === pathname) return true;
      if (item.children) return hasActiveUrl(item.children);
      return false;
    });
  };

  // Recursively collect parent titles for active path
  const getExpandedTitles = (items: any[], parents: string[] = []): string[] => {
    for (const item of items) {
      if (item.url && item.url === pathname) return parents;
      if (item.children) {
        const result = getExpandedTitles(item.children, [...parents, item.title]);
        if (result.length > 0) return result;
      }
    }
    return [];
  };

  useEffect(() => {
    // Keep collapsible open, when its subpage is active
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        // Check flat sub-items
        const flatMatch = item.items.some((subItem: any) => {
          if (subItem.url === pathname) return true;
          if (subItem.children && hasActiveUrl(subItem.children)) return true;
          return false;
        });

        if (flatMatch) {
          if (!expandedItems.includes(item.title)) {
            const nestedTitles: string[] = [];
            item.items.forEach((subItem: any) => {
              if (subItem.children) {
                nestedTitles.push(...getExpandedTitles(subItem.children, [subItem.title]));
              }
            });
            setExpandedItems((prev) => [...new Set([...prev, item.title, ...nestedTitles])]);
          }
          return true;
        }
        return false;
      });
    });
=======
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
>>>>>>> a22f03293d02fb793bae480f8a971bddaa75eedb
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
                "fixed bottom-0 top-0 left-0 z-40 h-screen overflow-hidden transition-[width] duration-200 ease-linear",
                isOpen ? (isMinimized ? "w-[70px]" : "w-[290px]") : "w-0",
              ),
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div
          className={cn(
            "flex h-full flex-col py-10",
            isMinimized && !isMobile
              ? "items-center px-[10px]"
              : "pl-[25px] pr-[7px]",
          )}
        >
          <div
            className={cn(
              "relative",
              isMinimized && !isMobile
                ? "flex w-full justify-center"
                : "pr-4.5",
            )}
          >
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="flex items-center gap-2 px-0 py-2.5 min-[850px]:py-0"
            >
              <LogoIcon />
              {(!isMinimized || isMobile) && (
                <span className="text-2xl font-bold text-dark dark:text-white">
                  Co-optex
                </span>
              )}
            </Link>

            {isMobile ? (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            ) : (
              <button
                onClick={toggleMinimize}
                className={cn(
                  "flex items-center justify-center rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-dark dark:text-gray-400 dark:hover:bg-[#FFFFFF1A]",
                  isMinimized
                    ? "size-8"
                    : "absolute right-0 top-1/2 -translate-y-1/2",
                )}
                title={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
              >
                <span className="sr-only">
                  {isMinimized ? "Expand sidebar" : "Minimize sidebar"}
                </span>
                {isMinimized ? (
                  <ChevronRight className="size-4" />
                ) : (
                  <ChevronLeft className="size-4" />
                )}
              </button>
            )}
          </div>

          {/* Navigation */}
          <div
            className={cn(
              "custom-scrollbar mt-6 flex-1 overflow-y-auto min-[850px]:mt-10",
              isMinimized && !isMobile ? "w-full overflow-x-hidden" : "pr-2",
            )}
          >
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                {!isMinimized && (
                  <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                    {section.label}
                  </h2>
                )}

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.items.length ? (
                          <div>
                            <MenuItem
<<<<<<< HEAD
                              isActive={item.items.some(
                                (sub: any) => sub.url === pathname || (sub.children && hasActiveUrl(sub.children)),
                              )}
                              onClick={() => toggleExpanded(item.title)}
=======
                              isActive={hasActiveChild(item.items, pathname)}
                              onClick={() =>
                                !isMinimized && toggleExpanded(item.title)
                              }
                              className={
                                isMinimized && !isMobile
                                  ? "justify-center px-2"
                                  : ""
                              }
>>>>>>> a22f03293d02fb793bae480f8a971bddaa75eedb
                            >
                              <item.icon
                                className="size-6 shrink-0"
                                aria-hidden="true"
                              />

                              {(!isMinimized || isMobile) && (
                                <>
                                  <span>{item.title}</span>
                                  <ChevronUp
                                    className={cn(
                                      "ml-auto rotate-180 transition-transform duration-200",
                                      expandedItems.includes(item.title) &&
                                        "rotate-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </MenuItem>

<<<<<<< HEAD
                            {expandedItems.includes(item.title) && (
                              <ul
                                className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2"
                                role="menu"
                              >
                                {item.items.map((subItem: any) => (
                                  <li key={subItem.title} role="none">
                                    {subItem.children ? (
                                      <NestedMenu
                                        title={subItem.title}
                                        children={subItem.children}
                                        pathname={pathname}
                                        expandedItems={expandedItems}
                                        toggleExpanded={toggleExpanded}
                                        depth={0}
                                        toggleSidebar={toggleSidebar}
                                        isMobile={isMobile}
                                      />
                                    ) : (
                                      <MenuItem
                                        as="link"
                                        href={subItem.url}
                                        isActive={pathname === subItem.url}
                                      >
                                        <span>{subItem.title}</span>
                                      </MenuItem>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
=======
                            {(!isMinimized || isMobile) &&
                              expandedItems.includes(item.title) && (
                                <SubMenuItems
                                  items={item.items}
                                  pathname={pathname}
                                  expandedItems={expandedItems}
                                  toggleExpanded={toggleExpanded}
                                  depth={0}
                                />
                              )}
>>>>>>> a22f03293d02fb793bae480f8a971bddaa75eedb
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
                                className={cn(
                                  "flex items-center gap-3 py-3",
                                  isMinimized && !isMobile && "justify-center px-2",
                                )}
                                as="link"
                                href={href}
                                isActive={pathname === href}
                              >
                                <item.icon
                                  className="size-6 shrink-0"
                                  aria-hidden="true"
                                />

                                {(!isMinimized || isMobile) && (
                                  <span>{item.title}</span>
                                )}
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
