"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AssetViewItem {
  id: number;
  assetCategory: string;
  assetSubCategory: string;
  assetName: string;
  quantity: number;
  reason: string;
}

interface NoteCard {
  role: string;
  name: string;
  designation: string;
  date: string;
}

interface NoteEntry {
  id: number;
  html: string;
  cards: NoteCard[];
}

// ── Sample view data (AA086 – SUBMITTED) ──────────────────────────────
const VIEW_DATA = {
  allocationType:  "",
  hoRo:            "",
  entityType:      "",
  entity:          "",
  section:         "EDP",
  employee:        "",
  dateOfAllocation: "30-Oct-2023",
  remark:          "",
  forwardTo:       "",
  forwardFor:      "Approval",
  status:          "SUBMITTED" as "SUBMITTED" | "FINAL APPROVED",
};

const LINE_ITEMS: AssetViewItem[] = [
  { id: 1, assetCategory: "Plant and Machinery", assetSubCategory: "COOPTEX HARDWARE", assetName: "Benq-Projector", quantity: 1, reason: "Benq Projector GV30 Portable Smart Wireless Projector one at Commisoner of Handlooms" },
  { id: 2, assetCategory: "Plant and Machinery", assetSubCategory: "COOPTEX HARDWARE", assetName: "Benq-Projector", quantity: 1, reason: "Benq Projector GV30 Portable Smart Wireless Projector one at IT Wing Co-optex Head office" },
];

const NOTES: NoteEntry[] = [
  {
    id: 1,
    html: "Kindly Approve",
    cards: [
      { role: "Created By",      name: "Namasivayamoorthy M", designation: "JUNIOR PROGRAMMER", date: "30 Oct, 2023" },
    ],
  },
];

const FORWARD_FOR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "Approval",   label: "Approval" },
  { value: "Review",     label: "Review" },
  { value: "Processing", label: "Processing" },
];

// ── Field display component ────────────────────────────────────────────
const FieldCell = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="border-b border-stroke pb-1.5 text-sm font-medium text-[#17a2b8] dark:border-dark-3">
      {value || "\u00A0"}
    </span>
  </div>
);

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export default function AssetAllocationViewPage() {
  const router = useRouter();

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex]         = useState(0);

  const currentNote = NOTES[noteIndex] ?? NOTES[0];
  const isSubmitted = VIEW_DATA.status === "SUBMITTED";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Asset Allocation</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Asset Allocation</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Asset Allocation</h3>
        </div>

        <div className="p-6">
          {/* ── Row 1: Allocation Type, HO/RO, Entity Type, Entity ── */}
          <div className="mb-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <FieldCell label="Allocation Type"       value={VIEW_DATA.allocationType} />
            <FieldCell label="Head / Regional Office" value={VIEW_DATA.hoRo} />
            <FieldCell label="Entity Type"           value={VIEW_DATA.entityType} />
            <FieldCell label="Entity"                value={VIEW_DATA.entity} />
          </div>

          {/* ── Section sub-heading ── */}
          <p className="mb-2 text-sm font-semibold text-[#17a2b8]">Section</p>

          {/* ── Row 2: Section, Employee, Date of Allocation ── */}
          <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            <FieldCell label="Section"           value={VIEW_DATA.section} />
            <FieldCell label="Employee"          value={VIEW_DATA.employee} />
            <FieldCell label="Date of Allocation" value={VIEW_DATA.dateOfAllocation} />
          </div>

          {/* ── Asset Allocation Sub-section ── */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon />
              Asset Allocation
            </h4>

            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Asset Category</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Asset Sub Category</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Asset Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {LINE_ITEMS.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-400">No records found</td>
                    </tr>
                  ) : (
                    LINE_ITEMS.map((item, idx) => (
                      <tr key={item.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                        <td className="border-r border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.assetCategory}</td>
                        <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.assetSubCategory}</td>
                        <td className="border-r border-stroke px-3 py-2 text-[#17a2b8] dark:border-dark-3">{item.assetName}</td>
                        <td className="border-r border-stroke px-3 py-2 text-center text-[#17a2b8] dark:border-dark-3">{item.quantity}</td>
                        <td className="px-3 py-2 text-dark dark:text-white">{item.reason}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Remark ── */}
          {VIEW_DATA.remark && (
            <div className="mb-6">
              <p className="mb-1 text-sm font-medium text-dark dark:text-white">Remark</p>
              <p className="text-sm text-[#17a2b8]">{VIEW_DATA.remark}</p>
            </div>
          )}

          {/* ── Forward To & Forward For (read-only) ── */}
          <div className="mb-6 flex flex-wrap gap-6">
            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward To <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="9,10 4,15 9,20" /><path d="M20 4v7a4 4 0 01-4 4H4" />
                  </svg>
                </div>
                <input type="text" readOnly value={VIEW_DATA.forwardTo}
                  className="flex-1 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>

            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward For <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="9,10 4,15 9,20" /><path d="M20 4v7a4 4 0 01-4 4H4" />
                  </svg>
                </div>
                <select disabled value={VIEW_DATA.forwardFor}
                  className="flex-1 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  {FORWARD_FOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── Footer Actions ── */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* View Note */}
            <button type="button" onClick={() => { setNoteIndex(0); setShowNoteModal(true); }}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              View Note
            </button>

            <div className="flex items-center gap-2">
              {/* Reject & Approve only for SUBMITTED status */}
              {isSubmitted && (
                <>
                  <button type="button"
                    className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Reject
                  </button>
                  <button type="button"
                    className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    Approve
                  </button>
                </>
              )}
              {/* Back */}
              <button type="button" onClick={() => router.back()}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="15,18 9,12 15,6" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── View Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">View Note</h4>
              <button type="button" onClick={() => setShowNoteModal(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {/* Note Content */}
              <div
                className="min-h-[140px] rounded border border-stroke bg-white p-4 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                dangerouslySetInnerHTML={{ __html: currentNote.html }}
              />

              {/* Navigation dot + arrows */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <span className="size-2 rounded-full bg-[#17b8c8]" />
                <button type="button" onClick={() => setNoteIndex((i) => Math.max(0, i - 1))} disabled={noteIndex === 0}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8249;
                </button>
                <button type="button" onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))} disabled={noteIndex === NOTES.length - 1}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8250;
                </button>
              </div>

              {/* Note Cards (Created By / Final Approved By) */}
              <div className="mt-4 flex flex-wrap gap-4">
                {currentNote.cards.map((card, i) => (
                  <div key={i} className="rounded border border-gray-200 p-3 text-center dark:border-dark-3" style={{ minWidth: "190px" }}>
                    <p className="mb-2 text-sm font-semibold text-[#e87c39]">{card.role}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Name : {card.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Designation : {card.designation}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Date : {card.date}</p>
                  </div>
                ))}
              </div>

              {/* Cancel */}
              <div className="mt-4 flex justify-end">
                <button type="button" onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
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
