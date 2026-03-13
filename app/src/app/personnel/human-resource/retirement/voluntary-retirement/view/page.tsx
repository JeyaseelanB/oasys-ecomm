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

const Field = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`text-sm font-medium ${highlight ? "text-[#fd7e14]" : "text-[#2d8f7b]"}`}>{value || "—"}</p>
  </div>
);

interface VRRecord {
  employeeNumber: string;
  employeeName: string;
  designation: string;
  dateOfBirth: string;
  dateOfJoining: string;
  retirementDate: string;
  age: string;
  actualService: string;
  pendingDisposal: string;
  punishmentInForce: string;
  regionName: string;
  entity: string;
  department: string;
  status: string;
  gratuity: string;
  leaveEncashment: string;
  unearnedLeave: string;
  retirementBenefitScheme: string;
  employeeSecurityDeposit: string;
  interestOnGratuity: string;
  interestOnLeaveEncashment: string;
  totalAmountDue: string;
}

const VR_DATA: Record<number, VRRecord> = {
  1: {
    employeeNumber: "544", employeeName: "SANTHANAMARI R", designation: "JUNIOR ASSISTANT",
    dateOfBirth: "01-Jun-1982", dateOfJoining: "10-Mar-2005", retirementDate: "26-Feb-2026",
    age: "43 Years 8 Months 25 Days", actualService: "20 Years 11 Months 16 Days",
    pendingDisposal: "No", punishmentInForce: "No",
    regionName: "MADURAI", entity: "D&P OFFICE MADURAI", department: "ADMIN",
    status: "FINAL-APPROVED",
    gratuity: "4,85,200.00", leaveEncashment: "1,23,450.00", unearnedLeave: "0.00",
    retirementBenefitScheme: "2,10,000.00", employeeSecurityDeposit: "50,000.00",
    interestOnGratuity: "12,340.00", interestOnLeaveEncashment: "3,210.00",
    totalAmountDue: "8,84,200.00",
  },
  3: {
    employeeNumber: "821", employeeName: "MOHAN R", designation: "SENIOR OFFICER",
    dateOfBirth: "03-Jun-1962", dateOfJoining: "15-Aug-1988", retirementDate: "24-Feb-2026",
    age: "63 Years 8 Months 21 Days", actualService: "37 Years 6 Months 9 Days",
    pendingDisposal: "No", punishmentInForce: "No",
    regionName: "VELLORE", entity: "D&P OFFICE VELLORE", department: "FINANCE",
    status: "FINAL-APPROVED",
    gratuity: "9,20,500.00", leaveEncashment: "2,45,000.00", unearnedLeave: "18,500.00",
    retirementBenefitScheme: "3,80,000.00", employeeSecurityDeposit: "75,000.00",
    interestOnGratuity: "23,012.00", interestOnLeaveEncashment: "6,125.00",
    totalAmountDue: "15,68,137.00",
  },
  6: {
    employeeNumber: "196", employeeName: "RAJ MOHAN R", designation: "ACCOUNTS OFFICER",
    dateOfBirth: "21-Jul-1981", dateOfJoining: "02-Jun-2003", retirementDate: "24-Feb-2026",
    age: "44 Years 7 Months 3 Days", actualService: "22 Years 8 Months 22 Days",
    pendingDisposal: "No", punishmentInForce: "No",
    regionName: "HEAD OFFICE", entity: "HEAD OFFICE", department: "ACCOUNTS",
    status: "FINAL-APPROVED",
    gratuity: "5,62,800.00", leaveEncashment: "1,54,200.00", unearnedLeave: "0.00",
    retirementBenefitScheme: "2,50,000.00", employeeSecurityDeposit: "60,000.00",
    interestOnGratuity: "14,070.00", interestOnLeaveEncashment: "3,855.00",
    totalAmountDue: "10,44,925.00",
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
  const record = VR_DATA[id] ?? VR_DATA[1];

  const statusStyle = STATUS_STYLES[record.status] ?? "bg-gray-400";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Voluntary Retirement</h2>
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
            <li className="font-medium text-primary">View Voluntary Retirement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Voluntary Retirement</h3>
          <span className={`rounded px-2.5 py-0.5 text-xs font-semibold text-white ${statusStyle}`}>
            {record.status}
          </span>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* Employee Details */}
          <div className="pb-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Employee Number"   value={record.employeeNumber} />
              <Field label="Employee Name"     value={record.employeeName} />
              <Field label="Designation"       value={record.designation} />
              <Field label="Region Name"       value={record.regionName} />
              <Field label="Date of Birth"     value={record.dateOfBirth} />
              <Field label="Date of Joining"   value={record.dateOfJoining} />
              <Field label="Date of Retirement" value={record.retirementDate} />
              <Field label="Entity"            value={record.entity} />
              <Field label="Department"        value={record.department} />
              <Field label="Age (as on Date)"  value={record.age} />
              <Field label="Actual Service (As on Date)" value={record.actualService} />
              <Field label="Pending Disposal of Charges" value={record.pendingDisposal} highlight={record.pendingDisposal === "Yes"} />
              <Field label="Punishment in Force"         value={record.punishmentInForce} highlight={record.punishmentInForce === "Yes"} />
            </div>
          </div>

          {/* Amount Due */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Amount Due</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Gratuity"                    value={`₹ ${record.gratuity}`} />
              <Field label="Leave Encashment"            value={`₹ ${record.leaveEncashment}`} />
              <Field label="Unearned Leave"              value={`₹ ${record.unearnedLeave}`} />
              <Field label="Retirement Benefit Scheme"  value={`₹ ${record.retirementBenefitScheme}`} />
              <Field label="Employee Security Deposit"  value={`₹ ${record.employeeSecurityDeposit}`} />
              <Field label="Interest on Gratuity"       value={`₹ ${record.interestOnGratuity}`} />
              <Field label="Interest on Leave Encashment" value={`₹ ${record.interestOnLeaveEncashment}`} />
            </div>

            {/* Total Amount Due bar */}
            <div className="mt-5 flex items-center justify-between rounded bg-[#28a745] px-5 py-3">
              <span className="text-sm font-semibold text-white">Total Amount Due</span>
              <span className="text-base font-bold text-white">₹ {record.totalAmountDue}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button
            onClick={() => router.push("/personnel/human-resource/retirement/voluntary-retirement/list")}
            className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ViewVoluntaryRetirementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
