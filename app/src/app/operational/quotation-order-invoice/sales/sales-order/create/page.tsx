"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

/* ── icons ─────────────────────────────────────────────────────────── */
const HashIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
const UserIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CalIcon    = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ChevronIcon= () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 12,15 18,9"/></svg>;
const PriceIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
const PctIcon    = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
const ArrowIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
const InfoIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const GridIcon   = () => <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const NoteIcon   = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;

/* ── shared components ──────────────────────────────────────────────── */
const InputBox = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
    {children}
  </div>
);
const labelCls = "block text-xs font-medium text-dark dark:text-white mb-1";
const inputCls = "flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white";
const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

/* ── product row type ────────────────────────────────────────────────── */
interface ProductRow {
  id: number;
  varietyCode: string; variety: string; uom: string;
  quantity: number; retailPrice: number; supplierRate: number;
  discountValue: number; supplierValue: number;
  taxPct: number; taxAmount: number; totalAmount: number;
}

/* ── delivery row type ───────────────────────────────────────────────── */
interface DeliveryRow {
  id: number;
  varietyCode: string; unitRate: number;
  orderedQty: number; deliveryQty: number; deliveryAddress: string;
}

function numberToWords(n: number): string {
  if (n === 0) return "Zero";
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const convert = (num: number): string => {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num/10)] + (num%10 ? " "+ones[num%10] : "");
    if (num < 1000) return ones[Math.floor(num/100)]+" Hundred"+(num%100?" "+convert(num%100):"");
    if (num < 100000) return convert(Math.floor(num/1000))+" Thousand"+(num%1000?" "+convert(num%1000):"");
    if (num < 10000000) return convert(Math.floor(num/100000))+" Lakh"+(num%100000?" "+convert(num%100000):"");
    return convert(Math.floor(num/10000000))+" Crore"+(num%10000000?" "+convert(num%10000000):"");
  };
  const intPart = Math.floor(n);
  const decPart = Math.round((n - intPart) * 100);
  let result = convert(intPart) + " Rupees";
  if (decPart > 0) result += " And " + convert(decPart) + " Paise";
  return result + " Only";
}

