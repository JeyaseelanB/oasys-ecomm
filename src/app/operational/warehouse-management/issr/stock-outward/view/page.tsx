"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─────────────────────────── Types ─────────────────────────── */
interface ProductVariety {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  dispatchedQuantity: number;
  availableQuantity: number;
  value: number;
}

interface ItemDetail {
  id: number;
  bundleNumber: string;
  qrCode: string;
  atNumber: string;
  quantity: number;
  value: number;
}

interface ProductInwardDetails {
  productCodeName: string;
  uom: string;
  items: ItemDetail[];
  dispatchedQuantity: number;
  receivedValue: number;
}

/* ─────────────────────────── Sample Data ─────────────────────────── */
const viewData = {
  stockOutwardNumber: "2024-353185",
  stockMovementType: "",
  distributionWarehouse: "1118 / POLLACHI",
};

const productVarieties: ProductVariety[] = [
  { id: 1, productVarietyCodeName: "YFD5 / PL.POLYESTER PLAIN DYED SAREE", uom: "NOS", dispatchedQuantity: 10.0, availableQuantity: 114.0, value: 4600.0 },
  { id: 2, productVarietyCodeName: "TET5 / TOWEL ERODE TURKEY 30X60", uom: "NOS", dispatchedQuantity: 1.0, availableQuantity: 0.0, value: 580.0 },
  { id: 3, productVarietyCodeName: "TET5 / TOWEL ERODE TURKEY 30X60", uom: "NOS", dispatchedQuantity: 1.0, availableQuantity: 0.0, value: 580.0 },
];

const totals = {
  dispatchedQuantity: 12.0,
  availableQuantity: 114.0,
  value: 5760.0,
};

const bundleDetails = {
  totalNumberOfBundles: "1",
  totalBundleWeight: "",
  bundleNumber: "1",
};

const transportDetails = {
  transportServiceType: "",
  transportServiceName: "",
  waybillAvailable: "No",
  waybillNumber: "",
  transportChargeAvailable: "No",
  transportChargeType: "",
  transportChargeAmount: "0.00",
};

/* ─────────────────────── Product Inward Details per row ─────────────────────── */
const PRODUCT_INWARD_DATA: Record<number, ProductInwardDetails> = {
  1: {
    productCodeName: "YFD5 / PL.POLYESTER PLAIN DYED SAREE",
    uom: "NOS",
    items: [
      { id: 1, bundleNumber: "1", qrCode: "18812057273", atNumber: "20221010889060", quantity: 10.0, value: 4600.0 },
    ],
    dispatchedQuantity: 10.0,
    receivedValue: 4600.0,
  },
  2: {
    productCodeName: "TET5 / TOWEL ERODE TURKEY 30X60",
    uom: "NOS",
    items: [
      { id: 1, bundleNumber: "1", qrCode: "18812057274", atNumber: "20221010889061", quantity: 1.0, value: 580.0 },
    ],
    dispatchedQuantity: 1.0,
    receivedValue: 580.0,
  },
  3: {
    productCodeName: "TET5 / TOWEL ERODE TURKEY 30X60",
    uom: "NOS",
    items: [
      { id: 1, bundleNumber: "1", qrCode: "18812057275", atNumber: "20221010889062", quantity: 1.0, value: 580.0 },
    ],
    dispatchedQuantity: 1.0,
    receivedValue: 580.0,
  },
};

/* ─────────────────────── Stack Icon ─────────────────────── */
const StackIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
  </svg>
);

