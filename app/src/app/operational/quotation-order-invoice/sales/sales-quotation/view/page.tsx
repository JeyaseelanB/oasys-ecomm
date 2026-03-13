"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RECORD = {
  quotationNumber: "SQ-2025-001",
  date:            "13-Mar-2026",
  validityDate:    "30-Sep-2025",
  enquiryRef:      "ENQ-2025-0045",
  customer: {
    type:            "Retail",
    name:            "Ramesh Stores",
    contactNumber:   "9876543210",
    email:           "ramesh@stores.com",
    billingAddress:  "12, Gandhi Road, Coimbatore – 641001, Tamil Nadu",
    deliveryAddress: "45, Anna Nagar, Chennai – 600040, Tamil Nadu",
  },
  products: [
    { sno: 1, category: "Pure Silk", group: "Saree",  variety: "Kanjivaram", qty: 10, unitPrice: 4500, supplierRate: 4200, discount: 5, supplierValue: 42000, taxPct: 12, taxPrice: 4788,  netPrice: 46788 },
    { sno: 2, category: "Cotton",    group: "Dhoti",  variety: "Madurai",    qty: 25, unitPrice: 450,  supplierRate: 420,  discount: 5, supplierValue: 10500, taxPct: 12, taxPrice: 1197,  netPrice: 11697 },
    { sno: 3, category: "Powerloom", group: "Saree",  variety: "Printed",    qty: 15, unitPrice: 850,  supplierRate: 800,  discount: 5, supplierValue: 12000, taxPct: 12, taxPrice: 1368,  netPrice: 13368 },
  ],
  remarks:     "Quotation valid for 30 days from the date of issue.",
  terms:       "1. Payment due within 15 days of invoice.\n2. Goods once sold will not be returned.\n3. Subject to Chennai jurisdiction.",
  forwardTo:   "Regional Manager",
  forwardFor:  "Approval",
  status:      "SUBMITTED",
};

const NOTES = [
  { sno: 1, note: "Initial quotation prepared after customer site visit.", name: "SANKARANARAYANAN", designation: "SUPERINTENDENT", date: "11-Mar-2026" },
  { sno: 2, note: "Revised pricing confirmed by procurement team.",         name: "RAJENDRAN",       designation: "MANAGER",         date: "12-Mar-2026" },
];

function ViewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="pb-4">
      <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="pt-0.5 text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value || "—"}</p>
    </div>
  );
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

