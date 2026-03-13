"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostponedRow {
  id: number;
  entity: string;
  type: "Increment" | "Promotion" | "Confirmation";
  createdDate: string;
  status: "SUBMITTED" | "APPROVED" | "FINAL-APPROVED";
}

const SAMPLE_DATA: PostponedRow[] = [
  { id: 1,  entity: "HEAD OFFICE",   type: "Increment",    createdDate: "17-Feb-2025", status: "SUBMITTED"    },
  { id: 2,  entity: "HEAD OFFICE",   type: "Promotion",    createdDate: "12-Feb-2025", status: "APPROVED"     },
  { id: 3,  entity: "HEAD OFFICE",   type: "Increment",    createdDate: "12-Feb-2025", status: "SUBMITTED"    },
  { id: 4,  entity: "HEAD OFFICE",   type: "Promotion",    createdDate: "12-Feb-2025", status: "SUBMITTED"    },
  { id: 5,  entity: "HEAD OFFICE",   type: "Increment",    createdDate: "12-Feb-2025", status: "SUBMITTED"    },
  { id: 6,  entity: "HEAD OFFICE",   type: "Promotion",    createdDate: "12-Feb-2025", status: "SUBMITTED"    },
  { id: 7,  entity: "HEAD OFFICE",   type: "Promotion",    createdDate: "12-Feb-2025", status: "SUBMITTED"    },
  { id: 8,  entity: "HEAD OFFICE",   type: "Increment",    createdDate: "20-Aug-2024", status: "FINAL-APPROVED"},
  { id: 9,  entity: "TVPM-EGMORE",   type: "Promotion",    createdDate: "02-Oct-2018", status: "FINAL-APPROVED"},
  { id: 10, entity: "TVPM-EGMORE",   type: "Confirmation", createdDate: "02-Oct-2018", status: "SUBMITTED"    },
  { id: 11, entity: "TVPM-EGMORE",   type: "Increment",    createdDate: "15-Oct-2018", status: "SUBMITTED"    },
  { id: 12, entity: "TVPM-EGMORE",   type: "Confirmation", createdDate: "10-Nov-2018", status: "SUBMITTED"    },
];

const STATUS_STYLE: Record<PostponedRow["status"], string> = {
  "SUBMITTED":     "bg-[#FFA70B] text-white",
  "APPROVED":      "bg-[#28a745] text-white",
  "FINAL-APPROVED":"bg-[#28a745] text-white",
};

