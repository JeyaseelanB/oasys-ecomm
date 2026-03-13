"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number; refNo: string; type: string; entityType: string; entity: string;
  department: string; section: string; createdDate: string; status: string;
}[] = [
  { id: 1,  refNo: "CIR/2024/001", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "ADMIN",      section: "Admin",     createdDate: "01-Jan-2024", status: "INITIATED"      },
  { id: 2,  refNo: "CIR/2024/002", type: "Office Order",  entityType: "RO",  entity: "Chennai RO",        department: "FINANCE",    section: "Finance",   createdDate: "05-Jan-2024", status: "SUBMITTED"      },
  { id: 3,  refNo: "CIR/2024/003", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "HR",         section: "HR",        createdDate: "10-Jan-2024", status: "FINAL APPROVED" },
  { id: 4,  refNo: "CIR/2024/004", type: "Office Order",  entityType: "RO",  entity: "Coimbatore RO",     department: "MARKETING",  section: "Marketing", createdDate: "15-Jan-2024", status: "INITIATED"      },
  { id: 5,  refNo: "CIR/2024/005", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "TECHNICAL",  section: "Technical", createdDate: "20-Jan-2024", status: "SUBMITTED"      },
  { id: 6,  refNo: "CIR/2024/006", type: "Office Order",  entityType: "RO",  entity: "Madurai RO",        department: "ADMIN",      section: "Admin",     createdDate: "25-Jan-2024", status: "FINAL APPROVED" },
  { id: 7,  refNo: "CIR/2024/007", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "HR",         section: "HR",        createdDate: "01-Feb-2024", status: "INITIATED"      },
  { id: 8,  refNo: "CIR/2024/008", type: "Office Order",  entityType: "RO",  entity: "Salem RO",          department: "FINANCE",    section: "Finance",   createdDate: "05-Feb-2024", status: "SUBMITTED"      },
  { id: 9,  refNo: "CIR/2024/009", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "OPERATIONS", section: "Operations",createdDate: "10-Feb-2024", status: "FINAL APPROVED" },
  { id: 10, refNo: "CIR/2024/010", type: "Office Order",  entityType: "RO",  entity: "Trichy RO",         department: "ADMIN",      section: "Admin",     createdDate: "15-Feb-2024", status: "INITIATED"      },
  { id: 11, refNo: "CIR/2024/011", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "MARKETING",  section: "Marketing", createdDate: "20-Feb-2024", status: "SUBMITTED"      },
  { id: 12, refNo: "CIR/2024/012", type: "Office Order",  entityType: "RO",  entity: "Vellore RO",        department: "TECHNICAL",  section: "Technical", createdDate: "25-Feb-2024", status: "FINAL APPROVED" },
  { id: 13, refNo: "CIR/2024/013", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "HR",         section: "HR",        createdDate: "01-Mar-2024", status: "INITIATED"      },
  { id: 14, refNo: "CIR/2024/014", type: "Office Order",  entityType: "RO",  entity: "Erode RO",          department: "FINANCE",    section: "Finance",   createdDate: "05-Mar-2024", status: "SUBMITTED"      },
  { id: 15, refNo: "CIR/2024/015", type: "Circular",     entityType: "HO",  entity: "Head Office",       department: "OPERATIONS", section: "Operations",createdDate: "10-Mar-2024", status: "FINAL APPROVED" },
];

const TOTAL = 89;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const STATUS_OPTIONS    = ["INITIATED", "SUBMITTED", "FINAL APPROVED"];
const TYPE_OPTIONS      = ["Circular", "Office Order"];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc"|"desc" }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);
const CalIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const statusCls = (s: string) =>
  s === "FINAL APPROVED" ? "bg-[#28a745]" :
  s === "SUBMITTED"      ? "bg-[#fd7e14]" : "bg-[#6c757d]";

