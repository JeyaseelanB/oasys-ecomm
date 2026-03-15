"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </div>
);

export default function CreateInternalExternalTrainingPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [trainingType, setTrainingType] = useState("");
  const [reason, setReason] = useState("");
  const [fileName, setFileName] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteFontSize, setNoteFontSize] = useState("14px");
  const [noteFontFamily, setNoteFontFamily] = useState("Arial");

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Internal / External Training Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Training</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Internal / External Training Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Internal / External Training</h3>
          <span className="text-xs text-white/80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Training Type */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Training Type <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </IconBox>
                <select
                  value={trainingType}
                  onChange={(e) => setTrainingType(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="INTERNAL">INTERNAL</option>
                  <option value="EXTERNAL">EXTERNAL</option>
                </select>
              </div>
            </div>

            {/* Spacer on larger screens */}
            <div className="hidden md:block" />

            {/* Reason */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => { if (e.target.value.length <= 250) setReason(e.target.value); }}
                rows={5}
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters ({250 - reason.length} remaining)</p>
            </div>

            {/* File Upload */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={fileName}
                  placeholder="No file chosen"
                  className="flex-1 rounded border border-stroke px-3 py-2 text-sm text-gray-500 dark:border-dark-3 dark:bg-gray-dark dark:text-gray-400"
                />
                <label className="flex cursor-pointer items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="16,17 12,13 8,17"/><line x1="12" y1="13" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                  </svg>
                  Upload
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-[#17a2b8]">File format: png, jpeg, pdf, doc and file size should be less than 250 KB</p>
            </div>

            {/* Forward To */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Forward to <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
                  </svg>
                </IconBox>
                <input
                  type="text"
                  placeholder="Search employee..."
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>

            {/* Forward For */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Forward for <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/>
                  </svg>
                </IconBox>
                <select className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="approval">Approval</option>
                  <option value="review">Review</option>
                  <option value="info">For Information</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              + Create Note
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/personnel/human-resource/admin/training/internal-external-training/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-xl leading-none text-white hover:opacity-80">×</button>
            </div>
            <div className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-1.5 rounded border border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-700">
                <select value={noteFontFamily} onChange={(e) => setNoteFontFamily(e.target.value)} className="rounded border border-stroke px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Arial</option><option>Times New Roman</option><option>Courier New</option><option>Georgia</option>
                </select>
                <select value={noteFontSize} onChange={(e) => setNoteFontSize(e.target.value)} className="w-16 rounded border border-stroke px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {["10px","12px","14px","16px","18px","20px","24px"].map(s => <option key={s}>{s}</option>)}
                </select>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {["B","I","U","S"].map((t) => (
                  <button key={t} className="min-w-[24px] rounded border border-stroke px-1.5 py-0.5 text-xs font-medium hover:bg-gray-200 dark:border-dark-3 dark:hover:bg-gray-600"
                    style={{ fontWeight: t === "B" ? 700 : undefined, fontStyle: t === "I" ? "italic" : undefined, textDecoration: t === "U" ? "underline" : t === "S" ? "line-through" : undefined }}>
                    {t}
                  </button>
                ))}
              </div>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={6}
                placeholder="Type your note here..."
                style={{ fontFamily: noteFontFamily, fontSize: noteFontSize }}
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
              <div className="mt-3 flex items-center justify-between rounded border border-stroke bg-gray-50 px-4 py-2 dark:border-dark-3 dark:bg-gray-700">
                <button className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400">‹</button>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Created By</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin User</p>
                  <p className="text-xs text-gray-400">{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
                <button className="text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400">›</button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 rounded-b-[10px] border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">Cancel</button>
              <button onClick={() => setShowNoteModal(false)} className="rounded bg-[#2d8f7b] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
