"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ═══════════════ ICONS ═══════════════ */
const SectionIcon = () => (
  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
    <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
  </svg>
);
const EntityIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const HashIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const CartIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);
const LayersIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7 12,2"/>
    <polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/>
  </svg>
);
const TruckIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const NoteIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const ScaleIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);
const TagIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const RupeeIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 3h12M6 8h12M6 13l8 8M6 13h3a4 4 0 000-8"/>
  </svg>
);
const TrashIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
  </svg>
);

/* ═══════════════ COMPONENTS ═══════════════ */
function FieldGroup({ label, required, icon, children }: {
  label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-dark dark:text-white">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="flex items-center overflow-hidden rounded border border-stroke bg-white focus-within:border-[#17a2b8] dark:border-dark-3 dark:bg-gray-dark">
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">{icon}</span>
        )}
        {children}
      </div>
    </div>
  );
}
function FInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={props.className ?? "h-10 w-full bg-transparent px-3 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"}/>;
}
function FSelect({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="h-10 w-full bg-transparent px-3 text-sm text-dark outline-none dark:bg-gray-dark dark:text-white">{children}</select>;
}
function ReadonlyInput({ value }: { value: string }) {
  return <FInput type="text" value={value} readOnly className="h-10 w-full cursor-not-allowed bg-gray-50 px-3 text-sm text-dark outline-none dark:bg-dark-2 dark:text-white"/>;
}

interface ProductRow {
  id: number; productVariety: string; purchaseOrderNumber: string;
  uom: string; orderedUnit: string; dispatchedQty: string;
  currentDispatchedQty: string; value: number; bundleDetails: string;
}

export default function CreateSocietyStockOutwardPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    dpOffice: "", shippingTo: "", purchaseOrderNumber: "",
    societyCode: "353313 / T(H) 110, ARINGNAR ANNA P.W.C.S.LTD.,",
    societyAddress: "", societyGstin: "",
    warehouseCode: "", warehouseAddress: "", warehouseGstin: "",
    totalBundles: "", bundleNumber: "", totalBundleWeight: "",
    transportServiceType: "", transportServiceName: "",
    waybillAvailable: "", waybillNumber: "",
    transportChargeAvailable: "", transportChargeType: "", transportChargeAmount: "",
  });
  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const [rows] = useState<ProductRow[]>([]);

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Society Stock Outward</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">Weavers</li>
          <li className="text-gray-400">/</li>
          <li className="font-medium text-primary">Create Society Stock Outward</li>
        </ol></nav>
      </div>

      {/* Top Card — Society Stock Outward */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Society Stock Outward</span>
          <button className="text-white/80 hover:text-white text-lg font-bold leading-none">—</button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FieldGroup label="D&P Office Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.dpOffice} onChange={e => set("dpOffice", e.target.value)}>
                <option value="">Select</option>
                <option>1301 / D&P OFFICE ERODE</option>
                <option>1201 / D&P OFFICE SALEM</option>
                <option>1101 / D&P OFFICE CHENNAI</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Shipping To" required icon={<EntityIcon/>}>
              <FSelect value={form.shippingTo} onChange={e => set("shippingTo", e.target.value)}>
                <option value="">Select</option>
                <option>2381 / PWH CHENNIMALAI</option>
                <option>1881 / PWH - SALEM</option>
                <option>1176 / ISSR - COIMBATORE</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Purchase Order Number" required icon={<CartIcon/>}>
              <FSelect value={form.purchaseOrderNumber} onChange={e => set("purchaseOrderNumber", e.target.value)}>
                <option value="">(0) Purchase Order(s) selected</option>
                <option>PO-2026-001</option>
                <option>PO-2026-002</option>
              </FSelect>
            </FieldGroup>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => router.push("/weavers/society-stock-outward/list")}
              className="flex items-center gap-2 rounded bg-[#343a40] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-2 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Stock From / Stock To Details */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="grid grid-cols-1 divide-y divide-stroke lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-dark-3">
          {/* Stock From */}
          <div className="p-5">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Stock From Details
            </h3>
            <div className="space-y-4">
              <FieldGroup label="Society Code / Name" icon={<EntityIcon/>}>
                <ReadonlyInput value={form.societyCode}/>
              </FieldGroup>
              <FieldGroup label="Society Address" icon={<EntityIcon/>}>
                <textarea
                  rows={3}
                  value={form.societyAddress}
                  onChange={e => set("societyAddress", e.target.value)}
                  className="w-full resize-none bg-transparent px-3 py-2 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"
                />
              </FieldGroup>
              <FieldGroup label="GSTIN Number" icon={<HashIcon/>}>
                <FInput type="text" value={form.societyGstin} onChange={e => set("societyGstin", e.target.value)}/>
              </FieldGroup>
            </div>
          </div>
          {/* Stock To */}
          <div className="p-5">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Stock To Details
            </h3>
            <div className="space-y-4">
              <FieldGroup label="Product Warehouse Code / Name" icon={<LayersIcon/>}>
                <ReadonlyInput value={form.warehouseCode}/>
              </FieldGroup>
              <FieldGroup label="Product Warehouse Address" icon={<EntityIcon/>}>
                <textarea
                  rows={3}
                  value={form.warehouseAddress}
                  onChange={e => set("warehouseAddress", e.target.value)}
                  className="w-full resize-none bg-transparent px-3 py-2 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"
                />
              </FieldGroup>
              <FieldGroup label="GSTIN Number" icon={<HashIcon/>}>
                <FInput type="text" value={form.warehouseGstin} onChange={e => set("warehouseGstin", e.target.value)}/>
              </FieldGroup>
            </div>
          </div>
        </div>
      </div>

      {/* Product wise Details */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Product wise Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {["#","Product Variety Code / Name","Purchase Order Number","UOM","Ordered Unit","Dispatched Quantity","Current Dispatched Quantity","Value (₹)","Bundle Details"].map(h => (
                  <th key={h} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={9} className="py-6 text-center text-gray-400">No records found</td></tr>
              ) : rows.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke ${idx%2===0?"bg-white":"bg-[#f9fafb]"}`}>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{idx+1}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.productVariety}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.purchaseOrderNumber}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.orderedUnit}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.dispatchedQty}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.currentDispatchedQty}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{row.value.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-center">{row.bundleDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bundle Details */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Bundle Details</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
          <FieldGroup label="Total Number of Bundles" icon={<TagIcon/>}>
            <FInput type="text" value={form.totalBundles} onChange={e => set("totalBundles", e.target.value)}/>
          </FieldGroup>
          <FieldGroup label="Bundle Number" icon={<HashIcon/>}>
            <FInput type="text" value={form.bundleNumber} onChange={e => set("bundleNumber", e.target.value)}/>
          </FieldGroup>
          <FieldGroup label="Total Bundle Weight" icon={<ScaleIcon/>}>
            <FInput type="text" value={form.totalBundleWeight} onChange={e => set("totalBundleWeight", e.target.value)}/>
          </FieldGroup>
        </div>
      </div>

      {/* Transport Details */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Transport Details</h3>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FieldGroup label="Transport Service Type" icon={<TruckIcon/>}>
              <FSelect value={form.transportServiceType} onChange={e => set("transportServiceType", e.target.value)}>
                <option value="">Select</option>
                <option>Road</option><option>Rail</option><option>Air</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Transport Service Name" icon={<TruckIcon/>}>
              <FSelect value={form.transportServiceName} onChange={e => set("transportServiceName", e.target.value)}>
                <option value="">Select</option>
                <option>ABT Lorry Service</option>
                <option>VRL Logistics</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Waybill Available" icon={<EntityIcon/>}>
              <FSelect value={form.waybillAvailable} onChange={e => set("waybillAvailable", e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option><option>No</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Waybill Number" icon={<NoteIcon/>}>
              <FInput type="text" value={form.waybillNumber} onChange={e => set("waybillNumber", e.target.value)}/>
            </FieldGroup>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FieldGroup label="Transport Charge Available" icon={<LayersIcon/>}>
              <FSelect value={form.transportChargeAvailable} onChange={e => set("transportChargeAvailable", e.target.value)}>
                <option value="">Select</option>
                <option>Yes</option><option>No</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Transport Charge Type" icon={<NoteIcon/>}>
              <FSelect value={form.transportChargeType} onChange={e => set("transportChargeType", e.target.value)}>
                <option value="">Select</option>
                <option>ToPay</option><option>Paid</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Transport Charge Amount" icon={<RupeeIcon/>}>
              <FInput type="text" value={form.transportChargeAmount} onChange={e => set("transportChargeAmount", e.target.value)}/>
            </FieldGroup>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pb-4">
        <button onClick={() => router.push("/weavers/society-stock-outward/list")}
          className="flex items-center gap-2 rounded bg-[#343a40] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Cancel
        </button>
        <button className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/>
            <polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/>
          </svg>
          Save
        </button>
        <button className="flex items-center gap-2 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
          Submit
        </button>
      </div>
    </div>
  );
}
