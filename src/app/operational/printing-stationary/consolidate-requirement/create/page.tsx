"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface SectionColumn {
  code: string;
  name: string;
}

interface ItemRow {
  id: number;
  itemCodeName: string;
  quantities: Record<string, number>; // keyed by section code
}

// ── Static Options ─────────────────────────────────────────────────────────
const REQUIREMENT_OPTIONS = [
  { value: "", label: "Select" },
  { value: "REQ-2025-001", label: "testRequirementNew2025-26 / REQ-2025-001" },
  { value: "REQ-2025-002", label: "newRequirement2025 / REQ-2025-002" },
  { value: "REQ-2025-003", label: "union / REQ-2025-003" },
  { value: "REQ-2025-004", label: "honest / REQ-2025-004" },
];

const FORWARD_TO_OPTIONS = [
  { value: "", label: "Select" },
  { value: "EMP001", label: "EMP001 / RAJESH KUMAR" },
  { value: "EMP002", label: "EMP002 / SANKARANARAYANAN" },
  { value: "EMP003", label: "EMP003 / MURUGANTHUNAI" },
];

const FORWARD_FOR_OPTIONS = [
  { value: "False", label: "Approve" },
  { value: "True",  label: "Final Approve" },
];

// Simulated search result data
const SEARCH_RESULTS: Record<string, {
  fromDate: string;
  toDate: string;
  dueDate: string;
  totalSections: number;
  submittedSections: number;
  sections: SectionColumn[];
  items: ItemRow[];
}> = {
  "REQ-2025-001": {
    fromDate: "18-Feb-2025",
    toDate: "20-Feb-2025",
    dueDate: "20-Feb-2025",
    totalSections: 44,
    submittedSections: 1,
    sections: [
      { code: "EDP",     name: "EDP" },
      { code: "SALES",   name: "SALES" },
      { code: "MKTG",    name: "MARKETING" },
    ],
    items: [
      { id: 1, itemCodeName: "3771 / XEROX & PRINT",  quantities: { EDP: 1, SALES: 2, MKTG: 0 } },
      { id: 2, itemCodeName: "ORDF / ORDER FORMS",    quantities: { EDP: 1, SALES: 3, MKTG: 1 } },
      { id: 3, itemCodeName: "POU6 / POUCH BROWN 6",  quantities: { EDP: 0, SALES: 1, MKTG: 2 } },
      { id: 4, itemCodeName: "SPRL / SPIRAL BINDING", quantities: { EDP: 2, SALES: 0, MKTG: 1 } },
    ],
  },
  "REQ-2025-002": {
    fromDate: "01-Apr-2025",
    toDate: "30-Jun-2025",
    dueDate: "30-Jun-2025",
    totalSections: 20,
    submittedSections: 3,
    sections: [
      { code: "EDP",   name: "EDP" },
      { code: "ADMIN", name: "ADMIN" },
    ],
    items: [
      { id: 1, itemCodeName: "3001 / Stapler Pin Box Small",   quantities: { EDP: 5, ADMIN: 3 } },
      { id: 2, itemCodeName: "3010 / A4 Paper TNPL 80GSM",    quantities: { EDP: 10, ADMIN: 5 } },
    ],
  },
};

const PAGE_SIZE_OPTIONS = [10, 15, 20];

// ── Icons ──────────────────────────────────────────────────────────────────
const HashIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const ForwardIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15,10 20,15 15,20" />
    <path d="M4 4v7a4 4 0 004 4h12" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────
