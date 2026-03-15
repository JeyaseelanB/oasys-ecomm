"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CalendarIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const RupeeIcon = () => (
  <span className="text-sm font-medium text-gray-400">&#8377;</span>
);

export default function FlagDayContributionCreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    financialYear: "2026",
    minimumContributionAmount: "100.00",
    voluntaryContributionAmount: "",
    totalContributionAmount: "100.00",
  });

  const handleChange = (field: string, value: string) => {
    setForm((f) => {
      const updated = { ...f, [field]: value };
      if (field === "voluntaryContributionAmount") {
        const min = parseFloat(updated.minimumContributionAmount) || 0;
        const vol = parseFloat(value) || 0;
        updated.totalContributionAmount = (min + vol).toFixed(2);
      }
      return updated;
    });
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Flag Day Fund Contribution
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Flag Day Fund Contribution</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">Flag Day Fund Contribution</h3>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Form Row */}
        <div className="mb-8 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Financial Year</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <CalendarIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.financialYear} readOnly />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Minimum Contribution Amount</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <RupeeIcon />
              <input type="text" className="w-full bg-transparent text-right text-sm outline-none dark:text-white" value={form.minimumContributionAmount} readOnly />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Voluntary Contribution Amount <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <RupeeIcon />
              <input type="text" className="w-full bg-transparent text-right text-sm outline-none dark:text-white" value={form.voluntaryContributionAmount} onChange={(e) => handleChange("voluntaryContributionAmount", e.target.value)} placeholder="" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Total Contribution Amount</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <RupeeIcon />
              <input type="text" className="w-full bg-transparent text-right text-sm outline-none dark:text-white" value={form.totalContributionAmount} readOnly />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Reject
          </button>
          <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="20,6 9,17 4,12" />
            </svg>
            Approve
          </button>
          <button
            onClick={() => router.push("/personnel/employee-self-service/flag-day-contribution/list")}
            className="flex items-center gap-1.5 rounded bg-[#00bcd4] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
