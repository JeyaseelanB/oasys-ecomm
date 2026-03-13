"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const TOTAL = 22;

const ALL_ROWS = [
  { id: 1,  ref: "M111297", type: "INTERNAL",          date: "28-Feb-2026", startTime: "03:00", endTime: "04:00",  people: "6",  status: "INITIATED" },
  { id: 2,  ref: "M111296", type: "INTERNAL",          date: "26-Mar-2025", startTime: "03:00", endTime: "10:00",  people: "2",  status: "INITIATED" },
  { id: 3,  ref: "M111295", type: "INTERNAL",          date: "11-Feb-2025", startTime: "10:00", endTime: "",       people: "20", status: "INITIATED" },
  { id: 4,  ref: "M111294", type: "INTERNAL",          date: "11-Feb-2025", startTime: "10:00", endTime: "",       people: "80", status: "INITIATED" },
  { id: 5,  ref: "M111293", type: "INTERNAL",          date: "10-Feb-2025", startTime: "10:00", endTime: "11:05",  people: "81", status: "INITIATED" },
  { id: 6,  ref: "M111292", type: "INTERNAL_EXTERNAL", date: "09-Feb-2025", startTime: "10:00", endTime: "",       people: "80", status: "INITIATED" },
  { id: 7,  ref: "M111291", type: "EXTERNAL",          date: "10-Feb-2025", startTime: "02:00", endTime: "",       people: "20", status: "INITIATED" },
  { id: 8,  ref: "M111290", type: "EXTERNAL",          date: "10-Feb-2025", startTime: "02:00", endTime: "03:00",  people: "80", status: "INITIATED" },
  { id: 9,  ref: "M111289", type: "INTERNAL",          date: "09-Feb-2025", startTime: "08:00", endTime: "",       people: "19", status: "INITIATED" },
  { id: 10, ref: "M111288", type: "INTERNAL",          date: "04-Jul-2022", startTime: "11:35", endTime: "13:30",  people: "28", status: "INITIATED" },
  { id: 11, ref: "M111287", type: "INTERNAL",          date: "01-Jul-2022", startTime: "09:00", endTime: "11:00",  people: "15", status: "INITIATED" },
  { id: 12, ref: "M111286", type: "EXTERNAL",          date: "20-Jun-2022", startTime: "14:00", endTime: "16:00",  people: "10", status: "INITIATED" },
  { id: 13, ref: "M111285", type: "INTERNAL",          date: "15-Jun-2022", startTime: "10:00", endTime: "12:00",  people: "25", status: "INITIATED" },
  { id: 14, ref: "M111284", type: "INTERNAL_EXTERNAL", date: "10-Jun-2022", startTime: "09:00", endTime: "",       people: "30", status: "INITIATED" },
  { id: 15, ref: "M111283", type: "INTERNAL",          date: "05-Jun-2022", startTime: "11:00", endTime: "13:00",  people: "12", status: "INITIATED" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50];
type SortDir = "asc" | "desc";

const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);

