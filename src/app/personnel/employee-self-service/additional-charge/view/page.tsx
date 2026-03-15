"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RECORD = {
  hoRo: "CHENNAI",
  entityType: "Showroom",
  entity: "THIRUVALLUR",
  department: "MARKETING",
  employeeCodeName: "281/THULASIDOSS",
  date: "2025-01-07",
  designation: "MANAGER GRADE – II",
  additionalCharge: "PRODUCT MANAGER",
  fromDate: "2025-01-07",
  additionalChargeWorkLocation: "BHAVANI",
  relievingDate: "",
  totalNumberOfDays: "",
  numberOfDaysPresent: "",
  numberOfDaysAbsent: "",
  reason: "Please forwarded",
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

export default function ViewAdditionalChargePage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);

  const val = "text-sm font-semibold text-[#17a2b8]";
  const lbl = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Additional Charge</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Additional Charge</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Additional Charge</span>
        </div>

        <div className="p-5 space-y-6">
          {/* Current Statistics */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon /> Current Statistics
            </h4>
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
                <p className={lbl}>Department</p>
                <p className={val}>{RECORD.department}</p>
              </div>
              <div>
                <p className={lbl}>Employee Code / Name</p>
                <p className={val}>{RECORD.employeeCodeName}</p>
              </div>
              <div>
                <p className={lbl}>Date</p>
                <p className={val}>{RECORD.date}</p>
              </div>
            </div>
          </div>

          {/* Assigning Additional Charge */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon /> Assigning Additional Charge
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
              <div>
                <p className={lbl}>Designation</p>
                <p className={val}>{RECORD.designation}</p>
              </div>
              <div>
                <p className={lbl}>Additional Charge</p>
                <p className={val}>{RECORD.additionalCharge}</p>
              </div>
              <div>
                <p className={lbl}>From Date</p>
                <p className={val}>{RECORD.fromDate}</p>
              </div>
              <div>
                <p className={lbl}>AdditionalChargeWorkLocation</p>
                <p className={val}>{RECORD.additionalChargeWorkLocation}</p>
              </div>
              <div>
                <p className={lbl}>Relieving Date</p>
                <p className={val}>{RECORD.relievingDate || "—"}</p>
              </div>
              <div>
                <p className={lbl}>Total Number of days</p>
                <p className={val}>{RECORD.totalNumberOfDays || "—"}</p>
              </div>
              <div>
                <p className={lbl}>Number of days Present</p>
                <p className={val}>{RECORD.numberOfDaysPresent || "—"}</p>
              </div>
              <div>
                <p className={lbl}>Number of days Absent</p>
                <p className={val}>{RECORD.numberOfDaysAbsent || "—"}</p>
              </div>
              <div className="col-span-2 lg:col-span-4">
                <p className={lbl}>Reason</p>
                <p className={val}>{RECORD.reason}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button
            onClick={() => setShowNoteModal(true)}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            View Note
          </button>
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Reject
          </button>
          <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
            Approve
          </button>
          <button
            onClick={() => router.push("/personnel/employee-self-service/additional-charge/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-1 border-b border-stroke px-4 py-2 text-xs text-gray-400 dark:border-dark-3">
              {["Sans Serif", "Normal", "B", "I", "U", "S"].map((t, i) => <span key={i} className="cursor-pointer rounded px-1.5 py-0.5 hover:bg-gray-100">{t}</span>)}
            </div>
            <div className="p-4">
              <textarea className="h-32 w-full rounded border border-stroke bg-transparent p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" placeholder="Note content..." readOnly />
              <div className="mt-3 w-64 rounded border border-orange-300 p-3 text-xs text-dark dark:text-white">
                <p className="mb-1.5 text-center font-semibold">Created By</p>
                <p>Name : THULASIDOSS</p>
                <p>Designation : MANAGER GRADE – II</p>
                <p>Date : 07-Jan-2025</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
