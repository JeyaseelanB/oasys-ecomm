"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUS_STYLE: Record<string, string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  APPROVED:       "bg-[#28a745] text-white",
  REJECTED:       "bg-[#dc3545] text-white",
  INPROGRESS:     "bg-[#6c757d] text-white",
};

export default function ViewLeaveRequestPage() {
  const router = useRouter();
  const [showNote,     setShowNote]     = useState(false);
  const [noteIndex,    setNoteIndex]    = useState(0);

  const record = {
    hoRegion:       "HEAD OFFICE",
    entityType:     "Head Office",
    entity:         "HEAD OFFICE",
    department:     "MARKETING",
    employeeName:   "ARULRAJAN",
    typeOfLeave:    "Casual Leave",
    leaveEligibility: "12",
    leaveConsumed:  "0",
    leaveBalance:   "12",
    dateOfApplication: "03-03-2025",
    noOfDays:       "1",
    fromDate:       "2025-03-04",
    toDate:         "2025-03-04",
    type:           "",
    session:        "",
    reason:         "ddddd",
    status:         "REJECTED" as const,
  };

  const NOTES = [
    { by: "SANKARANARAYANAN", designation: "SUPERINTENDENT", date: "03-Mar-2025", text: "Leave request submitted for review." },
    { by: "HR MANAGER",       designation: "MANAGER",        date: "04-Mar-2025", text: "Reviewed. Rejected due to insufficient balance." },
  ];

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-[#2d8f7b]">{value || "—"}</p>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Leave Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Leave Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Leave Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Leave Request</h3>
          <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[record.status]}`}>{record.status}</span>
        </div>

        <div className="p-5 space-y-6">
          {/* Employee & Leave Info */}
          <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <Field label="H.O / Region"         value={record.hoRegion} />
            <Field label="Entity Type"           value={record.entityType} />
            <Field label="Entity"                value={record.entity} />
            <Field label="Department"            value={record.department} />
            <Field label="Employee Name"         value={record.employeeName} />
            <Field label="Type of Leave"         value={record.typeOfLeave} />
            <Field label="Leave Eligibility"     value={record.leaveEligibility} />
            <Field label="Leave Consumed"        value={record.leaveConsumed} />
            <Field label="Leave Balance"         value={record.leaveBalance} />
            <Field label="Date of Application"   value={record.dateOfApplication} />
            <Field label="No. of days Requested" value={record.noOfDays} />
            <Field label="From Date"             value={record.fromDate} />
            <Field label="To Date"               value={record.toDate} />
            <Field label="Type"                  value={record.type} />
            <Field label="Session"               value={record.session} />
            <Field label="Reason"                value={record.reason} />
          </div>

          {/* Supporting Documents */}
          <div className="border-b border-stroke pb-5 dark:border-dark-3">
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Supporting Documents</p>
            <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <button onClick={() => setShowNote(true)} className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View Note
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button
              onClick={() => router.push("/personnel/human-resource/leave-management/leave-request/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-3 min-h-[80px] rounded border border-stroke bg-gray-50 p-3 text-sm text-gray-700 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-300">
                {NOTES[noteIndex].text}
              </div>
              <div className="rounded border border-orange-300 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs text-gray-500">Created by</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setNoteIndex((i) => Math.max(0, i - 1))} disabled={noteIndex === 0} className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark">‹</button>
                    <button onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))} disabled={noteIndex === NOTES.length - 1} className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark">›</button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-dark dark:text-white">Name : {NOTES[noteIndex].by}</p>
                <p className="text-xs text-gray-500">Designation : {NOTES[noteIndex].designation}</p>
                <p className="text-xs text-gray-500">Date: {NOTES[noteIndex].date}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setShowNote(false)} className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
