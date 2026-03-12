"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EnrollmentStatus =
  | "SUBMITTED"
  | "CODE ALLOTTED"
  | "DEPARTMENT FINAL APPROVED"
  | "INITIATED"
  | "REJECTED";

interface RequestForEnrollment {
  id: number;
  loomType: string;
  societyName: string;
  societyRegistrationNumber: string;
  societyRegistrationDate: string;
  adhtOfficeCode: string;
  status: EnrollmentStatus;
}

const SAMPLE_DATA: RequestForEnrollment[] = [
  { id: 1, loomType: "POWERLOOM", societyName: "ghjkkk", societyRegistrationNumber: "123", societyRegistrationDate: "24-Feb-2025", adhtOfficeCode: "07 / COIMBATORE", status: "SUBMITTED" },
  { id: 2, loomType: "HANDLOOM", societyName: "muru", societyRegistrationNumber: "4466464", societyRegistrationDate: "21-Feb-2025", adhtOfficeCode: "03 / MADURAI", status: "CODE ALLOTTED" },
  { id: 3, loomType: "HANDLOOM", societyName: "tessfgsg", societyRegistrationNumber: "GSSGGS", societyRegistrationDate: "15-Feb-2025", adhtOfficeCode: "03 / MADURAI", status: "CODE ALLOTTED" },
  { id: 4, loomType: "HANDLOOM", societyName: "ging", societyRegistrationNumber: "757755", societyRegistrationDate: "21-Feb-2025", adhtOfficeCode: "05 / SALEM", status: "CODE ALLOTTED" },
  { id: 5, loomType: "POWERLOOM", societyName: "gingg", societyRegistrationNumber: "4664", societyRegistrationDate: "21-Feb-2025", adhtOfficeCode: "05 / SALEM", status: "CODE ALLOTTED" },
  { id: 6, loomType: "HANDLOOM", societyName: "tedsaddd", societyRegistrationNumber: "757", societyRegistrationDate: "14-Feb-2025", adhtOfficeCode: "05 / SALEM", status: "DEPARTMENT FINAL APPROVED" },
  { id: 7, loomType: "HANDLOOM", societyName: "harshath", societyRegistrationNumber: "23456", societyRegistrationDate: "15-Feb-2025", adhtOfficeCode: "03 / MADURAI", status: "CODE ALLOTTED" },
  { id: 8, loomType: "HANDLOOM", societyName: "New Testing", societyRegistrationNumber: "550550", societyRegistrationDate: "31-Jul-2024", adhtOfficeCode: "01 / KPM", status: "CODE ALLOTTED" },
  { id: 9, loomType: "HANDLOOM", societyName: "Pondy", societyRegistrationNumber: "5757757575", societyRegistrationDate: "13-Feb-2025", adhtOfficeCode: "03 / MADURAI", status: "CODE ALLOTTED" },
  { id: 10, loomType: "HANDLOOM", societyName: "RRRR", societyRegistrationNumber: "235665432", societyRegistrationDate: "14-Feb-2025", adhtOfficeCode: "01 / KPM", status: "CODE ALLOTTED" },
  { id: 11, loomType: "HANDLOOM", societyName: "New Handloom", societyRegistrationNumber: "9287363", societyRegistrationDate: "07-Aug-2024", adhtOfficeCode: "01 / KPM", status: "REJECTED" },
  { id: 12, loomType: "HANDLOOM", societyName: "sivas", societyRegistrationNumber: "14787", societyRegistrationDate: "19-Feb-2025", adhtOfficeCode: "07 / COIMBATORE", status: "INITIATED" },
];

const STATUS_STYLES: Record<EnrollmentStatus, string> = {
  SUBMITTED: "bg-[#FFA70B] text-white",
  "CODE ALLOTTED": "bg-[#219653] text-white",
  "DEPARTMENT FINAL APPROVED": "bg-[#17a2b8] text-white",
  INITIATED: "bg-[#6c757d] text-white",
  REJECTED: "bg-[#dc3545] text-white",
};

type SortKey = keyof RequestForEnrollment;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function RequestForSocietyEnrollmentListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    loomType: "",
    societyName: "",
    societyRegistrationNumber: "",
    societyRegistrationDate: "",
    adhtOfficeCode: "",
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
    row.loomType.toLowerCase().includes(filters.loomType.toLowerCase()) &&
    row.societyName.toLowerCase().includes(filters.societyName.toLowerCase()) &&
    row.societyRegistrationNumber.toLowerCase().includes(filters.societyRegistrationNumber.toLowerCase()) &&
    (filters.societyRegistrationDate === "" || row.societyRegistrationDate.toLowerCase().includes(filters.societyRegistrationDate.toLowerCase())) &&
    row.adhtOfficeCode.toLowerCase().includes(filters.adhtOfficeCode.toLowerCase()) &&
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
    setFilters({ loomType: "", societyName: "", societyRegistrationNumber: "", societyRegistrationDate: "", adhtOfficeCode: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Request for Society Enrollment List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Request for Society Enrollment List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Request for Society Enrollment(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/weavers/society-enrollment/request-for-society-enrollment/add">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Add
              </button>
            </Link>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => selectedId !== null && router.push("/weavers/society-enrollment/request-for-society-enrollment/view")}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              disabled={selectedId === null || !["REJECTED", "INITIATED"].includes(SAMPLE_DATA.find((r) => r.id === selectedId)?.status ?? "")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => {
                const row = SAMPLE_DATA.find((r) => r.id === selectedId);
                if (!row) return;
                if (row.status === "INITIATED") router.push("/weavers/society-enrollment/request-for-society-enrollment/edit-step2");
                else router.push("/weavers/society-enrollment/request-for-society-enrollment/edit");
              }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>
              Delete
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
                {(["loomType", "societyName", "societyRegistrationNumber", "societyRegistrationDate", "adhtOfficeCode", "status"] as SortKey[]).map((col, i) => (
                  <th key={col} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort(col)}>
                    {["Loom Type", "Society Name", "Society Registration Number", "Society Registration Date", "ADHT Office Code / Name", "Status"][i]}
                    <SortIcon col={col} />
                  </th>
                ))}
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.loomType} onChange={(e) => { setFilters((f) => ({ ...f, loomType: e.target.value })); setCurrentPage(1); }} />
                </td>
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
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.adhtOfficeCode} onChange={(e) => { setFilters((f) => ({ ...f, adhtOfficeCode: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="CODE ALLOTTED">CODE ALLOTTED</option>
                    <option value="DEPARTMENT FINAL APPROVED">DEPARTMENT FINAL APPROVED</option>
                    <option value="INITIATED">INITIATED</option>
                    <option value="REJECTED">REJECTED</option>
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
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.loomType}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.societyName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.societyRegistrationNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.societyRegistrationDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.adhtOfficeCode}</td>
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
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
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
