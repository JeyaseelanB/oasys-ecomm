"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─── IconBox helper ─────────────────────────────────────────────────────── */

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

/* ─── Readonly field with icon ────────────────────────────────────────────── */

const ReadField = ({ icon, value, multiline = false }: { icon: React.ReactNode; value: string; multiline?: boolean }) => (
  <div className="flex">
    <IconBox>{icon}</IconBox>
    {multiline ? (
      <div className="flex min-h-[80px] w-full items-start overflow-y-auto rounded-r border border-stroke bg-transparent px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
        {value}
      </div>
    ) : (
      <div className="flex h-10 w-full items-center rounded-r border border-stroke bg-transparent px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
        {value}
      </div>
    )}
  </div>
);

/* ─── Icons ───────────────────────────────────────────────────────────────── */

const CalIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HashIcon = () => <span className="text-sm font-bold">#</span>;

const PctIcon = () => (
  <span className="flex size-6 items-center justify-center rounded-full border border-gray-400 text-xs font-bold text-gray-500 dark:border-gray-500 dark:text-gray-400">%</span>
);

const RegionIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const ShowroomIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

/* ─── Static view data ────────────────────────────────────────────────────── */

const PLAN = {
  planName:      "planten",
  planFrom:      "June 2026",
  planTo:        "May 2027",
  salesDuration: "MONTHLY",
  bsFromYear:    "2025",
  bsFromMonth:   "June",
  bsToYear:      "2026",
  bsToMonth:     "May",
  bsPct:         "40.0",
  anticipatedPct:"10.0",
  stockDate:     "2026-01-31",
  regionCodes:   "11/COIMBATORE,\n12/CUDDALORE,\n16/CHENNAI,\n20/MADURAI",
  showrooms:     "1114/MARUTHAM,\n1115/R.S.PURAM,\n1118/POLLACHI,\n1201/CUDDALORE MAIN",
  forwardTo:     "Regional Manager",
  forwardFor:    "Approval",
  status:        "SUBMITTED",
  planCode:      "PP-HO-2026-001",
};

interface CategoryRow {
  id: number; category: string;
  salesLastYearQty: number; salesLastYearValue: number;
  anticipatedSalesQty: number; anticipatedSalesValue: number;
  baseStockPct: number;
  baseStockQty: number; baseStockValue: number;
  averagePP: number;
  requiredStockQty: number; requiredStockValue: number;
  currentStockQty: number; currentStockValue: number;
  proposedQty: number; proposedProfitPct: number; proposedPPValue: number; proposedRPValue: number;
}

