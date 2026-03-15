"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

interface JoiningChecklist {
  id: number;
  referenceNumber: string;
  incrementCycle: string;
  createdDate: string;
  status: string;
}

const SAMPLE_DATA: JoiningChecklist[] = [];

const STATUS_OPTIONS = ["Submitted", "Approved", "Reject"];

const statusColor = (s: string) => {
  switch (s) {
    case "Approved": return "#28a745";
    case "Reject": return "#dc3545";
    case "Submitted": return "#17a2b8";
    default: return "#6c757d";
  }
};

export default function JoiningChecklistListPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [sortCol, setSortCol] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [fRef, setFRef] = useState("");
  const [fCycle, setFCycle] = useState("");
  const [fDate, setFDate] = useState("");
  const [fStatus, setFStatus] = useState("Submitted");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    let d = [...SAMPLE_DATA];
    if (fRef) d = d.filter((r) => r.referenceNumber.toLowerCase().includes(fRef.toLowerCase()));
    if (fCycle) d = d.filter((r) => r.incrementCycle.toLowerCase().includes(fCycle.toLowerCase()));
    if (fDate) d = d.filter((r) => r.createdDate.toLowerCase().includes(fDate.toLowerCase()));
    if (fStatus) d = d.filter((r) => r.status === fStatus);
    if (sortCol) {
      d.sort((a, b) => {
        const av = a[sortCol as keyof JoiningChecklist];
        const bv = b[sortCol as keyof JoiningChecklist];
        return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
      });
    }
    return d;
  }, [fRef, fCycle, fDate, fStatus, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortIcon = () => <span className="ml-1 text-[10px] opacity-70">&#8645;</span>;

  const handleClear = () => {
    setSelected(null);
    setFRef("");
    setFCycle("");
    setFDate("");
    setFStatus("Submitted");
    setPage(1);
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Joining Checklist List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Joining Checklist List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-medium text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Joining Checklist(s)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/joining-checklist/create")}
              disabled={selected !== null}
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#28a745" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              Add
            </button>
            <button
              onClick={() => selected !== null && router.push("/personnel/human-resource/joining-checklist/view")}
              disabled={selected === null}
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#17a2b8" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#6c757d" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M5 6v14a2 2 0 002 2h10a2 2 0 002-2V6"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-stroke dark:border-dark-3">
            <thead>
              <tr style={{ backgroundColor: "#26A69A" }}>
                <th className="border border-white/30 px-3 py-2 text-center w-12">
                  <span className="block text-xs font-semibold text-white">#</span>
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("referenceNumber")}>Reference Number <SortIcon /></span>
                  <input value={fRef} onChange={(e) => { setFRef(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("incrementCycle")}>Increment Cycle <SortIcon /></span>
                  <input value={fCycle} onChange={(e) => { setFCycle(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("createdDate")}>Created Date <SortIcon /></span>
                  <input type="text" placeholder="dd-MMM-yyyy" value={fDate} onChange={(e) => { setFDate(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("status")}>Status <SortIcon /></span>
                  <select value={fStatus} onChange={(e) => { setFStatus(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-gray-500">
                    <option value="">All</option>
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </th>
                <th className="border border-white/30 px-3 py-2 text-center">
                  <span className="block text-xs font-semibold text-white">Select</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={6} className="border border-stroke px-4 py-3 text-left text-sm text-gray-500 dark:border-dark-3">No records found</td></tr>
              ) : (
                rows.map((r, idx) => (
                  <tr
                    key={r.id}
                    className="border-b border-stroke text-sm dark:border-dark-3"
                    style={selected === r.id ? { backgroundColor: "#d4f0eb" } : {}}
                  >
                    <td className="border border-stroke px-4 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(page - 1) * perPage + idx + 1}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.referenceNumber}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.incrementCycle}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.createdDate}</td>
                    <td className="border border-stroke px-4 py-3 dark:border-dark-3">
                      <span className="rounded px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: statusColor(r.status) }}>{r.status.toUpperCase()}</span>
                    </td>
                    <td className="border border-stroke px-4 py-3 text-center dark:border-dark-3">
                      <input
                        type="radio"
                        name="selectRow"
                        checked={selected === r.id}
                        onChange={() => setSelected(r.id)}
                        className="size-4 accent-[#17a2b8]"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 px-5 py-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">({page} of {totalPages})</span>
          <div className="flex items-center gap-0.5">
            <button onClick={() => setPage(1)} disabled={page === 1} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&laquo;</button>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&lsaquo;</button>
            <span className="rounded bg-[#3085d6] px-3 py-1.5 text-xs font-bold text-white">{page}</span>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&rsaquo;</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&raquo;</button>
          </div>
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            {[10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
