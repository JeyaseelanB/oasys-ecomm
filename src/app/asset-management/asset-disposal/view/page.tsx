"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

interface DisposalViewItem {
  id: number;
  assetName: string;
  quantity: number;
  purchaseDate: string;
  purchasedAmount: string;
  age: number;
  dispatchedQty: number;
  disposalValue: string;
  assessorValue: string;
  disposalType: string;
  h1Name: string; h1Value: string;
  h2Name: string; h2Value: string;
  h3Name: string; h3Value: string;
  negotiableValue: string;
  reason: string;
}

interface NoteEntry {
  id: number;
  html: string;
  initiatedBy: { name: string; designation: string; date: string };
}

const VIEW_DATA = {
  hoRo: "HEAD OFFICE",
  assetCategory: "Plant and Machinery",
  assetSubCategory: "Vehicle",
};

const LINE_ITEMS: DisposalViewItem[] = [
  {
    id: 1, assetName: "Office Laptop", quantity: 5, purchaseDate: "10-Jan-2022",
    purchasedAmount: "75,000.00", age: 3, dispatchedQty: 5,
    disposalValue: "15,000.00", assessorValue: "14,000.00",
    disposalType: "Auction", h1Name: "Ram", h1Value: "13,000.00",
    h2Name: "Kumar", h2Value: "13,500.00", h3Name: "Priya", h3Value: "14,000.00",
    negotiableValue: "14,500.00", reason: "Obsolete hardware",
  },
  {
    id: 2, assetName: "Office Chair", quantity: 10, purchaseDate: "15-Mar-2020",
    purchasedAmount: "12,000.00", age: 5, dispatchedQty: 10,
    disposalValue: "2,000.00", assessorValue: "1,800.00",
    disposalType: "Scrap", h1Name: "Anand", h1Value: "1,500.00",
    h2Name: "Devi", h2Value: "1,700.00", h3Name: "Suresh", h3Value: "1,900.00",
    negotiableValue: "2,000.00", reason: "Damaged",
  },
];

const NOTES: NoteEntry[] = [
  {
    id: 1,
    html: "Asset disposal approved after physical verification.",
    initiatedBy: { name: "CHITRA S", designation: "AUDITOR", date: "10 Jan, 2025" },
  },
];

function FieldCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="border-b border-stroke pb-1.5 text-sm font-medium text-[#17a2b8] dark:border-dark-3">
        {value || "\u00A0"}
      </span>
    </div>
  );
}

export default function AssetDisposalViewPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
  const currentNote = NOTES[noteIndex] ?? NOTES[0];

  const COLS = [
    "#", "Asset Name", "Quantity", "Purchase Date", "Purchased Amount (₹)", "Age",
    "Dispatched Quantity", "Disposal Value", "Assessor Value", "Disposal type",
    "H1 Name", "H1 value", "H2 Name", "H2 Value", "H3 Name", "H3 Value",
    "Negotiable Value", "Reason",
  ];

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Asset Disposal
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Asset Disposal</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Asset Disposal</h3>
        </div>

        <div className="p-6">
          {/* Info Fields */}
          <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <FieldCell label="HO/RO"              value={VIEW_DATA.hoRo} />
            <FieldCell label="Asset Category"     value={VIEW_DATA.assetCategory} />
            <FieldCell label="Asset Sub Category" value={VIEW_DATA.assetSubCategory} />
          </div>

          {/* Asset Disposal List */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon />
              Asset Disposal List
            </h4>

            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    {COLS.map((h) => (
                      <th key={h} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LINE_ITEMS.length === 0 ? (
                    <tr>
                      <td colSpan={COLS.length} className="py-4 pl-3 text-left text-gray-400">No records found.</td>
                    </tr>
                  ) : (
                    LINE_ITEMS.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}
                      >
                        <td className="border-r border-stroke px-2 py-1.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.assetName}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-center text-dark dark:border-dark-3 dark:text-white">{item.quantity}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.purchaseDate}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.purchasedAmount}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-center text-dark dark:border-dark-3 dark:text-white">{item.age}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-center text-dark dark:border-dark-3 dark:text-white">{item.dispatchedQty}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.disposalValue}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.assessorValue}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{item.disposalType}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white">{item.h1Name}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.h1Value}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white">{item.h2Name}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.h2Value}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white">{item.h3Name}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.h3Value}</td>
                        <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{item.negotiableValue}</td>
                        <td className="px-2 py-1.5 text-dark dark:text-white">{item.reason}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
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
                </svg>
                View Note
              </button>
              {/* Download/Print button */}
              <button
                type="button"
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
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
              {/* Read-only toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select disabled className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Sans Serif</option>
                </select>
                <select disabled className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Normal</option>
                </select>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                {["B","I","U","S"].map((l) => (
                  <button key={l} type="button" disabled
                    className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs font-medium text-gray-400">{l}</button>
                ))}
              </div>

              {/* Note content */}
              <div
                className="min-h-[160px] rounded-b border border-stroke bg-white p-3 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                dangerouslySetInnerHTML={{ __html: currentNote.html }}
              />

              {/* Navigation */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <span className="size-2 rounded-full bg-[#17b8c8]" />
                <button type="button" onClick={() => setNoteIndex((i) => Math.max(0, i - 1))}
                  disabled={noteIndex === 0}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8249;
                </button>
                <button type="button" onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))}
                  disabled={noteIndex === NOTES.length - 1}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
                  &#8250;
                </button>
              </div>

              {/* Request Initiated By */}
              <div className="mt-4">
                <div className="inline-block rounded border border-gray-200 p-3 text-center dark:border-dark-3" style={{ minWidth: "200px" }}>
                  <p className="mb-2 text-sm font-semibold text-[#e87c39]">Request Initiated By</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Name : {currentNote.initiatedBy.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Designation : {currentNote.initiatedBy.designation}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Date : {currentNote.initiatedBy.date}</p>
                </div>
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