export default function CreateSalesOrderPage() {
  const router = useRouter();
  const noteRef = useRef<HTMLDivElement>(null);

  /* ── Sales Order header fields ──────────────────────────────────── */
  const [custType,       setCustType]       = useState("");
  const [custName,       setCustName]       = useState("");
  const [orderType,      setOrderType]      = useState("");
  const [salesType,      setSalesType]      = useState("");
  const [salesAccount,   setSalesAccount]   = useState("");
  const [orderNumber,    setOrderNumber]    = useState("");
  const [validityDate,   setValidityDate]   = useState("");
  const [deliveryDate,   setDeliveryDate]   = useState("");

  /* ── Add Product Detail form ─────────────────────────────────────── */
  const [selVariety,     setSelVariety]     = useState("");
  const [selCategory,    setSelCategory]    = useState("");
  const [selGroup,       setSelGroup]       = useState("");
  const [selUom,         setSelUom]         = useState("Nos");
  const [purchasePrice,  setPurchasePrice]  = useState("");
  const [retailPrice,    setRetailPrice]    = useState("");
  const [supplierRate,   setSupplierRate]   = useState("");
  const [discountValue,  setDiscountValue]  = useState("");
  const [quantity,       setQuantity]       = useState("");
  const [discount,       setDiscount]       = useState("");
  const [profitMargin,   setProfitMargin]   = useState("");

  /* ── Product rows table ──────────────────────────────────────────── */
  const [products, setProducts] = useState<ProductRow[]>([]);

  /* ── Billing / Delivery ──────────────────────────────────────────── */
  const [billingAddress, setBillingAddress] = useState("");
  const [delivRows, setDelivRows]           = useState<DeliveryRow[]>([]);
  const [delivVariety,   setDelivVariety]   = useState("");
  const [orderedQty,     setOrderedQty]     = useState("0.0");
  const [delivQty,       setDelivQty]       = useState("");
  const [delivAddr,      setDelivAddr]      = useState("");

  /* ── Workflow ────────────────────────────────────────────────────── */
  const [forwardTo,  setForwardTo]  = useState("");
  const [forwardFor, setForwardFor] = useState("");

  /* ── Note modal ──────────────────────────────────────────────────── */
  const [showNote,      setShowNote]      = useState(false);
  const [noteFontSize,  setNoteFontSize]  = useState("14px");
  const [noteFontFamily,setNoteFontFamily]= useState("sans-serif");

  /* ── computed totals ─────────────────────────────────────────────── */
  const totalQty       = products.reduce((s, r) => s + r.quantity, 0);
  const totalRetail    = products.reduce((s, r) => s + r.retailPrice * r.quantity, 0);
  const totalSupRate   = products.reduce((s, r) => s + r.supplierRate, 0);
  const totalDiscVal   = products.reduce((s, r) => s + r.discountValue, 0);
  const totalSupValue  = products.reduce((s, r) => s + r.supplierValue, 0);
  const totalTaxAmt    = products.reduce((s, r) => s + r.taxAmount, 0);
  const totalAmount    = products.reduce((s, r) => s + r.totalAmount, 0);
  const materialValue  = products.reduce((s, r) => s + r.supplierValue, 0);
  const discountTotal  = products.reduce((s, r) => s + r.discountValue, 0);
  const cgst           = totalTaxAmt / 2;
  const sgst           = totalTaxAmt / 2;

  const addProduct = () => {
    const qty  = parseFloat(quantity) || 0;
    const rp   = parseFloat(retailPrice) || 0;
    const sr   = parseFloat(supplierRate) || 0;
    const disc = parseFloat(discount) || 0;
    const sv   = qty * sr;
    const dv   = (sv * disc) / 100;
    const taxable = sv - dv;
    const tax = taxable * 0.05;
    const total = taxable + tax;
    setProducts(p => [...p, {
      id: Date.now(), varietyCode: selVariety, variety: selVariety,
      uom: selUom, quantity: qty, retailPrice: rp, supplierRate: sr,
      discountValue: dv, supplierValue: sv, taxPct: 5, taxAmount: tax, totalAmount: total,
    }]);
    setSelVariety(""); setSelCategory(""); setSelGroup(""); setSelUom("Nos");
    setPurchasePrice(""); setRetailPrice(""); setSupplierRate(""); setDiscountValue("");
    setQuantity(""); setDiscount(""); setProfitMargin("");
  };

  const clearProduct = () => {
    setSelVariety(""); setSelCategory(""); setSelGroup(""); setSelUom("Nos");
    setPurchasePrice(""); setRetailPrice(""); setSupplierRate(""); setDiscountValue("");
    setQuantity(""); setDiscount(""); setProfitMargin("");
  };

  const removeProduct = (id: number) => setProducts(p => p.filter(r => r.id !== id));

  const addDelivery = () => {
    const pr = products.find(r => r.varietyCode === delivVariety);
    setDelivRows(d => [...d, {
      id: Date.now(), varietyCode: delivVariety,
      unitRate: pr?.supplierRate || 0, orderedQty: parseFloat(orderedQty) || 0,
      deliveryQty: parseFloat(delivQty) || 0, deliveryAddress: delivAddr,
    }]);
    setDelivVariety(""); setOrderedQty("0.0"); setDelivQty(""); setDelivAddr("");
  };

  const clearDelivery = () => {
    setDelivVariety(""); setOrderedQty("0.0"); setDelivQty(""); setDelivAddr("");
  };

  const removeDelivery = (id: number) => setDelivRows(d => d.filter(r => r.id !== id));

  const execFormat = (cmd: string, val?: string) => document.execCommand(cmd, false, val);

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Sales Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Sales Order</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Sales Order</h3>
          <span className="text-xs text-white/80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5 space-y-6">
          {/* ── Sales Order Info ─────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Customer Type <span className="text-red-500">*</span></label>
              <InputBox icon={<ChevronIcon />}>
                <select value={custType} onChange={e => setCustType(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>Retail</option><option>Wholesale</option><option>Government</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Customer Name <span className="text-red-500">*</span></label>
              <InputBox icon={<UserIcon />}>
                <input value={custName} onChange={e => setCustName(e.target.value)} className={inputCls} placeholder="Enter customer name" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Order Type <span className="text-red-500">*</span></label>
              <InputBox icon={<ChevronIcon />}>
                <select value={orderType} onChange={e => setOrderType(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>Contract</option><option>Open Market</option><option>Free Sample</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Type <span className="text-red-500">*</span></label>
              <InputBox icon={<ChevronIcon />}>
                <select value={salesType} onChange={e => setSalesType(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>Wholesale</option><option>Retail</option><option>Government</option>
                </select>
              </InputBox>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Sales Account <span className="text-red-500">*</span></label>
              <InputBox icon={<HashIcon />}>
                <select value={salesAccount} onChange={e => setSalesAccount(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>RO_CONTRACT_SALES</option><option>HO_SALES</option><option>ISSR_SALES</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Order Number</label>
              <InputBox icon={<HashIcon />}>
                <input value={orderNumber} onChange={e => setOrderNumber(e.target.value)} className={inputCls} placeholder="Auto generated" readOnly />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Sales Order Validity Date <span className="text-red-500">*</span></label>
              <InputBox icon={<CalIcon />}>
                <input type="date" value={validityDate} onChange={e => setValidityDate(e.target.value)} className={inputCls} placeholder="dd-MMM-yyyy" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Expected Date of Delivery <span className="text-red-500">*</span></label>
              <InputBox icon={<CalIcon />}>
                <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className={inputCls} placeholder="dd-MMM-yyyy" />
              </InputBox>
            </div>
          </div>

          {/* Clear / Search buttons */}
          <div className="flex justify-end gap-2">
            <button onClick={() => { setCustType(""); setCustName(""); setOrderType(""); setSalesType(""); setSalesAccount(""); setOrderNumber(""); setValidityDate(""); setDeliveryDate(""); }}
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

          {/* ── Add Product Details ───────────────────────────────── */}
          <SubHeader title="Add Product Details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Product Variety Code / Name <span className="text-red-500">*</span></label>
              <InputBox icon={<GridIcon />}>
                <select value={selVariety} onChange={e => setSelVariety(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>DSU2/HL SUITING</option>
                  <option>KAN001/Kanjivaram Silk</option>
                  <option>COT002/Cotton Dhoti</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Product Category Code / Name <span className="text-red-500">*</span></label>
              <InputBox icon={<GridIcon />}>
                <input value={selCategory} onChange={e => setSelCategory(e.target.value)} className={inputCls} placeholder="Category" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Product Group Code / Name <span className="text-red-500">*</span></label>
              <InputBox icon={<GridIcon />}>
                <input value={selGroup} onChange={e => setSelGroup(e.target.value)} className={inputCls} placeholder="Product Group" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>UOM</label>
              <InputBox icon={<HashIcon />}>
                <input value={selUom} onChange={e => setSelUom(e.target.value)} className={inputCls} placeholder="UOM" />
              </InputBox>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Purchase Price</label>
              <InputBox icon={<PriceIcon />}>
                <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} className={inputCls} placeholder="0.00" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Retail Price <span className="text-red-500">*</span></label>
              <InputBox icon={<PriceIcon />}>
                <input type="number" value={retailPrice} onChange={e => setRetailPrice(e.target.value)} className={inputCls} placeholder="0.00" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Supplier Rate <span className="text-red-500">*</span></label>
              <InputBox icon={<PriceIcon />}>
                <input type="number" value={supplierRate} onChange={e => setSupplierRate(e.target.value)} className={inputCls} placeholder="0.00" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Discount Value</label>
              <InputBox icon={<InfoIcon />}>
                <input type="number" value={discountValue} onChange={e => setDiscountValue(e.target.value)} className={inputCls} placeholder="0.00" />
              </InputBox>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Quantity <span className="text-red-500">*</span></label>
              <InputBox icon={<HashIcon />}>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className={inputCls} placeholder="0" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Discount</label>
              <InputBox icon={<PctIcon />}>
                <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className={inputCls} placeholder="0.00" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Profit Margin</label>
              <InputBox icon={<PctIcon />}>
                <input type="number" value={profitMargin} onChange={e => setProfitMargin(e.target.value)} className={inputCls} placeholder="0.00" />
              </InputBox>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={clearProduct}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
            <button onClick={addProduct}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
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
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Retail Price (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Rate (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Value (₹)</th>
                    <th className="border-r border-[#3aa88f] px-2 py-2 text-center">Tax (%)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax Amount (₹)</th>
                    <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Total Amount (₹)</th>
                    <th className="px-2 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan={12} className="py-6 text-center text-gray-400">No records found</td></tr>
                  ) : products.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-1.5">{row.variety}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-center">{row.uom}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{row.quantity.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.retailPrice.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.supplierRate.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.discountValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.supplierValue.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{row.taxPct.toFixed(1)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxAmount.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right font-semibold">{row.totalAmount.toFixed(2)}</td>
                      <td className="px-2 py-1.5 text-center">
                        <button onClick={() => removeProduct(row.id)}
                          className="rounded bg-red-500 px-2 py-0.5 text-[10px] text-white hover:opacity-90">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length > 0 && (
                    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                      <td colSpan={3} className="border-r border-stroke px-3 py-1.5 text-center font-bold">TOTAL</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right">{totalQty.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalRetail.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalSupRate.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalDiscVal.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{totalSupValue.toFixed(2)}</td>
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
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600 dark:text-gray-400 w-36 text-right">Discount (₹)</span>
                <input readOnly value={discountTotal.toFixed(2)}
                  className="w-28 rounded border border-stroke bg-gray-50 px-2 py-1 text-right text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white" />
              </div>
              {products.length > 0 ? (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="border border-stroke px-2 py-1 text-center dark:border-dark-3">HSN</th>
                        <th className="border border-stroke px-2 py-1 text-center dark:border-dark-3">Tax%</th>
                        <th className="border border-stroke px-2 py-1 text-center dark:border-dark-3">CGST</th>
                        <th className="border border-stroke px-2 py-1 text-center dark:border-dark-3">SGST</th>
                        <th className="border border-stroke px-2 py-1 text-center dark:border-dark-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((r, i) => (
                        <tr key={r.id} className={i%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                          <td className="border border-stroke px-2 py-1 text-center dark:border-dark-3">5208</td>
                          <td className="border border-stroke px-2 py-1 text-right dark:border-dark-3">{r.taxPct}</td>
                          <td className="border border-stroke px-2 py-1 text-right dark:border-dark-3">{(r.taxAmount/2).toFixed(2)}</td>
                          <td className="border border-stroke px-2 py-1 text-right dark:border-dark-3">{(r.taxAmount/2).toFixed(2)}</td>
                          <td className="border border-stroke px-2 py-1 text-right font-semibold dark:border-dark-3">{r.taxAmount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded border border-stroke bg-gray-50 p-2 text-center text-gray-400 dark:border-dark-3 dark:bg-gray-800">No records found</div>
              )}
            </div>
          </div>

          {/* Note / Amount In Words */}
          <p className="text-xs text-gray-500">Note : GST is not applicable for Free sample.</p>
          <div className="text-xs">
            <span className="font-medium text-dark dark:text-white">Amount In Words : </span>
            <span className="text-[#2d8f7b] font-medium">{totalAmount > 0 ? numberToWords(totalAmount) : ""}</span>
          </div>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* ── Billing Address ───────────────────────────────────── */}
          <div>
            <label className={labelCls}>Billing Address <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <textarea value={billingAddress} onChange={e => setBillingAddress(e.target.value)} rows={3}
                className="flex-1 resize-none rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                placeholder="Enter billing address" />
              <button className="flex items-center gap-1.5 self-start rounded bg-[#28a745] px-4 py-2 text-xs font-medium text-white hover:opacity-90">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* ── Delivery Details ──────────────────────────────────── */}
          <SubHeader title="Delivery Details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Product Variety Code / Name</label>
              <InputBox icon={<GridIcon />}>
                <select value={delivVariety} onChange={e => setDelivVariety(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  {products.map(r => <option key={r.id} value={r.varietyCode}>{r.variety}</option>)}
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Ordered Quantity</label>
              <InputBox icon={<HashIcon />}>
                <input type="number" value={orderedQty} onChange={e => setOrderedQty(e.target.value)} className={inputCls} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Delivery Quantity</label>
              <InputBox icon={<HashIcon />}>
                <input type="number" value={delivQty} onChange={e => setDelivQty(e.target.value)} className={inputCls} placeholder="0" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Delivery Address</label>
              <InputBox icon={<HashIcon />}>
                <input value={delivAddr} onChange={e => setDelivAddr(e.target.value)} className={inputCls} placeholder="Enter delivery address" />
              </InputBox>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={clearDelivery}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
            <button onClick={addDelivery}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
          </div>

          {/* Delivery table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Product Variety Code / Name</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Rate (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Ordered Quantity</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Delivery Quantity</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Delivery Address</th>
                  <th className="px-2 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {delivRows.length === 0 ? (
                  <tr><td colSpan={7} className="py-6 text-center text-gray-400">No records found.</td></tr>
                ) : delivRows.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-1.5">{row.varietyCode}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.unitRate.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.orderedQty.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5 text-right">{row.deliveryQty.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-1.5">{row.deliveryAddress}</td>
                    <td className="px-2 py-1.5 text-center">
                      <button onClick={() => removeDelivery(row.id)}
                        className="rounded bg-red-500 px-2 py-0.5 text-[10px] text-white hover:opacity-90">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-stroke dark:border-dark-3" />

          {/* ── Workflow ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Forward to <span className="text-red-500">*</span></label>
              <InputBox icon={<ArrowIcon />}>
                <input value={forwardTo} onChange={e => setForwardTo(e.target.value)} className={inputCls} placeholder="Enter forward to" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Forward for <span className="text-red-500">*</span></label>
              <InputBox icon={<ChevronIcon />}>
                <select value={forwardFor} onChange={e => setForwardFor(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>Approval</option><option>Review</option><option>Information</option>
                </select>
              </InputBox>
            </div>
          </div>

          {/* Bottom action row */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <NoteIcon />
              Create Note
            </button>
            <div className="flex gap-2">
              <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-order/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13"/><polyline points="7,3 7,8 15,8"/></svg>
                Save
              </button>
              <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-order/list")}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Create Note Modal ──────────────────────────────────────── */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[780px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-3">
              {/* Formatting toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 rounded border border-stroke bg-gray-50 p-2 text-xs dark:border-dark-3 dark:bg-gray-800">
                <select value={noteFontFamily} onChange={e => { setNoteFontFamily(e.target.value); execFormat("fontName", e.target.value); }}
                  className="rounded border border-stroke bg-white px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="sans-serif">Sans Serif</option><option value="serif">Serif</option><option value="monospace">Monospace</option>
                </select>
                <select value={noteFontSize} onChange={e => { setNoteFontSize(e.target.value); execFormat("fontSize", "3"); }}
                  className="rounded border border-stroke bg-white px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="Normal">Normal</option><option value="Large">Large</option><option value="Small">Small</option>
                </select>
                {[
                  { label: "B", cmd: "bold", style: { fontWeight: "bold" as const } },
                  { label: "I", cmd: "italic", style: { fontStyle: "italic" as const } },
                  { label: "U", cmd: "underline", style: { textDecoration: "underline" as const } },
                  { label: "S", cmd: "strikeThrough", style: { textDecoration: "line-through" as const } },
                ].map(b => (
                  <button key={b.cmd} onMouseDown={e => { e.preventDefault(); execFormat(b.cmd); }}
                    className="rounded border border-stroke bg-white px-2 py-1 hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-700 dark:text-white"
                    style={b.style}>{b.label}</button>
                ))}
                {[
                  { label: "x₂", cmd: "subscript" },
                  { label: "x²", cmd: "superscript" },
                  { label: "H₁", cmd: "formatBlock", val: "h1" },
                  { label: "H₂", cmd: "formatBlock", val: "h2" },
                ].map(b => (
                  <button key={b.cmd+b.label} onMouseDown={e => { e.preventDefault(); execFormat(b.cmd, b.val); }}
                    className="rounded border border-stroke bg-white px-2 py-1 text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-700 dark:text-white">{b.label}</button>
                ))}
                {[
                  { label: "OL", cmd: "insertOrderedList" },
                  { label: "UL", cmd: "insertUnorderedList" },
                ].map(b => (
                  <button key={b.cmd} onMouseDown={e => { e.preventDefault(); execFormat(b.cmd); }}
                    className="rounded border border-stroke bg-white px-2 py-1 text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-700 dark:text-white">{b.label}</button>
                ))}
              </div>

              {/* Editor area */}
              <div ref={noteRef} contentEditable suppressContentEditableWarning
                className="min-h-[180px] rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#17a2b8] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                style={{ fontFamily: noteFontFamily }}>
                <p className="text-gray-400 text-sm">Enter your content</p>
              </div>

              {/* Created By card */}
              <div className="inline-block rounded border border-[#fd7e14] p-4 text-sm">
                <p className="mb-2 text-center font-semibold text-dark dark:text-white">Created By</p>
                <p className="text-dark dark:text-white">Name : RAJAGURU</p>
                <p className="text-dark dark:text-white">Designation : MANAGER GRADE – II</p>
                <p className="text-dark dark:text-white">Date : 13-Mar-2026</p>
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
