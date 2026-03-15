"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SectionItem {
  id: number;
  itemCodeName: string;
  edpQuantity: number;
}

const VIEW_DATA = {
  requirementCodeName: "IRFeb25115705/union",
  fromDate: "18-Feb-2025",
  toDate: "20-Feb-2025",
  dueDate: "20-Feb-2025",
  totalSections: 44,
  sectionSubmitted: 1,
  sectionNotSubmitted: 43,
};

const SECTION_ITEMS: SectionItem[] = [
  { id: 1, itemCodeName: "3771 / XEROX & PRINT", edpQuantity: 1.0 },
  { id: 2, itemCodeName: "ORDF / ORDER FORMS",   edpQuantity: 1.0 },
];

const NOTE_DATA = {
  note: "ee",
  createdBy: {
    name: "SANKARANARAYANAN",
    designation: "ASSISTANT SALES MAN",
    date: "11-Mar-2026",
  },
};

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function ViewConsolidateRequirementPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const totalPages = Math.max(1, Math.ceil(SECTION_ITEMS.length / pageSize));
  const paginated = SECTION_ITEMS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Consolidate Requirement
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Consolidate Requirement</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2dc4b2] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Consolidate Requirement</h3>
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
        {/* Requirement Code / Name */}
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Requirement Code / Name</p>
          <p className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.requirementCodeName}</p>
        </div>

        {/* Dates Row */}
        <div className="grid grid-cols-3 border-b border-stroke dark:border-dark-3">
          <div className="border-r border-stroke px-6 py-4 dark:border-dark-3">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Requirement From Date</p>
            <p className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.fromDate}</p>
          </div>
          <div className="border-r border-stroke px-6 py-4 dark:border-dark-3">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Requirement To Date</p>
            <p className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.toDate}</p>
          </div>
          <div className="px-6 py-4">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Due Date</p>
            <p className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.dueDate}</p>
          </div>
        </div>

        {/* Section Wise Requirement Status */}
        <div className="border-b border-stroke px-6 py-5 dark:border-dark-3">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <rect x="1" y="1" width="7" height="7" rx="1" /><rect x="12" y="1" width="7" height="7" rx="1" />
              <rect x="1" y="12" width="7" height="7" rx="1" /><rect x="12" y="12" width="7" height="7" rx="1" />
            </svg>
            Section Wise Requirement Status
          </h4>

          <div className="flex items-center divide-x divide-stroke dark:divide-dark-3">
            {/* Total Sections */}
            <div className="flex flex-1 items-center gap-4 pr-10">
              <svg viewBox="0 0 42 42" className="size-[60px] shrink-0 -rotate-90">
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="5" />
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2dc4b2" strokeWidth="5"
                  strokeDasharray="25 75" strokeLinecap="butt" />
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#81e0d8" strokeWidth="5"
                  strokeDasharray="75 25" strokeDashoffset="-25" strokeLinecap="butt" />
              </svg>
              <div>
                <p className="text-[28px] font-bold leading-tight text-dark dark:text-white">{VIEW_DATA.totalSections}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Number of Sections</p>
              </div>
            </div>

            {/* Submitted */}
            <div className="flex flex-1 items-center gap-4 px-10">
              <svg className="size-[52px] shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M7 22V11M2 13v7a2 2 0 002 2h11.5a2 2 0 001.97-1.67l1.12-7A2 2 0 0016.6 11H13V6a3 3 0 00-3-3 1 1 0 00-1 1v1.5L7.5 9.5" stroke="#28a745" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 22V11M2 13v7a2 2 0 002 2h11.5a2 2 0 001.97-1.67l1.12-7A2 2 0 0016.6 11H13V6a3 3 0 00-3-3 1 1 0 00-1 1v1.5L7.5 9.5" fill="#28a745" fillOpacity="0.15"/>
              </svg>
              <div>
                <p className="text-[28px] font-bold leading-tight text-dark dark:text-white">{VIEW_DATA.sectionSubmitted}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Number of Section Submitted</p>
              </div>
            </div>

            {/* Not Submitted */}
            <div className="flex flex-1 items-center gap-4 pl-10">
              <svg className="size-[52px] shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M17 2v11M22 11V4a2 2 0 00-2-2H8.5a2 2 0 00-1.97 1.67l-1.12 7A2 2 0 007.4 13H11v5a3 3 0 003 3 1 1 0 001-1v-1.5l1.5-3.5" stroke="#dc3545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 2v11M22 11V4a2 2 0 00-2-2H8.5a2 2 0 00-1.97 1.67l-1.12 7A2 2 0 007.4 13H11v5a3 3 0 003 3 1 1 0 001-1v-1.5l1.5-3.5" fill="#dc3545" fillOpacity="0.15"/>
              </svg>
              <div>
                <p className="text-[28px] font-bold leading-tight text-dark dark:text-white">{VIEW_DATA.sectionNotSubmitted}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Number of Section Submitted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Wise Requirement Details */}
        <div className="px-5 py-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <rect x="1" y="1" width="7" height="7" rx="1" /><rect x="12" y="1" width="7" height="7" rx="1" />
              <rect x="1" y="12" width="7" height="7" rx="1" /><rect x="12" y="12" width="7" height="7" rx="1" />
            </svg>
            Section Wise Requirement Details
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold" rowSpan={2} style={{ width: "56px" }}>#</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" rowSpan={2}>Item Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold" style={{ width: "160px" }}>EDP</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={3} className="py-8 text-center text-gray-400">No records found</td></tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">
                        {row.itemCodeName}
                      </td>
                      <td className="px-3 py-2.5 text-right text-dark dark:text-white">
                        {row.edpQuantity.toFixed(1)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-end gap-1 pt-4">
            <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-between border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button
            onClick={() => setShowNoteModal(true)}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            View Note
          </button>
          <button
            onClick={() => router.push("/operational/printing-stationary/consolidate-requirement/list")}
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

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">

            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#2dc4b2] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-white hover:opacity-80"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {/* Note Text Area (read-only display) */}
              <div className="mb-4 min-h-[160px] rounded border border-stroke bg-white p-3 text-sm text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                {NOTE_DATA.note}
              </div>

              {/* Created By Card */}
              <div className="inline-block rounded border border-stroke px-4 py-3 text-sm dark:border-dark-3">
                <p className="mb-2 font-semibold text-dark dark:text-white">Created By</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Name : <span className="text-dark dark:text-white">{NOTE_DATA.createdBy.name}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Designation : <span className="text-dark dark:text-white">{NOTE_DATA.createdBy.designation}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Date : <span className="text-dark dark:text-white">{NOTE_DATA.createdBy.date}</span>
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
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

    </div>
  );
}