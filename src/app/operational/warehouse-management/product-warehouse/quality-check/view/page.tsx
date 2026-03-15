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
  length: number | null;
  width: number | null;
  endsPerInch: number | null;
  picksPerInch: number | null;
  productWeight: string;
  stitchingParameters: string;
  verified: string;
  status: string;
}

// Mock data for the view
const MOCK_SOCIETY = "353313 / T(H) 110, ARINGNAR ANNA P.W.C.S.LTD.,";
const MOCK_STOCK_INWARD = "2381-MAR26-362483/04-Mar-2026";

const VARIETY_STATUS = {
  totalProductVarieties: 1,
  checkingCompleted: 1,
  checkingInprogress: 0,
  checkingYetToStart: 0,
};

const ITEM_STATUS = {
  totalNumberOfItems: 1,
  noOfItemsAccepted: 1,
  noOfItemsRejected: 0,
  noOfItemsToBeCheck: 0,
};

const PRODUCT_VARIETIES: ProductVariety[] = [
  { id: 1, productVarietyCodeName: "ASWS / ANGAVAS SAL...", uom: "NOS", dispatchedQuantity: "", receivedQuantity: 10, status: "QC COMPLETE" },
];

const AT_DETAILS: ATDetail[] = [
  { id: 1, atNumber: "123", length: 1.83, width: 0.92, endsPerInch: 120, picksPerInch: 100, productWeight: "", stitchingParameters: "Pass", verified: "Verified", status: "Verified" },
];

const AT_MODAL_HEADER = {
  productVarietyCodeName: "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK",
  uom: "NOS",
  dispatchedQuantity: "",
  receivedUnit: "10.00",
};

const AT_SUMMARY = {
  totalNumberOfItems: 1,
  noOfItemsAccepted: 1,
  noOfItemsRejected: 0,
  noOfItemsToBeCheck: 0,
};

