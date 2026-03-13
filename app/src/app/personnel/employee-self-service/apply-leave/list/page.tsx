"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LeaveStatus = "INPROGRESS" | "REJECTED" | "FINAL_APPROVED";

interface LeaveItem {
  id: number;
  referenceNumber: string;
  leaveType: string;
  leaveFromDate: string;
  leaveToDate: string;
  noOfDayRequest: number;
  appliedDate: string;
  status: LeaveStatus;
}

const SAMPLE_DATA: LeaveItem[] = [
  { id: 1, referenceNumber: "LRNov2024275", leaveType: "Casual Leave", leaveFromDate: "14-Nov-2024", leaveToDate: "15-Nov-2024", noOfDayRequest: 2, appliedDate: "22-Nov-2024", status: "INPROGRESS" },
  { id: 2, referenceNumber: "LRAug2024362", leaveType: "Casual Leave", leaveFromDate: "19-Aug-2024", leaveToDate: "20-Aug-2024", noOfDayRequest: 1, appliedDate: "14-Aug-2024", status: "REJECTED" },
  { id: 3, referenceNumber: "LRJul2024972", leaveType: "Medical Leave", leaveFromDate: "05-Aug-2024", leaveToDate: "05-Aug-2024", noOfDayRequest: 0.5, appliedDate: "17-Jul-2024", status: "FINAL_APPROVED" },
  { id: 4, referenceNumber: "LRJul2024653", leaveType: "Medical Leave", leaveFromDate: "03-Aug-2024", leaveToDate: "03-Aug-2024", noOfDayRequest: 0.5, appliedDate: "17-Jul-2024", status: "FINAL_APPROVED" },
  { id: 5, referenceNumber: "LRJul2024110", leaveType: "Medical Leave", leaveFromDate: "02-Aug-2024", leaveToDate: "02-Aug-2024", noOfDayRequest: 0.5, appliedDate: "17-Jul-2024", status: "FINAL_APPROVED" },
  { id: 6, referenceNumber: "LRJul2024718", leaveType: "Medical Leave", leaveFromDate: "01-Aug-2024", leaveToDate: "01-Aug-2024", noOfDayRequest: 1, appliedDate: "17-Jul-2024", status: "FINAL_APPROVED" },
  { id: 7, referenceNumber: "LRJul2024974", leaveType: "Medical Leave", leaveFromDate: "08-Jul-2024", leaveToDate: "10-Jul-2024", noOfDayRequest: 3, appliedDate: "17-Jul-2024", status: "FINAL_APPROVED" },
  { id: 8, referenceNumber: "LRJul2024466", leaveType: "Medical Leave", leaveFromDate: "08-Jul-2024", leaveToDate: "10-Jul-2024", noOfDayRequest: 3, appliedDate: "17-Jul-2024", status: "REJECTED" },
  { id: 9, referenceNumber: "LRJul2024437", leaveType: "Casual Leave", leaveFromDate: "01-Jul-2024", leaveToDate: "03-Jul-2024", noOfDayRequest: 3, appliedDate: "17-Jul-2024", status: "INPROGRESS" },
  { id: 10, referenceNumber: "LRJUL2024781", leaveType: "Medical Leave", leaveFromDate: "11-Jul-2024", leaveToDate: "15-Jul-2024", noOfDayRequest: 5, appliedDate: "11-Jul-2024", status: "INPROGRESS" },
  { id: 11, referenceNumber: "LRJun2024501", leaveType: "Casual Leave", leaveFromDate: "20-Jun-2024", leaveToDate: "21-Jun-2024", noOfDayRequest: 2, appliedDate: "18-Jun-2024", status: "FINAL_APPROVED" },
  { id: 12, referenceNumber: "LRJun2024332", leaveType: "Medical Leave", leaveFromDate: "15-Jun-2024", leaveToDate: "15-Jun-2024", noOfDayRequest: 1, appliedDate: "14-Jun-2024", status: "REJECTED" },
  { id: 13, referenceNumber: "LRMay2024891", leaveType: "Casual Leave", leaveFromDate: "10-May-2024", leaveToDate: "12-May-2024", noOfDayRequest: 3, appliedDate: "08-May-2024", status: "FINAL_APPROVED" },
  { id: 14, referenceNumber: "LRMay2024220", leaveType: "Medical Leave", leaveFromDate: "05-May-2024", leaveToDate: "05-May-2024", noOfDayRequest: 0.5, appliedDate: "03-May-2024", status: "INPROGRESS" },
  { id: 15, referenceNumber: "LRApr2024675", leaveType: "Casual Leave", leaveFromDate: "22-Apr-2024", leaveToDate: "23-Apr-2024", noOfDayRequest: 2, appliedDate: "20-Apr-2024", status: "FINAL_APPROVED" },
  { id: 16, referenceNumber: "LRApr2024110", leaveType: "Medical Leave", leaveFromDate: "15-Apr-2024", leaveToDate: "17-Apr-2024", noOfDayRequest: 3, appliedDate: "14-Apr-2024", status: "REJECTED" },
  { id: 17, referenceNumber: "LRMar2024843", leaveType: "Casual Leave", leaveFromDate: "08-Mar-2024", leaveToDate: "08-Mar-2024", noOfDayRequest: 1, appliedDate: "06-Mar-2024", status: "FINAL_APPROVED" },
  { id: 18, referenceNumber: "LRMar2024556", leaveType: "Medical Leave", leaveFromDate: "01-Mar-2024", leaveToDate: "03-Mar-2024", noOfDayRequest: 3, appliedDate: "28-Feb-2024", status: "INPROGRESS" },
  { id: 19, referenceNumber: "LRFeb2024321", leaveType: "Casual Leave", leaveFromDate: "14-Feb-2024", leaveToDate: "14-Feb-2024", noOfDayRequest: 1, appliedDate: "12-Feb-2024", status: "FINAL_APPROVED" },
  { id: 20, referenceNumber: "LRFeb2024098", leaveType: "Medical Leave", leaveFromDate: "05-Feb-2024", leaveToDate: "07-Feb-2024", noOfDayRequest: 3, appliedDate: "03-Feb-2024", status: "REJECTED" },
  { id: 21, referenceNumber: "LRJan2024445", leaveType: "Casual Leave", leaveFromDate: "22-Jan-2024", leaveToDate: "23-Jan-2024", noOfDayRequest: 2, appliedDate: "20-Jan-2024", status: "FINAL_APPROVED" },
  { id: 22, referenceNumber: "LRJan2024201", leaveType: "Medical Leave", leaveFromDate: "15-Jan-2024", leaveToDate: "15-Jan-2024", noOfDayRequest: 1, appliedDate: "13-Jan-2024", status: "INPROGRESS" },
  { id: 23, referenceNumber: "LRDec2023890", leaveType: "Casual Leave", leaveFromDate: "26-Dec-2023", leaveToDate: "28-Dec-2023", noOfDayRequest: 3, appliedDate: "24-Dec-2023", status: "FINAL_APPROVED" },
  { id: 24, referenceNumber: "LRDec2023654", leaveType: "Medical Leave", leaveFromDate: "18-Dec-2023", leaveToDate: "19-Dec-2023", noOfDayRequest: 2, appliedDate: "16-Dec-2023", status: "REJECTED" },
  { id: 25, referenceNumber: "LRNov2023432", leaveType: "Casual Leave", leaveFromDate: "10-Nov-2023", leaveToDate: "10-Nov-2023", noOfDayRequest: 1, appliedDate: "08-Nov-2023", status: "FINAL_APPROVED" },
  { id: 26, referenceNumber: "LRNov2023218", leaveType: "Medical Leave", leaveFromDate: "03-Nov-2023", leaveToDate: "05-Nov-2023", noOfDayRequest: 3, appliedDate: "01-Nov-2023", status: "INPROGRESS" },
  { id: 27, referenceNumber: "LROct2023776", leaveType: "Casual Leave", leaveFromDate: "20-Oct-2023", leaveToDate: "21-Oct-2023", noOfDayRequest: 2, appliedDate: "18-Oct-2023", status: "FINAL_APPROVED" },
  { id: 28, referenceNumber: "LROct2023543", leaveType: "Medical Leave", leaveFromDate: "12-Oct-2023", leaveToDate: "13-Oct-2023", noOfDayRequest: 2, appliedDate: "10-Oct-2023", status: "REJECTED" },
  { id: 29, referenceNumber: "LRSep2023321", leaveType: "Casual Leave", leaveFromDate: "25-Sep-2023", leaveToDate: "26-Sep-2023", noOfDayRequest: 2, appliedDate: "23-Sep-2023", status: "FINAL_APPROVED" },
  { id: 30, referenceNumber: "LRSep2023109", leaveType: "Medical Leave", leaveFromDate: "15-Sep-2023", leaveToDate: "17-Sep-2023", noOfDayRequest: 3, appliedDate: "13-Sep-2023", status: "INPROGRESS" },
  { id: 31, referenceNumber: "LRAug2023887", leaveType: "Casual Leave", leaveFromDate: "07-Aug-2023", leaveToDate: "08-Aug-2023", noOfDayRequest: 2, appliedDate: "05-Aug-2023", status: "FINAL_APPROVED" },
  { id: 32, referenceNumber: "LRAug2023665", leaveType: "Medical Leave", leaveFromDate: "01-Aug-2023", leaveToDate: "02-Aug-2023", noOfDayRequest: 2, appliedDate: "30-Jul-2023", status: "REJECTED" },
  { id: 33, referenceNumber: "LRJul2023443", leaveType: "Casual Leave", leaveFromDate: "17-Jul-2023", leaveToDate: "18-Jul-2023", noOfDayRequest: 2, appliedDate: "15-Jul-2023", status: "FINAL_APPROVED" },
  { id: 34, referenceNumber: "LRJul2023221", leaveType: "Medical Leave", leaveFromDate: "10-Jul-2023", leaveToDate: "11-Jul-2023", noOfDayRequest: 2, appliedDate: "08-Jul-2023", status: "INPROGRESS" },
  { id: 35, referenceNumber: "LRJun2023998", leaveType: "Casual Leave", leaveFromDate: "26-Jun-2023", leaveToDate: "27-Jun-2023", noOfDayRequest: 2, appliedDate: "24-Jun-2023", status: "FINAL_APPROVED" },
  { id: 36, referenceNumber: "LRJun2023776", leaveType: "Medical Leave", leaveFromDate: "19-Jun-2023", leaveToDate: "20-Jun-2023", noOfDayRequest: 2, appliedDate: "17-Jun-2023", status: "REJECTED" },
  { id: 37, referenceNumber: "LRMay2023554", leaveType: "Casual Leave", leaveFromDate: "08-May-2023", leaveToDate: "09-May-2023", noOfDayRequest: 2, appliedDate: "06-May-2023", status: "FINAL_APPROVED" },
];

