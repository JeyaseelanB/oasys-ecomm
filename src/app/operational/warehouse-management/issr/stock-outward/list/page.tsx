"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─────────────────────────── Types ─────────────────────────── */
type OutwardStatus = "SUBMITTED";
type AcknowledgeStatus = "ACKNOWLEDGED";

interface StockOutward {
  id: number;
  stockInwardNumber: string;
  senderCodeName: string;
  receiverCodeName: string;
  transferredDate: string;
  status: OutwardStatus;
  acknowledgeStatus: AcknowledgeStatus;
}

interface AckDetails {
  senderEntityCodeName: string;
  stockOutwardNumber: string;
  stockOutwardDate: string;
  receiverEntityCodeName: string;
  stockInwardNumber: string;
  stockInwardDate: string;
}

/* ─────────────────────── Acknowledgement Data per row ─────────────────────── */
const ACK_DATA: Record<number, AckDetails> = {
  1: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2024-353185", stockOutwardDate: "18-Jan-2024", receiverEntityCodeName: "1118 / POLLACHI", stockInwardNumber: "1118-2024-353200", stockInwardDate: "18-Jan-2024" },
  2: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-347791", stockOutwardDate: "22-Dec-2023", receiverEntityCodeName: "1185 / DWH - COIMBATORE", stockInwardNumber: "1185-2023-347800", stockInwardDate: "22-Dec-2023" },
  3: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-347699", stockOutwardDate: "22-Dec-2023", receiverEntityCodeName: "1115 / R.S.PURAM", stockInwardNumber: "1115-2023-347721", stockInwardDate: "22-Dec-2023" },
  4: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-347384", stockOutwardDate: "20-Dec-2023", receiverEntityCodeName: "1114 / MARUTHAM", stockInwardNumber: "1114-2023-347400", stockInwardDate: "20-Dec-2023" },
  5: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-346624", stockOutwardDate: "11-Dec-2023", receiverEntityCodeName: "2124 / KAMATCHI- KANCHIPURAM", stockInwardNumber: "2124-2023-346650", stockInwardDate: "11-Dec-2023" },
  6: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-346622", stockOutwardDate: "11-Dec-2023", receiverEntityCodeName: "1122 / CO-OPTEX NEW SHOWROOM", stockInwardNumber: "1122-2023-346640", stockInwardDate: "11-Dec-2023" },
  7: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-334248", stockOutwardDate: "19-Oct-2023", receiverEntityCodeName: "1922 / POTHIGAI- TRICHY", stockInwardNumber: "1922-2023-334260", stockInwardDate: "19-Oct-2023" },
  8: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-327676", stockOutwardDate: "27-Sep-2023", receiverEntityCodeName: "1276 / ISSR - CUDDALORE", stockInwardNumber: "1276-2023-327690", stockInwardDate: "27-Sep-2023" },
  9: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-327667", stockOutwardDate: "27-Sep-2023", receiverEntityCodeName: "2015 / KANTHIMATHI-TIRUNELVELI", stockInwardNumber: "2015-2023-327680", stockInwardDate: "27-Sep-2023" },
  10: { senderEntityCodeName: "1176 / ISSR - COIMBATORE", stockOutwardNumber: "2023-323135", stockOutwardDate: "14-Sep-2023", receiverEntityCodeName: "2176 / ISSR-VELLORE", stockInwardNumber: "2176-2023-323150", stockInwardDate: "14-Sep-2023" },
};

