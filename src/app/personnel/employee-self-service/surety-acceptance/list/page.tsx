"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SuretyRow {
  id: number;
  referenceNo: string;
  employeeCode: string;
  employeeName: string;
  loanAdvance: string;
  loanAdvanceType: string;
  loanAdvanceAmount: number;
  createdDate: string;
  status: string;
}

const SAMPLE_DATA: SuretyRow[] = [
  { id: 1,  referenceNo: "LRF6880", employeeCode: "165", employeeName: "MANGALAM K",    loanAdvance: "Loan", loanAdvanceType: "BTF-2",           loanAdvanceAmount: 100000.00, createdDate: "12-Aug-2024", status: "SURETY ACCEPTED" },
  { id: 2,  referenceNo: "LRF6109", employeeCode: "33",  employeeName: "KARTHIK P M",   loanAdvance: "Loan", loanAdvanceType: "BTF(HOUSING)",     loanAdvanceAmount: 300000.00, createdDate: "21-Nov-2023", status: "SURETY ACCEPTED" },
  { id: 3,  referenceNo: "LRF5975", employeeCode: "147", employeeName: "NAGARAJAN C",   loanAdvance: "Loan", loanAdvanceType: "BTFM 2",           loanAdvanceAmount: 160000.00, createdDate: "19-Oct-2023", status: "SURETY ACCEPTED" },
  { id: 4,  referenceNo: "LRF5971", employeeCode: "911", employeeName: "BOOPATHI S K",  loanAdvance: "Loan", loanAdvanceType: "BTF PERSONAL LOAN",loanAdvanceAmount: 24000.00,  createdDate: "11-Oct-2023", status: "SURETY ACCEPTED" },
  { id: 5,  referenceNo: "LRF1282", employeeCode: "302", employeeName: "JAYAKUMAR R",   loanAdvance: "Loan", loanAdvanceType: "BTF1MEDICAL",      loanAdvanceAmount: 46650.00,  createdDate: "26-Apr-2020", status: "SURETY ACCEPTED" },
  { id: 6,  referenceNo: "LRF0866", employeeCode: "132", employeeName: "GOPAL A",       loanAdvance: "Loan", loanAdvanceType: "BTF1MEDICAL",      loanAdvanceAmount: 18700.00,  createdDate: "05-Mar-2020", status: "SURETY ACCEPTED" },
  { id: 7,  referenceNo: "LRF0787", employeeCode: "956", employeeName: "BRAVENA M",     loanAdvance: "Loan", loanAdvanceType: "BTFV 1",           loanAdvanceAmount: 100000.00, createdDate: "04-Feb-2020", status: "SURETY ACCEPTED" },
  { id: 8,  referenceNo: "LRF0786", employeeCode: "296", employeeName: "SHARMILA N",    loanAdvance: "Loan", loanAdvanceType: "BTFV 1",           loanAdvanceAmount: 60000.00,  createdDate: "04-Feb-2020", status: "SURETY ACCEPTED" },
  { id: 9,  referenceNo: "LRF0785", employeeCode: "293", employeeName: "PREMKUMAR M",   loanAdvance: "Loan", loanAdvanceType: "BTF E1",           loanAdvanceAmount: 20000.00,  createdDate: "04-Feb-2020", status: "SURETY ACCEPTED" },
  { id: 10, referenceNo: "LRF0277", employeeCode: "325", employeeName: "DINESH S",      loanAdvance: "Loan", loanAdvanceType: "BTF1MEDICAL",      loanAdvanceAmount: 43000.00,  createdDate: "11-Dec-2019", status: "SURETY ACCEPTED" },
];

const STATUS_COLORS: Record<string, string> = {
  "SURETY ACCEPTED": "#28a745",
  "PENDING": "#ffc107",
};

type SortKey = keyof SuretyRow;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function SuretyAcceptanceListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ referenceNo: "", employeeCode: "", employeeName: "", loanAdvance: "", loanAdvanceType: "", loanAdvanceAmount: "", createdDate: "", status: "" });
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
    r.referenceNo.toLowerCase().includes(filters.referenceNo.toLowerCase()) &&
    r.employeeCode.toLowerCase().includes(filters.employeeCode.toLowerCase()) &&
    r.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    (filters.loanAdvance === "" || r.loanAdvance === filters.loanAdvance) &&
    r.loanAdvanceType.toLowerCase().includes(filters.loanAdvanceType.toLowerCase()) &&
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
    setFilters({ referenceNo: "", employeeCode: "", employeeName: "", loanAdvance: "", loanAdvanceType: "", loanAdvanceAmount: "", createdDate: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Surety Acceptance List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><a href="/" className="font-medium text-primary hover:underline">Home</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Surety Acceptance List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span>&nbsp;- Surety Acceptance(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              disabled={selectedId === null}
              onClick={() => { if (selectedId) router.push(`/personnel/employee-self-service/surety-acceptance/view/${selectedId}`); }}
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
                {([ ["referenceNo","Reference No."], ["employeeCode","Employee Code"], ["employeeName","Employee Name"] ] as [SortKey,string][]).map(([col, label]) => (
                  <th key={col} onClick={() => handleSort(col)} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                    {label} <SortIcon col={col} />
                  </th>
                ))}
                <th onClick={() => handleSort("loanAdvance")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Loan / Advance <SortIcon col="loanAdvance" />
                </th>
                <th onClick={() => handleSort("loanAdvanceType")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Loan / Advance Type <SortIcon col="loanAdvanceType" />
                </th>
                <th onClick={() => handleSort("loanAdvanceAmount")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Loan / Advance (₹) <SortIcon col="loanAdvanceAmount" />
                </th>
                <th onClick={() => handleSort("createdDate")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Created Date <SortIcon col="createdDate" />
                </th>
                <th onClick={() => handleSort("status")} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                  Status <SortIcon col="status" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5"></td>
                {["referenceNo","employeeCode","employeeName"].map(col => (
                  <td key={col} className="border border-stroke px-2 py-1.5">
                    <input className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                      value={filters[col as keyof typeof filters]} onChange={e => { setFilters(f => ({ ...f, [col]: e.target.value })); setCurrentPage(1); }} />
                  </td>
                ))}
                <td className="border border-stroke px-2 py-1.5">
                  <select className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.loanAdvance} onChange={e => { setFilters(f => ({ ...f, loanAdvance: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="Loan">Loan</option>
                    <option value="Advance">Advance</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5">
                  <input className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.loanAdvanceType} onChange={e => { setFilters(f => ({ ...f, loanAdvanceType: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5">
                  <input className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.loanAdvanceAmount} onChange={e => { setFilters(f => ({ ...f, loanAdvanceAmount: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5">
                  <div className="relative flex items-center">
                    <input placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent py-1 pl-2 pr-7 text-xs text-dark outline-none focus:border-primary"
                      value={filters.createdDate} onChange={e => { setFilters(f => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="pointer-events-none absolute right-1.5 size-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5">
                  <select className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none focus:border-primary"
                    value={filters.status} onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="SURETY ACCEPTED">SURETY ACCEPTED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke ${idx % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"} hover:bg-blue-50`}>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark">{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.referenceNo}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.employeeCode}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.employeeName}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.loanAdvance}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.loanAdvanceType}</td>
                  <td className="border-r border-stroke px-3 py-3 text-right text-dark">{row.loanAdvanceAmount.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark">{row.createdDate}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center">
                    {row.status && (
                      <span className="inline-block rounded px-3 py-1.5 text-xs font-bold text-white tracking-wide" style={{ backgroundColor: STATUS_COLORS[row.status] || "#6c757d", minWidth: "120px" }}>
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
