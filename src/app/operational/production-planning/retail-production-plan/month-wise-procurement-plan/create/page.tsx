"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const PLAN_OPTIONS = [
  "Produ_Deepavali_2025-26", "2023_2024_ANNUAL_PLAN", "test plan 2023-24",
  "23-24 yearly plan", "PLAN 2023-2024", "plan24", "plan-ch1", "plan-ch", "Testing1",
];

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const TOTAL_ELIGIBILITY = 10658400;

function generateMonths(from: string, to: string): { month: string; percentage: number; value: number }[] {
  if (!from || !to) return [];
  const [fromM, fromY] = from.split("-").map((v, i) => i === 0 ? parseInt(v) - 1 : parseInt(v));
  const [toM, toY]     = to.split("-").map((v, i) => i === 0 ? parseInt(v) - 1 : parseInt(v));
  const rows: { month: string; percentage: number; value: number }[] = [];
  let m = fromM as number, y = fromY as number;
  while (y < (toY as number) || (y === (toY as number) && m <= (toM as number))) {
    rows.push({ month: `${MONTH_NAMES[m]} ${y}`, percentage: 0, value: 0 });
    m++; if (m > 11) { m = 0; y++; }
    if (rows.length > 24) break;
  }
  return rows;
}

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

export default function CreateMonthWiseProcurementPlanPage() {
  const router = useRouter();
  const [planCode,     setPlanCode]     = useState("");
  const [fromMonth,    setFromMonth]    = useState("");
  const [toMonth,      setToMonth]      = useState("");
  const [regionCode,   setRegionCode]   = useState("");
  const [productCat,   setProductCat]   = useState("");
  const [prevFromDate, setPrevFromDate] = useState("");
  const [prevToDate,   setPrevToDate]   = useState("");
  const [baseStock,    setBaseStock]    = useState("0.00");
  const [errors,       setErrors]       = useState<Record<string,string>>({});

  const months = useMemo(() => generateMonths(fromMonth, toMonth), [fromMonth, toMonth]);
  const [monthData, setMonthData] = useState<{month:string; percentage:number; value:number}[]>([]);

  // Re-generate when from/to change
  useMemo(() => {
    setMonthData(generateMonths(fromMonth, toMonth));
  }, [fromMonth, toMonth]);

  const updatePercentage = (idx: number, pct: number) => {
    setMonthData(prev => prev.map((r, i) => {
      if (i !== idx) return r;
      const value = (TOTAL_ELIGIBILITY * pct) / 100;
      return { ...r, percentage: pct, value };
    }));
  };

  const totalPct   = monthData.reduce((s, r) => s + r.percentage, 0);
  const totalVal   = monthData.reduce((s, r) => s + r.value, 0);
  const remPct     = 100 - totalPct;
  const remVal     = TOTAL_ELIGIBILITY - totalVal;

  const validate = () => {
    const e: Record<string,string> = {};
    if (!planCode)   e.planCode   = "Required";
    if (!fromMonth)  e.fromMonth  = "Required";
    if (!toMonth)    e.toMonth    = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/operational/production-planning/retail-production-plan/month-wise-procurement-plan/list");
  };

  const labelCls = "block text-xs font-medium text-dark dark:text-white mb-1";
  const errCls   = "mt-0.5 text-xs text-red-500";
  const bordCls  = (k: string) => errors[k] ? "border-red-400" : "border-stroke dark:border-dark-3";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales - Month Wise Procurement Plan</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Production Plan</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Retail Sales - Month Wise Procurement Plan</li>
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
            {/* Left form */}
            <div className="flex-1 space-y-4">
              {/* Plan Code / Name */}
              <div>
                <label className={labelCls}>Plan Code / Name <span className="text-red-500">*</span></label>
                <div className={`flex items-center overflow-hidden rounded border ${bordCls("planCode")} bg-white dark:bg-gray-dark`}>
                  <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><HashIcon /></span>
                  <select value={planCode} onChange={e=>{setPlanCode(e.target.value); if(errors.planCode) setErrors(p=>({...p,planCode:""}));}}
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                    <option value="">Select</option>
                    {PLAN_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {errors.planCode && <p className={errCls}>{errors.planCode}</p>}
              </div>

              {/* From / To */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>From</label>
                  <div className={`flex items-center overflow-hidden rounded border ${bordCls("fromMonth")} bg-white dark:bg-gray-dark`}>
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <input type="month" value={fromMonth} onChange={e=>{setFromMonth(e.target.value); if(errors.fromMonth) setErrors(p=>({...p,fromMonth:""}));}}
                      className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                  </div>
                  {errors.fromMonth && <p className={errCls}>{errors.fromMonth}</p>}
                </div>
                <div>
                  <label className={labelCls}>To</label>
                  <div className={`flex items-center overflow-hidden rounded border ${bordCls("toMonth")} bg-white dark:bg-gray-dark`}>
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <input type="month" value={toMonth} onChange={e=>{setToMonth(e.target.value); if(errors.toMonth) setErrors(p=>({...p,toMonth:""}));}}
                      className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                  </div>
                  {errors.toMonth && <p className={errCls}>{errors.toMonth}</p>}
                </div>
              </div>

              {/* Region / Product Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Region Code / Name</label>
                  <textarea value={regionCode} onChange={e=>setRegionCode(e.target.value)} rows={3}
                    className="w-full resize-none rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
                <div>
                  <label className={labelCls}>Product Category Code / Name</label>
                  <textarea value={productCat} onChange={e=>setProductCat(e.target.value)} rows={3}
                    className="w-full resize-none rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>

              {/* Previous Sales dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Previous Sales - From Date</label>
                  <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <input type="month" value={prevFromDate} onChange={e=>setPrevFromDate(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Previous Sales - To Date</label>
                  <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                    <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
                    <input type="month" value={prevToDate} onChange={e=>setPrevToDate(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Base Stock Percentage */}
              <div className="w-48">
                <label className={labelCls}>Base Stock Percentage</label>
                <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                  <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><PctIcon /></span>
                  <input type="number" step="0.01" value={baseStock} onChange={e=>setBaseStock(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 text-right text-sm text-dark focus:outline-none dark:text-white" />
                </div>
              </div>
            </div>

            {/* Center: Month table */}
            <div className="w-[340px] shrink-0">
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
                    {monthData.length === 0 ? (
                      <tr><td colSpan={4} className="py-6 text-center text-xs text-gray-400">No records found.</td></tr>
                    ) : monthData.map((row, i) => (
                      <tr key={i} className={i%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                        <td className="border-r border-stroke px-2 py-1.5 text-center text-gray-500">{i+1}</td>
                        <td className="border-r border-stroke px-3 py-1.5 text-center">{row.month}</td>
                        <td className="border-r border-stroke px-1 py-1">
                          <input type="number" step="0.01" min="0" max="100" value={row.percentage || ""}
                            onChange={e=>updatePercentage(i, parseFloat(e.target.value)||0)}
                            className="w-full rounded border border-stroke px-2 py-0.5 text-right text-xs focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-800 dark:text-white" />
                        </td>
                        <td className="px-3 py-1.5 text-right">{row.value.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
                      <td colSpan={2} className="border-r border-stroke px-3 py-1.5 text-right text-xs">Total</td>
                      <td className="border-r border-stroke px-3 py-1.5 text-right text-xs">{totalPct.toFixed(1)}</td>
                      <td className="px-3 py-1.5 text-right text-xs">{totalVal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Summary panel */}
            <div className="w-[200px] shrink-0 space-y-3">
              <div className="rounded bg-[#2d8f7b] p-3 space-y-3">
                <div>
                  <p className="text-[10px] text-white/80 mb-1">Total Eligibility Value (₹)</p>
                  <input readOnly value={TOTAL_ELIGIBILITY.toFixed(2)}
                    className="w-full rounded border border-white/30 bg-white px-2 py-1 text-right text-xs text-dark" />
                </div>
                <div>
                  <p className="text-[10px] text-white/80 mb-1">Remaining Percentage(%)</p>
                  <input readOnly value={remPct.toFixed(2)}
                    className="w-full rounded border border-white/30 bg-white px-2 py-1 text-right text-xs text-dark" />
                </div>
                <div>
                  <p className="text-[10px] text-white/80 mb-1">Remaining Value (₹)</p>
                  <input readOnly value={remVal.toFixed(2)}
                    className="w-full rounded border border-white/30 bg-white px-2 py-1 text-right text-xs text-dark" />
                </div>
              </div>

              {/* Note */}
              <div>
                <p className="text-xs font-medium text-dark dark:text-white mb-1">Note</p>
                <div className="rounded border border-stroke bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:border-dark-3 dark:bg-gray-800 dark:text-gray-300 min-h-[80px]">
                  Monthwise Plan Value Should be equal to the total Production Plan value
                </div>
              </div>

              {/* Validation warning */}
              {monthData.length > 0 && Math.abs(totalPct - 100) > 0.01 && (
                <p className="text-[10px] text-red-500">Total percentage must equal 100% (currently {totalPct.toFixed(1)}%)</p>
              )}
            </div>
          </div>

          {/* Buttons — bottom-right of card */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 mt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/production-planning/retail-production-plan/month-wise-procurement-plan/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
