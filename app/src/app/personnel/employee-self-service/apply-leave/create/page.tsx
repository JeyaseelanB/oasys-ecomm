"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const LEAVE_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "casual_leave", label: "Casual Leave" },
  { value: "medical_leave", label: "Medical Leave" },
  { value: "earned_leave", label: "Earned Leave" },
  { value: "maternity_leave", label: "Maternity Leave" },
];

const TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "full_day", label: "Full Day" },
  { value: "half_day", label: "Half Day" },
];

const SESSION_OPTIONS = [
  { value: "", label: "Select" },
  { value: "forenoon", label: "Forenoon" },
  { value: "afternoon", label: "Afternoon" },
];

const FORWARD_FOR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "approval", label: "Approval" },
  { value: "recommendation", label: "Recommendation" },
  { value: "review", label: "Review" },
];

const ListIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const HashIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EditIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ForwardIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
);

export default function ApplyLeaveCreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    leaveType: "",
    leaveBalance: "",
    fromDate: "",
    toDate: "",
    totalDays: "",
    type: "",
    session: "",
    reason: "",
    forwardTo1: "",
    forwardFor1: "",
    forwardTo2: "",
    forwardFor2: "",
  });

  const [documents, setDocuments] = useState<{ file: File | null; name: string }[]>([
    { file: null, name: "No file chosen" },
    { file: null, name: "No file chosen" },
  ]);

  const fileRef1 = useRef<HTMLInputElement>(null);
  const fileRef2 = useRef<HTMLInputElement>(null);

  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDocuments((docs) => docs.map((d, i) => i === index ? { file, name: file?.name || "No file chosen" } : d));
  };

  const todayFormatted = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Leave Request
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Leave Request</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">Leave Request</h3>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Row 1: Leave Type, Leave Balance, empty, empty */}
        <div className="mb-5 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Leave Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ListIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.leaveType} onChange={(e) => handleChange("leaveType", e.target.value)}>
                {LEAVE_TYPE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Leave Balance</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <HashIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.leaveBalance} readOnly />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">&nbsp;</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <HashIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" readOnly />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">&nbsp;</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <HashIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" readOnly />
            </div>
          </div>
        </div>

        {/* Row 2: From Date, To Date, Total No. of days, Type */}
        <div className="mb-5 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              From Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
              <input type="text" placeholder="DD-MM-YYYY" className="w-full bg-transparent px-3 py-2 text-sm outline-none dark:text-white" value={form.fromDate} onChange={(e) => handleChange("fromDate", e.target.value)} />
              <button className="bg-[#00bcd4] px-3 py-2"><CalendarIcon /></button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              To Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
              <input type="text" placeholder="DD-MM-YYYY" className="w-full bg-transparent px-3 py-2 text-sm outline-none dark:text-white" value={form.toDate} onChange={(e) => handleChange("toDate", e.target.value)} />
              <button className="bg-[#00bcd4] px-3 py-2"><CalendarIcon /></button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Total No. of days <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 overflow-hidden rounded border border-stroke dark:border-dark-3">
              <button className="bg-[#00bcd4] px-3 py-2"><CalendarIcon /></button>
              <input type="text" className="w-full bg-transparent px-3 py-2 text-sm outline-none dark:text-white" value={form.totalDays} onChange={(e) => handleChange("totalDays", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Type</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <EditIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.type} onChange={(e) => handleChange("type", e.target.value)}>
                {TYPE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 3: Session */}
        <div className="mb-5 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Session</label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <EditIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.session} onChange={(e) => handleChange("session", e.target.value)}>
                {SESSION_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 4: Reason + Supporting Documents */}
        <div className="mb-5 grid grid-cols-2 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              className="h-[120px] w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              value={form.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Supporting Documents</label>
            {/* Upload 1 */}
            <div className="mb-4 rounded border border-stroke p-4 dark:border-dark-3">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Upload Documents</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded border border-stroke px-3 py-2 text-sm text-gray-500 dark:border-dark-3">
                  {documents[0].name}
                </div>
                <input type="file" ref={fileRef1} className="hidden" accept=".pdf,.doc,.docx,.xlsx,.jpg,.png" onChange={(e) => handleFileChange(0, e)} />
                <button onClick={() => fileRef1.current?.click()} className="rounded bg-[#00bcd4] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  Uploads
                </button>
              </div>
              <p className="mt-1 text-xs text-[#00bcd4]">File format: PDF,DOC,DOCX,XLSX,JPG and PNG File size should be less than 100KB</p>
            </div>
            {/* Upload 2 */}
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Upload Documents</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded border border-stroke px-3 py-2 text-sm text-gray-500 dark:border-dark-3">
                  {documents[1].name}
                </div>
                <input type="file" ref={fileRef2} className="hidden" accept=".pdf,.doc,.docx,.xlsx,.jpg,.png" onChange={(e) => handleFileChange(1, e)} />
                <button onClick={() => fileRef2.current?.click()} className="rounded bg-[#00bcd4] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  Uploads
                </button>
              </div>
              <p className="mt-1 text-xs text-[#00bcd4]">File format: PDF,DOC,DOCX,XLSX,JPG and PNG File size should be less than 100KB</p>
            </div>
          </div>
        </div>

        {/* Row 5: Forward to + Forward for (1st level) */}
        <div className="mb-5 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward to <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.forwardTo1} onChange={(e) => handleChange("forwardTo1", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward for <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.forwardFor1} onChange={(e) => handleChange("forwardFor1", e.target.value)}>
                {FORWARD_FOR_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 6: Forward to + Forward for (2nd level) */}
        <div className="mb-5 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward to <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.forwardTo2} onChange={(e) => handleChange("forwardTo2", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward for <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.forwardFor2} onChange={(e) => handleChange("forwardFor2", e.target.value)}>
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
            onClick={() => router.push("/personnel/employee-self-service/apply-leave/list")}
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
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#00bcd4] px-5 py-3">
              <h3 className="text-base font-semibold text-white">Create Note</h3>
              <button
                onClick={() => { setShowCreateNote(false); setNoteContent(""); }}
                className="text-xl font-bold text-white hover:opacity-80"
              >
                X
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 py-4">
              {/* Toolbar */}
              <div className="mb-0 flex flex-wrap items-center gap-1 rounded-t border border-gray-300 bg-[#f4f4f4] px-2 py-1.5">
                {/* Undo / Redo */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Undo">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 10h10a5 5 0 015 5v2" /><polyline points="3,10 7,6" /><polyline points="3,10 7,14" /></svg>
                </button>
                <button className="rounded p-1.5 hover:bg-gray-200" title="Redo">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10H11a5 5 0 00-5 5v2" /><polyline points="21,10 17,6" /><polyline points="21,10 17,14" /></svg>
                </button>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                {/* Paragraph dropdown */}
                <select className="rounded border border-gray-300 bg-white px-2 py-1 text-xs">
                  <option>Paragraph</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                  <option>Heading 3</option>
                </select>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                {/* Bold */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Bold">
                  <span className="text-sm font-bold text-gray-600">B</span>
                </button>
                {/* Italic */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Italic">
                  <span className="text-sm italic text-gray-600">I</span>
                </button>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                {/* Link */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Link">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                </button>
                {/* Image */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Image">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>
                </button>
                {/* Table */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Table">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
                </button>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                {/* Blockquote */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Blockquote">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 17h3l2-4V7H5v6h3" /><path d="M15 17h3l2-4V7h-6v6h3" /></svg>
                </button>
                {/* Media */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Media">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" /></svg>
                </button>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                {/* List buttons */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Unordered List">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                </button>
                <button className="rounded p-1.5 hover:bg-gray-200" title="Ordered List">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><text x="3" y="7" fontSize="6" fill="currentColor" stroke="none">1</text><text x="3" y="13" fontSize="6" fill="currentColor" stroke="none">2</text><text x="3" y="19" fontSize="6" fill="currentColor" stroke="none">3</text></svg>
                </button>
                <span className="mx-1 h-5 w-px bg-gray-300" />
                {/* Alignment */}
                <button className="rounded p-1.5 hover:bg-gray-200" title="Align Left">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" /></svg>
                </button>
                <button className="rounded p-1.5 hover:bg-gray-200" title="Align Center">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="10" x2="6" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="18" y1="18" x2="6" y2="18" /></svg>
                </button>
                <button className="rounded p-1.5 hover:bg-gray-200" title="Align Right">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="21" y1="10" x2="7" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="7" y2="18" /></svg>
                </button>
              </div>

              {/* Text Area */}
              <textarea
                className="mb-4 h-[200px] w-full rounded-b border border-t-0 border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-primary"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />

              {/* Created By Info */}
              <div className="mb-4 inline-block rounded border border-gray-300 px-4 py-3">
                <p className="mb-1 text-center text-sm text-gray-500">Created by</p>
                <p className="text-sm font-semibold text-dark">Name : SANKARANARAYANAN</p>
                <p className="text-sm text-gray-500">Designation :SUPERINTENDENT</p>
                <p className="text-sm text-gray-500">Date: {todayFormatted}</p>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => { setShowCreateNote(false); setNoteContent(""); }}
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
          </div>
        </div>
      )}
    </div>
  );
}
