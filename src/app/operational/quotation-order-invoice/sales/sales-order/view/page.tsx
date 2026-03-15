"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── static data ─────────────────────────────────────────────────── */
const RECORD = {
  customerType:     "Government",
  customerName:     "A D ANIMAL HUSBANDARY THANJA",
  quotationNumber:  "-",
  salesAccount:     "RO_CONTRACT_SALES",
  salesOrderNumber: "-",
  validityDate:     "24-Feb-2024",
  expectedDelivery: "29-Feb-2024",
  entityName:       "ISSR - THANJAVUR",
  billingAddress:   "AD ANIMAL HUSBANDARY THANAJAVUR, N B S, THANJAVUR, THANJAVUR, THANJAVUR, TAMIL NADU - 613009 India",
};

const PRODUCTS = [
  {
    sno: 1, varietyCode: "DSU2/HL SUITING", uom: "METR",
    quantity: 2.75, purchasePrice: 0.00, retailPrice: 265.00, supplierRate: 265.00,
    supplierValue: 728.75, discountValue: 0.00, taxPct: 5.00, taxPrice: 36.44, netPrice: 765.19,
  },
];

const DELIVERY_ROWS = [
  {
    sno: 1, varietyCode: "DSU2 / HL SUITING", unitRate: 265.00,
    orderedQty: 2.75, deliveryQty: 2.75,
    deliveryAddress: "AD ANIMAL HUSBANDARY THANAJAVUR, N B S, THANJAVUR, THANJAVUR, THANJAVUR, TAMIL NADU - 613009 India",
  },
];

const NOTES = [
  {
    sno: 1, text: "PLEASE APPRUD",
    name: "RAJAGURU J", designation: "MANAGER GRADE – II", date: "24-02-2024",
  },
];

/* ── helpers ─────────────────────────────────────────────────────── */
function numberToWords(n: number): string {
  if (n === 0) return "Zero";
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const convert = (num: number): string => {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num/10)] + (num%10 ? " "+ones[num%10] : "");
    if (num < 1000) return ones[Math.floor(num/100)]+" Hundred"+(num%100?" "+convert(num%100):"");
    if (num < 100000) return convert(Math.floor(num/1000))+" Thousand"+(num%1000?" "+convert(num%1000):"");
    return convert(Math.floor(num/100000))+" Lakh"+(num%100000?" "+convert(num%100000):"");
  };
  const intPart = Math.floor(n);
  const decPart = Math.round((n - intPart) * 100);
  let result = convert(intPart) + " Rupees";
  if (decPart > 0) result += " And " + convert(decPart) + " Paise";
  return result + " Only";
}

const GridIcon = () => <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;

function ViewField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="pb-4">
      <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`pt-0.5 text-sm font-medium ${highlight ? "text-[#2d8f7b] dark:text-[#5bc4a8]" : "text-dark dark:text-white"}`}>{value || "—"}</p>
    </div>
  );
}

const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

