"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductItem { id: number; productVarietyCodeName: string; uom: string; dispatchedQuantity: number; receivedUnit: number; value: number; }
interface InwardItem { id: number; bundleNumber: string; qrCode: string; atNumber: string; quantity: number; value: number; }

const MOCK_PRODUCTS: ProductItem[] = [
  { id: 1, productVarietyCodeName: "BEA4 / BEDSHEET 60X90 ACRYLIC J...", uom: "NOS", dispatchedQuantity: 0.0, receivedUnit: 140.0, value: 1240.00 },
];

const MOCK_INWARD_ITEMS: InwardItem[] = [
  { id: 1, bundleNumber: "", qrCode: "23816958807", atNumber: "20240214079823", quantity: 1.0, value: 1240.00 },
  { id: 2, bundleNumber: "", qrCode: "23816958808", atNumber: "20240214079822", quantity: 1.0, value: 1240.00 },
  { id: 3, bundleNumber: "", qrCode: "23816958809", atNumber: "20240214079821", quantity: 1.0, value: 1240.00 },
  { id: 4, bundleNumber: "", qrCode: "23816958810", atNumber: "20240214079820", quantity: 1.0, value: 1240.00 },
  { id: 5, bundleNumber: "", qrCode: "23816958811", atNumber: "20240214079819", quantity: 1.0, value: 1240.00 },
  { id: 6, bundleNumber: "", qrCode: "23816958812", atNumber: "20240214079818", quantity: 1.0, value: 1240.00 },
  { id: 7, bundleNumber: "", qrCode: "23816958813", atNumber: "20240214079817", quantity: 1.0, value: 1240.00 },
];

export default function ViewStockInwardPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Stock Inward - Product Warehouse</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Distribution Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Stock Inward</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Stock Inward</h3>
        </div>
        <div className="p-5">
          {/* Info Labels */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div><p className="text-xs text-gray-500">Society Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">2381 / PWH CHENNIMALAI</p></div>
            <div><p className="text-xs text-gray-500">Stock Movement Number From</p><p className="text-sm font-medium text-[#17a2b8]">2024-358054</p></div>
            <div><p className="text-xs text-gray-500">Status</p><p className="text-sm font-medium text-[#17a2b8]">SUBMITTED</p></div>
            <div><p className="text-xs text-gray-500">Stock Movement Number</p><p className="text-sm font-medium text-[#17a2b8]">2024-359342</p></div>
          </div>

          {/* Product Variety Details */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Product Variety Details</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Dispatched Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Received Unit</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Value (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PRODUCTS.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{item.productVarietyCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{item.uom}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{item.dispatchedQuantity.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{item.receivedUnit.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{item.value.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button onClick={() => setShowModal(true)} className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">0.0</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">140.0</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">1240.00</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Bundle Details - Side by side */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <h4 className="text-sm font-semibold text-dark dark:text-white">Dispatched - Bundle Details</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Total Number of Bundles</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
                <div><p className="text-xs text-gray-500">Total Bundle Weight</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
              </div>
              <div className="mt-2"><p className="text-xs text-gray-500">Bundle Number</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <h4 className="text-sm font-semibold text-dark dark:text-white">Received - Bundle Details</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Total Number of Bundles</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
                <div><p className="text-xs text-gray-500">Total Bundle Weight</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
              </div>
              <div className="mt-2"><p className="text-xs text-gray-500">Bundle Number</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transport Details</h4>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Transport Service Type</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
              <div><p className="text-xs text-gray-500">Transport Service Name</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
              <div><p className="text-xs text-gray-500">Waybill Available</p><p className="text-sm font-medium text-[#17a2b8]">No</p></div>
              <div><p className="text-xs text-gray-500">Waybill Number</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Transport Charge Available</p><p className="text-sm font-medium text-[#17a2b8]">No</p></div>
              <div><p className="text-xs text-gray-500">Transport Charge Type</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
              <div><p className="text-xs text-gray-500">Transport Charge Amount</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/warehouse-management/distribution-warehouse/stock-inward/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>Back
            </button>
          </div>
        </div>
      </div>

      {/* AT Number Wise Product Inward Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">AT Number Wise Product Inward Details</h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:opacity-80"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="p-5">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Product Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">BEA4 / BEDSHEET 60X90 ACRYLIC JACQUARD</p></div>
                <div><p className="text-xs text-gray-500">UOM</p><p className="text-sm font-medium text-[#17a2b8]">NOS</p></div>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <h4 className="text-sm font-semibold text-dark dark:text-white">Item Details</h4>
              </div>
              <div className="mb-4 max-h-[40vh] overflow-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Bundle Number</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">QR Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">AT Number</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Value (₹)</th>
                  </tr></thead>
                  <tbody>
                    {MOCK_INWARD_ITEMS.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{item.bundleNumber || "-"}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{item.qrCode}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{item.atNumber}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{item.quantity.toFixed(1)}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{item.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div><label className="mb-1 block text-xs text-gray-500">Dispatched Quantity</label><div className="flex"><div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></div><input type="text" value="0.0" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
                <div><label className="mb-1 block text-xs text-gray-500">Received Unit</label><div className="flex"><div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></div><input type="text" value="140.0" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
                <div><label className="mb-1 block text-xs text-gray-500">Received Value</label><div className="flex"><div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><span className="text-sm font-semibold">₹</span></div><input type="text" value="1240.00" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" /></div></div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setShowModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
