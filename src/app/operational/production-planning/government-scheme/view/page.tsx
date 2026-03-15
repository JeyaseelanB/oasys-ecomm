"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const PLAN_DATA = {
  planTypeCodeName: "OAP / Old Age Pension Scheme",
  schemeName: "test",
  referenceNumber: "45478946",
  schemePeriod: "Pongal",
  planFrom: "25-Feb-2025",
  planTo: "27-Feb-2025",
};

const CIRCLE_DATA = [
  { id: 1, circleCodeName: "55 / ERODE", productGroup: "FDS HANDLOOM", productVariety: "PEDALLOOM DHOTHY LCD1 CFDS2021", currentYearQty: 11.00, openingStockQty: 11.00 },
];

export default function ViewGovernmentSchemeProductionPlanPage() {
  const router = useRouter();
  const basePath = "/operational/production-planning/government-scheme";

  const [showViewNote, setShowViewNote] = useState(false);

  const totalCurrentYear = CIRCLE_DATA.reduce((s, c) => s + c.currentYearQty, 0);
  const totalOpeningStock = CIRCLE_DATA.reduce((s, c) => s + c.openingStockQty, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Production Plan</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Planning</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Government Scheme</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Production Plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Government Scheme Production Plan</h3>
          <button className="text-white/80 hover:text-white"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /></svg></button>
        </div>

        <div className="p-5">
          {/* Plan Details - Read Only */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan Type Code / Name</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.planTypeCodeName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Scheme Name</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.schemeName}</span>
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Reference Number</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.referenceNumber}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Scheme Period</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.schemePeriod}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan From</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.planFrom}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan To</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.planTo}</span>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Circle wise Production Details - Current Year Production */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Circle wise Production Details - Current Year Production</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th rowSpan={2} className="w-12 border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">#</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Circle Code/Name</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">FDS HANDLOOM</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Total (&#8377;)</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Grand Total (&#8377;)</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">PEDALLOOM DHOTHY LCD1 CFDS2021</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {CIRCLE_DATA.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.circleCodeName}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.currentYearQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white"></td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{row.currentYearQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-[#17a2b8] font-medium dark:border-dark-3">{row.currentYearQty.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">TOTAL</td>
                  <td className="border border-stroke px-2 py-2 text-center font-semibold text-dark dark:border-dark-3 dark:text-white">{totalCurrentYear.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalCurrentYear.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-[#17a2b8] dark:border-dark-3">{totalCurrentYear.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Circle wise Production Details - Opening Stock Quantity */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Circle wise Production Details - Opening Stock Quantity</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th rowSpan={2} className="w-12 border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">#</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Circle Code/Name</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">FDS HANDLOOM</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Total (&#8377;)</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Grand Total (&#8377;)</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">PEDALLOOM DHOTHY LCD1 CFDS2021</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {CIRCLE_DATA.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.circleCodeName}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.openingStockQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white"></td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{row.openingStockQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-[#17a2b8] font-medium dark:border-dark-3">{row.openingStockQty.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-2 py-2 text-center font-semibold text-dark dark:border-dark-3 dark:text-white">{totalOpeningStock.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalOpeningStock.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-[#17a2b8] dark:border-dark-3">{totalOpeningStock.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Forward To / For - Read Only */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg></IconBox>
                <div className="flex w-full items-center rounded-r border border-stroke bg-transparent px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white"></div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg></IconBox>
                <div className="flex w-full items-center rounded-r border border-stroke bg-transparent px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white">Final Approve</div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowViewNote(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              View Note
            </button>
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" /></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ===== VIEW NOTE MODAL ===== */}
      {showViewNote && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Rich text toolbar (decorative/read-only) */}
              <div className="mb-0 rounded-t border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-[#f9fafb] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm font-bold">B</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm italic">I</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm underline">U</span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm line-through">abc</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sup>2</sup></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">T</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">T<sub>-</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>1</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">T</span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" /></svg></button>
                </div>
              </div>
              {/* Note content */}
              <div className="mb-4 min-h-[120px] rounded-b border border-t-0 border-stroke p-3 dark:border-dark-3">
                <p className="text-sm text-dark dark:text-white">fff cc</p>
              </div>

              {/* Pagination dots */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-2.5 rounded-full bg-[#17a2b8]"></span>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6" /></svg></button>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6" /></svg></button>
              </div>

              {/* Created By and Final Approved By side by side */}
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-[#e8a87c] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p>Name : SANKARANARAYANAN C</p>
                    <p>Designation : ASSISTANT SALES MAN</p>
                    <p>Date : 25-02-2025</p>
                  </div>
                </div>
                <div className="rounded border border-[#e8a87c] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Final Approved By</h5>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p>Name : USHA M</p>
                    <p>Designation : JUNIOR ASSISTANT</p>
                    <p>Date : 25-02-2025</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button onClick={() => setShowViewNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
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
