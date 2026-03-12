"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Pre-filled mock data for edit
const MOCK_PLAN = {
  planCode: "RPPY1818-3 / Test_Plan_03",
  planFrom: "Jul-2018",
  planTo: "Sep-2018",
  region: "16 / CHENNAI",
  category: "A / Pure Silk Variety",
  createdDate: "23-Aug-2018",
  createdBy: "SANKARANARAYANA C",
  approvedDate: "",
  approvedBy: "",
  dnpOffice: "2107 / D&P OFFICE KANCHIPURAM",
  dnpManager: "",
};

const MONTHS = ["Sep-2018", "Aug-2018", "Jul-2018"]; // reversed

interface ProductRow {
  id: number;
  variety: string;
  totalValue: number;
  monthValues: number[];
}

const PRODUCT_ROWS: ProductRow[] = [
  { id: 1, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS",    totalValue: 21753.60,  monthValues: [5438.40,  5438.40,  10876.80]  },
  { id: 2, variety: "SHS6 / PONNAI TIE & DYE SAREE 5.50 MTRS",  totalValue: 257904.00, monthValues: [64476.00, 64476.00, 128952.00] },
];

const monthValTotals = MONTHS.map((_, mi) => PRODUCT_ROWS.reduce((s, r) => s + (r.monthValues[mi] ?? 0), 0));

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

const ReadField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">{label}</label>
    <div className="flex">
      <IconBox>{icon}</IconBox>
      <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
        {value || <span className="text-gray-400">–</span>}
      </div>
    </div>
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

export default function EditDnpProcurementPlanPage() {
  const router = useRouter();
  const [qtyValues, setQtyValues] = useState<Record<string, number>>({});

  const getQty = (rowId: number, mIdx: number) => qtyValues[`${rowId}-${mIdx}`] ?? 0;
  const setQty = (rowId: number, mIdx: number, val: number) =>
    setQtyValues((prev) => ({ ...prev, [`${rowId}-${mIdx}`]: val }));

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – Edit D&P Office Wise Procurement Plan - HO</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit D&P Office Wise Procurement Plan - HO</li>
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
            {/* Plan Code — spans 2 */}
            <div className="lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                </IconBox>
                <select defaultValue="RPPY1818-3" className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="RPPY1818-3">RPPY1818-3 / Test_Plan_03</option>
                  <option value="RPPY1818-8">RPPY1818-8 / Plan for Co-Optex</option>
                </select>
              </div>
            </div>
            <ReadField label="Plan From" value={MOCK_PLAN.planFrom} icon={<CalIcon />} />
            <ReadField label="Plan To" value={MOCK_PLAN.planTo} icon={<CalIcon />} />

            <div className="row-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Region Code / Name</label>
              <textarea readOnly rows={5} defaultValue={MOCK_PLAN.region} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] outline-none dark:border-dark-3 dark:bg-dark-2" />
            </div>
            <div className="row-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Product Category Code / Name</label>
              <textarea readOnly rows={5} defaultValue={MOCK_PLAN.category} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] outline-none dark:border-dark-3 dark:bg-dark-2" />
            </div>

            <ReadField label="Created Date" value={MOCK_PLAN.createdDate} icon={<CalIcon />} />
            <ReadField label="Created By" value={MOCK_PLAN.createdBy} icon={<UserIcon />} />
            <ReadField label="Approved Date" value={MOCK_PLAN.approvedDate} icon={<CalIcon />} />
            <ReadField label="Approved By" value={MOCK_PLAN.approvedBy} icon={<UserIcon />} />
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office Details */}
          <SectionHeader label="D&P Office Details" />
          <div className="mb-6 flex flex-wrap items-end gap-4">
            <div className="min-w-[260px] flex-1">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">D&P Office Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </IconBox>
                <select defaultValue="2107" className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="2107">2107 / D&P OFFICE KANCHIPURAM</option>
                  <option value="1806">1806 / D&P OFFICE SALEM</option>
                  <option value="1301">1301 / D&P OFFICE ERODE</option>
                </select>
              </div>
            </div>
            <div className="min-w-[220px] flex-1">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">D&P Manager Name</label>
              <div className="flex">
                <IconBox><UserIcon /></IconBox>
                <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                  <span className="text-gray-400">–</span>
                </div>
              </div>
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
                    {MONTHS.map((m) => (
                      <th key={m} className="border border-[#3aa88f] px-3 py-1.5 text-center font-semibold">{m}</th>
                    ))}
                  </tr>
                  <tr className="bg-[#2d8f7b] text-white">
                    {MONTHS.map((m) => (
                      <th key={m} className="border border-[#3aa88f] px-3 py-1 text-center text-xs font-medium">Quantity / Value (₹)</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCT_ROWS.map((row, idx) => (
                    <React.Fragment key={row.id}>
                      <tr className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td rowSpan={2} className="border border-stroke px-3 py-2 text-center align-middle dark:border-dark-3">{idx + 1}</td>
                        <td rowSpan={2} className="border border-stroke px-3 py-2 align-middle dark:border-dark-3">{row.variety}</td>
                        <td className="border border-stroke px-2 py-1 dark:border-dark-3">
                          <input type="number" defaultValue={0} className="w-full rounded border border-stroke bg-white px-2 py-1 text-sm text-right outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                        </td>
                        {MONTHS.map((_, mi) => (
                          <td key={mi} className="border border-stroke px-2 py-1 dark:border-dark-3">
                            <input type="number" value={getQty(row.id, mi)} onChange={(e) => setQty(row.id, mi, Number(e.target.value))} className="w-full rounded border border-stroke bg-white px-2 py-1 text-sm text-right outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                          </td>
                        ))}
                      </tr>
                      <tr className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-1.5 text-right text-xs text-gray-600 dark:border-dark-3 dark:text-gray-400">{row.totalValue.toFixed(2)}</td>
                        {MONTHS.map((_, mi) => (
                          <td key={mi} className="border border-stroke px-3 py-1.5 text-right text-xs text-gray-600 dark:border-dark-3 dark:text-gray-400">
                            {(row.monthValues[mi] ?? 0).toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={3} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">Total</td>
                    {monthValTotals.map((t, mi) => (
                      <td key={mi} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{t.toFixed(2)}</td>
                    ))}
                  </tr>
                </tfoot>
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
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 003.2 7.2M2 12.5a10 10 0 0018.8 4.2"/></svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
