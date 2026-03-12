"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// In a real app, this data would come from route params / API call
const VIEW_DATA = {
  requirementName: "testRequirementNew2025-26",
  fromDate: "01-Apr-2025",
  toDate: "30-Jun-2025",
  dueDate: "30-Apr-2025",
};

export default function InitiateRequirementRequestViewPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Initiate Requirement Request
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
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Initiate Requirement Request</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2dc4b2] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Initiate Requirement Request</h3>
          <button onClick={() => setIsExpanded((v) => !v)} className="text-white hover:opacity-80">
            {isExpanded ? (
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            ) : (
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </button>
        </div>

        {isExpanded && (
        <>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-stroke dark:border-dark-3">
                <th className="px-5 py-3 text-left text-sm font-medium text-dark dark:text-white">
                  Requirement Name
                </th>
                <th className="px-5 py-3 text-left text-sm font-medium text-dark dark:text-white">
                  Requirement From Date
                </th>
                <th className="px-5 py-3 text-left text-sm font-medium text-dark dark:text-white">
                  Requirement To Date
                </th>
                <th className="px-5 py-3 text-left text-sm font-medium text-dark dark:text-white">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stroke dark:border-dark-3">
                <td className="px-5 py-4">
                  <span className="font-medium text-[#2dc4b2] hover:underline cursor-pointer">
                    {VIEW_DATA.requirementName}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-medium text-[#2dc4b2]">{VIEW_DATA.fromDate}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-medium text-[#2dc4b2]">{VIEW_DATA.toDate}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-medium text-[#2dc4b2]">{VIEW_DATA.dueDate}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 px-5 py-4">
    
          <button
            onClick={() => router.push("/operational/printing-stationary/request/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
