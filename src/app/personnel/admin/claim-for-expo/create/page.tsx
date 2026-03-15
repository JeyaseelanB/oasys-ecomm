"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

/* ──────────── Static data ──────────── */
const HO_RO_OPTIONS  = ["CHENNAI","HEAD OFFICE","COIMBATORE","MADURAI","TRICHY","TIRUPPUR","SALEM","ERODE"];
const FORWARD_FOR    = ["Approval","Review","Information","Action","Comments"];

type ExpoMeta = { code: string; fromDate: string; venue: string; sales: string };
const EXPO_DATA: Record<string, ExpoMeta> = {
  "C.P Art Centre":    { code:"1661", fromDate:"2019-04-19", venue:"Main Hall,Eldams Road ALWARPET,CHENNAI", sales:"1355850.00" },
  "Textile Expo 2020": { code:"1720", fromDate:"2020-01-10", venue:"Chennai Trade Centre, Nandambakkam", sales:"2100000.00" },
  "Handloom Mela 2021":{ code:"1830", fromDate:"2021-03-05", venue:"Codissia Trade Fair Complex, Coimbatore", sales:"980000.00" },
  "Craft Fair 2022":   { code:"1945", fromDate:"2022-12-12", venue:"Government Museum Ground, Madurai", sales:"750000.00" },
  "Silk India Expo 2023":{ code:"2056", fromDate:"2023-09-22", venue:"YMCA Grounds, Nandanam, Chennai", sales:"3200000.00" },
};
const EXPO_OPTIONS = Object.keys(EXPO_DATA);

type ExpenseRow = { id: number; hoRo: string; expoName: string; expoDate: string; expoToDate: string; typeOfExpenses: string; amount: number };
const GENERATED_ROWS: ExpenseRow[] = [
  { id:1, hoRo:"CHENNAI", expoName:"C.P Art Centre 1", expoDate:"19-Apr-2019", expoToDate:"30-Apr-2019", typeOfExpenses:"Daily Expense", amount:0      },
  { id:2, hoRo:"CHENNAI", expoName:"C.P Art Centre 1", expoDate:"19-Apr-2019", expoToDate:"30-Apr-2019", typeOfExpenses:"Daily Expense", amount:16000   },
  { id:3, hoRo:"CHENNAI", expoName:"C.P Art Centre 1", expoDate:"19-Apr-2019", expoToDate:"30-Apr-2019", typeOfExpenses:"Daily Expense", amount:17315   },
  { id:4, hoRo:"CHENNAI", expoName:"C.P Art Centre 1", expoDate:"19-Apr-2019", expoToDate:"30-Apr-2019", typeOfExpenses:"Daily Expense", amount:9823    },
  { id:5, hoRo:"CHENNAI", expoName:"C.P Art Centre 1", expoDate:"19-Apr-2019", expoToDate:"30-Apr-2019", typeOfExpenses:"Daily Expense", amount:8500    },
];

/* ──────────── Icons ──────────── */
const OrgIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="8" y="2" width="8" height="4" rx="1"/><rect x="1" y="16" width="8" height="4" rx="1"/>
    <rect x="15" y="16" width="8" height="4" rx="1"/>
    <path d="M4 20v-4"/><path d="M20 20v-4"/><path d="M12 6v4M4 16v-4h16v4"/>
  </svg>
);
const HashIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const CalIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const LocationIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const RupeeIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="6" y1="6" x2="18" y2="6"/><line x1="6" y1="10" x2="18" y2="10"/>
    <path d="M6 14l6 6 6-6"/><path d="M9 6v14"/>
  </svg>
);
const ForwardIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15,14 20,9 15,4"/><path d="M4 20v-7a4 4 0 014-4h12"/>
  </svg>
);
const TrashIcon = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

