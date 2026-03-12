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
    <div className="flex flex-col gap-0.5">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">
        {value ? value : <span className="text-gray-300">—</span>}
      </span>
    </div>
  );
}

const DATA = {
  confirmationNumber: "SRC-1001",
  societyCode:        "KPM / Kanchipuram Society",
  confirmationDate:   "01-Mar-2026",
  status:             "PENDING",
  createdDate:        "01-Mar-2026",
  createdBy:          "3669",
  modifiedDate:       "01-Mar-2026",
  modifiedBy:         "3669",
  rates: [
    { id: 1, dpCode: "DP001 / Dhothy Product",  productCode: "YDCH / PL SET DHOTHY 9 X 5",     warehouse: "WH01 / Chennai Warehouse", uom: "NOS", supplyRate: "1,047.00", taxPercent: "5.00",  effectiveFrom: "01-Jan-2026", effectiveTo: "31-Mar-2026" },
    { id: 2, dpCode: "DP002 / Silk Saree",       productCode: "ASWS / ANGAVAS SALEM WOVEN SILK", warehouse: "WH02 / Salem Warehouse",   uom: "NOS", supplyRate: "1,330.00", taxPercent: "5.00",  effectiveFrom: "01-Jan-2026", effectiveTo: "31-Mar-2026" },
    { id: 3, dpCode: "DP003 / Cotton Saree",     productCode: "SSEB / SAREES SALEM 80S",         warehouse: "WH01 / Chennai Warehouse", uom: "NOS", supplyRate: "880.00",   taxPercent: "12.00", effectiveFrom: "01-Jan-2026", effectiveTo: "31-Mar-2026" },
  ],
};

const statusStyle: Record<string, string> = {
  PENDING:  "bg-orange-100 text-orange-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-gray-200 text-gray-600",
};

export default function ViewSupplyRateConfirmationPage() {
  const router = useRouter();

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Supply Rate Confirmation
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Supply Rate Confirmation</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Teal header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">View Supply Rate Confirmation</span>
        </div>

        <div className="p-5 space-y-0">

          {/* Header fields */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-stroke pb-4 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Confirmation Number"  value={DATA.confirmationNumber} />
            <Field label="Society Code / Name"  value={DATA.societyCode} />
            <Field label="Confirmation Date"    value={DATA.confirmationDate} />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
              <span className={`inline-flex w-fit items-center rounded px-2.5 py-0.5 text-xs font-semibold ${statusStyle[DATA.status] ?? "bg-gray-100 text-gray-600"}`}>
                {DATA.status}
              </span>
            </div>
          </div>

          {/* Audit row */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-stroke py-4 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Created Date"  value={DATA.createdDate} />
            <Field label="Created By"    value={DATA.createdBy} />
            <Field label="Modified Date" value={DATA.modifiedDate} />
            <Field label="Modified By"   value={DATA.modifiedBy} />
          </div>

          {/* Rate Details table */}
          <div className="pt-4">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <SectionIcon /> Rate Details
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    {["#","D&P Code / Name","Product Code / Name","Warehouse","UOM","Supply Rate (₹)","Tax (%)","Effective From","Effective To"].map(h => (
                      <th key={h} className="border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DATA.rates.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.dpCode}</td>
                      <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.productCode}</td>
                      <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">{row.warehouse}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.uom}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">₹ {row.supplyRate}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">{row.taxPercent}%</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">{row.effectiveFrom}</td>
                      <td className="px-3 py-2.5 text-center">{row.effectiveTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Back button */}
      <div className="flex justify-end pb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
