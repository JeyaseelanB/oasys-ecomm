"use client";

import Link from "next/link";
import { useState } from "react";

interface RetiredEmployee {
  id: number;
  name: string;
  dateOfRetirement: string;
  region: string;
  grossSalary: number;
}

const SAMPLE_DATA: RetiredEmployee[] = [
  { id: 1, name: "SANKET SHAHA", dateOfRetirement: "24-Jul-2024", region: "HEAD OFFICE", grossSalary: 79317.0 },
  { id: 2, name: "KALI RAJ L", dateOfRetirement: "15-Apr-2005", region: "MADURAI", grossSalary: 7463.0 },
  { id: 3, name: "P KATHIRVELU", dateOfRetirement: "31-Mar-2005", region: "NEW DELHI", grossSalary: 11020.0 },
  { id: 4, name: "BALASUBRAMANIAN P", dateOfRetirement: "30-Jun-2014", region: "THANJAVUR", grossSalary: 31050.0 },
  { id: 5, name: "PANKAJAM A", dateOfRetirement: "30-Jun-2016", region: "COIMBATORE", grossSalary: 42548.0 },
  { id: 6, name: "VEERASAMY K B", dateOfRetirement: "30-Apr-2016", region: "CHENNAI", grossSalary: 42345.0 },
  { id: 7, name: "SAGAYAM U", dateOfRetirement: "08-Sep-2014", region: "HEAD OFFICE", grossSalary: 111280.0 },
  { id: 8, name: "SUGUMARAN M", dateOfRetirement: "31-May-2016", region: "CHENNAI", grossSalary: 57585.0 },
  { id: 9, name: "CHANDRA SHEKAR B", dateOfRetirement: "31-Mar-2005", region: "HYDERABAD", grossSalary: 11000.0 },
  { id: 10, name: "SHANMUGAM R", dateOfRetirement: "30-Sep-2013", region: "MADURAI", grossSalary: 59466.0 },
  { id: 11, name: "RAMASAMY K", dateOfRetirement: "31-Jan-2008", region: "COIMBATORE", grossSalary: 18750.0 },
  { id: 12, name: "KRISHNAMURTHY V", dateOfRetirement: "28-Feb-2010", region: "HEAD OFFICE", grossSalary: 45200.0 },
  { id: 13, name: "MURUGESAN S", dateOfRetirement: "31-Aug-2012", region: "CHENNAI", grossSalary: 62100.0 },
  { id: 14, name: "ANNAMALAI P", dateOfRetirement: "30-Nov-2015", region: "MADURAI", grossSalary: 38900.0 },
  { id: 15, name: "SUBRAMANIAM T", dateOfRetirement: "31-May-2009", region: "THANJAVUR", grossSalary: 22400.0 },
  { id: 16, name: "VENKATACHALAM R", dateOfRetirement: "28-Feb-2018", region: "HEAD OFFICE", grossSalary: 87650.0 },
  { id: 17, name: "DURAISAMY G", dateOfRetirement: "30-Jun-2011", region: "COIMBATORE", grossSalary: 31200.0 },
  { id: 18, name: "THIYAGARAJAN S", dateOfRetirement: "31-Oct-2020", region: "CHENNAI", grossSalary: 95400.0 },
  { id: 19, name: "PALANISWAMY M", dateOfRetirement: "31-Mar-2007", region: "MADURAI", grossSalary: 16800.0 },
  { id: 20, name: "ARUMUGAM K", dateOfRetirement: "30-Sep-2019", region: "HEAD OFFICE", grossSalary: 78300.0 },
  { id: 21, name: "CHELLAMUTHU V", dateOfRetirement: "28-Feb-2013", region: "COIMBATORE", grossSalary: 27500.0 },
  { id: 22, name: "GOVINDASAMY P", dateOfRetirement: "31-Jul-2006", region: "THANJAVUR", grossSalary: 14200.0 },
  { id: 23, name: "ELANGOVAN S", dateOfRetirement: "31-Jan-2022", region: "CHENNAI", grossSalary: 102300.0 },
  { id: 24, name: "SRINIVASAN A", dateOfRetirement: "30-Apr-2004", region: "HEAD OFFICE", grossSalary: 9800.0 },
  { id: 25, name: "BALAKRISHNAN T", dateOfRetirement: "31-Aug-2017", region: "MADURAI", grossSalary: 66400.0 },
  { id: 26, name: "NATARAJAN V", dateOfRetirement: "28-Feb-2021", region: "CHENNAI", grossSalary: 91700.0 },
  { id: 27, name: "SUNDARAM K", dateOfRetirement: "31-Dec-2023", region: "HEAD OFFICE", grossSalary: 118500.0 },
  { id: 28, name: "RAJASEKARAN M", dateOfRetirement: "30-Jun-2008", region: "COIMBATORE", grossSalary: 20100.0 },
  { id: 29, name: "MURUGAN D", dateOfRetirement: "31-Mar-2016", region: "THANJAVUR", grossSalary: 43600.0 },
  { id: 30, name: "PALANIVEL S", dateOfRetirement: "31-Oct-2018", region: "MADURAI", grossSalary: 72800.0 },
];

