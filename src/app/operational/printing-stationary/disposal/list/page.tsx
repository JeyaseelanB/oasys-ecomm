"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface DisposalRecord {
  id: number;
  entityCodeName: string;
  sectionCodeName: string;
  stockReceivedDate: string;
}

// ── Sample Data ────────────────────────────────────────────────────────────
const SAMPLE_DATA: DisposalRecord[] = [
  { id: 1,  entityCodeName: "1114 / MARUTHAM",                      sectionCodeName: "EDP / EDP",                    stockReceivedDate: "15-Jan-2025" },
  { id: 2,  entityCodeName: "ENT002 / Regional Office Coimbatore",   sectionCodeName: "SEC002 / Coimbatore Section",  stockReceivedDate: "18-Jan-2025" },
  { id: 3,  entityCodeName: "ENT003 / Regional Office Salem",        sectionCodeName: "SEC003 / Salem Section",       stockReceivedDate: "20-Jan-2025" },
  { id: 4,  entityCodeName: "ENT004 / Regional Office Madurai",      sectionCodeName: "SEC004 / Madurai Section",     stockReceivedDate: "22-Jan-2025" },
  { id: 5,  entityCodeName: "ENT005 / Regional Office Chennai",      sectionCodeName: "SEC005 / Chennai Section",     stockReceivedDate: "25-Jan-2025" },
  { id: 6,  entityCodeName: "1115 / ANNAMALAI",                      sectionCodeName: "SALES / SALES",                stockReceivedDate: "28-Jan-2025" },
  { id: 7,  entityCodeName: "1116 / KAVERI",                         sectionCodeName: "MKTG / MARKETING",             stockReceivedDate: "01-Feb-2025" },
  { id: 8,  entityCodeName: "ENT006 / Regional Office Trichy",       sectionCodeName: "SEC006 / Trichy Section",      stockReceivedDate: "03-Feb-2025" },
  { id: 9,  entityCodeName: "ENT007 / Regional Office Erode",        sectionCodeName: "SEC007 / Erode Section",       stockReceivedDate: "05-Feb-2025" },
  { id: 10, entityCodeName: "ENT008 / Regional Office Vellore",      sectionCodeName: "SEC008 / Vellore Section",     stockReceivedDate: "07-Feb-2025" },
  { id: 11, entityCodeName: "ENT009 / Regional Office Tirunelveli",  sectionCodeName: "SEC009 / Tirunelveli Section", stockReceivedDate: "10-Feb-2025" },
  { id: 12, entityCodeName: "ENT010 / Regional Office Thanjavur",    sectionCodeName: "SEC010 / Thanjavur Section",   stockReceivedDate: "12-Feb-2025" },
];

const PAGE_SIZE_OPTIONS = [5, 10, 15];

// ── Sort Icon ──────────────────────────────────────────────────────────────
const SortIcon = ({
  col,
  sortCol,
  sortDir,
}: {
  col: string;
  sortCol: string;
  sortDir: "asc" | "desc";
}) => (
  <span className="ml-1 inline-flex flex-col leading-[0]">
    <span className={`text-[9px] ${sortCol === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}`}>▲</span>
    <span className={`text-[9px] ${sortCol === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}`}>▼</span>
  </span>
);

