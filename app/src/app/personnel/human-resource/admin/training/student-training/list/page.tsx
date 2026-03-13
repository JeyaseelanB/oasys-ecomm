"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type StudentTraining = {
  id: number;
  referenceNumber: string;
  institutionName: string;
  noOfDays: number;
  noOfStudents: number;
  createdDate: string;
  status: "APPROVED" | "SUBMITTED" | "CANCELLED" | "DRAFT";
};

const SAMPLE_DATA: StudentTraining[] = [
  { id: 1,  referenceNumber: "STR-2024-001", institutionName: "Anna University",        noOfDays: 5, noOfStudents: 20, createdDate: "01-Jan-2024", status: "APPROVED"  },
  { id: 2,  referenceNumber: "STR-2024-002", institutionName: "IIT Madras",             noOfDays: 3, noOfStudents: 15, createdDate: "05-Feb-2024", status: "SUBMITTED" },
  { id: 3,  referenceNumber: "STR-2024-003", institutionName: "PSG College",            noOfDays: 7, noOfStudents: 30, createdDate: "10-Mar-2024", status: "CANCELLED" },
  { id: 4,  referenceNumber: "STR-2024-004", institutionName: "Bharathiar University",  noOfDays: 4, noOfStudents: 25, createdDate: "15-Apr-2024", status: "APPROVED"  },
  { id: 5,  referenceNumber: "STR-2024-005", institutionName: "Madras University",      noOfDays: 2, noOfStudents: 10, createdDate: "20-May-2024", status: "SUBMITTED" },
  { id: 6,  referenceNumber: "STR-2024-006", institutionName: "SRM Institute",          noOfDays: 6, noOfStudents: 40, createdDate: "25-Jun-2024", status: "DRAFT"     },
  { id: 7,  referenceNumber: "STR-2024-007", institutionName: "VIT University",         noOfDays: 5, noOfStudents: 35, createdDate: "01-Jul-2024", status: "SUBMITTED" },
  { id: 8,  referenceNumber: "STR-2024-008", institutionName: "Coimbatore Institute",   noOfDays: 3, noOfStudents: 18, createdDate: "10-Aug-2024", status: "APPROVED"  },
  { id: 9,  referenceNumber: "STR-2024-009", institutionName: "Madurai Kamaraj Univ",   noOfDays: 4, noOfStudents: 22, createdDate: "15-Sep-2024", status: "CANCELLED" },
  { id: 10, referenceNumber: "STR-2024-010", institutionName: "Periyar University",     noOfDays: 2, noOfStudents: 12, createdDate: "20-Oct-2024", status: "SUBMITTED" },
  { id: 11, referenceNumber: "STR-2024-011", institutionName: "Annamalai University",   noOfDays: 5, noOfStudents: 28, createdDate: "05-Nov-2024", status: "APPROVED"  },
  { id: 12, referenceNumber: "STR-2024-012", institutionName: "Kongu Engineering",      noOfDays: 3, noOfStudents: 16, createdDate: "10-Dec-2024", status: "DRAFT"     },
];

type SortKey = keyof StudentTraining;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_BADGE: Record<StudentTraining["status"], string> = {
  "APPROVED":  "bg-[#28a745] text-white",
  "SUBMITTED": "bg-[#fd7e14] text-white",
  "CANCELLED": "bg-[#dc3545] text-white",
  "DRAFT":     "bg-[#6c757d] text-white",
};

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

export default function StudentTrainingListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterRef, setFilterRef] = useState("");
  const [filterInstitution, setFilterInstitution] = useState("");
  const [filterDays, setFilterDays] = useState("");
  const [filterStudents, setFilterStudents] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (col: SortKey) => {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("asc"); }
    setPage(1);
  };

  const handleClear = () => {
    setSelectedId(null);
    setFilterRef(""); setFilterInstitution(""); setFilterDays("");
    setFilterStudents(""); setFilterDate(""); setFilterStatus("");
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.referenceNumber.toLowerCase().includes(filterRef.toLowerCase()) &&
    r.institutionName.toLowerCase().includes(filterInstitution.toLowerCase()) &&
    String(r.noOfDays).includes(filterDays) &&
    String(r.noOfStudents).includes(filterStudents) &&
    r.createdDate.toLowerCase().includes(filterDate.toLowerCase()) &&
    (filterStatus === "" || r.status === filterStatus)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey]; const bv = b[sortKey];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const thClass = "border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white whitespace-nowrap cursor-pointer select-none hover:bg-[#267a68]";

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Student Training Request List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Training</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Student Training Request List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{filtered.length}</span> - Student Training Request(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/admin/training/student-training/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/training/student-training/edit?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#1976d2] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/training/student-training/view?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
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
                  <div onClick={() => handleSort("referenceNumber")} className="flex items-center justify-center gap-1">
                    Reference Number <SortIcon col="referenceNumber" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterRef} onChange={(e) => { setFilterRef(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("institutionName")} className="flex items-center justify-center gap-1">
                    Institution Name <SortIcon col="institutionName" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterInstitution} onChange={(e) => { setFilterInstitution(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("noOfDays")} className="flex items-center justify-center gap-1">
                    No. of Days <SortIcon col="noOfDays" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterDays} onChange={(e) => { setFilterDays(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("noOfStudents")} className="flex items-center justify-center gap-1">
                    No. of Students <SortIcon col="noOfStudents" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterStudents} onChange={(e) => { setFilterStudents(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("createdDate")} className="flex items-center justify-center gap-1">
                    Created Date <SortIcon col="createdDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" placeholder="dd-MMM-yyyy" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("status")} className="flex items-center justify-center gap-1">
                    Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </th>
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSelected = selectedId === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(isSelected ? null : row.id)}
                      className={`cursor-pointer transition-colors ${isSelected ? "bg-[#e8f4f8] dark:bg-[#1a2e3a]" : idx % 2 === 0 ? "bg-white hover:bg-blue-50 dark:bg-gray-dark" : "bg-[#f9fafb] hover:bg-blue-50 dark:bg-[#1a2232]"}`}
                    >
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.referenceNumber}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.institutionName}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.noOfDays}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.noOfStudents}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.createdDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold tracking-wide ${STATUS_BADGE[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <input type="radio" checked={isSelected} onChange={() => setSelectedId(row.id)} className="size-4 accent-[#2d8f7b]" onClick={(e) => e.stopPropagation()} />
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
              p === "…" ? (
                <span key={`e${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
