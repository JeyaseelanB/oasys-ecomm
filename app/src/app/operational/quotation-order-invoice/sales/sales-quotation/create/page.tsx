"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

/* ── icons ─────────────────────────────────────────────────────────── */
const UserIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MailIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhoneIcon = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const MapPinIcon= () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const HashIcon  = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
const CalIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const PctIcon   = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
const ChevronIcon=()=> <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 12,15 18,9"/></svg>;
const ArrowIcon = () => <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
const NoteIcon  = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>;

/* ── types ─────────────────────────────────────────────────────────── */
interface ProductRow {
  id: number;
  category: string; group: string; variety: string; quantity: string;
  unitPrice: number; supplierRate: number; discount: number;
  supplierValue: number; taxPct: number; taxPrice: number; netPrice: number;
}

/* ── helpers ────────────────────────────────────────────────────────── */
const UNIT_PRICE  = 450;
const SUPPLIER_RT = 420;
const DISC_PCT    = 5;
const TAX_PCT     = 12;

function calcRow(qty: string, base: { unitPrice: number; supplierRate: number; discount: number; taxPct: number }): Partial<ProductRow> {
  const q  = parseFloat(qty) || 0;
  const sv = q * base.supplierRate;
  const disc = (sv * base.discount) / 100;
  const taxable = sv - disc;
  const tax = (taxable * base.taxPct) / 100;
  return { supplierValue: sv, taxPrice: tax, netPrice: taxable + tax };
}

/* ── reusable input wrapper ─────────────────────────────────────────── */
const InputBox = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
    {children}
  </div>
);

const labelCls = "block text-xs font-medium text-dark dark:text-white mb-1";
const inputCls = "flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white";

/* ── SECTION HEADER ─────────────────────────────────────────────────── */
const SectionHeader = ({ title, count }: { title: string; count?: string }) => (
  <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
    {count && <span className="text-xs text-white/80">{count}</span>}
  </div>
);

