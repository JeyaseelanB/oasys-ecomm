"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EDRStatus = "FINAL_APPROVED" | "REJECTED" | "INPROGRESS" | "APPROVED" | "SUBMITTED";

interface EDRItem {
  id: number; horo: string; entityType: string; entity: string;
  employeeName: string; pfNumber: string; effectiveDate: string; status: EDRStatus;
}

const SAMPLE_DATA: EDRItem[] = [
  { id: 1,  horo: "HEAD OFFICE", entityType: "Head Office",     entity: "HEAD OFFICE",        employeeName: "NAGARAJAN C",     pfNumber: "3265", effectiveDate: "01-Sep-2024", status: "FINAL_APPROVED" },
  { id: 2,  horo: "VELLORE",     entityType: "Regional Office", entity: "VELLORE",             employeeName: "SUJATHA V",       pfNumber: "3560", effectiveDate: "02-Sep-2024", status: "REJECTED"       },
  { id: 3,  horo: "VELLORE",     entityType: "Regional Office", entity: "VELLORE",             employeeName: "MADHAVI V",       pfNumber: "1503", effectiveDate: "03-Sep-2024", status: "FINAL_APPROVED" },
  { id: 4,  horo: "MADURAI",     entityType: "Regional Office", entity: "MADURAI",             employeeName: "JEYASATHYA S",    pfNumber: "3553", effectiveDate: "03-Sep-2024", status: "FINAL_APPROVED" },
  { id: 5,  horo: "VELLORE",     entityType: "Regional Office", entity: "VELLORE",             employeeName: "SARULATHA S",     pfNumber: "3651", effectiveDate: "05-Sep-2024", status: "INPROGRESS"     },
  { id: 6,  horo: "CHENNAI",     entityType: "Regional Office", entity: "CHENNAI",             employeeName: "MUNIYAPPAN A",    pfNumber: "3656", effectiveDate: "03-Sep-2024", status: "APPROVED"       },
  { id: 7,  horo: "MADURAI",     entityType: "D & P Office",    entity: "D&P Office Madurai",  employeeName: "GUNASEKARAN N",   pfNumber: "990",  effectiveDate: "02-Sep-2024", status: "INPROGRESS"     },
  { id: 8,  horo: "HEAD OFFICE", entityType: "Head Office",     entity: "HEAD OFFICE",         employeeName: "ARULRAJAN K",     pfNumber: "3234", effectiveDate: "30-Aug-2024", status: "FINAL_APPROVED" },
  { id: 9,  horo: "HEAD OFFICE", entityType: "Head Office",     entity: "HEAD OFFICE",         employeeName: "RAJARAJAN R",     pfNumber: "3438", effectiveDate: "10-Aug-1983", status: "INPROGRESS"     },
  { id: 10, horo: "HEAD OFFICE", entityType: "Head Office",     entity: "HEAD OFFICE",         employeeName: "VELMURUGAN S",    pfNumber: "3282", effectiveDate: "27-Aug-2024", status: "FINAL_APPROVED" },
  { id: 11, horo: "COIMBATORE",  entityType: "Regional Office", entity: "COIMBATORE",          employeeName: "KANNAN R",        pfNumber: "2741", effectiveDate: "22-Aug-2024", status: "FINAL_APPROVED" },
  { id: 12, horo: "TRICHY",      entityType: "Regional Office", entity: "TRICHY",              employeeName: "MEENAKSHI P",     pfNumber: "1892", effectiveDate: "18-Aug-2024", status: "SUBMITTED"      },
  { id: 13, horo: "SALEM",       entityType: "Regional Office", entity: "SALEM",               employeeName: "MURUGESAN K",     pfNumber: "2134", effectiveDate: "15-Aug-2024", status: "APPROVED"       },
  { id: 14, horo: "HEAD OFFICE", entityType: "Head Office",     entity: "HEAD OFFICE",         employeeName: "VASANTHI S",      pfNumber: "3102", effectiveDate: "10-Aug-2024", status: "FINAL_APPROVED" },
  { id: 15, horo: "VELLORE",     entityType: "Regional Office", entity: "VELLORE",             employeeName: "SURESH KUMAR M",  pfNumber: "2876", effectiveDate: "05-Aug-2024", status: "INPROGRESS"     },
  { id: 16, horo: "MADURAI",     entityType: "Regional Office", entity: "MADURAI",             employeeName: "DEVI PRIYA R",    pfNumber: "3019", effectiveDate: "01-Aug-2024", status: "FINAL_APPROVED" },
  { id: 17, horo: "CUDDALORE",   entityType: "D & P Office",    entity: "D&P Office Cuddalore", employeeName: "SELVAM T",       pfNumber: "1654", effectiveDate: "28-Jul-2024", status: "REJECTED"       },
  { id: 18, horo: "HEAD OFFICE", entityType: "Head Office",     entity: "HEAD OFFICE",         employeeName: "ANBAZHAGAN S",    pfNumber: "3345", effectiveDate: "25-Jul-2024", status: "FINAL_APPROVED" },
];

