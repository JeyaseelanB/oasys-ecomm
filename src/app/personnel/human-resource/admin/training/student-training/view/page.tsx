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
  { id: 1, user: "ALOK / BABELAY", designation: "CHIEF GENERAL MANAGER", date: "02-Jan-2024", comment: "Request reviewed. Please proceed with the arrangement." },
  { id: 2, user: "VAASU / R",      designation: "GENERAL MANAGER",       date: "03-Jan-2024", comment: "Approved. Ensure all safety protocols are followed." },
];

export default function ViewStudentTrainingPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);

  const record = {
    refNumber: "STR-2024-001",
    institutionType: "University",
    institutionName: "Anna University",
    startDate: "15-Jan-2024",
    endDate: "19-Jan-2024",
    noOfDays: "5",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    purpose: "Industrial training for final year students to understand textile manufacturing processes.",
    topic: "Textile Manufacturing & Quality Control",
    // Institution details
    contactPerson: "Dr. Rajesh Kumar",
    contactNumber: "+91 98765 43210",
    email: "rajesh@annauniv.edu",
    noOfStudents: "20",
    department: "Textile Technology",
    address: "Anna University, Chennai - 600025, Tamil Nadu",
    // Document
    uploadedDocument: "training_request_form.pdf",
    // Forward
    forwardTo: "ALOK / BABELAY",
    forwardFor: "Approval",
    status: "APPROVED",
    createdDate: "01-Jan-2024",
  };

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Student Training Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Training</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Student Training Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Student Training Request</h3>
        </div>

        <div className="p-5">
          {/* Section 1: Training Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Training Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Reference Number</p><p className="text-sm font-medium text-[#17a2b8]">{record.refNumber}</p></div>
            <div><p className="text-xs text-gray-500">Institution Type</p><p className="text-sm font-medium text-[#17a2b8]">{record.institutionType}</p></div>
            <div><p className="text-xs text-gray-500">Institution Name</p><p className="text-sm font-medium text-[#17a2b8]">{record.institutionName}</p></div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <span className="inline-block rounded bg-[#28a745] px-2 py-0.5 text-xs font-medium text-white">{record.status}</span>
            </div>
            <div><p className="text-xs text-gray-500">Scheduled Start Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.startDate}</p></div>
            <div><p className="text-xs text-gray-500">Scheduled End Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.endDate}</p></div>
            <div><p className="text-xs text-gray-500">No. of Days</p><p className="text-sm font-medium text-[#17a2b8]">{record.noOfDays}</p></div>
            <div><p className="text-xs text-gray-500">Created Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.createdDate}</p></div>
            <div><p className="text-xs text-gray-500">Scheduled Start Time</p><p className="text-sm font-medium text-[#17a2b8]">{record.startTime}</p></div>
            <div><p className="text-xs text-gray-500">Scheduled End Time</p><p className="text-sm font-medium text-[#17a2b8]">{record.endTime}</p></div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500">Topic</p><p className="text-sm font-medium text-[#17a2b8]">{record.topic}</p>
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <p className="text-xs text-gray-500">Purpose of Training</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.purpose}</p>
            </div>
          </div>

          {/* Section 2: Institution Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Institution Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Contact Person</p><p className="text-sm font-medium text-[#17a2b8]">{record.contactPerson}</p></div>
            <div><p className="text-xs text-gray-500">Contact Number</p><p className="text-sm font-medium text-[#17a2b8]">{record.contactNumber}</p></div>
            <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-[#17a2b8]">{record.email}</p></div>
            <div><p className="text-xs text-gray-500">No. of Students</p><p className="text-sm font-medium text-[#17a2b8]">{record.noOfStudents}</p></div>
            <div><p className="text-xs text-gray-500">Department</p><p className="text-sm font-medium text-[#17a2b8]">{record.department}</p></div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500">Address</p><p className="text-sm font-medium text-[#17a2b8]">{record.address}</p>
            </div>
          </div>

          {/* Section 3: Uploaded Documents */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Requested Document Upload</h4>
          </div>
          <div className="mb-6 border-b border-stroke pb-6 dark:border-dark-3">
            <p className="text-xs text-gray-500">Uploaded Documents</p>
            {record.uploadedDocument ? (
              <div className="mt-1 space-y-1">
                <p className="text-sm font-medium text-[#17a2b8] break-all">{record.uploadedDocument}</p>
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

          {/* Section 4: Forward Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Forward Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Forward To</p><p className="text-sm font-medium text-[#17a2b8]">{record.forwardTo}</p></div>
            <div><p className="text-xs text-gray-500">Forward For</p><p className="text-sm font-medium text-[#17a2b8]">{record.forwardFor}</p></div>
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
              onClick={() => router.push("/personnel/human-resource/admin/training/student-training/list")}
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
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-xl leading-none text-white hover:opacity-80">×</button>
            </div>

            <div className="p-5">
              {/* Workflow Comments */}
              <div className="mb-4 space-y-3">
                {MOCK_COMMENTS.map((c) => (
                  <div key={c.id} className="rounded border border-stroke bg-gray-50 p-3 dark:border-dark-3 dark:bg-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{c.comment}</p>
                  </div>
                ))}
              </div>

              {/* Status Card with navigation */}
              <div className="flex items-center justify-between rounded border border-stroke bg-gray-50 px-4 py-3 dark:border-dark-3 dark:bg-gray-700">
                <button
                  onClick={() => setNoteIndex((i) => Math.max(0, i - 1))}
                  className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >‹</button>
                <div className="text-center">
                  <p className="text-xs font-semibold text-[#2d8f7b]">{MOCK_COMMENTS[noteIndex]?.user}</p>
                  <p className="text-xs text-gray-500">{MOCK_COMMENTS[noteIndex]?.designation}</p>
                  <p className="text-xs text-gray-400">{MOCK_COMMENTS[noteIndex]?.date}</p>
                </div>
                <button
                  onClick={() => setNoteIndex((i) => Math.min(MOCK_COMMENTS.length - 1, i + 1))}
                  className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >›</button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end rounded-b-[10px] border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
