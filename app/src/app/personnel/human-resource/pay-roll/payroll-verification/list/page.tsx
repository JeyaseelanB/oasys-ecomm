"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

type PVRecord = {
  id: number;
  accountCode: string;
  year: string;
  month: string;
  createdDate: string;
  status: "FINAL_APPROVED";
};

const RECORDS: PVRecord[] = [
  { id:1,  accountCode:"16 / CHENNAI",     year:"2024", month:"FEBRUARY",  createdDate:"12-Sep-2024", status:"FINAL_APPROVED" },
  { id:2,  accountCode:"16 / CHENNAI",     year:"2024", month:"SEPTEMBER", createdDate:"10-Sep-2024", status:"FINAL_APPROVED" },
  { id:3,  accountCode:"10 / HEAD OFFICE", year:"2024", month:"JUNE",      createdDate:"19-Jan-2024", status:"FINAL_APPROVED" },
  { id:4,  accountCode:"10 / HEAD OFFICE", year:"2023", month:"OCTOBER",   createdDate:"18-Nov-2023", status:"FINAL_APPROVED" },
  { id:5,  accountCode:"10 / HEAD OFFICE", year:"2023", month:"SEPTEMBER", createdDate:"18-Oct-2023", status:"FINAL_APPROVED" },
  { id:6,  accountCode:"10 / HEAD OFFICE", year:"2023", month:"AUGUST",    createdDate:"22-Sep-2023", status:"FINAL_APPROVED" },
  { id:7,  accountCode:"10 / HEAD OFFICE", year:"2023", month:"JULY",      createdDate:"21-Aug-2023", status:"FINAL_APPROVED" },
  { id:8,  accountCode:"10 / HEAD OFFICE", year:"2023", month:"JUNE",      createdDate:"24-Jul-2023", status:"FINAL_APPROVED" },
  { id:9,  accountCode:"10 / HEAD OFFICE", year:"2023", month:"MAY",       createdDate:"19-Jun-2023", status:"FINAL_APPROVED" },
  { id:10, accountCode:"10 / HEAD OFFICE", year:"2023", month:"APRIL",     createdDate:"23-May-2023", status:"FINAL_APPROVED" },
  { id:11, accountCode:"10 / HEAD OFFICE", year:"2023", month:"MARCH",     createdDate:"18-Apr-2023", status:"FINAL_APPROVED" },
  { id:12, accountCode:"10 / HEAD OFFICE", year:"2023", month:"FEBRUARY",  createdDate:"20-Mar-2023", status:"FINAL_APPROVED" },
  { id:13, accountCode:"10 / HEAD OFFICE", year:"2023", month:"JANUARY",   createdDate:"21-Feb-2023", status:"FINAL_APPROVED" },
  { id:14, accountCode:"16 / CHENNAI",     year:"2023", month:"DECEMBER",  createdDate:"15-Jan-2023", status:"FINAL_APPROVED" },
  { id:15, accountCode:"16 / CHENNAI",     year:"2023", month:"NOVEMBER",  createdDate:"12-Dec-2022", status:"FINAL_APPROVED" },
  { id:16, accountCode:"10 / HEAD OFFICE", year:"2022", month:"DECEMBER",  createdDate:"19-Jan-2023", status:"FINAL_APPROVED" },
  { id:17, accountCode:"10 / HEAD OFFICE", year:"2022", month:"NOVEMBER",  createdDate:"14-Dec-2022", status:"FINAL_APPROVED" },
  { id:18, accountCode:"10 / HEAD OFFICE", year:"2022", month:"OCTOBER",   createdDate:"15-Nov-2022", status:"FINAL_APPROVED" },
  { id:19, accountCode:"16 / CHENNAI",     year:"2022", month:"OCTOBER",   createdDate:"10-Nov-2022", status:"FINAL_APPROVED" },
  { id:20, accountCode:"10 / HEAD OFFICE", year:"2022", month:"SEPTEMBER", createdDate:"17-Oct-2022", status:"FINAL_APPROVED" },
];

const MONTHS_LIST = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

