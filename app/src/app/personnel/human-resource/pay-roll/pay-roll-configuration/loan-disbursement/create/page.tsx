"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LOAN_TYPES        = ["Loan", "Advance", "Recovery"];
const LOAN_TYPE_OPTIONS = ["BTF-1","BTF-2","BTF Special loan","CSD1","CSD2","SDF1","SDF3","HBA","FESTIVALADVANCE","MEDICALADVANCE","CRSGOV20-21"];
const REPAYMENT_MODES   = ["Salary", "Cash", "Bank Transfer", "Cheque"];
const PAYMENT_MODES     = ["Cash", "Bank Transfer", "Cheque", "NEFT/RTGS"];
const PRECLOSURE_OPTS   = ["Yes", "No"];

const EMPLOYEES: Record<string, { name: string; empCode: string }> = {
  "33":  { name: "KARTHIK",      empCode: "33"  },
  "165": { name: "MANGALAM",     empCode: "165" },
  "381": { name: "MURUGAN",      empCode: "381" },
  "487": { name: "ABIRAMI",      empCode: "487" },
  "699": { name: "ARULSELVI",    empCode: "699" },
  "717": { name: "GANAPATHY",    empCode: "717" },
  "734": { name: "RAJESHWARI",   empCode: "734" },
  "780": { name: "PADMANABAN",   empCode: "780" },
  "911": { name: "BOOPATHI",     empCode: "911" },
};

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-[42px] w-10 flex-shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </span>
);
const UserIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const ListIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const RupeeIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="6" y1="5" x2="18" y2="5"/><line x1="6" y1="9" x2="18" y2="9"/>
    <line x1="6" y1="21" x2="12" y2="9"/><path d="M9 5a3 3 0 000 6h3"/>
  </svg>
);
const CalIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
    <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
  </svg>
);

export default function CreateLoanDisbursementPage() {
  const router = useRouter();

  const [empId,         setEmpId]         = useState("");
  const [empName,       setEmpName]       = useState("");
  const [loanType,      setLoanType]      = useState("");
  const [loanTypeOpt,   setLoanTypeOpt]   = useState("");
  const [loanAmount,    setLoanAmount]    = useState("");
  const [sanctionedAmt, setSanctionedAmt] = useState("");
  const [tenure,        setTenure]        = useState("");
  const [actualTenure,  setActualTenure]  = useState("");
  const [interestRate,  setInterestRate]  = useState("0.0");
  const [emiAmount,     setEmiAmount]     = useState("");
  const [startDate,     setStartDate]     = useState("");
  const [preclosure,    setPreclosure]    = useState("Yes");
  const [repaymentMode, setRepaymentMode] = useState("Salary");
  const [paymentMode,   setPaymentMode]   = useState("Cash");
  const [remarks,       setRemarks]       = useState("");
  const [error,         setError]         = useState("");

  // Auto-fill employee name
  useEffect(() => {
    if (empId && EMPLOYEES[empId]) {
      setEmpName(EMPLOYEES[empId].name);
    } else {
      setEmpName("");
    }
  }, [empId]);

  // Auto-calculate EMI
  useEffect(() => {
    const p = parseFloat(loanAmount);
    const n = parseInt(tenure);
    const r = parseFloat(interestRate) / 100 / 12;
    if (p > 0 && n > 0) {
      if (r === 0) {
        setEmiAmount((p / n).toFixed(3));
      } else {
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setEmiAmount(emi.toFixed(3));
      }
    } else {
      setEmiAmount("");
    }
  }, [loanAmount, tenure, interestRate]);

  const handleSubmit = () => {
    if (!empId || !loanType || !loanAmount || !tenure || !startDate) {
      setError("Please fill all required fields: Employee ID, Loan Type, Loan Amount, Tenure, and Start Date.");
      return;
    }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/loan-disbursement/list");
  };

  const inputCls = "h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300";
  const readCls  = "h-[42px] w-full rounded-r border border-stroke bg-gray-50 px-3 text-sm text-[#2d8f7b] font-medium dark:border-dark-3 dark:bg-gray-700 dark:text-[#5bc4a8]";
  const selCls   = inputCls;

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Loan Disbursement</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Loan Disbursement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Loan Disbursement</h3>
          <span className="text-sm text-white/80">( Mandatory Fields ) <span className="font-bold text-white">—</span></span>
        </div>

        <div className="p-5 space-y-5">
          {/* Employee Info — Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Employee ID <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><UserIco /></IconBox>
                <select value={empId} onChange={e => setEmpId(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  {Object.keys(EMPLOYEES).map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Employee Name</label>
              <div className="flex">
                <IconBox><UserIco /></IconBox>
                <input readOnly value={empName} className={readCls} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Loan Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><ListIco /></IconBox>
                <select value={loanType} onChange={e => setLoanType(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  {LOAN_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Loan / Advance Type</label>
              <div className="flex">
                <IconBox><ListIco /></IconBox>
                <select value={loanTypeOpt} onChange={e => setLoanTypeOpt(e.target.value)} className={selCls}>
                  <option value="">Select</option>
                  {LOAN_TYPE_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Loan Details — Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Loan Amount <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><RupeeIco /></IconBox>
                <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className={inputCls} placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Sanctioned Loan Amount</label>
              <div className="flex">
                <IconBox><RupeeIco /></IconBox>
                <input type="number" value={sanctionedAmt} onChange={e => setSanctionedAmt(e.target.value)} className={inputCls} placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Loan Tenure (in Months) <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </IconBox>
                <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className={inputCls} placeholder="0" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Loan Actual Tenure (in Months)</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </IconBox>
                <input type="number" value={actualTenure} onChange={e => setActualTenure(e.target.value)} className={inputCls} placeholder="0" />
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Rate of Interest on Total Loan Amount</label>
              <div className="flex">
                <IconBox><RupeeIco /></IconBox>
                <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className={inputCls} placeholder="0.0" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Loan EMI Amount</label>
              <div className="flex">
                <IconBox><RupeeIco /></IconBox>
                <input readOnly value={emiAmount ? `₹ ${emiAmount}` : ""} className={readCls} placeholder="Auto calculated" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Loan Start Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CalIco /></IconBox>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Preclosure Allowed</label>
              <div className="flex">
                <IconBox><ListIco /></IconBox>
                <select value={preclosure} onChange={e => setPreclosure(e.target.value)} className={selCls}>
                  {PRECLOSURE_OPTS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Mode of Repayment */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-stroke pt-4 dark:border-dark-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Mode of Repayment</label>
              <div className="flex">
                <IconBox><ListIco /></IconBox>
                <select value={repaymentMode} onChange={e => setRepaymentMode(e.target.value)} className={selCls}>
                  {REPAYMENT_MODES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Mode of Payment section */}
          <div className="border-t border-stroke pt-4 dark:border-dark-3">
            <div className="mb-3 flex items-center gap-2">
              <GridIco />
              <h4 className="text-base font-semibold text-dark dark:text-white">Mode of Payment</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Mode of Payment</label>
                <div className="flex">
                  <IconBox><ListIco /></IconBox>
                  <select value={paymentMode} onChange={e => setPaymentMode(e.target.value)} className={selCls}>
                    {PAYMENT_MODES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Remarks</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  className="h-[42px] w-full rounded border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/loan-disbursement/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
