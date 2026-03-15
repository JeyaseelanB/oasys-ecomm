"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CaseStatus = "PENDING" | "INPROGRESS" | "CLOSED";

interface CourtCaseItem {
  id: number;
  hoRo: string;
  typeOfCase: string;
  typeOfCourt: string;
  caseNo: string;
  petitionerName: string;
  respondentName: string;
  status: CaseStatus;
}

const SAMPLE_DATA: CourtCaseItem[] = [
  { id: 1, hoRo: "HEAD OFFICE", typeOfCase: "WRIT PETITION", typeOfCourt: "HIGH COURT OF MADRAS", caseNo: "36196 of 2016", petitionerName: "K.Viswanathan, Deputy Regional Manager(Audit)(Rtd),", respondentName: "1.The Director of Handlooms & Textiles, Chennai, , 2.The Managing Director, Co-optex, ,", status: "PENDING" },
  { id: 2, hoRo: "HEAD OFFICE", typeOfCase: "WRIT PETITION", typeOfCourt: "HIGH COURT OF MADRAS", caseNo: "26017 of 2016", petitionerName: "D.Kathiresan, Driver, Head Office", respondentName: "1.The Director of Handlooms & Textiles, Chennai, , 2.The Managing Director, Co-optex, , 3. The General Manager (Administration), Co-optex, ,", status: "PENDING" },
  { id: 3, hoRo: "HEAD OFFICE", typeOfCase: "WRIT PETITION", typeOfCourt: "HIGH COURT OF MADRAS", caseNo: "17994 of 2016", petitionerName: "T.Punnaikoti, Attender (Rtd.), Head Office.", respondentName: "1.The Director of Handlooms & Textiles, Chennai, , 2.The Managing Director, Co-optex, , 3. The General Manager (Administration), Co-optex, ,", status: "INPROGRESS" },
  { id: 4, hoRo: "HEAD OFFICE", typeOfCase: "WRIT PETITION", typeOfCourt: "HIGH COURT OF MADRAS MADURAI BENCH", caseNo: "22861 of 2019", petitionerName: "Thiru. K.Moorthy, the then Manager (Audit), Madurai (Rtd)", respondentName: "1. The Principal Secretary, Handloom and Khadi, ,2. The Director, Handloom and Textile Department, ,2.The Managing Director, Co-optex, ,", status: "INPROGRESS" },
  { id: 5, hoRo: "HEAD OFFICE", typeOfCase: "WRIT PETITION", typeOfCourt: "HIGH COURT OF MADRAS", caseNo: "27639 of 2018", petitionerName: "T.Viswanathan, General Secretary, Co-optex Employees Union, ,", respondentName: "The Secretary, Labour and Employment Department, ,The Commissioner of Labour, Labour Department, ,The Principal Secretary, Handloom and Khadi, ,The Director, Handloom and Textile Department, ,The Managing Director, Co-optex, ,", status: "INPROGRESS" },
  { id: 6, hoRo: "HEAD OFFICE", typeOfCase: "WRIT PETITION", typeOfCourt: "HIGH COURT OF MADRAS", caseNo: "18542 of 2020", petitionerName: "R.Selvakumar, Assistant Manager, Head Office", respondentName: "1.The Director of Handlooms & Textiles, Chennai, , 2.The Managing Director, Co-optex, ,", status: "PENDING" },
];

type SortKey = keyof CourtCaseItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

const STATUS_COLORS: Record<CaseStatus, string> = {
  PENDING: "#FFA70B",
  INPROGRESS: "#28a745",
  CLOSED: "#17a2b8",
};

