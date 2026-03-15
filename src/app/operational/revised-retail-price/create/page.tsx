"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RRPDetailRow {
  id: number;
  qrCode: string;
  itemCode: string;
  name: string;
  availableQty: number;
  existingRate: number;
  qtyToRevise: number;
  revisedRate: number;
}

export default function CreateRevisedRetailPricePage() {
  const router = useRouter();
  const [qrCode, setQrCode] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const details: RRPDetailRow[] = [];

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Revised Retail Price
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Revised Retail Price</li>
          </ol>
        </nav>
      </div>

      {/* Revised Retail Price Section */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Revised Retail Price</h3>
          <span className="text-xs text-white opacity-80">
            (<span className="text-red-300">*</span> Mandatory Fields)
          </span>
        </div>

        <div className="p-5">
          {/* QR Code Field */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
              QR Code
            </label>
            <div className="flex items-center gap-2">
              <button className="flex size-10 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 hover:bg-gray-100 dark:border-dark-3 dark:bg-dark-2">
                <svg className="size-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="8" height="8" rx="1" />
                  <rect x="14" y="2" width="8" height="8" rx="1" />
                  <rect x="2" y="14" width="8" height="8" rx="1" />
                  <rect x="4" y="4" width="4" height="4" fill="currentColor" stroke="none" />
                  <rect x="16" y="4" width="4" height="4" fill="currentColor" stroke="none" />
                  <rect x="4" y="16" width="4" height="4" fill="currentColor" stroke="none" />
                  <rect x="14" y="14" width="2" height="2" fill="currentColor" stroke="none" />
                  <rect x="17" y="14" width="2" height="2" fill="currentColor" stroke="none" />
                  <rect x="20" y="14" width="2" height="2" fill="currentColor" stroke="none" />
                  <rect x="14" y="17" width="2" height="2" fill="currentColor" stroke="none" />
                  <rect x="17" y="17" width="5" height="5" fill="currentColor" stroke="none" />
                </svg>
              </button>
              <input
                type="text"
                className="w-full max-w-xs rounded border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
              />
            </div>
          </div>

          {/* Clear and Search Buttons */}
          <div className="mb-6 flex justify-end gap-3">
            <button
              onClick={() => setQrCode("")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
              </svg>
              Clear
            </button>
            <button
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
          </div>

          {/* Revised Retail Price Details Table */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              <h3 className="text-sm font-semibold text-dark dark:text-white">Revised Retail Price Details</h3>
            </div>
            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold w-12">#</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">QR Code(s)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Item Code</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Name</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Available Qty</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Existing Rate (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">QTY to Revise (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Revised Rate (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {details.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-400">No records found</td>
                    </tr>
                  ) : (
                    details.map((row, idx) => (
                      <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                        <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">{row.qrCode}</td>
                        <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">{row.itemCode}</td>
                        <td className="border-r border-stroke px-3 py-3 dark:border-dark-3">{row.name}</td>
                        <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">{row.availableQty.toFixed(2)}</td>
                        <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">{row.existingRate.toFixed(2)}</td>
                        <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">{row.qtyToRevise.toFixed(2)}</td>
                        <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">{row.revisedRate.toFixed(2)}</td>
                        <td className="px-3 py-3 text-center"></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Table Pagination */}
            <div className="flex justify-end mt-2 gap-1">
              <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#171;</button>
              <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#8249;</button>
              <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#8250;</button>
              <button className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 dark:border-dark-3">&#187;</button>
              <select className="ml-1 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white">
                <option value={500}>500</option>
              </select>
            </div>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Forward To <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <button className="flex size-10 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 hover:bg-gray-100 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                  </svg>
                </button>
                <input
                  type="text"
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Forward For <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <button className="flex size-10 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 hover:bg-gray-100 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                  </svg>
                </button>
                <select
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  value={forwardFor}
                  onChange={(e) => setForwardFor(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="APPROVAL">APPROVAL</option>
                  <option value="REVIEW">REVIEW</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowCreateNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Note
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/operational/revised-retail-price/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save
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
      </div>

      {/* Create Note Modal */}
      {showCreateNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-base font-semibold text-white">Create Note</h3>
              <button
                onClick={() => setShowCreateNote(false)}
                className="text-white hover:opacity-80"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-2 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-2 dark:border-dark-3 dark:bg-dark-2">
                <select className="rounded border border-stroke bg-white px-2 py-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Sans Serif</option>
                </select>
                <select className="rounded border border-stroke bg-white px-2 py-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Normal</option>
                </select>
                {["B", "I", "U", "S"].map((t) => (
                  <button key={t} className={`flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs font-${t === "B" ? "bold" : t === "I" ? "normal italic" : "normal"} hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:text-white`}>
                    {t}
                  </button>
                ))}
                <div className="mx-1 h-5 w-px bg-gray-300" />
                {["A", "H₁", "H₂", "≡", "•", "❝", "</>"].map((t, i) => (
                  <button key={i} className="flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    {t}
                  </button>
                ))}
                <div className="mx-1 h-5 w-px bg-gray-300" />
                {["≡L", "≡R", "⇥", "⇤", "🔗", "🖼", "▦"].map((t, i) => (
                  <button key={i} className="flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    {t}
                  </button>
                ))}
              </div>

              {/* Editor Area */}
              <textarea
                className="min-h-[200px] w-full rounded-b border border-stroke bg-white p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder=""
              />

              {/* Created By Card */}
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => {}}
                  className="flex size-8 items-center justify-center rounded-full border border-stroke bg-gray-100 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2"
                >
                  &#8249;
                </button>
                <div className="flex-1 rounded border border-red-400 p-4 text-center text-sm">
                  <p className="mb-2 font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-gray-600 dark:text-gray-400">Name : MOHANAM</p>
                  <p className="text-gray-600 dark:text-gray-400">Designation : DEPUTY MANAGER(D&amp;P)</p>
                  <p className="text-gray-600 dark:text-gray-400">Date : 11-Mar-2026</p>
                </div>
                <button
                  onClick={() => {}}
                  className="flex size-8 items-center justify-center rounded-full border border-stroke bg-gray-100 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2"
                >
                  &#8250;
                </button>
              </div>

              {/* Modal Buttons */}
              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20 6 9 17 4 12" />
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
