"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SectionIcon = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const CalendarIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ReadField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="min-h-[24px] border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{value || ""}</p>
  </div>
);

interface EmployeeInfo {
  name: string; designation: string; dateOfBirth: string;
  dateOfAppointment: string; dateOfRetirement: string; age: string; actualService: string;
}

const EMPLOYEE_LOOKUP: Record<string, EmployeeInfo> = {
  "420": { name: "SELVI K", designation: "MANAGER GRADE – II", dateOfBirth: "25-Jun-1973", dateOfAppointment: "08-Sep-2010", dateOfRetirement: "30-Jun-2033", age: "52", actualService: "15" },
  "315": { name: "RAJAN P", designation: "SENIOR OFFICER", dateOfBirth: "18-Feb-1965", dateOfAppointment: "01-Mar-1992", dateOfRetirement: "28-Feb-2025", age: "61", actualService: "33" },
  "528": { name: "PRIYA S", designation: "JUNIOR ASSISTANT", dateOfBirth: "07-Sep-1970", dateOfAppointment: "15-Jun-1998", dateOfRetirement: "30-Sep-2030", age: "55", actualService: "27" },
};

export default function CreateCompulsoryRetirementPage() {
  const router = useRouter();
  const [pfNumber, setPfNumber]         = useState("");
  const [employee, setEmployee]         = useState<EmployeeInfo | null>(null);
  const [notFound, setNotFound]         = useState(false);
  const [pendingDisposal, setPendingDisposal] = useState("");
  const [punishmentInForce, setPunishmentInForce] = useState("");
  const [punishmentDetails, setPunishmentDetails] = useState("");

  // Amount Due To
  const [gratuity, setGratuity]               = useState("");
  const [others, setOthers]                   = useState("");
  const [earnedLeave, setEarnedLeave]         = useState("");
  const [unearnedLeave, setUnearnedLeave]     = useState("");
  const [retirementBenefit, setRetirementBenefit] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [interestFromDate, setInterestFromDate] = useState("");
  const [interestToDate, setInterestToDate]   = useState("");
  const [interestOnDeposit, setInterestOnDeposit] = useState("");
  const [othersStaffWelfare, setOthersStaffWelfare] = useState("");
  const [balanceGratuity, setBalanceGratuity] = useState("");

  // Amount Due By
  const [stockDeficit, setStockDeficit]       = useState("0");
  const [creditSalesDues, setCreditSalesDues] = useState("0");
  const [auditObjection, setAuditObjection]   = useState("0");
  const [sundryDeposit, setSundryDeposit]     = useState("0");
  const [staffWelfareDues, setStaffWelfareDues] = useState("0");
  const [othersDues, setOthersDues]           = useState("0");

  const handleSearch = () => {
    const emp = EMPLOYEE_LOOKUP[pfNumber.trim()];
    if (emp) { setEmployee(emp); setNotFound(false); }
    else { setEmployee(null); setNotFound(true); }
  };

  const handleClearSearch = () => { setPfNumber(""); setEmployee(null); setNotFound(false); };

  const totalDueTo = [gratuity, others, earnedLeave, unearnedLeave, retirementBenefit, securityDeposit, interestOnDeposit, othersStaffWelfare, balanceGratuity]
    .reduce((sum, v) => sum + (parseFloat(v) || 0), 0).toFixed(2);

  const totalDueBy = [stockDeficit, creditSalesDues, auditObjection, sundryDeposit, staffWelfareDues, othersDues]
    .reduce((sum, v) => sum + (parseFloat(v) || 0), 0).toFixed(2);

  const netAmount = (parseFloat(totalDueTo) - parseFloat(totalDueBy)).toFixed(2);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Compulsory Retirement</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Retirement</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Compulsory Retirement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Compulsory Retirement</h3>
          <span className="text-xs text-white opacity-80">(* Mandatory Fields)</span>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* PF Search */}
          <div className="pb-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Search Employee</h4>
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <div className="w-full max-w-xs">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Employee PF Number <span className="text-red-500">*</span></label>
                <input
                  value={pfNumber}
                  onChange={e => setPfNumber(e.target.value)}
                  placeholder="Enter PF Number"
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
                {notFound && <p className="mt-1 text-xs text-red-500">Employee not found.</p>}
              </div>
              <button onClick={handleClearSearch} className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Clear</button>
              <button onClick={handleSearch} className="rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Search</button>
            </div>
          </div>

          {/* Employee Details */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <ReadField label="Employee Number"        value={pfNumber && employee ? pfNumber : ""} />
              <ReadField label="Employee Name"          value={employee?.name ?? ""} />
              <ReadField label="Designation"            value={employee?.designation ?? ""} />
              <ReadField label="Date of Birth"          value={employee?.dateOfBirth ?? ""} />
              <ReadField label="Date of Appointment"    value={employee?.dateOfAppointment ?? ""} />
              <ReadField label="Date of Retirement"     value={employee?.dateOfRetirement ?? ""} />
              <ReadField label="Age (As on Date)"       value={employee?.age ?? ""} />
              <ReadField label="Actual Service (As on Date)" value={employee?.actualService ?? ""} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Pending Disposal of Charges, if any</label>
                <select value={pendingDisposal} onChange={e => setPendingDisposal(e.target.value)} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Punishment in Force (If yes, mention details)</label>
                <select value={punishmentInForce} onChange={e => setPunishmentInForce(e.target.value)} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {(punishmentInForce === "Yes" || pendingDisposal === "Yes") && (
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">If Yes, Please mention the details</label>
                  <textarea value={punishmentDetails} onChange={e => setPunishmentDetails(e.target.value)} rows={2} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Amount Due To */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Amount Due to</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              {[
                { label: "Gratuity", value: gratuity, set: setGratuity },
                { label: "Others", value: others, set: setOthers },
                { label: "Encashment of Earned Leave", value: earnedLeave, set: setEarnedLeave },
                { label: "Un-Earned Leave on Private Affairs", value: unearnedLeave, set: setUnearnedLeave },
                { label: "Retirement Benefits Scheme", value: retirementBenefit, set: setRetirementBenefit },
                { label: "Employee Security Deposit", value: securityDeposit, set: setSecurityDeposit },
                { label: "Interest on Employees Security Deposit", value: interestOnDeposit, set: setInterestOnDeposit },
                { label: "Others, if any Staff Welfare", value: othersStaffWelfare, set: setOthersStaffWelfare },
                { label: "Balance Gratuity", value: balanceGratuity, set: setBalanceGratuity },
              ].map(({ label, value, set }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
                  <input type="number" min="0" value={value} onChange={e => set(e.target.value)} placeholder="0.00" className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              ))}
            </div>
            {/* Interest Date Range */}
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">From Date (Interest of Security Deposit)</label>
                <div className="flex">
                  <input type="date" value={interestFromDate} onChange={e => setInterestFromDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <IconBox><CalendarIcon /></IconBox>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">To Date (Interest of Security Deposit)</label>
                <div className="flex">
                  <input type="date" value={interestToDate} onChange={e => setInterestToDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <IconBox><CalendarIcon /></IconBox>
                </div>
              </div>
              <div className="flex items-end">
                <div className="w-full">
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Total Amount</label>
                  <div className="rounded border border-[#2d8f7b] bg-[#e8f5f2] px-3 py-2 text-sm font-bold text-[#2d8f7b] dark:bg-dark-2">
                    {totalDueTo}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amount Due By */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Amount Due by</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              {[
                { label: "Stock Deficit", value: stockDeficit, set: setStockDeficit },
                { label: "Credit Sales Dues", value: creditSalesDues, set: setCreditSalesDues },
                { label: "Audit Objection", value: auditObjection, set: setAuditObjection },
                { label: "Sundry Deposit", value: sundryDeposit, set: setSundryDeposit },
                { label: "Staff Welfare Dues", value: staffWelfareDues, set: setStaffWelfareDues },
                { label: "Others", value: othersDues, set: setOthersDues },
              ].map(({ label, value, set }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
                  <input type="number" min="0" value={value} onChange={e => set(e.target.value)} placeholder="0" className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded bg-[#2d8f7b] px-5 py-3">
              <span className="text-sm font-semibold text-white">Total Amount Due by</span>
              <span className="text-base font-bold text-white">{totalDueBy}</span>
            </div>
          </div>

          {/* Net Amount */}
          <div className="pt-5">
            <div className="flex items-center justify-between rounded bg-[#28a745] px-5 py-3">
              <span className="text-sm font-semibold text-white">Net Amount Due</span>
              <span className="text-base font-bold text-white">{netAmount}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/retirement/compulsory-retirement/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Cancel
          </button>
          <button
            onClick={() => router.push("/personnel/human-resource/retirement/compulsory-retirement/list")}
            disabled={!employee}
            className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
