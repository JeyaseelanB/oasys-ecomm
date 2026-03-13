"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const GridIcon = () => <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-5">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

const FROM = {
  entityCode: "1976", entityName: "ISSR - THANJAVUR",
  type: "ISSR", tel: "04362-227495", fax: "", email: "",
  website: "www.cooptex.gov.in", gstNo: "33AAAAH2788P1Z8",
};
const TO = {
  name: "DEAN VETERINARY HOSPITAL TNJ",
  fullName: "THE DEAN VETERINARY HOSPITAL",
  tel: "22452", fax: "", email: "", website: "", gstNo: "",
};
const INV_DETAILS = {
  salesInvoiceNumber: "SI1976MAR2615537",
  salesOrderNumber:   "SO-1976-DEC-19",
  salesOrderDate:     "31-Dec-2019",
  salesInvoiceDate:   "13-Mar-2026",
};
const PRODUCTS = [
  { sno: 1, varietyCode: "YSD3", itemName: "PC DYED SUITING CLOTH", uom: "METR", qrCode: "18811461694",
    unitRate: 150.00, quantity: 1.00, itemValue: 150.00, discount: 0.00, discountValue: 0.00,
    taxPct: 5.00, taxAmount: 7.50, totalAmount: 157.50, hsnCode: "54078290" },
];
const PROD_SUMMARY = [
  { itemCode: "YSD3", hsnCode: "54078290", unitRate: 150.0, orderedUnit: 7.5,  alreadyOrdered: 7.5,  billingUnit: 1.0 },
  { itemCode: "YPF3", hsnCode: "54078290", unitRate: 95.0,  orderedUnit: 16.8, alreadyOrdered: 16.8, billingUnit: 0.0 },
];

function numberToWords(n: number): string {
  if (n === 0) return "Zero";
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const convert = (num: number): string => {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num/10)] + (num%10?" "+ones[num%10]:"");
    if (num < 1000) return ones[Math.floor(num/100)]+" Hundred"+(num%100?" "+convert(num%100):"");
    if (num < 100000) return convert(Math.floor(num/1000))+" Thousand"+(num%1000?" "+convert(num%1000):"");
    return convert(Math.floor(num/100000))+" Lakh"+(num%100000?" "+convert(num%100000):"");
  };
  const ip = Math.floor(n); const dp = Math.round((n - ip)*100);
  return convert(ip)+" Rupees"+(dp>0?" And "+convert(dp)+" Paise":"")+" Only";
}

