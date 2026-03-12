"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductItem {
  id: number;
  productVarietyCodeName: string;
  uom: string;
  quantity: number;
  value: number;
  unitRate: number;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function CreateAdditionalProductionPlanPage() {
  const router = useRouter();
  const basePath = "/operational/production-planning/additional-production-plan";

  // Plan Details
  const [planName, setPlanName] = useState("");
  const [planFrom, setPlanFrom] = useState("");
  const [planTo, setPlanTo] = useState("");
  const [planFor, setPlanFor] = useState("");
  const [planDueDate, setPlanDueDate] = useState("");

  // Plan Request Details
  const [requestFrom, setRequestFrom] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [reason, setReason] = useState("");

  // Product Details
  const [productCategory, setProductCategory] = useState("");
  const [productGroupCode, setProductGroupCode] = useState("");
  const [productVarietyCode, setProductVarietyCode] = useState("");
  const [uom, setUom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState("");
  const [products, setProducts] = useState<ProductItem[]>([]);

  // Forward
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");

  // Create Note Modal
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const handleAddProduct = () => {
    if (productVarietyCode.trim()) {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const qty = parseFloat(quantity) || 0;
      const val = parseFloat(value) || 0;
      const rate = qty > 0 ? val / qty : 0;
      setProducts([...products, { id: newId, productVarietyCodeName: productVarietyCode, uom: uom || "NOS", quantity: qty, value: val, unitRate: rate }]);
      setProductVarietyCode(""); setUom(""); setQuantity(""); setValue("");
    }
  };

  const handleClearProduct = () => {
    setProductCategory(""); setProductGroupCode(""); setProductVarietyCode(""); setUom(""); setQuantity(""); setValue("");
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalQuantity = products.reduce((s, p) => s + p.quantity, 0);
  const totalValue = products.reduce((s, p) => s + p.value, 0);
  const totalUnitRate = products.reduce((s, p) => s + p.unitRate, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Additional Production Plan</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Plan</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Additional Production Plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Create Additional Production Plan</h3>
          <span className="text-xs text-white/80">(<span className="text-red-300">*</span>) Mandatory Fields</span>
        </div>

        <div className="p-5">
          {/* Plan Details */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg></IconBox>
                <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan - From <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={planFrom} onChange={(e) => setPlanFrom(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan - To <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={planTo} onChange={(e) => setPlanTo(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select value={planFor} onChange={(e) => setPlanFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Exhibition">Exhibition</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Due Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={planDueDate} onChange={(e) => setPlanDueDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
              </div>
            </div>
          </div>

          {/* Plan Request Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Plan Request Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Request From <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <input type="text" value={requestFrom} onChange={(e) => setRequestFrom(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Request Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={requestDate} onChange={(e) => setRequestDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Reason</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Product Details</h4>
          </div>
          <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code/ Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="SAREES">SAREES</option>
                  <option value="BEDSHEETS">BEDSHEETS</option>
                  <option value="TOWELS">TOWELS</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Group Code/ Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <input type="text" value={productGroupCode} onChange={(e) => setProductGroupCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Variety Code/ Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <input type="text" value={productVarietyCode} onChange={(e) => setProductVarietyCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">UOM</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></IconBox>
                <input type="text" value={uom} onChange={(e) => setUom(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Quantity <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-40 rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Value</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="w-40 rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <button onClick={handleClearProduct} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleAddProduct} className="flex items-center gap-1.5 rounded bg-[#8a9a5b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
              Add
            </button>
          </div>

          {/* Product Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Product Variety Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Unit Rate</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan={7} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                ) : (
                  products.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{item.productVarietyCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{item.uom}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.quantity}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.value.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{item.unitRate.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                        <button onClick={() => handleRemoveProduct(item.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {products.length > 0 && (
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalQuantity.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalUnitRate.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Forward To / For */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward to <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward for <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Approval">Approval</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowCreateNote(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
                Save
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CREATE NOTE MODAL ===== */}
      {showCreateNote && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowCreateNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-0 rounded-t border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-[#f9fafb] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option><option>Serif</option><option>Monospace</option></select>
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option><option>Small</option><option>Large</option></select>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm font-bold">B</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm italic">I</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm underline">U</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm line-through">S</span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm font-bold">A</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sup>2</sup></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>1</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>2</sub></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg></button>
                </div>
              </div>
              <div className="mb-4 min-h-[160px] rounded-b border border-t-0 border-stroke p-3 dark:border-dark-3">
                <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={6} placeholder="Enter your content" className="w-full resize-none bg-transparent text-sm italic text-gray-400 outline-none dark:text-gray-500" />
              </div>
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-2.5 rounded-full bg-[#17a2b8]"></span>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg></button>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></button>
              </div>
              <div className="mb-6 inline-block rounded border border-[#e8a87c] p-4">
                <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                <div className="space-y-1 text-sm text-dark dark:text-white">
                  <p>Name : SANKARANARAYANAN</p>
                  <p>Designation : SUPERINTENDENT</p>
                  <p>Date : 11-Mar-2026</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
