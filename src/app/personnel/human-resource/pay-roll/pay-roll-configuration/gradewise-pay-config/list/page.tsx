"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number; code: string; name: string; nameTamil: string;
  allowanceType: string; createdDate: string; status: string;
}[] = [
  { id: 1,  code: "GWP001", name: "Basic Pay",           nameTamil: "அடிப்படை ஊதியம்",    allowanceType: "Allowance", createdDate: "01-Jan-2024", status: "Active"   },
  { id: 2,  code: "GWP002", name: "Dearness Allowance",  nameTamil: "அகவிலைப்படி",         allowanceType: "Allowance", createdDate: "02-Jan-2024", status: "Active"   },
  { id: 3,  code: "GWP003", name: "HRA",                 nameTamil: "வீட்டு வாடகை படி",   allowanceType: "Allowance", createdDate: "03-Jan-2024", status: "Active"   },
  { id: 4,  code: "GWP004", name: "Medical Allowance",   nameTamil: "மருத்துவ படி",        allowanceType: "Allowance", createdDate: "04-Jan-2024", status: "Inactive" },
  { id: 5,  code: "GWP005", name: "Transport Allowance", nameTamil: "போக்குவரத்து படி",   allowanceType: "Allowance", createdDate: "05-Jan-2024", status: "Active"   },
  { id: 6,  code: "GWP006", name: "PF Deduction",        nameTamil: "பி.எஃப் கழிவு",     allowanceType: "Deduction", createdDate: "06-Jan-2024", status: "Active"   },
  { id: 7,  code: "GWP007", name: "ESI Deduction",       nameTamil: "இ.எஸ்.ஐ கழிவு",    allowanceType: "Deduction", createdDate: "07-Jan-2024", status: "Active"   },
  { id: 8,  code: "GWP008", name: "PT Deduction",        nameTamil: "தொழில் வரி",         allowanceType: "Deduction", createdDate: "08-Jan-2024", status: "Inactive" },
  { id: 9,  code: "GWP009", name: "Overtime Pay",        nameTamil: "மேலதிக நேர ஊதியம்",  allowanceType: "Allowance", createdDate: "09-Jan-2024", status: "Active"   },
  { id: 10, code: "GWP010", name: "Bonus",               nameTamil: "போனஸ்",               allowanceType: "Allowance", createdDate: "10-Jan-2024", status: "Active"   },
  { id: 11, code: "GWP011", name: "Gratuity",            nameTamil: "நன்றி தொகை",         allowanceType: "Deduction", createdDate: "11-Jan-2024", status: "Active"   },
  { id: 12, code: "GWP012", name: "Leave Encashment",    nameTamil: "விடுப்பு பணமாக்கல்", allowanceType: "Allowance", createdDate: "12-Jan-2024", status: "Active"   },
  { id: 13, code: "GWP013", name: "Loan Recovery",       nameTamil: "கடன் மீட்பு",        allowanceType: "Deduction", createdDate: "13-Jan-2024", status: "Inactive" },
  { id: 14, code: "GWP014", name: "City Allowance",      nameTamil: "நகர படி",            allowanceType: "Allowance", createdDate: "14-Jan-2024", status: "Active"   },
  { id: 15, code: "GWP015", name: "Uniform Allowance",   nameTamil: "சீருடை படி",         allowanceType: "Allowance", createdDate: "15-Jan-2024", status: "Active"   },
];

const TOTAL = 152;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const ALLOWANCE_TYPE_OPTIONS = ["Allowance", "Deduction"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-block text-[10px] leading-none opacity-70">
    {active ? (dir === "asc" ? "▲" : "▼") : "▲"}
  </span>
);

