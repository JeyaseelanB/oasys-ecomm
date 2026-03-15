"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoanRow {
  id: number;
  pfNumber: string;
  loanNumber: string;
  loanType: string;
  loanAmount: number;
  sanctionAmt: number;
  startDate: string;
  endDate: string;
  totalTenure: string;
  completedTenure: string;
  remainingTenure: string;
  balanceAmount: number;
}

const SAMPLE_DATA: LoanRow[] = [
  { id: 1,  pfNumber: "3325", loanNumber: "LRF6415", loanType: "FAMILY BENEFIT FUND SCHEME", loanAmount: 2197.00,  sanctionAmt: 2197.00,  startDate: "22-Dec-2023", endDate: "30-Apr-2024", totalTenure: "5 Months",  completedTenure: "5 Months",  remainingTenure: "0 Months", balanceAmount: 0.00     },
  { id: 2,  pfNumber: "3325", loanNumber: "LRF6093", loanType: "BTF PERSONAL LOAN",           loanAmount: 24000.00, sanctionAmt: 24000.00, startDate: "01-Nov-2023", endDate: "31-Oct-2024", totalTenure: "12 Months", completedTenure: "8 Months",  remainingTenure: "4 Months", balanceAmount: 8116.67  },
  { id: 3,  pfNumber: "3325", loanNumber: "LRF6092", loanType: "FVADVINT2023",                loanAmount: 23700.00, sanctionAmt: 23700.00, startDate: "01-Nov-2023", endDate: "31-Aug-2024", totalTenure: "10 Months", completedTenure: "8 Months",  remainingTenure: "2 Months", balanceAmount: 4792.74  },
  { id: 4,  pfNumber: "3325", loanNumber: "LRF6087", loanType: "FAD1",                        loanAmount: 10000.00, sanctionAmt: 10000.00, startDate: "01-Nov-2023", endDate: "31-Aug-2024", totalTenure: "10 Months", completedTenure: "8 Months",  remainingTenure: "2 Months", balanceAmount: 2000.00  },
  { id: 5,  pfNumber: "3325", loanNumber: "LRF5883", loanType: "BTF 1EDUCATION",              loanAmount: 30000.00, sanctionAmt: 30000.00, startDate: "01-Aug-2023", endDate: "31-Jul-2024", totalTenure: "12 Months", completedTenure: "11 Months", remainingTenure: "1 Months", balanceAmount: 2508.33  },
  { id: 6,  pfNumber: "3325", loanNumber: "LRF5183", loanType: "FestivalAdvance3",            loanAmount: 22000.00, sanctionAmt: 22000.00, startDate: "01-Oct-2022", endDate: "31-Jul-2023", totalTenure: "10 Months", completedTenure: "10 Months", remainingTenure: "0 Months", balanceAmount: 0.00     },
  { id: 7,  pfNumber: "3325", loanNumber: "LRF5133", loanType: "FAD1",                        loanAmount: 10000.00, sanctionAmt: 10000.00, startDate: "01-Oct-2022", endDate: "31-Jul-2023", totalTenure: "10 Months", completedTenure: "10 Months", remainingTenure: "0 Months", balanceAmount: 0.00     },
  { id: 8,  pfNumber: "3325", loanNumber: "LRF5099", loanType: "BTF PERSONAL LOAN",           loanAmount: 24000.00, sanctionAmt: 24000.00, startDate: "01-Oct-2022", endDate: "30-Sep-2023", totalTenure: "12 Months", completedTenure: "12 Months", remainingTenure: "0 Months", balanceAmount: 0.00     },
  { id: 9,  pfNumber: "3325", loanNumber: "LRF5094", loanType: "BTF EDUCATION LOAN",          loanAmount: 30000.00, sanctionAmt: 30000.00, startDate: "01-Aug-2022", endDate: "31-Jul-2023", totalTenure: "12 Months", completedTenure: "12 Months", remainingTenure: "0 Months", balanceAmount: 0.00     },
  { id: 10, pfNumber: "3325", loanNumber: "LRF4412", loanType: "FAD2",                        loanAmount: 20000.00, sanctionAmt: 20000.00, startDate: "01-Nov-2021", endDate: "31-Aug-2022", totalTenure: "10 Months", completedTenure: "10 Months", remainingTenure: "0 Months", balanceAmount: 0.00     },
];