/* ─────────────────────── Grid Icon ─────────────────────── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" opacity="0.7" />
  </svg>
);

/* ─────────────────────────── Sample Data ─────────────────────────── */
const SAMPLE_DATA: StockOutward[] = [
  { id: 1, stockInwardNumber: "2024-353185", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "1118 / POLLACHI", transferredDate: "18-Jan-2024", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 2, stockInwardNumber: "2023-347791", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "1185 / DWH - COIMBATORE", transferredDate: "22-Dec-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 3, stockInwardNumber: "2023-347699", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "1115 / R.S.PURAM", transferredDate: "22-Dec-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 4, stockInwardNumber: "2023-347384", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "1114 / MARUTHAM", transferredDate: "20-Dec-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 5, stockInwardNumber: "2023-346624", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "2124 / KAMATCHI- KANCHIPURAM", transferredDate: "11-Dec-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 6, stockInwardNumber: "2023-346622", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "1122 / CO-OPTEX NEW SHOWROOM", transferredDate: "11-Dec-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 7, stockInwardNumber: "2023-334248", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "1922 / POTHIGAI- TRICHY", transferredDate: "19-Oct-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 8, stockInwardNumber: "2023-327676", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "1276 / ISSR - CUDDALORE", transferredDate: "27-Sep-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 9, stockInwardNumber: "2023-327667", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "2015 / KANTHIMATHI-TIRUNELVELI", transferredDate: "27-Sep-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
  { id: 10, stockInwardNumber: "2023-323135", senderCodeName: "1176 / ISSR - COIMBATORE", receiverCodeName: "2176 / ISSR-VELLORE", transferredDate: "14-Sep-2023", status: "SUBMITTED", acknowledgeStatus: "ACKNOWLEDGED" },
];

/* ─────────────────────────── Status styles ─────────────────────────── */
const STATUS_STYLES: Record<OutwardStatus, string> = {
  "SUBMITTED": "bg-[#FFA70B] text-white",
};

const ACK_STATUS_STYLES: Record<AcknowledgeStatus, string> = {
  "ACKNOWLEDGED": "bg-[#28a745] text-white",
};

type SortKey = keyof StockOutward;
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function StockOutwardListPage() {
  const [filters, setFilters] = useState({
    stockInwardNumber: "",
    senderCodeName: "",
    receiverCodeName: "",
    transferredDate: "",
    status: "",
    acknowledgeStatus: "",
  });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ackModalRow, setAckModalRow] = useState<StockOutward | null>(null);
  const router = useRouter();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) => {
    return (
      row.stockInwardNumber.toLowerCase().includes(filters.stockInwardNumber.toLowerCase()) &&
      row.senderCodeName.toLowerCase().includes(filters.senderCodeName.toLowerCase()) &&
      row.receiverCodeName.toLowerCase().includes(filters.receiverCodeName.toLowerCase()) &&
      (filters.transferredDate === "" || row.transferredDate.toLowerCase().includes(filters.transferredDate.toLowerCase())) &&
      (filters.status === "" || row.status === filters.status) &&
      (filters.acknowledgeStatus === "" || row.acknowledgeStatus === filters.acknowledgeStatus)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
    </span>
  );

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  const handleClear = () => {
    setFilters({ stockInwardNumber: "", senderCodeName: "", receiverCodeName: "", transferredDate: "", status: "", acknowledgeStatus: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Stock Outward List - ISSR
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">ISSR</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Stock Outward List - ISSR</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Stock Outward List(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              disabled={selectedId === null}
              onClick={() => {
                if (selectedId !== null) {
                  router.push("/operational/warehouse-management/issr/stock-outward/delivery-challan");
                }
              }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3.5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              Delivery Challan
            </button>
            <Link href="/operational/warehouse-management/issr/stock-outward/create">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3.5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v2H8v-2zm0 4h5v2H8v-2z" />
                </svg>
                Add
              </button>
            </Link>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3.5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
                <path d="M12.9 13.5l-1.4 1.4L8 18.4l-.7-.7 3.5-3.5 1.4-1.4.7.7zM16.2 10.2l-.7-.7-1.4 1.4-.7.7.7.7 1.4-1.4.7-.7z" />
              </svg>
              Edit
            </button>
            <button
              disabled={selectedId === null}
              onClick={() => {
                if (selectedId !== null) {
                  router.push("/operational/warehouse-management/issr/stock-outward/view");
                }
              }}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3.5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
                <path d="M8 16h8v2H8zm0-4h8v2H8z" />
              </svg>
              View
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3.5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-10 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockInwardNumber")}>
                  Stock Inward Number <SortIcon col="stockInwardNumber" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("senderCodeName")}>
                  Sender Code / Name <SortIcon col="senderCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("receiverCodeName")}>
                  Receiver Code / Name <SortIcon col="receiverCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("transferredDate")}>
                  Transferred Date <SortIcon col="transferredDate" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>
                  Status <SortIcon col="status" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("acknowledgeStatus")}>
                  Acknowledge Status <SortIcon col="acknowledgeStatus" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.stockInwardNumber} onChange={(e) => { setFilters((f) => ({ ...f, stockInwardNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.senderCodeName} onChange={(e) => { setFilters((f) => ({ ...f, senderCodeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.receiverCodeName} onChange={(e) => { setFilters((f) => ({ ...f, receiverCodeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.transferredDate} onChange={(e) => { setFilters((f) => ({ ...f, transferredDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.acknowledgeStatus} onChange={(e) => { setFilters((f) => ({ ...f, acknowledgeStatus: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.stockInwardNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.senderCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.receiverCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.transferredDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${ACK_STATUS_STYLES[row.acknowledgeStatus]}`}>{row.acknowledgeStatus}</span>
                        <button
                          onClick={() => setAckModalRow(row)}
                          className="flex size-7 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90"
                        >
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
                            <path d="M8 16h8v2H8zm0-4h8v2H8z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Acknowledgement Status Modal ── */}
      {ackModalRow && (() => {
        const ack = ACK_DATA[ackModalRow.id];
        return (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-10">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" onClick={() => setAckModalRow(null)} />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
              {/* Header */}
              <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
                <h3 className="text-base font-semibold text-white">Acknowledgement Status</h3>
                <button onClick={() => setAckModalRow(null)} className="text-white hover:opacity-80">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Acknowledged badge */}
                <div className="mb-5 flex justify-end">
                  <span className="rounded border-2 border-[#28a745] px-3 py-1 text-sm font-bold text-[#28a745]">ACKNOWLEDGED</span>
                </div>

                {/* Sender */}
                <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
                  <GridIcon /> Sender
                </h4>
                <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Entity Code / Name</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{ack.senderEntityCodeName}</p>
                  </div>
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stock Outward Number</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{ack.stockOutwardNumber}</p>
                  </div>
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stock Outward Date</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{ack.stockOutwardDate}</p>
                  </div>
                </div>

                {/* Receiver */}
                <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
                  <GridIcon /> Receiver
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Entity Code / Name</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{ack.receiverEntityCodeName}</p>
                  </div>
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stock Inward Number</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{ack.stockInwardNumber}</p>
                  </div>
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stock Inward Date</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{ack.stockInwardDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
