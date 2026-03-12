"use client";

import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────── Types ─────────────────────────── */
interface ProductItem {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  bundleNumbers: number;
  dispatchedQty: number;
  receivedUnit: number;
  value: number;
}

interface StockInwardView {
  entityCodeName: string;
  stockMovementNumberFrom: string;
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
  entityCodeName: "1276 / ISSR - CUDDALORE",
  stockMovementNumberFrom: "2023-289443",
  stockMovementNumber: "2023-310861",
  products: [
    {
      id: 1,
      productVarietyCodeName: "WIDK / AUTOLOOM DRILL AY 2022 23",
      uom: "NOS",
      bundleNumbers: 1,
      dispatchedQty: 2600,
      receivedUnit: 2600,
      value: 202618.00,
    },
    {
      id: 2,
      productVarietyCodeName: "WADK / POWERLOOM CASEMENT AY 2022 23",
      uom: "NOS",
      bundleNumbers: 1,
      dispatchedQty: 2592,
      receivedUnit: 2592,
      value: 167339.52,
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
    bundleNumber: "1, 1",
  },
  transport: {
    serviceType: "",
    serviceName: "",
    waybillAvailable: "No",
    waybillNumber: "",
    chargeAvailable: "No",
    chargeType: "",
    chargeAmount: "",
  },
};

/* ─────────────────────────── Helpers ─────────────────────────── */
const fmt = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─────────────────────────── Icons ─────────────────────────── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" />
    <rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

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
export default function ViewPrintingWarehouseStockInwardPage() {
  const data = SAMPLE_DATA;
  const [headerOpen, setHeaderOpen] = useState(true);

  return (
    <div className="mx-auto space-y-5">
      {/* ── Breadcrumb ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Stock Inward - Printing Warehouse
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
            <li className="text-gray-500 dark:text-gray-400">Printing Warehouse</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Stock Inward - Printing Warehouse</li>
          </ol>
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 1: View Stock Inward - Printing Warehouse (collapsible header)
      ══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div
          className="flex cursor-pointer items-center justify-between bg-[#17a2b8] px-5 py-3"
          onClick={() => setHeaderOpen((o) => !o)}
        >
          <span className="font-semibold text-white">View Stock Inward - Printing Warehouse</span>
          <button className="text-lg font-bold leading-none text-white hover:opacity-70">
            {headerOpen ? "\u2212" : "+"}
          </button>
        </div>

        {headerOpen && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 sm:grid-cols-3">
            <InfoRow label="Entity - Code / Name" value={data.entityCodeName} />
            <InfoRow label="Stock Movement Number From" value={data.stockMovementNumberFrom} />
            <InfoRow label="Stock Movement Number" value={data.stockMovementNumber} />
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
         Section 2: Primary Contact Details
      ══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Primary Contact Details
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {["#", "Product Variety Code / Name", "UOM", "Bundle Numbers", "Dispatched Quantity", "Received Unit", "Value (\u20B9)"].map(
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
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.bundleNumbers}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{row.dispatchedQty}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{row.receivedUnit}</td>
                  <td className="px-3 py-2.5 text-right">{fmt(row.value)}</td>
                </tr>
              ))}
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
            <InfoRow label="Transport Charge Amount (\u20B9)" value={data.transport.chargeAmount} />
          </div>
        </div>
      </div>

      {/* ── Footer Button ── */}
      <div className="flex justify-end pb-4">
        <Link
          href="/operational/warehouse-management/printing-warehouse/stock-inward/list"
          className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12,19 5,12 12,5" />
          </svg>
          Back
        </Link>
      </div>
    </div>
  );
}