export default function CreateSalesQuotationPage() {
  const router = useRouter();
  const noteEditorRef = useRef<HTMLDivElement>(null);

  /* customer */
  const [custType,       setCustType]       = useState("");
  const [custName,       setCustName]       = useState("");
  const [contact,        setContact]        = useState("");
  const [email,          setEmail]          = useState("");
  const [billAddress,    setBillAddress]    = useState("");
  const [deliveryAddress,setDeliveryAddress]= useState("");

  /* sales enquiry */
  const [enquiryRef,     setEnquiryRef]     = useState("");

  /* products */
  const [products, setProducts] = useState<ProductRow[]>([
    { id: 1, category: "", group: "", variety: "", quantity: "",
      unitPrice: UNIT_PRICE, supplierRate: SUPPLIER_RT, discount: DISC_PCT, supplierValue: 0, taxPct: TAX_PCT, taxPrice: 0, netPrice: 0 },
  ]);

  /* others */
  const [validityDate,   setValidityDate]   = useState("");
  const [remarks,        setRemarks]        = useState("");
  const [terms,          setTerms]          = useState("");
  const [forwardTo,      setForwardTo]      = useState("");
  const [forwardFor,     setForwardFor]     = useState("");

  /* note modal */
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteFontSize, setNoteFontSize] = useState("14px");
  const [noteFontFamily, setNoteFontFamily] = useState("sans-serif");

  /* ── product helpers ─────────────────────────────────────────────── */
  const addProduct = () => setProducts(p => [...p, {
    id: Date.now(), category: "", group: "", variety: "", quantity: "",
    unitPrice: UNIT_PRICE, supplierRate: SUPPLIER_RT, discount: DISC_PCT, supplierValue: 0, taxPct: TAX_PCT, taxPrice: 0, netPrice: 0,
  }]);

  const removeProduct = (id: number) => setProducts(p => p.filter(r => r.id !== id));

  const updateProduct = (id: number, field: keyof ProductRow, value: string | number) => {
    setProducts(p => p.map(r => {
      if (r.id !== id) return r;
      const updated = { ...r, [field]: value };
      if (field === "quantity") {
        const c = calcRow(String(value), updated);
        return { ...updated, ...c };
      }
      return updated;
    }));
  };

  /* ── GST summary computed ────────────────────────────────────────── */
  const totalMaterial = products.reduce((s, r) => s + r.supplierValue, 0);
  const totalDiscount = products.reduce((s, r) => s + (r.supplierValue * r.discount / 100), 0);
  const totalTax      = products.reduce((s, r) => s + r.taxPrice, 0);
  const netTotal      = products.reduce((s, r) => s + r.netPrice, 0);
  const roundOff      = Math.round(netTotal) - netTotal;
  const finalTotal    = Math.round(netTotal);

  const handleSubmit = () => {
    router.push("/operational/quotation-order-invoice/sales/sales-quotation/preview");
  };

  const execFormat = (cmd: string, val?: string) => document.execCommand(cmd, false, val);

  return (
    <div className="mx-auto space-y-5">
      {/* breadcrumb */}
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Sales Quotation</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales Quotation</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Sales Quotation</li>
          </ol>
        </nav>
      </div>

      {/* ── SECTION 1: Customer Details ──────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Customer Details" count="( * Mandatory Fields)" />
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Customer Type */}
            <div>
              <label className={labelCls}>Customer Type <span className="text-red-500">*</span></label>
              <InputBox icon={<ChevronIcon />}>
                <select value={custType} onChange={e => setCustType(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Government</option>
                </select>
              </InputBox>
            </div>
            {/* Customer Name */}
            <div>
              <label className={labelCls}>Customer Name <span className="text-red-500">*</span></label>
              <InputBox icon={<UserIcon />}>
                <input value={custName} onChange={e => setCustName(e.target.value)} className={inputCls} placeholder="Enter customer name" />
              </InputBox>
            </div>
            {/* Contact */}
            <div>
              <label className={labelCls}>Contact Number</label>
              <InputBox icon={<PhoneIcon />}>
                <input value={contact} onChange={e => setContact(e.target.value)} className={inputCls} placeholder="Enter contact number" />
              </InputBox>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Email */}
            <div>
              <label className={labelCls}>Email ID</label>
              <InputBox icon={<MailIcon />}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} placeholder="Enter email" />
              </InputBox>
            </div>
            {/* Billing Address */}
            <div>
              <label className={labelCls}>Billing Address <span className="text-red-500">*</span></label>
              <InputBox icon={<MapPinIcon />}>
                <input value={billAddress} onChange={e => setBillAddress(e.target.value)} className={inputCls} placeholder="Enter billing address" />
              </InputBox>
            </div>
            {/* Delivery Address */}
            <div>
              <label className={labelCls}>Delivery Address</label>
              <InputBox icon={<MapPinIcon />}>
                <input value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className={inputCls} placeholder="Enter delivery address" />
              </InputBox>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Sales Enquiry ─────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Sales Enquiry" />
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Enquiry Reference Number</label>
              <InputBox icon={<HashIcon />}>
                <input value={enquiryRef} onChange={e => setEnquiryRef(e.target.value)} className={inputCls} placeholder="Enter enquiry reference" />
              </InputBox>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Add Product Details ──────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Add Product Details" />
        <div className="p-5 space-y-3">
          {/* Add row button */}
          <div className="flex justify-end">
            <button onClick={addProduct}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Product Category</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Product Group</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Variety</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Quantity</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Unit Price (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Rate (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Discount (%)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Supplier Value (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax (%)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Tax Price (₹)</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Net Price (₹)</th>
                  <th className="px-2 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{idx + 1}</td>
                    <td className="border-r border-stroke px-2 py-1">
                      <select value={row.category} onChange={e => updateProduct(row.id, "category", e.target.value)}
                        className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs focus:outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                        <option value="">Select</option>
                        <option>Pure Silk</option><option>Cotton</option><option>Powerloom</option>
                      </select>
                    </td>
                    <td className="border-r border-stroke px-2 py-1">
                      <select value={row.group} onChange={e => updateProduct(row.id, "group", e.target.value)}
                        className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs focus:outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                        <option value="">Select</option>
                        <option>Saree</option><option>Dhoti</option><option>Shirting</option>
                      </select>
                    </td>
                    <td className="border-r border-stroke px-2 py-1">
                      <input value={row.variety} onChange={e => updateProduct(row.id, "variety", e.target.value)}
                        className="w-full rounded border border-stroke bg-white px-2 py-1 text-xs focus:outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" placeholder="Variety" />
                    </td>
                    <td className="border-r border-stroke px-2 py-1">
                      <input type="number" value={row.quantity} onChange={e => updateProduct(row.id, "quantity", e.target.value)}
                        className="w-20 rounded border border-stroke bg-white px-2 py-1 text-xs text-right focus:outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" placeholder="0" />
                    </td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right">{row.unitPrice.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right">{row.supplierRate.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right">{row.discount.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right">{row.supplierValue.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right">{row.taxPrice.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-1.5 text-right font-semibold">{row.netPrice.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">
                      <button onClick={() => removeProduct(row.id)}
                        className="rounded bg-red-500 px-2 py-0.5 text-[10px] text-white hover:opacity-90">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-xs">
                  <td colSpan={8} className="border-r border-stroke px-3 py-1.5 text-right">Total</td>
                  <td className="border-r border-stroke px-2 py-1.5 text-right">{totalMaterial.toFixed(2)}</td>
                  <td className="border-r border-stroke" />
                  <td className="border-r border-stroke px-2 py-1.5 text-right">{totalTax.toFixed(2)}</td>
                  <td className="border-r border-stroke px-2 py-1.5 text-right">{netTotal.toFixed(2)}</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: GST Summary ──────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="GST Summary" />
        <div className="p-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* GST Table */}
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
                  {products.filter(r => r.taxPrice > 0).map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">5208</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-center">Nos</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{row.taxPct.toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxPrice / 2).toFixed(2)}</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right">{(row.taxPrice / 2).toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-right font-semibold">{row.taxPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                  {products.filter(r => r.taxPrice > 0).length === 0 && (
                    <tr><td colSpan={6} className="py-4 text-center text-gray-400">No taxable products</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Financial Summary */}
            <div className="space-y-2 max-w-xs ml-auto">
              {[
                { label: "Material Value (₹)",  val: totalMaterial.toFixed(2) },
                { label: "Discount (₹)",         val: totalDiscount.toFixed(2) },
                { label: "Total Tax (₹)",         val: totalTax.toFixed(2) },
                { label: "Round Off (₹)",         val: roundOff.toFixed(2) },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-44 text-right">{row.label}</span>
                  <input readOnly value={row.val}
                    className="w-36 rounded border border-stroke bg-gray-50 px-3 py-1.5 text-xs text-right text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white" />
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 border-t border-stroke pt-2 dark:border-dark-3">
                <span className="text-xs font-semibold text-dark dark:text-white w-44 text-right">Net Total (₹)</span>
                <input readOnly value={finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  className="w-36 rounded border border-[#2d8f7b] bg-gray-50 px-3 py-1.5 text-xs text-right font-semibold text-dark dark:bg-gray-800 dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: Others ───────────────────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Others" count="( * Mandatory Fields)" />
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Validity Date */}
            <div>
              <label className={labelCls}>Quotation Validity Date <span className="text-red-500">*</span></label>
              <InputBox icon={<CalIcon />}>
                <input type="date" value={validityDate} onChange={e => setValidityDate(e.target.value)} className={inputCls} />
              </InputBox>
            </div>
            {/* Forward To */}
            <div>
              <label className={labelCls}>Forward To</label>
              <InputBox icon={<ArrowIcon />}>
                <input value={forwardTo} onChange={e => setForwardTo(e.target.value)} className={inputCls} placeholder="Enter forward to" />
              </InputBox>
            </div>
            {/* Forward For */}
            <div>
              <label className={labelCls}>Forward For</label>
              <InputBox icon={<ChevronIcon />}>
                <select value={forwardFor} onChange={e => setForwardFor(e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  <option>Approval</option>
                  <option>Review</option>
                  <option>Information</option>
                </select>
              </InputBox>
            </div>
          </div>
          {/* Remarks */}
          <div>
            <label className={labelCls}>Remarks</label>
            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={3}
              className="w-full resize-none rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              placeholder="Enter remarks" />
          </div>
          {/* Terms & Conditions */}
          <div>
            <label className={labelCls}>Terms &amp; Conditions</label>
            <textarea value={terms} onChange={e => setTerms(e.target.value)} rows={3}
              className="w-full resize-none rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              placeholder="Enter terms and conditions" />
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <NoteIcon />
              Create Note
            </button>
            <div className="flex gap-2">
              <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-quotation/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Create Note Modal ────────────────────────────────────────── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[680px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 rounded border border-stroke bg-gray-50 p-2 dark:border-dark-3 dark:bg-gray-800">
                <select value={noteFontFamily} onChange={e => { setNoteFontFamily(e.target.value); execFormat("fontName", e.target.value); }}
                  className="rounded border border-stroke bg-white px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="sans-serif">Sans Serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                </select>
                <select value={noteFontSize} onChange={e => { setNoteFontSize(e.target.value); execFormat("fontSize", e.target.value === "14px" ? "3" : e.target.value === "18px" ? "4" : "5"); }}
                  className="rounded border border-stroke bg-white px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="12px">12</option><option value="14px">14</option><option value="18px">18</option><option value="24px">24</option>
                </select>
                {[["B","bold"],["I","italic"],["U","underline"]].map(([label, cmd]) => (
                  <button key={cmd} onMouseDown={e => { e.preventDefault(); execFormat(cmd); }}
                    className="rounded border border-stroke bg-white px-2.5 py-1 text-xs font-semibold hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-700 dark:text-white"
                    style={label === "B" ? { fontWeight: "bold" } : label === "I" ? { fontStyle: "italic" } : { textDecoration: "underline" }}>
                    {label}
                  </button>
                ))}
              </div>
              {/* Editor */}
              <div ref={noteEditorRef} contentEditable suppressContentEditableWarning
                className="min-h-[160px] rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                style={{ fontFamily: noteFontFamily, fontSize: noteFontSize }} />
              {/* Created By */}
              <div className="inline-block rounded border border-red-300 p-4 text-sm">
                <p className="mb-2 font-semibold text-dark dark:text-white"><span className="text-red-500">*</span>Created By</p>
                <p className="text-dark dark:text-white">Name : SANKARANARAYANAN</p>
                <p className="text-dark dark:text-white">Designation : SUPERINTENDENT</p>
                <p className="text-dark dark:text-white">Date : 11-Mar-2026</p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  Cancel
                </button>
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
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
