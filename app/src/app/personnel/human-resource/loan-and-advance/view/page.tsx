"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type LoanStatus = "LOAN DISBURSED" | "RECOVERY DISBURSED" | "FINAL APPROVED";

interface LoanRecord {
  referenceNo: string;
  employee: {
    id: string;
    name: string;
    designation: string;
    fatherName: string;
    entityType: string;
    entity: string;
    department: string;
  };
  loan: {
    recoveryType: string;
    eligibilityAmount: string;
    maximumAmount: string;
    minimumAmount: string;
    recoveryAmount: string;
    rateOfInterest: string;
    noOfInstallments: string;
    sanctionedAmount: string;
    reason: string;
    loanAdvance: string;
    loanAdvanceType: string;
    createdDate: string;
    status: LoanStatus;
  };
}

const LOAN_DATA: Record<number, LoanRecord> = {
  1: {
    referenceNo: "LRF8251",
    employee: { id: "422", name: "SHERIN", designation: "SALES ASSISTANT", fatherName: "RAMESH K", entityType: "Showroom", entity: "ANNA NAGAR", department: "SALES" },
    loan: { recoveryType: "MARRIAGE LOAN 2", eligibilityAmount: "₹ 50000.00", maximumAmount: "₹ 50000.00", minimumAmount: "₹ 1000.00", recoveryAmount: "₹ 24700.00", rateOfInterest: "₹ 0.0", noOfInstallments: "12.00", sanctionedAmount: "24700.00", reason: "Marriage Expenses", loanAdvance: "Loan", loanAdvanceType: "MARRIAGE LOAN 2", createdDate: "12-Mar-2026", status: "LOAN DISBURSED" },
  },
  2: {
    referenceNo: "LRF8250",
    employee: { id: "759", name: "GANAPATHY SUBRAMANIAN S", designation: "MANAGER GRADE I", fatherName: "S SANKARAN", entityType: "Showroom", entity: "V.O.C-TUTICORIN", department: "MARKETING" },
    loan: { recoveryType: "CSD1", eligibilityAmount: "₹ 1000000.00", maximumAmount: "₹ 1000000.00", minimumAmount: "₹ 100.00", recoveryAmount: "₹ 14000.00", rateOfInterest: "₹ 0.0", noOfInstallments: "100.00", sanctionedAmount: "14000.00", reason: "Credit sales old dues", loanAdvance: "Recovery", loanAdvanceType: "CSD1", createdDate: "26-Feb-2026", status: "RECOVERY DISBURSED" },
  },
  3: {
    referenceNo: "LRF8249",
    employee: { id: "687", name: "SRIDHAR", designation: "SENIOR SALES OFFICER", fatherName: "KRISHNASWAMY", entityType: "Showroom", entity: "TRICHY MAIN", department: "SALES" },
    loan: { recoveryType: "CSD1", eligibilityAmount: "₹ 1000000.00", maximumAmount: "₹ 1000000.00", minimumAmount: "₹ 100.00", recoveryAmount: "₹ 82271.00", rateOfInterest: "₹ 0.0", noOfInstallments: "100.00", sanctionedAmount: "82271.00", reason: "Credit sales adjustment", loanAdvance: "Recovery", loanAdvanceType: "CSD1", createdDate: "26-Feb-2026", status: "FINAL APPROVED" },
  },
};

const STATUS_STYLES: Record<LoanStatus, string> = {
  "LOAN DISBURSED":     "bg-[#6c757d]",
  "RECOVERY DISBURSED": "bg-[#28a745]",
  "FINAL APPROVED":     "bg-[#17a2b8]",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#2d8f7b]">{value || "—"}</p>
  </div>
);

function ViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 2;
  const record = LOAN_DATA[id] ?? LOAN_DATA[2];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Loan &amp; Advance Approval</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Loan &amp; Advance Approval</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Loan &amp; Advance Approval</h3>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* Reference + Status */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reference No:</span>
              <span className="text-sm font-semibold text-[#2d8f7b]">{record.referenceNo}</span>
            </div>
            <span className={`inline-block rounded-sm px-3 py-1 text-xs font-semibold text-white ${STATUS_STYLES[record.loan.status]}`}>
              {record.loan.status}
            </span>
          </div>

          {/* Employee Details */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Employee ID"    value={record.employee.id} />
              <Field label="Employee Name"  value={record.employee.name} />
              <Field label="Designation"    value={record.employee.designation} />
              <Field label="Father Name"    value={record.employee.fatherName} />
              <Field label="Entity Type"    value={record.employee.entityType} />
              <Field label="Entity"         value={record.employee.entity} />
              <Field label="Department"     value={record.employee.department} />
            </div>
          </div>

          {/* Loan / Advance Details */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Loan / Advance Details</h4>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Recovery Type"                       value={record.loan.recoveryType} />
              <Field label="Eligibility Amount"                  value={record.loan.eligibilityAmount} />
              <Field label="Maximum Amount"                      value={record.loan.maximumAmount} />
              <Field label="Minimum Amount"                      value={record.loan.minimumAmount} />
              <Field label="Recovery Amount"                     value={record.loan.recoveryAmount} />
              <Field label="Rate of Interest on Total Loan Amount (₹)" value={record.loan.rateOfInterest} />
              <Field label="No. of Installments"                 value={record.loan.noOfInstallments} />
              <Field label="Sanctioned Amount"                   value={record.loan.sanctionedAmount} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Reason" value={record.loan.reason} />
              <Field label="Loan / Advance" value={record.loan.loanAdvance} />
            </div>
          </div>

          {/* Summary row */}
          <div className="pt-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Loan / Advance Type" value={record.loan.loanAdvanceType} />
              <Field label="Created Date"        value={record.loan.createdDate} />
            </div>
          </div>

        </div>

        {/* Back button */}
        <div className="flex items-center justify-end border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/loan-and-advance/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ViewLoanAndAdvancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
