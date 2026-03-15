"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Types ── */
interface AttendanceRow {
  id: number;
  attendanceType: string;
  entityCode: string;
  entityName: string;
  departmentCode: string;
  employeeCode: string;
  employeeName: string;
  date: string;
  totalPresent: number;
  status: "SUBMITTED" | "APPROVED" | "PENDING" | "REJECTED";
  selected: boolean;
}

/* ── Sample Data ── */
const SAMPLE_DATA: AttendanceRow[] = [
  { id: 1, attendanceType: "MANUAL_ATTENDANCE", entityCode: "HO001", entityName: "Head Office",             departmentCode: "HR01", employeeCode: "252", employeeName: "SANKARANARAYANANC", date: "01-Mar-2026", totalPresent: 26, status: "SUBMITTED", selected: false },
  { id: 2, attendanceType: "MANUAL_ATTENDANCE", entityCode: "HO001", entityName: "Head Office",             departmentCode: "PR02", employeeCode: "518", employeeName: "PANDIYAMMAL R",    date: "01-Mar-2026", totalPresent: 24, status: "SUBMITTED", selected: false },
  { id: 3, attendanceType: "MANUAL_ATTENDANCE", entityCode: "RO002", entityName: "Regional Office",        departmentCode: "FN03", employeeCode: "518", employeeName: "PANDIYAMMAL R",    date: "28-Feb-2026", totalPresent: 22, status: "APPROVED",  selected: false },
  { id: 4, attendanceType: "BIOMETRIC_MANUAL",  entityCode: "HO001", entityName: "Head Office",             departmentCode: "AD04", employeeCode: "198", employeeName: "RAJESH KUMAR N",  date: "27-Feb-2026", totalPresent: 20, status: "SUBMITTED", selected: false },
  { id: 5, attendanceType: "MANUAL_ATTENDANCE", entityCode: "RO003", entityName: "Regional Office - South", departmentCode: "HR01", employeeCode: "198", employeeName: "RAJESH KUMAR N",  date: "26-Feb-2026", totalPresent: 18, status: "PENDING",   selected: false },
];

/* ── Icons ── */
const AddIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const ViewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SortIcon = () => (
  <span className="inline-flex flex-col leading-none text-white/70" style={{ fontSize: 8 }}>
    <span>▲</span><span>▼</span>
  </span>
);
const ChevronLeft  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;

/* ── Status badge ── */
const StatusBadge = ({ status }: { status: AttendanceRow["status"] }) => {
  const cfg: Record<string, string> = {
    SUBMITTED: "bg-amber-500",
    APPROVED:  "bg-emerald-500",
    PENDING:   "bg-sky-500",
    REJECTED:  "bg-red-500",
  };
  return (
    <span className={`inline-block rounded px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white ${cfg[status]}`}>
      {status}
    </span>
  );
};

