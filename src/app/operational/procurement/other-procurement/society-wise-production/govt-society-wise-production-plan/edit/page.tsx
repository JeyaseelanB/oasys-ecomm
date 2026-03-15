"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ── tiny helpers ─────────────────────────────────────────────────── */
const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-[38px] w-9 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </span>
);

const CalBox = () => (
  <span className="flex h-[38px] w-9 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#2d8f7b] text-white dark:border-dark-3">
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  </span>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

const inputCls = "h-[38px] w-full rounded border border-stroke bg-white px-3 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const readonlyCls = "h-[38px] w-full rounded border border-stroke bg-gray-50 px-3 text-sm text-dark dark:border-dark-3 dark:bg-gray-700 dark:text-white cursor-not-allowed";
const selectCls = "h-[38px] w-full rounded border border-stroke bg-white px-3 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const labelCls = "mb-1 block text-xs font-medium text-dark dark:text-white";

interface SocietyRow { id: number; societyCode: string; openingStockQty: number; currentReqQty: number; totalQty: number; }

/* ── pre-populated edit data (row 1 = Cooptex123) ──────────────── */
const EDIT_SOCIETY_ROWS: SocietyRow[] = [
  { id: 1, societyCode: "351110/WEST VANAVASI WEAVERS COOP. SOCIETY K.K.24", openingStockQty: 10.0, currentReqQty: 10.0, totalQty: 20.0 },
];

export default function EditGovtSocietyWisePlanPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/society-wise-production/govt-society-wise-production-plan";

  /* header */
  const [planType]                    = useState("Govt Scheme");
  const [planCode, setPlanCode]       = useState("Cooptex123");
  const [planFrom]                    = useState("21-Feb-2025");
  const [planTo]                      = useState("22-Feb-2025");
  const [createdDate]                 = useState("21-Feb-2025");
  const [createdBy]                   = useState("3643");
  const [approvedDate]                = useState("21-Feb-2025");
  const [approvedBy]                  = useState("3558");

  /* D&P Office */
  const [dpOffice]                    = useState("1806 / D&P Office Salem");
  const [circleCode, setCircleCode]   = useState("05 / SALEM");
  const [prodCategory, setProdCategory] = useState("F / Government Scheme Handloom");
  const [prodGroup, setProdGroup]     = useState("38 / FDS HANDLOOM");
  const [prodVariety, setProdVariety] = useState("LCD1 / PEDALLOOM DHOTHY LCD1 CFDS2021");
  const [uom]                         = useState("NOS");

  /* society table */
  const [rows, setRows] = useState<SocietyRow[]>(EDIT_SOCIETY_ROWS);

  /* forward */
  const [forwardTo, setForwardTo]   = useState("");
  const [forwardFor, setForwardFor] = useState("Final Approve");

  /* modal */
  const [showNote, setShowNote] = useState(false);

  const totalOpeningQty = rows.reduce((s, r) => s + r.openingStockQty, 0);
  const totalCurrentQty = rows.reduce((s, r) => s + r.currentReqQty, 0);
  const totalQty        = rows.reduce((s, r) => s + r.totalQty, 0);

  const handleCurrentReqChange = (id: number, val: number) => {
    setRows(prev => prev.map(r => r.id === id
      ? { ...r, currentReqQty: val, totalQty: r.openingStockQty + val }
      : r));
  };

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Govt Society Wise Production Plan</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Society Wise Production</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Create Govt Society Wise Production</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Contract / Export Society Wise Production plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Society Wise Production Plan</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">( Mandatory Fields)</span>
            <button className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* ══ Society Wise Production Plan Details ══ */}
          <SectionHeader title="Society Wise Production Plan Details" />

          {/* Plan Type */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className={labelCls}>Plan Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </IconBox>
                <select value={planType} disabled className={`${selectCls} rounded-l-none`}>
                  <option>Govt Scheme</option>
                </select>
              </div>
            </div>
          </div>

          {/* Plan Code | Plan From | Plan To | Created Date */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className={labelCls}>Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                  </svg>
                </IconBox>
                <select value={planCode} onChange={e => setPlanCode(e.target.value)} className={`${selectCls} rounded-l-none`}>
                  <option>Cooptex123</option>
                  <option>muruga</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Plan From</label>
              <div className="flex">
                <input type="text" value={planFrom} readOnly className={`${readonlyCls} rounded-r-none`} />
                <CalBox />
              </div>
            </div>
            <div>
              <label className={labelCls}>Plan To</label>
              <div className="flex">
                <input type="text" value={planTo} readOnly className={`${readonlyCls} rounded-r-none`} />
                <CalBox />
              </div>
            </div>
            <div>
              <label className={labelCls}>Created Date</label>
              <div className="flex">
                <input type="text" value={createdDate} readOnly className={`${readonlyCls} rounded-r-none`} />
                <CalBox />
              </div>
            </div>
          </div>

          {/* Created By | Approved Date | Approved By */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className={labelCls}>Created By</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </IconBox>
                <input type="text" value={createdBy} readOnly className={`${readonlyCls} rounded-l-none`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Approved Date</label>
              <div className="flex">
                <input type="text" value={approvedDate} readOnly className={`${readonlyCls} rounded-r-none`} />
                <CalBox />
              </div>
            </div>
            <div>
              <label className={labelCls}>Approved By</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </IconBox>
                <input type="text" value={approvedBy} readOnly className={`${readonlyCls} rounded-l-none`} />
              </div>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ══ D&P Office Details ══ */}
          <div className="mt-5">
            <SectionHeader title="D&amp;P Office Details" />

            {/* Row 1 */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className={labelCls}>D&amp;P Office Code / Name</label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </IconBox>
                  <input type="text" value={dpOffice} readOnly className={`${readonlyCls} rounded-l-none`} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Circle Code/Name</label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                    </svg>
                  </IconBox>
                  <select value={circleCode} onChange={e => setCircleCode(e.target.value)} className={`${selectCls} rounded-l-none`}>
                    <option>05 / SALEM</option>
                    <option>01 / CHENNAI</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Product Category Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>
                  </IconBox>
                  <select value={prodCategory} onChange={e => setProdCategory(e.target.value)} className={`${selectCls} rounded-l-none`}>
                    <option>F / Government Scheme Handloom</option>
                    <option>A / Cotton</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Product Group Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </IconBox>
                  <select value={prodGroup} onChange={e => setProdGroup(e.target.value)} className={`${selectCls} rounded-l-none`}>
                    <option>38 / FDS HANDLOOM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className={labelCls}>Product Variety Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></svg>
                  </IconBox>
                  <select value={prodVariety} onChange={e => setProdVariety(e.target.value)} className={`${selectCls} rounded-l-none`}>
                    <option>LCD1 / PEDALLOOM DHOTHY LCD1 CFDS2021</option>
                    <option>POSC / OAP COLOUR SAREES 202122</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>UOM</label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </IconBox>
                  <input type="text" value={uom} readOnly className={`${readonlyCls} rounded-l-none`} />
                </div>
              </div>
            </div>

            {/* Clear + Generate */}
            <div className="mb-4 flex justify-end gap-2">
              <button className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/></svg>
                Clear
              </button>
              <button disabled className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white opacity-60">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                Generate
              </button>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ══ Society Wise Production Plan Details (table) ══ */}
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <SectionHeader title="Society Wise Production Plan Details" />
              <div className="text-xs text-[#17a2b8]">
                Opening Stock Quantity : {totalOpeningQty.toFixed(2)} , Current Requirement Quantity : {totalCurrentQty.toFixed(2)}
              </div>
            </div>

            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Society Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Opening Stock Qty</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Current Requirement Qty</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.societyCode}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3">
                        <input type="number" value={r.openingStockQty} readOnly
                          className="w-full rounded border border-stroke bg-gray-50 px-2 py-1 text-right text-sm dark:border-dark-3 dark:bg-gray-700 dark:text-white" />
                      </td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3">
                        <input type="number" value={r.currentReqQty}
                          onChange={e => handleCurrentReqChange(r.id, parseFloat(e.target.value) || 0)}
                          className="w-full rounded border border-stroke bg-white px-2 py-1 text-right text-sm focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                      </td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.totalQty.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={2} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total:</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalOpeningQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalCurrentQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalQty.toFixed(1)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Forward To / For */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelCls}>Forward to <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="5,12 19,12"/><polyline points="13,6 19,12 13,18"/></svg>
                  </IconBox>
                  <input type="text" value={forwardTo} onChange={e => setForwardTo(e.target.value)}
                    className={`${inputCls} rounded-l-none`} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Forward for <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="5,12 19,12"/><polyline points="13,6 19,12 13,18"/></svg>
                  </IconBox>
                  <select value={forwardFor} onChange={e => setForwardFor(e.target.value)} className={`${selectCls} rounded-l-none`}>
                    <option value="">Select</option>
                    <option>Final Approve</option>
                    <option>Review</option>
                    <option>Approval</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
              <button onClick={() => setShowNote(true)}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create Note
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => router.push(`${basePath}/list`)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13"/><polyline points="7,3 7,8 15,8"/></svg>
                  Save
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ CREATE NOTE MODAL ══════ */}
      {showNote && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl">
            <button className="absolute -left-5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-gray-700">
              <svg className="size-4 text-gray-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            </button>
            <button className="absolute -right-5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-gray-700">
              <svg className="size-4 text-gray-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
            </button>
            <div className="rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
              <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
                <h3 className="text-sm font-semibold text-white">Create Note</h3>
                <button onClick={() => setShowNote(false)} className="text-white hover:opacity-80">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="p-5">
                {/* toolbar */}
                <div className="mb-2 flex flex-wrap items-center gap-0.5 rounded border border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-700">
                  <select className="h-7 rounded border border-stroke bg-white px-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white mr-1"><option>Sans Serif</option></select>
                  <select className="h-7 rounded border border-stroke bg-white px-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white mr-1"><option>Normal</option><option>Heading 1</option></select>
                  {["B","I","U","S"].map(f => (
                    <button key={f} className={`flex h-7 w-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 ${f==="B"?"font-bold":f==="I"?"italic":f==="U"?"underline":"line-through"}`}>{f}</button>
                  ))}
                </div>
                <div className="mb-4 min-h-[200px] rounded border border-stroke bg-white p-3 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  contentEditable suppressContentEditableWarning>gg</div>
                <div className="mb-6">
                  <div className="inline-block rounded border border-[#FFA70B] p-4">
                    <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                    <div className="space-y-1 text-sm text-dark dark:text-white">
                      <p>Name : LALITHA</p>
                      <p>Designation :</p>
                      <p>Date : 12-Mar-2026</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => setShowNote(false)}
                    className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Cancel
                  </button>
                  <button onClick={() => setShowNote(false)}
                    className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