const STATUS_STYLES: Record<EDRStatus, string> = {
  "FINAL_APPROVED": "bg-[#28a745]",
  "REJECTED":       "bg-[#dc3545]",
  "INPROGRESS":     "bg-gray-400",
  "APPROVED":       "bg-[#28a745]",
  "SUBMITTED":      "bg-[#fd7e14]",
};

const SortIcon = () => (
  <span className="ml-1 inline-flex flex-col text-[8px] leading-none opacity-70"><span>▲</span><span>▼</span></span>
);

const CalendarIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function EDRListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({ horo: "", entityType: "", entity: "", employeeName: "", pfNumber: "", effectiveDate: "", status: "" });

  const setFilter = (key: keyof typeof filters, value: string) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleClear = () => { setSelectedId(null); setFilters({ horo: "", entityType: "", entity: "", employeeName: "", pfNumber: "", effectiveDate: "", status: "" }); };

  const filtered = SAMPLE_DATA.filter(r =>
    r.horo.toLowerCase().includes(filters.horo.toLowerCase()) &&
    r.entityType.toLowerCase().includes(filters.entityType.toLowerCase()) &&
    r.entity.toLowerCase().includes(filters.entity.toLowerCase()) &&
    r.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    r.pfNumber.toLowerCase().includes(filters.pfNumber.toLowerCase()) &&
    r.effectiveDate.toLowerCase().includes(filters.effectiveDate.toLowerCase()) &&
    (filters.status === "" || r.status === filters.status)
  );

  const uniqueStatuses = Array.from(new Set(SAMPLE_DATA.map(r => r.status)));

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Employee Death Registration List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Retirement</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Employee Death Registration List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-medium text-dark dark:text-white">{filtered.length} - Employee Death Registration(s)</p>
          <div className="flex flex-wrap gap-2">
            {selectedId === null ? (
              <Link href="/personnel/human-resource/retirement/employee-death-registration/create"
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </Link>
            ) : (
              <button disabled className="flex cursor-not-allowed items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            )}
            <button disabled className="flex cursor-not-allowed items-center gap-1.5 rounded bg-[#007bff] px-4 py-2 text-sm font-medium text-white opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => { if (selectedId) router.push(`/personnel/human-resource/retirement/employee-death-registration/view?id=${selectedId}`); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled className="flex cursor-not-allowed items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2 0 0,1-2,2H8a2,2 0 0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1 0 0,1 1-1h4a1,1 0 0,1 1,1v2"/></svg>
              Delete
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="border-r border-[#3aaa96] px-3 py-3 text-center font-semibold">#</th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">HO/RO <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Entity Type <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Entity <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Employee Name <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">PF Number <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Effective Date <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-center font-semibold">Status <SortIcon /></th>
                <th className="px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-[#e8f5f2] dark:bg-dark-2">
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.horo} onChange={e => setFilter("horo", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.entityType} onChange={e => setFilter("entityType", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.entity} onChange={e => setFilter("entity", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.employeeName} onChange={e => setFilter("employeeName", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.pfNumber} onChange={e => setFilter("pfNumber", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1 rounded border border-stroke bg-white px-2 py-1 dark:border-dark-3 dark:bg-dark">
                    <input value={filters.effectiveDate} onChange={e => setFilter("effectiveDate", e.target.value)} placeholder="dd-MMM-yyyy" className="w-full bg-transparent text-xs outline-none dark:text-white" />
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select value={filters.status} onChange={e => setFilter("status", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white">
                    <option value="">Select</option>
                    {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-2 py-1.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : (
                filtered.map((row, idx) => {
                  const sel = selectedId === row.id;
                  return (
                    <tr key={row.id} className={`border-b border-stroke last:border-0 dark:border-dark-3 ${sel ? "bg-[#e8f5f2] dark:bg-dark-2" : "hover:bg-gray-50 dark:hover:bg-dark-2"}`}>
                      <td className="border-r border-stroke px-3 py-3 text-center text-gray-500 dark:border-dark-3">{idx + 1}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${sel ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.horo}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${sel ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.entityType}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${sel ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.entity}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${sel ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.employeeName}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${sel ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.pfNumber}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${sel ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.effectiveDate}</td>
                      <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                        <span className={`rounded px-2.5 py-0.5 text-xs font-semibold text-white ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input type="radio" name="edr-select" checked={sel} onChange={() => setSelectedId(row.id)} className="size-4 accent-[#2d8f7b]" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">(1 of 2)</span>
          <div className="flex items-center gap-1">
            {["|◀", "◀", "1", "2", "▶", "▶|"].map((label, i) => (
              <button key={i} className={`flex size-7 items-center justify-center rounded border text-xs ${label === "1" ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke text-gray-500 hover:border-[#2d8f7b] hover:text-[#2d8f7b] dark:border-dark-3"}`}>{label}</button>
            ))}
          </div>
          <select className="rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none dark:border-dark-3 dark:text-white">
            {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-[10px] bg-white shadow-lg dark:bg-gray-dark">
            <div className="rounded-t-[10px] bg-[#dc3545] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Confirm Delete</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-dark dark:text-white">Are you sure you want to delete this record?</p>
            </div>
            <div className="flex justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
              <button onClick={() => setShowDeleteModal(false)} className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Cancel</button>
              <button onClick={() => { setShowDeleteModal(false); setSelectedId(null); }} className="rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
