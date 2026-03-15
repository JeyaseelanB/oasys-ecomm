"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const labelCls = "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1";
const inputCls =
  "w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none transition focus:border-[#2d8f7b] dark:border-strokedark dark:text-white dark:focus:border-[#2d8f7b]";
const selectCls =
  "w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none transition focus:border-[#2d8f7b] dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-[#2d8f7b]";

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

interface TaxRow {
  id: number;
  taxType: string;
  taxPercent: string;
  taxValue: number;
}

interface ItemRow {
  id: number;
  catGroup: string;
  catCode: string;
  catName: string;
  groupCode: string;
  groupName: string;
  varietyCode: string;
  varietyName: string;
  uom: string;
  itemName: string;
  description: string;
  qty: number;
  itemAmount: number;
  discountType: string;
  discountValue: number;
  balancedAmount: number;
}

const SUPPLIER_OPTIONS = [
  "ABC Textiles Pvt Ltd",
  "Bharat Cotton Mills",
  "Chennai Fabrics Co",
  "Denim World Ltd",
  "Elite Yarns Pvt Ltd",
];

const PRODUCT_VARIETIES = [
  { code: "PV-001", name: "Cotton Plain Weave", group: "Cotton", catCode: "CAT-001", catName: "Natural Fibres", catGroup: "Fibres", uom: "Metres" },
  { code: "PV-002", name: "Polyester Blend", group: "Synthetic", catCode: "CAT-002", catName: "Synthetic Fibres", catGroup: "Fibres", uom: "Kg" },
  { code: "PV-003", name: "Silk Crepe", group: "Silk", catCode: "CAT-003", catName: "Natural Silk", catGroup: "Silk", uom: "Metres" },
  { code: "PV-004", name: "Linen Plain", group: "Linen", catCode: "CAT-004", catName: "Natural Linen", catGroup: "Fibres", uom: "Metres" },
];

