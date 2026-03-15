"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LeaveRecord = {
  id: number;
  employeeId: string;
  employeeName: string;
  typeOfLeave: string;
  fromDate: string;
  toDate: string;
  createdDate: string;
  status: "FINAL_APPROVED" | "APPROVED" | "REJECTED" | "INPROGRESS";
};

const SAMPLE_DATA: LeaveRecord[] = [
  { id: 1,  employeeId: "140",  employeeName: "ARULRAJAN",      typeOfLeave: "Casual Leave",  fromDate: "04-Mar-2025", toDate: "04-Mar-2025", createdDate: "03-Mar-2025", status: "REJECTED"       },
  { id: 2,  employeeId: "242",  employeeName: "ANURADHA",       typeOfLeave: "Casual Leave",  fromDate: "02-Jan-2026", toDate: "02-Jan-2026", createdDate: "03-Mar-2025", status: "FINAL_APPROVED" },
  { id: 3,  employeeId: "165",  employeeName: "MANGALAM",       typeOfLeave: "Casual Leave",  fromDate: "26-Dec-2024", toDate: "26-Dec-2024", createdDate: "31-Dec-2024", status: "INPROGRESS"     },
  { id: 4,  employeeId: "174",  employeeName: "LAVANYA",        typeOfLeave: "Casual Leave",  fromDate: "28-Nov-2024", toDate: "29-Nov-2024", createdDate: "29-Nov-2024", status: "FINAL_APPROVED" },
  { id: 5,  employeeId: "149",  employeeName: "CAUVERI",        typeOfLeave: "Casual Leave",  fromDate: "28-Nov-2024", toDate: "29-Nov-2024", createdDate: "29-Nov-2024", status: "REJECTED"       },
  { id: 6,  employeeId: "165",  employeeName: "MANGALAM",       typeOfLeave: "Casual Leave",  fromDate: "28-Nov-2024", toDate: "29-Nov-2024", createdDate: "29-Nov-2024", status: "FINAL_APPROVED" },
  { id: 7,  employeeId: "1889", employeeName: "MAHALINGAM",     typeOfLeave: "Casual Leave",  fromDate: "01-Nov-2024", toDate: "09-Nov-2024", createdDate: "28-Nov-2024", status: "APPROVED"       },
  { id: 8,  employeeId: "194",  employeeName: "LAKSHMI PRABHA", typeOfLeave: "Casual Leave",  fromDate: "13-Aug-2026", toDate: "14-Aug-2026", createdDate: "25-Nov-2024", status: "INPROGRESS"     },
  { id: 9,  employeeId: "139",  employeeName: "ANITHA",         typeOfLeave: "Casual Leave",  fromDate: "23-Nov-2024", toDate: "25-Nov-2024", createdDate: "22-Nov-2024", status: "INPROGRESS"     },
  { id: 10, employeeId: "250",  employeeName: "SAMINATHAN",     typeOfLeave: "Casual Leave",  fromDate: "07-Nov-2024", toDate: "09-Nov-2024", createdDate: "22-Nov-2024", status: "INPROGRESS"     },
  { id: 11, employeeId: "312",  employeeName: "SELVI",          typeOfLeave: "Medical Leave", fromDate: "01-Oct-2024", toDate: "03-Oct-2024", createdDate: "01-Oct-2024", status: "APPROVED"       },
  { id: 12, employeeId: "187",  employeeName: "KUMAR",          typeOfLeave: "Earned Leave",  fromDate: "15-Sep-2024", toDate: "20-Sep-2024", createdDate: "14-Sep-2024", status: "FINAL_APPROVED" },
];

const STATUS_STYLE: Record<LeaveRecord["status"], string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  APPROVED:       "bg-[#28a745] text-white",
  REJECTED:       "bg-[#dc3545] text-white",
  INPROGRESS:     "bg-[#6c757d] text-white",
};

type SortKey = keyof LeaveRecord;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <span className="ml-1 text-[10px] opacity-50">⇅</span>;
  return <span className="ml-1 text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>;
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

