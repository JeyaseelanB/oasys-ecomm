"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const TRAINING_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "internal", label: "Internal" },
  { value: "external", label: "External" },
];

const INTERNAL_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "on_the_job", label: "On-the-Job Training" },
  { value: "classroom", label: "Classroom Training" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
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

const CalendarIconBtn = () => (
  <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function TrainingRequestCreatePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    trainingType: "",
    internalType: "",
    startDate: "",
    endDate: "",
    noOfDays: "",
    reason: "",
  });

  const [fileName, setFileName] = useState("No file chosen");

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || "No file chosen");
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Training Request
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Training Request</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 flex items-center justify-between rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">Training Request</h3>
        <span className="text-sm text-white">(<span className="text-red-200">*</span> Mandatory Fields)</span>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Row 1: Training Type, Internal Type, Start Date, End Date */}
        <div className="mb-5 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Training Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ListIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.trainingType} onChange={(e) => handleChange("trainingType", e.target.value)}>
                {TRAINING_TYPE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Internal Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ListIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.internalType} onChange={(e) => handleChange("internalType", e.target.value)}>
                {INTERNAL_TYPE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
              <input type="text" placeholder="dd-MMM-yyyy" className="w-full bg-transparent px-3 py-2 text-sm outline-none dark:text-white" value={form.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
              <button className="bg-[#00bcd4] px-3 py-2"><CalendarIconBtn /></button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
              <input type="text" placeholder="dd-MMM-yyyy" className="w-full bg-transparent px-3 py-2 text-sm outline-none dark:text-white" value={form.endDate} onChange={(e) => handleChange("endDate", e.target.value)} />
              <button className="bg-[#00bcd4] px-3 py-2"><CalendarIconBtn /></button>
            </div>
          </div>
        </div>

        {/* Row 2: No. of Days */}
        <div className="mb-5 grid grid-cols-4 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              No. of Days <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <HashIcon />
              <input type="text" className="w-full bg-transparent text-sm outline-none dark:text-white" value={form.noOfDays} onChange={(e) => handleChange("noOfDays", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Row 3: Reason */}
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Reason</label>
          <textarea
            className="h-[100px] w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white"
            value={form.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
          />
        </div>

        {/* Row 4: Documents */}
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Documents :</label>
          <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 rounded bg-[#00bcd4] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17,8 12,3 7,8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload
          </button>
          <button
            onClick={() => router.push("/personnel/employee-self-service/training-request/list")}
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
  );
}
