"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductDetail {
  id: number;
  bundleNumber: string;
  barCode: string;
  productVarietyCodeName: string;
  atNumber: string;
  rpRate: number;
  ppRate: number;
  status: string;
}

interface BundleDetail {
  id: number;
  bundleNumber: string;
  totalItems: number;
  totalRPValue: number;
  totalPPValue: number;
}

interface InwardDetail {
  id: number;
  atNumber: string;
  regionType: string;
  length: number;
  width: number;
  endsPerInch: number;
  picksPerInch: number;
  purchasePrice: number;
  retailPrice: number;
}

const MOCK_PRODUCTS: ProductDetail[] = [
  { id: 1, bundleNumber: "BDL-101", barCode: "BC-2026-101", productVarietyCodeName: "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK", atNumber: "AT-201", rpRate: 8510.00, ppRate: 5000.00, status: "DISPATCHED" },
  { id: 2, bundleNumber: "BDL-101", barCode: "BC-2026-102", productVarietyCodeName: "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK", atNumber: "AT-202", rpRate: 8510.00, ppRate: 5000.00, status: "DISPATCHED" },
  { id: 3, bundleNumber: "BDL-101", barCode: "BC-2026-103", productVarietyCodeName: "BJR4/BEDSHEET", atNumber: "AT-203", rpRate: 1250.00, ppRate: 800.00, status: "DISPATCHED" },
  { id: 4, bundleNumber: "BDL-102", barCode: "BC-2026-104", productVarietyCodeName: "PCOT/COTTON SAREE", atNumber: "AT-204", rpRate: 3500.00, ppRate: 2200.00, status: "DISPATCHED" },
  { id: 5, bundleNumber: "BDL-102", barCode: "BC-2026-105", productVarietyCodeName: "PCOT/COTTON SAREE", atNumber: "AT-205", rpRate: 3500.00, ppRate: 2200.00, status: "DISPATCHED" },
];

const MOCK_BUNDLES: BundleDetail[] = [
  { id: 1, bundleNumber: "BDL-101", totalItems: 3, totalRPValue: 18270.00, totalPPValue: 10800.00 },
  { id: 2, bundleNumber: "BDL-102", totalItems: 2, totalRPValue: 7000.00, totalPPValue: 4400.00 },
];

const MOCK_INWARD_DETAILS: InwardDetail[] = [
  { id: 1, atNumber: "AT-201", regionType: "INNER_STATE", length: 1.83, width: 0.92, endsPerInch: 120, picksPerInch: 100, purchasePrice: 5000, retailPrice: 8510 },
  { id: 2, atNumber: "AT-202", regionType: "INNER_STATE", length: 1.83, width: 0.92, endsPerInch: 120, picksPerInch: 100, purchasePrice: 5000, retailPrice: 8510 },
];

