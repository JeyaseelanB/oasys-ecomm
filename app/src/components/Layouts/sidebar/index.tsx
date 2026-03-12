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

function NestedMenu({
  title,
  children,
  pathname,
  expandedItems,
  toggleExpanded,
  depth,
  toggleSidebar,
  isMobile,
}: {
  title: string;
  children: any[];
  pathname: string;
  expandedItems: string[];
  toggleExpanded: (title: string) => void;
  depth: number;
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
                  pathname={pathname}
                  expandedItems={expandedItems}
                  toggleExpanded={toggleExpanded}
                  depth={depth + 1}
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
                              isActive={item.items.some(
                                (sub: any) => sub.url === pathname || (sub.children && hasActiveUrl(sub.children)),
                              )}
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
