"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FlagStatus = "ACCEPTED" | "REJECTED";

interface FlagDayItem {
  id: number;
  employeeNamePf: string;
  financialYear: string;
  minimumContributionAmount: number;
  voluntaryContributionAmount: number;
  totalContributionAmount: number;
  status: FlagStatus;
}

const SAMPLE_DATA: FlagDayItem[] = [
  { id: 1, employeeNamePf: "MANGALAM / 3643", financialYear: "2024", minimumContributionAmount: 100.00, voluntaryContributionAmount: 0.00, totalContributionAmount: 0.00, status: "ACCEPTED" },
  { id: 2, employeeNamePf: "USHA / 3558", financialYear: "2024", minimumContributionAmount: 100.00, voluntaryContributionAmount: 1200.00, totalContributionAmount: 1300.00, status: "ACCEPTED" },
  { id: 3, employeeNamePf: "SANKARANARAYANAN / 3325", financialYear: "2024", minimumContributionAmount: 100.00, voluntaryContributionAmount: 1000.00, totalContributionAmount: 1100.00, status: "REJECTED" },
];

const STATUS_STYLES: Record<FlagStatus, string> = {
  ACCEPTED: "bg-[#FFA70B] text-white",
  REJECTED: "bg-[#dc3545] text-white",
};

type SortKey = keyof FlagDayItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function FlagDayContributionListPage() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    employeeNamePf: "",
    financialYear: "",
    minimumContributionAmount: "",
    voluntaryContributionAmount: "",
    totalContributionAmount: "",
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
    row.employeeNamePf.toLowerCase().includes(filters.employeeNamePf.toLowerCase()) &&
    (filters.financialYear === "" || row.financialYear.includes(filters.financialYear)) &&
    (filters.minimumContributionAmount === "" || String(row.minimumContributionAmount).includes(filters.minimumContributionAmount)) &&
    (filters.voluntaryContributionAmount === "" || String(row.voluntaryContributionAmount).includes(filters.voluntaryContributionAmount)) &&
    (filters.totalContributionAmount === "" || String(row.totalContributionAmount).includes(filters.totalContributionAmount)) &&
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
    setFilters({ employeeNamePf: "", financialYear: "", minimumContributionAmount: "", voluntaryContributionAmount: "", totalContributionAmount: "", status: "" });
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
          Flag Day Fund Contribution List
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Flag Day Fund Contribution List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Flag Day Fund Contribution(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/personnel/employee-self-service/flag-day-contribution/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
              Add
            </Link>
            <button onClick={() => { if (selectedId) router.push("/personnel/employee-self-service/flag-day-contribution/create"); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push("/personnel/employee-self-service/flag-day-contribution/view"); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              View
            </button>
            <button onClick={() => { if (selectedId) { /* handle delete */ } }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
              Delete
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
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
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeNamePf")}>
                  Employee Name / PF Number <SortIcon col="employeeNamePf" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("financialYear")}>
                  Financial Year <SortIcon col="financialYear" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("minimumContributionAmount")}>
                  Minimum Contribution Amount (&#8377;) <SortIcon col="minimumContributionAmount" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("voluntaryContributionAmount")}>
                  Voluntary Contribution Amount (&#8377;) <SortIcon col="voluntaryContributionAmount" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("totalContributionAmount")}>
                  Total Contribution Amount (&#8377;) <SortIcon col="totalContributionAmount" />
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
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeNamePf} onChange={(e) => { setFilters((f) => ({ ...f, employeeNamePf: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.financialYear} onChange={(e) => { setFilters((f) => ({ ...f, financialYear: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.minimumContributionAmount} onChange={(e) => { setFilters((f) => ({ ...f, minimumContributionAmount: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.voluntaryContributionAmount} onChange={(e) => { setFilters((f) => ({ ...f, voluntaryContributionAmount: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.totalContributionAmount} onChange={(e) => { setFilters((f) => ({ ...f, totalContributionAmount: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center text-primary dark:border-dark-3">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-primary dark:border-dark-3">{row.employeeNamePf}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.financialYear}</td>
                    <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.minimumContributionAmount.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.voluntaryContributionAmount.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.totalContributionAmount.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-3 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
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
