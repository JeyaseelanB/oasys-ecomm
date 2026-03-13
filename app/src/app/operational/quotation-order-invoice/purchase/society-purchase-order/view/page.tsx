"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" />
    <rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" />
    <rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);

const LV = ({
  label,
  value,
  teal,
}: {
  label: string;
  value?: string;
  teal?: boolean;
}) => (
  <div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className={`text-sm font-medium ${teal ? "text-teal-600" : "text-gray-800"}`}>
      {value || "—"}
    </p>
  </div>
);

// Mock PO data keyed by id
const PO_DATA: Record<
  string,
  {
    supplierType: string;
    supplierCodeName: string;
    poRefNumber: string;
    productionSupervisor: string;
    planCode: string;
    requirementFor: string;
    finYear: string;
    procurementType: string;
    governmentScheme: string;
    billingEntity: string;
    shippingEntity: string;
    intendingEntity: string;
    validityDate: string;
    deliveryDate: string;
    termsConditions: string;
    items: {
      sno: number;
      itemName: string;
      itemDesc: string;
      uom: string;
      qty: string;
      unitRate: string;
      totalRate: string;
      netAmount: string;
    }[];
    notes: {
      text: string;
      createdName: string;
      createdDesignation: string;
      createdDate: string;
      approvedName?: string;
      approvedDesignation?: string;
      approvedDate?: string;
    }[];
  }
> = {
  "1": {
    supplierType: "SOCIETY",
    supplierCodeName: "111111 / AYYANPETTAI KANDAPPAR WEAVERS COOP.SOCIETY G.2067",
    poRefNumber: "PO-434-21Mar2024 - 124",
    productionSupervisor: "CHANDRAN S",
    planCode: "PURCHASE",
    requirementFor: "Special Exhibition",
    finYear: "2024-2025",
    procurementType: "Export Order",
    governmentScheme: "",
    billingEntity: "COURTALLAM",
    shippingEntity: "COURTALLAM",
    intendingEntity: "COURTALLAM",
    validityDate: "21-Mar-2024",
    deliveryDate: "23-Mar-2024",
    termsConditions: "",
    items: [],
    notes: [
      {
        text: "testing",
        createdName: "SANKARANARAYANAN C",
        createdDesignation: "SUPERINTENDENT",
        createdDate: "21-03-2024",
        approvedName: "JAYALAKSHMI M",
        approvedDesignation: "SENIOR ASSISTANT",
        approvedDate: "21-03-2024",
      },
    ],
  },
  "2": {
    supplierType: "SOCIETY",
    supplierCodeName: "111147 / ARIGNAR ANNA SILK WEAVERS COOP. SOCIETY, K.H.1,",
    poRefNumber: "PO-434-21Mar2024 - 123",
    productionSupervisor: "EASWARI K",
    planCode: "NEWPLAN",
    requirementFor: "Regular",
    finYear: "2024-2025",
    procurementType: "Contract Order",
    governmentScheme: "",
    billingEntity: "6028 / Distribution Warehouse - Tirunelveli",
    shippingEntity: "6028 / Distribution Warehouse - Tirunelveli",
    intendingEntity: "6028 / Distribution Warehouse - Tirunelveli",
    validityDate: "21-Mar-2024",
    deliveryDate: "23-Mar-2024",
    termsConditions: "",
    items: [],
    notes: [],
  },
  "3": {
    supplierType: "SOCIETY",
    supplierCodeName: "211117 / CHINNALAPATTI KALAIVANAR N.S. KRISHNAN INDL. WCS. MH.26,",
    poRefNumber: "PO-434-18Mar2024 - 122",
    productionSupervisor: "EASWARI K",
    planCode: "TEST",
    requirementFor: "Export",
    finYear: "2024-2025",
    procurementType: "Contract Order",
    governmentScheme: "",
    billingEntity: "1114 / MARUTHAM",
    shippingEntity: "1114 / MARUTHAM",
    intendingEntity: "/",
    validityDate: "18-Mar-2024",
    deliveryDate: "20-Mar-2024",
    termsConditions: "",
    items: [],
    notes: [],
  },
};

