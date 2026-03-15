"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BoardApprovalStatus = "BOARD SUBMITTED" | "BOARD APPROVED";

interface BoardApproval {
  id: number;
  societyName: string;
  societyRegistrationNumber: string;
  societyRegistrationDate: string;
  dateOfVisit: string;
  createdDate: string;
  status: BoardApprovalStatus;
}

const SAMPLE_DATA: BoardApproval[] = [
  {
    id: 1,
    societyName: "Handloom Weavers Co-operative Society",
    societyRegistrationNumber: "HWCS/2023/001",
    societyRegistrationDate: "12-Jan-2023",
    dateOfVisit: "05-Feb-2024",
    createdDate: "06-Feb-2024",
    status: "BOARD APPROVED",
  },
  {
    id: 2,
    societyName: "Royal Silk Artisans Group",
    societyRegistrationNumber: "RSAG/2022/452",
    societyRegistrationDate: "20-Nov-2022",
    dateOfVisit: "10-Mar-2024",
    createdDate: "12-Mar-2024",
    status: "BOARD SUBMITTED",
  },
  {
    id: 3,
    societyName: "Blue Lotus Textile Union",
    societyRegistrationNumber: "BLTU/2021/889",
    societyRegistrationDate: "15-Aug-2021",
    dateOfVisit: "22-Jan-2024",
    createdDate: "25-Jan-2024",
    status: "BOARD APPROVED",
  },
  {
    id: 4,
    societyName: "Golden Thread Weavers",
    societyRegistrationNumber: "GTW/2023/112",
    societyRegistrationDate: "05-May-2023",
    dateOfVisit: "18-Feb-2024",
    createdDate: "20-Feb-2024",
    status: "BOARD SUBMITTED",
  },
  {
    id: 5,
    societyName: "Heritage Cotton Collective",
    societyRegistrationNumber: "HCC/2020/334",
    societyRegistrationDate: "30-Sep-2020",
    dateOfVisit: "14-Apr-2024",
    createdDate: "15-Apr-2024",
    status: "BOARD APPROVED",
  },
  {
    id: 6,
    societyName: "Modern Fabric Hub",
    societyRegistrationNumber: "MFH/2024/005",
    societyRegistrationDate: "01-Feb-2024",
    dateOfVisit: "28-Mar-2024",
    createdDate: "30-Mar-2024",
    status: "BOARD SUBMITTED",
  },
  {
    id: 7,
    societyName: "Pioneer Looms Association",
    societyRegistrationNumber: "PLA/2019/776",
    societyRegistrationDate: "11-Jul-2019",
    dateOfVisit: "03-Jan-2024",
    createdDate: "05-Jan-2024",
    status: "BOARD APPROVED",
  },
  {
    id: 8,
    societyName: "Unity Weaving Society",
    societyRegistrationNumber: "UWS/2022/221",
    societyRegistrationDate: "19-Dec-2022",
    dateOfVisit: "08-May-2024",
    createdDate: "10-May-2024",
    status: "BOARD SUBMITTED",
  },
  {
    id: 9,
    societyName: "Emerald Silk Works",
    societyRegistrationNumber: "ESW/2021/665",
    societyRegistrationDate: "25-Mar-2021",
    dateOfVisit: "12-Feb-2024",
    createdDate: "14-Feb-2024",
    status: "BOARD APPROVED",
  },
  {
    id: 10,
    societyName: "Sunrise Garment Co-op",
    societyRegistrationNumber: "SGC/2023/099",
    societyRegistrationDate: "02-Oct-2023",
    dateOfVisit: "17-Apr-2024",
    createdDate: "18-Apr-2024",
    status: "BOARD SUBMITTED",
  },
  {
    id: 11,
    societyName: "Traditional Ethnic Weaves",
    societyRegistrationNumber: "TEW/2020/554",
    societyRegistrationDate: "14-Jun-2020",
    dateOfVisit: "21-May-2024",
    createdDate: "22-May-2024",
    status: "BOARD APPROVED",
  },
  {
    id: 12,
    societyName: "Coastal Khadi Society",
    societyRegistrationNumber: "CKS/2022/103",
    societyRegistrationDate: "08-Aug-2022",
    dateOfVisit: "15-Jun-2024",
    createdDate: "16-Jun-2024",
    status: "BOARD SUBMITTED",
  },
];

const STATUS_STYLES: Record<BoardApprovalStatus, string> = {
  "BOARD SUBMITTED": "bg-[#FFA70B] text-white",
  "BOARD APPROVED": "bg-[#219653] text-white",
};

type SortKey = keyof BoardApproval;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function BoardApprovalListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    societyName: "",
    societyRegistrationNumber: "",
    societyRegistrationDate: "",
    dateOfVisit: "",
    createdDate: "",
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
    row.societyName.toLowerCase().includes(filters.societyName.toLowerCase()) &&
    row.societyRegistrationNumber.toLowerCase().includes(filters.societyRegistrationNumber.toLowerCase()) &&
    (filters.societyRegistrationDate === "" || row.societyRegistrationDate.toLowerCase().includes(filters.societyRegistrationDate.toLowerCase())) &&
    (filters.dateOfVisit === "" || row.dateOfVisit.toLowerCase().includes(filters.dateOfVisit.toLowerCase())) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const cmp = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
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

  const handleClear = () => {
    setFilters({ societyName: "", societyRegistrationNumber: "", societyRegistrationDate: "", dateOfVisit: "", createdDate: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Board Approval List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Board Approval List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Board Approval(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/weavers/society-enrollment/board-approval/add">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Add
              </button>
            </Link>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => selectedId !== null && router.push("/weavers/society-enrollment/board-approval/view")}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
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
                {(["societyName", "societyRegistrationNumber", "societyRegistrationDate", "dateOfVisit", "createdDate", "status"] as SortKey[]).map((col, i) => (
                  <th key={col} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort(col)}>
                    {["Society Name", "Society Registration Number", "Society Registration Date", "Date of Visit to the Society", "Created Date", "Status"][i]}
                    <SortIcon col={col} />
                  </th>
                ))}
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.societyName} onChange={(e) => { setFilters((f) => ({ ...f, societyName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.societyRegistrationNumber} onChange={(e) => { setFilters((f) => ({ ...f, societyRegistrationNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.societyRegistrationDate} onChange={(e) => { setFilters((f) => ({ ...f, societyRegistrationDate: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.dateOfVisit} onChange={(e) => { setFilters((f) => ({ ...f, dateOfVisit: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="BOARD SUBMITTED">BOARD SUBMITTED</option>
                    <option value="BOARD APPROVED">BOARD APPROVED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.societyName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.societyRegistrationNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.societyRegistrationDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.dateOfVisit}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
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
              page === "..." ? <span key={`e-${i}`} className="px-1 text-gray-400">...</span> : (
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">»</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
