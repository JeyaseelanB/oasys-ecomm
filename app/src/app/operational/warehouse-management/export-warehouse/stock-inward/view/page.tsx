"use client";

import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────── Types ─────────────────────────── */
interface ItemDetail {
  id: number;
  bundleNumber: string;
  qrCode: string;
  atNumber: string;
  quantity: number;
  value: number;
}

interface ProductItem {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  dispatchedQty: number;
  receivedUnit: number;
  value: number;
  itemDetails: ItemDetail[];
}

interface StockInwardView {
  societyCodeName: string;
  stockMovementNumberFrom: string;
  status: string;
  stockMovementNumber: string;
  products: ProductItem[];
  dispatched: {
    totalNumberOfBundles: string;
    totalBundleWeight: string;
    bundleNumber: string;
  };
  received: {
    totalNumberOfBundles: string;
    totalBundleWeight: string;
    bundleNumber: string;
  };
  transport: {
    serviceType: string;
    serviceName: string;
    waybillAvailable: string;
    waybillNumber: string;
    chargeAvailable: string;
    chargeType: string;
    chargeAmount: string;
  };
}

/* ─────────────────────────── Sample Data ─────────────────────────── */
const SAMPLE_DATA: StockInwardView = {
  societyCodeName: "1650 / TVPM-EGMORE",
  stockMovementNumberFrom: "GO-1650-2023-452",
  status: "SUBMITTED",
  stockMovementNumber: "2024-352405",
  products: [
    {
      id: 1,
      productVarietyCodeName: "SKBSA / SAREES KPM SILK WITH BLO...",
      uom: "NOS",
      dispatchedQty: 0.0,
      receivedUnit: 6.0,
      value: 183460.00,
      itemDetails: [
        { id: 1, bundleNumber: "1", qrCode: "2181329730", atNumber: "2941", quantity: 1.0, value: 30580.00 },
        { id: 2, bundleNumber: "1", qrCode: "2181329731", atNumber: "2942", quantity: 1.0, value: 30580.00 },
        { id: 3, bundleNumber: "1", qrCode: "2181329732", atNumber: "2943", quantity: 1.0, value: 30580.00 },
        { id: 4, bundleNumber: "1", qrCode: "2181329733", atNumber: "2944", quantity: 1.0, value: 30580.00 },
        { id: 5, bundleNumber: "1", qrCode: "2181329734", atNumber: "2945", quantity: 1.0, value: 30580.00 },
        { id: 6, bundleNumber: "1", qrCode: "2181329735", atNumber: "2946", quantity: 1.0, value: 30560.00 },
      ],
    },
    {
      id: 2,
      productVarietyCodeName: "SAWBA / ARNI SILK SAREE WITH BLO...",
      uom: "NOS",
      dispatchedQty: 0.0,
      receivedUnit: 2.0,
      value: 23970.00,
      itemDetails: [
        { id: 1, bundleNumber: "1", qrCode: "2181329728", atNumber: "2940", quantity: 1.0, value: 12710.00 },
        { id: 2, bundleNumber: "1", qrCode: "2181297927", atNumber: "J2509", quantity: 1.0, value: 11260.00 },
      ],
    },
  ],
  dispatched: {
    totalNumberOfBundles: "1",
    totalBundleWeight: "",
    bundleNumber: "1",
  },
  received: {
    totalNumberOfBundles: "1",
    totalBundleWeight: "",
    bundleNumber: "1",
  },
  transport: {
    serviceType: "",
    serviceName: "Door Delivery",
    waybillAvailable: "No",
    waybillNumber: "",
    chargeAvailable: "No",
    chargeType: "",
    chargeAmount: "",
  },
};

/* ─────────────────────────── Helpers ─────────────────────────── */
const fmt = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

