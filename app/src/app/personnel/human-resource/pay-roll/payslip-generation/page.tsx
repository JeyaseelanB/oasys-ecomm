"use client";

import Link from "next/link";
import { useState } from "react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const YEARS = ["2020","2021","2022","2023","2024","2025","2026"];

const EMPLOYEE = {
  pfNo: "3325",
  name: "SANKARANARAYANAN",
  uanNo: "100987654321",
  fatherName: "RAMASAMY",
  department: "MARKETING / SALES",
  panNo: "ABCPS1234D",
  designation: "SUPERINTENDENT",
  regionCode: "10 / HEAD OFFICE",
  workLocation: "001 / HEAD OFFICE CHENNAI",
  dateOfJoining: "01-Apr-2005",
  daysWorked: 26,
};

const EARNINGS = [
  { head: "Basic Pay",                    amount: 32500.00 },
  { head: "Dearness Allowance",           amount: 18525.00 },
  { head: "House Rent Allowance",         amount:  9750.00 },
  { head: "City Compensatory Allowance",  amount:  1500.00 },
  { head: "Transport Allowance",          amount:  3200.00 },
  { head: "Special Allowance",            amount:  2000.00 },
];

const DEDUCTIONS = [
  { head: "Provident Fund",     amount:  3900.00 },
  { head: "Professional Tax",   amount:   200.00 },
  { head: "Income Tax (TDS)",   amount:  4250.00 },
  { head: "LIC Premium",        amount:  1500.00 },
  { head: "Loan Recovery",      amount:  2000.00 },
];

const fmt = (n: number) =>
  n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-[42px] w-10 flex-shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </span>
);

const HashIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const CalIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const KeyIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