const PAGE_SIZES = [10, 25, 50];
type SortKey = keyof PostponedRow;

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function ConfirmationPostponedListPage() {
  const router = useRouter();

  const [selectedId,   setSelectedId]   = useState<number | null>(null);
  const [filterEntity, setFilterEntity] = useState("");
  const [filterType,   setFilterType]   = useState("");
  const [filterDate,   setFilterDate]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortCol,      setSortCol]      = useState<SortKey | null>(null);
  const [sortDir,      setSortDir]      = useState<"asc" | "desc">("asc");
  const [page,         setPage]         = useState(1);
  const [pageSize,     setPageSize]     = useState(10);

  const handleSort = (col: SortKey) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortCol(col); setSortDir("asc"); }
  };

  const handleClear = () => {
    setFilterEntity(""); setFilterType(""); setFilterDate("");
    setFilterStatus(""); setSelectedId(null);
    setSortCol(null); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.entity.toLowerCase().includes(filterEntity.toLowerCase()) &&
    r.type.toLowerCase().includes(filterType.toLowerCase()) &&
    (filterDate === "" || r.createdDate.includes(filterDate)) &&
    (filterStatus === "" || r.status === filterStatus)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0;
    const av = String(a[sortCol]).toLowerCase();
    const bv = String(b[sortCol]).toLowerCase();
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortCol === col && sortDir === "asc"  ? "opacity-100" : ""}>▲</span>
      <span className={sortCol === col && sortDir === "desc" ? "opacity-100" : ""}>▼</span>
    </span>
  );

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Employee Confirmation / Increment / Promotion Postponed List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Employee Confirmation / Increment / Promotion Postponed List</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <span className="text-sm font-medium text-dark dark:text-white">
            {filtered.length} - Employee Confirmation / Increment / Promotion Postponed(s)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {/* Add */}
            <button
              type="button"
              disabled={selectedId !== null}
              onClick={() => router.push("/personnel/human-resource/confirmation-postponed/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add
            </button>
            {/* Edit */}
            <button
              type="button"
              disabled={!selectedId}
              onClick={() => selectedId && router.push("/personnel/human-resource/confirmation-postponed/create")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            {/* View */}
            <button
              type="button"
              disabled={!selectedId}
              onClick={() => selectedId && router.push("/personnel/human-resource/confirmation-postponed/view")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button>
            {/* Delete */}
            <button
              type="button"
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              Delete
            </button>
            {/* Clear */}
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {(["#","Entity","Type","Created Date","Status","Select"] as const).map((h) => {
                  const colMap: Record<string, SortKey> = {
                    "Entity": "entity", "Type": "type",
                    "Created Date": "createdDate", "Status": "status",
                  };
                  return (
                    <th
                      key={h}
                      onClick={() => colMap[h] && handleSort(colMap[h])}
                      className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap cursor-pointer select-none"
                    >
                      {h}
                      {colMap[h] && <SortIcon col={colMap[h]} />}
                    </th>
                  );
                })}
              </tr>
              {/* Filter row */}
              <tr className="bg-[#2d8f7b]">
                <th className="border border-[#3aa88f] px-2 py-1" />
                <th className="border border-[#3aa88f] px-2 py-1">
                  <input value={filterEntity} onChange={(e) => { setFilterEntity(e.target.value); setPage(1); }}
                    className="w-full rounded border border-white/30 bg-white/20 px-2 py-0.5 text-xs text-white placeholder-white/70 outline-none"
                    placeholder="Search…" />
                </th>
                <th className="border border-[#3aa88f] px-2 py-1">
                  <input value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                    className="w-full rounded border border-white/30 bg-white/20 px-2 py-0.5 text-xs text-white placeholder-white/70 outline-none"
                    placeholder="Search…" />
                </th>
                <th className="border border-[#3aa88f] px-2 py-1">
                  <input type="date" value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }}
                    className="w-full rounded border border-white/30 bg-white/20 px-2 py-0.5 text-xs text-white outline-none [color-scheme:dark]" />
                </th>
                <th className="border border-[#3aa88f] px-2 py-1">
                  <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                    className="w-full rounded border border-white/30 bg-white/20 px-2 py-0.5 text-xs text-white outline-none">
                    <option value="">Select</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                  </select>
                </th>
                <th className="border border-[#3aa88f] px-2 py-1" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSelected = selectedId === row.id;
                  const base = isSelected ? "bg-[#2d8f7b]"
                    : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]";
                  const cell = isSelected ? "text-white" : "text-dark dark:text-white";
                  const teal = isSelected ? "text-white" : "text-[#17a2b8]";
                  return (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${base}`}>
                      <td className={`border-r border-stroke px-2 py-2 text-center dark:border-dark-3 ${cell}`}>{(page - 1) * pageSize + idx + 1}</td>
                      <td className={`border-r border-stroke px-3 py-2 dark:border-dark-3 ${teal}`}>{row.entity}</td>
                      <td className={`border-r border-stroke px-3 py-2 dark:border-dark-3 ${teal}`}>{row.type}</td>
                      <td className={`border-r border-stroke px-3 py-2 whitespace-nowrap dark:border-dark-3 ${cell}`}>{row.createdDate}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input type="radio" name="postponed-select" checked={isSelected}
                          onChange={() => setSelectedId(row.id)} className="size-4 accent-[#2d8f7b]" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-end gap-2 px-5 py-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">({page} of {totalPages})</span>
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#171;</button>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#8249;</button>
          {visiblePages(page, totalPages).map((p, i) =>
            p === "…" ? <span key={`e${i}`} className="px-1 text-gray-400">…</span> : (
              <button key={p} onClick={() => setPage(p as number)}
                className={`flex size-7 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"}`}>
                {p}
              </button>
            )
          )}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#8250;</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#187;</button>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="h-7 rounded border border-stroke bg-white px-1 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
