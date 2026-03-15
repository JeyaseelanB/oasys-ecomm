"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AwardingItem {
  id: number;
  itemName: string;
  supplierName: string;
  finalisedAmount: number;
}

const MOCK_AWARDING_ITEMS: AwardingItem[] = [];

export default function ViewTenderAwardingPage() {
  const router = useRouter();
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [showViewNote, setShowViewNote] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [activeCommentTab, setActiveCommentTab] = useState<"approve" | "reject">("approve");

  return (
    <div className="mx-auto">
      {/* View Note Modal */}
      {showViewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="min-h-[180px] p-5">
              {/* Note content would render here */}
            </div>
            <div className="flex justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowViewNote(false)}
                className="flex items-center gap-1.5 rounded border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowComments(false)} className="text-white hover:opacity-80">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-stroke dark:border-dark-3">
              <div className="flex">
                <button
                  onClick={() => setActiveCommentTab("approve")}
                  className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-colors ${
                    activeCommentTab === "approve"
                      ? "border-b-2 border-[#17a2b8] text-[#17a2b8]"
                      : "text-gray-500 hover:text-dark dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                  </svg>
                  Approve
                </button>
                <button
                  onClick={() => setActiveCommentTab("reject")}
                  className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-colors ${
                    activeCommentTab === "reject"
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-gray-500 hover:text-dark dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
                    <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
                  </svg>
                  Reject
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[120px] p-5">
              {activeCommentTab === "approve" ? (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                    Approval Comments
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter approval comments..."
                    className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-[#17a2b8] dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                    Rejection Reason
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter rejection reason..."
                    className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-red-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowComments(false)}
                className="flex items-center gap-1.5 rounded border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                Cancel
              </button>
              <button
                className={`flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white hover:opacity-90 ${
                  activeCommentTab === "approve" ? "bg-[#28a745]" : "bg-red-500"
                }`}
              >
                {activeCommentTab === "approve" ? (
                  <>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Approve
                  </>
                ) : (
                  <>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Reject
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Tender</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Tender</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tender</h3>
          <button
            onClick={() => setHeaderExpanded(!headerExpanded)}
            className="text-white hover:opacity-80"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {headerExpanded ? (
                <line x1="5" y1="12" x2="19" y2="12" />
              ) : (
                <>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div className="p-5">
          {/* Collapsible Tender Info */}
          {headerExpanded && (
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Tender Reference Number</p>
                <p className="text-sm font-medium text-[#17a2b8]"></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Type</p>
                <p className="text-sm font-medium text-[#17a2b8]"></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Category</p>
                <p className="text-sm font-medium text-[#17a2b8]"></p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tender Name</p>
                <p className="text-sm font-medium text-[#17a2b8]"></p>
              </div>
            </div>
          )}

          {/* View Tender Awarding Section */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">View Tender Awarding</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Supplier Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Finalised Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_AWARDING_ITEMS.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="border border-stroke px-3 py-4 text-center text-sm text-gray-500 dark:border-dark-3">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    MOCK_AWARDING_ITEMS.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.itemName}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.supplierName}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.finalisedAmount.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowViewNote(true)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
                View Note
              </button>
              <button
                onClick={() => setShowComments(true)}
                className="flex items-center justify-center rounded bg-[#17a2b8] p-2 text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </button>
            </div>
            <button
              onClick={() => router.push("/operational/tender/tender-awarding/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12,19 5,12 12,5" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
