"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RequirementItem {
  id: number;
  itemCodeName: string;
  uom: string;
  quantityRequired: number;
  stockInHand: number;
}

const VIEW_DATA = {
  requirementCodeName: "IRMar25110046 / testRequirementNew2025-26",
  categoryGroupCodeName: "PANDS/Printing and Stationary Items",
  sectionCodeName: "EDP / EDP",
  fromDate: "01-Apr-2025",
  toDate: "30-Jun-2025",
  dueDate: "30-Apr-2025",
};

const ITEMS: RequirementItem[] = [
  { id: 1, itemCodeName: "POU6 / POUCH BROWN 6",         uom: "NOS", quantityRequired: 20,  stockInHand: 0 },
  { id: 2, itemCodeName: "SPRL / SPIRAL BINDING",         uom: "NOS", quantityRequired: 10,  stockInHand: 0 },
  { id: 3, itemCodeName: "3001 / Stapler Pin Box Small",  uom: "NOS", quantityRequired: 20,  stockInHand: 0 },
  { id: 4, itemCodeName: "3002 / Tag Bundle",             uom: "NOS", quantityRequired: 5,   stockInHand: 0 },
  { id: 5, itemCodeName: "3003 / Single Punching Machine",uom: "NOS", quantityRequired: 3,   stockInHand: 0 },
  { id: 6, itemCodeName: "3011 / A4 Folder Thick Spl",   uom: "NOS", quantityRequired: 20,  stockInHand: 0 },
  { id: 7, itemCodeName: "3010 / A4 Paper TNPL 80GSM",   uom: "NOS", quantityRequired: 30,  stockInHand: 0 },
  { id: 8, itemCodeName: "3017 / Permanent Marker",       uom: "NOS", quantityRequired: 10,  stockInHand: 0 },
  { id: 9, itemCodeName: "3026 / ADD Gel Pen (Green)",    uom: "NOS", quantityRequired: 20,  stockInHand: 0 },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function ViewRequirementPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.max(1, Math.ceil(ITEMS.length / pageSize));
  const paginated = ITEMS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalQtyRequired = ITEMS.reduce((sum, i) => sum + i.quantityRequired, 0);
  const totalBalanceQty = ITEMS.reduce((sum, i) => sum + (i.quantityRequired - i.stockInHand), 0);

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
          View Requirement
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Requirement</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2dc4b2] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Requirement</h3>
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
        {/* Section 1: Requirement Code & Category */}
        <div className="grid grid-cols-1 gap-x-6 border-b border-stroke px-6 py-5 dark:border-dark-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Requirement Code / Name</span>
            <span className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.requirementCodeName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Category Group Code / Name</span>
            <span className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.categoryGroupCodeName}</span>
          </div>
        </div>

        {/* Section 2: Section, Dates */}
        <div className="grid grid-cols-1 gap-x-6 border-b border-stroke px-6 py-5 dark:border-dark-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Section Code / Name</span>
            <span className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.sectionCodeName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Requirement From Date</span>
            <span className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.fromDate}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Requirement To Date</span>
            <span className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.toDate}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Due Date</span>
            <span className="text-sm font-medium text-[#2dc4b2]">{VIEW_DATA.dueDate}</span>
          </div>
        </div>

        {/* Item Wise Requirement Details */}
        <div className="px-5 py-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Item Wise Requirement Details
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Item Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Quantity Required</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Stock In Hand</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Balance Quantity Required</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#e8f8f6] dark:bg-[#1a2232]"}`}
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
                    <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">
                      {row.quantityRequired.toFixed(1)}
                    </td>
                    <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">
                      {row.stockInHand.toFixed(1)}
                    </td>
                    <td className="px-3 py-2.5 text-right text-dark dark:text-white">
                      {(row.quantityRequired - row.stockInHand).toFixed(1)}
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-[#f0faf9] dark:bg-[#1a2232]">
                  <td colSpan={3} className="border-r border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                    Total
                  </td>
                  <td className="border-r border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                    {totalQtyRequired.toFixed(1)}
                  </td>
                  <td className="border-r border-t border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                  <td className="border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                    {totalBalanceQty.toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
            <div className="flex items-center gap-1">
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
        </div>

        {/* Back Button */}
        <div className="flex justify-end border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button
            onClick={() => router.push("/operational/printing-stationary/requirement/list")}
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