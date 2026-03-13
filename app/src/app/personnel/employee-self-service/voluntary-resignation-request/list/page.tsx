"use client";

import Link from "next/link";
import { useState } from "react";

type ActionStatus = "Read" | "UnRead";

interface NotificationItem {
  id: number;
  from: string;
  subjectMessage: string;
  date: string;
  action: ActionStatus;
}

const SAMPLE_DATA: NotificationItem[] = [
  { id: 1, from: "", subjectMessage: "PP Permit Request - PP2522120266755 final approval has been completed", date: "13-Mar-2026", action: "UnRead" },
  { id: 2, from: "", subjectMessage: "PP Permit Request - PP2522120266754 final approval has been completed", date: "13-Mar-2026", action: "Read" },
  { id: 3, from: "", subjectMessage: "PP Permit Request - PP2522120266753 final approval has been completed", date: "13-Mar-2026", action: "Read" },
  { id: 4, from: "", subjectMessage: "PP Permit Request - PP2522120266752 final approval has been completed", date: "13-Mar-2026", action: "UnRead" },
  { id: 5, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "27-Feb-2026", action: "Read" },
  { id: 6, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "27-Feb-2026", action: "UnRead" },
  { id: 7, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "25-Sep-2025", action: "Read" },
  { id: 8, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "08-Sep-2025", action: "UnRead" },
  { id: 9, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "05-Sep-2025", action: "UnRead" },
  { id: 10, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "02-Sep-2025", action: "UnRead" },
  { id: 11, from: "", subjectMessage: "Leave Request has been approved", date: "28-Aug-2025", action: "Read" },
  { id: 12, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "25-Aug-2025", action: "UnRead" },
  { id: 13, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "20-Aug-2025", action: "Read" },
  { id: 14, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "15-Aug-2025", action: "UnRead" },
  { id: 15, from: "", subjectMessage: "PP Permit Request - PP2522120266001 final approval has been completed", date: "10-Aug-2025", action: "Read" },
  { id: 16, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "05-Aug-2025", action: "UnRead" },
  { id: 17, from: "", subjectMessage: "Leave Request has been rejected", date: "01-Aug-2025", action: "Read" },
  { id: 18, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "28-Jul-2025", action: "UnRead" },
  { id: 19, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "25-Jul-2025", action: "Read" },
  { id: 20, from: "", subjectMessage: "PP Permit Request - PP2522120265999 final approval has been completed", date: "20-Jul-2025", action: "UnRead" },
  { id: 21, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "15-Jul-2025", action: "Read" },
  { id: 22, from: "", subjectMessage: "Leave Request has been approved", date: "10-Jul-2025", action: "UnRead" },
  { id: 23, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "05-Jul-2025", action: "Read" },
  { id: 24, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "01-Jul-2025", action: "UnRead" },
  { id: 25, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "28-Jun-2025", action: "Read" },
  { id: 26, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "25-Jun-2025", action: "UnRead" },
  { id: 27, from: "", subjectMessage: "PP Permit Request - PP2522120265500 final approval has been completed", date: "20-Jun-2025", action: "Read" },
  { id: 28, from: "", subjectMessage: "Leave Request has been rejected", date: "15-Jun-2025", action: "UnRead" },
  { id: 29, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "10-Jun-2025", action: "Read" },
  { id: 30, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "05-Jun-2025", action: "UnRead" },
  { id: 31, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "01-Jun-2025", action: "Read" },
  { id: 32, from: "", subjectMessage: "Leave Request has been approved", date: "28-May-2025", action: "UnRead" },
  { id: 33, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "25-May-2025", action: "Read" },
  { id: 34, from: "", subjectMessage: "PP Permit Request - PP2522120265200 final approval has been completed", date: "20-May-2025", action: "UnRead" },
  { id: 35, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "15-May-2025", action: "Read" },
  { id: 36, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "10-May-2025", action: "UnRead" },
  { id: 37, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "05-May-2025", action: "Read" },
  { id: 38, from: "", subjectMessage: "Leave Request has been approved", date: "01-May-2025", action: "UnRead" },
  { id: 39, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "28-Apr-2025", action: "Read" },
  { id: 40, from: "", subjectMessage: "PP Permit Request - PP2522120264900 final approval has been completed", date: "25-Apr-2025", action: "UnRead" },
  { id: 41, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "20-Apr-2025", action: "Read" },
  { id: 42, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "15-Apr-2025", action: "UnRead" },
  { id: 43, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "10-Apr-2025", action: "Read" },
  { id: 44, from: "", subjectMessage: "Leave Request has been rejected", date: "05-Apr-2025", action: "UnRead" },
  { id: 45, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "01-Apr-2025", action: "Read" },
  { id: 46, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "28-Mar-2025", action: "UnRead" },
  { id: 47, from: "", subjectMessage: "PP Permit Request - PP2522120264600 final approval has been completed", date: "25-Mar-2025", action: "Read" },
  { id: 48, from: "", subjectMessage: "Leave Request has been approved", date: "20-Mar-2025", action: "UnRead" },
  { id: 49, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "15-Mar-2025", action: "Read" },
  { id: 50, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "10-Mar-2025", action: "UnRead" },
  { id: 51, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "05-Mar-2025", action: "Read" },
  { id: 52, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "01-Mar-2025", action: "UnRead" },
  { id: 53, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "25-Feb-2025", action: "Read" },
  { id: 54, from: "", subjectMessage: "Leave Request has been approved", date: "20-Feb-2025", action: "UnRead" },
  { id: 55, from: "", subjectMessage: "PP Permit Request - PP2522120264300 final approval has been completed", date: "15-Feb-2025", action: "Read" },
  { id: 56, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "10-Feb-2025", action: "UnRead" },
  { id: 57, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "05-Feb-2025", action: "Read" },
  { id: 58, from: "", subjectMessage: "Leave Request has been rejected", date: "01-Feb-2025", action: "UnRead" },
  { id: 59, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "28-Jan-2025", action: "Read" },
  { id: 60, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "25-Jan-2025", action: "UnRead" },
  { id: 61, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "20-Jan-2025", action: "Read" },
  { id: 62, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "15-Jan-2025", action: "UnRead" },
  { id: 63, from: "", subjectMessage: "PP Permit Request - PP2522120264000 final approval has been completed", date: "10-Jan-2025", action: "Read" },
  { id: 64, from: "", subjectMessage: "Leave Request has been approved", date: "05-Jan-2025", action: "UnRead" },
  { id: 65, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "01-Jan-2025", action: "Read" },
  { id: 66, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "28-Dec-2024", action: "UnRead" },
  { id: 67, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "25-Dec-2024", action: "Read" },
  { id: 68, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "20-Dec-2024", action: "UnRead" },
  { id: 69, from: "", subjectMessage: "Leave Request has been approved", date: "15-Dec-2024", action: "Read" },
  { id: 70, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "10-Dec-2024", action: "UnRead" },
  { id: 71, from: "", subjectMessage: "PP Permit Request - PP2522120263700 final approval has been completed", date: "05-Dec-2024", action: "Read" },
  { id: 72, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "01-Dec-2024", action: "UnRead" },
  { id: 73, from: "", subjectMessage: "Leave Request has been rejected", date: "28-Nov-2024", action: "Read" },
  { id: 74, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "25-Nov-2024", action: "UnRead" },
  { id: 75, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "20-Nov-2024", action: "Read" },
  { id: 76, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "15-Nov-2024", action: "UnRead" },
  { id: 77, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "10-Nov-2024", action: "Read" },
  { id: 78, from: "", subjectMessage: "Leave Request has been approved", date: "05-Nov-2024", action: "UnRead" },
  { id: 79, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "01-Nov-2024", action: "Read" },
  { id: 80, from: "", subjectMessage: "PP Permit Request - PP2522120263400 final approval has been completed", date: "28-Oct-2024", action: "UnRead" },
  { id: 81, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "25-Oct-2024", action: "Read" },
  { id: 82, from: "", subjectMessage: "Flag Day Fund Contribution has been approved", date: "20-Oct-2024", action: "UnRead" },
  { id: 83, from: "", subjectMessage: "Insurance Request final approval has been completed", date: "15-Oct-2024", action: "Read" },
  { id: 84, from: "", subjectMessage: "Leave Request has been approved", date: "10-Oct-2024", action: "UnRead" },
  { id: 85, from: "", subjectMessage: "Additional Production Plan has been final approved", date: "05-Oct-2024", action: "Read" },
  { id: 86, from: "", subjectMessage: "Transfer Deputation has been final approved", date: "01-Oct-2024", action: "UnRead" },
  { id: 87, from: "", subjectMessage: "Contract/Export Production Plan has been final approved", date: "28-Sep-2024", action: "Read" },
  { id: 88, from: "", subjectMessage: "Leave Request has been rejected", date: "25-Sep-2024", action: "UnRead" },
  { id: 89, from: "", subjectMessage: "PP Permit Request - PP2522120263100 final approval has been completed", date: "20-Sep-2024", action: "Read" },
  { id: 90, from: "", subjectMessage: "FBF Contribution request has been accepted", date: "15-Sep-2024", action: "UnRead" },
];

