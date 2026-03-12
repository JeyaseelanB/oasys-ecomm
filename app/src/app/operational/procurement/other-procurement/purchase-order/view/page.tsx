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

/* ── mock data ───────────────────────────────────────────────────── */
const VIEW_DATA = {
  planCode:       "test plan 2023-24",
  society:        "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",
  shippingAddr:   "NO.212, GANDHI ROAD, GANDHI ROAD, CHITTOOR, CHITTOOR, ANDHRA PRADESH - 517 501 India",
  billingAddr:    "",
  validityDate:   "11-Mar-2026",
  deliveryDate:   "19-Mar-2026",
  termsConditions: "",
};

const TABLE_ROWS = [
  {
    id: 1,
    variety:    "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK",
    atNumber:   "",
    uom:        "NOS",
    hsnCode:    "50072090",
    unit:       0,
    unitPrice:  2500.00,
    totalAmount: 0.00,
  },
];

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */
export default function ViewPurchaseOrderPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/purchase-order";

  const [showViewNote, setShowViewNote]     = useState(false);
  const [showComments, setShowComments]     = useState(false);
  const [activeTab, setActiveTab]           = useState<"approve" | "reject">("approve");

  const totalAmount = TABLE_ROWS.reduce((s, r) => s + r.totalAmount, 0);

  /* comment rows (reject tab) */
  const COMMENT_ROWS = [
    { reply: "", givenBy: "ADMIN USER", givenDate: "12-DEC-2017" },
  ];

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Purchase Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Purchase Order</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Purchase Order</h3>
          <button className="text-white hover:opacity-80">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <div className="p-5">
          {/* Row 1: 4-col read fields */}
          <div className="mb-4 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="Plan Code / Name"  value={VIEW_DATA.planCode} />
            <ReadField label="Society Code / Name" value={VIEW_DATA.society} />
            <ReadField label="Shipping Address"  value={VIEW_DATA.shippingAddr} />
            <ReadField label="Billing Address"   value={VIEW_DATA.billingAddr} />
          </div>
          {/* Row 2: 2-col */}
          <div className="mb-6 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="Purchase Order Valid Date"    value={VIEW_DATA.validityDate} />
            <ReadField label="Expected Date of Delivery"   value={VIEW_DATA.deliveryDate} />
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Product Variety Details */}
          <div className="mt-5">
            <SectionHeader title="Product Variety Details" />
            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">AT Number</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">HSN Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Unit</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Unit Price (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.variety}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.atNumber}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.uom}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.hsnCode}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.unit}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.unitPrice.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={7} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total :</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
              <SectionHeader title="Terms &amp; Conditions" />
              <div className="min-h-[80px] rounded border border-stroke p-3 text-sm text-dark dark:border-dark-3 dark:text-white">
                {VIEW_DATA.termsConditions || ""}
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setShowViewNote(true)}
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  View Note
                </button>
                <button onClick={() => setShowComments(true)}
                  className="flex size-10 items-center justify-center rounded-full bg-[#17a2b8] text-white hover:opacity-90">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => router.push(`${basePath}/list`)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => router.push(`${basePath}/preview`)}
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="6,9 6,2 18,2 18,9"/><path d="M6,18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                  Preview
                </button>
              </div>
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
                <div className="mb-4 min-h-[120px] rounded border border-stroke p-3 text-sm text-dark dark:border-dark-3 dark:text-white">
                  Approve
                </div>

                {/* dot + arrows row */}
                <div className="mb-4 flex items-center justify-end gap-2">
                  <span className="size-2.5 rounded-full bg-[#17a2b8]"></span>
                  <button className="flex size-7 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                  </button>
                  <button className="flex size-7 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                  </button>
                </div>

                {/* Final Approved By card */}
                <div className="mb-6">
                  <div className="inline-block rounded border border-[#FFA70B] p-4">
                    <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Final Approved By</h5>
                    <div className="space-y-1 text-sm text-dark dark:text-white">
                      <p>Name : </p>
                      <p>Designation : ASSISTANT SALES WOMEN</p>
                      <p>Date : 11-Mar-2026</p>
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

      {/* ══════ COMMENTS MODAL ══════ */}
      {showComments && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            {/* header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowComments(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="p-5">
              {/* tabs */}
              <div className="mb-4 flex border-b border-stroke dark:border-dark-3">
                <button
                  onClick={() => setActiveTab("approve")}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium ${activeTab === "approve" ? "border-b-2 border-[#dc3545] text-[#dc3545]" : "text-gray-500 hover:text-dark dark:text-gray-400"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
                    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                  </svg>
                  Approve
                </button>
                <button
                  onClick={() => setActiveTab("reject")}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium ${activeTab === "reject" ? "border-b-2 border-[#dc3545] text-[#dc3545]" : "text-gray-500 hover:text-dark dark:text-gray-400"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/>
                    <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/>
                  </svg>
                  Reject
                </button>
              </div>

              {/* Approve tab */}
              {activeTab === "approve" && (
                <div>
                  <div className="mb-4">
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Comment</label>
                    <textarea rows={4}
                      className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                      placeholder="Enter approval comment..."
                    />
                  </div>
                </div>
              )}

              {/* Reject tab */}
              {activeTab === "reject" && (
                <div>
                  <div className="mb-4 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#2d8f7b] text-white">
                          <th className="border border-[#3aa88f] px-3 py-2.5 text-left font-semibold">Reply Comment</th>
                          <th className="border border-[#3aa88f] px-3 py-2.5 text-left font-semibold">Given By</th>
                          <th className="border border-[#3aa88f] px-3 py-2.5 text-left font-semibold">Given Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMMENT_ROWS.map((c, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                            <td className="border border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{c.reply}</td>
                            <td className="border border-stroke px-3 py-2 dark:border-dark-3">
                              <span className="rounded border border-[#28a745] px-2 py-0.5 text-xs font-semibold text-[#28a745]">{c.givenBy}</span>
                            </td>
                            <td className="border border-stroke px-3 py-2 dark:border-dark-3">
                              <span className="rounded border border-[#dc3545] px-2 py-0.5 text-xs font-semibold text-[#dc3545]">{c.givenDate}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mb-4">
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Rejection Comment</label>
                    <textarea rows={3}
                      className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                      placeholder="Enter rejection reason..."
                    />
                  </div>
                </div>
              )}

              {/* footer */}
              <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
                <button onClick={() => setShowComments(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
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
