"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ViewField = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
    <p className={`text-sm font-medium ${highlight ? "text-[#2d8f7b]" : "text-dark dark:text-white"}`}>
      {value || "—"}
    </p>
  </div>
);

interface ItemRow {
  id: number;
  varietyCode: string;
  varietyName: string;
  itemName: string;
  description: string;
  qty: number;
  itemAmount: number;
  totalRate: number;
  discountValue: number;
  balanceValue: number;
  cgst: number;
  sgst: number;
  netAmount: number;
}

interface NoteItem {
  title: string;
  content: string;
  date: string;
  author: string;
  initials: string;
}

const ITEM_ROWS: ItemRow[] = [
  {
    id: 1,
    varietyCode: "PV-001",
    varietyName: "Cotton Plain Weave",
    itemName: "Cotton Fabric",
    description: "High quality cotton plain weave for uniform",
    qty: 500,
    itemAmount: 75000,
    totalRate: 150,
    discountValue: 3750,
    balanceValue: 71250,
    cgst: 6412.5,
    sgst: 6412.5,
    netAmount: 84075,
  },
  {
    id: 2,
    varietyCode: "PV-002",
    varietyName: "Polyester Blend",
    itemName: "Polyester Mix",
    description: "Durable polyester blend fabric",
    qty: 300,
    itemAmount: 45000,
    totalRate: 150,
    discountValue: 2250,
    balanceValue: 42750,
    cgst: 3847.5,
    sgst: 3847.5,
    netAmount: 50445,
  },
];

const NOTES: NoteItem[] = [
  {
    title: "Supplier Delivery Confirmation",
    content: "Supplier has confirmed delivery for the next batch. All items verified for quality standards before dispatch.",
    date: "15 Jan 2025",
    author: "Purchase Manager",
    initials: "PM",
  },
  {
    title: "Invoice Verification",
    content: "Invoice cross-checked with purchase order. Minor discrepancy in HSN code corrected by supplier.",
    date: "16 Jan 2025",
    author: "Accounts Team",
    initials: "AT",
  },
];

const TDS_DETAILS = {
  tdsPercent: "2.00",
  tdsValue: "2280.00",
  cgstTdsPercent: "2.00",
  cgstTdsValue: "204.60",
  sgstTdsPercent: "2.00",
  sgstTdsValue: "204.60",
};

