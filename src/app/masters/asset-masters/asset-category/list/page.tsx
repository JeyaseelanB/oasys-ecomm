"use client";

import Link from "next/link";
import { useState } from "react";

interface DataItem {
  id: number;
  parent: string;
  assetCategoryCode: string;
  assetCategoryName: string;
  assetCategoryNameTamil: string;
  status: string;
}

const SAMPLE_DATA: DataItem[] = [
  { id: 1, parent: "Wood", assetCategoryCode: "SASA", assetCategoryName: "Forum", assetCategoryNameTamil: "Sisham", status: "Active" },
  { id: 2, parent: "Textile Library", assetCategoryCode: "PINK", assetCategoryName: "NewTEST", assetCategoryNameTamil: "NewTEST", status: "Active" },
  { id: 3, parent: "Plant and Machinery", assetCategoryCode: "SAG", assetCategoryName: "SAGWAN", assetCategoryNameTamil: "SAGWAN", status: "Inactive" },
  { id: 4, parent: "Land and Building", assetCategoryCode: "FANC", assetCategoryName: "Fancig", assetCategoryNameTamil: "Fancing", status: "Active" },
  { id: 5, parent: "Infotex Hardware", assetCategoryCode: "MRTH1", assetCategoryName: "JARANGE", assetCategoryNameTamil: "JARANGE", status: "Active" },
  { id: 6, parent: "Building", assetCategoryCode: "TTYUAS", assetCategoryName: "TESTSR", assetCategoryNameTamil: "YESTYE", status: "Active" },
  { id: 7, parent: "Furniture Fittings", assetCategoryCode: "PEDESTAL FAN", assetCategoryName: "PEDESTAL FAN", assetCategoryNameTamil: "PEDESTAL FAN", status: "Active" },
  { id: 8, parent: "Furniture Fittings", assetCategoryCode: "IRON CAHS CHEST BOX", assetCategoryName: "IRON CASH CHEST BOX", assetCategoryNameTamil: "IRON CASH CHEST BOX", status: "Active" },
  { id: 9, parent: "Furniture Fittings", assetCategoryCode: "CROMPTON WALL FAN", assetCategoryName: "CROMPTON WALL FAN", assetCategoryNameTamil: "CROMPTON WALL FAN", status: "Active" },
  { id: 10, parent: "Furniture Fittings", assetCategoryCode: "FAN", assetCategoryName: "FAN", assetCategoryNameTamil: "FAN", status: "Active" },
];

type SortKey = keyof DataItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function AssetCategoryListPage() {
  const basePath = "/masters/asset-masters/asset-category";
  const [filters, setFilters] = useState({ parent: "", assetCategoryCode: "", assetCategoryName: "", assetCategoryNameTamil: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };
  const filtered = SAMPLE_DATA.filter((row) =>
    (filters.parent === "" || row.parent === filters.parent) &&
    row.assetCategoryCode.toLowerCase().includes(filters.assetCategoryCode.toLowerCase()) &&
    row.assetCategoryName.toLowerCase().includes(filters.assetCategoryName.toLowerCase()) &&
    row.assetCategoryNameTamil.toLowerCase().includes(filters.assetCategoryNameTamil.toLowerCase()) &&
    (filters.status === "" || row.status === filters.status)
  );
  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);
  const handleClear = () => { setFilters({ parent: "", assetCategoryCode: "", assetCategoryName: "", assetCategoryNameTamil: "", status: "" }); setSelectedId(null); setCurrentPage(1); };
  const visiblePages = () => { const pages: (number | "...")[] = []; if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); } else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); } return [...new Set(pages)]; };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Asset Category List</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm"><li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Masters</li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Asset Masters</li><li className="text-gray-400">/</li><li className="font-medium text-primary">Asset Category List</li></ol></nav>
      </div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">{filtered.length}</span> - Asset Category(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`${basePath}/create`} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>Add</Link>
            <Link href={selectedId ? `${basePath}/edit` : "#"} onClick={(e) => { if (!selectedId) e.preventDefault(); }} className={`flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 ${!selectedId ? "cursor-not-allowed opacity-50" : ""}`}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Edit</Link>
            <Link href={selectedId ? `${basePath}/view` : "#"} onClick={(e) => { if (!selectedId) e.preventDefault(); }} className={`flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 ${!selectedId ? "cursor-not-allowed opacity-50" : ""}`}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>View</Link>
            <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>Delete</button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Clear</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("parent")}>Parent <SortIcon col="parent" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("assetCategoryCode")}>Asset Category Code <SortIcon col="assetCategoryCode" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("assetCategoryName")}>Asset Category Name <SortIcon col="assetCategoryName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("assetCategoryNameTamil")}>Asset Category Name (In Tamil) <SortIcon col="assetCategoryNameTamil" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.parent} onChange={(e) => { setFilters((f) => ({ ...f, parent: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{[...new Set(SAMPLE_DATA.map(d => d.parent))].map(v => <option key={v} value={v}>{v}</option>)}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.assetCategoryCode} onChange={(e) => { setFilters((f) => ({ ...f, assetCategoryCode: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.assetCategoryName} onChange={(e) => { setFilters((f) => ({ ...f, assetCategoryName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.assetCategoryNameTamil} onChange={(e) => { setFilters((f) => ({ ...f, assetCategoryNameTamil: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>{paginated.length === 0 ? (<tr><td colSpan={7} className="py-8 text-center text-gray-400">No records found</td></tr>) : paginated.map((row, idx) => (<tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#2d8f7b] text-white" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} ${selectedId !== row.id ? "hover:bg-blue-50 dark:hover:bg-[#1e2d42]" : ""}`}>
              <td className={`border-r px-2 py-3 text-center ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{(currentPage - 1) * pageSize + idx + 1}</td>
              <td className={`border-r px-2 py-3 ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.parent}</td>
              <td className={`border-r px-2 py-3 ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.assetCategoryCode}</td>
              <td className={`border-r px-2 py-3 ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.assetCategoryName}</td>
              <td className={`border-r px-2 py-3 ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3 text-dark dark:text-white"}`}>{row.assetCategoryNameTamil}</td>
              <td className={`border-r px-2 py-3 text-center ${selectedId === row.id ? "border-[#3aa88f]" : "border-stroke dark:border-dark-3"}`}><span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold text-white ${row.status === "Active" ? "bg-[#28a745]" : "bg-[#dc3545]"}`}>{row.status.toUpperCase()}</span></td>
              <td className="px-2 py-3 text-center"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
            </tr>))}</tbody>
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
