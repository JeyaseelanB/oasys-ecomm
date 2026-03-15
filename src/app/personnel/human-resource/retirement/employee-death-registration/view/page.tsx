"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="border-b border-stroke pb-1 text-sm font-medium text-[#2d8f7b] dark:border-dark-3">{value || "—"}</p>
  </div>
);

interface EDRViewRecord {
  horo: string; entityType: string; entity: string; employeeName: string;
  pfNumber: string; designation: string; dateOfJoining: string; dateOfRetirement: string;
  natureOfDeath: string; dateOfDeath: string; fileName: string;
  noteText: string;
  createdBy: { name: string; designation: string; date: string };
  finalApprovedBy?: { name: string; designation: string; date: string };
}

const VIEW_DATA: Record<number, EDRViewRecord> = {
  1: {
    horo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", employeeName: "NAGARAJAN C",
    pfNumber: "3265", designation: "DEPUTY GENERAL MANAGER CREDIT SALES",
    dateOfJoining: "08-Jul-1993", dateOfRetirement: "30-Jun-2034",
    natureOfDeath: "Covid-19", dateOfDeath: "01-Sep-2024", fileName: "sample.pdf",
    noteText: "Requesting for final approval",
    createdBy: { name: "MATHI S", designation: "ASSISTANT GENERAL MANAGER ADMIN INCHARGE", date: "04-09-2024" },
    finalApprovedBy: { name: "LAVANYA M", designation: "MANAGER GRADE – II", date: "04-09-2024" },
  },
  2: {
    horo: "21/VELLORE", entityType: "Regional Office", entity: "21/VELLORE", employeeName: "SUJATHA V",
    pfNumber: "3560", designation: "REGIONAL MANAGER INCHARGE",
    dateOfJoining: "03-May-2013", dateOfRetirement: "31-Jul-2040",
    natureOfDeath: "Covid-19", dateOfDeath: "02-Sep-2024", fileName: "cooptext-icon.png",
    noteText: "Sending for final approval.",
    createdBy: { name: "SANKARANARAYANAN", designation: "SUPERINTENDENT", date: "13-Mar-2026" },
    finalApprovedBy: undefined,
  },
  3: {
    horo: "21/VELLORE", entityType: "Regional Office", entity: "21/VELLORE", employeeName: "MADHAVI V",
    pfNumber: "1503", designation: "SENIOR OFFICER",
    dateOfJoining: "10-Jun-2000", dateOfRetirement: "30-Jun-2030",
    natureOfDeath: "Natural Death", dateOfDeath: "03-Sep-2024", fileName: "doc_1503.pdf",
    noteText: "",
    createdBy: { name: "RAMESH K", designation: "MANAGER", date: "03-Sep-2024" },
    finalApprovedBy: { name: "KRISHNAN M", designation: "DEPUTY GENERAL MANAGER", date: "05-Sep-2024" },
  },
};

function ViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id") ?? "1");
  const record = VIEW_DATA[id] ?? VIEW_DATA[1];

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex]         = useState(0);

  const notePages = [record.noteText].filter(Boolean);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Employee Death Registration</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Retirement</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Employee Death Registration</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Death Registration</h3>
        </div>

        <div className="p-5">
          {/* Fields grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-4">
            <Field label="HO/RO"              value={record.horo} />
            <Field label="Entity Type"        value={record.entityType} />
            <Field label="Entity"             value={record.entity} />
            <Field label="Employee Name"      value={record.employeeName} />
            <Field label="Provident Fund Number" value={record.pfNumber} />
            <Field label="Designation"        value={record.designation} />
            <Field label="Date of Joining"    value={record.dateOfJoining} />
            <Field label="Date of Retirement" value={record.dateOfRetirement} />
            <Field label="Nature of Death"    value={record.natureOfDeath} />
            <Field label="Date of Death"      value={record.dateOfDeath} />
          </div>

          {/* Uploaded Documents */}
          <div className="mt-5">
            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Uploaded Documents</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 max-w-xs rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {record.fileName}
              </div>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>
                Download
              </button>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-6 flex items-center justify-between">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/personnel/human-resource/retirement/employee-death-registration/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-lg dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-70">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note text display */}
              <div className="min-h-[120px] rounded border border-stroke bg-gray-50 px-4 py-3 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {notePages[noteIndex] || <span className="text-gray-400 italic">No note available.</span>}
              </div>

              {/* Dot pagination + arrows */}
              {notePages.length > 0 && (
                <div className="mt-3 flex justify-end items-center gap-2">
                  {notePages.map((_, i) => (
                    <button key={i} onClick={() => setNoteIndex(i)} className={`size-2.5 rounded-full transition-colors ${i === noteIndex ? "bg-[#2d8f7b]" : "bg-gray-300"}`} />
                  ))}
                  <button onClick={() => setNoteIndex(Math.max(0, noteIndex - 1))} className="flex size-6 items-center justify-center rounded-full border border-stroke bg-gray-100 text-xs text-gray-500 hover:bg-gray-200">‹</button>
                  <button onClick={() => setNoteIndex(Math.min(notePages.length - 1, noteIndex + 1))} className="flex size-6 items-center justify-center rounded-full border border-stroke bg-gray-100 text-xs text-gray-500 hover:bg-gray-200">›</button>
                </div>
              )}

              {/* Workflow cards */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="min-w-[200px] rounded border border-stroke p-4 text-xs text-dark dark:border-dark-3 dark:text-white">
                  <p className="mb-2 text-center font-semibold">Created By</p>
                  <p className="mb-1">Name : <span className="text-[#2d8f7b]">{record.createdBy.name}</span></p>
                  <p className="mb-1">Designation : <span className="text-[#2d8f7b]">{record.createdBy.designation}</span></p>
                  <p>Date : <span className="text-[#2d8f7b]">{record.createdBy.date}</span></p>
                </div>
                {record.finalApprovedBy && (
                  <div className="min-w-[200px] rounded border border-stroke p-4 text-xs text-dark dark:border-dark-3 dark:text-white">
                    <p className="mb-2 text-center font-semibold">Final Approved By</p>
                    <p className="mb-1">Name : <span className="text-[#2d8f7b]">{record.finalApprovedBy.name}</span></p>
                    <p className="mb-1">Designation : <span className="text-[#2d8f7b]">{record.finalApprovedBy.designation}</span></p>
                    <p>Date : <span className="text-[#2d8f7b]">{record.finalApprovedBy.date}</span></p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end border-t border-stroke px-5 py-4 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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

export default function ViewEDRPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
