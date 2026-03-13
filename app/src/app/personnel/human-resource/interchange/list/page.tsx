"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

interface Row {
  id: number;
  referenceNumber: string;
  entity: string;
  employeeCodeName: string;
  currentDepartment: string;
  interchangeDepartment: string;
  createdDate: string;
  status: string;
}

const SAMPLE_DATA: Row[] = [
  { id: 1, referenceNumber: "10-INTER24OCT351", entity: "DWH - SALEM", employeeCodeName: "572/KANNAN", currentDepartment: "MARKETING", interchangeDepartment: "ADMIN", createdDate: "07-Oct-2024", status: "RELIEVE_SUBMITTED" },
  { id: 2, referenceNumber: "10-INTER24OCT341", entity: "ETHNICA - ANNA NAGAR", employeeCodeName: "332/RAMANATHAN", currentDepartment: "MARKETING", interchangeDepartment: "ADMIN", createdDate: "04-Oct-2024", status: "RELIEVE_SUBMITTED" },
  { id: 3, referenceNumber: "10-INTER24OCT331", entity: "ISSR - CUDDALORE", employeeCodeName: "861/SUNDAR RAJAN", currentDepartment: "MARKETING", interchangeDepartment: "ADMIN", createdDate: "04-Oct-2024", status: "SUBMITTED" },
  { id: 4, referenceNumber: "10-INTER24OCT321", entity: "VELACHERY", employeeCodeName: "288/AROKIA DOSS", currentDepartment: "MARKETING", interchangeDepartment: "ADMIN", createdDate: "04-Oct-2024", status: "JOINING_SUBMITTED" },
  { id: 5, referenceNumber: "10-INTER24AUG311", entity: "HEAD OFFICE", employeeCodeName: "F00634/BHUVANESWARI", currentDepartment: "ADMIN", interchangeDepartment: "ADMIN", createdDate: "26-Aug-2024", status: "RELIEVE_SUBMITTED" },
  { id: 6, referenceNumber: "10-INTER24AUG301", entity: "DWH - COIMBATORE", employeeCodeName: "P00899/SURYAPRABA", currentDepartment: "MARKETING", interchangeDepartment: "ADMIN", createdDate: "26-Aug-2024", status: "SUBMITTED" },
  { id: 7, referenceNumber: "10-INTER24AUG291", entity: "HEAD OFFICE", employeeCodeName: "194/LAKSHMI PRABHA", currentDepartment: "ADMIN", interchangeDepartment: "MARKETING", createdDate: "19-Aug-2024", status: "JOINING_FINAL_APPROVED" },
  { id: 8, referenceNumber: "10-INTER24AUG281", entity: "HEAD OFFICE", employeeCodeName: "F00646/GIRIRANI", currentDepartment: "ADMIN", interchangeDepartment: "ADMIN", createdDate: "16-Aug-2024", status: "RELIEVE_SUBMITTED" },
  { id: 9, referenceNumber: "10-INTER24AUG271", entity: "HEAD OFFICE", employeeCodeName: "149/CAUVERI", currentDepartment: "ADMIN", interchangeDepartment: "TECHNICAL", createdDate: "16-Aug-2024", status: "RELIEVE_FINAL_APPROVED" },
  { id: 10, referenceNumber: "IRF034", entity: "HEAD OFFICE", employeeCodeName: "165/MANGALAM", currentDepartment: "ADMIN", interchangeDepartment: "TECHNICAL", createdDate: "08-Aug-2024", status: "INPROGRESS" },
];

const STATUS_OPTIONS = ["RELIEVE_SUBMITTED", "SUBMITTED", "JOINING_SUBMITTED", "JOINING_FINAL_APPROVED", "RELIEVE_FINAL_APPROVED", "INPROGRESS"];

const statusColor = (s: string) => {
  switch (s) {
    case "RELIEVE_SUBMITTED": return "#E67E22";
    case "SUBMITTED": return "#28a745";
    case "JOINING_SUBMITTED": return "#F39C12";
    case "JOINING_FINAL_APPROVED": return "#27ae60";
    case "RELIEVE_FINAL_APPROVED": return "#17a2b8";
    case "INPROGRESS": return "#6c757d";
    default: return "#6c757d";
  }
};