export default function CourtCaseListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ hoRo: "", typeOfCase: "", typeOfCourt: "", caseNo: "", petitionerName: "", respondentName: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } setCurrentPage(1); };

  const filtered = SAMPLE_DATA.filter((row) =>
    (filters.hoRo === "" || row.hoRo === filters.hoRo) &&
    (filters.typeOfCase === "" || row.typeOfCase === filters.typeOfCase) &&
    (filters.typeOfCourt === "" || row.typeOfCourt === filters.typeOfCourt) &&
    row.caseNo.toLowerCase().includes(filters.caseNo.toLowerCase()) &&
    row.petitionerName.toLowerCase().includes(filters.petitionerName.toLowerCase()) &&
    row.respondentName.toLowerCase().includes(filters.respondentName.toLowerCase()) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; const c = av < bv ? -1 : av > bv ? 1 : 0; return sortDir === "asc" ? c : -c; });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (<span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70"><span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>&#9650;</span><span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span></span>);

  const handleClear = () => { setFilters({ hoRo: "", typeOfCase: "", typeOfCourt: "", caseNo: "", petitionerName: "", respondentName: "", status: "" }); setSelectedId(null); setCurrentPage(1); };

  const uniqueHoRo = [...new Set(SAMPLE_DATA.map((r) => r.hoRo))];
  const uniqueTypeOfCase = [...new Set(SAMPLE_DATA.map((r) => r.typeOfCase))];
  const uniqueTypeOfCourt = [...new Set(SAMPLE_DATA.map((r) => r.typeOfCourt))];

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1, 2); if (currentPage > 4) pages.push("..."); for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i); if (currentPage < totalPages - 3) pages.push("..."); pages.push(totalPages - 1, totalPages); }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Court Case List</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Court Case List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white"><span className="text-primary">{filtered.length}</span> - Court Cases(s)</p>
          <div className="flex flex-wrap items-center gap-2">
            {selectedId === null && (
              <Link href="/personnel/human-resource/admin/court-case/create" className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </Link>
            )}
            {selectedId !== null && (
              <>
                <button onClick={() => router.push("/personnel/human-resource/admin/court-case/update-hearing")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Update Hearing
                </button>
                <button onClick={() => router.push("/personnel/human-resource/admin/court-case/edit")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit
                </button>
                <button onClick={() => router.push("/personnel/human-resource/admin/court-case/view")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  View
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  Delete
                </button>
              </>
            )}
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("hoRo")}>HO/RO <SortIcon col="hoRo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("typeOfCase")}>Type of Case <SortIcon col="typeOfCase" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("typeOfCourt")}>Type of Court <SortIcon col="typeOfCourt" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("caseNo")}>Case No. <SortIcon col="caseNo" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("petitionerName")}>Petitioner Name <SortIcon col="petitionerName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("respondentName")}>Respondent Name <SortIcon col="respondentName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-2 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.hoRo} onChange={(e) => { setFilters((f) => ({ ...f, hoRo: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueHoRo.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.typeOfCase} onChange={(e) => { setFilters((f) => ({ ...f, typeOfCase: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueTypeOfCase.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.typeOfCourt} onChange={(e) => { setFilters((f) => ({ ...f, typeOfCourt: e.target.value })); setCurrentPage(1); }}><option value="">Select</option>{uniqueTypeOfCourt.map((v) => (<option key={v} value={v}>{v}</option>))}</select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.caseNo} onChange={(e) => { setFilters((f) => ({ ...f, caseNo: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.petitionerName} onChange={(e) => { setFilters((f) => ({ ...f, petitionerName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.respondentName} onChange={(e) => { setFilters((f) => ({ ...f, respondentName: e.target.value })); setCurrentPage(1); }} /></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"><select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}><option value="">Select</option><option value="PENDING">PENDING</option><option value="INPROGRESS">INPROGRESS</option><option value="CLOSED">CLOSED</option></select></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (<tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#d4f0eb]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} ${selectedId !== row.id ? "hover:bg-blue-50 dark:hover:bg-[#1e2d42]" : ""}`}>
                    <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.hoRo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.typeOfCase}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.typeOfCourt}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.caseNo}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.petitionerName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-dark dark:border-dark-3 dark:text-white">{row.respondentName}</td>
                    <td className="border-r border-stroke px-2 py-3 text-center dark:border-dark-3"><span className="inline-block rounded-sm px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: STATUS_COLORS[row.status] }}>{row.status}</span></td>
                    <td className="px-2 py-3 text-center"><input type="radio" name="selectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) => page === "..." ? (<span key={`e-${i}`} className="px-1 text-gray-400">...</span>) : (<button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>{PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
          </div>
        </div>
      </div>
    </div>
  );
}
