"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  percentage:           "5.0",
  numberOfInstallments: "4",
  withEffectFrom:       "24-Jul-2024",
  toBeApplied:          "24-Jul-2024",
  createdDate:          "24-Jul-2024",
  modifiedDate:         "24-Jul-2024",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-stroke pb-4 dark:border-dark-3">
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value || "—"}</p>
  </div>
);

export default function ViewDAArrearConfigPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View DA Arrear Configuration
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
            <li>
              <Link href="/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/list"
                className="text-gray-500 hover:text-primary dark:text-gray-400">
                DA Arrear Configuration List
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View DA Arrear Configuration</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">DA Arrear Configuration</h3>
        </div>

        <div className="p-5 space-y-5">
          {/* Row 1: Percentage / Number of Installments / With Effect From / To be Applied */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-4">
            <Field label="Percentage (%)"           value={RECORD.percentage} />
            <Field label="Number of Installment(s)" value={RECORD.numberOfInstallments} />
            <Field label="With Effect From"         value={RECORD.withEffectFrom} />
            <Field label="To be Applied"            value={RECORD.toBeApplied} />
          </div>

          {/* Row 2: Created Date / Modified Date */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-4">
            <Field label="Created Date"  value={RECORD.createdDate} />
            <Field label="Modified Date" value={RECORD.modifiedDate} />
            <div className="border-b border-stroke pb-4 dark:border-dark-3" />
            <div className="border-b border-stroke pb-4 dark:border-dark-3" />
          </div>

          {/* Back Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/list")}
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
