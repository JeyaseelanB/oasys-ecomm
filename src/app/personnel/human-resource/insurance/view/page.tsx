"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewInsurancePage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteSlide, setNoteSlide] = useState(0);

  const notes = [
    {
      content: "Kindly approve the insurance",
      cards: [
        { title: "Final Approved By", name: "252 / SANKARANARAYANAN C", designation: "SUPERINTENDENT", date: "12-08-2024" },
      ],
    },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Insurance</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Insurance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Current Statistics</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Department */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">HEAD OFFICE</p></div>
            <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#17a2b8]">Head Office</p></div>
            <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#17a2b8]">HEAD OFFICE</p></div>
            <div><p className="text-xs text-gray-500">Department</p><p className="text-sm font-medium text-[#17a2b8]">TECHNICAL</p></div>
          </div>

          {/* Row 2: Employee Code / Name, Insurance Type, Start Month - Year, Maturity Month - Year */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Employee Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">165 / MANGALAM</p></div>
            <div><p className="text-xs text-gray-500">Insurance Type</p><p className="text-sm font-medium text-[#17a2b8]">LIC 1(CUD)</p></div>
            <div><p className="text-xs text-gray-500">Start Month - Year</p><p className="text-sm font-medium text-[#17a2b8]">4 - 2024</p></div>
            <div><p className="text-xs text-gray-500">Maturity Month - Year</p><p className="text-sm font-medium text-[#17a2b8]">Mar - 2028</p></div>
          </div>

          {/* Row 3: Insured Amount, Insurance Premium Amount Per Year */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Insured Amount</p><p className="text-sm font-medium text-[#17a2b8]">&#8377; 200,000.00</p></div>
            <div><p className="text-xs text-gray-500">Insurance Premium Amount Per Year</p><p className="text-sm font-medium text-[#17a2b8]">&#8377; 10.00</p></div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/personnel/human-resource/insurance/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
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

              {/* Note Card - red top border line */}
              <div className="mb-4">
                <div className="border-t-2 border-[#dc3545]"></div>
                <div className="rounded-b border border-t-0 border-stroke p-4 dark:border-dark-3">
                  <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">{notes[noteSlide]?.cards[0]?.title}</p>
                  <p className="text-xs text-dark dark:text-white">Name : <span className="font-semibold">{notes[noteSlide]?.cards[0]?.name}</span></p>
                  <p className="text-xs text-dark dark:text-white">Designation : <span className="font-semibold text-[#17a2b8]">{notes[noteSlide]?.cards[0]?.designation}</span></p>
                  <p className="text-xs text-dark dark:text-white">Date : <span className="font-semibold">{notes[noteSlide]?.cards[0]?.date}</span></p>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