export default function ViewBillPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [activeNote, setActiveNote] = useState(0);

  const totalItemAmount = ITEM_ROWS.reduce((s, r) => s + r.itemAmount, 0);
  const totalDiscount = ITEM_ROWS.reduce((s, r) => s + r.discountValue, 0);
  const totalBalance = ITEM_ROWS.reduce((s, r) => s + r.balanceValue, 0);
  const totalCGST = ITEM_ROWS.reduce((s, r) => s + r.cgst, 0);
  const totalSGST = ITEM_ROWS.reduce((s, r) => s + r.sgst, 0);
  const totalNet = ITEM_ROWS.reduce((s, r) => s + r.netAmount, 0);

  return (
    <div className="mx-auto max-w-screen-xl p-4 md:p-6 2xl:p-10">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark dark:text-white">View Bill</h2>
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          Home &rsaquo; Operational &rsaquo; Quotation/Order/Invoice &rsaquo; Purchase &rsaquo;{" "}
          <span className="text-[#2d8f7b]">Bill</span>
        </nav>
      </div>

      {/* ── Bill Information Card ── */}
      <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-5 py-3 border-b border-stroke dark:border-strokedark" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">Bill Information</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            <ViewField label="Bill Number" value="BILL-2025-001" highlight />
            <ViewField label="Supplier Type" value="Domestic" />
            <ViewField label="Supplier Code" value="SUP-0042" />
            <ViewField label="Supplier Name" value="ABC Textiles Pvt Ltd" />
            <ViewField label="Purchase Invoice Number" value="PI-2025-0189" />
            <ViewField label="Purchase Invoice Date" value="15 Jan 2025" />
            <ViewField label="Created Date" value="16 Jan 2025" />
            <ViewField label="Status" value="SUBMITTED" />
          </div>
        </div>
      </div>

      {/* ── Purchase Order Item Table ── */}
      <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-5 py-3 border-b border-stroke dark:border-strokedark" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">Purchase Order Item</h3>
        </div>
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-sm border border-stroke dark:border-strokedark">
            <thead>
              <tr className="bg-gray-100 dark:bg-meta-4 text-xs text-gray-600 dark:text-gray-300">
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">#</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">Product Variety Code | Name</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">Item Name</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">Item Description</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Quantity</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Item Amount (₹)</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Total Rate (₹)</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Discount Value (₹)</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Balance Value (₹)</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">CGST (₹)</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">SGST (₹)</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Net Amount (₹)</th>
                <th className="border border-stroke dark:border-strokedark px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {ITEM_ROWS.map((row, idx) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-meta-4">
                  <td className="border border-stroke dark:border-strokedark px-3 py-2">{idx + 1}</td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2">
                    <span className="text-[#2d8f7b] font-medium">{row.varietyCode}</span>
                    <br />
                    <span className="text-xs text-gray-500">{row.varietyName}</span>
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2">{row.itemName}</td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-xs text-gray-500 max-w-[150px]">
                    {row.description}
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">{row.qty}</td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                    {row.itemAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">{row.totalRate.toFixed(2)}</td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right text-red-500">
                    {row.discountValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                    {row.balanceValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                    {row.cgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                    {row.sgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right font-medium text-[#2d8f7b]">
                    {row.netAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-3 py-2 text-center">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 dark:bg-meta-4 font-semibold text-sm">
                <td colSpan={4} className="border border-stroke dark:border-strokedark px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                  Totals:
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                  {ITEM_ROWS.reduce((s, r) => s + r.qty, 0)}
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                  {totalItemAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2"></td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right text-red-500">
                  {totalDiscount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                  {totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                  {totalCGST.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                  {totalSGST.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right text-[#2d8f7b]">
                  {totalNet.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-stroke dark:border-strokedark px-3 py-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── TDS Details ── */}
      <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-5 py-3 border-b border-stroke dark:border-strokedark" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">TDS Details</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            <ViewField label="TDS %" value={TDS_DETAILS.tdsPercent} />
            <ViewField label="TDS Value (₹)" value={TDS_DETAILS.tdsValue} highlight />
            <ViewField label="CGST TDS %" value={TDS_DETAILS.cgstTdsPercent} />
            <ViewField label="CGST TDS Value (₹)" value={TDS_DETAILS.cgstTdsValue} highlight />
            <ViewField label="SGST TDS %" value={TDS_DETAILS.sgstTdsPercent} />
            <ViewField label="SGST TDS Value (₹)" value={TDS_DETAILS.sgstTdsValue} highlight />
          </div>

          {/* Net Summary after TDS */}
          <div className="mt-4 flex justify-end">
            <table className="text-sm border border-stroke dark:border-strokedark min-w-[280px]">
              <tbody>
                <tr>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">Gross Net Amount (₹)</td>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium">
                    {totalNet.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">TDS Value (₹)</td>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium text-red-500">
                    - {TDS_DETAILS.tdsValue}
                  </td>
                </tr>
                <tr>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">CGST TDS Value (₹)</td>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium text-red-500">
                    - {TDS_DETAILS.cgstTdsValue}
                  </td>
                </tr>
                <tr>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">SGST TDS Value (₹)</td>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium text-red-500">
                    - {TDS_DETAILS.sgstTdsValue}
                  </td>
                </tr>
                <tr className="font-bold text-base">
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 bg-gray-50 dark:bg-meta-4" style={{ color: "#2d8f7b" }}>
                    Net Payable Amount (₹)
                  </td>
                  <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right" style={{ color: "#2d8f7b" }}>
                    {(
                      totalNet -
                      parseFloat(TDS_DETAILS.tdsValue) -
                      parseFloat(TDS_DETAILS.cgstTdsValue) -
                      parseFloat(TDS_DETAILS.sgstTdsValue)
                    ).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex justify-end gap-3 border-t border-stroke dark:border-strokedark pt-4 mt-2">
        <button
          onClick={() => setShowNoteModal(true)}
          className="rounded px-5 py-2 text-sm font-medium text-white"
          style={{ background: "#17a2b8" }}
        >
          View Note
        </button>
        <button
          onClick={() => router.push("/operational/quotation-order-invoice/purchase/bill/list")}
          className="rounded px-5 py-2 text-sm font-medium text-white"
          style={{ background: "#6c757d" }}
        >
          Back
        </button>
      </div>

      {/* ── View Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-boxdark rounded-sm shadow-lg w-full max-w-xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 rounded-t-sm" style={{ background: "#17a2b8" }}>
              <h4 className="text-sm font-semibold text-white">View Note</h4>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:text-gray-200 text-lg leading-none">
                ×
              </button>
            </div>

            <div className="p-5">
              {NOTES.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No notes available.</p>
              ) : (
                <>
                  <div className="mb-3">
                    <h5 className="text-sm font-semibold text-dark dark:text-white mb-1">{NOTES[activeNote].title}</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{NOTES[activeNote].date}</p>
                    <p className="text-sm text-dark dark:text-white leading-relaxed">{NOTES[activeNote].content}</p>
                  </div>

                  {/* Created By Card */}
                  <div className="mt-4 p-3 rounded border-2 border-[#fd7e14] bg-orange-50 dark:bg-meta-4">
                    <p className="text-xs font-semibold text-[#fd7e14] mb-1">Created By</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fd7e14] flex items-center justify-center text-white text-xs font-bold">
                        {NOTES[activeNote].initials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-dark dark:text-white">{NOTES[activeNote].author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{NOTES[activeNote].date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dot Navigation */}
                  {NOTES.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {NOTES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveNote(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            i === activeNote ? "bg-[#17a2b8]" : "bg-gray-300 dark:bg-strokedark"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-end mt-4 border-t border-stroke dark:border-strokedark pt-3">
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="rounded px-4 py-2 text-sm font-medium text-white"
                  style={{ background: "#6c757d" }}
                >
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
