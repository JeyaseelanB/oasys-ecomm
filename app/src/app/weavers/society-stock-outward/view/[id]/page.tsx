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

const DATA = {
  dpOffice:         "1301 / D&P OFFICE ERODE",
  shippingTo:       "2381 / PWH CHENNIMALAI",
  purchaseOrderNumber: "",
  createdDate:      "09-Mar-2026",
  createdBy:        "",
  status:           "SUBMITTED",
  societyCode:      "353313 / T(H) 110, ARINGNAR ANNA P.W.C.S.LTD.,",
  societyAddress:   "NO.39,B-6,K.O.N.THRATRE ROAD, KOMARAPALAYAM-638 183, NAMAKKAL DISTRICT, SALEM, TAMIL NADUIndia",
  societyGstin:     "33AAAA9242K 1ZU",
  warehouseCode:    "2381 / PWH CHENNIMALAI",
  warehouseAddress: "15&17 PATEL STREET, INGUR ROAD, CHENNIMALAI, NAMAKKAL, TAMIL NADU - 637001",
  warehouseGstin:   "33AAAAH2788P1Z8",
  totalBundles:     "",
  totalBundleWeight:"",
  bundleNumber:     "",
  transportServiceType:     "",
  transportServiceName:     "ABT Lorry Service",
  waybillAvailable:         "Yes",
  waybillNumber:            "7892",
  transportChargeAvailable: "Yes",
  transportChargeType:      "ToPay",
  transportChargeAmount:    "200.0",
  items: [
    { id: 1, productVariety: "ASWS / ANGAVAS SALEM WOVEN SILK PURE SILK", purchaseOrderNumber: "-", uom: "NOS", orderedUnit: "", dispatchedQty: "1", currentDispatchedQty: "", value: "0.00" },
    { id: 2, productVariety: "SALB / ARNI SILK HALF FINE ZARI SAREE WITH BLOUSE", purchaseOrderNumber: "-", uom: "NOS", orderedUnit: "", dispatchedQty: "1", currentDispatchedQty: "", value: "0.00" },
  ],
};

export default function ViewSocietyStockOutwardPage() {
  const router = useRouter();
  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Society Stock Outward</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">Weavers</li>
          <li className="text-gray-400">/</li>
          <li className="font-medium text-primary">View Society Stock Outward</li>
        </ol></nav>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Society Stock Outward</span>
          <button className="text-white/80 hover:text-white text-lg font-bold leading-none">—</button>
        </div>

        <div className="px-5 pb-2">
          {/* Top fields */}
          <div className="grid grid-cols-1 gap-x-6 border-b border-stroke sm:grid-cols-2 xl:grid-cols-4">
            <Field label="D&P Office Code / Name"      value={DATA.dpOffice}/>
            <Field label="Shipping To"                  value={DATA.shippingTo}/>
            <Field label="Purchase Order Number"        value={DATA.purchaseOrderNumber}/>
            <Field label="Created Date / Created Time"  value={DATA.createdDate}/>
          </div>
          <div className="grid grid-cols-1 gap-x-6 border-b border-stroke sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Created By" value={DATA.createdBy}/>
            <div className="flex flex-col gap-0.5 py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
              <span className="text-sm font-medium text-[#17a2b8]">{DATA.status}</span>
            </div>
          </div>

          {/* Stock From / Stock To */}
          <div className="grid grid-cols-1 divide-y divide-stroke border-b border-stroke py-2 lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-dark-3 dark:border-dark-3">
            {/* Stock From */}
            <div className="pb-4 pr-0 pt-2 lg:pr-6">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <SectionIcon/> Stock From Details
              </h3>
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <Field label="Society Code / Name" value={DATA.societyCode}/>
                <Field label="Society Address"      value={DATA.societyAddress}/>
              </div>
              <Field label="GSTIN Number" value={DATA.societyGstin}/>
            </div>
            {/* Stock To */}
            <div className="pb-4 pl-0 pt-2 lg:pl-6">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <SectionIcon/> Stock To Details
              </h3>
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <Field label="Product Warehouse Code / Name" value={DATA.warehouseCode}/>
                <Field label="Product Warehouse Address"     value={DATA.warehouseAddress}/>
              </div>
              <Field label="GSTIN Number" value={DATA.warehouseGstin}/>
            </div>
          </div>

          {/* Product wise Details */}
          <div className="border-b border-stroke py-4 dark:border-dark-3">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Product wise Details
            </h3>
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
                  {DATA.items.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke ${idx%2===0?"bg-white":"bg-[#f9fafb]"}`}>
                      <td className="border-r border-stroke px-3 py-2.5 text-center">{idx+1}</td>
                      <td className="border-r border-stroke px-3 py-2.5">{row.productVariety}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center">{row.purchaseOrderNumber}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center">{row.uom}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center">{row.orderedUnit}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center">{row.dispatchedQty}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center">{row.currentDispatchedQty}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right">{row.value}</td>
                      <td className="px-3 py-2.5 text-center">
                        <button className="mx-auto flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#f0f0f0] font-semibold">
                    <td colSpan={4} className="border-r border-t border-stroke px-3 py-2.5 text-right">Total</td>
                    <td className="border-r border-t border-stroke px-3 py-2.5 text-center">0</td>
                    <td className="border-r border-t border-stroke px-3 py-2.5 text-center">2</td>
                    <td className="border-r border-t border-stroke px-3 py-2.5 text-center">0</td>
                    <td className="border-r border-t border-stroke px-3 py-2.5 text-right">0.00</td>
                    <td className="border-t border-stroke"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bundle Details */}
          <div className="border-b border-stroke py-4 dark:border-dark-3">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Bundle Details
            </h3>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
              <Field label="Total Number of Bundles" value={DATA.totalBundles}/>
              <Field label="Total Bundle Weight"     value={DATA.totalBundleWeight}/>
              <Field label="Bundle Number"           value={DATA.bundleNumber}/>
            </div>
          </div>

          {/* Transport Details */}
          <div className="py-4">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Transport Details
            </h3>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Transport Service Type" value={DATA.transportServiceType}/>
              <Field label="Transport Service Name" value={DATA.transportServiceName}/>
              <Field label="Waybill Available"      value={DATA.waybillAvailable}/>
              <Field label="Waybill Number"         value={DATA.waybillNumber}/>
            </div>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Transport Charge Available" value={DATA.transportChargeAvailable}/>
              <Field label="Transport Charge Type"     value={DATA.transportChargeType}/>
              <Field label="Transport Charge Amount"   value={DATA.transportChargeAmount}/>
            </div>
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
