"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const STEPS = [
  "Staff Eligibility Statement",
  "Staff Eligibility Statement Approval",
  "Roster Reservation",
  "Roster Reservation Approval",
  "Job Advertisement",
  "Job Advertisement Approval",
];

export default function CreateStaffEligibilityStatementPage() {
  const router = useRouter();
  const basePath = "/personnel/human-resource/recruitment-process/permanent-recruitment/staff-eligibility-statement";
  const [state, setState] = useState("");
  const [entity, setEntity] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [recruitmentForPost, setRecruitmentForPost] = useState("");
  const [recruitmentYear, setRecruitmentYear] = useState("");
  const [remarks, setRemarks] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Approval");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showMandatoryFields, setShowMandatoryFields] = useState(true);

  const noteName = "SANKARANARAYANAN";
  const noteDesignation = "ASSISTANT SALES MAN";
  const noteDate = "13-Mar-2026";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Recruitment Process - Create Staff Eligibility Statement</h2>
          <span className="rounded-full bg-[#17a2b8] px-3 py-0.5 text-xs font-semibold text-white">1 / 26</span>
        </div>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Recruitment Process</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Permanent Recruitment</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Staff Eligibility Statement</li>
          </ol>
        </nav>
      </div>

      {/* Stepper */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={`flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold ${idx === 0 ? "border-[#FFA70B] bg-white text-[#FFA70B]" : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:text-gray-500"}`}>{idx + 1}</div>
                <span className={`mt-1.5 text-center text-[10px] leading-tight ${idx === 0 ? "font-semibold text-dark dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>{step}</span>
              </div>
              {idx < STEPS.length - 1 && <div className="mx-2 mt-[-16px] h-px flex-1 border-t-2 border-dashed border-gray-300 dark:border-dark-3" />}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Staff Eligibility Statement</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white">( <span className="text-red-300">*</span> Mandatory Fields)</span>
            <button onClick={() => setShowMandatoryFields(!showMandatoryFields)} className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Form Fields */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">State <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></IconBox>
                <select value={state} onChange={(e) => setState(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="TAMIL NADU">TAMIL NADU</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select value={entity} onChange={(e) => setEntity(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Department <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="ADMIN">ADMIN</option><option value="TECHNICAL">TECHNICAL</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">(0) Designations Selected</option></select>
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-end gap-3">
            <button className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              Generate
            </button>
          </div>

          {/* Staff Eligibility Statement Table */}
          <div className="mb-3 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Staff Eligibility Statement</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Entity</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">No of Staff Eligible For Other Units</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Staff On Role</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Excess Count</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Shortage Count</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={7} className="py-4 text-center text-sm text-gray-400">No records found.</td></tr>
                <tr className="bg-gray-50 dark:bg-dark-2">
                  <td colSpan={5} className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-2 py-2 text-center font-semibold text-dark dark:border-dark-3 dark:text-white">0</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recruitment For Post / Year */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Recruitment For Post <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={recruitmentForPost} onChange={(e) => setRecruitmentForPost(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option></select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Recruitment year <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                <select value={recruitmentYear} onChange={(e) => setRecruitmentYear(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option value="">Select</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option></select>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remarks</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            <p className="text-xs text-gray-400">Should be maximum 250 characters</p>
          </div>

          {/* Forward To / For */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option><option value="Approval">Approval</option><option value="Final Approval">Final Approval</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
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
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="p-5">
              <div className="mb-1 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="rounded border border-stroke bg-transparent px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option></select>
                <select className="rounded border border-stroke bg-transparent px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option></select>
                <button className="rounded px-1.5 py-0.5 text-sm font-bold hover:bg-gray-200 dark:hover:bg-dark-3">B</button>
                <button className="rounded px-1.5 py-0.5 text-sm italic hover:bg-gray-200 dark:hover:bg-dark-3">I</button>
                <button className="rounded px-1.5 py-0.5 text-sm underline hover:bg-gray-200 dark:hover:bg-dark-3">U</button>
                <button className="rounded px-1.5 py-0.5 text-sm line-through hover:bg-gray-200 dark:hover:bg-dark-3">S</button>
              </div>
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={5} placeholder="Enter text ..." className="mb-4 w-full rounded-b border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded border border-stroke px-8 py-4 text-center dark:border-dark-3">
                  <p className="mb-2 text-sm font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : {noteName}</p>
                  <p className="text-xs text-dark dark:text-white">Designation : {noteDesignation}</p>
                  <p className="text-xs text-dark dark:text-white">Date : {noteDate}</p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel</button>
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
