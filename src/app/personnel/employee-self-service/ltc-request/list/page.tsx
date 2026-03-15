"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AppliedFor = "Self" | "Family" | "";
type Status = "SUBMITTED" | "APPROVED" | "FINAL APPROVED" | "";

interface LTCRecord {
  id: number;
  referenceNumber: string;
  employeeCode: string;
  employeeName: string;
  department: string;
  section: string;
  noOfDays: number;
  createdDate: string;
  appliedFor: AppliedFor;
  status: Status;
}

const RECORDS: LTCRecord[] = [
  {
    id: 1,
    referenceNumber: "EMPL1168",
    employeeCode: "252",
    employeeName: "SANKARANARAYANAN C",
    department: "ADMIN",
    section: "EDP",
    noOfDays: 1,
    createdDate: "22-Mar-2024",
    appliedFor: "Family",
    status: "SUBMITTED",
  },
];

function StatusBadge({ status }: { status: Status }) {
  if (!status) return null;
  const cls =
    status === "FINAL APPROVED"
      ? "bg-[#28a745] text-white"
      : status === "SUBMITTED"
        ? "bg-[#17b8c8] text-white"
        : "bg-[#17a2b8] text-white";
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function LTCRequestListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // filters
  const [fRef, setFRef] = useState("");
  const [fEmp, setFEmp] = useState("");
  const [fDept, setFDept] = useState("");
  const [fSection, setFSection] = useState("");
  const [fDays, setFDays] = useState("");
  const [fDate, setFDate] = useState("");
  const [fAppliedFor, setFAppliedFor] = useState<AppliedFor>("");
  const [fStatus, setFStatus] = useState<Status>("");

  const filtered = RECORDS.filter((r) => {
    if (fRef && !r.referenceNumber.toLowerCase().includes(fRef.toLowerCase())) return false;
    if (fEmp && !(r.employeeCode + "/" + r.employeeName).toLowerCase().includes(fEmp.toLowerCase())) return false;
    if (fDept && !r.department.toLowerCase().includes(fDept.toLowerCase())) return false;
    if (fSection && !r.section.toLowerCase().includes(fSection.toLowerCase())) return false;
    if (fDays && String(r.noOfDays) !== fDays) return false;
    if (fDate && !r.createdDate.toLowerCase().includes(fDate.toLowerCase())) return false;
    if (fAppliedFor && r.appliedFor !== fAppliedFor) return false;
    if (fStatus && r.status !== fStatus) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const selectedRecord = RECORDS.find((r) => r.id === selectedId);

  function handleClear() {
    setFRef(""); setFEmp(""); setFDept(""); setFSection("");
    setFDays(""); setFDate(""); setFAppliedFor(""); setFStatus("");
    setSelectedId(null); setPage(1);
  }

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Leave Travel Concession List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Leave Travel Concession List</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
          <p className="text-sm font-medium text-dark dark:text-white">
            {filtered.length} - Leave Travel Concession(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.push("/personnel/employee-self-service/ltc-request/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
              Add
            </button>
            <button
              type="button"
              disabled={!selectedId}
              onClick={() => selectedId && router.push(`/personnel/employee-self-service/ltc-request/create?id=${selectedId}`)}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              type="button"
              disabled={!selectedId}
              onClick={() => selectedId && router.push("/personnel/employee-self-service/ltc-request/view")}
              className="flex items-center gap-1.5 rounded bg-[#17b8c8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button>
            <button
              type="button"
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
              Delete
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="px-3 py-2 text-center font-semibold">#</th>
                <th className="px-3 py-2 text-left font-semibold">Reference Number</th>
                <th className="px-3 py-2 text-left font-semibold">Employee Code / Name</th>
                <th className="px-3 py-2 text-left font-semibold">Department</th>
                <th className="px-3 py-2 text-left font-semibold">Section</th>
                <th className="px-3 py-2 text-center font-semibold">No. of Days</th>
                <th className="px-3 py-2 text-left font-semibold">Created Date</th>
                <th className="px-3 py-2 text-left font-semibold">Applied For</th>
                <th className="px-3 py-2 text-center font-semibold">Status</th>
                <th className="px-3 py-2 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-[#2d8f7b]">
                <td className="px-2 py-1" />
                <td className="px-2 py-1">
                  <input value={fRef} onChange={(e) => setFRef(e.target.value)}
                    className="w-full rounded border border-white/40 bg-white px-2 py-1 text-xs text-dark focus:outline-none" />
                </td>
                <td className="px-2 py-1">
                  <input value={fEmp} onChange={(e) => setFEmp(e.target.value)}
                    className="w-full rounded border border-white/40 bg-white px-2 py-1 text-xs text-dark focus:outline-none" />
                </td>
                <td className="px-2 py-1">
                  <input value={fDept} onChange={(e) => setFDept(e.target.value)}
                    className="w-full rounded border border-white/40 bg-white px-2 py-1 text-xs text-dark focus:outline-none" />
                </td>
                <td className="px-2 py-1">
                  <input value={fSection} onChange={(e) => setFSection(e.target.value)}
                    className="w-full rounded border border-white/40 bg-white px-2 py-1 text-xs text-dark focus:outline-none" />
                </td>
                <td className="px-2 py-1">
                  <input value={fDays} onChange={(e) => setFDays(e.target.value)}
                    className="w-full rounded border border-white/40 bg-white px-2 py-1 text-xs text-dark focus:outline-none" />
                </td>
                <td className="px-2 py-1">
                  <div className="flex items-center gap-1 rounded border border-white/40 bg-white px-2 py-1">
                    <input value={fDate} onChange={(e) => setFDate(e.target.value)}
                      placeholder="dd-MMM-yyyy"
                      className="min-w-0 flex-1 text-xs text-dark focus:outline-none" />
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </td>
                <td className="px-2 py-1">
                  <select value={fAppliedFor} onChange={(e) => setFAppliedFor(e.target.value as AppliedFor)}
                    className="w-full rounded border border-white/40 bg-white px-2 py-1 text-xs text-dark focus:outline-none">
                    <option value="">Select</option>
                    <option value="Self">Self</option>
                    <option value="Family">Family</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <select value={fStatus} onChange={(e) => setFStatus(e.target.value as Status)}
                    className="w-full rounded border border-white/40 bg-white px-2 py-1 text-xs text-dark focus:outline-none">
                    <option value="">Select</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="FINAL APPROVED">FINAL APPROVED</option>
                  </select>
                </td>
                <td className="px-2 py-1" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-sm text-gray-500">No records found.</td>
                </tr>
              ) : (
                paginated.map((rec, idx) => {
                  const isSelected = selectedId === rec.id;
                  return (
                    <tr key={rec.id}
                      className={`border-b border-stroke last:border-0 dark:border-dark-3 ${isSelected ? "bg-[#d1f5f9]" : "hover:bg-gray-50 dark:hover:bg-dark-2"}`}>
                      <td className="px-3 py-2 text-center">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="px-3 py-2 text-[#17b8c8]">{rec.referenceNumber}</td>
                      <td className="px-3 py-2">{rec.employeeCode}/{rec.employeeName}</td>
                      <td className="px-3 py-2">{rec.department}</td>
                      <td className="px-3 py-2">{rec.section}</td>
                      <td className="px-3 py-2 text-center">{rec.noOfDays}</td>
                      <td className="px-3 py-2">{rec.createdDate}</td>
                      <td className="px-3 py-2">{rec.appliedFor}</td>
                      <td className="px-3 py-2 text-center">
                        <StatusBadge status={rec.status} />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input type="radio" name="ltc-select"
                          checked={isSelected}
                          onChange={() => setSelectedId(rec.id)}
                          className="accent-[#17b8c8]" />
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
          <span className="text-xs text-gray-500">
            ({page} of {totalPages})
          </span>
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
            &#171;
          </button>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
            &#8249;
          </button>
          {visiblePages(page, totalPages).map((p, i) =>
            p === "…" ? (
              <span key={`e${i}`} className="px-1 text-sm text-gray-400">…</span>
            ) : (
              <button key={p} onClick={() => setPage(p as number)}
                className={`flex size-7 items-center justify-center rounded border text-sm ${page === p ? "border-[#17b8c8] bg-[#17b8c8] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"}`}>
                {p}
              </button>
            )
          )}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
            &#8250;
          </button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
            &#187;
          </button>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded border border-stroke px-2 py-1 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {[10, 25, 50, 100].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
