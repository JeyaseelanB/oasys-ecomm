"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoanRecord {
  id: number;
  referenceNumber: string;
  loanAdvance: string;
  loanAdvanceType: string;
  amount: string;
  createdDate: string;
  status: string;
}

const SAMPLE_DATA: LoanRecord[] = [
  { id: 1,  referenceNumber: "LADV/2021/00030", loanAdvance: "LOAN",    loanAdvanceType: "BTF-2",    amount: "10,000.00", createdDate: "26-Apr-2021", status: "INPROGRESS" },
  { id: 2,  referenceNumber: "LADV/2021/00029", loanAdvance: "LOAN",    loanAdvanceType: "BTF-2",    amount: "10,000.00", createdDate: "26-Apr-2021", status: "RECOVERY DISBURSED" },
  { id: 3,  referenceNumber: "LADV/2021/00028", loanAdvance: "ADVANCE", loanAdvanceType: "HBA",      amount: "50,000.00", createdDate: "22-Apr-2021", status: "LOAN DISBURSED" },
  { id: 4,  referenceNumber: "LADV/2021/00027", loanAdvance: "ADVANCE", loanAdvanceType: "FESTIVAL", amount: "5,000.00",  createdDate: "20-Apr-2021", status: "ADVANCE DISBURSED" },
  { id: 5,  referenceNumber: "LADV/2021/00026", loanAdvance: "LOAN",    loanAdvanceType: "COMPUTER", amount: "25,000.00", createdDate: "18-Apr-2021", status: "REJECTED" },
  { id: 6,  referenceNumber: "LADV/2021/00025", loanAdvance: "LOAN",    loanAdvanceType: "BTF-2",    amount: "10,000.00", createdDate: "15-Apr-2021", status: "INPROGRESS" },
  { id: 7,  referenceNumber: "LADV/2021/00024", loanAdvance: "ADVANCE", loanAdvanceType: "MEDICAL",  amount: "8,000.00",  createdDate: "12-Apr-2021", status: "ADVANCE DISBURSED" },
  { id: 8,  referenceNumber: "LADV/2021/00023", loanAdvance: "LOAN",    loanAdvanceType: "VEHICLE",  amount: "40,000.00", createdDate: "10-Apr-2021", status: "RECOVERY DISBURSED" },
  { id: 9,  referenceNumber: "LADV/2021/00022", loanAdvance: "ADVANCE", loanAdvanceType: "FESTIVAL", amount: "5,000.00",  createdDate: "08-Apr-2021", status: "INPROGRESS" },
  { id: 10, referenceNumber: "LADV/2021/00021", loanAdvance: "LOAN",    loanAdvanceType: "BTF-2",    amount: "15,000.00", createdDate: "05-Apr-2021", status: "LOAN DISBURSED" },
];

const STATUS_STYLES: Record<string, string> = {
  "INPROGRESS":         "bg-[#FFA70B] text-white",
  "RECOVERY DISBURSED": "bg-[#17a2b8] text-white",
  "LOAN DISBURSED":     "bg-[#17a2b8] text-white",
  "ADVANCE DISBURSED":  "bg-[#17a2b8] text-white",
  "REJECTED":           "bg-[#dc3545] text-white",
};

type SortKey = keyof LoanRecord;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function LoansAndAdvanceListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ referenceNumber: "", loanAdvance: "", loanAdvanceType: "", amount: "", createdDate: "", status: "" });
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
    row.loanAdvance.toLowerCase().includes(filters.loanAdvance.toLowerCase()) &&
    row.loanAdvanceType.toLowerCase().includes(filters.loanAdvanceType.toLowerCase()) &&
    row.amount.toLowerCase().includes(filters.amount.toLowerCase()) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const cmp = String(a[sortKey]) < String(b[sortKey]) ? -1 : String(a[sortKey]) > String(b[sortKey]) ? 1 : 0;
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
    setFilters({ referenceNumber: "", loanAdvance: "", loanAdvanceType: "", amount: "", createdDate: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Loans &amp; Advance List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Loans &amp; Advance List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Loans &amp; Advance(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/personnel/employee-self-service/loans-and-advance/add">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Add
              </button>
            </Link>
            <button
              disabled={selectedId === null}
              onClick={() => selectedId !== null && router.push("/personnel/employee-self-service/loans-and-advance/view")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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
                {(["referenceNumber", "loanAdvance", "loanAdvanceType", "amount", "createdDate", "status"] as SortKey[]).map((col, i) => (
                  <th key={col} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort(col)}>
                    {["Reference Number", "Loan / Advance", "Loan / Advance Type", "Loan / Advance Amount (₹)", "Created Date", "Status"][i]}
                    <SortIcon col={col} />
                  </th>
                ))}
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNumber} onChange={(e) => { setFilters((f) => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.loanAdvance} onChange={(e) => { setFilters((f) => ({ ...f, loanAdvance: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.loanAdvanceType} onChange={(e) => { setFilters((f) => ({ ...f, loanAdvanceType: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.amount} onChange={(e) => { setFilters((f) => ({ ...f, amount: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} />
                    <span className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded bg-[#17a2b8]">
                      <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="INPROGRESS">INPROGRESS</option>
                    <option value="RECOVERY DISBURSED">RECOVERY DISBURSED</option>
                    <option value="LOAN DISBURSED">LOAN DISBURSED</option>
                    <option value="ADVANCE DISBURSED">ADVANCE DISBURSED</option>
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
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.referenceNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.loanAdvance}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.loanAdvanceType}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.amount}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      {row.status && <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${STATUS_STYLES[row.status] ?? ""}`}>{row.status}</span>}
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