export default function CreateConsolidateRequirementPage() {
  const router = useRouter();

  // Search form
  const [requirementCode, setRequirementCode] = useState("");

  // Result state
  const [searched, setSearched] = useState(false);
  const [resultData, setResultData] = useState<typeof SEARCH_RESULTS[string] | null>(null);

  // Forward To / For
  const [forwardTo, setForwardTo]   = useState("");
  const [forwardFor, setForwardFor] = useState("False");

  // Note modal
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSearch = () => {
    const data = SEARCH_RESULTS[requirementCode] ?? null;
    setResultData(data);
    setSearched(true);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setRequirementCode("");
    setSearched(false);
    setResultData(null);
    setForwardTo("");
    setForwardFor("False");
    setNoteText("");
  };

  const handleCancel = () => router.push("/operational/printing-stationary/consolidate-requirement/list");
  const handleSubmit = () => router.push("/operational/printing-stationary/consolidate-requirement/list");

  // ── Computed ──────────────────────────────────────────────────────────────
  const totalPages  = Math.max(1, Math.ceil((resultData?.items.length ?? 0) / pageSize));
  const paginated   = resultData?.items.slice((currentPage - 1) * pageSize, currentPage * pageSize) ?? [];
  const notSubmitted = resultData ? resultData.totalSections - resultData.submittedSections : 0;

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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto">

      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Consolidate Requirement
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Consolidate Requirement</li>
          </ol>
        </nav>
      </div>

      {/* ── Search Panel ──────────────────────────────────────────────────── */}
      <div className="mb-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2dc4b2] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Consolidate Requirement</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white opacity-90">( * Mandatory Fields)</span>
            <button className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="p-6">
          <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Requirement Code / Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Requirement Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <HashIcon />
                </span>
                <select
                  className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white dark:bg-gray-dark"
                  value={requirementCode}
                  onChange={(e) => setRequirementCode(e.target.value)}
                >
                  {REQUIREMENT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons col */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Clear
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search
              </button>
            </div>

          </div>

          {/* Dates row — shown after search */}
          {searched && resultData && (
            <>
              <hr className="my-4 border-stroke dark:border-dark-3" />
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Requirement From Date</span>
                  <span className="text-sm font-medium text-[#2dc4b2]">{resultData.fromDate}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Requirement To Date</span>
                  <span className="text-sm font-medium text-[#2dc4b2]">{resultData.toDate}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Due Date</span>
                  <span className="text-sm font-medium text-[#2dc4b2]">{resultData.dueDate}</span>
                </div>
              </div>
            </>
          )}

          {searched && !resultData && (
            <p className="pt-2 text-center text-sm text-gray-400">No records found for the selected requirement.</p>
          )}
        </div>
      </div>

      {/* ── Result Panel ──────────────────────────────────────────────────── */}
      {searched && resultData && (
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="p-6">

            {/* Section Wise Requirement Status */}
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <rect x="1" y="1" width="7" height="7" rx="1" /><rect x="12" y="1" width="7" height="7" rx="1" />
                <rect x="1" y="12" width="7" height="7" rx="1" /><rect x="12" y="12" width="7" height="7" rx="1" />
              </svg>
              Section Wise Requirement Status
            </h4>

            <div className="mb-6 flex items-center divide-x divide-stroke rounded border border-stroke dark:divide-dark-3 dark:border-dark-3">
              {/* Total Sections */}
              <div className="flex flex-1 items-center gap-4 px-6 py-4">
                <svg viewBox="0 0 42 42" className="size-[56px] shrink-0 -rotate-90">
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="5" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2dc4b2" strokeWidth="5"
                    strokeDasharray="25 75" strokeLinecap="butt" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#81e0d8" strokeWidth="5"
                    strokeDasharray="75 25" strokeDashoffset="-25" strokeLinecap="butt" />
                </svg>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-white">{resultData.totalSections}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Number of Sections</p>
                </div>
              </div>
              {/* Submitted */}
              <div className="flex flex-1 items-center gap-4 px-6 py-4">
                <svg className="size-12 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M7 22V11M2 13v7a2 2 0 002 2h11.5a2 2 0 001.97-1.67l1.12-7A2 2 0 0016.6 11H13V6a3 3 0 00-3-3 1 1 0 00-1 1v1.5L7.5 9.5"
                    stroke="#28a745" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="#28a74520"/>
                </svg>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-white">{resultData.submittedSections}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Number of Section Submitted</p>
                </div>
              </div>
              {/* Not Submitted */}
              <div className="flex flex-1 items-center gap-4 px-6 py-4">
                <svg className="size-12 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M17 2v11M22 11V4a2 2 0 00-2-2H8.5a2 2 0 00-1.97 1.67l-1.12 7A2 2 0 007.4 13H11v5a3 3 0 003 3 1 1 0 001-1v-1.5l1.5-3.5"
                    stroke="#dc3545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="#dc354520"/>
                </svg>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-white">{notSubmitted}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Number of Section Not Submitted</p>
                </div>
              </div>
            </div>

            {/* Section Wise Requirement Details heading */}
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <rect x="1" y="1" width="7" height="7" rx="1" /><rect x="12" y="1" width="7" height="7" rx="1" />
                <rect x="1" y="12" width="7" height="7" rx="1" /><rect x="12" y="12" width="7" height="7" rx="1" />
              </svg>
              Section Wise Requirement Details
            </h4>

            {/* Dynamic multi-section table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  {/* Row 1: # | Item Code/Name | Section headers */}
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold" rowSpan={2} style={{ width: "52px" }}>#</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" rowSpan={2}>Item Code / Name</th>
                    {resultData.sections.map((sec) => (
                      <th key={sec.code} className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">
                        {sec.name}
                      </th>
                    ))}
                  </tr>
                  {/* Row 2: Quantity sub-headers */}
                  <tr className="bg-[#2d8f7b] text-white">
                    {resultData.sections.map((sec) => (
                      <th key={sec.code} className="border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">
                        Quantity
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr><td colSpan={2 + resultData.sections.length} className="py-6 text-center text-gray-400">No records found</td></tr>
                  ) : (
                    paginated.map((row, idx) => (
                      <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                        <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">
                          {(currentPage - 1) * pageSize + idx + 1}
                        </td>
                        <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">
                          {row.itemCodeName}
                        </td>
                        {resultData.sections.map((sec) => (
                          <td key={sec.code} className="border-r border-stroke px-3 py-2.5 text-right text-dark last:border-r-0 dark:border-dark-3 dark:text-white">
                            {(row.quantities[sec.code] ?? 0).toFixed(1)}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-end gap-1 pt-4">
              <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">&#171;</button>
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">&#8249;</button>
              {visiblePages().map((page, i) =>
                page === "..." ? <span key={`e-${i}`} className="px-1 text-gray-400">...</span> : (
                  <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{page}</button>
                )
              )}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">&#8250;</button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">&#187;</button>
              <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Forward To / Forward For */}
            <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-dark dark:text-white">
                  Forward To <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <ForwardIcon />
                  </span>
                  <select
                    className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white dark:bg-gray-dark"
                    value={forwardTo}
                    onChange={(e) => setForwardTo(e.target.value)}
                  >
                    {FORWARD_TO_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-dark dark:text-white">
                  Forward For <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <ForwardIcon />
                  </span>
                  <select
                    className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white dark:bg-gray-dark"
                    value={forwardFor}
                    onChange={(e) => setForwardFor(e.target.value)}
                  >
                    {FORWARD_FOR_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
              {/* Create Note — left */}
              <button
                onClick={() => setShowNoteModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="9" y1="13" x2="15" y2="13" /><line x1="12" y1="10" x2="12" y2="16" />
                </svg>
                Create Note
              </button>

              {/* Cancel + Submit — right */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  Submit
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Create Note Modal ─────────────────────────────────────────────── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">

            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#2dc4b2] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <p className="mb-2 text-xs font-medium text-gray-500">Note - 1</p>
              <textarea
                rows={6}
                className="mb-4 w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                placeholder="Enter note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />

              {/* Created By Card */}
              <div className="inline-block rounded border border-stroke px-4 py-3 text-sm dark:border-dark-3">
                <p className="mb-2 font-semibold text-dark dark:text-white">Created By</p>
                <p className="text-gray-600 dark:text-gray-400">Name : <span className="text-dark dark:text-white">SANKARANARAYANAN</span></p>
                <p className="text-gray-600 dark:text-gray-400">Designation : <span className="text-dark dark:text-white">ASSISTANT SALES MAN</span></p>
                <p className="text-gray-600 dark:text-gray-400">Date : <span className="text-dark dark:text-white">11-Mar-2026</span></p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}