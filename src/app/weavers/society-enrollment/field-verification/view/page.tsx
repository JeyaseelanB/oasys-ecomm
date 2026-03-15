"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  "Receive Requisition Letter",
  "Supporting Document Collection",
  "Field Verification",
  "Head Office Approval",
  "Board Approval",
  "Society Code Allotment",
];

const RECORD = {
  societyName: "muru",
  societyRegistrationNumber: "4466464",
  societyRegistrationDate: "21-Feb-2025",
  societyProductionStartDate: "21-Feb-2025",
  committeeVisitDate: "21-Feb-2025",
  committeeMembers: [
    { staffCode: "3200 / SAMINATHAN S", designation: "DEPUTY GENERAL MANAGER", entityCode: "10 / HEAD OFFICE" },
  ],
  loomMembers: [
    { memberName: "54353", memberAddress: "53sdfsf, sfsf, sfsf.......", industryAddress: "35355, 35355, 35355.......", numberOfLooms: "35.0", rationCard: "", aadhaar: "53553533553" },
  ],
  isProperlyRegistered: "No",
  isRecommended: "Yes",
};

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
    <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
  </svg>
);

const valCls = "text-sm font-medium text-[#17a2b8]";
const lblCls = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";

export default function FieldVerificationViewPage() {
  const router = useRouter();

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Field Verification</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Field Verification</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const done = i < 2;
              const active = i === 2;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && <div className={`h-0.5 flex-1 ${done || active ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />}
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      done ? "border-green-500 bg-green-500 text-white"
                      : active ? "border-orange-400 bg-white text-orange-400"
                      : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                    }`}>
                      {done ? <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20,6 9,17 4,12"/></svg> : i + 1}
                    </div>
                    {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 ${done ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "font-bold text-dark dark:text-white" : done ? "text-gray-500" : "text-gray-400"}`}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Field Verification Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Field Verification</span>
        </div>

        {/* Society Info */}
        <div className="p-5">
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
            <div><p className={lblCls}>Society Name</p><p className={valCls}>{RECORD.societyName}</p></div>
            <div><p className={lblCls}>Society Registration Number</p><p className={valCls}>{RECORD.societyRegistrationNumber}</p></div>
            <div><p className={lblCls}>Society Registration Date</p><p className={valCls}>{RECORD.societyRegistrationDate}</p></div>
            <div><p className={lblCls}>Society Production Start Date</p><p className={valCls}>{RECORD.societyProductionStartDate}</p></div>
          </div>

          {/* Committee Members List */}
          <div className="mb-5">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Committee Members List</h4>
            <p className={lblCls}>Date of Visit to the Society</p>
            <p className="mb-3 text-sm font-medium text-[#17a2b8]">{RECORD.committeeVisitDate}</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Employee PF Number / Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Designation</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Entity Code / Name</th>
                  </tr>
                </thead>
                <tbody>
                  {RECORD.committeeMembers.map((m, i) => (
                    <tr key={i} className="bg-white dark:bg-gray-dark">
                      <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{i + 1}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{m.staffCode}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{m.designation}</td>
                      <td className="border-b border-stroke px-3 py-2 dark:border-dark-3">{m.entityCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Loom Verification List */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white"><GridIcon /> Loom Verification List</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Member Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Member Address</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Industry Address</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">Number of Looms</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Ration Card Number</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Aadhaar Number</th>
                  </tr>
                </thead>
                <tbody>
                  {RECORD.loomMembers.map((l, i) => (
                    <tr key={i} className="bg-white dark:bg-gray-dark">
                      <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{i + 1}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.memberName}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-xs dark:border-dark-3">{l.memberAddress}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-xs dark:border-dark-3">{l.industryAddress}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{l.numberOfLooms}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.rationCard}</td>
                      <td className="border-b border-stroke px-3 py-2 dark:border-dark-3">{l.aadhaar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Flags */}
          <div className="mb-5 grid grid-cols-2 gap-4">
            <div>
              <p className={lblCls}>Is the society is properly registered under ADHT office</p>
              <p className={valCls}>{RECORD.isProperlyRegistered}</p>
            </div>
            <div>
              <p className={lblCls}>Is the committee recommended to allot the society code</p>
              <p className={valCls}>{RECORD.isRecommended}</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/weavers/society-enrollment/field-verification/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