export default function ViewQualityCheckPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Quality Check
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Product Warehouse</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Quality Check</li>
          </ol>
        </nav>
      </div>

      {/* Quality Check Info Section */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Collapsible header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#e8a87c] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Quality Check</h3>
          <button className="text-white hover:opacity-80">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Society Code / Name</p>
              <p className="text-sm font-medium text-[#dc3545]">{MOCK_SOCIETY}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Stock Inward Number / Date</p>
              <p className="text-sm font-medium text-[#dc3545]">{MOCK_STOCK_INWARD}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards Row */}
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Product Variety Wise - Quality Check Status */}
        <div className="rounded-[10px] border border-[#17a2b8] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center gap-2 border-b border-[#17a2b8] px-5 py-3">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Product Variety Wise - Quality Check Status</h3>
          </div>
          <div className="grid grid-cols-4 gap-0 p-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{VARIETY_STATUS.totalProductVarieties}</p>
              <p className="text-xs text-gray-500">Total Product Varieties</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{VARIETY_STATUS.checkingCompleted}</p>
              <p className="text-xs text-gray-500">Checking Completed</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{VARIETY_STATUS.checkingInprogress}</p>
              <p className="text-xs text-gray-500">Checking Inprogress</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#6c757d]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{VARIETY_STATUS.checkingYetToStart}</p>
              <p className="text-xs text-gray-500">Checking Yet to Start</p>
            </div>
          </div>
        </div>

        {/* Product Item Wise - Quality Check Status */}
        <div className="rounded-[10px] border border-[#17a2b8] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center gap-2 border-b border-[#17a2b8] px-5 py-3">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Product Item Wise - Quality Check Status</h3>
          </div>
          <div className="grid grid-cols-4 gap-0 p-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{ITEM_STATUS.totalNumberOfItems}</p>
              <p className="text-xs text-gray-500">Total Number of Items</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{ITEM_STATUS.noOfItemsAccepted}</p>
              <p className="text-xs text-gray-500">No of Items Accepted</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" /><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{ITEM_STATUS.noOfItemsRejected}</p>
              <p className="text-xs text-gray-500">No of Items Rejected</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{ITEM_STATUS.noOfItemsToBeCheck}</p>
              <p className="text-xs text-gray-500">No of Items to be Check</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Variety Wise Details */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center gap-2 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
          <h3 className="text-sm font-semibold text-dark dark:text-white">Product Variety Wise Details</h3>
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
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_VARIETIES.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                  <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.productVarietyCodeName}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.dispatchedQuantity}</td>
                  <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">{row.receivedQuantity}</td>
                  <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                    <span className="inline-block rounded-sm bg-[#28a745] px-3 py-1 text-xs font-semibold text-white">{row.status}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center justify-center rounded bg-[#2d8f7b] p-1.5 text-white hover:opacity-90"
                      title="View AT Details"
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Back button */}
        <div className="flex justify-end px-5 py-4">
          <button
            onClick={() => router.push("/operational/warehouse-management/product-warehouse/quality-check/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Back
          </button>
        </div>
      </div>

      {/* AT Number Wise Quality Check Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-5xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">AT Number Wise Quality Check Details</h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="p-5">
              {/* Product Info Row */}
              <div className="mb-5 grid grid-cols-4 gap-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Product Variety Code / Name</p>
                  <p className="text-sm font-medium text-[#dc3545]">{AT_MODAL_HEADER.productVarietyCodeName}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">UOM</p>
                  <p className="text-sm font-medium text-[#dc3545]">{AT_MODAL_HEADER.uom}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Dispatched Quantity</p>
                  <p className="text-sm font-medium text-[#dc3545]">{AT_MODAL_HEADER.dispatchedQuantity || "-"}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Received Unit</p>
                  <p className="text-sm font-medium text-[#dc3545]">{AT_MODAL_HEADER.receivedUnit}</p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="mb-5 grid grid-cols-4 gap-4">
                <div className="flex items-center gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <svg className="size-8 shrink-0 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                  <div>
                    <p className="text-xl font-bold text-dark dark:text-white">{AT_SUMMARY.totalNumberOfItems}</p>
                    <p className="text-xs uppercase text-gray-500">Total Number of Items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <svg className="size-8 shrink-0 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
                  <div>
                    <p className="text-xl font-bold text-dark dark:text-white">{AT_SUMMARY.noOfItemsAccepted}</p>
                    <p className="text-xs uppercase text-gray-500">No of Items Accepted</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <svg className="size-8 shrink-0 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" /><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" /></svg>
                  <div>
                    <p className="text-xl font-bold text-dark dark:text-white">{AT_SUMMARY.noOfItemsRejected}</p>
                    <p className="text-xs uppercase text-gray-500">No of Items Rejected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <svg className="size-8 shrink-0 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  <div>
                    <p className="text-xl font-bold text-dark dark:text-white">{AT_SUMMARY.noOfItemsToBeCheck}</p>
                    <p className="text-xs uppercase text-gray-500">No of Items to be Check</p>
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
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Length</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Width</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Ends Per Inch</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Picks Per Inch</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Product Weight</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Stitching Parameters</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Verified</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AT_DETAILS.map((row, idx) => (
                      <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.atNumber}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.length ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.width ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.endsPerInch ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.picksPerInch ?? ""}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.productWeight}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.stitchingParameters}</td>
                        <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.verified}</td>
                        <td className="px-3 py-2.5 text-center">
                          {row.status === "Verified" && (
                            <svg className="mx-auto size-5 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-3 flex items-center justify-end gap-1">
                <span className="text-sm text-gray-500">(1 of 1)</span>
                <button disabled className="flex size-7 items-center justify-center rounded border border-stroke text-xs opacity-40 dark:border-dark-3">&#8249;</button>
                <button className="flex size-7 items-center justify-center rounded border border-primary bg-primary text-xs text-white">1</button>
                <button disabled className="flex size-7 items-center justify-center rounded border border-stroke text-xs opacity-40 dark:border-dark-3">&#8250;</button>
              </div>

              {/* Back button in modal */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
