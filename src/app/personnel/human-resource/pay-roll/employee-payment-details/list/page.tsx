"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PaymentRecord = {
  id: number;
  cadres: string;
  headOffice: string;
  employeeName: string;
  designation: string;
  createdDate: string;
};

const SAMPLE_DATA: PaymentRecord[] = [
  { id: 1,  cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "HEAD OFFICE",      employeeName: "MURUGESAN",    designation: "MANAGER",                  createdDate: "04-Nov-2024" },
  { id: 2,  cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "HEAD OFFICE",      employeeName: "VIJAYAKUMAR",  designation: "GENERAL MANAGER",          createdDate: "24-Jul-2024" },
  { id: 3,  cadres: "GENERAL MANAGER",                           headOffice: "HEAD OFFICE",      employeeName: "LAKSHMI",      designation: "GENERAL MANAGER (ADMIN)",  createdDate: "18-Nov-2021" },
  { id: 4,  cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "E-COMMERCE",       employeeName: "JAYASURIYA",   designation: "ASSISTANT SALES MAN",      createdDate: "28-Apr-2021" },
  { id: 5,  cadres: "PROBATION",                                  headOffice: "HEAD OFFICE",      employeeName: "MAHALINGAM",   designation: "ART DESIGNER",             createdDate: "28-Nov-2020" },
  { id: 6,  cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "UDUMALPET",        employeeName: "BALAMURUGAN",  designation: "SALESMAN",                 createdDate: "08-Feb-2020" },
  { id: 7,  cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "GOPI",             employeeName: "SARANYA",      designation: "SALES WOMAN",              createdDate: "08-Feb-2020" },
  { id: 8,  cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "THRISSUR",         employeeName: "VISHNU DAS",   designation: "ASSISTANT SALES MAN",      createdDate: "08-Feb-2020" },
  { id: 9,  cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "PADMANABHA SILK",  employeeName: "VEERADEVI",    designation: "ASSISTANT SALES WOMEN",    createdDate: "08-Feb-2020" },
  { id: 10, cadres: "PROBATION",                                  headOffice: "HEAD OFFICE",      employeeName: "KANNAN",       designation: "CLERK",                    createdDate: "01-Jan-2020" },
  { id: 11, cadres: "GENERAL MANAGER",                           headOffice: "HEAD OFFICE",      employeeName: "RAMAN",        designation: "DEPUTY GENERAL MANAGER",   createdDate: "15-Mar-2019" },
  { id: 12, cadres: "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN", headOffice: "COIMBATORE",       employeeName: "PRIYA",        designation: "SALES WOMAN",              createdDate: "10-Jan-2019" },
];

type SortKey = keyof PaymentRecord;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <span className="ml-1 text-[10px] opacity-50">⇅</span>;
  return <span className="ml-1 text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>;
}

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function EmployeePaymentDetailsListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterCadres, setFilterCadres] = useState("");
  const [filterHead, setFilterHead] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDesig, setFilterDesig] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (col: SortKey) => {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("asc"); }
    setPage(1);
  };

  const handleClear = () => {
    setSelectedId(null);
    setFilterCadres(""); setFilterHead(""); setFilterName("");
    setFilterDesig(""); setFilterDate("");
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.cadres.toLowerCase().includes(filterCadres.toLowerCase()) &&
    r.headOffice.toLowerCase().includes(filterHead.toLowerCase()) &&
    r.employeeName.toLowerCase().includes(filterName.toLowerCase()) &&
    r.designation.toLowerCase().includes(filterDesig.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filterDate.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey]; const bv = b[sortKey];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const thClass = "border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white whitespace-nowrap cursor-pointer select-none hover:bg-[#267a68]";

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Employee Payment Details List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Employee Payment Details List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{filtered.length}</span> - Employee Payment Details(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/employee-payment-details/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Add
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/pay-roll/employee-payment-details/view?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white w-10">#</th>
                <th className={thClass}>
                  <div onClick={() => handleSort("cadres")} className="flex items-center justify-center gap-1">
                    Cadres <SortIcon col="cadres" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <select value={filterCadres} onChange={(e) => { setFilterCadres(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option>ASSISTANT SALESMAN / ASSISTANT SALESWOMAN</option>
                    <option>GENERAL MANAGER</option>
                    <option>PROBATION</option>
                  </select>
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("headOffice")} className="flex items-center justify-center gap-1">
                    Head / Regional Office <SortIcon col="headOffice" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <select value={filterHead} onChange={(e) => { setFilterHead(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option>HEAD OFFICE</option>
                    <option>E-COMMERCE</option>
                    <option>UDUMALPET</option>
                    <option>GOPI</option>
                    <option>THRISSUR</option>
                    <option>COIMBATORE</option>
                  </select>
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("employeeName")} className="flex items-center justify-center gap-1">
                    Employee Name <SortIcon col="employeeName" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterName} onChange={(e) => { setFilterName(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("designation")} className="flex items-center justify-center gap-1">
                    Designation <SortIcon col="designation" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <select value={filterDesig} onChange={(e) => { setFilterDesig(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option>MANAGER</option>
                    <option>GENERAL MANAGER</option>
                    <option>GENERAL MANAGER (ADMIN)</option>
                    <option>ASSISTANT SALES MAN</option>
                    <option>SALESMAN</option>
                    <option>SALES WOMAN</option>
                    <option>ART DESIGNER</option>
                    <option>CLERK</option>
                  </select>
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("createdDate")} className="flex items-center justify-center gap-1">
                    Created Date <SortIcon col="createdDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSelected = selectedId === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(isSelected ? null : row.id)}
                      className={`cursor-pointer transition-colors ${isSelected ? "bg-[#e8f4f8] dark:bg-[#1a2e3a]" : idx % 2 === 0 ? "bg-white hover:bg-blue-50 dark:bg-gray-dark" : "bg-[#f9fafb] hover:bg-blue-50 dark:bg-[#1a2232]"}`}
                    >
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.cadres}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.headOffice}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.employeeName}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.designation}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.createdDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <input type="radio" checked={isSelected} onChange={() => setSelectedId(row.id)} className="size-4 accent-[#2d8f7b]" onClick={(e) => e.stopPropagation()} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>({Math.min((page - 1) * pageSize + 1, sorted.length)}–{Math.min(page * pageSize, sorted.length)} of {sorted.length})</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border border-stroke bg-white px-2 py-1 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">«</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">‹</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
