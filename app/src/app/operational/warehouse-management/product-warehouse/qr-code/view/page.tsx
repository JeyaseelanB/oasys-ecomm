"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductVariety {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  dispatchedQuantity: string;
  receivedQuantity: number;
  status: string;
}

interface ATDetail {
  id: number;
  atNumber: string;
  regionType: string;
  length: number | null;
  width: number | null;
  endsPerInch: number | null;
  picksPerInch: number | null;
  purchasePrice: number | null;
  retailPrice: number | null;
}

const MOCK_INWARD_NUMBER = "2381-MAR26-362482";
const MOCK_SENDER_ADDRESS = "";
const MOCK_RECEIVED_DATE = "";
const MOCK_RECEIVER_ADDRESS = "15&17 PATEL STREET, INGUR ROAD, CHENNIMALAI, NAMAKKAL, TAMIL NADU - 637001";

const VARIETY_STATUS = {
  totalProductVarieties: 1,
  totalQRCodeGeneratedVarieties: 0,
  qrCodeYetToGenerate: 1,
};

const ITEM_STATUS = {
  totalNumberOfItems: 1,
  qrCodeGeneratedItems: 0,
  qrCodeToBeGenerated: 1,
};

const PRODUCT_VARIETIES: ProductVariety[] = [
  { id: 1, productVarietyCodeName: "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK", uom: "NOS", dispatchedQuantity: "", receivedQuantity: 100.0, status: "QR_COMPLETED" },
];

const AT_DETAILS: ATDetail[] = [
  { id: 1, atNumber: "111", regionType: "INNER_STATE", length: 1.83, width: 0.92, endsPerInch: 120, picksPerInch: 100, purchasePrice: 5000, retailPrice: 8510 },
];

export default function ViewQRCodePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View QR Code
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Product Warehouse</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View QR Code</li>
          </ol>
        </nav>
      </div>

      {/* Info Header */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Orange header bar */}
        <div className="h-2 rounded-t-[10px] bg-[#e8a87c]"></div>
        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-4">
          <div>
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Inward Number</p>
            <p className="text-sm font-medium text-[#17a2b8]">{MOCK_INWARD_NUMBER}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Sender Address</p>
            <p className="text-sm font-medium text-dark dark:text-white">{MOCK_SENDER_ADDRESS || "-"}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Received Date</p>
            <p className="text-sm font-medium text-dark dark:text-white">{MOCK_RECEIVED_DATE || "-"}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Receiver Address</p>
            <p className="text-sm font-medium text-[#17a2b8]">{MOCK_RECEIVER_ADDRESS}</p>
          </div>
        </div>
      </div>

      {/* Status Cards Row */}
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Product Variety Wise - QR Code Status */}
        <div className="rounded-[10px] border border-[#17a2b8] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center gap-2 border-b border-[#17a2b8] px-5 py-3">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Product Variety Wise - QR Code Status</h3>
          </div>
          <div className="grid grid-cols-3 gap-0 divide-x divide-stroke p-5 dark:divide-dark-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{VARIETY_STATUS.totalProductVarieties}</p>
              <p className="text-xs text-gray-500">Total Product Varieties</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{VARIETY_STATUS.totalQRCodeGeneratedVarieties}</p>
              <p className="text-xs text-gray-500">Total QR Code Generated Varieties</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#6c757d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><polygon points="5 3 19 12 5 21 5 3" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{VARIETY_STATUS.qrCodeYetToGenerate}</p>
              <p className="text-xs text-gray-500">QR Code Yet to Generate</p>
            </div>
          </div>
        </div>

        {/* Product Item Wise - QR Code Status */}
        <div className="rounded-[10px] border border-[#17a2b8] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center gap-2 border-b border-[#17a2b8] px-5 py-3">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Product Item Wise - QR Code Status</h3>
          </div>
          <div className="grid grid-cols-3 gap-0 divide-x divide-stroke p-5 dark:divide-dark-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{ITEM_STATUS.totalNumberOfItems}</p>
              <p className="text-xs text-gray-500">Total Number of Items</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{ITEM_STATUS.qrCodeGeneratedItems}</p>
              <p className="text-xs text-gray-500">QR Code Generated Items</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M18 6L6 18M6 6l12 12" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{ITEM_STATUS.qrCodeToBeGenerated}</p>
              <p className="text-xs text-gray-500">QR Code to be Generated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Check Details */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center gap-2 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
          <h3 className="text-sm font-semibold text-dark dark:text-white">Quality Check Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-14 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Product Variety Code / Name</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">UOM</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Dispatched Quantity</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Received Quantity</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Status</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Region Categorization</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Generate QR Code</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_VARIETIES.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.productVarietyCodeName}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.dispatchedQuantity}</td>
                  <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.receivedQuantity.toFixed(2)}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                    <span className={`inline-block rounded-sm px-3 py-1 text-xs font-semibold ${row.status === "QR_COMPLETED" ? "bg-[#28a745] text-white" : "bg-[#6c757d] text-white"}`}>{row.status}</span>
                  </td>
                  <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                    <button className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90" title="Region Categorization">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                    </button>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90"
                        title="Generate QR Code"
                      >
                        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>
                      </button>
                      <button className="inline-flex items-center justify-center rounded bg-[#28a745] p-1.5 text-white hover:opacity-90" title="Download QR Code">
                        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Back button */}
        <div className="flex justify-end px-5 py-4">
          <button
            onClick={() => router.push("/operational/warehouse-management/product-warehouse/qr-code/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Back
          </button>
        </div>
      </div>

      {/* AT Number Wise QR Code Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-5xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#5bc0de] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">AT Number Wise QR code Details</h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="p-5">
              {/* Product Info Row */}
              <div className="mb-5 grid grid-cols-4 gap-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Product Variety Code / Name</p>
                  <p className="text-sm font-medium text-[#17a2b8]">ASWS / ANGAVAS SALEM WOVEN SILK PURE SILK</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">UOM</p>
                  <p className="text-sm font-medium text-[#17a2b8]">NOS</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Dispatched Quantity</p>
                  <p className="text-sm font-medium text-dark dark:text-white">-</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Received Quantity</p>
                  <p className="text-sm font-medium text-[#28a745]">100.0</p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="mb-5 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <svg className="size-8 shrink-0 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                  <div className="flex-1 text-right">
                    <p className="text-xl font-bold text-dark dark:text-white">1</p>
                    <p className="text-xs uppercase text-gray-500">Total Number of Items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <svg className="size-8 shrink-0 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
                  <div className="flex-1 text-right">
                    <p className="text-xl font-bold text-dark dark:text-white">0</p>
                    <p className="text-xs uppercase text-gray-500">QR Code Generated Items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <svg className="size-8 shrink-0 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M18 6L6 18M6 6l12 12" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>
                  <div className="flex-1 text-right">
                    <p className="text-xl font-bold text-dark dark:text-white">1</p>
                    <p className="text-xs uppercase text-gray-500">QR Code to be Generate</p>
                  </div>
                </div>
              </div>

              {/* AT Details Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">AT Number</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Region Type</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Length</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Width</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Ends Per Inch</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Picks Per Inch</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Purchase Price (&#8377;)</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Retail Price (&#8377;)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AT_DETAILS.map((row, idx) => (
                      <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.atNumber}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.regionType}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.length ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.width ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.endsPerInch ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.picksPerInch ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.purchasePrice ?? ""}</td>
                        <td className="px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.retailPrice ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal action buttons */}
              <div className="mt-4 flex justify-end gap-3">
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h7v7" /></svg>
                  Generate QR
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
