"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type VehicleDeparture = {
  id: number;
  referenceNumber: string;
  vehicleNumber: string;
  driverName: string;
  destination: string;
  employeeName: string;
  departureDate: string;
};

const SAMPLE_DATA: VehicleDeparture[] = [
  { id: 1,  referenceNumber: "VHDEP037", vehicleNumber: "TN01 AL 47 57",  driverName: "BALU",         destination: "Secretariat",   employeeName: "STALIN P,VAASU R",                             departureDate: "22-Jan-2025" },
  { id: 2,  referenceNumber: "VHDEP036", vehicleNumber: "TN01 AL 47 57",  driverName: "BALU",         destination: "Secretariat",   employeeName: "ALOK BABELAY,VAASU R",                         departureDate: "01-Sep-2024" },
  { id: 3,  referenceNumber: "VHDEP035", vehicleNumber: "TN01 AM7457",    driverName: "BALU",         destination: "DH Office",     employeeName: "ALOK BABELAY,BALASUBRAMANIAN R,BHASKAR V",    departureDate: "26-Jul-2021" },
  { id: 4,  referenceNumber: "VHDEP034", vehicleNumber: "TN01 AM7457",    driverName: "BALU",         destination: "thambaram",     employeeName: "",                                             departureDate: "18-Nov-2020" },
  { id: 5,  referenceNumber: "VHDEP033", vehicleNumber: "TN01 AM7457",    driverName: "BALU",         destination: "thambaram",     employeeName: "",                                             departureDate: "05-Nov-2020" },
  { id: 6,  referenceNumber: "VHDEP032", vehicleNumber: "TN01 AE4757",    driverName: "BALU",         destination: "cri",           employeeName: "",                                             departureDate: "27-Oct-2020" },
  { id: 7,  referenceNumber: "VHDEP031", vehicleNumber: "TN 01 BH 8877",  driverName: "BALU",         destination: "secrertariate", employeeName: "",                                             departureDate: "12-Oct-2020" },
  { id: 8,  referenceNumber: "VHDEP030", vehicleNumber: "TN 01 AV 0376",  driverName: "RAJENDRAN",    destination: "pondy",         employeeName: "",                                             departureDate: "21-Jun-2019" },
  { id: 9,  referenceNumber: "VHDEP028", vehicleNumber: "1514",           driverName: "RAJENDRAN",    destination: "Secretariat",   employeeName: "",                                             departureDate: "04-Mar-2019" },
  { id: 10, referenceNumber: "VHDEP027", vehicleNumber: "TN13R1547",      driverName: "KALIAPERUMAL", destination: "Secretary",     employeeName: "",                                             departureDate: "20-Nov-2018" },
];

type SortKey = keyof VehicleDeparture;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const BASE = "/personnel/human-resource/admin/vehicle-management/vehicle-departure";

export default function VehicleDepartureListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ vehicleNumber: "", driverName: "", destination: "", employeeName: "", departureDate: "" });
  const [sortKey, setSortKey]   = useState<SortKey>("id");
  const [sortDir, setSortDir]   = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter(r =>
    r.vehicleNumber.toLowerCase().includes(filters.vehicleNumber.toLowerCase()) &&
    r.driverName.toLowerCase().includes(filters.driverName.toLowerCase()) &&
    r.destination.toLowerCase().includes(filters.destination.toLowerCase()) &&
    r.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    r.departureDate.toLowerCase().includes(filters.departureDate.toLowerCase())
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
    setFilters({ vehicleNumber: "", driverName: "", destination: "", employeeName: "", departureDate: "" });
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
      {/* Title + Breadcrumb row */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Vehicle Departure List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Vehicle Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Vehicle Departure List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Card toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Vehicle Departure(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Create Departure */}
            <button
              onClick={() => router.push(`${BASE}/create`)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Create Departure
            </button>
            {/* Edit */}
            <button
              onClick={() => selectedId && router.push(`${BASE}/edit?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            {/* View */}
            <button
              onClick={() => selectedId && router.push(`${BASE}/view?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              View
            </button>
            {/* Delete */}
            <button
              onClick={() => { if (selectedId && confirm("Delete this record?")) setSelectedId(null); }}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
              Delete
            </button>
            {/* Clear */}
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Reference Number</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("vehicleNumber")}>Vehicle Number <SortIcon col="vehicleNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("driverName")}>Driver Name <SortIcon col="driverName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("destination")}>Destination <SortIcon col="destination" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeName")}>Employee Name <SortIcon col="employeeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("departureDate")}>Departure Date <SortIcon col="departureDate" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>

              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.vehicleNumber} onChange={e => { setFilters(f => ({ ...f, vehicleNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.driverName} onChange={e => { setFilters(f => ({ ...f, driverName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.destination} onChange={e => { setFilters(f => ({ ...f, destination: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filters.employeeName} onChange={e => { setFilters(f => ({ ...f, employeeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                      value={filters.departureDate} onChange={e => { setFilters(f => ({ ...f, departureDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3" />
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(selectedId === row.id ? null : row.id)}
                    className={`cursor-pointer border-b border-stroke dark:border-dark-3 hover:bg-blue-50 dark:hover:bg-[#1e2d42] ${
                      selectedId === row.id ? "bg-[#e8f4f8] dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                    }`}
                  >
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center font-medium text-primary dark:border-dark-3">{row.referenceNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-primary dark:border-dark-3">{row.vehicleNumber}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.driverName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.destination}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.employeeName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.departureDate}</td>
                    <td className="px-2 py-3 text-center" onClick={e => e.stopPropagation()}>
                      <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((pg, i) =>
              pg === "..." ? (
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={pg} onClick={() => setCurrentPage(pg as number)}
                  className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === pg ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>
                  {pg}
                </button>
              )
            )}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
