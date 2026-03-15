"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const YEARS = Array.from({ length: 10 }, (_, i) => String(2020 + i));

interface EarningRow { label: string; amount: number }
interface DeductionRow { label: string; amount: number }

interface PayslipData {
  pfNo: string;
  employeeName: string;
  regionCode: string;
  uanNo: string;
  fatherName: string;
  worklocation: string;
  department: string;
  panNo: string;
  dateOfJoining: string;
  designation: string;
  daysWorked: number;
  earnings: EarningRow[];
  deductions: DeductionRow[];
}

const SAMPLE_DATA: PayslipData = {
  pfNo: "3325",
  employeeName: "SANKARANARAYANAN C",
  regionCode: "16 / CHENNAI",
  uanNo: "100121012349",
  fatherName: "CHOCKKALINGAM M",
  worklocation: "16 / CHENNAI",
  department: "ADMIN / Admin",
  panNo: "AFBPC3951L",
  dateOfJoining: "06-Oct-1997",
  designation: "SENIOR ASSISTANT",
  daysWorked: 30,
  earnings: [
    { label: "BASIC PAY", amount: 30840.00 },
    { label: "D.A", amount: 5243.00 },
    { label: "C.C.A", amount: 480.00 },
  ],
  deductions: [
    { label: "THE T.N.H.W.C.S STAFF COOP SOCIETY LTD -CHENNAI", amount: 4158.00 },
    { label: "PROVIDENT FUND", amount: 4330.00 },
    { label: "EMPLOYEES RETD.BENEFIT SCHEME", amount: 53.00 },
    { label: "VOLUNTARY PROVIDENT FUND", amount: 2000.00 },
    { label: "THE MADRAS STATE H.W.C.N.O.E.B.T FUND - BTF (66000.00 , 21/ 60)", amount: 1650.00 },
    { label: "THE MADRAS STATE H.W.C.N.O.E.B.T FUND - BTF (INTEREST)", amount: 330.00 },
    { label: "EMPLOYEES SECURITY DEPOSITS - ESD1 (19350.00 , 6/ 48)", amount: 450.00 },
    { label: "GROUP MEDICAL INSURANCE SCHEME - GMI1 (1386.00 , 3/ 5)", amount: 462.00 },
    { label: "LIFE INSURANCE POLICY - LIC 2(TNY)", amount: 255.00 },
    { label: "LIFE INSURANCE POLICY - LIC 1(TNY)", amount: 288.00 },
    { label: "LIFE INSURANCE POLICY - LIC 3(TNY)", amount: 111.00 },
  ],
};

function numberToWords(n: number): string {
  if (n === 0) return "Zero";
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
    "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function convert(num: number): string {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + convert(num % 100) : "");
    if (num < 100000) return convert(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + convert(num % 1000) : "");
    return convert(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + convert(num % 100000) : "");
  }
  const rupees = Math.floor(n);
  const paise = Math.round((n - rupees) * 100);
  let result = convert(rupees) + " Rupees";
  result += " And " + (paise === 0 ? "Zero" : convert(paise)) + " Paise Only";
  return result;
}

