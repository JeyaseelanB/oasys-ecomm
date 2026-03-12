"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" /><rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);

const TealVal = ({ value }: { value: string }) => (
  <p className="text-sm font-medium" style={{ color: "#17a2b8" }}>{value || "—"}</p>
);

const LabeledField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <TealVal value={value} />
  </div>
);

export default function ViewAdvertisementPage() {
  const router = useRouter();
  const [showNote, setShowNote] = useState(false);

  // Pre-filled data from screenshot
  const data = {
    adCategory: "",
    adType: "",
    mediaType: "Television",
    tvCode: "1234 / Coptex TV",
    language: "Tamil",
    trpRating: "3.0",
    duration: "15.0",
    fromDate: "26-Mar-2024",
    toDate: "28-Mar-2024",
    noDays: "3",
    totalRate: "₹ 1,200.00",
    noteContent: "Test",
  };

  return (
    <div className="p-4">
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="text-gray-700">View Advertisement</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">View Advertisement</h1>

      {/* Section 1 */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold rounded-t" style={{ backgroundColor: "#2d8f7b" }}>
          <span>View Advertisement</span>
          <span className="cursor-pointer font-bold">—</span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-6 border-b border-gray-100 pb-4">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Advertisement Category</p>
              <p className="text-sm text-gray-700">{data.adCategory || ""}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Advertisement Type</p>
              <p className="text-sm text-gray-700">{data.adType || ""}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Media Type</p>
              <TealVal value={data.mediaType} />
            </div>
          </div>
        </div>
      </div>

      {/* Television Details */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <GridIco />
            <span className="font-semibold text-sm text-gray-800">Television Details</span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <LabeledField label="Television Code / Name" value={data.tvCode} />
            <LabeledField label="Language" value={data.language} />
            <LabeledField label="TRP Rating" value={data.trpRating} />
            <LabeledField label="Duration (in sec)" value={data.duration} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <LabeledField label="From Date" value={data.fromDate} />
            <LabeledField label="To Date" value={data.toDate} />
            <LabeledField label="No. of days" value={data.noDays} />
            <LabeledField label="Total Rate" value={data.totalRate} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() => setShowNote(true)}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Note
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() => router.push("/operational/advertisement/list")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-3xl mx-4">
            <div className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between" style={{ backgroundColor: "#2d8f7b" }}>
              <span>View Note</span>
              <button className="text-white hover:opacity-70 text-lg leading-none" onClick={() => setShowNote(false)}>✕</button>
            </div>
            <div className="p-4">
              <div className="border border-gray-200 rounded min-h-36 p-3 bg-gray-50 text-sm text-gray-700">
                {data.noteContent}
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-gray-200">
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#6c757d" }}
                onClick={() => setShowNote(false)}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
