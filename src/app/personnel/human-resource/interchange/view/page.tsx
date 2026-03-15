"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewInterchangePage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteSlide, setNoteSlide] = useState(0);

  const notes = [
    {
      content: "test",
      cards: [
        { title: "", name: "174 / LAVANYA M", designation: "JUNIOR ASSISTANT", date: "07-10-2024" },
        { title: "Final Approved By", name: "261 / USHA M", designation: "JUNIOR ASSISTANT", date: "07-10-2024" },
        { title: "", name: "174 / LAVANYA M", designation: "JUNIOR ASSISTANT", date: "08-10-2024" },
      ],
    },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Interchange</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Interchange</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Interchange</h3>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">SALEM</p></div>
            <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#17a2b8]">Distribution Warehouse</p></div>
            <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#17a2b8]">DWH - SALEM</p></div>
            <div><p className="text-xs text-gray-500">Employee Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">572 / KANNAN</p></div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Current Department</p><p className="text-sm font-medium text-[#17a2b8]">MARKETING</p></div>
            <div><p className="text-xs text-gray-500">Current Designation</p><p className="text-sm font-medium text-[#17a2b8]">MANAGER GRADE – II</p></div>
            <div><p className="text-xs text-gray-500">Interchange Department</p><p className="text-sm font-medium text-[#17a2b8]">ADMIN</p></div>
            <div><p className="text-xs text-gray-500">Interchange Designation</p><p className="text-sm font-medium text-[#17a2b8]">ADDL GENERAL MANAGER PRODUCT AND DEVELOPMENT</p></div>
          </div>

          {/* Row 3 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Created Date</p><p className="text-sm font-medium text-[#17a2b8]">07-Oct-2024</p></div>
            <div>
              <p className="text-xs text-gray-500">Uploaded Documents :</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-dark dark:text-white">credentailas_production_.xls</span>
                <button className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium text-white hover:opacity-90" style={{ backgroundColor: "#17a2b8" }}>
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Interchange Details Section */}
          <div className="mb-4 border-t border-stroke pt-4 dark:border-dark-3">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Interchange Details
            </h4>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">D&P Office Cuddalore</p></div>
              <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#17a2b8]">D & P Office</p></div>
              <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#17a2b8]">D&P Office Cuddalore</p></div>
              <div><p className="text-xs text-gray-500">Relieving Date</p><p className="text-sm font-medium text-[#17a2b8]">03-Jan-2017</p></div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Joining Date</p><p className="text-sm font-medium text-[#17a2b8]">08-Oct-2024</p></div>
              <div><p className="text-xs text-gray-500">Joined On</p><p className="text-sm font-medium text-[#17a2b8]"></p></div>
            </div>
          </div>

          {/* Forward Section */}
          <div className="mb-5 border-t border-stroke pt-4 dark:border-dark-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward To <span className="text-[#dc3545]">*</span></label>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                  <input type="text" readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward For <span className="text-[#dc3545]">*</span></label>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                  </span>
                  <select defaultValue="Approval" className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    <option value="Approval">Approval</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/personnel/human-resource/interchange/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
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
            <div className="flex items-center justify-between rounded-t-lg px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
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

              {/* Note Cards */}
              <div className="mb-4 flex items-start gap-4">
                {notes[noteSlide]?.cards.map((card, idx) => (
                  <div key={idx} className="flex-1">
                    <div className="border-t-2 border-[#E67E22]"></div>
                    <div className="rounded-b border border-t-0 border-stroke p-4 dark:border-dark-3">
                      {card.title && <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">{card.title}</p>}
                      <p className="text-xs text-dark dark:text-white">Name : <span className="font-semibold">{card.name}</span></p>
                      <p className="text-xs text-dark dark:text-white">Designation : <span className="font-semibold text-[#17a2b8]">{card.designation}</span></p>
                      <p className="text-xs text-dark dark:text-white">Date : <span className="font-semibold">{card.date}</span></p>
                    </div>
                  </div>
                ))}
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
