"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

interface Row {
  id: number;
  referenceNumber: string;
  employeeCodeName: string;
  department: string;
  section: string;
  noOfDays: number;
  createdDate: string;
  appliedFor: string;
  status: string;
}

const SAMPLE_DATA: Row[] = [
  { id: 1, referenceNumber: "LTC004", employeeCodeName: "165/MANGALAM K", department: "TECHNICAL", section: "EDP", noOfDays: 7, createdDate: "03-Jul-2024", appliedFor: "Family", status: "FINALAPPROVED" },
  { id: 2, referenceNumber: "EMPL1168", employeeCodeName: "252/SANKARANARAYANAN C", department: "ADMIN", section: "EDP", noOfDays: 1, createdDate: "22-Mar-2024", appliedFor: "Family", status: "SUBMITTED" },
  { id: 3, referenceNumber: "LTC003", employeeCodeName: "243/BHAVANI S", department: "ADMIN", section: "Admin", noOfDays: 8, createdDate: "18-Jul-2022", appliedFor: "Self", status: "SUBMITTED" },
  { id: 4, referenceNumber: "EMPL1167", employeeCodeName: "194/LAKSHMI PRABHA RJ", department: "MARKETING", section: "Admin", noOfDays: 7, createdDate: "09-Sep-2021", appliedFor: "Self", status: "REJECTED" },
  { id: 5, referenceNumber: "Rc/LTC/96-99/99/A1", employeeCodeName: "813/SURESH N", department: "MARKETING", section: "", noOfDays: 0, createdDate: "12-Oct-2020", appliedFor: "", status: "" },
  { id: 6, referenceNumber: "Rc/LTC/96-99/99/A1", employeeCodeName: "813/SURESH N", department: "MARKETING", section: "", noOfDays: 0, createdDate: "12-Oct-2020", appliedFor: "", status: "" },
  { id: 7, referenceNumber: "Rc/LTC/2000-2003/2001-A2", employeeCodeName: "P00903/CHANDRASEKARAN NG", department: "TECHNICAL", section: "", noOfDays: 0, createdDate: "05-Oct-2020", appliedFor: "", status: "" },
  { id: 8, referenceNumber: "Rc/LTC/96-99/99-A2", employeeCodeName: "P00903/CHANDRASEKARAN NG", department: "TECHNICAL", section: "", noOfDays: 0, createdDate: "05-Oct-2020", appliedFor: "", status: "" },
  { id: 9, referenceNumber: "Rc/LTC/92-95/95-A2", employeeCodeName: "P00903/CHANDRASEKARAN NG", department: "TECHNICAL", section: "", noOfDays: 0, createdDate: "05-Oct-2020", appliedFor: "", status: "" },
  { id: 10, referenceNumber: "Rc/LTC/88-91/91-A2", employeeCodeName: "P00903/CHANDRASEKARAN NG", department: "TECHNICAL", section: "", noOfDays: 0, createdDate: "05-Oct-2020", appliedFor: "", status: "" },
];

const STATUS_OPTIONS = ["FINALAPPROVED", "SUBMITTED", "REJECTED"];
const APPLIED_OPTIONS = ["Self", "Family"];

const statusColor = (s: string) => {
  switch (s) {
    case "FINALAPPROVED": return "#17a2b8";
    case "SUBMITTED": return "#E67E22";
    case "REJECTED": return "#dc3545";
    default: return "#6c757d";
  }
};

export default function LeaveTravelConcessionListPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortCol, setSortCol] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [fRef, setFRef] = useState("");
  const [fEmp, setFEmp] = useState("");
  const [fDept, setFDept] = useState("");
  const [fSection, setFSection] = useState("");
  const [fDays, setFDays] = useState("");
  const [fDate, setFDate] = useState("");
  const [fApplied, setFApplied] = useState("");
  const [fStatus, setFStatus] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    let d = [...SAMPLE_DATA];
    if (fRef) d = d.filter((r) => r.referenceNumber.toLowerCase().includes(fRef.toLowerCase()));
    if (fEmp) d = d.filter((r) => r.employeeCodeName.toLowerCase().includes(fEmp.toLowerCase()));
    if (fDept) d = d.filter((r) => r.department.toLowerCase().includes(fDept.toLowerCase()));
    if (fSection) d = d.filter((r) => r.section.toLowerCase().includes(fSection.toLowerCase()));
    if (fDays) d = d.filter((r) => String(r.noOfDays).includes(fDays));
    if (fDate) d = d.filter((r) => r.createdDate.toLowerCase().includes(fDate.toLowerCase()));
    if (fApplied) d = d.filter((r) => r.appliedFor === fApplied);
    if (fStatus) d = d.filter((r) => r.status === fStatus);
    if (sortCol) {
      d.sort((a, b) => {
        const av = (a as unknown as Record<string, unknown>)[sortCol] as string;
        const bv = (b as unknown as Record<string, unknown>)[sortCol] as string;
        return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
      });
    }
    return d;
  }, [fRef, fEmp, fDept, fSection, fDays, fDate, fApplied, fStatus, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortIcon = () => <span className="ml-1 text-[10px] opacity-70">&#8645;</span>;

  const selectedRow = SAMPLE_DATA.find((r) => r.id === selected);
  const isFinalApproved = selectedRow?.status === "FINALAPPROVED";
  const isRejected = selectedRow?.status === "REJECTED";
  const isSubmitted = selectedRow?.status === "SUBMITTED";

  const handleClear = () => {
    setSelected(null);
    setFRef(""); setFEmp(""); setFDept(""); setFSection(""); setFDays(""); setFDate(""); setFApplied(""); setFStatus("");
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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Leave Travel Concession List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Leave Travel Concession List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-medium text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Leave Travel Concession(s)
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/personnel/human-resource/leave-travel-concession/create")} disabled={selected !== null} className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: "#28a745" }}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              Add
            </button>
            <button onClick={() => isRejected && router.push("/personnel/human-resource/leave-travel-concession/edit")} disabled={!isRejected} className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: "#17a2b8" }}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={() => selected !== null && router.push("/personnel/human-resource/leave-travel-concession/view")} disabled={selected === null} className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: "#17a2b8" }}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            {!isSubmitted && (
              <button onClick={() => isRejected && setShowDeleteModal(true)} disabled={!isRejected} className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: "#dc3545" }}>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                Delete
              </button>
            )}
            {!isSubmitted && !isRejected && (
              <button onClick={() => isFinalApproved && router.push("/personnel/human-resource/leave-travel-concession/bills-add")} disabled={!isFinalApproved} className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: "#28a745" }}>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                Bills Add
              </button>
            )}
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#6c757d" }}>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-stroke dark:border-dark-3">
            <thead>
              <tr style={{ backgroundColor: "#26A69A" }}>
                <th className="border border-white/30 px-3 py-2 text-center w-12"><span className="block text-xs font-semibold text-white">#</span></th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("referenceNumber")}>Reference Number <SortIcon /></span>
                  <input value={fRef} onChange={(e) => { setFRef(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("employeeCodeName")}>Employee Code / Name <SortIcon /></span>
                  <input value={fEmp} onChange={(e) => { setFEmp(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("department")}>Department <SortIcon /></span>
                  <input value={fDept} onChange={(e) => { setFDept(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("section")}>Section <SortIcon /></span>
                  <input value={fSection} onChange={(e) => { setFSection(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("noOfDays")}>No. of Days <SortIcon /></span>
                  <input value={fDays} onChange={(e) => { setFDays(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("createdDate")}>Created Date <SortIcon /></span>
                  <div className="flex items-center">
                    <input type="text" placeholder="dd-MMM-yyyy" value={fDate} onChange={(e) => { setFDate(e.target.value); setPage(1); }} className="w-full rounded-l border border-r-0 border-white/30 bg-white px-2 py-1.5 text-sm text-dark" />
                    <span className="inline-flex items-center rounded-r border border-white/30 bg-[#17a2b8] px-2 py-1.5">
                      <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                  </div>
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("appliedFor")}>Applied For <SortIcon /></span>
                  <select value={fApplied} onChange={(e) => { setFApplied(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-gray-500">
                    <option value="">Select</option>
                    {APPLIED_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </th>
                <th className="border border-white/30 px-3 py-2">
                  <span className="mb-1 flex cursor-pointer items-center text-xs font-semibold text-white" onClick={() => toggleSort("status")}>Status <SortIcon /></span>
                  <select value={fStatus} onChange={(e) => { setFStatus(e.target.value); setPage(1); }} className="w-full rounded border border-white/30 bg-white px-2 py-1.5 text-sm text-gray-500">
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </th>
                <th className="border border-white/30 px-3 py-2 text-center"><span className="block text-xs font-semibold text-white">Select</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={10} className="border border-stroke px-4 py-3 text-left text-sm text-gray-500 dark:border-dark-3">No records found</td></tr>
              ) : (
                rows.map((r, idx) => (
                  <tr key={r.id} className="border-b border-stroke text-sm dark:border-dark-3" style={selected === r.id ? { backgroundColor: "#d4f0eb" } : {}}>
                    <td className="border border-stroke px-4 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(page - 1) * perPage + idx + 1}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.referenceNumber}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.employeeCodeName}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.department}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.section}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.noOfDays || ""}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.createdDate}</td>
                    <td className="border border-stroke px-4 py-3 text-dark dark:border-dark-3 dark:text-white">{r.appliedFor}</td>
                    <td className="border border-stroke px-4 py-3 dark:border-dark-3">
                      {r.status && <span className="rounded px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: statusColor(r.status) }}>{r.status}</span>}
                    </td>
                    <td className="border border-stroke px-4 py-3 text-center dark:border-dark-3">
                      <input type="radio" name="selectRow" checked={selected === r.id} onChange={() => setSelected(r.id)} className="size-4 accent-[#17a2b8]" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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

      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
              <h3 className="text-sm font-semibold text-white">Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <p className="mb-6 text-sm text-dark dark:text-white">Are you sure you want to delete this record?</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  No
                </button>
                <button onClick={() => { setShowDeleteModal(false); setSelected(null); }} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
