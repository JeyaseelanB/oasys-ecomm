"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  loanType: "FAMILY BENEFIT FUND SCHEME",
  loanEligibilityAmount: "50000.0",
  minLoanAmount: "100.0",
  maxLoanAmount: "",
  loanAmount: "2197.0",
  noOfInstallments: "10.0",
  reason: "FBFS Recovery",
};

export default function ViewLoanAdvancePage() {
  const router = useRouter();
  const val = "text-sm font-semibold text-[#17a2b8]";
  const lbl = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Loans &amp; Advance</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Loans &amp; Advance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Loans &amp; Advance</span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div>
              <p className={lbl}>Loan Type</p>
              <p className={val}>{RECORD.loanType}</p>
            </div>
            <div>
              <p className={lbl}>Loan Eligibility Amount</p>
              <p className={val}>{RECORD.loanEligibilityAmount}</p>
            </div>
            <div>
              <p className={lbl}>Min. Loan Amount</p>
              <p className={val}>{RECORD.minLoanAmount}</p>
            </div>
            <div>
              <p className={lbl}>Max. Loan Amount</p>
              <p className={val}>{RECORD.maxLoanAmount || "—"}</p>
            </div>
            <div>
              <p className={lbl}>Loan Amount</p>
              <p className={val}>{RECORD.loanAmount}</p>
            </div>
            <div>
              <p className={lbl}>No. of Installments</p>
              <p className={val}>{RECORD.noOfInstallments}</p>
            </div>
            <div>
              <p className={lbl}>Reason</p>
              <p className={val}>{RECORD.reason}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button
            onClick={() => router.push("/personnel/employee-self-service/loans-and-advance/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