type SortKey = "from" | "subjectMessage" | "date" | "action";
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const CalendarIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function VoluntaryResignationRequestListPage() {
  const [filters, setFilters] = useState({
    from: "",
    subjectMessage: "",
    date: "",
    action: "",
  });
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.from.toLowerCase().includes(filters.from.toLowerCase()) &&
    row.subjectMessage.toLowerCase().includes(filters.subjectMessage.toLowerCase()) &&
    (filters.date === "" || row.date.toLowerCase().includes(filters.date.toLowerCase())) &&
    (filters.action === "" || row.action === filters.action)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const c = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? c : -c;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
    </span>
  );

  const handleClear = () => {
    setFilters({ from: "", subjectMessage: "", date: "", action: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  const handleRead = () => {
    if (selectedId !== null) {
      /* handle mark as read */
    }
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      /* handle delete */
    }
  };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5);
      if (currentPage > 5 && currentPage < totalPages - 4) {
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
      if (currentPage <= 5 || currentPage >= totalPages - 4) {
        pages.push("...");
      }
      for (let i = Math.max(totalPages - 4, 6); i <= totalPages; i++) pages.push(i);
    }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          System Notification List
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Notification</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">System Notification List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - System Notification(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Read */}
            <button
              onClick={handleRead}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
              Read
            </button>
            {/* Delete */}
            <button
              onClick={handleDelete}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
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
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("from")}>
                  From <SortIcon col="from" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("subjectMessage")}>
                  Subject / Message <SortIcon col="subjectMessage" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("date")}>
                  Date <SortIcon col="date" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("action")}>
                  Action <SortIcon col="action" />
                </th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>

              {/* Filter Row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.from} onChange={(e) => { setFilters((f) => ({ ...f, from: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.subjectMessage} onChange={(e) => { setFilters((f) => ({ ...f, subjectMessage: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.date} onChange={(e) => { setFilters((f) => ({ ...f, date: e.target.value })); setCurrentPage(1); }} />
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.action} onChange={(e) => { setFilters((f) => ({ ...f, action: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="Read">Read</option>
                    <option value="UnRead">UnRead</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-2 py-3 text-center text-primary dark:border-dark-3">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.from}</td>
                    <td className="border-r border-stroke px-3 py-3 text-primary dark:border-dark-3">{row.subjectMessage}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.date}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.action}</td>
                    <td className="px-2 py-3 text-center">
                      <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
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
    </div>
  );
}
