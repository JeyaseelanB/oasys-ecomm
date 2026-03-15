"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SocietyRow {
  id: number;
  societyCode: string;
  totalQuantity: number;
}

const MONTH_YEAR_OPTIONS = [
  "Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024", "Jun-2024",
  "Jul-2024", "Aug-2024", "Sep-2024", "Oct-2024", "Nov-2024", "Dec-2024",
  "Jan-2025", "Feb-2025", "Mar-2025", "Apr-2025", "May-2025", "Jun-2025",
  "Jul-2025", "Aug-2025", "Sep-2025", "Oct-2025", "Nov-2025", "Dec-2025",
];

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

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

export default function CreateSocietyWiseProductionPlanPage() {
  const router = useRouter();

  // Production Plan Details
  const [planCode, setPlanCode] = useState("");
  const [planFrom, setPlanFrom] = useState("");
  const [planPeriodTo, setPlanPeriodTo] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [productVarietyCode, setProductVarietyCode] = useState("");

  // D&P Office Details
  const [categoryCode, setCategoryCode] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [varietyCode, setVarietyCode] = useState("");
  const [societyPlanFrom, setSocietyPlanFrom] = useState("");
  const [societyPlanTo, setSocietyPlanTo] = useState("");

  // Generated details table
  const [societyRows, setSocietyRows] = useState<SocietyRow[]>([]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!categoryCode || !varietyCode || !societyPlanFrom || !societyPlanTo) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setSocietyRows([
        { id: 1, societyCode: "1001 / KANCHIPURAM SOCIETY",  totalQuantity: 120 },
        { id: 2, societyCode: "1002 / SALEM SOCIETY",         totalQuantity: 85  },
        { id: 3, societyCode: "1003 / COIMBATORE SOCIETY",    totalQuantity: 200 },
        { id: 4, societyCode: "1004 / TRICHY SOCIETY",        totalQuantity: 150 },
        { id: 5, societyCode: "1005 / MADURAI SOCIETY",       totalQuantity: 95  },
      ]);
    }, 800);
  };

  const handleClearDnp = () => {
    setCategoryCode("");
    setGroupCode("");
    setVarietyCode("");
    setSocietyPlanFrom("");
    setSocietyPlanTo("");
    setSocietyRows([]);
  };

  const totalQty = societyRows.reduce((s, r) => s + r.totalQuantity, 0);

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – Society Wise Production Plan</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Retail Sales – Society Wise Production Plan</li>
          </ol>
        </nav>
      </div>

      {/* Step indicator */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white px-6 py-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="relative flex items-center">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-5 h-px bg-gray-200 dark:bg-dark-3"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#e57b26] bg-white text-sm font-bold text-[#e57b26] dark:bg-gray-dark">
              1
            </div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">Society Wise Production Plan creation</p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-medium text-gray-400 dark:border-dark-3 dark:bg-gray-dark dark:text-gray-500">
              2
            </div>
            <p className="mt-2 text-center text-xs font-medium text-gray-400 dark:text-gray-500">Society Wise Production Plan Approval</p>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Retail Sales – Society Wise Production Plan</h3>
          <span className="text-xs text-white opacity-90">( Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Production Plan Details */}
          <SectionHeader label="Production Plan Details" />
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Plan Code / Name */}
            <div className="lg:col-span-1">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                </IconBox>
                <select value={planCode} onChange={(e) => setPlanCode(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="RPPY1818-3">RPPY1818-3 / Test_Plan_03</option>
                  <option value="RPPY1818-4">RPPY1818-4 / Test_Plan_04</option>
                  <option value="RPPY1919-1">RPPY1919-1 / Retail_Plan_2019_Q1</option>
                </select>
              </div>
            </div>

            {/* Plan From */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan From</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <input type="text" placeholder="dd-MMM-yyyy" value={planFrom} onChange={(e) => setPlanFrom(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>

            {/* Plan Period To */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Period To</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <input type="text" placeholder="dd-MMM-yyyy" value={planPeriodTo} onChange={(e) => setPlanPeriodTo(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>

            {/* Empty filler for 4-col grid row */}
            <div className="hidden lg:block"></div>

            {/* Region Code / Name — tall textarea */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500">Region Code / Name</label>
              <textarea value={regionCode} onChange={(e) => setRegionCode(e.target.value)} rows={3}
                className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white resize-none" />
            </div>

            {/* Product Variety Code / Name — tall textarea */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500">Product Variety Code / Name</label>
              <textarea value={productVarietyCode} onChange={(e) => setProductVarietyCode(e.target.value)} rows={3}
                className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white resize-none" />
            </div>

            {/* Created Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Created Date</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"></div>
              </div>
            </div>

            {/* Created By */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Created By</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"></div>
              </div>
            </div>

            {/* Approved Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Approved Date</label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"></div>
              </div>
            </div>

            {/* Approved By */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Approved By</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"></div>
              </div>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office Details */}
          <SectionHeader label="D&P Office Details" />
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* D&P Office Code — readonly */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">D&amp;P Office Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  D&amp;P OFFICE KANCHIPURAM
                </div>
              </div>
            </div>

            {/* Product Category Code */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>
                </IconBox>
                <select value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="C">C / Cotton Variety</option>
                  <option value="D">D / Powerloom Variety</option>
                  <option value="S">S / Silk Variety</option>
                </select>
              </div>
            </div>

            {/* Product Group Code */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Group Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </IconBox>
                <select value={groupCode} onChange={(e) => setGroupCode(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="11">11 / COTTON SAREES</option>
                  <option value="69">69 / PL BEDSHEET & TABLE CLOTH</option>
                  <option value="1000">1000 / ANGAVAS SALEM</option>
                </select>
              </div>
            </div>

            {/* Product Variety Code */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Variety Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>
                </IconBox>
                <select value={varietyCode} onChange={(e) => setVarietyCode(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="SHE6">SHE6 / SAREES KANCHEE COTTON 5.50 MTRS</option>
                  <option value="YSD6">YSD6 / PL SUITING UNIFORM</option>
                  <option value="YPS6">YPS6 / PL CHUDITHAR TOP</option>
                </select>
              </div>
            </div>

            {/* Society Plan From */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Society Plan From <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <select value={societyPlanFrom} onChange={(e) => setSocietyPlanFrom(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Month-Year</option>
                  {MONTH_YEAR_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Society Plan To */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Society Plan To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CalendarIcon /></IconBox>
                <select value={societyPlanTo} onChange={(e) => setSocietyPlanTo(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Month-Year</option>
                  {MONTH_YEAR_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Spacer + Clear/Generate buttons on same row */}
            <div className="hidden lg:block"></div>
            <div className="flex items-end justify-end gap-2">
              <button onClick={handleClearDnp}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Clear
              </button>
              <button onClick={handleGenerate} disabled={generating || !categoryCode || !varietyCode || !societyPlanFrom || !societyPlanTo}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                {generating ? (
                  <>
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Society Wise Production Plan Details */}
          <SectionHeader label="Society Wise Production Plan Details" />
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Society Code / Name</th>
                  <th className="w-40 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {societyRows.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-5 text-center text-sm text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  societyRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.societyCode}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">
                        <input
                          type="text"
                          value={row.totalQuantity}
                          onChange={(e) => setSocietyRows((prev) =>
                            prev.map((r) => r.id === row.id ? { ...r, totalQuantity: Number(e.target.value) || 0 } : r)
                          )}
                          className="w-full rounded border border-stroke bg-transparent px-2 py-0.5 text-right text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {societyRows.length > 0 && (
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={2} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">{totalQty}</td>
                  </tr>
                </tfoot>
              )}
              {societyRows.length === 0 && (
                <tfoot>
                  <tr className="bg-gray-50 dark:bg-[#1a2232]">
                    <td colSpan={2} className="border border-stroke px-3 py-2 text-right text-xs font-semibold text-gray-500 dark:border-dark-3">Total</td>
                    <td className="border border-stroke px-3 py-2 text-right text-xs text-gray-400 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Bottom action buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/procurement/retail-procurement/society-wise-production-plan/list")}
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
  );
}
