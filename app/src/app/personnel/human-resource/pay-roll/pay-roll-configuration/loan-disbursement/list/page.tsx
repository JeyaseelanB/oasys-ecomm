"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

type LoanRecord = {
  id: number;
  refNo: string;
  empCode: string;
  empName: string;
  loanAdvance: "Loan" | "Advance" | "Recovery";
  loanType: string;
  amount: number;
  createdDate: string;
  status: "LOAN_DISBURSED" | "ADVANCE_DISBURSED" | "RECOVERY_DISBURSED";
};

const STATUS_STYLE: Record<string, string> = {
  LOAN_DISBURSED:     "bg-[#007bff] text-white",
  ADVANCE_DISBURSED:  "bg-[#fd7e14] text-white",
  RECOVERY_DISBURSED: "bg-[#2d8f7b] text-white",
};
const STATUS_LABEL: Record<string, string> = {
  LOAN_DISBURSED:     "LOAN DISBURSED",
  ADVANCE_DISBURSED:  "ADVANCE DISBURSED",
  RECOVERY_DISBURSED: "RECOVERY DISBURSED",
};

const RECORDS: LoanRecord[] = [
  { id:1,  refNo:"LRF6883", empCode:"33",  empName:"KARTHIK",     loanAdvance:"Recovery", loanType:"SDF3",            amount:10000.00,  createdDate:"20-Aug-2024", status:"RECOVERY_DISBURSED" },
  { id:2,  refNo:"LRF6882", empCode:"780", empName:"PADMANABAN",  loanAdvance:"Recovery", loanType:"SDF1",            amount:20000.00,  createdDate:"20-Aug-2024", status:"RECOVERY_DISBURSED" },
  { id:3,  refNo:"LRF6881", empCode:"165", empName:"MANGALAM",    loanAdvance:"Advance",  loanType:"FESTIVALADVANCE", amount:10000.00,  createdDate:"20-Aug-2024", status:"ADVANCE_DISBURSED"  },
  { id:4,  refNo:"LRF5106", empCode:"911", empName:"BOOPATHI",    loanAdvance:"Loan",     loanType:"BTF Special loan",amount:24000.00,  createdDate:"27-Sep-2022", status:"LOAN_DISBURSED"     },
  { id:5,  refNo:"LRF6880", empCode:"165", empName:"MANGALAM",    loanAdvance:"Loan",     loanType:"BTF-2",           amount:100000.00, createdDate:"12-Aug-2024", status:"LOAN_DISBURSED"     },
  { id:6,  refNo:"LRF6873", empCode:"734", empName:"RAJESHWARI",  loanAdvance:"Recovery", loanType:"CSD2",            amount:1286.00,   createdDate:"28-Feb-2024", status:"RECOVERY_DISBURSED" },
  { id:7,  refNo:"LRF6876", empCode:"717", empName:"GANAPATHY",   loanAdvance:"Recovery", loanType:"CSD2",            amount:40183.00,  createdDate:"28-Feb-2024", status:"RECOVERY_DISBURSED" },
  { id:8,  refNo:"LRF6875", empCode:"381", empName:"MURUGAN",     loanAdvance:"Recovery", loanType:"CSD2",            amount:57292.00,  createdDate:"28-Feb-2024", status:"RECOVERY_DISBURSED" },
  { id:9,  refNo:"LRF6874", empCode:"699", empName:"ARULSELVI",   loanAdvance:"Recovery", loanType:"CSD2",            amount:1286.00,   createdDate:"28-Feb-2024", status:"RECOVERY_DISBURSED" },
  { id:10, refNo:"LRF6872", empCode:"487", empName:"ABIRAMI",     loanAdvance:"Recovery", loanType:"CRSGOV20-21",     amount:2735.00,   createdDate:"27-Feb-2024", status:"RECOVERY_DISBURSED" },
  { id:11, refNo:"LRF6870", empCode:"210", empName:"SELVARAJ",    loanAdvance:"Loan",     loanType:"BTF-1",           amount:50000.00,  createdDate:"15-Jan-2024", status:"LOAN_DISBURSED"     },
  { id:12, refNo:"LRF6869", empCode:"345", empName:"VIJAYALAKSHMI",loanAdvance:"Advance", loanType:"MEDICALADVANCE",  amount:15000.00,  createdDate:"10-Jan-2024", status:"ADVANCE_DISBURSED"  },
  { id:13, refNo:"LRF6868", empCode:"512", empName:"KRISHNASWAMY",loanAdvance:"Recovery", loanType:"BTF-1",           amount:3500.00,   createdDate:"05-Jan-2024", status:"RECOVERY_DISBURSED" },
  { id:14, refNo:"LRF6867", empCode:"88",  empName:"SUNDARAM",    loanAdvance:"Loan",     loanType:"HBA",             amount:200000.00, createdDate:"01-Dec-2023", status:"LOAN_DISBURSED"     },
  { id:15, refNo:"LRF6866", empCode:"623", empName:"NIRMALA",     loanAdvance:"Advance",  loanType:"FESTIVALADVANCE", amount:8000.00,   createdDate:"28-Nov-2023", status:"ADVANCE_DISBURSED"  },
];

