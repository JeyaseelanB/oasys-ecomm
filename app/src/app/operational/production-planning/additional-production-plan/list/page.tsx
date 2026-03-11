"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PlanStatus = "FINAL_APPROVED" | "SUBMITTED";

interface AdditionalPlanItem {
  id: number;
  planCodeName: string;
  planDateFrom: string;
  planDateTo: string;
  dueDate: string;
  status: PlanStatus;
}

const SAMPLE_DATA: AdditionalPlanItem[] = [
  { id: 1, planCodeName: "APP-SEP-25-73 / Prodcution plan", planDateFrom: "01-Sep-2025", planDateTo: "09-Sep-2025", dueDate: "16-Sep-2025", status: "FINAL_APPROVED" },
  { id: 2, planCodeName: "APP-SEP-25-72 / SALO567", planDateFrom: "03-Sep-2025", planDateTo: "30-Sep-2025", dueDate: "30-Sep-2025", status: "FINAL_APPROVED" },
  { id: 3, planCodeName: "APP-SEP-25-71 / dilli123", planDateFrom: "02-Sep-2025", planDateTo: "02-Sep-2025", dueDate: "02-Sep-2025", status: "FINAL_APPROVED" },
  { id: 4, planCodeName: "APP-SEP-25-70 / Test123", planDateFrom: "01-Sep-2025", planDateTo: "30-Sep-2025", dueDate: "30-Sep-2025", status: "FINAL_APPROVED" },
  { id: 5, planCodeName: "APP-AUG-25-69 / dilli", planDateFrom: "25-Aug-2025", planDateTo: "26-Aug-2025", dueDate: "25-Aug-2025", status: "FINAL_APPROVED" },
  { id: 6, planCodeName: "APP-JUN-25-68 / hdgvhcdvhcxzhj", planDateFrom: "11-Jun-2025", planDateTo: "30-Jun-2025", dueDate: "30-Apr-2025", status: "SUBMITTED" },
  { id: 7, planCodeName: "APP-JUN-25-67 / ghghdzshdh", planDateFrom: "11-Jun-2025", planDateTo: "30-Jun-2025", dueDate: "30-Jun-2025", status: "SUBMITTED" },
  { id: 8, planCodeName: "APP-APR-25-66 / 455535335", planDateFrom: "29-Apr-2025", planDateTo: "29-Apr-2025", dueDate: "29-Apr-2025", status: "SUBMITTED" },
  { id: 9, planCodeName: "APP-APR-25-65 / asdhj", planDateFrom: "30-Apr-2025", planDateTo: "30-Apr-2025", dueDate: "30-Apr-2025", status: "SUBMITTED" },
  { id: 10, planCodeName: "APP-APR-25-64 / cdxdfddfd", planDateFrom: "29-Apr-2025", planDateTo: "30-Apr-2025", dueDate: "29-Apr-2025", status: "SUBMITTED" },
];

const STATUS_STYLES: Record<PlanStatus, string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  SUBMITTED: "bg-[#FFA70B] text-white",
};

type SortKey = keyof AdditionalPlanItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function AdditionalProductionPlanListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ planCodeName: "", planDateFrom: "", planDateTo: "", dueDate: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.planCodeName.toLowerCase().includes(filters.planCodeName.toLowerCase()) &&
    (filters.planDateFrom === "" || row.planDateFrom.toLowerCase().includes(filters.planDateFrom.toLowerCase())) &&
    (filters.planDateTo === "" || row.planDateTo.toLowerCase().includes(filters.planDateTo.toLowerCase())) &&
    (filters.dueDate === "" || row.dueDate.toLowerCase().includes(filters.dueDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ planCodeName: "", planDateFrom: "", planDateTo: "", dueDate: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  const basePath = "/operational/production-planning/additional-production-plan";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Additional Production Plan List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Plan</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Additional Production Plan List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">{filtered.length}</span> - Additional Production Plan(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`${basePath}/create`} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
              Add
            </Link>
            <button onClick={() => { if (selectedId) router.push(`${basePath}/edit`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push(`${basePath}/view`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              View
            </button>
            <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              Delete
            </button>
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
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planCodeName")}>Plan Code / Name <SortIcon col="planCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planDateFrom")}>Plan Date - From <SortIcon col="planDateFrom" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planDateTo")}>Plan Date - To <SortIcon col="planDateTo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("dueDate")}>Due Date <SortIcon col="dueDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planCodeName} onChange={(e) => { setFilters((f) => ({ ...f, planCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planDateFrom} onChange={(e) => { setFilters((f) => ({ ...f, planDateFrom: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planDateTo} onChange={(e) => { setFilters((f) => ({ ...f, planDateTo: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.dueDate} onChange={(e) => { setFilters((f) => ({ ...f, dueDate: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="FINAL_APPROVED">FINAL_APPROVED</option><option value="SUBMITTED">SUBMITTED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={7} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 align-middle text-dark dark:border-dark-3 dark:text-white">{row.planCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.planDateFrom}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.planDateTo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.dueDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle dark:border-dark-3"><span className={`inline-flex items-center justify-center rounded px-3 py-1 text-[11px] font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span></td>
                    <td className="px-2 py-3 text-center align-middle"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
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