export default function CircularOfficeOrderListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc"|"desc">("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [fRefNo,      setFRefNo]      = useState("");
  const [fType,       setFType]       = useState("");
  const [fEntityType, setFEntityType] = useState("");
  const [fEntity,     setFEntity]     = useState("");
  const [fDept,       setFDept]       = useState("");
  const [fSection,    setFSection]    = useState("");
  const [fDate,       setFDate]       = useState("");
  const [fStatus,     setFStatus]     = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fRefNo      || r.refNo.toLowerCase().includes(fRefNo.toLowerCase())) &&
    (!fType       || r.type === fType) &&
    (!fEntityType || r.entityType.toLowerCase().includes(fEntityType.toLowerCase())) &&
    (!fEntity     || r.entity.toLowerCase().includes(fEntity.toLowerCase())) &&
    (!fDept       || r.department.toLowerCase().includes(fDept.toLowerCase())) &&
    (!fSection    || r.section.toLowerCase().includes(fSection.toLowerCase())) &&
    (!fDate       || r.createdDate.includes(fDate)) &&
    (!fStatus     || r.status === fStatus)
  ), [fRefNo, fType, fEntityType, fEntity, fDept, fSection, fDate, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string|number => sortCol === "id" ? r.id : (r as Record<string, unknown>)[sortCol] as string;
    const av = v(a), bv = v(b);
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const clearAll = () => {
    clearSelect();
    setFRefNo(""); setFType(""); setFEntityType(""); setFEntity("");
    setFDept(""); setFSection(""); setFDate(""); setFStatus("");
    setPage(1);
  };

  const visiblePages = (): (number|"…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3) return [1, "…", totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages];
    return [1, "…", page-1, page, page+1, "…", totalPages];
  };

  const thBase = "border-r border-[#3aa88f] px-2 pt-2 pb-1 text-left text-xs font-semibold text-white";
  const fi     = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Circular / Office Order List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Circular / Office Order List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL} - Circular / Office Order(s)</p>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/personnel/admin/circular-office-order/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/personnel/admin/circular-office-order/edit")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/personnel/admin/circular-office-order/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled={selected.length === 0}
              onClick={() => selected.length > 0 && setShowDeleteModal(true)}
              className="flex items-center gap-1.5 rounded bg-red-500 px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Delete
            </button>
            <button onClick={clearAll}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-2 pt-2 pb-1 text-center text-xs font-semibold text-white w-10">
                  #<div className="mt-1 h-[26px]" />
                </th>
                <th className={thBase} onClick={() => handleSort("refNo")} style={{cursor:"pointer"}}>
                  Reference Number <SortIcon active={sortCol==="refNo"} dir={sortDir} />
                  <input value={fRefNo} onChange={e=>{setFRefNo(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("type")} style={{cursor:"pointer"}}>
                  Type <SortIcon active={sortCol==="type"} dir={sortDir} />
                  <select value={fType} onChange={e=>{setFType(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {TYPE_OPTIONS.map(o=><option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className={thBase} onClick={() => handleSort("entityType")} style={{cursor:"pointer"}}>
                  Entity Type <SortIcon active={sortCol==="entityType"} dir={sortDir} />
                  <input value={fEntityType} onChange={e=>{setFEntityType(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("entity")} style={{cursor:"pointer"}}>
                  Entity <SortIcon active={sortCol==="entity"} dir={sortDir} />
                  <input value={fEntity} onChange={e=>{setFEntity(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("department")} style={{cursor:"pointer"}}>
                  Department <SortIcon active={sortCol==="department"} dir={sortDir} />
                  <input value={fDept} onChange={e=>{setFDept(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("section")} style={{cursor:"pointer"}}>
                  Section <SortIcon active={sortCol==="section"} dir={sortDir} />
                  <input value={fSection} onChange={e=>{setFSection(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("createdDate")} style={{cursor:"pointer"}}>
                  Created Date <SortIcon active={sortCol==="createdDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDate} onChange={e=>{setFDate(e.target.value);setPage(1);}} placeholder="dd-MMM-yyyy" onClick={e=>e.stopPropagation()} className={`${fi} mt-0 pr-6`} />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("status")} style={{cursor:"pointer"}}>
                  Status <SortIcon active={sortCol==="status"} dir={sortDir} />
                  <select value={fStatus} onChange={e=>{setFStatus(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map(o=><option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className="px-2 pt-2 pb-1 text-center text-xs font-semibold text-white">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={10} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-2 py-2 text-center text-xs text-gray-500">{(page-1)*pageSize+idx+1}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.refNo}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.type}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.entityType}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.entity}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.department}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.section}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.createdDate}</td>
                  <td className="px-2 py-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${statusCls(row.status)}`}>{row.status}</span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <input type="radio" name="selectRow" checked={selected.includes(row.id)}
                      onChange={() => { clearSelect(); toggleSelect(row.id); }} className="accent-[#2d8f7b]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <span className="text-xs text-gray-500">({page} of {totalPages})</span>
          <button onClick={() => setPage(1)} disabled={page===1} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">«</button>
          <button onClick={() => setPage(p=>p-1)} disabled={page===1} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">‹</button>
          {visiblePages().map((p, i) =>
            p === "…" ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
            : <button key={p} onClick={() => setPage(p as number)}
                className={`rounded border px-2.5 py-1 text-xs ${page===p?"border-[#2d8f7b] bg-[#2d8f7b] text-white":"border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
          )}
          <button onClick={() => setPage(p=>p+1)} disabled={page===totalPages} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page===totalPages} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">»</button>
          <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value));setPage(1);}}
            className="rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {PAGE_SIZE_OPTIONS.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Delete Confirmation</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-dark dark:text-white">Are you sure you want to delete the selected Circular / Office Order?</p>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowDeleteModal(false)}
                  className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">No</button>
                <button onClick={() => { setShowDeleteModal(false); clearSelect(); }}
                  className="rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
