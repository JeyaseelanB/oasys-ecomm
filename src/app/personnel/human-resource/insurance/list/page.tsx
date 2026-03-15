"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type InsuranceStatus = "FINAL APPROVED" | "INPROGRESS" | "INSURANCE CLOSED";

interface InsuranceItem {
  id: number;
  referenceNo: string;
  hoRo: string;
  entity: string;
  employeeCodeName: string;
  insuranceType: string;
  insuranceAmount: number;
  createdDate: string;
  status: InsuranceStatus;
}

const SAMPLE_DATA: InsuranceItem[] = [
  { id: 1, referenceNo: "GMINS1283", hoRo: "HEAD OFFICE", entity: "HEAD OFFICE", employeeCodeName: "165/MANGALAM K", insuranceType: "LIC 1(CUD)", insuranceAmount: 200000.00, createdDate: "12-Aug-2024", status: "FINAL APPROVED" },
  { id: 2, referenceNo: "GMINS1281", hoRo: "HEAD OFFICE", entity: "HEAD OFFICE", employeeCodeName: "165/MANGALAM K", insuranceType: "LIC 4(VJA)", insuranceAmount: 200000.00, createdDate: "09-Aug-2024", status: "INPROGRESS" },
  { id: 3, referenceNo: "GMINS1280", hoRo: "THANJAVUR", entity: "THANJAVUR", employeeCodeName: "694/UDAYAKUMAR L", insuranceType: "LIC 1(KUMBAKONAM)", insuranceAmount: 200000.00, createdDate: "27-Feb-2024", status: "INSURANCE CLOSED" },
  { id: 4, referenceNo: "GMINS1279", hoRo: "THANJAVUR", entity: "PWH - THANJAVUR", employeeCodeName: "643/JAYANTHI S", insuranceType: "LIC 1(KUMBAKONAM)", insuranceAmount: 200000.00, createdDate: "30-Oct-2023", status: "INSURANCE CLOSED" },
  { id: 5, referenceNo: "GMINS1278", hoRo: "VIJAYAWADA", entity: "GUNTUR", employeeCodeName: "860/RAJARANI H", insuranceType: "LIC 1(VJA)", insuranceAmount: 200000.00, createdDate: "26-Sep-2023", status: "FINAL APPROVED" },
  { id: 6, referenceNo: "GMINS1276", hoRo: "VIJAYAWADA", entity: "ELURU ROAD ERO EXPO", employeeCodeName: "893/VENU PYNAM", insuranceType: "LIC 1", insuranceAmount: 200000.00, createdDate: "29-Jul-2023", status: "FINAL APPROVED" },
  { id: 7, referenceNo: "GMINS1275", hoRo: "SALEM", entity: "ISSR - SALEM", employeeCodeName: "84/RAMESH N", insuranceType: "LIC 1(SALEM)", insuranceAmount: 200000.00, createdDate: "22-Jun-2023", status: "INSURANCE CLOSED" },
  { id: 8, referenceNo: "GMINS1274", hoRo: "SALEM", entity: "ISSR - SALEM", employeeCodeName: "64/SURESH G", insuranceType: "LIC 1(SALEM)", insuranceAmount: 200000.00, createdDate: "22-Jun-2023", status: "FINAL APPROVED" },
  { id: 9, referenceNo: "GMINS1273", hoRo: "THANJAVUR", entity: "TEAM CAMPUS THANJAVUR 2", employeeCodeName: "691/SURESH R", insuranceType: "LIC 2(TNJ)", insuranceAmount: 200000.00, createdDate: "27-Apr-2023", status: "FINAL APPROVED" },
  { id: 10, referenceNo: "GMINS1272", hoRo: "THANJAVUR", entity: "TEAM CAMPUS THANJAVUR 2", employeeCodeName: "691/SURESH R", insuranceType: "LIC 1(TNJ)", insuranceAmount: 200000.00, createdDate: "27-Apr-2023", status: "FINAL APPROVED" },
];

type SortKey = keyof InsuranceItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_COLORS: Record<InsuranceStatus, string> = {
  "FINAL APPROVED": "#28a745",
  "INPROGRESS": "#FFA70B",
  "INSURANCE CLOSED": "#dc3545",
};

