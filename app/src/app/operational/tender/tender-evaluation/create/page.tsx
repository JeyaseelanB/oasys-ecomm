"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EvaluationItem {
  id: number;
  itemName: string;
  quantity: number;
}

const MOCK_ITEMS: EvaluationItem[] = [];

export default function TenderEvaluationCreatePage() {
  const router = useRouter();
  const [tenderRefNumber, setTenderRefNumber] = useState("12345");
  const [tenderName, setTenderName] = useState("Trial Tender");
  const [tenderType, setTenderType] = useState("");
  const [items] = useState<EvaluationItem[]>(MOCK_ITEMS);
  // Controls whether the search fields section is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClear = () => {
    setTenderRefNumber("");
    setTenderName("");
    setTenderType("");
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Tender Evaluation</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Tender Evaluation</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header — click the – / + button to collapse/expand */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tender Evaluation</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">( <span className="text-red-300">*</span> Mandatory Fields)</span>
            <button
              onClick={() => setIsExpanded(prev => !prev)}
              className="flex size-5 items-center justify-center rounded bg-white/20 text-white hover:bg-white/30"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? "−" : "+"}
            </button>
          </div>
        </div>

        {/* Search Fields — only visible when expanded */}
        {isExpanded && (
          <div className="p-5">
            <div className="mb-6 grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
              {/* Tender Reference Number */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">
                  Tender Reference Number
                </label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
                      <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={tenderRefNumber}
                    onChange={e => setTenderRefNumber(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              </div>

              {/* Tender Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">
                  Tender Name
                </label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={tenderName}
                    onChange={e => setTenderName(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              </div>

              {/* Tender Type */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">
                  Tender Type <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
                    </svg>
                  </div>
                  <select
                    value={tenderType}
                    onChange={e => setTenderType(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="open">Open Tender</option>
                    <option value="limited">Limited Tender</option>
                    <option value="single">Single Tender</option>
                    <option value="global">Global Tender</option>
                  </select>
                </div>
              </div>

              {/* Clear + Search buttons */}
              <div className="flex items-end gap-2">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Clear
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Evaluation of Tender Details — always visible */}
        <div className="px-5 pb-5">
          <div className="mb-3 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Evaluation of Tender Details</h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-16 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{item.itemName}</td>
                      <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Buttons */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={() => router.push("/operational/tender/tender-evaluation/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}