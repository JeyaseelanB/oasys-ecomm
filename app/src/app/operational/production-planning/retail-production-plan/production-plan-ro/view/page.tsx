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

const ReadField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
    <div className="flex">
      <IconBox>{icon}</IconBox>
      <div className="flex min-h-[40px] w-full items-center rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">{value}</div>
    </div>
  </div>
);

/* ─── Category data ──────────────────────────────────────────────────────── */
interface CategoryRow {
  id: number; category: string;
  salesLastYearQty: number; salesLastYearValue: number;
  baseStockPct: number; averagePP: number;
  requiredStockQty: number; requiredStockValue: number;
  currentStockQty: number; currentStockValue: number;
  proposedPPQty: number; proposedPPValue: number;
  proposedRPQty: number; proposedRPValue: number;
  hoApprovedQty: number; hoApprovedValue: number;
  roApprovedQty: number; roApprovedValue: number;
  srApprovedQty: number; srApprovedValue: number;
}

const SAMPLE_DATA: CategoryRow[] = [
  { id: 1, category: "A",  salesLastYearQty: 2352.1,  salesLastYearValue: 25737662.00, baseStockPct: 10, averagePP: 6021, requiredStockQty: 2845,  requiredStockValue: 31142572.00,  currentStockQty: 156.9, currentStockValue: 2246069.00, proposedPPQty: 2235.2,  proposedPPValue: 29026035.00, proposedRPQty: 2235.2,  proposedRPValue: 23975854.00, hoApprovedQty: 21639537,  hoApprovedValue: 281008320100.00, roApprovedQty: 21639537, roApprovedValue: 281008320100.00, srApprovedQty: 0, srApprovedValue: 0 },
  { id: 2, category: "AJ", salesLastYearQty: 4949,    salesLastYearValue: 38716840.00, baseStockPct: 10, averagePP: 3747, requiredStockQty: 5987,  requiredStockValue: 46847377.00,  currentStockQty: 483,   currentStockValue: 5113090.00, proposedPPQty: 4545,    proposedPPValue: 28910800.00, proposedRPQty: 4545,    proposedRPValue: 34199959.00, hoApprovedQty: 34456373,  hoApprovedValue: 219177401700.00, roApprovedQty: 34456373, roApprovedValue: 219177408200.00, srApprovedQty: 0, srApprovedValue: 0 },
];

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─── SVG icons ──────────────────────────────────────────────────────────── */
const DocIcon    = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>;
const CalIcon    = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const HashIcon   = () => <span className="text-sm font-bold">#</span>;
const PctIcon    = () => <span className="flex size-6 items-center justify-center rounded-full border border-gray-400 text-xs font-bold text-gray-500 dark:border-gray-500 dark:text-gray-400">%</span>;
const PersonIcon = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>;
const CopyIcon   = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>;

