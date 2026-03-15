"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

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

interface ResignationRecord {
  name: string; horo: string; designation: string; dateOfAppointment: string;
  dateOfBirth: string; dateOfRetirement: string; dateOfResignation: string;
  dateOfJoining: string; entity: string; department: string; entityType: string;
  age: string; actualService: string; pendingDisposal: string; punishmentInForce: string;
}

const RESIGNATION_DATA: Record<number, ResignationRecord> = {
  1: { name: "LAKSHMI PRABHA S", horo: "COIMBATORE",  designation: "JUNIOR ASSISTANT",  dateOfAppointment: "02-May-2013", dateOfBirth: "11-Sep-1980", dateOfRetirement: "30-Sep-2040", dateOfResignation: "17-Feb-2026", dateOfJoining: "02-May-2013", entity: "D&P OFFICE ERODE", department: "ADMIN",    entityType: "D & P Office", age: "45 Years 6 Months 2 Days",  actualService: "12 Years 10 Months 11 Days", pendingDisposal: "No", punishmentInForce: "No" },
  2: { name: "JAYALAKSHMI M",   horo: "HEAD OFFICE",  designation: "SALES ASSISTANT",   dateOfAppointment: "01-Jun-2010", dateOfBirth: "02-Jun-1980", dateOfRetirement: "30-Jun-2040", dateOfResignation: "26-Aug-2024", dateOfJoining: "01-Jun-2010", entity: "HEAD OFFICE",    department: "SALES",    entityType: "Head Office",  age: "44 Years 9 Months 11 Days", actualService: "15 Years 9 Months 12 Days",  pendingDisposal: "No", punishmentInForce: "No" },
  3: { name: "BHUVANA P",       horo: "HEAD OFFICE",  designation: "ACCOUNTS OFFICER",  dateOfAppointment: "15-Mar-2008", dateOfBirth: "02-Jan-1980", dateOfRetirement: "31-Jan-2040", dateOfResignation: "16-Aug-2024", dateOfJoining: "15-Mar-2008", entity: "HEAD OFFICE",    department: "ACCOUNTS", entityType: "Head Office",  age: "45 Years 2 Months 11 Days", actualService: "17 Years 2 Months",          pendingDisposal: "No", punishmentInForce: "No" },
  4: { name: "HASSAN FAROOK S", horo: "ISSR-CHENNAI", designation: "SENIOR OFFICER",    dateOfAppointment: "10-Jul-2009", dateOfBirth: "02-Jun-1981", dateOfRetirement: "30-Jun-2041", dateOfResignation: "13-Aug-2024", dateOfJoining: "10-Jul-2009", entity: "ISSR - CHENNAI", department: "ADMIN",    entityType: "Head Office",  age: "43 Years 9 Months 11 Days", actualService: "16 Years 8 Months 3 Days",   pendingDisposal: "No", punishmentInForce: "No" },
};

function ApproveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const record = RESIGNATION_DATA[id] ?? RESIGNATION_DATA[1];

  const [approvalRemarks, setApprovalRemarks] = useState("");
  const [approvalDate, setApprovalDate]       = useState("");
  const [decision, setDecision]               = useState<"approve" | "reject" | "">("");

  const handleSubmit = () => {
    router.push("/personnel/human-resource/resignation/list");
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Approve Resignation</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Approve Resignation</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Resignation</h3>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* Employee Details (read-only) */}
          <div className="pb-5">
            <div className="mb-3 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4></div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Employee Name"        value={record.name} />
              <Field label="HO/RO"                value={record.horo} />
              <Field label="Designation"          value={record.designation} />
              <Field label="Date of Appointment"  value={record.dateOfAppointment} />
              <Field label="Date of Birth"        value={record.dateOfBirth} />
              <Field label="Date of Retirement"   value={record.dateOfRetirement} />
              <Field label="Date of Resignation"  value={record.dateOfResignation} />
              <Field label="Date of Joining"      value={record.dateOfJoining} />
              <Field label="Entity"               value={record.entity} />
              <Field label="Department"           value={record.department} />
              <Field label="Entity Type"          value={record.entityType} />
              <Field label="Age (as on Date)"     value={record.age} />
              <Field label="Actual Service (As on Date)"  value={record.actualService} />
              <Field label="Pending Disposal of Charges"  value={record.pendingDisposal} />
              <Field label="Punishment in Force"          value={record.punishmentInForce} />
            </div>
          </div>

          {/* Approval Section */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Approval Details</h4></div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Decision <span className="text-red-500">*</span></label>
                <div className="flex gap-6">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-dark dark:text-white">
                    <input type="radio" name="decision" checked={decision === "approve"} onChange={() => setDecision("approve")} className="size-4 accent-primary" />
                    Approve
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-dark dark:text-white">
                    <input type="radio" name="decision" checked={decision === "reject"} onChange={() => setDecision("reject")} className="size-4 accent-[#dc3545]" />
                    Reject
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Approval Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                  <input type="date" value={approvalDate} onChange={(e) => setApprovalDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remarks</label>
              <textarea value={approvalRemarks} onChange={(e) => setApprovalRemarks(e.target.value)} rows={3} placeholder="Enter approval remarks" className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/resignation/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!decision || !approvalDate}
            className={`flex items-center gap-1.5 rounded px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${decision === "reject" ? "bg-[#dc3545]" : "bg-[#28a745]"}`}
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            {decision === "reject" ? "Reject" : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ApproveResignationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ApproveContent />
    </Suspense>
  );
}
