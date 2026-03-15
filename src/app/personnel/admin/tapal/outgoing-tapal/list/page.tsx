"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number;
  referenceNumber: string;
  tapalType: string;
  tapalFor: string;
  receivedBy: string;
  createdDate: string;
  status: string;
}[] = [
  { id:  1, referenceNumber: "OGT9572", tapalType: "Speed Post", tapalFor: "Individual", receivedBy: "THIRU.PREMKUMAR",                    createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  2, referenceNumber: "OGT9571", tapalType: "COVER",      tapalFor: "Individual", receivedBy: "THE ASSISTANT DIE CO OP AUDI NORTH", createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  3, referenceNumber: "OGT9570", tapalType: "COVER",      tapalFor: "Individual", receivedBy: "NEW LIFE PLACEMENTS",                 createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  4, referenceNumber: "OGT9569", tapalType: "COVER",      tapalFor: "Individual", receivedBy: "THE ADDL REGISTRAR ICDP",             createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  5, referenceNumber: "OGT9568", tapalType: "PARCEL",     tapalFor: "Entity",     receivedBy: "Regional Office-VIJAYAWADA",          createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  6, referenceNumber: "OGT9567", tapalType: "PARCEL",     tapalFor: "Entity",     receivedBy: "Regional Office-MUMBAI",              createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  7, referenceNumber: "OGT9566", tapalType: "COVER",      tapalFor: "Individual", receivedBy: "CHAIRMAN",                            createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  8, referenceNumber: "OGT9565", tapalType: "COVER",      tapalFor: "Entity",     receivedBy: "Regional Office-VIJAYAWADA",          createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id:  9, referenceNumber: "OGT9564", tapalType: "Courier",    tapalFor: "Entity",     receivedBy: "Regional Office-VELLORE",             createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id: 10, referenceNumber: "OGT9563", tapalType: "COVER",      tapalFor: "Entity",     receivedBy: "D & P Office-D&P OFFICE ERODE",       createdDate: "06-Apr-2023", status: "FINAL_APPROVED" },
  { id: 11, referenceNumber: "OGT9562", tapalType: "Speed Post", tapalFor: "Individual", receivedBy: "SENTHIL KUMAR",                       createdDate: "05-Apr-2023", status: "SUBMITTED" },
  { id: 12, referenceNumber: "OGT9561", tapalType: "Courier",    tapalFor: "Entity",     receivedBy: "Regional Office-CHENNAI",             createdDate: "05-Apr-2023", status: "FINAL_APPROVED" },
  { id: 13, referenceNumber: "OGT9560", tapalType: "PARCEL",     tapalFor: "Individual", receivedBy: "RAJASEKARAN M",                       createdDate: "04-Apr-2023", status: "SUBMITTED" },
  { id: 14, referenceNumber: "OGT9559", tapalType: "COVER",      tapalFor: "Entity",     receivedBy: "Regional Office-COIMBATORE",          createdDate: "04-Apr-2023", status: "FINAL_APPROVED" },
  { id: 15, referenceNumber: "OGT9558", tapalType: "Speed Post", tapalFor: "Individual", receivedBy: "MURUGAN P",                           createdDate: "03-Apr-2023", status: "FINAL_APPROVED" },
];

const TOTAL = 9504;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const STATUS_OPTIONS    = ["SUBMITTED", "FINAL_APPROVED"];
const TAPAL_TYPES       = ["Courier", "Speed Post", "COVER", "PARCEL", "Registered Post", "Fax"];
const TAPAL_FOR_OPTIONS = ["Individual", "Entity", "Department"];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);
const CalIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function OutgoingTapalListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");

  const [fRefNum,  setFRefNum]  = useState("");
  const [fType,    setFType]    = useState("");
  const [fFor,     setFFor]     = useState("");
  const [fRecBy,   setFRecBy]   = useState("");
  const [fDate,    setFDate]    = useState("");
  const [fStatus,  setFStatus]  = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fRefNum  || r.referenceNumber.toLowerCase().includes(fRefNum.toLowerCase())) &&
    (!fType    || r.tapalType === fType) &&
    (!fFor     || r.tapalFor === fFor) &&
    (!fRecBy   || r.receivedBy.toLowerCase().includes(fRecBy.toLowerCase())) &&
    (!fDate    || r.createdDate.includes(fDate)) &&
    (!fStatus  || r.status === fStatus)
  ), [fRefNum, fType, fFor, fRecBy, fDate, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string | number => sortCol === "id" ? r.id : (r as Record<string, unknown>)[sortCol] as string;
    const av = v(a), bv = v(b);
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }), [filtered, sortCol, sortDir]);

  const totalPages  = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated   = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const hasOne = selected.length === 1;

  const clearAll = () => {
    clearSelect();
    setFRefNum(""); setFType(""); setFFor(""); setFRecBy(""); setFDate(""); setFStatus("");
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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Outgoing Tapal List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Outgoing Tapal List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL.toLocaleString("en-IN")} - Outgoing Tapal(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Create POD */}
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/tapal/outgoing-tapal/create-pod")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create POD
            </button>
            {/* Returned */}
            <button disabled={!hasOne}
              className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40"
              style={{ background: "#fd7e14" }}>
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.16"/></svg>
              Returned
            </button>
            {/* Add */}
            <button onClick={() => router.push("/personnel/admin/tapal/outgoing-tapal/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            {/* Edit */}
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/tapal/outgoing-tapal/create")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            {/* View */}
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/tapal/outgoing-tapal/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            {/* Delete */}
            <button disabled={!hasOne}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Delete
            </button>
            {/* Clear */}
            <button onClick={clearAll}
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
                <th className={thBase} onClick={() => handleSort("referenceNumber")} style={{ cursor: "pointer" }}>
                  Reference Number <SortIcon active={sortCol === "referenceNumber"} dir={sortDir} />
                  <input value={fRefNum} onChange={e => { setFRefNum(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("tapalType")} style={{ cursor: "pointer" }}>
                  Tapal Type <SortIcon active={sortCol === "tapalType"} dir={sortDir} />
                  <select value={fType} onChange={e => { setFType(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {TAPAL_TYPES.map(t => <option key={t} value={t} className="text-dark">{t}</option>)}
                  </select>
                </th>
                <th className={thBase} onClick={() => handleSort("tapalFor")} style={{ cursor: "pointer" }}>
                  Tapal For <SortIcon active={sortCol === "tapalFor"} dir={sortDir} />
                  <select value={fFor} onChange={e => { setFFor(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {TAPAL_FOR_OPTIONS.map(o => <option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className={thBase} onClick={() => handleSort("receivedBy")} style={{ cursor: "pointer" }}>
                  Received by <SortIcon active={sortCol === "receivedBy"} dir={sortDir} />
                  <input value={fRecBy} onChange={e => { setFRecBy(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("createdDate")} style={{ cursor: "pointer" }}>
                  Created Date <SortIcon active={sortCol === "createdDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" onClick={e => e.stopPropagation()} className="w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 pr-6 text-xs text-white placeholder-white/50 focus:outline-none" />
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
                <tr><td colSpan={8} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-2 py-2 text-center text-xs text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-3 py-2 text-xs text-center">
                    <button onClick={() => { clearSelect(); toggleSelect(row.id); router.push("/personnel/admin/tapal/outgoing-tapal/view"); }}
                      className="text-[#2d8f7b] hover:underline font-medium">{row.referenceNumber}</button>
                  </td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.tapalType}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.tapalFor}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.receivedBy}</td>
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

        {/* Footer */}
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