const STATUS_STYLES: Record<LeaveStatus, string> = {
  INPROGRESS: "bg-[#c8c8c8] text-dark",
  REJECTED: "bg-[#dc3545] text-white",
  FINAL_APPROVED: "bg-[#28a745] text-white",
};

type SortKey = keyof LeaveItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const CalendarIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function ApplyLeaveListPage() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    referenceNumber: "",
    leaveType: "",
    leaveFromDate: "",
    leaveToDate: "",
    noOfDayRequest: "",
    appliedDate: "",
    status: "",
  });
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

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase()) &&
    (filters.leaveType === "" || row.leaveType === filters.leaveType) &&
    (filters.leaveFromDate === "" || row.leaveFromDate.toLowerCase().includes(filters.leaveFromDate.toLowerCase())) &&
    (filters.leaveToDate === "" || row.leaveToDate.toLowerCase().includes(filters.leaveToDate.toLowerCase())) &&
    (filters.noOfDayRequest === "" || String(row.noOfDayRequest).includes(filters.noOfDayRequest)) &&
    (filters.appliedDate === "" || row.appliedDate.toLowerCase().includes(filters.appliedDate.toLowerCase())) &&
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

  const handleClear = () => {
    setFilters({ referenceNumber: "", leaveType: "", leaveFromDate: "", leaveToDate: "", noOfDayRequest: "", appliedDate: "", status: "" });
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
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          Leave Details List
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Leave Details List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Leave Details(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Apply Leave */}
            <Link
              href="/personnel/employee-self-service/apply-leave/create"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
              </svg>
              Apply Leave
            </Link>
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
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("referenceNumber")}>
                  Reference Number <SortIcon col="referenceNumber" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("leaveType")}>
                  Leave Type <SortIcon col="leaveType" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("leaveFromDate")}>
                  Leave From Date <SortIcon col="leaveFromDate" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("leaveToDate")}>
                  Leave To Date <SortIcon col="leaveToDate" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("noOfDayRequest")}>
                  No of Day Request <SortIcon col="noOfDayRequest" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("appliedDate")}>
                  Applied Date <SortIcon col="appliedDate" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>
                  Status <SortIcon col="status" />
                </th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>

              {/* Filter Row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNumber} onChange={(e) => { setFilters((f) => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.leaveType} onChange={(e) => { setFilters((f) => ({ ...f, leaveType: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Medical Leave">Medical Leave</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="DD-MM-YYYY" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.leaveFromDate} onChange={(e) => { setFilters((f) => ({ ...f, leaveFromDate: e.target.value })); setCurrentPage(1); }} />
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="DD-MM-YYYY" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.leaveToDate} onChange={(e) => { setFilters((f) => ({ ...f, leaveToDate: e.target.value })); setCurrentPage(1); }} />
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.noOfDayRequest} onChange={(e) => { setFilters((f) => ({ ...f, noOfDayRequest: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="DD-MM-YYYY" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.appliedDate} onChange={(e) => { setFilters((f) => ({ ...f, appliedDate: e.target.value })); setCurrentPage(1); }} />
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="INPROGRESS">INPROGRESS</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="FINAL_APPROVED">FINAL_APPROVED</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.referenceNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.leaveType}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.leaveFromDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.leaveToDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.noOfDayRequest}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.appliedDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
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
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
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
