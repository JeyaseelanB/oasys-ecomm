import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Width Example",
};

export default function FullwidthExample() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-dark dark:text-white">
          Full Width Page (No Sidebar)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page demonstrates how to hide the sidebar for a specific route.
          The sidebar is automatically hidden using the HideSidebarLayout wrapper.
        </p>
      </div>

      <div className="rounded-lg border border-stroke bg-white p-8 dark:border-dark-3 dark:bg-gray-dark">
        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          How to Use HideSidebarLayout
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-mono text-sm font-semibold text-primary">
              Step 1: Create a layout.tsx file
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 dark:bg-gray-900">
              <code className="text-sm text-gray-800 dark:text-gray-200">
{`// app/pages/mypage/layout.tsx
import { HideSidebarLayout } from "@/components/Layouts/HideSidebarLayout";

export default HideSidebarLayout;`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="mb-2 font-mono text-sm font-semibold text-primary">
              Step 2: Create your page content
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 dark:bg-gray-900">
              <code className="text-sm text-gray-800 dark:text-gray-200">
{`// app/pages/mypage/page.tsx
export default function MyPage() {
  return <div>Full width content here</div>;
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-stroke bg-white p-8 dark:border-dark-3 dark:bg-gray-dark">
          <h3 className="mb-3 text-lg font-bold text-dark dark:text-white">
            With Sidebar (Default)
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Most pages show the sidebar navigation. The ConditionalLayout
            automatically handles this.
          </p>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Route: <code className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-900">/dashboard</code>
          </div>
        </div>

        <div className="rounded-lg border border-stroke bg-white p-8 dark:border-dark-3 dark:bg-gray-dark">
          <h3 className="mb-3 text-lg font-bold text-dark dark:text-white">
            Without Sidebar (This Page)
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Full-width pages can hide the sidebar for more screen space using
            HideSidebarLayout.
          </p>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Route:{" "}
            <code className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-900">
              /pages/fullwidth-example
            </code>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-stroke bg-white p-8 dark:border-dark-3 dark:bg-gray-dark">
        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          Features
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              ✓
            </span>
            <span>Sidebar automatically hides on mount</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              ✓
            </span>
            <span>State is restored when navigating away</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              ✓
            </span>
            <span>Works seamlessly with the sidebar context</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              ✓
            </span>
            <span>Full width available for page content</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
