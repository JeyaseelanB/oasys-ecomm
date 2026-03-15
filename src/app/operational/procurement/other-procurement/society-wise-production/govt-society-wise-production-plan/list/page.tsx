"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

/* ── types ──────────────────────────────────────────────────────── */
interface Row {
  [key: string]: string | number;
  id: number;
  planCode: string;
  variety: string;
  dpOffice: string;
  planFrom: string;
  planTo: string;
  status: string;
}

/* ── mock data ───────────────────────────────────────────────────── */
const ALL_ROWS: Row[] = [
  { id: 1,  planCode: "Cooptex123",        variety: "LCD1 / PEDALLOOM DHOTHY LCD1 CFDS2021",  dpOffice: "1806 / D&P Office Salem",          planFrom: "21-Feb-2025", planTo: "22-Feb-2025", status: "FINAL_APPROVED" },
  { id: 2,  planCode: "muruga",             variety: "LCD1 / PEDALLOOM DHOTHY LCD1 CFDS2021",  dpOffice: "1806 / D&P Office Salem",          planFrom: "19-Feb-2025", planTo: "22-Feb-2025", status: "FINAL_APPROVED" },
  { id: 3,  planCode: "OAP DIWALI23",       variety: "POSC / OAP COLOUR SAREES 202122",        dpOffice: "1806 / D&P Office Salem",          planFrom: "08-Sep-2023", planTo: "31-Oct-2023", status: "FINAL_APPROVED" },
  { id: 4,  planCode: "OAP Deepavali 2021", variety: "POSC / OAP COLOUR SAREES 202122",        dpOffice: "1102 / D&P Office Coimbatore",     planFrom: "14-Aug-2021", planTo: "30-Oct-2021", status: "FINAL_APPROVED" },
  { id: 5,  planCode: "OAP Deepavali 2021", variety: "FODC / OAP DHOTHY 202122",               dpOffice: "1806 / D&P Office Salem",          planFrom: "14-Aug-2021", planTo: "30-Oct-2021", status: "FINAL_APPROVED" },
  { id: 6,  planCode: "OAP Deepavali 2021", variety: "POSC / OAP COLOUR SAREES 202122",        dpOffice: "1806 / D&P Office Salem",          planFrom: "14-Aug-2021", planTo: "30-Oct-2021", status: "FINAL_APPROVED" },
  { id: 7,  planCode: "OAP Deepavali 2021", variety: "FODC / OAP DHOTHY 202122",               dpOffice: "1301 / D&P OFFICE ERODE",          planFrom: "14-Aug-2021", planTo: "30-Oct-2021", status: "FINAL_APPROVED" },
  { id: 8,  planCode: "OAP Deepavali 2021", variety: "POSC / OAP COLOUR SAREES 202122",        dpOffice: "1301 / D&P OFFICE ERODE",          planFrom: "14-Aug-2021", planTo: "30-Oct-2021", status: "FINAL_APPROVED" },
  { id: 9,  planCode: "OAP Deepavali 2021", variety: "POSC / OAP COLOUR SAREES 202122",        dpOffice: "2107 / D&P OFFICE KANCHIPURAM",    planFrom: "14-Aug-2021", planTo: "30-Oct-2021", status: "FINAL_APPROVED" },
];