export default function PreviewSalesInvoicePage() {
  const router = useRouter();

  const totalQty     = PRODUCTS.reduce((s, r) => s + r.quantity, 0);
  const totalItemVal = PRODUCTS.reduce((s, r) => s + r.itemValue, 0);
  const totalDiscVal = PRODUCTS.reduce((s, r) => s + r.discountValue, 0);
  const totalTaxAmt  = PRODUCTS.reduce((s, r) => s + r.taxAmount, 0);
  const totalAmount  = PRODUCTS.reduce((s, r) => s + r.totalAmount, 0);
  const cgst         = totalTaxAmt / 2;
  const sgst         = totalTaxAmt / 2;
  const materialVal  = PRODUCTS.reduce((s, r) => s + r.itemValue, 0);
  const netTotal     = totalAmount;

  const totalSumOrdered = PROD_SUMMARY.reduce((s, r) => s + r.orderedUnit, 0);
  const totalSumAlready = PROD_SUMMARY.reduce((s, r) => s + r.alreadyOrdered, 0);
  const totalSumBilling = PROD_SUMMARY.reduce((s, r) => s + r.billingUnit, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Preview Sales Invoice</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Preview Sales Invoice</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card print:shadow-none print:border-none">
        <div className="p-5 space-y-5">
          {/* ── 3-column header ───────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* From */}
            <div className="rounded-[6px] border border-stroke overflow-hidden dark:border-dark-3">
              <div className="bg-[#17a2b8] px-4 py-2">
                <h4 className="text-xs font-semibold text-white">Sales Invoice - From</h4>
              </div>
              <div className="p-3 text-xs space-y-0.5">
                <p className="font-semibold text-[#17a2b8]">{FROM.entityCode} / {FROM.entityName}</p>
                <p className="text-dark dark:text-white">{FROM.type}</p>
                <p className="text-gray-600 dark:text-gray-400">Tel: {FROM.tel}</p>
                <p className="text-gray-600 dark:text-gray-400">Fax: {FROM.fax}</p>
                <p className="text-gray-600 dark:text-gray-400">Email : {FROM.email}</p>
                <p className="text-gray-600 dark:text-gray-400">Website : <span className="text-[#17a2b8]">{FROM.website}</span></p>
                <p className="text-gray-600 dark:text-gray-400">GST NO: {FROM.gstNo}</p>
              </div>
            </div>
            {/* To */}
            <div className="rounded-[6px] border border-stroke overflow-hidden dark:border-dark-3">
              <div className="bg-[#17a2b8] px-4 py-2">
                <h4 className="text-xs font-semibold text-white">Sales Invoice - To</h4>
              </div>
              <div className="p-3 text-xs space-y-0.5">
                <p className="font-semibold text-[#17a2b8]">{TO.name}</p>
                <p className="text-dark dark:text-white">{TO.fullName}</p>
                <p className="text-gray-600 dark:text-gray-400">Tel: {TO.tel}</p>
                <p className="text-gray-600 dark:text-gray-400">Fax: {TO.fax}</p>
                <p className="text-gray-600 dark:text-gray-400">Email : {TO.email}</p>
                <p className="text-gray-600 dark:text-gray-400">Website : {TO.website}</p>
                <p className="text-gray-600 dark:text-gray-400">GST NO : {TO.gstNo}</p>
              </div>
            </div>
            {/* Invoice Details */}
            <div className="rounded-[6px] border border-stroke overflow-hidden dark:border-dark-3">
              <div className="bg-[#17a2b8] px-4 py-2">
                <h4 className="text-xs font-semibold text-white">Sales Invoice Details</h4>
              </div>
              <div className="p-3 text-xs space-y-1.5">
                {[
                  { label: "Sales Invoice Number", val: INV_DETAILS.salesInvoiceNumber },
                  { label: "Sales Order Number",   val: INV_DETAILS.salesOrderNumber },
                  { label: "Sales Order Date",      val: INV_DETAILS.salesOrderDate },
                  { label: "Sales Invoice Date",    val: INV_DETAILS.salesInvoiceDate },
                ].map(f => (
                  <div key={f.label} className="flex items-start gap-1">
                    <span className="text-gray-600 dark:text-gray-400 w-44">{f.label}</span>
                    <span className="text-gray-400">:</span>
                    <span className="font-semibold text-dark dark:text-white">{f.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Product Variety Details ──────────────────────────── */}
          <SubHeader title="Product Variety Details" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Item Code / Name</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">UOM</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">QR Code</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Rate (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Quantity</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Item Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount (%)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">Tax (%)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax Amount (₹)</th>
                    <th className="px-3 py-2 text-center">Total Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((row, idx) => (
                    <tr key={row.sno} className={idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{row.sno}</td>
                      <td className="border-r border-stroke px-3 py-1.5">{row.varietyCode}/{row.itemName.substring(0,12)}...</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-center">{row.uom}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">{row.qrCode}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitRate.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.quantity.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.itemValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discount.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discountValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxAmount.toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-right font-semibold">{row.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                    <td colSpan={5} className="border-r border-stroke px-3 py-1.5 text-right">Total</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalQty.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalItemVal.toFixed(2)}</td>
                    <td className="border-r border-stroke" colSpan={2} />
                    <td className="border-r border-stroke" />
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalTaxAmt.toFixed(2)}</td>
                    <td className="px-3 py-1.5 text-right">{totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Financial summary */}
            <div className="space-y-1.5 text-xs">
              {[
                { label: "Material Value (₹)",            val: materialVal.toFixed(2) },
                { label: "Discount (₹)",                   val: totalDiscVal.toFixed(2) },
                { label: `CGST ${PRODUCTS[0].taxPct/2}%`, val: cgst.toFixed(2) },
                { label: `SGST ${PRODUCTS[0].taxPct/2}%`, val: sgst.toFixed(2) },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between gap-2">
                  <span className="text-gray-600 dark:text-gray-400 text-right w-44">{r.label}</span>
                  <span className="w-20 text-right text-dark dark:text-white">{r.val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-2 border-t border-stroke pt-1.5 dark:border-dark-3">
                <span className="font-semibold text-dark dark:text-white w-44 text-right">Net Total (₹)</span>
                <span className="w-20 text-right font-bold text-dark dark:text-white">{netTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* ── GST Summary ───────────────────────────────────────── */}
          <SubHeader title="GST Summary" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs" style={{ maxWidth: "600px" }}>
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
                  <tr key={row.sno} className={idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.hsnCode}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.quantity.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPct.toFixed(1)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxAmount/2).toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxAmount/2).toFixed(2)}</td>
                    <td className="px-3 py-1.5 text-right font-semibold">{row.taxAmount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                  <td colSpan={3} className="border-r border-stroke px-3 py-1.5 text-center">Total</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{cgst.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{sgst.toFixed(2)}</td>
                  <td className="px-3 py-1.5 text-right">{totalTaxAmt.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── Product Summary ───────────────────────────────────── */}
          <SubHeader title="Product Summary" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs" style={{ maxWidth: "700px" }}>
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Item Code</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">HSN Code</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Rate</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Ordered Unit</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Already Ordered Unit</th>
                  <th className="px-3 py-2 text-center">Billing Unit</th>
                </tr>
              </thead>
              <tbody>
                {PROD_SUMMARY.map((row, idx) => (
                  <tr key={row.itemCode} className={idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-3 py-1.5">{row.itemCode}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-center">{row.hsnCode}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitRate.toFixed(1)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.orderedUnit.toFixed(1)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.alreadyOrdered.toFixed(1)}</td>
                    <td className="px-3 py-1.5 text-right">{row.billingUnit.toFixed(1)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                  <td colSpan={3} className="border-r border-stroke px-3 py-1.5 text-right">Total</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{totalSumOrdered.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-1.5 text-right">{totalSumAlready.toFixed(2)}</td>
                  <td className="px-3 py-1.5 text-right">{totalSumBilling.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount in Words + Certified Terms + Signature */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs" style={{ maxWidth: "700px" }}>
              <tbody>
                {[
                  { label: "Amount in Words", val: numberToWords(netTotal), highlight: true },
                  { label: "Certified Terms",  val: "", highlight: false },
                  { label: "Signature",        val: "", highlight: false },
                ].map(row => (
                  <tr key={row.label}>
                    <td className="border border-stroke bg-gray-200 dark:bg-gray-700 px-3 py-2 font-medium text-dark dark:text-white w-36">{row.label}</td>
                    <td className={`border border-stroke px-3 py-2 ${row.highlight ? "text-[#2d8f7b] font-medium" : "text-gray-400"}`}>{row.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-red-500">* This is Computer Generated, No Manual Signature Required</p>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-invoice/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print
            </button>
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-invoice/list")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
