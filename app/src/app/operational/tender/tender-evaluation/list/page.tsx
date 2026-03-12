"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EvalStatus = "TENDER APPLIED" | "TENDER EVALUATED";

interface TenderEvaluationItem {
  id: number;
  tenderName: string;
  tenderReferenceNumber: string;
  tenderType: string;
  tenderCategory: string;
  bidOpeningDate: string;
  bidClosingDate: string;
  status: EvalStatus;
}

const SAMPLE_DATA: TenderEvaluationItem[] = [
  { id: 1, tenderName: "Trial Tender", tenderReferenceNumber: "12345", tenderType: "Open Tender", tenderCategory: "Printing and Publishing", bidOpeningDate: "28-Nov-2022", bidClosingDate: "30-Nov-2022", status: "TENDER APPLIED" },
  { id: 2, tenderName: "Building", tenderReferenceNumber: "123", tenderType: "Closed Tender", tenderCategory: "Paper and Packaging", bidOpeningDate: "04-Nov-2022", bidClosingDate: "30-Nov-2022", status: "TENDER EVALUATED" },
];

const STATUS_STYLES: Record<EvalStatus, string> = {
  "TENDER APPLIED": "bg-[#FFA70B] text-white",
  "TENDER EVALUATED": "bg-[#28a745] text-white",
};

type SortKey = keyof TenderEvaluationItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function TenderEvaluationListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ tenderName: "", tenderReferenceNumber: "", tenderType: "", tenderCategory: "", bidOpeningDate: "", bidClosingDate: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedRow = SAMPLE_DATA.find((r) => r.id === selectedId);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.tenderName.toLowerCase().includes(filters.tenderName.toLowerCase()) &&
    row.tenderReferenceNumber.toLowerCase().includes(filters.tenderReferenceNumber.toLowerCase()) &&
    (filters.tenderType === "" || row.tenderType === filters.tenderType) &&
    (filters.tenderCategory === "" || row.tenderCategory === filters.tenderCategory) &&
    (filters.bidOpeningDate === "" || row.bidOpeningDate.toLowerCase().includes(filters.bidOpeningDate.toLowerCase())) &&
    (filters.bidClosingDate === "" || row.bidClosingDate.toLowerCase().includes(filters.bidClosingDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ tenderName: "", tenderReferenceNumber: "", tenderType: "", tenderCategory: "", bidOpeningDate: "", bidClosingDate: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  const basePath = "/operational/tender/tender-evaluation";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Tender Evaluation List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Tender Evaluation List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">{filtered.length}</span> - Tender Evaluation(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => { if (selectedId) router.push(`${basePath}/view`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              View
            </button>
            {selectedRow?.status === "TENDER APPLIED" && (
              <button
                onClick={() => router.push(`${basePath}/create`)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-xs font-medium text-white hover:opacity-90"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
                Evaluation Tender
              </button>
            )}
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("tenderName")}>Tender Name <SortIcon col="tenderName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("tenderReferenceNumber")}>Tender Reference Number <SortIcon col="tenderReferenceNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("tenderType")}>Tender Type <SortIcon col="tenderType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("tenderCategory")}>Tender Category <SortIcon col="tenderCategory" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("bidOpeningDate")}>Bid Opening Date <SortIcon col="bidOpeningDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("bidClosingDate")}>Bid Closing Date <SortIcon col="bidClosingDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.tenderName} onChange={(e) => { setFilters((f) => ({ ...f, tenderName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.tenderReferenceNumber} onChange={(e) => { setFilters((f) => ({ ...f, tenderReferenceNumber: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.tenderType} onChange={(e) => { setFilters((f) => ({ ...f, tenderType: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="Open Tender">Open Tender</option><option value="Closed Tender">Closed Tender</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.tenderCategory} onChange={(e) => { setFilters((f) => ({ ...f, tenderCategory: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="Printing and Publishing">Printing and Publishing</option><option value="Paper and Packaging">Paper and Packaging</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.bidOpeningDate} onChange={(e) => { setFilters((f) => ({ ...f, bidOpeningDate: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.bidClosingDate} onChange={(e) => { setFilters((f) => ({ ...f, bidClosingDate: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="TENDER APPLIED">TENDER APPLIED</option><option value="TENDER EVALUATED">TENDER EVALUATED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.tenderName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.tenderReferenceNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.tenderType}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.tenderCategory}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.bidOpeningDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.bidClosingDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center dark:border-dark-3"><span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span></td>
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
