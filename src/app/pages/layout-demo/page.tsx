import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layout Demo",
};

export default function LayoutDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-dark dark:text-white">
          Layout with Side Menu
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page demonstrates the conditional layout with sidebar. You can toggle the sidebar visibility using the menu button in the header.
        </p>
      </div>

      <div className="rounded-lg border border-stroke bg-white p-8 dark:border-dark-3 dark:bg-gray-dark">
        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          How the Layout Works
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              •
            </span>
            <span>
              <strong>ConditionalLayout:</strong> Automatically hides sidebar on
              auth pages (/auth/*) and shows it on other pages
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              •
            </span>
            <span>
              <strong>SidebarContext:</strong> Manages sidebar open/closed state
              with a toggle button in the header
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              •
            </span>
            <span>
              <strong>Mobile Responsive:</strong> Sidebar auto-collapses on
              mobile devices
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              •
            </span>
            <span>
              <strong>Header Toggle:</strong> Click the menu icon in the header
              to show/hide the sidebar
            </span>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-stroke bg-white p-8 dark:border-dark-3 dark:bg-gray-dark">
        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          Implementation
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The sidebar layout is setup in the root <code className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-900">
            app/layout.tsx
          </code>
          {" "}using <code className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-900">
            ConditionalLayout
          </code>
          . The sidebar visibility is controlled via the{" "}
          <code className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-900">
            useSidebarContext
          </code>
          {" "}hook.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          To hide the sidebar on a specific page, you can create a custom layout
          for that route or use the context to manage visibility programmatically.
        </p>
      </div>

      <div className="rounded-lg border border-stroke bg-white p-8 dark:border-dark-3 dark:bg-gray-dark">
        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          Example: Custom Page Layouts
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="mb-2 font-semibold text-dark dark:text-white">
              Full Width (No Sidebar)
            </h3>
            <p>
              Auth pages like <code className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-900">
                /auth/sign-in
              </code>
              {" "}automatically hide the sidebar
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-dark dark:text-white">
              With Sidebar (Default)
            </h3>
            <p>
              Regular pages like <code className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-900">
                /dashboard
              </code>
              {" "}show the sidebar that can be toggled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
