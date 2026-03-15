"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

type EADRecord = {
  id: number;
  entity: string;
  department: string;
  section: string;
  type: string;
  payAspect: string;
  year: number;
  month: number;
  status: "FINAL_APPROVED" | "REJECTED" | "INPROGRESS" | "APPROVED";
};

const STATUS_STYLE: Record<string, string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  APPROVED:       "bg-[#28a745] text-white",
  REJECTED:       "bg-[#dc3545] text-white",
  INPROGRESS:     "bg-[#6c757d] text-white",
};

const STATUS_LABEL: Record<string, string> = {
  FINAL_APPROVED: "FINAL APPROVED",
  APPROVED:       "APPROVED",
  REJECTED:       "REJECTED",
  INPROGRESS:     "INPROGRESS",
};

const RECORDS: EADRecord[] = [
  { id:1,  entity:"HEAD OFFICE", department:"ADMIN",     section:"Internal Audit Wing",     type:"BFBF",                    payAspect:"Allowance", year:2026, month:1,  status:"FINAL_APPROVED" },
  { id:2,  entity:"HEAD OFFICE", department:"TECHNICAL", section:"Product Development",     type:"ISA",                     payAspect:"Allowance", year:2023, month:12, status:"FINAL_APPROVED" },
  { id:3,  entity:"HEAD OFFICE", department:"ADMIN",     section:"Admin",                   type:"12SSO1(CUDDALORE)",        payAspect:"Earnings",  year:2024, month:4,  status:"REJECTED" },
  { id:4,  entity:"HEAD OFFICE", department:"ADMIN",     section:"Admin",                   type:"12SSO1(CUDDALORE)",        payAspect:"Allowance", year:2024, month:4,  status:"FINAL_APPROVED" },
  { id:5,  entity:"HEAD OFFICE", department:"MARKETING", section:"Export",                  type:"CPA",                     payAspect:"Allowance", year:2024, month:2,  status:"FINAL_APPROVED" },
  { id:6,  entity:"HEAD OFFICE", department:"ADMIN",     section:"Admin",                   type:"GRATUITY DEPOSIT",        payAspect:"Deduction", year:2024, month:2,  status:"FINAL_APPROVED" },
  { id:7,  entity:"HEAD OFFICE", department:"ADMIN",     section:"Contract section",        type:"VOLUNTARY PROVIDENT FUND",payAspect:"Deduction", year:2024, month:2,  status:"FINAL_APPROVED" },
  { id:8,  entity:"HEAD OFFICE", department:"ADMIN",     section:"PRODUCTION WING",         type:"INCOME TAX- STAFF",       payAspect:"Deduction", year:2024, month:2,  status:"FINAL_APPROVED" },
  { id:9,  entity:"HEAD OFFICE", department:"ADMIN",     section:"Admin",                   type:"CAR EXPENSES",            payAspect:"Deduction", year:2024, month:2,  status:"FINAL_APPROVED" },
  { id:10, entity:"HEAD OFFICE", department:"FINANCE",   section:"Silk and Handloom",       type:"SILK AND COTTON BONUS",   payAspect:"Earnings",  year:2024, month:3,  status:"FINAL_APPROVED" },
  { id:11, entity:"HEAD OFFICE", department:"MARKETING", section:"Sales",                   type:"INCENTIVE",               payAspect:"Allowance", year:2025, month:6,  status:"INPROGRESS" },
  { id:12, entity:"HEAD OFFICE", department:"HR",        section:"Recruitment",             type:"MEDICAL REIMBURSEMENT",   payAspect:"Earnings",  year:2025, month:8,  status:"APPROVED" },
];

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

