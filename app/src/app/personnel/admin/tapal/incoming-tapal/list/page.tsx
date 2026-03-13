"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number;
  referenceNumber: string;
  receivedDate: string;
  tapalType: string;
  toWhom: string;
  senderName: string;
  senderEntity: string;
  createdDate: string;
  status: string;
}[] = [
  { id:  1, referenceNumber: "R10Y2024-00002", receivedDate: "08-Nov-2024", tapalType: "Registered Post", toWhom: "Individual",  senderName: "aba",                 senderEntity: "",            createdDate: "25-Nov-2024", status: "SUBMITTED" },
  { id:  2, referenceNumber: "R10Y2024-00001", receivedDate: "03-May-2024", tapalType: "Courier",          toWhom: "Individual",  senderName: "fgghh",               senderEntity: "",            createdDate: "06-May-2024", status: "SUBMITTED" },
  { id:  3, referenceNumber: "R10Y2022-01346", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "K. PRAKASH BANGLORE", senderEntity: "",            createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id:  4, referenceNumber: "R10Y2022-01345", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "CUDDALORE",   createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id:  5, referenceNumber: "R10Y2022-01344", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "TIRUNELVELI", createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id:  6, referenceNumber: "R10Y2022-01343", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "MADURAI",     createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id:  7, referenceNumber: "R10Y2022-01342", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "CHENNAI",     createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id:  8, referenceNumber: "R10Y2022-01341", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "VIJAYAWADA",  createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id:  9, referenceNumber: "R10Y2022-01340", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "CUDDALORE",   createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id: 10, referenceNumber: "R10Y2022-01339", receivedDate: "28-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "MADURAI",     createdDate: "02-Sep-2022", status: "SUBMITTED" },
  { id: 11, referenceNumber: "R10Y2022-01338", receivedDate: "27-Jun-2022", tapalType: "Hand Delivery",    toWhom: "Individual",  senderName: "RAJAN S",             senderEntity: "",            createdDate: "01-Sep-2022", status: "SUBMITTED" },
  { id: 12, referenceNumber: "R10Y2022-01337", receivedDate: "27-Jun-2022", tapalType: "Courier",          toWhom: "Department",  senderName: "",                    senderEntity: "COIMBATORE",  createdDate: "01-Sep-2022", status: "SUBMITTED" },
  { id: 13, referenceNumber: "R10Y2022-01336", receivedDate: "26-Jun-2022", tapalType: "Registered Post",  toWhom: "Department",  senderName: "STATE BANK OF INDIA", senderEntity: "CHENNAI",     createdDate: "31-Aug-2022", status: "FINAL-APPROVED" },
  { id: 14, referenceNumber: "R10Y2022-01335", receivedDate: "25-Jun-2022", tapalType: "Speed Post",       toWhom: "Individual",  senderName: "KUMAR R",             senderEntity: "",            createdDate: "30-Aug-2022", status: "SUBMITTED" },
  { id: 15, referenceNumber: "R10Y2022-01334", receivedDate: "24-Jun-2022", tapalType: "Fax",              toWhom: "Department",  senderName: "",                    senderEntity: "TIRUPUR",     createdDate: "29-Aug-2022", status: "FINAL-APPROVED" },
];

const TOTAL = 11193;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const STATUS_OPTIONS = ["SUBMITTED", "FINAL-APPROVED"];
const TAPAL_TYPES = ["Courier", "Registered Post", "Speed Post", "Hand Delivery", "Fax", "Email"];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);

const CalIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function IncomingTapalListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");

  const [fRefNum,   setFRefNum]   = useState("");
  const [fRecDate,  setFRecDate]  = useState("");
  const [fType,     setFType]     = useState("");
  const [fToWhom,   setFToWhom]   = useState("");
  const [fSendName, setFSendName] = useState("");
  const [fSendEnt,  setFSendEnt]  = useState("");
  const [fCrtDate,  setFCrtDate]  = useState("");
  const [fStatus,   setFStatus]   = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fRefNum   || r.referenceNumber.toLowerCase().includes(fRefNum.toLowerCase())) &&
    (!fRecDate  || r.receivedDate.includes(fRecDate)) &&
    (!fType     || r.tapalType === fType) &&
    (!fToWhom   || r.toWhom.toLowerCase().includes(fToWhom.toLowerCase())) &&
    (!fSendName || r.senderName.toLowerCase().includes(fSendName.toLowerCase())) &&
    (!fSendEnt  || r.senderEntity.toLowerCase().includes(fSendEnt.toLowerCase())) &&
    (!fCrtDate  || r.createdDate.includes(fCrtDate)) &&
    (!fStatus   || r.status === fStatus)
  ), [fRefNum, fRecDate, fType, fToWhom, fSendName, fSendEnt, fCrtDate, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string | number => sortCol === "id" ? r.id : (r as Record<string, unknown>)[sortCol] as string;
    const av = v(a), bv = v(b);
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const clearAll = () => {
    clearSelect();
    setFRefNum(""); setFRecDate(""); setFType(""); setFToWhom("");
    setFSendName(""); setFSendEnt(""); setFCrtDate(""); setFStatus("");
    setPage(1);
  };

  const visiblePages = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  const thBase = "border-r border-[#3aa88f] px-3 pt-2 pb-1 text-center text-xs font-semibold text-white";
  const fi     = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";
  const statusBadge = (s: string) => s === "SUBMITTED" ? "bg-[#fd7e14]" : "bg-[#28a745]";

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Incoming Tapal List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Incoming Tapal List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL.toLocaleString("en-IN")} - Incoming Tapal (s)</p>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/personnel/admin/tapal/incoming-tapal/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/personnel/admin/tapal/incoming-tapal/view")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/personnel/admin/tapal/incoming-tapal/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={clearAll}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
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
                <th className={thBase} onClick={() => handleSort("referenceNumber")} style={{ cursor: "pointer" }}>
                  Reference Number <SortIcon active={sortCol === "referenceNumber"} dir={sortDir} />
                  <input value={fRefNum} onChange={e => { setFRefNum(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("receivedDate")} style={{ cursor: "pointer" }}>
                  Received Date <SortIcon active={sortCol === "receivedDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fRecDate} onChange={e => { setFRecDate(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" onClick={e => e.stopPropagation()} className="w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 pr-6 text-xs text-white placeholder-white/50 focus:outline-none" />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("tapalType")} style={{ cursor: "pointer" }}>
                  Tapal Type <SortIcon active={sortCol === "tapalType"} dir={sortDir} />
                  <select value={fType} onChange={e => { setFType(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {TAPAL_TYPES.map(t => <option key={t} value={t} className="text-dark">{t}</option>)}
                  </select>
                </th>
                <th className={thBase} onClick={() => handleSort("toWhom")} style={{ cursor: "pointer" }}>
                  To Whom <SortIcon active={sortCol === "toWhom"} dir={sortDir} />
                  <input value={fToWhom} onChange={e => { setFToWhom(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("senderName")} style={{ cursor: "pointer" }}>
                  Sender Name <SortIcon active={sortCol === "senderName"} dir={sortDir} />
                  <input value={fSendName} onChange={e => { setFSendName(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("senderEntity")} style={{ cursor: "pointer" }}>
                  Sender Entity <SortIcon active={sortCol === "senderEntity"} dir={sortDir} />
                  <input value={fSendEnt} onChange={e => { setFSendEnt(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("createdDate")} style={{ cursor: "pointer" }}>
                  Created Date <SortIcon active={sortCol === "createdDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fCrtDate} onChange={e => { setFCrtDate(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" onClick={e => e.stopPropagation()} className="w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 pr-6 text-xs text-white placeholder-white/50 focus:outline-none" />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortIcon active={sortCol === "status"} dir={sortDir} />
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map(o => <option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className="px-2 pt-2 pb-1 text-center text-xs font-semibold text-white w-16">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-2 py-2 text-center text-xs text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-3 py-2 text-xs text-center">
                    <button
                      onClick={() => { clearSelect(); toggleSelect(row.id); router.push("/personnel/admin/tapal/incoming-tapal/view"); }}
                      className="text-[#2d8f7b] hover:underline font-medium">
                      {row.referenceNumber}
                    </button>
                  </td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.receivedDate}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.tapalType}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.toWhom}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.senderName}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.senderEntity}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.createdDate}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-block rounded px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${statusBadge(row.status)}`}>
                      {row.status}
                    </span>
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

        {/* Footer / Pagination */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <span className="text-xs text-gray-500">({page} of {totalPages})</span>
          <button onClick={() => setPage(1)} disabled={page === 1} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">«</button>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">‹</button>
          {visiblePages().map((p, i) =>
            p === "…" ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
            : <button key={p} onClick={() => setPage(p as number)}
                className={`rounded border px-2.5 py-1 text-xs ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
          )}
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">»</button>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