const STATUS_OPTIONS: { value: InsuranceStatus; label: string }[] = [
  { value: "FINAL APPROVED", label: "Final Approved" },
  { value: "INPROGRESS", label: "Inprogress" },
  { value: "INSURANCE CLOSED", label: "Insurance Closed" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function InsuranceListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ referenceNo: "", hoRo: "", entity: "", employeeCodeName: "", insuranceType: "", insuranceAmount: "", createdDate: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitMonth, setExitMonth] = useState("");
  const [exitYear, setExitYear] = useState("");

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNo.toLowerCase().includes(filters.referenceNo.toLowerCase()) &&
    row.hoRo.toLowerCase().includes(filters.hoRo.toLowerCase()) &&
    row.entity.toLowerCase().includes(filters.entity.toLowerCase()) &&
    row.employeeCodeName.toLowerCase().includes(filters.employeeCodeName.toLowerCase()) &&
    row.insuranceType.toLowerCase().includes(filters.insuranceType.toLowerCase()) &&
    (filters.insuranceAmount === "" || String(row.insuranceAmount).includes(filters.insuranceAmount)) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ referenceNo: "", hoRo: "", entity: "", employeeCodeName: "", insuranceType: "", insuranceAmount: "", createdDate: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Insurance List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Insurance List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">{filtered.length}</span> - Insurance(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => { if (selectedId !== null) setShowExitModal(true); }} disabled={selectedId === null} className={`flex items-center gap-1.5 rounded border border-[#17a2b8] px-4 py-2 text-sm font-medium ${selectedId !== null ? "text-[#17a2b8] hover:bg-gray-200" : "cursor-not-allowed opacity-50 text-[#17a2b8]"}`}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Exit Insurance
            </button>
            {selectedId === null ? (
              <Link href="/personnel/human-resource/insurance/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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
            <button disabled={selectedId === null} onClick={() => selectedId !== null && router.push("/personnel/human-resource/insurance/view")} className={`flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white ${selectedId !== null ? "hover:opacity-90" : "cursor-not-allowed opacity-50"}`}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
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
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("referenceNo")}>Reference No. <SortIcon col="referenceNo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("hoRo")}>HO/RO <SortIcon col="hoRo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("entity")}>Entity <SortIcon col="entity" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeCodeName")}>Employee Code / Name <SortIcon col="employeeCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("insuranceType")}>Insurance Type <SortIcon col="insuranceType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("insuranceAmount")}>Insurance Amount (&#8377;) <SortIcon col="insuranceAmount" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNo} onChange={(e) => { setFilters((f) => ({ ...f, referenceNo: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.hoRo} onChange={(e) => { setFilters((f) => ({ ...f, hoRo: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.entity} onChange={(e) => { setFilters((f) => ({ ...f, entity: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeCodeName} onChange={(e) => { setFilters((f) => ({ ...f, employeeCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.insuranceType} onChange={(e) => { setFilters((f) => ({ ...f, insuranceType: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.insuranceAmount} onChange={(e) => { setFilters((f) => ({ ...f, insuranceAmount: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{STATUS_OPTIONS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={10} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#d4f0eb]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} ${selectedId !== row.id ? "hover:bg-blue-50 dark:hover:bg-[#1e2d42]" : ""}`}>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.referenceNo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.hoRo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.entity}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.employeeCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.insuranceType}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.insuranceAmount.toFixed(2)}</td>
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

      {/* Exit Insurance Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Exit Insurance</h3>
              <button onClick={() => setShowExitModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-medium text-dark dark:text-white">Maturity Month <span className="text-red-500">*</span></p>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                    <select value={exitMonth} onChange={(e) => setExitMonth(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                      <option value="">Select</option>
                      {MONTHS.map((m) => (<option key={m} value={m}>{m}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-dark dark:text-white">Maturity Year <span className="text-red-500">*</span></p>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                    <select value={exitYear} onChange={(e) => setExitYear(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                      <option value="">Select</option>
                      {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowExitModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