export default function MeetingRequestListPage() {
  const router = useRouter();

  const [selected,  setSelected]  = useState<number | null>(null);
  const [fRef,      setFRef]      = useState("");
  const [fType,     setFType]     = useState("");
  const [fDate,     setFDate]     = useState("");
  const [fStart,    setFStart]    = useState("");
  const [fEnd,      setFEnd]      = useState("");
  const [fPeople,   setFPeople]   = useState("");
  const [fStatus,   setFStatus]   = useState("");
  const [sortCol,   setSortCol]   = useState("ref");
  const [sortDir,   setSortDir]   = useState<SortDir>("desc");
  const [page,      setPage]      = useState(1);
  const [pageSize,  setPageSize]  = useState(10);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let rows = [...ALL_ROWS];
    if (fRef)    rows = rows.filter(r => r.ref.toLowerCase().includes(fRef.toLowerCase()));
    if (fType)   rows = rows.filter(r => r.type === fType);
    if (fDate)   rows = rows.filter(r => r.date.includes(fDate));
    if (fStart)  rows = rows.filter(r => r.startTime.includes(fStart));
    if (fEnd)    rows = rows.filter(r => r.endTime.includes(fEnd));
    if (fPeople) rows = rows.filter(r => r.people.includes(fPeople));
    if (fStatus) rows = rows.filter(r => r.status === fStatus);
    rows.sort((a, b) => {
      const va = (a as Record<string, string>)[sortCol] ?? "";
      const vb = (b as Record<string, string>)[sortCol] ?? "";
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return rows;
  }, [fRef, fType, fDate, fStart, fEnd, fPeople, fStatus, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows   = filtered.slice((page - 1) * pageSize, page * pageSize);
  const hasOne     = selected !== null;

  const clearFilters = () => {
    setFRef(""); setFType(""); setFDate(""); setFStart(""); setFEnd(""); setFPeople(""); setFStatus("");
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
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Meeting Request List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Meeting</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Meeting Request List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL.toLocaleString("en-IN")} - Meeting Request(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => router.push("/personnel/admin/meeting/meeting-request/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/meeting/meeting-request/edit")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/meeting/meeting-request/view")}
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
                <th className={thBase + " w-10"}>#</th>
                <th className={thBase} onClick={() => toggleSort("ref")} style={{ cursor: "pointer" }}>
                  Reference Number <SortIcon active={sortCol === "ref"} dir={sortDir} />
                  <input value={fRef} onChange={e => { setFRef(e.target.value); setPage(1); }}
                    placeholder="Search..." className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("type")} style={{ cursor: "pointer" }}>
                  Type of Meeting <SortIcon active={sortCol === "type"} dir={sortDir} />
                  <select value={fType} onChange={e => { setFType(e.target.value); setPage(1); }}
                    className={fi + " appearance-none"} onClick={e => e.stopPropagation()}>
                    <option value="">Select</option>
                    <option>INTERNAL</option>
                    <option>EXTERNAL</option>
                    <option>INTERNAL_EXTERNAL</option>
                  </select>
                </th>
                <th className={thBase} onClick={() => toggleSort("date")} style={{ cursor: "pointer" }}>
                  Meeting Date <SortIcon active={sortCol === "date"} dir={sortDir} />
                  <input value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }}
                    placeholder="dd-MMM-yyyy" className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("startTime")} style={{ cursor: "pointer" }}>
                  Start Time <SortIcon active={sortCol === "startTime"} dir={sortDir} />
                  <input value={fStart} onChange={e => { setFStart(e.target.value); setPage(1); }}
                    placeholder="HH:mm" className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("endTime")} style={{ cursor: "pointer" }}>
                  End Time <SortIcon active={sortCol === "endTime"} dir={sortDir} />
                  <input value={fEnd} onChange={e => { setFEnd(e.target.value); setPage(1); }}
                    placeholder="HH:mm" className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("people")} style={{ cursor: "pointer" }}>
                  No. of People <SortIcon active={sortCol === "people"} dir={sortDir} />
                  <input value={fPeople} onChange={e => { setFPeople(e.target.value); setPage(1); }}
                    placeholder="Search..." className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortIcon active={sortCol === "status"} dir={sortDir} />
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }}
                    className={fi + " appearance-none"} onClick={e => e.stopPropagation()}>
                    <option value="">Select</option>
                    <option>INITIATED</option>
                    <option>APPROVED</option>
                  </select>
                </th>
                <th className="px-3 pt-2 pb-1 text-center text-xs font-semibold text-white w-16">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr className="bg-white dark:bg-gray-dark">
                  <td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-400">No records found.</td>
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
                  <td className="px-3 py-2 text-center text-xs font-medium text-[#17a2b8]">{row.ref}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.type}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.date}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.startTime}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.endTime}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.people}</td>
                  <td className="px-3 py-2 text-center">
                    {row.status && (
                      <span className="inline-block rounded px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white bg-[#6c757d]">
                        {row.status}
                      </span>
                    )}
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
            n === "..." ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">...</span> : (
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
