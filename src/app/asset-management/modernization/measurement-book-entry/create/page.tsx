"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STEPS = [
  { number: 1, label: "Request For Modernization" },
  { number: 2, label: "Estimation of Modernization" },
  { number: 3, label: "Submission Of Report" },
  { number: 4, label: "Measurement Book Entry" },
];

const ACTIVE_STEP = 4;

const HO_RO_OPTIONS = [
  { value: "", label: "Select" },
  { value: "CHENNAI", label: "CHENNAI" },
  { value: "MADURAI", label: "MADURAI" },
  { value: "COIMBATORE", label: "COIMBATORE" },
  { value: "TRICHY", label: "TRICHY" },
  { value: "SALEM", label: "SALEM" },
];

const ENTITY_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "showroom", label: "Showroom" },
  { value: "collection_office", label: "Collection Office" },
  { value: "head_office", label: "Head Office" },
  { value: "warehouse", label: "Warehouse" },
];

const ENTITY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "chennai_co", label: "Collection Office - Chennai" },
  { value: "madurai_sr", label: "MADURAI SHOWROOM" },
  { value: "coimbatore_main", label: "COIMBATORE MAIN" },
];

const BUILDING_OPTIONS = [
  { value: "", label: "Select" },
  { value: "towers", label: "Towers" },
  { value: "cooptex", label: "Co_optex" },
  { value: "periyakulam", label: "Periyakulam" },
];

const WORK_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "modernization", label: "Modernization" },
  { value: "construction", label: "Construction" },
  { value: "supplementary", label: "Supplementary Work" },
];

const SCHEME_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "scheme_a", label: "Scheme A" },
  { value: "scheme_b", label: "Scheme B" },
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

// Toolbar button component for the note editor
const ToolbarBtn = ({ label, title }: { label: string; title?: string }) => (
  <button
    type="button"
    title={title ?? label}
    className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-2"
  >
    {label}
  </button>
);

