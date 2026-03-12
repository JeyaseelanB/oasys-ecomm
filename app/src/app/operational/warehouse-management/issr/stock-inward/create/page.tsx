"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─────────────────────────── Types ─────────────────────────── */
interface ProductRow {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  dispatchedQty: number;
  receivedUnit: number;
  value: number;
}

/* ─────────────────────────── Icons ─────────────────────────── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" />
    <rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const BoxIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" />
  </svg>
);

const LayersIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
  </svg>
);

const ScaleIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 3v18" />
    <path d="M5 6l7-3 7 3" />
    <path d="M2 12l3-6 3 6" />
    <path d="M16 12l3-6 3 6" />
  </svg>
);

const WrenchIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.73 20.18a2.12 2.12 0 01-3-3l6.7-6.7a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const FileIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

const HashIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const GearIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const RupeeIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="7" y1="4" x2="17" y2="4" />
    <line x1="7" y1="9" x2="17" y2="9" />
    <path d="M7 4c0 4 3 7 7 7" />
    <path d="M7 20l7-11" />
  </svg>
);

const QrIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="16" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="10" y="10" width="4" height="4" />
    <rect x="16" y="16" width="2" height="2" />
    <rect x="20" y="16" width="2" height="2" />
    <rect x="16" y="20" width="2" height="2" />
    <rect x="20" y="20" width="2" height="2" />
    <rect x="10" y="2" width="4" height="2" />
    <rect x="10" y="6" width="4" height="2" />
    <rect x="2" y="10" width="2" height="4" />
    <rect x="6" y="10" width="2" height="4" />
  </svg>
);

/* ─────────────────────────── Helpers ─────────────────────────── */
const fmt = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─────────────────────────── Field wrapper with left icon ─────────────────────────── */
function IconInput({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
      <span className="flex size-10 shrink-0 items-center justify-center border-r border-stroke bg-[#f8f8f8] dark:border-dark-3 dark:bg-dark-2">
        {icon}
      </span>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function CreateStockInwardPage() {
  const router = useRouter();
  const [stockMovementOpen, setStockMovementOpen] = useState(true);

  /* Stock Movement Details */
  const [type, setType] = useState("");
  const [stockInwardFrom, setStockInwardFrom] = useState("");
  const [stockOutwardNumber, setStockOutwardNumber] = useState("");

  /* Receive Product */
  const [bundleNumber, setBundleNumber] = useState("");
  const [qrCode, setQrCode] = useState("");

  /* Product table */
  const [products] = useState<ProductRow[]>([]);

  /* Dispatched Bundle Details */
  const [dispatchedTotalBundles, setDispatchedTotalBundles] = useState("");
  const [dispatchedTotalWeight, setDispatchedTotalWeight] = useState("");
  const [dispatchedBundleNumber, setDispatchedBundleNumber] = useState("");

  /* Received Bundle Details */
  const [receivedTotalBundles, setReceivedTotalBundles] = useState("");
  const [receivedTotalWeight, setReceivedTotalWeight] = useState("");
  const [receivedBundleNumber, setReceivedBundleNumber] = useState("");

  /* Transport Details */
  const [transportServiceType, setTransportServiceType] = useState("");
  const [transportServiceName, setTransportServiceName] = useState("");
  const [waybillAvailable, setWaybillAvailable] = useState("No");
  const [waybillNumber, setWaybillNumber] = useState("");
  const [transportChargeAvailable, setTransportChargeAvailable] = useState("No");
  const [transportChargeType, setTransportChargeType] = useState("");
  const [transportChargeAmount, setTransportChargeAmount] = useState("");

  /* Derived totals */
  const totalDispatchedQty = products.reduce((s, r) => s + r.dispatchedQty, 0);
  const totalReceivedUnit = products.reduce((s, r) => s + r.receivedUnit, 0);
  const totalValue = products.reduce((s, r) => s + r.value, 0);

  const handleCancel = () => {
    router.push("/operational/warehouse-management/issr/stock-inward/list");
  };

  return (
    <div className="mx-auto space-y-5">
      {/* ── Breadcrumb ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Stock Inward
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">ISSR</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Stock Inward</li>
          </ol>
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 1: Stock Movement Details (collapsible)
      ══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div
          className="flex cursor-pointer items-center justify-between bg-[#17a2b8] px-5 py-3"
          onClick={() => setStockMovementOpen((o) => !o)}
        >
          <span className="font-semibold text-white">Stock Movement Details</span>
          <button className="text-lg font-bold leading-none text-white hover:opacity-70">
            {stockMovementOpen ? "\u2212" : "+"}
          </button>
        </div>

        {stockMovementOpen && (
          <div className="p-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
              {/* Type */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Type
                </label>
                <IconInput icon={<ListIcon />}>
                  <select
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="ISSR">ISSR</option>
                  </select>
                </IconInput>
              </div>

              {/* Stock Inward From */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Stock Inward From
                </label>
                <IconInput icon={<BoxIcon />}>
                  <select
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                    value={stockInwardFrom}
                    onChange={(e) => setStockInwardFrom(e.target.value)}
                  >
                    <option value="">Select</option>
                  </select>
                </IconInput>
              </div>

              {/* Stock Outward Number / Date */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Stock Outward Number / Date <span className="text-red-500">*</span>
                </label>
                <IconInput icon={<HashIcon />}>
                  <select
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                    value={stockOutwardNumber}
                    onChange={(e) => setStockOutwardNumber(e.target.value)}
                  >
                    <option value="">Select</option>
                  </select>
                </IconInput>
              </div>
            </div>

            {/* Cancel & Search buttons */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 2: Receive Product
      ══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Receive Product
          </h3>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-end gap-4">
            {/* Bundle Number */}
            <div className="w-full sm:w-64">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Bundle Number <span className="text-red-500">*</span>
              </label>
              <IconInput icon={<LayersIcon />}>
                <select
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={bundleNumber}
                  onChange={(e) => setBundleNumber(e.target.value)}
                >
                  <option value="">Select</option>
                </select>
              </IconInput>
            </div>

            {/* QR Code */}
            <div className="w-full sm:w-64">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                QR Code <span className="text-red-500">*</span>
              </label>
              <IconInput icon={<QrIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                />
              </IconInput>
            </div>

            {/* Add button */}
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
              Add
            </button>
          </div>
        </div>

        {/* ── Product Variety Details Table ── */}
        <div className="border-t border-stroke px-5 pb-5 pt-3 dark:border-dark-3">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon /> Product Variety Details
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  {["#", "Product Variety Code / Name", "UOM", "Dispatched Quantity", "Received Unit", "Value (\u20B9)", "Action"].map(
                    (col) => (
                      <th
                        key={col}
                        className="whitespace-nowrap border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="border border-stroke px-3 py-4 text-sm text-gray-400 dark:border-dark-3">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  products.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-b border-stroke dark:border-dark-3 ${
                        idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"
                      }`}
                    >
                      <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.productVarietyCodeName}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.uom}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.dispatchedQty)}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.receivedUnit)}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.value)}</td>
                      <td className="px-3 py-2.5 text-center">
                        <button className="text-red-500 hover:text-red-700">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}

                {/* Total row */}
                <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                  <td colSpan={3} className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    Total
                  </td>
                  <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(totalDispatchedQty)}
                  </td>
                  <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(totalReceivedUnit)}
                  </td>
                  <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(totalValue)}
                  </td>
                  <td className="border-t border-stroke dark:border-dark-3" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 3: Bundle Details (Dispatched + Received side by side)
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Dispatched - Bundle Details */}
        <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
          <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <GridIcon /> Dispatched - Bundle Details
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Total Number of Bundles
                </label>
                <IconInput icon={<LayersIcon />}>
                  <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                    value={dispatchedTotalBundles}
                    onChange={(e) => setDispatchedTotalBundles(e.target.value)}
                  />
                </IconInput>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Total Bundle Weight
                </label>
                <IconInput icon={<ScaleIcon />}>
                  <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                    value={dispatchedTotalWeight}
                    onChange={(e) => setDispatchedTotalWeight(e.target.value)}
                  />
                </IconInput>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Bundle Number
              </label>
              <input
                type="text"
                className="w-full rounded border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                value={dispatchedBundleNumber}
                onChange={(e) => setDispatchedBundleNumber(e.target.value)}
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Total Number of Bundles
                </label>
                <IconInput icon={<LayersIcon />}>
                  <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                    value={receivedTotalBundles}
                    onChange={(e) => setReceivedTotalBundles(e.target.value)}
                  />
                </IconInput>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Total Bundle Weight
                </label>
                <IconInput icon={<ScaleIcon />}>
                  <input
                    type="text"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                    value={receivedTotalWeight}
                    onChange={(e) => setReceivedTotalWeight(e.target.value)}
                  />
                </IconInput>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Bundle Number
              </label>
              <input
                type="text"
                className="w-full rounded border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                value={receivedBundleNumber}
                onChange={(e) => setReceivedBundleNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 4: Transport Details
      ══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Transport Details
          </h3>
        </div>

        <div className="space-y-4 p-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Transport Service Type
              </label>
              <IconInput icon={<WrenchIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={transportServiceType}
                  onChange={(e) => setTransportServiceType(e.target.value)}
                />
              </IconInput>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Transport Service Name
              </label>
              <IconInput icon={<GlobeIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={transportServiceName}
                  onChange={(e) => setTransportServiceName(e.target.value)}
                />
              </IconInput>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Waybill Available
              </label>
              <IconInput icon={<FileIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={waybillAvailable}
                  onChange={(e) => setWaybillAvailable(e.target.value)}
                />
              </IconInput>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Waybill Number
              </label>
              <IconInput icon={<HashIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={waybillNumber}
                  onChange={(e) => setWaybillNumber(e.target.value)}
                />
              </IconInput>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Transport Charge Available
              </label>
              <IconInput icon={<GearIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={transportChargeAvailable}
                  onChange={(e) => setTransportChargeAvailable(e.target.value)}
                />
              </IconInput>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Transport Charge Type
              </label>
              <IconInput icon={<FileIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={transportChargeType}
                  onChange={(e) => setTransportChargeType(e.target.value)}
                />
              </IconInput>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Transport Charge Amount
              </label>
              <IconInput icon={<RupeeIcon />}>
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-dark outline-none dark:text-white"
                  value={transportChargeAmount}
                  onChange={(e) => setTransportChargeAmount(e.target.value)}
                />
              </IconInput>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Buttons ── */}
      <div className="flex justify-end gap-3 pb-4">
        <button
          onClick={handleCancel}
          className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Cancel
        </button>
        <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <polyline points="17,21 17,13 7,13 7,21" />
            <polyline points="7,3 7,8 15,8" />
          </svg>
          Save
        </button>
        <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="20,6 9,17 4,12" />
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
}
