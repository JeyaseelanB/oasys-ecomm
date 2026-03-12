"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductItem {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  quantity: number;
  value: number;
  unitRate: number;
}

const PLAN_DATA = {
  planCode: "APP-SEP-25-73",
  planName: "Prodcution plan",
  planFrom: "01-Sep-2025",
  planTo: "09-Sep-2025",
  planFor: "Showroom",
  regionalOfficeCodeName: "16 / CHENNAI",
  showroomCodeName: "1632 / T.NAGAR",
  validityDate: "16-Sep-2025",
  requestFrom: "2355/VIJAYAKUMARANJ",
  requestDate: "01-Sep-2025",
  reason: "",
  status: "FINAL_APPROVED",
};

const PRODUCTS: ProductItem[] = [
  { id: 1, productVarietyCodeName: "SKBS/SAREES KPM SILK WITH BLOUSE", uom: "NOS", quantity: 1000, value: 25000.00, unitRate: 25000000.00 },
];

export default function ViewAdditionalProductionPlanPage() {
  const router = useRouter();
  const basePath = "/operational/production-planning/additional-production-plan";

  const [showViewNoteModal, setShowViewNoteModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsTab, setCommentsTab] = useState<"approve" | "reject">("approve");

  const totalQuantity = PRODUCTS.reduce((s, p) => s + p.quantity, 0);
  const totalValue = PRODUCTS.reduce((s, p) => s + p.value, 0);
  const totalUnitRate = PRODUCTS.reduce((s, p) => s + p.unitRate, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Additional Production Plan</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Production Plan</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Additional Production Plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Additional Production Plan</h3>
        </div>

        <div className="p-5">
          {/* Plan Details */}
          <div className="mb-4 grid grid-cols-1 gap-y-4 md:grid-cols-3">
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan Name</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.planName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan From</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.planFrom}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan To</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.planTo}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan For</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.planFor}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Regional Office Code / Name</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.regionalOfficeCodeName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Showroom Code / Name</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.showroomCodeName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Validity Date</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.validityDate}</span>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Plan Request Details */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Plan Request Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Request From</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.requestFrom}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Request Date</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.requestDate}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Reason</span>
              <span className="text-sm font-medium text-[#17a2b8]">{PLAN_DATA.reason}</span>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Product Details Table */}
          <div className="mt-5 mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Product Variety Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Unit Rate</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{item.productVarietyCodeName}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{item.uom}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.quantity.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.value.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.unitRate.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalQuantity.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalValue.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalUnitRate.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowViewNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                View  Note
              </button>
              <button onClick={() => setShowCommentsModal(true)} className="flex size-10 items-center justify-center rounded-full bg-[#17a2b8] text-white hover:opacity-90">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ===== VIEW NOTE MODAL ===== */}
      {showViewNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note content area */}
              <div className="mb-4 min-h-[160px] rounded border border-stroke p-4 dark:border-dark-3">
                <p className="text-sm text-dark dark:text-white">test</p>
              </div>

              {/* Pagination dot + arrows */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-2.5 rounded-full bg-[#17a2b8]"></span>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg></button>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></button>
              </div>

              {/* SUBMITTED and FINAL APPROVED sections */}
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-stroke p-4 dark:border-dark-3">
                  <h5 className="mb-2 text-center text-sm font-bold text-dark dark:text-white">SUBMITTED</h5>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p>Name : SANKARANARAYANAN C</p>
                    <p>Designation : SUPERINTENDENT</p>
                    <p>Date : 08-Sep-2025</p>
                  </div>
                </div>
                <div className="rounded border border-stroke p-4 dark:border-dark-3">
                  <h5 className="mb-2 text-center text-sm font-bold text-dark dark:text-white">FINAL APPROVED</h5>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p>Name : USHA M</p>
                    <p>Designation : AUDITOR</p>
                    <p>Date : 08-Sep-2025</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button onClick={() => setShowViewNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== COMMENTS MODAL (Approve / Reject) ===== */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowCommentsModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Tabs */}
              <div className="mb-4 flex border-b border-stroke dark:border-dark-3">
                <button
                  onClick={() => setCommentsTab("approve")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium ${commentsTab === "approve" ? "border-b-2 border-[#28a745] text-[#28a745]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
                  Approve
                </button>
                <button
                  onClick={() => setCommentsTab("reject")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium ${commentsTab === "reject" ? "border-b-2 border-[#dc3545] text-[#dc3545]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>
                  Reject
                </button>
              </div>

              {/* Comments table */}
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="border border-[#3aa88f] px-3 py-2 text-left font-semibold w-1/4">
                        {commentsTab === "approve" ? "Approve" : "Reject"} Comments
                      </th>
                      <th className="border border-[#3aa88f] px-3 py-2 text-left font-semibold w-1/4">Given By</th>
                      <th className="border border-[#3aa88f] px-3 py-2 text-left font-semibold w-1/4">Given Date</th>
                      <th className="border border-[#3aa88f] px-3 py-2 text-left font-semibold w-1/4">CC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commentsTab === "approve" ? (
                      <tr className="bg-white dark:bg-gray-dark">
                        <td className="border border-stroke px-3 py-3 align-top text-dark dark:border-dark-3 dark:text-white">
                          Approve Comments
                        </td>
                        <td className="border border-stroke px-3 py-3 align-top dark:border-dark-3">
                          <span className="inline-flex items-center rounded border border-[#28a745] px-2 py-0.5 text-xs font-semibold text-[#28a745]">USHA M</span>
                        </td>
                        <td className="border border-stroke px-3 py-3 align-top dark:border-dark-3">
                          <span className="inline-flex items-center rounded border border-[#dc3545] px-2 py-0.5 text-xs font-semibold text-[#dc3545]">08-SEP-2025</span>
                        </td>
                        <td className="border border-stroke px-3 py-3 align-top text-dark dark:border-dark-3 dark:text-white">
                          cc
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={4} className="border border-stroke px-3 py-4 text-center text-gray-400 dark:border-dark-3">No reject comments found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setShowCommentsModal(false)} className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Cancel</button>
                {commentsTab === "approve" ? (
                  <button className="rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Approve</button>
                ) : (
                  <button className="rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Reject</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
