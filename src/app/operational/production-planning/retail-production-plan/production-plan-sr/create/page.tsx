"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─── Icon helpers ───────────────────────────────────────────────────────── */
const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

/* ─── Sample RO plan names for dropdown ─────────────────────────────────── */
const RO_PLANS = [
  "thiyagu", "nighsn", "yetsrdayyy", "deepavali plans", "oasys",
  "muruga", "Nishanth", "yuyuy", "2023_2024_ANNUAL_PLAN", "23-24 yearly plan",
  "ANNUAL_PLAN_2025", "QUARTERLY_2025_Q1", "MONTHLY_MAR_2025",
];

/* ─── Category data ──────────────────────────────────────────────────────── */
interface CategoryRow {
  id: number; category: string;
  salesLastYearQty: number; salesLastYearValue: number;
  requiredStockQty: number; requiredStockValue: number; requiredStockPPRate: number;
  currentStockQty: number; currentStockValue: number; currentStockPPRate: number;
  proposedPPQty: number; proposedPPValue: number;
  hoApprovedQty: number; hoApprovedValue: number;
}

const SAMPLE_DATA: CategoryRow[] = [
  { id: 1, category: "A",  salesLastYearQty: 10484,      salesLastYearValue: 142954546.50, requiredStockQty: 6015,  requiredStockValue: 172975014.00, requiredStockPPRate: 0, currentStockQty: 525.05,    currentStockValue: 6266532.50,   currentStockPPRate: 0, proposedPPQty: 10995.95,   proposedPPValue: 110766204.50, hoApprovedQty: 16761,    hoApprovedValue: 168663192.00 },
  { id: 2, category: "AJ", salesLastYearQty: 39925,      salesLastYearValue: 357465922.58, requiredStockQty: 3571,  requiredStockValue: 48297,         requiredStockPPRate: 0, currentStockQty: 3790,      currentStockValue: 38665700.00,  currentStockPPRate: 0, proposedPPQty: 40106,      proposedPPValue: 239575425.00, hoApprovedQty: 59477,    hoApprovedValue: 409015886.00 },
  { id: 3, category: "C",  salesLastYearQty: 1406354.39, salesLastYearValue: 834767219.39, requiredStockQty: 543,   requiredStockValue: 1701579,       requiredStockPPRate: 0, currentStockQty: 74543.05,  currentStockValue: 58230069.25,  currentStockPPRate: 0, proposedPPQty: 1470298.34, proposedPPValue: 556123577.90, hoApprovedQty: 1172270, hoApprovedValue: 443522566.60 },
];

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ══════════════════════════════════════════════════════════════════════════ */
export default function CreateProductionPlanSRPage() {
  const router   = useRouter();
  const basePath = "/operational/production-planning/retail-production-plan/production-plan-sr";

  const [planName,     setPlanName]     = useState("");
  const [categoryRows, setCategoryRows] = useState<CategoryRow[]>([]);
  const [searched,     setSearched]     = useState(false);

  const handleSearch = () => { if (planName) { setCategoryRows(SAMPLE_DATA); setSearched(true); } };
  const handleClear  = () => { setPlanName(""); setCategoryRows([]); setSearched(false); };

  const totals = categoryRows.reduce(
    (acc, r) => ({
      salesLastYearQty:   acc.salesLastYearQty   + r.salesLastYearQty,
      salesLastYearValue: acc.salesLastYearValue + r.salesLastYearValue,
      requiredStockQty:   acc.requiredStockQty   + r.requiredStockQty,
      requiredStockValue: acc.requiredStockValue + r.requiredStockValue,
      currentStockQty:    acc.currentStockQty    + r.currentStockQty,
      currentStockValue:  acc.currentStockValue  + r.currentStockValue,
      proposedPPQty:      acc.proposedPPQty      + r.proposedPPQty,
      proposedPPValue:    acc.proposedPPValue    + r.proposedPPValue,
      hoApprovedQty:      acc.hoApprovedQty      + r.hoApprovedQty,
      hoApprovedValue:    acc.hoApprovedValue    + r.hoApprovedValue,
    }),
    { salesLastYearQty: 0, salesLastYearValue: 0, requiredStockQty: 0, requiredStockValue: 0, currentStockQty: 0, currentStockValue: 0, proposedPPQty: 0, proposedPPValue: 0, hoApprovedQty: 0, hoApprovedValue: 0 }
  );

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
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Production Plan SR</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Production Plan</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <button className="text-white/80 hover:text-white"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /></svg></button>
          </div>
        </div>

        <div className="p-5">
          {/* Plan Name + buttons */}
          <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                </IconBox>
                <select value={planName} onChange={(e) => setPlanName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {RO_PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="col-span-3 flex items-end justify-end gap-2">
              <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                Clear
              </button>
              <button onClick={handleSearch} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                Search
              </button>
            </div>
          </div>

          {/* Category Wise Details List */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Category Wise Details List</h4>
          </div>

          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Category</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Sales Last Year</th>
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Required Stock</th>
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Current Stock</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Proposed Plan (PP)</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HO Approved Plan</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">PP Rate(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">PP Rate(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                </tr>
              </thead>
              <tbody>
                {categoryRows.length === 0 ? (
                  <tr><td colSpan={13} className="border border-stroke px-3 py-4 text-left text-sm text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  categoryRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 font-medium text-[#17a2b8] dark:border-dark-3">{row.category}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockPPRate)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockPPRate)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPPQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPPValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.hoApprovedQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.hoApprovedValue)}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {categoryRows.length > 0 && (
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.salesLastYearQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.salesLastYearValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPPQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPPValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.hoApprovedQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.hoApprovedValue)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Cancel / Submit — right-aligned, no Create Note */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14z" /></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
