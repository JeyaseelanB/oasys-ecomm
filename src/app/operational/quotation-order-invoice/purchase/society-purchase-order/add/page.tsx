"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Icon helpers ── */
const HashIco = () => <span className="text-gray-500 text-xs font-bold leading-none">#</span>;
const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" />
    <rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" />
    <rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);
const ListIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h14M3 10h14M3 15h14" />
  </svg>
);
const DocIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
      clipRule="evenodd"
    />
  </svg>
);
const RupIco = () => <span className="text-gray-500 text-xs font-bold leading-none">₹</span>;
const PinIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);
const ArrowIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
const CalIco = () => (
  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

/* ── Field wrapper ── */
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
      className={`flex-1 px-2 text-sm focus:outline-none ${
        readOnly ? "bg-gray-50 text-gray-500" : "bg-white"
      }`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </F>
);

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

type ItemRow = {
  id: number;
  varietyCode: string;
  itemName: string;
  itemDesc: string;
  qty: string;
  unitRate: string;
  totalRate: string;
};

export default function CreateSocietyPurchaseOrderPage() {
  const router = useRouter();

  // Section 1 fields
  const [supplierCode, setSupplierCode] = useState("");
  const [productionSupervisor, setProductionSupervisor] = useState("");
  const [planCode, setPlanCode] = useState("");
  const [procurementType, setProcurementType] = useState("");
  const [requirementFor, setRequirementFor] = useState("");
  const [finYear, setFinYear] = useState("");

  // Section 2 item input
  const [varietyCode, setVarietyCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitRate, setUnitRate] = useState("");
  const [itemDesc, setItemDesc] = useState("");

  // Computed item total
  const itemTotal =
    quantity && unitRate
      ? (parseFloat(quantity) * parseFloat(unitRate)).toFixed(2)
      : "";

  // Item rows
  const [itemRows, setItemRows] = useState<ItemRow[]>([]);

  // Bottom fields
  const [validityDate, setValidityDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [terms, setTerms] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [intendingRegion, setIntendingRegion] = useState("");
  const [skipApproval, setSkipApproval] = useState("No");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Approval");

  // Note modal
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteFont, setNoteFont] = useState("Sans Serif");
  const [noteFontSize, setNoteFontSize] = useState("Normal");

  const handleAddItem = () => {
    if (!varietyCode && !quantity) return;
    setItemRows((r) => [
      ...r,
      {
        id: Date.now(),
        varietyCode,
        itemName: varietyCode,
        itemDesc,
        qty: quantity,
        unitRate,
        totalRate: itemTotal,
      },
    ]);
    setVarietyCode("");
    setQuantity("");
    setUnitRate("");
    setItemDesc("");
  };

  const delItem = (id: number) => setItemRows((r) => r.filter((x) => x.id !== id));

  const totalQty = itemRows.reduce((s, r) => s + (parseFloat(r.qty) || 0), 0);
  const totalRate = itemRows.reduce((s, r) => s + (parseFloat(r.unitRate) || 0), 0);
  const totalRateAmt = itemRows.reduce((s, r) => s + (parseFloat(r.totalRate) || 0), 0);

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-teal-600">
              🏠 Home
            </Link>
          </li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li>
          <li className="text-gray-700">Create Society Purchase Order</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Create Society Purchase Order
      </h1>

      {/* Section 1: Society Purchase Order Item */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div
          className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold rounded-t"
          style={{ backgroundColor: "#2d8f7b" }}
        >
          <span>Society Purchase Order Item</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-normal opacity-90">(* Mandatory Fields)</span>
            <span className="cursor-pointer font-bold">—</span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {/* Row 1: Supplier Code */}
          <div>
            <Inp
              label="Supplier Code / Name"
              required
              icon={<HashIco />}
              value={supplierCode}
              onChange={setSupplierCode}
            />
          </div>
          {/* Row 2: Production Supervisor, Plan Code, Procurement Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Sel
              label="Production Supervisor"
              required
              icon={<ListIco />}
              options={["CHANDRAN S", "EASWARI K", "RAJESH M", "PRIYA S"]}
              value={productionSupervisor}
              onChange={setProductionSupervisor}
            />
            <Inp
              label="Plan Code"
              required
              icon={<HashIco />}
              value={planCode}
              onChange={setPlanCode}
            />
            <Sel
              label="Procurement Type"
              icon={<ListIco />}
              options={["Export Order", "Contract Order", "Direct Purchase"]}
              value={procurementType}
              onChange={setProcurementType}
            />
          </div>
          {/* Row 3: Requirement For, Fin Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Sel
              label="Requirement For"
              required
              icon={<ListIco />}
              options={[
                "Special Exhibition",
                "Regular",
                "Export",
                "Government Scheme",
              ]}
              value={requirementFor}
              onChange={setRequirementFor}
            />
            <Sel
              label="Fin Year"
              required
              icon={<ListIco />}
              options={["2024-2025", "2025-2026", "2026-2027"]}
              value={finYear}
              onChange={setFinYear}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Society Purchase Order Item Details */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <GridIco />
            <span className="font-semibold text-sm text-gray-800">
              Society Purchase Order Item Details
            </span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {/* Item input row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Product Variety Code / Name with "/" separator */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-700">
                Product Variety Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-gray-300 rounded overflow-hidden h-8">
                <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">
                  <HashIco />
                </div>
                <input
                  type="text"
                  className="flex-1 px-2 text-sm focus:outline-none bg-white"
                  value={varietyCode}
                  onChange={(e) => setVarietyCode(e.target.value)}
                />
                <div className="bg-gray-100 border-l border-gray-300 px-2 flex items-center text-gray-400 text-sm">
                  /
                </div>
              </div>
            </div>
            <Inp
              label="Quantity"
              required
              icon={<HashIco />}
              value={quantity}
              onChange={setQuantity}
              type="number"
            />
            <Inp
              label="Approved Unit Rate"
              required
              icon={<RupIco />}
              value={unitRate}
              onChange={setUnitRate}
              type="number"
            />
            <Inp
              label="Item Total"
              icon={<RupIco />}
              value={itemTotal}
              readOnly
            />
          </div>

          {/* Item input row 2: description + Add button */}
          <div className="flex items-end gap-4">
            <div className="flex-1 max-w-xs">
              <Inp
                label="Item Description (Any Specific Requirement)"
                icon={<DocIco />}
                value={itemDesc}
                onChange={setItemDesc}
              />
            </div>
            <div className="flex justify-end flex-1">
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#28a745" }}
                onClick={handleAddItem}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>

          {/* Item table */}
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full text-xs">
              <thead style={{ backgroundColor: "#2d8f7b" }} className="text-white">
                <tr>
                  {[
                    "#",
                    "Item Name",
                    "Item Description (Any Specific Requirement)",
                    "Quantity",
                    "Approved Unit Rate (₹)",
                    "Total Rate (₹)",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {itemRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-3 text-gray-500 text-xs">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  itemRows.map((r, i) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2">{i + 1}</td>
                      <td className="px-3 py-2">{r.itemName}</td>
                      <td className="px-3 py-2">{r.itemDesc || "—"}</td>
                      <td className="px-3 py-2">{r.qty}</td>
                      <td className="px-3 py-2">{r.unitRate}</td>
                      <td className="px-3 py-2">{r.totalRate}</td>
                      <td className="px-3 py-2">
                        <button
                          className="text-red-500 hover:text-red-700 text-xs"
                          onClick={() => delItem(r.id)}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                <tr className="bg-gray-50 font-semibold text-gray-700">
                  <td colSpan={3} className="px-3 py-2 text-right">
                    Total
                  </td>
                  <td className="px-3 py-2">{totalQty.toFixed(2)}</td>
                  <td className="px-3 py-2">{totalRate.toFixed(2)}</td>
                  <td className="px-3 py-2">{totalRateAmt.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom fields */}
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col gap-4 flex-1">
              <DateF
                label="Purchase Order Validity Date"
                value={validityDate}
                onChange={setValidityDate}
              />
              <Inp
                label="Billing Address"
                icon={<PinIco />}
                value={billingAddress}
                onChange={setBillingAddress}
              />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <DateF
                label="Expected Date of Delivery"
                value={deliveryDate}
                onChange={setDeliveryDate}
              />
              <Inp
                label="Shipping Address"
                icon={<PinIco />}
                value={shippingAddress}
                onChange={setShippingAddress}
              />
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

          {/* Intending Region */}
          <div className="max-w-xs">
            <Inp
              label="Intending Region"
              icon={<HashIco />}
              value={intendingRegion}
              onChange={setIntendingRegion}
            />
          </div>

          {/* Skip Approval row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Sel
              label="Skip Approval"
              icon={<ArrowIco />}
              options={["No", "Yes"]}
              value={skipApproval}
              onChange={setSkipApproval}
            />
            <Inp
              label="Forward To"
              required
              icon={<ArrowIco />}
              value={forwardTo}
              onChange={setForwardTo}
            />
            <Sel
              label="Forward For"
              required
              icon={<ArrowIco />}
              options={["Approval", "Review", "Information"]}
              value={forwardFor}
              onChange={setForwardFor}
            />
          </div>

          {/* Create Note button */}
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
            onClick={() =>
              router.push(
                "/operational/quotation-order-invoice/purchase/society-purchase-order/list"
              )
            }
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#28a745" }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
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
              style={{ backgroundColor: "#2d8f7b" }}
            >
              <span>Create Note</span>
              <button
                className="text-white hover:opacity-70 text-base leading-none"
                onClick={() => setShowNote(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              {/* Rich text toolbar */}
              <div className="flex flex-wrap gap-1 border border-gray-200 rounded p-1.5 bg-gray-50 items-center">
                <select
                  className="text-xs border border-gray-300 rounded px-1 py-0.5"
                  value={noteFont}
                  onChange={(e) => setNoteFont(e.target.value)}
                >
                  <option>Sans Serif</option>
                  <option>Arial</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                </select>
                <select
                  className="text-xs border border-gray-300 rounded px-1 py-0.5"
                  value={noteFontSize}
                  onChange={(e) => setNoteFontSize(e.target.value)}
                >
                  <option>Normal</option>
                  {[10, 12, 14, 16, 18, 20].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {/* Format buttons */}
                {[
                  { label: "B", style: { fontWeight: "bold" } },
                  { label: "I", style: { fontStyle: "italic" } },
                  { label: "U", style: { textDecoration: "underline" } },
                  { label: "S", style: { textDecoration: "line-through" } },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className="w-6 h-6 text-xs border border-gray-300 rounded hover:bg-gray-200 bg-white"
                    style={btn.style as React.CSSProperties}
                  >
                    {btn.label}
                  </button>
                ))}
                <span className="border-l border-gray-300 h-5 mx-1" />
                {/* Alignment + other toolbar icons */}
                {["A", "Ā", "x₂", "x²", "H₁", "H₂", "❝", "</>"].map((icon) => (
                  <button
                    key={icon}
                    className="w-6 h-6 text-xs border border-gray-300 rounded hover:bg-gray-200 bg-white"
                  >
                    {icon}
                  </button>
                ))}
                <span className="border-l border-gray-300 h-5 mx-1" />
                {["≡", "⁕", "⇤", "⇥", "¶", "—"].map((icon) => (
                  <button
                    key={icon}
                    className="w-6 h-6 text-xs border border-gray-300 rounded hover:bg-gray-200 bg-white"
                  >
                    {icon}
                  </button>
                ))}
                <span className="border-l border-gray-300 h-5 mx-1" />
                {["🔗", "🖼", "⊞", "Tx"].map((icon) => (
                  <button
                    key={icon}
                    className="w-6 h-6 text-xs border border-gray-300 rounded hover:bg-gray-200 bg-white"
                  >
                    {icon}
                  </button>
                ))}
              </div>

              {/* Text area */}
              <div className="border border-gray-200 rounded min-h-32 p-2 bg-white">
                <textarea
                  rows={5}
                  className="w-full text-sm focus:outline-none resize-none"
                  placeholder="Enter text ..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </div>

              {/* Created By card + navigation */}
              <div className="flex items-start gap-4">
                <div
                  className="border rounded p-3 w-56"
                  style={{ borderColor: "#f97316" }}
                >
                  <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">
                    Created By
                  </p>
                  <p className="text-xs text-gray-700">Name : SANKARANARAYANAN</p>
                  <p className="text-xs text-gray-700">Designation : SUPERINTENDENT</p>
                  <p className="text-xs text-gray-700">Date : 13-Mar-2026</p>
                </div>
                <div className="flex flex-col items-center gap-2 pt-1 ml-auto">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
                  </div>
                  <div className="flex gap-1">
                    <button className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100">
                      ◀
                    </button>
                    <button className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-40 hover:bg-gray-100">
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#6c757d" }}
                onClick={() => setShowNote(false)}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#28a745" }}
                onClick={() => setShowNote(false)}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
