"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* ─────────────────────────── Types ─────────────────────────── */
interface TransferorProduct {
  id: number;
  productCode: string;
  hsnCode: string;
  productName: string;
  rpRateRs: number;
  rpRateP: string;
  noOfUnits: number;
  rpValueRs: number;
  rpValueP: string;
}

interface TransfereeProduct {
  id: number;
  productCode: string;
  productName: string;
  rpRateRs: string;
  rpRateP: string;
  acceptedUnits: string;
  rpValueRs: string;
  rpValueP: string;
}

interface HsnSummary {
  id: number;
  hsnCode: string;
  noOfUnits: number;
  rpValue: number;
}

interface ProductSummary {
  id: number;
  productCode: string;
  noOfUnits: number;
  rpValue: number;
}

/* ─────────────────────────── Sample Data ─────────────────────────── */
const challanData = {
  challanNumber: "2023-324984",
  date: "19-Sep-2023",
  from: {
    unitName: "COOPTEX INTERNATIONAL",
    unitCode: "2281",
    address: "EXPORT INTERNATIONAL 350 PANTHEON ROAD EGMORE - 600040",
    gstin: "33AAAAH2788P1Z8",
  },
  to: {
    unitName: "TVPM-EGMORE",
    unitCode: "1650",
    address: "COOPTEX HEAD OFFICE NO. 350, PANTHEON ROAD, - 600008",
    gstin: "33AAAAH2788P1Z8",
  },
};

const transferorProducts: TransferorProduct[] = [
  { id: 1, productCode: "OSP1", hsnCode: "62149040", productName: "DUPPATTA SALEM", rpRateRs: 1755, rpRateP: "00", noOfUnits: 8.0, rpValueRs: 14040, rpValueP: "00" },
];

const transfereeProducts: TransfereeProduct[] = [
  { id: 1, productCode: "", productName: "", rpRateRs: "", rpRateP: "", acceptedUnits: "", rpValueRs: "", rpValueP: "" },
];

const hsnSummary: HsnSummary[] = [
  { id: 1, hsnCode: "62149040", noOfUnits: 8.0, rpValue: 14040.0 },
];

const productSummary: ProductSummary[] = [
  { id: 1, productCode: "OSP1", noOfUnits: 8.0, rpValue: 14040.0 },
];

