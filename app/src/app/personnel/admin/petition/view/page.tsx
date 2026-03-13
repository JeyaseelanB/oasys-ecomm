"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RECORD = {
  sourceOfPetition:   "POST",
  typeOfPetition:     "RTI",
  petitionNumber:     "PTRN36",
  petitionerType:     "INDIVIDUAL",
  petitionerName:     "MAhesh",
  contactNumber:      "9898989898",
  emailId:            "mahesh12345@gmail.com",
  dateOfPetition:     "01-Jan-2023",
  dateOfReceipt:      "03-Jan-2023",
  priorityOfPetition: "Medium",
  description:        "RTI petition testing",
  hoRo:               "BANGALORE",
  actionDueDate:      "18-Jan-2023",
  uploadFileName:     "test.docx",
  status:             "Closed",
  forwardTo:          "",
  referenceNumber:    "REF-001",
  groupOfPetitions:   "Individual",
};

const NOTE = {
  text:        "",
  name:        "SANKARANARAYANAN",
  designation: "SUPERINTENDENT",
  date:        "11-Mar-2026",
};

const STATUS_OPTIONS = ["Open", "Closed", "Submitted", "Viewed", "Forwarded"];

const ArrowIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
  </svg>
);
const SourceIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
);

export default function ViewPetitionPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [status, setStatus]               = useState(RECORD.status);
  const [forwardTo, setForwardTo]         = useState(RECORD.forwardTo);
  const [remarks, setRemarks]             = useState("");

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Petition</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Petition</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Petition</h3>
        </div>

        <div className="p-5 space-y-1">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Source of Petition"  value={RECORD.sourceOfPetition} />
            <ViewField label="Type of Petition"    value={RECORD.typeOfPetition} />
            <ViewField label="Petition Number"     value={RECORD.petitionNumber} />
            <ViewField label="Petitioner Type"     value={RECORD.petitionerType} />
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Petitioner Name"  value={RECORD.petitionerName} />
            <ViewField label="Contact Number"   value={RECORD.contactNumber} />
            <ViewField label="Email ID"         value={RECORD.emailId} />
            <ViewField label="Date of Petition" value={RECORD.dateOfPetition} />
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <ViewField label="Date of receipt of Petition" value={RECORD.dateOfReceipt} />
            <ViewField label="Priority of Petition"        value={RECORD.priorityOfPetition} />
          </div>

          {/* Description */}
          <div className="py-3">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Description of the petition</p>
            <div className="min-h-[80px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white">
              {RECORD.description}
            </div>
          </div>

          {/* To Details */}
          <div className="border-t border-stroke pt-4 dark:border-dark-3">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-dark dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">To Details</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <ViewField label="HO/RO"           value={RECORD.hoRo} />
                <ViewField label="Action due date"  value={RECORD.actionDueDate} />
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Remarks</p>
                <textarea value={remarks} onChange={e=>setRemarks(e.target.value)} rows={5}
                  className="w-full resize-none rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Bottom row: Upload / Status / Forward To */}
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
            {/* Upload */}
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Upload Documents</p>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={RECORD.uploadFileName}
                  className="w-32 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white" />
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </button>
              </div>
            </div>
            {/* Status */}
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Status <span className="text-red-500">*</span></p>
              <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><SourceIcon /></span>
                <select value={status} onChange={e=>setStatus(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                  {STATUS_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            {/* Forward To */}
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Forward To</p>
              <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><ArrowIcon /></span>
                <input type="text" value={forwardTo} onChange={e=>setForwardTo(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/personnel/admin/petition/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[640px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="mb-1 text-xs text-gray-500">Note</p>
                <div className="min-h-[160px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white">
                  {NOTE.text || ""}
                </div>
              </div>
              {/* Created By Card */}
              <div className="inline-block rounded border border-red-300 p-4 text-sm">
                <p className="mb-2 font-semibold text-dark dark:text-white">
                  <span className="text-red-500">*</span>Created By
                </p>
                <p className="text-dark dark:text-white">Name : {NOTE.name}</p>
                <p className="text-dark dark:text-white">Designation : {NOTE.designation}</p>
                <p className="text-dark dark:text-white">Date : {NOTE.date}</p>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ViewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="pb-4">
      <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="pt-0.5 text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value || "—"}</p>
    </div>
  );
}
