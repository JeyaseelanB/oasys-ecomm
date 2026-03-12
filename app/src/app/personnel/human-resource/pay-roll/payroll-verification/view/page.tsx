"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  accountCode:  "10 / HEAD OFFICE",
  year:         "2024",
  month:        "JUNE",
  createdDate:  "19-Jan-2024",
  status:       "FINAL APPROVED",
  verifiedBy:   "SANKARANARAYANAN",
  designation:  "SUPERINTENDENT",
  approvedDate: "19-Jan-2024",
  remarks:      "Payroll verified and approved for June 2024.",
  totalEmployees: "248",
  totalGross:     "₹ 18,45,320.00",
  totalDeduction: "₹ 3,12,450.00",
  netPayable:     "₹ 15,32,870.00",
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-stroke pb-4 dark:border-dark-3">
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

export default function PayrollVerificationViewPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Payroll Verification</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/personnel/human-resource/pay-roll/payroll-verification/list"
                className="text-gray-500 hover:text-primary dark:text-gray-400">
                Payroll Verification List
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Payroll Verification</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Payroll Verification</h3>
          <span className="inline-block rounded bg-[#28a745] px-2.5 py-0.5 text-xs font-semibold text-white">
            {RECORD.status}
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Primary Info */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-4">
            <Field label="Account Category Code / Name" value={RECORD.accountCode} />
            <Field label="Payroll Year"                 value={RECORD.year} />
            <Field label="Payroll Month"                value={RECORD.month} />
            <Field label="Created Date"                 value={RECORD.createdDate} />
            <Field label="Approval Status"              value={RECORD.status} />
            <Field label="Verified By"                  value={RECORD.verifiedBy} />
            <Field label="Designation"                  value={RECORD.designation} />
            <Field label="Approved Date"                value={RECORD.approvedDate} />
          </div>

          {/* Remarks */}
          <div className="border-b border-stroke pb-4 dark:border-dark-3">
            <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Remarks</p>
            <p className="text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{RECORD.remarks}</p>
          </div>

          {/* Payroll Summary section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <GridIco />
              <h4 className="text-base font-semibold text-dark dark:text-white">Payroll Summary</h4>
            </div>
            <div className="overflow-hidden rounded border border-stroke dark:border-dark-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b]">
                    <th className="border-r border-[#3aa88f] px-4 py-2.5 text-center text-xs font-semibold text-white">Total Employees</th>
                    <th className="border-r border-[#3aa88f] px-4 py-2.5 text-center text-xs font-semibold text-white">Total Gross Pay</th>
                    <th className="border-r border-[#3aa88f] px-4 py-2.5 text-center text-xs font-semibold text-white">Total Deductions</th>
                    <th className="px-4 py-2.5 text-center text-xs font-semibold text-white">Net Payable Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-r border-stroke px-4 py-3 text-center text-sm font-semibold text-[#2d8f7b] dark:border-dark-3 dark:text-[#5bc4a8]">
                      {RECORD.totalEmployees}
                    </td>
                    <td className="border-r border-stroke px-4 py-3 text-center text-sm font-semibold text-[#2d8f7b] dark:border-dark-3 dark:text-[#5bc4a8]">
                      {RECORD.totalGross}
                    </td>
                    <td className="border-r border-stroke px-4 py-3 text-center text-sm font-semibold text-[#2d8f7b] dark:border-dark-3 dark:text-[#5bc4a8]">
                      {RECORD.totalDeduction}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-[#2d8f7b] dark:text-[#5bc4a8]">
                      {RECORD.netPayable}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/payroll-verification/list")}
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
