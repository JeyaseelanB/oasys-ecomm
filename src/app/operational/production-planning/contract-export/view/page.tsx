"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductVariety {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  quantity: number;
  rate: number;
  value: number;
}

interface CommentItem {
  id: number;
  user: string;
  date: string;
  comment: string;
  action: string;
}

const PLAN_DATA = {
  planCode: "3356",
  planName: "OAP DIWALI23",
  planType: "Contract Sales",
  planFrom: "01-Oct-2023",
  planTo: "31-Oct-2023",
  dueDate: "25-Oct-2023",
  customerCodeName: "C001 / Tamil Nadu Govt",
  salesOrderNumber: "SO-2024-001",
  status: "APPROVED",
  forwardTo: "GM - Operations",
  forwardFor: "Approval",
  remarks: "Diwali season production plan for OAP scheme distribution across Tamil Nadu districts.",
};

const PRODUCTS: ProductVariety[] = [
  { id: 1, productVarietyCodeName: "BEA4 / BEDSHEET 60X90 ACRYLIC JACQUARD", uom: "NOS", quantity: 500, rate: 1240.00, value: 620000.00 },
  { id: 2, productVarietyCodeName: "TOW3 / TOWEL 30X60 COTTON PLAIN", uom: "NOS", quantity: 1000, rate: 350.00, value: 350000.00 },
  { id: 3, productVarietyCodeName: "SHW2 / SHAWL SILK EMBROIDERY", uom: "NOS", quantity: 200, rate: 2500.00, value: 500000.00 },
];

const COMMENTS: CommentItem[] = [
  { id: 1, user: "Admin User", date: "20-Oct-2023 10:30 AM", comment: "Plan submitted for review and approval.", action: "SUBMITTED" },
  { id: 2, user: "Manager - Production", date: "21-Oct-2023 02:15 PM", comment: "Reviewed the plan. Quantities are in line with demand forecast. Forwarding to GM.", action: "APPROVED" },
  { id: 3, user: "GM - Operations", date: "22-Oct-2023 11:00 AM", comment: "Final approval granted. Proceed with production.", action: "APPROVED" },
];

