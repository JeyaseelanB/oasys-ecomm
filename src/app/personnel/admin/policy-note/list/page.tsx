"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number; referenceNumber: string; govRefNo: string; govRefDate: string;
  period: string; dueDate: string; department: string; status: string;
}[] = [
  { id: 1,  referenceNumber: "PN2025045", govRefNo: "11035", govRefDate: "18-Apr-2025", period: "2025-2026", dueDate: "18-Apr-2025", department: "ADMIN",     status: "INITIATED"      },
  { id: 2,  referenceNumber: "PN2024044", govRefNo: "11034", govRefDate: "02-Sep-2024", period: "2024-2025", dueDate: "09-Sep-2024", department: "ADMIN",     status: "FINAL APPROVED" },
  { id: 3,  referenceNumber: "PN2020043", govRefNo: "11023", govRefDate: "21-Oct-2020", period: "2020-2021", dueDate: "31-Oct-2020", department: "ADMIN",     status: "INITIATED"      },
  { id: 4,  referenceNumber: "PN2018041", govRefNo: "11020", govRefDate: "28-Sep-2018", period: "2018-2019", dueDate: "30-Sep-2018", department: "ADMIN",     status: "FINAL APPROVED" },
  { id: 5,  referenceNumber: "PN2018040", govRefNo: "11091", govRefDate: "31-Aug-2018", period: "2018-2019", dueDate: "21-Sep-2018", department: "MARKETING", status: "INITIATED"      },
  { id: 6,  referenceNumber: "PN2018039", govRefNo: "11090", govRefDate: "31-Aug-2018", period: "2018-2019", dueDate: "31-Aug-2018", department: "ADMIN",     status: "FINAL APPROVED" },
  { id: 7,  referenceNumber: "PN2018038", govRefNo: "11089", govRefDate: "31-Aug-2018", period: "2018-2019", dueDate: "31-Aug-2018", department: "ADMIN",     status: "INITIATED"      },
  { id: 8,  referenceNumber: "PN2018037", govRefNo: "11079", govRefDate: "22-Aug-2018", period: "2018-2019", dueDate: "31-Aug-2018", department: "MARKETING", status: "SUBMITTED"      },
  { id: 9,  referenceNumber: "PN2018036", govRefNo: "11006", govRefDate: "20-Aug-2018", period: "2018-2019", dueDate: "31-Aug-2018", department: "ADMIN",     status: "FINAL APPROVED" },
  { id: 10, referenceNumber: "PN2018035", govRefNo: "11075", govRefDate: "18-Aug-2018", period: "2018-2019", dueDate: "18-Aug-2018", department: "TECHNICAL", status: "SUBMITTED"      },
];

const TOTAL = 10;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const PERIOD_OPTIONS   = ["2025-2026","2024-2025","2023-2024","2022-2023","2021-2022","2020-2021","2019-2020","2018-2019"];
const DEPT_OPTIONS     = ["ADMIN","MARKETING","TECHNICAL","FINANCE","HR","OPERATIONS"];
const STATUS_OPTIONS   = ["INITIATED","SUBMITTED","FINAL APPROVED"];

