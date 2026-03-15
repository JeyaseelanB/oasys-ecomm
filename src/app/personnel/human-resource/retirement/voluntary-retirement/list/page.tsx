"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type VRStatus = "FINAL-APPROVED" | "REJECTED" | "SUBMITTED" | "INPROGRESS";

interface VoluntaryRetirementItem {
  id: number;
  regionName: string;
  employeeNumber: string;
  employeeName: string;
  dateOfBirth: string;
  dateOfRetirement: string;
  createdDate: string;
  status: VRStatus;
}

const SAMPLE_DATA: VoluntaryRetirementItem[] = [
  { id: 1,  regionName: "MADURAI",     employeeNumber: "544", employeeName: "SANTHANAMARI R",  dateOfBirth: "01-Jun-1982", dateOfRetirement: "26-Feb-2026", createdDate: "26-Feb-2026", status: "FINAL-APPROVED" },
  { id: 2,  regionName: "MADURAI",     employeeNumber: "544", employeeName: "SANTHANAMARI R",  dateOfBirth: "01-Jun-1982", dateOfRetirement: "26-Feb-2026", createdDate: "26-Feb-2026", status: "REJECTED"       },
  { id: 3,  regionName: "VELLORE",     employeeNumber: "821", employeeName: "MOHAN R",         dateOfBirth: "03-Jun-1962", dateOfRetirement: "24-Feb-2026", createdDate: "24-Feb-2026", status: "FINAL-APPROVED" },
  { id: 4,  regionName: "COIMBATORE",  employeeNumber: "615", employeeName: "SIVAKUMAR K",     dateOfBirth: "13-Jun-1967", dateOfRetirement: "24-Feb-2026", createdDate: "24-Feb-2026", status: "REJECTED"       },
  { id: 5,  regionName: "MADURAI",     employeeNumber: "378", employeeName: "MOHANKUMAR R",    dateOfBirth: "25-Jul-1966", dateOfRetirement: "24-Feb-2026", createdDate: "24-Feb-2026", status: "REJECTED"       },
  { id: 6,  regionName: "HEAD OFFICE", employeeNumber: "196", employeeName: "RAJ MOHAN R",     dateOfBirth: "21-Jul-1981", dateOfRetirement: "24-Feb-2026", createdDate: "24-Feb-2026", status: "FINAL-APPROVED" },
  { id: 7,  regionName: "HEAD OFFICE", employeeNumber: "607", employeeName: "SAKTHIVEL G",     dateOfBirth: "15-May-1991", dateOfRetirement: "24-Feb-2026", createdDate: "24-Feb-2026", status: "FINAL-APPROVED" },
  { id: 8,  regionName: "CUDDALORE",   employeeNumber: "455", employeeName: "THEVARASAN K",    dateOfBirth: "08-Sep-1962", dateOfRetirement: "21-Feb-2026", createdDate: "21-Feb-2026", status: "FINAL-APPROVED" },
  { id: 9,  regionName: "MADURAI",     employeeNumber: "552", employeeName: "SHANMUGASUNDARI E",dateOfBirth: "05-Oct-1988", dateOfRetirement: "21-Feb-2026", createdDate: "21-Feb-2026", status: "FINAL-APPROVED" },
  { id: 10, regionName: "HEAD OFFICE", employeeNumber: "247", employeeName: "SADIQUE ALI S",   dateOfBirth: "03-Jun-1966", dateOfRetirement: "20-Feb-2026", createdDate: "20-Feb-2026", status: "FINAL-APPROVED" },
  { id: 11, regionName: "SALEM",       employeeNumber: "389", employeeName: "KUMAR S",         dateOfBirth: "12-Mar-1970", dateOfRetirement: "18-Feb-2026", createdDate: "18-Feb-2026", status: "SUBMITTED"      },
  { id: 12, regionName: "TRICHY",      employeeNumber: "502", employeeName: "PRABHAKARAN M",   dateOfBirth: "07-Nov-1968", dateOfRetirement: "15-Feb-2026", createdDate: "15-Feb-2026", status: "INPROGRESS"     },
  { id: 13, regionName: "COIMBATORE",  employeeNumber: "731", employeeName: "NITHYA DEVI R",   dateOfBirth: "22-Aug-1975", dateOfRetirement: "10-Feb-2026", createdDate: "10-Feb-2026", status: "FINAL-APPROVED" },
  { id: 14, regionName: "MADURAI",     employeeNumber: "419", employeeName: "RAJAN K",         dateOfBirth: "18-Jan-1964", dateOfRetirement: "05-Feb-2026", createdDate: "05-Feb-2026", status: "FINAL-APPROVED" },
  { id: 15, regionName: "HEAD OFFICE", employeeNumber: "583", employeeName: "SANTHOSH P",      dateOfBirth: "30-Apr-1980", dateOfRetirement: "01-Feb-2026", createdDate: "01-Feb-2026", status: "REJECTED"       },
  { id: 16, regionName: "VELLORE",     employeeNumber: "644", employeeName: "RADHA K",         dateOfBirth: "14-Sep-1972", dateOfRetirement: "28-Jan-2026", createdDate: "28-Jan-2026", status: "FINAL-APPROVED" },
  { id: 17, regionName: "CUDDALORE",   employeeNumber: "298", employeeName: "SENTHIL KUMAR A", dateOfBirth: "09-Dec-1965", dateOfRetirement: "25-Jan-2026", createdDate: "25-Jan-2026", status: "FINAL-APPROVED" },
  { id: 18, regionName: "TRICHY",      employeeNumber: "761", employeeName: "LAKSHMI V",       dateOfBirth: "26-Feb-1978", dateOfRetirement: "20-Jan-2026", createdDate: "20-Jan-2026", status: "SUBMITTED"      },
  { id: 19, regionName: "SALEM",       employeeNumber: "475", employeeName: "BALASUBRAMANIAN P",dateOfBirth: "05-Jul-1963", dateOfRetirement: "15-Jan-2026", createdDate: "15-Jan-2026", status: "FINAL-APPROVED" },
  { id: 20, regionName: "HEAD OFFICE", employeeNumber: "332", employeeName: "MEENA KUMARI S",  dateOfBirth: "17-Mar-1974", dateOfRetirement: "10-Jan-2026", createdDate: "10-Jan-2026", status: "FINAL-APPROVED" },
  { id: 21, regionName: "MADURAI",     employeeNumber: "688", employeeName: "ARUN KUMAR T",    dateOfBirth: "23-Oct-1969", dateOfRetirement: "05-Jan-2026", createdDate: "05-Jan-2026", status: "INPROGRESS"     },
  { id: 22, regionName: "COIMBATORE",  employeeNumber: "519", employeeName: "VIJAYA M",        dateOfBirth: "11-May-1977", dateOfRetirement: "31-Dec-2025", createdDate: "31-Dec-2025", status: "FINAL-APPROVED" },
  { id: 23, regionName: "CUDDALORE",   employeeNumber: "856", employeeName: "SUNDARAM K",      dateOfBirth: "28-Aug-1961", dateOfRetirement: "28-Dec-2025", createdDate: "28-Dec-2025", status: "FINAL-APPROVED" },
  { id: 24, regionName: "TRICHY",      employeeNumber: "413", employeeName: "KAVITHA R",       dateOfBirth: "04-Nov-1973", dateOfRetirement: "20-Dec-2025", createdDate: "20-Dec-2025", status: "REJECTED"       },
  { id: 25, regionName: "VELLORE",     employeeNumber: "267", employeeName: "BABU S",          dateOfBirth: "19-Jun-1966", dateOfRetirement: "15-Dec-2025", createdDate: "15-Dec-2025", status: "FINAL-APPROVED" },
  { id: 26, regionName: "HEAD OFFICE", employeeNumber: "594", employeeName: "PADMA PRIYA N",   dateOfBirth: "08-Feb-1979", dateOfRetirement: "10-Dec-2025", createdDate: "10-Dec-2025", status: "FINAL-APPROVED" },
  { id: 27, regionName: "SALEM",       employeeNumber: "742", employeeName: "GOPALAKRISHNAN V", dateOfBirth: "31-Mar-1962", dateOfRetirement: "05-Dec-2025", createdDate: "05-Dec-2025", status: "SUBMITTED"     },
];

