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

/* ─── Sample HO plan names for dropdown ─────────────────────────────────── */
const HO_PLANS = [
  "thiyagu", "nighsn", "yetsrdayyy", "deepavali plans", "oasys",
  "muruga", "Nishanth", "yuyuy", "2023_2024_ANNUAL_PLAN", "23-24 yearly plan",
  "ANNUAL_PLAN_2025", "QUARTERLY_2025_Q1", "MONTHLY_MAR_2025",
];

/* ─── Category data types ────────────────────────────────────────────────── */
interface CategoryRow {
  id: number; category: string;
  salesLastYearQty: number; salesLastYearValue: number;
  baseStockPct: number;
  requiredStockQty: number; requiredStockValue: number; requiredStockPPRate: number;
  currentStockQty: number; currentStockValue: number; currentStockPPRate: number;
  proposedPPQty: number; proposedPPValue: number;
  approvedPlanQty: number; approvedPlanValue: number;
}

const SAMPLE_DATA: CategoryRow[] = [
  { id: 1, category: "A",  salesLastYearQty: 10484,      salesLastYearValue: 142954546.50, baseStockPct: 10, requiredStockQty: 6015, requiredStockValue: 172975014.00, requiredStockPPRate: 0, currentStockQty: 525.05, currentStockValue: 6266532.50, currentStockPPRate: 0, proposedPPQty: 10995.95, proposedPPValue: 110766204.50, approvedPlanQty: 0, approvedPlanValue: 0 },
  { id: 2, category: "AJ", salesLastYearQty: 39925,      salesLastYearValue: 357465922.58, baseStockPct: 10, requiredStockQty: 3571, requiredStockValue: 48297, requiredStockPPRate: 0, currentStockQty: 3790, currentStockValue: 38665700.00, currentStockPPRate: 0, proposedPPQty: 40106, proposedPPValue: 239575425.00, approvedPlanQty: 0, approvedPlanValue: 0 },
  { id: 3, category: "C",  salesLastYearQty: 1406354.39, salesLastYearValue: 834767219.39, baseStockPct: 10, requiredStockQty: 543,  requiredStockValue: 1701579, requiredStockPPRate: 0, currentStockQty: 74543.05, currentStockValue: 58230069.25, currentStockPPRate: 0, proposedPPQty: 1470298.34, proposedPPValue: 556123577.90, approvedPlanQty: 0, approvedPlanValue: 0 },
];

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ══════════════════════════════════════════════════════════════════════════ */
export default function CreateProductionPlanROPage() {
  const router   = useRouter();
  const basePath = "/operational/production-planning/retail-production-plan/production-plan-ro";

  const [planName,       setPlanName]       = useState("");
  const [categoryRows,   setCategoryRows]   = useState<CategoryRow[]>([]);
  const [searched,       setSearched]       = useState(false);
  const [forwardTo,      setForwardTo]      = useState("");
  const [forwardFor,     setForwardFor]     = useState("Approval");
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent,    setNoteContent]    = useState("");

  const handleSearch = () => { if (planName) { setCategoryRows(SAMPLE_DATA); setSearched(true); } };
  const handleClear  = () => { setPlanName(""); setCategoryRows([]); setSearched(false); setForwardTo(""); setForwardFor("Approval"); };

  const totals = categoryRows.reduce(
    (acc, r) => ({
      salesLastYearQty:    acc.salesLastYearQty    + r.salesLastYearQty,
      salesLastYearValue:  acc.salesLastYearValue  + r.salesLastYearValue,
      requiredStockQty:    acc.requiredStockQty    + r.requiredStockQty,
      requiredStockValue:  acc.requiredStockValue  + r.requiredStockValue,
      currentStockQty:     acc.currentStockQty     + r.currentStockQty,
      currentStockValue:   acc.currentStockValue   + r.currentStockValue,
      proposedPPQty:       acc.proposedPPQty       + r.proposedPPQty,
      proposedPPValue:     acc.proposedPPValue     + r.proposedPPValue,
      approvedPlanQty:     acc.approvedPlanQty     + r.approvedPlanQty,
      approvedPlanValue:   acc.approvedPlanValue   + r.approvedPlanValue,
    }),
    { salesLastYearQty: 0, salesLastYearValue: 0, requiredStockQty: 0, requiredStockValue: 0, currentStockQty: 0, currentStockValue: 0, proposedPPQty: 0, proposedPPValue: 0, approvedPlanQty: 0, approvedPlanValue: 0 }
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
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Production Plan RO</li>
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
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
                </IconBox>
                <select value={planName} onChange={(e) => setPlanName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {HO_PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
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
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Base Stock Precentage</th>
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Required Stock</th>
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Current Stock</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Proposed Plan (PP)</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Approved Plan</th>
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
                  <tr><td colSpan={14} className="border border-stroke px-3 py-4 text-left text-sm text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  categoryRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 font-medium text-[#17a2b8] dark:border-dark-3">{row.category}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{row.baseStockPct}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockPPRate)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockPPRate)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPPQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPPValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.approvedPlanQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.approvedPlanValue)}</td>
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
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPPQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPPValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.approvedPlanQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.approvedPlanValue)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Forward To / For */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="Approval">Approval</option>
                  <option value="Final Approve">Final Approve</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowCreateNote(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Create Note
            </button>
            <div className="flex items-center gap-3">
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

      {/* Create Note Modal */}
      {showCreateNote && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowCreateNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="rounded-t border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-[#f9fafb] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option><option>Serif</option></select>
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option><option>Small</option><option>Large</option></select>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  {[["B","font-bold"],["I","italic"],["U","underline"],["S","line-through"]].map(([l,c])=>(
                    <button key={l} className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className={`text-sm ${c}`}>{l}</span></button>
                  ))}
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sup>2</sup></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>1</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>2</sub></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                  </button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>
                  </button>
                </div>
              </div>
              <div className="mb-5 min-h-[180px] rounded-b border border-t-0 border-stroke p-3 dark:border-dark-3">
                <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={6} placeholder="Enter your content" className="w-full resize-none bg-transparent text-sm text-gray-700 outline-none dark:text-gray-300" />
              </div>
              <div className="mb-6 inline-block rounded border border-[#e8a87c] p-4">
                <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                <div className="space-y-1 text-sm text-dark dark:text-white">
                  <p>Name : SANKARANARAYANAN C</p>
                  <p>Designation : SUPERINTENDENT</p>
                  <p>Date : 11-Mar-2026</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Cancel
                </button>
                <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12" /></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
