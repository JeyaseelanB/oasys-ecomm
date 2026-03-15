"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const QUOTE = {
  quotationNumber: "SQ-2025-001",
  date:            "13-Mar-2026",
  validityDate:    "30-Sep-2025",
  enquiryRef:      "ENQ-2025-0045",
  customer: {
    name:            "Ramesh Stores",
    type:            "Retail",
    contactNumber:   "9876543210",
    email:           "ramesh@stores.com",
    billingAddress:  "12, Gandhi Road, Coimbatore – 641001, Tamil Nadu",
    deliveryAddress: "45, Anna Nagar, Chennai – 600040, Tamil Nadu",
  },
  products: [
    { sno: 1, category: "Pure Silk", group: "Saree", variety: "Kanjivaram", qty: 10, unitPrice: 4500, supplierRate: 4200, discount: 5, supplierValue: 42000, taxPct: 12, taxPrice: 4788, netPrice: 46788 },
    { sno: 2, category: "Cotton",    group: "Dhoti", variety: "Madurai",    qty: 25, unitPrice: 450,  supplierRate: 420,  discount: 5, supplierValue: 10500, taxPct: 12, taxPrice: 1197, netPrice: 11697 },
    { sno: 3, category: "Powerloom", group: "Saree", variety: "Printed",    qty: 15, unitPrice: 850,  supplierRate: 800,  discount: 5, supplierValue: 12000, taxPct: 12, taxPrice: 1368, netPrice: 13368 },
  ],
  remarks:  "Quotation valid for 30 days from the date of issue.",
  terms:    "1. Payment due within 15 days of invoice.\n2. Goods once sold will not be returned.\n3. Subject to Chennai jurisdiction.",
  preparedBy:   "SANKARANARAYANAN",
  designation:  "SUPERINTENDENT",
  forwardTo:    "Regional Manager",
};

function numberToWords(n: number): string {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  if (n === 0) return "Zero";
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? " "+ones[n%10] : "");
  if (n < 1000) return ones[Math.floor(n/100)] + " Hundred" + (n%100 ? " "+numberToWords(n%100) : "");
  if (n < 100000) return numberToWords(Math.floor(n/1000)) + " Thousand" + (n%1000 ? " "+numberToWords(n%1000) : "");
  if (n < 10000000) return numberToWords(Math.floor(n/100000)) + " Lakh" + (n%100000 ? " "+numberToWords(n%100000) : "");
  return numberToWords(Math.floor(n/10000000)) + " Crore" + (n%10000000 ? " "+numberToWords(n%10000000) : "");
}

