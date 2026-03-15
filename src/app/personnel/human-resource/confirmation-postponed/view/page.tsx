"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EmpViewItem {
  id: number;
  empCode: string;
  empName: string;
  designation: string;
  type: string;
  dateOfJoining: string;
  actualDate: string;
  postponedDate: string;
  reason: string;
}

interface NoteEntry {
  id: number;
  html: string;
}

const VIEW_DATA = {
  type:       "Increment",
  hoRo:       "CHENNAI",
  entityType: "Showroom",
  entity:     "HEAD OFFICE",
};

const LINE_ITEMS: EmpViewItem[] = [
  {
    id: 1, empCode: "540", empName: "SANGEETHA K",
    designation: "ASSISTANT SALES WOMEN", type: "Increment",
    dateOfJoining: "30-Dec-2016", actualDate: "", postponedDate: "13-Feb-2008", reason: "",
  },
];

const NOTES: NoteEntry[] = [
  { id: 1, html: "test" },
];

function FieldCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || "\u00A0"}</span>
    </div>
  );
}

export default function ConfirmationPostponedViewPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex,     setNoteIndex]     = useState(0);
  const currentNote = NOTES[noteIndex] ?? NOTES[0];

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Employee Confirmation / Increment / Promotion Postponed
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Employee Confirmation / Increment / Promotion Postponed</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Confirmation / Increment / Promotion Postponed</h3>
        </div>

        <div className="p-6">
          {/* Info Fields */}
          <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <FieldCell label="Type"        value={VIEW_DATA.type} />
            <FieldCell label="HO/RO"       value={VIEW_DATA.hoRo} />
            <FieldCell label="Entity Type" value={VIEW_DATA.entityType} />
            <FieldCell label="Entity"      value={VIEW_DATA.entity} />
          </div>

          {/* Table */}
          <div className="mb-6 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  {["#","Employee Code / Name","Designation","Type","Date of Joining","Actual Date","Postponed Date","Reason"].map((h) => (
                    <th key={h} className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LINE_ITEMS.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-4 pl-3 text-left text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  LINE_ITEMS.map((item, idx) => (
                    <tr key={item.id}
                      className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.empCode} / {item.empName}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.designation}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.type}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.dateOfJoining}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.actualDate}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-[#17a2b8] dark:border-dark-3 whitespace-nowrap">{item.postponedDate}</td>
                      <td className="px-3 py-2 text-dark dark:text-white">{item.reason}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => { setNoteIndex(0); setShowNoteModal(true); }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              View Note
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ── View Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">View Note</h4>
              <button type="button" onClick={() => setShowNoteModal(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note content */}
              <div
                className="min-h-[160px] rounded border border-stroke bg-white p-3 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                dangerouslySetInnerHTML={{ __html: currentNote.html }}
              />

              {/* Navigation */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setNoteIndex((i) => Math.max(0, i - 1))}
                  disabled={noteIndex === 0}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8249;
                </button>
                <button type="button" onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))}
                  disabled={noteIndex === NOTES.length - 1}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8250;
                </button>
              </div>

              {/* Cancel */}
              <div className="mt-4 flex justify-end">
                <button type="button" onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
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
