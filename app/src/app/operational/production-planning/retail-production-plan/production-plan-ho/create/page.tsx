"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─── Shared icon helpers ─────────────────────────────────────────────────── */

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const CalendarIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CalendarIconBox = () => (
  <IconBox><CalendarIcon /></IconBox>
);

const HashIconBox = () => (
  <IconBox><span className="text-sm font-bold">#</span></IconBox>
);

const PctIconBox = () => (
  <IconBox>
    <span className="flex size-6 items-center justify-center rounded-full border border-gray-400 text-xs font-bold text-gray-500 dark:border-gray-500 dark:text-gray-400">%</span>
  </IconBox>
);

/* ─── Multi-select dropdown ───────────────────────────────────────────────── */

function MultiSelect({
  icon, placeholder, options, selected, onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (v: string) =>
    onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);

  return (
    <div className="relative flex">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
        {icon}
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[40px] w-full items-center justify-between rounded-r border border-stroke bg-transparent px-3 py-2 text-left text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({selected.length}) {placeholder}
        </span>
        <svg className={`size-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[200px] max-h-52 overflow-y-auto rounded border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark">
          {options.map((o) => (
            <label key={o} className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-dark-2">
              <input type="checkbox" checked={selected.includes(o)} onChange={() => toggle(o)} className="accent-primary" />
              <span className="text-dark dark:text-white">{o}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Option data ─────────────────────────────────────────────────────────── */

const MONTH_YEAR_OPTIONS = (() => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const opts: string[] = [];
  for (let y = 2023; y <= 2027; y++) for (const m of months) opts.push(`${m}-${y}`);
  return opts;
})();

const SALES_DURATION_OPTS = ["MONTHLY","QUARTERLY","HALF YEARLY","ANNUALLY"];
const YEARS  = ["2022","2023","2024","2025","2026","2027"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const REGIONS    = ["10 / COIMBATORE","11 / COIMBATORE","12 / CUDDALORE","16 / CHENNAI","20 / MADURAI","30 / TRICHY","40 / SALEM","55 / ERODE"];
const SHOWROOMS  = ["1114/MARUTHAM","1115/R.S.PURAM","1118/POLLACHI","1201/CUDDALORE MAIN","1601/ANNA SALAI","1602/T.NAGAR","2001/MADURAI MAIN","3001/TRICHY MAIN"];
const CATEGORIES = ["C / COTTON","S / SILK","P / POLYESTER","B / BLENDED","H / HANDLOOM"];

/* ─── Category Wise table types ───────────────────────────────────────────── */

interface CategoryRow {
  id: number; category: string;
  salesLastYearQty: number; salesLastYearValue: number; salesLastYearPPRate: number;
  anticipatedSalesQty: number; anticipatedSalesValue: number;
  baseStockPct: number;
  baseStockQty: number; baseStockValue: number;
  averagePP: number;
  currentStockQty: number; currentStockValue: number; currentStockPPRate: number;
  requiredStockQty: number; requiredStockValue: number; requiredStockPPRate: number;
  proposedPlanQty: number; proposedPlanProfitPct: number; proposedPlanPPValue: number; proposedPlanRPValue: number;
  hoApprovedPlanQty: number; hoApprovedPlanValue: number;
}

const SAMPLE_CATEGORY_DATA: CategoryRow[] = [
  { id: 1, category: "C / COTTON",   salesLastYearQty: 393, salesLastYearValue: 841427,  salesLastYearPPRate: 2142, anticipatedSalesQty: 432, anticipatedSalesValue: 925570,  baseStockPct: 40.0, baseStockQty: 173, baseStockValue: 370228,  averagePP: 596, currentStockQty: 634900, currentStockValue: 491473660, currentStockPPRate: 774, requiredStockQty: 605, requiredStockValue: 1295798, requiredStockPPRate: 2142, proposedPlanQty: 0, proposedPlanProfitPct: 0, proposedPlanPPValue: 0, proposedPlanRPValue: 0, hoApprovedPlanQty: 0, hoApprovedPlanValue: 0 },
  { id: 2, category: "S / SILK",     salesLastYearQty: 120, salesLastYearValue: 360000,  salesLastYearPPRate: 3000, anticipatedSalesQty: 140, anticipatedSalesValue: 420000,  baseStockPct: 40.0, baseStockQty:  56, baseStockValue: 168000,  averagePP: 750, currentStockQty:     98, currentStockValue:     73500, currentStockPPRate: 750, requiredStockQty:  84, requiredStockValue:   63000, requiredStockPPRate: 3000, proposedPlanQty: 0, proposedPlanProfitPct: 0, proposedPlanPPValue: 0, proposedPlanRPValue: 0, hoApprovedPlanQty: 0, hoApprovedPlanValue: 0 },
  { id: 3, category: "H / HANDLOOM", salesLastYearQty: 250, salesLastYearValue: 500000,  salesLastYearPPRate: 2000, anticipatedSalesQty: 275, anticipatedSalesValue: 550000,  baseStockPct: 40.0, baseStockQty: 110, baseStockValue: 220000,  averagePP: 480, currentStockQty:    190, currentStockValue:     91200, currentStockPPRate: 480, requiredStockQty: 165, requiredStockValue:   79200, requiredStockPPRate: 2000, proposedPlanQty: 0, proposedPlanProfitPct: 0, proposedPlanPPValue: 0, proposedPlanRPValue: 0, hoApprovedPlanQty: 0, hoApprovedPlanValue: 0 },
];

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function CreateProductionPlanHOPage() {
  const router   = useRouter();
  const basePath = "/operational/production-planning/retail-production-plan/production-plan-ho";

  /* form state */
  const [planName,          setPlanName]          = useState("");
  const [planFrom,          setPlanFrom]          = useState("");
  const [planTo,            setPlanTo]            = useState("");
  const [salesDuration,     setSalesDuration]     = useState("");
  const [selectedRegions,   setSelectedRegions]   = useState<string[]>([]);
  const [selectedShowrooms, setSelectedShowrooms] = useState<string[]>([]);
  const [selectedCategories,setSelectedCategories]= useState<string[]>([]);
  const [bsFromYear,        setBsFromYear]        = useState("");
  const [bsFromMonth,       setBsFromMonth]       = useState("");
  const [bsToYear,          setBsToYear]          = useState("");
  const [bsToMonth,         setBsToMonth]         = useState("");
  const [bsPct,             setBsPct]             = useState("");
  const [anticipatedPct,    setAnticipatedPct]    = useState("");
  const [stockDate,         setStockDate]         = useState("");

  /* table state */
  const [categoryRows, setCategoryRows] = useState<CategoryRow[]>([]);
  const [searched,     setSearched]     = useState(false);

  /* workflow */
  const [forwardTo,  setForwardTo]  = useState("");
  const [forwardFor, setForwardFor] = useState("Approval");

  /* modal */
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent,    setNoteContent]    = useState("");

  const handleSearch = () => {
    setCategoryRows(SAMPLE_CATEGORY_DATA);
    setSearched(true);
  };

  const handleClear = () => {
    setPlanName(""); setPlanFrom(""); setPlanTo(""); setSalesDuration("");
    setSelectedRegions([]); setSelectedShowrooms([]); setSelectedCategories([]);
    setBsFromYear(""); setBsFromMonth(""); setBsToYear(""); setBsToMonth("");
    setBsPct(""); setAnticipatedPct(""); setStockDate("");
    setCategoryRows([]); setSearched(false);
    setForwardTo(""); setForwardFor("Approval");
  };

  const totals = categoryRows.reduce(
    (acc, r) => ({
      salesLastYearQty:      acc.salesLastYearQty      + r.salesLastYearQty,
      salesLastYearValue:    acc.salesLastYearValue    + r.salesLastYearValue,
      anticipatedSalesQty:   acc.anticipatedSalesQty   + r.anticipatedSalesQty,
      anticipatedSalesValue: acc.anticipatedSalesValue + r.anticipatedSalesValue,
      baseStockQty:          acc.baseStockQty          + r.baseStockQty,
      baseStockValue:        acc.baseStockValue        + r.baseStockValue,
      currentStockQty:       acc.currentStockQty       + r.currentStockQty,
      currentStockValue:     acc.currentStockValue     + r.currentStockValue,
      requiredStockQty:      acc.requiredStockQty      + r.requiredStockQty,
      requiredStockValue:    acc.requiredStockValue    + r.requiredStockValue,
      proposedPlanQty:       acc.proposedPlanQty       + r.proposedPlanQty,
      proposedPlanPPValue:   acc.proposedPlanPPValue   + r.proposedPlanPPValue,
      proposedPlanRPValue:   acc.proposedPlanRPValue   + r.proposedPlanRPValue,
      hoApprovedPlanQty:     acc.hoApprovedPlanQty     + r.hoApprovedPlanQty,
      hoApprovedPlanValue:   acc.hoApprovedPlanValue   + r.hoApprovedPlanValue,
    }),
    { salesLastYearQty: 0, salesLastYearValue: 0, anticipatedSalesQty: 0, anticipatedSalesValue: 0, baseStockQty: 0, baseStockValue: 0, currentStockQty: 0, currentStockValue: 0, requiredStockQty: 0, requiredStockValue: 0, proposedPlanQty: 0, proposedPlanPPValue: 0, proposedPlanRPValue: 0, hoApprovedPlanQty: 0, hoApprovedPlanValue: 0 }
  );

  /* ── render ── */
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
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Production Plan</li>
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
          {/* ── 4-column form grid ── */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-4">

            {/* Row 1: Plan Name | Plan From | Plan To | Sales Duration */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
                  </svg>
                </IconBox>
                <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Production Plan - From <span className="text-red-500">*</span></label>
              <div className="flex">
                <CalendarIconBox />
                <select value={planFrom} onChange={(e) => setPlanFrom(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Month-Year</option>
                  {MONTH_YEAR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Production Plan - To <span className="text-red-500">*</span></label>
              <div className="flex">
                <CalendarIconBox />
                <select value={planTo} onChange={(e) => setPlanTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Month-Year</option>
                  {MONTH_YEAR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Sales Duration <span className="text-red-500">*</span></label>
              <div className="flex">
                <CalendarIconBox />
                <select value={salesDuration} onChange={(e) => setSalesDuration(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {SALES_DURATION_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: Region | Showroom | Category (3 cols, 4th col empty) */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Region Code / Name</label>
              <MultiSelect
                icon={<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>}
                placeholder="Selected"
                options={REGIONS}
                selected={selectedRegions}
                onChange={setSelectedRegions}
              />
              <textarea readOnly value={selectedRegions.join("\n")} rows={2} className="mt-1.5 w-full resize-none rounded border border-stroke bg-gray-50 px-2 py-1.5 text-xs text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Showroom</label>
              <MultiSelect
                icon={<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>}
                placeholder="Showroom Selected"
                options={SHOWROOMS}
                selected={selectedShowrooms}
                onChange={setSelectedShowrooms}
              />
              <textarea readOnly value={selectedShowrooms.join("\n")} rows={2} className="mt-1.5 w-full resize-none rounded border border-stroke bg-gray-50 px-2 py-1.5 text-xs text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name</label>
              <MultiSelect
                icon={<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7" /><polyline points="2,17 12,22 22,17" /><polyline points="2,12 12,17 22,12" /></svg>}
                placeholder="Selected"
                options={CATEGORIES}
                selected={selectedCategories}
                onChange={setSelectedCategories}
              />
              <textarea readOnly value={selectedCategories.join("\n")} rows={2} className="mt-1.5 w-full resize-none rounded border border-stroke bg-gray-50 px-2 py-1.5 text-xs text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            </div>

            {/* 4th col spacer */}
            <div />

            {/* Row 3: Base Stock From Year | From Month | To Year | To Month */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Base Stock From Year <span className="text-red-500">*</span></label>
              <div className="flex">
                <HashIconBox />
                <select value={bsFromYear} onChange={(e) => setBsFromYear(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Base Stock From Month <span className="text-red-500">*</span></label>
              <div className="flex">
                <HashIconBox />
                <select value={bsFromMonth} onChange={(e) => setBsFromMonth(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Base Stock To Year <span className="text-red-500">*</span></label>
              <div className="flex">
                <HashIconBox />
                <select value={bsToYear} onChange={(e) => setBsToYear(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Base Stock To Month <span className="text-red-500">*</span></label>
              <div className="flex">
                <HashIconBox />
                <select value={bsToMonth} onChange={(e) => setBsToMonth(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Row 4: Base Stock % | Anticipated % | Stock Date | Clear+Search */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Base Stock Precentage <span className="text-red-500">*</span></label>
              <div className="flex">
                <PctIconBox />
                <input type="number" min="0" max="100" step="0.1" value={bsPct} onChange={(e) => setBsPct(e.target.value)} placeholder="0.0" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Anticipated Sale&apos;s Percentage <span className="text-red-500">*</span></label>
              <div className="flex">
                <PctIconBox />
                <input type="number" min="0" step="0.1" value={anticipatedPct} onChange={(e) => setAnticipatedPct(e.target.value)} placeholder="0.0" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Stock Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <CalendarIconBox />
                <input type="text" placeholder="dd-MMM-yyyy" value={stockDate} onChange={(e) => setStockDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>

            <div className="flex items-end justify-end gap-2">
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
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Sales Last Year</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Anticipated Sale&apos;s</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Base Stock Precentage</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Base Stock</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center align-middle font-semibold">Average PP</th>
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Current Stock</th>
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Required Stock</th>
                  <th colSpan={4} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Proposed Plan</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HO Approved Plan</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  {/* Sales Last Year */}
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">PP Rate(&#8377;)</th>
                  {/* Anticipated Sale's */}
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  {/* Base Stock */}
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  {/* Current Stock */}
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">PP Rate(&#8377;)</th>
                  {/* Required Stock */}
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">PP Rate(&#8377;)</th>
                  {/* Proposed Plan */}
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Profit(%)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">(PP) value(&#8377;)</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">(RP) value(&#8377;)</th>
                  {/* HO Approved Plan */}
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Value(&#8377;)</th>
                </tr>
              </thead>
              <tbody>
                {categoryRows.length === 0 ? (
                  <tr>
                    <td colSpan={20} className="border border-stroke px-3 py-4 text-left text-sm text-gray-400 dark:border-dark-3">
                      {searched ? "No records found" : "No records found"}
                    </td>
                  </tr>
                ) : (
                  categoryRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 align-middle font-medium text-dark dark:border-dark-3 dark:text-white">{row.category}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.salesLastYearPPRate)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.anticipatedSalesQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.anticipatedSalesValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{row.baseStockPct.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.baseStockQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.baseStockValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.averagePP)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentStockPPRate)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.requiredStockPPRate)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPlanQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{row.proposedPlanProfitPct.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPlanPPValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.proposedPlanRPValue)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.hoApprovedPlanQty)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{fmt(row.hoApprovedPlanValue)}</td>
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
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.anticipatedSalesQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.anticipatedSalesValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.baseStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.baseStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.currentStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.requiredStockValue)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPlanQty)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPlanPPValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.proposedPlanRPValue)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.hoApprovedPlanQty)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(totals.hoApprovedPlanValue)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* ── Forward To / For ── */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                </IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                </IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="Approval">Approval</option>
                  <option value="Final Approve">Final Approve</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Bottom action buttons ── */}
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

      {/* ══════════════════ CREATE NOTE MODAL ══════════════════ */}
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
              {/* Rich text toolbar */}
              <div className="rounded-t border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-[#f9fafb] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option><option>Serif</option><option>Monospace</option></select>
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option><option>Small</option><option>Large</option></select>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  {[["B","font-bold"],["I","italic"],["U","underline"],["S","line-through"]].map(([l,c])=>(
                    <button key={l} className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className={`text-sm ${c}`}>{l}</span></button>
                  ))}
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm font-bold">A</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sup>2</sup></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>1</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>2</sub></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" /></svg></button>
                </div>
              </div>
              <div className="mb-5 min-h-[180px] rounded-b border border-t-0 border-stroke p-3 dark:border-dark-3">
                <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={6} placeholder="Enter your content" className="w-full resize-none bg-transparent text-sm text-gray-700 outline-none dark:text-gray-300" />
              </div>

              {/* Created By */}
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
