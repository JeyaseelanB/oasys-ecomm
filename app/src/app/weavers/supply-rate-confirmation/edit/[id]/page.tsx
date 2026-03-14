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
const BuildingIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);
const CartIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);
const CalWhiteIcon = () => (
  <svg className="size-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const PinIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const HashIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
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
const PercentIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);
const TrashIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
  </svg>
);

/* ═══════════════ COMPONENTS ═══════════════ */
function FieldGroup({ label, required, icon, children, calButton }: {
  label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode; calButton?: boolean;
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
        {calButton && (
          <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#17a2b8] hover:bg-[#138496]">
            <CalWhiteIcon/>
          </button>
        )}
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

interface ProductRow { id: number; productCode: string; atNumber: string; selectedBy: string; hsnCode: string; uom: string; unit: string; unitPrice: number; gstAmount: number; totalAmount: number; }

export function generateStaticParams() {
  return [];
}

export default function EditSupplyRateConfirmationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    dpOffice: "1301 / D&P OFFICE ERODE",
    productSelectedBy: "Region 1",
    validityDate: "31-Mar-2026",
    notes: "",
    warehouseCode: "2381 / PWH CHENNIMALAI",
    warehouseAddress: "15&17 PATEL STREET, INGUR ROAD, CHENNIMALAI, NAMAKKAL, TAMIL NADU - 637001",
    warehouseGstin: "33AAAAH2788P1Z8",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const [rows] = useState<ProductRow[]>([
    { id: 1, productCode: "YDCH / PL SET DHOTHY 9 X 5", atNumber: "AT-001", selectedBy: "Region 1", hsnCode: "5208", uom: "NOS", unit: "1", unitPrice: 1047.00, gstAmount: 52.35, totalAmount: 1099.35 },
    { id: 2, productCode: "ASWS / ANGAVAS SALEM WOVEN SILK", atNumber: "AT-002", selectedBy: "Region 1", hsnCode: "5007", uom: "NOS", unit: "1", unitPrice: 1330.00, gstAmount: 66.50, totalAmount: 1396.50 },
  ]);

  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const materialValue = rows.reduce((s, r) => s + r.unitPrice, 0);

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Retail Sales - Edit Supply Rate Confirmation - Society
        </h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">Weavers</li>
          <li className="text-gray-400">/</li>
          <li className="font-medium text-primary">Retail Sales - Edit Supply Rate Confirmation - Society</li>
        </ol></nav>
      </div>

      {/* Step Indicator */}
      <div className="rounded-[10px] border border-stroke bg-white px-6 py-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-[#FFA70B] bg-white text-sm font-bold text-[#FFA70B]">1</div>
            <span className="text-xs font-medium text-dark dark:text-white">Supply Rate Confirmation Creation</span>
          </div>
          <div className="mx-4 flex-1 border-t border-dashed border-gray-300 dark:border-dark-3"/>
          <div className="flex flex-col items-center gap-1">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-400 dark:border-dark-3">2</div>
            <span className="text-xs text-gray-400">Supply Rate Confirmation Approval</span>
          </div>
        </div>
      </div>

      {/* D&P Office Details Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">D&P Office Details</span>
          <span className="flex items-center gap-4">
            <span className="text-xs text-white/80">( Mandatory Fields)</span>
            <button className="text-white/80 hover:text-white text-lg font-bold leading-none">—</button>
          </span>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FieldGroup label="D&P Office Code / Name" required icon={<BuildingIcon/>}>
              <FSelect value={form.dpOffice} onChange={e => set("dpOffice", e.target.value)}>
                <option value="">Select</option>
                <option>1301 / D&P OFFICE ERODE</option>
                <option>1201 / D&P OFFICE SALEM</option>
                <option>1101 / D&P OFFICE CHENNAI</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Product Selected By - Region Code / Name" required icon={<CartIcon/>}>
              <FSelect value={form.productSelectedBy} onChange={e => set("productSelectedBy", e.target.value)}>
                <option value="">0 Person Selected</option>
                <option>Region 1</option>
                <option>Region 2</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Supply Rate Confirmation Validity Date" icon={<HashIcon/>} calButton>
              <FInput type="text" placeholder="dd-MMM-yyyy" value={form.validityDate} onChange={e => set("validityDate", e.target.value)}/>
            </FieldGroup>
          </div>
          <div className="mt-3">
            <textarea
              rows={3}
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              className="w-full resize-none rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none placeholder:text-gray-400 focus:border-[#17a2b8] dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
          <div className="mt-3 flex justify-end gap-3">
            <button onClick={() => router.push("/weavers/supply-rate-confirmation/list")}
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

      {/* Supplier Details / Buyer Details */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="grid grid-cols-1 divide-y divide-stroke lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-dark-3">
          {/* Supplier Details */}
          <div className="p-5">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Supplier Details
            </h3>
            <div className="space-y-4">
              <FieldGroup label="Society Code / Name" icon={<PinIcon/>}>
                <ReadonlyInput value="3S3313/T(H) 110, ARINGNA..."/>
              </FieldGroup>
              <FieldGroup label="Society Address" icon={<PinIcon/>}>
                <textarea
                  rows={4}
                  defaultValue={"NO.39,B-6,K.O.N.THRATRE ROAD,\nKOMARAPALAYAM-638 183,\nNAMAKKAL DISTRICT,\nSALEM,\nTAMIL NADUIndia"}
                  readOnly
                  className="w-full resize-none bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:bg-dark-2 dark:text-white"
                />
              </FieldGroup>
              <FieldGroup label="GSTIN Number" icon={<HashIcon/>}>
                <ReadonlyInput value="33AAAA9242K 1ZU"/>
              </FieldGroup>
            </div>
          </div>
          {/* Buyer Details */}
          <div className="p-5">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Buyer Details
            </h3>
            <div className="space-y-4">
              <FieldGroup label="Product Warehouse Code / Name" icon={<PinIcon/>}>
                <FSelect value={form.warehouseCode} onChange={e => set("warehouseCode", e.target.value)}>
                  <option value=""></option>
                  <option>2381 / PWH CHENNIMALAI</option>
                  <option>1881 / PWH - SALEM</option>
                </FSelect>
              </FieldGroup>
              <FieldGroup label="Product Warehouse Address" icon={<PinIcon/>}>
                <textarea
                  rows={4}
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

      {/* Product Details */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> Product Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {["#","Product Variety Code","AT Number","Selected By","HSN Code","UOM","Unit","Unit Price (₹)","GST Amount (₹)","Total Amount (₹)","Action"].map(h => (
                  <th key={h} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke ${idx%2===0?"bg-white":"bg-[#f9fafb]"} hover:bg-blue-50`}>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{idx+1}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.productCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.atNumber}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.selectedBy}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.hsnCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.unit}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{fmt(row.unitPrice)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{fmt(row.gstAmount)}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{fmt(row.totalAmount)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <button className="mx-auto flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90">
                      <TrashIcon/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
          <span className="text-sm font-medium text-dark dark:text-white">
            Material Value(Without Tax):&nbsp;
            <span className="inline-block min-w-[100px] rounded border border-stroke bg-gray-50 px-3 py-1 text-sm dark:border-dark-3 dark:bg-dark-2">
              {fmt(materialValue)}
            </span>
          </span>
        </div>
      </div>

      {/* GST Summary */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white"><SectionIcon/> GST Summary</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-3">
          {/* GST Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  {["HSN Code","Unit","Tax (%)","CGST (₹)","SGST (₹)","Total Tax Amount (₹)"].map(h => (
                    <th key={h} className="border border-[#3aa88f] px-2 py-2 text-center text-xs font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b border-stroke bg-white`}>
                  <td className="border-r border-stroke px-2 py-2 text-center">5208</td>
                  <td className="border-r border-stroke px-2 py-2 text-center">1</td>
                  <td className="border-r border-stroke px-2 py-2 text-center">5%</td>
                  <td className="border-r border-stroke px-2 py-2 text-right">26.18</td>
                  <td className="border-r border-stroke px-2 py-2 text-right">26.18</td>
                  <td className="px-2 py-2 text-right">52.35</td>
                </tr>
                <tr className={`border-b border-stroke bg-[#f9fafb]`}>
                  <td className="border-r border-stroke px-2 py-2 text-center">5007</td>
                  <td className="border-r border-stroke px-2 py-2 text-center">1</td>
                  <td className="border-r border-stroke px-2 py-2 text-center">5%</td>
                  <td className="border-r border-stroke px-2 py-2 text-right">33.25</td>
                  <td className="border-r border-stroke px-2 py-2 text-right">33.25</td>
                  <td className="px-2 py-2 text-right">66.50</td>
                </tr>
                <tr className="bg-[#f0f0f0] dark:bg-dark-2 font-semibold">
                  <td colSpan={3} className="border-r border-t border-stroke px-2 py-2 text-center">Total</td>
                  <td className="border-r border-t border-stroke px-2 py-2 text-right">59.43</td>
                  <td className="border-r border-t border-stroke px-2 py-2 text-right">59.43</td>
                  <td className="border-t border-stroke px-2 py-2 text-right">118.85</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Certified Terms */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-dark dark:text-white">Certified Terms</label>
            <textarea rows={6} defaultValue="We certify that the prices shown in this invoice are the lowest prices charged by us to any customer for similar products during the period." className="w-full resize-none rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-[#17a2b8] dark:border-dark-3 dark:text-white"/>
          </div>
          {/* Right totals panel */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {[
                  ["Material Value (Without Tax)", fmt(materialValue)],
                  ["GST Amount", "118.85"],
                  ["Total Value (With Tax)", fmt(materialValue + 118.85)],
                ].map(([label, val]) => (
                  <tr key={label} className="border-b border-stroke">
                    <td className="px-3 py-2.5 text-sm text-dark dark:text-white">{label}</td>
                    <td className="px-3 py-2.5 text-right text-sm font-medium text-dark dark:text-white">₹ {val}</td>
                  </tr>
                ))}
                <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                  <td className="border-t border-stroke px-3 py-2 text-sm">Grand Total</td>
                  <td className="border-t border-stroke px-3 py-2 text-right text-sm">₹ {fmt(materialValue + 118.85)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pb-4">
        <button onClick={() => router.push("/weavers/supply-rate-confirmation/list")}
          className="flex items-center gap-2 rounded bg-[#343a40] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
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
