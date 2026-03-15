"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TransferStatus =
  | "RELIEVING_SUBMITTED"
  | "AVAILABILITY_FINAL_APPROVED"
  | "JOINED_ON_FINAL_APPROVED"
  | "JOINING_FINAL_APPROVED"
  | "REQUEST_FINAL_APPROVED"
  | "REQUEST_REJECTED";

interface TransferDeputationItem {
  id: number;
  category: string;
  transactionType: string;
  referenceNumber: string;
  employeeId: string;
  employeeName: string;
  transferFrom: string;
  transferTo: string;
  createdDate: string;
  status: TransferStatus;
}

const SAMPLE_DATA: TransferDeputationItem[] = [
  { id: 1,  category: "Transfer", transactionType: "Other region",  referenceNumber: "TFR747", employeeId: "430", employeeName: "VAIRAMUTHU R",  transferFrom: "D&P Office Salem",     transferTo: "D&P OFFICE THANJAVUR", createdDate: "10-Mar-2026", status: "RELIEVING_SUBMITTED" },
  { id: 2,  category: "Transfer", transactionType: "Other region",  referenceNumber: "TFR746", employeeId: "581", employeeName: "MURUGAN K",      transferFrom: "D&P OFFICE THANJAVUR", transferTo: "D&P Office Erode",     createdDate: "10-Mar-2026", status: "AVAILABILITY_FINAL_APPROVED" },
  { id: 3,  category: "Transfer", transactionType: "Other region",  referenceNumber: "TFR745", employeeId: "577", employeeName: "LALITHA S",      transferFrom: "D&P Office Erode",     transferTo: "D&P Office Salem",     createdDate: "10-Mar-2026", status: "JOINED_ON_FINAL_APPROVED" },
  { id: 4,  category: "Transfer", transactionType: "Other region",  referenceNumber: "TFR744", employeeId: "253", employeeName: "SARAVANAN P",    transferFrom: "VIJAYAWADA",           transferTo: "HEAD OFFICE",          createdDate: "02-Mar-2026", status: "JOINING_FINAL_APPROVED" },
  { id: 5,  category: "Transfer", transactionType: "Within region", referenceNumber: "TFR743", employeeId: "451", employeeName: "GANESAN K",      transferFrom: "DWH - CUDDALORE",      transferTo: "DWH - CUDDALORE",      createdDate: "02-Mar-2026", status: "JOINED_ON_FINAL_APPROVED" },
  { id: 6,  category: "Transfer", transactionType: "Within region", referenceNumber: "TFR742", employeeId: "451", employeeName: "GANESAN K",      transferFrom: "DWH - CUDDALORE",      transferTo: "DWH - CUDDALORE",      createdDate: "02-Mar-2026", status: "REQUEST_FINAL_APPROVED" },
  { id: 7,  category: "Transfer", transactionType: "Within region", referenceNumber: "TFR741", employeeId: "451", employeeName: "GANESAN K",      transferFrom: "DWH - CUDDALORE",      transferTo: "DWH - CUDDALORE",      createdDate: "02-Mar-2026", status: "REQUEST_REJECTED" },
  { id: 8,  category: "Transfer", transactionType: "Other region",  referenceNumber: "TFR740", employeeId: "312", employeeName: "PRIYA S",        transferFrom: "HEAD OFFICE",          transferTo: "D&P Office Salem",     createdDate: "28-Feb-2026", status: "REQUEST_FINAL_APPROVED" },
  { id: 9,  category: "Deputation", transactionType: "Within region", referenceNumber: "TFR739", employeeId: "198", employeeName: "RAMESH V",     transferFrom: "D&P Office Erode",     transferTo: "HEAD OFFICE",          createdDate: "25-Feb-2026", status: "JOINING_FINAL_APPROVED" },
  { id: 10, category: "Deputation", transactionType: "Other region",  referenceNumber: "TFR738", employeeId: "445", employeeName: "KAVITHA M",    transferFrom: "DWH - CUDDALORE",      transferTo: "D&P OFFICE THANJAVUR", createdDate: "20-Feb-2026", status: "AVAILABILITY_FINAL_APPROVED" },
];