export default function PayslipGenerationPage() {
  const [month,    setMonth]    = useState("");
  const [year,     setYear]     = useState("");
  const [password, setPassword] = useState("");
  const [generated, setGenerated] = useState(false);
  const [error,    setError]    = useState("");

  const totalEarnings   = EARNINGS.reduce((s, e) => s + e.amount, 0);
  const totalDeductions = DEDUCTIONS.reduce((s, d) => s + d.amount, 0);
  const payableAmount   = totalEarnings - totalDeductions;
  const maxRows         = Math.max(EARNINGS.length, DEDUCTIONS.length);

  const handleGenerate = () => {
    if (!month || !year || !password) {
      setError("Please fill all mandatory fields (Month, Year, Secondary Password) before generating.");
      return;
    }
    setError("");
    setGenerated(true);
  };

  const handleClear = () => {
    setMonth("");
    setYear("");
    setPassword("");
    setGenerated(false);
    setError("");
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Payslip Generation
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Payslip Generation</li>
          </ol>
        </nav>
      </div>

      {/* ── Form Card ─────────────────────────────────────────────────── */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Payslip</h3>
          <span className="text-sm text-white/80">
            ( Mandatory Fields ) <span className="font-bold text-white">—</span>
          </span>
        </div>

        <div className="p-5">
          {/* Fields row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Employee PF Number / Name */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                Employee PF Number / Name
              </label>
              <div className="flex">
                <IconBox><HashIco /></IconBox>
                <input
                  readOnly
                  value={`${EMPLOYEE.pfNo} / ${EMPLOYEE.name}`}
                  className="h-[42px] w-full rounded-r border border-stroke bg-gray-50 px-3 text-sm text-gray-600 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
            </div>

            {/* Month */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                Month <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox><CalIco /></IconBox>
                <select
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  className="h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300"
                >
                  <option value="">Select</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                Year <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox><CalIco /></IconBox>
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300"
                >
                  <option value="">Select</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* Secondary Password */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                Secondary Password <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox><KeyIco /></IconBox>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder=""
                  className="h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Validation error */}
          {error && (
            <p className="mt-3 text-xs text-red-500">{error}</p>
          )}

          {/* Buttons — right-aligned, below fields */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
              </svg>
              Clear
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* ── Payslip Preview Card — always visible ─────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-6">

          {/* Org Header */}
          <div className="mb-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {/* Logo */}
            <div className="flex h-[90px] w-[90px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[#3aa88f] bg-[#e8f4f0]">
              <span className="text-center text-[11px] font-bold leading-tight text-[#2d8f7b]">
                Co-optex
              </span>
            </div>
            <div className="text-center">
              <p className="text-[15px] font-bold text-dark dark:text-white">
                THE TAMILNADU HANDLOOM WEAVERS' CO-OPERATIVE SOCIETY LTD
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Payslip for the period of
                {generated && month && year && (
                  <span className="ml-1 text-[#2d8f7b]">{month} {year}</span>
                )}
              </p>
            </div>
          </div>

          {/* Employee Details Table */}
          <div className="mb-5 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full min-w-[640px] text-sm">
              <tbody>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <td className="w-[16%] bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">P.F NO</td>
                  <td className="w-[17%] px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.pfNo : ""}
                  </td>
                  <td className="w-[16%] bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Employee Name</td>
                  <td className="w-[17%] px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.name : ""}
                  </td>
                  <td className="w-[16%] bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Region Code / Name</td>
                  <td className="w-[18%] px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.regionCode : ""}
                  </td>
                </tr>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">UAN NO</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.uanNo : ""}
                  </td>
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Father / Husband Name</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.fatherName : ""}
                  </td>
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Worklocation Code / Name</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.workLocation : ""}
                  </td>
                </tr>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Department / Section</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.department : ""}
                  </td>
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">PAN No</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.panNo : ""}
                  </td>
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Date of Joining</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.dateOfJoining : ""}
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Designation</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.designation : ""}
                  </td>
                  <td className="bg-gray-50 px-3 py-2 font-semibold text-dark dark:bg-gray-700 dark:text-white">Days Worked</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                    {generated ? EMPLOYEE.daysWorked : "0"}
                  </td>
                  <td className="bg-gray-50 px-3 py-2" colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Earnings & Deductions Table */}
          <div className="mb-5 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className="border-r border-[#3aa88f] px-4 py-2.5 text-center font-semibold text-white w-[35%]">Earnings</th>
                  <th className="border-r border-[#3aa88f] px-4 py-2.5 text-center font-semibold text-white w-[15%]">Amount (₹)</th>
                  <th className="border-r border-[#3aa88f] px-4 py-2.5 text-center font-semibold text-white w-[35%]">Deductions</th>
                  <th className="px-4 py-2.5 text-center font-semibold text-white w-[15%]">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {!generated ? (
                  /* Before generate — show "No records found." */
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  /* After generate — show earnings / deductions rows */
                  Array.from({ length: maxRows }).map((_, i) => (
                    <tr
                      key={i}
                      className={`border-b border-stroke dark:border-dark-3 ${i % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/30" : ""}`}
                    >
                      <td className="border-r border-stroke px-4 py-2 text-gray-700 dark:border-dark-3 dark:text-gray-300">
                        {EARNINGS[i]?.head ?? ""}
                      </td>
                      <td className="border-r border-stroke px-4 py-2 text-right text-gray-700 dark:border-dark-3 dark:text-gray-300">
                        {EARNINGS[i] ? fmt(EARNINGS[i].amount) : ""}
                      </td>
                      <td className="border-r border-stroke px-4 py-2 text-gray-700 dark:border-dark-3 dark:text-gray-300">
                        {DEDUCTIONS[i]?.head ?? ""}
                      </td>
                      <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">
                        {DEDUCTIONS[i] ? fmt(DEDUCTIONS[i].amount) : ""}
                      </td>
                    </tr>
                  ))
                )}

                {/* Gross Pay / Total Deductions row */}
                <tr className="border-b border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
                  <td className="border-r border-stroke px-4 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">
                    Gross Pay
                  </td>
                  <td className="border-r border-stroke px-4 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">
                    {generated ? fmt(totalEarnings) : "0.00"}
                  </td>
                  <td className="border-r border-stroke px-4 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">
                    Total Deductions
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-dark dark:text-white">
                    {generated ? fmt(totalDeductions) : "0.00"}
                  </td>
                </tr>

                {/* Payable Amount row — left 2 cols empty */}
                <tr className="border-b border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
                  <td colSpan={2} className="border-r border-stroke px-4 py-2 dark:border-dark-3"></td>
                  <td className="border-r border-stroke px-4 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">
                    Payable Amount
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-dark dark:text-white">
                    {generated ? fmt(payableAmount) : "0.00"}
                  </td>
                </tr>

                {/* Net Payable Amount row — left 2 cols empty */}
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <td colSpan={2} className="border-r border-stroke px-4 py-2 dark:border-dark-3"></td>
                  <td className="border-r border-stroke px-4 py-2 text-right font-bold text-dark dark:border-dark-3 dark:text-white">
                    Net Payable Amount
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-dark dark:text-white">
                    {generated ? Math.round(payableAmount) : "0"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cancel button — above footer note */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs italic text-gray-500 dark:text-gray-400">
            ******* This is computer generated statement and does not require any stamp or signature *******
          </p>

        </div>
      </div>
    </div>
  );
}