export default function GradewisePayConfigListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [sortCol, setSortCol]   = useState<string>("id");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");

  const [fCode, setFCode]     = useState("");
  const [fName, setFName]     = useState("");
  const [fTamil, setFTamil]   = useState("");
  const [fType, setFType]     = useState("");
  const [fDate, setFDate]     = useState("");
  const [fStatus, setFStatus] = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fCode   || r.code.toLowerCase().includes(fCode.toLowerCase())) &&
    (!fName   || r.name.toLowerCase().includes(fName.toLowerCase())) &&
    (!fTamil  || r.nameTamil.toLowerCase().includes(fTamil.toLowerCase())) &&
    (!fType   || r.allowanceType === fType) &&
    (!fDate   || r.createdDate.includes(fDate)) &&
    (!fStatus || r.status === fStatus)
  ), [fCode, fName, fTamil, fType, fDate, fStatus]);

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
  const selectAll   = () => setSelected(paginated.map(r => r.id));

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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Gradewise Pay Config</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Gradewise Pay Config List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Toolbar row — count left, buttons right */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">
            {TOTAL} - Gradewise Pay Config(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-pay-config/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              onClick={() => selected.length === 1 && router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-pay-config/edit")}
              disabled={selected.length !== 1}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selected.length === 1 && router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-pay-config/view")}
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
              onClick={() => { clearSelect(); setFCode(""); setFName(""); setFTamil(""); setFType(""); setFDate(""); setFStatus(""); setPage(1); }}
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
                <th className="border-r border-[#3aa88f] px-3 pt-2 pb-1 text-center text-xs font-semibold text-white w-10">
                  #
                  <div className="mt-1 h-[26px]" />
                </th>

                {/* Code */}
                <th className={thBase} onClick={() => handleSort("code")} style={{ cursor: "pointer" }}>
                  Code <SortIcon active={sortCol === "code"} dir={sortDir} />
                  <input value={fCode} onChange={e => { setFCode(e.target.value); setPage(1); }}
                    placeholder="" onClick={e => e.stopPropagation()} className={filterInput} />
                </th>

                {/* Name */}
                <th className={thBase} onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                  Name <SortIcon active={sortCol === "name"} dir={sortDir} />
                  <input value={fName} onChange={e => { setFName(e.target.value); setPage(1); }}
                    placeholder="" onClick={e => e.stopPropagation()} className={filterInput} />
                </th>

                {/* Name (In Tamil) */}
                <th className={thBase} onClick={() => handleSort("nameTamil")} style={{ cursor: "pointer" }}>
                  Name (In Tamil) <SortIcon active={sortCol === "nameTamil"} dir={sortDir} />
                  <input value={fTamil} onChange={e => { setFTamil(e.target.value); setPage(1); }}
                    placeholder="" onClick={e => e.stopPropagation()} className={filterInput} />
                </th>

                {/* Allowance Type */}
                <th className={thBase} onClick={() => handleSort("allowanceType")} style={{ cursor: "pointer" }}>
                  Allowance Type <SortIcon active={sortCol === "allowanceType"} dir={sortDir} />
                  <select value={fType} onChange={e => { setFType(e.target.value); setPage(1); }}
                    onClick={e => e.stopPropagation()} className={filterInput}>
                    <option value="">All</option>
                    {ALLOWANCE_TYPE_OPTIONS.map(o => <option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>

                {/* Created Date */}
                <th className={thBase} onClick={() => handleSort("createdDate")} style={{ cursor: "pointer" }}>
                  Created Date <SortIcon active={sortCol === "createdDate"} dir={sortDir} />
                  <input value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }}
                    placeholder="" onClick={e => e.stopPropagation()} className={filterInput} />
                </th>

                {/* Status */}
                <th className={thBase} onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortIcon active={sortCol === "status"} dir={sortDir} />
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }}
                    onClick={e => e.stopPropagation()} className={filterInput}>
                    <option value="">All</option>
                    {STATUS_OPTIONS.map(o => <option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>

                {/* Select */}
                <th className="px-3 pt-2 pb-1 text-center text-xs font-semibold text-white">
                  Select
                  <div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id}
                  className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-3 py-2 text-center text-xs text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-3 py-2 text-xs font-medium text-dark dark:text-white">{row.code}</td>
                  <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.name}</td>
                  <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.nameTamil}</td>
                  <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.allowanceType}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{row.createdDate}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-medium text-white ${row.status === "Active" ? "bg-[#28a745]" : "bg-gray-400"}`}>
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

        {/* Footer: rows-per-page + pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-stroke dark:border-dark-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Rows per page:</span>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="ml-2">
              Showing {Math.min((page - 1) * pageSize + 1, sorted.length)}–{Math.min(page * pageSize, sorted.length)} of {TOTAL}
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
