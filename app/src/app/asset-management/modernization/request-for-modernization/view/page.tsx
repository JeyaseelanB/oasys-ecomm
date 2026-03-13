"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data — replace with real props/API data as needed
const VIEW_DATA = {
  hoRo: "CHENNAI",
  entityType: "Collection Office",
  entity: "Collection Office - Chennai",
  nameOfBuilding: "Towers",
  schemeType: "",
  typeOfWork: "",
  description: "Sample",
  documentName: "IMAGES",
  documentUrl: "#",
  notes: [
    { id: 1, note: "Initial inspection completed.", createdBy: "Admin", createdAt: "01-Jan-2025" },
    { id: 2, note: "Awaiting approval from HO.", createdBy: "Manager", createdAt: "05-Jan-2025" },
  ],
};

export default function ViewRequestForModernizationPage() {
  const router = useRouter();
  const [showNotes, setShowNotes] = useState(false);

  const LabelValue = ({
    label,
    value,
    isLink = false,
  }: {
    label: string;
    value?: string;
    isLink?: boolean;
  }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      {isLink && value ? (
        <span className="text-sm font-medium text-[#17b8c8]">{value}</span>
      ) : (
        <span className="text-sm font-medium text-dark dark:text-white">{value || "\u00A0"}</span>
      )}
    </div>
  );

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Request For Modernization/Construction/Supplementary work
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Modernization</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">
              View Request For Modernization/Construction/Supplementary work
            </li>
          </ol>
        </nav>
      </div>

      {/* View Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">
            Request For Modernization/ Construction/Supplementary work
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Row 1: HO/RO | Entity Type | Entity | Name of Building */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-stroke pb-5 dark:border-dark-3 sm:grid-cols-4">
            <LabelValue label="HO/RO" value={VIEW_DATA.hoRo} isLink />
            <LabelValue label="Entity Type" value={VIEW_DATA.entityType} isLink />
            <LabelValue label="Entity" value={VIEW_DATA.entity} isLink />
            <LabelValue label="Name of Building" value={VIEW_DATA.nameOfBuilding} isLink />
          </div>

          {/* Row 2: Scheme Type | Type of Work */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-stroke pb-5 dark:border-dark-3 sm:grid-cols-4">
            <LabelValue label="Scheme Type" value={VIEW_DATA.schemeType} />
            <LabelValue label="Type of Work" value={VIEW_DATA.typeOfWork} />
          </div>

          {/* Description */}
          <div className="mb-5 border-b border-stroke pb-5 dark:border-dark-3">
            <span className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Description</span>
            <span className="text-sm font-medium text-[#17b8c8]">{VIEW_DATA.description}</span>
          </div>

          {/* Download Document */}
          <div className="mb-6">
            <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">Download Document</span>
            <div className="flex items-center gap-0">
              <div className="flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                {VIEW_DATA.documentName}
              </div>
              <a
                href={VIEW_DATA.documentUrl}
                download
                className="flex items-center gap-1.5 rounded-r bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="8,17 12,21 16,17" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
                </svg>
                Download
              </a>
            </div>
          </div>

          {/* Notes Panel */}
          {showNotes && VIEW_DATA.notes.length > 0 && (
            <div className="mb-5 rounded border border-stroke dark:border-dark-3">
              <div className="bg-gray-50 px-4 py-2 dark:bg-dark-2">
                <span className="text-sm font-semibold text-dark dark:text-white">Notes</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <th className="px-4 py-2 text-left font-semibold text-dark dark:text-white">#</th>
                    <th className="px-4 py-2 text-left font-semibold text-dark dark:text-white">Note</th>
                    <th className="px-4 py-2 text-left font-semibold text-dark dark:text-white">Created By</th>
                    <th className="px-4 py-2 text-left font-semibold text-dark dark:text-white">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {VIEW_DATA.notes.map((note, idx) => (
                    <tr
                      key={note.id}
                      className={`border-b border-stroke dark:border-dark-3 ${
                        idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"
                      }`}
                    >
                      <td className="px-4 py-2 text-dark dark:text-white">{idx + 1}</td>
                      <td className="px-4 py-2 text-dark dark:text-white">{note.note}</td>
                      <td className="px-4 py-2 text-dark dark:text-white">{note.createdBy}</td>
                      <td className="px-4 py-2 text-dark dark:text-white">{note.createdAt}</td>
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
              onClick={() => setShowNotes((v) => !v)}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              {showNotes ? "Hide Note" : "View Note"}
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
    </div>
  );
}
