"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VIEW_DATA = {
  schemeTypeCodeName: "OAP / Old Age Pension Scheme",
  planTypeCodeName: "Pongal / test",
  from: "25-Feb-2025",
  to: "27-Feb-2025",
};

const DISTRICT_TALUK_DATA = [
  { id: 1, district: "SALEM", taluk: "SALEM", sarees: 1, dhoties: 1 },
  { id: 2, district: "SALEM", taluk: "SALEM WEST", sarees: 1, dhoties: 1 },
  { id: 3, district: "SALEM", taluk: "SALEM SOUTH", sarees: 1, dhoties: 1 },
  { id: 4, district: "SALEM", taluk: "YERCAUD", sarees: 1, dhoties: 1 },
  { id: 5, district: "SALEM", taluk: "VALAPADY", sarees: 1, dhoties: 1 },
  { id: 6, district: "SALEM", taluk: "ATTUR", sarees: 1, dhoties: 1 },
];

export default function ViewDistrictTalukWiseRequirementPage() {
  const router = useRouter();
  const basePath = "/operational/production-planning/government-scheme/district-taluk-wise-requirement";

  const [showViewNote, setShowViewNote] = useState(false);

  const totalSarees = DISTRICT_TALUK_DATA.reduce((s, d) => s + d.sarees, 0);
  const totalDhoties = DISTRICT_TALUK_DATA.reduce((s, d) => s + d.dhoties, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View District / Taluk Wise Requirement</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Production Planning</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Government Scheme</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View District / Taluk Wise Requirement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">District / Taluk Wise Requirements</h3>
          <button className="text-white/80 hover:text-white"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /></svg></button>
        </div>

        <div className="p-5">
          {/* Read-only fields */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Scheme Type Code / Name</span>
              <span className="text-sm font-medium text-[#17a2b8]">{VIEW_DATA.schemeTypeCodeName}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Plan Type Code / Name</span>
              <span className="text-sm font-medium text-[#17a2b8]">{VIEW_DATA.planTypeCodeName}</span>
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">From</span>
              <span className="text-sm font-medium text-[#17a2b8]">{VIEW_DATA.from}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400">To</span>
              <span className="text-sm font-medium text-[#17a2b8]">{VIEW_DATA.to}</span>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* District / Taluk wise Requirement Details */}
          <div className="mt-5 mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">District / Taluk wise Requirement Details</h4>
            <span className="text-xs text-gray-500">(Values in Quantity / Meters)</span>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Name Of Districts</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Taluk Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Sarees</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center align-middle font-semibold">Dhoties</th>
                </tr>
              </thead>
              <tbody>
                {DISTRICT_TALUK_DATA.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.district}</td>
                    <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.taluk}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-[#17a2b8] font-medium dark:border-dark-3">{row.sarees}</td>
                    <td className="border border-stroke px-2 py-2 text-center align-middle text-[#17a2b8] font-medium dark:border-dark-3">{row.dhoties}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-2 py-2 text-center font-semibold text-[#17a2b8] dark:border-dark-3">{totalSarees}</td>
                  <td className="border border-stroke px-2 py-2 text-center font-semibold text-[#17a2b8] dark:border-dark-3">{totalDhoties}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowViewNote(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              View Note
            </button>
            <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" /></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ===== VIEW NOTE MODAL ===== */}
      {showViewNote && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Rich text toolbar (decorative/read-only) */}
              <div className="mb-0 rounded-t border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-[#f9fafb] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm font-bold">B</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm italic">I</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm underline">U</span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm line-through">abc</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sup>2</sup></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">T</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">T<sub>-</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>1</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">T</span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" /></svg></button>
                </div>
              </div>
              {/* Note content - empty as per screenshot */}
              <div className="mb-4 min-h-[120px] rounded-b border border-t-0 border-stroke p-3 dark:border-dark-3">
                <p className="text-sm text-dark dark:text-white"></p>
              </div>

              {/* Pagination dots */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-2.5 rounded-full bg-[#17a2b8]"></span>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6" /></svg></button>
                <button className="text-gray-400 hover:text-gray-600"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6" /></svg></button>
              </div>

              {/* Created By and Final Approved By side by side */}
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded border border-[#e8a87c] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p>Name : LAKSHMI PRABHA S</p>
                    <p>Designation : JUNIOR ASSISTANT</p>
                    <p>Date : 25-02-2025</p>
                  </div>
                </div>
                <div className="rounded border border-[#e8a87c] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Final Approved By</h5>
                  <div className="space-y-1.5 text-sm text-dark dark:text-white">
                    <p>Name : USHA M</p>
                    <p>Designation : JUNIOR ASSISTANT</p>
                    <p>Date : 25-02-2025</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button onClick={() => setShowViewNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
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
