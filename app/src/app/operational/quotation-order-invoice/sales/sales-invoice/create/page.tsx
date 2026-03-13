"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── icons ─────────────────────────────────────────────────────────── */
const ListIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const UserIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const HashIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
const CalIcon    = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const QRIcon     = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16" y="16" width="3" height="3" fill="currentColor" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/></svg>;
const GridIcon   = () => <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const ChevronIcon= () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 12,15 18,9"/></svg>;

const InputBox = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
    {children}
  </div>
);
const labelCls = "block text-xs font-medium text-dark dark:text-white mb-1";
const inputCls = "flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white";
const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-5">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

/* ── QR catalogue (demo) ─────────────────────────────────────────── */
const QR_CATALOGUE: Record<string, { itemCode: string; itemName: string; unitRate: number; taxPct: number; hsnCode: string; remainingStock: number; }> = {
  "18811461694": { itemCode: "YSD3",  itemName: "PC DYED SUITING CLOTH", unitRate: 150, taxPct: 5, hsnCode: "54078290", remainingStock: 0.0 },
  "18811461695": { itemCode: "YPF3",  itemName: "POLYESTER FABRIC",      unitRate: 95,  taxPct: 5, hsnCode: "54078290", remainingStock: 16.8 },
  "18811461696": { itemCode: "KAN01", itemName: "KANJIVARAM SILK",        unitRate: 4500,taxPct: 12,hsnCode: "50072000", remainingStock: 5.0 },
};

interface ProductRow {
  id: number; qrCode: string;
  itemCode: string; itemName: string;
  unitRate: number; quantity: number;
  itemValue: number; discountPct: number; discountValue: number;
  taxPct: number; taxAmount: number; totalAmount: number;
  hsnCode: string;
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

export default function CreateSalesInvoicePage() {
  const router = useRouter();

  /* header */
  const [custType,    setCustType]    = useState("");
  const [custCode,    setCustCode]    = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("13-Mar-2026");

  /* receive product */
  const [qrInput,       setQrInput]       = useState("");
  const [remainingInfo, setRemainingInfo] = useState("");
  const [products, setProducts]           = useState<ProductRow[]>([]);

  const handleAddQR = () => {
    const item = QR_CATALOGUE[qrInput.trim()];
    if (!item) {
      setRemainingInfo("QR code not found.");
      return;
    }
    setRemainingInfo(`Remaining Stock :${item.itemName} is : ${item.remainingStock}`);
    const qty = 1;
    const iv  = qty * item.unitRate;
    const tv  = iv * item.taxPct / 100;
    setProducts(p => [...p, {
      id: Date.now(), qrCode: qrInput.trim(),
      itemCode: item.itemCode, itemName: item.itemName,
      unitRate: item.unitRate, quantity: qty,
      itemValue: iv, discountPct: 0, discountValue: 0,
      taxPct: item.taxPct, taxAmount: tv, totalAmount: iv + tv,
      hsnCode: item.hsnCode,
    }]);
    setQrInput("");
  };

  const updateQty = (id: number, qty: number) => {
    setProducts(p => p.map(r => {
      if (r.id !== id) return r;
      const iv = qty * r.unitRate;
      const dv = iv * r.discountPct / 100;
      const taxable = iv - dv;
      const tv = taxable * r.taxPct / 100;
      return { ...r, quantity: qty, itemValue: iv, discountValue: dv, taxAmount: tv, totalAmount: taxable + tv };
    }));
  };

  const removeProduct = (id: number) => setProducts(p => p.filter(r => r.id !== id));

  /* totals */
  const totalQty      = products.reduce((s, r) => s + r.quantity, 0);
  const totalItemVal  = products.reduce((s, r) => s + r.itemValue, 0);
  const totalDiscVal  = products.reduce((s, r) => s + r.discountValue, 0);
  const totalTaxAmt   = products.reduce((s, r) => s + r.taxAmount, 0);
  const totalAmount   = products.reduce((s, r) => s + r.totalAmount, 0);
  const materialValue = products.reduce((s, r) => s + r.itemValue, 0);
  const cgst          = totalTaxAmt / 2;
  const sgst          = totalTaxAmt / 2;
  const netTotal      = totalAmount;

  /* product summary (grouped by itemCode) */
  const prodSummary = products.reduce<Record<string, { hsnCode: string; unitRate: number; orderedUnit: number; alreadyOrdered: number; billingUnit: number }>>((acc, r) => {
    if (!acc[r.itemCode]) acc[r.itemCode] = { hsnCode: r.hsnCode, unitRate: r.unitRate, orderedUnit: 7.5, alreadyOrdered: 7.5, billingUnit: 0 };
    acc[r.itemCode].billingUnit += r.quantity;
    return acc;
  }, {});

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Sales Invoice</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Sales Invoice</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Sales Invoice</h3>
          <span className="text-xs text-white/80">* Mandatory Fields</span>
        </div>

        <div className="p-5 space-y-4">
          {/* ── Sales Invoice Info ────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Customer Type</label>
              <InputBox icon={<ListIcon />}>
                <select value={custType} onChange={e => setCustType(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>Government</option><option>Retail</option><option>Wholesale</option><option>DISTRICT COLLECTER</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Customer Code / Name <span className="text-red-500">*</span></label>
              <InputBox icon={<UserIcon />}>
                <input value={custCode} onChange={e => setCustCode(e.target.value)} className={inputCls} placeholder="Enter customer code / name" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Order Number <span className="text-red-500">*</span></label>
              <InputBox icon={<HashIcon />}>
                <select value={orderNumber} onChange={e => setOrderNumber(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>SO-1976-DEC-19-1215</option>
                  <option>SO-1976-FEB-24-11427</option>
                  <option>SO-1976-FEB-24-11399</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Invoice Date <span className="text-red-500">*</span></label>
              <InputBox icon={<CalIcon />}>
                <input value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className={inputCls} placeholder="dd-MMM-yyyy" />
              </InputBox>
            </div>
          </div>

          {/* Clear / Search */}
          <div className="flex justify-end gap-2">
            <button onClick={() => { setCustType(""); setCustCode(""); setOrderNumber(""); setInvoiceDate(""); setProducts([]); setRemainingInfo(""); }}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
            </button>
          </div>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* ── Receive Product ───────────────────────────────────── */}
          <SubHeader title="Receive Product" />
          <div className="flex items-end gap-4 flex-wrap">
            <div className="w-64">
              <label className={labelCls}>QR Code <span className="text-red-500">*</span></label>
              <InputBox icon={<QRIcon />}>
                <input value={qrInput} onChange={e => setQrInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddQR()}
                  className={inputCls} placeholder="Scan or enter QR code" />
              </InputBox>
            </div>
            <button onClick={handleAddQR}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Add
            </button>
            {remainingInfo && (
              <p className="text-sm font-medium text-[#17a2b8]">{remainingInfo}</p>
            )}
          </div>

