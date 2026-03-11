"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PlanStatus = "APPROVED" | "SUBMITTED" | "REJECTED" | "INITIATED";

interface DnpPlanItem {
  id: number;
  planCode: string;
  planDateFrom: string;
  planDateTo: string;
  dnpOfficeCode: string;
  status: PlanStatus;
}

const SAMPLE_DATA: DnpPlanItem[] = [
  { id: 1,  planCode: "RPPY1818-3 / Test_Plan_03",       planDateFrom: "01-Jul-2018", planDateTo: "30-Sep-2018", dnpOfficeCode: "2107 / D&P OFFICE KANCHIPURAM", status: "REJECTED"  },
  { id: 2,  planCode: "RPPY1818-4 / Test_Plan_04",       planDateFrom: "01-Aug-2018", planDateTo: "31-Oct-2018", dnpOfficeCode: "2107 / D&P OFFICE KANCHIPURAM", status: "APPROVED"  },
  { id: 3,  planCode: "RPPY1818-5 / Test_Plan_05",       planDateFrom: "01-Sep-2018", planDateTo: "30-Nov-2018", dnpOfficeCode: "1806 / D&P OFFICE SALEM",       status: "SUBMITTED" },
  { id: 4,  planCode: "RPPY1919-1 / Retail_Plan_2019",   planDateFrom: "01-Jan-2019", planDateTo: "31-Mar-2019", dnpOfficeCode: "1301 / D&P OFFICE ERODE",       status: "APPROVED"  },
  { id: 5,  planCode: "RPPY1919-2 / Retail_Plan_2019_Q2", planDateFrom: "01-Apr-2019", planDateTo: "30-Jun-2019", dnpOfficeCode: "1806 / D&P OFFICE SALEM",      status: "INITIATED" },
];

type SortKey = keyof DnpPlanItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_STYLE: Record<PlanStatus, string> = {
  APPROVED:  "bg-[#28a745]",
  SUBMITTED: "bg-[#FFA70B]",
  REJECTED:  "bg-red-500",
  INITIATED: "bg-[#17a2b8]",
};

export default function DnpProcurementPlanListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ planCode: "", planDateFrom: "", planDateTo: "", dnpOfficeCode: "", status: "" });
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
    row.planCode.toLowerCase().includes(filters.planCode.toLowerCase()) &&
    row.planDateFrom.toLowerCase().includes(filters.planDateFrom.toLowerCase()) &&
    row.planDateTo.toLowerCase().includes(filters.planDateTo.toLowerCase()) &&
    row.dnpOfficeCode.toLowerCase().includes(filters.dnpOfficeCode.toLowerCase()) &&
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
    setFilters({ planCode: "", planDateFrom: "", planDateTo: "", dnpOfficeCode: "", status: "" });
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

  const CalIcon = () => (
    <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – D&P Office Wise Procurement Plan List - HO</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">D&P Office Wise Procurement Plan List - HO</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - D &amp; P Plan (s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/operational/procurement/retail-procurement/dnp-procurement-plan/create"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </Link>
            <button onClick={() => { if (selectedId) router.push("/operational/procurement/retail-procurement/dnp-procurement-plan/edit"); }} disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push("/operational/procurement/retail-procurement/dnp-procurement-plan/view"); }} disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled={selectedId === null} onClick={() => { if (selectedId) setSelectedId(null); }}
              className="flex items-center gap-1.5 rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Delete
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 003.2 7.2M2 12.5a10 10 0 0018.8 4.2"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planCode")}>Plan Code / Name <SortIcon col="planCode" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planDateFrom")}>Plan Date - From <SortIcon col="planDateFrom" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planDateTo")}>Plan Date - To <SortIcon col="planDateTo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("dnpOfficeCode")}>D &amp; P Office Code / Name <SortIcon col="dnpOfficeCode" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planCode} onChange={(e) => { setFilters((f) => ({ ...f, planCode: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planDateFrom} onChange={(e) => { setFilters((f) => ({ ...f, planDateFrom: e.target.value })); setCurrentPage(1); }} />
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-r bg-[#17a2b8]"><CalIcon /></span>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planDateTo} onChange={(e) => { setFilters((f) => ({ ...f, planDateTo: e.target.value })); setCurrentPage(1); }} />
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-r bg-[#17a2b8]"><CalIcon /></span>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.dnpOfficeCode} onChange={(e) => { setFilters((f) => ({ ...f, dnpOfficeCode: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="INITIATED">INITIATED</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} onClick={() => setSelectedId(row.id)}
                    className={`cursor-pointer border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#e8f4f8] dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.planCode}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.planDateFrom}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.planDateTo}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.dnpOfficeCode}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-3 py-0.5 text-xs font-semibold text-white ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
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
          <div className="flex items-center gap-1">
            <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) => page === "..." ? (<span key={`e-${i}`} className="px-1 text-gray-400">...</span>) : (
              <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