const CATEGORY_DATA: CategoryRow[] = [
  {
    id: 1, category: "C",
    salesLastYearQty: 393, salesLastYearValue: 841427,
    anticipatedSalesQty: 432, anticipatedSalesValue: 925570,
    baseStockPct: 40.0,
    baseStockQty: 173, baseStockValue: 370228,
    averagePP: 596,
    requiredStockQty: 605, requiredStockValue: 1295798,
    currentStockQty: 634899.82, currentStockValue: 491473659.97,
    proposedQty: -634295, proposedProfitPct: 70, proposedPPValue: -288339918.82, proposedRPValue: -490177862,
  },
];

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const totals = CATEGORY_DATA.reduce(
  (acc, r) => ({
    salesLastYearQty:      acc.salesLastYearQty      + r.salesLastYearQty,
    salesLastYearValue:    acc.salesLastYearValue    + r.salesLastYearValue,
    anticipatedSalesQty:   acc.anticipatedSalesQty   + r.anticipatedSalesQty,
    anticipatedSalesValue: acc.anticipatedSalesValue + r.anticipatedSalesValue,
    baseStockQty:          acc.baseStockQty          + r.baseStockQty,
    baseStockValue:        acc.baseStockValue        + r.baseStockValue,
    requiredStockQty:      acc.requiredStockQty      + r.requiredStockQty,
    requiredStockValue:    acc.requiredStockValue    + r.requiredStockValue,
    currentStockQty:       acc.currentStockQty       + r.currentStockQty,
    currentStockValue:     acc.currentStockValue     + r.currentStockValue,
    proposedQty:           acc.proposedQty           + r.proposedQty,
    proposedPPValue:       acc.proposedPPValue       + r.proposedPPValue,
    proposedRPValue:       acc.proposedRPValue       + r.proposedRPValue,
  }),
  { salesLastYearQty: 0, salesLastYearValue: 0, anticipatedSalesQty: 0, anticipatedSalesValue: 0, baseStockQty: 0, baseStockValue: 0, requiredStockQty: 0, requiredStockValue: 0, currentStockQty: 0, currentStockValue: 0, proposedQty: 0, proposedPPValue: 0, proposedRPValue: 0 }
);

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function ViewProductionPlanHOPage() {
  const router   = useRouter();
  const basePath = "/operational/production-planning/retail-production-plan/production-plan-ho";

  const [showViewNote,   setShowViewNote]   = useState(false);
  const [showComments,   setShowComments]   = useState(false);
  const [activeTab,      setActiveTab]      = useState<"Approve" | "Reject">("Approve");
  const [commentText,    setCommentText]    = useState("");

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Production Plan</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Plan</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Production Plan</li>
          </ol>
        </nav>
      </div>

      {/* ── Single card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Teal header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Production Plan</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <button className="text-white/80 hover:text-white">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* ── 4-column grid (same layout as create) ── */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">

            {/* Row 1 */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Name <span className="text-red-500">*</span></label>
              <ReadField icon={<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>} value={PLAN.planName} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Production Plan - From <span className="text-red-500">*</span></label>
              <ReadField icon={<CalIcon />} value={PLAN.planFrom} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Production Plan - To <span className="text-red-500">*</span></label>
              <ReadField icon={<CalIcon />} value={PLAN.planTo} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Sales Duration <span className="text-red-500">*</span></label>
              <ReadField icon={<CalIcon />} value={PLAN.salesDuration} />
            </div>

            {/* Row 2 */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Sales From Year</label>
              <ReadField icon={<HashIcon />} value={PLAN.bsFromYear} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Sales From Month</label>
              <ReadField icon={<HashIcon />} value={PLAN.bsFromMonth} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Sales To Year</label>
              <ReadField icon={<HashIcon />} value={PLAN.bsToYear} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Sales To Month</label>
              <ReadField icon={<HashIcon />} value={PLAN.bsToMonth} />
            </div>

            {/* Row 3 */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Base Stock Precentage <span className="text-red-500">*</span></label>
              <ReadField icon={<PctIcon />} value={PLAN.bsPct} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Anticipated Sale&apos;s Percentage <span className="text-red-500">*</span></label>
              <ReadField icon={<PctIcon />} value={PLAN.anticipatedPct} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Stock Date <span className="text-red-500">*</span></label>
              <ReadField icon={<CalIcon />} value={PLAN.stockDate} />
            </div>
            {/* Region Code / Name - multiline, spanning into row 4 visually */}
            <div className="row-span-2">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Region Code / Name</label>
              <div className="flex h-full">
                <IconBox><RegionIcon /></IconBox>
                <div className="min-h-[80px] w-full overflow-y-auto rounded-r border border-stroke bg-transparent px-3 py-2 text-sm whitespace-pre-line text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {PLAN.regionCodes}
                </div>
              </div>
            </div>

            {/* Row 4: Showroom (spans 3 cols) */}
            <div className="md:col-span-3">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Showroom</label>
              <div className="flex">
                <IconBox><ShowroomIcon /></IconBox>
                <div className="min-h-[70px] w-full overflow-y-auto rounded-r border border-stroke bg-transparent px-3 py-2 text-sm whitespace-pre-line text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {PLAN.showrooms}
                </div>
              </div>
            </div>
          </div>

          {/* ── Category Wise Details List ── */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Category Wise Details List</h4>
          </div>

          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Category</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Sales Last Year</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Anticipated Sale&apos;s</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Base Stock Precentage</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Base Stock</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Average PP</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Required Stock</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Current Stock</th>
                  <th colSpan={4} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Proposed Plan</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Profit(%)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">(PP) value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">(RP) value(&#8377;)</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORY_DATA.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 align-middle font-medium text-[#17a2b8] dark:border-dark-3">{row.category}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.anticipatedSalesQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.anticipatedSalesValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{row.baseStockPct.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.baseStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.baseStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.averagePP)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{row.proposedProfitPct}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPPValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedRPValue)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.salesLastYearQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.salesLastYearValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.anticipatedSalesQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.anticipatedSalesValue)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.baseStockQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.baseStockValue)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedQty)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPPValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedRPValue)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* ── Bottom buttons ── */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              {/* View Note */}
              <button onClick={() => setShowViewNote(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                View Note
              </button>
              {/* Comments icon */}
              <button onClick={() => setShowComments(true)} className="flex size-9 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </button>
            </div>
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════ VIEW NOTE MODAL ══════════════════ */}
      {showViewNote && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note content area — simple display matching portal screenshot */}
              <div className="mb-5 min-h-[200px] rounded border border-stroke bg-[#f9fafb] p-4 text-sm text-dark dark:border-dark-3 dark:bg-[#1a2232] dark:text-white">
                test
              </div>
              <div className="flex items-center justify-end">
                <button onClick={() => setShowViewNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ COMMENTS MODAL ══════════════════ */}
      {showComments && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowComments(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div>
              {/* Tab bar — matching portal screenshot */}
              <div className="flex border-b border-stroke dark:border-dark-3">
                <button
                  onClick={() => setActiveTab("Approve")}
                  className={`flex items-center gap-1.5 px-6 py-3 text-sm font-medium transition-colors ${activeTab === "Approve" ? "border-b-2 border-[#17a2b8] text-[#17a2b8]" : "text-gray-500 hover:text-dark dark:text-gray-400 dark:hover:text-white"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                  </svg>
                  Approve
                </button>
                <button
                  onClick={() => setActiveTab("Reject")}
                  className={`flex items-center gap-1.5 px-6 py-3 text-sm font-medium transition-colors ${activeTab === "Reject" ? "border-b-2 border-[#dc3545] text-[#dc3545]" : "text-gray-500 hover:text-dark dark:text-gray-400 dark:hover:text-white"}`}
                >
                  <svg className="size-4 rotate-180" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                  </svg>
                  Reject
                </button>
              </div>

              {/* Tab content */}
              <div className="p-5">
                <div className="mb-4">
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    {activeTab === "Approve" ? "Approval" : "Rejection"} Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={`Enter ${activeTab === "Approve" ? "approval" : "rejection"} comment...`}
                    className="w-full resize-none rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button onClick={() => setShowComments(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowComments(false)}
                    className={`flex items-center gap-1.5 rounded px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 ${activeTab === "Approve" ? "bg-[#28a745]" : "bg-[#dc3545]"}`}
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      {activeTab === "Approve"
                        ? <polyline points="20,6 9,17 4,12" />
                        : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
                    </svg>
                    {activeTab}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
