"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SuspensionStatus = "FINAL_APPROVED" | "REJECTED" | "SUBMITTED" | "PENDING";

interface SuspensionDetail {
  id: number;
  employeeName: string;
  extensionReferenceNumber: string;
  extensionFrom: string;
  extensionUpto: string;
  dateOfReinstatement: string;
  status: SuspensionStatus | "";
}

const SAMPLE_DATA: SuspensionDetail[] = [
  { id: 1, employeeName: "ESAKKI E", extensionReferenceNumber: "DACROct202425", extensionFrom: "02-Feb-2024", extensionUpto: "", dateOfReinstatement: "30-Sep-2024", status: "" },
  { id: 2, employeeName: "KARTHIKEYAN R", extensionReferenceNumber: "DACRMar202547", extensionFrom: "13-Mar-2025", extensionUpto: "30-Sep-2025", dateOfReinstatement: "01-Oct-2025", status: "FINAL_APPROVED" },
  { id: 3, employeeName: "VENKATESAN S", extensionReferenceNumber: "RC.NO.A/2024/A3", extensionFrom: "", extensionUpto: "", dateOfReinstatement: "", status: "" },
  { id: 4, employeeName: "JERALD AROKIA S", extensionReferenceNumber: "RC.NO.HUGE STOCK DEFICIT/2021-22/2022/A1", extensionFrom: "", extensionUpto: "", dateOfReinstatement: "", status: "" },
  { id: 5, employeeName: "RADHA C", extensionReferenceNumber: "DACRJul202223", extensionFrom: "11-Jul-2022", extensionUpto: "31-Jul-2022", dateOfReinstatement: "31-Mar-2018", status: "REJECTED" },
  { id: 6, employeeName: "MURUGAN P", extensionReferenceNumber: "DACRJan202301", extensionFrom: "05-Jan-2023", extensionUpto: "31-Mar-2023", dateOfReinstatement: "01-Apr-2023", status: "FINAL_APPROVED" },
  { id: 7, employeeName: "LAKSHMI D", extensionReferenceNumber: "DACRApr202215", extensionFrom: "10-Apr-2022", extensionUpto: "", dateOfReinstatement: "", status: "SUBMITTED" },
  { id: 8, employeeName: "SENTHIL K", extensionReferenceNumber: "RC.NO.B/2023/B7", extensionFrom: "01-Jun-2023", extensionUpto: "30-Jun-2023", dateOfReinstatement: "01-Jul-2023", status: "FINAL_APPROVED" },
  { id: 9, employeeName: "PRIYA M", extensionReferenceNumber: "DACRNov202109", extensionFrom: "20-Nov-2021", extensionUpto: "31-Dec-2021", dateOfReinstatement: "01-Jan-2022", status: "REJECTED" },
  { id: 10, employeeName: "ARJUN S", extensionReferenceNumber: "DACRFeb202410", extensionFrom: "14-Feb-2024", extensionUpto: "30-Apr-2024", dateOfReinstatement: "01-May-2024", status: "PENDING" },
  { id: 11, employeeName: "KAVITHA R", extensionReferenceNumber: "RC.NO.C/2022/C3", extensionFrom: "01-Mar-2022", extensionUpto: "", dateOfReinstatement: "15-Aug-2022", status: "" },
  { id: 12, employeeName: "BALACHANDRAN T", extensionReferenceNumber: "DACROct202312", extensionFrom: "03-Oct-2023", extensionUpto: "31-Dec-2023", dateOfReinstatement: "02-Jan-2024", status: "FINAL_APPROVED" },
  { id: 13, employeeName: "NITHYA V", extensionReferenceNumber: "DACRSep202213", extensionFrom: "15-Sep-2022", extensionUpto: "30-Nov-2022", dateOfReinstatement: "01-Dec-2022", status: "SUBMITTED" },
  { id: 14, employeeName: "RAMESH G", extensionReferenceNumber: "RC.NO.D/2024/D1", extensionFrom: "07-Jul-2024", extensionUpto: "31-Jul-2024", dateOfReinstatement: "01-Aug-2024", status: "PENDING" },
  { id: 15, employeeName: "SUDHA N", extensionReferenceNumber: "DACRAug202415", extensionFrom: "20-Aug-2024", extensionUpto: "", dateOfReinstatement: "", status: "" },
];

