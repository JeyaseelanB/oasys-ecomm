"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductVarietyItem {
  id: number;
  groupCodeName: string;
  totalQtyToBeSupplied: number;
  totalQtyAlreadySupplied: number;
  balanceQtyToBeSupplied: number;
}

interface DistributionDetailItem {
  id: number;
  productCodeName: string;
  uniqueBundleNumber: string;
  quantityToBeSupplied: number;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function CreateDistrictTalukWiseDistributionPage() {
  const router = useRouter();

  // District / Taluk Wise - Distribution fields
  const [issrCodeName] = useState("2105 / Inspection centre Vellore");
  const [schemeTypeCodeName, setSchemeTypeCodeName] = useState("FDS / Free Distribution System");
  const [productionPlan, setProductionPlan] = useState("free_scheme2024");
  const [nameOfDistrict, setNameOfDistrict] = useState("");
  const [nameOfTaluk, setNameOfTaluk] = useState("");

  // Product Variety Details table
  const [productVarietyItems, setProductVarietyItems] = useState<ProductVarietyItem[]>([]);

  // Product Variety - Distribution Details
  const [groupCodeName, setGroupCodeName] = useState("");
  const [productCodeName, setProductCodeName] = useState("");
  const [uniqueBundleNumber, setUniqueBundleNumber] = useState("");
  const [quantityToBeSupplied, setQuantityToBeSupplied] = useState("");
  const [distributionDetails, setDistributionDetails] = useState<DistributionDetailItem[]>([]);

  const handleAddDistribution = () => {
    if (groupCodeName && productCodeName) {
      const newItem: DistributionDetailItem = {
        id: distributionDetails.length + 1,
        productCodeName: productCodeName || "SAMPLE PRODUCT",
        uniqueBundleNumber: uniqueBundleNumber || "BDL-001",
        quantityToBeSupplied: parseFloat(quantityToBeSupplied) || 0,
      };
      setDistributionDetails([...distributionDetails, newItem]);
      setProductCodeName("");
      setUniqueBundleNumber("");
      setQuantityToBeSupplied("");
    }
  };

  const handleClearDistributionForm = () => {
    setGroupCodeName("");
    setProductCodeName("");
    setUniqueBundleNumber("");
    setQuantityToBeSupplied("");
  };

  const handleAddVariety = () => {
    if (nameOfDistrict && nameOfTaluk) {
      setProductVarietyItems([
        { id: 1, groupCodeName: "GRP-101 / Cotton Sarees", totalQtyToBeSupplied: 500, totalQtyAlreadySupplied: 120, balanceQtyToBeSupplied: 380 },
      ]);
    }
  };

  const handleRemoveDistribution = (id: number) => {
    setDistributionDetails(distributionDetails.filter((d) => d.id !== id));
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create District / Taluk Wise - Distribution</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">ISSR</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create District / Taluk Wise - Distribution</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">District / Taluk Wise - Distribution</h3>
          <div className="flex items-center gap-2 text-xs text-white">
            <span>(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <button className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Row 1: ISSR Code / Name, Scheme Type, Production Plan, Name of District */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">ISSR Code / Name</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={issrCodeName} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Scheme Type Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select value={schemeTypeCodeName} onChange={(e) => setSchemeTypeCodeName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="FDS / Free Distribution System">FDS / Free Distribution System</option>
                  <option value="OAP / Old Age Pension">OAP / Old Age Pension</option>
                  <option value="NMP / Normal Market Price">NMP / Normal Market Price</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Production Plan</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg></IconBox>
                <select value={productionPlan} onChange={(e) => setProductionPlan(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="free_scheme2024">free_scheme2024</option>
                  <option value="oap_scheme2024">oap_scheme2024</option>
                  <option value="nmp_scheme2024">nmp_scheme2024</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Name of The District</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox>
                <select value={nameOfDistrict} onChange={(e) => setNameOfDistrict(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="KARUR">KARUR</option>
                  <option value="SALEM">SALEM</option>
                  <option value="ERODE">ERODE</option>
                  <option value="COIMBATORE">COIMBATORE</option>
                  <option value="MADURAI">MADURAI</option>
                  <option value="VELLORE">VELLORE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Name of The Taluk + Clear / Add buttons */}
          <div className="mb-6 flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Name of The Taluk</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></IconBox>
                <select value={nameOfTaluk} onChange={(e) => setNameOfTaluk(e.target.value)} className="w-48 rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="KARUR">KARUR</option>
                  <option value="KULITHALAI">KULITHALAI</option>
                  <option value="KRISHNARAYAPURAM">KRISHNARAYAPURAM</option>
                  <option value="ARAVAKURICHI">ARAVAKURICHI</option>
                </select>
              </div>
            </div>
            <button onClick={() => { setNameOfDistrict(""); setNameOfTaluk(""); setProductVarietyItems([]); }} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleAddVariety} className="flex items-center gap-1.5 rounded bg-[#8a9a5b] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </button>
          </div>

          {/* Product Variety Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Product Variety Details</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Group Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Total Quantity to be Supplied</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Total Quantity Already Supplied</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Balance Quantity to be Supplied</th>
                </tr>
              </thead>
              <tbody>
                {productVarietyItems.length === 0 ? (
                  <tr><td colSpan={5} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                ) : (
                  productVarietyItems.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{item.groupCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.totalQtyToBeSupplied.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.totalQtyAlreadySupplied.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.balanceQtyToBeSupplied.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Product Variety - Distribution Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Product Variety - Distribution Details</h4>
          </div>

          <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Group Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <select value={groupCodeName} onChange={(e) => setGroupCodeName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="GRP-101 / Cotton Sarees">GRP-101 / Cotton Sarees</option>
                  <option value="GRP-102 / Silk Sarees">GRP-102 / Silk Sarees</option>
                  <option value="GRP-103 / Towels">GRP-103 / Towels</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Code / Name</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <select value={productCodeName} onChange={(e) => setProductCodeName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="PRD-001 / Cotton Saree White">PRD-001 / Cotton Saree White</option>
                  <option value="PRD-002 / Cotton Saree Coloured">PRD-002 / Cotton Saree Coloured</option>
                  <option value="PRD-003 / Silk Saree">PRD-003 / Silk Saree</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Unique / Bundle Number</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg></IconBox>
                <input type="text" value={uniqueBundleNumber} onChange={(e) => setUniqueBundleNumber(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Quantity to be Supplied</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                <input type="text" value={quantityToBeSupplied} onChange={(e) => setQuantityToBeSupplied(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-end gap-3">
            <button onClick={handleClearDistributionForm} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleAddDistribution} className="flex items-center gap-1.5 rounded bg-[#8a9a5b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </button>
          </div>

          {/* Distribution Details Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Product Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Unique / Bundle Number</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Quantity to be Supplied</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {distributionDetails.length === 0 ? (
                  <tr><td colSpan={5} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                ) : (
                  distributionDetails.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{item.productCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{item.uniqueBundleNumber}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.quantityToBeSupplied.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                        <button onClick={() => handleRemoveDistribution(item.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/close-sales/issr/district-taluk-wise-distribution/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
