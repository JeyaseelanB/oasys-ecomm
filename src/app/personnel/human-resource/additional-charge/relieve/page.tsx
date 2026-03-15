"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RelieveAdditionalChargePage() {
  const router = useRouter();
  const [relievingDate, setRelievingDate] = useState("");
  const [reason, setReason] = useState("testing");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteSlide, setNoteSlide] = useState(0);

  const notes = [
    {
      content: "",
      cards: [
        { title: "Employee Acceptance Pending Passed By", name: "SANKARANARAYANAN", designation: "SUPERINTENDENT", date: "28-01-2025" },
        { title: "Employee Accepted By", name: "BHAVANI", designation: "e Commerce and Spl Projects", date: "28-01-2025" },
      ],
    },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Relieving From Additional Charge</h2>
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
          <h3 className="text-sm font-semibold text-white">Relieving From Additional Charge</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Department */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">HEAD OFFICE</p></div>
            <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#17a2b8]">Head Office</p></div>
            <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#17a2b8]">HEAD OFFICE</p></div>
            <div><p className="text-xs text-gray-500">Department</p><p className="text-sm font-medium text-[#17a2b8]">ADMIN</p></div>
          </div>

          {/* Row 2: Employee Code / Name, Date */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Employee Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">243/BHAVANI</p></div>
            <div><p className="text-xs text-gray-500">Date</p><p className="text-sm font-medium text-[#17a2b8]">2025-01-28</p></div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Assigning Additional Charge */}
          <div className="mt-5 mb-4">
            <div className="mb-4 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Assigning Additional Charge</h4>
            </div>

            {/* Row 1: Designation, Additional Charge, From Date, Relieving Date */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Designation</p><p className="text-sm font-medium text-[#17a2b8]">MANAGER GRADE - II</p></div>
              <div><p className="text-xs text-gray-500">Additional Charge</p><p className="text-sm font-medium text-[#17a2b8]">DEPUTY GENERAL MANAGER</p></div>
              <div><p className="text-xs text-gray-500">From Date</p><p className="text-sm font-medium text-[#17a2b8]">2025-01-28</p></div>
              <div>
                <p className="text-xs text-gray-500">Relieving Date</p>
                <div className="relative mt-1">
                  <input type="text" placeholder="DD-MM-YYYY" value={relievingDate} onChange={(e) => setRelievingDate(e.target.value)} className="w-full rounded border border-stroke bg-transparent px-3 py-2 pr-10 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#17a2b8]">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Total Number of days, Number of days Present, Number of days Absent */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Total Number of days</p><p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p></div>
              <div><p className="text-xs text-gray-500">Number of days Present</p><p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p></div>
              <div><p className="text-xs text-gray-500">Number of days Absent</p><p className="text-sm font-medium text-dark dark:text-white">&nbsp;</p></div>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <p className="text-xs text-gray-500">Reason</p>
              <p className="text-sm font-medium text-[#17a2b8]">{reason}</p>
            </div>

            {/* Forward To / Forward For */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-1 text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></p>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                  </span>
                  <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></p>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  </span>
                  <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="APPROVAL">Approval</option>
                    <option value="REVIEW">Review</option>
                    <option value="INFORMATION">Information</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/personnel/human-resource/additional-charge/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Rich Text Toolbar */}
              <div className="mb-0 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-dark-2">
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 10h4l3-7 4 14 3-7h4"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 4v1h5l4 14h4l4-14h5V4"/></svg></button>
                <select className="rounded border border-stroke bg-transparent px-2 py-0.5 text-xs outline-none dark:border-dark-3 dark:text-white"><option>Paragraph</option></select>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm font-bold text-gray-600">B</span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm italic text-gray-600">I</span></button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="19.5,7 14.5,0 9.5,7"/><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/></svg></button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg></button>
              </div>

              {/* Textarea */}
              <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} className="mb-4 min-h-[180px] w-full rounded-b border border-stroke bg-transparent p-4 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white" />

              {/* Note Cards */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {notes[noteSlide]?.cards.map((card, idx) => (
                  <div key={idx} className="rounded border border-stroke p-4 dark:border-dark-3">
                    <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">{card.title}</p>
                    <p className="text-xs text-dark dark:text-white">Name: <span className="font-semibold">{card.name}</span></p>
                    <p className="text-xs text-dark dark:text-white">Designation: <span className="font-semibold">{card.designation}</span></p>
                    <p className="text-xs text-dark dark:text-white">Date: <span className="font-semibold">{card.date}</span></p>
                  </div>
                ))}
              </div>

              {/* Previous / Next buttons */}
              <div className="flex items-center justify-between">
                <button onClick={() => setNoteSlide((s) => Math.max(0, s - 1))} disabled={noteSlide === 0} className="rounded bg-[#dc3545] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
                  Previous
                </button>
                <button onClick={() => setNoteSlide((s) => Math.min(notes.length - 1, s + 1))} disabled={noteSlide === notes.length - 1} className="rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