export default function DWViewStockOutwardPage() {
  const router = useRouter();
  const [showInwardModal, setShowInwardModal] = useState(false);

  const basePath = "/operational/warehouse-management/distribution-warehouse/stock-outward";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Society Stock Outward</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Distribution Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Stock Outward</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header Info */}
        <div className="rounded-t-[10px] bg-[#FFA70B] px-5 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-6 text-sm text-white">
              <div><span className="font-semibold">Stock Outward #:</span> 2026-362490</div>
              <div><span className="font-semibold">Movement Type:</span> Showroom</div>
              <div><span className="font-semibold">Date:</span> 04-Mar-2026</div>
            </div>
            <span className="rounded bg-white/20 px-3 py-1 text-xs font-semibold text-white">SUBMITTED</span>
          </div>
        </div>

        <div className="p-5">
          {/* Sender / Receiver Info */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Sender Details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-gray-500">Sender Code / Name</p><p className="text-sm font-medium text-dark dark:text-white">1185/DWH - COIMBATORE</p></div>
                <div><p className="text-xs text-gray-500">Address</p><p className="text-sm font-medium text-dark dark:text-white">1056, AVINASHI ROAD, COIMBATORE, TAMIL NADU - 641018</p></div>
              </div>
            </div>
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Receiver Details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-gray-500">Receiver Code / Name</p><p className="text-sm font-medium text-dark dark:text-white">1242/NAGAPATTINAM</p></div>
                <div><p className="text-xs text-gray-500">Address</p><p className="text-sm font-medium text-dark dark:text-white">32, NORTH MAIN STREET, NAGAPATTINAM, TAMIL NADU - 611001</p></div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between rounded bg-[#2d8f7b] px-4 py-2">
              <h4 className="text-sm font-semibold text-white">Product Details</h4>
              <button onClick={() => setShowInwardModal(true)} className="rounded bg-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30">Product Inward Details</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Bundle Number</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Bar Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">AT Number</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">RP Rate</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">PP Rate</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PRODUCTS.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.bundleNumber}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.barCode}</td>
                      <td className="border border-stroke px-2 py-2 text-dark dark:border-dark-3 dark:text-white">{item.productVarietyCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.atNumber}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.rpRate.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.ppRate.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <span className="inline-block rounded-sm bg-[#28a745] px-2 py-0.5 text-xs font-semibold text-white">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={5} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{MOCK_PRODUCTS.reduce((s, p) => s + p.rpRate, 0).toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{MOCK_PRODUCTS.reduce((s, p) => s + p.ppRate, 0).toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Bundle Details */}
          <div className="mb-6">
            <div className="mb-3 rounded bg-[#2d8f7b] px-4 py-2">
              <h4 className="text-sm font-semibold text-white">Bundle Details</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Bundle Number</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Items</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total RP Value</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total PP Value</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BUNDLES.map((b, idx) => (
                    <tr key={b.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{b.bundleNumber}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{b.totalItems}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{b.totalRPValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{b.totalPPValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={2} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{MOCK_BUNDLES.reduce((s, b) => s + b.totalItems, 0)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{MOCK_BUNDLES.reduce((s, b) => s + b.totalRPValue, 0).toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{MOCK_BUNDLES.reduce((s, b) => s + b.totalPPValue, 0).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Transport Details */}
          <div className="mb-6">
            <div className="mb-3 rounded bg-[#2d8f7b] px-4 py-2">
              <h4 className="text-sm font-semibold text-white">Transport Details</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="mb-1 text-xs text-gray-500">Transport Name</p><p className="text-sm font-medium text-dark dark:text-white">KPN TRANSPORT</p></div>
              <div><p className="mb-1 text-xs text-gray-500">Vehicle Number</p><p className="text-sm font-medium text-dark dark:text-white">TN 38 CD 5678</p></div>
              <div><p className="mb-1 text-xs text-gray-500">Driver Name</p><p className="text-sm font-medium text-dark dark:text-white">SELVAM</p></div>
              <div><p className="mb-1 text-xs text-gray-500">Driver Phone</p><p className="text-sm font-medium text-dark dark:text-white">9876501234</p></div>
              <div className="md:col-span-2 lg:col-span-4"><p className="mb-1 text-xs text-gray-500">Remarks</p><p className="text-sm font-medium text-dark dark:text-white">Handle with care - Silk and Cotton products</p></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push(`${basePath}/list`)} className="rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">Back</button>
            <Link href={`${basePath}/delivery-challan`} className="rounded bg-[#007bff] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">Delivery Challan</Link>
            <Link href={`${basePath}/pp-delivery-challan`} className="rounded bg-[#6f42c1] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">PP Delivery Challan</Link>
          </div>
        </div>
      </div>

      {/* Product Inward Details Modal */}
      {showInwardModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#5bc0de] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Product Inward Details</h3>
              <button onClick={() => setShowInwardModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="max-h-[60vh] overflow-auto p-5">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">AT Number</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Region Type</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Length</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Width</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Ends/Inch</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Picks/Inch</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Purchase Price</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Retail Price</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_INWARD_DETAILS.map((d, idx) => (
                    <tr key={d.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{d.atNumber}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{d.regionType}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{d.length}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{d.width}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{d.endsPerInch}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{d.picksPerInch}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{d.purchasePrice.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{d.retailPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
