"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  planCode:     "2023_2024_ANNUAL_PLAN",
  from:         "April 2023",
  to:           "March 2024",
  regionCode:   "11/COIMBATORE,\n12/CUDDALORE,\n16/CHENNAI,",
  productCat:   "A/Pure Silk Variety,\nC/Cotton Variety,\nD/Powerloom Variety,",
  prevFromDate: "February 2022",
  prevToDate:   "January 2023",
  baseStock:    "40.00",
};

const MONTH_DATA = [
  { month: "April 2023",    percentage: 5,  value: 38499949.99  },
  { month: "May 2023",      percentage: 5,  value: 38499949.99  },
  { month: "June 2023",     percentage: 5,  value: 38499949.99  },
  { month: "July 2023",     percentage: 5,  value: 38499949.99  },
  { month: "August 2023",   percentage: 15, value: 115499849.96 },
  { month: "September 2023",percentage: 20, value: 153999799.95 },
  { month: "October 2023",  percentage: 15, value: 115499849.96 },
  { month: "November 2023", percentage: 10, value: 76999899.98  },
];

const TOTAL_ELIGIBILITY  = 769998999.76;
const TOTAL_PCT          = MONTH_DATA.reduce((s, r) => s + r.percentage, 0);
const TOTAL_VAL          = MONTH_DATA.reduce((s, r) => s + r.value, 0);

const HashIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const CalIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const PctIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

export default function ViewMonthWiseProcurementPlanPage() {
  const router = useRouter();

  const labelCls = "block text-xs font-medium text-dark dark:text-white mb-1";

  const ReadField = ({ icon, value }: { icon: React.ReactNode; value: string }) => (
    <div className="flex items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-gray-800">
      <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      <span className="flex-1 px-3 py-2 text-sm text-dark dark:text-white">{value || "—"}</span>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Month Wise Procurement Plan</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Month Wise Procurement Plan</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Month Wise Procurement Plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Month Wise Plan</h3>
          <span className="text-xs text-white/80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          <div className="flex gap-5">
            {/* Left read-only form */}
            <div className="flex-1 space-y-4">
              {/* Plan Code */}
              <div>
                <label className={labelCls}>Plan Code / Name <span className="text-red-500">*</span></label>
                <ReadField icon={<HashIcon />} value={RECORD.planCode} />
              </div>

              {/* From / To */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>From</label>
                  <div className="flex items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-gray-800">
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <span className="flex-1 px-3 py-2 text-sm text-dark dark:text-white">{RECORD.from}</span>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>To</label>
                  <div className="flex items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-gray-800">
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <span className="flex-1 px-3 py-2 text-sm text-dark dark:text-white">{RECORD.to}</span>
                  </div>
                </div>
              </div>

              {/* Region / Product Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Region Code / Name</label>
                  <div className="min-h-[80px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark whitespace-pre-line dark:border-dark-3 dark:bg-gray-800 dark:text-white">
                    {RECORD.regionCode}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Product Category Code / Name</label>
                  <div className="min-h-[80px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark whitespace-pre-line dark:border-dark-3 dark:bg-gray-800 dark:text-white">
                    {RECORD.productCat}
                  </div>
                </div>
              </div>

              {/* Previous Sales */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Previous Sales - From Date</label>
                  <div className="flex items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-gray-800">
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <span className="flex-1 px-3 py-2 text-sm text-dark dark:text-white">{RECORD.prevFromDate}</span>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Previous Sales - To Date</label>
                  <div className="flex items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-gray-800">
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <span className="flex-1 px-3 py-2 text-sm text-dark dark:text-white">{RECORD.prevToDate}</span>
                  </div>
                </div>
              </div>

              {/* Base Stock */}
              <div className="w-48">
                <label className={labelCls}>Base Stock Percentage</label>
                <div className="flex items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-gray-800">
                  <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><PctIcon /></span>
                  <span className="flex-1 px-3 py-2 text-right text-sm text-dark dark:text-white">{RECORD.baseStock}</span>
                </div>
              </div>
            </div>

            {/* Month table read-only */}
            <div className="w-[360px] shrink-0">
              <div className="overflow-hidden rounded border border-stroke dark:border-dark-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="border-r border-[#3aa88f] px-2 py-2 text-center w-8">#</th>
                      <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Month</th>
                      <th className="border-r border-[#3aa88f] px-3 py-2 text-center">Percentage(%)</th>
                      <th className="px-3 py-2 text-center">Value (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTH_DATA.map((row, i) => (
                      <tr key={i} className={i%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                        <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{i+1}</td>
                        <td className="border-r border-stroke px-3 py-1.5 text-center">{row.month}</td>
                        <td className="border-r border-stroke px-3 py-1.5 text-right">{row.percentage.toFixed(2)}</td>
                        <td className="px-3 py-1.5 text-right">{row.value.toLocaleString("en-IN", {minimumFractionDigits:2})}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
                      <td colSpan={2} className="border-r border-stroke px-3 py-1.5 text-right text-xs">Total</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right text-xs">{TOTAL_PCT.toFixed(1)}</td>
                      <td className="px-3 py-1.5 text-right text-xs">{TOTAL_VAL.toLocaleString("en-IN", {minimumFractionDigits:2})}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right summary */}
            <div className="w-[200px] shrink-0 space-y-3">
              <div className="rounded bg-[#2d8f7b] p-3 space-y-3">
                <div>
                  <p className="text-[10px] text-white/80 mb-1">Total Eligibility Value (₹)</p>
                  <input readOnly value={TOTAL_ELIGIBILITY.toLocaleString("en-IN", {minimumFractionDigits:2})}
                    className="w-full rounded border border-white/30 bg-white px-2 py-1 text-right text-xs text-dark" />
                </div>
                <div>
                  <p className="text-[10px] text-white/80 mb-1">Remaining Percentage(%)</p>
                  <input readOnly value={(100 - TOTAL_PCT).toFixed(2)}
                    className="w-full rounded border border-white/30 bg-white px-2 py-1 text-right text-xs text-dark" />
                </div>
                <div>
                  <p className="text-[10px] text-white/80 mb-1">Remaining Value (₹)</p>
                  <input readOnly value={(TOTAL_ELIGIBILITY - TOTAL_VAL).toLocaleString("en-IN", {minimumFractionDigits:2})}
                    className="w-full rounded border border-white/30 bg-white px-2 py-1 text-right text-xs text-dark" />
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-dark dark:text-white mb-1">Note</p>
                <div className="rounded border border-stroke bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:border-dark-3 dark:bg-gray-800 dark:text-gray-300 min-h-[80px]">
                  Monthwise Plan Value Should be equal to the total Production Plan value
                </div>
              </div>

            </div>
          </div>

          {/* Back button — bottom-right of card */}
          <div className="flex justify-end border-t border-stroke pt-4 mt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/production-planning/retail-production-plan/month-wise-procurement-plan/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