export default function ViewProductionPlanPage() {
  const router = useRouter();
  const basePath = "/operational/production-planning/contract-export";

  const [showSalesOrderModal, setShowSalesOrderModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showViewNoteModal, setShowViewNoteModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsTab, setCommentsTab] = useState<"approve" | "reject">("approve");
  const [newComment, setNewComment] = useState("");

  const totalQuantity = PRODUCTS.reduce((s, p) => s + p.quantity, 0);
  const totalValue = PRODUCTS.reduce((s, p) => s + p.value, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Production Plan</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Planning</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Contract / Export</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Production Plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Production Plan - {PLAN_DATA.planCode} / {PLAN_DATA.planName}</h3>
          <span className="inline-flex items-center rounded-sm bg-[#28a745] px-2 py-0.5 text-xs font-semibold text-white">{PLAN_DATA.status}</span>
        </div>

        <div className="p-5">
          {/* Plan Details View */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Plan Details</h4>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Plan Type</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.planType}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Plan Code / Name</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.planCode} / {PLAN_DATA.planName}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Customer Code / Name</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.customerCodeName}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Plan From</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.planFrom}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Plan To</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.planTo}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Due Date</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.dueDate}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Sales Order Number</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.salesOrderNumber}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Forward To</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.forwardTo}</span></div>
            <div><span className="block text-xs text-gray-500 dark:text-gray-400">Forward For</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.forwardFor}</span></div>
          </div>

          <div className="mb-6">
            <span className="block text-xs text-gray-500 dark:text-gray-400">Remarks</span>
            <span className="text-sm text-dark dark:text-white">{PLAN_DATA.remarks}</span>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Sales Order Details - Button Row */}
          <div className="mt-5 mb-4 flex flex-wrap items-center gap-3">
            <button onClick={() => setShowSalesOrderModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Sales Order
            </button>
            <button onClick={() => setShowCustomerModal(true)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Customer Details
            </button>
            <button onClick={() => setShowViewNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              View Note
            </button>
            <button onClick={() => setShowCommentsModal(true)} className="flex items-center gap-1.5 rounded bg-[#FFA70B] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Comments
            </button>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Product Variety Details Table */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Product Variety Details</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Product Variety Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Rate (&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Value (&#8377;)</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{item.productVarietyCodeName}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{item.uom}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.quantity.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.rate.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalQuantity.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalValue.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back to List
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* ===== SALES ORDER MODAL ===== */}
      {showSalesOrderModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Sales Order Details - {PLAN_DATA.salesOrderNumber}</h3>
              <button onClick={() => setShowSalesOrderModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Order Info */}
              <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div><span className="block text-xs text-gray-500">Order Number</span><span className="text-sm font-medium text-dark dark:text-white">{PLAN_DATA.salesOrderNumber}</span></div>
                <div><span className="block text-xs text-gray-500">Order Date</span><span className="text-sm font-medium text-dark dark:text-white">15-Sep-2023</span></div>
                <div><span className="block text-xs text-gray-500">Delivery Date</span><span className="text-sm font-medium text-dark dark:text-white">25-Oct-2023</span></div>
                <div><span className="block text-xs text-gray-500">Status</span><span className="inline-flex items-center rounded-sm bg-[#28a745] px-2 py-0.5 text-xs font-semibold text-white">CONFIRMED</span></div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-stroke p-3 dark:border-dark-3">
                  <h5 className="mb-2 text-xs font-semibold text-[#2d8f7b]">Raised From</h5>
                  <p className="text-sm text-dark dark:text-white">Co-optex Head Office</p>
                  <p className="text-xs text-gray-500">No.108, Armenian Street, Chennai - 600001</p>
                  <p className="text-xs text-gray-500">Tamil Nadu, India</p>
                </div>
                <div className="rounded border border-stroke p-3 dark:border-dark-3">
                  <h5 className="mb-2 text-xs font-semibold text-[#2d8f7b]">Raised To</h5>
                  <p className="text-sm text-dark dark:text-white">Tamil Nadu Government</p>
                  <p className="text-xs text-gray-500">Fort St. George, Chennai - 600009</p>
                  <p className="text-xs text-gray-500">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-stroke p-3 dark:border-dark-3">
                  <h5 className="mb-2 text-xs font-semibold text-[#2d8f7b]">Delivery Address</h5>
                  <p className="text-sm text-dark dark:text-white">Central Warehouse, Co-optex</p>
                  <p className="text-xs text-gray-500">No.55, Mount Road, Chennai - 600002</p>
                </div>
                <div className="rounded border border-stroke p-3 dark:border-dark-3">
                  <h5 className="mb-2 text-xs font-semibold text-[#2d8f7b]">Billing Address</h5>
                  <p className="text-sm text-dark dark:text-white">Tamil Nadu Government Treasury</p>
                  <p className="text-xs text-gray-500">Fort St. George, Chennai - 600009</p>
                </div>
              </div>

              {/* Product Details Table */}
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="w-10 border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Product</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HSN</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Qty</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Rate</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map((p, i) => (
                      <tr key={p.id} className={i % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{i + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{p.productVarietyCodeName}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">6302</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.quantity}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.rate.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* GST Summary */}
              <div className="mb-4 flex justify-end">
                <div className="w-72 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Sub Total</span><span className="font-medium text-dark dark:text-white">&#8377; {totalValue.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">CGST (9%)</span><span className="font-medium text-dark dark:text-white">&#8377; {(totalValue * 0.09).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">SGST (9%)</span><span className="font-medium text-dark dark:text-white">&#8377; {(totalValue * 0.09).toFixed(2)}</span></div>
                  <div className="flex justify-between border-t border-stroke pt-1 dark:border-dark-3"><span className="font-semibold text-dark dark:text-white">Grand Total</span><span className="font-semibold text-dark dark:text-white">&#8377; {(totalValue * 1.18).toFixed(2)}</span></div>
                </div>
              </div>

              <div className="mb-3 rounded border border-stroke p-3 dark:border-dark-3">
                <span className="block text-xs text-gray-500">Rupees in Words</span>
                <span className="text-sm font-medium text-dark dark:text-white">Seventeen Lakh Thirty Four Thousand Six Hundred Only</span>
              </div>

              <div className="mb-3 rounded border border-stroke p-3 dark:border-dark-3">
                <span className="block text-xs text-gray-500">Certified Terms &amp; Conditions</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">1. Delivery within 30 days from the date of order confirmation.</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2. Payment terms: 30 days from date of delivery.</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">3. Quality standards as per Co-optex specifications.</p>
              </div>

              <div className="flex justify-end">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Authorized Signatory</p>
                  <p className="mt-6 border-t border-stroke px-8 pt-1 text-sm font-medium text-dark dark:border-dark-3 dark:text-white">General Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== CUSTOMER DETAILS MODAL ===== */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#6c757d] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Customer Details</h3>
              <button onClick={() => setShowCustomerModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Credit Details */}
              <div className="mb-4">
                <h5 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  Credit Details
                </h5>
                <div className="grid grid-cols-2 gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <div><span className="block text-xs text-gray-500">Credit Limit</span><span className="text-sm font-medium text-dark dark:text-white">&#8377; 50,00,000.00</span></div>
                  <div><span className="block text-xs text-gray-500">Available Credit</span><span className="text-sm font-medium text-dark dark:text-white">&#8377; 35,00,000.00</span></div>
                  <div><span className="block text-xs text-gray-500">Credit Period</span><span className="text-sm font-medium text-dark dark:text-white">30 Days</span></div>
                  <div><span className="block text-xs text-gray-500">Outstanding Amount</span><span className="text-sm font-medium text-[#dc3545]">&#8377; 15,00,000.00</span></div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="mb-4">
                <h5 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  Bank Details
                </h5>
                <div className="grid grid-cols-2 gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <div><span className="block text-xs text-gray-500">Bank Name</span><span className="text-sm font-medium text-dark dark:text-white">State Bank of India</span></div>
                  <div><span className="block text-xs text-gray-500">Branch</span><span className="text-sm font-medium text-dark dark:text-white">Fort St. George, Chennai</span></div>
                  <div><span className="block text-xs text-gray-500">Account Number</span><span className="text-sm font-medium text-dark dark:text-white">3892XXXXXXXX456</span></div>
                  <div><span className="block text-xs text-gray-500">IFSC Code</span><span className="text-sm font-medium text-dark dark:text-white">SBIN0001234</span></div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h5 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  Contact Details
                </h5>
                <div className="grid grid-cols-2 gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <div><span className="block text-xs text-gray-500">Contact Person</span><span className="text-sm font-medium text-dark dark:text-white">Mr. Rajan Kumar</span></div>
                  <div><span className="block text-xs text-gray-500">Designation</span><span className="text-sm font-medium text-dark dark:text-white">Purchase Officer</span></div>
                  <div><span className="block text-xs text-gray-500">Phone</span><span className="text-sm font-medium text-dark dark:text-white">+91 44 2567 8900</span></div>
                  <div><span className="block text-xs text-gray-500">Email</span><span className="text-sm font-medium text-dark dark:text-white">purchase@tn.gov.in</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== VIEW NOTE MODAL ===== */}
      {showViewNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#28a745] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 rounded border border-stroke p-4 dark:border-dark-3">
                <div className="prose prose-sm max-w-none text-dark dark:text-white">
                  <h4 className="text-base font-semibold">Production Plan Note - {PLAN_DATA.planCode} / {PLAN_DATA.planName}</h4>
                  <p className="mt-2 text-sm">This production plan is created for the Diwali 2023 distribution under the Old Age Pension (OAP) scheme. The plan covers the production of handloom products to be distributed across various districts of Tamil Nadu.</p>
                  <p className="mt-2 text-sm"><strong>Key Highlights:</strong></p>
                  <ul className="mt-1 list-disc pl-5 text-sm">
                    <li>Total products: 3 varieties covering Bedsheets, Towels, and Shawls</li>
                    <li>Total quantity: 1,700 units across all varieties</li>
                    <li>Total estimated value: &#8377; 14,70,000.00</li>
                    <li>Production period: October 2023</li>
                    <li>Distribution to cover 15 districts</li>
                  </ul>
                  <p className="mt-2 text-sm"><strong>Quality Requirements:</strong></p>
                  <p className="text-sm">All products must meet Co-optex Grade A quality standards with proper labeling and packaging as per government specifications.</p>
                </div>
              </div>

              <div className="rounded border border-stroke p-3 dark:border-dark-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs text-gray-500">Final Approved By</span>
                    <span className="text-sm font-medium text-dark dark:text-white">GM - Operations (Mr. Shankar Narayanan)</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-500">Approved Date</span>
                    <span className="text-sm font-medium text-dark dark:text-white">22-Oct-2023 11:00 AM</span>
                  </div>
                </div>
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

              {/* Comment History */}
              <div className="mb-4 max-h-60 space-y-3 overflow-y-auto">
                {COMMENTS.map((c) => (
                  <div key={c.id} className="rounded border border-stroke p-3 dark:border-dark-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-dark dark:text-white">{c.user}</span>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold ${c.action === "APPROVED" ? "bg-[#28a745] text-white" : c.action === "REJECTED" ? "bg-[#dc3545] text-white" : "bg-[#FFA70B] text-white"}`}>{c.action}</span>
                        <span className="text-xs text-gray-500">{c.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{c.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="mb-4">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Add Comment <span className="text-red-500">*</span></label>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" placeholder="Enter your comment..." />
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