/* ══════════════════════════════════════════════════════════════════════════ */
export default function ViewProductionPlanROPage() {
  const router   = useRouter();
  const basePath = "/operational/production-planning/retail-production-plan/production-plan-ro";

  const plan = {
    planName:      "nighsn",
    planFrom:      "April 2025",
    planTo:        "June 2025",
    salesDuration: "YEAR",
    finYear:       "2019 - 2020",
    baseStockPct:  "10.0",
    stockDate:     "2025-04-16",
    regionCode:    "16/CHENNAI,",
    showroom:      "1632/ T.NAGAR,\n1650/TVPM-EGMORE,",
  };

  const [showViewNote,  setShowViewNote]  = useState(false);
  const [showComments,  setShowComments]  = useState(false);
  const [activeTab,     setActiveTab]     = useState<"Approve" | "Reject">("Approve");
  const [commentText,   setCommentText]   = useState("");

  const totals = SAMPLE_DATA.reduce(
    (acc, r) => ({
      salesLastYearQty:  acc.salesLastYearQty  + r.salesLastYearQty,
      salesLastYearValue:acc.salesLastYearValue + r.salesLastYearValue,
      requiredStockQty:  acc.requiredStockQty  + r.requiredStockQty,
      requiredStockValue:acc.requiredStockValue + r.requiredStockValue,
      currentStockQty:   acc.currentStockQty   + r.currentStockQty,
      currentStockValue: acc.currentStockValue + r.currentStockValue,
      proposedPPQty:     acc.proposedPPQty     + r.proposedPPQty,
      proposedPPValue:   acc.proposedPPValue   + r.proposedPPValue,
      proposedRPQty:     acc.proposedRPQty     + r.proposedRPQty,
      proposedRPValue:   acc.proposedRPValue   + r.proposedRPValue,
      hoApprovedQty:     acc.hoApprovedQty     + r.hoApprovedQty,
      hoApprovedValue:   acc.hoApprovedValue   + r.hoApprovedValue,
      roApprovedQty:     acc.roApprovedQty     + r.roApprovedQty,
      roApprovedValue:   acc.roApprovedValue   + r.roApprovedValue,
    }),
    { salesLastYearQty: 0, salesLastYearValue: 0, requiredStockQty: 0, requiredStockValue: 0, currentStockQty: 0, currentStockValue: 0, proposedPPQty: 0, proposedPPValue: 0, proposedRPQty: 0, proposedRPValue: 0, hoApprovedQty: 0, hoApprovedValue: 0, roApprovedQty: 0, roApprovedValue: 0 }
  );

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Production Plan RO</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Plan RO</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Production Plan RO</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Production Plan RO</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <button className="text-white/80 hover:text-white"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /></svg></button>
          </div>
        </div>

        <div className="p-5">
          {/* Row 1: Plan Name | PP From | PP To | Sales Duration */}
          <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
            <ReadField label="Plan Name *"             value={plan.planName}      icon={<DocIcon />} />
            <ReadField label="Production Plan - From *" value={plan.planFrom}     icon={<CalIcon />} />
            <ReadField label="Production Plan - To *"   value={plan.planTo}       icon={<CalIcon />} />
            <ReadField label="Sales Duration"           value={plan.salesDuration} icon={<CalIcon />} />
          </div>

          {/* Row 2: Fin Year | Base Stock % | Stock Date | Region Code */}
          <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
            <ReadField label="Fin Year"              value={plan.finYear}      icon={<HashIcon />} />
            <ReadField label="Base Stock Precentage" value={plan.baseStockPct} icon={<PctIcon />} />
            <ReadField label="Stock Date *"          value={plan.stockDate}    icon={<CalIcon />} />
            <ReadField label="Region Code / Name"    value={plan.regionCode}   icon={<PersonIcon />} />
          </div>

          {/* Showroom */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Showroom</label>
            <div className="flex">
              <IconBox><CopyIcon /></IconBox>
              <textarea readOnly value={plan.showroom} rows={3} className="w-full resize-none rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
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
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Average PP</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Required Stock</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Current Stock</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Proposed Plan (PP)</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Proposed Plan (RP)</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HO Approved Plan</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">RO Approved Plan</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">SR Approved Plan</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  {["Quantity","Value(₹)","Quantity","Value(₹)","Quantity","Value(₹)","Quantity","Value(₹)","Quantity","Value(₹)","Quantity","Value(₹)","Quantity","Value(₹)","Quantity","Value(₹)"].map((h, i) => (
                    <th key={i} className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SAMPLE_DATA.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 font-medium text-[#17a2b8] dark:border-dark-3">{row.category}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{row.baseStockPct}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.averagePP)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPPQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPPValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedRPQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedRPValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.hoApprovedQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.hoApprovedValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.roApprovedQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.roApprovedValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.srApprovedQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.srApprovedValue)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.salesLastYearQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.salesLastYearValue)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPPQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPPValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedRPQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedRPValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.hoApprovedQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.hoApprovedValue)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.roApprovedQty)}</td>
                  <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.roApprovedValue)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Bottom action row: View Note | Comments icon | Back */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowViewNote(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                View Note
              </button>
              <button onClick={() => setShowComments(true)} className="flex size-9 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              </button>
            </div>
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6" /></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ══ View Note Modal ══ */}
      {showViewNote && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-5 min-h-[160px] rounded border border-stroke p-3 text-sm text-gray-700 dark:border-dark-3 dark:text-gray-300">
                mnm
              </div>
              <div className="flex justify-end">
                <button onClick={() => setShowViewNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ Comments Modal ══ */}
      {showComments && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowComments(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Tabs */}
              <div className="flex border-b border-stroke dark:border-dark-3">
                <button
                  onClick={() => setActiveTab("Approve")}
                  className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "Approve" ? "border-b-2 border-[#17a2b8] text-[#17a2b8]" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                >
                  👍 Approve
                </button>
                <button
                  onClick={() => setActiveTab("Reject")}
                  className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "Reject" ? "border-b-2 border-[#dc3545] text-[#dc3545]" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                >
                  👎 Reject
                </button>
              </div>

              <div className="mt-4">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={5}
                  placeholder={`Enter ${activeTab === "Approve" ? "approval" : "rejection"} comment...`}
                  className="w-full resize-none rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button onClick={() => setShowComments(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Cancel
                </button>
                <button
                  onClick={() => setShowComments(false)}
                  className={`flex items-center gap-1.5 rounded px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 ${activeTab === "Approve" ? "bg-[#28a745]" : "bg-[#dc3545]"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12" /></svg>
                  {activeTab}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
