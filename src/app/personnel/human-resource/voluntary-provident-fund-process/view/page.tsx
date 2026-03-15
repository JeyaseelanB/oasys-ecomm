"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NoteCard {
  title: string;
  name: string;
  designation: string;
  date: string;
}

interface NoteEntry {
  id: number;
  html: string;
  cards: NoteCard[];
}

const NOTES: NoteEntry[] = [
  {
    id: 1,
    html: "Please Approve",
    cards: [
      { title: "Created By",       name: "SANKARANARAYANAN C", designation: "SUPERINTENDENT",          date: "18-Sep-2019" },
      { title: "Final Approved By",name: "RAVI A P",           designation: "GENERAL MANAGER (MARKETING)", date: "18-Sep-2019" },
    ],
  },
  {
    id: 2,
    html: "Kindly process the voluntary provident fund contribution as requested.",
    cards: [
      { title: "Created By", name: "HR MANAGER", designation: "MANAGER", date: "20-Sep-2019" },
    ],
  },
];

export default function VPFViewPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex,     setNoteIndex]     = useState(0);

  const currentNote = NOTES[noteIndex] ?? NOTES[0];

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Voluntary Provident Fund Process
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Voluntary Provident Fund Process</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Voluntary Provident Fund Process</h3>
        </div>

        <div className="p-5">
          {/* Info Fields — 4-column grid with label row + value row */}
          <div className="mb-5 grid grid-cols-4 gap-x-6 gap-y-1">
            <p className="text-xs text-gray-500">HO/RO</p>
            <p className="text-xs text-gray-500">Entity Type</p>
            <p className="text-xs text-gray-500">Entity</p>
            <p className="text-xs text-gray-500">Employee Name</p>

            <p className="text-sm font-semibold text-[#17b8c8]">HEAD OFFICE</p>
            <p className="text-sm font-semibold text-[#17b8c8]">Head Office</p>
            <p className="text-sm font-semibold text-[#17b8c8]">HEAD OFFICE</p>
            <p className="text-sm font-semibold text-[#17b8c8]">MADANA SRINIVASULU</p>

            <p className="text-xs text-gray-500 mt-2">Department</p>
            <p className="text-xs text-gray-500 mt-2">Designation</p>
            <p className="text-xs text-gray-500 mt-2">Requested Amount</p>
            <p className="text-xs text-gray-500 mt-2">Effective Date</p>

            <p className="text-sm font-semibold text-[#17b8c8]">TECHNICAL</p>
            <p className="text-sm font-semibold text-[#17b8c8]">AGM(Production)\C</p>
            <p className="text-sm font-semibold text-[#17b8c8]">₹ 2,000.00</p>
            <p className="text-sm font-semibold text-[#17b8c8]">01-Jul-2019</p>
          </div>

          {/* Footer */}
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

      {/* View Note Modal */}
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
                className="min-h-[120px] rounded border border-stroke bg-white p-3 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                dangerouslySetInnerHTML={{ __html: currentNote.html }}
              />

              {/* Navigation */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <span className="size-2 rounded-full bg-[#17b8c8]" />
                <button type="button" onClick={() => setNoteIndex(i => Math.max(0, i - 1))}
                  disabled={noteIndex === 0}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8249;
                </button>
                <button type="button" onClick={() => setNoteIndex(i => Math.min(NOTES.length - 1, i + 1))}
                  disabled={noteIndex === NOTES.length - 1}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8250;
                </button>
              </div>

              {/* Note Cards */}
              <div className="mt-4 flex flex-wrap gap-4">
                {currentNote.cards.map((card) => (
                  <div key={card.title} className="rounded border border-gray-200 p-3 dark:border-dark-3" style={{ minWidth: "220px" }}>
                    <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">{card.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Name : {card.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Designation : {card.designation}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Date : {card.date}</p>
                  </div>
                ))}
              </div>

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
