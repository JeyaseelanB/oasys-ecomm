"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ChargeStatus = "CHARGE_SUBMITTED" | "CHARGE_APPROVED" | "CHARGE_REJECTED" | "EMPLOYEE_ACCEPT_PENDING" | "EMPLOYEE_ACCEPTED" | "EMPLOYEE_DECLINED" | "RELIEVE_SUBMITTED" | "RELIEVE_APPROVED" | "RELIEVE_REJECTED" | "RELIEVE_FINAL_APPROVED";

interface AdditionalChargeItem {
  id: number;
  employeeCodeName: string;
  designation: string;
  additionalCharge: string;
  fromDate: string;
  createdDate: string;
  status: ChargeStatus;
}

const SAMPLE_DATA: AdditionalChargeItem[] = [
  { id: 1, employeeCodeName: "242/ANURADHA", designation: "AUDITOR", additionalCharge: "ASSISTANT GENERAL MANAGER ADMIN INCHARGE", fromDate: "18-Jul-2025", createdDate: "17-Jul-2025", status: "CHARGE_SUBMITTED" },
  { id: 2, employeeCodeName: "243/BHAVANI", designation: "MANAGER GRADE - II", additionalCharge: "DEPUTY GENERAL MANAGER", fromDate: "28-Jan-2025", createdDate: "28-Jan-2025", status: "EMPLOYEE_ACCEPTED" },
  { id: 3, employeeCodeName: "462/KUMAR", designation: "SALES MANAGER", additionalCharge: "PRODUCT MANAGER", fromDate: "13-Jan-2025", createdDate: "09-Jan-2025", status: "EMPLOYEE_ACCEPT_PENDING" },
  { id: 4, employeeCodeName: "281/THULASIDOSS", designation: "MANAGER GRADE - II", additionalCharge: "PRODUCT MANAGER", fromDate: "07-Jan-2025", createdDate: "07-Jan-2025", status: "EMPLOYEE_ACCEPT_PENDING" },
  { id: 5, employeeCodeName: "302/JAYAKUMAR", designation: "SALES MANAGER", additionalCharge: "ART DESIGNER", fromDate: "15-Jan-2025", createdDate: "06-Jan-2025", status: "CHARGE_SUBMITTED" },
  { id: 6, employeeCodeName: "415/SATHISH", designation: "MANAGER GRADE - II", additionalCharge: "REGIONAL MANAGER INCHARGE", fromDate: "15-Jan-2025", createdDate: "06-Jan-2025", status: "CHARGE_SUBMITTED" },
  { id: 7, employeeCodeName: "194/LAKSHMI PRABHA", designation: "MANAGER GRADE - II", additionalCharge: "JOINT DIRECTOR SCHEMES", fromDate: "22-Jan-2025", createdDate: "06-Jan-2025", status: "CHARGE_SUBMITTED" },
  { id: 8, employeeCodeName: "302/JAYAKUMAR", designation: "SALES MANAGER", additionalCharge: "SALES MANAGER", fromDate: "16-Jan-2025", createdDate: "06-Jan-2025", status: "CHARGE_SUBMITTED" },
  { id: 9, employeeCodeName: "26/SARAVANA PERUMAL", designation: "ASSISTANT SALES MAN", additionalCharge: "DEPUTY GENERAL MANAGER PRODUCTION AND PRODUCT DEVELOPMENT", fromDate: "22-Jan-2025", createdDate: "06-Jan-2025", status: "CHARGE_SUBMITTED" },
  { id: 10, employeeCodeName: "475/JAMBULINGAM", designation: "MANAGER GRADE - II", additionalCharge: "SENIOR SALES MANAGER", fromDate: "06-Jan-2025", createdDate: "06-Jan-2025", status: "CHARGE_SUBMITTED" },
];

type SortKey = keyof AdditionalChargeItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_COLORS: Record<ChargeStatus, string> = {
  CHARGE_SUBMITTED: "#17a2b8",
  CHARGE_APPROVED: "#28a745",
  CHARGE_REJECTED: "#dc3545",
  EMPLOYEE_ACCEPT_PENDING: "#FFA70B",
  EMPLOYEE_ACCEPTED: "#28a745",
  EMPLOYEE_DECLINED: "#dc3545",
  RELIEVE_SUBMITTED: "#17a2b8",
  RELIEVE_APPROVED: "#28a745",
  RELIEVE_REJECTED: "#dc3545",
  RELIEVE_FINAL_APPROVED: "#28a745",
};