type SortKey = keyof RetiredEmployee;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

export default function RetiredEmployeeRegisterListPage() {
  const [filters, setFilters] = useState({ name: "", dateOfRetirement: "", region: "", grossSalary: "" });
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
    row.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    row.dateOfRetirement.toLowerCase().includes(filters.dateOfRetirement.toLowerCase()) &&
    row.region.toLowerCase().includes(filters.region.toLowerCase()) &&
    (filters.grossSalary === "" || row.grossSalary.toString().includes(filters.grossSalary))
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey]; const bVal = b[sortKey];
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>▲</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
    </span>
  );

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

  const handleClear = () => {
    setFilters({ name: "", dateOfRetirement: "", region: "", grossSalary: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Retired Employee Register List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Retired Employee Register List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Retired Employee Register (s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Add */}
            <Link href="/personnel/human-resource/retired-employee-register/create">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><path d="M9 21V9" />
                </svg>
                Add
              </button>
            </Link>
            {/* Clear */}
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
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
                <th className="w-12 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                {([
                  ["name", "Name"],
                  ["dateOfRetirement", "Date of Retirement"],
                  ["region", "Region"],
                  ["grossSalary", "Gross Salary (\u20b9)"],
                ] as [SortKey, string][]).map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]"
                  >
                    {label} <SortIcon col={key} />
                  </th>
                ))}
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => { setFilters((f) => ({ ...f, name: e.target.value })); setCurrentPage(1); }}
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="dd-MMM-yyyy"
                      value={filters.dateOfRetirement}
                      onChange={(e) => { setFilters((f) => ({ ...f, dateOfRetirement: e.target.value })); setCurrentPage(1); }}
                      className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                    <button className="flex size-6 flex-shrink-0 items-center justify-center rounded bg-[#17a2b8] text-white">
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    value={filters.region}
                    onChange={(e) => { setFilters((f) => ({ ...f, region: e.target.value })); setCurrentPage(1); }}
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    value={filters.grossSalary}
                    onChange={(e) => { setFilters((f) => ({ ...f, grossSalary: e.target.value })); setCurrentPage(1); }}
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-blue-50 dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-[#17a2b8] dark:border-dark-3">{row.name}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.dateOfRetirement}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.region}</td>
                    <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">
                      {row.grossSalary.toFixed(2)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input
                        type="radio"
                        name="selectRow"
                        checked={selectedId === row.id}
                        onChange={() => setSelectedId(row.id)}
                        className="size-4 cursor-pointer accent-primary"
                      />
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
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">«</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">‹</button>
            {visiblePages().map((page, i) =>
              page === "..." ? <span key={`e-${i}`} className="px-1 text-gray-400">...</span> :
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">»</button>
            <select
              className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            >
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
