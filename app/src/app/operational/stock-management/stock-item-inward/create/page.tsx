"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ItemReceiveRow {
  id: number;
  itemCodeName: string;
  atNumber: string;
  hsnCode: string;
  description: string;
  uom: string;
  quantity: number;
  unitRate: number;
  totalRate: number;
  discountPct: number;
  discountValue: number;
  taxPct: number;
  taxValue: number;
  netPrice: number;
}

interface InvoiceRow {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  dcNumber: string;
  paymentDueDate: string;
  interestApplicable: string;
  rateOfInterest: string;
  attachedDocuments: string;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function CreateStockItemInwardPage() {
  const router = useRouter();

  // Supplier Details
  const [inwardFrom, setInwardFrom] = useState("");
  const [forEntityType, setForEntityType] = useState("");

  // Item Receive Details form
  const [productCategoryGroup, setProductCategoryGroup] = useState("");
  const [productCategoryCode, setProductCategoryCode] = useState("");
  const [productGroupCode, setProductGroupCode] = useState("");
  const [productVarietyCode, setProductVarietyCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [atNumber, setAtNumber] = useState("");
  const [uom, setUom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitRate, setUnitRate] = useState("");
  const [tax, setTax] = useState("");
  const [description, setDescription] = useState("");
  const [itemRows, setItemRows] = useState<ItemReceiveRow[]>([]);

  // Invoice Details form
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dcNumber, setDcNumber] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [interestApplicable, setInterestApplicable] = useState("");
  const [rateOfInterest, setRateOfInterest] = useState("");
  const [uploadDocument, setUploadDocument] = useState("");
  const [invoiceRows, setInvoiceRows] = useState<InvoiceRow[]>([]);

  // Transport Details
  const [transportServiceType, setTransportServiceType] = useState("");
  const [transportServiceName, setTransportServiceName] = useState("");
  const [waybillAvailable, setWaybillAvailable] = useState("");
  const [weight, setWeight] = useState("");
  const [transportChargeAvailable, setTransportChargeAvailable] = useState("");

  const handleAddItem = () => {
    if (!productCategoryGroup || !productCategoryCode || !productGroupCode || !productVarietyCode || !quantity || !unitRate) return;
    const qty = parseFloat(quantity) || 0;
    const rate = parseFloat(unitRate) || 0;
    const taxPct = parseFloat(tax) || 0;
    const totalRate = qty * rate;
    const taxValue = (totalRate * taxPct) / 100;
    const newItem: ItemReceiveRow = {
      id: Date.now(),
      itemCodeName: productVarietyCode,
      atNumber,
      hsnCode,
      description,
      uom,
      quantity: qty,
      unitRate: rate,
      totalRate,
      discountPct: 0,
      discountValue: 0,
      taxPct,
      taxValue,
      netPrice: totalRate + taxValue,
    };
    setItemRows((prev) => [...prev, newItem]);
    setProductCategoryGroup(""); setProductCategoryCode(""); setProductGroupCode(""); setProductVarietyCode("");
    setHsnCode(""); setAtNumber(""); setUom(""); setQuantity(""); setUnitRate(""); setTax(""); setDescription("");
  };

  const handleClearItem = () => {
    setProductCategoryGroup(""); setProductCategoryCode(""); setProductGroupCode(""); setProductVarietyCode("");
    setHsnCode(""); setAtNumber(""); setUom(""); setQuantity(""); setUnitRate(""); setTax(""); setDescription("");
  };

  const handleDeleteItem = (id: number) => setItemRows((prev) => prev.filter((r) => r.id !== id));

  const handleAddInvoice = () => {
    if (!invoiceNumber || !invoiceDate) return;
    const newRow: InvoiceRow = { id: Date.now(), invoiceNumber, invoiceDate, dcNumber, paymentDueDate, interestApplicable, rateOfInterest, attachedDocuments: uploadDocument };
    setInvoiceRows((prev) => [...prev, newRow]);
    setInvoiceNumber(""); setInvoiceDate(""); setDcNumber(""); setPaymentDueDate(""); setInterestApplicable(""); setRateOfInterest(""); setUploadDocument("");
  };

  const handleClearInvoice = () => {
    setInvoiceNumber(""); setInvoiceDate(""); setDcNumber(""); setPaymentDueDate(""); setInterestApplicable(""); setRateOfInterest(""); setUploadDocument("");
  };

  const handleDeleteInvoice = (id: number) => setInvoiceRows((prev) => prev.filter((r) => r.id !== id));

  const totals = itemRows.reduce((acc, r) => ({
    quantity: acc.quantity + r.quantity,
    totalRate: acc.totalRate + r.totalRate,
    discountValue: acc.discountValue + r.discountValue,
    taxValue: acc.taxValue + r.taxValue,
    netPrice: acc.netPrice + r.netPrice,
  }), { quantity: 0, totalRate: 0, discountValue: 0, taxValue: 0, netPrice: 0 });

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Stock Item Inward</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Stock Item Inward</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Form Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Stock Item Inward</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Supplier Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Supplier Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Inward From <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,17 4,12 9,7"/><line x1="20" y1="12" x2="4" y2="12"/></svg></IconBox>
                <select value={inwardFrom} onChange={(e) => setInwardFrom(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="SOCIETY">SOCIETY</option>
                  <option value="VENDOR">VENDOR</option>
                  <option value="WAREHOUSE">WAREHOUSE</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">For Entity Type</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={forEntityType} onChange={(e) => setForEntityType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="PRODUCT_WAREHOUSE">PRODUCT WAREHOUSE</option>
                  <option value="DISTRIBUTION_WAREHOUSE">DISTRIBUTION WAREHOUSE</option>
                  <option value="SHOWROOM">SHOWROOM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Add Item Receive Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Add Item Receive Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Group <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                <select value={productCategoryGroup} onChange={(e) => setProductCategoryGroup(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Category Group</option>
                  <option value="TEXTILES">TEXTILES</option>
                  <option value="GARMENTS">GARMENTS</option>
                  <option value="HOME_FURNISHING">HOME FURNISHING</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                <select value={productCategoryCode} onChange={(e) => setProductCategoryCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Category</option>
                  <option value="BED_SHEETS">BED SHEETS</option>
                  <option value="SAREES">SAREES</option>
                  <option value="TOWELS">TOWELS</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Group Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <select value={productGroupCode} onChange={(e) => setProductGroupCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Group</option>
                  <option value="BEA">BEA - BEDSHEET 60X90</option>
                  <option value="BEB">BEB - BEDSHEET 90X108</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Variety Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="9" cy="9" r="6"/><path d="M15 15l5 5"/></svg></IconBox>
                <input type="text" value={productVarietyCode} onChange={(e) => setProductVarietyCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HSN Code</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={hsnCode} onChange={(e) => setHsnCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">AT Number</label>
              <div className="flex items-stretch">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={atNumber} onChange={(e) => setAtNumber(e.target.value)} className="flex-1 border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <button onClick={() => setAtNumber(`AT${Date.now()}`)} className="flex items-center gap-1 rounded-r border border-l-0 border-stroke bg-[#17a2b8] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">UOM</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></IconBox>
                <input type="text" value={uom} readOnly onChange={(e) => setUom(e.target.value)} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Quantity <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Unit Rate <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">₹</span></IconBox>
                <input type="number" value={unitRate} onChange={(e) => setUnitRate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Tax</label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">%</span></IconBox>
                <input type="number" value={tax} onChange={(e) => setTax(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Description</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg></IconBox>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-6 flex items-center justify-end gap-2">
            <button onClick={handleClearItem} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleAddItem} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </button>
          </div>

          {/* Item Receive Details Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Item Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">AT Number</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">HSN Code</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Description</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Unit Rate (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Rate (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Discount (%)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Discount Value (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax (%)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax Value (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Net Price (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {itemRows.length === 0 ? (
                  <tr><td colSpan={15} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                ) : (
                  itemRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.itemCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.atNumber || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.hsnCode || "-"}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.description || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.uom || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.quantity.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.unitRate.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.totalRate.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.discountPct.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.discountValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.taxPct.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.taxValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.netPrice.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button onClick={() => handleDeleteItem(row.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td colSpan={6} className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.quantity > 0 ? totals.quantity.toFixed(2) : "0"}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.totalRate.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.discountValue.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.taxValue.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.netPrice.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Invoice Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Invoice Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Invoice Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Invoice Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">DC Number</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={dcNumber} onChange={(e) => setDcNumber(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Payment Due Date</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={paymentDueDate} onChange={(e) => setPaymentDueDate(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Interest Applicable for Delay Payment</label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">%</span></IconBox>
                <select value={interestApplicable} onChange={(e) => setInterestApplicable(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Rate of Interest on Total Loan Amount</label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">%</span></IconBox>
                <input type="number" value={rateOfInterest} onChange={(e) => setRateOfInterest(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Upload Documents</label>
              <div className="flex">
                <input type="text" value={uploadDocument} readOnly placeholder="No file chosen" className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <button className="flex items-center gap-1 rounded-r border border-stroke bg-[#17a2b8] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div className="mb-6 flex items-center justify-end gap-2">
            <button onClick={handleClearInvoice} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleAddInvoice} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </button>
          </div>

          {/* Invoice Details Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Invoice Number</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Invoice Date</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">DC Number</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Payment Due Date</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Interest Applicable</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Rate of Interest on Total Loan Amount (%)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Attached Documents</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoiceRows.length === 0 ? (
                  <tr><td colSpan={9} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  invoiceRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.invoiceNumber}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.invoiceDate}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.dcNumber || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.paymentDueDate || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.interestApplicable || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.rateOfInterest || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.attachedDocuments || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button onClick={() => handleDeleteInvoice(row.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Transport Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Transport Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Service Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></IconBox>
                <select value={transportServiceType} onChange={(e) => setTransportServiceType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Service Type</option>
                  <option value="PERSONAL">Personal Delivery</option>
                  <option value="COURIER">Courier</option>
                  <option value="LOGISTICS">Logistics</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Service Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></IconBox>
                <select value={transportServiceName} onChange={(e) => setTransportServiceName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Service Name</option>
                  <option value="PERSONAL_DELIVERY">Personal Delivery</option>
                  <option value="DTDC">DTDC</option>
                  <option value="BLUE_DART">Blue Dart</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Waybill Available <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg></IconBox>
                <select value={waybillAvailable} onChange={(e) => setWaybillAvailable(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Waybill Type</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Weight (Kg)</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Charge Available <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                <select value={transportChargeAvailable} onChange={(e) => setTransportChargeAvailable(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Type</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/stock-management/stock-item-inward/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
