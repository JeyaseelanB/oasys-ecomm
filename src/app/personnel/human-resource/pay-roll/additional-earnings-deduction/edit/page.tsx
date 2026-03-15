"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TYPES       = ["Earnings", "Allowance", "Deduction"];
const PAY_ASPECTS = ["Basic Pay", "D.A", "H.R.A", "C.C.A", "Incentive", "Bonus", "Gratuity", "Income Tax", "P.F."];
const HO_RO_LIST  = ["HEAD OFFICE", "REGION - CHENNAI", "REGION - COIMBATORE"];
const ENT_TYPES   = ["Head Office", "Regional Office", "Showroom", "Society"];
const ENTITIES    = ["HEAD OFFICE", "CHENNAI REGION", "COIMBATORE REGION"];
const DEPTS       = ["ADMIN","TECHNICAL","MARKETING","FINANCE","HR","OPERATIONS"];
const SECTIONS    = ["Admin","Accounts","Contract section","Export","Internal Audit Wing","Product Development","PRODUCTION WING","Recruitment","Sales"];
const YEARS       = ["2020","2021","2022","2023","2024","2025","2026"];
const MONTHS      = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const FORWARD_FOR_OPTS = ["Approval","Information","Review"];
const NOTE_HISTORY = [
  { by: "SANKARANARAYANAN", designation: "SUPERINTENDENT",   date: "04-Mar-2025", text: "Additional allowance approved for Q1 2024." },
  { by: "HR MANAGER",       designation: "MANAGER",          date: "05-Mar-2025", text: "Verified and forwarded for final approval." },
];

type EmpRow = { id: number; hoRo: string; dept: string; section: string; employee: string; amount: string; description: string };

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-[42px] w-10 flex-shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </span>
);
const ListIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const RupeeIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="6" y1="5" x2="18" y2="5"/><line x1="6" y1="9" x2="18" y2="9"/>
    <line x1="6" y1="21" x2="12" y2="9"/><path d="M9 5a3 3 0 000 6h3"/>
  </svg>
);
const BuildingIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 22V12h6v10M3 9h18"/>
  </svg>
);
const UserIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const CalIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ForwardIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 004 4h12"/>
  </svg>
);

