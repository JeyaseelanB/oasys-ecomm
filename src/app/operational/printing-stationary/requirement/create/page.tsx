"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface RequirementRow {
  id: number;
  itemCodeName: string;
  uom: string;
  requiredQuantity: number;
  stockInHand: number;
}

// ── Static Options ─────────────────────────────────────────────────────────
const REQUEST_OPTIONS = [
  { value: "", label: "Select" },
  { value: "REQ-2025-001", label: "REQ-2025-001 / testRequirementNew2025-26" },
  { value: "REQ-2025-002", label: "REQ-2025-002 / newRequirement2025" },
  { value: "REQ-2025-003", label: "REQ-2025-003 / union" },
  { value: "REQ-2025-004", label: "REQ-2025-004 / honest" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "PANDS", label: "PANDS/Printing and Stationary Items" },
  { value: "OFFICE", label: "OFFICE/Office Supplies" },
  { value: "ELEC", label: "ELEC/Electronics" },
];

// Simulated search result data keyed by request code
const SEARCH_RESULTS: Record<string, {
  sectionCodeName: string;
  fromDate: string;
  toDate: string;
  dueDate: string;
  items: RequirementRow[];
}> = {
  "REQ-2025-001": {
    sectionCodeName: "EDP / EDP",
    fromDate: "01-Apr-2025",
    toDate: "30-Jun-2025",
    dueDate: "30-Apr-2025",
    items: [
      { id: 1, itemCodeName: "POU6 / POUCH BROWN 6",          uom: "NOS", requiredQuantity: 20, stockInHand: 0 },
      { id: 2, itemCodeName: "SPRL / SPIRAL BINDING",          uom: "NOS", requiredQuantity: 10, stockInHand: 0 },
      { id: 3, itemCodeName: "3001 / Stapler Pin Box Small",   uom: "NOS", requiredQuantity: 20, stockInHand: 0 },
      { id: 4, itemCodeName: "3002 / Tag Bundle",              uom: "NOS", requiredQuantity: 5,  stockInHand: 0 },
      { id: 5, itemCodeName: "3003 / Single Punching Machine", uom: "NOS", requiredQuantity: 3,  stockInHand: 0 },
      { id: 6, itemCodeName: "3011 / A4 Folder Thick Spl",    uom: "NOS", requiredQuantity: 20, stockInHand: 0 },
      { id: 7, itemCodeName: "3010 / A4 Paper TNPL 80GSM",    uom: "NOS", requiredQuantity: 30, stockInHand: 0 },
      { id: 8, itemCodeName: "3017 / Permanent Marker",        uom: "NOS", requiredQuantity: 10, stockInHand: 0 },
      { id: 9, itemCodeName: "3026 / ADD Gel Pen (Green)",     uom: "NOS", requiredQuantity: 20, stockInHand: 0 },
    ],
  },
  "REQ-2025-002": {
    sectionCodeName: "SALES / SALES",
    fromDate: "01-Apr-2025",
    toDate: "30-Jun-2025",
    dueDate: "30-Jun-2025",
    items: [
      { id: 1, itemCodeName: "ORDF / ORDER FORMS",    uom: "NOS", requiredQuantity: 50, stockInHand: 5 },
      { id: 2, itemCodeName: "3771 / XEROX & PRINT",  uom: "NOS", requiredQuantity: 30, stockInHand: 0 },
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

const GridIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────
export default function CreateRequirementPage() {
  const router = useRouter();

  // Search form
  const [requestCode, setRequestCode] = useState("");
  const [categoryCode, setCategoryCode] = useState("");

  // Search result panel
  const [searched, setSearched] = useState(false);
  const [resultData, setResultData] = useState<typeof SEARCH_RESULTS[string] | null>(null);
  const [items, setItems] = useState<RequirementRow[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleSearch = () => {
    const data = SEARCH_RESULTS[requestCode] ?? null;
    setResultData(data);
    setItems(data ? data.items.map((i) => ({ ...i })) : []);
    setSearched(true);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setRequestCode("");
    setCategoryCode("");
    setSearched(false);
    setResultData(null);
    setItems([]);
  };

  const handleQtyChange = (id: number, value: string) => {
    setItems((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, requiredQuantity: parseFloat(value) || 0 } : row
      )
    );
  };

  const handleCancel = () => router.push("/operational/printing-stationary/requirement/list");
  const handleSubmit = () => router.push("/operational/printing-stationary/requirement/list");

  // ── Computed ─────────────────────────────────────────────────────────────
  const totalRequired = items.reduce((s, i) => s + i.requiredQuantity, 0);
  const totalBalance = items.reduce((s, i) => s + (i.requiredQuantity - i.stockInHand), 0);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paginated = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
          Create Requirement
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Requirement</li>
          </ol>
        </nav>
      </div>

      {/* ── Search Panel ───────────────────────────────────────────────── */}
      <div className="mb-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2dc4b2] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Requirement</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white opacity-90">( * Mandatory Fields)</span>
            <button className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Form Body */}
        <div className="p-6">
          <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Request Code / Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Request Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <HashIcon />
                </span>
                <select
                  className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white dark:bg-gray-dark"
                  value={requestCode}
                  onChange={(e) => setRequestCode(e.target.value)}
                >
                  {REQUEST_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Group Code / Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Category Group Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <GridIcon />
                </span>
                <select
                  className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white dark:bg-gray-dark"
                  value={categoryCode}
                  onChange={(e) => setCategoryCode(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Search Buttons */}
          <div className="flex justify-end gap-2">
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
      </div>

      {/* ── Result Panel (shown after search) ─────────────────────────── */}
      {searched && (
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="p-6">

            {resultData ? (
              <>
                {/* Section / Dates info row */}
                <div className="mb-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Section Code / Name</span>
                    <span className="text-sm font-medium text-[#2dc4b2]">{resultData.sectionCodeName}</span>
                  </div>
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

                {/* Item Wise Requirement Details heading */}
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                  <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <rect x="1" y="1" width="7" height="7" rx="1" /><rect x="12" y="1" width="7" height="7" rx="1" />
                    <rect x="1" y="12" width="7" height="7" rx="1" /><rect x="12" y="12" width="7" height="7" rx="1" />
                  </svg>
                  Item Wise Requirement Details
                </h4>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#2d8f7b] text-white">
                        <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold" style={{ width: "52px" }}>#</th>
                        <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Item Code / Name</th>
                        <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" style={{ width: "90px" }}>UOM</th>
                        <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" style={{ width: "180px" }}>Quantity Required</th>
                        <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" style={{ width: "160px" }}>Stock In Hand</th>
                        <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" style={{ width: "200px" }}>Balance Quantity Required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((row, idx) => (
                        <tr
                          key={row.id}
                          className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}
                        >
                          <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">
                            {(currentPage - 1) * pageSize + idx + 1}
                          </td>
                          <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">
                            {row.itemCodeName}
                          </td>
                          <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">
                            {row.uom}
                          </td>
                          {/* Editable Quantity Required */}
                          <td className="border-r border-stroke px-2 py-2 dark:border-dark-3">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              className="w-full rounded border border-stroke bg-white px-2 py-1 text-right text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                              value={row.requiredQuantity}
                              onChange={(e) => handleQtyChange(row.id, e.target.value)}
                            />
                          </td>
                          <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">
                            {row.stockInHand.toFixed(1)}
                          </td>
                          <td className="px-3 py-2.5 text-right text-dark dark:text-white">
                            {(row.requiredQuantity - row.stockInHand).toFixed(1)}
                          </td>
                        </tr>
                      ))}

                      {/* Total Row */}
                      <tr className="bg-[#f0faf9] dark:bg-[#1a2232]">
                        <td colSpan={2} className="border-r border-t border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                        <td className="border-r border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                          Total
                        </td>
                        <td className="border-r border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                          {totalRequired.toFixed(1)}
                        </td>
                        <td className="border-r border-t border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                        <td className="border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                          {totalBalance.toFixed(1)}
                        </td>
                      </tr>
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

              </>
            ) : (
              <p className="py-6 text-center text-sm text-gray-400">No records found for the selected criteria.</p>
            )}

            {/* Action Buttons */}
            <div className="mt-5 flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              {resultData && (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  Submit
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}