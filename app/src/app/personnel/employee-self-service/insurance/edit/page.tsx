"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const INSURANCE_TYPES = ["LIC 1(TNY)", "LIC 2(TNY)", "GIC", "NEW INDIA"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const PAYMENT_CYCLES = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];
const FORWARD_FOR = ["Verification", "Approval", "Final Approval"];

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/>
    <rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/>
    <rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/>
    <rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="10" y="17" width="4" height="4" rx="0.5"/>
    <rect x="17" y="17" width="4" height="4" rx="0.5"/>
  </svg>
);

const ListIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const CalIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const RupeeIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="6" y1="3" x2="18" y2="3"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="12" y1="8" x2="6" y2="21"/>
    <path d="M6 3h8a4 4 0 010 8H6"/>
  </svg>
);

const PersonIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
  </svg>
);

export default function EditInsurancePage() {
  const router = useRouter();

  // Pre-filled values
  const [insuranceType, setInsuranceType] = useState("LIC 1(TNY)");
  const [startMonth, setStartMonth] = useState("Jul");
  const [startYear, setStartYear] = useState("2021");
  const [maturityMonth, setMaturityMonth] = useState("");
  const [maturityYear, setMaturityYear] = useState("");
  const [insuredAmount, setInsuredAmount] = useState("200000.0");
  const [empPremiumAmount, setEmpPremiumAmount] = useState("288.0");
  const [paymentCycle, setPaymentCycle] = useState("Monthly");
  const [totalMembers, setTotalMembers] = useState("");
  const [totalPremiumAmount, setTotalPremiumAmount] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Final Approval");
  const [noteText, setNoteText] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const icoBox = "flex size-9 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2";
  const selectCls = "h-9 w-full rounded-r border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const inputCls = "h-9 w-full rounded-r border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const labelCls = "mb-1 block text-sm font-medium text-dark dark:text-white";

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!insuranceType) errs.insuranceType = "Insurance Type is required";
    if (!startMonth) errs.startMonth = "Start Month is required";
    if (!startYear) errs.startYear = "Start Year is required";
    if (!paymentCycle) errs.paymentCycle = "Payment Cycle is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    router.push("/personnel/employee-self-service/insurance/list");
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Insurance</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Insurance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Insurance</span>
        </div>

        <div className="p-5">
          <div className="mb-5">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon /> Insurance Details
            </h4>

            {/* Row 1: 6 columns */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <div>
                <label className={labelCls}>Insurance Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className={icoBox}><ListIcon /></span>
                  <select className={`${selectCls} ${errors.insuranceType ? "border-red-400" : ""}`}
                    value={insuranceType} onChange={(e) => setInsuranceType(e.target.value)}>
                    <option value="">Select</option>
                    {INSURANCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                {errors.insuranceType && <p className="mt-1 text-xs text-red-500">{errors.insuranceType}</p>}
              </div>
              <div>
                <label className={labelCls}>Start Month <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className={icoBox}><CalIcon /></span>
                  <select className={`${selectCls} ${errors.startMonth ? "border-red-400" : ""}`}
                    value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
                    <option value="">Select</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                {errors.startMonth && <p className="mt-1 text-xs text-red-500">{errors.startMonth}</p>}
              </div>
              <div>
                <label className={labelCls}>Start Year <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className={icoBox}><CalIcon /></span>
                  <select className={`${selectCls} ${errors.startYear ? "border-red-400" : ""}`}
                    value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                    <option value="">Select</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                {errors.startYear && <p className="mt-1 text-xs text-red-500">{errors.startYear}</p>}
              </div>
              <div>
                <label className={labelCls}>Maturity Month</label>
                <div className="flex">
                  <span className={icoBox}><CalIcon /></span>
                  <select className={selectCls} value={maturityMonth} onChange={(e) => setMaturityMonth(e.target.value)}>
                    <option value="">Select</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Maturity Year</label>
                <div className="flex">
                  <span className={icoBox}><CalIcon /></span>
                  <select className={selectCls} value={maturityYear} onChange={(e) => setMaturityYear(e.target.value)}>
                    <option value="">Select</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Insured Amount</label>
                <div className="flex">
                  <span className={icoBox}><RupeeIcon /></span>
                  <input type="number" className={inputCls} value={insuredAmount}
                    onChange={(e) => setInsuredAmount(e.target.value)} placeholder="0.00" />
                </div>
              </div>
            </div>

            {/* Row 2: 4 columns */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>Employee Insurance Premium Amount (₹)</label>
                <div className="flex">
                  <span className={icoBox}><RupeeIcon /></span>
                  <input type="number" className={inputCls} value={empPremiumAmount}
                    onChange={(e) => setEmpPremiumAmount(e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Payment Cycle <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className={icoBox}><CalIcon /></span>
                  <select className={`${selectCls} ${errors.paymentCycle ? "border-red-400" : ""}`}
                    value={paymentCycle} onChange={(e) => setPaymentCycle(e.target.value)}>
                    <option value="">Select</option>
                    {PAYMENT_CYCLES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {errors.paymentCycle && <p className="mt-1 text-xs text-red-500">{errors.paymentCycle}</p>}
              </div>
              <div>
                <label className={labelCls}>Total Members Including Employee</label>
                <div className="flex">
                  <span className={icoBox}><PersonIcon /></span>
                  <input type="number" className={inputCls} value={totalMembers}
                    onChange={(e) => setTotalMembers(e.target.value)} placeholder="0" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Total Premium Amount Including Employee (₹)</label>
                <div className="flex">
                  <span className={icoBox}><RupeeIcon /></span>
                  <input type="number" className={inputCls} value={totalPremiumAmount}
                    onChange={(e) => setTotalPremiumAmount(e.target.value)} placeholder="0.00" />
                </div>
              </div>
            </div>

            {/* Row 3: Forward To / Forward For */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>Forward To</label>
                <div className="flex">
                  <span className={icoBox}><ArrowIcon /></span>
                  <input type="text" className={inputCls} value={forwardTo}
                    onChange={(e) => setForwardTo(e.target.value)} placeholder="" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Forward For</label>
                <div className="flex">
                  <span className={icoBox}><ArrowIcon /></span>
                  <select className={selectCls} value={forwardFor} onChange={(e) => setForwardFor(e.target.value)}>
                    <option value="">Select</option>
                    {FORWARD_FOR.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Create Note button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-2 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/employee-self-service/insurance/list")}
            className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-1 border-b border-stroke px-4 py-2 text-xs text-gray-400 dark:border-dark-3">
              {["Sans Serif", "Normal", "B", "I", "U", "S"].map((t, i) => <span key={i} className="cursor-pointer rounded px-1.5 py-0.5 hover:bg-gray-100">{t}</span>)}
            </div>
            <div className="p-4">
              <textarea className="h-32 w-full rounded border border-stroke bg-transparent p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" placeholder="Enter text ..." value={noteText} onChange={(e) => setNoteText(e.target.value)} />
              <div className="mt-3 w-64 rounded border border-orange-300 p-3 text-xs text-dark dark:text-white">
                <p className="mb-1.5 text-center font-semibold">Created By</p>
                <p>Name : SANKARANARAYANAN</p>
                <p>Designation : SUPERINTENDENT</p>
                <p>Date : 13-Mar-2026</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
