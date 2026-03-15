"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type DAArrearRecord = {
  id: number;
  percentage: number;
  withEffectFrom: string;
  numberOfInstallments: number;
  toBeApplied: string;
  createdDate: string;
};

const SAMPLE_DATA: DAArrearRecord[] = [
  { id: 1, percentage: 5.0,  withEffectFrom: "24-Jul-2024", numberOfInstallments: 4, toBeApplied: "24-Jul-2024", createdDate: "24-Jul-2024" },
  { id: 2, percentage: 46.0, withEffectFrom: "01-Jul-2023", numberOfInstallments: 1, toBeApplied: "01-Oct-2023", createdDate: "30-Oct-2023" },
  { id: 3, percentage: 42.0, withEffectFrom: "01-Apr-2023", numberOfInstallments: 1, toBeApplied: "01-May-2023", createdDate: "26-May-2023" },
  { id: 4, percentage: 38.0, withEffectFrom: "01-Jan-2023", numberOfInstallments: 1, toBeApplied: "01-Feb-2023", createdDate: "22-Feb-2023" },
  { id: 5, percentage: 34.0, withEffectFrom: "01-Jul-2022", numberOfInstallments: 1, toBeApplied: "01-Oct-2022", createdDate: "20-Oct-2022" },
  { id: 6, percentage: 31.0, withEffectFrom: "01-Jan-2022", numberOfInstallments: 1, toBeApplied: "01-Jan-2022", createdDate: "27-Jan-2022" },
  { id: 7, percentage: 17.0, withEffectFrom: "01-Jul-2019", numberOfInstallments: 1, toBeApplied: "01-Oct-2019", createdDate: "25-Oct-2019" },
  { id: 8, percentage: 12.0, withEffectFrom: "01-Jan-2019", numberOfInstallments: 1, toBeApplied: "01-Jun-2019", createdDate: "24-Oct-2019" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
type SortKey = keyof DAArrearRecord;
type SortDir = "asc" | "desc";

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <span className="ml-1 inline-flex flex-col leading-[6px] opacity-60"><span className="text-[8px]">▲</span><span className="text-[8px]">▼</span></span>;
  return <span className="ml-1 text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>;
}

function CalendarIcon() {
  return (
    <svg className="size-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function DAArrearConfigListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [filters, setFilters] = useState({
    percentage: "", withEffectFrom: "", numberOfInstallments: "", toBeApplied: "", createdDate: "",
  });

  const setFilter = (k: keyof typeof filters, v: string) => {
    setFilters(f => ({ ...f, [k]: v }));
    setPage(1);
  };

  const handleSort = (col: SortKey) => {
    if (sortKey === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(col); setSortDir("asc"); }
    setPage(1);
  };

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ percentage: "", withEffectFrom: "", numberOfInstallments: "", toBeApplied: "", createdDate: "" });
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = useMemo(() => SAMPLE_DATA.filter(r =>
    String(r.percentage).includes(filters.percentage) &&
    r.withEffectFrom.toLowerCase().includes(filters.withEffectFrom.toLowerCase()) &&
    String(r.numberOfInstallments).includes(filters.numberOfInstallments) &&
    r.toBeApplied.toLowerCase().includes(filters.toBeApplied.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())
  ), [filters]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const av = a[sortKey]; const bv = b[sortKey];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  }), [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const thClass = "border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white whitespace-nowrap";
  const filterInput = "mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none";
  const filterDateWrap = "mt-1 flex items-center rounded border border-[#3aa88f] bg-white px-2 py-1 gap-1";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          DA Arrear Configuration List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">DA Arrear Configuration List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{sorted.length}</span> - DA Arrear Configuration(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              disabled={!selectedId}
              onClick={() => selectedId && router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/edit")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              disabled={!selectedId}
              onClick={() => selectedId && router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              disabled={!selectedId}
              onClick={() => selectedId && setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4h6v2"/></svg>
              Delete
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white w-10">#</th>
                <th className={thClass}>
                  <div onClick={() => handleSort("percentage")} className="flex cursor-pointer items-center justify-center gap-1 select-none hover:opacity-80">
                    Percentage (%) <SortIcon col="percentage" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filters.percentage} onChange={e => setFilter("percentage", e.target.value)} className={filterInput} />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("withEffectFrom")} className="flex cursor-pointer items-center justify-center gap-1 select-none hover:opacity-80">
                    With Effect From <SortIcon col="withEffectFrom" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <div className={filterDateWrap}>
                    <input value={filters.withEffectFrom} onChange={e => setFilter("withEffectFrom", e.target.value)}
                      placeholder="dd-MMM-yyyy" className="flex-1 text-xs text-dark outline-none" />
                    <CalendarIcon />
                  </div>
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("numberOfInstallments")} className="flex cursor-pointer items-center justify-center gap-1 select-none hover:opacity-80">
                    Number of Installment(s) <SortIcon col="numberOfInstallments" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filters.numberOfInstallments} onChange={e => setFilter("numberOfInstallments", e.target.value)} className={filterInput} />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("toBeApplied")} className="flex cursor-pointer items-center justify-center gap-1 select-none hover:opacity-80">
                    To be Applied <SortIcon col="toBeApplied" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <div className={filterDateWrap}>
                    <input value={filters.toBeApplied} onChange={e => setFilter("toBeApplied", e.target.value)}
                      placeholder="dd-MMM-yyyy" className="flex-1 text-xs text-dark outline-none" />
                    <CalendarIcon />
                  </div>
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("createdDate")} className="flex cursor-pointer items-center justify-center gap-1 select-none hover:opacity-80">
                    Created Date <SortIcon col="createdDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <div className={filterDateWrap}>
                    <input value={filters.createdDate} onChange={e => setFilter("createdDate", e.target.value)}
                      placeholder="dd-MMM-yyyy" className="flex-1 text-xs text-dark outline-none" />
                    <CalendarIcon />
                  </div>
                </th>
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">
                    No records found.
                  </td>
                </tr>
              ) : paginated.map((row, idx) => {
                const isSelected = selectedId === row.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(isSelected ? null : row.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#e8f4f8] dark:bg-[#1a2e3a]"
                        : idx % 2 === 0
                        ? "bg-white hover:bg-blue-50 dark:bg-gray-dark"
                        : "bg-[#f9fafb] hover:bg-blue-50 dark:bg-[#1a2232]"
                    }`}
                  >
                    <td className="border border-stroke px-3 py-2.5 text-center text-sm dark:border-dark-3">
                      {(page - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border border-stroke px-3 py-2.5 text-right text-sm dark:border-dark-3">
                      {row.percentage.toFixed(1)}
                    </td>
                    <td className="border border-stroke px-3 py-2.5 text-center text-sm dark:border-dark-3">
                      {row.withEffectFrom}
                    </td>
                    <td className="border border-stroke px-3 py-2.5 text-center text-sm dark:border-dark-3">
                      {row.numberOfInstallments}
                    </td>
                    <td className="border border-stroke px-3 py-2.5 text-center text-sm dark:border-dark-3">
                      {row.toBeApplied}
                    </td>
                    <td className="border border-stroke px-3 py-2.5 text-center text-sm dark:border-dark-3">
                      {row.createdDate}
                    </td>
                    <td className="border border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setSelectedId(row.id)}
                        className="size-4 accent-[#2d8f7b]"
                        onClick={e => e.stopPropagation()}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>({page} of {totalPages})</span>
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded border border-stroke bg-white px-2 py-1 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
            >
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span>{sorted.length} total records</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">«</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">‹</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…"
                ? <span key={`e${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
                : <button key={p} onClick={() => setPage(p as number)}
                    className={`flex size-8 items-center justify-center rounded border text-sm ${
                      page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"
                    }`}>{p}</button>
            )}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">»</button>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-[10px] bg-white p-6 shadow-lg dark:bg-gray-dark">
            <h3 className="mb-2 text-base font-semibold text-dark dark:text-white">Confirm Delete</h3>
            <p className="mb-5 text-sm text-gray-500">Are you sure you want to delete this DA Arrear Configuration?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDeleteConfirm(false)}
                className="rounded border border-stroke px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-dark-3 dark:text-gray-400">
                Cancel
              </button>
              <button onClick={() => { setShowDeleteConfirm(false); setSelectedId(null); }}
                className="rounded bg-red-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
