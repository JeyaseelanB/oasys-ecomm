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
const CalIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const LayersIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7 12,2"/>
    <polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/>
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
const NoteIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>
  </svg>
);

function FieldGroup({ label, required, icon, children }: {
  label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-dark dark:text-white">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
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
function FTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={3} className="w-full bg-transparent px-3 py-2 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white resize-none"/>;
}

interface StockItem {
  id: number; productCode: string; batchNumber: string;
  uom: string; quantity: number; rate: number; totalAmount: number; remarks: string;
}

export default function EditSocietyStockOutwardPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    dpOfficeCode:    "DP01 / Chennai DP Office",
    societyCode:     "KPM / Kanchipuram Society",
    outwardTo:       "WH01 / Chennai Warehouse",
    outwardDate:     "05-Mar-2026",
    referenceNumber: "CH-2026-0312",
    remarks:         "Monthly stock dispatch",
    productCode:     "",
    batchNumber:     "",
    uom:             "",
    quantity:        "",
    rate:            "",
    itemRemarks:     "",
  });

  const [rows, setRows] = useState<StockItem[]>([
    { id: 1, productCode: "YDCH / PL SET DHOTHY 9 X 5",      batchNumber: "B001", uom: "NOS", quantity: 50,  rate: 1047.00, totalAmount: 52350.00, remarks: "" },
    { id: 2, productCode: "SSEB / SAREES SALEM 80S WITH BLOUSE", batchNumber: "B002", uom: "NOS", quantity: 30,  rate: 880.00,  totalAmount: 26400.00, remarks: "Express" },
    { id: 3, productCode: "ASWS / ANGAVAS SALEM WOVEN SILK",  batchNumber: "B003", uom: "NOS", quantity: 20,  rate: 1330.00, totalAmount: 26600.00, remarks: "" },
  ]);
  const [nextId, setNextId] = useState(4);

  const handleAdd = () => {
    if (!form.productCode || !form.quantity) return;
    const qty  = parseFloat(form.quantity) || 0;
    const rate = parseFloat(form.rate) || 0;
    setRows(prev => [...prev, { id: nextId, productCode: form.productCode, batchNumber: form.batchNumber, uom: form.uom || "NOS", quantity: qty, rate, totalAmount: qty * rate, remarks: form.itemRemarks }]);
    setNextId(n => n + 1);
    setForm(f => ({ ...f, productCode: "", batchNumber: "", uom: "", quantity: "", rate: "", itemRemarks: "" }));
  };

  const handleDelete = (id: number) => setRows(prev => prev.filter(r => r.id !== id));
  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const totalQty = rows.reduce((s, r) => s + r.quantity, 0);
  const totalAmt = rows.reduce((s, r) => s + r.totalAmount, 0);

  return (
    <div className="mx-auto space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Society Stock Outward</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">Weavers</li>
          <li className="text-gray-400">/</li>
          <li className="font-medium text-primary">Edit Society Stock Outward</li>
        </ol></nav>
      </div>

      {/* Section 1 */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="flex items-center gap-2 font-semibold text-white"><SectionIcon/>Society Stock Outward</span>
          <span className="text-xs text-white/80">( * Mandatory Fields)</span>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FieldGroup label="DP Office Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.dpOfficeCode} onChange={e => setForm(f => ({ ...f, dpOfficeCode: e.target.value }))}>
                <option>DP01 / Chennai DP Office</option><option>DP02 / Salem DP Office</option>
                <option>DP03 / Madurai DP Office</option><option>DP04 / Coimbatore DP Office</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Society Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.societyCode} onChange={e => setForm(f => ({ ...f, societyCode: e.target.value }))}>
                <option>KPM / Kanchipuram Society</option><option>SLM / Salem Society</option>
                <option>MDU / Madurai Society</option><option>CBE / Coimbatore Society</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Stock Outward To" required icon={<EntityIcon/>}>
              <FSelect value={form.outwardTo} onChange={e => setForm(f => ({ ...f, outwardTo: e.target.value }))}>
                <option>WH01 / Chennai Warehouse</option><option>WH02 / Salem Warehouse</option>
                <option>WH03 / Madurai Warehouse</option><option>DIRECT / Direct Sale</option>
              </FSelect>
            </FieldGroup>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FieldGroup label="Outward Date" required icon={<CalIcon/>}>
              <FInput type="text" value={form.outwardDate} onChange={e => setForm(f => ({ ...f, outwardDate: e.target.value }))} placeholder="dd-MMM-yyyy"/>
            </FieldGroup>
            <FieldGroup label="Reference Number" icon={<NoteIcon/>}>
              <FInput type="text" value={form.referenceNumber} onChange={e => setForm(f => ({ ...f, referenceNumber: e.target.value }))}/>
            </FieldGroup>
          </div>
          <FieldGroup label="Remarks" icon={<NoteIcon/>}>
            <FTextarea value={form.remarks} onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))}/>
          </FieldGroup>
        </div>
      </div>

      {/* Section 2 */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Add Stock Item Details</h3>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FieldGroup label="Product Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.productCode} onChange={e => setForm(f => ({ ...f, productCode: e.target.value }))}>
                <option value="">Select</option>
                <option>YDCH / PL SET DHOTHY 9 X 5</option>
                <option>SSEB / SAREES SALEM 80S WITH BLOUSE</option>
                <option>ASWS / ANGAVAS SALEM WOVEN SILK</option>
                <option>CS001 / COTTON SAREE PLAIN</option>
                <option>TW100 / TOWEL 30X60</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Batch Number" icon={<LayersIcon/>}>
              <FInput type="text" placeholder="Batch No." value={form.batchNumber} onChange={e => setForm(f => ({ ...f, batchNumber: e.target.value }))}/>
            </FieldGroup>
            <FieldGroup label="UOM" required icon={<LayersIcon/>}>
              <FSelect value={form.uom} onChange={e => setForm(f => ({ ...f, uom: e.target.value }))}>
                <option value="">Select</option>
                <option>NOS</option><option>MTR</option><option>KGS</option><option>SET</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Quantity" required icon={<LayersIcon/>}>
              <FInput type="number" placeholder="0.00" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}/>
            </FieldGroup>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FieldGroup label="Rate (₹)" icon={<RupeeIcon/>}>
              <FInput type="number" placeholder="0.00" value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))}/>
            </FieldGroup>
            <FieldGroup label="Item Remarks" icon={<NoteIcon/>}>
              <FInput type="text" placeholder="Item remarks" value={form.itemRemarks} onChange={e => setForm(f => ({ ...f, itemRemarks: e.target.value }))}/>
            </FieldGroup>
            <div className="flex items-end gap-2 pb-0.5">
              <button onClick={() => setForm(f => ({ ...f, productCode: "", batchNumber: "", uom: "", quantity: "", rate: "", itemRemarks: "" }))}
                className="flex items-center gap-1.5 rounded bg-[#5a6268] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>Clear
              </button>
              <button onClick={handleAdd} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>Add
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stroke px-5 pb-1 pt-3 dark:border-dark-3">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Stock Item Details</h3>
        </div>
        <div className="overflow-x-auto pb-2">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {["#","Product Code / Name","Batch No.","UOM","Quantity","Rate (₹)","Total Amount (₹)","Remarks","Action"].map(h => (
                  <th key={h} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx%2===0?"bg-white dark:bg-gray-dark":"bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50`}>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{idx+1}</td>
                  <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.productCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.batchNumber || "—"}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.quantity)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.rate)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(row.totalAmount)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.remarks || "—"}</td>
                  <td className="px-3 py-2.5 text-center">
                    <button onClick={() => handleDelete(row.id)} className="mx-auto flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90"><TrashIcon/></button>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                <td colSpan={4} className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">Total</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalQty)}</td>
                <td className="border-r border-t border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">{fmt(totalAmt)}</td>
                <td colSpan={2} className="border-t border-stroke dark:border-dark-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3 pb-4">
        <button onClick={() => router.push("/weavers/society-stock-outward/list")}
          className="flex items-center gap-2 rounded bg-[#5a6268] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Cancel
        </button>
        <button className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
          Update
        </button>
      </div>
    </div>
  );
}