export default function InterchangeListPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [sortCol, setSortCol] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [fRef, setFRef] = useState("");
  const [fEntity, setFEntity] = useState("");
  const [fEmpCode, setFEmpCode] = useState("");
  const [fCurrDept, setFCurrDept] = useState("");
  const [fInterDept, setFInterDept] = useState("");
  const [fDate, setFDate] = useState("");
  const [fStatus, setFStatus] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    let d = [...SAMPLE_DATA];
    if (fRef) d = d.filter((r) => r.referenceNumber.toLowerCase().includes(fRef.toLowerCase()));
    if (fEntity) d = d.filter((r) => r.entity.toLowerCase().includes(fEntity.toLowerCase()));
    if (fEmpCode) d = d.filter((r) => r.employeeCodeName.toLowerCase().includes(fEmpCode.toLowerCase()));
    if (fCurrDept) d = d.filter((r) => r.currentDepartment.toLowerCase().includes(fCurrDept.toLowerCase()));
    if (fInterDept) d = d.filter((r) => r.interchangeDepartment.toLowerCase().includes(fInterDept.toLowerCase()));
    if (fDate) d = d.filter((r) => r.createdDate.toLowerCase().includes(fDate.toLowerCase()));
    if (fStatus) d = d.filter((r) => r.status === fStatus);
    if (sortCol) {
      d.sort((a, b) => {
        const av = (a as unknown as Record<string, unknown>)[sortCol] as string;
        const bv = (b as unknown as Record<string, unknown>)[sortCol] as string;
        return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
      });
    }
    return d;
  }, [fRef, fEntity, fEmpCode, fCurrDept, fInterDept, fDate, fStatus, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortIcon = () => <span className="ml-1 text-[10px] opacity-70">&#8645;</span>;

  const handleClear = () => {
    setSelected(null);
    setFRef(""); setFEntity(""); setFEmpCode(""); setFCurrDept(""); setFInterDept(""); setFDate(""); setFStatus("");
    setPage(1);
  };

  const pageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Interchange List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Interchange List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-medium text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Interchange(s)
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#66BB6A" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17,11 19,13 23,9"/></svg>
              Joined On
            </button>
            <button
              disabled
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#E57373" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>
              Relieve
            </button>
            <button
              onClick={() => router.push("/personnel/human-resource/interchange/create")}
              disabled={selected !== null}
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#28a745" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              Add
            </button>
            <button
              disabled
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#17a2b8" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selected !== null && router.push("/personnel/human-resource/interchange/view")}
              disabled={selected === null}
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#17a2b8" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              disabled
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#dc3545" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              Delete
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#6c757d" }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-stroke dark:border-dark-3">
            <thead>
              <tr style={{ backgroundColor: "#26A69A" }}>
                <th className="border border-white/30 px-3 py-2 text-center w-12">
                  <span className="block text-xs font-semibold text-white">#</span>
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("referenceNumber")}>Reference Number <SortIcon /></span>
                  <input value={fRef} onChange={(e) => { setFRef(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("entity")}>Entity <SortIcon /></span>
                  <input value={fEntity} onChange={(e) => { setFEntity(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("employeeCodeName")}>Employee Code / Name <SortIcon /></span>
                  <input value={fEmpCode} onChange={(e) => { setFEmpCode(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("currentDepartment")}>Current Department <SortIcon /></span>
                  <input value={fCurrDept} onChange={(e) => { setFCurrDept(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("interchangeDepartment")}>Interchange Department <SortIcon /></span>
                  <input value={fInterDept} onChange={(e) => { setFInterDept(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("createdDate")}>Created Date <SortIcon /></span>
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" value={fDate} onChange={(e) => { setFDate(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                    <button className="rounded bg-white/20 p-1.5 text-white hover:bg-white/30">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </button>
                  </div>
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("status")}>Status <SortIcon /></span>
                  <select value={fStatus} onChange={(e) => { setFStatus(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-gray-500">
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </th>
                <th className="border border-white/30 px-3 py-2 text-center">
                  <span className="block text-xs font-semibold text-white">Select</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={9} className="border border-stroke px-4 py-3 text-left text-sm text-gray-500 dark:border-dark-3">No records found</td></tr>
              ) : (
                rows.map((r, idx) => (
                  <tr
                    key={r.id}
                    className="border-b border-stroke text-sm dark:border-dark-3"
                    style={selected === r.id ? { backgroundColor: "#d4f0eb" } : {}}
                  >
                    <td className="border border-stroke px-4 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(page - 1) * perPage + idx + 1}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.referenceNumber}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.entity}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.employeeCodeName}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.currentDepartment}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.interchangeDepartment}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.createdDate}</td>
                    <td className="border border-stroke px-4 py-3 dark:border-dark-3">
                      <span className="rounded px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: statusColor(r.status) }}>{r.status}</span>
                    </td>
                    <td className="border border-stroke px-4 py-3 text-center dark:border-dark-3">
                      <input
                        type="radio"
                        name="selectRow"
                        checked={selected === r.id}
                        onChange={() => setSelected(r.id)}
                        className="size-4 accent-[#17a2b8]"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 px-5 py-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">({page} of {totalPages})</span>
          <div className="flex items-center gap-0.5">
            <button onClick={() => setPage(1)} disabled={page === 1} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&laquo;</button>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&lsaquo;</button>
            {pageNumbers().map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`rounded border px-3 py-1.5 text-xs font-bold ${page === p ? "bg-[#3085d6] text-white border-[#3085d6]" : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:bg-dark-2"}`}>{p}</button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&rsaquo;</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-dark-2">&raquo;</button>
          </div>
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            {[10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
