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
    <div className="flex flex-col gap-0.5 py-1">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || ""}</span>
    </div>
  );
}

const DATA = {
  dpOffice: "1301 / D&P OFFICE ERODE",
  productSelectedBy: "Region 1",
  validityDate: "31-Mar-2026",
  notes: "",
  supplierCode: "3S3313/T(H) 110, ARINGNA...",
  supplierAddress: "NO.39,B-6,K.O.N.THRATRE ROAD, KOMARAPALAYAM-638 183, NAMAKKAL DISTRICT, SALEM, TAMIL NADUIndia",
  supplierGstin: "33AAAA9242K 1ZU",
  warehouseCode: "2381 / PWH CHENNIMALAI",
  warehouseAddress: "15&17 PATEL STREET, INGUR ROAD, CHENNIMALAI, NAMAKKAL, TAMIL NADU - 637001",
  warehouseGstin: "33AAAAH2788P1Z8",
  products: [
    { id: 1, productCode: "YDCH / PL SET DHOTHY 9 X 5", atNumber: "AT-001", selectedBy: "Region 1", hsnCode: "5208", uom: "NOS", unit: "1", unitPrice: "1,047.00", gstAmount: "52.35", totalAmount: "1,099.35" },
    { id: 2, productCode: "ASWS / ANGAVAS SALEM WOVEN SILK", atNumber: "AT-002", selectedBy: "Region 1", hsnCode: "5007", uom: "NOS", unit: "1", unitPrice: "1,330.00", gstAmount: "66.50", totalAmount: "1,396.50" },
  ],
  materialValue: "2,377.00",
  gstRows: [
    { hsnCode: "5208", unit: "1", taxPercent: "5%", cgst: "26.18", sgst: "26.18", total: "52.35" },
    { hsnCode: "5007", unit: "1", taxPercent: "5%", cgst: "33.25", sgst: "33.25", total: "66.50" },
  ],
  certifiedTerms: "We certify that the prices shown in this invoice are the lowest prices charged by us to any customer for similar products during the period.",
  totalCgst: "59.43",
  totalSgst: "59.43",
  totalGst: "118.85",
  grandTotal: "2,495.85",
};

export function generateStaticParams() {
  return [];
}