export default function EADListPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage]         = useState(1);
  const PER_PAGE = 10;

  const [fEntity,    setFEntity]    = useState("");
  const [fDept,      setFDept]      = useState("");
  const [fSection,   setFSection]   = useState("");
  const [fType,      setFType]      = useState("");
  const [fPayAspect, setFPayAspect] = useState("");
  const [fYear,      setFYear]      = useState("");
  const [fMonth,     setFMonth]     = useState("");
  const [fStatus,    setFStatus]    = useState("");

  const filtered = useMemo(() => RECORDS.filter(r => {
    if (fEntity    && !r.entity.toLowerCase().includes(fEntity.toLowerCase()))    return false;
    if (fDept      && !r.department.toLowerCase().includes(fDept.toLowerCase()))  return false;
    if (fSection   && !r.section.toLowerCase().includes(fSection.toLowerCase()))  return false;
    if (fType      && !r.type.toLowerCase().includes(fType.toLowerCase()))        return false;
    if (fPayAspect && r.payAspect !== fPayAspect)                                 return false;
    if (fYear      && String(r.year) !== fYear)                                   return false;
    if (fMonth     && String(r.month) !== fMonth)                                 return false;
    if (fStatus    && r.status !== fStatus)                                       return false;
    return true;
  }), [fEntity, fDept, fSection, fType, fPayAspect, fYear, fMonth, fStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageData   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => {
    setFEntity(""); setFDept(""); setFSection(""); setFType("");
    setFPayAspect(""); setFYear(""); setFMonth(""); setFStatus("");
    setSelected(null); setPage(1);
  };

  const inputCls = "h-7 w-full rounded border border-white/40 bg-white/20 px-1.5 text-xs text-white placeholder-white/60 focus:outline-none focus:border-white/80";
  const selectCls = "h-7 w-full rounded border border-white/40 bg-white/20 px-1 text-xs text-white focus:outline-none";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Employee Additional Earnings / Deduction List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Employee Additional Earnings / Deduction List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-[#2d8f7b]">{RECORDS.length}</span> — Employee Additional Earnings / Deduction(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/additional-earnings-deduction/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Add
            </button>
            <button
              disabled={selected === null}
              onClick={() => selected !== null && router.push("/personnel/human-resource/pay-roll/additional-earnings-deduction/edit")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              disabled={selected === null}
              onClick={() => selected !== null && router.push("/personnel/human-resource/pay-roll/additional-earnings-deduction/view")}
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
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              {/* Column labels */}
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[4%]">#</th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[12%]">Entity <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[11%]">Department <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[13%]">Section <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[15%]">Type <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[10%]">Pay Aspect <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[6%]">Year <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[6%]">Month <SortIcon /></th>
                <th className="border-r border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white w-[14%]">Status <SortIcon /></th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-white w-[5%]">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-2 pb-2"></th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <input value={fEntity} onChange={e => { setFEntity(e.target.value); setPage(1); }} placeholder="" className={inputCls} />
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fDept} onChange={e => { setFDept(e.target.value); setPage(1); }} className={selectCls}>
                    <option value="">Select</option>
                    {["ADMIN","TECHNICAL","MARKETING","FINANCE","HR"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fSection} onChange={e => { setFSection(e.target.value); setPage(1); }} className={selectCls}>
                    <option value="">Select</option>
                    {["Admin","Contract section","Export","Internal Audit Wing","Product Development","PRODUCTION WING","Recruitment","Sales","Silk and Handloom"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <input value={fType} onChange={e => { setFType(e.target.value); setPage(1); }} placeholder="" className={inputCls} />
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fPayAspect} onChange={e => { setFPayAspect(e.target.value); setPage(1); }} className={selectCls}>
                    <option value="">Select</option>
                    {["Allowance","Deduction","Earnings"].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <input value={fYear} onChange={e => { setFYear(e.target.value); setPage(1); }} placeholder="" className={inputCls} />
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <input value={fMonth} onChange={e => { setFMonth(e.target.value); setPage(1); }} placeholder="" className={inputCls} />
                </th>
                <th className="border-r border-[#3aa88f] px-2 pb-2">
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }} className={selectCls}>
                    <option value="">Select</option>
                    <option value="FINAL_APPROVED">FINAL APPROVED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="INPROGRESS">INPROGRESS</option>
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
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.entity}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.department}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.section}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.type}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.payAspect}</td>
                  <td className="px-3 py-2 text-center text-xs text-gray-700 dark:text-gray-300">{r.year}</td>
                  <td className="px-3 py-2 text-center text-xs text-gray-700 dark:text-gray-300">{r.month}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[r.status]}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
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
            Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} records
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">«</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">‹</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…"
                ? <span key={`e${i}`} className="flex size-7 items-center justify-center text-xs text-gray-400">…</span>
                : <button key={p} onClick={() => setPage(p as number)} className={`flex size-7 items-center justify-center rounded border text-xs ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-gray-700"}`}>{p}</button>
            )}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