const STATUS_OPTIONS = [
  { value: "CHARGE_SUBMITTED", label: "Charge Submitted" },
  { value: "CHARGE_APPROVED", label: "Charge Approved" },
  { value: "CHARGE_REJECTED", label: "Charge Rejected" },
  { value: "EMPLOYEE_ACCEPT_PENDING", label: "Employee Accept Pending" },
  { value: "EMPLOYEE_ACCEPTED", label: "Employee Accepted" },
  { value: "EMPLOYEE_DECLINED", label: "Employee Declined" },
  { value: "RELIEVE_SUBMITTED", label: "Relieve Submitted" },
  { value: "RELIEVE_APPROVED", label: "Relieve Approved" },
  { value: "RELIEVE_REJECTED", label: "Relieve Rejected" },
  { value: "RELIEVE_FINAL_APPROVED", label: "Relieve Final Approved" },
];

export default function AdditionalChargeListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ employeeCodeName: "", designation: "", additionalCharge: "", fromDate: "", createdDate: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.employeeCodeName.toLowerCase().includes(filters.employeeCodeName.toLowerCase()) &&
    row.designation.toLowerCase().includes(filters.designation.toLowerCase()) &&
    row.additionalCharge.toLowerCase().includes(filters.additionalCharge.toLowerCase()) &&
    (filters.fromDate === "" || row.fromDate.includes(filters.fromDate)) &&
    (filters.createdDate === "" || row.createdDate.includes(filters.createdDate)) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ employeeCodeName: "", designation: "", additionalCharge: "", fromDate: "", createdDate: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Additional Charge List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Additional Charge List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">{filtered.length}</span> - Additional Charge(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button disabled={selectedId === null} onClick={() => selectedId !== null && router.push("/personnel/human-resource/additional-charge/relieve")} className={`flex items-center gap-1.5 rounded border border-[#dc3545] px-4 py-2 text-sm font-medium ${selectedId !== null ? "text-[#dc3545] hover:bg-gray-200" : "cursor-not-allowed opacity-50 text-[#dc3545]"}`}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              Relieve
            </button>
            {selectedId === null ? (
              <Link href="/personnel/human-resource/additional-charge/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </Link>
            ) : (
              <button disabled className="flex cursor-not-allowed items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            )}
            <button disabled className="flex cursor-not-allowed items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button disabled={selectedId === null} onClick={() => selectedId !== null && router.push("/personnel/human-resource/additional-charge/view")} className={`flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white ${selectedId !== null ? "hover:opacity-90" : "cursor-not-allowed opacity-50"}`}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled className="flex cursor-not-allowed items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              Delete
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeCodeName")}>Employee Code/Name <SortIcon col="employeeCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("designation")}>Designation <SortIcon col="designation" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("additionalCharge")}>Additional Charge <SortIcon col="additionalCharge" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("fromDate")}>From Date <SortIcon col="fromDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeCodeName} onChange={(e) => { setFilters((f) => ({ ...f, employeeCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.designation} onChange={(e) => { setFilters((f) => ({ ...f, designation: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.additionalCharge} onChange={(e) => { setFilters((f) => ({ ...f, additionalCharge: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" placeholder="DD-MM-YYYY" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.fromDate} onChange={(e) => { setFilters((f) => ({ ...f, fromDate: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" placeholder="DD-MM-YYYY" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{STATUS_OPTIONS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={8} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#d4f0eb]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} ${selectedId !== row.id ? "hover:bg-blue-50 dark:hover:bg-[#1e2d42]" : ""}`}>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.employeeCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.designation}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.additionalCharge}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.fromDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center dark:border-dark-3"><span className="inline-block rounded-sm px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: STATUS_COLORS[row.status] }}>{row.status}</span></td>
                    <td className="px-2 py-3 text-center"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) => page === "..." ? (<span key={`e-${i}`} className="px-1 text-gray-400">...</span>) : (<button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>{PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
          </div>
        </div>
      </div>
    </div>
  );
}
