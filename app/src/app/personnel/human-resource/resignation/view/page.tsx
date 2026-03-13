"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type ResignationStatus = "SUBMITTED" | "INPROGRESS" | "APPROVED" | "REJECTED";

interface ResignationRecord {
  status: ResignationStatus;
  employee: {
    name: string; horo: string; designation: string; dateOfAppointment: string;
    dateOfBirth: string; dateOfRetirement: string; dateOfResignation: string;
    dateOfJoining: string; entity: string; department: string; entityType: string;
    age: string; actualService: string; pendingDisposal: string; punishmentInForce: string;
  };
  amountDue: {
    gratuity: string; others: string; encashmentOfEarnedLeave: string;
    unEarnedLeavePvtAffairs: string; retirementBenefitsScheme: string;
    employeeSecurityDeposit: string; interestFromDate: string; interestToDate: string;
    interestAmount: string; totalAmountDue: string;
  };
}

const RESIGNATION_DATA: Record<number, ResignationRecord> = {
  1: {
    status: "SUBMITTED",
    employee: {
      name: "LAKSHMI PRABHA",    horo: "COIMBATORE",  designation: "JUNIOR ASSISTANT",  dateOfAppointment: "02-May-2013",
      dateOfBirth: "11-Sep-1980", dateOfRetirement: "30-Sep-2040", dateOfResignation: "17-Feb-2026", dateOfJoining: "02-May-2013",
      entity: "D&P OFFICE ERODE", department: "ADMIN", entityType: "D & P Office",
      age: "45 Years 6 Months 2 Days", actualService: "12 Years 10 Months 11 Days",
      pendingDisposal: "No", punishmentInForce: "No",
    },
    amountDue: { gratuity: "", others: "", encashmentOfEarnedLeave: "211744.00", unEarnedLeavePvtAffairs: "0.00", retirementBenefitsScheme: "", employeeSecurityDeposit: "", interestFromDate: "", interestToDate: "", interestAmount: "", totalAmountDue: "211744.00" },
  },
  2: {
    status: "INPROGRESS",
    employee: {
      name: "JAYALAKSHMI M",     horo: "HEAD OFFICE", designation: "SALES ASSISTANT",   dateOfAppointment: "01-Jun-2010",
      dateOfBirth: "02-Jun-1980", dateOfRetirement: "30-Jun-2040", dateOfResignation: "26-Aug-2024", dateOfJoining: "01-Jun-2010",
      entity: "HEAD OFFICE",      department: "SALES", entityType: "Head Office",
      age: "44 Years 9 Months 11 Days", actualService: "15 Years 9 Months 12 Days",
      pendingDisposal: "No", punishmentInForce: "No",
    },
    amountDue: { gratuity: "450000.00", others: "0.00", encashmentOfEarnedLeave: "185600.00", unEarnedLeavePvtAffairs: "0.00", retirementBenefitsScheme: "25000.00", employeeSecurityDeposit: "12000.00", interestFromDate: "01-Jun-2010", interestToDate: "26-Aug-2024", interestAmount: "8500.00", totalAmountDue: "681100.00" },
  },
  3: {
    status: "INPROGRESS",
    employee: {
      name: "BHUVANA P",         horo: "HEAD OFFICE", designation: "ACCOUNTS OFFICER",  dateOfAppointment: "15-Mar-2008",
      dateOfBirth: "02-Jan-1980", dateOfRetirement: "31-Jan-2040", dateOfResignation: "16-Aug-2024", dateOfJoining: "15-Mar-2008",
      entity: "HEAD OFFICE",      department: "ACCOUNTS", entityType: "Head Office",
      age: "45 Years 2 Months 11 Days", actualService: "17 Years 2 Months",
      pendingDisposal: "No", punishmentInForce: "No",
    },
    amountDue: { gratuity: "620000.00", others: "0.00", encashmentOfEarnedLeave: "224800.00", unEarnedLeavePvtAffairs: "0.00", retirementBenefitsScheme: "30000.00", employeeSecurityDeposit: "15000.00", interestFromDate: "15-Mar-2008", interestToDate: "16-Aug-2024", interestAmount: "11200.00", totalAmountDue: "901000.00" },
  },
  4: {
    status: "INPROGRESS",
    employee: {
      name: "HASSAN FAROOK S",   horo: "ISSR-CHENNAI", designation: "SENIOR OFFICER",  dateOfAppointment: "10-Jul-2009",
      dateOfBirth: "02-Jun-1981", dateOfRetirement: "30-Jun-2041", dateOfResignation: "13-Aug-2024", dateOfJoining: "10-Jul-2009",
      entity: "ISSR - CHENNAI",   department: "ADMIN", entityType: "Head Office",
      age: "43 Years 9 Months 11 Days", actualService: "16 Years 8 Months 3 Days",
      pendingDisposal: "No", punishmentInForce: "No",
    },
    amountDue: { gratuity: "540000.00", others: "0.00", encashmentOfEarnedLeave: "198400.00", unEarnedLeavePvtAffairs: "0.00", retirementBenefitsScheme: "28000.00", employeeSecurityDeposit: "14000.00", interestFromDate: "10-Jul-2009", interestToDate: "13-Aug-2024", interestAmount: "9800.00", totalAmountDue: "790200.00" },
  },
};

