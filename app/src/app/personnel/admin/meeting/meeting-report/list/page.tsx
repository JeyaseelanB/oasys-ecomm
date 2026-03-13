"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const TOTAL = 9;

const statusColor = (s: string) => {
  if (s === "FINAL_APPROVED")       return "bg-[#28a745]";
  if (s === "REPORT_SUBMITTED")     return "bg-[#fd7e14]";
  if (s === "REPORT_APPROVED")      return "bg-[#17a2b8]";
  if (s === "REPORT_FINAL_APPROVED") return "bg-[#1e7e34]";
  return "";
};

const ALL_ROWS = [
  { id: 1, ref: "M111287", type: "INTERNAL",          date: "20-Oct-2020", start: "10:00", end: "14:00", people: "46", status: "" },
  { id: 2, ref: "M111286", type: "INTERNAL",          date: "25-Jun-2020", start: "10:00", end: "13:00", people: "2",  status: "" },
  { id: 3, ref: "M111285", type: "INTERNAL",          date: "24-Jun-2020", start: "10:00", end: "16:00", people: "89", status: "" },
  { id: 4, ref: "M111284", type: "INTERNAL",          date: "25-Jun-2020", start: "10:00", end: "17:00", people: "1",  status: "FINAL_APPROVED" },
  { id: 5, ref: "M111283", type: "INTERNAL",          date: "27-Feb-2019", start: "15:00", end: "18:00", people: "8",  status: "REPORT_SUBMITTED" },
  { id: 6, ref: "M111282", type: "INTERNAL_EXTERNAL", date: "30-Sep-2018", start: "08:00", end: "15:00", people: "0",  status: "FINAL_APPROVED" },
  { id: 7, ref: "M111280", type: "INTERNAL",          date: "29-Aug-2018", start: "08:35", end: "11:35", people: "0",  status: "REPORT_SUBMITTED" },
  { id: 8, ref: "M111279", type: "EXTERNAL",          date: "31-Aug-2018", start: "09:00", end: "20:00", people: "0",  status: "REPORT_APPROVED" },
  { id: 9, ref: "M111278", type: "INTERNAL",          date: "24-Aug-2018", start: "09:00", end: "15:00", people: "0",  status: "REPORT_FINAL_APPROVED" },
];

type SortDir = "asc" | "desc";
const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);

export default function MeetingReportListPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [fRef,    setFRef]    = useState("");
  const [fType,   setFType]   = useState("");
  const [fDate,   setFDate]   = useState("");
  const [fStart,  setFStart]  = useState("");
  const [fEnd,    setFEnd]    = useState("");
  const [fPeople, setFPeople] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [sortCol, setSortCol] = useState("ref");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page,    setPage]    = useState(1);
  const pageSize = 10;

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let rows = [...ALL_ROWS];
    if (fRef)    rows = rows.filter(r => r.ref.toLowerCase().includes(fRef.toLowerCase()));
    if (fType)   rows = rows.filter(r => r.type === fType);
    if (fDate)   rows = rows.filter(r => r.date.includes(fDate));
    if (fStart)  rows = rows.filter(r => r.start.includes(fStart));
    if (fEnd)    rows = rows.filter(r => r.end.includes(fEnd));
    if (fPeople) rows = rows.filter(r => r.people.includes(fPeople));
    if (fStatus) rows = rows.filter(r => r.status === fStatus);
    rows.sort((a, b) => {
      const va = String((a as unknown as Record<string, unknown>)[sortCol] ?? "");
      const vb = String((b as unknown as Record<string, unknown>)[sortCol] ?? "");
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return rows;
  }, [fRef, fType, fDate, fStart, fEnd, fPeople, fStatus, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows   = filtered.slice((page - 1) * pageSize, page * pageSize);
  const hasOne     = selected !== null;

  const thBase = "border-r border-[#3aa88f] px-3 pt-2 pb-1 text-center text-xs font-semibold text-white last:border-r-0";
  const fi     = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Meeting Report List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Meeting</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Meeting Report List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL} - Meeting Report(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => router.push("/personnel/admin/meeting/meeting-report/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/meeting/meeting-report/edit")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button disabled={!hasOne}
              onClick={() => hasOne && router.push("/personnel/admin/meeting/meeting-report/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={() => { setFRef(""); setFType(""); setFDate(""); setFStart(""); setFEnd(""); setFPeople(""); setFStatus(""); setSelected(null); setPage(1); }}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className={thBase + " w-10"}>#</th>
                <th className={thBase} onClick={() => toggleSort("ref")} style={{ cursor: "pointer" }}>
                  Reference No. <SortIcon active={sortCol === "ref"} dir={sortDir} />
                  <input value={fRef} onChange={e => { setFRef(e.target.value); setPage(1); }}
                    placeholder="Search..." className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("type")} style={{ cursor: "pointer" }}>
                  Type of Meeting <SortIcon active={sortCol === "type"} dir={sortDir} />
                  <select value={fType} onChange={e => { setFType(e.target.value); setPage(1); }}
                    className={fi + " appearance-none"} onClick={e => e.stopPropagation()}>
                    <option value="">Select</option>
                    <option>INTERNAL</option><option>EXTERNAL</option><option>INTERNAL_EXTERNAL</option>
                  </select>
                </th>
                <th className={thBase} onClick={() => toggleSort("date")} style={{ cursor: "pointer" }}>
                  Meeting Date <SortIcon active={sortCol === "date"} dir={sortDir} />
                  <input value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }}
                    placeholder="dd-MMM-yyyy" className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("start")} style={{ cursor: "pointer" }}>
                  Meeting Start Time <SortIcon active={sortCol === "start"} dir={sortDir} />
                  <input value={fStart} onChange={e => { setFStart(e.target.value); setPage(1); }}
                    placeholder="HH:mm" className={fi} onClick={e => e.stopPropagation()} />
                </th>
                <th className={thBase} onClick={() => toggleSort("end")} style={{ cursor: "pointer" }}>
                  Meeting End Time <SortIcon active={sortCol === "end"} dir={sortDir} />
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
                    <option>FINAL_APPROVED</option>
                    <option>REPORT_SUBMITTED</option>
                    <option>REPORT_APPROVED</option>
                    <option>REPORT_FINAL_APPROVED</option>
                  </select>
                </th>
                <th className="px-3 pt-2 pb-1 text-center text-xs font-semibold text-white w-16">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-400">No records found.</td></tr>
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
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.start}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.end}</td>
                  <td className="px-3 py-2 text-center text-xs text-dark dark:text-white">{row.people}</td>
                  <td className="px-3 py-2 text-center">
                    {row.status && (
                      <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${statusColor(row.status)}`}>
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

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <span className="text-xs text-gray-500">({page} of {totalPages})</span>
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3">«</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className={`rounded border px-2.5 py-1 text-xs ${page === n ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-50 dark:border-dark-3"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="rounded border border-stroke px-1.5 py-1 text-xs disabled:opacity-40 hover:bg-gray-50 dark:border-dark-3">»</button>
          <select className="rounded border border-stroke px-1.5 py-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            <option>10</option><option>25</option><option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
