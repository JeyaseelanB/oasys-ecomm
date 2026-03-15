"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  state:              "PUDUCHERRY",
  financialYear:      "2018 - 2019",
  taxableStartValue:  "170.00",
  taxableEndValue:    "170.00",
  totalTaxPerMonth:   "5,000.00",
  createdDate:        "05-Oct-2018",
  createdBy:          "gmadminnotused",
  modifiedDate:       "05-Oct-2018",
  modifiedBy:         "gmadminnotused",
  status:             "true",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="pb-4">
    <p className="mb-0.5 border-b border-stroke pb-0.5 text-xs text-gray-500 dark:border-dark-3 dark:text-gray-400">{label}</p>
    <p className="pt-1 text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value || "—"}</p>
  </div>
);

export default function ViewTaxConfigPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Tax Config</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Tax Config</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tax Config</h3>
        </div>

        <div className="p-5">
          {/* Row 1: State / Financial Year / Taxable Start Value / Taxable End Value */}
          <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            <Field label="State"               value={RECORD.state} />
            <Field label="Financial Year"      value={RECORD.financialYear} />
            <Field label="Taxable Start Value" value={RECORD.taxableStartValue} />
            <Field label="Taxable End Value"   value={RECORD.taxableEndValue} />
          </div>

          {/* Row 2: Total Tax / Created Date / Created By / Modified Date */}
          <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            <Field label="Total Tax (per month)" value={RECORD.totalTaxPerMonth} />
            <Field label="Created Date"          value={RECORD.createdDate} />
            <Field label="Created By"            value={RECORD.createdBy} />
            <Field label="Modified Date"         value={RECORD.modifiedDate} />
          </div>

          {/* Row 3: Modified By / Status */}
          <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            <Field label="Modified By" value={RECORD.modifiedBy} />
            <Field label="Status"      value={RECORD.status} />
            <div /><div />
          </div>

          {/* Back Button */}
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/tax-config/list")}
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
