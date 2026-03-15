"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ── helpers ─────────────────────────────────────────────────────── */
const ReadField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="block text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-sm font-medium text-[#17a2b8]">{value || "\u00a0"}</span>
  </div>
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

/* ── mock view data ──────────────────────────────────────────────── */
const VIEW = {
  planType:      "Government Scheme",
  planCode:      "Cooptex123",
  planFrom:      "21-Feb-2025",
  planTo:        "22-Feb-2025",
  createdDate:   "21-Feb-2025",
  createdBy:     "3643",
  approvedDate:  "21-Feb-2025",
  approvedBy:    "3558",
  dpOffice:      "1806 / D&P Office Salem",
  circleCode:    "05 / SALEM",
  prodCategory:  "F / Government Scheme Handloom",
  prodGroup:     "38 / FDS HANDLOOM",
  prodVariety:   "LCD1 / PEDALLOOM DHOTHY LCD1 CFDS2021",
  uom:           "",
};

const TABLE_ROWS = [
  { id: 1, societyCode: "351110/WEST VANAVASI WEAVERS COOP. SOCIETY K.K.24", openingStockQty: 10.00, currentReqQty: 10.00, totalQty: 20.00 },
];

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */
export default function ViewGovtSocietyWisePlanPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/society-wise-production/govt-society-wise-production-plan";
  const [showViewNote, setShowViewNote] = useState(false);

  const totalOpening = TABLE_ROWS.reduce((s, r) => s + r.openingStockQty, 0);
  const totalCurrent = TABLE_ROWS.reduce((s, r) => s + r.currentReqQty, 0);
  const totalQty     = TABLE_ROWS.reduce((s, r) => s + r.totalQty, 0);

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Govt Society Wise Production Plan</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Govt Society Wise Production Plan</li>
          </ol>
        </nav>
      </div>

      {/* ── Step indicator ── */}
      <div className="mb-4 rounded-[10px] border border-stroke bg-white px-6 py-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-[#FFA70B] bg-white text-sm font-bold text-[#FFA70B] dark:bg-gray-dark">1</div>
            <span className="mt-1 text-xs text-dark dark:text-white">Society Wise Production Plan Created</span>
          </div>
          {/* connector */}
          <div className="mx-4 h-0.5 flex-1 bg-gray-300 dark:bg-gray-600"></div>
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-400 dark:bg-gray-dark dark:border-gray-600">2</div>
            <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">Society Wise Production Plan Approved</span>
          </div>
        </div>
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
          {/* ══ Society Wise Production Plan Details (read-only) ══ */}
          <SectionHeader title="Society Wise Production Plan Details" />

          <div className="mb-4 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="Plan Type"       value={VIEW.planType} />
            <ReadField label="Plan Code / Name" value={VIEW.planCode} />
            <ReadField label="Plan From"        value={VIEW.planFrom} />
            <ReadField label="Plan To"          value={VIEW.planTo} />
          </div>
          <div className="mb-6 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="Created Date"  value={VIEW.createdDate} />
            <ReadField label="Created By"    value={VIEW.createdBy} />
            <ReadField label="Approved Date" value={VIEW.approvedDate} />
            <ReadField label="Approved By"   value={VIEW.approvedBy} />
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ══ D&P Office Details ══ */}
          <div className="mt-5">
            <SectionHeader title="D&amp;P Office Details" />
            <div className="mb-4 grid grid-cols-1 gap-y-4 md:grid-cols-4">
              <ReadField label="D&amp;P Office Code / Name"      value={VIEW.dpOffice} />
              <ReadField label="Circle Code/Name"                 value={VIEW.circleCode} />
              <ReadField label="Product Category Code / Name"     value={VIEW.prodCategory} />
              <ReadField label="Product Group Code / Name"        value={VIEW.prodGroup} />
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-4 md:grid-cols-4">
              <ReadField label="Product Variety Code / Name" value={VIEW.prodVariety} />
              <ReadField label="UOM"                          value={VIEW.uom} />
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ══ Society Wise Production Plan Details (table) ══ */}
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <SectionHeader title="Society Wise Production Plan Details" />
              <div className="text-xs text-[#17a2b8]">
                Opening Stock Quantity : {totalOpening.toFixed(2)}, Current Requirement Quantity : {totalCurrent.toFixed(2)}
              </div>
            </div>

            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Society Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Opening Stock Qty</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Current Requirement Qty (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Quantity (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.societyCode}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle">
                        <input type="number" value={r.openingStockQty} readOnly
                          className="w-full rounded border border-stroke bg-gray-50 px-2 py-1 text-right text-sm dark:border-dark-3 dark:bg-gray-700 dark:text-white" />
                      </td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle">
                        <input type="number" value={r.currentReqQty} readOnly
                          className="w-full rounded border border-stroke bg-gray-50 px-2 py-1 text-right text-sm dark:border-dark-3 dark:bg-gray-700 dark:text-white" />
                      </td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.totalQty.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={2} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total:</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalOpening.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalCurrent.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalQty.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* bottom buttons */}
            <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
              <button onClick={() => setShowViewNote(true)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                View Note
              </button>
              <button onClick={() => router.push(`${basePath}/list`)}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ VIEW NOTE MODAL ══════ */}
      {showViewNote && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl">
            {/* outside carousel buttons */}
            <button className="absolute -left-5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-gray-700">
              <svg className="size-4 text-gray-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            </button>
            <button className="absolute -right-5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-gray-700">
              <svg className="size-4 text-gray-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
            </button>

            <div className="rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
              <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
                <h3 className="text-sm font-semibold text-white">View Note</h3>
                <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="p-5">
                {/* note content */}
                <div className="mb-4 min-h-[140px] rounded border border-stroke bg-gray-50 p-3 text-sm text-dark dark:border-dark-3 dark:bg-[#1a2232] dark:text-white">
                  test
                </div>

                {/* dot + < > nav */}
                <div className="mb-4 flex items-center justify-end gap-2">
                  <span className="size-2.5 rounded-full bg-[#17a2b8]"></span>
                  <button className="flex size-7 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                  </button>
                  <button className="flex size-7 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                  </button>
                </div>

                {/* Created By + Final Approved By cards — side by side */}
                <div className="mb-6 flex flex-wrap gap-4">
                  <div className="rounded border border-[#dc3545] p-4">
                    <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                    <div className="space-y-1 text-sm text-dark dark:text-white">
                      <p>Name : GOPI K.M</p>
                      <p>Designation : PROCUREMENT QUALITY CONTROL SUPERVISOR</p>
                      <p>Date : 08-09-2023</p>
                    </div>
                  </div>
                  <div className="rounded border border-[#dc3545] p-4">
                    <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Final Approved By</h5>
                    <div className="space-y-1 text-sm text-dark dark:text-white">
                      <p>Name : RAJ MOHAN R</p>
                      <p>Designation : JUNIOR ASSISTANT</p>
                      <p>Date : 08-09-2023</p>
                    </div>
                  </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-end">
                  <button onClick={() => setShowViewNote(false)}
                    className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Cancel
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