export default function ViewSalesQuotationPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [activeNote, setActiveNote]       = useState<typeof NOTES[0] | null>(null);

  const totalMaterial = RECORD.products.reduce((s, r) => s + r.supplierValue, 0);
  const totalDiscount = RECORD.products.reduce((s, r) => s + (r.supplierValue * r.discount / 100), 0);
  const totalTax      = RECORD.products.reduce((s, r) => s + r.taxPrice, 0);
  const netTotal      = RECORD.products.reduce((s, r) => s + r.netPrice, 0);
  const roundOff      = Math.round(netTotal) - netTotal;
  const finalTotal    = Math.round(netTotal);

  return (
    <div className="mx-auto space-y-5">
      {/* breadcrumb */}
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Sales Quotation</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales Quotation</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Sales Quotation</li>
          </ol>
        </nav>
      </div>

      {/* ── Customer Details ─────────────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Customer Details" />
        <div className="p-5 space-y-1">
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Customer Type"    value={RECORD.customer.type} />
            <ViewField label="Customer Name"    value={RECORD.customer.name} />
            <ViewField label="Contact Number"   value={RECORD.customer.contactNumber} />
            <ViewField label="Email ID"         value={RECORD.customer.email} />
          </div>
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            <ViewField label="Billing Address"  value={RECORD.customer.billingAddress} />
            <ViewField label="Delivery Address" value={RECORD.customer.deliveryAddress} />
          </div>
        </div>
      </div>

      {/* ── Sales Enquiry ─────────────────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Sales Enquiry" />
        <div className="p-5">
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Enquiry Reference Number" value={RECORD.enquiryRef} />
            <ViewField label="Quotation Number"         value={RECORD.quotationNumber} />
            <ViewField label="Quotation Date"           value={RECORD.date} />
            <ViewField label="Validity Date"            value={RECORD.validityDate} />
          </div>
        </div>
      </div>

      {/* ── Product Details ──────────────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Product Details" />
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Category</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Group</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Variety</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Qty</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Price (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Rate (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount (%)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Value (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax (%)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax Price (₹)</th>
                  <th className="px-3 py-2 text-center">Net Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {RECORD.products.map((row, idx) => (
                  <tr key={row.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{row.sno}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.category}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.group}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.variety}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.qty}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.supplierRate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discount.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.supplierValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="px-3 py-1.5 text-right font-semibold">{row.netPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                  <td colSpan={8} className="border-r border-stroke px-3 py-1.5 text-right">Total</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{totalMaterial.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="border-r border-stroke" />
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{totalTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="px-3 py-1.5 text-right">{netTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── GST Summary ─────────────────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="GST Summary" />
        <div className="p-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">HSN Code</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax (%)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">CGST (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">SGST (₹)</th>
                    <th className="px-3 py-2 text-center">Total Tax (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {RECORD.products.map((row, idx) => (
                    <tr key={row.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">5208</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">Nos</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxPrice / 2).toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxPrice / 2).toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-right font-semibold">{row.taxPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-2 max-w-xs ml-auto">
              {[
                { label: "Material Value (₹)",  val: totalMaterial.toLocaleString("en-IN", { minimumFractionDigits: 2 }) },
                { label: "Total Discount (₹)",  val: totalDiscount.toLocaleString("en-IN", { minimumFractionDigits: 2 }) },
                { label: "Total Tax (₹)",        val: totalTax.toLocaleString("en-IN", { minimumFractionDigits: 2 }) },
                { label: "Round Off (₹)",        val: roundOff.toFixed(2) },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-44 text-right">{row.label}</span>
                  <span className="w-36 rounded border border-stroke bg-gray-50 px-3 py-1.5 text-xs text-right text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white">{row.val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 border-t border-stroke pt-2 dark:border-dark-3">
                <span className="text-xs font-semibold text-dark dark:text-white w-44 text-right">Net Total (₹)</span>
                <span className="w-36 rounded border border-[#2d8f7b] bg-gray-50 px-3 py-1.5 text-xs text-right font-semibold text-dark dark:bg-gray-800 dark:text-white">
                  {finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Others ──────────────────────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Others" />
        <div className="p-5 space-y-1">
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Quotation Validity Date" value={RECORD.validityDate} />
            <ViewField label="Forward To"              value={RECORD.forwardTo} />
            <ViewField label="Forward For"             value={RECORD.forwardFor} />
            <ViewField label="Status"                  value={RECORD.status} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Remarks</p>
              <div className="min-h-[60px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white">
                {RECORD.remarks}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Terms &amp; Conditions</p>
              <div className="min-h-[60px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark whitespace-pre-line dark:border-dark-3 dark:bg-gray-800 dark:text-white">
                {RECORD.terms}
              </div>
            </div>
          </div>

          {/* Notes table */}
          <div className="pt-4">
            <p className="mb-2 text-xs font-semibold text-dark dark:text-white">Notes</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-10">#</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-left">Note</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Created By</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Designation</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Date</th>
                    <th className="px-3 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {NOTES.map((n, idx) => (
                    <tr key={n.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{n.sno}</td>
                      <td className="border-r border-stroke px-3 py-1.5 max-w-xs truncate">{n.note}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">{n.name}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">{n.designation}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">{n.date}</td>
                      <td className="px-3 py-1.5 text-center">
                        <button onClick={() => { setActiveNote(n); setShowNoteModal(true); }}
                          className="flex items-center gap-1 rounded bg-[#2d8f7b] px-2 py-0.5 text-[10px] text-white hover:opacity-90 mx-auto">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          View Note
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom action buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 mt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-quotation/preview")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview
            </button>
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-quotation/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ── View Note Modal ──────────────────────────────────────────── */}
      {showNoteModal && activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[640px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="mb-1 text-xs text-gray-500">Note</p>
                <div className="min-h-[120px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white">
                  {activeNote.note}
                </div>
              </div>
              <div className="inline-block rounded border border-red-300 p-4 text-sm">
                <p className="mb-2 font-semibold text-dark dark:text-white"><span className="text-red-500">*</span>Created By</p>
                <p className="text-dark dark:text-white">Name : {activeNote.name}</p>
                <p className="text-dark dark:text-white">Designation : {activeNote.designation}</p>
                <p className="text-dark dark:text-white">Date : {activeNote.date}</p>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
