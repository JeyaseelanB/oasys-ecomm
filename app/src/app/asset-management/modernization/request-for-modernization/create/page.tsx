"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const STEPS = [
  { number: 1, label: "Request For Modernization" },
  { number: 2, label: "Estimation of Modernization" },
  { number: 3, label: "Submission Of Report" },
  { number: 4, label: "Measurement Book Entry" },
];

const HO_RO_OPTIONS = [
  { value: "", label: "Select" },
  { value: "CHENNAI", label: "CHENNAI" },
  { value: "MADURAI", label: "MADURAI" },
  { value: "COIMBATORE", label: "COIMBATORE" },
  { value: "TRICHY", label: "TRICHY" },
  { value: "SALEM", label: "SALEM" },
  { value: "ERODE", label: "ERODE" },
  { value: "VELLORE", label: "VELLORE" },
];

const ENTITY_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "showroom", label: "Showroom" },
  { value: "collection_office", label: "Collection Office" },
  { value: "head_office", label: "Head Office" },
  { value: "warehouse", label: "Warehouse" },
];

const FORWARD_FOR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "modernization", label: "Modernization" },
  { value: "construction", label: "Construction" },
  { value: "supplementary", label: "Supplementary Work" },
];

interface Note {
  id: number;
  text: string;
  createdAt: string;
}

export default function CreateRequestForModernizationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    hoRo: "",
    entityType: "",
    description: "",
    forwardTo: "",
    forwardFor: "",
  });
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.hoRo) newErrors.hoRo = "HO/RO is required";
    if (!form.entityType) newErrors.entityType = "Entity Type is required";
    if (!form.forwardTo) newErrors.forwardTo = "Forward To is required";
    if (!form.forwardFor) newErrors.forwardFor = "Forward For is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // handle submit
      router.push("/asset-management/modernization");
    }
  };

  const handleAddNote = () => {
    if (noteText.trim()) {
      setNotes((prev) => [
        ...prev,
        { id: Date.now(), text: noteText.trim(), createdAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
      ]);
      setNoteText("");
      setShowNoteInput(false);
    }
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Request For Modernization/Construction/Supplementary work
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Modernization</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Request For Modernization/Construction/Supplementary work</li>
          </ol>
        </nav>
      </div>

      {/* Stepper */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white px-6 py-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="relative flex items-start justify-between">
          {/* Connector line */}
          <div className="absolute left-0 right-0 top-[22px] h-px bg-gray-200 dark:bg-dark-3" style={{ zIndex: 0 }} />

          {STEPS.map((step) => {
            const isActive = step.number === 1;
            const isCompleted = step.number < 1;
            return (
              <div key={step.number} className="relative z-10 flex flex-1 flex-col items-center gap-2">
                <div
                  className={`flex size-11 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-[#e87c39] bg-white text-[#e87c39]"
                      : isCompleted
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark dark:text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-center text-xs font-medium leading-tight ${
                    isActive ? "text-dark dark:text-white" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">
            Request For Modernization/ Construction/Supplementary work
          </h3>
          <span className="text-xs text-white opacity-90">* Mandatory Fields</span>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Row 1: HO/RO + Entity Type */}
          <div className="mb-5 flex flex-wrap gap-4">
            {/* HO/RO */}
            <div className="flex min-w-[220px] flex-1 items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </div>
              <div className="flex-1">
                <select
                  value={form.hoRo}
                  onChange={(e) => handleChange("hoRo", e.target.value)}
                  className={`w-full rounded border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${
                    errors.hoRo ? "border-red-400" : "border-stroke dark:border-dark-3"
                  }`}
                >
                  {HO_RO_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.hoRo && <p className="mt-1 text-xs text-red-500">{errors.hoRo}</p>}
              </div>
            </div>

            {/* Entity Type */}
            <div className="flex min-w-[220px] flex-1 items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <div className="flex-1">
                <select
                  value={form.entityType}
                  onChange={(e) => handleChange("entityType", e.target.value)}
                  className={`w-full rounded border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${
                    errors.entityType ? "border-red-400" : "border-stroke dark:border-dark-3"
                  }`}
                >
                  {ENTITY_TYPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.entityType && <p className="mt-1 text-xs text-red-500">{errors.entityType}</p>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-1">
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Description
            </label>
            <textarea
              rows={4}
              maxLength={250}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-400">
              Should be maximum 250 characters
              {form.description.length > 0 && (
                <span className="ml-2 text-gray-500">({form.description.length}/250)</span>
              )}
            </p>
          </div>

          {/* Upload + Forward To + Forward For */}
          <div className="mb-6 mt-4 flex flex-wrap gap-6">
            {/* Upload Document */}
            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Upload Document
              </label>
              <div className="flex items-center gap-0">
                <input
                  type="text"
                  readOnly
                  value={fileName}
                  placeholder=""
                  className="flex-1 rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-r bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="16,16 12,12 8,16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                  </svg>
                  Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xlsx,.png,.jpg,.gif"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                File format:pdf,doc,xlsx,png,jpg,gif. File size should be less than 100 Kb
              </p>
            </div>

            {/* Forward To */}
            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward To <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="9,10 4,15 9,20" />
                    <path d="M20 4v7a4 4 0 01-4 4H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={form.forwardTo}
                    onChange={(e) => handleChange("forwardTo", e.target.value)}
                    className={`w-full rounded border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${
                      errors.forwardTo ? "border-red-400" : "border-stroke dark:border-dark-3"
                    }`}
                  />
                  {errors.forwardTo && <p className="mt-1 text-xs text-red-500">{errors.forwardTo}</p>}
                </div>
              </div>
            </div>

            {/* Forward For */}
            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward For <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="9,10 4,15 9,20" />
                    <path d="M20 4v7a4 4 0 01-4 4H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <select
                    value={form.forwardFor}
                    onChange={(e) => handleChange("forwardFor", e.target.value)}
                    className={`w-full rounded border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${
                      errors.forwardFor ? "border-red-400" : "border-stroke dark:border-dark-3"
                    }`}
                  >
                    {FORWARD_FOR_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {errors.forwardFor && <p className="mt-1 text-xs text-red-500">{errors.forwardFor}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {notes.length > 0 && (
            <div className="mb-4 rounded border border-stroke dark:border-dark-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-dark-2">
                    <th className="border-b border-stroke px-3 py-2 text-left font-semibold text-dark dark:border-dark-3 dark:text-white">#</th>
                    <th className="border-b border-stroke px-3 py-2 text-left font-semibold text-dark dark:border-dark-3 dark:text-white">Note</th>
                    <th className="border-b border-stroke px-3 py-2 text-left font-semibold text-dark dark:border-dark-3 dark:text-white">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note, idx) => (
                    <tr key={note.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"}>
                      <td className="border-b border-stroke px-3 py-2 dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-b border-stroke px-3 py-2 dark:border-dark-3 dark:text-white">{note.text}</td>
                      <td className="border-b border-stroke px-3 py-2 dark:border-dark-3 dark:text-white">{note.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Note Input */}
          {showNoteInput && (
            <div className="mb-4 flex items-start gap-2">
              <textarea
                rows={2}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter note..."
                className="flex-1 rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="rounded bg-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => { setShowNoteInput(false); setNoteText(""); }}
                  className="rounded bg-gray-200 px-3 py-1.5 text-xs font-medium text-dark hover:opacity-90 dark:bg-dark-2 dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowNoteInput(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Note
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/asset-management/modernization")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
