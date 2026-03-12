"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GSTEntry {
  id: number;
  gstType: string;
  gstPercentage: string;
  gstValue: string;
}

interface ProductItem {
  id: number;
  itemName: string;
  itemDescription: string;
  quantity: string;
  unitRate: string;
  total: string;
  discountValue: string;
  cgst: string;
  sgst: string;
  netAmount: string;
}

const FieldIcon = ({ type }: { type: "list" | "hash" | "rupee" | "grid" | "star" | "cart" | "doc" | "play" | "pct" }) => {
  switch (type) {
    case "list": return <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>;
    case "hash": return <span className="text-sm text-gray-400">#</span>;
    case "rupee": return <span className="text-sm text-gray-400">₹</span>;
    case "grid": return <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
    case "star": return <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case "cart": return <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;
    case "doc": return <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>;
    case "play": return <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
    case "pct": return <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    default: return null;
  }
};

export default function EditPurchaseQuotationPage() {
  const router = useRouter();

  /* prefilled from screenshot */
  const [supplierTypeCode, setSupplierTypeCode] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [gstinNumber, setGstinNumber] = useState("10-SQY25FEB");
  const quotationRefNumber = "2"; /* read-only */
  const [quotationRefDate, setQuotationRefDate] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [validDate, setValidDate] = useState("05-Feb-2025");
  const [tdsPercentage, setTdsPercentage] = useState("");

  const [productType, setProductType] = useState("");
  const [productCategoryGroup, setProductCategoryGroup] = useState("");
  const [productCategoryCode, setProductCategoryCode] = useState("");
  const [productGroupCode, setProductGroupCode] = useState("");
  const [productVarietyCode, setProductVarietyCode] = useState("");
  const [uomCode, setUomCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [unitRate, setUnitRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discountApplicable, setDiscountApplicable] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountPct, setDiscountPct] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [gstApplicable, setGstApplicable] = useState("");
  const [gstType, setGstType] = useState("");
  const [gstPct, setGstPct] = useState("");
  const [gstValue, setGstValue] = useState("");

  const [gstEntries, setGstEntries] = useState<GSTEntry[]>([]);
  /* prefilled product row matching screenshot */
  const [productItems, setProductItems] = useState<ProductItem[]>([
    { id: 1, itemName: "", itemDescription: "", quantity: "1.0", unitRate: "100.00", total: "0.00", discountValue: "-100.00", cgst: "2.50", sgst: "2.50", netAmount: "117.00" },
  ]);

  const [termsConditions, setTermsConditions] = useState("");
  const [remarks, setRemarks] = useState("");
  const [skipApproval, setSkipApproval] = useState("No");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Approval");

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  const computedItemTotal = unitRate && quantity ? (parseFloat(unitRate || "0") * parseFloat(quantity || "0")).toFixed(2) : "";

  const handleAddGst = () => {
    if (!gstType || !gstPct || !gstValue) return;
    setGstEntries((p) => [...p, { id: Date.now(), gstType, gstPercentage: gstPct, gstValue }]);
    setGstType(""); setGstPct(""); setGstValue("");
  };

  const handleClearProduct = () => {
    setProductType(""); setProductCategoryGroup(""); setProductCategoryCode(""); setProductGroupCode("");
    setProductVarietyCode(""); setUomCode(""); setItemName(""); setItemDescription("");
    setUnitRate(""); setQuantity(""); setDiscountApplicable(""); setDiscountType(""); setDiscountPct("");
    setDiscountValue(""); setGstApplicable(""); setGstType(""); setGstPct(""); setGstValue("");
    setGstEntries([]);
  };

  const handleAddProduct = () => {
    if (!productVarietyCode || !uomCode || !unitRate || !quantity) return;
    const tot = (parseFloat(unitRate) * parseFloat(quantity)).toFixed(2);
    setProductItems((p) => [...p, { id: Date.now(), itemName, itemDescription, quantity, unitRate, total: tot, discountValue: discountValue || "0.00", cgst: "0.00", sgst: "0.00", netAmount: tot }]);
    handleClearProduct();
  };

  const totals = productItems.reduce((acc, p) => ({
    qty: acc.qty + parseFloat(p.quantity || "0"),
    rate: acc.rate + parseFloat(p.unitRate || "0"),
    total: acc.total + parseFloat(p.total || "0"),
    disc: acc.disc + parseFloat(p.discountValue || "0"),
    cgst: acc.cgst + parseFloat(p.cgst || "0"),
    sgst: acc.sgst + parseFloat(p.sgst || "0"),
    net: acc.net + parseFloat(p.netAmount || "0"),
  }), { qty: 0, rate: 0, total: 0, disc: 0, cgst: 0, sgst: 0, net: 0 });

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Purchase Quotation</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Purchase</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Purchase Quotation</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <span className="font-semibold text-white">Purchase Quotation</span>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Supplier Type */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Supplier Type Code / Name <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="list" />
                <select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={supplierTypeCode} onChange={(e) => setSupplierTypeCode(e.target.value)}><option value="">Select</option></select>
              </div>
            </div>
            {/* Supplier Code */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Supplier Code / Name <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="list" />
                <select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={supplierCode} onChange={(e) => setSupplierCode(e.target.value)}><option value="">Select</option></select>
              </div>
            </div>
            {/* GSTIN */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">GSTIN Number</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="hash" />
                <input type="text" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={gstinNumber} onChange={(e) => setGstinNumber(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Quotation Ref # — read-only */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Quotation Reference Number <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-[#f5f5f5] px-3 py-2 dark:border-dark-3 dark:bg-[#1a2232]">
                <FieldIcon type="hash" />
                <input type="text" readOnly className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={quotationRefNumber} />
              </div>
            </div>
            {/* Quotation Ref Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Quotation Reference Date</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <input type="text" placeholder="dd-MMM-yyyy" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={quotationRefDate} onChange={(e) => setQuotationRefDate(e.target.value)} />
                <svg className="size-4 shrink-0 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
            </div>
            {/* PAN */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">PAN Number</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="hash" />
                <input type="text" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
              </div>
            </div>
            {/* Valid Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Valid Date <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <input type="text" placeholder="dd-MMM-yyyy" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={validDate} onChange={(e) => setValidDate(e.target.value)} />
                <svg className="size-4 shrink-0 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
            </div>
          </div>

          {/* TDS */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">TDS Percentage</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="cart" />
                <input type="text" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={tdsPercentage} onChange={(e) => setTdsPercentage(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Product Details heading */}
          <div className="mb-4 flex items-center gap-2">
            <svg className="size-5 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h3 className="text-base font-semibold text-dark dark:text-white">Product Details</h3>
          </div>

          {/* Row: Product Type | Category Group | Category Code | Group Code */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { label: "Product Type", icon: "list" as const, value: productType, setter: setProductType },
              { label: "Product Category Group", icon: "grid" as const, value: productCategoryGroup, setter: setProductCategoryGroup },
            ].map(({ label, icon, value, setter }) => (
              <div key={label}>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">{label}</label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                  <FieldIcon type={icon} />
                  <select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={value} onChange={(e) => setter(e.target.value)}><option value="">Select</option></select>
                </div>
              </div>
            ))}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Product Category Code / Name</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="star" />
                <select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={productCategoryCode} onChange={(e) => setProductCategoryCode(e.target.value)}><option value="">Select</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Product Group Code / Name</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="grid" />
                <select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={productGroupCode} onChange={(e) => setProductGroupCode(e.target.value)}><option value="">Select</option></select>
              </div>
            </div>
          </div>

          {/* Row: Product Variety | UOM | Item Name | Item Desc */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Product Variety Code / Name <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="list" />
                <select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={productVarietyCode} onChange={(e) => setProductVarietyCode(e.target.value)}><option value="">Select</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">UOM Code / Name <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="hash" />
                <select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={uomCode} onChange={(e) => setUomCode(e.target.value)}><option value="">Select</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Item Name</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="cart" />
                <input type="text" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={itemName} onChange={(e) => setItemName(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Item Description</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="doc" />
                <input type="text" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Row: Unit Rate | Qty | Item Total | Discount Applicable */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Unit Rate <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="rupee" /><input type="number" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={unitRate} onChange={(e) => setUnitRate(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Quantity <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="hash" /><input type="number" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Item Total <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-[#f5f5f5] px-3 py-2 dark:border-dark-3 dark:bg-[#1a2232]">
                <FieldIcon type="rupee" /><input type="text" readOnly className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={computedItemTotal} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Discount Applicable</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="list" /><select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={discountApplicable} onChange={(e) => setDiscountApplicable(e.target.value)}><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select>
              </div>
            </div>
          </div>

          {/* Row: Discount Type | Discount % | Discount Value | Balanced Amount */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Discount Type</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="list" /><select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={discountType} onChange={(e) => setDiscountType(e.target.value)}><option value="">Select</option><option value="Percentage">Percentage</option><option value="Amount">Amount</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Discount (%)</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="pct" /><input type="number" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={discountPct} onChange={(e) => setDiscountPct(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Discount Value</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="rupee" /><input type="number" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Balanced Amount</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-[#f5f5f5] px-3 py-2 dark:border-dark-3 dark:bg-[#1a2232]">
                <FieldIcon type="rupee" /><input type="text" readOnly className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value="" />
              </div>
            </div>
          </div>

          {/* GST two-column */}
          <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">GST Applicable</label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                  <FieldIcon type="list" /><select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={gstApplicable} onChange={(e) => setGstApplicable(e.target.value)}><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">GST Type <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                  <FieldIcon type="list" /><select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={gstType} onChange={(e) => setGstType(e.target.value)}><option value="">Select</option><option value="CGST">CGST</option><option value="SGST">SGST</option><option value="IGST">IGST</option></select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">GST (%) <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                  <FieldIcon type="pct" /><input type="number" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={gstPct} onChange={(e) => setGstPct(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">GST Value <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                  <FieldIcon type="rupee" /><input type="number" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={gstValue} onChange={(e) => setGstValue(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Net Amount <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-[#f5f5f5] px-3 py-2 dark:border-dark-3 dark:bg-[#1a2232]">
                  <FieldIcon type="rupee" /><input type="text" readOnly className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value="" />
                </div>
              </div>
              <div className="flex items-end">
                <button onClick={handleAddGst} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>Add
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    {["#","GST Type","GST Percentage","GST Value (₹)","Action"].map((h) => (
                      <th key={h} className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gstEntries.length === 0 ? (
                    <tr><td colSpan={5} className="py-3 text-center text-xs text-gray-400">No records found.</td></tr>
                  ) : gstEntries.map((g, i) => (
                    <tr key={g.id} className="border-b border-stroke dark:border-dark-3">
                      <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{i + 1}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{g.gstType}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{g.gstPercentage}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{g.gstValue}</td>
                      <td className="px-3 py-2 text-center">
                        <button onClick={() => setGstEntries((p) => p.filter((x) => x.id !== g.id))} className="rounded bg-[#dc3545] p-1 text-white hover:opacity-90">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6" /><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#f0f0f0] dark:bg-[#1a2232]">
                    <td colSpan={4} className="border-r border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Clear & Add product */}
          <div className="mb-6 flex gap-2">
            <button onClick={handleClearProduct} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>Clear
            </button>
            <button onClick={handleAddProduct} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>Add
            </button>
          </div>

          {/* Product Variety Details */}
          <div className="mb-4 flex items-center gap-2">
            <svg className="size-5 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h3 className="text-base font-semibold text-dark dark:text-white">Product Variety Details</h3>
          </div>

          <div className="mb-6 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  {["#","Item Name","Item Description","Quantity","Unit Rate (₹)","Total (₹)","Discount Value (₹)","CGST (₹)","SGST (₹)","Net Amount (₹)","Action"].map((h) => (
                    <th key={h} className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productItems.map((item, idx) => (
                  <tr key={item.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                    <td className="border-r border-stroke px-3 py-2 text-center text-primary dark:border-dark-3">{idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-2 dark:border-dark-3">{item.itemName}</td>
                    <td className="border-r border-stroke px-3 py-2 dark:border-dark-3">{item.itemDescription}</td>
                    <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{item.quantity}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{item.unitRate}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{item.total}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{item.discountValue}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{item.cgst}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{item.sgst}</td>
                    <td className="border-r border-stroke px-3 py-2 text-right text-primary dark:border-dark-3">{item.netAmount}</td>
                    <td className="px-3 py-2 text-center">
                      <button onClick={() => setProductItems((p) => p.filter((x) => x.id !== item.id))} className="rounded bg-[#dc3545] p-1 text-white hover:opacity-90">
                        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6" /><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#f0f0f0] font-semibold dark:bg-[#1a2232]">
                  <td colSpan={3} className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">Total</td>
                  <td className="border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{totals.qty.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totals.rate.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totals.total.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totals.disc.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totals.cgst.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totals.sgst.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-2 text-right dark:border-dark-3">{totals.net.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms & Remarks */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Terms &amp; Conditions</label>
              <textarea rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={termsConditions} onChange={(e) => setTermsConditions(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Remarks</label>
              <textarea rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </div>
          </div>

          {/* Approval row */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Skip Approval</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="play" /><select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={skipApproval} onChange={(e) => setSkipApproval(e.target.value)}><option value="No">No</option><option value="Yes">Yes</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Forward To</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="play" /><input type="text" className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Forward For</label>
              <div className="flex items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 dark:border-dark-3">
                <FieldIcon type="play" /><select className="w-full bg-transparent text-sm text-dark outline-none dark:text-white" value={forwardFor} onChange={(e) => setForwardFor(e.target.value)}><option value="Approval">Approval</option><option value="Review">Review</option></select>
              </div>
            </div>
          </div>

          {/* Create Note */}
          <div className="mb-2">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Create Note
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 rounded-b-[10px] border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/operational/quotation-order-invoice/purchase/purchase-quotation/list")} className="flex items-center gap-1.5 rounded border border-stroke bg-white px-5 py-2 text-sm font-medium text-dark hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>Cancel
          </button>
          <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>Update
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <span className="font-semibold text-white">Create Note</span>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-1 rounded border border-stroke bg-[#f8f9fa] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                <select className="rounded border border-stroke bg-white px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option></select>
                <select className="rounded border border-stroke bg-white px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option></select>
                <span className="mx-1 text-gray-300">|</span>
                {["B","I","U","S"].map((f) => (
                  <button key={f} className={`flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:text-white ${f === "B" ? "font-bold" : f === "I" ? "italic" : f === "U" ? "underline" : "line-through"}`}>{f}</button>
                ))}
              </div>
              <textarea rows={7} placeholder="Enter text ..." className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
              <div className="mt-4 flex items-start justify-between">
                <div className="rounded border border-stroke p-4 text-sm dark:border-dark-3">
                  <p className="mb-2 font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-gray-600 dark:text-gray-400">Name : ALOK</p>
                  <p className="text-gray-600 dark:text-gray-400">Designation :</p>
                  <p className="text-gray-600 dark:text-gray-400">Date : 11-Mar-2026</p>
                </div>
                <div className="flex gap-1">
                  <button className="flex size-8 items-center justify-center rounded border border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">&#8249;</button>
                  <button className="flex size-8 items-center justify-center rounded border border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">&#8250;</button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>Cancel
              </button>
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
