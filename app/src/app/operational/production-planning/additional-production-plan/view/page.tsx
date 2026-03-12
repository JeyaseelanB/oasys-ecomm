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

interface CommentItem {
  id: number;
  user: string;
  date: string;
  comment: string;
  action: string;
}

const PLAN_DATA = {
  planCode: "APP-SEP-25-73",
  planName: "Production plan",
  planFrom: "01-Sep-2025",
  planTo: "09-Sep-2025",
  planFor: "Showroom",
  regionalOfficeCodeName: "RO-001 / Chennai Regional Office",
  showroomCodeName: "SR-045 / Co-optex Anna Salai Showroom",
  validityDate: "16-Sep-2025",
  requestFrom: "GM - Operations",
  requestDate: "28-Aug-2025",
  reason: "Additional stock required for festive season demand",
  status: "FINAL_APPROVED",
};

const PRODUCTS: ProductItem[] = [
  { id: 1, productVarietyCodeName: "BEA4 / BEDSHEET 60X90 ACRYLIC JACQUARD", uom: "NOS", quantity: 500, value: 620000.00, unitRate: 1240.00 },
  { id: 2, productVarietyCodeName: "TOW3 / TOWEL 30X60 COTTON PLAIN", uom: "NOS", quantity: 1000, value: 350000.00, unitRate: 350.00 },
  { id: 3, productVarietyCodeName: "SHW2 / SHAWL SILK EMBROIDERY", uom: "NOS", quantity: 200, value: 500000.00, unitRate: 2500.00 },
];

const COMMENTS: CommentItem[] = [
  { id: 1, user: "Admin User", date: "29-Aug-2025 10:30 AM", comment: "Plan submitted for review and approval.", action: "SUBMITTED" },
  { id: 2, user: "Manager - Production", date: "01-Sep-2025 02:15 PM", comment: "Reviewed the plan. Quantities are in line with demand forecast. Forwarding to GM.", action: "APPROVED" },
  { id: 3, user: "GM - Operations", date: "02-Sep-2025 11:00 AM", comment: "Final approval granted. Proceed with production.", action: "APPROVED" },
];

