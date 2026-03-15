"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EMPLOYEE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "RAMASAMY / 784", label: "RAMASAMY / 784" },
  { value: "KALAIVANI / 3134", label: "KALAIVANI / 3134" },
  { value: "RAMESH / 3378", label: "RAMESH / 3378" },
  { value: "SANKARANARAYANAN / 252", label: "SANKARANARAYANAN / 252" },
];

const MONTH_OPTIONS = [
  { value: "", label: "Select" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const YEAR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const HashIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const RupeeIcon = () => (
  <span className="text-sm font-medium text-gray-400">&#8377;</span>
);

export default function FbfContributionCreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    employeeNamePf: "",
    month: "",
    year: "",
    totalAmountPlanned: "300000.00",
    employerContribution: "60000.00",
    totalNumberOfEmployees: "1379",
    perEmployeeContribution: "174.04",
  });

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create FBF Contribution
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create FBF Contribution</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 flex items-center justify-between rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">FBF Contribution</h3>
        <span className="text-sm text-white">(<span className="text-red-200">*</span> Mandatory Fields)</span>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Row 1: Employee Name/PF Number, Month, Year, Total Amount Planned, Employer Contribution */}
        <div className="mb-5 grid grid-cols-5 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Employee Name / Provident Fund Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <HashIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.employeeNamePf} onChange={(e) => handleChange("employeeNamePf", e.target.value)}>
                {EMPLOYEE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Month <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <CalendarIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.month} onChange={(e) => handleChange("month", e.target.value)}>
                {MONTH_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Year <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <CalendarIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.year} onChange={(e) => handleChange("year", e.target.value)}>
                {YEAR_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Total Amount Planned</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <RupeeIcon />
              <input type="text" className="w-full bg-transparent text-right text-sm outline-none dark:text-white" value={form.totalAmountPlanned} onChange={(e) => handleChange("totalAmountPlanned", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Employer Contribution</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <RupeeIcon />
              <input type="text" className="w-full bg-transparent text-right text-sm outline-none dark:text-white" value={form.employerContribution} onChange={(e) => handleChange("employerContribution", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Row 2: Total Number of Employees, Per Employee Contribution */}
        <div className="mb-8 grid grid-cols-5 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary dark:text-primary">Total Number of Employees</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <HashIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.totalNumberOfEmployees} readOnly />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary dark:text-primary">Per Employee Contribution</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <RupeeIcon />
              <input type="text" className="w-full bg-transparent text-right text-sm outline-none dark:text-white" value={form.perEmployeeContribution} readOnly />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => router.push("/personnel/employee-self-service/fbf-contribution/list")}
            className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cancel
          </button>
          <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="20,6 9,17 4,12" />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
