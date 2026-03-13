"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* Read-only field — label + teal value */
const VF = ({ label, value }: { label: string; value: string }) => (
  <div className="py-2">
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-0.5 text-sm font-medium text-[#17a2b8]">{value || "—"}</p>
  </div>
);

const RECORD = {
  department:  "ADMIN",
  section:     "EDP",
  fileNumber:  "3185",
  fileName:    "InfoTex",
  date:        "30-Jul-2024",
  remarks:     "",
};

export default function ViewFileNumberingPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View File Numbering</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View File Numbering</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">File Numbering</h3>
        </div>

        <div className="p-5">
          {/* Row 1: 4 fields */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 border-b border-stroke dark:border-dark-3 pb-2">
            <VF label="Department"  value={RECORD.department} />
            <VF label="Section"     value={RECORD.section} />
            <VF label="File Number" value={RECORD.fileNumber} />
            <VF label="File Name"   value={RECORD.fileName} />
          </div>

          {/* Row 2: 2 fields */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 mt-1">
            <VF label="Date"    value={RECORD.date} />
            <VF label="Remarks" value={RECORD.remarks} />
          </div>

          {/* ── Back button ── */}
          <div className="mt-5 flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/admin/tapal/file-numbering/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
