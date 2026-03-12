/* ═══════════════════════════════════════════
   EDIT SUPPLY RATE CONFIRMATION
   File: edit-supply-rate-confirmation.tsx
═══════════════════════════════════════════ */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
const CalIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const RupeeIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 3h12M6 8h12M6 13l8 8M6 13h3a4 4 0 000-8"/>
  </svg>
);
const PercentIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);
const LayersIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7 12,2"/>
    <polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/>
  </svg>
);
const TrashIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
  </svg>
);

function FieldGroup({ label, required, icon, children }: { label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-dark dark:text-white">{label}{required && <span className="ml-0.5 text-red-500">*</span>}</label>
      <div className="flex items-center overflow-hidden rounded border border-stroke bg-white focus-within:border-[#17a2b8] dark:border-dark-3 dark:bg-gray-dark">
        {icon && <span className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">{icon}</span>}
        {children}
      </div>
    </div>
  );
}
function FInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="h-10 w-full bg-transparent px-3 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"/>;
}
function FSelect({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="h-10 w-full bg-transparent px-3 text-sm text-dark outline-none dark:bg-gray-dark dark:text-white">{children}</select>;
}

interface RateRow { id: number; dpCode: string; productCode: string; warehouse: string; uom: string; supplyRate: number; taxPercent: number; effectiveFrom: string; effectiveTo: string; }

export default function EditSupplyRateConfirmationPage() {
  const router = useRouter();
  const [form, setForm] = useState({ confirmationNumber: "SRC-1001", societyCode: "KPM / Kanchipuram Society", confirmationDate: "01-Mar-2026", dpCode: "", productCode: "", warehouse: "", uom: "", supplyRate: "", taxPercent: "", effectiveFrom: "", effectiveTo: "" });
  const [rows, setRows] = useState<RateRow[]>([
    { id: 1, dpCode: "DP001 / Dhothy Product", productCode: "YDCH / PL SET DHOTHY 9 X 5", warehouse: "WH01 / Chennai Warehouse", uom: "NOS", supplyRate: 1047.00, taxPercent: 5.00, effectiveFrom: "01-Jan-2026", effectiveTo: "31-Mar-2026" },
    { id: 2, dpCode: "DP002 / Silk Saree",     productCode: "ASWS / ANGAVAS SALEM WOVEN SILK", warehouse: "WH02 / Salem Warehouse", uom: "NOS", supplyRate: 1330.00, taxPercent: 5.00, effectiveFrom: "01-Jan-2026", effectiveTo: "31-Mar-2026" },
  ]);
  const [nextId, setNextId] = useState(3);

  const handleAddItem = () => {
    if (!form.dpCode || !form.productCode || !form.supplyRate) return;
    setRows(prev => [...prev, { id: nextId, dpCode: form.dpCode, productCode: form.productCode, warehouse: form.warehouse, uom: form.uom || "NOS", supplyRate: parseFloat(form.supplyRate)||0, taxPercent: parseFloat(form.taxPercent)||0, effectiveFrom: form.effectiveFrom, effectiveTo: form.effectiveTo }]);
    setNextId(n => n+1);
    setForm(f => ({ ...f, dpCode: "", productCode: "", warehouse: "", uom: "", supplyRate: "", taxPercent: "", effectiveFrom: "", effectiveTo: "" }));
  };
  const handleDelete = (id: number) => setRows(prev => prev.filter(r => r.id !== id));
  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="mx-auto space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Supply Rate Confirmation</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li><li className="text-gray-500">Weavers</li>
          <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Supply Rate Confirmation</li>
        </ol></nav>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="flex items-center gap-2 font-semibold text-white"><SectionIcon/>Supply Rate Confirmation</span>
          <span className="text-xs text-white/80">( * Mandatory Fields)</span>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FieldGroup label="Confirmation Number" required icon={<HashIcon/>}><FInput type="text" value={form.confirmationNumber} onChange={e => setForm(f => ({ ...f, confirmationNumber: e.target.value }))}/></FieldGroup>
            <FieldGroup label="Society Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.societyCode} onChange={e => setForm(f => ({ ...f, societyCode: e.target.value }))}>
                <option>KPM / Kanchipuram Society</option><option>SLM / Salem Society</option>
                <option>MDU / Madurai Society</option><option>CBE / Coimbatore Society</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Confirmation Date" required icon={<CalIcon/>}><FInput type="text" value={form.confirmationDate} onChange={e => setForm(f => ({ ...f, confirmationDate: e.target.value }))} placeholder="dd-MMM-yyyy"/></FieldGroup>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Add Rate Details</h3>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FieldGroup label="D&P Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.dpCode} onChange={e => setForm(f => ({ ...f, dpCode: e.target.value }))}>
                <option value="">Select</option><option>DP001 / Dhothy Product</option>
                <option>DP002 / Silk Saree</option><option>DP003 / Cotton Saree</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Product Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.productCode} onChange={e => setForm(f => ({ ...f, productCode: e.target.value }))}>
                <option value="">Select</option><option>YDCH / PL SET DHOTHY 9 X 5</option>
                <option>SSEB / SAREES SALEM 80S WITH BLOUSE</option><option>ASWS / ANGAVAS SALEM WOVEN SILK</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Product Warehouse" required icon={<LayersIcon/>}>
              <FSelect value={form.warehouse} onChange={e => setForm(f => ({ ...f, warehouse: e.target.value }))}>
                <option value="">Select</option><option>WH01 / Chennai Warehouse</option>
                <option>WH02 / Salem Warehouse</option><option>WH03 / Madurai Warehouse</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="UOM" required icon={<LayersIcon/>}>
              <FSelect value={form.uom} onChange={e => setForm(f => ({ ...f, uom: e.target.value }))}>
                <option value="">Select</option><option>NOS</option><option>MTR</option><option>KGS</option>
              </FSelect>
            </FieldGroup>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FieldGroup label="Supply Rate (₹)" required icon={<RupeeIcon/>}><FInput type="number" placeholder="0.00" value={form.supplyRate} onChange={e => setForm(f => ({ ...f, supplyRate: e.target.value }))}/></FieldGroup>
            <FieldGroup label="Tax (%)" icon={<PercentIcon/>}><FInput type="number" placeholder="0.00" value={form.taxPercent} onChange={e => setForm(f => ({ ...f, taxPercent: e.target.value }))}/></FieldGroup>
            <FieldGroup label="Effective From" required icon={<CalIcon/>}><FInput type="text" placeholder="dd-MMM-yyyy" value={form.effectiveFrom} onChange={e => setForm(f => ({ ...f, effectiveFrom: e.target.value }))}/></FieldGroup>
            <FieldGroup label="Effective To" required icon={<CalIcon/>}><FInput type="text" placeholder="dd-MMM-yyyy" value={form.effectiveTo} onChange={e => setForm(f => ({ ...f, effectiveTo: e.target.value }))}/></FieldGroup>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setForm(f => ({ ...f, dpCode: "", productCode: "", warehouse: "", uom: "", supplyRate: "", taxPercent: "", effectiveFrom: "", effectiveTo: "" }))}
              className="flex items-center gap-1.5 rounded bg-[#5a6268] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>Clear
            </button>
            <button onClick={handleAddItem} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>Add
            </button>
          </div>
        </div>
        <div className="border-t border-stroke px-5 pb-1 pt-3 dark:border-dark-3">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Rate Details</h3>
        </div>
        <div className="overflow-x-auto pb-2">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {["#","D&P Code / Name","Product Code / Name","Warehouse","UOM","Supply Rate (₹)","Tax (%)","Effective From","Effective To","Action"].map(h => (
                  <th key={h} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke ${idx%2===0?"bg-white":"bg-[#f9fafb]"} hover:bg-blue-50`}>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{idx+1}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.dpCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.productCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.warehouse}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{fmt(row.supplyRate)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{fmt(row.taxPercent)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.effectiveFrom}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.effectiveTo}</td>
                  <td className="px-3 py-2.5 text-center">
                    <button onClick={() => handleDelete(row.id)} className="flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90 mx-auto"><TrashIcon/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3 pb-4">
        <button onClick={() => router.push("/weavers/supply-rate-confirmation/list")}
          className="flex items-center gap-2 rounded bg-[#5a6268] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
        </button>
        <button className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>Update
        </button>
      </div>
    </div>
  );
}