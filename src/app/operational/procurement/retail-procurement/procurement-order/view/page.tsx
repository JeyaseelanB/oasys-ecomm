"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MOCK = {
  planCode: "RPPY1818-8 / Test_Plan_08",
  planFrom: "01-Aug-2018",
  planPeriodTo: "31-Oct-2018",
  regionCode: "05 / SOUTH REGION",
  productVarietyCode: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS",
  createdDate: "10-Aug-2018",
  createdBy: "3596",
  approvedDate: "15-Aug-2018",
  approvedBy: "ANITHA G",
  dnpOfficeCode: "2107 / D&P OFFICE KANCHIPURAM",
  categoryCode: "C / Cotton Variety",
  procurementFrom: "Aug-2018",
  procurementTo: "Oct-2018",
  validityDate: "31-Oct-2018",
  notLaterThan: "15-Oct-2018",
  totalPlanQty: "650",
  totalPlanValue: "₹ 9,75,000.00",
  orderCode: "SPH18T03",
};

const MOCK_ROWS = [
  { id: 1, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "01 / CHENNAI REGION", issuedQty: 80, issuedValue: 120000, qty: 80, value: 120000 },
  { id: 2, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "02 / COIMBATORE REGION", issuedQty: 65, issuedValue: 97500, qty: 65, value: 97500 },
  { id: 3, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "03 / MADURAI REGION", issuedQty: 90, issuedValue: 135000, qty: 90, value: 135000 },
  { id: 4, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "04 / TRICHY REGION", issuedQty: 55, issuedValue: 82500, qty: 55, value: 82500 },
  { id: 5, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "05 / SOUTH REGION", issuedQty: 70, issuedValue: 105000, qty: 70, value: 105000 },
  { id: 6, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "06 / NORTH REGION", issuedQty: 45, issuedValue: 67500, qty: 45, value: 67500 },
  { id: 7, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "07 / EAST REGION", issuedQty: 60, issuedValue: 90000, qty: 60, value: 90000 },
  { id: 8, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "08 / WEST REGION", issuedQty: 75, issuedValue: 112500, qty: 75, value: 112500 },
  { id: 9, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "09 / CENTRAL REGION", issuedQty: 50, issuedValue: 75000, qty: 50, value: 75000 },
  { id: 10, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "10 / NORTH EAST REGION", issuedQty: 30, issuedValue: 45000, qty: 30, value: 45000 },
  { id: 11, variety: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS", uom: "NOS", region: "11 / NORTH WEST REGION", issuedQty: 30, issuedValue: 45000, qty: 30, value: 45000 },
];

const totalIssuedQty = MOCK_ROWS.reduce((s, r) => s + r.issuedQty, 0);
const totalIssuedValue = MOCK_ROWS.reduce((s, r) => s + r.issuedValue, 0);
const totalQty = MOCK_ROWS.reduce((s, r) => s + r.qty, 0);
const totalValue = MOCK_ROWS.reduce((s, r) => s + r.value, 0);

const fmt = (n: number) => "₹ " + n.toLocaleString("en-IN") + ".00";

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

const ReadBox = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>
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
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const DocIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
  </svg>
);

const OfficeIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
);

