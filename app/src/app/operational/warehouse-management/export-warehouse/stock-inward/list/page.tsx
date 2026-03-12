"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─────────────────────────── Types ─────────────────────────── */
type InwardStatus = "SUBMITTED" | "INWARD ACKNOWLEDGED" | "APPROVED";

interface StockInward {
  id: number;
  stockInwardNumber: string;
  senderCodeName: string;
  receiverCodeName: string;
  stockReceivedDate: string;
  status: InwardStatus;
}

/* ─────────────────────────── Sample Data ─────────────────────────── */
const SAMPLE_DATA: StockInward[] = [
  { id: 1, stockInwardNumber: "2024-352531", senderCodeName: "1653 / EXPORT VARIETY", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "12-Jan-2024", status: "SUBMITTED" },
  { id: 2, stockInwardNumber: "2024-352405", senderCodeName: "1650 / TVPM-EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "12-Jan-2024", status: "SUBMITTED" },
  { id: 3, stockInwardNumber: "2024-352401", senderCodeName: "1650 / TVPM-EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "12-Jan-2024", status: "SUBMITTED" },
  { id: 4, stockInwardNumber: "2024-352397", senderCodeName: "1650 / TVPM-EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "12-Jan-2024", status: "SUBMITTED" },
  { id: 5, stockInwardNumber: "2023-311060", senderCodeName: "1633 / HOME TEX - T.NAGAR", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "29-Jul-2023", status: "SUBMITTED" },
  { id: 6, stockInwardNumber: "2023-311059", senderCodeName: "1653 / EXPORT VARIETY", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "29-Jul-2023", status: "SUBMITTED" },
  { id: 7, stockInwardNumber: "2023-303170", senderCodeName: "1652 / READYMADE ORGANIC", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "13-Jun-2023", status: "SUBMITTED" },
  { id: 8, stockInwardNumber: "2023-301523", senderCodeName: "1650 / TVPM-EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "06-Jun-2023", status: "SUBMITTED" },
  { id: 9, stockInwardNumber: "2023-301359", senderCodeName: "1663 / BUTTERFLY - EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "05-Jun-2023", status: "SUBMITTED" },
  { id: 10, stockInwardNumber: "2023-301357", senderCodeName: "1663 / BUTTERFLY - EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "05-Jun-2023", status: "SUBMITTED" },
  { id: 11, stockInwardNumber: "2023-300890", senderCodeName: "1650 / TVPM-EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "02-Jun-2023", status: "SUBMITTED" },
  { id: 12, stockInwardNumber: "2023-300456", senderCodeName: "1653 / EXPORT VARIETY", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "28-May-2023", status: "SUBMITTED" },
  { id: 13, stockInwardNumber: "2023-299120", senderCodeName: "1633 / HOME TEX - T.NAGAR", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "15-May-2023", status: "SUBMITTED" },
  { id: 14, stockInwardNumber: "2023-298765", senderCodeName: "1652 / READYMADE ORGANIC", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "10-May-2023", status: "SUBMITTED" },
  { id: 15, stockInwardNumber: "2023-297890", senderCodeName: "1650 / TVPM-EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "01-May-2023", status: "SUBMITTED" },
  { id: 16, stockInwardNumber: "2023-296543", senderCodeName: "1663 / BUTTERFLY - EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "20-Apr-2023", status: "SUBMITTED" },
  { id: 17, stockInwardNumber: "2023-295210", senderCodeName: "1653 / EXPORT VARIETY", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "10-Apr-2023", status: "SUBMITTED" },
  { id: 18, stockInwardNumber: "2023-294100", senderCodeName: "1650 / TVPM-EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "01-Apr-2023", status: "SUBMITTED" },
  { id: 19, stockInwardNumber: "2023-293050", senderCodeName: "1633 / HOME TEX - T.NAGAR", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "20-Mar-2023", status: "SUBMITTED" },
  { id: 20, stockInwardNumber: "2023-291800", senderCodeName: "1652 / READYMADE ORGANIC", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "10-Mar-2023", status: "SUBMITTED" },
  { id: 21, stockInwardNumber: "2023-290500", senderCodeName: "1663 / BUTTERFLY - EGMORE", receiverCodeName: "2281 / COOPTEX INTERNATIONAL", stockReceivedDate: "01-Mar-2023", status: "SUBMITTED" },
];

/* ─────────────────────────── Status styles ─────────────────────────── */
const STATUS_STYLES: Record<InwardStatus, string> = {
  "SUBMITTED": "bg-[#FFA70B] text-white",
  "INWARD ACKNOWLEDGED": "bg-[#6c757d] text-white",
  "APPROVED": "bg-[#219653] text-white",
};

type SortKey = keyof StockInward;
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ExportWarehouseStockInwardListPage() {
  const [filters, setFilters] = useState({
    stockInwardNumber: "",
    senderCodeName: "",
    receiverCodeName: "",
    stockReceivedDate: "",
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
      row.stockInwardNumber.toLowerCase().includes(filters.stockInwardNumber.toLowerCase()) &&
      row.senderCodeName.toLowerCase().includes(filters.senderCodeName.toLowerCase()) &&
      row.receiverCodeName.toLowerCase().includes(filters.receiverCodeName.toLowerCase()) &&
      (filters.stockReceivedDate === "" || row.stockReceivedDate.toLowerCase().includes(filters.stockReceivedDate.toLowerCase())) &&
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
      <span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
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
    setFilters({ stockInwardNumber: "", senderCodeName: "", receiverCodeName: "", stockReceivedDate: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Stock Inward List - Export Warehouse
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Export Warehouse</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">List Stock Inward - Export Warehouse</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- List Stock Inward - Export Warehouse (s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/operational/warehouse-management/export-warehouse/stock-inward/create">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
                Add
              </button>
            </Link>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              disabled={selectedId === null}
              onClick={() => {
                if (selectedId !== null) {
                  router.push("/operational/warehouse-management/export-warehouse/stock-inward/view");
                }
              }}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
              Delete
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1,4 1,10 7,10" />
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
              </svg>
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
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockInwardNumber")}>
                  Stock Inward Number <SortIcon col="stockInwardNumber" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("senderCodeName")}>
                  Sender Code / Name <SortIcon col="senderCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("receiverCodeName")}>
                  Receiver Code / Name <SortIcon col="receiverCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockReceivedDate")}>
                  Stock Received Date <SortIcon col="stockReceivedDate" />
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
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.stockInwardNumber} onChange={(e) => { setFilters((f) => ({ ...f, stockInwardNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.senderCodeName} onChange={(e) => { setFilters((f) => ({ ...f, senderCodeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.receiverCodeName} onChange={(e) => { setFilters((f) => ({ ...f, receiverCodeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.stockReceivedDate} onChange={(e) => { setFilters((f) => ({ ...f, stockReceivedDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="INWARD ACKNOWLEDGED">INWARD ACKNOWLEDGED</option>
                    <option value="APPROVED">APPROVED</option>
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
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.stockInwardNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.senderCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.receiverCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.stockReceivedDate}</td>
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
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
