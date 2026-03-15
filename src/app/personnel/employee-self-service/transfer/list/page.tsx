"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TransferRow {
  id: number;
  referenceNumber: string;
  referenceDate: string;
  transferFrom: string;
  transferTo: string;
  sectionFrom: string;
  sectionTo: string;
  status: string;
}

const SAMPLE_DATA: TransferRow[] = [
  { id: 1,  referenceNumber: "TRNS/0038",      referenceDate: "22-Mar-2024", transferFrom: "HEAD OFFICE",  transferTo: "HEAD OFFICE",         sectionFrom: "EDP",       sectionTo: "Banking",   status: "INPROGRESS"     },
  { id: 2,  referenceNumber: "TFR058",          referenceDate: "25-Apr-2022", transferFrom: "CHENNAI",      transferTo: "HEAD OFFICE",         sectionFrom: "Admin",     sectionTo: "EDP",       status: "FINAL APPROVED" },
  { id: 3,  referenceNumber: "TFR036",          referenceDate: "26-Oct-2021", transferFrom: "HEAD OFFICE",  transferTo: "CHENNAI",             sectionFrom: "EDP",       sectionTo: "Admin",     status: "FINAL APPROVED" },
  { id: 4,  referenceNumber: "TFR022",          referenceDate: "25-Mar-2021", transferFrom: "CHENNAI",      transferTo: "HEAD OFFICE",         sectionFrom: "Accounts",  sectionTo: "EDP",       status: "INPROGRESS"     },
  { id: 5,  referenceNumber: "TFR011",          referenceDate: "15-Nov-2019", transferFrom: "HEAD OFFICE",  transferTo: "CHENNAI",             sectionFrom: "EDP",       sectionTo: "Admin",     status: "INPROGRESS"     },
  { id: 6,  referenceNumber: "ADMN/2003/A1",    referenceDate: "20-May-2003", transferFrom: "TIRUNELVELI", transferTo: "Distribution Wareh...", sectionFrom: "Marketing", sectionTo: "Marketing", status: ""               },
  { id: 7,  referenceNumber: "A/94-A5/701/97",  referenceDate: "16-Sep-1997", transferFrom: "TRICHY",       transferTo: "TRICHY",              sectionFrom: "Marketing", sectionTo: "Marketing", status: ""               },
  { id: 8,  referenceNumber: "A4/001149/2014",  referenceDate: "14-Jul-2014", transferFrom: "VIJAYAWADA",   transferTo: "HEAD OFFICE",         sectionFrom: "Admin",     sectionTo: "EDP",       status: ""               },
  { id: 9,  referenceNumber: "A/A4/2011",       referenceDate: "14-Dec-2011", transferFrom: "CHENNAI",      transferTo: "VIJAYAWADA",          sectionFrom: "Admin",     sectionTo: "Admin",     status: ""               },
  { id: 10, referenceNumber: "2360/A4/2010",    referenceDate: "14-Jun-2010", transferFrom: "TIRUNELVELI", transferTo: "CHENNAI",              sectionFrom: "Marketing", sectionTo: "Admin",     status: ""               },
];

const STATUS_COLORS: Record<string, string> = {
  "INPROGRESS":     "#6c757d",
  "FINAL APPROVED": "#28a745",
};

const LOCATION_OPTIONS = ["HEAD OFFICE", "CHENNAI", "TIRUNELVELI", "TRICHY", "VIJAYAWADA"];
const SECTION_OPTIONS  = ["EDP", "Admin", "Accounts", "Banking", "Marketing"];

type SortKey = keyof TransferRow;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function TransferListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ referenceNumber: "", referenceDate: "", transferFrom: "", transferTo: "", sectionFrom: "", sectionTo: "", status: "" });
  const [sortKey, setSortKey]         = useState<SortKey>("id");
  const [sortDir, setSortDir]         = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]       = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc"  ? "opacity-100" : "opacity-40"}>▲</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
    </span>
  );

  const filtered = SAMPLE_DATA.filter(r =>
    r.referenceNumber.toLowerCase().includes(filters.referenceNumber.toLowerCase()) &&
    (filters.transferFrom === "" || r.transferFrom === filters.transferFrom) &&
    (filters.transferTo   === "" || r.transferTo   === filters.transferTo)   &&
    (filters.sectionFrom  === "" || r.sectionFrom  === filters.sectionFrom)  &&
    (filters.sectionTo    === "" || r.sectionTo    === filters.sectionTo)    &&
    (filters.status       === "" || r.status       === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
    setFilters({ referenceNumber: "", referenceDate: "", transferFrom: "", transferTo: "", sectionFrom: "", sectionTo: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Transfer List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><a href="/" className="font-medium text-primary hover:underline">Home</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Transfer List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span>&nbsp;- Transfer(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/personnel/employee-self-service/transfer/create"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </Link>
            <button
              disabled={selectedId === null}
              onClick={() => { if (selectedId) router.push(`/personnel/employee-self-service/transfer/view/${selectedId}`); }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
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
                {([ ["referenceNumber","Reference Number"], ["referenceDate","Reference Date"], ["transferFrom","Transfer From"], ["transferTo","Transfer To"], ["sectionFrom","Section From"], ["sectionTo","Section To"], ["status","Status"] ] as [SortKey,string][]).map(([col, label]) => (
                  <th key={col} onClick={() => handleSort(col)} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                    {label} <SortIcon col={col} />
                  </th>
                ))}
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5"></td>
                <td className="border border-stroke px-2 py-1.5">
                  <input className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.referenceNumber} onChange={e => { setFilters(f => ({ ...f, referenceNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5">
                  <div className="relative flex items-center">
                    <input placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent py-1 pl-2 pr-7 text-xs text-dark outline-none focus:border-primary"
                      value={filters.referenceDate} onChange={e => { setFilters(f => ({ ...f, referenceDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="pointer-events-none absolute right-1.5 size-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                {(["transferFrom","transferTo"] as const).map(col => (
                  <td key={col} className="border border-stroke px-2 py-1.5">
                    <select className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                      value={filters[col]} onChange={e => { setFilters(f => ({ ...f, [col]: e.target.value })); setCurrentPage(1); }}>
                      <option value="">Select</option>
                      {LOCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </td>
                ))}
                {(["sectionFrom","sectionTo"] as const).map(col => (
                  <td key={col} className="border border-stroke px-2 py-1.5">
                    <select className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                      value={filters[col]} onChange={e => { setFilters(f => ({ ...f, [col]: e.target.value })); setCurrentPage(1); }}>
                      <option value="">Select</option>
                      {SECTION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </td>
                ))}
                <td className="border border-stroke px-2 py-1.5">
                  <select className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.status} onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="INPROGRESS">INPROGRESS</option>
                    <option value="FINAL APPROVED">FINAL APPROVED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke ${idx % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"} hover:bg-blue-50`}>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark">{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.referenceNumber}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.referenceDate}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.transferFrom}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.transferTo}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.sectionFrom}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.sectionTo}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center">
                    {row.status && (
                      <span className="inline-block rounded px-3 py-1.5 text-xs font-bold text-white tracking-wide" style={{ backgroundColor: STATUS_COLORS[row.status] || "#6c757d", minWidth: "100px" }}>
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">«</button>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">‹</button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)}
                  className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100"}`}>
                  {page}
                </button>
              )
            )}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40">»</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
