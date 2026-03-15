"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AwardingDetail {
  id: number;
  itemName: string;
  quantity: number;
  supplierName: string;
  quotedAmount: number;
  negotiatedAmount: number;
  rank: number;
}

interface AwardedItem {
  id: number;
  itemName: string;
  supplierName: string;
  finalisedAmount: number;
}

const MOCK_AWARDING_DETAILS: AwardingDetail[] = [];
const MOCK_AWARDED_ITEMS: AwardedItem[] = [];

const FORWARD_FOR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "approval", label: "Approval" },
  { value: "review", label: "Review" },
  { value: "information", label: "Information" },
];

export default function TenderAwardingCreatePage() {
  const router = useRouter();
  const [tenderRefNumber, setTenderRefNumber] = useState("123");
  const [tenderName, setTenderName] = useState("Building");
  const [supplierName, setSupplierName] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  return (
    <div className="mx-auto">
      {/* Create Note Modal */}
      {showCreateNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button
                onClick={() => setShowCreateNote(false)}
                className="text-white hover:opacity-80"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {/* Rich Text Toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                {/* Font family */}
                <select className="mr-1 rounded border border-stroke bg-white px-1.5 py-0.5 text-xs text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option>Sans Serif</option>
                  <option>Serif</option>
                  <option>Monospace</option>
                </select>
                {/* Font size */}
                <select className="mr-1 rounded border border-stroke bg-white px-1.5 py-0.5 text-xs text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option>Normal</option>
                  <option>Small</option>
                  <option>Large</option>
                  <option>Huge</option>
                </select>
                {/* Formatting buttons */}
                {[
                  { label: "B", title: "Bold", style: "font-bold" },
                  { label: "I", title: "Italic", style: "italic" },
                  { label: "U", title: "Underline", style: "underline" },
                  { label: "S", title: "Strikethrough", style: "line-through" },
                ].map((btn) => (
                  <button
                    key={btn.title}
                    title={btn.title}
                    className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3"
                  >
                    <span className={`text-${btn.style}`}>{btn.label}</span>
                  </button>
                ))}
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-dark-3" />
                {/* Color pickers */}
                <button title="Font Color" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <span className="text-xs font-bold" style={{ borderBottom: "2px solid red" }}>A</span>
                </button>
                <button title="Background Color" className="inline-flex size-6 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">
                  <span className="text-xs font-bold" style={{ backgroundColor: "yellow", padding: "0 2px" }}>A</span>
                </button>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-dark-3" />
                {/* Sub/Superscript */}
                <button title="Subscript" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  X<sub>2</sub>
                </button>
                <button title="Superscript" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  X<sup>2</sup>
                </button>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-dark-3" />
                {/* Headings */}
                <button title="Heading 1" className="inline-flex size-6 items-center justify-center rounded text-xs font-bold text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">H1</button>
                <button title="Heading 2" className="inline-flex size-6 items-center justify-center rounded text-xs font-bold text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">H2</button>
                {/* Quote/Code */}
                <button title="Blockquote" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
                </button>
                <button title="Code" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                </button>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-dark-3" />
                {/* Lists */}
                <button title="Ordered List" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4H4zm0 6h1v4H4zm1 4H4" /></svg>
                </button>
                <button title="Unordered List" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" /><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" /></svg>
                </button>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-dark-3" />
                {/* Alignment */}
                <button title="Align Left" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></svg>
                </button>
                <button title="Align Center" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
                </button>
                <button title="Align Justify" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                </button>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-dark-3" />
                {/* Indent */}
                <button title="Outdent" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="7 8 3 12 7 16" /><line x1="21" y1="12" x2="3" y2="12" /><line x1="21" y1="6" x2="11" y2="6" /><line x1="21" y1="18" x2="11" y2="18" /></svg>
                </button>
                <button title="Indent" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="17 8 21 12 17 16" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="13" y2="6" /><line x1="3" y1="18" x2="13" y2="18" /></svg>
                </button>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-dark-3" />
                {/* Link / Image / Table */}
                <button title="Link" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                </button>
                <button title="Image" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                </button>
                <button title="Table" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
                </button>
                <button title="Clear Format" className="inline-flex size-6 items-center justify-center rounded text-xs text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2L19 7" /><path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" /></svg>
                </button>
              </div>

              {/* Editor Area */}
              <div
                contentEditable
                suppressContentEditableWarning
                className="min-h-[150px] rounded-b border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                onInput={(e) => setNoteContent((e.target as HTMLDivElement).innerHTML)}
              />

              {/* Created By Card */}
              <div className="mt-4 inline-block rounded border border-stroke p-3 dark:border-dark-3">
                <p className="mb-2 text-xs font-semibold text-dark dark:text-white">Created By</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Name : SANKARANARAYANAN</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Designation : SUPERINTENDENT</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Date : 12-Mar-2026</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button
                onClick={() => setShowCreateNote(false)}
                className="flex items-center gap-1.5 rounded border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Tender Awarding</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Tender Awarding</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tender Awarding</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">( * Mandatory Fields)</span>
            <button
              onClick={() => setHeaderExpanded(!headerExpanded)}
              className="text-white hover:opacity-80"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                {headerExpanded ? (
                  <line x1="5" y1="12" x2="19" y2="12" />
                ) : (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Collapsible Search Fields */}
          {headerExpanded && (
            <>
              <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Tender Reference Number */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                    Tender Reference Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <line x1="4" y1="9" x2="20" y2="9" />
                        <line x1="4" y1="15" x2="20" y2="15" />
                        <line x1="10" y1="3" x2="8" y2="21" />
                        <line x1="16" y1="3" x2="14" y2="21" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={tenderRefNumber}
                      onChange={(e) => setTenderRefNumber(e.target.value)}
                      className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>
                </div>

                {/* Tender Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Tender Name</label>
                  <div className="flex">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={tenderName}
                      readOnly
                      className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    />
                  </div>
                </div>

                {/* Supplier Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                    Supplier Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
                      </svg>
                    </div>
                    <select
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                    >
                      <option value="">Select</option>
                      <option value="supplier1">Supplier 1</option>
                      <option value="supplier2">Supplier 2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search / Clear Buttons */}
              <div className="mb-6 flex justify-end gap-2">
                <button className="flex items-center gap-1.5 rounded border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50 dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                  Clear
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Search
                </button>
              </div>
            </>
          )}

          {/* Tender Awarding Details Table */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Tender Awarding Details</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Supplier Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quoted Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Negotiated Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Rank</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_AWARDING_DETAILS.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="border border-stroke px-3 py-4 text-center text-sm text-gray-500 dark:border-dark-3">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    MOCK_AWARDING_DETAILS.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.itemName}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.quantity}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.supplierName}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.quotedAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.negotiatedAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{item.rank}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                          <button className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                        </td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                          <input type="checkbox" className="size-4 cursor-pointer accent-[#2d8f7b]" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button className="flex items-center gap-1.5 rounded border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50 dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Award
              </button>
            </div>
          </div>

          {/* View Tender Awarding Table */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">View Tender Awarding</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Supplier Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Finalised Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_AWARDED_ITEMS.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="border border-stroke px-3 py-4 text-center text-sm text-gray-500 dark:border-dark-3">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    MOCK_AWARDED_ITEMS.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.itemName}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.supplierName}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.finalisedAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                          <button className="inline-flex items-center justify-center rounded bg-red-500 p-1.5 text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward To <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 00-4-4H4" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward For <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 00-4-4H4" />
                  </svg>
                </div>
                <select
                  value={forwardFor}
                  onChange={(e) => setForwardFor(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                >
                  {FORWARD_FOR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Create Note Button */}
          <div className="mb-6">
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

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/operational/tender/tender-awarding/list")}
              className="flex items-center gap-1.5 rounded border border-stroke bg-white px-5 py-2.5 text-sm font-medium text-dark hover:bg-gray-50 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="22 2 11 13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
