"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Icon helpers ── */
const ListIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 5h14M3 10h14M3 15h14" clipRule="evenodd" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
const HashIco = () => <span className="text-gray-500 text-xs font-bold leading-none">#</span>;
const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" /><rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);
const StackIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
  </svg>
);
const TreeIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 4a2 2 0 012-2h4a2 2 0 012 2v2h4a2 2 0 012 2v2h2v2h-2v2a2 2 0 01-2 2h-4v2H8v-2H4a2 2 0 01-2-2V4z" />
  </svg>
);
const PencilIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);
const CartIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
  </svg>
);
const DocIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);
const RupIco = () => <span className="text-gray-500 text-xs font-bold leading-none">₹</span>;
const PctIco = () => <span className="text-gray-500 text-xs font-bold leading-none">%</span>;
const PinIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const ArrowIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);
const CalIco = () => (
  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

/* ── Field wrappers ── */
const F = ({
  label,
  required,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="flex border border-gray-300 rounded overflow-hidden h-8">
      <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">
        {icon}
      </div>
      {children}
    </div>
  </div>
);

const Sel = ({
  label,
  required,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <F label={label} required={required} icon={icon}>
    <select
      className="flex-1 px-2 text-sm focus:outline-none bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </F>
);

const Inp = ({
  label,
  required,
  icon,
  value,
  onChange,
  readOnly,
  placeholder,
  type,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  type?: string;
}) => (
  <F label={label} required={required} icon={icon}>
    <input
      type={type ?? "text"}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`flex-1 px-2 text-sm focus:outline-none ${readOnly ? "bg-gray-50 text-gray-500" : "bg-white"}`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </F>
);

/* ── Date field with teal calendar button ── */
const DateF = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-700">{label}</label>
    <div className="flex border border-gray-300 rounded overflow-hidden h-8">
      <input
        type="text"
        placeholder="dd-MMM-yyyy"
        className="flex-1 px-2 text-sm focus:outline-none bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        className="px-2 flex items-center justify-center border-l border-gray-300 cursor-pointer"
        style={{ backgroundColor: "#17a2b8" }}
      >
        <CalIco />
      </div>
    </div>
  </div>
);

type TaxRow = { id: number; taxType: string; tax: string; taxValue: string };
type ItemRow = {
  id: number;
  itemName: string;
  itemDesc: string;
  uom: string;
  qty: string;
  unitRate: string;
  totalRate: string;
  discountValue: string;
  taxValue: string;
  netAmount: string;
};

export default function CreatePurchaseOrderPage() {
  const router = useRouter();

  // Top section
  const [supplierType, setSupplierType] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [orderBasedOn, setOrderBasedOn] = useState("");

  // Item details
  const [orderType, setOrderType] = useState("");
  const [prodCatGroup, setProdCatGroup] = useState("");
  const [prodCatCode, setProdCatCode] = useState("");
  const [prodGroupCode, setProdGroupCode] = useState("");
  const [prodVariety, setProdVariety] = useState("");
  const [uom, setUom] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitRate, setUnitRate] = useState("");
  const [itemTotal, setItemTotal] = useState("");
  const [discApplicable, setDiscApplicable] = useState("");
  const [discType, setDiscType] = useState("");
  const [discount, setDiscount] = useState("");
  const [discValue, setDiscValue] = useState("");
  const [balanceAmount] = useState("0.00");

  // Tax
  const [gstApplicable, setGstApplicable] = useState("");
  const [taxType, setTaxType] = useState("");
  const [tax, setTax] = useState("");
  const [taxValueInput, setTaxValueInput] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [taxRows, setTaxRows] = useState<TaxRow[]>([]);

  // Items table
  const [itemRows, setItemRows] = useState<ItemRow[]>([]);

  // Bottom
  const [validityDate, setValidityDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [terms, setTerms] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [skipApproval, setSkipApproval] = useState("No");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Approval");

  // Note modal
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteIdx, setNoteIdx] = useState(0);

  const addTaxRow = () => {
    if (!taxType) return;
    setTaxRows((r) => [
      ...r,
      { id: Date.now(), taxType, tax, taxValue: taxValueInput },
    ]);
    setTaxType("");
    setTax("");
    setTaxValueInput("");
  };

  const addItemRow = () => {
    if (!itemName && !prodVariety) return;
    setItemRows((r) => [
      ...r,
      {
        id: Date.now(),
        itemName,
        itemDesc,
        uom,
        qty: quantity,
        unitRate,
        totalRate: itemTotal,
        discountValue: discValue,
        taxValue: taxValueInput,
        netAmount,
      },
    ]);
  };

  const delItem = (id: number) => setItemRows((r) => r.filter((x) => x.id !== id));
  const delTax = (id: number) => setTaxRows((r) => r.filter((x) => x.id !== id));

  const totalRate = itemRows.reduce((s, r) => s + (parseFloat(r.totalRate) || 0), 0);
  const totalDisc = itemRows.reduce((s, r) => s + (parseFloat(r.discountValue) || 0), 0);
  const totalTax = itemRows.reduce((s, r) => s + (parseFloat(r.taxValue) || 0), 0);
  const totalNet = itemRows.reduce((s, r) => s + (parseFloat(r.netAmount) || 0), 0);
  const totalTaxVal = taxRows.reduce((s, r) => s + (parseFloat(r.taxValue) || 0), 0);
  const totalTaxTax = taxRows.reduce((s, r) => s + (parseFloat(r.tax) || 0), 0);

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-teal-600">🏠 Home</Link>
          </li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li>
          <li className="text-gray-700">Create Purchase Order</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Create Purchase Order
      </h1>

      {/* Section 1: Purchase Order Item */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div
          className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold rounded-t"
          style={{ backgroundColor: "#2d8f7b" }}
        >
          <span>Purchase Order Item</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-normal opacity-90">
              (* Mandatory Fields)
            </span>
            <span className="cursor-pointer font-bold">—</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Sel
              label="Supplier Type"
              required
              icon={<ListIco />}
              options={["SOCIETY", "GENSUP", "LOCSUP"]}
              value={supplierType}
              onChange={setSupplierType}
            />
            <Inp
              label="Supplier Code / Name"
              required
              icon={<HashIco />}
              value={supplierCode}
              onChange={setSupplierCode}
            />
            <Sel
              label="Purchase Order Based on"
              required
              icon={<ListIco />}
              options={["With Quotation", "Without Quotation"]}
              value={orderBasedOn}
              onChange={setOrderBasedOn}
            />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#6c757d" }}
              onClick={() => {
                setSupplierType("");
                setSupplierCode("");
                setOrderBasedOn("");
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 13.5V17h3.5l9.026-9.026-3.5-3.5L4 13.5z" />
              </svg>
              Clear
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#17a2b8" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Purchase Order Item Details */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <GridIco />
            <span className="font-semibold text-sm text-gray-800">
              Purchase Order Item Details
            </span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Sel label="Order Type" required icon={<ListIco />} options={["NEW", "REPEAT", "EMERGENCY"]} value={orderType} onChange={setOrderType} />
            <Sel label="Product Category Group" required icon={<GridIco />} options={["SILK", "COTTON", "WOOL"]} value={prodCatGroup} onChange={setProdCatGroup} />
            <Sel label="Product Category Code / Name" required icon={<StackIco />} options={["SC-001", "SC-002"]} value={prodCatCode} onChange={setProdCatCode} />
            <Sel label="Product Group Code / Name" required icon={<GridIco />} options={["PG-001", "PG-002"]} value={prodGroupCode} onChange={setProdGroupCode} />
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Sel label="Product Variety Code / Name" required icon={<TreeIco />} options={["ASWS", "BSWV", "CSMK"]} value={prodVariety} onChange={setProdVariety} />
            <Sel label="UOM" required icon={<PencilIco />} options={["MTR", "KGS", "NOS", "PCS"]} value={uom} onChange={setUom} />
            <Inp label="Item Name" icon={<CartIco />} value={itemName} onChange={setItemName} />
            <Inp label="Item Description" icon={<DocIco />} value={itemDesc} onChange={setItemDesc} />
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Inp label="Quantity" required icon={<HashIco />} value={quantity} onChange={setQuantity} type="number" />
            <Inp label="Approved Unit Rate" required icon={<RupIco />} value={unitRate} onChange={setUnitRate} type="number" />
            <Inp label="Item Total" icon={<RupIco />} value={itemTotal} onChange={setItemTotal} type="number" />
            <Sel label="Discount Applicable" icon={<DocIco />} options={["YES", "NO"]} value={discApplicable} onChange={setDiscApplicable} />
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Sel label="Discount Type" icon={<ListIco />} options={["PERCENTAGE", "FIXED"]} value={discType} onChange={setDiscType} />
            <Inp label="Discount" icon={<PctIco />} value={discount} onChange={setDiscount} type="number" />
            <Inp label="Discount Value" icon={<RupIco />} value={discValue} onChange={setDiscValue} type="number" />
            <Inp label="Balance Amount" icon={<RupIco />} value={balanceAmount} readOnly />
          </div>

          {/* Tax row: left fields + right table */}
          <div className="flex gap-4">
            {/* Left */}
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <Sel label="GST Applicable" icon={<ListIco />} options={["YES", "NO"]} value={gstApplicable} onChange={setGstApplicable} />
                <Sel label="Tax Type" required icon={<HashIco />} options={["CGST/SGST", "IGST"]} value={taxType} onChange={setTaxType} />
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Inp label="Tax" required icon={<PctIco />} value={tax} onChange={setTax} type="number" />
                </div>
                <div className="flex-1">
                  <Inp label="Tax Value" required icon={<RupIco />} value={taxValueInput} onChange={setTaxValueInput} type="number" />
                </div>
                <button
                  className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded mb-0.5"
                  style={{ backgroundColor: "#28a745" }}
                  onClick={addTaxRow}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Add
                </button>
              </div>
              <div className="grid grid-cols-1">
                <Inp label="Net Amount" required icon={<RupIco />} value={netAmount} onChange={setNetAmount} type="number" />
              </div>
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                  style={{ backgroundColor: "#6c757d" }}
                  onClick={() => {
                    setGstApplicable(""); setTaxType(""); setTax(""); setTaxValueInput(""); setNetAmount("");
                    setQuantity(""); setUnitRate(""); setItemTotal(""); setDiscValue(""); setDiscount("");
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 13.5V17h3.5l9.026-9.026-3.5-3.5L4 13.5z" />
                  </svg>
                  Clear
                </button>
                <button
                  className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                  style={{ backgroundColor: "#28a745" }}
                  onClick={addItemRow}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
            {/* Right: Tax table */}
            <div className="w-80">
              <table className="w-full text-xs border border-gray-200 rounded overflow-hidden">
                <thead style={{ backgroundColor: "#2d8f7b" }} className="text-white">
                  <tr>
                    <th className="px-2 py-2 text-center font-semibold w-8">#</th>
                    <th className="px-2 py-2 text-left font-semibold">Tax Type</th>
                    <th className="px-2 py-2 text-left font-semibold">Tax</th>
                    <th className="px-2 py-2 text-left font-semibold">Tax Value (₹)</th>
                    <th className="px-2 py-2 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {taxRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-3 text-gray-500 text-xs">No records found.</td>
                    </tr>
                  ) : (
                    taxRows.map((r, i) => (
                      <tr key={r.id} className="border-b border-gray-100">
                        <td className="px-2 py-1.5 text-center">{i + 1}</td>
                        <td className="px-2 py-1.5">{r.taxType}</td>
                        <td className="px-2 py-1.5">{r.tax}</td>
                        <td className="px-2 py-1.5">{r.taxValue}</td>
                        <td className="px-2 py-1.5 text-center">
                          <button className="text-red-500 hover:text-red-700 text-xs" onClick={() => delTax(r.id)}>✕</button>
                        </td>
                      </tr>
                    ))
                  )}
                  <tr className="bg-gray-50 font-semibold text-gray-700">
                    <td colSpan={3} className="px-2 py-1.5 text-right">Total</td>
                    <td className="px-2 py-1.5">{totalTaxTax.toFixed(2)}</td>
                    <td className="px-2 py-1.5 text-center">{totalTaxVal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Item table */}
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full text-xs">
              <thead style={{ backgroundColor: "#2d8f7b" }} className="text-white">
                <tr>
                  {["#", "Item Name", "Item Description", "UOM", "Quantity", "Approved Unit Rate (₹)", "Total Rate (₹)", "Discount Value (₹)", "Tax Value (₹)", "Net Amount (₹)", "Action"].map((h) => (
                    <th key={h} className="px-2 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {itemRows.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-3 py-3 text-gray-500 text-xs">No records found.</td>
                  </tr>
                ) : (
                  itemRows.map((r, i) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-2 py-1.5">{i + 1}</td>
                      <td className="px-2 py-1.5">{r.itemName}</td>
                      <td className="px-2 py-1.5">{r.itemDesc}</td>
                      <td className="px-2 py-1.5">{r.uom}</td>
                      <td className="px-2 py-1.5">{r.qty}</td>
                      <td className="px-2 py-1.5">{r.unitRate}</td>
                      <td className="px-2 py-1.5">{r.totalRate}</td>
                      <td className="px-2 py-1.5">{r.discountValue}</td>
                      <td className="px-2 py-1.5">{r.taxValue}</td>
                      <td className="px-2 py-1.5">{r.netAmount}</td>
                      <td className="px-2 py-1.5">
                        <button className="text-red-500 hover:text-red-700 text-xs" onClick={() => delItem(r.id)}>✕</button>
                      </td>
                    </tr>
                  ))
                )}
                <tr className="bg-gray-50 font-semibold text-gray-700 text-xs">
                  <td colSpan={5} className="px-2 py-1.5 text-right">Total</td>
                  <td className="px-2 py-1.5">0.00</td>
                  <td className="px-2 py-1.5">{totalRate.toFixed(2)}</td>
                  <td className="px-2 py-1.5">{totalDisc.toFixed(2)}</td>
                  <td className="px-2 py-1.5">{totalTax.toFixed(2)}</td>
                  <td className="px-2 py-1.5">{totalNet.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom: Dates + Terms + Address + Skip Approval */}
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col gap-4 flex-1">
              <DateF label="Purchase Order Validity Date" value={validityDate} onChange={setValidityDate} />
              <Inp label="Billing Address" icon={<PinIco />} value={billingAddress} onChange={setBillingAddress} />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <DateF label="Expected Date of Delivery" value={deliveryDate} onChange={setDeliveryDate} />
              <Inp label="Shipping Address" icon={<PinIco />} value={shippingAddress} onChange={setShippingAddress} />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs text-gray-700">Terms &amp; Conditions</label>
              <textarea
                rows={5}
                className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
            </div>
          </div>

          {/* Skip Approval row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Sel label="Skip Approval" icon={<ArrowIco />} options={["No", "Yes"]} value={skipApproval} onChange={setSkipApproval} />
            <Inp label="Forward To" icon={<ArrowIco />} value={forwardTo} onChange={setForwardTo} />
            <Sel label="Forward For" icon={<ArrowIco />} options={["Approval", "Review", "Information"]} value={forwardFor} onChange={setForwardFor} />
          </div>

          {/* Create Note */}
          <div>
            <button
              className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#28a745" }}
              onClick={() => setShowNote(true)}
            >
              <span className="text-base leading-none">+</span> Create Note
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#6c757d" }}
            onClick={() => router.push("/operational/quotation-order-invoice/purchase/purchase-order/list")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#28a745" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-2xl mx-4">
            <div
              className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between"
              style={{ backgroundColor: "#17a2b8" }}
            >
              <span>Create Note</span>
              <button className="text-white hover:opacity-70" onClick={() => setShowNote(false)}>✕</button>
            </div>
            <div className="p-4 space-y-3">
              {/* Rich text toolbar */}
              <div className="flex flex-wrap gap-1 border border-gray-200 rounded p-1.5 bg-gray-50">
                <select className="text-xs border border-gray-300 rounded px-1 py-0.5">
                  <option>Font</option><option>Arial</option><option>Times New Roman</option>
                </select>
                <select className="text-xs border border-gray-300 rounded px-1 py-0.5">
                  <option>Size</option>{[10,12,14,16,18].map(s => <option key={s}>{s}</option>)}
                </select>
                {[["B","bold"],["I","italic"],["U","underline"],["S","line-through"]].map(([b, style]) => (
                  <button key={b} className="w-6 h-6 text-xs border border-gray-300 rounded hover:bg-gray-200 bg-white" style={{ fontStyle: style === "italic" ? "italic" : "normal", fontWeight: style === "bold" ? "bold" : "normal", textDecoration: style === "underline" ? "underline" : style === "line-through" ? "line-through" : "none" }}>{b}</button>
                ))}
              </div>
              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
                placeholder="Enter note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="flex items-start gap-4">
                <div className="border border-gray-300 rounded p-3 flex-1">
                  <p className="text-xs font-semibold text-gray-500 mb-1 text-center">Created By</p>
                  <p className="text-xs text-gray-700">Name : New User</p>
                  <p className="text-xs text-gray-700">Designation : STAFF</p>
                  <p className="text-xs text-gray-700">Date : 11-Mar-2026</p>
                </div>
                <div className="flex flex-col items-center gap-2 pt-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
                  </div>
                  <div className="flex gap-1">
                    <button disabled={noteIdx === 0} onClick={() => setNoteIdx(i => i - 1)} className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100">◀</button>
                    <button disabled onClick={() => setNoteIdx(i => i + 1)} className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100">▶</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-gray-200">
              <button className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded hover:bg-gray-200" onClick={() => setShowNote(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
