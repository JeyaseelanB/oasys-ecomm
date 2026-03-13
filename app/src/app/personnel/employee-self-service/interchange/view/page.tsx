"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  hoRo: "HEAD OFFICE",
  entityType: "Head Office",
  entity: "HEAD OFFICE",
  currentDepartment: "ADMIN",
  currentDesignation: "SUPERINTENDENT",
  interchangeDepartment: "MARKETING",
  interchangeDesignation: "SYSTEM ANALYST",
  reason: "Test",
  supportingDocuments: "",
};

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/>
    <rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/>
    <rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/>
    <rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="10" y="17" width="4" height="4" rx="0.5"/>
    <rect x="17" y="17" width="4" height="4" rx="0.5"/>
  </svg>
);

export default function ViewInterchangePage() {
  const router = useRouter();
  const val = "text-sm font-semibold text-[#17a2b8]";
  const lbl = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Interchange Request</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Interchange Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Current Statistics Section */}
        <div>
          <div className="bg-[#17a2b8] px-5 py-3">
            <span className="text-sm font-semibold text-white">Current Statistics</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-stroke pb-5 dark:border-dark-3 lg:grid-cols-4">
              <div>
                <p className={lbl}>HO/RO</p>
                <p className={val}>{RECORD.hoRo}</p>
              </div>
              <div>
                <p className={lbl}>Entity Type</p>
                <p className={val}>{RECORD.entityType}</p>
              </div>
              <div>
                <p className={lbl}>Entity</p>
                <p className={val}>{RECORD.entity}</p>
              </div>
              <div>
                <p className={lbl}>Current Department</p>
                <p className={val}>{RECORD.currentDepartment}</p>
              </div>
              <div>
                <p className={lbl}>Current Designation</p>
                <p className={val}>{RECORD.currentDesignation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interchange Request Section */}
        <div>
          <div className="bg-[#17a2b8] px-5 py-3">
            <span className="text-sm font-semibold text-white">Interchange Request</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-3">
              <div>
                <p className={lbl}>Interchange Department</p>
                <p className={val}>{RECORD.interchangeDepartment}</p>
              </div>
              <div>
                <p className={lbl}>Interchange Designation</p>
                <p className={val}>{RECORD.interchangeDesignation}</p>
              </div>
              <div>
                <p className={lbl}>Reason</p>
                <p className={val}>{RECORD.reason}</p>
              </div>
              <div>
                <p className={lbl}>Supporting Documents</p>
                <p className={val}>{RECORD.supportingDocuments || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/employee-self-service/interchange/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