export default function ViewProcurementOrderPage() {
  const router = useRouter();
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Retail Sales – Procurement Order
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Procurement Order</li>
          </ol>
        </nav>
      </div>

      {/* Step indicator */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white px-6 py-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="relative flex items-center">
          <div className="absolute left-0 right-0 top-5 h-px bg-gray-200 dark:bg-dark-3"></div>
          {/* Step 1 — green */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#28a745] bg-white text-sm font-bold text-[#28a745] dark:bg-gray-dark">
              1
            </div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">Procurement Order creation</p>
          </div>
          {/* Step 2 — green */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#28a745] bg-white text-sm font-bold text-[#28a745] dark:bg-gray-dark">
              2
            </div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">Procurement Order Approval</p>
          </div>
          {/* Step 3 — orange (pending) */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#fd7e14] bg-white text-sm font-bold text-[#fd7e14] dark:bg-gray-dark">
              3
            </div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">Procurement Order Finalize</p>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Procurement Order - HO</h3>
        </div>

        <div className="p-5">
          {/* Production Plan Details */}
          <SectionHeader label="Production Plan Details" />
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Plan Code — spans 2 cols */}
            <div className="md:col-span-2">
              <ReadBox label="Production Plan Code / Name" value={MOCK.planCode} icon={<DocIcon />} />
            </div>
            <ReadBox label="Plan From" value={MOCK.planFrom} icon={<CalIcon />} />
            <ReadBox label="Plan Period To" value={MOCK.planPeriodTo} icon={<CalIcon />} />

            {/* Region Code — spans 2 cols */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Region Code / Name</label>
              <div className="min-h-[44px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                {MOCK.regionCode}
              </div>
            </div>

            {/* Product Variety Code — spans 2 cols */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Product Variety Code / Name</label>
              <div className="min-h-[44px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                {MOCK.productVarietyCode}
              </div>
            </div>

            <ReadBox label="Created Date" value={MOCK.createdDate} icon={<CalIcon />} />
            <ReadBox label="Created By" value={MOCK.createdBy} icon={<UserIcon />} />
            <ReadBox label="Approved Date" value={MOCK.approvedDate} icon={<CalIcon />} />
            <ReadBox label="Approved By" value={MOCK.approvedBy} icon={<UserIcon />} />
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office – Procurement Order Details */}
          <SectionHeader label="D&P Office – Procurement Order Details" />
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReadBox label="D&P Office Code / Name" value={MOCK.dnpOfficeCode} icon={<OfficeIcon />} />
            <ReadBox label="Product Category Code / Name" value={MOCK.categoryCode} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polygon points="12,2 2,7 12,12 22,7" /><polyline points="2,17 12,22 22,17" /><polyline points="2,12 12,17 22,12" />
              </svg>
            } />
            <ReadBox label="Procurement From" value={MOCK.procurementFrom} icon={<CalIcon />} />
            <ReadBox label="Procurement To" value={MOCK.procurementTo} icon={<CalIcon />} />
            <ReadBox label="Validity Date" value={MOCK.validityDate} icon={<CalIcon />} />
            <ReadBox label="Not Later Than" value={MOCK.notLaterThan} icon={<CalIcon />} />
            <ReadBox label="Total Plan Quantity" value={MOCK.totalPlanQty} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            } />
            <ReadBox label="Total Plan Value" value={MOCK.totalPlanValue} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            } />
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Intending Region Wise – Product Variety Details */}
          <SectionHeader label="Intending Region Wise – Product Variety Details" />
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th rowSpan={2} className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold align-middle w-10">#</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold align-middle">Product Variety Code / Name</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold align-middle w-16">UOM</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold align-middle">Indenting Region</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Issued</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Current</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-medium text-xs">Quantity / Meters</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-medium text-xs">Issued Value (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-medium text-xs">Quantity / Meters</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-medium text-xs">Values (₹)</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ROWS.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.variety}</td>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.uom}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.region}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.issuedQty}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{fmt(row.issuedValue)}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.qty}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{fmt(row.value)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                  <td colSpan={4} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{totalIssuedQty}</td>
                  <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{fmt(totalIssuedValue)}</td>
                  <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{totalQty}</td>
                  <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{fmt(totalValue)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" />
              </svg>
              View Note
            </button>
            <button
              onClick={() => router.push("/operational/procurement/retail-procurement/procurement-order/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Navigation arrows */}
              <div className="flex items-center justify-between">
                <button className="flex size-8 items-center justify-center rounded border border-stroke bg-gray-50 text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">Note 1 of 1</span>
                <button className="flex size-8 items-center justify-center rounded border border-stroke bg-gray-50 text-gray-500 hover:bg-gray-100 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
              </div>

              {/* Note content */}
              <div className="rounded border border-stroke bg-gray-50 px-4 py-3 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white min-h-[80px]">
                Procurement order approved. Please proceed with finalization.
              </div>

              {/* Created By card */}
              <div className="rounded border border-stroke p-3 dark:border-dark-3">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">Created By</p>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#17a2b8] text-white text-xs font-bold">SC</div>
                  <div>
                    <p className="text-sm font-semibold text-dark dark:text-white">SANKARANARAYANA C</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SUPERINTENDENT</p>
                    <p className="text-xs text-gray-400">15-Aug-2018</p>
                  </div>
                </div>
              </div>

              {/* Approved By card */}
              <div className="rounded border border-[#28a745] p-3">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">Approved By</p>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#28a745] text-white text-xs font-bold">AG</div>
                  <div>
                    <p className="text-sm font-semibold text-dark dark:text-white">ANBALAGAN G</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SENIOR REGIONAL MANAGER</p>
                    <p className="text-xs text-gray-400">20-Aug-2018</p>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setShowNote(false)}
                  className="rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
