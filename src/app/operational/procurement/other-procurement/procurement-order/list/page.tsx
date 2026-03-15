"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUS_COLORS: Record<string, string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  SUBMITTED:      "bg-[#FFA70B] text-white",
  INITIATED:      "bg-[#6c757d] text-white",
  APPROVED:       "bg-[#17a2b8] text-white",
  REJECTED:       "bg-[#dc3545] text-white",
};

const MOCK_DATA = [
  { id: 1,  orderCode: "4218312", planCode: "Cooptex123",                         dpOffice: "1806 / D&P Office Salem",        createdDate: "21-Feb-2025", status: "FINAL_APPROVED" },
  { id: 2,  orderCode: "3784450", planCode: "muruga",                              dpOffice: "1806 / D&P Office Salem",        createdDate: "19-Feb-2025", status: "FINAL_APPROVED" },
  { id: 3,  orderCode: "7894726", planCode: "CEP-SEP-2023-31 WO-VLR-AMBUR-2",     dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "18-Feb-2025", status: "INITIATED"      },
  { id: 4,  orderCode: "5099882", planCode: "CEP-SEP-2023-24 TNY /ED",             dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "12-Feb-2025", status: "SUBMITTED"      },
  { id: 5,  orderCode: "2943375", planCode: "OAP Deepavali 23",                    dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "22-Jan-2025", status: "SUBMITTED"      },
  { id: 6,  orderCode: "6156766", planCode: "CEP-JUL-2024-370 rajiniplan",         dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "30-Jul-2024", status: "FINAL_APPROVED" },
  { id: 7,  orderCode: "3821451", planCode: "CEP-JUL-2024-367 prakash Plan",       dpOffice: "1806 / D&P Office Salem",        createdDate: "24-Jul-2024", status: "FINAL_APPROVED" },
  { id: 8,  orderCode: "4956273", planCode: "CEP-JUL-2024-367 prakash Plan",       dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "24-Jul-2024", status: "FINAL_APPROVED" },
  { id: 9,  orderCode: "8643538", planCode: "CEP-NOV-2023-113 WO-SLM-1841-MD-1",  dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "16-Jul-2024", status: "FINAL_APPROVED" },
  { id: 10, orderCode: "6052565", planCode: "CEP-SEP-2023-31 WO-VLR-AMBUR-2",     dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "16-Jul-2024", status: "FINAL_APPROVED" },
  { id: 11, orderCode: "9123401", planCode: "CEP-MAY-2024-201 summer plan",        dpOffice: "1806 / D&P Office Salem",        createdDate: "10-Jun-2024", status: "FINAL_APPROVED" },
  { id: 12, orderCode: "7234512", planCode: "OAP-MAR-2024-15",                     dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "05-Apr-2024", status: "FINAL_APPROVED" },
  { id: 13, orderCode: "3345623", planCode: "CEP-FEB-2024-88 silk order",          dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "20-Mar-2024", status: "SUBMITTED"      },
  { id: 14, orderCode: "5456734", planCode: "CEP-JAN-2024-45",                     dpOffice: "1806 / D&P Office Salem",        createdDate: "15-Feb-2024", status: "INITIATED"      },
  { id: 15, orderCode: "1567845", planCode: "OAP-DEC-2023-72",                     dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "28-Jan-2024", status: "FINAL_APPROVED" },
  { id: 16, orderCode: "8678956", planCode: "CEP-NOV-2023-60 cotton",              dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "12-Dec-2023", status: "FINAL_APPROVED" },
  { id: 17, orderCode: "2789067", planCode: "CEP-OCT-2023-49 special",             dpOffice: "1806 / D&P Office Salem",        createdDate: "08-Nov-2023", status: "FINAL_APPROVED" },
  { id: 18, orderCode: "4890178", planCode: "OAP-SEP-2023-33 diwali",              dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "25-Oct-2023", status: "SUBMITTED"      },
  { id: 19, orderCode: "6901289", planCode: "CEP-AUG-2023-28 bulk",                dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "18-Sep-2023", status: "FINAL_APPROVED" },
  { id: 20, orderCode: "8012390", planCode: "CEP-JUL-2023-22 export",              dpOffice: "1806 / D&P Office Salem",        createdDate: "05-Aug-2023", status: "FINAL_APPROVED" },
  { id: 21, orderCode: "1123401", planCode: "OAP-JUN-2023-17 pongal",              dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "22-Jul-2023", status: "FINAL_APPROVED" },
  { id: 22, orderCode: "3234512", planCode: "CEP-MAY-2023-14 export silk",         dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "10-Jun-2023", status: "FINAL_APPROVED" },
  { id: 23, orderCode: "5345623", planCode: "CEP-APR-2023-11 contract",            dpOffice: "1806 / D&P Office Salem",        createdDate: "28-May-2023", status: "SUBMITTED"      },
  { id: 24, orderCode: "7456734", planCode: "OAP-MAR-2023-08",                     dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "15-Apr-2023", status: "INITIATED"      },
  { id: 25, orderCode: "9567845", planCode: "CEP-FEB-2023-05 bulk silk",           dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "02-Mar-2023", status: "FINAL_APPROVED" },
  { id: 26, orderCode: "2678956", planCode: "CEP-JAN-2023-02 cotton",              dpOffice: "1806 / D&P Office Salem",        createdDate: "18-Feb-2023", status: "FINAL_APPROVED" },
  { id: 27, orderCode: "4789067", planCode: "OAP-DEC-2022-55",                     dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "05-Jan-2023", status: "FINAL_APPROVED" },
  { id: 28, orderCode: "6890178", planCode: "CEP-NOV-2022-49 special order",       dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "22-Dec-2022", status: "FINAL_APPROVED" },
  { id: 29, orderCode: "8901289", planCode: "CEP-OCT-2022-40 export",              dpOffice: "1806 / D&P Office Salem",        createdDate: "08-Nov-2022", status: "SUBMITTED"      },
  { id: 30, orderCode: "1012390", planCode: "OAP-SEP-2022-32 diwali bulk",         dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "25-Oct-2022", status: "FINAL_APPROVED" },
  { id: 31, orderCode: "3123401", planCode: "CEP-AUG-2022-28 summer",              dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "12-Sep-2022", status: "FINAL_APPROVED" },
  { id: 32, orderCode: "5234512", planCode: "CEP-JUL-2022-22 contract silk",       dpOffice: "1806 / D&P Office Salem",        createdDate: "30-Jul-2022", status: "FINAL_APPROVED" },
  { id: 33, orderCode: "7345623", planCode: "OAP-JUN-2022-18",                     dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "18-Jul-2022", status: "FINAL_APPROVED" },
  { id: 34, orderCode: "9456734", planCode: "CEP-MAY-2022-15 export",              dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "05-Jun-2022", status: "FINAL_APPROVED" },
  { id: 35, orderCode: "2567845", planCode: "CEP-APR-2022-11",                     dpOffice: "1806 / D&P Office Salem",        createdDate: "22-May-2022", status: "SUBMITTED"      },
  { id: 36, orderCode: "4678956", planCode: "OAP-MAR-2022-08 pongal",              dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "10-Apr-2022", status: "FINAL_APPROVED" },
  { id: 37, orderCode: "6789067", planCode: "CEP-FEB-2022-05 bulk cotton",         dpOffice: "1705 / NMP INSPECTION CENTER",   createdDate: "28-Mar-2022", status: "FINAL_APPROVED" },
  { id: 38, orderCode: "8890178", planCode: "CEP-JAN-2022-02 silk",                dpOffice: "1806 / D&P Office Salem",        createdDate: "15-Feb-2022", status: "FINAL_APPROVED" },
  { id: 39, orderCode: "1901289", planCode: "OAP-DEC-2021-48 year end",            dpOffice: "1301 / D&P OFFICE ERODE",        createdDate: "02-Jan-2022", status: "INITIATED"      },
];