export default function SalesQuotationPreviewPage() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const totalMaterial = QUOTE.products.reduce((s, r) => s + r.supplierValue, 0);
  const totalDiscount = QUOTE.products.reduce((s, r) => s + (r.supplierValue * r.discount / 100), 0);
  const totalTax      = QUOTE.products.reduce((s, r) => s + r.taxPrice, 0);
  const netTotal      = QUOTE.products.reduce((s, r) => s + r.netPrice, 0);
  const roundOff      = Math.round(netTotal) - netTotal;
  const finalTotal    = Math.round(netTotal);
  const amountWords   = numberToWords(finalTotal) + " Rupees Only";

  const handlePrint = () => window.print();

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Sales Quotation Preview</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Sales Quotation</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Preview</li>
          </ol>
        </nav>
      </div>

      {/* Action buttons */}
      <div className="mb-4 flex items-center justify-end gap-2 print:hidden">
        <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-quotation/list")}
          className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
          Back
        </button>
        <button onClick={handlePrint}
          className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print
        </button>
        <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-quotation/list")}
          className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
          Submit
        </button>
      </div>

      {/* ── Printable Quotation Document ─────────────────────────────── */}
      <div ref={printRef} className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card print:shadow-none print:border-none">
        {/* Company Header */}
        <div className="border-b border-stroke p-6 text-center dark:border-dark-3">
          <h1 className="text-xl font-bold uppercase tracking-widest text-[#2d8f7b]">Tamil Nadu Co-operative Textiles Federation Ltd.</h1>
          <p className="mt-1 text-xs text-gray-500">(Co-optex)</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">184, Anna Salai, Chennai – 600 002 | Phone: 044-28520100 | Email: info@coooptex.tn.gov.in</p>
          <div className="mt-3 rounded bg-[#2d8f7b] py-1.5 text-sm font-bold uppercase tracking-wider text-white">
            Sales Quotation
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Quotation Meta */}
          <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
            {[
              { label: "Quotation No.",    value: QUOTE.quotationNumber },
              { label: "Quotation Date",   value: QUOTE.date },
              { label: "Validity Date",    value: QUOTE.validityDate },
              { label: "Enquiry Ref. No.", value: QUOTE.enquiryRef },
            ].map(f => (
              <div key={f.label}>
                <p className="text-gray-500">{f.label}</p>
                <p className="font-semibold text-dark dark:text-white">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 gap-4 rounded border border-stroke p-4 text-xs sm:grid-cols-3 dark:border-dark-3">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Customer Details</p>
              <p className="font-semibold text-dark dark:text-white">{QUOTE.customer.name}</p>
              <p className="text-gray-600 dark:text-gray-400">Type: {QUOTE.customer.type}</p>
              <p className="text-gray-600 dark:text-gray-400">Ph: {QUOTE.customer.contactNumber}</p>
              <p className="text-gray-600 dark:text-gray-400">{QUOTE.customer.email}</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Billing Address</p>
              <p className="text-dark dark:text-white">{QUOTE.customer.billingAddress}</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Delivery Address</p>
              <p className="text-dark dark:text-white">{QUOTE.customer.deliveryAddress}</p>
            </div>
          </div>

          {/* Product Table */}
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
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount (%)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Taxable Value (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax (₹)</th>
                  <th className="px-3 py-2 text-center">Net Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {QUOTE.products.map((row, idx) => (
                  <tr key={row.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{row.sno}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.category}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.group}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.variety}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.qty}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discount.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.supplierValue * (1 - row.discount / 100)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="px-3 py-1.5 text-right font-semibold">{row.netPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                  <td colSpan={7} className="border-r border-stroke px-3 py-1.5 text-right">Total</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{(totalMaterial - totalDiscount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{totalTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="px-3 py-1.5 text-right">{netTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* GST Summary + Financial */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* GST table */}
            <div>
              <p className="mb-2 text-xs font-semibold text-dark dark:text-white">GST Summary</p>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-stroke px-3 py-1.5 text-center dark:border-dark-3">HSN Code</th>
                    <th className="border border-stroke px-3 py-1.5 text-center dark:border-dark-3">Tax %</th>
                    <th className="border border-stroke px-3 py-1.5 text-center dark:border-dark-3">CGST (₹)</th>
                    <th className="border border-stroke px-3 py-1.5 text-center dark:border-dark-3">SGST (₹)</th>
                    <th className="border border-stroke px-3 py-1.5 text-center dark:border-dark-3">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {QUOTE.products.map((row, idx) => (
                    <tr key={row.sno} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border border-stroke px-3 py-1 text-center dark:border-dark-3">5208</td>
                      <td className="border border-stroke px-3 py-1 text-right dark:border-dark-3">{row.taxPct}%</td>
                      <td className="border border-stroke px-3 py-1 text-right dark:border-dark-3">{(row.taxPrice / 2).toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-1 text-right dark:border-dark-3">{(row.taxPrice / 2).toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-1 text-right font-semibold dark:border-dark-3">{row.taxPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Financial summary */}
            <div className="space-y-1.5 max-w-xs ml-auto">
              {[
                { label: "Material Value (₹)",  val: totalMaterial.toLocaleString("en-IN", { minimumFractionDigits: 2 }) },
                { label: "Total Discount (₹)",  val: totalDiscount.toLocaleString("en-IN", { minimumFractionDigits: 2 }) },
                { label: "Total Tax (₹)",        val: totalTax.toLocaleString("en-IN", { minimumFractionDigits: 2 }) },
                { label: "Round Off (₹)",        val: roundOff.toFixed(2) },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-gray-600 dark:text-gray-400 w-40 text-right">{row.label}</span>
                  <span className="w-32 rounded border border-stroke bg-gray-50 px-3 py-1 text-right text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white">{row.val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 text-xs border-t border-stroke pt-2 dark:border-dark-3">
                <span className="font-bold text-dark dark:text-white w-40 text-right">Net Total (₹)</span>
                <span className="w-32 rounded border-2 border-[#2d8f7b] bg-gray-50 px-3 py-1 text-right font-bold text-dark dark:bg-gray-800 dark:text-white">
                  {finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Amount in Words */}
          <div className="rounded border border-stroke bg-gray-50 p-3 text-xs dark:border-dark-3 dark:bg-gray-800">
            <span className="font-semibold text-dark dark:text-white">Amount in Words: </span>
            <span className="text-[#2d8f7b] font-medium">{amountWords}</span>
          </div>

          {/* Remarks & Terms */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold text-dark dark:text-white">Remarks</p>
              <div className="rounded border border-stroke bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:border-dark-3 dark:bg-gray-800 dark:text-gray-300">
                {QUOTE.remarks}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-dark dark:text-white">Terms &amp; Conditions</p>
              <div className="rounded border border-stroke bg-gray-50 px-3 py-2 text-xs text-gray-600 whitespace-pre-line dark:border-dark-3 dark:bg-gray-800 dark:text-gray-300">
                {QUOTE.terms}
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="flex items-end justify-between border-t border-stroke pt-6 dark:border-dark-3">
            <div className="text-xs text-gray-500">
              <p>Generated on: {QUOTE.date}</p>
            </div>
            <div className="text-center text-xs">
              <div className="mb-6 border-b border-stroke w-40 dark:border-dark-3" />
              <p className="font-semibold text-dark dark:text-white">{QUOTE.preparedBy}</p>
              <p className="text-gray-500">{QUOTE.designation}</p>
              <p className="text-gray-500">Authorised Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
