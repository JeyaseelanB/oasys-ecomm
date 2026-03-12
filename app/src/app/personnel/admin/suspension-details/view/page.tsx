"use client";

import Link from "next/link";
import { useState } from "react";

interface SuspensionRecord {
  employeeNumber: string;
  employeeName: string;
  designation: string;
  department: string;
  section: string;
  entity: string;
  entityType: string;
  referenceNumber: string;
  referenceDate: string;
  suspensionName: string;
  extensionFrom: string;
  extensionUpto: string;
  dateOfReinstatement: string;
  allowanceIsReduced: string;
  reason: string;
}

const SAMPLE_DATA: SuspensionRecord = {
  employeeNumber: "EMP-002",
  employeeName: "KARTHIKEYAN R",
  designation: "Senior Officer",
  department: "Administration",
  section: "Admin Section",
  entity: "HEAD OFFICE",
  entityType: "HO",
  referenceNumber: "DACRMar202547",
  referenceDate: "13-Mar-2025",
  suspensionName: "Disciplinary Action - Conduct",
  extensionFrom: "13-Mar-2025",
  extensionUpto: "30-Sep-2025",
  dateOfReinstatement: "01-Oct-2025",
  allowanceIsReduced: "No",
  reason: "Pending departmental enquiry as per disciplinary proceedings.",
};

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" />
    <rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || "-"}</span>
    </div>
  );
}

export default function ViewSuspensionDetailsPage() {
  const data = SAMPLE_DATA;
  const [employeeOpen, setEmployeeOpen] = useState(true);
  const [suspensionOpen, setSuspensionOpen] = useState(true);

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Suspension Details
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Suspension Details</li>
          </ol>
        </nav>
      </div>

      {/* Card wrapper */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Header bar */}
        <div className="border-b border-stroke bg-[#17a2b8] px-5 py-3 dark:border-dark-3">
          <span className="font-semibold text-white">Suspension Details</span>
        </div>

        {/* Employee Details section */}
        <div className="border-b border-stroke dark:border-dark-3">
          <div
            className="flex cursor-pointer items-center gap-2 px-5 py-3"
            onClick={() => setEmployeeOpen((o) => !o)}
          >
            <GridIcon />
            <span className="font-semibold text-dark dark:text-white">Employee Details</span>
            <button className="ml-auto text-lg font-bold leading-none text-dark hover:opacity-70 dark:text-white">
              {employeeOpen ? "−" : "+"}
            </button>
          </div>
          {employeeOpen && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-t border-stroke px-5 py-4 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
              <InfoRow label="Employee Number" value={data.employeeNumber} />
              <InfoRow label="Employee Name" value={data.employeeName} />
              <InfoRow label="Designation" value={data.designation} />
              <InfoRow label="Department" value={data.department} />
              <InfoRow label="Section" value={data.section} />
              <InfoRow label="Entity" value={data.entity} />
              <InfoRow label="Entity Type" value={data.entityType} />
            </div>
          )}
        </div>

        {/* Suspension Details section */}
        <div className="border-b border-stroke dark:border-dark-3">
          <div
            className="flex cursor-pointer items-center gap-2 px-5 py-3"
            onClick={() => setSuspensionOpen((o) => !o)}
          >
            <GridIcon />
            <span className="font-semibold text-dark dark:text-white">Suspension Details</span>
            <button className="ml-auto text-lg font-bold leading-none text-dark hover:opacity-70 dark:text-white">
              {suspensionOpen ? "−" : "+"}
            </button>
          </div>
          {suspensionOpen && (
            <div className="border-t border-stroke dark:border-dark-3">
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-stroke px-5 py-4 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
                <InfoRow label="Reference Number" value={data.referenceNumber} />
                <InfoRow label="Reference Date" value={data.referenceDate} />
                <InfoRow label="Suspension Name" value={data.suspensionName} />
                <InfoRow label="Extension From" value={data.extensionFrom} />
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-5 py-4 sm:grid-cols-2 xl:grid-cols-4">
                <InfoRow label="Extension Upto" value={data.extensionUpto} />
                <InfoRow label="Date of Reinstatement" value={data.dateOfReinstatement} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Allowance is Reduced</span>
                  <span className="text-sm font-medium text-[#17a2b8]">{data.allowanceIsReduced || "-"}</span>
                  {data.allowanceIsReduced === "No" && (
                    <span className="mt-1 inline-block w-fit rounded px-2 py-0.5 text-xs font-semibold text-[#17a2b8]">
                      No
                    </span>
                  )}
                </div>
                <InfoRow label="Reason" value={data.reason} />
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            {/* View Note button */}
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              View Note
            </button>
            {/* Comment/chat button */}
            <button className="flex size-9 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </button>
          </div>

          {/* Back button */}
          <Link
            href="/personnel/admin/suspension-details/list"
            className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12,19 5,12 12,5" />
            </svg>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
