"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewAdditionalChargePage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteSlide, setNoteSlide] = useState(0);

  const notes = [
    { content: "Kindly approve the additional charge assignment.", createdBy: { name: "ALOK", designation: "CHIEF GENERAL MANAGER", date: "09-01-2025" }, approvedBy: { name: "KUMAR R", designation: "MANAGING DIRECTOR", date: "09-01-2025" } },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Additional Charge</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Additional Charge</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Additional Charge</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Department */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">CHENNAI</p></div>
            <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#17a2b8]">Showroom</p></div>
            <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#17a2b8]">T.NAGAR</p></div>
            <div><p className="text-xs text-gray-500">Department</p><p className="text-sm font-medium text-[#17a2b8]">MARKETING</p></div>
          </div>

          {/* Row 2: Employee Code / Name, Date */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Employee Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">462/KUMAR</p></div>
            <div><p className="text-xs text-gray-500">Date</p><p className="text-sm font-medium text-[#17a2b8]">2025-01-09</p></div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Assigning Additional Charge */}
          <div className="mt-5 mb-4">
            <div className="mb-4 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Assigning Additional Charge</h4>
            </div>

            {/* Row 1: Designation, Additional Charge, From Date, Additional Charge Work Location */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Designation</p><p className="text-sm font-medium text-[#17a2b8]">SALES MANAGER</p></div>
              <div><p className="text-xs text-gray-500">Additional Charge</p><p className="text-sm font-medium text-[#17a2b8]">PRODUCT MANAGER</p></div>
              <div><p className="text-xs text-gray-500">From Date</p><p className="text-sm font-medium text-[#17a2b8]">2025-01-13</p></div>
              <div><p className="text-xs text-gray-500">Additional Charge Work Location</p><p className="text-sm font-medium text-[#17a2b8]">AMBASAMUDRAM</p></div>
            </div>

            {/* Row 2: Relieving Date, Total Number of days, Number of days Present, Number of days Absent */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Relieving Date</p><p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p></div>
              <div><p className="text-xs text-gray-500">Total Number of days</p><p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p></div>
              <div><p className="text-xs text-gray-500">Number of days Present</p><p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p></div>
              <div><p className="text-xs text-gray-500">Number of days Absent</p><p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p></div>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <p className="text-xs text-gray-500">Reason</p>
              <p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p>
            </div>

            {/* Employee take Additional Charge link */}
            <div className="mb-4">
              <a href="#" className="text-sm font-medium text-[#17a2b8] hover:underline">Employee take Additional Charge</a>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View Note
              </button>
              <button className="flex items-center justify-center rounded bg-[#17a2b8] p-2 text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button onClick={() => router.push("/personnel/human-resource/additional-charge/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 min-h-[120px] rounded border border-stroke bg-gray-50 p-4 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {notes[noteSlide]?.content}
              </div>

              <div className="mb-4 flex items-center justify-end gap-2">
                <div className="flex items-center gap-1.5">
                  {notes.map((_, idx) => (
                    <button key={idx} onClick={() => setNoteSlide(idx)} className={`size-2.5 rounded-full ${noteSlide === idx ? "bg-primary" : "bg-gray-300 dark:bg-dark-3"}`} />
                  ))}
                </div>
                <button onClick={() => setNoteSlide((s) => Math.max(0, s - 1))} disabled={noteSlide === 0} className="text-gray-400 hover:text-dark disabled:opacity-30 dark:hover:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                <button onClick={() => setNoteSlide((s) => Math.min(notes.length - 1, s + 1))} disabled={noteSlide === notes.length - 1} className="text-gray-400 hover:text-dark disabled:opacity-30 dark:hover:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-stroke p-4 dark:border-dark-3">
                  <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : {notes[noteSlide]?.createdBy.name}</p>
                  <p className="text-xs text-dark dark:text-white">Designation : {notes[noteSlide]?.createdBy.designation}</p>
                  <p className="text-xs text-dark dark:text-white">Date : {notes[noteSlide]?.createdBy.date}</p>
                </div>
                <div className="rounded border border-[#dc3545] p-4">
                  <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Approved By</p>
                  <p className="text-xs text-dark dark:text-white">Name : {notes[noteSlide]?.approvedBy.name}</p>
                  <p className="text-xs text-dark dark:text-white">Designation : {notes[noteSlide]?.approvedBy.designation}</p>
                  <p className="text-xs text-dark dark:text-white">Date : {notes[noteSlide]?.approvedBy.date}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
