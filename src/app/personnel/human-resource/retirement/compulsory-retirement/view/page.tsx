"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SectionIcon = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#2d8f7b]">{value || "—"}</p>
  </div>
);

const AmountField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <div className="rounded border border-stroke bg-gray-50 px-3 py-1.5 text-sm font-medium text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
      {value || "0.0"}
    </div>
  </div>
);

interface CRRecord {
  employeeNumber: string; employeeName: string; designation: string;
  dateOfBirth: string; dateOfAppointment: string; dateOfRetirement: string;
  age: string; actualService: string;
  pendingDisposal: string; punishmentInForce: string;
  regionName: string; status: string;
  gratuity: string; others: string; earnedLeave: string; unearnedLeave: string;
  retirementBenefit: string; securityDeposit: string;
  interestFromDate: string; interestToDate: string;
  interestOnDeposit: string; othersStaffWelfare: string; balanceGratuity: string;
  totalAmountDueTo: string;
  stockDeficit: string; creditSalesDues: string; auditObjection: string;
  sundryDeposit: string; staffWelfareDues: string; othersDues: string;
  totalAmountDueBy: string; netAmount: string;
}

const CR_DATA: Record<number, CRRecord> = {
  1: {
    employeeNumber: "420", employeeName: "SELVI K", designation: "MANAGER GRADE – II",
    dateOfBirth: "25-06-1973", dateOfAppointment: "08-09-2010", dateOfRetirement: "30-06-2033",
    age: "52", actualService: "15",
    pendingDisposal: "No", punishmentInForce: "No",
    regionName: "COIMBATORE", status: "SUBMITTED",
    gratuity: "", others: "", earnedLeave: "220040.0", unearnedLeave: "0.0",
    retirementBenefit: "0.0", securityDeposit: "0.0",
    interestFromDate: "01-Apr-2025", interestToDate: "29-Apr-2024",
    interestOnDeposit: "0.0", othersStaffWelfare: "0.0", balanceGratuity: "0.0",
    totalAmountDueTo: "220040.0",
    stockDeficit: "0", creditSalesDues: "0", auditObjection: "0",
    sundryDeposit: "0", staffWelfareDues: "0", othersDues: "0",
    totalAmountDueBy: "0.0", netAmount: "220040.0",
  },
  2: {
    employeeNumber: "315", employeeName: "RAJAN P", designation: "SENIOR OFFICER",
    dateOfBirth: "18-02-1965", dateOfAppointment: "01-03-1992", dateOfRetirement: "28-02-2025",
    age: "61", actualService: "33",
    pendingDisposal: "No", punishmentInForce: "No",
    regionName: "MADURAI", status: "FINAL-APPROVED",
    gratuity: "920500.0", others: "0.0", earnedLeave: "245000.0", unearnedLeave: "18500.0",
    retirementBenefit: "380000.0", securityDeposit: "75000.0",
    interestFromDate: "01-Mar-2025", interestToDate: "28-Feb-2025",
    interestOnDeposit: "23012.0", othersStaffWelfare: "0.0", balanceGratuity: "0.0",
    totalAmountDueTo: "1662012.0",
    stockDeficit: "0", creditSalesDues: "0", auditObjection: "0",
    sundryDeposit: "0", staffWelfareDues: "0", othersDues: "0",
    totalAmountDueBy: "0.0", netAmount: "1662012.0",
  },
};

const STATUS_STYLES: Record<string, string> = {
  "FINAL-APPROVED": "bg-[#28a745]",
  "REJECTED":       "bg-[#dc3545]",
  "SUBMITTED":      "bg-[#fd7e14]",
  "INPROGRESS":     "bg-[#17a2b8]",
};

function ViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const record = CR_DATA[id] ?? CR_DATA[1];
  const statusStyle = STATUS_STYLES[record.status] ?? "bg-gray-400";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Compulsory Retirement</h2>
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
            <li className="font-medium text-primary">View Compulsory Retirement</li>
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

          {/* Employee Details */}
          <div className="pb-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Employee Number</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.employeeNumber}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Employee Name</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.employeeName}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Designation</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.designation}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.dateOfBirth}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Date of Appointment</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.dateOfAppointment}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Date of Retirement</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.dateOfRetirement}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Age (As on Date)</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.age}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Actual Service (As on Date)</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.actualService}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Pending Disposal of Charges, if any</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.pendingDisposal}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Punishment in Force (If yes, mention details)</p>
                <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{record.punishmentInForce}</p>
              </div>
              <div className="md:col-span-2">
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">If Yes, Please mention the details</p>
                <p className="border-b border-stroke pb-1 text-sm text-gray-400 dark:border-dark-3">—</p>
              </div>
            </div>
          </div>

          {/* Amount Due To */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Amount Due to</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <AmountField label="Gratuity"                             value={record.gratuity} />
              <AmountField label="Others"                               value={record.others} />
              <AmountField label="Encashment of Earned Leave"           value={record.earnedLeave} />
              <AmountField label="Un-Earned Leave on Private Affairs"   value={record.unearnedLeave} />
              <AmountField label="Retirement Benefits Scheme"           value={record.retirementBenefit} />
              <AmountField label="Employee Security Deposit"            value={record.securityDeposit} />
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">From Date (Interest of Security Deposit)</p>
                <p className="text-sm font-medium text-[#2d8f7b]">{record.interestFromDate}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">To Date (Interest of Security Deposit)</p>
                <p className="text-sm font-medium text-[#2d8f7b]">{record.interestToDate}</p>
              </div>
              <AmountField label="Interest on Employees Security Deposit" value={record.interestOnDeposit} />
              <AmountField label="Others, if any Staff Welfare"           value={record.othersStaffWelfare} />
              <AmountField label="Balance Gratuity"                       value={record.balanceGratuity} />
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                <div className="rounded border border-[#2d8f7b] bg-[#e8f5f2] px-3 py-1.5 text-sm font-bold text-[#2d8f7b] dark:bg-dark-2">
                  {record.totalAmountDueTo}
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
              <AmountField label="Stock Deficit"      value={record.stockDeficit} />
              <AmountField label="Credit Sales Dues"  value={record.creditSalesDues} />
              <AmountField label="Audit Objection"    value={record.auditObjection} />
              <AmountField label="Sundry Deposit"     value={record.sundryDeposit} />
              <AmountField label="Staff Welfare Dues" value={record.staffWelfareDues} />
              <AmountField label="Others"             value={record.othersDues} />
            </div>
            <div className="mt-4 flex items-center justify-between rounded bg-[#2d8f7b] px-5 py-3">
              <span className="text-sm font-semibold text-white">Total Amount Due by</span>
              <span className="text-base font-bold text-white">{record.totalAmountDueBy}</span>
            </div>
          </div>

          {/* Net Amount */}
          <div className="pt-5">
            <div className="flex items-center justify-between rounded bg-[#28a745] px-5 py-3">
              <span className="text-sm font-semibold text-white">Net Amount Due</span>
              <span className="text-base font-bold text-white">{record.netAmount}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stroke px-5 py-4 dark:border-dark-3">
          <span className={`rounded px-3 py-1 text-xs font-semibold text-white ${statusStyle}`}>{record.status}</span>
          <button
            onClick={() => router.push("/personnel/human-resource/retirement/compulsory-retirement/list")}
            className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ViewCompulsoryRetirementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
