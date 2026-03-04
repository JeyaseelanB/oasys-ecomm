"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ───────────────────────── icons ───────────────────────── */
const HashIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
const EntityIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const RupeeIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 3h12M6 8h12M6 13l8 8M6 13h3a4 4 0 000-8" />
  </svg>
);
const PercentIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const CalIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const WeightIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 3a3 3 0 100 6 3 3 0 000-6z" /><path d="M6.343 8.657L3.515 11.485A8 8 0 1020.485 11.485L17.657 8.657" />
  </svg>
);
const TruckIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const LayersIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7 12,2" />
    <polyline points="2,17 12,22 22,17" /><polyline points="2,12 12,17 22,12" />
  </svg>
);
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" /><rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" /><rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);
const TrashIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
  </svg>
);

/* ───────────────────── reusable field wrapper ───────────────────── */
function FieldGroup({ label, required, icon, children }: {
  label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-dark dark:text-white">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="flex items-center overflow-hidden rounded border border-stroke bg-white focus-within:border-[#17a2b8] dark:border-dark-3 dark:bg-gray-dark">
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 w-full bg-transparent px-3 text-sm text-dark outline-none placeholder:text-gray-400 disabled:bg-gray-50 dark:text-white dark:disabled:bg-dark-2"
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-10 w-full bg-transparent px-3 text-sm text-dark outline-none dark:bg-gray-dark dark:text-white"
    >
      {children}
    </select>
  );
}

/* ───────────────────── types ───────────────────── */
interface ProductItem {
  id: number;
  productVarietyCode: string;
  atNumber: string;
  purchaseOrderNumber: string;
  uom: string;
  hsnCode: string;
  unitRate: number;
  dispatchedQty: number;
  totalRate: number;
  tax: number;
  taxValue: number;
  netValue: number;
}

const SAMPLE_ITEMS: ProductItem[] = [
  {
    id: 1, productVarietyCode: "ASWS / AN...", atNumber: "123", purchaseOrderNumber: "",
    uom: "NOS", hsnCode: "50072090", unitRate: 5000, dispatchedQty: 10,
    totalRate: 50000, tax: 5, taxValue: 2500, netValue: 52500,
  },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function CreateSocietyInvoicePage() {
  const router = useRouter();

  /* header form */
  const [form, setForm] = useState({
    byPO: false,
    entityType: "",
    shippingTo: "2381 - PWH CHENNIMALAI",
    purchaseOrderNumber: "",
    invoiceNumber: "12345",
    invoiceDate: "03-Mar-2026",
    orderType: "GEN",
  });

  /* add-item form */
  const [item, setItem] = useState({
    productVarietyCode: "",
    hsnCode: "",
    atNumber: "",
    uom: "",
    quantity: "",
    rate: "",
    tax: "",
  });

  /* product rows */
  const [rows, setRows] = useState<ProductItem[]>(SAMPLE_ITEMS);
  const [nextId, setNextId] = useState(2);

  /* bundle + transport */
  const [bundle, setBundle] = useState({ bundleNumber: "", totalBundleWeight: "" });
  const [transport, setTransport] = useState({
    serviceType: "LRY / Lorry Service",
    serviceName: "ABTS / ABT Lorry Service",
    waybillAvailable: "No",
    waybillNumber: "",
    chargeAvailable: "No",
    chargeType: "",
    chargeAmount: "",
  });

  /* totals */
  const totalQty = rows.reduce((s, r) => s + r.dispatchedQty, 0);
  const totalRate = rows.reduce((s, r) => s + r.totalRate, 0);
  const totalTaxValue = rows.reduce((s, r) => s + r.taxValue, 0);
  const totalNet = rows.reduce((s, r) => s + r.netValue, 0);
  const cgst = totalTaxValue / 2;
  const sgst = totalTaxValue / 2;

  const handleAddItem = () => {
    if (!item.productVarietyCode || !item.hsnCode || !item.quantity || !item.rate) return;
    const qty = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.rate) || 0;
    const taxPct = parseFloat(item.tax) || 0;
    const totalRateVal = qty * rate;
    const taxValue = (totalRateVal * taxPct) / 100;
    const newRow: ProductItem = {
      id: nextId,
      productVarietyCode: item.productVarietyCode,
      atNumber: item.atNumber,
      purchaseOrderNumber: "",
      uom: item.uom || "NOS",
      hsnCode: item.hsnCode,
      unitRate: rate,
      dispatchedQty: qty,
      totalRate: totalRateVal,
      tax: taxPct,
      taxValue,
      netValue: totalRateVal + taxValue,
    };
    setRows((prev) => [...prev, newRow]);
    setNextId((n) => n + 1);
    setItem({ productVarietyCode: "", hsnCode: "", atNumber: "", uom: "", quantity: "", rate: "", tax: "" });
  };

  const handleDeleteRow = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id));

  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Society Invoice
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/weavers/society-invoice" className="text-gray-500 hover:text-primary dark:text-gray-400">Weavers</Link></li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Society Invoice</li>
          </ol>
        </nav>
      </div>

      {/* ── Section 1: Society Invoice ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* section header */}
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Society Invoice</span>
          <button className="text-white hover:opacity-70 text-lg leading-none font-bold">−</button>
        </div>

        <div className="space-y-5 p-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* By Society P.O */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">By Socity P.O</label>
              <div className="flex h-10 items-center gap-2 rounded border border-stroke bg-white px-3 dark:border-dark-3 dark:bg-gray-dark">
                <input
                  type="checkbox"
                  checked={form.byPO}
                  onChange={(e) => setForm((f) => ({ ...f, byPO: e.target.checked }))}
                  className="size-4 cursor-pointer accent-[#17a2b8]"
                />
              </div>
            </div>

            {/* For Entity Type */}
            <FieldGroup label="For Entity Type" icon={<EntityIcon />}>
              <Select value={form.entityType} onChange={(e) => setForm((f) => ({ ...f, entityType: e.target.value }))}>
                <option value="">Select</option>
                <option value="SOCIETY">SOCIETY</option>
                <option value="INDIVIDUAL">INDIVIDUAL</option>
              </Select>
            </FieldGroup>

            {/* Shipping To */}
            <FieldGroup label="Shipping To" required icon={<EntityIcon />}>
              <Select value={form.shippingTo} onChange={(e) => setForm((f) => ({ ...f, shippingTo: e.target.value }))}>
                <option>2381 - PWH CHENNIMALAI</option>
                <option>1881 / PWH - SALEM</option>
              </Select>
            </FieldGroup>

            {/* Purchase Order Number */}
            <FieldGroup label="Purchase Order Number" icon={<EntityIcon />}>
              <Input
                type="text"
                value={form.purchaseOrderNumber}
                onChange={(e) => setForm((f) => ({ ...f, purchaseOrderNumber: e.target.value }))}
              />
            </FieldGroup>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Invoice Number */}
            <FieldGroup label="Invoice Number" required icon={<HashIcon />}>
              <Input
                type="text"
                value={form.invoiceNumber}
                onChange={(e) => setForm((f) => ({ ...f, invoiceNumber: e.target.value }))}
              />
            </FieldGroup>

            {/* Invoice Date */}
            <FieldGroup label="Invoice Date" required icon={<CalIcon />}>
              <Input
                type="text"
                value={form.invoiceDate}
                onChange={(e) => setForm((f) => ({ ...f, invoiceDate: e.target.value }))}
                placeholder="dd-MMM-yyyy"
              />
            </FieldGroup>

            {/* Order Type */}
            <FieldGroup label="Order Type" required icon={<EntityIcon />}>
              <Select value={form.orderType} onChange={(e) => setForm((f) => ({ ...f, orderType: e.target.value }))}>
                <option value="GEN">GEN</option>
                <option value="SPL">SPL</option>
              </Select>
            </FieldGroup>
          </div>
        </div>
      </div>

      {/* ── Section 2: Add Item Receive Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Add Item Receive Details
          </h3>
        </div>

        <div className="space-y-4 p-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FieldGroup label="Product Variety Code" required icon={<EntityIcon />}>
              <Input
                type="text"
                value={item.productVarietyCode}
                onChange={(e) => setItem((i) => ({ ...i, productVarietyCode: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="HSN Code" required icon={<HashIcon />}>
              <Input
                type="text"
                value={item.hsnCode}
                onChange={(e) => setItem((i) => ({ ...i, hsnCode: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="AT Number" icon={<HashIcon />}>
              <Input
                type="text"
                value={item.atNumber}
                onChange={(e) => setItem((i) => ({ ...i, atNumber: e.target.value }))}
              />
            </FieldGroup>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">
                UOM<span className="ml-0.5 text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex flex-1 items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-stroke dark:border-dark-3">
                    <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </span>
                  <Input type="text" value={item.uom} disabled placeholder="Auto" />
                </div>
                <button
                  onClick={() => setItem((i) => ({ ...i, uom: "NOS" }))}
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90 whitespace-nowrap"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                  </svg>
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[160px] flex-1">
              <FieldGroup label="Quantity" required icon={<LayersIcon />}>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => setItem((i) => ({ ...i, quantity: e.target.value }))}
                />
              </FieldGroup>
            </div>

            <div className="min-w-[160px] flex-1">
              <FieldGroup label="Rate" required icon={<RupeeIcon />}>
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) => setItem((i) => ({ ...i, rate: e.target.value }))}
                />
              </FieldGroup>
            </div>

            <div className="min-w-[160px] flex-1">
              <FieldGroup label="Tax" icon={<PercentIcon />}>
                <Input
                  type="number"
                  value={item.tax}
                  onChange={(e) => setItem((i) => ({ ...i, tax: e.target.value }))}
                />
              </FieldGroup>
            </div>

            <div className="flex items-end gap-2 pb-0.5">
              <button
                onClick={() => setItem({ productVarietyCode: "", hsnCode: "", atNumber: "", uom: "", quantity: "", rate: "", tax: "" })}
                className="flex items-center gap-1.5 rounded bg-[#5a6268] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                </svg>
                Clear
              </button>
              <button
                onClick={handleAddItem}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* ── Product wise Details table ── */}
        <div className="border-t border-stroke px-5 pb-1 pt-3 dark:border-dark-3">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Product wise Details
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {["#", "Product Variety Code / Name", "AT Number", "Purchase Order Number", "UOM", "HSN Code", "Unit Rate (₹)", "Dispatched Quantity", "Total Rate (₹)", "Tax (%)", "Tax Value(₹)", "Net Value(₹)", "Action"].map((col) => (
                  <th key={col} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"}`}>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.productVarietyCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.atNumber}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.purchaseOrderNumber}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.hsnCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.unitRate)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.dispatchedQty)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.totalRate)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.tax)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.taxValue)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.netValue)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      className="flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Total row */}
              <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                <td colSpan={7} className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">Total</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalQty)}</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalRate)}</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalTaxValue)}</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalNet)}</td>
                <td className="border-t border-stroke dark:border-dark-3"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tax summary */}
        <div className="border-t border-stroke dark:border-dark-3">
          {[
            { label: "Material Value(Without Tax)(₹):", value: fmt(totalRate) },
            { label: "CGST(₹):", value: fmt(cgst) },
            { label: "SGST(₹):", value: fmt(sgst) },
            { label: "Net Total(₹):", value: fmt(totalNet) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-end gap-8 border-b border-stroke px-5 py-2.5 last:border-0 dark:border-dark-3">
              <span className="text-sm font-medium text-dark dark:text-white">{label}</span>
              <span className="w-32 text-right text-sm font-semibold text-dark dark:text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Bundle Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Bundle Details
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <FieldGroup label="Bundle Number" icon={<HashIcon />}>
            <Input
              type="text"
              value={bundle.bundleNumber}
              onChange={(e) => setBundle((b) => ({ ...b, bundleNumber: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Total Bundle Weight" icon={<WeightIcon />}>
            <Input
              type="text"
              value={bundle.totalBundleWeight}
              onChange={(e) => setBundle((b) => ({ ...b, totalBundleWeight: e.target.value }))}
            />
          </FieldGroup>
        </div>
      </div>

      {/* ── Section 4: Transport Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Transport Details
          </h3>
        </div>
        <div className="space-y-4 p-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FieldGroup label="Transport Service Type" required icon={<TruckIcon />}>
              <Select value={transport.serviceType} onChange={(e) => setTransport((t) => ({ ...t, serviceType: e.target.value }))}>
                <option>LRY / Lorry Service</option>
                <option>RAIL / Rail Service</option>
                <option>AIR / Air Service</option>
              </Select>
            </FieldGroup>

            <FieldGroup label="Transport Service Name" required icon={<TruckIcon />}>
              <Select value={transport.serviceName} onChange={(e) => setTransport((t) => ({ ...t, serviceName: e.target.value }))}>
                <option>ABTS / ABT Lorry Service</option>
                <option>OTHER</option>
              </Select>
            </FieldGroup>

            <FieldGroup label="Waybill Available" required icon={<LayersIcon />}>
              <Select value={transport.waybillAvailable} onChange={(e) => setTransport((t) => ({ ...t, waybillAvailable: e.target.value }))}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Select>
            </FieldGroup>

            <FieldGroup label="Waybill Number" icon={<HashIcon />}>
              <Input
                type="text"
                value={transport.waybillNumber}
                disabled={transport.waybillAvailable === "No"}
                onChange={(e) => setTransport((t) => ({ ...t, waybillNumber: e.target.value }))}
              />
            </FieldGroup>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FieldGroup label="Transport Charge Available" required icon={<LayersIcon />}>
              <Select value={transport.chargeAvailable} onChange={(e) => setTransport((t) => ({ ...t, chargeAvailable: e.target.value }))}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Select>
            </FieldGroup>

            <FieldGroup label="Transport Charge Type" icon={<HashIcon />}>
              <Select value={transport.chargeType} onChange={(e) => setTransport((t) => ({ ...t, chargeType: e.target.value }))}>
                <option value="">Select</option>
                <option value="FIXED">Fixed</option>
                <option value="PERCENTAGE">Percentage</option>
              </Select>
            </FieldGroup>

            <FieldGroup label="Transport Charge Amount" icon={<RupeeIcon />}>
              <Input
                type="number"
                value={transport.chargeAmount}
                disabled={transport.chargeAvailable === "No"}
                onChange={(e) => setTransport((t) => ({ ...t, chargeAmount: e.target.value }))}
              />
            </FieldGroup>
          </div>
        </div>
      </div>

      {/* ── Footer buttons ── */}
      <div className="flex justify-end gap-3 pb-4">
        <button
          onClick={() => router.push("/weavers/society-invoice")}
          className="flex items-center gap-2 rounded bg-[#5a6268] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Cancel
        </button>
        <button className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </button>
      </div>
    </div>
  );
}
