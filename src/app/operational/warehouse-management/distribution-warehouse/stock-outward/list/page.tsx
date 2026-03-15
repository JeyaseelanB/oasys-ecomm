"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type StockStatus = "INITIATED" | "SUBMITTED";
type AckStatus = "AWAITING ACKNOWLEDGEMENT" | "ACKNOWLEDGED";

interface StockOutwardItem {
  id: number;
  stockOutwardNo: string;
  stockMovementType: string;
  senderCodeName: string;
  receiverCodeName: string;
  stockSentDate: string;
  status: StockStatus;
  ackStatus: AckStatus;
}

const SAMPLE_DATA: StockOutwardItem[] = [
  { id: 1, stockOutwardNo: "2026-362490", stockMovementType: "Showroom", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1242/NAGAPATTINAM", stockSentDate: "04-Mar-2026", status: "SUBMITTED", ackStatus: "AWAITING ACKNOWLEDGEMENT" },
  { id: 2, stockOutwardNo: "2026-362488", stockMovementType: "Showroom", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1811/ATTUR", stockSentDate: "04-Mar-2026", status: "INITIATED", ackStatus: "AWAITING ACKNOWLEDGEMENT" },
  { id: 3, stockOutwardNo: "2024-360620", stockMovementType: "Showroom", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1827/THANGAM PATTU MALIGAI", stockSentDate: "08-Mar-2024", status: "SUBMITTED", ackStatus: "ACKNOWLEDGED" },
  { id: 4, stockOutwardNo: "2024-360618", stockMovementType: "ISSR", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1676/ISSR - CHENNAI", stockSentDate: "08-Mar-2024", status: "SUBMITTED", ackStatus: "AWAITING ACKNOWLEDGEMENT" },
  { id: 5, stockOutwardNo: "2024-360615", stockMovementType: "Showroom", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1350/ERODE", stockSentDate: "07-Mar-2024", status: "SUBMITTED", ackStatus: "ACKNOWLEDGED" },
  { id: 6, stockOutwardNo: "2024-360612", stockMovementType: "Warehouse", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "2085/DWH-TIRUNELVELI", stockSentDate: "07-Mar-2024", status: "SUBMITTED", ackStatus: "AWAITING ACKNOWLEDGEMENT" },
  { id: 7, stockOutwardNo: "2024-360610", stockMovementType: "Showroom", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1540/POLLACHI", stockSentDate: "07-Mar-2024", status: "INITIATED", ackStatus: "AWAITING ACKNOWLEDGEMENT" },
  { id: 8, stockOutwardNo: "2024-360608", stockMovementType: "ISSR", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1976/ISSR - THANJAVUR", stockSentDate: "06-Mar-2024", status: "SUBMITTED", ackStatus: "ACKNOWLEDGED" },
  { id: 9, stockOutwardNo: "2024-360605", stockMovementType: "Showroom", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1430/TIRUPUR", stockSentDate: "06-Mar-2024", status: "SUBMITTED", ackStatus: "AWAITING ACKNOWLEDGEMENT" },
  { id: 10, stockOutwardNo: "2024-360602", stockMovementType: "Showroom", senderCodeName: "1185/DWH - COIMBATORE", receiverCodeName: "1827/THANGAM PATTU MALIGAI", stockSentDate: "05-Mar-2024", status: "SUBMITTED", ackStatus: "ACKNOWLEDGED" },
];

const STATUS_STYLES: Record<StockStatus, string> = { INITIATED: "bg-[#17a2b8] text-white", SUBMITTED: "bg-[#FFA70B] text-white" };
const ACK_STYLES: Record<AckStatus, string> = { "AWAITING ACKNOWLEDGEMENT": "bg-[#FFA70B] text-white", ACKNOWLEDGED: "bg-[#28a745] text-white" };

type SortKey = keyof StockOutwardItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function DWStockOutwardListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ stockOutwardNo: "", stockMovementType: "", senderCodeName: "", receiverCodeName: "", stockSentDate: "", status: "", ackStatus: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showAckModal, setShowAckModal] = useState(false);
  const [ackRow, setAckRow] = useState<StockOutwardItem | null>(null);
  const [showEditAlert, setShowEditAlert] = useState(false);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.stockOutwardNo.toLowerCase().includes(filters.stockOutwardNo.toLowerCase()) &&
    (filters.stockMovementType === "" || row.stockMovementType === filters.stockMovementType) &&
    row.senderCodeName.toLowerCase().includes(filters.senderCodeName.toLowerCase()) &&
    row.receiverCodeName.toLowerCase().includes(filters.receiverCodeName.toLowerCase()) &&
    (filters.stockSentDate === "" || row.stockSentDate.toLowerCase().includes(filters.stockSentDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status) &&
    (filters.ackStatus === "" || row.ackStatus === filters.ackStatus)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ stockOutwardNo: "", stockMovementType: "", senderCodeName: "", receiverCodeName: "", stockSentDate: "", status: "", ackStatus: "" }); setSelectedId(null); setCurrentPage(1); };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  const basePath = "/operational/warehouse-management/distribution-warehouse/stock-outward";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Stock Outward List - Distribution Warehouse</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Distribution Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Stock Outward List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">8542</span> - Stock Outward(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`${basePath}/acknowledgement-report`} className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Outward Report
            </Link>
            <button className="flex items-center gap-1.5 rounded bg-[#FFA70B] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              Transfer Invoice
            </button>
            <button onClick={() => { if (selectedId) router.push(`${basePath}/delivery-challan`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Delivery Challan
            </button>
            <button onClick={() => { if (selectedId) router.push(`${basePath}/pp-delivery-challan`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#6f42c1] px-3 py-2 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              PP Delivery Challan
            </button>
            <Link href={`${basePath}/create`} className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
              Add
            </Link>
            <button onClick={() => { if (selectedId) setShowEditAlert(true); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={() => { if (selectedId) router.push(`${basePath}/view`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockOutwardNo")}>Stock Outward # <SortIcon col="stockOutwardNo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockMovementType")}>Stock Movement Type <SortIcon col="stockMovementType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("senderCodeName")}>Sender Code / Name <SortIcon col="senderCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("receiverCodeName")}>Receiver Code / Name <SortIcon col="receiverCodeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockSentDate")}>Stock Sent Date <SortIcon col="stockSentDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold hover:bg-[#267a68]" onClick={() => handleSort("ackStatus")}>Acknowledge Status <SortIcon col="ackStatus" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center align-middle font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.stockOutwardNo} onChange={(e) => { setFilters((f) => ({ ...f, stockOutwardNo: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.stockMovementType} onChange={(e) => { setFilters((f) => ({ ...f, stockMovementType: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="Warehouse">Warehouse</option><option value="Showroom">Showroom</option><option value="ISSR">ISSR</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.senderCodeName} onChange={(e) => { setFilters((f) => ({ ...f, senderCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.receiverCodeName} onChange={(e) => { setFilters((f) => ({ ...f, receiverCodeName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><div className="flex items-center gap-1"><input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.stockSentDate} onChange={(e) => { setFilters((f) => ({ ...f, stockSentDate: e.target.value })); setCurrentPage(1); }} /><svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="INITIATED">INITIATED</option><option value="SUBMITTED">SUBMITTED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.ackStatus} onChange={(e) => { setFilters((f) => ({ ...f, ackStatus: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="AWAITING ACKNOWLEDGEMENT">AWAITING ACKNOWLEDGEMENT</option><option value="ACKNOWLEDGED">ACKNOWLEDGED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.stockOutwardNo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.stockMovementType}</td>
                    <td className="border-r border-stroke px-2 py-3 align-middle text-dark dark:border-dark-3 dark:text-white">{row.senderCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 align-middle text-dark dark:border-dark-3 dark:text-white">{row.receiverCodeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.stockSentDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle dark:border-dark-3"><span className={`inline-flex items-center justify-center rounded-sm px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span></td>
                    <td className="border-r border-stroke px-2 py-3 text-center align-middle dark:border-dark-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`inline-flex items-center justify-center rounded-sm px-2 py-0.5 text-xs font-semibold ${ACK_STYLES[row.ackStatus]}`}>{row.ackStatus}</span>
                        <button onClick={() => { setAckRow(row); setShowAckModal(true); }} className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1 text-white hover:opacity-90" title="Acknowledgement Status">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="inline-flex items-center justify-center rounded bg-[#28a745] p-1 text-white hover:opacity-90" title="View Details">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center align-middle"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
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

      {/* Acknowledgement Status Modal */}
      {showAckModal && ackRow && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#5bc0de] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Acknowledgement Status</h3>
              <button onClick={() => setShowAckModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-5 flex justify-end">
                <span className="rounded bg-[#17a2b8] px-3 py-1 text-xs font-semibold text-white">{ackRow.ackStatus}</span>
              </div>
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2">
                  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  <h4 className="text-sm font-semibold text-dark dark:text-white">Sender</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><p className="mb-1 text-xs text-gray-500">Entity Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">{ackRow.senderCodeName}</p></div>
                  <div><p className="mb-1 text-xs text-gray-500">Stock Outward Number</p><p className="text-sm font-medium text-[#17a2b8]">{ackRow.stockOutwardNo}</p></div>
                  <div><p className="mb-1 text-xs text-gray-500">Stock Outward Date</p><p className="text-sm font-medium text-[#17a2b8]">{ackRow.stockSentDate}</p></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  <h4 className="text-sm font-semibold text-dark dark:text-white">Receiver</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><p className="mb-1 text-xs text-gray-500">Entity Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">{ackRow.receiverCodeName}</p></div>
                  <div><p className="mb-1 text-xs text-gray-500">Stock Inward Number</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
                  <div><p className="mb-1 text-xs text-gray-500">Stock Inward Date</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Not Allowed Alert Modal */}
      {showEditAlert && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#dc3545] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Alert</h3>
              <button onClick={() => setShowEditAlert(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-red-100">
                <svg className="size-7 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <p className="mb-6 text-sm font-medium text-dark dark:text-white">This page should not be edited.</p>
              <button onClick={() => setShowEditAlert(false)} className="rounded bg-[#dc3545] px-6 py-2 text-sm font-medium text-white hover:opacity-90">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
