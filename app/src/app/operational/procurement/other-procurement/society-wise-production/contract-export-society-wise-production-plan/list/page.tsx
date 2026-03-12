"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-[#17a2b8] text-white",
  APPROVED:  "bg-[#28a745] text-white",
  CREATED:   "bg-[#FFA70B] text-white",
  REJECTED:  "bg-[#dc3545] text-white",
};

const MOCK_DATA = [
  { id: 1,  planCode: "CEP-SEP-25-01 / Contract Silk Plan Sep",   variety: "SKBS / SAREES KPM SILK WITH BLOUSE",  dpOffice: "2107 / D&P OFFICE KANCHIPURAM",   status: "SUBMITTED" },
  { id: 2,  planCode: "CEP-SEP-25-02 / Export Cotton Plan Sep",   variety: "SKBS2 / SAREES KPM SILK PLAIN",       dpOffice: "2108 / D&P OFFICE SALEM",          status: "APPROVED"  },
  { id: 3,  planCode: "CEP-AUG-25-11 / Contract Silk Plan Aug",   variety: "SKBS / SAREES KPM SILK WITH BLOUSE",  dpOffice: "2107 / D&P OFFICE KANCHIPURAM",   status: "CREATED"   },
  { id: 4,  planCode: "CEP-AUG-25-12 / Export Silk Plan Aug",     variety: "SKBS / SAREES KPM SILK WITH BLOUSE",  dpOffice: "2109 / D&P OFFICE COIMBATORE",    status: "APPROVED"  },
  { id: 5,  planCode: "CEP-JUL-25-07 / Contract Cotton Plan Jul", variety: "SKBS2 / SAREES KPM SILK PLAIN",       dpOffice: "2108 / D&P OFFICE SALEM",          status: "REJECTED"  },
];

type SortKey = "planCode" | "variety" | "dpOffice" | "status";

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-flex flex-col text-[9px] leading-none opacity-80">
    <span className={active && dir === "asc" ? "opacity-100" : "opacity-40"}>▲</span>
    <span className={active && dir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
  </span>
);

export default function ContractExportSocietyWisePlanListPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/society-wise-production/contract-export-society-wise-production-plan";

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("planCode");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState({ planCode: "", variety: "", dpOffice: "", status: "" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = MOCK_DATA.filter((r) =>
    r.planCode.toLowerCase().includes(filters.planCode.toLowerCase()) &&
    r.variety.toLowerCase().includes(filters.variety.toLowerCase()) &&
    r.dpOffice.toLowerCase().includes(filters.dpOffice.toLowerCase()) &&
    (filters.status === "" || r.status === filters.status)
  ).sort((a, b) => {
    const va = a[sortKey], vb = b[sortKey];
    return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
      else if (pages[pages.length - 1] !== "...") pages.push("...");
    }
    return pages;
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Contract / Export Society Wise Production Plan List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Society Wise Production</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Contract / Export Society Wise Production Plan List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          {/* Top bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-dark dark:text-white">
              {filtered.length} - Society Wise Production Plan List(s)
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => router.push(`${basePath}/create`)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                Add
              </button>
              <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </button>
              <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View
              </button>
              <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,01-2,2H8a2,2,0,01-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,011-1h4a1,1,0,011,1v2"/></svg>
                Delete
              </button>
              <button onClick={() => { setSelectedId(null); setFilters({ planCode: "", variety: "", dpOffice: "", status: "" }); setPage(1); }} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("planCode")}>
                    Plan Code / Name <SortIcon active={sortKey === "planCode"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("variety")}>
                    Product Variety Code / Name <SortIcon active={sortKey === "variety"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("dpOffice")}>
                    D&amp;P Office Code / Name <SortIcon active={sortKey === "dpOffice"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold cursor-pointer" onClick={() => handleSort("status")}>
                    Status <SortIcon active={sortKey === "status"} dir={sortDir} />
                  </th>
                  <th className="w-16 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Select</th>
                </tr>
                {/* Filter row */}
                <tr className="bg-[#2d8f7b]">
                  <th className="border border-[#3aa88f] px-1 py-1"></th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={filters.planCode} onChange={(e) => { setFilters((f) => ({ ...f, planCode: e.target.value })); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" placeholder="" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={filters.variety} onChange={(e) => { setFilters((f) => ({ ...f, variety: e.target.value })); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" placeholder="" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={filters.dpOffice} onChange={(e) => { setFilters((f) => ({ ...f, dpOffice: e.target.value })); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none" placeholder="" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <select value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setPage(1); }} className="w-full rounded border-0 bg-white px-2 py-1 text-xs text-dark outline-none">
                      <option value="">Select</option>
                      <option>SUBMITTED</option>
                      <option>APPROVED</option>
                      <option>CREATED</option>
                      <option>REJECTED</option>
                    </select>
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-[#17a2b8] dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-[#17a2b8] dark:border-dark-3">{row.planCode}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.variety}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.dpOffice}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                        <span className={`rounded px-3 py-1 text-[11px] font-semibold ${STATUS_COLORS[row.status] ?? "bg-gray-200 text-gray-700"}`}>{row.status}</span>
                      </td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                        <input type="radio" name="rowSelect" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-[#17a2b8]" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-3 flex flex-wrap items-center justify-end gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">({page} of {totalPages})</span>
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="11,17 6,12 11,7"/><polyline points="18,17 13,12 18,7"/></svg>
            </button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            </button>
            {visiblePages().map((p, i) =>
              p === "..." ? (
                <span key={`e${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)} className={`flex size-7 items-center justify-center rounded border text-xs font-medium ${page === p ? "border-[#17a2b8] bg-[#17a2b8] text-white" : "border-stroke text-dark dark:border-dark-3 dark:text-white"}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="13,17 18,12 13,7"/><polyline points="6,17 11,12 6,7"/></svg>
            </button>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
