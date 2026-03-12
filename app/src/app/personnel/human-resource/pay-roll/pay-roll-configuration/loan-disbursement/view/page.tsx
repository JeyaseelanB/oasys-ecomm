"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  empId:          "33",
  empName:        "KARTHIK",
  loanType:       "Recovery",
  loanNumber:     "LRF6883",
  loanAmount:     "₹ 10000.0",
  actualTenure:   "60",
  interestRate:   "0.0",
  sanctionedAmt:  "₹ 10,000.00",
  tenure:         "10",
  emiAmount:      "₹ 974.444",
  startDate:      "01-Aug-2024",
  preclosure:     "Yes",
  repaymentMode:  "Salary",
  paymentMode:    "Cash",
  remarks:        "",
  status:         "RECOVERY_DISBURSED",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-stroke pb-3 dark:border-dark-3">
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value || "—"}</p>
  </div>
);

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
    <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
  </svg>
);

export default function ViewLoanDisbursementPage() {
  const router = useRouter();

  const cardTitle = RECORD.loanType === "Recovery"
    ? "Recovery Disbursement"
    : RECORD.loanType === "Advance"
    ? "Advance Disbursement"
    : "Loan Disbursement";

  const pageTitle = `View ${cardTitle}`;

  const crumbLabel = pageTitle;

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">{pageTitle}</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">{crumbLabel}</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">{cardTitle}</h3>
        </div>

        <div className="p-5 space-y-0">
          {/* Primary loan details — 4-col grid, label above value */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-4">
            {/* Row 1 */}
            <Field label="Employee ID"    value={RECORD.empId} />
            <Field label="Employee Name"  value={RECORD.empName} />
            <Field label="Loan Type"      value={RECORD.loanType} />
            <Field label="Loan Number"    value={RECORD.loanNumber} />

            {/* Row 2 */}
            <Field label="Loan Amount"                         value={RECORD.loanAmount} />
            <Field label="Loan Actual Tenure (in Months)"      value={RECORD.actualTenure} />
            <Field label="Rate of Interest on Total Loan Amount" value={RECORD.interestRate} />
            <Field label="Sanctioned Loan Amount"              value={RECORD.sanctionedAmt} />

            {/* Row 3 */}
            <Field label="Loan Tenure (in Months)" value={RECORD.tenure} />
            <Field label="Loan EMI Amount"          value={RECORD.emiAmount} />
            <Field label="Loan Start Date"          value={RECORD.startDate} />
            <Field label="Preclosure Allowed"       value={RECORD.preclosure} />

            {/* Row 4 — Mode of Repayment (spans or single) */}
            <Field label="Mode of Repayment" value={RECORD.repaymentMode} />
            {/* Empty cells to fill the grid */}
            <div className="border-b border-stroke pb-3 dark:border-dark-3"></div>
            <div className="border-b border-stroke pb-3 dark:border-dark-3"></div>
            <div className="border-b border-stroke pb-3 dark:border-dark-3"></div>
          </div>

          {/* Mode of Payment section */}
          <div className="mt-5 pt-4">
            <div className="mb-4 flex items-center gap-2">
              <GridIco />
              <h4 className="text-base font-semibold text-dark dark:text-white">Mode of Payment</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
              <Field label="Mode of Payment" value={RECORD.paymentMode} />
              <Field label="Remarks"         value={RECORD.remarks || "—"} />
              <div></div>
              <div></div>
            </div>
          </div>

          {/* Back button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/loan-disbursement/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