export default function ViewSocietyPurchaseOrderPage() {
  const router = useRouter();

  // Get id from URL (default to "1" for demo)
  const [id] = useState("1");
  const po = PO_DATA[id] ?? PO_DATA["1"];

  const [showNote, setShowNote] = useState(false);
  const [noteIdx, setNoteIdx] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentsTab, setCommentsTab] = useState<"approve" | "reject">("approve");
  const [approveComment, setApproveComment] = useState("");
  const [rejectComment, setRejectComment] = useState("");

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-teal-600">
              🏠 Home
            </Link>
          </li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Quotation/Order/Invoice</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li>
          <li className="text-gray-700">Society View Purchase Order Item</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Society View Purchase Order Item
      </h1>

      {/* Section 1: Society Purchase Order Item */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div
          className="px-4 py-2 text-white text-sm font-semibold rounded-t"
          style={{ backgroundColor: "#2d8f7b" }}
        >
          Society Purchase Order Item
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            <LV label="Supplier Type" value={po.supplierType} teal />
            <LV label="Supplier Code / Name" value={po.supplierCodeName} teal />
            <LV label="Purchase Order Reference Number" value={po.poRefNumber} teal />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            <LV label="Production Supervisor" value={po.productionSupervisor} teal />
            <LV label="Plan Code" value={po.planCode} teal />
            <LV label="Requirement For" value={po.requirementFor} teal />
            <LV label="Fin Year" value={po.finYear} teal />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            <LV label="Procurement Type" value={po.procurementType} teal />
            <LV label="Government Scheme" value={po.governmentScheme} />
            <LV label="Billing Entity" value={po.billingEntity} teal />
            <LV label="Shipping Entity" value={po.shippingEntity} teal />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            <LV label="Intending Entity" value={po.intendingEntity} teal />
          </div>
        </div>
      </div>

      {/* Section 2: Purchase Order Item Details */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <GridIco />
            <span className="font-semibold text-sm text-gray-800">
              Purchase Order Item Details
            </span>
          </div>
        </div>
        <div className="p-4">
          {/* Table */}
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full text-xs">
              <thead style={{ backgroundColor: "#2d8f7b" }} className="text-white">
                <tr>
                  {[
                    "#",
                    "Item Name",
                    "Item Description",
                    "UOM",
                    "Quantity",
                    "Approved Unit Rate (₹)",
                    "Total Rate (₹)",
                    "Net Amount (₹)",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {po.items.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-3 py-3 text-gray-500 text-xs">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  po.items.map((r) => (
                    <tr
                      key={r.sno}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-3 py-2">{r.sno}</td>
                      <td className="px-3 py-2">{r.itemName}</td>
                      <td className="px-3 py-2">{r.itemDesc || "—"}</td>
                      <td className="px-3 py-2">{r.uom}</td>
                      <td className="px-3 py-2">{r.qty}</td>
                      <td className="px-3 py-2">{r.unitRate}</td>
                      <td className="px-3 py-2">{r.totalRate}</td>
                      <td className="px-3 py-2">{r.netAmount}</td>
                    </tr>
                  ))
                )}
                <tr className="bg-gray-50 font-semibold text-gray-700 text-xs">
                  <td colSpan={4} className="px-3 py-2 text-right">
                    Total
                  </td>
                  <td className="px-3 py-2">0.00</td>
                  <td className="px-3 py-2">0.00</td>
                  <td className="px-3 py-2">0.00</td>
                  <td className="px-3 py-2">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Purchase Order Validity Date</p>
              <p className="text-sm text-teal-600 font-medium">{po.validityDate || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Expected Date of Delivery</p>
              <p className="text-sm text-teal-600 font-medium">{po.deliveryDate || "—"}</p>
            </div>
          </div>
          {po.termsConditions && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-0.5">Terms &amp; Conditions</p>
              <p className="text-sm text-gray-800">{po.termsConditions}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#2d8f7b" }}
              onClick={() => setShowNote(true)}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Note
            </button>
            <button
              className="flex items-center justify-center px-3 py-1.5 text-white rounded"
              style={{ backgroundColor: "#2d8f7b" }}
              title="Comments"
              onClick={() => setShowComments(true)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#2d8f7b" }}
              onClick={() =>
                router.push(
                  "/operational/quotation-order-invoice/purchase/society-purchase-order/list"
                )
              }
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#2d8f7b" }}
              onClick={() =>
                router.push(
                  "/operational/quotation-order-invoice/purchase/society-purchase-order/preview"
                )
              }
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-2xl mx-4">
            <div
              className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between"
              style={{ backgroundColor: "#2d8f7b" }}
            >
              <span>View Note</span>
              <button
                className="text-white hover:opacity-70 text-base leading-none"
                onClick={() => setShowNote(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              {/* Note content */}
              <div className="border border-gray-200 rounded p-3 min-h-24 bg-gray-50 text-sm text-gray-700">
                {po.notes[noteIdx]?.text || "No note content."}
              </div>

              {/* Navigation */}
              <div className="flex justify-end items-center gap-2">
                <div className="flex gap-1 mr-2">
                  {po.notes.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full inline-block cursor-pointer ${
                        i === noteIdx ? "bg-teal-600" : "bg-gray-300"
                      }`}
                      onClick={() => setNoteIdx(i)}
                    />
                  ))}
                  {po.notes.length === 0 && (
                    <span className="w-2 h-2 rounded-full inline-block bg-teal-600" />
                  )}
                </div>
                <button
                  disabled={noteIdx === 0}
                  onClick={() => setNoteIdx((i) => i - 1)}
                  className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100"
                >
                  ◀
                </button>
                <button
                  disabled={noteIdx >= po.notes.length - 1}
                  onClick={() => setNoteIdx((i) => i + 1)}
                  className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100"
                >
                  ▶
                </button>
              </div>

              {/* Created By + Final Approved By cards */}
              <div className="flex gap-4 flex-wrap">
                {po.notes[noteIdx] && (
                  <div className="border border-gray-300 rounded p-3 flex-1 min-w-48">
                    <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">
                      Created By
                    </p>
                    <p className="text-xs text-gray-700">
                      Name : {po.notes[noteIdx].createdName}
                    </p>
                    <p className="text-xs text-teal-600 font-medium">
                      Designation : {po.notes[noteIdx].createdDesignation}
                    </p>
                    <p className="text-xs text-teal-600 font-medium">
                      Date : {po.notes[noteIdx].createdDate}
                    </p>
                  </div>
                )}
                {po.notes[noteIdx]?.approvedName && (
                  <div className="border border-gray-300 rounded p-3 flex-1 min-w-48">
                    <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">
                      Final Approved By
                    </p>
                    <p className="text-xs text-gray-700">
                      Name : {po.notes[noteIdx].approvedName}
                    </p>
                    <p className="text-xs text-teal-600 font-medium">
                      Designation : {po.notes[noteIdx].approvedDesignation}
                    </p>
                    <p className="text-xs text-teal-600 font-medium">
                      Date : {po.notes[noteIdx].approvedDate}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-gray-200">
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#6c757d" }}
                onClick={() => setShowNote(false)}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-md mx-4">
            <div
              className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between"
              style={{ backgroundColor: "#2d8f7b" }}
            >
              <span>Comments</span>
              <button
                className="text-white hover:opacity-70"
                onClick={() => setShowComments(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    commentsTab === "approve"
                      ? "border-teal-600 text-teal-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setCommentsTab("approve")}
                >
                  Approve
                </button>
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    commentsTab === "reject"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setCommentsTab("reject")}
                >
                  Reject
                </button>
              </div>
              {commentsTab === "approve" ? (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none resize-none"
                    placeholder="Enter approval comments..."
                    value={approveComment}
                    onChange={(e) => setApproveComment(e.target.value)}
                  />
                  <button
                    className="w-full py-1.5 text-white text-sm font-semibold rounded"
                    style={{ backgroundColor: "#28a745" }}
                    onClick={() => setShowComments(false)}
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none resize-none"
                    placeholder="Enter rejection reason..."
                    value={rejectComment}
                    onChange={(e) => setRejectComment(e.target.value)}
                  />
                  <button
                    className="w-full py-1.5 text-white text-sm font-semibold rounded"
                    style={{ backgroundColor: "#dc3545" }}
                    onClick={() => setShowComments(false)}
                  >
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
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
