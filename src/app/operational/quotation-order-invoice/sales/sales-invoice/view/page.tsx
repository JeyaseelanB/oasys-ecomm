"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const GridIcon = () => <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-4">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

const RECORD = {
  customerType:       "Government",
  customerCode:       "CC1326",
  customerName:       "DEAN VETERINARY HOSPITAL TNJ",
  salesOrderNumber:   "SO-1976-DEC-19",
  salesInvoiceNumber: "SI1976MAR2615537",
};

const PRODUCTS = [
  {
    sno: 1, varietyCode: "YSD3/PC DYED SUITIN...", uom: "Meters",
    hsnCode: "54078290", orderedUnit: 7.50, billingUnit: 1.00,
    unitPrice: 150.00, itemValue: 150.00, discountPct: 0.00, discountValue: 0.00,
    taxPct: 5.00, taxAmount: 7.50, totalAmount: 157.50,
  },
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

export default function ViewSalesInvoicePage() {
  const router = useRouter();

  const totalOrderedUnit = PRODUCTS.reduce((s, r) => s + r.orderedUnit, 0);
  const totalBillingUnit = PRODUCTS.reduce((s, r) => s + r.billingUnit, 0);
  const totalItemVal     = PRODUCTS.reduce((s, r) => s + r.itemValue, 0);
  const totalDiscVal     = PRODUCTS.reduce((s, r) => s + r.discountValue, 0);
  const totalTaxAmt      = PRODUCTS.reduce((s, r) => s + r.taxAmount, 0);
  const totalAmount      = PRODUCTS.reduce((s, r) => s + r.totalAmount, 0);
  const cgst             = totalTaxAmt / 2;
  const sgst             = totalTaxAmt / 2;
  const materialVal      = PRODUCTS.reduce((s, r) => s + r.itemValue, 0);
  const netTotal         = totalAmount;

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Sales Invoice</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Sales Invoice</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Sales Invoice</h3>
        </div>

        <div className="p-5 space-y-4">
          {/* Customer info row */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            {[
              { label: "Customer Type",       val: RECORD.customerType },
              { label: "Customer Code / Name", val: `${RECORD.customerCode} / ${RECORD.customerName}` },
              { label: "Sales Order Number",   val: RECORD.salesOrderNumber },
              { label: "Sales Invoice Number", val: RECORD.salesInvoiceNumber },
            ].map(f => (
              <div key={f.label} className="pb-4">
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{f.label}</p>
                <p className="pt-0.5 text-sm font-medium text-[#17a2b8] dark:text-[#5bc4a8]">{f.val}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* Product Variety Details */}
          <SubHeader title="Product Variety Details" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Product Variety Code / Name</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">UOM</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">HSN Code</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Ordered Unit</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Billing Unit</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Price (₹)</th>
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
                      <td className="border-r border-stroke px-3 py-1.5">{row.varietyCode}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-center">{row.uom}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">{row.hsnCode}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.orderedUnit.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.billingUnit.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitPrice.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.itemValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discountPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discountValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxAmount.toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-right font-semibold">{row.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                    <td colSpan={4} className="border-r border-stroke px-3 py-1.5 text-right">Total</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalOrderedUnit.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalBillingUnit.toFixed(2)}</td>
                    <td className="border-r border-stroke" />
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalItemVal.toFixed(2)}</td>
                    <td className="border-r border-stroke" />
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalDiscVal.toFixed(2)}</td>
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
                { label: "Material Value",                 val: materialVal.toFixed(2) },
                { label: "Discount (₹)",                   val: totalDiscVal.toFixed(2) },
                { label: `CGST ${PRODUCTS[0].taxPct/2}%`, val: cgst.toFixed(2) },
                { label: `SGST ${PRODUCTS[0].taxPct/2}%`, val: sgst.toFixed(2) },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between gap-2">
                  <span className="text-gray-600 dark:text-gray-400 text-right w-36">{r.label}</span>
                  <span className="w-20 text-right text-dark dark:text-white">{r.val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-2 border-t border-stroke pt-1.5 dark:border-dark-3">
                <span className="font-semibold text-dark dark:text-white w-36 text-right">Net Total (₹)</span>
                <span className="w-20 text-right font-bold text-dark dark:text-white">{netTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* GST Summary */}
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
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.billingUnit.toFixed(2)}</td>
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

          {/* Amount in Words */}
          <p className="text-sm">
            <span className="font-medium text-dark dark:text-white">Amount in Words : </span>
            <span className="text-[#2d8f7b] font-medium">{numberToWords(netTotal)}</span>
          </p>

          {/* Back / Preview buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-invoice/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-invoice/preview")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
