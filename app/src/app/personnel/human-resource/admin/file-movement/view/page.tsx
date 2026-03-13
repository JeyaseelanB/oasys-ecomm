"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UploadedDoc {
  id: number;
  name: string;
  type: string;
  fileSizeKB: number;
}

const MOCK_DOCS: UploadedDoc[] = [
  { id: 1, name: "Transfer_Instruction_file.docx", type: "docx", fileSizeKB: 12.0 },
];

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function ViewFileMovementPage() {
  const router = useRouter();
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Approval");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteSlide, setNoteSlide] = useState(0);

  const notes = [
    { content: "Kindly approve the draft letter", createdBy: { name: "BHAVANI S", designation: "SUPERINTENDENT", date: "19-11-2020" }, approvedBy: { name: "2022 KUMARESANR", designation: "SENIOR REGIONAL MANAGER", date: "19-11-2020" } },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View File Movement</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View File Movement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">File Movement</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Department */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">16 - CHENNAI</p></div>
            <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-dark dark:text-white">Regional Office</p></div>
            <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#17a2b8]">CHENNAI</p></div>
            <div><p className="text-xs text-gray-500">Department</p><p className="text-sm font-medium text-[#17a2b8]">ADMIN</p></div>
          </div>

          {/* Row 2: Section, PF Number / Employee Name, File Number, Tapal Reference Number */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Section</p><p className="text-sm font-medium text-[#17a2b8]">Admin</p></div>
            <div><p className="text-xs text-gray-500">PF Number / Employee Name</p><p className="text-sm font-medium text-[#17a2b8]">1492 / GOPAL</p></div>
            <div><p className="text-xs text-gray-500">File Number</p><p className="text-sm font-medium text-[#17a2b8]">FMN271</p></div>
            <div><p className="text-xs text-gray-500">Tapal Reference Number</p><p className="text-sm font-medium text-dark dark:text-white">/</p></div>
          </div>

          {/* Subject & Created Date/By */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div><p className="text-xs text-gray-500">Subject</p><p className="text-sm font-medium text-[#17a2b8]">Administration -Transfer of Thiru.R.Ramesh, Manager Gr-II to E-Shopping - Regarding.</p></div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500">Created Date</p><p className="text-sm font-medium text-[#17a2b8]">19-Nov-2020</p></div>
              <div><p className="text-xs text-gray-500">Created By</p><p className="text-sm font-medium text-dark dark:text-white">3556</p></div>
            </div>
          </div>

          {/* Context */}
          <div className="mb-6">
            <p className="mb-1 text-xs text-gray-500">Context</p>
            <div className="rounded border border-stroke bg-gray-50 p-3 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
              As instructed, the draft letter addressed to the Senior Regional Manager, Regional Office, Chennai instructing to transfer Thiru.R.Ramesh, Manager Gr-II to E-Shopping immediately to attend photoshoot and all photography related work in E-Shopping put up may please be approved.
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Uploaded Documents */}
          <div className="mt-5 mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Uploaded Documents</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Type</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">File Size( in KB)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DOCS.map((doc, idx) => (
                    <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{doc.name}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{doc.type}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{doc.fileSizeKB}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <div className="flex items-center justify-center gap-2">
                          <button className="rounded bg-[#17a2b8] px-3 py-1 text-xs font-medium text-white hover:opacity-90">Download</button>
                          <button className="rounded bg-[#17a2b8] px-3 py-1 text-xs font-medium text-white hover:opacity-90">Upload</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
              <p className="mt-1 text-xs text-gray-400">(Please Type PF Number (or) Name (or) Designation)</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Approval">Approval</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                View Note
              </button>
              <button className="flex items-center justify-center rounded bg-[#17a2b8] p-2 text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                Reject
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
                Approve
              </button>
              <button onClick={() => router.push("/personnel/human-resource/admin/file-movement/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
                Back
              </button>
            </div>
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
              {/* Note Content */}
              <div className="mb-4 min-h-[120px] rounded border border-stroke bg-gray-50 p-4 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {notes[noteSlide]?.content}
              </div>

              {/* Slide Indicators */}
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

              {/* Created By / Approved By */}
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