const statusCls = (s: string) =>
  s === "FINAL APPROVED" ? "bg-[#28a745]" :
  s === "SUBMITTED"      ? "bg-[#fd7e14]" :
                           "bg-[#6c757d]";

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc"|"desc" }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir==="asc"?"▲":"▼") : "▲"}</span>
);
const CalIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function PolicyNoteListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc"|"desc">("asc");

  const [fRef,    setFRef]    = useState("");
  const [fGovNo,  setFGovNo]  = useState("");
  const [fDate,   setFDate]   = useState("");
  const [fPeriod, setFPeriod] = useState("");
  const [fDue,    setFDue]    = useState("");
  const [fDept,   setFDept]   = useState("");
  const [fStatus, setFStatus] = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fRef    || r.referenceNumber.toLowerCase().includes(fRef.toLowerCase())) &&
    (!fGovNo  || r.govRefNo.includes(fGovNo)) &&
    (!fDate   || r.govRefDate.includes(fDate)) &&
    (!fPeriod || r.period === fPeriod) &&
    (!fDue    || r.dueDate.includes(fDue)) &&
    (!fDept   || r.department === fDept) &&
    (!fStatus || r.status === fStatus)
  ), [fRef, fGovNo, fDate, fPeriod, fDue, fDept, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string|number => sortCol==="id" ? r.id : (r as Record<string,unknown>)[sortCol] as string;
    const av=v(a), bv=v(b);
    return sortDir==="asc" ? (av>bv?1:av<bv?-1:0) : (av<bv?1:av>bv?-1:0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page-1)*pageSize, page*pageSize);

  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x!==id) : [...s, id]);

  const visiblePages = (): (number|"…")[] => {
    if (totalPages<=7) return Array.from({length:totalPages},(_,i)=>i+1);
    if (page<=4) return [1,2,3,4,5,"…",totalPages];
    if (page>=totalPages-3) return [1,"…",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,"…",page-1,page,page+1,"…",totalPages];
  };

  const thBase = "border-r border-[#3aa88f] px-2 pt-2 pb-1 text-left text-xs font-semibold text-white";
  const fi = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Policy Note List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Policy Note List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL} - Policy Note(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => router.push("/personnel/admin/policy-note/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button onClick={() => selected.length===1 && router.push("/personnel/admin/policy-note/process")}
              disabled={selected.length!==1}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              Policy Note Process
            </button>
            <button onClick={() => selected.length===1 && router.push("/personnel/admin/policy-note/edit")}
              disabled={selected.length!==1}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={() => selected.length===1 && router.push("/personnel/admin/policy-note/view")}
              disabled={selected.length!==1}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={() => selected.length===1 && setDeleteId(selected[0])}
              disabled={selected.length!==1}
              className="flex items-center gap-1.5 rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Delete
            </button>
            <button onClick={() => { clearSelect(); setFRef(""); setFGovNo(""); setFDate(""); setFPeriod(""); setFDue(""); setFDept(""); setFStatus(""); setPage(1); }}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-2 pt-2 pb-1 text-center text-xs font-semibold text-white w-10">
                  #<div className="mt-1 h-[26px]" />
                </th>
                <th className={thBase} onClick={() => handleSort("referenceNumber")} style={{cursor:"pointer"}}>
                  Reference Number <SortIcon active={sortCol==="referenceNumber"} dir={sortDir} />
                  <input value={fRef} onChange={e=>{setFRef(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("govRefNo")} style={{cursor:"pointer"}}>
                  Government Reference No. <SortIcon active={sortCol==="govRefNo"} dir={sortDir} />
                  <input value={fGovNo} onChange={e=>{setFGovNo(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("govRefDate")} style={{cursor:"pointer"}}>
                  Government Reference Date <SortIcon active={sortCol==="govRefDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDate} onChange={e=>{setFDate(e.target.value);setPage(1);}} placeholder="dd-MMM-yyyy" onClick={e=>e.stopPropagation()} className={`${fi} mt-0 pr-6`} />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("period")} style={{cursor:"pointer"}}>
                  Period <SortIcon active={sortCol==="period"} dir={sortDir} />
                  <select value={fPeriod} onChange={e=>{setFPeriod(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {PERIOD_OPTIONS.map(o=><option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className={thBase} onClick={() => handleSort("dueDate")} style={{cursor:"pointer"}}>
                  Due Date <SortIcon active={sortCol==="dueDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDue} onChange={e=>{setFDue(e.target.value);setPage(1);}} placeholder="dd-MMM-yyyy" onClick={e=>e.stopPropagation()} className={`${fi} mt-0 pr-6`} />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("department")} style={{cursor:"pointer"}}>
                  Department <SortIcon active={sortCol==="department"} dir={sortDir} />
                  <select value={fDept} onChange={e=>{setFDept(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {DEPT_OPTIONS.map(o=><option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className={thBase} onClick={() => handleSort("status")} style={{cursor:"pointer"}}>
                  Status <SortIcon active={sortCol==="status"} dir={sortDir} />
                  <select value={fStatus} onChange={e=>{setFStatus(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map(o=><option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className="px-2 pt-2 pb-1 text-center text-xs font-semibold text-white">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length===0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-2 py-2 text-center text-xs text-gray-500">{(page-1)*pageSize+idx+1}</td>
                  <td className="px-2 py-2 text-xs font-medium text-[#2d8f7b]">{row.referenceNumber}</td>
                  <td className="px-2 py-2 text-xs text-[#2d8f7b]">{row.govRefNo}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.govRefDate}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.period}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.dueDate}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.department}</td>
                  <td className="px-2 py-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${statusCls(row.status)}`}>{row.status}</span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <input type="radio" name="selectRow" checked={selected.includes(row.id)}
                      onChange={() => { clearSelect(); toggleSelect(row.id); }} className="accent-[#2d8f7b]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>({page} of {totalPages})</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page===1} className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">«</button>
            <button onClick={() => setPage(p=>p-1)} disabled={page===1} className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">‹</button>
            {visiblePages().map((p,i) =>
              p==="…" ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
              : <button key={p} onClick={() => setPage(p as number)}
                  className={`rounded border px-2.5 py-1 text-xs ${page===p?"border-[#2d8f7b] bg-[#2d8f7b] text-white":"border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-gray-700"}`}>{p}</button>
            )}
            <button onClick={() => setPage(p=>p+1)} disabled={page===totalPages} className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page===totalPages} className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">»</button>
            <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value));setPage(1);}}
              className="ml-1 rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZE_OPTIONS.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteId!==null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm overflow-hidden rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Confirm Delete</h3>
              <button onClick={() => setDeleteId(null)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">Are you sure you want to delete this record?</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDeleteId(null)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  No
                </button>
                <button onClick={() => { setDeleteId(null); clearSelect(); }}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
