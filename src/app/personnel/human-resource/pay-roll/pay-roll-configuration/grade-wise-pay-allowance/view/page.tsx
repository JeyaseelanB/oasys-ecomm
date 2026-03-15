"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  payRangeFrom:       "0.0",
  payRangeTo:         "20600.0",
  amount:             "₹ 360.00",
  allowanceCityGrade: "Grade I",
  employeeType:       "Permanent",
  withEffectFrom:     "02-Feb-2025",
  status:             "Active",
  createdDate:        "26-Feb-2025",
  createdBy:          "hosuper",
  modifiedDate:       "26-Feb-2025",
  modifiedBy:         "hosuper",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="pb-4">
    <p className="mb-0.5 border-b border-stroke pb-0.5 text-xs text-gray-500 dark:border-dark-3 dark:text-gray-400">{label}</p>
    <p className="pt-1 text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value || "—"}</p>
  </div>
);

export default function ViewGradeWisePayAllowancePage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Grade Wise Pay Allowance
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Grade Wise Pay Allowance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Grade Wise Pay Allowance</h3>
        </div>

        <div className="p-5">
          {/* Row 1: Pay Range From / Pay Range To / Amount / Allowance City Grade */}
          <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            <Field label="Pay Range From"      value={RECORD.payRangeFrom} />
            <Field label="Pay Range To"        value={RECORD.payRangeTo} />
            <Field label="Amount"              value={RECORD.amount} />
            <Field label="Allowance City Grade" value={RECORD.allowanceCityGrade} />
          </div>

          {/* Row 2: Employee Type / With Effect From / Status / Created Date */}
          <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            <Field label="Employee Type"   value={RECORD.employeeType} />
            <Field label="With Effect From" value={RECORD.withEffectFrom} />
            <Field label="Status"          value={RECORD.status} />
            <Field label="Created Date"    value={RECORD.createdDate} />
          </div>

          {/* Row 3: Created By / Modified Date / Modified By */}
          <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            <Field label="Created By"    value={RECORD.createdBy} />
            <Field label="Modified Date" value={RECORD.modifiedDate} />
            <Field label="Modified By"   value={RECORD.modifiedBy} />
            <div />
          </div>

          {/* Back Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/grade-wise-pay-allowance/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
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
