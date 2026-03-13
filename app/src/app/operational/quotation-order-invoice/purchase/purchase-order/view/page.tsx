"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" /><rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);

const LabelVal = ({ label, value, teal }: { label: string; value?: string; teal?: boolean }) => (
  <div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className={`text-sm font-medium ${teal ? "text-teal-600" : "text-gray-800"}`}>{value || "—"}</p>
  </div>
);

const ITEMS = [
  { sno: 1, itemName: "SAREES CUDDALORE COTTON 5.50 MTS", itemDesc: "", uom: "NOS", qty: "100.0", unitRate: "1200.00", totalRate: "120000.00", discValue: "", taxValue: "6000.00", netAmount: "126000.00" },
];

const NOTES = [
  { text: "jj", name: "SANKARANARAYANAN C", designation: "SUPERINTENDENT", date: "11-09-2025" },
];

export default function ViewPurchaseOrderPage() {
  const router = useRouter();
  const [showNote, setShowNote]       = useState(false);
  const [noteIdx, setNoteIdx]         = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentsTab, setCommentsTab] = useState<"approve" | "reject">("approve");
  const [approveComment, setApproveComment] = useState("");
  const [rejectComment, setRejectComment]   = useState("");

  const totalQty     = ITEMS.reduce((s, r) => s + (parseFloat(r.qty) || 0), 0);
  const totalRate    = ITEMS.reduce((s, r) => s + (parseFloat(r.totalRate) || 0), 0);
  const totalDisc    = ITEMS.reduce((s, r) => s + (parseFloat(r.discValue) || 0), 0);
  const totalTax     = ITEMS.reduce((s, r) => s + (parseFloat(r.taxValue) || 0), 0);
  const totalNet     = ITEMS.reduce((s, r) => s + (parseFloat(r.netAmount) || 0), 0);

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Quotation/Order/Invoice</li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li><li className="text-gray-700">View Purchase Order Item</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">View Purchase Order Item</h1>

      {/* Section 1: Purchase Order Item */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div className="px-4 py-2 text-white text-sm font-semibold rounded-t" style={{ backgroundColor: "#2d8f7b" }}>
          Purchase Order Item
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            <LabelVal label="Supplier Type"              value="SOCIETY"                       teal />
            <LabelVal label="Supplier Code / Name"       value="371303/ SRI MUSHNAM W.C.S.E.1908" teal />
            <LabelVal label="Purchase Order Based on"    value="Without Quotation"              teal />
            <LabelVal label="Quotation Number"           value="-" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            <LabelVal label="Production Supervisor" value="" />
            <LabelVal label="Plan Code"             value="" />
            <LabelVal label="Procurement Type"      value="" />
            <LabelVal label="Government Scheme"     value="" />
          </div>
        </div>
      </div>

      {/* Section 2: Purchase Order Item Details */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <GridIco />
            <span className="font-semibold text-sm text-gray-800">Purchase Order Item Details</span>
          </div>
        </div>
        <div className="p-4">
          {/* Items Table */}
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full text-xs">
              <thead style={{ backgroundColor: "#2d8f7b" }} className="text-white">
                <tr>
                  {["#","Item Name","Item Description","UOM","Quantity","Approved Unit Rate (₹)","Total Rate (₹)","Discount Value (₹)","Tax Value (₹)","Net Amount (₹)"].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {ITEMS.map(r => (
                  <tr key={r.sno} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-3 py-2">{r.sno}</td>
                    <td className="px-3 py-2">{r.itemName}</td>
                    <td className="px-3 py-2">{r.itemDesc || "—"}</td>
                    <td className="px-3 py-2">{r.uom}</td>
                    <td className="px-3 py-2">{r.qty}</td>
                    <td className="px-3 py-2">{r.unitRate}</td>
                    <td className="px-3 py-2">{r.totalRate}</td>
                    <td className="px-3 py-2">{r.discValue || ""}</td>
                    <td className="px-3 py-2">{r.taxValue}</td>
                    <td className="px-3 py-2">{r.netAmount}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold text-gray-700 text-xs">
                  <td colSpan={4} className="px-3 py-2 text-right">Total</td>
                  <td className="px-3 py-2">{totalQty.toFixed(2)}</td>
                  <td className="px-3 py-2">{totalRate.toFixed(2)}</td>
                  <td className="px-3 py-2">{totalDisc.toFixed(2)}</td>
                  <td className="px-3 py-2">{totalTax.toFixed(2)}</td>
                  <td className="px-3 py-2">{totalNet.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Purchase Order Validity Date</p>
              <p className="text-sm text-gray-800">—</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Expected Date of Delivery</p>
              <p className="text-sm text-gray-800">—</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-0.5">Terms &amp; Conditions</p>
            <p className="text-sm text-gray-800">—</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#2d8f7b" }}
              onClick={() => setShowNote(true)}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Note
            </button>
            <button
              className="flex items-center justify-center px-3 py-1.5 text-white rounded"
              style={{ backgroundColor: "#2d8f7b" }}
              onClick={() => setShowComments(true)}
              title="Comments"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
              </svg>
            </button>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#2d8f7b" }}
            onClick={() => router.push("/operational/quotation-order-invoice/purchase/purchase-order/list")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-2xl mx-4">
            <div className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between" style={{ backgroundColor: "#2d8f7b" }}>
              <span>View Note</span>
              <button className="text-white hover:opacity-70 text-base leading-none" onClick={() => setShowNote(false)}>✕</button>
            </div>
            <div className="p-4 space-y-3">
              {/* Note content */}
              <div className="border border-gray-200 rounded p-3 min-h-24 bg-gray-50 text-sm text-gray-700">
                {NOTES[noteIdx]?.text}
              </div>
              {/* Nav dots + arrows */}
              <div className="flex justify-end items-center gap-2">
                <div className="flex gap-1 mr-2">
                  {NOTES.map((_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full inline-block cursor-pointer ${i === noteIdx ? "bg-teal-600" : "bg-gray-300"}`} onClick={() => setNoteIdx(i)} />
                  ))}
                </div>
                <button disabled={noteIdx === 0} onClick={() => setNoteIdx(i => i - 1)} className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100">◀</button>
                <button disabled={noteIdx >= NOTES.length - 1} onClick={() => setNoteIdx(i => i + 1)} className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100">▶</button>
              </div>
              {/* Created By card */}
              <div className="border border-gray-300 rounded p-3 max-w-xs">
                <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">Created By</p>
                <p className="text-xs text-gray-700">Name : {NOTES[noteIdx]?.name}</p>
                <p className="text-xs text-teal-600 font-medium">Designation : {NOTES[noteIdx]?.designation}</p>
                <p className="text-xs text-teal-600 font-medium">Date : {NOTES[noteIdx]?.date}</p>
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-gray-200">
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#6c757d" }}
                onClick={() => setShowNote(false)}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-lg mx-4">
            <div className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between" style={{ backgroundColor: "#2d8f7b" }}>
              <span>Comments</span>
              <button className="text-white hover:opacity-70 text-base leading-none" onClick={() => setShowComments(false)}>✕</button>
            </div>
            <div className="p-4">
              {/* Tabs with thumb icons */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${commentsTab === "approve" ? "border-red-500 text-gray-800" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setCommentsTab("approve")}
                >
                  {/* Thumbs up icon */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  Approve
                </button>
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${commentsTab === "reject" ? "border-red-500 text-gray-800" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setCommentsTab("reject")}
                >
                  {/* Thumbs down icon */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  Reject
                </button>
              </div>

              {commentsTab === "approve" ? (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
                    placeholder="Enter approval comments..."
                    value={approveComment}
                    onChange={e => setApproveComment(e.target.value)}
                  />
                  <button className="w-full py-1.5 text-white text-sm font-semibold rounded hover:opacity-90" style={{ backgroundColor: "#28a745" }} onClick={() => setShowComments(false)}>
                    Approve
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
                    placeholder="Enter rejection reason..."
                    value={rejectComment}
                    onChange={e => setRejectComment(e.target.value)}
                  />
                  <button className="w-full py-1.5 text-white text-sm font-semibold rounded hover:opacity-90" style={{ backgroundColor: "#dc3545" }} onClick={() => setShowComments(false)}>
                    Reject
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-gray-200">
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#6c757d" }}
                onClick={() => setShowComments(false)}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