type SortKey = keyof LoanRow;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function LoanInformationListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ pfNumber: "", loanNumber: "", loanType: "", loanAmount: "", sanctionAmt: "", startDate: "", endDate: "", totalTenure: "" });
  const [sortKey, setSortKey]         = useState<SortKey>("id");
  const [sortDir, setSortDir]         = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]       = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc"  ? "opacity-100" : "opacity-40"}>▲</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
    </span>
  );

  const filtered = SAMPLE_DATA.filter(r =>
    r.pfNumber.toLowerCase().includes(filters.pfNumber.toLowerCase()) &&
    r.loanNumber.toLowerCase().includes(filters.loanNumber.toLowerCase()) &&
    r.loanType.toLowerCase().includes(filters.loanType.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

  const handleClear = () => {
    setFilters({ pfNumber: "", loanNumber: "", loanType: "", loanAmount: "", sanctionAmt: "", startDate: "", endDate: "", totalTenure: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Loan Information list</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><a href="/" className="font-medium text-primary hover:underline">Home</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Loan Information list</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span>&nbsp;- Loan Information(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={selectedId ? `/personnel/employee-self-service/loan-information/request-for-loan-preclosure` : "#"}
              style={{ backgroundColor: selectedId ? "#e8620a" : "#e8a06a", pointerEvents: selectedId ? "auto" : "none" }}
              className="flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Request for Loan Preclosure
            </Link>
            <button
              disabled={selectedId === null}
              onClick={() => { if (selectedId) router.push(`/personnel/employee-self-service/loan-information/view/${selectedId}`); }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
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
                {([ ["pfNumber","PF Number"], ["loanNumber","Loan Number"], ["loanType","Loan Type"], ["loanAmount","Loan Amount (₹)"], ["sanctionAmt","Sanction Amt (₹)"], ["startDate","Start Date"], ["endDate","End Date"], ["totalTenure","Total Tenure"] ] as [SortKey, string][]).map(([col, label]) => (
                  <th key={col} onClick={() => handleSort(col)} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                    {label} <SortIcon col={col} />
                  </th>
                ))}
                <th onClick={() => handleSort("completedTenure")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Completed Tenure <SortIcon col="completedTenure" />
                </th>
                <th onClick={() => handleSort("remainingTenure")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Remaining Tenure <SortIcon col="remainingTenure" />
                </th>
                <th onClick={() => handleSort("balanceAmount")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Balance Amount (₹) <SortIcon col="balanceAmount" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5"></td>
                {["pfNumber","loanNumber","loanType","loanAmount","sanctionAmt"].map(col => (
                  <td key={col} className="border border-stroke px-2 py-1.5">
                    <input className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                      value={filters[col as keyof typeof filters]} onChange={e => { setFilters(f => ({ ...f, [col]: e.target.value })); setCurrentPage(1); }} />
                  </td>
                ))}
                <td className="border border-stroke px-2 py-1.5">
                  <div className="relative flex items-center">
                    <input placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent py-1 pl-2 pr-7 text-xs text-dark outline-none focus:border-primary"
                      value={filters.startDate} onChange={e => { setFilters(f => ({ ...f, startDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="pointer-events-none absolute right-1.5 size-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5">
                  <div className="relative flex items-center">
                    <input placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent py-1 pl-2 pr-7 text-xs text-dark outline-none focus:border-primary"
                      value={filters.endDate} onChange={e => { setFilters(f => ({ ...f, endDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="pointer-events-none absolute right-1.5 size-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5">
                  <input className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.totalTenure} onChange={e => { setFilters(f => ({ ...f, totalTenure: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5"></td>
                <td className="border border-stroke px-2 py-1.5"></td>
                <td className="border border-stroke px-2 py-1.5"></td>
                <td className="border border-stroke px-2 py-1.5"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={13} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"} hover:bg-blue-50`}>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark">{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.pfNumber}</td>
                  <td className="border-r border-stroke px-3 py-3" style={{ color: "#17a2b8" }}>{row.loanNumber}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.loanType}</td>
                  <td className="border-r border-stroke px-3 py-3 text-right text-dark">{row.loanAmount.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-3 text-right text-dark">{row.sanctionAmt.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.startDate}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.endDate}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.totalTenure}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.completedTenure}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.remainingTenure}</td>
                  <td className="border-r border-stroke px-3 py-3 text-right text-dark">{row.balanceAmount.toFixed(2)}</td>
                  <td className="px-3 py-3 text-center">
                    <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">«</button>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">‹</button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)}
                  className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100"}`}>
                  {page}
                </button>
              )
            )}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">»</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
