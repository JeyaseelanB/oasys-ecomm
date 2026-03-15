"use client";

import Link from "next/link";
import { useState } from "react";

export default function InventoryClosingPage() {
  const today = new Date();
  const formatDate = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}-${d.toLocaleString("en-GB", { month: "short" })}-${d.getFullYear()}`;

  const [fromDate, setFromDate] = useState(formatDate(today));
  const [toDate, setToDate] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setResult(null);
  };

  const handleVerifyStock = () => {
    if (!fromDate || !toDate) return;
    setVerifying(true);
    setResult(null);
    // Simulate async verification
    setTimeout(() => {
      setVerifying(false);
      setResult({ success: true, message: "Stock verified successfully for the selected date range." });
    }, 1200);
  };

  return (
    <div className="mx-auto">
      {/* Page header & breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Inventory Closing
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Inventory Closing</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Inventory Closing</h3>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex size-6 items-center justify-center rounded text-white hover:opacity-80"
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            ) : (
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </button>
        </div>

        {!collapsed && (
          <div className="p-5">
            {/* Date fields */}
            <div className="flex flex-wrap items-end gap-4">
              {/* From Date */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  From Date <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-44 rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* To Date */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  To Date <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-44 rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Clear
                </button>
                <button
                  onClick={handleVerifyStock}
                  disabled={!fromDate || !toDate || verifying}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {verifying ? (
                    <>
                      <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <polyline points="23,4 23,10 17,10" />
                        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      Verify Stock
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result message */}
            {result && (
              <div className={`mt-5 flex items-center gap-2 rounded px-4 py-3 text-sm font-medium ${result.success ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}>
                {result.success ? (
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22,4 12,14.01 9,11.01" />
                  </svg>
                ) : (
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                )}
                {result.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