const STATUS_STYLES: Record<ResignationStatus, string> = {
  SUBMITTED:  "bg-[#fd7e14]",
  INPROGRESS: "bg-[#17a2b8]",
  APPROVED:   "bg-[#28a745]",
  REJECTED:   "bg-[#dc3545]",
};

const SectionIcon = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const Field = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`text-sm font-medium ${highlight ? "text-[#fd7e14]" : "text-[#2d8f7b]"}`}>{value || "—"}</p>
  </div>
);

function ViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const record = RESIGNATION_DATA[id] ?? RESIGNATION_DATA[1];
  const emp = record.employee;
  const amt = record.amountDue;

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Resignation</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Resignation</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Resignation</h3>
          <span className={`inline-block rounded-sm px-3 py-1 text-xs font-semibold text-white ${STATUS_STYLES[record.status]}`}>
            {record.status}
          </span>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* Employee Details */}
          <div className="pb-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4">
              <Field label="Employee Name"        value={emp.name} />
              <Field label="HO/RO"                value={emp.horo} />
              <Field label="Designation"          value={emp.designation} />
              <Field label="Date of Appointment"  value={emp.dateOfAppointment} />
              <Field label="Date of Birth"        value={emp.dateOfBirth} />
              <Field label="Date of Retirement"   value={emp.dateOfRetirement} />
              <Field label="Date of Resignation"  value={emp.dateOfResignation} />
              <Field label="Date of Joining"      value={emp.dateOfJoining} />
              <Field label="Entity"               value={emp.entity} />
              <Field label="Department"           value={emp.department} />
              <Field label="Entity Type"          value={emp.entityType} />
              <Field label="Age (as on Date)"     value={emp.age} />
            </div>
          </div>

          {/* Service Details */}
          <div className="py-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3">
              <Field label="Actual Service (As on Date)"              value={emp.actualService} />
              <Field label="Pending Disposal of Charges"              value={emp.pendingDisposal} />
              <Field label="Punishment in Force (If yes, mention details)" value={emp.punishmentInForce} />
            </div>
          </div>

          {/* Amount Due to */}
          <div className="py-5">
            <div className="mb-4 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Amount Due to</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4">
              <Field label="Gratuity"                          value={amt.gratuity} />
              <Field label="Others"                            value={amt.others} />
              <Field label="Encashment of Earned Leave"        value={amt.encashmentOfEarnedLeave} highlight={!!amt.encashmentOfEarnedLeave && amt.encashmentOfEarnedLeave !== "0.00"} />
              <Field label="Un-Earned Leave on Private Affairs" value={amt.unEarnedLeavePvtAffairs} />
              <Field label="Retirement Benefits Scheme"        value={amt.retirementBenefitsScheme} />
              <Field label="Employee security deposit"         value={amt.employeeSecurityDeposit} />
              <Field label="Interest on Employees Security - From Date" value={amt.interestFromDate} />
              <Field label="Interest on Employees Security - To Date"   value={amt.interestToDate} />
            </div>

            {amt.totalAmountDue && (
              <div className="mt-5 rounded border border-stroke bg-gray-50 p-4 dark:border-dark-3 dark:bg-dark-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-dark dark:text-white">Total Amount Due</p>
                  <p className="text-base font-bold text-[#28a745]">₹ {amt.totalAmountDue}</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Back button */}
        <div className="flex items-center justify-end border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/resignation/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ViewResignationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
