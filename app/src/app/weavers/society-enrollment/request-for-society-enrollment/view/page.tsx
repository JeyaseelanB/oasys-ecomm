"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STEPS = [
  "Receive Requisition Letter",
  "Supporting Document Collection",
  "Field Verification",
  "Head Office Approval",
  "Board Approval",
  "Society Code Allotment",
];

// Mock data — replace with actual data fetch
const RECORD = {
  loomType: "POWERLOOM",
  societyName: "ghjkkk",
  societyNameTamil: "ddsaf",
  societyRegistrationNumber: "123",
  societyRegistrationDate: "24-Feb-2025",
  societyProductionStartDate: "28-Feb-2025",
  societyResolutionDate: "28-Feb-2025",
  societyResolutionNumber: "122",
  recommendationLetterReceivedFrom: "ADHT",
  adhtOfficeCode: "07 / COIMBATORE",
  recommendedBy: "gvhb",
  recommendedDate: "24-Feb-2025",
  dpCodeName: "1301 / D&P OFFICE ERODE",
  dpManagerName: "GAJENDRAN M",
};

const NOTES = [
  {
    id: 1,
    text: "oK",
    name: "LAKSHMI PRABHA S",
    designation: "SENIOR ASSISTANT",
    date: "24-Feb-2025",
  },
];

export default function RequestForSocietyEnrollmentViewPage() {
  const router = useRouter();

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsTab, setCommentsTab] = useState<"approve" | "reject">("approve");

  const fieldVal = "font-medium text-[#17a2b8]";
  const fieldLabel = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Request for Society Enrollment
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Request for Society Enrollment</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const active = i === 0;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && (
                      <div className="h-0.5 flex-1 bg-gray-200 dark:bg-dark-3" />
                    )}
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                        active
                          ? "border-orange-400 bg-white text-orange-400"
                          : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                      }`}
                    >
                      {i + 1}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="h-0.5 flex-1 bg-gray-200 dark:bg-dark-3" />
                    )}
                  </div>
                  <span
                    className={`mt-1.5 text-center text-[11px] font-medium ${
                      active ? "text-dark dark:text-white" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">View Receive Requisition Letter</span>
        </div>

        {/* View Body */}
        <div className="p-5">

          {/* Row 1 */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div>
              <p className={fieldLabel}>Loom Type</p>
              <p className={fieldVal}>{RECORD.loomType}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Name</p>
              <p className={fieldVal}>{RECORD.societyName}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Name (In Tamil)</p>
              <p className={fieldVal}>{RECORD.societyNameTamil}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Registration Number</p>
              <p className={fieldVal}>{RECORD.societyRegistrationNumber}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div>
              <p className={fieldLabel}>Society Registration Date</p>
              <p className={fieldVal}>{RECORD.societyRegistrationDate}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Production Start Date</p>
              <p className={fieldVal}>{RECORD.societyProductionStartDate}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Resolution Date</p>
              <p className={fieldVal}>{RECORD.societyResolutionDate}</p>
            </div>
            <div>
              <p className={fieldLabel}>Society Resolution Number</p>
              <p className={fieldVal}>{RECORD.societyResolutionNumber}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
            <div>
              <p className={fieldLabel}>Recommendation Letter Received From</p>
              <p className={fieldVal}>{RECORD.recommendationLetterReceivedFrom}</p>
            </div>
            <div>
              <p className={fieldLabel}>ADHT Office Code / Name</p>
              <p className={fieldVal}>{RECORD.adhtOfficeCode}</p>
            </div>
            <div>
              <p className={fieldLabel}>Recommended by</p>
              <p className={fieldVal}>{RECORD.recommendedBy}</p>
            </div>
            <div>
              <p className={fieldLabel}>Recommended Date</p>
              <p className={fieldVal}>{RECORD.recommendedDate}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-5 border-t border-stroke dark:border-dark-3" />

          {/* Two-column: Attachments + D&P */}
          <div className="mb-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Attachments */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/><rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/></svg>
                Attachments
              </h4>
              <p className={fieldLabel}>Recommendation Letter</p>
              <button className="mt-1 flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>
                Download
              </button>
            </div>

            {/* D&P */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/><rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/></svg>
                D&amp;P Office Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={fieldLabel}>D&amp;P Code / Name</p>
                  <p className={fieldVal}>{RECORD.dpCodeName}</p>
                </div>
                <div>
                  <p className={fieldLabel}>D&amp;P Manager Name</p>
                  <p className={fieldVal}>{RECORD.dpManagerName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setNoteIndex(0); setShowNoteModal(true); }}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
                View Note
              </button>
              <button
                onClick={() => setShowCommentsModal(true)}
                className="flex size-8 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90"
                title="Comments"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button
              onClick={() => router.push("/weavers/society-enrollment/request-for-society-enrollment/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {/* Toolbar (decorative) */}
            <div className="flex flex-wrap items-center gap-1 border-b border-stroke px-4 py-2 text-xs text-gray-400 dark:border-dark-3">
              {["Sans Serif", "Normal", "B", "I", "U", "S"].map((t, i) => (
                <span key={i} className="rounded px-1.5 py-0.5 text-gray-400">{t}</span>
              ))}
            </div>
            {/* Note Content */}
            <div className="p-4">
              <div className="min-h-[120px] rounded border border-stroke bg-gray-50 p-3 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {NOTES[noteIndex]?.text}
              </div>

              {/* Navigation dots */}
              <div className="mt-2 flex items-center justify-end gap-2">
                <span className="size-2 rounded-full bg-[#17a2b8]" />
                {NOTES.length > 1 && (
                  <>
                    <button onClick={() => setNoteIndex((i) => Math.max(0, i - 1))} className="text-gray-400 hover:text-gray-600">‹</button>
                    <button onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))} className="text-gray-400 hover:text-gray-600">›</button>
                  </>
                )}
              </div>

              {/* Submitted By Card */}
              <div className="mt-3 w-72 rounded border border-orange-300 p-3 text-xs text-dark dark:text-white">
                <p className="mb-1.5 text-center font-semibold">SUBMITTED BY</p>
                <p>Name : {NOTES[noteIndex]?.name}</p>
                <p>Designation : {NOTES[noteIndex]?.designation}</p>
                <p>Date : {NOTES[noteIndex]?.date}</p>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="flex justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowCommentsModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {/* Tabs */}
            <div className="border-b border-stroke px-5 dark:border-dark-3">
              <div className="flex gap-0">
                <button
                  onClick={() => setCommentsTab("approve")}
                  className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    commentsTab === "approve"
                      ? "border-red-400 text-red-400"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
                  Approve
                </button>
                <button
                  onClick={() => setCommentsTab("reject")}
                  className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    commentsTab === "reject"
                      ? "border-red-400 text-red-400"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/></svg>
                  Reject
                </button>
              </div>
            </div>
            {/* Tab Content */}
            <div className="min-h-[80px] p-5">
              {commentsTab === "approve" ? (
                <div>
                  <textarea
                    className="w-full rounded border border-stroke bg-transparent p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    rows={3}
                    placeholder="Enter approval comments..."
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                      Approve
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    className="w-full rounded border border-stroke bg-transparent p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    rows={3}
                    placeholder="Enter rejection reason..."
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="flex justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowCommentsModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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
