"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const SectionIcon = () => (
  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
    <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
  </svg>
);

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || ""}</span>
    </div>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-t border-stroke py-2 text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
      <SectionIcon/> {title}
    </div>
  );
}

const DATA = {
  societyCode:          "353313/T(H) 110, ARINGNAR ANNA P.W.C.S.LTD.,",
  productCategory:      "A.J/Half Fine Silk",
  productGroup:         "31/HALF FINE SILK ITEMS",
  productVariety:       "SALB/ARNI SILK HALF FINE ZARI SAREE WITH BLOUSE",
  weaverName:           "Society 2",
  weaverIdNumber:       "",
  appraisedBy:          "userName",
  rawMaterialIssueDate: "",
  designName:           "",
  designCode:           "",
  silkWeight:           "",
  zariWeight:           "",
  silkWastageWeight:    "",
  totalProductWeight:   "",
  productLength:        "",
  productWidth:         "",
  bodyColor:            "",
  bodyDesign:           "",
  palluDesign:          "",
  zariType:             "",
  borderColor:          "",
  borderSize:           "",
  blouseAvailable:      "",
  borderType:           "",
  societyAtNumber:      "",
  appraiserQuantity:    "",
  warpCount:            "",
  weftCount:            "",
  warpWastagePercentage:"",
  weftWastagePercentage:"",
  preparatoryCharge:    "",
  printingCharge:       "",
  otherCharge:          "",
  endsPerInch:          "",
  picksPerInch:         "",
  productCost:          "10.00",
  warpYarnType:         "/",
  weftYarnType:         "/",
  atNumber:             "23456782",
};

export function generateStaticParams() {
  return [];
}

export default function ViewSocietyProductAppraiserPage() {
  const router = useRouter();
  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Society Product Appraiser</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">Weavers</li>
          <li className="text-gray-400">/</li>
          <li className="font-medium text-primary">View Society Product Appraiser</li>
        </ol></nav>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Society Product Appraiser</span>
        </div>

        <div className="px-5 pb-5">
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-x-6 border-b border-stroke sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Society Code / Name"           value={DATA.societyCode}/>
            <Field label="Product Category Code / Name"  value={DATA.productCategory}/>
            <Field label="Product Group Code / Name"     value={DATA.productGroup}/>
            <Field label="Product Variety Code / Name"   value={DATA.productVariety}/>
          </div>

          {/* Weaver Detail */}
          <SectionDivider title="Weaver Detail"/>
          <div className="grid grid-cols-1 gap-x-6 border-b border-stroke sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Weaver Name"           value={DATA.weaverName}/>
            <Field label="Weaver ID/Number"      value={DATA.weaverIdNumber}/>
            <Field label="Appraised By"          value={DATA.appraisedBy}/>
            <Field label="Raw Material Issue Date" value={DATA.rawMaterialIssueDate}/>
          </div>

          {/* Design Details */}
          <SectionDivider title="Design Details"/>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Design Name"               value={DATA.designName}/>
            <Field label="Design Code"               value={DATA.designCode}/>
            <Field label="Silk Weight(gms)"          value={DATA.silkWeight}/>
            <Field label="Zari Weight(gms) (gms)"    value={DATA.zariWeight}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Silk Wastage Weight(gms)"       value={DATA.silkWastageWeight}/>
            <Field label="Total Product Weight(gms)"      value={DATA.totalProductWeight}/>
            <Field label="Product Length(Meters) (Meters)" value={DATA.productLength}/>
            <Field label="Product Width(Meters) (Meters)"  value={DATA.productWidth}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Body Color"    value={DATA.bodyColor}/>
            <Field label="Body Design"   value={DATA.bodyDesign}/>
            <Field label="Pallu Design"  value={DATA.palluDesign}/>
            <Field label="Zari Type"     value={DATA.zariType}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Border Color"      value={DATA.borderColor}/>
            <Field label="Border Size"       value={DATA.borderSize}/>
            <Field label="Blouse Available"  value={DATA.blouseAvailable}/>
            <Field label="Border Type"       value={DATA.borderType}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 border-b border-stroke sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Society AT Number"  value={DATA.societyAtNumber}/>
            <Field label="Appraiser Quantity" value={DATA.appraiserQuantity}/>
          </div>

          {/* Warp & Weft Details */}
          <SectionDivider title="Warp & Weft Details"/>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Warp Count"               value={DATA.warpCount}/>
            <Field label="Weft Count"               value={DATA.weftCount}/>
            <Field label="Warp Wastage Percentage"  value={DATA.warpWastagePercentage}/>
            <Field label="Weft Wastage Percentage"  value={DATA.weftWastagePercentage}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Preparatory Charge"  value={DATA.preparatoryCharge}/>
            <Field label="Printing Charge"     value={DATA.printingCharge}/>
            <Field label="Other Charge"        value={DATA.otherCharge}/>
            <Field label="Ends per Inch"       value={DATA.endsPerInch}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Picks per Inch"   value={DATA.picksPerInch}/>
            <Field label="Product Cost"     value={DATA.productCost}/>
            <Field label="Warp Yarn Type"   value={DATA.warpYarnType}/>
            <Field label="Weft Yarn Type"   value={DATA.weftYarnType}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 border-b border-stroke sm:grid-cols-2 xl:grid-cols-4">
            <Field label="AT Number" value={DATA.atNumber}/>
          </div>
        </div>

        {/* Footer inside card */}
        <div className="flex justify-end px-5 py-4">
          <button onClick={() => router.back()}
            className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
