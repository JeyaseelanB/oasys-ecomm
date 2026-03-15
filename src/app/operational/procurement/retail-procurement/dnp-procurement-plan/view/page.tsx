"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK = {
  planCode: "RPPY1818-3 / Test_Plan_03",
  planFrom: "Jul-2018",
  planTo: "Sep-2018",
  region: "16 / CHENNAI",
  category: "A / Pure Silk Variety",
  createdDate: "23-Aug-2018 07:18 PM",
  createdBy: "SANKARANARAYANA C",
  approvedDate: "",
  approvedBy: "",
  dnpOffice: "2107 / D&P OFFICE KANCHIPURAM",
  dnpManager: "",
};

const MONTHS = ["Sep-2018", "Aug-2018", "Jul-2018"];

interface ProductRow {
  id: number;
  variety: string;
  totalQty: number;
  totalValue: number;
  monthQty: number[];
  monthValues: number[];
}

const PRODUCT_ROWS: ProductRow[] = [
  { id: 1, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS",    totalQty: 0, totalValue: 21753.60,  monthQty: [0, 0, 0], monthValues: [5438.40,  5438.40,  10876.80]  },
  { id: 2, variety: "SHS6 / PONNAI TIE & DYE SAREE 5.50 MTRS",  totalQty: 0, totalValue: 257904.00, monthQty: [0, 0, 0], monthValues: [64476.00, 64476.00, 128952.00] },
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

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#17a2b8]">{value || "–"}</p>
  </div>
);

export default function ViewDnpProcurementPlanPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Retail Sales – View D&P Office Wise Procurement Plan - HO</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View D&P Office Wise Procurement Plan - HO</li>
          </ol>
        </nav>
      </div>

      {/* Step indicator */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white px-6 py-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="relative flex items-center">
          <div className="absolute left-0 right-0 top-5 h-px bg-gray-200 dark:bg-dark-3"></div>
          {/* Step 1 — completed (green checkmark) */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#28a745] bg-[#28a745] dark:bg-[#28a745]">
              <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <p className="mt-2 text-center text-xs font-medium text-gray-400 dark:text-gray-400">D &amp; P Plan Creation</p>
          </div>
          {/* Step 2 — pending (orange) */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#fd7e14] bg-white text-sm font-bold text-[#fd7e14] dark:bg-gray-dark">2</div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">D &amp; P Plan Approval</p>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">D &amp; P Office Wise Procurement Plan - HO</h3>
          <svg className="size-5 text-white cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>

        <div className="p-5">
          {/* Retail Production Plan Details */}
          <SectionHeader label="Retail Production Plan Details" />
          <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Plan Code / Name" value={MOCK.planCode} />
            <Field label="Plan From" value={MOCK.planFrom} />
            <Field label="Plan To" value={MOCK.planTo} />
            <Field label="Region Code / Name" value={MOCK.region} />
            <Field label="Product Category Code / Name" value={MOCK.category} />
            <Field label="Created Date" value={MOCK.createdDate} />
            <Field label="Created By" value={MOCK.createdBy} />
            <Field label="Approved Date" value={MOCK.approvedDate} />
            <Field label="Approved By" value={MOCK.approvedBy} />
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office Details */}
          <SectionHeader label="D&P Office Details" />
          <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="D&P Office Code / Name" value={MOCK.dnpOffice} />
            <Field label="D&P Manager Name" value={MOCK.dnpManager} />
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Product Variety Wise Procurement Plan Table */}
          <SectionHeader label="Product Variety Wise Procurement Plan" />
          <div className="mb-5 overflow-x-auto">
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
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.totalQty}</td>
                      {MONTHS.map((_, mi) => (
                        <td key={mi} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.monthQty[mi]?.toFixed(2) ?? "0.00"}</td>
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

          {/* Back button */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/procurement/retail-procurement/dnp-procurement-plan/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
