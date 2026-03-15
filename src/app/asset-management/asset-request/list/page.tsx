"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AssetRequestStatus = "REQUEST_INITIATED" | "FINAL-APPROVED" | "REJECTED";

interface AssetRequestItem {
  id: number;
  referenceNumber: string;
  entity: string;
  quantity: number;
  createdDate: string;
  status: AssetRequestStatus;
}

const SAMPLE_DATA: AssetRequestItem[] = [
  { id: 1, referenceNumber: "AST123496", entity: "CUDDALORE",   quantity: 2,  createdDate: "04-Nov-2024", status: "REQUEST_INITIATED" },
  { id: 2, referenceNumber: "AST123495", entity: "CHENNAI",     quantity: 34, createdDate: "04-Nov-2024", status: "REQUEST_INITIATED" },
  { id: 3, referenceNumber: "AST123494", entity: "CHENNAI",     quantity: 11, createdDate: "04-Nov-2024", status: "REQUEST_INITIATED" },
  { id: 4, referenceNumber: "AST123493", entity: "DWH-VELLORE", quantity: 2,  createdDate: "30-Oct-2024", status: "REQUEST_INITIATED" },
  { id: 5, referenceNumber: "AST123492", entity: "HEAD OFFICE", quantity: 12, createdDate: "02-Apr-2024", status: "REQUEST_INITIATED" },
  { id: 6, referenceNumber: "AST123490", entity: "HEAD OFFICE", quantity: 1,  createdDate: "22-Apr-2021", status: "FINAL-APPROVED"     },
  { id: 7, referenceNumber: "AST123489", entity: "TIRUNELVELI", quantity: 4,  createdDate: "22-Jun-2020", status: "REJECTED"           },
];

const STATUS_STYLES: Record<AssetRequestStatus, string> = {
  "REQUEST_INITIATED": "bg-[#6c757d] text-white",
  "FINAL-APPROVED":    "bg-[#28a745] text-white",
  "REJECTED":          "bg-[#dc3545] text-white",
};

type SortKey = keyof AssetRequestItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function AssetRequestListPage() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    referenceNumber: "", entity: "", quantity: "", createdDate: "", status: "",
  });
  const [sortKey, setSortKey]   = useState<SortKey>("id");
  const [sortDir, setSortDir]   = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem = SAMPLE_DATA.find((r) => r.id === selectedId);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase()) &&
    row.entity.toLowerCase().includes(filters.entity.toLowerCase()) &&
    (filters.quantity === "" || String(row.quantity).includes(filters.quantity)) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const c = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? c : -c;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc"  ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
    </span>
  );

  const handleClear = () => {
    setFilters({ referenceNumber: "", entity: "", quantity: "", createdDate: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

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
          Asset Request List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Asset Request List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Asset Request(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Request Base Allocation – only when FINAL-APPROVED is selected */}
            {selectedItem?.status === "FINAL-APPROVED" && (
              <button
                onClick={() => {/* handle request base allocation */}}
                className="flex items-center gap-1.5 rounded bg-[#5750F1] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                Request Base Allocation
              </button>
            )}
            {/* Add */}
            <button
              onClick={() => router.push("/asset-management/asset-request/create")}
              disabled={selectedId !== null}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add
            </button>
            {/* Edit */}
            <button
              onClick={() => { if (selectedId) router.push("/asset-management/asset-request/create"); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            {/* View */}
            <button
              onClick={() => { if (selectedId) router.push("/asset-management/asset-request/view"); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button>
            {/* Delete */}
            <button
              onClick={() => { if (selectedId) { /* handle delete */ } }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              Delete
            </button>
            {/* Clear */}
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              {/* Column Headers */}
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("referenceNumber")}
                >
                  Reference Number <SortIcon col="referenceNumber" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("entity")}
                >
                  Entity <SortIcon col="entity" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("quantity")}
                >
                  Quantity <SortIcon col="quantity" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("createdDate")}
                >
                  Created Date <SortIcon col="createdDate" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIcon col="status" />
                </th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>

              {/* Filter Row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.referenceNumber}
                    onChange={(e) => { setFilters((f) => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.entity}
                    onChange={(e) => { setFilters((f) => ({ ...f, entity: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.quantity}
                    onChange={(e) => { setFilters((f) => ({ ...f, quantity: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="dd-MMM-yyyy"
                      className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                      value={filters.createdDate}
                      onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }}
                    />
                    <button type="button" className="shrink-0 text-gray-400 hover:text-primary">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select
                    className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    value={filters.status}
                    onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}
                  >
                    <option value="">Select</option>
                    <option value="REQUEST_INITIATED">REQUEST_INITIATED</option>
                    <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSelected = selectedId === row.id;
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-stroke dark:border-dark-3 ${
                        isSelected
                          ? "bg-[#2d8f7b]"
                          : idx % 2 === 0
                          ? "bg-white dark:bg-gray-dark"
                          : "bg-[#f9fafb] dark:bg-[#1a2232]"
                      } hover:bg-[#e6f4f1] dark:hover:bg-[#1e2d42]`}
                    >
                      <td className={`border-r border-stroke px-2 py-3 text-center dark:border-dark-3 ${isSelected ? "text-white" : "text-dark dark:text-white"}`}>
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-white" : "text-dark dark:text-white"}`}>
                        {row.referenceNumber}
                      </td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-white" : "text-dark dark:text-white"}`}>
                        {row.entity}
                      </td>
                      <td className={`border-r border-stroke px-3 py-3 text-center dark:border-dark-3 ${isSelected ? "text-white" : "text-dark dark:text-white"}`}>
                        {row.quantity}
                      </td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-white" : "text-dark dark:text-white"}`}>
                        {row.createdDate}
                      </td>
                      <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                        <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-2 py-3 text-center">
                        <input
                          type="radio"
                          name="selectRow"
                          checked={isSelected}
                          onChange={() => setSelectedId(row.id)}
                          className="size-4 cursor-pointer accent-primary"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({currentPage} of {totalPages})
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >&#171;</button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >&#8249;</button>

            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`flex size-8 items-center justify-center rounded border text-sm ${
                    currentPage === page
                      ? "border-primary bg-primary text-white"
                      : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >&#8250;</button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >&#187;</button>

            <select
              className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            >
              {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