/* ── sort icon ──────────────────────────────────────────────────── */
const SortIcon = ({ col, sortCol, sortDir }: { col: string; sortCol: string; sortDir: "asc" | "desc" }) => (
  <span className="ml-1 inline-flex flex-col leading-none">
    <span className={`text-[9px] ${sortCol === col && sortDir === "asc"  ? "text-white" : "text-white/50"}`}>▲</span>
    <span className={`text-[9px] ${sortCol === col && sortDir === "desc" ? "text-white" : "text-white/50"}`}>▼</span>
  </span>
);

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    FINAL_APPROVED: "bg-[#28a745] text-white",
    SUBMITTED:      "bg-[#FFA70B] text-white",
    INITIATED:      "bg-[#6c757d] text-white",
    CREATED:        "bg-[#17a2b8] text-white",
  };
  return map[s] ?? "bg-gray-200 text-gray-700";
};

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */
export default function GovtSocietyWisePlanListPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/society-wise-production/govt-society-wise-production-plan";

  const [selected, setSelected] = useState<number | null>(null);

  /* filters */
  const [fPlanCode,  setFPlanCode]  = useState("");
  const [fVariety,   setFVariety]   = useState("");
  const [fDpOffice,  setFDpOffice]  = useState("");
  const [fPlanFrom,  setFPlanFrom]  = useState("");
  const [fPlanTo,    setFPlanTo]    = useState("");
  const [fStatus,    setFStatus]    = useState("");

  /* sort */
  const [sortCol, setSortCol] = useState("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  /* pagination */
  const [page, setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let r = [...ALL_ROWS];
    if (fPlanCode) r = r.filter(x => x.planCode.toLowerCase().includes(fPlanCode.toLowerCase()));
    if (fVariety)  r = r.filter(x => x.variety.toLowerCase().includes(fVariety.toLowerCase()));
    if (fDpOffice) r = r.filter(x => x.dpOffice.toLowerCase().includes(fDpOffice.toLowerCase()));
    if (fPlanFrom) r = r.filter(x => x.planFrom.includes(fPlanFrom));
    if (fPlanTo)   r = r.filter(x => x.planTo.includes(fPlanTo));
    if (fStatus)   r = r.filter(x => x.status === fStatus);
    r.sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortCol] as string | number;
      const bVal = (b as Record<string, unknown>)[sortCol] as string | number;
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return r;
  }, [fPlanCode, fVariety, fDpOffice, fPlanFrom, fPlanTo, fStatus, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows   = filtered.slice((page - 1) * pageSize, page * pageSize);

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) pages.push(i);
    else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const thCls = "border border-[#3aa88f] px-2 py-2.5 font-semibold text-center cursor-pointer select-none whitespace-nowrap";

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Govt Society Wise Production Plan List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Society Wise Production</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Govt Society Wise Production Plan List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm font-medium text-dark dark:text-white">
            {filtered.length} - Society Wise Production Plan(s)
          </span>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => router.push(`${basePath}/create`)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Add
            </button>
            <button onClick={() => selected !== null && router.push(`${basePath}/edit`)}
              disabled={selected === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button onClick={() => selected !== null && router.push(`${basePath}/view`)}
              disabled={selected === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled={selected === null}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2 2 0 01-2 2H8a2 2 0 01-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
              Delete
            </button>
            <button onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th onClick={() => toggleSort("id")} className={thCls}># <SortIcon col="id" sortCol={sortCol} sortDir={sortDir} /></th>
                <th onClick={() => toggleSort("planCode")} className={thCls}>Plan Code / Name <SortIcon col="planCode" sortCol={sortCol} sortDir={sortDir} /></th>
                <th onClick={() => toggleSort("variety")} className={thCls}>Product Variety Code / Name <SortIcon col="variety" sortCol={sortCol} sortDir={sortDir} /></th>
                <th onClick={() => toggleSort("dpOffice")} className={thCls}>D&amp;P Office Code / Name <SortIcon col="dpOffice" sortCol={sortCol} sortDir={sortDir} /></th>
                <th onClick={() => toggleSort("planFrom")} className={thCls}>Plan From <SortIcon col="planFrom" sortCol={sortCol} sortDir={sortDir} /></th>
                <th onClick={() => toggleSort("planTo")} className={thCls}>Plan To <SortIcon col="planTo" sortCol={sortCol} sortDir={sortDir} /></th>
                <th onClick={() => toggleSort("status")} className={thCls}>Status <SortIcon col="status" sortCol={sortCol} sortDir={sortDir} /></th>
                <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Select</th>
              </tr>
              {/* filter row */}
              <tr className="bg-[#2d8f7b]">
                <td className="border border-[#3aa88f] px-1 py-1"></td>
                <td className="border border-[#3aa88f] px-1 py-1">
                  <input value={fPlanCode} onChange={e => { setFPlanCode(e.target.value); setPage(1); }}
                    className="w-full rounded border-0 bg-white/90 px-2 py-1 text-xs text-dark placeholder:text-gray-400 focus:outline-none" placeholder="" />
                </td>
                <td className="border border-[#3aa88f] px-1 py-1">
                  <input value={fVariety} onChange={e => { setFVariety(e.target.value); setPage(1); }}
                    className="w-full rounded border-0 bg-white/90 px-2 py-1 text-xs text-dark placeholder:text-gray-400 focus:outline-none" placeholder="" />
                </td>
                <td className="border border-[#3aa88f] px-1 py-1">
                  <input value={fDpOffice} onChange={e => { setFDpOffice(e.target.value); setPage(1); }}
                    className="w-full rounded border-0 bg-white/90 px-2 py-1 text-xs text-dark placeholder:text-gray-400 focus:outline-none" placeholder="" />
                </td>
                <td className="border border-[#3aa88f] px-1 py-1">
                  <div className="flex items-center gap-1">
                    <input value={fPlanFrom} onChange={e => { setFPlanFrom(e.target.value); setPage(1); }}
                      className="w-full rounded border-0 bg-white/90 px-2 py-1 text-xs text-dark placeholder:text-gray-400 focus:outline-none" placeholder="dd-MMM-yyyy" />
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#2d8f7b] text-white">
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                  </div>
                </td>
                <td className="border border-[#3aa88f] px-1 py-1">
                  <div className="flex items-center gap-1">
                    <input value={fPlanTo} onChange={e => { setFPlanTo(e.target.value); setPage(1); }}
                      className="w-full rounded border-0 bg-white/90 px-2 py-1 text-xs text-dark placeholder:text-gray-400 focus:outline-none" placeholder="dd-MMM-yyyy" />
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#2d8f7b] text-white">
                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                  </div>
                </td>
                <td className="border border-[#3aa88f] px-1 py-1">
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }}
                    className="w-full rounded border-0 bg-white/90 px-2 py-1 text-xs text-dark focus:outline-none">
                    <option value="">Select</option>
                    <option>FINAL_APPROVED</option>
                    <option>SUBMITTED</option>
                    <option>INITIATED</option>
                    <option>CREATED</option>
                  </select>
                </td>
                <td className="border border-[#3aa88f] px-1 py-1"></td>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr><td colSpan={8} className="border border-stroke px-4 py-6 text-center text-sm text-gray-400 dark:border-dark-3">No records found</td></tr>
              ) : pageRows.map((r, idx) => (
                <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                  <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.planCode}</td>
                  <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.variety}</td>
                  <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.dpOffice}</td>
                  <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.planFrom}</td>
                  <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.planTo}</td>
                  <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                    <span className={`rounded px-3 py-1 text-[11px] font-semibold ${statusBadge(r.status)}`}>{r.status}</span>
                  </td>
                  <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                    <input type="radio" name="rowSelect" checked={selected === r.id}
                      onChange={() => setSelected(r.id)}
                      className="h-4 w-4 accent-[#2d8f7b] cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex flex-wrap items-center justify-end gap-2 px-5 pb-5">
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded border border-stroke text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-gray-400">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="11,17 6,12 11,7"/><polyline points="18,17 13,12 18,7"/></svg>
          </button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded border border-stroke text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-gray-400">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
          </button>
          {visiblePages().map((p, i) =>
            p === "..." ? (
              <span key={`e${i}`} className="px-1 text-gray-400">…</span>
            ) : (
              <button key={p} onClick={() => setPage(p as number)}
                className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-medium ${page === p ? "border-[#17a2b8] bg-[#17a2b8] text-white" : "border-stroke text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:text-gray-400"}`}>
                {p}
              </button>
            )
          )}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded border border-stroke text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-gray-400">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
          </button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded border border-stroke text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-gray-400">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="13,17 18,12 13,7"/><polyline points="6,17 11,12 6,7"/></svg>
          </button>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="h-8 rounded border border-stroke bg-white px-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {[10, 20, 50].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
