"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductRow {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  bundleNo: string;
  dispatchedQuantity: number;
  value: number;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-3 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

export default function CreateItemOutwardPage() {
  const router = useRouter();

  // Header fields
  const [type, setType] = useState("");
  const [entityTypeCode, setEntityTypeCode] = useState("");
  const [stockOutwardTo, setStockOutwardTo] = useState("");

  // Add Products form
  const [productCategoryCode, setProductCategoryCode] = useState("");
  const [productGroupCode, setProductGroupCode] = useState("");
  const [productVarietyCode, setProductVarietyCode] = useState("");
  const [unitRate, setUnitRate] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [currentDispatchQuantity, setCurrentDispatchQuantity] = useState("");
  const [bundleNo, setBundleNo] = useState("");
  const [productRows, setProductRows] = useState<ProductRow[]>([]);

  // Bundle Details
  const [totalBundles, setTotalBundles] = useState("");
  const [bundleNumber, setBundleNumber] = useState("");
  const [totalBundleWeight, setTotalBundleWeight] = useState("");

  // Transport Details
  const [transportServiceType, setTransportServiceType] = useState("");
  const [transportServiceName, setTransportServiceName] = useState("");
  const [waybillAvailable, setWaybillAvailable] = useState("");
  const [transportChargeAvailable, setTransportChargeAvailable] = useState("");

  const handleAddProduct = () => {
    if (!productVarietyCode || !currentDispatchQuantity) return;
    const qty = parseFloat(currentDispatchQuantity) || 0;
    const rate = parseFloat(unitRate) || 0;
    setProductRows((prev) => [...prev, {
      id: Date.now(),
      productVarietyCodeName: productVarietyCode,
      uom: "NOS",
      bundleNo,
      dispatchedQuantity: qty,
      value: qty * rate,
    }]);
    setProductCategoryCode(""); setProductGroupCode(""); setProductVarietyCode("");
    setUnitRate(""); setAvailableQuantity(""); setCurrentDispatchQuantity(""); setBundleNo("");
  };

  const handleDeleteProduct = (id: number) => setProductRows((prev) => prev.filter((r) => r.id !== id));

  const totalQty = productRows.reduce((s, r) => s + r.dispatchedQuantity, 0);
  const totalValue = productRows.reduce((s, r) => s + r.value, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Stock Item Outward</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Stock Item Outward</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Create Stock Item Outward</h3>
          <span className="text-xs text-white opacity-80">* Mandatory Fields —</span>
        </div>

        <div className="p-5">
          {/* Type / Entity / Stock Outward To */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </IconBox>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="WITH_OUT_REQUEST">WITH OUT REQUEST</option>
                  <option value="WITH_REQUEST">WITH REQUEST</option>
                  <option value="TRANSFER">TRANSFER</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Type Code / Name</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <select value={entityTypeCode} onChange={(e) => setEntityTypeCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="SHOW_ROOM / Showroom">SHOW_ROOM / Showroom</option>
                  <option value="ISSR / ISSR">ISSR / ISSR</option>
                  <option value="WAREHOUSE / Warehouse">WAREHOUSE / Warehouse</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Stock Outward To</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
                </IconBox>
                <select value={stockOutwardTo} onChange={(e) => setStockOutwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="2028 / V.O.C-TUTICORIN">2028 / V.O.C-TUTICORIN</option>
                  <option value="1228 / TINDIVANAM">1228 / TINDIVANAM</option>
                  <option value="1916 / PERAMBALUR">1916 / PERAMBALUR</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Add Products */}
          <div className="mb-3">
            <SectionHeader label="Add Products" />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                <select value={productCategoryCode} onChange={(e) => setProductCategoryCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="BED_SHEETS">BED SHEETS</option>
                  <option value="SAREES">SAREES</option>
                  <option value="DRESS_MATERIALS">DRESS MATERIALS</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Group Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <select value={productGroupCode} onChange={(e) => setProductGroupCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="YSD6">YSD6 - PL SUITING UNIFORM</option>
                  <option value="YPS6">YPS6 - PL CHUDITHAR TOP</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Variety Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="9" cy="9" r="6"/><path d="M15 15l5 5"/></svg></IconBox>
                <select value={productVarietyCode} onChange={(e) => setProductVarietyCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="YSD6 / PL SUITING UNIFORM">YSD6 / PL SUITING UNIFORM</option>
                  <option value="YPS6 / PL CHUDITHAR TOP">YPS6 / PL CHUDITHAR TOP</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Unit Rate</label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">₹</span></IconBox>
                <select value={unitRate} onChange={(e) => setUnitRate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="150">150.00</option>
                  <option value="200">200.00</option>
                  <option value="250">250.00</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Available Quantity</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                <input type="text" readOnly value={availableQuantity} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Current Dispatch Quantity</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                <input type="number" value={currentDispatchQuantity} onChange={(e) => setCurrentDispatchQuantity(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Bundle No.</label>
                <div className="flex">
                  <IconBox><span className="text-sm font-bold">#</span></IconBox>
                  <input type="text" value={bundleNo} onChange={(e) => setBundleNo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <button onClick={handleAddProduct} className="mb-0.5 flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                Add
              </button>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Product Variety Details table */}
          <div className="mb-6">
            <SectionHeader label="Product Variety Details" />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Bundle No.</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Dispatched Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Value (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.length === 0 ? (
                    <tr><td colSpan={7} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    productRows.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.productVarietyCodeName}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.uom}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.bundleNo || "-"}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.dispatchedQuantity.toFixed(1)}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.value.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                          <button onClick={() => handleDeleteProduct(row.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={4} className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totalQty > 0 ? totalQty.toFixed(1) : "0"}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totalValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Bundle Details */}
          <div className="mb-6">
            <SectionHeader label="Bundle Details" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Total Number of Bundles</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                  <input type="text" value={totalBundles} onChange={(e) => setTotalBundles(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Bundle Number</label>
                <div className="flex">
                  <IconBox><span className="text-sm font-bold">#</span></IconBox>
                  <input type="text" value={bundleNumber} onChange={(e) => setBundleNumber(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Total Bundle Weight</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="3" x2="12" y2="21"/><path d="M5.5 8.5l13-1M5.5 15.5l13 1"/><circle cx="12" cy="12" r="1"/></svg></IconBox>
                  <input type="text" value={totalBundleWeight} onChange={(e) => setTotalBundleWeight(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Transport Details */}
          <div className="mb-6">
            <SectionHeader label="Transport Details" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Service Type</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></IconBox>
                  <select value={transportServiceType} onChange={(e) => setTransportServiceType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select Service Type</option>
                    <option value="Personal Delivery">Personal Delivery</option>
                    <option value="Courier">Courier</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Service Name</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></IconBox>
                  <select value={transportServiceName} onChange={(e) => setTransportServiceName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select Service Name</option>
                    <option value="Personal Delivery">Personal Delivery</option>
                    <option value="DTDC">DTDC</option>
                    <option value="Blue Dart">Blue Dart</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Waybill Available</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg></IconBox>
                  <select value={waybillAvailable} onChange={(e) => setWaybillAvailable(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select Waybill Type</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transport Charge Available</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                  <select value={transportChargeAvailable} onChange={(e) => setTransportChargeAvailable(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select Type</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/stock-management/item-outward/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
              Save
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
