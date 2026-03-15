"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductVariety {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  receivedQuantity: number;
  status: string;
}

export default function CreateQualityCheckPage() {
  const router = useRouter();
  const [societyCodeName, setSocietyCodeName] = useState("");
  const [stockInwardNumber, setStockInwardNumber] = useState("");
  const [searched, setSearched] = useState(false);

  // Status card data (shown after search)
  const varietyStatus = {
    totalProductVarieties: searched ? 1 : 0,
    checkingCompleted: searched ? 1 : 0,
    checkingInprogress: 0,
    checkingYetToStart: 0,
  };

  const itemStatus = {
    totalNumberOfItems: searched ? 1 : 0,
    noOfItemsAccepted: searched ? 1 : 0,
    noOfItemsRejected: 0,
    noOfItemsToBeCheck: 0,
  };

  const productVarieties: ProductVariety[] = searched
    ? [
        { id: 1, productVarietyCodeName: "ASWS / ANGAVAS SAL...", uom: "NOS", receivedQuantity: 10, status: "QC COMPLETE" },
      ]
    : [];

  const handleSearch = () => {
    if (societyCodeName.trim() || stockInwardNumber.trim()) {
      setSearched(true);
    }
  };

  const handleClear = () => {
    setSocietyCodeName("");
    setStockInwardNumber("");
    setSearched(false);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Quality Check
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
            <li className="font-medium text-primary">Create Quality Check</li>
          </ol>
        </nav>
      </div>

      {/* Quality Check Section */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header bar */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Quality Check</h3>
          <span className="text-xs text-white opacity-80">( <span className="text-red-300">*</span> Mandatory Fields) &mdash;</span>
        </div>
        {/* Form fields */}
        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Society Code / Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Society Code / Name
              </label>
              <div className="flex items-center gap-2">
                <span className="flex size-10 items-center justify-center rounded border border-stroke bg-gray-50 text-gray-400 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                  value={societyCodeName}
                  onChange={(e) => setSocietyCodeName(e.target.value)}
                />
              </div>
            </div>
            {/* Stock Inward Number / Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Stock Inward Number / Date
              </label>
              <div className="flex items-center gap-2">
                <span className="flex size-10 items-center justify-center rounded border border-stroke bg-gray-50 text-gray-400 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>
                </span>
                <select
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  value={stockInwardNumber}
                  onChange={(e) => setStockInwardNumber(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="2381-MAR26-362483/04-Mar-2026">2381-MAR26-362483/04-Mar-2026</option>
                  <option value="2381-MAR26-362482/03-Mar-2026">2381-MAR26-362482/03-Mar-2026</option>
                  <option value="1181-APR24-361118/11-Apr-2024">1181-APR24-361118/11-Apr-2024</option>
                </select>
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Clear
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              Search
            </button>
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
            {/* Total Product Varieties */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{varietyStatus.totalProductVarieties}</p>
              <p className="text-xs text-gray-500">Total Product Varieties</p>
            </div>
            {/* Checking Completed */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{varietyStatus.checkingCompleted}</p>
              <p className="text-xs text-gray-500">Checking Completed</p>
            </div>
            {/* Checking In-progress */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{varietyStatus.checkingInprogress}</p>
              <p className="text-xs text-gray-500">Checking Inprogress</p>
            </div>
            {/* Checking Yet to Start */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#6c757d]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{varietyStatus.checkingYetToStart}</p>
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
            {/* Total Number of Items */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{itemStatus.totalNumberOfItems}</p>
              <p className="text-xs text-gray-500">Total Number of Items</p>
            </div>
            {/* No of Items Accepted */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{itemStatus.noOfItemsAccepted}</p>
              <p className="text-xs text-gray-500">No of Items Accepted</p>
            </div>
            {/* No of Items Rejected */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#dc3545]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" /><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{itemStatus.noOfItemsRejected}</p>
              <p className="text-xs text-gray-500">No of Items Rejected</p>
            </div>
            {/* No of Items to be Check */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="size-10 text-[#28a745]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <p className="text-lg font-bold text-dark dark:text-white">{itemStatus.noOfItemsToBeCheck}</p>
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
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Received Quantity</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {productVarieties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                productVarieties.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.productVarietyCodeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.uom}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.receivedQuantity}</td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-block rounded-sm bg-[#FFA70B] px-3 py-1 text-xs font-semibold text-white">{row.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Cancel button */}
        <div className="flex justify-end px-5 py-4">
          <button
            onClick={() => router.push("/operational/warehouse-management/product-warehouse/quality-check/list")}
            className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
