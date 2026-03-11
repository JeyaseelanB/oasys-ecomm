"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegionRow {
  id: number;
  productVariety: string;
  uom: string;
  indentingRegion: string;
  soFarQty: number;
  soFarValue: number;
  currentQty: number;
  currentValue: number;
  progressQty: number;
  progressValue: number;
  balanceQty: number;
  balanceValue: number;
  totalQty: number;
  totalValue: number;
  values: number;
}

const MONTH_YEAR_OPTIONS = [
  "Jan-2018","Feb-2018","Mar-2018","Apr-2018","May-2018","Jun-2018",
  "Jul-2018","Aug-2018","Sep-2018","Oct-2018","Nov-2018","Dec-2018",
  "Jan-2019","Feb-2019","Mar-2019","Apr-2019","May-2019","Jun-2019",
  "Jul-2019","Aug-2019","Sep-2019","Oct-2019","Nov-2019","Dec-2019",
  "Jan-2024","Feb-2024","Mar-2024","Apr-2024","May-2024","Jun-2024",
  "Jul-2024","Aug-2024","Sep-2024","Oct-2024","Nov-2024","Dec-2024",
  "Jan-2025","Feb-2025","Mar-2025","Apr-2025","May-2025","Jun-2025",
];

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">{children}</div>
);
const CalendarIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

const inputCls = "w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const roCls   = "w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white";
const selCls  = "w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";

