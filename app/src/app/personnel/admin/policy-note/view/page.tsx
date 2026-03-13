"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  govRefNo:    "11035",
  govRefDate:  "18-Apr-2025",
  period:      "2025-2026",
  dueDate:     "18-Apr-2025",
  department:  "ADMIN",
  section:     "Admin",
  status:      "INITIATED",
  policyDesc:  "cvcvc",
};

const Field = ({ label, value, teal = true }: { label: string; value: string; teal?: boolean }) => (
  <div className="pb-4">
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className={`pt-0.5 text-sm font-medium ${teal ? "text-[#2d8f7b] dark:text-[#5bc4a8]" : "text-dark dark:text-white"}`}>
      {value || "—"}
    </p>
  </div>
);

export default function ViewPolicyNotePage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Policy Note</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Policy Note</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Policy Note</h3>
        </div>

        <div className="p-5">
          {/* Row 1: Gov Ref No / Gov Ref Date / Period / Due Date */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <Field label="Government Reference No."   value={RECORD.govRefNo} />
            <Field label="Government Reference Date"  value={RECORD.govRefDate} />
            <Field label="Period"                     value={RECORD.period} />
            <Field label="Due Date"                   value={RECORD.dueDate} />
          </div>

          {/* Row 2: Department / Section / Status */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            <Field label="Department" value={RECORD.department} />
            <Field label="Section"    value={RECORD.section} />
            <Field label="Status"     value={RECORD.status} />
            <div />
          </div>

          {/* Policy Description */}
          <div className="mb-4">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Policy Description</p>
            <div className="rounded border border-stroke dark:border-dark-3">
              {/* Toolbar (read-only appearance) */}
              <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800 opacity-60 pointer-events-none">
                {["B","I","U","abc","x₂","x²","T↑","H1","T↓","↩","↪","≡","≡","🔗","✂","🖨"].map((t,i)=>(
                  <span key={i} className="rounded px-1.5 py-0.5 text-xs font-medium text-gray-500">{t}</span>
                ))}
              </div>
              <div className="min-h-[120px] px-3 py-2 text-sm text-dark dark:text-white">
                {RECORD.policyDesc}
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="flex justify-end">
            <button onClick={() => router.push("/personnel/admin/policy-note/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