const STATUS_STYLES: Record<VRStatus, string> = {
  "FINAL-APPROVED": "bg-[#28a745]",
  "REJECTED":       "bg-[#dc3545]",
  "SUBMITTED":      "bg-[#fd7e14]",
  "INPROGRESS":     "bg-[#17a2b8]",
};

type SortKey = keyof VoluntaryRetirementItem;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function VoluntaryRetirementListPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    regionName: "",
    employeeNumber: "",
    employeeName: "",
    dateOfBirth: "",
    dateOfRetirement: "",
    createdDate: "",
    status: "",
  });
  const [sortKey, setSortKey]       = useState<SortKey>("id");
  const [sortDir, setSortDir]       = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]     = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = SAMPLE_DATA.filter((row) =>
    row.regionName.toLowerCase().includes(filters.regionName.toLowerCase()) &&
    row.employeeNumber.toLowerCase().includes(filters.employeeNumber.toLowerCase()) &&
    row.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    (filters.dateOfBirth === "" || row.dateOfBirth.toLowerCase().includes(filters.dateOfBirth.toLowerCase())) &&
    (filters.dateOfRetirement === "" || row.dateOfRetirement.toLowerCase().includes(filters.dateOfRetirement.toLowerCase())) &&
    (filters.createdDate === "" || row.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const c = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? c : -c;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc"  ? "opacity-100" : "opacity-40"}>&#9650;</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>&#9660;</span>
    </span>
  );

  const handleClear = () => {
    setFilters({ regionName: "", employeeNumber: "", employeeName: "", dateOfBirth: "", dateOfRetirement: "", createdDate: "", status: "" });
    setSelectedId(null);
    setCurrentPage(1);
  };

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Voluntary Retirement List</h2>
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
            <li className="font-medium text-primary">Voluntary Retirement List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Voluntary Retirement(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { if (selectedId) router.push(`/personnel/human-resource/retirement/voluntary-retirement/view?id=${selectedId}`); }}
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
                <th className="w-10 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("regionName")}>Region Name <SortIcon col="regionName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeNumber")}>Employee Number <SortIcon col="employeeNumber" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("employeeName")}>Employee Name <SortIcon col="employeeName" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("dateOfBirth")}>Date of Birth <SortIcon col="dateOfBirth" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("dateOfRetirement")}>Date of Retirement <SortIcon col="dateOfRetirement" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("createdDate")}>Created Date <SortIcon col="createdDate" /></th>
                <th className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]" onClick={() => handleSort("status")}>Status <SortIcon col="status" /></th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.regionName} onChange={(e) => { setFilters((f) => ({ ...f, regionName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeNumber} onChange={(e) => { setFilters((f) => ({ ...f, employeeNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeName} onChange={(e) => { setFilters((f) => ({ ...f, employeeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.dateOfBirth} onChange={(e) => { setFilters((f) => ({ ...f, dateOfBirth: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.dateOfRetirement} onChange={(e) => { setFilters((f) => ({ ...f, dateOfRetirement: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setCurrentPage(1); }} />
                    <svg className="size-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-1 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="INPROGRESS">INPROGRESS</option>
                  </select>
                </td>
                <td className="border border-stroke px-1 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className={`cursor-pointer border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#e8f4f8] dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                  >
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className={`border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 ${selectedId === row.id ? "font-medium text-[#2d8f7b]" : "dark:text-white"}`}>{row.regionName}</td>
                    <td className={`border-r border-stroke px-3 py-3 text-center dark:border-dark-3 ${selectedId === row.id ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.employeeNumber}</td>
                    <td className={`border-r border-stroke px-3 py-3 dark:border-dark-3 ${selectedId === row.id ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.employeeName}</td>
                    <td className={`border-r border-stroke px-3 py-3 text-center dark:border-dark-3 ${selectedId === row.id ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.dateOfBirth}</td>
                    <td className={`border-r border-stroke px-3 py-3 text-center dark:border-dark-3 ${selectedId === row.id ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.dateOfRetirement}</td>
                    <td className={`border-r border-stroke px-3 py-3 text-center dark:border-dark-3 ${selectedId === row.id ? "font-medium text-[#2d8f7b]" : "text-dark dark:text-white"}`}>{row.createdDate}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded-sm px-3 py-0.5 text-xs font-semibold text-white ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input type="radio" name="selectVRRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
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
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">&#187;</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
