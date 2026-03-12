"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Status = "APPROVED" | "PENDING" | "REJECTED";

interface SupplyRateConfirmation {
  id: number;
  confirmationNumber: string;
  societyName: string;
  dpCodeName: string;
  warehouseCodeName: string;
  status: Status;
}

const SAMPLE_DATA: SupplyRateConfirmation[] = [
  { id: 1, confirmationNumber: "SRC-2381-MAR26-001", societyName: "KANCHIPURAM P.W.C.S LTD", dpCodeName: "DP001 / Dhothy Product", warehouseCodeName: "WH01 / Chennai Warehouse", status: "APPROVED" },
  { id: 2, confirmationNumber: "SRC-2381-MAR26-002", societyName: "PALLAKKATTU HANDLOOM WCS", dpCodeName: "DP002 / Silk Saree", warehouseCodeName: "WH02 / Salem Warehouse", status: "PENDING" },
  { id: 3, confirmationNumber: "SRC-2381-DEC24-003", societyName: "KALIKKAVALASU INDUSTRIAL WCS", dpCodeName: "DP003 / Cotton Saree", warehouseCodeName: "WH03 / Madurai Warehouse", status: "REJECTED" },
  { id: 4, confirmationNumber: "SRC-1881-FEB26-004", societyName: "SALEM DIST P.W.C.S LTD", dpCodeName: "DP004 / Fancy Saree", warehouseCodeName: "WH04 / Coimbatore Warehouse", status: "APPROVED" },
  { id: 5, confirmationNumber: "SRC-1881-FEB26-005", societyName: "SALEM DIST P.W.C.S LTD", dpCodeName: "DP005 / Towel Product", warehouseCodeName: "WH04 / Coimbatore Warehouse", status: "PENDING" },
  { id: 6, confirmationNumber: "SRC-3122-JAN26-006", societyName: "ERODE DIST P.W.C.S LTD", dpCodeName: "DP006 / Bed Sheet", warehouseCodeName: "WH05 / Gobichettipalayam Warehouse", status: "APPROVED" },
  { id: 7, confirmationNumber: "SRC-3122-JAN26-007", societyName: "ERODE DIST P.W.C.S LTD", dpCodeName: "DP007 / Dress Material", warehouseCodeName: "WH05 / Gobichettipalayam Warehouse", status: "REJECTED" },
  { id: 8, confirmationNumber: "SRC-2381-DEC25-008", societyName: "ARINGNAR ANNA P.W.C.S LTD", dpCodeName: "DP008 / Silk Dhothy", warehouseCodeName: "WH01 / Chennai Warehouse", status: "APPROVED" },
  { id: 9, confirmationNumber: "SRC-1881-DEC25-009", societyName: "SALEM DIST P.W.C.S LTD", dpCodeName: "DP009 / Cotton Dhothy", warehouseCodeName: "WH02 / Salem Warehouse", status: "PENDING" },
  { id: 10, confirmationNumber: "SRC-3122-NOV25-010", societyName: "ERODE DIST P.W.C.S LTD", dpCodeName: "DP010 / Fancy Dhothy", warehouseCodeName: "WH05 / Gobichettipalayam Warehouse", status: "REJECTED" },
];

const STATUS_STYLES: Record<Status, string> = {
  "PENDING": "bg-[#FFA70B] text-white",
  "REJECTED": "bg-[#6c757d] text-white",
  "APPROVED": "bg-[#219653] text-white",
};

type SortKey = keyof SupplyRateConfirmation;
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function SupplyRateConfirmationListPage() {
  const [filters, setFilters] = useState({
    confirmationNumber: "",
    societyName: "",
    dpCodeName: "",
    warehouseCodeName: "",
    status: "",
  });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) => {
    return (
      row.confirmationNumber.toLowerCase().includes(filters.confirmationNumber.toLowerCase()) &&
      row.societyName.toLowerCase().includes(filters.societyName.toLowerCase()) &&
      row.dpCodeName.toLowerCase().includes(filters.dpCodeName.toLowerCase()) &&
      row.warehouseCodeName.toLowerCase().includes(filters.warehouseCodeName.toLowerCase()) &&
      (filters.status === "" || row.status === filters.status)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>▲</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
    </span>
  );

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  const handleClear = () => {
    setFilters({ confirmationNumber: "", societyName: "", dpCodeName: "", warehouseCodeName: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Retail Sales - Supply Rate Confirmation List - Society
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Supply Rate Confirmation List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Supply Rate Confirmation(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/weavers/supply-rate-confirmation/create">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add
              </button>
            </Link>
            <button
              disabled={selectedId === null}
              onClick={() => { if (selectedId !== null) router.push(`/weavers/supply-rate-confirmation/edit/${selectedId}`); }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              disabled={selectedId === null}
              onClick={() => { if (selectedId !== null) router.push(`/weavers/supply-rate-confirmation/view/${selectedId}`); }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            {/* Delete */}
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
              Delete
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-10 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("confirmationNumber")}>
                  Supply Rate Confirmation Number <SortIcon col="confirmationNumber" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("societyName")}>
                  Society Code / Name <SortIcon col="societyName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("dpCodeName")}>
                  D&amp;P Code / Name <SortIcon col="dpCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("warehouseCodeName")}>
                  Product Warehouse Code / Name <SortIcon col="warehouseCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>
                  Status <SortIcon col="status" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.confirmationNumber} onChange={(e) => { setFilters((f) => ({ ...f, confirmationNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.societyName} onChange={(e) => { setFilters((f) => ({ ...f, societyName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.dpCodeName} onChange={(e) => { setFilters((f) => ({ ...f, dpCodeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.warehouseCodeName} onChange={(e) => { setFilters((f) => ({ ...f, warehouseCodeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.confirmationNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.societyName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.dpCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.warehouseCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">«</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">‹</button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">»</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}