export default function PaySlipPage() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [generated, setGenerated] = useState(false);
  const [payslip, setPayslip] = useState<PayslipData | null>(null);
  const [periodLabel, setPeriodLabel] = useState("");

  function handleGenerate() {
    if (!month || !year) return;
    setPeriodLabel(`${month} ${year}`);
    setPayslip(SAMPLE_DATA);
    setGenerated(true);
  }

  function handleClear() {
    setMonth(""); setYear(""); setPassword("");
    setGenerated(false); setPayslip(null); setPeriodLabel("");
  }

  const grossPay = payslip ? payslip.earnings.reduce((s, r) => s + r.amount, 0) : 0;
  const totalDeductions = payslip ? payslip.deductions.reduce((s, r) => s + r.amount, 0) : 0;
  const payableAmount = grossPay - totalDeductions;
  const netPayable = Math.round(payableAmount);

  const maxRows = payslip
    ? Math.max(payslip.earnings.length, payslip.deductions.length)
    : 0;

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
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Pay Slip</li>
          </ol>
        </nav>
      </div>

      {/* Filter Card */}
      <div className="mb-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Payslip</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">(* Mandatory Fields)</span>
            <button type="button" onClick={() => setCollapsed((c) => !c)}
              className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20 text-base font-bold">
              {collapsed ? "+" : "—"}
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="p-5">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Employee PF Number / Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Employee PF Number / Name</label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-gray-dark">
                  <span className="shrink-0 text-sm font-bold text-gray-400">#</span>
                  <input type="text" readOnly value="3325 / SANKARANARAYANAN"
                    className="flex-1 bg-transparent text-sm text-gray-500 outline-none dark:text-gray-400" />
                </div>
              </div>

              {/* Month */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Month<span className="ml-0.5 text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark">
                  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <select value={month} onChange={(e) => setMonth(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-dark outline-none dark:text-white">
                    <option value="">Select</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Year */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Year<span className="ml-0.5 text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark">
                  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <select value={year} onChange={(e) => setYear(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-dark outline-none dark:text-white">
                    <option value="">Select</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Secondary Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Secondary Password<span className="ml-0.5 text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 rounded border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark">
                  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-dark outline-none dark:text-white" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleClear}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                </svg>
                Clear
              </button>
              <button type="button" onClick={handleGenerate}
                className="flex items-center gap-1.5 rounded bg-[#17b8c8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="1,4 1,10 7,10" />
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                </svg>
                Generate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payslip Preview Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="p-5">
          {/* Company Header */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="flex size-16 items-center justify-center">
              {/* Co-optex butterfly logo placeholder */}
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#17b8c8]">
                <span className="text-xs font-bold text-[#17b8c8]">Co-optex</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-dark dark:text-white">
                THE TAMILNADU HANDLOOM WEAVERS&apos; CO-OPERATIVE SOCIETY LTD
              </p>
              <p className="text-sm text-dark dark:text-white">
                Payslip for the period of {periodLabel}
              </p>
            </div>
          </div>

          {/* Employee Info Grid */}
          <table className="mb-4 w-full border-collapse text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">P.F NO</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.pfNo ?? ""}</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Employee Name</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.employeeName ?? ""}</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Region Code / Name</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.regionCode ?? ""}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">UAN NO</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.uanNo ?? ""}</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Father / Husband Name</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.fatherName ?? ""}</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Worklocation Code / Name</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.worklocation ?? ""}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Department / Section</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.department ?? ""}</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">PAN No</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.panNo ?? ""}</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Date of Joining</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.dateOfJoining ?? ""}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Designation</td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3">{payslip?.designation ?? ""}</td>
                <td className="border border-gray-300 px-2 py-1 font-semibold dark:border-dark-3">Days Worked</td>
                <td className="border border-gray-300 px-2 py-1 text-[#17b8c8] dark:border-dark-3">
                  {payslip ? payslip.daysWorked : 0}
                </td>
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3" />
                <td className="border border-gray-300 px-2 py-1 dark:border-dark-3" />
              </tr>
            </tbody>
          </table>

          {/* Earnings / Deductions Table */}
          <table className="mb-0 w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="border border-[#2d8f7b] px-3 py-2 text-center font-semibold">Earnings</th>
                <th className="border border-[#2d8f7b] px-3 py-2 text-center font-semibold">Amount (₹)</th>
                <th className="border border-[#2d8f7b] px-3 py-2 text-center font-semibold">Deductions</th>
                <th className="border border-[#2d8f7b] px-3 py-2 text-center font-semibold">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {!payslip ? (
                <tr>
                  <td colSpan={4} className="border border-gray-200 px-3 py-4 text-center text-gray-500 dark:border-dark-3">
                    No records found.
                  </td>
                </tr>
              ) : (
                Array.from({ length: maxRows }).map((_, i) => {
                  const earning = payslip.earnings[i];
                  const deduction = payslip.deductions[i];
                  return (
                    <tr key={i}>
                      <td className="border border-gray-200 px-3 py-1.5 dark:border-dark-3">
                        {earning?.label ?? ""}
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-right dark:border-dark-3">
                        {earning ? earning.amount.toFixed(2) : ""}
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 dark:border-dark-3">
                        {deduction?.label ?? ""}
                      </td>
                      <td className="border border-gray-200 px-3 py-1.5 text-right dark:border-dark-3">
                        {deduction ? deduction.amount.toFixed(2) : ""}
                      </td>
                    </tr>
                  );
                })
              )}
              {/* Totals */}
              <tr className="bg-gray-50 dark:bg-dark-2">
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">Gross Pay</td>
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">
                  {payslip ? grossPay.toFixed(2) : "0.00"}
                </td>
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">Total Deductions</td>
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">
                  {payslip ? totalDeductions.toFixed(2) : "0.00"}
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-dark-2">
                <td className="border border-gray-200 px-3 py-1.5 dark:border-dark-3" />
                <td className="border border-gray-200 px-3 py-1.5 dark:border-dark-3" />
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">Payable Amount</td>
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">
                  {payslip ? payableAmount.toFixed(2) : "0.00"}
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-dark-2">
                <td className="border border-gray-200 px-3 py-1.5 dark:border-dark-3" />
                <td className="border border-gray-200 px-3 py-1.5 dark:border-dark-3" />
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">Net Payable Amount</td>
                <td className="border border-gray-200 px-3 py-1.5 text-right font-semibold dark:border-dark-3">
                  {payslip ? netPayable : 0}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Amount in Words */}
          {generated && payslip && (
            <div className="mt-2 text-right text-xs font-medium text-dark dark:text-white">
              Amount in Words : {numberToWords(payableAmount)}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              {generated && payslip && (
                <button type="button"
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <polyline points="9,15 12,18 15,15" />
                  </svg>
                  PDF
                </button>
              )}
            </div>
            <button type="button" onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
