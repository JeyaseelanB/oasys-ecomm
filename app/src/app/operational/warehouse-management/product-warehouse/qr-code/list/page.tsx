"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type QRStatus = "QR_COMPLETE_PAR_NOT_GENERATED" | "QR_COMPLETE_PAR_GENERATED";

interface QRCodeItem {
  id: number;
  ackNumber: string;
  stockInwardNumber: string;
  senderCodeName: string;
  receiverCodeName: string;
  status: QRStatus;
}

const SAMPLE_DATA: QRCodeItem[] = [
  { id: 1, ackNumber: "", stockInwardNumber: "2381-MAR26-362482", senderCodeName: "353313/T(H) 110, ARINGNAR ANNA P.W.C.S.LTD.,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_NOT_GENERATED" },
  { id: 2, ackNumber: "2381-23115836", stockInwardNumber: "2381-MAR24-360900", senderCodeName: "292774/KALIKKAVALASU INDUSTRIAL W.C.S E.H.131,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 3, ackNumber: "2381-23115835", stockInwardNumber: "2381-MAR24-360899", senderCodeName: "292774/KALIKKAVALASU INDUSTRIAL W.C.S E.H.131,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 4, ackNumber: "2381-23115834", stockInwardNumber: "2381-MAR24-360893", senderCodeName: "292774/KALIKKAVALASU INDUSTRIAL W.C.S E.H.131,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 5, ackNumber: "2381-23115833", stockInwardNumber: "2381-MAR24-360892", senderCodeName: "293572/EH.216,ELUMALAIYAN POWERLOOM WCS.LTD.,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 6, ackNumber: "2381-23115832", stockInwardNumber: "2381-MAR24-360891", senderCodeName: "293572/EH.216,ELUMALAIYAN POWERLOOM WCS.LTD.,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 7, ackNumber: "2381-23115831", stockInwardNumber: "2381-MAR24-360890", senderCodeName: "293572/EH.216,ELUMALAIYAN POWERLOOM WCS.LTD.,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 8, ackNumber: "2381-23115830", stockInwardNumber: "2381-MAR24-360889", senderCodeName: "293572/EH.216,ELUMALAIYAN POWERLOOM WCS.LTD.,", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 9, ackNumber: "2381-23115829", stockInwardNumber: "2381-MAR24-360856", senderCodeName: "292178/PALLAKATTUPUDUR WEAVERS COOP. SOCIETY AA.128", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
  { id: 10, ackNumber: "2381-23115828", stockInwardNumber: "2381-MAR24-360855", senderCodeName: "291850/CHENNIMALAI HLWEAVERS COOP. SOCIETY K.885", receiverCodeName: "2381/PWH CHENNIMALAI", status: "QR_COMPLETE_PAR_GENERATED" },
];

const STATUS_STYLES: Record<QRStatus, string> = {
  QR_COMPLETE_PAR_NOT_GENERATED: "bg-[#FFA70B] text-white",
  QR_COMPLETE_PAR_GENERATED: "bg-[#28a745] text-white",
};

type SortKey = keyof QRCodeItem;
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function QRCodeListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    ackNumber: "",
    stockInwardNumber: "",
    senderCodeName: "",
    receiverCodeName: "",
    status: "",
  });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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
      row.ackNumber.toLowerCase().includes(filters.ackNumber.toLowerCase()) &&
      row.stockInwardNumber.toLowerCase().includes(filters.stockInwardNumber.toLowerCase()) &&
      row.senderCodeName.toLowerCase().includes(filters.senderCodeName.toLowerCase()) &&
      row.receiverCodeName.toLowerCase().includes(filters.receiverCodeName.toLowerCase()) &&
      (filters.status === "" || row.status === filters.status)
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
    setFilters({ ackNumber: "", stockInwardNumber: "", senderCodeName: "", receiverCodeName: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          QR Code List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Product Warehouse</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">QR Code List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">85633</span> - QR Code(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
              Download QR Code
            </button>
            <Link
              href="/operational/warehouse-management/product-warehouse/qr-code/create"
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h7v7" /></svg>
              QR Code
            </Link>
            <button
              onClick={() => {
                if (selectedId !== null) {
                  router.push("/operational/warehouse-management/product-warehouse/qr-code/edit");
                }
              }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              Edit
            </button>
            <button
              onClick={() => {
                if (selectedId !== null) {
                  router.push("/operational/warehouse-management/product-warehouse/qr-code/view");
                }
              }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              View
            </button>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6" /><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" /></svg>
              Delete
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-14 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("ackNumber")}>
                  Ack Number <SortIcon col="ackNumber" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("stockInwardNumber")}>
                  Stock Inward Number <SortIcon col="stockInwardNumber" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("senderCodeName")}>
                  Sender Code / Name <SortIcon col="senderCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("receiverCodeName")}>
                  Receiver Code / Name <SortIcon col="receiverCodeName" />
                </th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>
                  Status <SortIcon col="status" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.ackNumber} onChange={(e) => { setFilters((f) => ({ ...f, ackNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
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
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="QR_COMPLETE_PAR_NOT_GENERATED">QR_COMPLETE_PAR_NOT_GENERATED</option>
                    <option value="QR_COMPLETE_PAR_GENERATED">QR_COMPLETE_PAR_GENERATED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-3 py-3 text-center text-primary dark:border-dark-3">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.ackNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.stockInwardNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.senderCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.receiverCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
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
    </div>
  );
}
