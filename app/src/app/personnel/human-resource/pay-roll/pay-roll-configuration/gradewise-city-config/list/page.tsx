"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number; grade: string; city: string; createdDate: string; status: string;
}[] = [
  { id: 1,  grade: "Grade II",  city: "TUTICORIN",   createdDate: "27-Feb-2025", status: "Active" },
  { id: 2,  grade: "Grade I",   city: "SRIKAKULAM",  createdDate: "27-Feb-2025", status: "Active" },
  { id: 3,  grade: "GradeIB",   city: "SALEM",       createdDate: "26-Feb-2025", status: "Active" },
  { id: 4,  grade: "GradeIB",   city: "TRICHY",      createdDate: "26-Feb-2025", status: "Active" },
  { id: 5,  grade: "GradeIB",   city: "TIRUPPUR",    createdDate: "26-Feb-2025", status: "Active" },
  { id: 6,  grade: "GradeIB",   city: "COIMBATORE",  createdDate: "26-Feb-2025", status: "Active" },
  { id: 7,  grade: "Grade I",   city: "KAROLBAGH",   createdDate: "29-May-2023", status: "Active" },
  { id: 8,  grade: "GradeI",    city: "KAROLBAGH",   createdDate: "29-May-2023", status: "Active" },
  { id: 9,  grade: "Grade I",   city: "KANCHIPURAM", createdDate: "29-Sep-2022", status: "Active" },
  { id: 10, grade: "GradeI",    city: "KANCHIPURAM", createdDate: "29-Sep-2022", status: "Active" },
  { id: 11, grade: "Grade II",  city: "CHENNAI",     createdDate: "15-Jan-2022", status: "Active" },
  { id: 12, grade: "Grade III", city: "MADURAI",     createdDate: "10-Jan-2022", status: "Active" },
  { id: 13, grade: "Grade I",   city: "COIMBATORE",  createdDate: "05-Jan-2022", status: "Active" },
  { id: 14, grade: "GradeIB",   city: "CHENNAI",     createdDate: "01-Jan-2022", status: "Active" },
  { id: 15, grade: "Grade III", city: "TRICHY",      createdDate: "28-Dec-2021", status: "Active" },
];

const TOTAL = 127;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const STATUS_OPTIONS = ["Active", "Inactive"];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-block text-[10px] leading-none opacity-70">
    {active ? (dir === "asc" ? "▲" : "▼") : "▲"}
  </span>
);

const CalendarIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function GradewiseCityConfigListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [sortCol, setSortCol]   = useState<string>("id");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");

  const [fGrade, setFGrade]   = useState("");
  const [fCity, setFCity]     = useState("");
  const [fDate, setFDate]     = useState("");
  const [fStatus, setFStatus] = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fGrade  || r.grade.toLowerCase().includes(fGrade.toLowerCase())) &&
    (!fCity   || r.city.toLowerCase().includes(fCity.toLowerCase())) &&
    (!fDate   || r.createdDate.includes(fDate)) &&
    (!fStatus || r.status === fStatus)
  ), [fGrade, fCity, fDate, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string | number =>
      sortCol === "id" ? r.id : (r as Record<string, unknown>)[sortCol] as string;
    const av = v(a), bv = v(b);
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const clearSelect = () => setSelected([]);

  const visiblePages = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  const thBase = "border-r border-[#3aa88f] px-3 pt-2 pb-1 text-left text-xs font-semibold text-white";
  const filterInput = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/60 focus:outline-none focus:border-white/70";

  return (
    <div className="mx-auto">
      {/* Page heading + breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Gradewise City Config List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Gradewise City Config List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">
            {TOTAL} -Gradewise City Config(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-city-config/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              onClick={() => selected.length === 1 && router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-city-config/edit")}
              disabled={selected.length !== 1}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selected.length === 1 && router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-city-config/view")}
              disabled={selected.length !== 1}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              onClick={() => selected.length === 1 && setDeleteId(selected[0])}
              disabled={selected.length !== 1}
              className="flex items-center gap-1.5 rounded bg-red-400 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Delete
            </button>
            <button
              onClick={() => { clearSelect(); setFGrade(""); setFCity(""); setFDate(""); setFStatus(""); setPage(1); }}
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
                {/* # */}
                <th className="border-r border-[#3aa88f] px-3 pt-2 pb-1 text-center text-xs font-semibold text-white w-12">
                  #<div className="mt-1 h-[26px]" />
                </th>

                {/* Grade */}
                <th className={thBase} onClick={() => handleSort("grade")} style={{ cursor: "pointer" }}>
                  Grade <SortIcon active={sortCol === "grade"} dir={sortDir} />
                  <input value={fGrade} onChange={e => { setFGrade(e.target.value); setPage(1); }}
                    onClick={e => e.stopPropagation()} className={filterInput} />
                </th>

                {/* City */}
                <th className={thBase} onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>
                  City <SortIcon active={sortCol === "city"} dir={sortDir} />
                  <input value={fCity} onChange={e => { setFCity(e.target.value); setPage(1); }}
                    onClick={e => e.stopPropagation()} className={filterInput} />
                </th>

                {/* Created Date */}
                <th className={thBase} onClick={() => handleSort("createdDate")} style={{ cursor: "pointer" }}>
                  Created Date <SortIcon active={sortCol === "createdDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }}
                      placeholder="dd-MMM-yyyy" onClick={e => e.stopPropagation()}
                      className={`${filterInput} mt-0 pr-6`} />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalendarIcon /></span>
                  </div>
                </th>

                {/* Status */}
                <th className={thBase} onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortIcon active={sortCol === "status"} dir={sortDir} />
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }}
                    onClick={e => e.stopPropagation()} className={filterInput}>
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map(o => <option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>

                {/* Select */}
                <th className="px-3 pt-2 pb-1 text-center text-xs font-semibold text-white">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id}
                  className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-3 py-2 text-center text-xs text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.grade}</td>
                  <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.city}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{row.createdDate}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold uppercase text-white ${row.status === "Active" ? "bg-[#28a745]" : "bg-gray-400"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input type="radio" name="selectRow"
                      checked={selected.includes(row.id)}
                      onChange={() => { clearSelect(); toggleSelect(row.id); }}
                      className="accent-[#2d8f7b]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Rows per page:</span>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="ml-2">
              ({page} of {totalPages})
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">«</button>
            <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
              className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">‹</button>
            {visiblePages().map((p, i) =>
              p === "…"
                ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
                : <button key={p} onClick={() => setPage(p as number)}
                    className={`rounded border px-2.5 py-1 text-xs ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-gray-700"}`}>
                    {p}
                  </button>
            )}
            <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
              className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="rounded border border-stroke px-2 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-gray-700">»</button>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-[10px] bg-white p-6 shadow-xl dark:bg-gray-dark">
            <h3 className="mb-2 text-base font-semibold text-dark dark:text-white">Confirm Delete</h3>
            <p className="mb-5 text-sm text-gray-500">Are you sure you want to delete this record?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)}
                className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Cancel</button>
              <button onClick={() => { setDeleteId(null); clearSelect(); }}
                className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
