"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number; hoRo: string; expoName: string; expoDate: string;
  expoCode: string; venue: string; status: string;
}[] = [
  { id: 1, hoRo: "CHENNAI",     expoName: "C.P Art Centre 1",    expoDate: "19-Apr-2019", expoCode: "1661", venue: "Main Hall, Eldams Road ALWARPET, CHENNAI",  status: "Submitted"      },
  { id: 2, hoRo: "HEAD OFFICE", expoName: "Textile Expo 2020",   expoDate: "10-Jan-2020", expoCode: "1720", venue: "Chennai Trade Centre, Nandambakkam, Chennai", status: "Final Approved" },
  { id: 3, hoRo: "COIMBATORE",  expoName: "Handloom Mela 2021",  expoDate: "05-Mar-2021", expoCode: "1830", venue: "Codissia Trade Fair Complex, Coimbatore",    status: "Initiated"      },
  { id: 4, hoRo: "MADURAI",     expoName: "Craft Fair 2022",     expoDate: "12-Dec-2022", expoCode: "1945", venue: "Government Museum Ground, Madurai",          status: "Submitted"      },
  { id: 5, hoRo: "CHENNAI",     expoName: "Silk India Expo 2023",expoDate: "22-Sep-2023", expoCode: "2056", venue: "YMCA Grounds, Nandanam, Chennai",            status: "Final Approved" },
];

const TOTAL = 5;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const STATUS_OPTIONS    = ["Initiated","Submitted","Final Approved"];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc"|"desc" }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active?(dir==="asc"?"▲":"▼"):"▲"}</span>
);
const CalIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const statusCls = (s: string) =>
  s === "Final Approved" ? "bg-[#28a745]" :
  s === "Submitted"      ? "bg-[#fd7e14]" : "bg-[#6c757d]";

export default function ClaimForExpoListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc"|"desc">("asc");

  const [fHoRo,   setFHoRo]   = useState("");
  const [fName,   setFName]   = useState("");
  const [fDate,   setFDate]   = useState("");
  const [fCode,   setFCode]   = useState("");
  const [fVenue,  setFVenue]  = useState("");
  const [fStatus, setFStatus] = useState("");

  const handleSort = (col: string) => {
    if (sortCol===col) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fHoRo  || r.hoRo.toLowerCase().includes(fHoRo.toLowerCase())) &&
    (!fName  || r.expoName.toLowerCase().includes(fName.toLowerCase())) &&
    (!fDate  || r.expoDate.includes(fDate)) &&
    (!fCode  || r.expoCode.includes(fCode)) &&
    (!fVenue || r.venue.toLowerCase().includes(fVenue.toLowerCase())) &&
    (!fStatus|| r.status===fStatus)
  ), [fHoRo, fName, fDate, fCode, fVenue, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a,b) => {
    const v = (r: typeof a): string|number => sortCol==="id"?r.id:(r as Record<string,unknown>)[sortCol] as string;
    const av=v(a), bv=v(b);
    return sortDir==="asc"?(av>bv?1:av<bv?-1:0):(av<bv?1:av>bv?-1:0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length/pageSize));
  const paginated  = sorted.slice((page-1)*pageSize, page*pageSize);
  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);

  const visiblePages = (): (number|"…")[] => {
    if (totalPages<=7) return Array.from({length:totalPages},(_,i)=>i+1);
    if (page<=4) return [1,2,3,4,5,"…",totalPages];
    if (page>=totalPages-3) return [1,"…",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,"…",page-1,page,page+1,"…",totalPages];
  };

  const thBase = "border-r border-[#3aa88f] px-2 pt-2 pb-1 text-left text-xs font-semibold text-white";
  const fi     = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Claim For Expo List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Claim For Expo List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL} - Claim For Expo(s)</p>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/personnel/admin/claim-for-expo/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button onClick={() => { clearSelect(); setFHoRo(""); setFName(""); setFDate(""); setFCode(""); setFVenue(""); setFStatus(""); setPage(1); }}
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
                <th className={thBase} onClick={() => handleSort("hoRo")} style={{cursor:"pointer"}}>
                  HO/RO <SortIcon active={sortCol==="hoRo"} dir={sortDir} />
                  <input value={fHoRo} onChange={e=>{setFHoRo(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("expoName")} style={{cursor:"pointer"}}>
                  Name of the Expo <SortIcon active={sortCol==="expoName"} dir={sortDir} />
                  <input value={fName} onChange={e=>{setFName(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("expoDate")} style={{cursor:"pointer"}}>
                  Expo Date <SortIcon active={sortCol==="expoDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDate} onChange={e=>{setFDate(e.target.value);setPage(1);}} placeholder="dd-MMM-yyyy" onClick={e=>e.stopPropagation()} className={`${fi} mt-0 pr-6`} />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("expoCode")} style={{cursor:"pointer"}}>
                  Expo Code <SortIcon active={sortCol==="expoCode"} dir={sortDir} />
                  <input value={fCode} onChange={e=>{setFCode(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
                </th>
                <th className={thBase} onClick={() => handleSort("venue")} style={{cursor:"pointer"}}>
                  Venue <SortIcon active={sortCol==="venue"} dir={sortDir} />
                  <input value={fVenue} onChange={e=>{setFVenue(e.target.value);setPage(1);}} onClick={e=>e.stopPropagation()} className={fi} />
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
              {paginated.length===0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row,idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-2 py-2 text-center text-xs text-gray-500">{(page-1)*pageSize+idx+1}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.hoRo}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.expoName}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.expoDate}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white">{row.expoCode}</td>
                  <td className="px-2 py-2 text-xs text-dark dark:text-white max-w-[200px] truncate" title={row.venue}>{row.venue}</td>
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
          {visiblePages().map((p,i) =>
            p==="…" ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
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
    </div>
  );
}
