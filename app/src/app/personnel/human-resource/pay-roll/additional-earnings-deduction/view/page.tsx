"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUS_STYLE: Record<string, string> = {
  FINAL_APPROVED: "bg-[#28a745] text-white",
  APPROVED:       "bg-[#28a745] text-white",
  REJECTED:       "bg-[#dc3545] text-white",
  INPROGRESS:     "bg-[#6c757d] text-white",
};

const RECORD = {
  type:       "BFBF",
  payAspect:  "Allowance",
  hoRo:       "HEAD OFFICE",
  entityType: "Head Office",
  entity:     "HEAD OFFICE",
  department: "ADMIN",
  section:    "Internal Audit Wing",
  year:       "2026",
  month:      "1",
  skipApproval: "No",
  forwardTo:  "HR MANAGER",
  forwardFor: "Approval",
  status:     "FINAL_APPROVED" as const,
};

const NOTES = [
  { by: "SANKARANARAYANAN", designation: "SUPERINTENDENT", date: "04-Mar-2025", text: "Additional allowance submitted for review." },
  { by: "HR MANAGER",       designation: "MANAGER",        date: "05-Mar-2025", text: "Verified records and forwarded for final approval." },
];

const ROWS = [
  { no:1, hoRo:"HEAD OFFICE", dept:"ADMIN", section:"Internal Audit Wing", employee:"SANKARANARAYANAN", amount:"5000.00", description:"Quarterly Allowance" },
  { no:2, hoRo:"HEAD OFFICE", dept:"ADMIN", section:"Internal Audit Wing", employee:"ARULRAJAN",        amount:"4500.00", description:"Quarterly Allowance" },
  { no:3, hoRo:"HEAD OFFICE", dept:"ADMIN", section:"Internal Audit Wing", employee:"MURUGESAN",        amount:"4200.00", description:"Quarterly Allowance" },
];

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#2d8f7b]">{value || "—"}</p>
  </div>
);

export default function ViewEADPage() {
  const router = useRouter();
  const [showNote, setShowNote] = useState(false);
  const [noteIdx,  setNoteIdx]  = useState(0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Additional Earnings / Deduction</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Additional Earnings / Deduction</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Additional Earnings / Deduction</h3>
          <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[RECORD.status]}`}>
            {RECORD.status.replace("_", " ")}
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 border-b border-stroke pb-5 sm:grid-cols-3 lg:grid-cols-4 dark:border-dark-3">
            <Field label="Type"         value={RECORD.type} />
            <Field label="Pay Aspect"   value={RECORD.payAspect} />
            <Field label="HO/RO"        value={RECORD.hoRo} />
            <Field label="Entity Type"  value={RECORD.entityType} />
            <Field label="Entity"       value={RECORD.entity} />
            <Field label="Department"   value={RECORD.department} />
            <Field label="Section"      value={RECORD.section} />
            <Field label="Year"         value={RECORD.year} />
            <Field label="Month"        value={RECORD.month} />
            <Field label="Skip Approval" value={RECORD.skipApproval} />
            <Field label="Forward To"   value={RECORD.forwardTo} />
            <Field label="Forward For"  value={RECORD.forwardFor} />
          </div>

          {/* Employee table */}
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  {["#","HO/RO","Department","Section","Employee","Amount (₹)","Description"].map((h, i) => (
                    <th key={h} className={`px-3 py-2.5 text-xs font-semibold text-white ${i > 0 ? "border-l border-[#3aa88f]" : ""} ${i >= 5 ? "text-right" : "text-center"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.no} className={`border-b border-stroke dark:border-dark-3 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-600 dark:text-gray-400">{r.no}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.hoRo}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.dept}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.section}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.employee}</td>
                    <td className="px-3 py-2 text-right text-xs text-gray-700 dark:text-gray-300">{r.amount}</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{r.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setShowNote(true)} className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/personnel/human-resource/pay-roll/additional-earnings-deduction/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-3 min-h-[80px] rounded border border-stroke bg-gray-50 p-3 text-sm text-gray-700 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-300">
                {NOTES[noteIdx].text}
              </div>
              <div className="rounded border border-orange-300 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Created by</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setNoteIdx(i => Math.max(0, i - 1))} disabled={noteIdx === 0}
                      className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark">‹</button>
                    <button onClick={() => setNoteIdx(i => Math.min(NOTES.length - 1, i + 1))} disabled={noteIdx === NOTES.length - 1}
                      className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark">›</button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-dark dark:text-white">Name : {NOTES[noteIdx].by}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Designation : {NOTES[noteIdx].designation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Date : {NOTES[noteIdx].date}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setShowNote(false)} className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
