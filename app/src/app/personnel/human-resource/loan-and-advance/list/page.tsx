"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoanStatus = "LOAN DISBURSED" | "RECOVERY DISBURSED" | "FINAL APPROVED";

interface LoanAdvanceItem {
  id: number;
  referenceNo: string;
  employeeCode: string;
  employeeName: string;
  loanAdvance: string;
  loanAdvanceType: string;
  amount: number;
  createdDate: string;
  status: LoanStatus;
}

const SAMPLE_DATA: LoanAdvanceItem[] = [
  { id: 1,  referenceNo: "LRF8251", employeeCode: "422", employeeName: "SHERIN",                    loanAdvance: "Loan",     loanAdvanceType: "MARRIAGE LOAN 2",  amount: 24700,  createdDate: "12-Mar-2026", status: "LOAN DISBURSED" },
  { id: 2,  referenceNo: "LRF8250", employeeCode: "759", employeeName: "GANAPATHY SUBRAMANIAN",     loanAdvance: "Recovery", loanAdvanceType: "CSD1",             amount: 14000,  createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
  { id: 3,  referenceNo: "LRF8249", employeeCode: "687", employeeName: "SRIDHAR",                   loanAdvance: "Recovery", loanAdvanceType: "CSD1",             amount: 82271,  createdDate: "26-Feb-2026", status: "FINAL APPROVED" },
  { id: 4,  referenceNo: "LRF8248", employeeCode: "734", employeeName: "RAJESHWARI",                loanAdvance: "Recovery", loanAdvanceType: "CSD1",             amount: 9000,   createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
  { id: 5,  referenceNo: "LRF8247", employeeCode: "477", employeeName: "MURUGAN",                   loanAdvance: "Recovery", loanAdvanceType: "CRS2",             amount: 295320, createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
  { id: 6,  referenceNo: "LRF8246", employeeCode: "468", employeeName: "MAHALAKSMI",                loanAdvance: "Recovery", loanAdvanceType: "CRS2",             amount: 57350,  createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
  { id: 7,  referenceNo: "LRF8245", employeeCode: "381", employeeName: "MURUGAN",                   loanAdvance: "Recovery", loanAdvanceType: "CSD2",             amount: 21000,  createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
  { id: 8,  referenceNo: "LRF8244", employeeCode: "187", employeeName: "BHUVANA",                   loanAdvance: "Loan",     loanAdvanceType: "BTF 1EDUCATION",   amount: 48000,  createdDate: "26-Feb-2026", status: "LOAN DISBURSED" },
  { id: 9,  referenceNo: "LRF8243", employeeCode: "691", employeeName: "SURESH",                    loanAdvance: "Recovery", loanAdvanceType: "CSD1",             amount: 28000,  createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
  { id: 10, referenceNo: "LRF8242", employeeCode: "736", employeeName: "SAKTHIVELAMMAL",             loanAdvance: "Recovery", loanAdvanceType: "CSD2",             amount: 12000,  createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
];

const STATUS_STYLES: Record<LoanStatus, string> = {
  "LOAN DISBURSED":      "bg-[#6c757d]",
  "RECOVERY DISBURSED":  "bg-[#28a745]",
  "FINAL APPROVED":      "bg-[#17a2b8]",
};

type SortKey = keyof LoanAdvanceItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function LoanAndAdvanceListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    referenceNo: "",
    employeeCode: "",
    employeeName: "",
    loanAdvance: "",
    loanAdvanceType: "",
    amount: "",
    createdDate: "",
    status: "",
  });
  const [sortKey, setSortKey]       = useState<SortKey>("id");
  const [sortDir, setSortDir]       = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]     = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNo.toLowerCase().includes(filters.referenceNo.toLowerCase()) &&
    row.employeeCode.toLowerCase().includes(filters.employeeCode.toLowerCase()) &&
    row.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    (filters.loanAdvance === "" || row.loanAdvance === filters.loanAdvance) &&
    row.loanAdvanceType.toLowerCase().includes(filters.loanAdvanceType.toLowerCase()) &&
    (filters.amount === "" || row.amount.toString().includes(filters.amount)) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const c = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? c : -c;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc"  ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
    </span>
  );

  const handleClear = () => {
    setFilters({ referenceNo: "", employeeCode: "", employeeName: "", loanAdvance: "", loanAdvanceType: "", amount: "", createdDate: "", status: "" });
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
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Loans &amp; Advance List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Loans &amp; Advance List</li>
          </ol>
        </nav>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-[10px] border border-stroke bg-white p-6 shadow-2xl dark:border-dark-3 dark:bg-gray-dark">
            <h3 className="mb-2 text-base font-semibold text-dark dark:text-white">Confirm Delete</h3>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">Are you sure you want to delete this record? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Cancel</button>
              <button onClick={() => { setSelectedId(null); setShowDeleteConfirm(false); }} className="rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Loans &amp; Advance(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/personnel/human-resource/loan-and-advance/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </Link>
            <button
              onClick={() => { if (selectedId) router.push(`/personnel/human-resource/loan-and-advance/edit?id=${selectedId}`); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#007bff] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => { if (selectedId) router.push(`/personnel/human-resource/loan-and-advance/view?id=${selectedId}`); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              onClick={() => { if (selectedId) setShowDeleteConfirm(true); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              Delete
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-10 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("referenceNo")}>Reference No. <SortIcon col="referenceNo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeCode")}>Employee Code <SortIcon col="employeeCode" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeName")}>Employee Name <SortIcon col="employeeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("loanAdvance")}>Loan / Advance <SortIcon col="loanAdvance" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("loanAdvanceType")}>Loan / Advance Type <SortIcon col="loanAdvanceType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("amount")}>Loan / Advance (₹) <SortIcon col="amount" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNo} onChange={(e) => { setFilters((f) => ({ ...f, referenceNo: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeCode} onChange={(e) => { setFilters((f) => ({ ...f, employeeCode: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeName} onChange={(e) => { setFilters((f) => ({ ...f, employeeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.loanAdvance} onChange={(e) => { setFilters((f) => ({ ...f, loanAdvance: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="Loan">Loan</option>
                    <option value="Recovery">Recovery</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.loanAdvanceType} onChange={(e) => { setFilters((f) => ({ ...f, loanAdvanceType: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.amount} onChange={(e) => { setFilters((f) => ({ ...f, amount: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="LOAN DISBURSED">LOAN DISBURSED</option>
                    <option value="RECOVERY DISBURSED">RECOVERY DISBURSED</option>
                    <option value="FINAL APPROVED">FINAL APPROVED</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className={`cursor-pointer border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#e8f4f8] dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{row.referenceNo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.employeeCode}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.employeeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.loanAdvance}</td>
                    <td className="border-r border-stroke px-2 py-3 font-medium text-[#2d8f7b] dark:border-dark-3">{row.loanAdvanceType}</td>
                    <td className="border-r border-stroke px-2 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.amount.toLocaleString()}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold text-white ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input type="radio" name="selectLoanRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
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
