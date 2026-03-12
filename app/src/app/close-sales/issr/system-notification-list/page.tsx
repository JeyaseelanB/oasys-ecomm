"use client";

import Link from "next/link";
import { useState } from "react";

type NotifStatus = "Read" | "UnRead";
type SubjectType = "Circular" | "Voucher";

interface NotificationItem {
  id: number;
  employeePFNumberName: string;
  message: string;
  subject: SubjectType;
  createdDate: string;
  status: NotifStatus;
}

const INITIAL_DATA: NotificationItem[] = [
  { id: 1, employeePFNumberName: "3558 / USHA M", message: "Circular Received - CR-2025-30 final approval has been completed", subject: "Circular", createdDate: "20-Feb-2025", status: "Read" },
  { id: 2, employeePFNumberName: "3558 / USHA M", message: "Circular Received - CR-2025-28 final approval has been completed", subject: "Circular", createdDate: "20-Feb-2025", status: "UnRead" },
  { id: 3, employeePFNumberName: "3558 / USHA M", message: "Circular Received - CR-2025-19 final approval has been completed", subject: "Circular", createdDate: "17-Feb-2025", status: "UnRead" },
  { id: 4, employeePFNumberName: "3558 / USHA M", message: "Circular Received - CR-2025-19 final approval has been completed", subject: "Circular", createdDate: "17-Feb-2025", status: "UnRead" },
  { id: 5, employeePFNumberName: "3558 / USHA M", message: "Circular Received - CR-2025-19 final approval has been completed", subject: "Circular", createdDate: "17-Feb-2025", status: "UnRead" },
  { id: 6, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "18-Jul-2023", status: "UnRead" },
  { id: 7, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "18-Jul-2023", status: "UnRead" },
  { id: 8, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "18-Jul-2023", status: "UnRead" },
  { id: 9, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "18-Jul-2023", status: "UnRead" },
  { id: 10, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "17-Jul-2023", status: "UnRead" },
  { id: 11, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "17-Jul-2023", status: "UnRead" },
  { id: 12, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "16-Jul-2023", status: "UnRead" },
  { id: 13, employeePFNumberName: "3558 / USHA M", message: "Circular Received - CR-2023-12 final approval has been completed", subject: "Circular", createdDate: "15-Jul-2023", status: "UnRead" },
  { id: 14, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "14-Jul-2023", status: "UnRead" },
  { id: 15, employeePFNumberName: "3624 / EASWARAN S", message: "Voucher", subject: "Voucher", createdDate: "14-Jul-2023", status: "UnRead" },
];

type SortKey = keyof NotificationItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function SystemNotificationListPage() {
  const [data, setData] = useState<NotificationItem[]>(INITIAL_DATA);
  const [filters, setFilters] = useState({ employeePFNumberName: "", message: "", subject: "" as "" | SubjectType, createdDate: "", status: "" as "" | NotifStatus });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = data.filter((row) =>
    row.employeePFNumberName.toLowerCase().includes(filters.employeePFNumberName.toLowerCase()) &&
    row.message.toLowerCase().includes(filters.message.toLowerCase()) &&
    (filters.subject === "" || row.subject === filters.subject) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
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

  const handleRead = () => {
    if (selectedId === null) return;
    setData((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, status: "Read" as NotifStatus } : item
      )
    );
    setSelectedId(null);
  };

  const handleDelete = () => {
    if (selectedId === null) return;
    setData((prev) => prev.filter((item) => item.id !== selectedId));
    setSelectedId(null);
  };

  const handleClear = () => {
    setFilters({ employeePFNumberName: "", message: "", subject: "", createdDate: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
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

  return (
    <div className="mx-auto">
      {/* Page Title & Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">System Notification List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Notification</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">System Notification List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Top Bar: Count + Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{data.length}</span> - System Notification(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRead}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Read
            </button>
            <button
              onClick={handleDelete}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
              Delete
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
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
              {/* Header Row */}
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("employeePFNumberName")}
                >
                  Employee PF Number / Name <SortIcon col="employeePFNumberName" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("message")}
                >
                  Message <SortIcon col="message" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("subject")}
                >
                  Subject <SortIcon col="subject" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]"
                  onClick={() => handleSort("createdDate")}
                >
                  Created Date <SortIcon col="createdDate" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]"
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
                    value={filters.employeePFNumberName}
                    onChange={(e) => { setFilters((f) => ({ ...f, employeePFNumberName: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.message}
                    onChange={(e) => { setFilters((f) => ({ ...f, message: e.target.value })); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.subject === "" ? "" : filters.subject}
                    onChange={(e) => { setFilters((f) => ({ ...f, subject: e.target.value as "" | SubjectType })); setCurrentPage(1); }}
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
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select
                    className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    value={filters.status}
                    onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value as "" | NotifStatus })); setCurrentPage(1); }}
                  >
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
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">
                      {row.employeePFNumberName}
                    </td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">
                      {row.message}
                    </td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.subject}
                    </td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.createdDate}
                    </td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.status}
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
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
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
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select
              className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white"
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
