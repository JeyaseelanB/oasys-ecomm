"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CRStatus = "FINAL-APPROVED" | "REJECTED" | "SUBMITTED" | "INPROGRESS";

interface CompulsoryRetirementItem {
  id: number;
  regionName: string;
  employeeNumber: string;
  employeeName: string;
  dateOfBirth: string;
  dateOfRetirement: string;
  createdDate: string;
  status: CRStatus;
}

const SAMPLE_DATA: CompulsoryRetirementItem[] = [
  { id: 1,  regionName: "COIMBATORE",  employeeNumber: "420", employeeName: "SELVI K",           dateOfBirth: "25-Jun-1973", dateOfRetirement: "30-Jun-2033", createdDate: "29-Mar-2024", status: "SUBMITTED"      },
  { id: 2,  regionName: "MADURAI",     employeeNumber: "315", employeeName: "RAJAN P",            dateOfBirth: "18-Feb-1965", dateOfRetirement: "28-Feb-2025", createdDate: "15-Jan-2025", status: "FINAL-APPROVED" },
  { id: 3,  regionName: "HEAD OFFICE", employeeNumber: "528", employeeName: "PRIYA S",            dateOfBirth: "07-Sep-1970", dateOfRetirement: "30-Sep-2030", createdDate: "10-Aug-2024", status: "FINAL-APPROVED" },
  { id: 4,  regionName: "VELLORE",     employeeNumber: "641", employeeName: "KUMAR M",            dateOfBirth: "12-Mar-1968", dateOfRetirement: "31-Mar-2028", createdDate: "05-Mar-2024", status: "REJECTED"       },
  { id: 5,  regionName: "TRICHY",      employeeNumber: "754", employeeName: "DEVI R",             dateOfBirth: "23-Nov-1972", dateOfRetirement: "30-Nov-2032", createdDate: "20-Nov-2024", status: "FINAL-APPROVED" },
  { id: 6,  regionName: "SALEM",       employeeNumber: "867", employeeName: "MURUGAN K",          dateOfBirth: "04-Jun-1966", dateOfRetirement: "30-Jun-2026", createdDate: "01-Jun-2024", status: "INPROGRESS"     },
  { id: 7,  regionName: "CUDDALORE",   employeeNumber: "213", employeeName: "ANITHA V",           dateOfBirth: "30-Jan-1975", dateOfRetirement: "31-Jan-2035", createdDate: "25-Jan-2025", status: "SUBMITTED"      },
  { id: 8,  regionName: "HEAD OFFICE", employeeNumber: "389", employeeName: "BALAMURUGAN S",      dateOfBirth: "15-Aug-1963", dateOfRetirement: "31-Aug-2023", createdDate: "01-Aug-2023", status: "FINAL-APPROVED" },
  { id: 9,  regionName: "COIMBATORE",  employeeNumber: "476", employeeName: "KAVITHA T",          dateOfBirth: "09-Oct-1971", dateOfRetirement: "31-Oct-2031", createdDate: "05-Oct-2024", status: "FINAL-APPROVED" },
  { id: 10, regionName: "MADURAI",     employeeNumber: "532", employeeName: "SENTHIL KUMAR A",    dateOfBirth: "22-Apr-1967", dateOfRetirement: "30-Apr-2027", createdDate: "18-Apr-2024", status: "REJECTED"       },
];

const STATUS_STYLES: Record<CRStatus, string> = {
  "FINAL-APPROVED": "bg-[#28a745]",
  "REJECTED":       "bg-[#dc3545]",
  "SUBMITTED":      "bg-[#fd7e14]",
  "INPROGRESS":     "bg-[#17a2b8]",
};

const SortIcon = () => (
  <span className="ml-1 inline-flex flex-col text-[8px] leading-none opacity-70">
    <span>▲</span><span>▼</span>
  </span>
);

const CalendarIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function CompulsoryRetirementListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ regionName: "", employeeNumber: "", employeeName: "", dateOfBirth: "", dateOfRetirement: "", createdDate: "", status: "" });

  const setFilter = (key: keyof typeof filters, value: string) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ regionName: "", employeeNumber: "", employeeName: "", dateOfBirth: "", dateOfRetirement: "", createdDate: "", status: "" });
  };

  const filtered = SAMPLE_DATA.filter(r =>
    r.regionName.toLowerCase().includes(filters.regionName.toLowerCase()) &&
    r.employeeNumber.toLowerCase().includes(filters.employeeNumber.toLowerCase()) &&
    r.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    r.dateOfBirth.toLowerCase().includes(filters.dateOfBirth.toLowerCase()) &&
    r.dateOfRetirement.toLowerCase().includes(filters.dateOfRetirement.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase()) &&
    (filters.status === "" || r.status === filters.status)
  );

  const uniqueStatuses = Array.from(new Set(SAMPLE_DATA.map(r => r.status)));

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Compulsory Retirement List</h2>
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
            <li className="font-medium text-primary">Compulsory Retirement List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-medium text-dark dark:text-white">
            {filtered.length}- Compulsory Retirement(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/personnel/human-resource/retirement/compulsory-retirement/create"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </Link>
            <button
              onClick={() => { if (selectedId) router.push(`/personnel/human-resource/retirement/compulsory-retirement/view?id=${selectedId}`); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
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
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Region Name <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Employee Number <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Employee Name <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Date of Birth <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Date of Retirement <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-left font-semibold">Created Date <SortIcon /></th>
                <th className="border-r border-[#3aaa96] px-3 py-3 text-center font-semibold">Status <SortIcon /></th>
                <th className="px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-[#e8f5f2] dark:bg-dark-2">
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.regionName} onChange={e => setFilter("regionName", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.employeeNumber} onChange={e => setFilter("employeeNumber", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input value={filters.employeeName} onChange={e => setFilter("employeeName", e.target.value)} className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-dark dark:text-white" />
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1 rounded border border-stroke bg-white px-2 py-1 dark:border-dark-3 dark:bg-dark">
                    <input value={filters.dateOfBirth} onChange={e => setFilter("dateOfBirth", e.target.value)} placeholder="dd-MMM-yyyy" className="w-full bg-transparent text-xs outline-none dark:text-white" />
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1 rounded border border-stroke bg-white px-2 py-1 dark:border-dark-3 dark:bg-dark">
                    <input value={filters.dateOfRetirement} onChange={e => setFilter("dateOfRetirement", e.target.value)} placeholder="dd-MMM-yyyy" className="w-full bg-transparent text-xs outline-none dark:text-white" />
                    <CalendarIcon />
                  </div>
                </td>
                <td className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1 rounded border border-stroke bg-white px-2 py-1 dark:border-dark-3 dark:bg-dark">
                    <input value={filters.createdDate} onChange={e => setFilter("createdDate", e.target.value)} placeholder="dd-MMM-yyyy" className="w-full bg-transparent text-xs outline-none dark:text-white" />
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
                  const isSelected = selectedId === row.id;
                  return (
                    <tr key={row.id} className={`border-b border-stroke last:border-0 dark:border-dark-3 ${isSelected ? "bg-[#e8f5f2] dark:bg-dark-2" : "hover:bg-gray-50 dark:hover:bg-dark-2"}`}>
                      <td className="border-r border-stroke px-3 py-3 text-center text-gray-500 dark:border-dark-3">{idx + 1}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-[#2d8f7b] font-medium" : "text-dark dark:text-white"}`}>{row.regionName}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-[#2d8f7b] font-medium" : "text-dark dark:text-white"}`}>{row.employeeNumber}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-[#2d8f7b] font-medium" : "text-dark dark:text-white"}`}>{row.employeeName}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-[#2d8f7b] font-medium" : "text-dark dark:text-white"}`}>{row.dateOfBirth}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-[#2d8f7b] font-medium" : "text-dark dark:text-white"}`}>{row.dateOfRetirement}</td>
                      <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${isSelected ? "text-[#2d8f7b] font-medium" : "text-dark dark:text-white"}`}>{row.createdDate}</td>
                      <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                        <span className={`rounded px-2.5 py-0.5 text-xs font-semibold text-white ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input type="radio" name="cr-select" checked={isSelected} onChange={() => setSelectedId(row.id)} className="size-4 accent-[#2d8f7b]" />
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
          <span className="text-xs text-gray-500 dark:text-gray-400">(1 of 1)</span>
          <div className="flex items-center gap-1">
            {["|◀", "◀", "1", "▶", "▶|"].map((label, i) => (
              <button key={i} className={`flex size-7 items-center justify-center rounded border text-xs ${label === "1" ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke text-gray-500 hover:border-[#2d8f7b] hover:text-[#2d8f7b] dark:border-dark-3"}`}>{label}</button>
            ))}
          </div>
          <select className="rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none dark:border-dark-3 dark:text-white">
            {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