          {/* ── Product Variety Details ───────────────────────────── */}
          <SubHeader title="Product Variety Details" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Item Code / Name</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Rate (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Quantity</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Item Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount (%)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">Tax (%)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax Amount (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Total Amount (₹)</th>
                    <th className="px-2 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan={11} className="py-6 text-center text-gray-400">No records found</td></tr>
                  ) : products.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-1.5">{row.itemCode}/{row.itemName.substring(0, 14)}...</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitRate.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-1">
                        <input type="number" value={row.quantity}
                          onChange={e => updateQty(row.id, parseFloat(e.target.value) || 0)}
                          className="w-16 rounded border border-stroke bg-white px-2 py-0.5 text-xs text-right focus:outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                      </td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.itemValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discountPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discountValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxAmount.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right font-semibold">{row.totalAmount.toFixed(2)}</td>
                      <td className="px-2 py-1.5 text-center">
                        <button onClick={() => removeProduct(row.id)}
                          className="rounded bg-red-500 p-1 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2 2 0 01-2 2H8a2 2 0 01-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length > 0 && (
                    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                      <td colSpan={3} className="border-r border-stroke px-3 py-1.5 text-right font-bold">Total</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalQty.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalItemVal.toFixed(2)}</td>
                      <td className="border-r border-stroke" />
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalDiscVal.toFixed(2)}</td>
                      <td className="border-r border-stroke" />
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalTaxAmt.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalAmount.toFixed(2)}</td>
                      <td />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Financial summary panel */}
            <div className="space-y-1.5 text-xs">
              {[
                { label: "Material Value (₹)", val: materialValue.toFixed(2) },
                { label: "Discount (₹)",        val: totalDiscVal.toFixed(2) },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between gap-2">
                  <span className="text-gray-600 dark:text-gray-400 text-right w-44">{r.label}</span>
                  <span className="w-20 text-right font-semibold text-dark dark:text-white">{r.val}</span>
                </div>
              ))}
              {products.length > 0 ? (
                <>
                  {[
                    { label: `CGST ${products[0]?.taxPct/2}%`, val: cgst.toFixed(2) },
                    { label: `SGST ${products[0]?.taxPct/2}%`, val: sgst.toFixed(2) },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between gap-2">
                      <span className="text-gray-600 dark:text-gray-400 text-right w-44">{r.label}</span>
                      <span className="w-20 text-right text-dark dark:text-white">{r.val}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-2 border-t border-stroke pt-1.5 dark:border-dark-3">
                    <span className="font-semibold text-dark dark:text-white text-right w-44">Net Total (₹)</span>
                    <span className="w-20 text-right font-bold text-dark dark:text-white">{netTotal.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="rounded border border-stroke bg-gray-50 p-2 text-center text-gray-400 dark:border-dark-3 dark:bg-gray-800">No records found</div>
              )}
            </div>
          </div>

          {/* ── GST Summary (shown when products exist) ───────────── */}
          {products.length > 0 && (
            <>
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
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
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

              {/* Product Summary */}
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
                    {Object.entries(prodSummary).map(([code, row], idx) => (
                      <tr key={code} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                        <td className="border-r border-stroke px-3 py-1.5">{code}</td>
                        <td className="border-r border-stroke px-3 py-1.5 text-center">{row.hsnCode}</td>
                        <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitRate.toFixed(1)}</td>
                        <td className="border-r border-stroke px-3 py-1.5 text-right">{row.orderedUnit.toFixed(1)}</td>
                        <td className="border-r border-stroke px-3 py-1.5 text-right">{row.alreadyOrdered.toFixed(1)}</td>
                        <td className="px-3 py-1.5 text-right">{row.billingUnit.toFixed(1)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                      <td colSpan={3} className="border-r border-stroke px-3 py-1.5 text-right">Total</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{Object.values(prodSummary).reduce((s, r) => s + r.orderedUnit, 0).toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{Object.values(prodSummary).reduce((s, r) => s + r.alreadyOrdered, 0).toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-right">{Object.values(prodSummary).reduce((s, r) => s + r.billingUnit, 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          <p className="text-xs text-gray-500">Note : GST is not applicable for Free sample.</p>

          {products.length > 0 && (
            <p className="text-sm">
              <span className="font-medium text-dark dark:text-white">Amount in Words : </span>
              <span className="text-[#2d8f7b] font-medium">{numberToWords(netTotal)}</span>
            </p>
          )}

          {/* Actions */}
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
