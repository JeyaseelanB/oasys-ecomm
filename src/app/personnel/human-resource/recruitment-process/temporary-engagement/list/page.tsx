"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EngagementStatus = "INPROGRESS" | "APPROVED" | "FINAL_APPROVED";

interface TemporaryEngagementItem {
  id: number;
  referenceNumber: string;
  region: string;
  department: string;
  selectionYear: string;
  createdDate: string;
  status: EngagementStatus;
}

const SAMPLE_DATA: TemporaryEngagementItem[] = [
  { id: 1, referenceNumber: "FEB202547", region: "CHENNAI", department: "MARKETING", selectionYear: "2025", createdDate: "07-Feb-2025", status: "INPROGRESS" },
  { id: 2, referenceNumber: "FEB202546", region: "HEAD OFFICE", department: "ADMIN", selectionYear: "2025", createdDate: "07-Feb-2025", status: "FINAL_APPROVED" },
  { id: 3, referenceNumber: "JUL202445", region: "CHENNAI", department: "ADMIN", selectionYear: "2024", createdDate: "24-Jul-2024", status: "FINAL_APPROVED" },
  { id: 4, referenceNumber: "JAN202344", region: "SALEM", department: "MARKETING", selectionYear: "2023", createdDate: "06-Jan-2023", status: "INPROGRESS" },
  { id: 5, referenceNumber: "JUL202242", region: "CHENNAI", department: "MARKETING", selectionYear: "2022", createdDate: "29-Jul-2022", status: "INPROGRESS" },
  { id: 6, referenceNumber: "JUL202241", region: "CHENNAI", department: "ADMIN", selectionYear: "2025", createdDate: "18-Jul-2022", status: "INPROGRESS" },
  { id: 7, referenceNumber: "JUL202235", region: "COIMBATORE", department: "MARKETING", selectionYear: "2023", createdDate: "18-Jul-2022", status: "INPROGRESS" },
  { id: 8, referenceNumber: "OCT201832", region: "CHENNAI", department: "ADMIN", selectionYear: "2018", createdDate: "03-Oct-2018", status: "APPROVED" },
  { id: 9, referenceNumber: "SEP201831", region: "CHENNAI", department: "ADMIN", selectionYear: "2018", createdDate: "18-Sep-2018", status: "APPROVED" },
  { id: 10, referenceNumber: "SEP201830", region: "CHENNAI", department: "ADMIN", selectionYear: "2018", createdDate: "12-Sep-2018", status: "APPROVED" },
  { id: 11, referenceNumber: "AUG201829", region: "CHENNAI", department: "MARKETING", selectionYear: "2018", createdDate: "15-Aug-2018", status: "APPROVED" },
  { id: 12, referenceNumber: "JUL201828", region: "SALEM", department: "ADMIN", selectionYear: "2018", createdDate: "20-Jul-2018", status: "APPROVED" },
];

type SortKey = keyof TemporaryEngagementItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_COLORS: Record<EngagementStatus, string> = {
  INPROGRESS: "#FFA70B",
  APPROVED: "#28a745",
  FINAL_APPROVED: "#17a2b8",
};

export default function TemporaryEngagementListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ referenceNumber: "", region: "", department: "", selectionYear: "", createdDate: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase()) &&
    (filters.region === "" || row.region === filters.region) &&
    (filters.department === "" || row.department === filters.department) &&
    (filters.selectionYear === "" || row.selectionYear === filters.selectionYear) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ referenceNumber: "", region: "", department: "", selectionYear: "", createdDate: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const uniqueRegion = [...new Set(SAMPLE_DATA.map((r) => r.region))];
  const uniqueDepartment = [...new Set(SAMPLE_DATA.map((r) => r.department))];
  const uniqueSelectionYear = [...new Set(SAMPLE_DATA.map((r) => r.selectionYear))];

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Temporary Engagement List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Recruitment Process</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Temporary Engagement List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">{filtered.length}</span> - Temporary Engagement(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            {selectedId === null && (
              <Link href="/personnel/human-resource/recruitment-process/temporary-engagement/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                Add
              </Link>
            )}
            {selectedId !== null && (() => {
              const selectedRow = SAMPLE_DATA.find((r) => r.id === selectedId);
              const isInProgress = selectedRow?.status === "INPROGRESS";
              return (
                <>
                  <button onClick={() => router.push("/personnel/human-resource/recruitment-process/temporary-engagement/view")} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                    View
                  </button>
                  {isInProgress && (
                    <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      Delete
                    </button>
                  )}
                </>
              );
            })()}
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("referenceNumber")}>Reference Number <SortIcon col="referenceNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("region")}>Region <SortIcon col="region" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("department")}>Department <SortIcon col="department" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("selectionYear")}>Selection Year</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNumber} onChange={(e) => { setFilters((f) => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.region} onChange={(e) => { setFilters((f) => ({ ...f, region: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueRegion.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.department} onChange={(e) => { setFilters((f) => ({ ...f, department: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueDepartment.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.selectionYear} onChange={(e) => { setFilters((f) => ({ ...f, selectionYear: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueSelectionYear.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="INPROGRESS">INPROGRESS</option><option value="APPROVED">APPROVED</option><option value="FINAL_APPROVED">FINAL_APPROVED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={8} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#2d8f7b] text-white" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} ${selectedId !== row.id ? "hover:bg-blue-50 dark:hover:bg-[#1e2d42]" : ""}`}>
                    <td className={`border-r px-2 py-3 text-center ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className={`border-r px-2 py-3 ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.referenceNumber}</td>
                    <td className={`border-r px-2 py-3 ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.region}</td>
                    <td className={`border-r px-2 py-3 ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.department}</td>
                    <td className={`border-r px-2 py-3 text-center ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.selectionYear}</td>
                    <td className={`border-r px-2 py-3 text-center ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.createdDate}</td>
                    <td className={`border-r px-2 py-3 text-center ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3"}`}><span className="inline-block rounded-sm px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: STATUS_COLORS[row.status] }}>{row.status}</span></td>
                    <td className="px-2 py-3 text-center"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) => page === "..." ? (<span key={`e-${i}`} className="px-1 text-gray-400">...</span>) : (<button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>{PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
          </div>
        </div>
      </div>
    </div>
  );
}
