"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type QCStatus = "QC COMPLETE" | "PENDING" | "IN PROGRESS";

interface QualityCheckItem {
  id: number;
  stockInwardNumber: string;
  senderCodeName: string;
  receiverCodeName: string;
  stockReceivedDate: string;
  status: QCStatus;
}

const SAMPLE_DATA: QualityCheckItem[] = [
  { id: 1, stockInwardNumber: "2105-MAR26-370101", senderCodeName: "2381/PWH CHENNIMALAI", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "08-Mar-2026", status: "QC COMPLETE" },
  { id: 2, stockInwardNumber: "2105-MAR26-370098", senderCodeName: "1881/PWH - SALEM", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "07-Mar-2026", status: "PENDING" },
  { id: 3, stockInwardNumber: "2105-MAR26-370095", senderCodeName: "2181/PWH-KANCHIPURAM", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "06-Mar-2026", status: "QC COMPLETE" },
  { id: 4, stockInwardNumber: "2105-MAR26-370090", senderCodeName: "2381/PWH CHENNIMALAI", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "05-Mar-2026", status: "IN PROGRESS" },
  { id: 5, stockInwardNumber: "2105-MAR26-370085", senderCodeName: "1881/PWH - SALEM", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "04-Mar-2026", status: "QC COMPLETE" },
  { id: 6, stockInwardNumber: "2105-MAR26-370080", senderCodeName: "2181/PWH-KANCHIPURAM", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "03-Mar-2026", status: "PENDING" },
  { id: 7, stockInwardNumber: "2105-FEB26-370075", senderCodeName: "2381/PWH CHENNIMALAI", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "28-Feb-2026", status: "QC COMPLETE" },
  { id: 8, stockInwardNumber: "2105-FEB26-370070", senderCodeName: "1881/PWH - SALEM", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "27-Feb-2026", status: "IN PROGRESS" },
  { id: 9, stockInwardNumber: "2105-FEB26-370065", senderCodeName: "2181/PWH-KANCHIPURAM", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "26-Feb-2026", status: "QC COMPLETE" },
  { id: 10, stockInwardNumber: "2105-FEB26-370060", senderCodeName: "2381/PWH CHENNIMALAI", receiverCodeName: "2105/IC - VELLORE", stockReceivedDate: "25-Feb-2026", status: "QC COMPLETE" },
];

const STATUS_STYLES: Record<QCStatus, string> = {
  "QC COMPLETE": "bg-[#FFA70B] text-white",
  "PENDING": "bg-[#17a2b8] text-white",
  "IN PROGRESS": "bg-[#28a745] text-white",
};

type SortKey = keyof QualityCheckItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function ICQualityCheckListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ stockInwardNumber: "", senderCodeName: "", receiverCodeName: "", stockReceivedDate: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.stockInwardNumber.toLowerCase().includes(filters.stockInwardNumber.toLowerCase()) &&
    row.senderCodeName.toLowerCase().includes(filters.senderCodeName.toLowerCase()) &&
    row.receiverCodeName.toLowerCase().includes(filters.receiverCodeName.toLowerCase()) &&
    (filters.stockReceivedDate === "" || row.stockReceivedDate.toLowerCase().includes(filters.stockReceivedDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ stockInwardNumber: "", senderCodeName: "", receiverCodeName: "", stockReceivedDate: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Quality Check List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Inspection Center</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Quality Check List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">0</span> - Quality Check(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => { if (selectedId) router.push("/operational/warehouse-management/inspection-center/quality-check/list"); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push("/operational/warehouse-management/inspection-center/quality-check/list"); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
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
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockInwardNumber")}>Stock Inward Number <SortIcon col="stockInwardNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("senderCodeName")}>Sender Code / Name <SortIcon col="senderCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("receiverCodeName")}>Receiver Code / Name <SortIcon col="receiverCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockReceivedDate")}>Stock Received Date - From <SortIcon col="stockReceivedDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.stockInwardNumber} onChange={(e) => { setFilters((f) => ({ ...f, stockInwardNumber: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.senderCodeName} onChange={(e) => { setFilters((f) => ({ ...f, senderCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.receiverCodeName} onChange={(e) => { setFilters((f) => ({ ...f, receiverCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.stockReceivedDate} onChange={(e) => { setFilters((f) => ({ ...f, stockReceivedDate: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="QC COMPLETE">QC COMPLETE</option><option value="PENDING">PENDING</option><option value="IN PROGRESS">IN PROGRESS</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={7} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.stockInwardNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 align-middle text-dark dark:border-dark-3 dark:text-white">{row.senderCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 align-middle text-dark dark:border-dark-3 dark:text-white">{row.receiverCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.stockReceivedDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle dark:border-dark-3"><span className={`inline-flex items-center justify-center rounded-sm px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span></td>
                    <td className="px-2 py-3 text-center align-middle"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PDF / Excel + Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              PDF
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Excel
            </button>
          </div>
          <div className="flex items-center gap-3">
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
    </div>
  );
}
