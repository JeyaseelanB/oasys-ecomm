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
const LayersIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7 12,2"/>
    <polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/>
  </svg>
);
const GridIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
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
  <svg className="size-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ScaleIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);
const RulerIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="12"/>
    <line x1="14" y1="10" x2="14" y2="14"/><line x1="18" y1="10" x2="18" y2="12"/>
  </svg>
);
const PaletteIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/>
    <circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);
const PencilIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const ListIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const BoxIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
  </svg>
);
const PercentIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="19" y1="5" x2="5" y2="19"/>
    <circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);
const RupeeIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 3h12M6 8h12M6 13l8 8M6 13h3a4 4 0 000-8"/>
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
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
            {icon}
          </span>
        )}
        {children}
        {calButton && (
          <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#17a2b8] hover:bg-[#138496]">
            <CalIcon/>
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
  return (
    <select {...props} className="h-10 w-full bg-transparent px-3 text-sm text-dark outline-none dark:bg-gray-dark dark:text-white">
      {children}
    </select>
  );
}
function NumInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input type="number" value={value} onChange={e => onChange(e.target.value)} className="h-10 w-full bg-transparent px-3 text-right text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"/>;
}

export function generateStaticParams() {
  return [];
}

export default function EditSocietyProductAppraiserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    productCategory: "A.J / Half Fine Silk", productGroup: "31 / HALF FINE SILK ITEMS",
    productVariety: "SALB / ARNI SILK HALF FINE ZARI SAREE WITH BLOUSE",
    weaverName: "Society 2", weaverIdNumber: "", appraisedBy: "userName", societyAtNumber: "",
    appraiserQuantity: "1.0", rawMaterialIssueDate: "",
    designName: "", designCode: "",
    silkWeight: "0.00", zariWeight: "0.00", silkWastageWeight: "0.00",
    totalProductWeight: "0.00", productLength: "0.00", productWidth: "0.00",
    bodyColor: "", bodyDesign: "", palluDesign: "", zariType: "",
    borderColor: "", borderSize: "", blouseAvailable: "", borderType: "",
    warpCount: "", weftCount: "", warpWastagePercentage: "", weftWastagePercentage: "",
    preparatoryCharge: "", printingCharge: "", otherCharge: "", endsPerInch: "",
    picksPerInch: "", productCost: "10.00", warpYarnType: "", weftYarnType: "",
  });
  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Society Product Appraiser</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">Weavers</li>
          <li className="text-gray-400">/</li>
          <li className="font-medium text-primary">Edit Society Product Appraiser</li>
        </ol></nav>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Society Product Appraiser</span>
          <span className="text-xs text-white/80">( Mandatory Fields)</span>
        </div>

        <div className="space-y-6 p-5">
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FieldGroup label="Society Code / Name" required icon={<BuildingIcon/>}>
              <FInput type="text" value="353313 / T(H) 110, ARINGNAR ANNA P.W.C.S.LTD.," readOnly className="h-10 w-full cursor-not-allowed bg-gray-50 px-3 text-sm text-dark outline-none dark:bg-dark-2 dark:text-white"/>
            </FieldGroup>
            <FieldGroup label="Product Category Code / Name" required icon={<LayersIcon/>}>
              <FSelect value={form.productCategory} onChange={e => set("productCategory", e.target.value)}>
                <option value="">Select</option>
                <option>A.J / Half Fine Silk</option>
                <option>B.K / Full Fine Silk</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Product Group Code / Name" required icon={<GridIcon/>}>
              <FSelect value={form.productGroup} onChange={e => set("productGroup", e.target.value)}>
                <option value="">Select</option>
                <option>31 / HALF FINE SILK ITEMS</option>
                <option>32 / FULL FINE SILK ITEMS</option>
              </FSelect>
            </FieldGroup>
            <FieldGroup label="Product Variety Code / Name" required icon={<EntityIcon/>}>
              <FSelect value={form.productVariety} onChange={e => set("productVariety", e.target.value)}>
                <option value="">Select</option>
                <option>SALB / ARNI SILK HALF FINE ZARI SAREE WITH BLOUSE</option>
                <option>ASWS / ANGAVAS SALEM WOVEN SILK P...</option>
              </FSelect>
            </FieldGroup>
          </div>

          {/* Weaver Detail */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Weaver Detail
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Weaver Name" required icon={<EntityIcon/>}>
                <FInput type="text" value={form.weaverName} onChange={e => set("weaverName", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Weaver ID/Number" required icon={<HashIcon/>}>
                <FInput type="text" value={form.weaverIdNumber} onChange={e => set("weaverIdNumber", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Appraised By" required icon={<EntityIcon/>}>
                <FInput type="text" value={form.appraisedBy} onChange={e => set("appraisedBy", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Society AT Number" icon={<HashIcon/>}>
                <FInput type="text" value={form.societyAtNumber} onChange={e => set("societyAtNumber", e.target.value)}/>
              </FieldGroup>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Appraiser Quantity" icon={<ScaleIcon/>}>
                <NumInput value={form.appraiserQuantity} onChange={v => set("appraiserQuantity", v)}/>
              </FieldGroup>
              <FieldGroup label="Raw Material Issue Date" icon={<HashIcon/>} calButton>
                <FInput type="text" placeholder="dd-MMM-yyyy" value={form.rawMaterialIssueDate} onChange={e => set("rawMaterialIssueDate", e.target.value)}/>
              </FieldGroup>
            </div>
          </div>

          {/* Design Details */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Design Details
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Design Name" required icon={<HashIcon/>}>
                <FSelect value={form.designName} onChange={e => set("designName", e.target.value)}>
                  <option value="">Select</option>
                  <option>Design A</option><option>Design B</option>
                </FSelect>
              </FieldGroup>
              <FieldGroup label="Design Code" required icon={<HashIcon/>}>
                <FInput type="text" value={form.designCode} onChange={e => set("designCode", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Silk Weight(gms)" required icon={<ScaleIcon/>}>
                <NumInput value={form.silkWeight} onChange={v => set("silkWeight", v)}/>
              </FieldGroup>
              <FieldGroup label="Zari Weight(gms)" required icon={<ScaleIcon/>}>
                <NumInput value={form.zariWeight} onChange={v => set("zariWeight", v)}/>
              </FieldGroup>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Silk Wastage Weight(gms)" required icon={<ScaleIcon/>}>
                <NumInput value={form.silkWastageWeight} onChange={v => set("silkWastageWeight", v)}/>
              </FieldGroup>
              <FieldGroup label="Total Product Weight(gms)" required icon={<ScaleIcon/>}>
                <NumInput value={form.totalProductWeight} onChange={v => set("totalProductWeight", v)}/>
              </FieldGroup>
              <FieldGroup label="Product Length(Meters)" required icon={<RulerIcon/>}>
                <NumInput value={form.productLength} onChange={v => set("productLength", v)}/>
              </FieldGroup>
              <FieldGroup label="Product Width(Meters)" required icon={<RulerIcon/>}>
                <NumInput value={form.productWidth} onChange={v => set("productWidth", v)}/>
              </FieldGroup>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Body Color" required icon={<PaletteIcon/>}>
                <FInput type="text" value={form.bodyColor} onChange={e => set("bodyColor", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Body Design" required icon={<PencilIcon/>}>
                <FInput type="text" value={form.bodyDesign} onChange={e => set("bodyDesign", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Pallu Design" required icon={<PencilIcon/>}>
                <FInput type="text" value={form.palluDesign} onChange={e => set("palluDesign", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Zari Type" required icon={<ListIcon/>}>
                <FInput type="text" value={form.zariType} onChange={e => set("zariType", e.target.value)}/>
              </FieldGroup>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Border Color" required icon={<BoxIcon/>}>
                <FInput type="text" value={form.borderColor} onChange={e => set("borderColor", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Border Size" required icon={<ScaleIcon/>}>
                <FInput type="text" value={form.borderSize} onChange={e => set("borderSize", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Blouse Available" required icon={<EntityIcon/>}>
                <FSelect value={form.blouseAvailable} onChange={e => set("blouseAvailable", e.target.value)}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </FSelect>
              </FieldGroup>
              <FieldGroup label="Border Type" required icon={<ListIcon/>}>
                <FSelect value={form.borderType} onChange={e => set("borderType", e.target.value)}>
                  <option value="">Select</option>
                  <option>Type A</option><option>Type B</option>
                </FSelect>
              </FieldGroup>
            </div>
          </div>

          {/* Warp & Weft Details */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Warp & Weft Details
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Warp Count" icon={<GridIcon/>}>
                <FInput type="text" value={form.warpCount} onChange={e => set("warpCount", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Weft Count" icon={<GridIcon/>}>
                <FInput type="text" value={form.weftCount} onChange={e => set("weftCount", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Warp Wastage Percentage" icon={<PercentIcon/>}>
                <FInput type="text" value={form.warpWastagePercentage} onChange={e => set("warpWastagePercentage", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Weft Wastage Percentage" icon={<PercentIcon/>}>
                <FInput type="text" value={form.weftWastagePercentage} onChange={e => set("weftWastagePercentage", e.target.value)}/>
              </FieldGroup>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Preparatory Charge" icon={<RupeeIcon/>}>
                <FInput type="text" value={form.preparatoryCharge} onChange={e => set("preparatoryCharge", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Printing Charge" icon={<RupeeIcon/>}>
                <FInput type="text" value={form.printingCharge} onChange={e => set("printingCharge", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Other Charge" icon={<RupeeIcon/>}>
                <FInput type="text" value={form.otherCharge} onChange={e => set("otherCharge", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Ends per Inch" icon={<ScaleIcon/>}>
                <FInput type="text" value={form.endsPerInch} onChange={e => set("endsPerInch", e.target.value)}/>
              </FieldGroup>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FieldGroup label="Picks per Inch" icon={<ScaleIcon/>}>
                <FInput type="text" value={form.picksPerInch} onChange={e => set("picksPerInch", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Product Cost" required icon={<RupeeIcon/>}>
                <FInput type="text" value={form.productCost} onChange={e => set("productCost", e.target.value)}/>
              </FieldGroup>
              <FieldGroup label="Warp Yarn Type" icon={<EntityIcon/>}>
                <FSelect value={form.warpYarnType} onChange={e => set("warpYarnType", e.target.value)}>
                  <option value="">Select</option>
                  <option>Type A</option><option>Type B</option>
                </FSelect>
              </FieldGroup>
              <FieldGroup label="Weft Yarn Type" icon={<EntityIcon/>}>
                <FSelect value={form.weftYarnType} onChange={e => set("weftYarnType", e.target.value)}>
                  <option value="">Select</option>
                  <option>Type A</option><option>Type B</option>
                </FSelect>
              </FieldGroup>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pb-4">
        <button className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          View
        </button>
        <div className="flex gap-3">
          <button onClick={() => router.push("/weavers/society-product-appraisal/list")}
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
    </div>
  );
}
