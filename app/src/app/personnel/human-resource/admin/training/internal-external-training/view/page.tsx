"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const MOCK_COMMENTS = [
  { id: 1, user: "ALOK / BABELAY", designation: "CHIEF GENERAL MANAGER", date: "02-Jul-2022", comment: "Training request reviewed and approved. Proceed with arrangements." },
  { id: 2, user: "VAASU / R",      designation: "GENERAL MANAGER",       date: "01-Jul-2022", comment: "Request submitted for approval." },
];

const MOCK_NOMINEES = [
  { id: 1, empName: "KUMAR / S",    empNumber: "201", department: "ADMIN",    designation: "MANAGER"       },
  { id: 2, empName: "PRIYA / M",    empNumber: "215", department: "HR",       designation: "EXECUTIVE"     },
  { id: 3, empName: "RAJAN / K",    empNumber: "198", department: "ACCOUNTS", designation: "ACCOUNTANT"    },
];

export default function ViewInternalExternalTrainingPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);

  const record = {
    referenceNumber: "INTR-28",
    trainingType: "INTERNAL",
    trainingName: "Trail",
    institutionName: "-",
    startDate: "04-Jul-2022",
    endDate: "06-Jul-2022",
    noOfDays: "3",
    createdDate: "01-Jul-2022",
    status: "FINAL_APPROVED" as const,
    reason: "Training for improving internal process knowledge and team collaboration skills across departments.",
    uploadedDocument: "training_doc.pdf",
    forwardTo: "ALOK / BABELAY",
    forwardFor: "Approval",
  };

  const STATUS_BADGE: Record<string, string> = {
    "FINAL_APPROVED": "bg-[#28a745]",
    "INITIATED":      "bg-[#6c757d]",
    "SUBMITTED":      "bg-[#fd7e14]",
    "CANCELLED":      "bg-[#dc3545]",
  };

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Internal / External Training Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Training</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Internal / External Training Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Internal / External Training</h3>
          <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold text-white ${STATUS_BADGE[record.status]}`}>{record.status}</span>
        </div>

        <div className="p-5">
          {/* Section 1: Training Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Training Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Reference Number</p><p className="text-sm font-medium text-[#17a2b8]">{record.referenceNumber}</p></div>
            <div><p className="text-xs text-gray-500">Training Type</p><p className="text-sm font-medium text-[#17a2b8]">{record.trainingType}</p></div>
            <div><p className="text-xs text-gray-500">Training Name</p><p className="text-sm font-medium text-[#17a2b8]">{record.trainingName}</p></div>
            <div><p className="text-xs text-gray-500">Institution Name</p><p className="text-sm font-medium text-[#17a2b8]">{record.institutionName}</p></div>
            <div><p className="text-xs text-gray-500">Start Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.startDate}</p></div>
            <div><p className="text-xs text-gray-500">End Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.endDate}</p></div>
            <div><p className="text-xs text-gray-500">No. of Days</p><p className="text-sm font-medium text-[#17a2b8]">{record.noOfDays}</p></div>
            <div><p className="text-xs text-gray-500">Created Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.createdDate}</p></div>
            <div className="md:col-span-2 lg:col-span-4">
              <p className="text-xs text-gray-500">Reason</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.reason}</p>
            </div>
          </div>

          {/* Section 2: Document */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Uploaded Document</h4>
          </div>
          <div className="mb-6 border-b border-stroke pb-6 dark:border-dark-3">
            {record.uploadedDocument ? (
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#17a2b8]">{record.uploadedDocument}</p>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                  </svg>
                  Download
                </button>
              </div>
            ) : (
              <p className="text-sm font-medium text-[#17a2b8]">-</p>
            )}
          </div>

          {/* Section 3: Forward Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Forward Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Forward To</p><p className="text-sm font-medium text-[#17a2b8]">{record.forwardTo}</p></div>
            <div><p className="text-xs text-gray-500">Forward For</p><p className="text-sm font-medium text-[#17a2b8]">{record.forwardFor}</p></div>
          </div>

          {/* Section 4: Nominees */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Nominees</h4>
          </div>
          <div className="mb-6 overflow-x-auto border-b border-stroke pb-6 dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Employee Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Employee Number</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Department</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Designation</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_NOMINEES.map((emp, idx) => (
                  <tr key={emp.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{emp.empName}</td>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{emp.empNumber}</td>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{emp.department}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{emp.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowNoteModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                View Note
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                </svg>
                Download
              </button>
              <button
                onClick={() => setShowNoteModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                Comments
              </button>
            </div>
            <button
              onClick={() => router.push("/personnel/human-resource/admin/training/internal-external-training/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-xl leading-none text-white hover:opacity-80">×</button>
            </div>
            <div className="p-5">
              <div className="mb-4 space-y-3">
                {MOCK_COMMENTS.map((c) => (
                  <div key={c.id} className="rounded border border-stroke bg-gray-50 p-3 dark:border-dark-3 dark:bg-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{c.comment}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded border border-stroke bg-gray-50 px-4 py-3 dark:border-dark-3 dark:bg-gray-700">
                <button onClick={() => setNoteIndex((i) => Math.max(0, i - 1))} className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400">‹</button>
                <div className="text-center">
                  <p className="text-xs font-semibold text-[#2d8f7b]">{MOCK_COMMENTS[noteIndex]?.user}</p>
                  <p className="text-xs text-gray-500">{MOCK_COMMENTS[noteIndex]?.designation}</p>
                  <p className="text-xs text-gray-400">{MOCK_COMMENTS[noteIndex]?.date}</p>
                </div>
                <button onClick={() => setNoteIndex((i) => Math.min(MOCK_COMMENTS.length - 1, i + 1))} className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400">›</button>
              </div>
            </div>
            <div className="flex items-center justify-end rounded-b-[10px] border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
