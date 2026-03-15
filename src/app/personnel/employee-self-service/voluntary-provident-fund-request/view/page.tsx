"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FORWARD_TO_OPTIONS = [
  { value: "277", label: "277 / VENKATALAKSHMI E (SUPERIN" },
  { value: "300", label: "300 / RAMESH K (MANAGER)" },
  { value: "450", label: "450 / KUMAR S (ASST MANAGER)" },
];

const FORWARD_FOR_OPTIONS = [
  { value: "final_approval", label: "Final Approval" },
  { value: "approval", label: "Approval" },
  { value: "recommendation", label: "Recommendation" },
];

const ForwardIcon = () => (
  <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M15 10l5 5-5 5" /><path d="M4 4v7a4 4 0 004 4h12" />
  </svg>
);

export default function VoluntaryProvidentFundRequestViewPage() {
  const router = useRouter();
  const [showViewNote, setShowViewNote] = useState(false);

  const [forwardTo, setForwardTo] = useState("277");
  const [forwardFor, setForwardFor] = useState("final_approval");

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Voluntary Provident Fund Request
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Voluntary Provident Fund Request</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">Voluntary Provident Fund Request</h3>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Row 1: Employee Name, Requested Amount, Effective Date */}
        <div className="mb-5 grid grid-cols-3 gap-8">
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Employee Name</p>
            <p className="text-sm font-medium text-primary">SANKARANARAYANAN C</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Requested Amount</p>
            <p className="text-sm font-medium text-primary">&#8377; 4,000.00</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Effective Date</p>
            <p className="text-sm font-medium text-primary">01-Jul-2022</p>
          </div>
        </div>

        {/* Row 2: Forward To, Forward For */}
        <div className="mb-5 grid grid-cols-3 gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward To <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)}>
                {FORWARD_TO_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Forward For <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded border border-stroke px-3 py-2 dark:border-dark-3">
              <ForwardIcon />
              <select className="w-full bg-transparent text-sm outline-none dark:text-white" value={forwardFor} onChange={(e) => setForwardFor(e.target.value)}>
                {FORWARD_FOR_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* View Note Button + Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowViewNote(true)}
            className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
            </svg>
            View Note
          </button>
          <button
            onClick={() => router.push("/personnel/employee-self-service/voluntary-provident-fund-request/list")}
            className="flex items-center gap-1.5 rounded bg-[#00bcd4] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showViewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[700px] rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between rounded-t-lg bg-[#00bcd4] px-5 py-3">
              <h3 className="text-base font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-xl font-bold text-white hover:opacity-80">X</button>
            </div>
            <div className="px-5 py-4">
              {/* Note Content */}
              <div className="mb-4 min-h-[200px] rounded border border-gray-300 bg-[#f9f9f9] px-4 py-3">
                <p className="text-sm text-dark">Requesting voluntary provident fund contribution of Rs. 4,000.00 per month effective from 01-Jul-2022.</p>
              </div>

              {/* Created By Info */}
              <div className="mb-4 inline-block rounded border border-gray-300 px-4 py-3">
                <p className="mb-1 text-center text-sm text-gray-500">Created by</p>
                <p className="text-sm font-semibold text-dark">Name : SANKARANARAYANAN</p>
                <p className="text-sm text-gray-500">Designation :SUPERINTENDENT</p>
                <p className="text-sm text-gray-500">Date: 01-Jul-2022</p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowViewNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
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