export default function ViewSupplyRateConfirmationPage() {
  const router = useRouter();

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Retail Sales - View Supply Rate Confirmation - Society
        </h2>
        <nav><ol className="flex items-center gap-1.5 text-sm">
          <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">Weavers</li>
          <li className="text-gray-400">/</li>
          <li className="font-medium text-primary">View Supply Rate Confirmation</li>
        </ol></nav>
      </div>

      {/* Step Indicator */}
      <div className="rounded-[10px] border border-stroke bg-white px-6 py-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-[#28a745] bg-[#28a745] text-sm font-bold text-white">1</div>
            <span className="text-xs font-medium text-dark dark:text-white">Supply Rate Confirmation Creation</span>
          </div>
          <div className="mx-4 flex-1 border-t border-dashed border-[#28a745]"/>
          <div className="flex flex-col items-center gap-1">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-[#FFA70B] bg-white text-sm font-bold text-[#FFA70B]">2</div>
            <span className="text-xs font-medium text-dark dark:text-white">Supply Rate Confirmation Approval</span>
          </div>
        </div>
      </div>

      {/* D&P Office Details Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">D&P Office Details</span>
          <button className="text-white/80 hover:text-white text-lg font-bold leading-none">—</button>
        </div>
        <div className="px-5 pb-4 pt-2">
          <div className="grid grid-cols-1 gap-x-6 border-b border-stroke sm:grid-cols-2 xl:grid-cols-3">
            <Field label="D&P Office Code / Name" value={DATA.dpOffice}/>
            <Field label="Product Selected By - Region Code / Name" value={DATA.productSelectedBy}/>
            <Field label="Supply Rate Confirmation Validity Date" value={DATA.validityDate}/>
          </div>
          {DATA.notes && (
            <div className="py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Notes</span>
              <p className="text-sm font-medium text-[#17a2b8]">{DATA.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Supplier Details / Buyer Details */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="grid grid-cols-1 divide-y divide-stroke lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-dark-3">
          {/* Supplier Details */}
          <div className="p-5">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Supplier Details
            </h3>
            <Field label="Society Code / Name" value={DATA.supplierCode}/>
            <div className="flex flex-col gap-0.5 py-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Society Address</span>
              <span className="text-sm font-medium text-[#17a2b8]">{DATA.supplierAddress}</span>
            </div>
            <Field label="GSTIN Number" value={DATA.supplierGstin}/>
          </div>
          {/* Buyer Details */}
          <div className="p-5">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon/> Buyer Details
            </h3>
            <Field label="Product Warehouse Code / Name" value={DATA.warehouseCode}/>
            <div className="flex flex-col gap-0.5 py-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Product Warehouse Address</span>
              <span className="text-sm font-medium text-[#17a2b8]">{DATA.warehouseAddress}</span>
            </div>
            <Field label="GSTIN Number" value={DATA.warehouseGstin}/>
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
                {["#","Product Variety Code","AT Number","Selected By","HSN Code","UOM","Unit","Unit Price (₹)","GST Amount (₹)","Total Amount (₹)"].map(h => (
                  <th key={h} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DATA.products.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke ${idx%2===0?"bg-white":"bg-[#f9fafb]"}`}>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{idx+1}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.productCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.atNumber}</td>
                  <td className="border-r border-stroke px-3 py-2.5">{row.selectedBy}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.hsnCode}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.uom}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center">{row.unit}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{row.unitPrice}</td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right">{row.gstAmount}</td>
                  <td className="px-3 py-2.5 text-right">{row.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
          <span className="text-sm font-medium text-dark dark:text-white">
            Material Value(Without Tax):&nbsp;
            <span className="inline-block min-w-[100px] rounded border border-stroke bg-gray-50 px-3 py-1 text-sm dark:border-dark-3 dark:bg-dark-2">
              {DATA.materialValue}
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
                {DATA.gstRows.map((row, idx) => (
                  <tr key={idx} className={`border-b border-stroke ${idx%2===0?"bg-white":"bg-[#f9fafb]"}`}>
                    <td className="border-r border-stroke px-2 py-2 text-center">{row.hsnCode}</td>
                    <td className="border-r border-stroke px-2 py-2 text-center">{row.unit}</td>
                    <td className="border-r border-stroke px-2 py-2 text-center">{row.taxPercent}</td>
                    <td className="border-r border-stroke px-2 py-2 text-right">{row.cgst}</td>
                    <td className="border-r border-stroke px-2 py-2 text-right">{row.sgst}</td>
                    <td className="px-2 py-2 text-right">{row.total}</td>
                  </tr>
                ))}
                <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                  <td colSpan={3} className="border-r border-t border-stroke px-2 py-2 text-center">Total</td>
                  <td className="border-r border-t border-stroke px-2 py-2 text-right">{DATA.totalCgst}</td>
                  <td className="border-r border-t border-stroke px-2 py-2 text-right">{DATA.totalSgst}</td>
                  <td className="border-t border-stroke px-2 py-2 text-right">{DATA.totalGst}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Certified Terms */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-dark dark:text-white">Certified Terms</span>
            <p className="rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">{DATA.certifiedTerms}</p>
          </div>
          {/* Right totals panel */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {[
                  ["Material Value (Without Tax)", DATA.materialValue],
                  ["GST Amount", DATA.totalGst],
                  ["Total Value (With Tax)", DATA.grandTotal],
                ].map(([label, val]) => (
                  <tr key={label} className="border-b border-stroke">
                    <td className="px-3 py-2.5 text-sm text-dark dark:text-white">{label}</td>
                    <td className="px-3 py-2.5 text-right text-sm font-medium text-[#17a2b8]">₹ {val}</td>
                  </tr>
                ))}
                <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                  <td className="border-t border-stroke px-3 py-2 text-sm">Grand Total</td>
                  <td className="border-t border-stroke px-3 py-2 text-right text-sm text-[#17a2b8]">₹ {DATA.grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end pb-4">
        <button onClick={() => router.back()}
          className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
          Back
        </button>
      </div>
    </div>
  );
}