export default function ViewAdditionalProductionPlanPage() {
  const router = useRouter();
  const basePath = "/operational/production-planning/additional-production-plan";

  const [showViewNoteModal, setShowViewNoteModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsTab, setCommentsTab] = useState<"approve" | "reject">("approve");
  const [ccText, setCcText] = useState("");

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
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Plan</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Additional Production Plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Additional Production Plan - {PLAN_DATA.planCode} / {PLAN_DATA.planName}</h3>
          <span className="inline-flex items-center rounded-sm bg-[#28a745] px-2 py-0.5 text-xs font-semibold text-white">{PLAN_DATA.status}</span>
        </div>

        <div className="p-5">
          {/* Plan Details */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan Name</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.planName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan From</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.planFrom}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan To</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.planTo}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan For</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.planFor}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Regional Office Code / Name</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.regionalOfficeCodeName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Showroom Code / Name</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.showroomCodeName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Validity Date</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.validityDate}</span>
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
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.requestFrom}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Request Date</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.requestDate}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Reason</span>
              <span className="text-sm font-medium text-[#2d8f7b]">{PLAN_DATA.reason}</span>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Product Details Table */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Product Details</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
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
              <button onClick={() => setShowViewNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                View Note
              </button>
              <button onClick={() => setShowCommentsModal(true)} className="flex size-10 items-center justify-center rounded-full bg-[#FFA70B] text-white hover:opacity-90">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
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
            <div className="flex items-center justify-between rounded-t-lg bg-[#28a745] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note Content */}
              <div className="mb-4 rounded border border-stroke p-4 dark:border-dark-3">
                <div className="prose prose-sm max-w-none text-dark dark:text-white">
                  <p className="text-sm">This additional production plan is created for the festive season demand at Anna Salai Showroom. The plan covers the production of handloom products to meet the increased demand during September 2025.</p>
                  <p className="mt-2 text-sm"><strong>Key Highlights:</strong></p>
                  <ul className="mt-1 list-disc pl-5 text-sm">
                    <li>Total products: 3 varieties covering Bedsheets, Towels, and Shawls</li>
                    <li>Total quantity: 1,700 units across all varieties</li>
                    <li>Total estimated value: &#8377; 14,70,000.00</li>
                    <li>Production period: September 2025</li>
                  </ul>
                </div>
              </div>

              {/* SUBMITTED and FINAL APPROVED sections side by side */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-stroke p-4 dark:border-dark-3">
                  <div className="mb-3 flex items-center justify-center">
                    <span className="inline-flex items-center rounded bg-[#FFA70B] px-3 py-1 text-[11px] font-semibold text-white">SUBMITTED</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p><span className="text-gray-500">Name :</span> SANKARANARAYANAN</p>
                    <p><span className="text-gray-500">Designation :</span> SUPERINTENDENT</p>
                    <p><span className="text-gray-500">Date :</span> 29-Aug-2025</p>
                  </div>
                </div>
                <div className="rounded border border-stroke p-4 dark:border-dark-3">
                  <div className="mb-3 flex items-center justify-center">
                    <span className="inline-flex items-center rounded bg-[#28a745] px-3 py-1 text-[11px] font-semibold text-white">FINAL APPROVED</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p><span className="text-gray-500">Name :</span> RAJAGOPAL</p>
                    <p><span className="text-gray-500">Designation :</span> GENERAL MANAGER</p>
                    <p><span className="text-gray-500">Date :</span> 02-Sep-2025</p>
                  </div>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-2.5 rounded-full bg-[#28a745]"></span>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg></button>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></button>
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

      {/* ===== COMMENTS MODAL (Approve/Reject Tabs) ===== */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#FFA70B] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments - Approve / Reject</h3>
              <button onClick={() => setShowCommentsModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Tabs */}
              <div className="mb-4 flex border-b border-stroke dark:border-dark-3">
                <button onClick={() => setCommentsTab("approve")} className={`px-4 py-2 text-sm font-medium ${commentsTab === "approve" ? "border-b-2 border-[#28a745] text-[#28a745]" : "text-gray-500 hover:text-gray-700"}`}>
                  <svg className="mr-1.5 inline size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Approve
                </button>
                <button onClick={() => setCommentsTab("reject")} className={`px-4 py-2 text-sm font-medium ${commentsTab === "reject" ? "border-b-2 border-[#dc3545] text-[#dc3545]" : "text-gray-500 hover:text-gray-700"}`}>
                  <svg className="mr-1.5 inline size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Reject
                </button>
              </div>

              {/* Comments Table */}
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">{commentsTab === "approve" ? "Approve" : "Reject"} Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMMENTS.filter(c => commentsTab === "approve" ? c.action !== "REJECTED" : c.action === "REJECTED").map((c) => (
                      <tr key={c.id} className="border-b border-stroke dark:border-dark-3">
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-dark dark:text-white">{c.user}</span>
                            <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold ${c.action === "APPROVED" ? "bg-[#28a745] text-white" : c.action === "REJECTED" ? "bg-[#dc3545] text-white" : "bg-[#FFA70B] text-white"}`}>{c.action}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{c.comment}</p>
                          <p className="mt-1 text-[10px] text-gray-400">{c.date}</p>
                        </td>
                      </tr>
                    ))}
                    {COMMENTS.filter(c => commentsTab === "approve" ? c.action !== "REJECTED" : c.action === "REJECTED").length === 0 && (
                      <tr><td className="border border-stroke px-3 py-4 text-center text-gray-400 dark:border-dark-3">No {commentsTab} comments found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Given By */}
              <div className="mb-3">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Given By</label>
                <div className="rounded border border-stroke px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white">SANKARANARAYANAN - SUPERINTENDENT</div>
              </div>

              {/* Given Date */}
              <div className="mb-3">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Given Date</label>
                <div className="rounded border border-stroke px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white">11-Mar-2026</div>
              </div>

              {/* CC */}
              <div className="mb-4">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">CC</label>
                <textarea value={ccText} onChange={(e) => setCcText(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" placeholder="Enter CC..." />
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
