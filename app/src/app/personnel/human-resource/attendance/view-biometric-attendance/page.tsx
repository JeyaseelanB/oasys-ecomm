"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </div>
);

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const CalendarIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

type AttendanceRecord = {
  id: number;
  entityType: string;
  entity: string;
  employeeName: string;
  designation: string;
  punchTime: string;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const MOCK_DATA: AttendanceRecord[] = [
  { id: 1, entityType: "HEAD OFFICE", entity: "HO-001", employeeName: "ALOK / BABELAY",  designation: "CHIEF GENERAL MANAGER", punchTime: "08:55 AM" },
  { id: 2, entityType: "HEAD OFFICE", entity: "HO-001", employeeName: "VAASU / R",        designation: "GENERAL MANAGER",       punchTime: "09:02 AM" },
  { id: 3, entityType: "BRANCH",      entity: "BR-010", employeeName: "KUMAR / S",        designation: "MANAGER",               punchTime: "09:10 AM" },
  { id: 4, entityType: "BRANCH",      entity: "BR-010", employeeName: "PRIYA / M",        designation: "EXECUTIVE",             punchTime: "09:15 AM" },
  { id: 5, entityType: "HEAD OFFICE", entity: "HO-001", employeeName: "RAJAN / K",        designation: "ACCOUNTANT",            punchTime: "09:20 AM" },
  { id: 6, entityType: "BRANCH",      entity: "BR-012", employeeName: "SELVI / P",        designation: "OFFICER",               punchTime: "09:25 AM" },
  { id: 7, entityType: "HEAD OFFICE", entity: "HO-001", employeeName: "MOHAN / R",        designation: "DEVELOPER",             punchTime: "09:30 AM" },
  { id: 8, entityType: "BRANCH",      entity: "BR-015", employeeName: "DEVI / A",         designation: "CLERK",                 punchTime: "09:35 AM" },
];

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function ViewBiometricAttendancePage() {
  const router = useRouter();

  // Filter state
  const [hoRo, setHoRo] = useState("");
  const [entityType, setEntityType] = useState("");
  const [entityCode, setEntityCode] = useState("");
  const [designation, setDesignation] = useState("");
  const [employee, setEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Results state
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<AttendanceRecord[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = () => {
    // Filter mock data based on selections
    let filtered = MOCK_DATA;
    if (entityType) filtered = filtered.filter((r) => r.entityType === entityType);
    if (designation) filtered = filtered.filter((r) => r.designation.toLowerCase().includes(designation.toLowerCase()));
    if (employee) filtered = filtered.filter((r) => r.employeeName.toLowerCase().includes(employee.toLowerCase()));
    setResults(filtered);
    setSearched(true);
    setPage(1);
  };

  const handleClear = () => {
    setHoRo(""); setEntityType(""); setEntityCode(""); setDesignation("");
    setEmployee(""); setStartDate(""); setEndDate("");
    setSearched(false); setResults([]); setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const paginated = results.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Biometric Attendance</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Attendance</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Biometric Attendance</li>
          </ol>
        </nav>
      </div>

      {/* Filter Card */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Biometric Attendance</h3>
          <span className="text-xs text-white/80">* Mandatory Fields</span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* HO/RO */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                HO/RO <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </IconBox>
                <select
                  value={hoRo}
                  onChange={(e) => setHoRo(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="REGIONAL OFFICE">REGIONAL OFFICE</option>
                  <option value="BRANCH">BRANCH</option>
                </select>
              </div>
            </div>

            {/* Entity Type */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Entity Type</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </IconBox>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="BRANCH">BRANCH</option>
                  <option value="WAREHOUSE">WAREHOUSE</option>
                </select>
              </div>
            </div>

            {/* Entity Code / Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Entity Code / Name</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="4" y="4" width="16" height="16" rx="2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                </IconBox>
                <select
                  value={entityCode}
                  onChange={(e) => setEntityCode(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="HO-001">HO-001 / Head Office</option>
                  <option value="BR-010">BR-010 / Chennai Branch</option>
                  <option value="BR-012">BR-012 / Coimbatore Branch</option>
                  <option value="BR-015">BR-015 / Madurai Branch</option>
                </select>
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Designation</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="CHIEF GENERAL MANAGER">CHIEF GENERAL MANAGER</option>
                  <option value="GENERAL MANAGER">GENERAL MANAGER</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="EXECUTIVE">EXECUTIVE</option>
                  <option value="OFFICER">OFFICER</option>
                  <option value="CLERK">CLERK</option>
                </select>
              </div>
            </div>

            {/* Employee */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Employee</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <select
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="ALOK / BABELAY">ALOK / BABELAY</option>
                  <option value="VAASU / R">VAASU / R</option>
                  <option value="KUMAR / S">KUMAR / S</option>
                  <option value="PRIYA / M">PRIYA / M</option>
                  <option value="RAJAN / K">RAJAN / K</option>
                  <option value="SELVI / P">SELVI / P</option>
                  <option value="MOHAN / R">MOHAN / R</option>
                  <option value="DEVI / A">DEVI / A</option>
                </select>
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="relative flex flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="dd-MMM-yyyy"
                    className="flex-1 rounded-l border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
                    <CalendarIco />
                  </div>
                </div>
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="relative flex flex-1">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="dd-MMM-yyyy"
                    className="flex-1 rounded-l border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
                    <CalendarIco />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search / Clear buttons */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              Clear
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          {/* Section Header */}
          <div className="mb-4 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Biometric Attendance Details</h4>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Entity Type</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Entity</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Employee Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Punch Time</th>
                </tr>
              </thead>
              <tbody>
                {!searched || paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border border-stroke px-4 py-8 text-center text-sm text-gray-400 dark:border-dark-3">
                      No records found
                    </td>
                  </tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}
                    >
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.entityType}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.entity}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.employeeName}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.designation}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.punchTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (shown only when results exist) */}
          {searched && results.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-3 dark:border-dark-3">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>({Math.min((page - 1) * pageSize + 1, results.length)}–{Math.min(page * pageSize, results.length)} of {results.length})</span>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                  className="rounded border border-stroke bg-white px-2 py-1 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">«</button>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">‹</button>
                {visiblePages(page, totalPages).map((p, i) =>
                  p === "…" ? (
                    <span key={`e${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
                  )
                )}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">›</button>
                <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">»</button>
              </div>
            </div>
          )}

          {/* Cancel */}
          <div className="mt-4 flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
