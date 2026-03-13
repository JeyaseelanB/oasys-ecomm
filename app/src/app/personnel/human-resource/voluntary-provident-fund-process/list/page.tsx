"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface VPFRow {
  id: number;
  horo: string;
  entityType: string;
  entity: string;
  employeeId: string;
  department: string;
  designation: string;
  requestedAmount: number;
  effectiveDate: string;
  status: "FINAL APPROVED" | "SUBMITTED" | "APPROVED";
}

const PAGE_SIZES = [10, 20, 25, 50];

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

const SAMPLE_DATA: VPFRow[] = [
  { id: 1,  horo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", employeeId: "180", department: "TECHNICAL",   designation: "AGM(Production)\\C",     requestedAmount: 2000.00, effectiveDate: "01-Jul-2019", status: "FINAL APPROVED" },
  { id: 2,  horo: "CHENNAI",     entityType: "Regional",   entity: "CHENNAI RO",   employeeId: "245", department: "SALES",       designation: "SALES MANAGER",          requestedAmount: 1500.00, effectiveDate: "01-Jan-2020", status: "SUBMITTED" },
  { id: 3,  horo: "COIMBATORE",  entityType: "Branch",     entity: "COIMBATORE",   employeeId: "312", department: "ACCOUNTS",    designation: "SENIOR ACCOUNTANT",      requestedAmount: 3000.00, effectiveDate: "15-Mar-2021", status: "APPROVED" },
  { id: 4,  horo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", employeeId: "456", department: "HR",          designation: "HR MANAGER",             requestedAmount: 2500.00, effectiveDate: "01-Jun-2022", status: "FINAL APPROVED" },
  { id: 5,  horo: "MADURAI",     entityType: "Branch",     entity: "MADURAI",      employeeId: "189", department: "PRODUCTION",  designation: "PRODUCTION SUPERVISOR",  requestedAmount: 1800.00, effectiveDate: "01-Sep-2022", status: "SUBMITTED" },
];

const statusStyle: Record<string, string> = {
  "FINAL APPROVED": "bg-[#28a745] text-white",
  "SUBMITTED":      "bg-[#FFA70B] text-white",
  "APPROVED":       "bg-[#17a2b8] text-white",
};

export default function VPFListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page,        setPage]       = useState(1);
  const [pageSize,    setPageSize]   = useState(10);

  // Filter state
  const [fHoro,      setFHoro]      = useState("");
  const [fEntityType,setFEntityType]= useState("");
  const [fEntity,    setFEntity]    = useState("");
  const [fEmpId,     setFEmpId]     = useState("");
  const [fDept,      setFDept]      = useState("");
  const [fDesign,    setFDesign]    = useState("");
  const [fAmount,    setFAmount]    = useState("");
  const [fDate,      setFDate]      = useState("");
  const [fStatus,    setFStatus]    = useState("");

  const filtered = SAMPLE_DATA.filter(r =>
    r.horo.toLowerCase().includes(fHoro.toLowerCase()) &&
    r.entityType.toLowerCase().includes(fEntityType.toLowerCase()) &&
    r.entity.toLowerCase().includes(fEntity.toLowerCase()) &&
    r.employeeId.toLowerCase().includes(fEmpId.toLowerCase()) &&
    r.department.toLowerCase().includes(fDept.toLowerCase()) &&
    r.designation.toLowerCase().includes(fDesign.toLowerCase()) &&
    (fStatus === "" || r.status === fStatus)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFHoro(""); setFEntityType(""); setFEntity(""); setFEmpId("");
    setFDept(""); setFDesign(""); setFAmount(""); setFDate(""); setFStatus("");
    setPage(1);
  };

  const selectedRow = SAMPLE_DATA.find(r => r.id === selectedId);

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Voluntary Provident Fund Process List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Voluntary Provident Fund Process List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-stroke px-5 py-3 dark:border-dark-3">
          <span className="text-sm font-semibold text-dark dark:text-white">
            {filtered.length} - Voluntary Provident Fund Process(s)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={selectedId === null}
              onClick={() => selectedId && router.push("/personnel/human-resource/voluntary-provident-fund-process/view")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button>
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

        <div className="p-5">
          {/* Table */}
          <div className="mb-3 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm min-w-[1100px]">
              <thead>
                {/* Column headers */}
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">HO/RO</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Entity Type</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Entity</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Employee ID</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Department</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Requested Amount(₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Effective Date</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Status</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Select</th>
                </tr>
                {/* Filter row */}
                <tr className="bg-[#2d8f7b]">
                  <th className="border border-[#3aa88f] px-1 py-1" />
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={fHoro} onChange={e => setFHoro(e.target.value)}
                      className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={fEntityType} onChange={e => setFEntityType(e.target.value)}
                      className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={fEntity} onChange={e => setFEntity(e.target.value)}
                      className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={fEmpId} onChange={e => setFEmpId(e.target.value)}
                      className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={fDept} onChange={e => setFDept(e.target.value)}
                      className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={fDesign} onChange={e => setFDesign(e.target.value)}
                      className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={fAmount} onChange={e => setFAmount(e.target.value)}
                      className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <div className="flex items-center gap-1 rounded bg-white px-1">
                      <input type="text" value={fDate} onChange={e => setFDate(e.target.value)}
                        placeholder="dd-MMM-yyyy"
                        className="w-full border-0 bg-transparent py-1 text-xs text-dark outline-none" />
                      <svg className="size-3.5 shrink-0 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" />
                        <line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
                      </svg>
                    </div>
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <select value={fStatus} onChange={e => setFStatus(e.target.value)}
                      className="w-full rounded border-0 bg-white px-1 py-1 text-xs text-dark outline-none">
                      <option value="">Select</option>
                      <option>SUBMITTED</option>
                      <option>APPROVED</option>
                      <option>FINAL APPROVED</option>
                    </select>
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1" />
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-4 pl-3 text-left text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id}
                      className={`border-b border-stroke dark:border-dark-3 cursor-pointer ${selectedId === row.id ? "bg-[#2d8f7b] text-white" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}
                      onClick={() => setSelectedId(row.id === selectedId ? null : row.id)}
                    >
                      <td className={`border-r border-stroke px-2 py-2 text-center dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{(page - 1) * pageSize + idx + 1}</td>
                      <td className={`border-r border-stroke px-3 py-2 dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.horo}</td>
                      <td className={`border-r border-stroke px-3 py-2 dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.entityType}</td>
                      <td className={`border-r border-stroke px-3 py-2 dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.entity}</td>
                      <td className={`border-r border-stroke px-3 py-2 text-center dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.employeeId}</td>
                      <td className={`border-r border-stroke px-3 py-2 dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.department}</td>
                      <td className={`border-r border-stroke px-3 py-2 dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.designation}</td>
                      <td className={`border-r border-stroke px-3 py-2 text-right dark:border-dark-3 ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.requestedAmount.toFixed(2)}</td>
                      <td className={`border-r border-stroke px-3 py-2 text-center dark:border-dark-3 whitespace-nowrap ${selectedId === row.id ? "text-white" : "text-dark dark:text-white"}`}>{row.effectiveDate}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">
                        {selectedId === row.id ? (
                          <span className="inline-block rounded px-2 py-0.5 text-xs font-semibold text-white bg-white/20">{row.status}</span>
                        ) : (
                          <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${statusStyle[row.status]}`}>{row.status}</span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <input
                          type="radio"
                          checked={selectedId === row.id}
                          onChange={() => setSelectedId(row.id)}
                          onClick={e => e.stopPropagation()}
                          className="accent-[#2d8f7b]"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…" ? <span key={`e${i}`} className="px-1 text-gray-400">…</span> : (
                <button key={p} onClick={() => setPage(p as number)}
                  className={`flex size-7 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"}`}>
                  {p}
                </button>
              )
            )}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#187;</button>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="h-7 rounded border border-stroke bg-white px-1 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
