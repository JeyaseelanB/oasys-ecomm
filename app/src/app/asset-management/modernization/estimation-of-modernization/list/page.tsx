"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EstStatus = "SUBMITTED" | "REJECTED" | "FINAL-APPROVED" | "APPROVED" | "PENDING";

interface EstimationItem {
  id: number;
  hoRo: string;
  entityType: string;
  entity: string;
  nameOfBuilding: string;
  createdDate: string;
  status: EstStatus;
}

const SAMPLE_DATA: EstimationItem[] = [
  { id: 1, hoRo: "CHENNAI", entityType: "Collection Office", entity: "Collection Office - Chennai", nameOfBuilding: "Towers",   createdDate: "04-Sep-2018", status: "SUBMITTED" },
  { id: 2, hoRo: "CHENNAI", entityType: "Collection Office", entity: "Collection Office - Chennai", nameOfBuilding: "Co_optex", createdDate: "04-Sep-2018", status: "FINAL-APPROVED" },
  { id: 3, hoRo: "MADURAI", entityType: "Showroom",          entity: "PERIYAKULAM",                nameOfBuilding: "Periyakulam", createdDate: "04-May-2021", status: "REJECTED" },
  { id: 4, hoRo: "COIMBATORE", entityType: "Showroom",       entity: "COIMBATORE MAIN",            nameOfBuilding: "Main Branch", createdDate: "12-Jan-2022", status: "APPROVED" },
  { id: 5, hoRo: "TRICHY",  entityType: "Warehouse",         entity: "TRICHY CENTRAL",             nameOfBuilding: "Warehouse A", createdDate: "20-Mar-2022", status: "PENDING" },
];

type SortKey = keyof EstimationItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_STYLES: Record<EstStatus, string> = {
  REJECTED:          "bg-[#dc3545] text-white",
  "FINAL-APPROVED":  "bg-[#28a745] text-white",
  APPROVED:          "bg-[#17a2b8] text-white",
  SUBMITTED:         "bg-[#FFA70B] text-white",
  PENDING:           "bg-[#6c757d] text-white",
};

export default function EstimationOfModernizationListPage() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    hoRo: "", entityType: "", entity: "", nameOfBuilding: "", createdDate: "", status: "",
  });
  const [sortKey, setSortKey]   = useState<SortKey>("id");
  const [sortDir, setSortDir]   = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.hoRo.toLowerCase().includes(filters.hoRo.toLowerCase()) &&
    row.entityType.toLowerCase().includes(filters.entityType.toLowerCase()) &&
    row.entity.toLowerCase().includes(filters.entity.toLowerCase()) &&
    row.nameOfBuilding.toLowerCase().includes(filters.nameOfBuilding.toLowerCase()) &&
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
    setFilters({ hoRo: "", entityType: "", entity: "", nameOfBuilding: "", createdDate: "", status: "" });
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

  const CalendarIcon = () => (
    <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Estimation of Modernization List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Modernization</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Estimation of Modernization List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Estimation of Modernization(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Edit */}
            <button
              onClick={() => { if (selectedId) router.push("/asset-management/modernization/estimation-of-modernization/edit"); }}
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
              onClick={() => { if (selectedId) router.push("/asset-management/modernization/estimation-of-modernization/view"); }}
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
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
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
                  onClick={() => handleSort("hoRo")}
                >
                  H.O / R.O <SortIcon col="hoRo" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("entityType")}
                >
                  Entity Type <SortIcon col="entityType" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("entity")}
                >
                  Entity <SortIcon col="entity" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("nameOfBuilding")}
                >
                  Name of Building <SortIcon col="nameOfBuilding" />
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
                    value={filters.hoRo}
                    onChange={(e) => { setFilters((f) => ({ ...f, hoRo: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.entityType}
                    onChange={(e) => { setFilters((f) => ({ ...f, entityType: e.target.value })); setCurrentPage(1); }}
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
                    value={filters.nameOfBuilding}
                    onChange={(e) => { setFilters((f) => ({ ...f, nameOfBuilding: e.target.value })); setCurrentPage(1); }}
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
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select
                    className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    value={filters.status}
                    onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}
                  >
                    <option value="">Select</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${
                      idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                    } hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.hoRo}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.entityType}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.entity}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.nameOfBuilding}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="radio"
                        name="selectRow"
                        checked={selectedId === row.id}
                        onChange={() => setSelectedId(row.id)}
                        className="size-4 cursor-pointer accent-primary"
                      />
                    </td>
                  </tr>
                ))
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