export default function CreateClaimForExpoPage() {
  const router  = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [hoRo,       setHoRo]       = useState("CHENNAI");
  const [expoName,   setExpoName]   = useState("C.P Art Centre");
  const [expoCode,   setExpoCode]   = useState(EXPO_DATA["C.P Art Centre"].code);
  const [fromDate,   setFromDate]   = useState(EXPO_DATA["C.P Art Centre"].fromDate);
  const [toDate,     setToDate]     = useState("2019-04-30");
  const [venue,      setVenue]      = useState(EXPO_DATA["C.P Art Centre"].venue);
  const [salesAmt,   setSalesAmt]   = useState(EXPO_DATA["C.P Art Centre"].sales);

  const [expenseRows, setExpenseRows] = useState<ExpenseRow[]>(GENERATED_ROWS);
  const [generated,   setGenerated]   = useState(true);

  const [reason,     setReason]     = useState("wedf");
  const [uploadFile, setUploadFile] = useState("");
  const [forwardTo,  setForwardTo]  = useState("VENKATALAKSHMI_SUPERINTENDENT");
  const [forwardFor, setForwardFor] = useState("Approval");
  const [errors,     setErrors]     = useState<Record<string,string>>({});

  const [showNoteModal, setShowNoteModal] = useState(false);
  const noteEditorRef = useRef<HTMLDivElement>(null);

  /* When expo changes, auto-fill fields */
  const handleExpoChange = (name: string) => {
    setExpoName(name);
    const meta = EXPO_DATA[name];
    if (meta) { setExpoCode(meta.code); setFromDate(meta.fromDate); setVenue(meta.venue); setSalesAmt(meta.sales); }
    setGenerated(false);
    setExpenseRows([]);
  };

  const handleGenerate = () => {
    if (!hoRo || !expoName) return;
    setExpenseRows(GENERATED_ROWS);
    setGenerated(true);
  };

  const handleClearForm = () => {
    setHoRo(""); setExpoName(""); setExpoCode(""); setFromDate(""); setToDate("");
    setVenue(""); setSalesAmt(""); setExpenseRows([]); setGenerated(false);
  };

  const deleteRow = (id: number) => setExpenseRows(rows => rows.filter(r=>r.id!==id));

  const total = expenseRows.reduce((s,r)=>s+r.amount, 0);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!reason)    e.reason    = "Required";
    if (!uploadFile)e.uploadFile = "Required";
    if (!forwardTo) e.forwardTo  = "Required";
    if (!forwardFor)e.forwardFor = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/admin/claim-for-expo/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls   = "mt-0.5 text-xs text-red-500";

  const FieldBox = ({ icon, children, error }: { icon: React.ReactNode; children: React.ReactNode; error?: boolean }) => (
    <div className={`flex items-center overflow-hidden rounded border ${error?"border-red-400":"border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      {children}
    </div>
  );

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Generate for Claim Expo</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Generate for Claim Expo</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header + top-right buttons */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Claim For Expo</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80">( Mandatory Fields)</span>
            <button onClick={handleClearForm}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
            <button onClick={handleGenerate}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.96"/></svg>
              Generate
            </button>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {/* Form fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* HO/RO */}
            <div>
              <label className={labelCls}>HO/RO <span className="text-red-500">*</span></label>
              <FieldBox icon={<OrgIcon />}>
                <select value={hoRo} onChange={e=>setHoRo(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                  <option value="">Select</option>
                  {HO_RO_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </FieldBox>
            </div>
            {/* Name of Expo */}
            <div>
              <label className={labelCls}>Name of the Expo <span className="text-red-500">*</span></label>
              <FieldBox icon={<OrgIcon />}>
                <select value={expoName} onChange={e=>handleExpoChange(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                  <option value="">Select</option>
                  {EXPO_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </FieldBox>
            </div>
            {/* Expo Code (read-only) */}
            <div>
              <label className={labelCls}>Expo Code</label>
              <FieldBox icon={<HashIcon />}>
                <input type="text" readOnly value={expoCode}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </FieldBox>
            </div>
            {/* From Date (read-only) */}
            <div>
              <label className={labelCls}>From Date</label>
              <FieldBox icon={<CalIcon />}>
                <input type="date" readOnly value={fromDate}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </FieldBox>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* To Date */}
            <div>
              <label className={labelCls}>To Date</label>
              <FieldBox icon={<CalIcon />}>
                <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </FieldBox>
            </div>
            {/* Venue (read-only) */}
            <div>
              <label className={labelCls}>Venue</label>
              <FieldBox icon={<LocationIcon />}>
                <input type="text" readOnly value={venue}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </FieldBox>
            </div>
            {/* Sales Amount (read-only) */}
            <div>
              <label className={labelCls}>Sales Amount</label>
              <FieldBox icon={<RupeeIcon />}>
                <input type="text" readOnly value={salesAmt}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </FieldBox>
            </div>
            <div />
          </div>

          {/* Expense Table */}
          {generated && expenseRows.length > 0 && (
            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white text-xs">
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center w-10">#</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-left">HO/RO</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-left">Expo Name</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-left">Expo Date</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-left">Expo To Date</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-left">Type of Expenses</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-right">Amount (₹)</th>
                    <th className="px-3 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseRows.map((row,idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}`}>
                      <td className="px-3 py-2 text-center text-xs text-gray-500">{idx+1}</td>
                      <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.hoRo}</td>
                      <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.expoName}</td>
                      <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.expoDate}</td>
                      <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.expoToDate}</td>
                      <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.typeOfExpenses}</td>
                      <td className="px-3 py-2 text-right text-xs text-dark dark:text-white">
                        {row.amount.toLocaleString("en-IN",{minimumFractionDigits:2})}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button onClick={() => deleteRow(row.id)}
                          className="flex items-center justify-center rounded bg-red-500 p-1 text-white hover:opacity-90">
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
                    <td colSpan={6} className="px-3 py-2 text-right text-xs text-dark dark:text-white">Total</td>
                    <td className="px-3 py-2 text-right text-xs text-dark dark:text-white">
                      {total.toLocaleString("en-IN",{minimumFractionDigits:2})}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className={labelCls}>Reason <span className="text-red-500">*</span></label>
            <textarea rows={2} value={reason} onChange={e=>{setReason(e.target.value);if(errors.reason)setErrors(v=>({...v,reason:""}));}}
              className={`w-full rounded border ${errors.reason?"border-red-400":"border-stroke dark:border-dark-3"} bg-white px-3 py-2 text-sm text-dark focus:outline-none dark:bg-gray-dark dark:text-white`} />
            {errors.reason && <p className={errCls}>{errors.reason}</p>}
          </div>

          {/* Upload Documents */}
          <div>
            <label className={labelCls}>Upload Documents <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <input type="text" readOnly value={uploadFile}
                className={`w-56 rounded border ${errors.uploadFile?"border-red-400":"border-stroke dark:border-dark-3"} bg-gray-50 px-3 py-2 text-sm dark:bg-gray-800 dark:text-white`} />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                Upload
              </button>
              <input ref={fileRef} type="file" accept=".png,.jpeg,.jpg,.pdf,.doc" className="hidden"
                onChange={e=>{if(e.target.files?.[0]){setUploadFile(e.target.files[0].name);setErrors(v=>({...v,uploadFile:""}));}}} />
            </div>
            <p className="mt-1 text-[11px] text-gray-400">File format: png, jpeg, pdf, doc and file size should be less than 250 KB</p>
            {errors.uploadFile && <p className={errCls}>{errors.uploadFile}</p>}
          </div>

          {/* Forward To / Forward For */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Forward To <span className="text-red-500">*</span></label>
              <FieldBox icon={<ForwardIcon />} error={!!errors.forwardTo}>
                <input type="text" value={forwardTo} onChange={e=>{setForwardTo(e.target.value);if(errors.forwardTo)setErrors(v=>({...v,forwardTo:""}));}}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </FieldBox>
              {errors.forwardTo && <p className={errCls}>{errors.forwardTo}</p>}
            </div>
            <div>
              <label className={labelCls}>Forward For <span className="text-red-500">*</span></label>
              <FieldBox icon={<ForwardIcon />} error={!!errors.forwardFor}>
                <select value={forwardFor} onChange={e=>{setForwardFor(e.target.value);if(errors.forwardFor)setErrors(v=>({...v,forwardFor:""}));}}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                  <option value="">Select</option>
                  {FORWARD_FOR.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </FieldBox>
              {errors.forwardFor && <p className={errCls}>{errors.forwardFor}</p>}
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="flex items-center justify-between pt-2">
            <button type="button" onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex gap-2">
              <button onClick={() => router.push("/personnel/admin/claim-for-expo/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-1 flex flex-wrap items-center gap-1 rounded border border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800">
                <select className="rounded border border-gray-300 bg-white px-2 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-700 dark:text-white">
                  <option>Sans Serif</option><option>Serif</option>
                </select>
                <select className="rounded border border-gray-300 bg-white px-2 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-700 dark:text-white">
                  <option>Normal</option><option>H1</option><option>H2</option>
                </select>
                <div className="mx-1 h-4 w-px bg-gray-300" />
                {["B","I","U","S"].map(t=>(
                  <button key={t} type="button" onMouseDown={e=>{e.preventDefault();document.execCommand(t==="B"?"bold":t==="I"?"italic":t==="U"?"underline":"strikeThrough");}}
                    className="rounded px-1.5 py-0.5 text-xs font-bold text-gray-700 hover:bg-gray-200">{t}</button>
                ))}
                <div className="mx-1 h-4 w-px bg-gray-300" />
                {["A","Ā","x₂","x²","H₁","H₂","❝","<>","≡","≣","🔗","🖼","▶"].map((t,i)=>(
                  <button key={i} type="button" className="rounded px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200">{t}</button>
                ))}
              </div>
              <div ref={noteEditorRef} contentEditable suppressContentEditableWarning
                className="min-h-[140px] rounded border border-stroke px-3 py-2 text-sm text-dark focus:outline-none dark:border-dark-3 dark:text-white">
                <span className="text-gray-400">Enter text ...</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button type="button" className="flex size-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">‹</button>
                <div className="rounded border border-red-300 px-5 py-3 text-sm">
                  <p className="mb-1 text-xs font-semibold text-gray-600">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : PREMKUMAR</p>
                  <p className="text-xs text-dark dark:text-white">Designation : JUNIOR ASSISTANT</p>
                  <p className="text-xs text-dark dark:text-white">Date : 13-Mar-2026</p>
                </div>
                <button type="button" className="flex size-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">›</button>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