// ── Component ──────────────────────────────────────────────────────────────
export default function PrintingStationaryDisposalListPage() {
  const router = useRouter();

  // Filters
  const [filterEntity,  setFilterEntity]  = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [filterDate,    setFilterDate]    = useState("");

  // Sort
  const [sortCol, setSortCol] = useState("entityCodeName");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Selection
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,    setPageSize]    = useState(10);

  // Delete confirm modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ── Data pipeline ────────────────────────────────────────────────────────
  const filtered = SAMPLE_DATA.filter((r) => {
    return (
      r.entityCodeName.toLowerCase().includes(filterEntity.toLowerCase()) &&
      r.sectionCodeName.toLowerCase().includes(filterSection.toLowerCase()) &&
      r.stockReceivedDate.toLowerCase().includes(filterDate.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortCol as keyof DisposalRecord] as string;
    const bv = b[sortCol as keyof DisposalRecord] as string;
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortCol(col); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilterEntity("");
    setFilterSection("");
    setFilterDate("");
    setSelectedId(null);
    setCurrentPage(1);
    setSortCol("entityCodeName");
    setSortDir("asc");
  };

  const handleDeleteConfirm = () => {
    // TODO: call delete API here
    setShowDeleteModal(false);
    setSelectedId(null);
  };

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

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto">

      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Printing &amp; Stationary Disposal List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Printing &amp; Stationary Disposal List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          {/* Count */}
          <p className="text-sm font-medium text-dark dark:text-white">
            <span className="font-bold">{filtered.length}</span> - Printing &amp; Stationary Disposal (List)
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Add — disabled when any row selected */}
            <button
              disabled={selectedId !== null}
              onClick={() => router.push("/operational/printing-stationary/disposal/add")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Add
            </button>

            {/* View — enabled only when a row is selected
            <button
              disabled={selectedId === null}
              onClick={() => router.push("/operational/printing-stationary/disposal/view")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button> */}

            {/* Delete — enabled only when a row is selected */}
            <button
              disabled={selectedId === null}
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
              Delete
            </button>

            {/* Clear */}
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              {/* Sortable header row */}
              <tr className="bg-[#2d8f7b] text-white">
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold" style={{ width: "52px" }}>
                  #
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-left font-semibold hover:bg-[#267a69]"
                  onClick={() => handleSort("entityCodeName")}
                >
                  Entity Code / Name
                  <SortIcon col="entityCodeName" sortCol={sortCol} sortDir={sortDir} />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-left font-semibold hover:bg-[#267a69]"
                  onClick={() => handleSort("sectionCodeName")}
                >
                  Section Code / Name
                  <SortIcon col="sectionCodeName" sortCol={sortCol} sortDir={sortDir} />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a69]"
                  onClick={() => handleSort("stockReceivedDate")}
                >
                  Stock Received Date
                  <SortIcon col="stockReceivedDate" sortCol={sortCol} sortDir={sortDir} />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" style={{ width: "80px" }}>
                  Select
                </th>
              </tr>

              {/* Filter row */}
              <tr className="bg-[#f0faf9] dark:bg-[#1a2232]">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />

                {/* Entity filter */}
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filterEntity}
                    onChange={(e) => { setFilterEntity(e.target.value); setCurrentPage(1); }}
                    className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                </td>

                {/* Section filter */}
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filterSection}
                    onChange={(e) => { setFilterSection(e.target.value); setCurrentPage(1); }}
                    className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                </td>

                {/* Date filter with teal calendar button */}
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                    <input
                      type="text"
                      placeholder="dd-MMM-yyyy"
                      value={filterDate}
                      onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }}
                      className="flex-1 bg-transparent px-2 py-1 text-xs outline-none dark:text-white"
                    />
                    <button className="shrink-0 bg-[#17a2b8] px-2 text-white hover:opacity-90">
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </button>
                  </div>
                </td>

                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id === selectedId ? null : row.id)}
                    className={`cursor-pointer border-b border-stroke transition-colors dark:border-dark-3
                      ${selectedId === row.id
                        ? "bg-[#e6f7f5] dark:bg-[#1a3a38]"
                        : idx % 2 === 0
                          ? "bg-white hover:bg-[#f5fffe] dark:bg-gray-dark dark:hover:bg-[#1a2a28]"
                          : "bg-[#f9fafb] hover:bg-[#f0faf9] dark:bg-[#1a2232] dark:hover:bg-[#1a2a28]"
                      }`}
                  >
                    <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">
                      {row.entityCodeName}
                    </td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">
                      {row.sectionCodeName}
                    </td>
                    <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.stockReceivedDate}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <input
                        type="radio"
                        name="disposal-select"
                        checked={selectedId === row.id}
                        onChange={() => setSelectedId(row.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="size-4 cursor-pointer accent-[#2dc4b2]"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-end gap-1 px-5 py-4">
          <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
            ({currentPage} of {totalPages})
          </span>
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
                className={`flex size-8 items-center justify-center rounded border text-sm
                  ${currentPage === page
                    ? "border-primary bg-primary text-white"
                    : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}
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
            {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

      </div>

      {/* ── Delete Confirm Modal ─────────────────────────────────────────── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white shadow-2xl dark:bg-gray-dark">

            {/* Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#2dc4b2] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              <p className="text-sm text-dark dark:text-white">
                Are you sure you want to delete this Printing &amp; Stationary Disposal record?
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                No
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Yes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}