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

/* Read-only display field */
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
  { id: 1, category: "A",  salesLastYearQty: 10484,      salesLastYearValue: 142954546.50, baseStockPct: 10, averagePP: 6015, requiredStockQty: 12669, requiredStockValue: 172975014.00, currentStockQty: 525.05,    currentStockValue: 6266532.50,   proposedPPQty: 10995.95,    proposedPPValue: 110766204.50, proposedRPQty: 10995.95,    proposedRPValue: 150958827.00, hoApprovedQty: 16761,      hoApprovedValue: 168663192.00, roApprovedQty: 21639537, roApprovedValue: 281008320100.00, srApprovedQty: 0, srApprovedValue: 0 },
  { id: 2, category: "AJ", salesLastYearQty: 39925,      salesLastYearValue: 357465922.58, baseStockPct: 10, averagePP: 3571, requiredStockQty: 48297,  requiredStockValue: 432533792.00, currentStockQty: 3790,      currentStockValue: 38665700.00,  proposedPPQty: 40106,       proposedPPValue: 239575425.00, proposedRPQty: 40106,       proposedRPValue: 354401834.58, hoApprovedQty: 59477,      hoApprovedValue: 409015886.00, roApprovedQty: 34456373, roApprovedValue: 219177408200.00, srApprovedQty: 0, srApprovedValue: 0 },
  { id: 3, category: "C",  salesLastYearQty: 1406354.39, salesLastYearValue: 834767219.39, baseStockPct: 10, averagePP: 543,  requiredStockQty: 1701579, requiredStockValue: 1010068616.00, currentStockQty: 74543.05, currentStockValue: 58230069.25,  proposedPPQty: 1470298.34,  proposedPPValue: 556123577.90, proposedRPQty: 1470298.34, proposedRPValue: 858859414.14, hoApprovedQty: 1172270, hoApprovedValue: 443522566.60, roApprovedQty: 0, roApprovedValue: 0, srApprovedQty: 0, srApprovedValue: 0 },
];

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─── SVG icons ──────────────────────────────────────────────────────────── */
const DocIcon  = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>;
const CalIcon  = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const HashIcon = () => <span className="text-sm font-bold">#</span>;
const PctIcon  = () => <span className="flex size-6 items-center justify-center rounded-full border border-gray-400 text-xs font-bold text-gray-500 dark:border-gray-500 dark:text-gray-400">%</span>;
const PersonIcon = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>;
const CopyIcon = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>;
const ArrowIcon = () => <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>;

/* ══════════════════════════════════════════════════════════════════════════ */
export default function EditProductionPlanROPage() {
  const router   = useRouter();
  const basePath = "/operational/production-planning/retail-production-plan/production-plan-ro";

  /* Pre-populated plan data (would come from API) */
  const plan = {
    planName:      "oasys",
    planFrom:      "October 2025",
    planTo:        "December 2025",
    salesDuration: "MONTHLY",
    salesFromYear: "2019",
    salesFromMonth:"JANUARY",
    salesToYear:   "2024",
    salesToMonth:  "OCTOBER",
    finYear:       "2019 - 2024",
    baseStockPct:  "10.0",
    stockDate:     "2025-03-26",
    regionCode:    "16/CHENNAI,",
    showroom:      "1612/SILK HOUSE - MYLAPORE,\n1613/SECRETARIAT,\n1615/MADIRAKAM",
  };

  const [forwardTo,      setForwardTo]      = useState("");
  const [forwardFor,     setForwardFor]     = useState("Approval");
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent,    setNoteContent]    = useState("");

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
            <ReadField label="Plan Name *" value={plan.planName}      icon={<DocIcon />} />
            <ReadField label="Production Plan - From *" value={plan.planFrom}   icon={<CalIcon />} />
            <ReadField label="Production Plan - To *"   value={plan.planTo}     icon={<CalIcon />} />
            <ReadField label="Sales Duration"           value={plan.salesDuration} icon={<CalIcon />} />
          </div>

          {/* Row 2: Sales From Year | From Month | To Year | To Month */}
          <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
            <ReadField label="Sales From Year"  value={plan.salesFromYear}  icon={<HashIcon />} />
            <ReadField label="Sales From Month" value={plan.salesFromMonth} icon={<HashIcon />} />
            <ReadField label="Sales To Year"    value={plan.salesToYear}    icon={<HashIcon />} />
            <ReadField label="Sales To Month"   value={plan.salesToMonth}   icon={<HashIcon />} />
          </div>

          {/* Row 3: Fin Year | Base Stock % | Stock Date | Region Code */}
          <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">
            <ReadField label="Fin Year"              value={plan.finYear}      icon={<HashIcon />} />
            <ReadField label="Base Stock Precentage" value={plan.baseStockPct} icon={<PctIcon />} />
            <ReadField label="Stock Date *"          value={plan.stockDate}    icon={<CalIcon />} />
            <ReadField label="Region Code / Name"    value={plan.regionCode}   icon={<PersonIcon />} />
          </div>

          {/* Row 4: Showroom */}
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
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
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

          {/* Forward To / For */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><ArrowIcon /></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><ArrowIcon /></IconBox>
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
                  <p>Name : PREMKUMAR M</p>
                  <p>Designation : SENIOR ASSISTANT</p>
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
