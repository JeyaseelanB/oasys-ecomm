"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PlanStatus = "FINAL_APPROVED" | "SUBMITTED";

interface GovtSchemePlanItem {
  id: number;
  planTypeCodeName: string;
  schemeName: string;
  period: string;
  planFrom: string;
  planTo: string;
  createdDate: string;
  status: PlanStatus;
}

const SAMPLE_DATA: GovtSchemePlanItem[] = [
  { id: 1, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "test", period: "Pongal", planFrom: "25-Feb-2025", planTo: "27-Feb-2025", createdDate: "25-Feb-2025", status: "FINAL_APPROVED" },
  { id: 2, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Cooptex123", period: "Pongal", planFrom: "21-Feb-2025", planTo: "22-Feb-2025", createdDate: "21-Feb-2025", status: "FINAL_APPROVED" },
  { id: 3, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "muruga", period: "Diwali", planFrom: "19-Feb-2025", planTo: "22-Feb-2025", createdDate: "19-Feb-2025", status: "FINAL_APPROVED" },
  { id: 4, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "thiyarajin", period: "Pongal", planFrom: "19-Feb-2025", planTo: "27-Feb-2025", createdDate: "19-Feb-2025", status: "FINAL_APPROVED" },
  { id: 5, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Testing Plan2025", period: "Pongal", planFrom: "18-Feb-2025", planTo: "28-Feb-2025", createdDate: "18-Feb-2025", status: "FINAL_APPROVED" },
  { id: 6, planTypeCodeName: "FDS / Free Distribution System", schemeName: "DSDS-2023-24-TEST", period: "Annual", planFrom: "24-Jan-2025", planTo: "31-Mar-2025", createdDate: "24-Jan-2025", status: "FINAL_APPROVED" },
  { id: 7, planTypeCodeName: "NMP / Noon Meal Program", schemeName: "NMP-2023-24-Test", period: "Annual", planFrom: "24-Jan-2025", planTo: "31-Mar-2025", createdDate: "24-Jan-2025", status: "FINAL_APPROVED" },
  { id: 8, planTypeCodeName: "NMP / Noon Meal Program", schemeName: "NMP Production 23-24", period: "Annual", planFrom: "28-Feb-2025", planTo: "28-Feb-2025", createdDate: "22-Jan-2025", status: "SUBMITTED" },
  { id: 9, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "new_year", period: "Pongal", planFrom: "17-Jun-2024", planTo: "22-Jun-2024", createdDate: "17-Jun-2024", status: "FINAL_APPROVED" },
  { id: 10, planTypeCodeName: "FDS / Free Distribution System", schemeName: "free_scheme2024", period: "Annual", planFrom: "01-Jul-2024", planTo: "30-Jul-2024", createdDate: "17-Jun-2024", status: "FINAL_APPROVED" },
  { id: 11, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Diwali_Special_2024", period: "Diwali", planFrom: "15-Oct-2024", planTo: "30-Oct-2024", createdDate: "10-Oct-2024", status: "FINAL_APPROVED" },
  { id: 12, planTypeCodeName: "FDS / Free Distribution System", schemeName: "FDS-Q3-2024", period: "Annual", planFrom: "01-Sep-2024", planTo: "30-Sep-2024", createdDate: "25-Aug-2024", status: "FINAL_APPROVED" },
  { id: 13, planTypeCodeName: "NMP / Noon Meal Program", schemeName: "NMP-Summer-2024", period: "Annual", planFrom: "01-May-2024", planTo: "31-May-2024", createdDate: "20-Apr-2024", status: "SUBMITTED" },
  { id: 14, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Pongal_Plan_2024", period: "Pongal", planFrom: "01-Jan-2024", planTo: "15-Jan-2024", createdDate: "20-Dec-2023", status: "FINAL_APPROVED" },
  { id: 15, planTypeCodeName: "FDS / Free Distribution System", schemeName: "FDS-Annual-2024", period: "Annual", planFrom: "01-Apr-2024", planTo: "31-Mar-2025", createdDate: "15-Mar-2024", status: "FINAL_APPROVED" },
  { id: 16, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Independence_Day_OAP", period: "Diwali", planFrom: "01-Aug-2024", planTo: "15-Aug-2024", createdDate: "20-Jul-2024", status: "FINAL_APPROVED" },
  { id: 17, planTypeCodeName: "NMP / Noon Meal Program", schemeName: "NMP-2024-25-Plan", period: "Annual", planFrom: "01-Apr-2024", planTo: "31-Mar-2025", createdDate: "10-Mar-2024", status: "FINAL_APPROVED" },
  { id: 18, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Christmas_Gift_OAP", period: "Pongal", planFrom: "15-Dec-2023", planTo: "25-Dec-2023", createdDate: "01-Dec-2023", status: "FINAL_APPROVED" },
  { id: 19, planTypeCodeName: "FDS / Free Distribution System", schemeName: "FDS-Q2-2024", period: "Annual", planFrom: "01-Jun-2024", planTo: "30-Jun-2024", createdDate: "20-May-2024", status: "SUBMITTED" },
  { id: 20, planTypeCodeName: "NMP / Noon Meal Program", schemeName: "NMP-Winter-2024", period: "Annual", planFrom: "01-Nov-2024", planTo: "30-Nov-2024", createdDate: "15-Oct-2024", status: "FINAL_APPROVED" },
  { id: 21, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Republic_Day_OAP", period: "Pongal", planFrom: "15-Jan-2024", planTo: "26-Jan-2024", createdDate: "05-Jan-2024", status: "FINAL_APPROVED" },
  { id: 22, planTypeCodeName: "FDS / Free Distribution System", schemeName: "FDS-Monsoon-2024", period: "Annual", planFrom: "01-Jul-2024", planTo: "31-Aug-2024", createdDate: "15-Jun-2024", status: "SUBMITTED" },
  { id: 23, planTypeCodeName: "OAP / Old Age Pension Scheme", schemeName: "Tamil_NewYear_2024", period: "Pongal", planFrom: "01-Apr-2024", planTo: "14-Apr-2024", createdDate: "20-Mar-2024", status: "FINAL_APPROVED" },
  { id: 24, planTypeCodeName: "NMP / Noon Meal Program", schemeName: "NMP-Festival-2024", period: "Diwali", planFrom: "01-Oct-2024", planTo: "31-Oct-2024", createdDate: "15-Sep-2024", status: "FINAL_APPROVED" },
  { id: 25, planTypeCodeName: "FDS / Free Distribution System", schemeName: "FDS-Year-End-2023", period: "Annual", planFrom: "01-Dec-2023", planTo: "31-Dec-2023", createdDate: "15-Nov-2023", status: "FINAL_APPROVED" },
];

const STATUS_STYLES: Record<PlanStatus, string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  SUBMITTED: "bg-[#FFA70B] text-white",
};

type SortKey = keyof GovtSchemePlanItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function GovernmentSchemeProductionPlanListPage() {
  const router = useRouter();
  const basePath = "/operational/production-planning/government-scheme";

  const [filters, setFilters] = useState({
    planTypeCodeName: "",
    schemeName: "",
    period: "",
    planFrom: "",
    planTo: "",
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
    row.planTypeCodeName.toLowerCase().includes(filters.planTypeCodeName.toLowerCase()) &&
    row.schemeName.toLowerCase().includes(filters.schemeName.toLowerCase()) &&
    row.period.toLowerCase().includes(filters.period.toLowerCase()) &&
    (filters.planFrom === "" || row.planFrom.toLowerCase().includes(filters.planFrom.toLowerCase())) &&
    (filters.planTo === "" || row.planTo.toLowerCase().includes(filters.planTo.toLowerCase())) &&
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

  const handleClear = () => {
    setFilters({ planTypeCodeName: "", schemeName: "", period: "", planFrom: "", planTo: "", createdDate: "", status: "" });
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

  const CalendarIcon = () => (
    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Production Plan List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Production Planning</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Government Scheme</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Production Plan List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Government Scheme Production Plan(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`${basePath}/create`} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
              Add
            </Link>
            <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push(`${basePath}/view`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
              View
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planTypeCodeName")}>Plan Type Code / Name <SortIcon col="planTypeCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("schemeName")}>Scheme Name <SortIcon col="schemeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("period")}>Period <SortIcon col="period" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planFrom")}>Plan From <SortIcon col="planFrom" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planTo")}>Plan To <SortIcon col="planTo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planTypeCodeName} onChange={(e) => { setFilters((f) => ({ ...f, planTypeCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.schemeName} onChange={(e) => { setFilters((f) => ({ ...f, schemeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.period} onChange={(e) => { setFilters((f) => ({ ...f, period: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planFrom} onChange={(e) => { setFilters((f) => ({ ...f, planFrom: e.target.value })); setCurrentPage(1); }} /><CalendarIcon /></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planTo} onChange={(e) => { setFilters((f) => ({ ...f, planTo: e.target.value })); setCurrentPage(1); }} /><CalendarIcon /></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} /><CalendarIcon /></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="FINAL_APPROVED">FINAL_APPROVED</option><option value="SUBMITTED">SUBMITTED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 align-middle text-dark dark:border-dark-3 dark:text-white">{row.planTypeCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 align-middle text-dark dark:border-dark-3 dark:text-white">{row.schemeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.period}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.planFrom}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.planTo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle dark:border-dark-3">
                      <span className={`inline-flex items-center justify-center rounded px-3 py-1 text-[11px] font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-2 py-3 text-center align-middle">
                      <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                    </td>
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