export default function MeasurementBookEntryCreatePage() {
  const router = useRouter();

  const [sectionOpen, setSectionOpen] = useState(true);
  const [form, setForm] = useState({
    hoRo: "",
    entityType: "",
    entity: "",
    nameOfBuilding: "",
    typeOfWork: "",
    schemeType: "",
    dateOfReport: "",
    phase: "",
    forwardTo: "",
    forwardFor: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteHtml, setNoteHtml] = useState("");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.hoRo)        newErrors.hoRo        = "HO/RO is required";
    if (!form.entityType)  newErrors.entityType  = "Entity Type is required";
    if (!form.entity)      newErrors.entity      = "Entity is required";
    if (!form.forwardFor)  newErrors.forwardFor  = "Forward For is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      router.push("/asset-management/modernization/measurement-book-entry/list");
    }
  };

  const handleSaveNote = () => {
    if (noteHtml.trim()) {
      setNotes((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: noteHtml.trim(),
          createdAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        },
      ]);
      setNoteHtml("");
      setShowNoteModal(false);
    }
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Measurement Book Entry
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Modernization</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Measurement Book Entry</li>
          </ol>
        </nav>
      </div>

      {/* Stepper */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white px-6 py-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="relative flex items-start justify-between">
          <div className="absolute left-0 right-0 top-[22px] h-px bg-gray-200 dark:bg-dark-3" style={{ zIndex: 0 }} />
          {STEPS.map((step) => {
            const isActive    = step.number === ACTIVE_STEP;
            const isCompleted = step.number < ACTIVE_STEP;
            return (
              <div key={step.number} className="relative z-10 flex flex-1 flex-col items-center gap-2">
                <div
                  className={`flex size-11 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-[#e87c39] bg-white text-[#e87c39] dark:bg-gray-dark"
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
                    isActive ? "text-dark dark:text-white" : isCompleted ? "text-gray-500 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"
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
          <h3 className="text-sm font-semibold text-white">Generate for Claim Expo</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white opacity-90">(* Mandatory Fields)</span>
            <button
              type="button"
              onClick={() => setSectionOpen((v) => !v)}
              className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20"
              title={sectionOpen ? "Collapse" : "Expand"}
            >
              <span className="text-base font-bold leading-none">{sectionOpen ? "—" : "+"}</span>
            </button>
          </div>
        </div>

        {sectionOpen && (
          <div className="p-6">
            {/* Row 1: HO/RO, Entity Type, Entity, Name of Building */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* HO/RO */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">HO/RO</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <select
                      value={form.hoRo}
                      onChange={(e) => handleChange("hoRo", e.target.value)}
                      className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.hoRo ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    >
                      {HO_RO_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.hoRo && <p className="mt-1 text-xs text-red-500">{errors.hoRo}</p>}
                  </div>
                </div>
              </div>

              {/* Entity Type */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Entity Type</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <select
                      value={form.entityType}
                      onChange={(e) => handleChange("entityType", e.target.value)}
                      className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.entityType ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    >
                      {ENTITY_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.entityType && <p className="mt-1 text-xs text-red-500">{errors.entityType}</p>}
                  </div>
                </div>
              </div>

              {/* Entity */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Entity</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <select
                      value={form.entity}
                      onChange={(e) => handleChange("entity", e.target.value)}
                      className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.entity ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    >
                      {ENTITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.entity && <p className="mt-1 text-xs text-red-500">{errors.entity}</p>}
                  </div>
                </div>
              </div>

              {/* Name of Building */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Name of Building</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <select
                      value={form.nameOfBuilding}
                      onChange={(e) => handleChange("nameOfBuilding", e.target.value)}
                      className="w-full rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    >
                      {BUILDING_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Type of Work, Scheme Type */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Type of Work */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Type of Work</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </div>
                  <select
                    value={form.typeOfWork}
                    onChange={(e) => handleChange("typeOfWork", e.target.value)}
                    className="flex-1 rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  >
                    {WORK_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Scheme Type */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Scheme Type</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </div>
                  <select
                    value={form.schemeType}
                    onChange={(e) => handleChange("schemeType", e.target.value)}
                    className="flex-1 rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  >
                    {SCHEME_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Date of Report */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Date of Report</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={form.dateOfReport}
                    onChange={(e) => handleChange("dateOfReport", e.target.value)}
                    className="flex-1 rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                </div>
              </div>

              {/* Phase */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Phase</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <span className="text-sm font-bold text-gray-500">#</span>
                  </div>
                  <input
                    type="text"
                    value={form.phase}
                    onChange={(e) => handleChange("phase", e.target.value)}
                    className="flex-1 rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            {/* Measurements Table */}
            <div className="mb-5 overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-xs">
                <thead>
                  {/* Row 1 - Grouped headers */}
                  <tr className="bg-[#2d8f7b] text-white">
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Date of<br />Measurements</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Description<br />of Work</th>
                    <th colSpan={5} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Measurements Upto Date</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Rate<br />(Rs.)</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Unit</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Total Value<br />to Date<br />(Rs.)</th>
                    <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Deduct Previous<br />Measurements</th>
                    <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Since Last<br />Measurements</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Remarks</th>
                  </tr>
                  {/* Row 2 - Sub headers */}
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">No.</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Length<br />(ft)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Breadth<br />(ft)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Depth<br />(ft)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Contents<br />or Area</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Amount<br />(Rs.)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Value<br />(Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={16} className="py-6 text-center text-gray-400">No records found.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Forward To & Forward For */}
            <div className="mb-6 flex flex-wrap gap-6">
              {/* Forward To */}
              <div className="min-w-[220px] flex-1">
                <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                  Forward To
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <polyline points="9,10 4,15 9,20" />
                      <path d="M20 4v7a4 4 0 01-4 4H4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={form.forwardTo}
                    onChange={(e) => handleChange("forwardTo", e.target.value)}
                    className="flex-1 rounded border border-stroke px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
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
                      className={`w-full rounded border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.forwardFor ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    >
                      {FORWARD_FOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.forwardFor && <p className="mt-1 text-xs text-red-500">{errors.forwardFor}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Table */}
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
                        <td className="border-b border-stroke px-3 py-2 dark:border-dark-3 dark:text-white" dangerouslySetInnerHTML={{ __html: note.text }} />
                        <td className="border-b border-stroke px-3 py-2 dark:border-dark-3 dark:text-white">{note.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowNoteModal(true)}
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
                  onClick={() => router.push("/asset-management/modernization/measurement-book-entry/list")}
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
        )}
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17b8c8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button
                type="button"
                onClick={() => { setShowNoteModal(false); setNoteHtml(""); }}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              {/* Toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                {/* Font & Size */}
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Sans Serif</option><option>Serif</option><option>Monospace</option>
                </select>
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Normal</option><option>H1</option><option>H2</option><option>H3</option>
                </select>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="B" title="Bold" />
                <ToolbarBtn label="I" title="Italic" />
                <ToolbarBtn label="U" title="Underline" />
                <ToolbarBtn label="S" title="Strikethrough" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="A" title="Font Color" />
                <ToolbarBtn label="🖊" title="Highlight" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="x₂" title="Subscript" />
                <ToolbarBtn label="x²" title="Superscript" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="H₁" title="Heading 1" />
                <ToolbarBtn label="H₂" title="Heading 2" />
                <ToolbarBtn label="❝" title="Blockquote" />
                <ToolbarBtn label="&lt;&gt;" title="Code Block" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="≡" title="Ordered List" />
                <ToolbarBtn label="☰" title="Unordered List" />
                <ToolbarBtn label="⇤" title="Outdent" />
                <ToolbarBtn label="⇥" title="Indent" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="⇐" title="RTL" />
                <ToolbarBtn label="⇒" title="LTR" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="🔗" title="Link" />
                <ToolbarBtn label="🖼" title="Image" />
                <ToolbarBtn label="⊞" title="Table" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="Tx" title="Clear Formatting" />
              </div>

              {/* Editor Area */}
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setNoteHtml((e.target as HTMLDivElement).innerHTML)}
                className="min-h-[160px] rounded-b border border-stroke bg-white p-3 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />

              {/* Modal Footer */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowNoteModal(false); setNoteHtml(""); }}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNote}
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
      )}
    </div>
  );
}
