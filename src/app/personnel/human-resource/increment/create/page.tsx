"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M3 21h18M9 21V9h6v12" />
  </svg>
);

const PersonIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PercentIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
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
  pfNumber: string;
  name: string;
  designation: string;
  payscale: string;
  existingBasicPay: number;
  incrementAmount: number;
  revisedBasicPay: number;
  financialBenefitFrom: string;
  effectiveDate: string;
}

const horoOptions = ["HEAD OFFICE", "CHENNAI", "COIMBATORE", "MADURAI", "TRICHY"];
const cycleOptions = ["ANNUAL 2024-25", "ANNUAL 2023-24", "HALF YEARLY 2024", "QUARTERLY Q1 2024"];

const TODAY_STR = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");

export default function IncrementCreatePage() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);

  const [collapsed, setCollapsed] = useState(false);
  const [horo, setHoro] = useState("");
  const [cycle, setCycle] = useState("");
  const [percentage, setPercentage] = useState("");
  const [rows, setRows] = useState<EmpRow[]>([]);
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showNote, setShowNote] = useState(false);

  const selectClass = "w-full bg-transparent text-sm text-dark outline-none dark:text-white";
  const inputClass  = "w-full bg-transparent text-sm text-dark outline-none dark:text-white";

  const handleClear = () => {
    setHoro(""); setCycle(""); setPercentage(""); setRows([]);
    setForwardTo(""); setForwardFor("");
  };

  const handleGenerate = () => {
    if (!horo || !cycle) return;
    setRows([
      { id: 1,  pfNumber: "3177", name: "KARUNANITHI P",   designation: "MANAGER GRADE – III",           payscale: "5200 - 20200", existingBasicPay: 28620, incrementAmount: 860,  revisedBasicPay: 29480, financialBenefitFrom: "", effectiveDate: "" },
      { id: 2,  pfNumber: "69056",name: "VISHNU DAS C",    designation: "ASSISTANT SALES MAN",           payscale: "4140 - 10000", existingBasicPay: 13670, incrementAmount: 420,  revisedBasicPay: 14090, financialBenefitFrom: "", effectiveDate: "" },
      { id: 3,  pfNumber: "3546", name: "PREETHA S",       designation: "PRODUCTION SUPERVISOR(EXPORT)", payscale: "6550 - 20200", existingBasicPay: 23330, incrementAmount: 700,  revisedBasicPay: 24030, financialBenefitFrom: "", effectiveDate: "" },
      { id: 4,  pfNumber: "3337", name: "DURAI MURUGAN S", designation: "DEPUTY MANAGER(D&P) SG",        payscale: "7120 - 30000", existingBasicPay: 49780, incrementAmount: 1500, revisedBasicPay: 51280, financialBenefitFrom: "", effectiveDate: "" },
      { id: 5,  pfNumber: "1012", name: "SIVAKUMAR K",     designation: "DEPUTY MANAGER(D&P)",           payscale: "3800 - 9675",  existingBasicPay: 68820, incrementAmount: 2070, revisedBasicPay: 70890, financialBenefitFrom: "", effectiveDate: "" },
    ]);
  };

  const updateRow = (id: number, field: keyof EmpRow, value: string | number) => {
    setRows(prev => prev.map(r => {
      if (r.id !== id) return r;
      const updated = { ...r, [field]: value };
      if (field === "incrementAmount") updated.revisedBasicPay = updated.existingBasicPay + Number(value);
      return updated;
    }));
  };

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Increment / Bonus
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Increment / Bonus</li>
          </ol>
        </nav>
      </div>

      {/* Filter Card */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Increment</h3>
            <span className="text-xs text-white/80">( * Mandatory Fields)</span>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed(c => !c)}
            className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20 text-lg font-bold"
          >
            {collapsed ? "+" : "—"}
          </button>
        </div>

        {!collapsed && (
          <div className="p-5">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FieldWrap label="HO / RO" required icon={<BuildingIcon />}>
                <select value={horo} onChange={e => setHoro(e.target.value)} className={selectClass}>
                  <option value="">Select</option>
                  {horoOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Increment Cycle" required icon={<PersonIcon />}>
                <select value={cycle} onChange={e => setCycle(e.target.value)} className={selectClass}>
                  <option value="">Select</option>
                  {cycleOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Percentage" icon={<PercentIcon />}>
                <input type="number" value={percentage} onChange={e => setPercentage(e.target.value)}
                  className={inputClass} />
              </FieldWrap>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleClear}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear
              </button>
              <button type="button" onClick={handleGenerate} disabled={!horo || !cycle}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
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

      {/* Increment Information Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon />
            Increment Information
          </h4>
        </div>

        <div className="p-5">
          {/* Table */}
          <div className="mb-3 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm min-w-[1100px]">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Employee PF Number / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Payscale</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Existing Basic Pay (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Increment Amount (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Revised Basic Pay (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">
                    Financial Benefit From <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">
                    Effective Date <span className="text-red-300">*</span>
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-4 pl-3 text-left text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2 text-[#17a2b8] dark:border-dark-3 whitespace-nowrap">{row.pfNumber} / {row.name}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{row.designation}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{row.payscale}</td>
                      <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{row.existingBasicPay.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-2 dark:border-dark-3">
                        <input type="number" value={row.incrementAmount}
                          onChange={e => updateRow(row.id, "incrementAmount", Number(e.target.value))}
                          className="w-20 rounded border border-stroke bg-white px-1 py-0.5 text-right text-sm outline-none focus:border-[#17b8c8] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                      </td>
                      <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{row.revisedBasicPay.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-2 dark:border-dark-3">
                        <input type="date" value={row.financialBenefitFrom}
                          onChange={e => updateRow(row.id, "financialBenefitFrom", e.target.value)}
                          className="rounded border border-stroke bg-white px-1 py-0.5 text-sm outline-none focus:border-[#17b8c8] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                      </td>
                      <td className="border-r border-stroke px-3 py-2 dark:border-dark-3">
                        <input type="date" value={row.effectiveDate}
                          onChange={e => updateRow(row.id, "effectiveDate", e.target.value)}
                          className="rounded border border-stroke bg-white px-1 py-0.5 text-sm outline-none focus:border-[#17b8c8] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button onClick={() => setRows(prev => prev.filter(r => r.id !== row.id))}
                          className="text-red-500 hover:text-red-700" title="Remove">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FieldWrap label="Forward To" required icon={<ForwardIcon />}>
              <input value={forwardTo} onChange={e => setForwardTo(e.target.value)} className={inputClass} />
            </FieldWrap>
            <FieldWrap label="Forward For" required icon={<ForwardIcon />}>
              <select value={forwardFor} onChange={e => setForwardFor(e.target.value)} className={selectClass}>
                <option value="">Select</option>
                <option>APPROVAL</option>
                <option>REVIEW</option>
                <option>INFORMATION</option>
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
              + Create Note
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

      {/* Create Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">Edit Note</h4>
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
                  <button key={cmd} type="button" onMouseDown={e => { e.preventDefault(); execCmd(cmd); }}
                    className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs font-medium hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">{label}</button>
                ))}
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd("insertOrderedList"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M5 6h-.5M5 12H4M5 18H3"/></svg>
                </button>
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd("insertUnorderedList"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
                </button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd("removeFormat"); }}
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
                <button type="button" disabled className="flex size-7 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 dark:border-dark-3 dark:text-white">&#8249;</button>
                <button type="button" disabled className="flex size-7 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 dark:border-dark-3 dark:text-white">&#8250;</button>
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
