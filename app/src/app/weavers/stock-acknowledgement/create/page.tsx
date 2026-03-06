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
const GlobeIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);
const DocIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const GearIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const ClipboardIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" /><rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" /><rect x="10" y="10" width="4" height="4" rx="1" />
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
  uom: string;
  atNumber: string;
  unitRate: number;
  dispatchedQty: number;
  receivedQty: number;
  totalRate: number;
  tax: number;
  taxValue: number;
  netValue: number;
}

/* sample stock movement options */
const STOCK_INWARD_OPTIONS = [
  { value: "", label: "Select" },
  { value: "353313", label: "353313/T(H) 110, ARINGNAR ANNA P.W.C.S.LTD.," },
  { value: "292178", label: "292178 / PALLAKKATTU" },
  { value: "292774", label: "292774 / KALIKKAVALA" },
];

const STOCK_MOVEMENT_OPTIONS: Record<string, { value: string; label: string }[]> = {
  "353313": [
    { value: "", label: "Select" },
    { value: "3533130326244907", label: "3533130326244907 / 03-Mar-2026" },
    { value: "3533131223233524", label: "3533131223233524 / 18-Dec-2023" },
    { value: "3533131223233457", label: "3533131223233457 / 14-Dec-2023" },
    { value: "3533131223233452", label: "3533131223233452 / 14-Dec-2023" },
    { value: "3533131223233451", label: "3533131223233451 / 14-Dec-2023" },
    { value: "3533131123233014", label: "3533131123233014 / 30-Nov-2023" },
    { value: "3533131123233013", label: "3533131123233013 / 30-Nov-2023" },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function SocietyInvoiceAcknowledgementPage() {
  const router = useRouter();

  /* stock movement form */
  const [stockInwardFrom, setStockInwardFrom] = useState("");
  const [stockMovementNumber, setStockMovementNumber] = useState("");

  /* product rows */
  const [rows, setRows] = useState<ProductItem[]>([]);

  /* dispatched bundle details */
  const [dispatchedBundle, setDispatchedBundle] = useState({
    totalBundleWeight: "",
    bundleNumber: "",
  });

  /* received bundle details */
  const [receivedBundle, setReceivedBundle] = useState({
    totalBundleWeight: "",
    bundleNumber: "",
  });

  /* transport details */
  const [transport, setTransport] = useState({
    serviceType: "",
    serviceName: "",
    waybillAvailable: "No",
    waybillNumber: "",
    chargeAvailable: "No",
    chargeType: "",
    chargeAmount: "",
  });

  /* totals */
  const totalDispatchedQty = rows.reduce((s, r) => s + r.dispatchedQty, 0);
  const totalReceivedQty = rows.reduce((s, r) => s + r.receivedQty, 0);
  const totalRate = rows.reduce((s, r) => s + r.totalRate, 0);
  const totalTaxValue = rows.reduce((s, r) => s + r.taxValue, 0);
  const totalNet = rows.reduce((s, r) => s + r.netValue, 0);
  const cgst = totalTaxValue / 2;
  const sgst = totalTaxValue / 2;

  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const movementOptions = STOCK_MOVEMENT_OPTIONS[stockInwardFrom] || [];

  const handleSearch = () => {
    // placeholder: fetch product details based on selected stock movement
  };

  const handleSave = () => {
    // placeholder: save society invoice acknowledgement
  };

  const handleSubmit = () => {
    // placeholder: submit society invoice acknowledgement
  };

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Society Invoice Acknowledgement
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li>
            <li><Link href="/weavers/society-invoice-acknowledgement" className="text-gray-500 hover:text-primary dark:text-gray-400">Product Warehouse</Link></li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Stock Acknowledgement</li>
          </ol>
        </nav>
      </div>

      {/* ── Section 1: Stock Movement Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Stock Movement Details</span>
          <span className="text-sm text-white">( * Mandatory Fields) ---</span>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[280px] flex-1">
              <FieldGroup label="Stock Inward From" required icon={<ClipboardIcon />}>
                <Select
                  value={stockInwardFrom}
                  onChange={(e) => {
                    setStockInwardFrom(e.target.value);
                    setStockMovementNumber("");
                  }}
                >
                  {STOCK_INWARD_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
              </FieldGroup>
            </div>

            <div className="min-w-[280px] flex-1">
              <FieldGroup label="Stock Movement Number / Date" required icon={<HashIcon />}>
                <Select
                  value={stockMovementNumber}
                  onChange={(e) => setStockMovementNumber(e.target.value)}
                >
                  <option value="">Select</option>
                  {movementOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
              </FieldGroup>
            </div>

            <div className="flex items-end gap-2 pb-0.5">
              <button
                onClick={() => {
                  setStockInwardFrom("");
                  setStockMovementNumber("");
                  setRows([]);
                }}
                className="flex items-center gap-1.5 rounded bg-[#5a6268] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Product Variety Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Product Variety Details
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {["#", "Product Variety Code / Name", "UOM", "AT Number", "Unit Rate (\u20B9)", "Dispatched Quantity", "Received Quantity", "Total Rate (\u20B9)", "Tax (%)", "Tax Value(\u20B9)", "Net Value(\u20B9)"].map((col) => (
                  <th key={col} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    No records found
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"}`}>
                    <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.productVarietyCode}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.uom}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.atNumber}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.unitRate)}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.dispatchedQty)}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.receivedQty)}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.totalRate)}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.tax)}</td>
                    <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.taxValue)}</td>
                    <td className="px-3 py-2.5 text-right">{fmt(row.netValue)}</td>
                  </tr>
                ))
              )}

              {/* Total row */}
              <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                <td colSpan={5} className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">Total</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalDispatchedQty)}</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalReceivedQty)}</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalRate)}</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalTaxValue)}</td>
                <td className="border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalNet)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tax summary */}
        <div className="border-t border-stroke dark:border-dark-3">
          {[
            { label: "Material Value(Without Tax)(\u20B9):", value: fmt(totalRate) },
            { label: "CGST(\u20B9):", value: fmt(cgst) },
            { label: "SGST(\u20B9):", value: fmt(sgst) },
            { label: "Net Total(\u20B9):", value: fmt(totalNet) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-end gap-8 border-b border-stroke px-5 py-2.5 last:border-0 dark:border-dark-3">
              <span className="text-sm font-medium text-dark dark:text-white">{label}</span>
              <span className="w-32 text-right text-sm font-semibold text-dark dark:text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Dispatched & Received Bundle Details ── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Dispatched - Bundle Details */}
        <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
          <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <GridIcon /> Dispatched - Bundle Details
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <FieldGroup label="Total Bundle Weight" icon={<WeightIcon />}>
              <Input
                type="text"
                value={dispatchedBundle.totalBundleWeight}
                onChange={(e) => setDispatchedBundle((b) => ({ ...b, totalBundleWeight: e.target.value }))}
              />
            </FieldGroup>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">Bundle Number</label>
              <textarea
                value={dispatchedBundle.bundleNumber}
                onChange={(e) => setDispatchedBundle((b) => ({ ...b, bundleNumber: e.target.value }))}
                rows={3}
                className="w-full rounded border border-stroke bg-white px-3 py-2.5 text-sm text-dark outline-none focus:border-[#17a2b8] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Received - Bundle Details */}
        <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
          <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <GridIcon /> Received - Bundle Details
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <FieldGroup label="Total Bundle Weight" icon={<WeightIcon />}>
              <Input
                type="text"
                value={receivedBundle.totalBundleWeight}
                onChange={(e) => setReceivedBundle((b) => ({ ...b, totalBundleWeight: e.target.value }))}
              />
            </FieldGroup>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">Bundle Number</label>
              <textarea
                value={receivedBundle.bundleNumber}
                onChange={(e) => setReceivedBundle((b) => ({ ...b, bundleNumber: e.target.value }))}
                rows={3}
                className="w-full rounded border border-stroke bg-white px-3 py-2.5 text-sm text-dark outline-none focus:border-[#17a2b8] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>
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
            <FieldGroup label="Transport Service Type" icon={<TruckIcon />}>
              <Input
                type="text"
                value={transport.serviceType}
                onChange={(e) => setTransport((t) => ({ ...t, serviceType: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Transport Service Name" icon={<GlobeIcon />}>
              <Input
                type="text"
                value={transport.serviceName}
                onChange={(e) => setTransport((t) => ({ ...t, serviceName: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Waybill Available" icon={<DocIcon />}>
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
            <FieldGroup label="Transport Charge Available" icon={<GearIcon />}>
              <Select value={transport.chargeAvailable} onChange={(e) => setTransport((t) => ({ ...t, chargeAvailable: e.target.value }))}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Select>
            </FieldGroup>

            <FieldGroup label="Transport Charge Type" icon={<DocIcon />}>
              <Select
                value={transport.chargeType}
                disabled={transport.chargeAvailable === "No"}
                onChange={(e) => setTransport((t) => ({ ...t, chargeType: e.target.value }))}
              >
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
          onClick={() => router.push("/weavers/society-invoice-acknowledgement")}
          className="flex items-center gap-2 rounded bg-[#5a6268] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <polyline points="17,21 17,13 7,13 7,21" /><polyline points="7,3 7,8 15,8" />
          </svg>
          Save
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="20,6 9,17 4,12" />
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
}