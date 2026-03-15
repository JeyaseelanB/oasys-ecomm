"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductItem {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  dispatchedQuantity: number;
  value: number;
}

interface InwardItemDetail {
  id: number;
  bundleNumber: string;
  qrCode: string;
  atNumber: string;
  quantity: number;
  value: number;
}

const MOCK_PRODUCTS: ProductItem[] = [
  { id: 1, productVarietyCodeName: "ASWS / ANGAVAS SALEM WOVEN SILK PURE...", uom: "NOS", dispatchedQuantity: 100.00, value: 851000.00 },
];

const MOCK_INWARD_ITEMS: InwardItemDetail[] = [
  { id: 1, bundleNumber: "", qrCode: "23816975149", atNumber: "111", quantity: 100.0, value: 851000.00 },
];

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function EditStockOutwardPage() {
  const router = useRouter();

  // Pre-filled form state from mock selected record
  const [outwardType, setOutwardType] = useState("Bulk Scanning");
  const [editType, setEditType] = useState("");
  const [stockMovementType, setStockMovementType] = useState("Warehouse");
  const [warehouseType, setWarehouseType] = useState("Distribution Warehouse");
  const [warehouseCodeName] = useState("1185 / DWH - COIMBATORE");
  const [bundleNumber, setBundleNumber] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [products] = useState<ProductItem[]>(MOCK_PRODUCTS);
  const [totalBundles, setTotalBundles] = useState("");
  const [bundleNum, setBundleNum] = useState("");
  const [totalBundleWeight, setTotalBundleWeight] = useState("");
  const [transportServiceType, setTransportServiceType] = useState("");
  const [transportServiceName, setTransportServiceName] = useState("");
  const [waybillAvailable, setWaybillAvailable] = useState("Yes");
  const [waybillNumber, setWaybillNumber] = useState("");
  const [transportChargeAvailable, setTransportChargeAvailable] = useState("");
  const [transportChargeType, setTransportChargeType] = useState("");
  const [transportChargeAmount, setTransportChargeAmount] = useState("");
  const [showInwardModal, setShowInwardModal] = useState(false);

  const totalDispatched = products.reduce((s, p) => s + p.dispatchedQuantity, 0);
  const totalValue = products.reduce((s, p) => s + p.value, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Stock Outward - Product Warehouse</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Product Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Stock Outward - Product Warehouse</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Stock Outward Details Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Stock Outward Details</h3>
        </div>

        <div className="p-5">
          {/* Row 1: Type, Edit Type, Stock Movement Type, Warehouse Type */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                Type <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select value={outwardType} onChange={(e) => setOutwardType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Bulk Scanning">Bulk Scanning</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Edit Type</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select value={editType} onChange={(e) => setEditType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Add">Add</option>
                  <option value="Remove">Remove</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Stock Movement Type</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg></IconBox>
                <select value={stockMovementType} onChange={(e) => setStockMovementType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Showroom">Showroom</option>
                  <option value="ISSR">ISSR</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Warehouse Type</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <select value={warehouseType} onChange={(e) => setWarehouseType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Distribution Warehouse">Distribution Warehouse</option>
                  <option value="Product Warehouse">Product Warehouse</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Warehouse Code / Name */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Warehouse Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <input type="text" value={warehouseCodeName} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Add Products Section */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Add Products</h4>
            </div>
            <div className="mb-4 flex flex-wrap items-end gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  Bundle Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                  <input type="text" value={bundleNumber} onChange={(e) => setBundleNumber(e.target.value)} className="w-48 rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  QR Code <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v3h-3M14 20h3M20 20h0"/></svg></IconBox>
                  <input type="text" value={qrCode} onChange={(e) => setQrCode(e.target.value)} className="w-48 rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <button className="flex items-center gap-1.5 rounded bg-[#8a9a5b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                Add
              </button>
            </div>

            {/* Products Table - Pre-filled with mock data */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Dispatched Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Value (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-dark dark:border-dark-3 dark:text-white">{item.productVarietyCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.uom}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.dispatchedQuantity.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.value.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button onClick={() => setShowInwardModal(true)} className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90" title="Product Inward Details">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={2} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalDispatched.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Bundle Details */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Bundle Details</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Total Number of Bundles</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></IconBox>
                  <input type="text" value={totalBundles} onChange={(e) => setTotalBundles(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Bundle Number</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                  <input type="text" value={bundleNum} onChange={(e) => setBundleNum(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Total Bundle Weight</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 3v18M5.5 8.5l13-1M5.5 15.5l13 1"/><circle cx="12" cy="12" r="1"/></svg></IconBox>
                  <input type="text" value={totalBundleWeight} onChange={(e) => setTotalBundleWeight(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transport Details</h4>
            </div>
            {/* Row 1 */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Service Type</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></IconBox>
                  <select value={transportServiceType} onChange={(e) => setTransportServiceType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Own">Own</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Service Name</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></IconBox>
                  <select value={transportServiceName} onChange={(e) => setTransportServiceName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="SRI MURUGAN TRANSPORT">SRI MURUGAN TRANSPORT</option>
                    <option value="KPN TRANSPORT">KPN TRANSPORT</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Waybill Available</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                  <select value={waybillAvailable} onChange={(e) => setWaybillAvailable(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Waybill Number</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                  <input type="text" value={waybillNumber} onChange={(e) => setWaybillNumber(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Charge Available</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                  <select value={transportChargeAvailable} onChange={(e) => setTransportChargeAvailable(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Charge Type</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg></IconBox>
                  <select value={transportChargeType} onChange={(e) => setTransportChargeType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Per Bundle">Per Bundle</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Charge Amount</label>
                <div className="flex">
                  <IconBox><span className="text-sm font-semibold">₹</span></IconBox>
                  <input type="text" value={transportChargeAmount} onChange={(e) => setTransportChargeAmount(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/warehouse-management/product-warehouse/stock-outward/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Product Inward Details Modal */}
      {showInwardModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Product Inward Details</h3>
              <button onClick={() => setShowInwardModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Product Info */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Product Code / Name</p>
                    <p className="text-sm font-medium text-[#17a2b8]">ASWS / ANGAVAS SALEM WOVEN SILK PURE SILK</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">UOM</p>
                    <p className="text-sm font-medium text-[#17a2b8]">NOS</p>
                  </div>
                </div>
              </div>

              {/* Item Details Section */}
              <div className="mb-4 flex items-center gap-2">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <h4 className="text-sm font-semibold text-dark dark:text-white">Item Details</h4>
              </div>

              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="w-12 border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Bundle Number</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">QR Code</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">AT Number</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Value (₹)</th>
                      <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_INWARD_ITEMS.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{item.bundleNumber || "-"}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{item.qrCode}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{item.atNumber}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{item.quantity.toFixed(1)}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{item.value.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                          <button className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90" title="Remove">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dispatched Quantity & Received Value */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Dispatched Quantity</label>
                  <div className="flex">
                    <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                    <input type="text" value="100.00" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Received Value</label>
                  <div className="flex">
                    <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                    <input type="text" value="851000.00" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Cancel Button */}
              <div className="flex justify-end">
                <button onClick={() => setShowInwardModal(false)} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
