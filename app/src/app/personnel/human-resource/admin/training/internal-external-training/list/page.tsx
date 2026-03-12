"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TrainingRecord = {
  id: number;
  referenceNumber: string;
  trainingType: "INTERNAL" | "EXTERNAL";
  trainingName: string;
  institutionName: string;
  startDate: string;
  endDate: string;
  noOfDays: number;
  createdDate: string;
  status: "FINAL_APPROVED" | "INITIATED" | "SUBMITTED" | "CANCELLED";
};

const SAMPLE_DATA: TrainingRecord[] = [
  { id: 1,  referenceNumber: "INTR-28", trainingType: "INTERNAL", trainingName: "Trail",             institutionName: "",              startDate: "04-Jul-2022", endDate: "06-Jul-2022", noOfDays: 3,  createdDate: "01-Jul-2022", status: "FINAL_APPROVED" },
  { id: 2,  referenceNumber: "INTR-27", trainingType: "INTERNAL", trainingName: "cooptex infotex",   institutionName: "",              startDate: "06-Nov-2020", endDate: "19-Nov-2020", noOfDays: 14, createdDate: "06-Nov-2020", status: "INITIATED"      },
  { id: 3,  referenceNumber: "INTR-26", trainingType: "INTERNAL", trainingName: "infotex",           institutionName: "",              startDate: "12-Oct-2020", endDate: "14-Oct-2020", noOfDays: 3,  createdDate: "12-Oct-2020", status: "FINAL_APPROVED" },
  { id: 4,  referenceNumber: "INTR-25", trainingType: "INTERNAL", trainingName: "infotex",           institutionName: "",              startDate: "15-Oct-2020", endDate: "17-Oct-2020", noOfDays: 3,  createdDate: "12-Oct-2020", status: "INITIATED"      },
  { id: 5,  referenceNumber: "INTR-24", trainingType: "INTERNAL", trainingName: "Infotex C...",      institutionName: "",              startDate: "08-Mar-2019", endDate: "08-Mar-2019", noOfDays: 1,  createdDate: "04-Mar-2019", status: "FINAL_APPROVED" },
  { id: 6,  referenceNumber: "EXTR-10", trainingType: "EXTERNAL", trainingName: "Digital Marketing", institutionName: "Anna University", startDate: "10-Jan-2024", endDate: "14-Jan-2024", noOfDays: 5, createdDate: "05-Jan-2024", status: "SUBMITTED"     },
  { id: 7,  referenceNumber: "EXTR-09", trainingType: "EXTERNAL", trainingName: "Leadership Skills", institutionName: "IIM Chennai",    startDate: "15-Feb-2024", endDate: "17-Feb-2024", noOfDays: 3, createdDate: "10-Feb-2024", status: "FINAL_APPROVED" },
  { id: 8,  referenceNumber: "INTR-23", trainingType: "INTERNAL", trainingName: "Safety Training",   institutionName: "",              startDate: "01-Mar-2024", endDate: "02-Mar-2024", noOfDays: 2,  createdDate: "25-Feb-2024", status: "INITIATED"      },
  { id: 9,  referenceNumber: "EXTR-08", trainingType: "EXTERNAL", trainingName: "Quality Control",   institutionName: "PSG College",   startDate: "20-Apr-2024", endDate: "24-Apr-2024", noOfDays: 5, createdDate: "15-Apr-2024", status: "CANCELLED"     },
  { id: 10, referenceNumber: "INTR-22", trainingType: "INTERNAL", trainingName: "HR Policies",       institutionName: "",              startDate: "05-May-2024", endDate: "05-May-2024", noOfDays: 1,  createdDate: "01-May-2024", status: "FINAL_APPROVED" },
];

type SortKey = keyof TrainingRecord;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_BADGE: Record<TrainingRecord["status"], string> = {
  "FINAL_APPROVED": "bg-[#28a745] text-white",
  "INITIATED":      "bg-[#6c757d] text-white",
  "SUBMITTED":      "bg-[#fd7e14] text-white",
  "CANCELLED":      "bg-[#dc3545] text-white",
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

export default function InternalExternalTrainingListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterRef, setFilterRef] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterInstitution, setFilterInstitution] = useState("");
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");
  const [filterDays, setFilterDays] = useState("");
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
    setFilterRef(""); setFilterType(""); setFilterName(""); setFilterInstitution("");
    setFilterStart(""); setFilterEnd(""); setFilterDays(""); setFilterDate(""); setFilterStatus("");
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.referenceNumber.toLowerCase().includes(filterRef.toLowerCase()) &&
    r.trainingType.toLowerCase().includes(filterType.toLowerCase()) &&
    r.trainingName.toLowerCase().includes(filterName.toLowerCase()) &&
    r.institutionName.toLowerCase().includes(filterInstitution.toLowerCase()) &&
    r.startDate.toLowerCase().includes(filterStart.toLowerCase()) &&
    r.endDate.toLowerCase().includes(filterEnd.toLowerCase()) &&
    String(r.noOfDays).includes(filterDays) &&
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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Internal / External Training List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Training</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Internal / External Training List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{filtered.length}</span> - Internal / External Training(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/admin/training/internal-external-training/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Training Request
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/training/internal-external-training/create-nominees?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/><line x1="20" y1="8" x2="20" y2="14"/></svg>
              Create Nominees
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/training/internal-external-training/edit?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/training/internal-external-training/view?id=${selectedId}`)}
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
                  <div onClick={() => handleSort("trainingType")} className="flex items-center justify-center gap-1">
                    Training Type <SortIcon col="trainingType" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("trainingName")} className="flex items-center justify-center gap-1">
                    Training Name <SortIcon col="trainingName" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterName} onChange={(e) => { setFilterName(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("institutionName")} className="flex items-center justify-center gap-1">
                    Institution Name <SortIcon col="institutionName" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterInstitution} onChange={(e) => { setFilterInstitution(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("startDate")} className="flex items-center justify-center gap-1">
                    Start Date <SortIcon col="startDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterStart} onChange={(e) => { setFilterStart(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("endDate")} className="flex items-center justify-center gap-1">
                    End Date <SortIcon col="endDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterEnd} onChange={(e) => { setFilterEnd(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("noOfDays")} className="flex items-center justify-center gap-1">
                    No. of Days <SortIcon col="noOfDays" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterDays} onChange={(e) => { setFilterDays(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("createdDate")} className="flex items-center justify-center gap-1">
                    Created Date <SortIcon col="createdDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("status")} className="flex items-center justify-center gap-1">
                    Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option value="FINAL_APPROVED">FINAL_APPROVED</option>
                    <option value="INITIATED">INITIATED</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </th>
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={11} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
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
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.trainingType}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.trainingName}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.institutionName || "-"}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.startDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.endDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.noOfDays}</td>
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