export default function ViewSalesOrderPage() {
  const router = useRouter();
  const [showNote,   setShowNote]   = useState(false);
  const [noteIndex,  setNoteIndex]  = useState(0);

  const totalQty       = PRODUCTS.reduce((s, r) => s + r.quantity, 0);
  const totalRetail    = PRODUCTS.reduce((s, r) => s + r.retailPrice, 0);
  const totalSupRate   = PRODUCTS.reduce((s, r) => s + r.supplierRate, 0);
  const totalSupValue  = PRODUCTS.reduce((s, r) => s + r.supplierValue, 0);
  const totalDiscVal   = PRODUCTS.reduce((s, r) => s + r.discountValue, 0);
  const totalTaxPrice  = PRODUCTS.reduce((s, r) => s + r.taxPrice, 0);
  const totalNetPrice  = PRODUCTS.reduce((s, r) => s + r.netPrice, 0);
  const materialValue  = totalSupValue;
  const cgst           = totalTaxPrice / 2;
  const sgst           = totalTaxPrice / 2;

  const activeNote = NOTES[noteIndex];

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Sales Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Sales Order</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Sales Order</h3>
        </div>

        <div className="p-5 space-y-5">
          {/* ── Customer Info ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Customer Type"    value={RECORD.customerType}     highlight />
            <ViewField label="Customer Name"    value={RECORD.customerName}     highlight />
            <ViewField label="Quotation Number" value={RECORD.quotationNumber} />
            <ViewField label="Sales Account"    value={RECORD.salesAccount}     highlight />
          </div>
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Sales Order Number"        value={RECORD.salesOrderNumber} />
            <ViewField label="Sales Order Validity Date" value={RECORD.validityDate}     highlight />
            <ViewField label="Expected Date of Delivery" value={RECORD.expectedDelivery} highlight />
            <ViewField label="Entity Name"               value={RECORD.entityName}       highlight />
          </div>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* ── Product Variety Details table ─────────────────────── */}
          <SubHeader title="Product Variety Details" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Product Variety Code / Name</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">UOM</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">Quantity</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Purchase Price (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Retail Price (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Rate (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">Tax (%)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax Price (₹)</th>
                    <th className="px-3 py-2 text-center">Net Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((row, idx) => (
                    <tr key={row.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{row.sno}</td>
                      <td className="border-r border-stroke px-3 py-1.5">{row.varietyCode}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-center">{row.uom}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{row.quantity.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.purchasePrice.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.retailPrice.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.supplierRate.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.supplierValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discountValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPrice.toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-right font-semibold">{row.netPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                    <td colSpan={3} className="border-r border-stroke px-3 py-1.5 text-center font-bold">TOTAL</td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right">{totalQty.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{(0).toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalRetail.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalSupRate.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalSupValue.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalDiscVal.toFixed(2)}</td>
                    <td className="border-r border-stroke" />
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalTaxPrice.toFixed(2)}</td>
                    <td className="px-3 py-1.5 text-right">{totalNetPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Financial summary panel */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600 dark:text-gray-400 text-right w-48">Material Value (Without Tax) :</span>
                <span className="text-dark dark:text-white font-semibold">{materialValue.toFixed(2)}</span>
              </div>
              {[
                { label: "Discount (₹)",   val: totalDiscVal.toFixed(2) },
                { label: `CGST ${PRODUCTS[0].taxPct/2}%`, val: cgst.toFixed(2) },
                { label: `SGST ${PRODUCTS[0].taxPct/2}%`, val: sgst.toFixed(2) },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-2">
                  <span className="text-gray-600 dark:text-gray-400 w-36 text-right">{row.label}</span>
                  <span className="w-24 text-right text-dark dark:text-white">{row.val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-2 border-t border-stroke pt-1.5 dark:border-dark-3">
                <span className="font-semibold text-dark dark:text-white w-36 text-right">Total</span>
                <span className="w-24 text-right font-bold text-dark dark:text-white">{totalNetPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* ── GST Summary ───────────────────────────────────────── */}
          <SubHeader title="GST Summary" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">HSN Code</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax (%)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">CGST (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">SGST (₹)</th>
                  <th className="px-3 py-2 text-center">Total Tax Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((row, idx) => (
                  <tr key={row.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">54078290</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.quantity.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPct.toFixed(1)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxPrice / 2).toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxPrice / 2).toFixed(2)}</td>
                    <td className="px-3 py-1.5 text-right font-semibold">{row.taxPrice.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                  <td colSpan={3} className="border-r border-stroke px-3 py-1.5 text-center">Total</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{cgst.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{sgst.toFixed(2)}</td>
                  <td className="px-3 py-1.5 text-right">{totalTaxPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount in Words */}
          <p className="text-sm">
            <span className="font-medium text-dark dark:text-white">Amount In Words : </span>
            <span className="text-[#2d8f7b] font-medium">{numberToWords(totalNetPrice)}</span>
          </p>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* ── Delivery Details ──────────────────────────────────── */}
          <SubHeader title="Delivery Details" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Product Variety Code / Name</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Rate (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Ordered Quantity</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Delivery Quantity</th>
                  <th className="px-3 py-2 text-center">Delivery Address</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY_ROWS.map((row, idx) => (
                  <tr key={row.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{row.sno}</td>
                    <td className="border-r border-stroke px-3 py-1.5">{row.varietyCode}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitRate.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.orderedQty.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.deliveryQty.toFixed(2)}</td>
                    <td className="px-3 py-1.5">{row.deliveryAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Billing Address */}
          <div>
            <p className="mb-1 text-xs font-medium text-dark dark:text-white">Billing Address</p>
            <p className="text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{RECORD.billingAddress}</p>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-order/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ── View Note Modal ────────────────────────────────────────── */}
      {showNote && activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[780px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Note content */}
              <div className="min-h-[160px] rounded border border-stroke bg-white px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                {activeNote.text}
              </div>

              {/* Dot navigation for multiple notes */}
              <div className="flex items-center justify-end gap-2">
                {NOTES.map((_, i) => (
                  <button key={i} onClick={() => setNoteIndex(i)}
                    className={`size-2.5 rounded-full transition-colors ${i === noteIndex ? "bg-[#17a2b8]" : "bg-gray-300 dark:bg-gray-600"}`} />
                ))}
                {NOTES.length > 1 && (
                  <>
                    <button onClick={() => setNoteIndex(i => Math.max(0, i - 1))}
                      className="rounded border border-stroke p-1 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-gray-700">
                      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                    </button>
                    <button onClick={() => setNoteIndex(i => Math.min(NOTES.length - 1, i + 1))}
                      className="rounded border border-stroke p-1 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-gray-700">
                      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                    </button>
                  </>
                )}
              </div>

              {/* Created By card */}
              <div className="inline-block rounded border border-[#fd7e14] p-4 text-sm">
                <p className="mb-2 text-center font-semibold text-dark dark:text-white">Created By</p>
                <p className="text-dark dark:text-white">Name : {activeNote.name}</p>
                <p className="text-dark dark:text-white">Designation : {activeNote.designation}</p>
                <p className="text-dark dark:text-white">Date : {activeNote.date}</p>
              </div>

              <div className="flex justify-end">
                <button onClick={() => setShowNote(false)}
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