const STATUS_STYLES: Record<string, string> = {
  FINAL_APPROVED: "bg-[#219653] text-white",
  REJECTED: "bg-[#dc3545] text-white",
  SUBMITTED: "bg-[#FFA70B] text-white",
  PENDING: "bg-[#6c757d] text-white",
};

type SortKey = keyof SuspensionDetail;
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

export default function SuspensionDetailsListPage() {
  const [filters, setFilters] = useState({
    employeeName: "",
    extensionReferenceNumber: "",
    extensionFrom: "",
    extensionUpto: "",
    dateOfReinstatement: "",
    status: "",
  });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
      row.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
      row.extensionReferenceNumber.toLowerCase().includes(filters.extensionReferenceNumber.toLowerCase()) &&
      (filters.extensionFrom === "" || row.extensionFrom.toLowerCase().includes(filters.extensionFrom.toLowerCase())) &&
      (filters.extensionUpto === "" || row.extensionUpto.toLowerCase().includes(filters.extensionUpto.toLowerCase())) &&
      (filters.dateOfReinstatement === "" || row.dateOfReinstatement.toLowerCase().includes(filters.dateOfReinstatement.toLowerCase())) &&
      (filters.status === "" || row.status === filters.status)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey] ?? "";
    const bVal = b[sortKey] ?? "";
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
    setFilters({ employeeName: "", extensionReferenceNumber: "", extensionFrom: "", extensionUpto: "", dateOfReinstatement: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Suspension Details List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Suspension Details List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Suspension Details (s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              disabled={selectedId === null}
              onClick={() => {
                if (selectedId !== null) {
                  router.push("/personnel/admin/suspension-details/view");
                }
              }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
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
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("employeeName")}
                >
                  Employee Name <SortIcon col="employeeName" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("extensionReferenceNumber")}
                >
                  Extension Reference Number <SortIcon col="extensionReferenceNumber" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("extensionFrom")}
                >
                  Extension From <SortIcon col="extensionFrom" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("extensionUpto")}
                >
                  Extension Upto <SortIcon col="extensionUpto" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("dateOfReinstatement")}
                >
                  Date of Reinstatement <SortIcon col="dateOfReinstatement" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIcon col="status" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.employeeName}
                    onChange={(e) => { setFilters((f) => ({ ...f, employeeName: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.extensionReferenceNumber}
                    onChange={(e) => { setFilters((f) => ({ ...f, extensionReferenceNumber: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.extensionFrom}
                    onChange={(e) => { setFilters((f) => ({ ...f, extensionFrom: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.extensionUpto}
                    onChange={(e) => { setFilters((f) => ({ ...f, extensionUpto: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.dateOfReinstatement}
                    onChange={(e) => { setFilters((f) => ({ ...f, dateOfReinstatement: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    value={filters.status}
                    onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}
                  >
                    <option value="">Select</option>
                    <option value="FINAL_APPROVED">FINAL_APPROVED</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No records found
                  </td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${
                      idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                    } hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">
                      {row.employeeName}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">
                      {row.extensionReferenceNumber}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.extensionFrom || ""}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.extensionUpto || ""}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.dateOfReinstatement || ""}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      {row.status ? (
                        <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${STATUS_STYLES[row.status] ?? ""}`}>
                          {row.status}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 text-center">
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
            >
              «
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              ‹
            </button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-gray-400">...</span>
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
            >
              ›
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              »
            </button>
            <select
              className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            >
              {PAGE_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
