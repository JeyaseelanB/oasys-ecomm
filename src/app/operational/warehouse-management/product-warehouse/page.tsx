"use client";

import Link from "next/link";

export default function ProductWarehousePage() {
  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Product Warehouse
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/operational/warehouse-management" className="font-medium text-dark hover:text-primary dark:text-gray-400">Warehouse Management</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Product Warehouse</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