/* ════════════════════════════════════════════════ */
export default function ManualAttendanceListPage() {
  const router = useRouter();

  const [rows,          setRows]         = useState<AttendanceRow[]>(SAMPLE_DATA);
  const [filterType,    setFilterType]   = useState("");
  const [filterEmpCode, setFilterEmpCode]= useState("");
  const [filterStatus,  setFilterStatus] = useState("");
  const [pageSize,      setPageSize]     = useState(10);
  const [currentPage,   setCurrentPage]  = useState(1);

  const toggleRow = (id: number) =>
    setRows(rs => rs.map(r => ({ ...r, selected: r.id === id ? !r.selected : false })));

  const clearSelection = () => setRows(rs => rs.map(r => ({ ...r, selected: false })));

  const filtered = rows.filter(r =>
    (!filterType    || r.attendanceType === filterType) &&
    (!filterEmpCode || r.employeeName.toLowerCase().includes(filterEmpCode.toLowerCase()) || r.employeeCode.includes(filterEmpCode)) &&
    (!filterStatus  || r.status === filterStatus)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const thCls = "px-3 py-2.5 text-left text-xs font-semibold text-white border-r border-[#3aa88f] last:border-r-0 whitespace-nowrap";

  return (
    <div className="mx-auto">

      {/* ── Page header ── */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Manual Attendance List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Attendance</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Manual Attendance List</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Card toolbar */}
        <div className="flex items-center justify-between rounded-t-[10px] border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span>
            {" "}- Manual Attendance Record(s)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/attendance/manual-attendance/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <AddIcon /> Add
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity">
              <EditIcon /> Edit
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity">
              <ViewIcon /> View
            </button>
            <button
              onClick={clearSelection}
              className="flex items-center gap-1.5 rounded bg-[#343a40] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <ClearIcon /> Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              {/* Column headers */}
              <tr style={{ background: "#2d8f7b" }}>
                <th className={`${thCls} w-10 text-center`}>#</th>
                <th className={thCls}>
                  <div className="flex items-center gap-1.5">Attendance Type <SortIcon /></div>
                </th>
                <th className={thCls}>
                  <div className="flex items-center gap-1.5">Entity Code / Name <SortIcon /></div>
                </th>
                <th className={thCls}>
                  <div className="flex items-center gap-1.5">Department Code <SortIcon /></div>
                </th>
                <th className={thCls}>
                  <div className="flex items-center gap-1.5">Employee Code / Name <SortIcon /></div>
                </th>
                <th className={thCls}>
                  <div className="flex items-center gap-1.5">Date <SortIcon /></div>
                </th>
                <th className={thCls}>
                  <div className="flex items-center gap-1.5">Total Present <SortIcon /></div>
                </th>
                <th className={thCls}>
                  <div className="flex items-center gap-1.5">Status <SortIcon /></div>
                </th>
                <th className={`${thCls} w-16 text-center`}>Select</th>
              </tr>

              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  >
                    <option value="">Select</option>
                    <option>MANUAL_ATTENDANCE</option>
                    <option>BIOMETRIC_MANUAL</option>
                  </select>
                </td>
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    value={filterEmpCode}
                    onChange={e => setFilterEmpCode(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                </td>
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border-b border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs text-dark outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  >
                    <option value="">Select</option>
                    <option>SUBMITTED</option>
                    <option>APPROVED</option>
                    <option>PENDING</option>
                    <option>REJECTED</option>
                  </select>
                </td>
                <td className="border-b border-stroke px-2 py-1.5 dark:border-dark-3" />
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr className="bg-white dark:bg-gray-dark">
                  <td colSpan={9} className="px-4 py-6 text-center text-xs text-gray-400">
                    No records found.
                  </td>
                </tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke transition-colors dark:border-dark-3
                      ${row.selected
                        ? "bg-[#eaf7f4] dark:bg-[#1a3a4a]"
                        : idx % 2 === 0
                          ? "bg-white dark:bg-gray-dark"
                          : "bg-gray-50/70 dark:bg-gray-800/40"
                      }`}
                  >
                    <td className="px-3 py-2.5 text-center text-xs text-gray-500 dark:text-gray-400">{row.id}</td>
                    <td className="px-3 py-2.5 text-xs text-dark dark:text-white">{row.attendanceType}</td>
                    <td className="px-3 py-2.5 text-xs text-dark dark:text-white">{row.entityCode}/{row.entityName}</td>
                    <td className="px-3 py-2.5 text-xs text-dark dark:text-white">{row.departmentCode}</td>
                    <td className="px-3 py-2.5 text-xs text-dark dark:text-white">{row.employeeCode}/{row.employeeName}</td>
                    <td className="px-3 py-2.5 text-xs text-dark dark:text-white">{row.date}</td>
                    <td className="px-3 py-2.5 text-center text-xs text-dark dark:text-white">{row.totalPresent}</td>
                    <td className="px-3 py-2.5">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <input
                        type="radio"
                        name="rowSelect"
                        checked={row.selected}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 accent-[#2d8f7b] cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between rounded-b-[10px] border-t border-stroke px-5 py-3 dark:border-dark-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            (1 of {totalPages})
          </span>
          <div className="flex items-center gap-1">
            {/* First */}
            <button className="flex h-7 w-7 items-center justify-center rounded border border-stroke text-xs text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:text-gray-400 dark:hover:bg-gray-700">
              «
            </button>
            {/* Prev */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-stroke text-xs text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`flex h-7 w-7 items-center justify-center rounded border text-xs font-medium transition-colors
                  ${currentPage === p
                    ? "border-[#2d8f7b] bg-[#2d8f7b] text-white"
                    : "border-stroke text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
              >
                {p}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-stroke text-xs text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <ChevronRight />
            </button>
            {/* Last */}
            <button className="flex h-7 w-7 items-center justify-center rounded border border-stroke text-xs text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:text-gray-400 dark:hover:bg-gray-700">
              »
            </button>

            {/* Page size */}
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="ml-2 h-7 rounded border border-stroke px-1.5 text-xs text-dark outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}