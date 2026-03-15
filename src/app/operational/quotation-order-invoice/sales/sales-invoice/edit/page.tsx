"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ListIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const UserIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const HashIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
const CalIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const GridIcon  = () => <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;

const InputBox = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
    {children}
  </div>
);
const labelCls = "block text-xs font-medium text-dark dark:text-white mb-1";
const inputCls = "flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white";
const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-2">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

interface ProductRow {
  id: number; varietyCode: string; uom: string; hsnCode: string;
  orderedUnit: number; alreadyOrdered: number; billingUnit: number;
  unitPrice: number; itemValue: number; discountPct: number; discountValue: number;
  taxPct: number; taxAmount: number; totalAmount: number;
}

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

export default function EditSalesInvoicePage() {
  const router = useRouter();

  const [custType]    = useState("Government");
  const [custName]    = useState("DEAN VETERINARY HOSPITAL TNJ");
  const [orderNum]    = useState("SO-1976-DEC-19");
  const [invDate]     = useState("13-Mar-2026");

  const [products, setProducts] = useState<ProductRow[]>([
    {
      id: 1, varietyCode: "YSD3/PC DYED SUITIN...", uom: "Meters",
      hsnCode: "54078290", orderedUnit: 7.50, alreadyOrdered: 0.00, billingUnit: 1.00,
      unitPrice: 150.00, itemValue: 150.00, discountPct: 0, discountValue: 0.00,
      taxPct: 5.00, taxAmount: 7.50, totalAmount: 157.50,
    },
  ]);

  const updateBillingUnit = (id: number, val: number) => {
    setProducts(p => p.map(r => {
      if (r.id !== id) return r;
      const iv = val * r.unitPrice;
      const dv = iv * r.discountPct / 100;
      const taxable = iv - dv;
      const tv = taxable * r.taxPct / 100;
      return { ...r, billingUnit: val, itemValue: iv, discountValue: dv, taxAmount: tv, totalAmount: taxable + tv };
    }));
  };

  const totalOrdered   = products.reduce((s, r) => s + r.orderedUnit, 0);
  const totalBilling   = products.reduce((s, r) => s + r.billingUnit, 0);
  const totalItemVal   = products.reduce((s, r) => s + r.itemValue, 0);
  const totalDiscVal   = products.reduce((s, r) => s + r.discountValue, 0);
  const totalTaxAmt    = products.reduce((s, r) => s + r.taxAmount, 0);
  const totalAmount    = products.reduce((s, r) => s + r.totalAmount, 0);
  const cgst           = totalTaxAmt / 2;
  const sgst           = totalTaxAmt / 2;
  const materialValue  = products.reduce((s, r) => s + r.itemValue, 0);
  const netTotal       = totalAmount;

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Sales Invoice</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Sales Invoice</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Sales Invoice</h3>
          <span className="text-xs text-white/80">* Mandatory Fields</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Info row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Customer Type</label>
              <InputBox icon={<ListIcon />}>
                <input readOnly value={custType} className={`${inputCls} bg-gray-50 dark:bg-gray-800`} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Customer Name <span className="text-red-500">*</span></label>
              <InputBox icon={<UserIcon />}>
                <input readOnly value={custName} className={`${inputCls} bg-gray-50 dark:bg-gray-800`} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Order Number <span className="text-red-500">*</span></label>
              <InputBox icon={<HashIcon />}>
                <input readOnly value={orderNum} className={`${inputCls} bg-gray-50 dark:bg-gray-800`} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Invoice Date <span className="text-red-500">*</span></label>
              <InputBox icon={<CalIcon />}>
                <input readOnly value={invDate} className={`${inputCls} bg-gray-50 dark:bg-gray-800`} />
              </InputBox>
            </div>
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
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Already Ordered Unit</th>
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
                  {products.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-1.5">{row.varietyCode}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-center">{row.uom}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">{row.hsnCode}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.orderedUnit.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.alreadyOrdered.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-1">
                        <input type="number" value={row.billingUnit}
                          onChange={e => updateBillingUnit(row.id, parseFloat(e.target.value)||0)}
                          className="w-16 rounded border border-stroke bg-white px-2 py-0.5 text-xs text-right focus:outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                      </td>
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
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalOrdered.toFixed(2)}</td>
                    <td className="border-r border-stroke" />
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{totalBilling.toFixed(2)}</td>
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
                { label: "Material Value", val: materialValue.toFixed(2) },
                { label: "Discount (₹)",   val: totalDiscVal.toFixed(2) },
                { label: `CGST ${products[0]?.taxPct/2}%`, val: cgst.toFixed(2) },
                { label: `SGST ${products[0]?.taxPct/2}%`, val: sgst.toFixed(2) },
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
                {products.map((row, idx) => (
                  <tr key={row.id} className={idx%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
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

          <p className="text-sm">
            <span className="font-medium text-dark dark:text-white">Amount in Words : </span>
            <span className="text-[#2d8f7b] font-medium">{numberToWords(netTotal)}</span>
          </p>

          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-invoice/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
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
