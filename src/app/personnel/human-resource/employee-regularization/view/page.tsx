"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EmpViewItem {
  id: number;
  empCode: string;
  empName: string;
  dateOfJoining: string;
  dateOfConfirmation: string;
  basicPay: string;
  effectiveFromDate: string;
  remarks: string;
}

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

const LINE_ITEMS: EmpViewItem[] = [
  {
    id: 1, empCode: "625", empName: "VENKATARAJU M",
    dateOfJoining: "13-Sep-2010", dateOfConfirmation: "12-Sep-2011",
    basicPay: "25000.00", effectiveFromDate: "31-Dec-2025", remarks: "",
  },
];

const NOTES: NoteEntry[] = [
  {
    id: 1,
    html: "test",
    cards: [
      { title: "Created By", name: "LAKSHMI PRABHA S", designation: "SENIOR ASSISTANT", date: "31-12-2025" },
    ],
  },
  {
    id: 2,
    html: "vbvb",
    cards: [
      { title: "Created By",       name: "SANKARANARAYANAN C", designation: "SUPERINTENDENT",  date: "24-12-2025" },
      { title: "Final Approved By",name: "LAKSHMI PRABHA S",   designation: "SENIOR ASSISTANT", date: "24-12-2025" },
    ],
  },
];

export default function EmployeeRegularizationViewPage() {
  const router = useRouter();
  const [showNoteModal,    setShowNoteModal]    = useState(false);
  const [noteIndex,        setNoteIndex]        = useState(0);
  const [showComments,     setShowComments]     = useState(false);
  const [commentsTab,      setCommentsTab]      = useState<"approve" | "reject">("approve");
  const [approveComment,   setApproveComment]   = useState("");
  const [rejectComment,    setRejectComment]    = useState("");
  const currentNote = NOTES[noteIndex] ?? NOTES[0];

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Employee Regularization
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Employee Regularization</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Regularization</h3>
        </div>

        <div className="p-6">
          {/* Table */}
          <div className="mb-6 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Employee Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Date of Joining</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Date of Confirmation</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Basic Pay (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold whitespace-nowrap">Effective From Date</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {LINE_ITEMS.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-4 pl-3 text-left text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  LINE_ITEMS.map((item, idx) => (
                    <tr key={item.id}
                      className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.empCode} / {item.empName}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.dateOfJoining}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.dateOfConfirmation}</td>
                      <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.basicPay}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.effectiveFromDate}</td>
                      <td className="px-3 py-2 text-dark dark:text-white">{item.remarks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {/* View Note */}
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
              {/* Comments button */}
              <button
                type="button"
                onClick={() => { setCommentsTab("approve"); setShowComments(true); }}
                className="flex items-center justify-center rounded bg-[#17a2b8] px-3 py-2 text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </button>
            </div>
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
                <span className="size-2 rounded-full bg-[#17b8c8]" />
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

              {/* Note Cards */}
              <div className="mt-4 flex flex-wrap gap-4">
                {currentNote.cards.map((card) => (
                  <div key={card.title} className="rounded border border-gray-200 p-3 dark:border-dark-3" style={{ minWidth: "220px" }}>
                    <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">{card.title}</p>
                    <p className="text-xs text-[#e87c39]">Name : {card.name}</p>
                    <p className="text-xs text-[#e87c39]">Designation : {card.designation}</p>
                    <p className="text-xs text-[#e87c39]">Date : {card.date}</p>
                  </div>
                ))}
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

      {/* ── Comments Modal ── */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">Comments</h4>
              <button type="button" onClick={() => setShowComments(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {/* Tabs */}
              <div className="mb-4 flex border-b border-stroke dark:border-dark-3">
                <button
                  type="button"
                  onClick={() => setCommentsTab("approve")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${commentsTab === "approve" ? "border-b-2 border-[#dc3545] text-dark dark:text-white" : "text-gray-400 hover:text-dark dark:hover:text-white"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                  </svg>
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setCommentsTab("reject")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${commentsTab === "reject" ? "border-b-2 border-[#dc3545] text-dark dark:text-white" : "text-gray-400 hover:text-dark dark:hover:text-white"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
                    <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
                  </svg>
                  Reject
                </button>
              </div>

              {/* Tab content */}
              {commentsTab === "approve" ? (
                <textarea
                  value={approveComment}
                  onChange={(e) => setApproveComment(e.target.value)}
                  rows={4}
                  placeholder="Enter approval comment..."
                  className="w-full rounded border border-stroke bg-white p-3 text-sm text-dark outline-none focus:border-[#17a2b8] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              ) : (
                <textarea
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  rows={4}
                  placeholder="Enter rejection reason..."
                  className="w-full rounded border border-stroke bg-white p-3 text-sm text-dark outline-none focus:border-[#dc3545] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              )}

              {/* Footer */}
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowComments(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowComments(false)}
                  className={`flex items-center gap-1.5 rounded px-5 py-2 text-sm font-medium text-white hover:opacity-90 ${commentsTab === "approve" ? "bg-[#28a745]" : "bg-[#dc3545]"}`}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  {commentsTab === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
