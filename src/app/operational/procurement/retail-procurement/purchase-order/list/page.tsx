"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type POStatus = "APPROVED" | "SUBMITTED" | "REJECTED" | "INITIATED";

interface PurchaseOrderItem {
  id: number;
  poNo: string;
  planCode: string;
  procurementOrderNo: string;
  societyCode: string;
  supplyRateConfNo: string;
  status: POStatus;
}

const SAMPLE_DATA: PurchaseOrderItem[] = [
  { id: 1,  poNo: "352254-SQY19FEB-5-181", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "SPH18T03", societyCode: "352254 / MURUGAN SILK WEAVERS COOP. SOCIETY SA.89", supplyRateConfNo: "352254-SQY19FEB-5", status: "INITIATED"  },
  { id: 2,  poNo: "352254-SQY19JAN-4-180", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "SPH18T03", societyCode: "352254 / MURUGAN SILK WEAVERS COOP. SOCIETY SA.89", supplyRateConfNo: "352254-SQY19JAN-4", status: "SUBMITTED" },
  { id: 3,  poNo: "352254-SQY19JAN-3-179", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "SPH18T03", societyCode: "352254 / MURUGAN SILK WEAVERS COOP. SOCIETY SA.89", supplyRateConfNo: "352254-SQY19JAN-3", status: "SUBMITTED" },
  { id: 4,  poNo: "352254-SQY19JAN-2-178", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "SPH18T03", societyCode: "352254 / MURUGAN SILK WEAVERS COOP. SOCIETY SA.89", supplyRateConfNo: "352254-SQY19JAN-2", status: "SUBMITTED" },
  { id: 5,  poNo: "291757-SQY19JAN-2-177", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "GPH18T03", societyCode: "291757 / SAVAKKATTUPALAYAM DR.M.G.R.W.C.S.LTD.,C.H.17", supplyRateConfNo: "291757-SQY19JAN-2", status: "SUBMITTED" },
  { id: 6,  poNo: "351420-SQY19JAN-2-176", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "SPH18T03", societyCode: "351420 / THOPPUR WEAVERS COOP. SOCIETY KK.19",            supplyRateConfNo: "351420-SQY19JAN-2", status: "SUBMITTED" },
  { id: 7,  poNo: "291976-SQY19JAN-1-175", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "EPH18T03", societyCode: "291976 / CHENKUMAR WEAVERS COOP. SOCIETY CH.4",           supplyRateConfNo: "291976-SQY19JAN-1", status: "SUBMITTED" },
  { id: 8,  poNo: "292257-SQY19JAN-1-174", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "EPH18T03", societyCode: "292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57",        supplyRateConfNo: "292257-SQY19JAN-1", status: "SUBMITTED" },
  { id: 9,  poNo: "292774-SQY19JAN-1-173", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "EPH18T03", societyCode: "292774 / KALIKKAVALASU INDUSTRIAL W.C.S EH.131",           supplyRateConfNo: "292774-SQY19JAN-1", status: "SUBMITTED" },
  { id: 10, poNo: "291873-SQY19JAN-1-172", planCode: "RPPY1818-8 / Plan for Co-Optex", procurementOrderNo: "EPH18T03", societyCode: "291873 / CHENNIMALAI INDIRA WEAVERS COOP. SOCIETY EH.24",  supplyRateConfNo: "291873-SQY19JAN-1", status: "SUBMITTED" },
];

type SortKey = keyof PurchaseOrderItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_STYLE: Record<POStatus, string> = {
  APPROVED:  "bg-[#28a745]",
  SUBMITTED: "bg-[#FFA70B]",
  REJECTED:  "bg-red-500",
  INITIATED: "bg-[#6c757d]",
};

export default function PurchaseOrderListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ poNo: "", planCode: "", procurementOrderNo: "", societyCode: "", supplyRateConfNo: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.poNo.toLowerCase().includes(filters.poNo.toLowerCase()) &&
    row.planCode.toLowerCase().includes(filters.planCode.toLowerCase()) &&
    row.procurementOrderNo.toLowerCase().includes(filters.procurementOrderNo.toLowerCase()) &&
    row.societyCode.toLowerCase().includes(filters.societyCode.toLowerCase()) &&
    row.supplyRateConfNo.toLowerCase().includes(filters.supplyRateConfNo.toLowerCase()) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const c = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? c : -c;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
    </span>
  );

  const handleClear = () => {
    setFilters({ poNo: "", planCode: "", procurementOrderNo: "", societyCode: "", supplyRateConfNo: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – Purchase Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Retail Sales – Purchase Order</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Purchase Order(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/operational/procurement/retail-procurement/purchase-order/create"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </Link>
            <button onClick={() => { if (selectedId) router.push("/operational/procurement/retail-procurement/purchase-order/create"); }} disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push("/operational/procurement/retail-procurement/purchase-order/view"); }} disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled={selectedId === null} onClick={() => { if (selectedId) setSelectedId(null); }}
              className="flex items-center gap-1.5 rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Delete
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 003.2 7.2M2 12.5a10 10 0 0018.8 4.2"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("poNo")}>Purchase Order No <SortIcon col="poNo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("planCode")}>Plan Code / Name <SortIcon col="planCode" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("procurementOrderNo")}>Procurement Order No <SortIcon col="procurementOrderNo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("societyCode")}>Society Code / Name <SortIcon col="societyCode" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("supplyRateConfNo")}>Supply Rate Confirmation No <SortIcon col="supplyRateConfNo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.poNo} onChange={(e) => { setFilters((f) => ({ ...f, poNo: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.planCode} onChange={(e) => { setFilters((f) => ({ ...f, planCode: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.procurementOrderNo} onChange={(e) => { setFilters((f) => ({ ...f, procurementOrderNo: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.societyCode} onChange={(e) => { setFilters((f) => ({ ...f, societyCode: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.supplyRateConfNo} onChange={(e) => { setFilters((f) => ({ ...f, supplyRateConfNo: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="INITIATED">INITIATED</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} onClick={() => setSelectedId(row.id)}
                    className={`cursor-pointer border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#e8f4f8] dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.poNo}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.planCode}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.procurementOrderNo}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.societyCode}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.supplyRateConfNo}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-3 py-0.5 text-xs font-semibold text-white ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
          <div className="flex items-center gap-1">
            <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) => page === "..." ? (<span key={`e-${i}`} className="px-1 text-gray-400">...</span>) : (
              <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