export default function CreateProcurementOrderPage() {
  const router = useRouter();

  // Production Plan Details
  const [planCode, setPlanCode]           = useState("");
  const [planFrom, setPlanFrom]           = useState("");
  const [planTo, setPlanTo]               = useState("");
  const [regionCode, setRegionCode]       = useState("");
  const [productVariety, setProductVariety] = useState("");

  // D&P Office – Procurement Order Details
  const [dnpOffice, setDnpOffice]         = useState("");
  const [categoryCode, setCategoryCode]   = useState("");
  const [procFrom, setProcFrom]           = useState("");
  const [procTo, setProcTo]               = useState("");
  const [validityDate, setValidityDate]   = useState("");
  const [notLaterThan, setNotLaterThan]   = useState("");
  const [totalPlanQty, setTotalPlanQty]   = useState("");
  const [totalPlanValue, setTotalPlanValue] = useState("");

  // Generated table rows
  const [regionRows, setRegionRows]   = useState<RegionRow[]>([]);
  const [generating, setGenerating]   = useState(false);

  const handleGenerate = () => {
    if (!dnpOffice || !categoryCode || !procFrom || !procTo) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const regions = ["16/CHENNAI","11/COIMBATORE","18/SALEM","17/MADURAI","21/VELLORE","12/CUDDALORE","19/THANJAVUR","20/TIRUNELVELI","52/MUMBAI","59/VIJAYAWADA","51/BANGALORE"];
      const variety = categoryCode === "AJ" ? "SCLB/SOFT SILK SAREE WITH BLOUSE" : "ZNPL/40S X 40S POWERLOOM PRINTED COTTON NIGHTIES L SIZE";
      setRegionRows(regions.map((r, i) => ({
        id: i + 1, productVariety: variety, uom: "NOS", indentingRegion: r,
        soFarQty: 0, soFarValue: 0, currentQty: 1000, currentValue: 10000000,
        progressQty: 0, progressValue: 0, balanceQty: 0, balanceValue: 0,
        totalQty: 0, totalValue: 0, values: 0,
      })));
      setTotalPlanQty((11 * 1000).toString());
      setTotalPlanValue((11 * 10000000).toString());
    }, 800);
  };

  const handleClearDnp = () => {
    setDnpOffice(""); setCategoryCode(""); setProcFrom(""); setProcTo("");
    setValidityDate(""); setNotLaterThan(""); setTotalPlanQty(""); setTotalPlanValue("");
    setRegionRows([]);
  };

  // Workflow
  const [forwardTo, setForwardTo]     = useState("");
  const [forwardFor, setForwardFor]   = useState("Approval");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  // Totals
  const totSoFarQty = regionRows.reduce((s,r) => s + r.soFarQty, 0);
  const totSoFarVal = regionRows.reduce((s,r) => s + r.soFarValue, 0);
  const totCurQty   = regionRows.reduce((s,r) => s + r.currentQty, 0);
  const totCurVal   = regionRows.reduce((s,r) => s + r.currentValue, 0);
  const totPrgQty   = regionRows.reduce((s,r) => s + r.progressQty, 0);
  const totPrgVal   = regionRows.reduce((s,r) => s + r.progressValue, 0);
  const totBalQty   = regionRows.reduce((s,r) => s + r.balanceQty, 0);
  const totBalVal   = regionRows.reduce((s,r) => s + r.balanceValue, 0);
  const totTotQty   = regionRows.reduce((s,r) => s + r.totalQty, 0);
  const totTotVal   = regionRows.reduce((s,r) => s + r.totalValue, 0);
  const totValues   = regionRows.reduce((s,r) => s + r.values, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – Procurement Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Retail Sales – Procurement Order</li>
          </ol>
        </nav>
      </div>

      {/* 3-Step indicator */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white px-6 py-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="relative flex items-center">
          <div className="absolute left-0 right-0 top-5 h-px bg-gray-200 dark:bg-dark-3"></div>
          {[
            { n: 1, label: "Procurement Order Creation",  active: true  },
            { n: 2, label: "Procurement Order Approval",  active: false },
            { n: 3, label: "Procurement Order Finalize",  active: false },
          ].map(({ n, label, active }) => (
            <div key={n} className="relative z-10 flex flex-1 flex-col items-center">
              <div className={`flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold ${active ? "border-[#e57b26] bg-white text-[#e57b26] dark:bg-gray-dark" : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark dark:text-gray-500"}`}>{n}</div>
              <p className={`mt-2 text-center text-xs font-medium ${active ? "text-dark dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Procurement Order - HO</h3>
          <span className="text-xs text-white opacity-90">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Production Plan Details */}
          <SectionHeader label="Production Plan Details" />
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Plan Code – spans 2 cols */}
            <div className="lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <select value={planCode} onChange={(e) => setPlanCode(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  <option value="RPPY1818-8">RPPY1818-8 / Plan for Co-Optex</option>
                  <option value="RPPY1919-1">RPPY1919-1 / Retail_Plan_2019_Q1</option>
                  <option value="RPPY2020-1">RPPY2020-1 / Retail_Plan_2020_Q1</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan From</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <div className={roCls}>{planCode === "RPPY1818-8" ? "01-Aug-2018" : planCode === "RPPY1919-1" ? "01-Jan-2019" : ""}</div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan To</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <div className={roCls}>{planCode === "RPPY1818-8" ? "30-Nov-2019" : planCode === "RPPY1919-1" ? "31-Mar-2019" : ""}</div>
              </div>
            </div>
            {/* Region Code */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500">Region Code / Name</label>
              <textarea value={regionCode} onChange={(e) => setRegionCode(e.target.value)} rows={3}
                className="w-full resize-none rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            </div>
            {/* Product Variety */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500">Product Variety Code / Name</label>
              <textarea value={productVariety} onChange={(e) => setProductVariety(e.target.value)} rows={3}
                className="w-full resize-none rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            </div>
            {/* Created Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Created Date</label>
              <div className="flex"><IconBox><CalendarIcon /></IconBox><div className={roCls}></div></div>
            </div>
            {/* Created By */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Created By</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <div className={roCls}></div>
              </div>
            </div>
            {/* Approved Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Approved Date</label>
              <div className="flex"><IconBox><CalendarIcon /></IconBox><div className={roCls}></div></div>
            </div>
            {/* Approved By */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Approved By</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <div className={roCls}></div>
              </div>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office – Procurement Order Details */}
          <SectionHeader label="D & P Office – Procurement Order Details" />
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">D&amp;P Office Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={dnpOffice} onChange={(e) => setDnpOffice(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  <option value="1806">1806/D&P Office Salem</option>
                  <option value="1301">1301/D&P OFFICE ERODE</option>
                  <option value="2107">2107/D&P OFFICE KANCHIPURAM</option>
                  <option value="1106">1106/NMP CFDS CENTRE ERODE</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg></IconBox>
                <select value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  <option value="AJ">AJ/Half Fine Silk</option>
                  <option value="A">A/Pure Silk Variety</option>
                  <option value="C">C/Cotton Variety</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Procurement From</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <select value={procFrom} onChange={(e) => setProcFrom(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  {MONTH_YEAR_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Procurement To</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <select value={procTo} onChange={(e) => setProcTo(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  {MONTH_YEAR_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            {/* Validity Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Validity Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={validityDate} onChange={(e) => setValidityDate(e.target.value)}
                  className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3"><CalendarIcon /></div>
              </div>
            </div>
            {/* Not Later Than */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Not Later Than</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={notLaterThan} onChange={(e) => setNotLaterThan(e.target.value)}
                  className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3"><CalendarIcon /></div>
              </div>
            </div>
            {/* Total Production Plan Quantity */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Total Production Plan Quantity / Meters</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="21" x2="21" y2="3"/><path d="M8 8l4-4M16 16l4-4"/></svg></IconBox>
                <div className={roCls}>{totalPlanQty}</div>
              </div>
            </div>
            {/* Total Production Plan Value */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Total Production Plan Value (Tentative)</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">₹</span></IconBox>
                <div className={roCls}>{totalPlanValue}</div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex items-end justify-end gap-2 lg:col-span-4">
              <button onClick={handleClearDnp} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={handleGenerate} disabled={generating || !dnpOffice || !categoryCode || !procFrom || !procTo}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                {generating ? (
                  <><svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>Generating...</>
                ) : (
                  <><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>Generate</>
                )}
              </button>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Intending Region Wise table */}
          <SectionHeader label="Intending Region Wise – Product Variety Details" />
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#267a68] text-white">
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Product Variety Code / Name</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">UOM</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Indenting Region</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">So Far</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Current</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Progress</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Balance</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Total</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Values (₹)</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  {["Quantity","Value (₹)","Quantity","Value (₹)","Quantity","Value (₹)","Quantity","Value (₹)","Quantity","Value (₹)"].map((h, i) => (
                    <th key={i} className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {regionRows.length === 0 ? (
                  <tr><td colSpan={15} className="py-5 text-center text-gray-400">No records found</td></tr>
                ) : (
                  regionRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#e8f8f5] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-1.5 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">{row.productVariety}</td>
                      <td className="border border-stroke px-2 py-1.5 text-center dark:border-dark-3">{row.uom}</td>
                      <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">{row.indentingRegion}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.soFarQty}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.soFarValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.currentQty}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.currentValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.progressQty.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.progressValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.balanceQty.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.balanceValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.totalQty.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.totalValue.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{row.values.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {regionRows.length > 0 && (
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={4} className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totSoFarQty}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totSoFarVal.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totCurQty}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totCurVal.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totPrgQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totPrgVal.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totBalQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totBalVal.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totTotQty.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totTotVal.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-1.5 text-right dark:border-dark-3">{totValues.toFixed(2)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Workflow */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className={selCls}>
                  <option value="Approval">Approval</option>
                  <option value="Review">Review</option>
                  <option value="Final Approved">Final Approved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/operational/procurement/retail-procurement/procurement-order/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
                Save
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-1 rounded border border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-dark-2">
                {["B","I","U","S"].map((f) => <button key={f} className="flex size-6 items-center justify-center rounded text-xs font-bold text-gray-600 hover:bg-gray-200 dark:text-gray-300">{f}</button>)}
                <div className="mx-1 h-4 w-px bg-gray-300"></div>
                {["H1","H2",'""',"<>"].map((f) => <button key={f} className="flex h-6 items-center rounded px-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300">{f}</button>)}
                <div className="mx-1 h-4 w-px bg-gray-300"></div>
                {["≡","≡","🔗","⊞"].map((f, i) => <button key={i} className="flex h-6 items-center rounded px-1 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300">{f}</button>)}
              </div>
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="Enter text ..." rows={6}
                className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              <div className="mt-3 inline-block rounded border-2 border-red-400 px-4 py-3">
                <p className="mb-1 text-xs font-semibold text-dark dark:text-white">Created By</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Name : ARULMARY</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Designation : ASSISTANT SALES WOMEN</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Date : 11-Mar-2026</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
              </button>
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
