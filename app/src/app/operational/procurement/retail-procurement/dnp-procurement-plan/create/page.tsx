"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ProductRow {
  id: number;
  variety: string;
  totalValue: number;
  monthValues: number[];
}

const PLAN_OPTIONS = [
  { value: "RPPY1818-3", label: "RPPY1818-3 / Test_Plan_03", planFrom: "Jul-2018", planTo: "Sep-2018", region: "16 / CHENNAI", category: "A / Pure Silk Variety", createdDate: "23-Aug-2018", createdBy: "SANKARANARAYANA C" },
  { value: "RPPY1818-8", label: "RPPY1818-8 / Plan for Co-Optex", planFrom: "Aug-2018", planTo: "Oct-2018", region: "05 / SOUTH REGION", category: "C / Cotton Variety", createdDate: "10-Aug-2018", createdBy: "3596" },
];

const DNP_OPTIONS = [
  { value: "2107", label: "2107 / D&P OFFICE KANCHIPURAM", manager: "ANITHA G" },
  { value: "1806", label: "1806 / D&P OFFICE SALEM",       manager: "KUMAR S" },
  { value: "1301", label: "1301 / D&P OFFICE ERODE",       manager: "RAJESH M" },
];

const MOCK_PRODUCTS_BY_PLAN: Record<string, ProductRow[]> = {
  "RPPY1818-3": [
    { id: 1, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", totalValue: 21753.60, monthValues: [5438.40, 5438.40, 10876.80] },
    { id: 2, variety: "SHS6 / PONNAI TIE & DYE SAREE 5.50 MTRS", totalValue: 257904.00, monthValues: [64476.00, 64476.00, 128952.00] },
  ],
  "RPPY1818-8": [
    { id: 1, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", totalValue: 15000.00, monthValues: [5000.00, 5000.00, 5000.00] },
  ],
};

const getMonths = (planFrom: string, planTo: string): string[] => {
  const MONTH_MAP: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const [fromMon, fromYr] = planFrom.split("-");
  const [toMon, toYr] = planTo.split("-");
  const from = new Date(parseInt(fromYr), MONTH_MAP[fromMon]);
  const to = new Date(parseInt(toYr), MONTH_MAP[toMon]);
  const months: string[] = [];
  const cur = new Date(to);
  while (cur >= from) {
    months.push(cur.toLocaleString("en-US", { month: "short" }) + "-" + cur.getFullYear());
    cur.setMonth(cur.getMonth() - 1);
  }
  return months;
};

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const CalIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

export default function CreateDnpProcurementPlanPage() {
  const router = useRouter();

  const [planCode, setPlanCode] = useState("");
  const [dnpOffice, setDnpOffice] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [qtyValues, setQtyValues] = useState<Record<string, number>>({});

  const selectedPlan = PLAN_OPTIONS.find((p) => p.value === planCode);
  const selectedDnp = DNP_OPTIONS.find((d) => d.value === dnpOffice);

  const months = selectedPlan ? getMonths(selectedPlan.planFrom, selectedPlan.planTo) : [];
  const productRows = (generated && planCode ? MOCK_PRODUCTS_BY_PLAN[planCode] : null) ?? [];

  const canGenerate = planCode !== "" && dnpOffice !== "";

  const handleGenerate = () => {
    if (!canGenerate) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 800);
  };

  const handleClearForm = () => {
    setPlanCode("");
    setDnpOffice("");
    setGenerated(false);
    setQtyValues({});
  };

  const getQty = (rowId: number, mIdx: number) => qtyValues[`${rowId}-${mIdx}`] ?? 0;
  const setQty = (rowId: number, mIdx: number, val: number) =>
    setQtyValues((prev) => ({ ...prev, [`${rowId}-${mIdx}`]: val }));

  const monthColTotals = months.map((_, mi) => productRows.reduce((s, r) => s + (qtyValues[`${r.id}-${mi}`] ?? 0), 0));
  const monthValTotals = months.map((_, mi) => productRows.reduce((s, r) => s + (r.monthValues[mi] ?? 0), 0));

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – Create D&P Office Wise Procurement Plan - HO</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create D&P Office Wise Procurement Plan - HO</li>
          </ol>
        </nav>
      </div>

      {/* Step indicator */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white px-6 py-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="relative flex items-center">
          <div className="absolute left-0 right-0 top-5 h-px bg-gray-200 dark:bg-dark-3"></div>
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#fd7e14] bg-white text-sm font-bold text-[#fd7e14] dark:bg-gray-dark">1</div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">D &amp; P Plan Creation</p>
          </div>
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-bold text-gray-400 dark:bg-gray-dark">2</div>
            <p className="mt-2 text-center text-xs font-medium text-gray-400">D &amp; P Plan Approval</p>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Create D&P Office Wise Procurement Plan - HO</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">( Mandatory Fields )</span>
            <svg className="size-5 text-white cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        </div>

        <div className="p-5">
          {/* Retail Production Plan Details */}
          <SectionHeader label="Retail Production Plan Details" />
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Plan Code / Name — spans 2 cols */}
            <div className="lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                </IconBox>
                <select value={planCode} onChange={(e) => { setPlanCode(e.target.value); setGenerated(false); setQtyValues({}); }}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  {PLAN_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Plan From */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Plan From</label>
              <div className="flex">
                <IconBox><CalIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  {selectedPlan?.planFrom || <span className="text-gray-400">-</span>}
                </div>
              </div>
            </div>

            {/* Plan To */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Plan To</label>
              <div className="flex">
                <IconBox><CalIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  {selectedPlan?.planTo || <span className="text-gray-400">-</span>}
                </div>
              </div>
            </div>

            {/* Region Code / Name — tall textarea, row-span */}
            <div className="row-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Region Code / Name</label>
              <textarea readOnly rows={5} value={selectedPlan?.region ?? ""} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] outline-none dark:border-dark-3 dark:bg-dark-2" placeholder="–" />
            </div>

            {/* Product Category Code / Name — tall textarea, row-span */}
            <div className="row-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Product Category Code / Name</label>
              <textarea readOnly rows={5} value={selectedPlan?.category ?? ""} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] outline-none dark:border-dark-3 dark:bg-dark-2" placeholder="–" />
            </div>

            {/* Created Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Created Date</label>
              <div className="flex">
                <IconBox><CalIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  {selectedPlan?.createdDate || <span className="text-gray-400">–</span>}
                </div>
              </div>
            </div>

            {/* Created By */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Created By</label>
              <div className="flex">
                <IconBox><UserIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  {selectedPlan?.createdBy || <span className="text-gray-400">–</span>}
                </div>
              </div>
            </div>

            {/* Approved Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Approved Date</label>
              <div className="flex">
                <IconBox><CalIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  <span className="text-gray-400">–</span>
                </div>
              </div>
            </div>

            {/* Approved By */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Approved By</label>
              <div className="flex">
                <IconBox><UserIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  <span className="text-gray-400">–</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office Details */}
          <SectionHeader label="D&P Office Details" />
          <div className="mb-6 flex flex-wrap items-end gap-4">
            {/* D&P Office Code / Name */}
            <div className="min-w-[260px] flex-1">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">D&P Office Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </IconBox>
                <select value={dnpOffice} onChange={(e) => setDnpOffice(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  {DNP_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* D&P Manager Name */}
            <div className="min-w-[220px] flex-1">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">D&P Manager Name</label>
              <div className="flex">
                <IconBox><UserIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  {selectedDnp?.manager || <span className="text-gray-400">–</span>}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button onClick={handleClearForm}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 003.2 7.2M2 12.5a10 10 0 0018.8 4.2"/></svg>
                Clear
              </button>
              <button onClick={handleGenerate} disabled={!canGenerate || generating}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                {generating ? (
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity={0.3}/><path d="M21 12a9 9 0 00-9-9"/></svg>
                ) : (
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 003.2 7.2M2 12.5a10 10 0 0018.8 4.2"/></svg>
                )}
                Generate
              </button>
            </div>
          </div>

          {/* Product Variety Wise - Procurement Plan Table */}
          <div className="mb-5 border-t border-stroke pt-5 dark:border-dark-3">
            <SectionHeader label="Product Variety Wise – Procurement Plan" />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th rowSpan={2} className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold align-middle">#</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold align-middle">Product Variety Code / Name</th>
                    <th rowSpan={2} className="w-40 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold align-middle">Total Quantity / Value (₹)</th>
                    {months.map((m) => (
                      <th key={m} className="border border-[#3aa88f] px-3 py-1.5 text-center font-semibold">{m}</th>
                    ))}
                    {months.length === 0 && <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Month</th>}
                  </tr>
                  <tr className="bg-[#2d8f7b] text-white">
                    {months.map((m) => (
                      <th key={m} className="border border-[#3aa88f] px-3 py-1 text-center text-xs font-medium">Quantity / Value (₹)</th>
                    ))}
                    {months.length === 0 && <th className="border border-[#3aa88f] px-3 py-1 text-center text-xs font-medium">Quantity / Value (₹)</th>}
                  </tr>
                </thead>
                <tbody>
                  {productRows.length === 0 ? (
                    <tr><td colSpan={3 + Math.max(months.length, 1)} className="py-6 text-center text-sm text-gray-400">No records found.</td></tr>
                  ) : (
                    productRows.map((row, idx) => (
                      <React.Fragment key={row.id}>
                        <tr className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                          <td rowSpan={2} className="border border-stroke px-3 py-2 text-center align-middle dark:border-dark-3">{idx + 1}</td>
                          <td rowSpan={2} className="border border-stroke px-3 py-2 align-middle dark:border-dark-3">{row.variety}</td>
                          <td className="border border-stroke px-2 py-1 dark:border-dark-3">
                            <input type="number" defaultValue={0} className="w-full rounded border border-stroke bg-white px-2 py-1 text-sm text-right outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                          </td>
                          {months.map((_, mi) => (
                            <td key={mi} className="border border-stroke px-2 py-1 dark:border-dark-3">
                              <input type="number" value={getQty(row.id, mi)} onChange={(e) => setQty(row.id, mi, Number(e.target.value))} className="w-full rounded border border-stroke bg-white px-2 py-1 text-sm text-right outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                            </td>
                          ))}
                        </tr>
                        <tr className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                          <td className="border border-stroke px-3 py-1.5 text-right text-xs text-gray-600 dark:border-dark-3 dark:text-gray-400">{row.totalValue.toFixed(2)}</td>
                          {months.map((_, mi) => (
                            <td key={mi} className="border border-stroke px-3 py-1.5 text-right text-xs text-gray-600 dark:border-dark-3 dark:text-gray-400">
                              {(row.monthValues[mi] ?? 0).toFixed(2)}
                            </td>
                          ))}
                        </tr>
                      </React.Fragment>
                    ))
                  )}
                </tbody>
                {productRows.length > 0 && (
                  <tfoot>
                    <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                      <td colSpan={3} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">Total</td>
                      {months.map((_, mi) => (
                        <td key={mi} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">
                          {monthValTotals[mi].toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/procurement/retail-procurement/dnp-procurement-plan/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
              Save
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
