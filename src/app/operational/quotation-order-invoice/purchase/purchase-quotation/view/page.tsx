"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductVarietyItem {
  id: number;
  itemCodeName: string;
  quantity: string;
  unitRate: string;
  total: string;
  discountValue: string;
  taxValue: string;
  netAmount: string;
}

const SAMPLE_PRODUCT_ITEMS: ProductVarietyItem[] = [
  { id: 1, itemCodeName: "ASWS / ANGAVAS SALEM WOVEN SILK PURE SILK", quantity: "1.0", unitRate: "100.00", total: "0.00", discountValue: "-100.00", taxValue: "17.00", netAmount: "117.00" },
];

export default function ViewPurchaseQuotationPage() {
  const router = useRouter();

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [activeCommentTab, setActiveCommentTab] = useState<"approve" | "reject">("approve");

  const totalQuantity = SAMPLE_PRODUCT_ITEMS.reduce((s, p) => s + parseFloat(p.quantity), 0).toFixed(2);
  const totalUnitRate = SAMPLE_PRODUCT_ITEMS.reduce((s, p) => s + parseFloat(p.unitRate), 0).toFixed(2);
  const totalTotal = SAMPLE_PRODUCT_ITEMS.reduce((s, p) => s + parseFloat(p.total), 0).toFixed(2);
  const totalDiscount = SAMPLE_PRODUCT_ITEMS.reduce((s, p) => s + parseFloat(p.discountValue), 0).toFixed(2);
  const totalTax = SAMPLE_PRODUCT_ITEMS.reduce((s, p) => s + parseFloat(p.taxValue), 0).toFixed(2);
  const totalNetAmount = SAMPLE_PRODUCT_ITEMS.reduce((s, p) => s + parseFloat(p.netAmount), 0).toFixed(2);

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Purchase Quotation
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Purchase</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Purchase Quotation</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <span className="font-semibold text-white">Purchase Quotation</span>
        </div>

        <div className="p-5">
          {/* Supplier Info Row */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Supplier Type Code / Name</p>
              <div className="border-b border-stroke pb-1 dark:border-dark-3"></div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Supplier Code / Name</p>
              <p className="text-sm text-primary">/</p>
              <div className="border-b border-stroke pb-1 dark:border-dark-3"></div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">GSTIN Number</p>
              <div className="border-b border-stroke pb-1 dark:border-dark-3"></div>
            </div>
          </div>

          {/* Reference Row */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Quotation Reference Number</p>
              <p className="text-sm font-medium text-primary">2</p>
              <div className="border-b border-stroke pb-1 dark:border-dark-3"></div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Quotation Reference Date</p>
              <div className="border-b border-stroke pb-1 dark:border-dark-3"></div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">PAN Number</p>
              <div className="border-b border-stroke pb-1 dark:border-dark-3"></div>
            </div>
          </div>

          {/* Product Variety Details */}
          <div className="mb-4 flex items-center gap-2">
            <svg className="size-5 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h3 className="text-base font-semibold text-dark dark:text-white">Product Variety Details</h3>
          </div>

          <div className="mb-6 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Item Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Unit Rate (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Total (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Discount Value (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Tax Value (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Net Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_PRODUCT_ITEMS.map((item, idx) => (
                  <tr key={item.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                    <td className="border-r border-stroke px-3 py-2 text-center text-primary dark:border-dark-3">{idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.itemCodeName}</td>
                    <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.quantity}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.unitRate}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.total}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.discountValue}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.taxValue}</td>
                    <td className="px-3 py-2 text-right text-primary">{item.netAmount}</td>
                  </tr>
                ))}
                <tr className="bg-[#f0f0f0] font-semibold dark:bg-[#1a2232]">
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3" colSpan={2}>Total</td>
                  <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{totalQuantity}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totalUnitRate}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totalTotal}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totalDiscount}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totalTax}</td>
                  <td className="px-3 py-2 text-right">{totalNetAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms & Remarks */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Terms &amp; Conditions</p>
              <div className="min-h-[48px] rounded border border-stroke bg-[#f5f5f5] px-3 py-2 dark:border-dark-3 dark:bg-[#1a2232]"></div>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Remarks</p>
              <div className="min-h-[48px] rounded border border-stroke bg-[#f5f5f5] px-3 py-2 dark:border-dark-3 dark:bg-[#1a2232]"></div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between rounded-b-[10px] border-t border-stroke px-5 py-4 dark:border-dark-3">
          <div className="flex gap-2">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
              View Note
            </button>
            <button onClick={() => setShowCommentsModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            </button>
          </div>
          <button onClick={() => router.push("/operational/quotation-order-invoice/purchase/purchase-quotation/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6" /></svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <span className="font-semibold text-white">View Note</span>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="min-h-[120px] rounded border border-stroke bg-[#f8f9fa] px-3 py-2 text-sm text-gray-400 dark:border-dark-3 dark:bg-[#1a2232]">
                Enter text ...
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div></div>
                <div className="flex gap-2">
                  <button className="flex size-8 items-center justify-center rounded border border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
                  <button className="flex size-8 items-center justify-center rounded border border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t border-stroke px-5 py-4 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <span className="font-semibold text-white">Comments</span>
              <button onClick={() => setShowCommentsModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Tabs */}
              <div className="mb-4 flex border-b border-stroke dark:border-dark-3">
                <button
                  onClick={() => setActiveCommentTab("approve")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeCommentTab === "approve" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-dark dark:text-gray-400 dark:hover:text-white"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /></svg>
                  Approve
                </button>
                <button
                  onClick={() => setActiveCommentTab("reject")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeCommentTab === "reject" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-dark dark:text-gray-400 dark:hover:text-white"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" /></svg>
                  Reject
                </button>
              </div>
              <div className="min-h-[80px] rounded border border-stroke bg-[#f8f9fa] px-3 py-2 text-sm text-gray-400 dark:border-dark-3 dark:bg-[#1a2232]">
                {activeCommentTab === "approve" ? "Enter approval comment..." : "Enter rejection reason..."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