const STATUS_STYLES: Record<TransferStatus, string> = {
  RELIEVING_SUBMITTED:        "bg-[#fd7e14]",
  AVAILABILITY_FINAL_APPROVED:"bg-[#28a745]",
  JOINED_ON_FINAL_APPROVED:   "bg-[#17a2b8]",
  JOINING_FINAL_APPROVED:     "bg-[#17a2b8]",
  REQUEST_FINAL_APPROVED:     "bg-[#28a745]",
  REQUEST_REJECTED:           "bg-[#dc3545]",
};

type SortKey = keyof TransferDeputationItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function TransferDeputationListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: "",
    transactionType: "",
    referenceNumber: "",
    employeeId: "",
    employeeName: "",
    transferFrom: "",
    transferTo: "",
    createdDate: "",
    status: "",
  });
  const [sortKey, setSortKey]     = useState<SortKey>("id");
  const [sortDir, setSortDir]     = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]   = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) =>
    (filters.category === "" || row.category === filters.category) &&
    row.transactionType.toLowerCase().includes(filters.transactionType.toLowerCase()) &&
    row.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase()) &&
    row.employeeId.toLowerCase().includes(filters.employeeId.toLowerCase()) &&
    row.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    (filters.transferFrom === "" || row.transferFrom === filters.transferFrom) &&
    (filters.transferTo === "" || row.transferTo === filters.transferTo) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const c = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? c : -c;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc"  ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
    </span>
  );

  const handleClear = () => {
    setFilters({ category: "", transactionType: "", referenceNumber: "", employeeId: "", employeeName: "", transferFrom: "", transferTo: "", createdDate: "", status: "" });
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

  const uniqueTransferFromOptions = [...new Set(SAMPLE_DATA.map((r) => r.transferFrom))];
  const uniqueTransferToOptions   = [...new Set(SAMPLE_DATA.map((r) => r.transferTo))];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Transfer / Deputation Request List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Transfer / Deputation Request List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Transfer / Deputation Request(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/personnel/human-resource/transfer-deputation/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </Link>
            <button
              onClick={() => { if (selectedId) router.push(`/personnel/human-resource/transfer-deputation/edit?id=${selectedId}`); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#007bff] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => { if (selectedId) router.push(`/personnel/human-resource/transfer-deputation/view?id=${selectedId}`); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-10 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("category")}>Category <SortIcon col="category" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("transactionType")}>Transaction Type <SortIcon col="transactionType" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("referenceNumber")}>Reference Number <SortIcon col="referenceNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeId")}>Employee ID <SortIcon col="employeeId" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeName")}>Employee Name <SortIcon col="employeeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("transferFrom")}>Transfer From <SortIcon col="transferFrom" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("transferTo")}>Transfer To <SortIcon col="transferTo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.category} onChange={(e) => { setFilters((f) => ({ ...f, category: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Deputation">Deputation</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.transactionType} onChange={(e) => { setFilters((f) => ({ ...f, transactionType: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.referenceNumber} onChange={(e) => { setFilters((f) => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeId} onChange={(e) => { setFilters((f) => ({ ...f, employeeId: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeName} onChange={(e) => { setFilters((f) => ({ ...f, employeeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.transferFrom} onChange={(e) => { setFilters((f) => ({ ...f, transferFrom: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    {uniqueTransferFromOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.transferTo} onChange={(e) => { setFilters((f) => ({ ...f, transferTo: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    {uniqueTransferToOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="RELIEVING_SUBMITTED">RELIEVING_SUBMITTED</option>
                    <option value="AVAILABILITY_FINAL_APPROVED">AVAILABILITY_FINAL_APPROVED</option>
                    <option value="JOINED_ON_FINAL_APPROVED">JOINED_ON_FINAL_APPROVED</option>
                    <option value="JOINING_FINAL_APPROVED">JOINING_FINAL_APPROVED</option>
                    <option value="REQUEST_FINAL_APPROVED">REQUEST_FINAL_APPROVED</option>
                    <option value="REQUEST_REJECTED">REQUEST_REJECTED</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={11} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className={`cursor-pointer border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#e8f4f8] dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.category}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{row.transactionType}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{row.referenceNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.employeeId}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.employeeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.transferFrom}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.transferTo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold text-white ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input type="radio" name="selectTransferRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
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
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