export default function EditEADPage() {
  const router = useRouter();

  const [type,       setType]       = useState("Allowance");
  const [payAspect,  setPayAspect]  = useState("Basic Pay");
  const [hoRo,       setHoRo]       = useState("HEAD OFFICE");
  const [entType,    setEntType]    = useState("Head Office");
  const [entity,     setEntity]     = useState("HEAD OFFICE");
  const [dept,       setDept]       = useState("ADMIN");
  const [section,    setSection]    = useState("Internal Audit Wing");
  const [year,       setYear]       = useState("2026");
  const [month,      setMonth]      = useState("1");
  const [skipApproval, setSkipApproval] = useState("No");
  const [forwardTo,  setForwardTo]  = useState("MANAGER");
  const [forwardFor, setForwardFor] = useState("Approval");
  const [showNote,   setShowNote]   = useState(false);
  const [noteText,   setNoteText]   = useState("");
  const [noteIdx,    setNoteIdx]    = useState(0);

  const [rows, setRows] = useState<EmpRow[]>([
    { id:1, hoRo:"HEAD OFFICE", dept:"ADMIN",     section:"Internal Audit Wing", employee:"SANKARANARAYANAN", amount:"5000.00",  description:"Quarterly Allowance" },
    { id:2, hoRo:"HEAD OFFICE", dept:"ADMIN",     section:"Internal Audit Wing", employee:"ARULRAJAN",        amount:"4500.00",  description:"Quarterly Allowance" },
    { id:3, hoRo:"HEAD OFFICE", dept:"ADMIN",     section:"Internal Audit Wing", employee:"MURUGESAN",        amount:"4200.00",  description:"Quarterly Allowance" },
  ]);

  const selectCls = "h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300";
  const selectSmCls = "h-[42px] w-full rounded-r border border-stroke bg-white px-2 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Additional Earnings / Deduction</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Additional Earnings / Deduction</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Additional Earnings / Deduction</h3>
          <span className="text-sm text-white/80">( Mandatory Fields ) <span className="font-bold text-white">—</span></span>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Type</label>
              <div className="flex">
                <IconBox><ListIco /></IconBox>
                <select value={type} onChange={e => setType(e.target.value)} className={selectCls}>
                  {TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Pay Aspect</label>
              <div className="flex">
                <IconBox><RupeeIco /></IconBox>
                <select value={payAspect} onChange={e => setPayAspect(e.target.value)} className={selectCls}>
                  {PAY_ASPECTS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">HO/RO <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><BuildingIco /></IconBox>
                <select value={hoRo} onChange={e => setHoRo(e.target.value)} className={selectCls}>
                  {HO_RO_LIST.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Entity Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><ListIco /></IconBox>
                <select value={entType} onChange={e => setEntType(e.target.value)} className={selectCls}>
                  {ENT_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Entity <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><BuildingIco /></IconBox>
                <select value={entity} onChange={e => setEntity(e.target.value)} className={selectCls}>
                  {ENTITIES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Department</label>
              <div className="flex">
                <IconBox><BuildingIco /></IconBox>
                <select value={dept} onChange={e => setDept(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {DEPTS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Section</label>
              <div className="flex">
                <IconBox><BuildingIco /></IconBox>
                <select value={section} onChange={e => setSection(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {SECTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Employee <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><UserIco /></IconBox>
                <div className="flex h-[42px] w-full cursor-pointer items-center rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300">
                  ({rows.length}) employees Selected
                  <svg className="ml-auto size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 12,15 18,9"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-[130px]">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Year <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CalIco /></IconBox>
                <select value={year} onChange={e => setYear(e.target.value)} className={selectSmCls}>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="w-[130px]">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Month <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CalIco /></IconBox>
                <select value={month} onChange={e => setMonth(e.target.value)} className={selectSmCls}>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 pb-0.5">
              <button className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
                Clear
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                Generate
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-5 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  {["#","HO/RO","Department","Section","Employee","Amount (₹)","Description"].map((h, i) => (
                    <th key={h} className={`px-3 py-2.5 text-xs font-semibold text-white ${i > 0 ? "border-l border-[#3aa88f]" : ""} ${i >= 5 ? "text-right" : "text-center"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className={`border-b border-stroke dark:border-dark-3 ${i % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-800/20" : ""}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-600 dark:text-gray-400">{i + 1}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.hoRo}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.dept}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.section}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.employee}</td>
                    <td className="px-3 py-2">
                      <input type="number" value={r.amount}
                        onChange={e => setRows(rows.map(rw => rw.id === r.id ? { ...rw, amount: e.target.value } : rw))}
                        className="h-8 w-full rounded border border-stroke px-2 text-right text-xs focus:border-[#2d8f7b] focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-700 dark:text-gray-300" />
                    </td>
                    <td className="px-3 py-2">
                      <input type="text" value={r.description}
                        onChange={e => setRows(rows.map(rw => rw.id === r.id ? { ...rw, description: e.target.value } : rw))}
                        className="h-8 w-full rounded border border-stroke px-2 text-xs focus:border-[#2d8f7b] focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-700 dark:text-gray-300" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Workflow */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Skip Approval</label>
              <div className="flex">
                <IconBox><ForwardIco /></IconBox>
                <select value={skipApproval} onChange={e => setSkipApproval(e.target.value)} className="h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300">
                  <option value="No">No</option><option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Forward To</label>
              <div className="flex">
                <IconBox><ForwardIco /></IconBox>
                <input value={forwardTo} onChange={e => setForwardTo(e.target.value)} className="h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Forward For</label>
              <div className="flex">
                <IconBox><ForwardIco /></IconBox>
                <select value={forwardFor} onChange={e => setForwardFor(e.target.value)} className="h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300">
                  {FORWARD_FOR_OPTS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">
            <button onClick={() => setShowNote(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex gap-2">
              <button onClick={() => router.push("/personnel/human-resource/pay-roll/additional-earnings-deduction/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t border border-b-0 border-stroke bg-gray-50 p-1.5 dark:border-dark-3 dark:bg-gray-700">
                {[["Sans Serif","Normal"],["B","I","U","S","A","Ā","x₂","x²","H₁","H₂","❝","</>"],["≡●","≡○","⇤","⇥","¶","≡"],["🔗","🖼","⊞","Tx"]].map((grp, gi) => (
                  <span key={gi} className="flex items-center">
                    {gi > 0 && <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-600"/>}
                    {grp.map(t => <button key={t} className="flex h-7 min-w-[28px] items-center justify-center rounded px-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600">{t}</button>)}
                  </span>
                ))}
              </div>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={6} placeholder="Enter text ..."
                className="w-full rounded-b border border-stroke px-3 py-2 text-sm text-gray-700 focus:border-[#2d8f7b] focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-800 dark:text-gray-300" />
              <div className="mt-4 flex items-center gap-3">
                <button onClick={() => setNoteIdx(i => Math.max(0, i - 1))} disabled={noteIdx === 0}
                  className="flex size-8 items-center justify-center rounded-full border border-stroke bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-700">‹</button>
                <div className="flex-1 rounded border border-orange-300 p-4">
                  <p className="mb-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Created By</p>
                  <p className="text-sm font-semibold text-dark dark:text-white">Name : {NOTE_HISTORY[noteIdx].by}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Designation : {NOTE_HISTORY[noteIdx].designation}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Date : {NOTE_HISTORY[noteIdx].date}</p>
                </div>
                <button onClick={() => setNoteIdx(i => Math.min(NOTE_HISTORY.length - 1, i + 1))} disabled={noteIdx === NOTE_HISTORY.length - 1}
                  className="flex size-8 items-center justify-center rounded-full border border-stroke bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-700">›</button>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
                <button onClick={() => setShowNote(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
