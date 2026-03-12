"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MBELineItem {
  id: number;
  dateOfMeasurements: string;
  descriptionOfWork: string;
  no: number;
  length: number;
  breadth: number;
  depth: number;
  contentsOrArea: number;
  rate: number;
  unit: string;
  totalValueToDate: number;
  deductPrevQty: number;
  deductPrevAmount: number;
  sinceLastQty: number;
  sinceLastValue: number;
  remarks: string;
}

interface NoteEntry {
  id: number;
  html: string;
}

const VIEW_DATA = {
  hoRo: "CHENNAI",
  entityType: "Collection Office",
  entity: "Collection Office - Chennai",
  nameOfBuilding: "Co_optex",
  typeOfWork: "Modernization",
  schemeType: "Scheme A",
  dateOfReport: "04-Sep-2018",
  phase: "1",
  forwardTo: "",
  forwardFor: "",
};

const LINE_ITEMS: MBELineItem[] = [];

const NOTES: NoteEntry[] = [
  { id: 1, html: "Sample note for measurement book entry." },
];

const FORWARD_FOR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "modernization", label: "Modernization" },
  { value: "construction", label: "Construction" },
  { value: "supplementary", label: "Supplementary Work" },
];

export default function ViewMeasurementBookEntryPage() {
  const router = useRouter();

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex]         = useState(0);

  const currentNote = NOTES[noteIndex] ?? NOTES[0];

  const FieldRow = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#17b8c8]">{label}</span>
      <span className="border-b border-stroke pb-1.5 text-sm font-medium text-dark dark:border-dark-3 dark:text-white">
        {value || "\u00A0"}
      </span>
    </div>
  );

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Measurement Book Entry
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Modernization</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Measurement Book Entry</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Measurement Book Entry</h3>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Row 1: HO/RO | Entity Type | Entity | Name of Building */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <FieldRow label="HO/RO"            value={VIEW_DATA.hoRo} />
            <FieldRow label="Entity Type"      value={VIEW_DATA.entityType} />
            <FieldRow label="Entity"           value={VIEW_DATA.entity} />
            <FieldRow label="Name of Building" value={VIEW_DATA.nameOfBuilding} />
          </div>

          {/* Row 2: Type of Work | Scheme Type */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <FieldRow label="Type of Work" value={VIEW_DATA.typeOfWork} />
            <FieldRow label="Scheme Type"  value={VIEW_DATA.schemeType} />
          </div>

          {/* Row 3: Date of Report | Phase */}
          <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <FieldRow label="Date of Report" value={VIEW_DATA.dateOfReport} />
            <FieldRow label="Phase"          value={VIEW_DATA.phase} />
          </div>

          {/* Measurement Book Entry Details */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Measurement Book Entry Details
            </h4>

            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-xs">
                <thead>
                  {/* Row 1 – grouped headers */}
                  <tr className="bg-[#2d8f7b] text-white">
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Date of<br />Measurements</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Description<br />of Work</th>
                    <th colSpan={5} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Measurements Upto Date</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Rate (&#8377;)</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Unit</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Total Value<br />to Date (&#8377;)</th>
                    <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Deduct Previous<br />Measurements</th>
                    <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Since Last<br />Measurements</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Remarks</th>
                  </tr>
                  {/* Row 2 – sub-headers */}
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">No.</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Length<br />(ft)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Breadth<br />(ft)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Depth<br />(ft)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Contents<br />or Area</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Amount<br />(&#8377;)</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">Value<br />(&#8377;)</th>
                  </tr>
                </thead>
                <tbody>
                  {LINE_ITEMS.length === 0 ? (
                    <tr>
                      <td colSpan={16} className="py-6 text-center text-gray-400">No records found.</td>
                    </tr>
                  ) : (
                    LINE_ITEMS.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-stroke dark:border-dark-3 ${
                          idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                        }`}
                      >
                        <td className="border-r border-stroke px-2 py-2 text-center dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border-r border-stroke px-2 py-2 text-center dark:border-dark-3 dark:text-white">{item.dateOfMeasurements}</td>
                        <td className="border-r border-stroke px-2 py-2 dark:border-dark-3 dark:text-white">{item.descriptionOfWork}</td>
                        <td className="border-r border-stroke px-2 py-2 text-center dark:border-dark-3 dark:text-white">{item.no}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.length}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.breadth}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.depth}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.contentsOrArea}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.rate}</td>
                        <td className="border-r border-stroke px-2 py-2 text-center dark:border-dark-3 dark:text-white">{item.unit}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.totalValueToDate}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.deductPrevQty}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.deductPrevAmount}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.sinceLastQty}</td>
                        <td className="border-r border-stroke px-2 py-2 text-right dark:border-dark-3 dark:text-white">{item.sinceLastValue}</td>
                        <td className="px-2 py-2 dark:text-white">{item.remarks}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forward To & Forward For (read-only display) */}
          <div className="mb-6 flex flex-wrap gap-6">
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
                <input
                  type="text"
                  readOnly
                  value={VIEW_DATA.forwardTo}
                  className="flex-1 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
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
                <select
                  disabled
                  value={VIEW_DATA.forwardFor}
                  className="flex-1 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                >
                  {FORWARD_FOR_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => { setNoteIndex(0); setShowNoteModal(true); }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              View Note
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">View Note</h4>
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {/* Note Content Area */}
              <div
                className="mb-4 min-h-[180px] rounded border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-[#1a2232]"
                dangerouslySetInnerHTML={{ __html: currentNote.html }}
              />

              {/* Navigation arrows */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoteIndex((i) => Math.max(0, i - 1))}
                  disabled={noteIndex === 0}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
                >
                  &#8249;
                </button>
                <button
                  type="button"
                  onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))}
                  disabled={noteIndex === NOTES.length - 1}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
                >
                  &#8250;
                </button>
              </div>

              {/* Cancel Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
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
