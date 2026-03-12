"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_PRODUCTS = [
  { id: 1, productVarietyCodeName: "YSD6 / PL SUITING UNIFORM", uom: "7-METR", bundleNo: "", dispatchedQuantity: 348.0, value: 52548.00 },
  { id: 2, productVarietyCodeName: "YPS6 / PL CHUDITHAR TOP", uom: "7-METR", bundleNo: "", dispatchedQuantity: 1031.0, value: 107224.00 },
];

const ReadField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
    </div>
    <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
      {value || <span className="text-gray-400">{label}</span>}
    </div>
  </div>
);

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-3 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

export default function ViewItemOutwardPage() {
  const router = useRouter();

  const totalQty = MOCK_PRODUCTS.reduce((s, r) => s + r.dispatchedQuantity, 0);
  const totalValue = MOCK_PRODUCTS.reduce((s, r) => s + r.value, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Stock Item Outward</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Stock Item Outward</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Stock Item Outward</h3>
          <svg className="size-4 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>

        <div className="p-5">
          {/* Header fields - read-only */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Type</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </div>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">WITH_OUT_REQUEST</div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Entity Type Code / Name</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">SHOW_ROOM / &nbsp; Showroom</div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Stock Outward To</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">2028 / &nbsp; V.O.C-TUTICORIN</div>
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Product Variety Details */}
          <div className="mb-6">
            <SectionHeader label="Product Variety Details" />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Bundle No.</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Dispatched Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Value (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PRODUCTS.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.productVarietyCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.uom}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.bundleNo || ""}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.dispatchedQuantity.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={4} className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totalQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totalValue.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Bundle Details */}
          <div className="mb-6">
            <SectionHeader label="Bundle Details" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Total Number of Bundles</label>
                <div className="flex">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></div>
                  <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">1</div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Bundle Number</label>
                <div className="flex">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><span className="text-sm font-bold">#</span></div>
                  <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"></div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Total Bundle Weight</label>
                <div className="flex">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="3" x2="12" y2="21"/><path d="M5.5 8.5l13-1M5.5 15.5l13 1"/><circle cx="12" cy="12" r="1"/></svg></div>
                  <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Transport Details */}
          <div className="mb-6">
            <SectionHeader label="Transport Details" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Transport Service Type", value: "Personal Delivery" },
                { label: "Transport Service Name", value: "Personal Delivery" },
                { label: "Waybill Available", value: "No" },
                { label: "Transport Charge Available", value: "No" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
                  <div className="flex">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </div>
                    <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back button */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/stock-management/item-outward/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