const fmt = (n: number) => n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const SortIcon = () => (
  <svg className="inline-block size-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
  </svg>
);

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function LoanDisbursementListPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [page,     setPage]     = useState(1);
  const PER_PAGE = 10;

  const [fRef,    setFRef]    = useState("");
  const [fCode,   setFCode]   = useState("");
  const [fName,   setFName]   = useState("");
  const [fLoan,   setFLoan]   = useState("");
  const [fType,   setFType]   = useState("");
  const [fAmt,    setFAmt]    = useState("");
  const [fDate,   setFDate]   = useState("");
  const [fStatus, setFStatus] = useState("");

  const filtered = useMemo(() => RECORDS.filter(r => {
    if (fRef    && !r.refNo.toLowerCase().includes(fRef.toLowerCase()))       return false;
    if (fCode   && !r.empCode.includes(fCode))                                return false;
    if (fName   && !r.empName.toLowerCase().includes(fName.toLowerCase()))    return false;
    if (fLoan   && r.loanAdvance !== fLoan)                                   return false;
    if (fType   && !r.loanType.toLowerCase().includes(fType.toLowerCase()))   return false;
    if (fAmt    && !String(r.amount).includes(fAmt))                          return false;
    if (fDate   && !r.createdDate.toLowerCase().includes(fDate.toLowerCase()))return false;
    if (fStatus && r.status !== fStatus)                                      return false;
    return true;
  }), [fRef, fCode, fName, fLoan, fType, fAmt, fDate, fStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageData   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => {
    setFRef(""); setFCode(""); setFName(""); setFLoan("");
    setFType(""); setFAmt(""); setFDate(""); setFStatus("");
    setSelected(null); setPage(1);
  };

  const inp = "h-7 w-full rounded border border-white/40 bg-white/20 px-1.5 text-xs text-white placeholder-white/60 focus:outline-none focus:border-white/80";
  const sel = "h-7 w-full rounded border border-white/40 bg-white/20 px-1 text-xs text-white focus:outline-none";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Loan Disbursement List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Loan Disbursement List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-[#2d8f7b]">{RECORDS.length}</span> — Loan Disbursement(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/loan-disbursement/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Loan Disbursement
            </button>
            <button
              disabled={selected === null}
              onClick={() => selected !== null && router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/loan-disbursement/view")}
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
          <table className="w-full min-w-[950px] text-sm">
            <thead>
              {/* Column headers */}
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[3%]">#</th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[9%]">Reference No. <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[8%]">Employee Code <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[12%]">Employee Name <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[9%]">Loan / Advance <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[13%]">Loan / Advance Type <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[10%]">Loan / Advance Amount (₹) <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[10%]">Created Date <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[14%]">Status <SortIcon /></th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-white w-[5%]">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-2 pb-2"></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2"><input value={fRef}  onChange={e=>{setFRef(e.target.value);setPage(1)}}  className={inp} /></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2"><input value={fCode} onChange={e=>{setFCode(e.target.value);setPage(1)}} className={inp} /></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2"><input value={fName} onChange={e=>{setFName(e.target.value);setPage(1)}} className={inp} /></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fLoan} onChange={e=>{setFLoan(e.target.value);setPage(1)}} className={sel}>
                    <option value="">Se</option>
                    {["Loan","Advance","Recovery"].map(v=><option key={v} value={v}>{v}</option>)}
                  </select>
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2"><input value={fType} onChange={e=>{setFType(e.target.value);setPage(1)}} className={inp} /></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2"><input value={fAmt}  onChange={e=>{setFAmt(e.target.value);setPage(1)}}  className={inp} /></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <div className="flex items-center gap-1">
                    <input value={fDate} onChange={e=>{setFDate(e.target.value);setPage(1)}} placeholder="dd-MMM" className={`${inp} flex-1`} />
                    <svg className="size-4 flex-shrink-0 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fStatus} onChange={e=>{setFStatus(e.target.value);setPage(1)}} className={sel}>
                    <option value="">Select</option>
                    <option value="LOAN_DISBURSED">LOAN DISBURSED</option>
                    <option value="ADVANCE_DISBURSED">ADVANCE DISBURSED</option>
                    <option value="RECOVERY_DISBURSED">RECOVERY DISBURSED</option>
                  </select>
                </th>
                <th className="px-2 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-6 text-center text-sm text-gray-500">No records found.</td></tr>
              ) : pageData.map((r, i) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={`cursor-pointer border-b border-stroke dark:border-dark-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 ${selected === r.id ? "bg-[#e8f4f0] dark:bg-[#1a3d35]" : i % 2 === 1 ? "bg-gray-50/50" : ""}`}
                >
                  <td className="px-3 py-2 text-center text-xs text-gray-600 dark:text-gray-400">{(page - 1) * PER_PAGE + i + 1}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.refNo}</td>
                  <td className="px-3 py-2 text-center text-xs text-gray-700 dark:text-gray-300">{r.empCode}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.empName}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.loanAdvance}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.loanType}</td>
                  <td className="px-3 py-2 text-right text-xs text-gray-700 dark:text-gray-300">{fmt(r.amount)}</td>
                  <td className="px-3 py-2 text-center text-xs text-gray-700 dark:text-gray-300">{r.createdDate}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[r.status]}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input type="radio" checked={selected === r.id} onChange={() => setSelected(r.id)}
                      className="accent-[#2d8f7b] size-4" onClick={e => e.stopPropagation()} />
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
            Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex flex-wrap items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">|◄</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">◄</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…"
                ? <span key={`e${i}`} className="flex size-7 items-center justify-center text-xs text-gray-400">…</span>
                : <button key={p} onClick={() => setPage(p as number)} className={`flex size-7 items-center justify-center rounded border text-xs ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-gray-700"}`}>{p}</button>
            )}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">►</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex h-7 items-center justify-center rounded border border-stroke px-2 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">►|</button>
            <select className="h-7 rounded border border-stroke px-1 text-xs dark:border-dark-3 dark:bg-gray-dark">
              {[10,25,50,100].map(n=><option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
