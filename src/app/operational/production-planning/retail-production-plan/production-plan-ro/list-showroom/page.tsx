"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─── Status badge ────────────────────────────────────────────────────────── */
const STATUS_COLORS: Record<string, string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  SUBMITTED:      "bg-[#fd7e14] text-white",
  INITIATED:      "bg-[#6c757d] text-white",
  DRAFT:          "bg-[#adb5bd] text-dark",
};

/* ─── Sample data ─────────────────────────────────────────────────────────── */
interface ShowroomRow {
  id: number;
  regionCode: string;
  planCode: string;
  planName: string;
  createdDate: string;
  status: string;
}

const SAMPLE_DATA: ShowroomRow[] = [];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function visiblePages(current: number, total: number) {
  const pages: (number | "…")[] = [];
  if (total <= 7) { for (let i = 1; i <= total; i++) pages.push(i); return pages; }
  pages.push(1);
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function ProductionPlanROListShowroomPage() {
  const router   = useRouter();
  const basePath = "/operational/production-planning/retail-production-plan/production-plan-ro";

  const [selectedId,    setSelectedId]    = useState<number | null>(null);
  const [filterRegion,  setFilterRegion]  = useState("");
  const [filterCode,    setFilterCode]    = useState("");
  const [filterName,    setFilterName]    = useState("");
  const [filterDate,    setFilterDate]    = useState("");
  const [filterStatus,  setFilterStatus]  = useState("");
  const [page,          setPage]          = useState(1);
  const [pageSize,      setPageSize]      = useState(10);
  const [sortKey,       setSortKey]       = useState<keyof ShowroomRow>("id");
  const [sortAsc,       setSortAsc]       = useState(true);

  const toggleSort = (k: keyof ShowroomRow) => { if (sortKey === k) setSortAsc(!sortAsc); else { setSortKey(k); setSortAsc(true); } };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.regionCode.toLowerCase().includes(filterRegion.toLowerCase()) &&
    r.planCode.toLowerCase().includes(filterCode.toLowerCase()) &&
    r.planName.toLowerCase().includes(filterName.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filterDate.toLowerCase()) &&
    (filterStatus === "" || r.status === filterStatus)
  ).sort((a, b) => {
    const va = String(a[sortKey]); const vb = String(b[sortKey]);
    return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => { setSelectedId(null); setFilterRegion(""); setFilterCode(""); setFilterName(""); setFilterDate(""); setFilterStatus(""); setPage(1); };

  const SortIcon = ({ k }: { k: keyof ShowroomRow }) => (
    <span className="ml-1 inline-flex flex-col text-[8px] leading-none">
      <span className={sortKey === k && sortAsc  ? "text-white" : "text-white/50"}>▲</span>
      <span className={sortKey === k && !sortAsc ? "text-white" : "text-white/50"}>▼</span>
    </span>
  );

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Production Plan Showroom List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Plan</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Production Plan Showroom List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4">
          {/* Count + buttons */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-dark dark:text-white">
              {filtered.length} - Showroom List (s)
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { if (selectedId) router.push(`${basePath}/view`); }}
                disabled={selectedId === null}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                View
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Clear
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold cursor-pointer" onClick={() => toggleSort("regionCode")}>
                    Region Code / Name <SortIcon k="regionCode" />
                  </th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold cursor-pointer" onClick={() => toggleSort("planCode")}>
                    plan Code <SortIcon k="planCode" />
                  </th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold cursor-pointer" onClick={() => toggleSort("planName")}>
                    plan Name <SortIcon k="planName" />
                  </th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold cursor-pointer" onClick={() => toggleSort("createdDate")}>
                    Created Date <SortIcon k="createdDate" />
                  </th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold cursor-pointer" onClick={() => toggleSort("status")}>
                    Status <SortIcon k="status" />
                  </th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Select</th>
                </tr>
                {/* Filter row */}
                <tr className="bg-[#2d8f7b]">
                  <th className="border border-[#3aa88f] px-2 py-1"></th>
                  <th className="border border-[#3aa88f] px-2 py-1">
                    <input value={filterRegion} onChange={(e) => { setFilterRegion(e.target.value); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none dark:bg-gray-dark dark:text-white" />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-1">
                    <input value={filterCode} onChange={(e) => { setFilterCode(e.target.value); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none dark:bg-gray-dark dark:text-white" />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-1">
                    <input value={filterName} onChange={(e) => { setFilterName(e.target.value); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none dark:bg-gray-dark dark:text-white" />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-1">
                    <div className="flex items-center gap-1">
                      <input value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none dark:bg-gray-dark dark:text-white" />
                      <svg className="size-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    </div>
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-1">
                    <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none dark:bg-gray-dark dark:text-white">
                      <option value="">Select</option>
                      <option value="FINAL_APPROVED">FINAL_APPROVED</option>
                      <option value="SUBMITTED">SUBMITTED</option>
                      <option value="INITIATED">INITIATED</option>
                      <option value="DRAFT">DRAFT</option>
                    </select>
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr><td colSpan={7} className="border border-stroke px-3 py-4 text-left text-sm text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  paged.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{row.regionCode}</td>
                      <td className="border border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{row.planCode}</td>
                      <td className="border border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{row.planName}</td>
                      <td className="border border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[row.status] ?? "bg-gray-200 text-dark"}`}>{row.status}</span>
                      </td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <input type="radio" name="showroom-select" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="accent-[#2d8f7b]" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-3 flex flex-wrap items-center justify-end gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">({page} of {totalPages})</span>
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke text-dark hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="11,17 6,12 11,7" /><polyline points="18,17 13,12 18,7" /></svg>
            </button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke text-dark hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6" /></svg>
            </button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…" ? <span key={`e${i}`} className="px-1 text-gray-400">…</span> : (
                <button key={p} onClick={() => setPage(p as number)} className={`flex size-7 items-center justify-center rounded border text-sm font-medium ${page === p ? "border-primary bg-primary text-white" : "border-stroke text-dark hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke text-dark hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6" /></svg>
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke text-dark hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="13,17 18,12 13,7" /><polyline points="6,17 11,12 6,7" /></svg>
            </button>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white">
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
