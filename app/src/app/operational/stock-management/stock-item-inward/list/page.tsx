"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type StockStatus = "SUBMITTED";

interface StockItemInwardItem {
  id: number;
  referenceNumber: string;
  supplierType: string;
  entitySupplierCodeName: string;
  inwardType: string;
  invoiceNumber: string;
  invoiceDate: string;
  createdDate: string;
  status: StockStatus;
}

const SAMPLE_DATA: StockItemInwardItem[] = [
  { id: 1, referenceNumber: "2381-JUN20-55670", supplierType: "SOCIETY", entitySupplierCodeName: "292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "11", invoiceDate: "27-May-2020", createdDate: "02-Jun-2020", status: "SUBMITTED" },
  { id: 2, referenceNumber: "2381-MAY20-55489", supplierType: "SOCIETY", entitySupplierCodeName: "291897 / CHENNIMALAI WEAVERS COOP. SOCIETY EH.21", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "8", invoiceDate: "27-May-2020", createdDate: "30-May-2020", status: "SUBMITTED" },
  { id: 3, referenceNumber: "2381-MAY20-55488", supplierType: "SOCIETY", entitySupplierCodeName: "291915 / CHENNIMALAI WEAVERS COOP. SOCIETY EH.31", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "4389", invoiceDate: "22-May-2020", createdDate: "30-May-2020", status: "SUBMITTED" },
  { id: 4, referenceNumber: "2381-MAY20-55468", supplierType: "SOCIETY", entitySupplierCodeName: "292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "10", invoiceDate: "25-May-2020", createdDate: "27-May-2020", status: "SUBMITTED" },
  { id: 5, referenceNumber: "2381-MAY20-55467", supplierType: "SOCIETY", entitySupplierCodeName: "292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "9", invoiceDate: "22-May-2020", createdDate: "27-May-2020", status: "SUBMITTED" },
  { id: 6, referenceNumber: "2381-MAY20-55466", supplierType: "SOCIETY", entitySupplierCodeName: "292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "8", invoiceDate: "14-May-2020", createdDate: "27-May-2020", status: "SUBMITTED" },
  { id: 7, referenceNumber: "2381-MAY20-55465", supplierType: "SOCIETY", entitySupplierCodeName: "292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "4", invoiceDate: "11-May-2020", createdDate: "27-May-2020", status: "SUBMITTED" },
  { id: 8, referenceNumber: "2381-MAY20-55464", supplierType: "SOCIETY", entitySupplierCodeName: "292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "5", invoiceDate: "12-May-2020", createdDate: "27-May-2020", status: "SUBMITTED" },
  { id: 9, referenceNumber: "2381-APR20-55310", supplierType: "SOCIETY", entitySupplierCodeName: "291897 / CHENNIMALAI WEAVERS COOP. SOCIETY EH.21", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "7", invoiceDate: "30-Apr-2020", createdDate: "30-Apr-2020", status: "SUBMITTED" },
  { id: 10, referenceNumber: "2381-APR20-55309", supplierType: "SOCIETY", entitySupplierCodeName: "291915 / CHENNIMALAI WEAVERS COOP. SOCIETY EH.31", inwardType: "WAREHOUSE_INWARD", invoiceNumber: "3", invoiceDate: "28-Apr-2020", createdDate: "29-Apr-2020", status: "SUBMITTED" },
];

type SortKey = keyof StockItemInwardItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function StockItemInwardListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ referenceNumber: "", supplierType: "", entitySupplierCodeName: "", inwardType: "", invoiceNumber: "", invoiceDate: "", createdDate: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase()) &&
    (filters.supplierType === "" || row.supplierType === filters.supplierType) &&
    row.entitySupplierCodeName.toLowerCase().includes(filters.entitySupplierCodeName.toLowerCase()) &&
    (filters.inwardType === "" || row.inwardType === filters.inwardType) &&
    row.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase()) &&
    (filters.invoiceDate === "" || row.invoiceDate.toLowerCase().includes(filters.invoiceDate.toLowerCase())) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ referenceNumber: "", supplierType: "", entitySupplierCodeName: "", inwardType: "", invoiceNumber: "", invoiceDate: "", createdDate: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Stock Item Inward List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Stock Item Inward List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">19675</span> - Stock Item Inward(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/operational/stock-management/stock-item-inward/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </Link>
            <button onClick={() => { if (selectedId) router.push("/operational/stock-management/stock-item-inward/view"); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
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
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("referenceNumber")}>Reference # <SortIcon col="referenceNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("supplierType")}>Supplier Type <SortIcon col="supplierType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("entitySupplierCodeName")}>Entity or Supplier Code / Name <SortIcon col="entitySupplierCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("inwardType")}>Inward Type <SortIcon col="inwardType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("invoiceNumber")}>Invoice # <SortIcon col="invoiceNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("invoiceDate")}>Invoice Date <SortIcon col="invoiceDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNumber} onChange={(e) => { setFilters((f) => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.supplierType} onChange={(e) => { setFilters((f) => ({ ...f, supplierType: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="SOCIETY">SOCIETY</option><option value="VENDOR">VENDOR</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.entitySupplierCodeName} onChange={(e) => { setFilters((f) => ({ ...f, entitySupplierCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.inwardType} onChange={(e) => { setFilters((f) => ({ ...f, inwardType: e.target.value })); setCurrentPage(1); }}><option value="">Select One</option><option value="WAREHOUSE_INWARD">WAREHOUSE_INWARD</option><option value="DIRECT_INWARD">DIRECT_INWARD</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.invoiceNumber} onChange={(e) => { setFilters((f) => ({ ...f, invoiceNumber: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.invoiceDate} onChange={(e) => { setFilters((f) => ({ ...f, invoiceDate: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select One</option><option value="SUBMITTED">SUBMITTED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={10} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#e8f4f8] dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.referenceNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.supplierType}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.entitySupplierCodeName.length > 30 ? row.entitySupplierCodeName.substring(0, 30) + "..." : row.entitySupplierCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.inwardType}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.invoiceNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.invoiceDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center dark:border-dark-3"><span className="inline-block rounded-sm bg-[#FFA70B] px-2 py-0.5 text-xs font-semibold text-white">{row.status}</span></td>
                    <td className="px-2 py-3 text-center"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
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
