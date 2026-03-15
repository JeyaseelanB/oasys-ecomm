"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PromotionRow {
  id: number;
  referenceNumber: string;
  department: string;
  currentDesignation: string;
  promotedDesignation: string;
  revisedPayscale: string;
  status: string;
}

const SAMPLE_DATA: PromotionRow[] = [
  { id: 1, referenceNumber: "PRM - 22 - 63",  department: "ADMIN", currentDesignation: "SENIOR ASSISTANT", promotedDesignation: "SUPERINTENDENT",          revisedPayscale: "6550 - 29000", status: "ACCEPTED"    },
  { id: 2, referenceNumber: "PRM - 25 - 791", department: "ADMIN", currentDesignation: "SUPERINTENDENT",   promotedDesignation: "MANAGER P AND D",          revisedPayscale: "225 - 225",    status: "IN-PROGRESS" },
  { id: 3, referenceNumber: "PRM - 25 - 792", department: "ADMIN", currentDesignation: "SUPERINTENDENT",   promotedDesignation: "MANAGER P AND D",          revisedPayscale: "225 - 225",    status: "IN-PROGRESS" },
  { id: 4, referenceNumber: "PRM - 25 - 830", department: "ADMIN", currentDesignation: "SUPERINTENDENT",   promotedDesignation: "MANAGER D AND P INCHARGE", revisedPayscale: "250 - 500",    status: "ACCEPTED"    },
];

const STATUS_COLORS: Record<string, string> = {
  "ACCEPTED":    "#28a745",
  "IN-PROGRESS": "#fd7e14",
};

type SortKey = keyof PromotionRow;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function PromotionListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ referenceNumber: "", department: "", currentDesignation: "", promotedDesignation: "", revisedPayscale: "", status: "" });
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
    r.department.toLowerCase().includes(filters.department.toLowerCase()) &&
    r.currentDesignation.toLowerCase().includes(filters.currentDesignation.toLowerCase()) &&
    r.promotedDesignation.toLowerCase().includes(filters.promotedDesignation.toLowerCase()) &&
    r.revisedPayscale.toLowerCase().includes(filters.revisedPayscale.toLowerCase()) &&
    (filters.status === "" || r.status === filters.status)
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
    setFilters({ referenceNumber: "", department: "", currentDesignation: "", promotedDesignation: "", revisedPayscale: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Promotion List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><a href="/" className="font-medium text-primary hover:underline">Home</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Promotion List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span>&nbsp;- Promotion(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              disabled={selectedId === null}
              onClick={() => { if (selectedId) router.push(`/personnel/employee-self-service/promotion/view/${selectedId}`); }}
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
                {([ ["referenceNumber","Reference Number"], ["department","Department"], ["currentDesignation","Current Designation"], ["promotedDesignation","Promoted Designation"], ["revisedPayscale","Revised Payscale (₹)"], ["status","Status"] ] as [SortKey,string][]).map(([col, label]) => (
                  <th key={col} onClick={() => handleSort(col)} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                    {label} <SortIcon col={col} />
                  </th>
                ))}
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5"></td>
                {["referenceNumber","department","currentDesignation","promotedDesignation","revisedPayscale"].map(col => (
                  <td key={col} className="border border-stroke px-2 py-1.5">
                    <input className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                      value={filters[col as keyof typeof filters]}
                      onChange={e => { setFilters(f => ({ ...f, [col]: e.target.value })); setCurrentPage(1); }} />
                  </td>
                ))}
                <td className="border border-stroke px-2 py-1.5">
                  <select className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.status} onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="IN-PROGRESS">IN-PROGRESS</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke ${idx % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"} hover:bg-blue-50`}>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark">{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.referenceNumber}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.department}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.currentDesignation}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.promotedDesignation}</td>
                  <td className="border-r border-stroke px-3 py-3 text-right text-dark">{row.revisedPayscale}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center">
                    {row.status && (
                      <span className="inline-block rounded px-3 py-1.5 text-xs font-bold text-white tracking-wide" style={{ backgroundColor: STATUS_COLORS[row.status] || "#6c757d", minWidth: "90px" }}>
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
