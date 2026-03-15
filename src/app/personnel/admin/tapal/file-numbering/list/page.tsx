"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const TOTAL = 336;

const ALL_ROWS = [
  { id: 1, fileNumber: "3185", fileName: "InfoTex",                                          createdDate: "30-Jul-2024", status: "ACTIVE" },
  { id: 2, fileNumber: "3184", fileName: "Infotex file",                                     createdDate: "13-Jun-2024", status: "ACTIVE" },
  { id: 3, fileNumber: "3183", fileName: "ASSEMBLY ANNOUNCEMENT 2022*23 HANDLOOMS OF INDI",  createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 4, fileNumber: "3182", fileName: "OTHER SECTION ADJUSTMENT MASTER FILE",             createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 5, fileNumber: "3181", fileName: "OTHER SECTION ADJUSTMENT MASTER FILE",             createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 6, fileNumber: "3180", fileName: "ASSEMBLY ANNOUNCEMENT DESIGN STUDIO 2022-23",      createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 7, fileNumber: "3179", fileName: "MADIPAKKAM VELACHERRY",                            createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 8, fileNumber: "3178", fileName: "PERAMBUR VANNAM SHOWROOM LED",                     createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 9, fileNumber: "3177", fileName: "DISPLAY SHOWROOMLIGHT SIGN BOARD",                 createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 10, fileNumber: "3176", fileName: "INTERNATIONAL SR CIVIL AND ELECTRICAL WORKS",     createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 11, fileNumber: "3175", fileName: "MADURAI SHOWROOM CIVIL WORKS",                    createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 12, fileNumber: "3174", fileName: "TRICHY SHOWROOM RENOVATION",                      createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 13, fileNumber: "3173", fileName: "EXPORT SECTION CORRESPONDENCE",                   createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 14, fileNumber: "3172", fileName: "MARKETING DIVISION CIRCULAR",                     createdDate: "02-May-2023", status: "ACTIVE" },
  { id: 15, fileNumber: "3171", fileName: "ADMIN SECTION GENERAL FILE",                      createdDate: "01-May-2023", status: "ACTIVE" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

type SortDir = "asc" | "desc";

const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);

export default function FileNumberingListPage() {
  const router = useRouter();

  const [selected, setSelected]     = useState<number | null>(null);
  const [fFileNum,  setFFileNum]    = useState("");
  const [fFileName, setFFileName]   = useState("");
  const [fDate,     setFDate]       = useState("");
  const [fStatus,   setFStatus]     = useState("");
  const [sortCol,   setSortCol]     = useState<string>("fileNumber");
  const [sortDir,   setSortDir]     = useState<SortDir>("desc");
  const [page,      setPage]        = useState(1);
  const [pageSize,  setPageSize]    = useState(10);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let rows = [...ALL_ROWS];
    if (fFileNum)  rows = rows.filter(r => r.fileNumber.toLowerCase().includes(fFileNum.toLowerCase()));
    if (fFileName) rows = rows.filter(r => r.fileName.toLowerCase().includes(fFileName.toLowerCase()));
    if (fDate)     rows = rows.filter(r => r.createdDate.includes(fDate));
    if (fStatus)   rows = rows.filter(r => r.status === fStatus);
    rows.sort((a, b) => {
      const va = String((a as unknown as Record<string, unknown>)[sortCol] ?? "");
      const vb = String((b as unknown as Record<string, unknown>)[sortCol] ?? "");
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return rows;
  }, [fFileNum, fFileName, fDate, fStatus, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows   = filtered.slice((page - 1) * pageSize, page * pageSize);
  const hasOne     = selected !== null;

  const clearFilters = () => {
    setFFileNum(""); setFFileName(""); setFDate(""); setFStatus("");
    setSelected(null); setPage(1);
  };

  const thBase = "border-r border-[#3aa88f] px-3 pt-2 pb-1 text-center text-xs font-semibold text-white last:border-r-0";
  const fi     = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";

  const pageNums = (() => {
    const nums: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) nums.push(i); }
    else {
      nums.push(1);
      if (page > 3) nums.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) nums.push(i);
      if (page < totalPages - 2) nums.push("...");
      nums.push(totalPages);
    }
    return nums;
  })();

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">File Numbering List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">File Numbering List</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL.toLocaleString("en-IN")} - File Numbering(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => router.push("/personnel/admin/tapal/file-numbering/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/tapal/file-numbering/edit")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/tapal/file-numbering/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled={!hasOne}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
              Delete
            </button>
            <button onClick={clearFilters}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className={thBase + " w-12"}>#</th>
                <th className={thBase} onClick={() => toggleSort("fileNumber")} style={{ cursor: "pointer" }}>
                  File Number <SortIcon active={sortCol === "fileNumber"} dir={sortDir} />
                  <input value={fFileNum} onChange={e => { setFFileNum(e.target.value); setPage(1); }}
                    placeholder="Search..." className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("fileName")} style={{ cursor: "pointer" }}>
                  File Name <SortIcon active={sortCol === "fileName"} dir={sortDir} />
                  <input value={fFileName} onChange={e => { setFFileName(e.target.value); setPage(1); }}
                    placeholder="Search..." className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("createdDate")} style={{ cursor: "pointer" }}>
                  Created Date <SortIcon active={sortCol === "createdDate"} dir={sortDir} />
                  <input type="text" value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }}
                    placeholder="dd-MMM-yyyy" className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortIcon active={sortCol === "status"} dir={sortDir} />
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }}
                    className={fi + " appearance-none"} onClick={e => e.stopPropagation()}>
                    <option value="">Select</option>
                    <option>ACTIVE</option>
                    <option>INACTIVE</option>
                  </select>
                </th>
                <th className="px-3 pt-2 pb-1 text-center text-xs font-semibold text-white w-16">
                  Select
                  <div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr className="bg-white dark:bg-gray-dark">
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-400">No records found.</td>
                </tr>
              ) : pageRows.map((row, idx) => (
                <tr key={row.id}
                  className={`border-b border-stroke dark:border-dark-3 cursor-pointer ${
                    selected === row.id ? "bg-[#e6f7f5] dark:bg-gray-700" :
                    idx % 2 === 0 ? "bg-white dark:bg-gray-dark hover:bg-[#f0faf7] dark:hover:bg-gray-700" :
                    "bg-gray-50 dark:bg-gray-800 hover:bg-[#f0faf7] dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setSelected(selected === row.id ? null : row.id)}>
                  <td className="px-3 py-2 text-center text-xs text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-3 py-2 text-center text-xs font-medium text-[#17a2b8]">{row.fileNumber}</td>
                  <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.fileName}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.createdDate}</td>
                  <td className="px-3 py-2 text-center">
                    <span className="inline-block rounded px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white bg-[#28a745]">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input type="radio" checked={selected === row.id} onChange={() => setSelected(row.id)}
                      className="accent-[#2d8f7b]" onClick={e => e.stopPropagation()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <span className="text-xs text-gray-500">({page} of {totalPages})</span>
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3 dark:hover:bg-gray-700">«</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3 dark:hover:bg-gray-700">‹</button>
          {pageNums.map((n, i) =>
            n === "..." ? (
              <span key={`e${i}`} className="px-1 text-xs text-gray-400">...</span>
            ) : (
              <button key={n} onClick={() => setPage(n as number)}
                className={`rounded border px-2.5 py-1 text-xs ${page === n ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-50 dark:border-dark-3 dark:hover:bg-gray-700"}`}>
                {n}
              </button>
            )
          )}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3 dark:hover:bg-gray-700">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3 dark:hover:bg-gray-700">»</button>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded border border-stroke px-1.5 py-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
