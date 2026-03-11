"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductRow {
  id: number;
  variety: string;
  atNumber: string;
  uom: string;
  hsnCode: string;
  unit: number;
  unitPrice: number;
  taxPct: number;
  taxAmount: number;
  totalAmount: number;
  selected: boolean;
}

interface GstRow {
  id: number;
  hsnCode: string;
  unit: number;
  taxPct: number;
  cgst: number;
  sgst: number;
  totalTax: number;
}

const SUPPLY_RATE_OPTIONS = [
  { value: "352254-SQY19FEB-5", label: "352254-SQY19FEB-5", society: "352254 / MURUGAN SILK WEAVERS COOP. SOCIETY SA.89", societyAddress: "", gstin: "", warehouse: "1881 / PWH - SALEM", warehouseAddress: "Cooptex Product Warehouse,\n343, Bazaar Street,\nSalem, SALEM,\nTAMIL NADU - 636003", warehouseGstin: "33AAAAH2788P1Z8" },
  { value: "291757-SQY19JAN-2", label: "291757-SQY19JAN-2", society: "291757 / SAVAKKATTUPALAYAM DR.M.G.R.W.C.S.LTD.", societyAddress: "", gstin: "", warehouse: "1882 / PWH - ERODE", warehouseAddress: "Cooptex Product Warehouse,\nErode, ERODE,\nTAMIL NADU - 638001", warehouseGstin: "33AAAAH2788P2Z7" },
];

const MOCK_PRODUCT_ROWS: ProductRow[] = [
  { id: 1, variety: "SSLB / SALEM SILK SAREE WITH BLOUSE", atNumber: "352254-Feb2019-173", uom: "NOS", hsnCode: "50072010", unit: 1, unitPrice: 3000.00, taxPct: 5.0, taxAmount: 150.00, totalAmount: 3150.00, selected: true },
];

const MOCK_GST_ROWS: GstRow[] = [
  { id: 1, hsnCode: "50072010", unit: 1.0, taxPct: 2.5, cgst: 75.00, sgst: 75.00, totalTax: 150.00 },
];

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

const CalIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function CreatePurchaseOrderPage() {
  const router = useRouter();

  const [societyCode, setSocietyCode] = useState("");
  const [supplyRate, setSupplyRate] = useState("");
  const [orderType, setOrderType] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("10 / HEAD OFFICE");
  const [validDate, setValidDate] = useState("");
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [termsConditions, setTermsConditions] = useState("");
  const [varFilter, setVarFilter] = useState("");

  const selected = SUPPLY_RATE_OPTIONS.find((o) => o.value === supplyRate);

  const supplierSociety = generated && selected ? selected.society : "";
  const supplierAddress = generated && selected ? selected.societyAddress : "";
  const supplierGstin   = generated && selected ? selected.gstin : "";
  const buyerWarehouse  = generated && selected ? selected.warehouse : "";
  const buyerAddress    = generated && selected ? selected.warehouseAddress : "";
  const buyerGstin      = generated && selected ? selected.warehouseGstin : "";

  const productRows = generated ? MOCK_PRODUCT_ROWS.filter((r) => varFilter === "" || r.variety.toLowerCase().includes(varFilter.toLowerCase())) : [];
  const gstRows = generated ? MOCK_GST_ROWS : [];

  const materialValue = productRows.reduce((s, r) => s + r.unitPrice * r.unit, 0);
  const totalTaxAmount = productRows.reduce((s, r) => s + r.taxAmount, 0);
  const cgstTotal = gstRows.reduce((s, r) => s + r.cgst, 0);
  const sgstTotal = gstRows.reduce((s, r) => s + r.sgst, 0);
  const totalTaxGst = gstRows.reduce((s, r) => s + r.totalTax, 0);
  const grandTotal = materialValue + totalTaxAmount;

  const canGenerate = societyCode !== "" && supplyRate !== "" && orderType !== "" && validDate !== "" && expectedDelivery !== "";

  const handleGenerate = () => {
    if (!canGenerate) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 800);
  };

  const handleCancel = () => router.push("/operational/procurement/retail-procurement/purchase-order/list");

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – Create Purchase Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Purchase Order</li>
          </ol>
        </nav>
      </div>

      {/* Purchase Order Details card */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Purchase Order Details</h3>
          <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Society Code / Name */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Society Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                </IconBox>
                <select value={societyCode} onChange={(e) => setSocietyCode(e.target.value)} className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="352254">352254 / MURUGAN SILK WEAVERS COOP. SOCIETY SA.89</option>
                  <option value="291757">291757 / SAVAKKATTUPALAYAM DR.M.G.R.W.C.S.LTD.</option>
                  <option value="351420">351420 / THOPPUR WEAVERS COOP. SOCIETY KK.19</option>
                </select>
              </div>
            </div>

            {/* Supply Rate Confirmation */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Supply Rate Confirmation <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>
                </IconBox>
                <select value={supplyRate} onChange={(e) => { setSupplyRate(e.target.value); setGenerated(false); }} className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  {SUPPLY_RATE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Order Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </IconBox>
                <select value={orderType} onChange={(e) => setOrderType(e.target.value)} className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="NEW">New Order</option>
                  <option value="REPEAT">Repeat Order</option>
                  <option value="TRIAL">Trial Order</option>
                </select>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Shipping Address <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </IconBox>
                <select value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="1881">1881 / PWH - SALEM</option>
                  <option value="1882">1882 / PWH - ERODE</option>
                  <option value="1883">1883 / PWH - COIMBATORE</option>
                </select>
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Billing Address <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </IconBox>
                <select value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="10 / HEAD OFFICE">10 / HEAD OFFICE</option>
                  <option value="11 / REGIONAL OFFICE SOUTH">11 / REGIONAL OFFICE SOUTH</option>
                </select>
              </div>
            </div>

            {/* Purchase Order Valid Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Purchase Order Valid Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={validDate} onChange={(e) => setValidDate(e.target.value)} className="w-full rounded-l border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <button className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] text-white hover:opacity-90">
                  <CalIcon />
                </button>
              </div>
            </div>

            {/* Expected Date of Delivery */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Expected Date of Delivery <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={expectedDelivery} onChange={(e) => setExpectedDelivery(e.target.value)} className="w-full rounded-l border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <button className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] text-white hover:opacity-90">
                  <CalIcon />
                </button>
              </div>
            </div>

            {/* Cancel + Generate buttons */}
            <div className="flex items-end justify-end gap-2">
              <button onClick={handleCancel} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={handleGenerate} disabled={!canGenerate || generating}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                {generating ? (
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity={0.3}/><path d="M21 12a9 9 0 00-9-9"/></svg>
                ) : (
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 003.2 7.2M2 12.5a10 10 0 0018.8 4.2"/></svg>
                )}
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier + Buyer Details */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Supplier Details */}
        <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <SectionHeader label="Supplier Details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Society Code / Name</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">#</div>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">{supplierSociety || <span className="text-gray-400">–</span>}</div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Society Address</label>
              <textarea readOnly rows={4} value={supplierAddress} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] outline-none dark:border-dark-3 dark:bg-dark-2" placeholder="–" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">GSTIN Number</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">#</div>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">{supplierGstin || <span className="text-gray-400">–</span>}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Buyer Details */}
        <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <SectionHeader label="Buyer Details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Product Warehouse Code / Name</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">#</div>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">{buyerWarehouse || <span className="text-gray-400">–</span>}</div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Product Warehouse Address</label>
              <textarea readOnly rows={4} value={buyerAddress} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] outline-none dark:border-dark-3 dark:bg-dark-2 whitespace-pre-line" placeholder="–" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">GSTIN Number</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">#</div>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">{buyerGstin || <span className="text-gray-400">–</span>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <SectionHeader label="Product Details" />
          <div className="flex gap-5">
            <div className="flex-1 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">
                      <div>Product Variety Code / Name</div>
                      <div className="mt-1">
                        <input type="text" value={varFilter} onChange={(e) => setVarFilter(e.target.value)} className="w-full rounded border border-[#3aa88f] bg-white/20 px-2 py-0.5 text-xs text-white placeholder-white/70 outline-none" placeholder="Filter..." />
                      </div>
                    </th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">AT Number</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">HSN Code</th>
                    <th className="w-20 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Unit</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Unit Price (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Tax (%)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Tax Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Total Amount (₹)</th>
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">
                      <input type="checkbox" className="size-4 accent-white" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.length === 0 ? (
                    <tr><td colSpan={11} className="py-6 text-center text-sm text-gray-400">No records found</td></tr>
                  ) : (
                    productRows.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.variety}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.atNumber}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.uom}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.hsnCode}</td>
                        <td className="border border-stroke px-2 py-1 dark:border-dark-3">
                          <input type="number" defaultValue={row.unit} className="w-full rounded border border-stroke bg-white px-2 py-1 text-sm text-right outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                        </td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.unitPrice.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.taxPct.toFixed(1)}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.taxAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.totalAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                          <input type="checkbox" defaultChecked={row.selected} className="size-4 accent-primary" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Right summary */}
            {generated && (
              <div className="w-56 shrink-0">
                <div className="rounded border border-stroke bg-gray-50 p-3 text-sm dark:border-dark-3 dark:bg-dark-2">
                  <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-dark-3">
                    <span className="text-gray-600 dark:text-gray-400">Material Value (Without Tax):</span>
                    <span className="font-semibold text-dark dark:text-white">{materialValue.toFixed(2)}</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">CGST 2.5%</span>
                    <span className="text-dark dark:text-white">{cgstTotal.toFixed(2)}</span>
                  </div>
                  <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-dark-3">
                    <span className="text-gray-600 dark:text-gray-400">SGST 2.5%</span>
                    <span className="text-dark dark:text-white">{sgstTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-dark dark:text-white">Total</span>
                    <span className="text-dark dark:text-white">{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GST Summary + Terms & Conditions */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* GST Summary */}
        <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <SectionHeader label="GST Summary" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">HSN Code</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Unit</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Tax (%)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">CGST (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">SGST (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Total Tax (₹)</th>
                </tr>
              </thead>
              <tbody>
                {gstRows.length === 0 ? (
                  <tr><td colSpan={7} className="py-6 text-center text-sm text-gray-400">No records found</td></tr>
                ) : (
                  gstRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.hsnCode}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.unit.toFixed(1)}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.taxPct.toFixed(1)}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.cgst.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.sgst.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.totalTax.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {gstRows.length > 0 && (
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={4} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{cgstTotal.toFixed(2)}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{sgstTotal.toFixed(2)}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{totalTaxGst.toFixed(2)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <SectionHeader label="Terms & Conditions" />
          <textarea rows={7} value={termsConditions} onChange={(e) => setTermsConditions(e.target.value)}
            className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            placeholder="Enter terms and conditions..." />
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="flex items-center justify-end gap-3">
        <button onClick={handleCancel} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Cancel
        </button>
        <button onClick={() => { if (generated) router.push("/operational/procurement/retail-procurement/purchase-order/preview"); }}
          disabled={!generated}
          className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Preview
        </button>
      </div>
    </div>
  );
}
