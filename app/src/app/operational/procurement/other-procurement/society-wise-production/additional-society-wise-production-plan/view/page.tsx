"use client";

import Link from "next/link";
import { useState } from "react";

const PLAN = {
  planType: "Additional Production Plan",
  planCode: "APP-SEP-25-73 / Prodcution plan",
  planFrom: "01-Sep-2025",
  planTo: "09-Sep-2025",
  createdDate: "08-Sep-2025",
  createdBy: "3182",
  approvedDate: "08-Sep-2025",
  approvedBy: "3182",
  dpOffice: "2107 / D&P OFFICE KANCHIPURAM",
  productCategory: "A / Pure Silk Variety",
  productGroup: "30 / SILK ITEM",
  productVariety: "SKBS / SAREES KPM SILK WITH BLOUSE",
  uom: "NOS",
};

const SOCIETIES = [
  { id: 1,  code: "111147/ARIGNAR ANNA SILK WEAVERS COOP. SOCIETY, K.H.1,",               currentQty: 100.00 },
  { id: 2,  code: "111184/KANCHEEPURAMDR. KALAIGNARKARUNANIDHISILWCS.KH.4,",              currentQty: 100.00 },
  { id: 3,  code: "111202/KANCHEEPURAM SILK WEAVERS COOP.SOCIETY G.1099",                 currentQty: 100.00 },
  { id: 4,  code: "111226/KANCHEEPURAM KAMAKSHIAMMAN SILK WCS. G.1612, NO 5,",            currentQty: 0.00 },
  { id: 5,  code: "111263/KANCHEEPURAM MURUGAN SILK WCS. G.1653,",                        currentQty: 0.00 },
  { id: 6,  code: "111317/KANCHEEPURAM PALLAVAR SILK WCS. K.P.(SPL) 83,",                 currentQty: 0.00 },
  { id: 7,  code: "111408/KANCHEEPURAM THIRUVALLUVAR SILK WCS., G.2054,",                 currentQty: 0.00 },
  { id: 8,  code: "111410/SRI VARADARAJASWAMI SILK WCS. G.2105,",                         currentQty: 0.00 },
  { id: 9,  code: "112760/KH.277.KPM.PURATCHI THALAIVI DR.J.JAYALALITHA ALL WOMEN WCS",   currentQty: 0.00 },
  { id: 10, code: "113181/K.H.306,KANCHEEPURAM PURATCHI PUYAL VAIKO SILK",                currentQty: 0.00 },
  { id: 11, code: "272362/ATHIMALAIPATTU ARIGNAR ANNA W.C.S.LTD., VH.9,",                 currentQty: 0.00 },
];

const totalQty = SOCIETIES.reduce((s, r) => s + r.currentQty, 0);

const ReadField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="block text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-sm font-medium text-[#17a2b8]">{value}</span>
  </div>
);

export default function ViewAdditionalSocietyWisePlanPage() {
  const [showViewNote, setShowViewNote] = useState(false);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Additional Society Wise Production Plan</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Society Wise Production</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Additional Society Wise Production Plan</li>
          </ol>
        </nav>
      </div>

      {/* ── Progress Stepper ── */}
      <div className="mb-6 flex items-start gap-0">
        <div className="flex flex-col items-center">
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-orange-400 text-sm font-bold text-orange-400">1</div>
          <span className="mt-1 max-w-[140px] text-center text-xs text-dark dark:text-white">Society Wise Production Plan Created</span>
        </div>
        <div className="mt-4 h-px flex-1 bg-gray-200 dark:bg-dark-3"></div>
        <div className="flex flex-col items-center">
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-gray-300 text-sm font-medium text-gray-400">2</div>
          <span className="mt-1 max-w-[140px] text-center text-xs text-gray-400">Society Wise Production Plan Approved</span>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Society Wise Production Plan</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80">( Mandatory Fields)</span>
            <button className="text-white hover:opacity-80"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
          </div>
        </div>

        <div className="p-5">
          {/* ── Society Wise Production Plan Details ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Society Wise Production Plan Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="Plan Type"       value={PLAN.planType} />
            <ReadField label="Plan Code / Name" value={PLAN.planCode} />
            <ReadField label="Plan From"        value={PLAN.planFrom} />
            <ReadField label="Plan To"          value={PLAN.planTo} />
            <ReadField label="Created Date"     value={PLAN.createdDate} />
            <ReadField label="Created By"       value={PLAN.createdBy} />
            <ReadField label="Approved Date"    value={PLAN.approvedDate} />
            <ReadField label="Approved By"      value={PLAN.approvedBy} />
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ── D&P Office Details ── */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">D&amp;P Office Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="D&P Office Code / Name"       value={PLAN.dpOffice} />
            <ReadField label="Product Category Code / Name" value={PLAN.productCategory} />
            <ReadField label="Product Group Code / Name"    value={PLAN.productGroup} />
            <ReadField label="Product Variety Code / Name"  value={PLAN.productVariety} />
            <ReadField label="UOM"                          value={PLAN.uom} />
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ── Primary Contact Details ── */}
          <div className="mt-5">
            <div className="mb-2 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Primary Contact Details</h4>
            </div>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Society Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Current Requirement Qty</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {SOCIETIES.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-[#17a2b8] dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-[#17a2b8] dark:border-dark-3">{s.code}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3">
                        <div className="rounded border border-stroke bg-gray-50 px-2 py-1 text-right text-sm text-gray-600 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">{s.currentQty.toFixed(2)}</div>
                      </td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{s.currentQty.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total:</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalQty.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Bottom: View Note only */}
            <div className="border-t border-stroke pt-4 dark:border-dark-3">
              <button onClick={() => setShowViewNote(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                View  Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== VIEW NOTE MODAL ===== */}
      {showViewNote && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            {/* Left nav button (outside modal) */}
            <button className="absolute -left-5 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:bg-gray-100 dark:bg-gray-dark dark:text-gray-300">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            </button>
            {/* Right nav button (outside modal) */}
            <button className="absolute -right-5 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:bg-gray-100 dark:bg-gray-dark dark:text-gray-300">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
            </button>

            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note content — shows raw html as stored */}
              <div className="mb-4 min-h-[160px] rounded border border-stroke p-3 font-mono text-sm text-dark dark:border-dark-3 dark:text-white">
                &lt;p&gt;Tewsting&lt;/p&gt;
              </div>

              {/* Navigation arrows (right side) */}
              <div className="mb-4 flex items-center justify-end gap-1">
                <button className="flex size-7 items-center justify-center rounded text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg></button>
                <button className="flex size-7 items-center justify-center rounded text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></button>
              </div>

              <div className="flex items-center justify-end">
                <button onClick={() => setShowViewNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