export default function LeaveRequestListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterId,     setFilterId]     = useState("");
  const [filterName,   setFilterName]   = useState("");
  const [filterType,   setFilterType]   = useState("");
  const [filterFrom,   setFilterFrom]   = useState("");
  const [filterTo,     setFilterTo]     = useState("");
  const [filterDate,   setFilterDate]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortKey,  setSortKey]  = useState<SortKey>("id");
  const [sortDir,  setSortDir]  = useState<SortDir>("asc");
  const [page,     setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (col: SortKey) => {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("asc"); }
    setPage(1);
  };

  const handleClear = () => {
    setSelectedId(null);
    setFilterId(""); setFilterName(""); setFilterType(""); setFilterFrom("");
    setFilterTo(""); setFilterDate(""); setFilterStatus("");
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.employeeId.includes(filterId) &&
    r.employeeName.toLowerCase().includes(filterName.toLowerCase()) &&
    r.typeOfLeave.toLowerCase().includes(filterType.toLowerCase()) &&
    r.fromDate.toLowerCase().includes(filterFrom.toLowerCase()) &&
    r.toDate.toLowerCase().includes(filterTo.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filterDate.toLowerCase()) &&
    r.status.toLowerCase().includes(filterStatus.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey]; const bv = b[sortKey];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);

  const thClass = "border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white whitespace-nowrap cursor-pointer select-none hover:bg-[#267a68]";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Leave Request List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Leave Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Leave Request List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{filtered.length}</span> - Leave Request(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/leave-management/leave-request/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/leave-management/leave-request/edit?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/leave-management/leave-request/view?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
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
                  <div onClick={() => handleSort("employeeId")} className="flex items-center justify-center gap-1">Employee ID <SortIcon col="employeeId" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterId} onChange={(e) => { setFilterId(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("employeeName")} className="flex items-center justify-center gap-1">Employee Name <SortIcon col="employeeName" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterName} onChange={(e) => { setFilterName(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("typeOfLeave")} className="flex items-center justify-center gap-1">Type of Leave <SortIcon col="typeOfLeave" sortKey={sortKey} sortDir={sortDir} /></div>
                  <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option>Casual Leave</option>
                    <option>Medical Leave</option>
                    <option>Earned Leave</option>
                  </select>
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("fromDate")} className="flex items-center justify-center gap-1">From Date <SortIcon col="fromDate" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterFrom} onChange={(e) => { setFilterFrom(e.target.value); setPage(1); }} placeholder="DD-MM-YYYY" className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("toDate")} className="flex items-center justify-center gap-1">To Date <SortIcon col="toDate" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterTo} onChange={(e) => { setFilterTo(e.target.value); setPage(1); }} placeholder="DD-MM-YYYY" className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("createdDate")} className="flex items-center justify-center gap-1">Created Date <SortIcon col="createdDate" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} placeholder="DD-MM-YYYY" className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("status")} className="flex items-center justify-center gap-1">Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} /></div>
                  <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option value="FINAL_APPROVED">FINAL_APPROVED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="INPROGRESS">INPROGRESS</option>
                  </select>
                </th>
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSel = selectedId === row.id;
                  return (
                    <tr key={row.id} onClick={() => setSelectedId(isSel ? null : row.id)}
                      className={`cursor-pointer transition-colors ${isSel ? "bg-[#e8f4f0] dark:bg-[#1a2e28]" : idx % 2 === 0 ? "bg-white hover:bg-green-50 dark:bg-gray-dark" : "bg-[#f9fafb] hover:bg-green-50 dark:bg-[#1a2232]"}`}>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.employeeId}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.employeeName}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.typeOfLeave}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.fromDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.toDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.createdDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <input type="radio" checked={isSel} onChange={() => setSelectedId(row.id)} className="size-4 accent-[#2d8f7b]" onClick={(e) => e.stopPropagation()} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>({Math.min((page - 1) * pageSize + 1, sorted.length)}–{Math.min(page * pageSize, sorted.length)} of {sorted.length})</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border border-stroke bg-white px-2 py-1 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">«</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">‹</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…" ? <span key={`e${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
              : <button key={p} onClick={() => setPage(p as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
