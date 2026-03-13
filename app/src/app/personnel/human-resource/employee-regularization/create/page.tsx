"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

/* ── icons ── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const PersonIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CalIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ForwardIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <polyline points="15,10 20,15 15,20" />
    <path d="M4 4v7a4 4 0 004 4h12" />
  </svg>
);

interface FieldWrapProps { label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode; }
function FieldWrap({ label, required, icon, children }: FieldWrapProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-2 rounded border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark">
        {icon}
        {children}
      </div>
    </div>
  );
}

interface EmpRow {
  id: number;
  empCode: string;
  empName: string;
  dateOfJoining: string;
  dateOfConfirmation: string;
  designation: string;
  effectiveFromDate: string;
  basicPay: string;
  remarks: string;
  selected: boolean;
}

const DESIGNATIONS = ["Junior Assistant","Senior Assistant","Superintendent","Auditor","Accountant","Manager"];
const TODAY_STR = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
const PAGE_SIZES = [10, 20, 25, 50];

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function EmployeeRegularizationCreatePage() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);

  const [collapsed,      setCollapsed]      = useState(false);
  const [designations,   setDesignations]   = useState<string[]>([]);
  const [designOpen,     setDesignOpen]     = useState(false);
  const [date,           setDate]           = useState(new Date().toISOString().split("T")[0]);
  const [rows,           setRows]           = useState<EmpRow[]>([]);
  const [page,           setPage]           = useState(1);
  const [pageSize,       setPageSize]       = useState(10);
  const [forwardTo,      setForwardTo]      = useState("");
  const [forwardFor,     setForwardFor]     = useState("");
  const [showNote,       setShowNote]       = useState(false);

  const toggleDesignation = (d: string) =>
    setDesignations((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const handleClear = () => { setDesignations([]); setDate(new Date().toISOString().split("T")[0]); setRows([]); };

  const handleGenerate = () => {
    if (designations.length === 0) return;
    setRows([
      { id: 1, empCode: "625", empName: "VENKATARAJU M",   dateOfJoining: "13-Sep-2010", dateOfConfirmation: "12-Sep-2011", designation: "Junior Assistant", effectiveFromDate: "31-Dec-2025", basicPay: "25000.00", remarks: "", selected: false },
      { id: 2, empCode: "312", empName: "LAKSHMI PRABHA S",dateOfJoining: "05-Jan-2015", dateOfConfirmation: "04-Jan-2016", designation: "Senior Assistant",  effectiveFromDate: "31-Dec-2025", basicPay: "30000.00", remarks: "", selected: false },
      { id: 3, empCode: "489", empName: "SANKAR C",        dateOfJoining: "20-Mar-2018", dateOfConfirmation: "19-Mar-2019", designation: "Auditor",           effectiveFromDate: "31-Dec-2025", basicPay: "28000.00", remarks: "", selected: false },
    ]);
    setPage(1);
  };

  const toggleRow = (id: number) =>
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, selected: !r.selected } : r));

  const toggleAll = () => {
    const allSelected = rows.every((r) => r.selected);
    setRows((prev) => prev.map((r) => ({ ...r, selected: !allSelected })));
  };

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const paginated  = rows.slice((page - 1) * pageSize, page * pageSize);
  const allChecked = rows.length > 0 && rows.every((r) => r.selected);

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  const selectClass = "w-full bg-transparent text-sm text-dark outline-none dark:text-white";
  const inputClass  = "w-full bg-transparent text-sm text-dark outline-none dark:text-white";

  const designLabel = designations.length === 0
    ? "(0) Designations Selected"
    : `(${designations.length}) Selected`;

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Employee Regularization
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Employee Regularization</li>
          </ol>
        </nav>
      </div>

      {/* Filter Card */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Employee Regularization</h3>
            <span className="text-xs text-white/80">( * Mandatory Fields)</span>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20 text-lg font-bold"
          >
            {collapsed ? "+" : "—"}
          </button>
        </div>

        {!collapsed && (
          <div className="p-5">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Designation multi-select */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Designation<span className="ml-0.5 text-red-500">*</span>
                </label>
                <div className="relative">
                  <div
                    onClick={() => setDesignOpen((o) => !o)}
                    className="flex cursor-pointer items-center gap-2 rounded border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark"
                  >
                    <PersonIcon />
                    <span className="flex-1 text-sm text-dark dark:text-white">{designLabel}</span>
                    <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </div>
                  {designOpen && (
                    <div className="absolute z-20 mt-1 w-full rounded border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark">
                      {DESIGNATIONS.map((d) => (
                        <label key={d} className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-dark-2">
                          <input type="checkbox" checked={designations.includes(d)} onChange={() => toggleDesignation(d)}
                            className="size-3.5 accent-[#2d8f7b]" />
                          <span className="text-sm text-dark dark:text-white">{d}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Date */}
              <FieldWrap label="Date" icon={<CalIcon />}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className={inputClass} />
                <svg className="size-4 shrink-0 text-[#17a2b8]" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth={1.5} />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth={1.5} />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth={1.5} />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth={1.5} />
                </svg>
              </FieldWrap>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleClear}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear
              </button>
              <button type="button" onClick={handleGenerate}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="23,4 23,10 17,10" />
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                </svg>
                Generate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon />
            Employee Regularization List
          </h4>
        </div>

        <div className="p-5">
          {/* Table */}
          <div className="mb-3 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Employee Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Date of Joining</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Date of Confirmation</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Effective From Date</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Basic Pay</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Remarks</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">
                    <input type="checkbox" checked={allChecked} onChange={toggleAll}
                      className="size-4 accent-[#2d8f7b]" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-4 pl-3 text-left text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2 text-[#17a2b8] dark:border-dark-3">{row.empCode} / {row.empName}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{row.dateOfJoining}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{row.dateOfConfirmation}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{row.designation}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{row.effectiveFromDate}</td>
                      <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{row.basicPay}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{row.remarks}</td>
                      <td className="px-3 py-2 text-center">
                        <input type="checkbox" checked={row.selected} onChange={() => toggleRow(row.id)}
                          className="size-4 accent-[#2d8f7b]" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#171;</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#8249;</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…" ? <span key={`e${i}`} className="px-1 text-gray-400">…</span> : (
                <button key={p} onClick={() => setPage(p as number)}
                  className={`flex size-7 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"}`}>
                  {p}
                </button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#8250;</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">&#187;</button>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="h-7 rounded border border-stroke bg-white px-1 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FieldWrap label="Forward To" required icon={<ForwardIcon />}>
              <input value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className={inputClass} />
            </FieldWrap>
            <FieldWrap label="Forward For" required icon={<ForwardIcon />}>
              <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className={selectClass}>
                <option value="">Select</option>
                <option>Approval</option>
                <option>Review</option>
              </select>
            </FieldWrap>
          </div>

          {/* Create Note */}
          <div className="mb-5">
            <button type="button" onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Note
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button type="button"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20,6 9,17 4,12" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* ── Create Note Modal ── */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">Create Note</h4>
              <button type="button" onClick={() => setShowNote(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option></select>
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option></select>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                {[["bold","B"],["italic","I"],["underline","U"],["strikeThrough","S"]].map(([cmd,label]) => (
                  <button key={cmd} type="button" onMouseDown={(e) => { e.preventDefault(); execCmd(cmd); }}
                    className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs font-medium hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">{label}</button>
                ))}
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("insertOrderedList"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M5 6h-.5M5 12H4M5 18H3"/></svg>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("insertUnorderedList"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
                </button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("removeFormat"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="3" x2="21" y2="21"/><path d="M9 9L4 20h7l2-4"/><path d="M14.5 4H20L13 14"/></svg>
                </button>
              </div>
              <div ref={editorRef} contentEditable suppressContentEditableWarning
                className="min-h-[160px] rounded-b border border-stroke bg-white p-3 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                data-placeholder="Enter text ..." />

              {/* Nav arrows */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <span className="size-2 rounded-full bg-[#17b8c8]" />
                <button type="button" disabled className="flex size-7 items-center justify-center rounded-full border border-stroke text-sm disabled:opacity-40 dark:border-dark-3 dark:text-white">&#8249;</button>
                <button type="button" disabled className="flex size-7 items-center justify-center rounded-full border border-stroke text-sm disabled:opacity-40 dark:border-dark-3 dark:text-white">&#8250;</button>
              </div>

              {/* Created By card */}
              <div className="mt-4">
                <div className="inline-block rounded border border-gray-200 p-3 dark:border-dark-3" style={{ minWidth: "220px" }}>
                  <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-xs text-[#e87c39]">Name :</p>
                  <p className="text-xs text-[#e87c39]">Designation :</p>
                  <p className="text-xs text-[#e87c39]">Date : {TODAY_STR}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#343a40] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button type="button" onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        [contenteditable]:empty:before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; }
      `}</style>
    </div>
  );
}