/* ─────────────────────────── Grid Icon ─────────────────────────── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" opacity="0.7" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ViewStockOutwardPage() {
  const router = useRouter();
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);
  const [modalProduct, setModalProduct] = useState<ProductVariety | null>(null);

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Stock Outward - ISSR
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">ISSR</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Stock Outward - ISSR</li>
          </ol>
        </nav>
      </div>

      {/* ── Section 1: View Stock Outward Header ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div
          className="flex cursor-pointer items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3"
          onClick={() => setIsHeaderOpen(!isHeaderOpen)}
        >
          <span className="text-sm font-semibold text-white">View Stock Outward - ISSR</span>
          <svg
            className={`size-4 text-white transition-transform duration-200 ${isHeaderOpen ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>

        {isHeaderOpen && (
          <div className="p-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stock Outward Number</p>
                <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{viewData.stockOutwardNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stock Movement Type</p>
                <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{viewData.stockMovementType || "\u00A0"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Distribution Warehouse / Showroom</p>
                <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{viewData.distributionWarehouse}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Section 2: Product Variety Details ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
            <GridIcon /> Product Variety Details
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold w-12">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Dispatched Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Available Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Value (&#8377;)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold w-16">Action</th>
                </tr>
              </thead>
              <tbody>
                {productVarieties.map((row) => (
                  <tr key={row.id} className="border-b border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.id}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.productVarietyCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.uom}</td>
                    <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.dispatchedQuantity.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.availableQuantity.toFixed(2)}</td>
                    <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.value.toFixed(2)}</td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => setModalProduct(row)}
                        className="flex size-7 mx-auto items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90"
                      >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
                          <path d="M8 16h8v2H8zm0-4h8v2H8z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                  <td className="border border-stroke px-3 py-2.5 dark:border-dark-3" colSpan={2}></td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{totals.dispatchedQuantity.toFixed(2)}</td>
                  <td className="border border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{totals.availableQuantity.toFixed(2)}</td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{totals.value.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Section 3: Bundle Details ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
            <GridIcon /> Bundle Details
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Number of Bundles</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{bundleDetails.totalNumberOfBundles}</p>
            </div>
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Bundle Weight</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{bundleDetails.totalBundleWeight || "\u00A0"}</p>
            </div>
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Bundle Number</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{bundleDetails.bundleNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Transport Details ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
            <GridIcon /> Transport Details
          </h3>

          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-4">
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Transport Service Type</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{transportDetails.transportServiceType || "\u00A0"}</p>
            </div>
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Transport Service Name</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{transportDetails.transportServiceName || "\u00A0"}</p>
            </div>
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Waybill Available</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{transportDetails.waybillAvailable}</p>
            </div>
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Waybill Number</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{transportDetails.waybillNumber || "\u00A0"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Transport Charge Available</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{transportDetails.transportChargeAvailable}</p>
            </div>
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Transport Charge Type</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{transportDetails.transportChargeType || "\u00A0"}</p>
            </div>
            <div className="border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Transport Charge Amount</p>
              <p className="mt-1 text-sm font-semibold text-[#17a2b8]">&#8377; {transportDetails.transportChargeAmount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Button ── */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => router.push("/operational/warehouse-management/issr/stock-outward/list")}
          className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12,19 5,12 12,5" />
          </svg>
          Back
        </button>
      </div>

      {/* ── Product Inward Details Modal ── */}
      {modalProduct && (() => {
        const details = PRODUCT_INWARD_DATA[modalProduct.id];
        return (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-10">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" onClick={() => setModalProduct(null)} />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
              {/* Header */}
              <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
                <h3 className="text-base font-semibold text-white">Product Inward Details</h3>
                <button onClick={() => setModalProduct(null)} className="text-white hover:opacity-80">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Product Info */}
                <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Product Code / Name</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{details.productCodeName}</p>
                  </div>
                  <div className="border-b border-stroke pb-2 dark:border-dark-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">UOM</p>
                    <p className="mt-1 text-sm font-semibold text-[#17a2b8]">{details.uom}</p>
                  </div>
                </div>

                {/* Item Details Table */}
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-dark dark:text-white">
                  <GridIcon /> Item Details
                </h4>
                <div className="mb-5 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#2d8f7b] text-white">
                        <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold w-12">#</th>
                        <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Bundle Number</th>
                        <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">QR Code</th>
                        <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">AT Number</th>
                        <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quantity</th>
                        <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Value (&#8377;)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.items.map((item) => (
                        <tr key={item.id} className="border-b border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                          <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{item.id}</td>
                          <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{item.bundleNumber}</td>
                          <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{item.qrCode}</td>
                          <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{item.atNumber}</td>
                          <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{item.quantity.toFixed(1)}</td>
                          <td className="px-3 py-3 text-right text-dark dark:text-white">{item.value.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Dispatched Quantity & Received Value */}
                <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#17a2b8]">Dispatched Quantity</label>
                    <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center border-r border-stroke bg-gray-50 text-gray-500 dark:border-dark-3 dark:bg-[#1a2232] dark:text-gray-400">
                        <StackIcon />
                      </span>
                      <span className="flex h-[40px] flex-1 items-center bg-gray-100 px-3 text-sm text-dark dark:bg-[#1a2232] dark:text-white">
                        {details.dispatchedQuantity.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#17a2b8]">Received Value</label>
                    <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center border-r border-stroke bg-gray-50 text-gray-500 dark:border-dark-3 dark:bg-[#1a2232] dark:text-gray-400">
                        <StackIcon />
                      </span>
                      <span className="flex h-[40px] flex-1 items-center bg-gray-100 px-3 text-sm text-dark dark:bg-[#1a2232] dark:text-white">
                        {details.receivedValue.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cancel Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setModalProduct(null)}
                    className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
