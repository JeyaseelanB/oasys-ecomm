"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FORWARD_FOR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "approval", label: "Approval" },
  { value: "final_approval", label: "Final Approval" },
  { value: "recommendation", label: "Recommendation" },
];

const RupeeIcon = () => (
  <span className="text-sm font-medium text-gray-400">&#8377;</span>
);

const CalendarIconBtn = () => (
  <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ForwardIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M15 10l5 5-5 5" /><path d="M4 4v7a4 4 0 004 4h12" />
  </svg>
);

export default function VoluntaryProvidentFundRequestCreatePage() {
  const router = useRouter();

  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const [form, setForm] = useState({
    requestedAmount: "",
    effectiveDate: "",
    forwardTo: "",
    forwardFor: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const todayFormatted = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Voluntary Provident Fund Request
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Voluntary Provident Fund Request</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 flex items-center justify-between rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">Voluntary Provident Fund Request</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">(<span className="text-red-200">*</span> Mandatory Fields)</span>
          <span className="text-white">&#8212;</span>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Row 1: Employee Name, Requested Amount, Effective Date */}
        <div className="mb-5 grid grid-cols-3 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Employee Name</label>
            <p className="text-sm font-medium text-primary">SANKARANARAYANAN C</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Requested Amount <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <RupeeIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.requestedAmount} onChange={(e) => handleChange("requestedAmount", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Effective Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
              <input type="text" placeholder="dd-MMM-yyyy" className="w-full bg-transparent px-3 py-2 text-sm outline-none dark:text-white" value={form.effectiveDate} onChange={(e) => handleChange("effectiveDate", e.target.value)} />
              <button className="bg-[#00bcd4] px-3 py-2"><CalendarIconBtn /></button>
            </div>
          </div>
        </div>

        {/* Row 2: Forward To, Forward For */}
        <div className="mb-5 grid grid-cols-3 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward To <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.forwardTo} onChange={(e) => handleChange("forwardTo", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward For <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.forwardFor} onChange={(e) => handleChange("forwardFor", e.target.value)}>
                {FORWARD_FOR_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* Create Note Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreateNote(true)}
            className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Note
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => router.push("/personnel/employee-self-service/voluntary-provident-fund-request/list")}
            className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cancel
          </button>
          <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="20,6 9,17 4,12" />
            </svg>
            Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showCreateNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[700px] rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between rounded-t-lg bg-[#00bcd4] px-5 py-3">
              <h3 className="text-base font-semibold text-white">Create Note</h3>
              <button onClick={() => { setShowCreateNote(false); setNoteContent(""); }} className="text-xl font-bold text-white hover:opacity-80">X</button>
            </div>
            <div className="px-5 py-4">
              {/* Toolbar */}
              <div className="mb-0 flex flex-wrap items-center gap-1 rounded-t border border-gray-300 bg-[#f4f4f4] px-2 py-1.5">
                <button className="rounded p-1.5 hover:bg-gray-200" title="Undo">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 10h10a5 5 0 015 5v2" /><polyline points="3,10 7,6" /><polyline points="3,10 7,14" /></svg>
                </button>
                <button className="rounded p-1.5 hover:bg-gray-200" title="Redo">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10H11a5 5 0 00-5 5v2" /><polyline points="21,10 17,6" /><polyline points="21,10 17,14" /></svg>
                </button>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                <select className="rounded border border-gray-300 bg-white px-2 py-1 text-xs"><option>Paragraph</option><option>Heading 1</option><option>Heading 2</option></select>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                <button className="rounded p-1.5 hover:bg-gray-200"><span className="text-sm font-bold text-gray-600">B</span></button>
                <button className="rounded p-1.5 hover:bg-gray-200"><span className="text-sm italic text-gray-600">I</span></button>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                <button className="rounded p-1.5 hover:bg-gray-200">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                </button>
                <button className="rounded p-1.5 hover:bg-gray-200">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>
                </button>
                <button className="rounded p-1.5 hover:bg-gray-200">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
                </button>
              </div>
              <textarea className="mb-4 h-[200px] w-full rounded-b border border-t-0 border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-primary" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
              <div className="mb-4 inline-block rounded border border-gray-300 px-4 py-3">
                <p className="mb-1 text-center text-sm text-gray-500">Created by</p>
                <p className="text-sm font-semibold text-dark">Name : SANKARANARAYANAN</p>
                <p className="text-sm text-gray-500">Designation :SUPERINTENDENT</p>
                <p className="text-sm text-gray-500">Date: {todayFormatted}</p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => { setShowCreateNote(false); setNoteContent(""); }} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Cancel
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12" /></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