export default function CreateBillPage() {
  const router = useRouter();

  // Bill Information
  const [supplierType, setSupplierType] = useState("Domestic");
  const [supplierCode, setSupplierCode] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [purchaseInvNo, setPurchaseInvNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  // Item form
  const [itemForm, setItemForm] = useState({
    catGroup: "",
    catCode: "",
    catName: "",
    groupCode: "",
    groupName: "",
    varietyCode: "",
    varietyName: "",
    uom: "",
    itemName: "",
    description: "",
    qty: "",
    itemAmount: "",
    discountType: "Percentage",
    discountValue: "",
  });
  const [items, setItems] = useState<ItemRow[]>([]);
  const nextItemId = useRef(1);

  // Tax form
  const [taxForm, setTaxForm] = useState({ taxType: "GST", taxPercent: "", taxValue: "" });
  const [taxes, setTaxes] = useState<TaxRow[]>([]);
  const nextTaxId = useRef(1);

  // Workflow
  const [skipApproval, setSkipApproval] = useState(false);
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");

  // Create Note Modal
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<{ title: string; content: string; date: string }[]>([]);

  // Handle variety selection
  const handleVarietySelect = (code: string) => {
    const v = PRODUCT_VARIETIES.find((p) => p.code === code);
    if (v) {
      setItemForm((f) => ({
        ...f,
        varietyCode: v.code,
        varietyName: v.name,
        groupCode: v.group,
        groupName: v.group,
        catCode: v.catCode,
        catName: v.catName,
        catGroup: v.catGroup,
        uom: v.uom,
      }));
    }
  };

  // Compute balanced amount
  const computeBalanced = (itemAmt: number, discType: string, discVal: number) => {
    if (discType === "Percentage") return itemAmt - (itemAmt * discVal) / 100;
    return itemAmt - discVal;
  };

  // Add item
  const handleAddItem = () => {
    if (!itemForm.varietyCode || !itemForm.qty || !itemForm.itemAmount) return;
    const qty = parseFloat(itemForm.qty) || 0;
    const itemAmount = parseFloat(itemForm.itemAmount) || 0;
    const discountValue = parseFloat(itemForm.discountValue) || 0;
    const totalItemAmt = qty * itemAmount;
    const balancedAmount = computeBalanced(totalItemAmt, itemForm.discountType, discountValue);

    setItems((prev) => [
      ...prev,
      {
        id: nextItemId.current++,
        catGroup: itemForm.catGroup,
        catCode: itemForm.catCode,
        catName: itemForm.catName,
        groupCode: itemForm.groupCode,
        groupName: itemForm.groupName,
        varietyCode: itemForm.varietyCode,
        varietyName: itemForm.varietyName,
        uom: itemForm.uom,
        itemName: itemForm.itemName,
        description: itemForm.description,
        qty,
        itemAmount: totalItemAmt,
        discountType: itemForm.discountType,
        discountValue,
        balancedAmount,
      },
    ]);
    setItemForm({
      catGroup: "",
      catCode: "",
      catName: "",
      groupCode: "",
      groupName: "",
      varietyCode: "",
      varietyName: "",
      uom: "",
      itemName: "",
      description: "",
      qty: "",
      itemAmount: "",
      discountType: "Percentage",
      discountValue: "",
    });
  };

  // Add tax
  const handleAddTax = () => {
    if (!taxForm.taxPercent) return;
    const totalBalance = items.reduce((s, i) => s + i.balancedAmount, 0);
    const taxVal = (totalBalance * parseFloat(taxForm.taxPercent)) / 100;
    setTaxes((prev) => [
      ...prev,
      { id: nextTaxId.current++, taxType: taxForm.taxType, taxPercent: taxForm.taxPercent, taxValue: taxVal },
    ]);
    setTaxForm({ taxType: "GST", taxPercent: "", taxValue: "" });
  };

  // Summaries
  const totalItemAmount = items.reduce((s, i) => s + i.itemAmount, 0);
  const totalDiscount = items.reduce((s, i) => s + i.discountValue, 0);
  const totalBalance = items.reduce((s, i) => s + i.balancedAmount, 0);
  const totalTax = taxes.reduce((s, t) => s + t.taxValue, 0);
  const netAmount = totalBalance + totalTax;

  // Save note
  const handleSaveNote = () => {
    const content = editorRef.current?.innerHTML || "";
    if (!noteTitle.trim() && !content.trim()) return;
    setNotes((prev) => [
      ...prev,
      { title: noteTitle, content, date: new Date().toLocaleDateString("en-IN") },
    ]);
    setNoteTitle("");
    if (editorRef.current) editorRef.current.innerHTML = "";
    setShowNoteModal(false);
  };

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  return (
    <div className="mx-auto max-w-screen-xl p-4 md:p-6 2xl:p-10">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark dark:text-white">Create Bill</h2>
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          Home &rsaquo; Operational &rsaquo; Quotation/Order/Invoice &rsaquo; Purchase &rsaquo;{" "}
          <span className="text-[#2d8f7b]">Bill</span>
        </nav>
      </div>

      {/* ── SECTION 1: Bill Information ── */}
      <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-5 py-3 border-b border-stroke dark:border-strokedark" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">Bill Information</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className={labelCls}>Supplier Type</label>
              <select className={selectCls} value={supplierType} onChange={(e) => setSupplierType(e.target.value)}>
                <option>Domestic</option>
                <option>International</option>
                <option>Government</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Supplier Code</label>
              <input className={inputCls} placeholder="e.g. SUP-001" value={supplierCode} onChange={(e) => setSupplierCode(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Supplier Name</label>
              <select
                className={selectCls}
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              >
                <option value="">-- Select Supplier --</option>
                {SUPPLIER_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Purchase Invoice Number</label>
              <input className={inputCls} placeholder="e.g. PI-2025-001" value={purchaseInvNo} onChange={(e) => setPurchaseInvNo(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Purchase Invoice Date</label>
              <input type="date" className={inputCls} value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Item Details ── */}
      <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-5 py-3 border-b border-stroke dark:border-strokedark" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">Item Details</h3>
        </div>
        <div className="p-5">
          {/* Form fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 mb-4">
            <div>
              <label className={labelCls}>Product Category Group</label>
              <input className={inputCls} placeholder="Category Group" value={itemForm.catGroup} onChange={(e) => setItemForm((f) => ({ ...f, catGroup: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Product Category Code</label>
              <input className={inputCls} placeholder="e.g. CAT-001" value={itemForm.catCode} onChange={(e) => setItemForm((f) => ({ ...f, catCode: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Product Category Name</label>
              <input className={inputCls} placeholder="Category Name" value={itemForm.catName} onChange={(e) => setItemForm((f) => ({ ...f, catName: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Product Group Code</label>
              <input className={inputCls} placeholder="e.g. GRP-001" value={itemForm.groupCode} onChange={(e) => setItemForm((f) => ({ ...f, groupCode: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Product Group Name</label>
              <input className={inputCls} placeholder="Group Name" value={itemForm.groupName} onChange={(e) => setItemForm((f) => ({ ...f, groupName: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Product Variety Code / Name</label>
              <select
                className={selectCls}
                value={itemForm.varietyCode}
                onChange={(e) => handleVarietySelect(e.target.value)}
              >
                <option value="">-- Select Variety --</option>
                {PRODUCT_VARIETIES.map((v) => (
                  <option key={v.code} value={v.code}>
                    {v.code} — {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>UOM</label>
              <input className={inputCls} placeholder="Unit of Measure" value={itemForm.uom} onChange={(e) => setItemForm((f) => ({ ...f, uom: e.target.value }))} readOnly={!!itemForm.varietyCode} />
            </div>
            <div>
              <label className={labelCls}>Item / Service Name</label>
              <input className={inputCls} placeholder="Item Name" value={itemForm.itemName} onChange={(e) => setItemForm((f) => ({ ...f, itemName: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Item Description</label>
              <input className={inputCls} placeholder="Description" value={itemForm.description} onChange={(e) => setItemForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Quantity</label>
              <input type="number" className={inputCls} placeholder="0" min="0" value={itemForm.qty} onChange={(e) => setItemForm((f) => ({ ...f, qty: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Item Amount (per unit)</label>
              <input type="number" className={inputCls} placeholder="0.00" min="0" value={itemForm.itemAmount} onChange={(e) => setItemForm((f) => ({ ...f, itemAmount: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Discount Type</label>
              <select className={selectCls} value={itemForm.discountType} onChange={(e) => setItemForm((f) => ({ ...f, discountType: e.target.value }))}>
                <option>Percentage</option>
                <option>Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Discount Value</label>
              <input type="number" className={inputCls} placeholder="0" min="0" value={itemForm.discountValue} onChange={(e) => setItemForm((f) => ({ ...f, discountValue: e.target.value }))} />
            </div>
          </div>

          {/* Balanced Amount preview */}
          {itemForm.qty && itemForm.itemAmount && (
            <div className="mb-4 p-3 rounded bg-gray-50 dark:bg-meta-4 text-sm text-gray-600 dark:text-gray-300">
              Total Item Amount:{" "}
              <span className="font-semibold text-dark dark:text-white">
                ₹{(parseFloat(itemForm.qty || "0") * parseFloat(itemForm.itemAmount || "0")).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>{" "}
              &nbsp;|&nbsp; Balanced Amount:{" "}
              <span className="font-semibold text-[#2d8f7b]">
                ₹
                {computeBalanced(
                  parseFloat(itemForm.qty || "0") * parseFloat(itemForm.itemAmount || "0"),
                  itemForm.discountType,
                  parseFloat(itemForm.discountValue || "0")
                ).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          <button
            onClick={handleAddItem}
            className="rounded px-4 py-2 text-sm font-medium text-white"
            style={{ background: "#28a745" }}
          >
            + Add Item
          </button>

          {/* Items Table */}
          {items.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <SubHeader title="Item Summary" />
              <table className="w-full text-sm border border-stroke dark:border-strokedark">
                <thead>
                  <tr className="bg-gray-100 dark:bg-meta-4 text-xs text-gray-600 dark:text-gray-300">
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">#</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">Variety Code | Name</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">Item Name</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">UOM</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Qty</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Item Amount (₹)</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">Discount</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Balanced Amt (₹)</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-meta-4">
                      <td className="border border-stroke dark:border-strokedark px-3 py-2">{idx + 1}</td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2">
                        <span className="text-[#2d8f7b] font-medium">{item.varietyCode}</span>
                        <br />
                        <span className="text-xs text-gray-500">{item.varietyName}</span>
                      </td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2">{item.itemName || "-"}</td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2">{item.uom}</td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">{item.qty}</td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                        {item.itemAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2">
                        {item.discountType === "Percentage" ? `${item.discountValue}%` : `₹${item.discountValue}`}
                      </td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right font-medium text-[#2d8f7b]">
                        {item.balancedAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2 text-center">
                        <button
                          onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 dark:bg-meta-4 font-medium text-sm">
                    <td colSpan={5} className="border border-stroke dark:border-strokedark px-3 py-2 text-right text-gray-600 dark:text-gray-300">
                      Totals:
                    </td>
                    <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">
                      {totalItemAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="border border-stroke dark:border-strokedark px-3 py-2">—</td>
                    <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right text-[#2d8f7b]">
                      {totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="border border-stroke dark:border-strokedark px-3 py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 3: Tax Details ── */}
      <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-5 py-3 border-b border-stroke dark:border-strokedark" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">Tax Details</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
            <div>
              <label className={labelCls}>Tax Type</label>
              <select className={selectCls} value={taxForm.taxType} onChange={(e) => setTaxForm((f) => ({ ...f, taxType: e.target.value }))}>
                <option>GST</option>
                <option>IGST</option>
                <option>TDS</option>
                <option>Cess</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Tax Percentage (%)</label>
              <input
                type="number"
                className={inputCls}
                placeholder="e.g. 18"
                min="0"
                max="100"
                value={taxForm.taxPercent}
                onChange={(e) => {
                  const pct = e.target.value;
                  const val = totalBalance > 0 ? ((totalBalance * parseFloat(pct || "0")) / 100).toFixed(2) : "";
                  setTaxForm((f) => ({ ...f, taxPercent: pct, taxValue: val }));
                }}
              />
            </div>
            <div>
              <label className={labelCls}>Tax Value (₹)</label>
              <input
                type="number"
                className={inputCls}
                placeholder="Auto-calculated"
                value={taxForm.taxValue}
                onChange={(e) => setTaxForm((f) => ({ ...f, taxValue: e.target.value }))}
              />
            </div>
          </div>

          <button
            onClick={handleAddTax}
            className="rounded px-4 py-2 text-sm font-medium text-white mb-4"
            style={{ background: "#28a745" }}
          >
            + Add Tax
          </button>

          {taxes.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-stroke dark:border-strokedark">
                <thead>
                  <tr className="bg-gray-100 dark:bg-meta-4 text-xs text-gray-600 dark:text-gray-300">
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">#</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-left">Tax Type</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Tax %</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-right">Tax Value (₹)</th>
                    <th className="border border-stroke dark:border-strokedark px-3 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taxes.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-meta-4">
                      <td className="border border-stroke dark:border-strokedark px-3 py-2">{idx + 1}</td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2">{t.taxType}</td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right">{t.taxPercent}%</td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2 text-right font-medium text-[#2d8f7b]">
                        {t.taxValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-stroke dark:border-strokedark px-3 py-2 text-center">
                        <button
                          onClick={() => setTaxes((prev) => prev.filter((x) => x.id !== t.id))}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Net Amount */}
          {(items.length > 0 || taxes.length > 0) && (
            <div className="mt-4 flex justify-end">
              <table className="text-sm border border-stroke dark:border-strokedark min-w-[260px]">
                <tbody>
                  <tr>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">Total Item Amount (₹)</td>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium">
                      {totalItemAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">Total Discount (₹)</td>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium text-red-500">
                      - {totalDiscount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">Balanced Amount (₹)</td>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium">
                      {totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-meta-4">Total Tax (₹)</td>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right font-medium">
                      + {totalTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="font-bold text-base">
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 bg-gray-50 dark:bg-meta-4" style={{ color: "#2d8f7b" }}>
                      Net Amount (₹)
                    </td>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-right" style={{ color: "#2d8f7b" }}>
                      {netAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 4: Workflow ── */}
      <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-5 py-3 border-b border-stroke dark:border-strokedark" style={{ background: "#2d8f7b" }}>
          <h3 className="text-sm font-semibold text-white">Workflow</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="skipApproval"
                checked={skipApproval}
                onChange={(e) => setSkipApproval(e.target.checked)}
                className="w-4 h-4 accent-[#2d8f7b]"
              />
              <label htmlFor="skipApproval" className="text-sm text-dark dark:text-white cursor-pointer">
                Skip Approval
              </label>
            </div>
            <div>
              <label className={labelCls}>Forward To</label>
              <input className={inputCls} placeholder="e.g. Manager" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Forward For</label>
              <input className={inputCls} placeholder="e.g. Approval" value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} />
            </div>
          </div>

          {/* Create Note Button */}
          <div className="mt-4">
            <button
              onClick={() => setShowNoteModal(true)}
              className="rounded px-4 py-2 text-sm font-medium text-white"
              style={{ background: "#17a2b8" }}
            >
              + Create Note
            </button>
          </div>

          {/* Notes list */}
          {notes.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{notes.length} note(s) added</p>
              <div className="flex flex-wrap gap-2">
                {notes.map((n, i) => (
                  <div key={i} className="px-3 py-1 rounded bg-gray-100 dark:bg-meta-4 text-xs text-dark dark:text-white border border-stroke dark:border-strokedark">
                    {n.title || `Note ${i + 1}`} — {n.date}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex justify-end gap-3 border-t border-stroke dark:border-strokedark pt-4 mt-2">
        <button
          onClick={() => router.push("/operational/quotation-order-invoice/purchase/bill/list")}
          className="rounded px-5 py-2 text-sm font-medium text-white"
          style={{ background: "#6c757d" }}
        >
          Cancel
        </button>
        <button
          onClick={() => router.push("/operational/quotation-order-invoice/purchase/bill/list")}
          className="rounded px-5 py-2 text-sm font-medium text-white"
          style={{ background: "#28a745" }}
        >
          Submit
        </button>
      </div>

      {/* ── Create Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-boxdark rounded-sm shadow-lg w-full max-w-2xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 rounded-t-sm" style={{ background: "#2d8f7b" }}>
              <h4 className="text-sm font-semibold text-white">Create Note</h4>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:text-gray-200 text-lg leading-none">
                ×
              </button>
            </div>

            <div className="p-5">
              {/* Note Title */}
              <div className="mb-3">
                <label className={labelCls}>Note Title</label>
                <input className={inputCls} placeholder="Enter title..." value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-1 mb-2 p-2 border border-stroke dark:border-strokedark rounded bg-gray-50 dark:bg-meta-4">
                {[
                  { label: "B", cmd: "bold", style: "font-bold" },
                  { label: "I", cmd: "italic", style: "italic" },
                  { label: "U", cmd: "underline", style: "underline" },
                  { label: "S", cmd: "strikeThrough", style: "line-through" },
                ].map((btn) => (
                  <button
                    key={btn.cmd}
                    onMouseDown={(e) => { e.preventDefault(); execCmd(btn.cmd); }}
                    className="w-7 h-7 rounded border border-stroke dark:border-strokedark text-xs text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-meta-4"
                  >
                    <span className={btn.style}>{btn.label}</span>
                  </button>
                ))}
                <div className="w-px h-7 bg-stroke dark:bg-strokedark mx-1" />
                <button onMouseDown={(e) => { e.preventDefault(); execCmd("insertOrderedList"); }} className="px-2 h-7 rounded border border-stroke dark:border-strokedark text-xs text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-meta-4">OL</button>
                <button onMouseDown={(e) => { e.preventDefault(); execCmd("insertUnorderedList"); }} className="px-2 h-7 rounded border border-stroke dark:border-strokedark text-xs text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-meta-4">UL</button>
                <div className="w-px h-7 bg-stroke dark:bg-strokedark mx-1" />
                <select
                  onChange={(e) => { execCmd("fontSize", e.target.value); e.target.value = ""; }}
                  className="h-7 rounded border border-stroke dark:border-strokedark text-xs px-1 bg-white dark:bg-boxdark text-dark dark:text-white"
                  defaultValue=""
                >
                  <option value="" disabled>Size</option>
                  {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Editor */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[120px] p-3 border border-stroke dark:border-strokedark rounded text-sm text-dark dark:text-white outline-none focus:border-[#2d8f7b]"
                style={{ lineHeight: 1.6 }}
              />

              {/* Created By Card */}
              <div className="mt-3 p-3 rounded border-2 border-[#fd7e14] bg-orange-50 dark:bg-meta-4">
                <p className="text-xs font-semibold text-[#fd7e14] mb-1">Created By</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#fd7e14] flex items-center justify-center text-white text-xs font-bold">
                    AD
                  </div>
                  <div>
                    <p className="text-xs font-medium text-dark dark:text-white">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 mt-4 border-t border-stroke dark:border-strokedark pt-3">
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="rounded px-4 py-2 text-sm font-medium text-white"
                  style={{ background: "#6c757d" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="rounded px-4 py-2 text-sm font-medium text-white"
                  style={{ background: "#28a745" }}
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
