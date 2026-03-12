"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STEPS = [
  "Receive Requisition Letter",
  "Supporting Document Collection",
  "Field Verification",
  "Head Office Approval",
  "Board Approval",
  "Society Code Allotment",
];

interface NoteEntry {
  id: number;
  text: string;
  name: string;
  designation: string;
  date: string;
}

// Pre-filled data from the rejected record
const REJECTED_RECORD = {
  loomType: "HANDLOOM",
  societyName: "New Handloom",
  societyNameTamil: "New Handloom",
  societyRegistrationNumber: "9287363",
  societyRegistrationDate: "07-Aug-2024",
  societyProductionStartDate: "07-Aug-2024",
  societyResolutionDate: "07-Aug-2024",
  societyResolutionNumber: "132424",
  recommendationLetterReceivedFrom: "Society",
  adhtOfficeCode: "01 / KPM",
  recommendedBy: "Alok",
  recommendedDate: "07-Aug-2024",
  attachmentPath: "/1723013827567_sample.pdf",
  dpCodeName: "6074 / D&P Office Vellore",
  dpManagerName: "",
  forwardTo: "",
  forwardFor: "Final Approval",
};

export default function RequestForSocietyEnrollmentEditPage() {
  const router = useRouter();

  const [form, setForm] = useState({ ...REJECTED_RECORD });
  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Notes modal
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<NoteEntry[]>([]);

  const today = new Date()
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ /g, "-");

  const handleNoteSubmit = () => {
    if (!noteText.trim()) return;
    setNotes((n) => [
      ...n,
      { id: Date.now(), text: noteText, name: "SANKARANARAYANAN", designation: "SUPERINTENDENT", date: today },
    ]);
    setShowNoteModal(false);
    setNoteText("");
  };

  const handleUpdate = () => {
    const errs: Record<string, string> = {};
    if (!form.loomType) errs.loomType = "Loom type is required";
    if (!form.societyName) errs.societyName = "Society name is required";
    if (!form.societyNameTamil) errs.societyNameTamil = "Society name (Tamil) is required";
    if (!form.societyRegistrationNumber) errs.societyRegistrationNumber = "Registration number is required";
    if (!form.societyRegistrationDate) errs.societyRegistrationDate = "Registration date is required";
    if (!form.recommendationLetterReceivedFrom) errs.recommendationLetterReceivedFrom = "This field is required";
    if (!form.adhtOfficeCode) errs.adhtOfficeCode = "ADHT office code is required";
    if (!form.recommendedBy) errs.recommendedBy = "Recommended by is required";
    if (!form.recommendedDate) errs.recommendedDate = "Recommended date is required";
    if (!form.dpCodeName) errs.dpCodeName = "D&P code is required";
    if (!form.forwardFor) errs.forwardFor = "Forward for is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    router.push("/weavers/society-enrollment/request-for-society-enrollment/list");
  };

  const inputCls =
    "w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white";
  const selectCls =
    "w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const labelCls = "mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300";
  const icoBox =
    "flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 text-gray-500 dark:border-dark-3 dark:bg-dark-2";
  const errCls = "mt-1 text-xs text-red-500";

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Edit Request for Society Enrollment
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Request for Society Enrollment</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const active = i === 0;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && <div className="h-0.5 flex-1 bg-gray-200 dark:bg-dark-3" />}
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      active
                        ? "border-orange-400 bg-white text-orange-400"
                        : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                    }`}>
                      {i + 1}
                    </div>
                    {i < STEPS.length - 1 && <div className="h-0.5 flex-1 bg-gray-200 dark:bg-dark-3" />}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "font-bold text-dark dark:text-white" : "text-gray-400"}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Receive Requisition Letter</span>
          <span className="text-xs text-white opacity-90">* Mandatory Fields</span>
        </div>

        {/* Form Body */}
        <div className="p-5">

          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Loom Type */}
            <div>
              <label className={labelCls}>Loom Type <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </span>
                <select className={selectCls} value={form.loomType} onChange={(e) => set("loomType", e.target.value)}>
                  <option value="">Select</option>
                  <option value="HANDLOOM">HANDLOOM</option>
                  <option value="POWERLOOM">POWERLOOM</option>
                </select>
              </div>
              {errors.loomType && <p className={errCls}>{errors.loomType}</p>}
            </div>

            {/* Society Name */}
            <div>
              <label className={labelCls}>Society Name <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                </span>
                <input type="text" className={inputCls} value={form.societyName} onChange={(e) => set("societyName", e.target.value)} />
              </div>
              {errors.societyName && <p className={errCls}>{errors.societyName}</p>}
            </div>

            {/* Society Name (Tamil) */}
            <div>
              <label className={labelCls}>Society Name (In Tamil) <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                </span>
                <input type="text" className={inputCls} value={form.societyNameTamil} onChange={(e) => set("societyNameTamil", e.target.value)} />
              </div>
              {errors.societyNameTamil && <p className={errCls}>{errors.societyNameTamil}</p>}
            </div>

            {/* Society Registration Number */}
            <div>
              <label className={labelCls}>Society Registration Number <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>#</span>
                <input type="text" className={inputCls} value={form.societyRegistrationNumber} onChange={(e) => set("societyRegistrationNumber", e.target.value)} />
              </div>
              {errors.societyRegistrationNumber && <p className={errCls}>{errors.societyRegistrationNumber}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Society Registration Date */}
            <div>
              <label className={labelCls}>Society Registration Date <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <input type="text" className={inputCls} value={form.societyRegistrationDate} onChange={(e) => set("societyRegistrationDate", e.target.value)} />
                <span className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
              {errors.societyRegistrationDate && <p className={errCls}>{errors.societyRegistrationDate}</p>}
            </div>

            {/* Society Production Start Date */}
            <div>
              <label className={labelCls}>Society Production Start Date <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <input type="text" className={inputCls} value={form.societyProductionStartDate} onChange={(e) => set("societyProductionStartDate", e.target.value)} />
                <span className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
            </div>

            {/* Society Resolution Date */}
            <div>
              <label className={labelCls}>Society Resolution Date <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <input type="text" className={inputCls} value={form.societyResolutionDate} onChange={(e) => set("societyResolutionDate", e.target.value)} />
                <span className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
            </div>

            {/* Society Resolution Number */}
            <div>
              <label className={labelCls}>Society Resolution Number <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>#</span>
                <input type="text" className={inputCls} value={form.societyResolutionNumber} onChange={(e) => set("societyResolutionNumber", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Recommendation Letter Received From */}
            <div>
              <label className={labelCls}>Recommendation Letter Received From <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                </span>
                <select className={selectCls} value={form.recommendationLetterReceivedFrom} onChange={(e) => set("recommendationLetterReceivedFrom", e.target.value)}>
                  <option value="">Select</option>
                  <option value="ADHT">ADHT</option>
                  <option value="DHT">DHT</option>
                  <option value="Society">Society</option>
                </select>
              </div>
              {errors.recommendationLetterReceivedFrom && <p className={errCls}>{errors.recommendationLetterReceivedFrom}</p>}
            </div>

            {/* ADHT Office Code / Name */}
            <div>
              <label className={labelCls}>ADHT Office Code / Name <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>#</span>
                <select className={selectCls} value={form.adhtOfficeCode} onChange={(e) => set("adhtOfficeCode", e.target.value)}>
                  <option value="">Select</option>
                  <option value="01 / KPM">01 / KPM</option>
                  <option value="03 / MADURAI">03 / MADURAI</option>
                  <option value="05 / SALEM">05 / SALEM</option>
                  <option value="07 / COIMBATORE">07 / COIMBATORE</option>
                  <option value="09 / ERODE">09 / ERODE</option>
                </select>
              </div>
              {errors.adhtOfficeCode && <p className={errCls}>{errors.adhtOfficeCode}</p>}
            </div>

            {/* Recommended by */}
            <div>
              <label className={labelCls}>Recommended by <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input type="text" className={inputCls} value={form.recommendedBy} onChange={(e) => set("recommendedBy", e.target.value)} />
              </div>
              {errors.recommendedBy && <p className={errCls}>{errors.recommendedBy}</p>}
            </div>

            {/* Recommended Date */}
            <div>
              <label className={labelCls}>Recommended Date <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <input type="text" className={inputCls} value={form.recommendedDate} onChange={(e) => set("recommendedDate", e.target.value)} />
                <span className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
              {errors.recommendedDate && <p className={errCls}>{errors.recommendedDate}</p>}
            </div>
          </div>

          {/* Attachments + D&P Office Details */}
          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Attachments */}
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
                  <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
                </svg>
                Attachments
              </h4>
              <div>
                <label className={labelCls}>Recommendation Letter Attachments <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className={`${inputCls} flex-1`}
                    value={form.attachmentPath}
                    readOnly
                    placeholder="No file chosen"
                  />
                  <button className="flex shrink-0 items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                    Upload
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-gray-400">File format:pdf,doc,xlsx. File size should be less than 5 MB</p>
              </div>
            </div>

            {/* D&P Office Details */}
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
                  <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
                </svg>
                D&amp;P Office Details
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>D&amp;P Code / Name <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-1">
                    <span className={icoBox}>#</span>
                    <select className={selectCls} value={form.dpCodeName} onChange={(e) => set("dpCodeName", e.target.value)}>
                      <option value="">Select</option>
                      <option value="6074 / D&P Office Vellore">6074 / D&P Office Vellore</option>
                      <option value="1301 / D&P OFFICE ERODE">1301 / D&P OFFICE ERODE</option>
                      <option value="1302 / D&P OFFICE SALEM">1302 / D&P OFFICE SALEM</option>
                      <option value="1303 / D&P OFFICE MADURAI">1303 / D&P OFFICE MADURAI</option>
                    </select>
                  </div>
                  {errors.dpCodeName && <p className={errCls}>{errors.dpCodeName}</p>}
                </div>
                <div>
                  <label className={labelCls}>D&amp;P Manager Name</label>
                  <div className="flex items-center gap-1">
                    <span className={icoBox}>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input type="text" className={inputCls} value={form.dpManagerName} onChange={(e) => set("dpManagerName", e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forward To / For */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Forward To</label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 004 4h12"/></svg>
                </span>
                <input type="text" className={inputCls} value={form.forwardTo} onChange={(e) => set("forwardTo", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Forward For <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-1">
                <span className={icoBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 004 4h12"/></svg>
                </span>
                <select className={selectCls} value={form.forwardFor} onChange={(e) => set("forwardFor", e.target.value)}>
                  <option value="">Select</option>
                  <option value="Final Approval">Final Approval</option>
                  <option value="Approval">Approval</option>
                  <option value="Field Verification">Field Verification</option>
                </select>
              </div>
              {errors.forwardFor && <p className={errCls}>{errors.forwardFor}</p>}
            </div>
          </div>

          {/* Notes list */}
          {notes.length > 0 && (
            <div className="mb-4 space-y-2">
              {notes.map((n) => (
                <div key={n.id} className="rounded border border-stroke p-3 text-sm dark:border-dark-3">
                  <p className="text-dark dark:text-white">{n.text}</p>
                  <div className="mt-2 border-t border-dashed border-stroke pt-2 text-xs text-gray-500 dark:border-dark-3">
                    <strong>Created By</strong> — {n.name} | {n.designation} | {n.date}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => { setNoteText(""); setShowNoteModal(true); }}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/weavers/society-enrollment/request-for-society-enrollment/list")}
                className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-1 border-b border-stroke px-4 py-2 text-xs dark:border-dark-3">
              {["Sans Serif", "Normal", "B", "I", "U", "S"].map((t, i) => (
                <span key={i} className="cursor-pointer rounded px-1.5 py-0.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-2">{t}</span>
              ))}
            </div>
            <div className="p-4">
              <textarea
                className="h-32 w-full rounded border border-stroke bg-transparent p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                placeholder="Enter text ..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="mt-3 w-64 rounded border border-orange-300 p-3 text-xs text-dark dark:text-white">
                <p className="mb-1.5 text-center font-semibold">Created By</p>
                <p>Name : SANKARANARAYANAN</p>
                <p>Designation : SUPERINTENDENT</p>
                <p>Date : {today}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={handleNoteSubmit} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
