"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EstimationLineItem {
  id: number;
  itemDescription: string;
  quantity: number;
  unit: string;
  rate: number;
  gstPercent: number | null;
  gstAmount: number | null;
  amount: number;
  totalAmount: number;
}

interface NoteEntry {
  id: number;
  text: string;
  approvedBy: {
    name: string;
    designation: string;
    date: string;
  };
}

const VIEW_DATA = {
  hoRo: "CHENNAI",
  entityType: "Collection Office",
  entity: "Collection Office - Chennai",
  nameOfBuilding: "Co_optex",
  typeOfWork: "",
  schemeType: "",
  description: "Sample",
};

const LINE_ITEMS: EstimationLineItem[] = [
  {
    id: 1,
    itemDescription: "Sample",
    quantity: 1.0,
    unit: "Kilogram",
    rate: 50000.0,
    gstPercent: null,
    gstAmount: null,
    amount: 600000.0,
    totalAmount: 600000.0,
  },
];

const NOTES: NoteEntry[] = [
  {
    id: 1,
    text: "Sample",
    approvedBy: {
      name: "SANKARANARAYANAN C",
      designation: "SUPERINTENDENT",
      date: "04-09-2018",
    },
  },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function ViewEstimationOfModernizationPage() {
  const router = useRouter();

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteIndex, setNoteIndex]         = useState(0);

  // Pagination for line items
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]       = useState(10);

  const totalPages = Math.max(1, Math.ceil(LINE_ITEMS.length / pageSize));
  const paginated  = LINE_ITEMS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const currentNote = NOTES[noteIndex] ?? NOTES[0];

  const LabelValue = ({ label, value, isLink = false }: { label: string; value?: string; isLink?: boolean }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${isLink ? "text-[#17b8c8]" : "text-dark dark:text-white"}`}>
        {value || "\u00A0"}
      </span>
    </div>
  );

  const fmt = (v: number | null) =>
    v === null || v === undefined ? "" : v.toLocaleString("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Estimation of Modernization
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Modernization</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Estimation of Modernization</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Estimation of Modernization</h3>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Row 1: HO/RO | Entity Type | Entity | Name of Building */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-stroke pb-5 dark:border-dark-3 sm:grid-cols-4">
            <LabelValue label="HO/RO"           value={VIEW_DATA.hoRo}           isLink />
            <LabelValue label="Entity Type"     value={VIEW_DATA.entityType}     isLink />
            <LabelValue label="Entity"          value={VIEW_DATA.entity}         isLink />
            <LabelValue label="Name of Building" value={VIEW_DATA.nameOfBuilding} isLink />
          </div>

          {/* Row 2: Type of Work | Scheme Type */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-stroke pb-5 dark:border-dark-3 sm:grid-cols-4">
            <LabelValue label="Type of Work" value={VIEW_DATA.typeOfWork} />
            <LabelValue label="Scheme Type"  value={VIEW_DATA.schemeType} />
          </div>

          {/* Description */}
          <div className="mb-6 border-b border-stroke pb-6 dark:border-dark-3">
            <span className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Description</span>
            <span className="text-sm font-medium text-[#17b8c8]">{VIEW_DATA.description}</span>
          </div>

          {/* Estimation of Modernization Table */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Estimation of Modernization
            </h4>

            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Item Description</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Unit</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Rate (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">GST (%)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">GST Amount (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Amount (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Total Amount (&#8377;)</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-400">No records found</td>
                    </tr>
                  ) : (
                    paginated.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-stroke dark:border-dark-3 ${
                          idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                        }`}
                      >
                        <td className="border-r border-stroke px-2 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                          {(currentPage - 1) * pageSize + idx + 1}
                        </td>
                        <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">
                          {item.itemDescription}
                        </td>
                        <td className="border-r border-stroke px-3 py-3 text-center text-[#17b8c8] dark:border-dark-3">
                          {fmt(item.quantity)}
                        </td>
                        <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">
                          {item.unit}
                        </td>
                        <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">
                          {fmt(item.rate)}
                        </td>
                        <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                          {item.gstPercent ?? ""}
                        </td>
                        <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">
                          {item.gstAmount !== null ? fmt(item.gstAmount) : ""}
                        </td>
                        <td className="border-r border-stroke px-3 py-3 text-right text-dark dark:border-dark-3 dark:text-white">
                          {fmt(item.amount)}
                        </td>
                        <td className="px-3 py-3 text-right text-dark dark:text-white">
                          {fmt(item.totalAmount)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Pagination */}
            <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({currentPage} of {totalPages})
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
                >&#171;</button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
                >&#8249;</button>
                <button className="flex size-7 items-center justify-center rounded border border-primary bg-primary text-xs text-white">
                  {currentPage}
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
                >&#8250;</button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="flex size-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
                >&#187;</button>

                <select
                  className="ml-1 rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none dark:border-dark-3 dark:text-white"
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                >
                  {PAGE_SIZE_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
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
              {/* Note Text Area */}
              <div className="mb-4 min-h-[160px] rounded border border-stroke bg-[#f9fafb] p-4 dark:border-dark-3 dark:bg-[#1a2232]">
                <p className="text-sm text-dark dark:text-white">{currentNote.text}</p>
              </div>

              {/* Note Navigation */}
              {NOTES.length > 1 && (
                <div className="mb-4 flex items-center justify-end gap-2">
                  {NOTES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNoteIndex(i)}
                      className={`size-2.5 rounded-full transition-colors ${
                        noteIndex === i ? "bg-[#17b8c8]" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                  <button
                    onClick={() => setNoteIndex((i) => Math.max(0, i - 1))}
                    disabled={noteIndex === 0}
                    className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2 dark:text-white"
                  >&#8249;</button>
                  <button
                    onClick={() => setNoteIndex((i) => Math.min(NOTES.length - 1, i + 1))}
                    disabled={noteIndex === NOTES.length - 1}
                    className="flex size-7 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2 dark:text-white"
                  >&#8250;</button>
                </div>
              )}

              {/* Single note — show dot + arrows aligned right */}
              {NOTES.length === 1 && (
                <div className="mb-4 flex items-center justify-end gap-2">
                  <span className="size-2.5 rounded-full bg-[#17b8c8]" />
                  <button
                    disabled
                    className="flex size-7 items-center justify-center rounded border border-stroke text-sm opacity-40 dark:border-dark-3 dark:text-white"
                  >&#8249;</button>
                  <button
                    disabled
                    className="flex size-7 items-center justify-center rounded border border-stroke text-sm opacity-40 dark:border-dark-3 dark:text-white"
                  >&#8250;</button>
                </div>
              )}

              {/* Final Approved By Card */}
              <div className="mb-5 w-fit rounded border border-stroke px-5 py-4 dark:border-dark-3">
                <p className="mb-3 text-center text-sm font-semibold text-dark dark:text-white">
                  Final Approved By
                </p>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  Name :{" "}
                  <span className="font-medium text-[#17b8c8]">{currentNote.approvedBy.name}</span>
                </p>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  Designation :{" "}
                  <span className="font-medium text-[#17b8c8]">{currentNote.approvedBy.designation}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Date :{" "}
                  <span className="font-medium text-dark dark:text-white">{currentNote.approvedBy.date}</span>
                </p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