const transferorTotal = { noOfUnits: 8.0, rpValueRs: 14040.0 };
const transfereeTotal = { noOfUnits: 8.0, rpValueRs: 14040.0 };

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ExportWarehouseDeliveryChallanPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Delivery Challan &amp; Acknowledgement
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">ISSR</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Stock Outward</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Delivery Challan &amp; Acknowledgement</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-8">
        {/* Title */}
        <h3 className="mb-6 text-center text-lg font-semibold text-dark dark:text-white">
          Delivery Challan &amp; Acknowledgement
        </h3>

        {/* Challan Number & Date */}
        <div className="mb-6 flex flex-col items-end gap-1 text-sm text-dark dark:text-white">
          <p>
            Delivery Challan Number &nbsp;:&nbsp; <span className="font-bold">{challanData.challanNumber}</span>
          </p>
          <p>
            Date &nbsp;:&nbsp; <span className="font-bold">{challanData.date}</span>
          </p>
        </div>

        {/* From / To Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* From */}
          <div className="overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
            <div className="bg-[#2d8f7b] px-4 py-2.5">
              <span className="text-sm font-semibold text-white">From</span>
            </div>
            <div className="space-y-2.5 p-4 text-sm text-dark dark:text-white">
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Unit Name</span>
                <span>:</span>
                <span className="font-bold">{challanData.from.unitName}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Unit Code No.</span>
                <span>:</span>
                <span className="font-bold">{challanData.from.unitCode}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Address</span>
                <span>:</span>
                <span className="font-bold">{challanData.from.address}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">GSTIN</span>
                <span>:</span>
                <span className="font-bold">{challanData.from.gstin}</span>
              </div>
            </div>
          </div>

          {/* To */}
          <div className="overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
            <div className="bg-[#17a2b8] px-4 py-2.5">
              <span className="text-sm font-semibold text-white">To</span>
            </div>
            <div className="space-y-2.5 p-4 text-sm text-dark dark:text-white">
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Unit Name</span>
                <span>:</span>
                <span className="font-bold">{challanData.to.unitName}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Unit Code No.</span>
                <span>:</span>
                <span className="font-bold">{challanData.to.unitCode}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Address</span>
                <span>:</span>
                <span className="font-bold">{challanData.to.address}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 shrink-0 text-gray-500 dark:text-gray-400">GSTIN</span>
                <span>:</span>
                <span className="font-bold">{challanData.to.gstin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transferor / Transferee Tables */}
        <div className="mb-0 grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Transferor Unit Table */}
          <div className="overflow-hidden border border-stroke dark:border-dark-3">
            <div className="border-b border-stroke bg-gray-50 px-4 py-2.5 dark:border-dark-3 dark:bg-[#1a2232]">
              <span className="text-sm font-semibold text-dark dark:text-white">To be filled by the Transferor Unit</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>Product Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>HSN Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>Product Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" colSpan={2}>RP. Rate</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>No. of Units</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" colSpan={2}>RP. Value</th>
                  </tr>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">Rs</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">P</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">Rs</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">P</th>
                  </tr>
                </thead>
                <tbody>
                  {transferorProducts.map((row) => (
                    <tr key={row.id} className="border-b border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.id}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.productCode}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.hsnCode}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.productName}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.rpRateRs}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.rpRateP}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.noOfUnits.toFixed(2)}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.rpValueRs}</td>
                      <td className="px-2 py-2.5 text-center text-dark dark:text-white">{row.rpValueP}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="border-t border-stroke bg-gray-50 font-semibold dark:border-dark-3 dark:bg-[#1a2232]">
                    <td colSpan={4} className="border-r border-stroke px-2 py-2.5 dark:border-dark-3"></td>
                    <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white" colSpan={2}>Total</td>
                    <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{transferorTotal.noOfUnits.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white" colSpan={2}>{transferorTotal.rpValueRs.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Transferee Unit Table */}
          <div className="overflow-hidden border border-l-0 border-stroke dark:border-dark-3">
            <div className="border-b border-stroke bg-gray-50 px-4 py-2.5 dark:border-dark-3 dark:bg-[#1a2232]">
              <span className="text-sm font-semibold text-dark dark:text-white">To be filled by the Transferee Unit</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>Product Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>Product Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" colSpan={2}>RP. Rate</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" rowSpan={2}>Accepted Units</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold" colSpan={2}>RP. Value</th>
                  </tr>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">Rs</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">P</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">Rs</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center text-xs font-semibold">P</th>
                  </tr>
                </thead>
                <tbody>
                  {transfereeProducts.map((row) => (
                    <tr key={row.id} className="border-b border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.id}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.productCode}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.productName}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.rpRateRs}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.rpRateP}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.acceptedUnits}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.rpValueRs}</td>
                      <td className="px-2 py-2.5 text-center text-dark dark:text-white">{row.rpValueP}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="border-t border-stroke bg-gray-50 font-semibold dark:border-dark-3 dark:bg-[#1a2232]">
                    <td colSpan={3} className="border-r border-stroke px-2 py-2.5 dark:border-dark-3"></td>
                    <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white" colSpan={2}>Total</td>
                    <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{transfereeTotal.noOfUnits.toFixed(2)}</td>
                    <td className="border-r border-stroke px-2 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white" colSpan={2}>{transfereeTotal.rpValueRs.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* HSN Code Summary & Product Code Summary */}
        <div className="mb-8 mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* HSN Code Summary */}
          <div className="overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
            <div className="border-b border-stroke bg-gray-50 px-4 py-2.5 dark:border-dark-3 dark:bg-[#1a2232]">
              <span className="text-sm font-bold text-dark dark:text-white">HSN Code Summary</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">HSN Code</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">No. of Units</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">RP. Value</th>
                  </tr>
                </thead>
                <tbody>
                  {hsnSummary.map((row) => (
                    <tr key={row.id} className="border-b border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.id}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.hsnCode}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.noOfUnits.toFixed(2)}</td>
                      <td className="px-3 py-2.5 text-right text-dark dark:text-white">{row.rpValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Code Summary */}
          <div className="overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
            <div className="border-b border-stroke bg-gray-50 px-4 py-2.5 dark:border-dark-3 dark:bg-[#1a2232]">
              <span className="text-sm font-bold text-dark dark:text-white">Product Code Summary</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Product Code</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">No. of Units</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">RP. Value</th>
                  </tr>
                </thead>
                <tbody>
                  {productSummary.map((row) => (
                    <tr key={row.id} className="border-b border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.id}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.productCode}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.noOfUnits.toFixed(2)}</td>
                      <td className="px-3 py-2.5 text-right text-dark dark:text-white">{row.rpValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Seal & Signature / Acknowledgement Section */}
        <div className="mb-8 grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Left - Transferor */}
          <div className="border border-stroke p-5 dark:border-dark-3">
            <div className="mb-6 border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm font-semibold text-[#2d8f7b]">Seal of The Transferor Unit:</p>
            </div>

            <div className="mb-6 min-h-[40px]"></div>

            <div className="mb-4 border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm font-semibold text-dark dark:text-white">Signature of Staff of Transferor Unit:</p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-dark dark:text-white">
              {[1, 2, 3, 4, 5].map((n) => (
                <p key={n}>{n}.</p>
              ))}
              {[6, 7, 8, 9].map((n) => (
                <p key={n}>{n}.</p>
              ))}
            </div>

            <div className="mb-2 space-y-2 text-sm text-dark dark:text-white">
              <p className="font-semibold">No. of Bundles :</p>
              <p className="font-semibold text-[#2d8f7b]">L.R. No. &amp; Date :</p>
            </div>

            <div className="mt-4 text-right text-sm font-bold text-dark dark:text-white">
              Sales Manager
            </div>
          </div>

          {/* Right - Acknowledgement */}
          <div className="border border-l-0 border-stroke p-5 dark:border-dark-3">
            <div className="mb-3 border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm font-semibold text-dark dark:text-white">Acknowledgement:</p>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-dark dark:text-white">
              Certified that we have been entrusted with the above mentioned stocks and that we hold ourselves jointly and severally liable for any loss or damages to the stocks or any portion thereof caused by any reason whatsoever.
            </p>

            <div className="mb-4 border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm font-semibold text-[#2d8f7b]">Seal of The Transferee Unit:</p>
            </div>

            <div className="mb-4 flex gap-8 text-sm text-dark dark:text-white">
              <p><span className="text-[#2d8f7b]">PAR/DTS No. :</span></p>
              <p><span className="font-semibold">Date :</span></p>
            </div>

            <div className="mb-4 border-b border-stroke pb-2 dark:border-dark-3">
              <p className="text-sm font-semibold text-dark dark:text-white">Signature of Staff of Transferor Unit:</p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-x-6 gap-y-2 text-sm text-[#2d8f7b]">
              {[1, 2, 3].map((n) => (
                <p key={n}>{n}.</p>
              ))}
              {[4, 5, 6].map((n) => (
                <p key={n}>{n}.</p>
              ))}
              {[7, 8, 9].map((n) => (
                <p key={n}>{n}.</p>
              ))}
            </div>

            <div className="mt-4 text-right text-sm font-bold text-dark dark:text-white">
              Sales Manager
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke pt-5 dark:border-dark-3">
          <button
            onClick={() => router.push("/operational/warehouse-management/export-warehouse/stock-outward/list")}
            className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cancel
          </button>
          <button
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="6,9 6,2 18,2 18,9" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