/* ─────────────────────────── Icons ─────────────────────────── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" />
    <rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

const LayersIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
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

function IconDisplay({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
      <span className="flex size-10 shrink-0 items-center justify-center border-r border-stroke bg-[#f8f8f8] dark:border-dark-3 dark:bg-dark-2">
        {icon}
      </span>
      <span className="px-3 py-2.5 text-sm text-dark dark:text-white">{value}</span>
    </div>
  );
}

/* ─────────────────────────── Info Row (label + value) ─────────────────────────── */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-dark dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || "\u00A0"}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ViewExportWarehouseStockInwardPage() {
  const data = SAMPLE_DATA;
  const [headerOpen, setHeaderOpen] = useState(true);
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);

  const totalDispatchedQty = data.products.reduce((s, r) => s + r.dispatchedQty, 0);
  const totalReceivedUnit = data.products.reduce((s, r) => s + r.receivedUnit, 0);
  const totalValue = data.products.reduce((s, r) => s + r.value, 0);

  return (
    <div className="mx-auto space-y-5">
      {/* ── Breadcrumb ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Stock Inward - Export Warehouse
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
            <li className="text-gray-500 dark:text-gray-400">Export Warehouse</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Stock Inward - Export Warehouse</li>
          </ol>
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 1: View Stock Inward - Export Warehouse (collapsible header)
      ══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div
          className="flex cursor-pointer items-center justify-between bg-[#17a2b8] px-5 py-3"
          onClick={() => setHeaderOpen((o) => !o)}
        >
          <span className="font-semibold text-white">View Stock Inward - Export Warehouse</span>
          <button className="text-lg font-bold leading-none text-white hover:opacity-70">
            {headerOpen ? "\u2212" : "+"}
          </button>
        </div>

        {headerOpen && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
            <InfoRow label="Society Code / Name" value={data.societyCodeName} />
            <InfoRow label="Stock Movement Number From" value={data.stockMovementNumberFrom} />
            <InfoRow label="Status" value={data.status} />
            <InfoRow label="Stock Movement Number" value={data.stockMovementNumber} />
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 2: Product Variety Details
      ══════════════════════════════════════════════════════════ */}
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
              {data.products.map((row, idx) => (
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
                    <button
                      onClick={() => setModalProduct(row)}
                      className="rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90"
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

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
              <InfoRow label="Total Number of Bundles" value={data.dispatched.totalNumberOfBundles} />
              <InfoRow label="Total Bundle Weight" value={data.dispatched.totalBundleWeight} />
            </div>
            <InfoRow label="Bundle Number" value={data.dispatched.bundleNumber} />
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
              <InfoRow label="Total Number of Bundles" value={data.received.totalNumberOfBundles} />
              <InfoRow label="Total Bundle Weight" value={data.received.totalBundleWeight} />
            </div>
            <InfoRow label="Bundle Number" value={data.received.bundleNumber} />
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
            <InfoRow label="Transport Service Type" value={data.transport.serviceType} />
            <InfoRow label="Transport Service Name" value={data.transport.serviceName} />
            <InfoRow label="Waybill Available" value={data.transport.waybillAvailable} />
            <InfoRow label="Waybill Number" value={data.transport.waybillNumber} />
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <InfoRow label="Transport Charge Available" value={data.transport.chargeAvailable} />
            <InfoRow label="Transport Charge Type" value={data.transport.chargeType} />
            <InfoRow label="Transport Charge Amount" value={data.transport.chargeAmount} />
          </div>
        </div>
      </div>

      {/* ── Footer Button ── */}
      <div className="flex justify-end pb-4">
        <Link
          href="/operational/warehouse-management/export-warehouse/stock-inward/list"
          className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12,19 5,12 12,5" />
          </svg>
          Back
        </Link>
      </div>

      {/* ══════════════════════════════════════════════════════════
         Modal: AT Number Wise Product Inward Details
      ══════════════════════════════════════════════════════════ */}
      {modalProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20">
          <div className="mx-4 w-full max-w-4xl overflow-hidden rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            {/* Modal header */}
            <div className="bg-[#17a2b8] px-5 py-3">
              <span className="font-semibold text-white">AT Number Wise Product Inward Details</span>
            </div>

            <div className="p-5">
              {/* Product info */}
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow label="Product Code / Name" value={modalProduct.productVarietyCodeName} />
                <InfoRow label="UOM" value={modalProduct.uom} />
              </div>

              {/* Item Details heading */}
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <GridIcon /> Item Details
              </h4>

              {/* Item Details table */}
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      {["#", "Bundle Number", "QR Code", "AT Number", "Quantity", "Value (\u20B9)"].map((col) => (
                        <th
                          key={col}
                          className="whitespace-nowrap border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modalProduct.itemDetails.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-stroke dark:border-dark-3 ${
                          idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"
                        }`}
                      >
                        <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{item.bundleNumber || "\u00A0"}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{item.qrCode || "\u00A0"}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{item.atNumber}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(item.quantity)}</td>
                        <td className="px-3 py-2.5 text-right">{fmt(item.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary fields */}
              <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Dispatched Quantity</label>
                  <IconDisplay icon={<LayersIcon />} value={fmt(modalProduct.dispatchedQty)} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Received Unit</label>
                  <IconDisplay icon={<LayersIcon />} value={fmt(modalProduct.receivedUnit)} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Received Value</label>
                  <IconDisplay icon={<RupeeIcon />} value={fmt(modalProduct.value)} />
                </div>
              </div>

              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setModalProduct(null)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