type SortKey = "orderCode" | "planCode" | "dpOffice" | "createdDate" | "status";

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-flex flex-col text-[9px] leading-none opacity-80">
    <span className={active && dir === "asc" ? "opacity-100" : "opacity-40"}>▲</span>
    <span className={active && dir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
  </span>
);

export default function ProcurementOrderListPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/procurement-order";

  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [sortKey, setSortKey]         = useState<SortKey | "id">("id");
  const [sortDir, setSortDir]         = useState<"asc" | "desc">("asc");
  const [filters, setFilters]         = useState({ orderCode: "", planCode: "", dpOffice: "", createdDate: "", status: "" });
  const [page, setPage]               = useState(1);
  const [pageSize, setPageSize]       = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = MOCK_DATA.filter((r) =>
    r.orderCode.toLowerCase().includes(filters.orderCode.toLowerCase()) &&
    r.planCode.toLowerCase().includes(filters.planCode.toLowerCase()) &&
    r.dpOffice.toLowerCase().includes(filters.dpOffice.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase()) &&
    (filters.status === "" || r.status === filters.status)
  ).sort((a, b) => {
    if (sortKey === "id") return sortDir === "asc" ? a.id - b.id : b.id - a.id;
    const va = String((a as unknown as Record<string, unknown>)[sortKey] ?? ""), vb = String((b as unknown as Record<string, unknown>)[sortKey] ?? "");
    return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Procurement Order List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Procurement Order List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          {/* Top bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-dark dark:text-white">
              {filtered.length} - Procurement Order(s)
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
              <button onClick={() => { if (selectedId) router.push(`${basePath}/view`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View
              </button>
              <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,01-2,2H8a2,2,0,01-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/></svg>
                Delete
              </button>
              <button onClick={() => { setSelectedId(null); setFilters({ orderCode: "", planCode: "", dpOffice: "", createdDate: "", status: "" }); setPage(1); }} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("orderCode")}>
                    Procurement Order Code <SortIcon active={sortKey === "orderCode"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("planCode")}>
                    Plan Code / Name <SortIcon active={sortKey === "planCode"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("dpOffice")}>
                    D&amp;P Office Code / Name <SortIcon active={sortKey === "dpOffice"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold cursor-pointer" onClick={() => handleSort("createdDate")}>
                    Created Date <SortIcon active={sortKey === "createdDate"} dir={sortDir} />
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
                    <input value={filters.orderCode} onChange={(e) => { setFilters((f) => ({ ...f, orderCode: e.target.value })); setPage(1); }} className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={filters.planCode} onChange={(e) => { setFilters((f) => ({ ...f, planCode: e.target.value })); setPage(1); }} className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={filters.dpOffice} onChange={(e) => { setFilters((f) => ({ ...f, dpOffice: e.target.value })); setPage(1); }} className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <div className="flex items-center gap-0.5">
                      <input value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setPage(1); }} placeholder="dd-MMM-yyyy" className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none" />
                      <div className="flex size-6 shrink-0 items-center justify-center rounded bg-[#17a2b8] text-white">
                        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                    </div>
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <select value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setPage(1); }} className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none">
                      <option value="">Select</option>
                      <option>FINAL_APPROVED</option>
                      <option>SUBMITTED</option>
                      <option>INITIATED</option>
                      <option>APPROVED</option>
                      <option>REJECTED</option>
                    </select>
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} onClick={() => setSelectedId(row.id)}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-[#17a2b8] dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.orderCode}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.planCode}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.dpOffice}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
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
