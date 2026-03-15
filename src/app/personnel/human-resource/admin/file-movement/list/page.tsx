"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FileStatus = "SUBMITTED" | "APPROVED";

interface FileMovementItem {
  id: number;
  referenceNumber: string;
  hoRo: string;
  entityType: string;
  entity: string;
  department: string;
  section: string;
  status: FileStatus;
}

const SAMPLE_DATA: FileMovementItem[] = [
  { id: 1, referenceNumber: "FMN277", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "SUBMITTED" },
  { id: 2, referenceNumber: "FMN271", hoRo: "CHENNAI", entityType: "Regional Office", entity: "CHENNAI", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 3, referenceNumber: "FMN250", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "", status: "APPROVED" },
  { id: 4, referenceNumber: "FMN248", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 5, referenceNumber: "FMN243", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 6, referenceNumber: "FMN239", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "", status: "APPROVED" },
  { id: 7, referenceNumber: "FMN238", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 8, referenceNumber: "FMN235", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 9, referenceNumber: "FMN232", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 10, referenceNumber: "FMN231", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 11, referenceNumber: "FMN228", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 12, referenceNumber: "FMN225", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "", status: "APPROVED" },
  { id: 13, referenceNumber: "FMN222", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 14, referenceNumber: "FMN219", hoRo: "CHENNAI", entityType: "Regional Office", entity: "CHENNAI", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 15, referenceNumber: "FMN216", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 16, referenceNumber: "FMN213", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "", status: "APPROVED" },
  { id: 17, referenceNumber: "FMN210", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 18, referenceNumber: "FMN207", hoRo: "CHENNAI", entityType: "Regional Office", entity: "CHENNAI", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 19, referenceNumber: "FMN204", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "Admin", status: "APPROVED" },
  { id: 20, referenceNumber: "FMN201", hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "ADMIN", section: "", status: "APPROVED" },
];

type SortKey = keyof FileMovementItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_COLORS: Record<FileStatus, string> = {
  SUBMITTED: "#FFA70B",
  APPROVED: "#28a745",
};

export default function FileMovementListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ referenceNumber: "", hoRo: "", entityType: "", entity: "", department: "", section: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase()) &&
    (filters.hoRo === "" || row.hoRo === filters.hoRo) &&
    (filters.entityType === "" || row.entityType === filters.entityType) &&
    (filters.entity === "" || row.entity === filters.entity) &&
    (filters.department === "" || row.department === filters.department) &&
    (filters.section === "" || row.section.toLowerCase().includes(filters.section.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ referenceNumber: "", hoRo: "", entityType: "", entity: "", department: "", section: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const uniqueHoRo = [...new Set(SAMPLE_DATA.map((r) => r.hoRo))];
  const uniqueEntityType = [...new Set(SAMPLE_DATA.map((r) => r.entityType))];
  const uniqueEntity = [...new Set(SAMPLE_DATA.map((r) => r.entity))];
  const uniqueDepartment = [...new Set(SAMPLE_DATA.map((r) => r.department))];
  const uniqueSection = [...new Set(SAMPLE_DATA.map((r) => r.section).filter(Boolean))];

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">File Movement List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">File Movement List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">51</span> - File Movement(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            {selectedId === null && (
              <Link href="/personnel/human-resource/admin/file-movement/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                Add
              </Link>
            )}
            <button disabled className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push("/personnel/human-resource/admin/file-movement/view"); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              View
            </button>
            <button disabled className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white opacity-50 cursor-not-allowed">
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
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("referenceNumber")}>Reference Number <SortIcon col="referenceNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("hoRo")}>HO/RO <SortIcon col="hoRo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("entityType")}>Entity Type <SortIcon col="entityType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("entity")}>Entity <SortIcon col="entity" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("department")}>Department <SortIcon col="department" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("section")}>Section <SortIcon col="section" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNumber} onChange={(e) => { setFilters((f) => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.hoRo} onChange={(e) => { setFilters((f) => ({ ...f, hoRo: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueHoRo.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.entityType} onChange={(e) => { setFilters((f) => ({ ...f, entityType: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueEntityType.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.entity} onChange={(e) => { setFilters((f) => ({ ...f, entity: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueEntity.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.department} onChange={(e) => { setFilters((f) => ({ ...f, department: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueDepartment.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.section} onChange={(e) => { setFilters((f) => ({ ...f, section: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueSection.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="SUBMITTED">SUBMITTED</option><option value="APPROVED">APPROVED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.referenceNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.hoRo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.entityType}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.entity}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.department}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.section}</td>
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