const SortIcon = () => (
  <svg className="inline-block size-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
  </svg>
);

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 9) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function PayrollVerificationListPage() {
  const router  = useRouter();
  const [selected,    setSelected]    = useState<number | null>(null);
  const [page,        setPage]        = useState(1);
  const [perPage,     setPerPage]     = useState(10);
  const [showModal,   setShowModal]   = useState(false);
  const [password,    setPassword]    = useState("");
  const [pwdError,    setPwdError]    = useState("");

  const [fCode,   setFCode]   = useState("");
  const [fYear,   setFYear]   = useState("");
  const [fMonth,  setFMonth]  = useState("");
  const [fDate,   setFDate]   = useState("");
  const [fStatus, setFStatus] = useState("");

  const filtered = useMemo(() => RECORDS.filter(r => {
    if (fCode   && !r.accountCode.toLowerCase().includes(fCode.toLowerCase())) return false;
    if (fYear   && !r.year.includes(fYear))                                    return false;
    if (fMonth  && r.month !== fMonth)                                         return false;
    if (fDate   && !r.createdDate.toLowerCase().includes(fDate.toLowerCase())) return false;
    if (fStatus && r.status !== fStatus)                                       return false;
    return true;
  }), [fCode, fYear, fMonth, fDate, fStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData   = filtered.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => {
    setFCode(""); setFYear(""); setFMonth(""); setFDate(""); setFStatus("");
    setSelected(null); setPage(1);
  };

  const handleViewClick = () => {
    if (selected === null) return;
    setPassword("");
    setPwdError("");
    setShowModal(true);
  };

  const handlePasswordSubmit = () => {
    if (!password) {
      setPwdError("Secondary Password is required.");
      return;
    }
    setShowModal(false);
    router.push("/personnel/human-resource/pay-roll/payroll-verification/view");
  };

  const inp = "h-7 w-full rounded border border-white/40 bg-white/20 px-1.5 text-xs text-white placeholder-white/60 focus:outline-none focus:border-white/80";
  const sel = "h-7 w-full rounded border border-white/40 bg-white/20 px-1 text-xs text-white focus:outline-none";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Payroll Verification List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Payroll Verification List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-[#2d8f7b]">{RECORDS.length}</span> — Payroll Verification(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              disabled={selected === null}
              onClick={handleViewClick}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead>
              {/* Column labels */}
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[4%]">#</th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[30%]">Account Category Code / Name <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[10%]">Year <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[13%]">Month <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[13%]">Created Date <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[16%]">Status <SortIcon /></th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-white w-[7%]">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-2 pb-2"></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <input value={fCode} onChange={e => { setFCode(e.target.value); setPage(1); }} className={inp} />
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <input value={fYear} onChange={e => { setFYear(e.target.value); setPage(1); }} className={inp} />
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fMonth} onChange={e => { setFMonth(e.target.value); setPage(1); }} className={sel}>
                    <option value="">Select</option>
                    {MONTHS_LIST.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <div className="flex items-center gap-1">
                    <input value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }} placeholder="dd-MMM" className={`${inp} flex-1`} />
                    <svg className="size-4 flex-shrink-0 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }} className={sel}>
                    <option value="">Select</option>
                    <option value="FINAL_APPROVED">FINAL APPROVED</option>
                  </select>
                </th>
                <th className="px-2 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">No records found.</td></tr>
              ) : pageData.map((r, i) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={`cursor-pointer border-b border-stroke dark:border-dark-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 ${selected === r.id ? "bg-[#e8f4f0] dark:bg-[#1a3d35]" : i % 2 === 1 ? "bg-gray-50/50" : ""}`}
                >
                  <td className="px-3 py-2.5 text-center text-xs text-gray-600 dark:text-gray-400">
                    {(page - 1) * perPage + i + 1}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-700 dark:text-gray-300">{r.accountCode}</td>
                  <td className="px-3 py-2.5 text-center text-xs text-gray-700 dark:text-gray-300">{r.year}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-700 dark:text-gray-300">{r.month}</td>
                  <td className="px-3 py-2.5 text-center text-xs text-gray-700 dark:text-gray-300">{r.createdDate}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className="inline-block rounded bg-[#28a745] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      FINAL APPROVED
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <input
                      type="radio"
                      checked={selected === r.id}
                      onChange={() => setSelected(r.id)}
                      className="accent-[#2d8f7b] size-4"
                      onClick={e => e.stopPropagation()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ({page} of {totalPages}) &nbsp;
            Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex flex-wrap items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">|◄</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">◄</button>
            {visiblePages(page, totalPages).map((p, idx) =>
              p === "…"
                ? <span key={`e${idx}`} className="flex size-7 items-center justify-center text-xs text-gray-400">…</span>
                : <button key={p} onClick={() => setPage(p as number)}
                    className={`flex size-7 items-center justify-center rounded border text-xs ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-gray-700"}`}>
                    {p}
                  </button>
            )}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">►</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">►|</button>
            <select
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="h-7 rounded border border-stroke px-1 text-xs dark:border-dark-3 dark:bg-gray-dark"
            >
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* View Payroll — Password Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Payroll</h3>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Secondary Password <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                {/* Key icon box */}
                <span className="flex h-[42px] w-10 flex-shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-gray-700">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setPwdError(""); }}
                  onKeyDown={e => e.key === "Enter" && handlePasswordSubmit()}
                  autoFocus
                  className="h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>
              {pwdError && <p className="mt-1.5 text-xs text-red-500">{pwdError}</p>}

              {/* Modal Footer */}
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
