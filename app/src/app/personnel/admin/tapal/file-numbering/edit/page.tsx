"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const labelCls = "mb-1 block text-xs font-medium text-dark dark:text-white";

const InputBox = ({
  label, required = false, icon, children,
}: {
  label: string; required?: boolean; icon: React.ReactNode; children: React.ReactNode;
}) => (
  <div>
    <label className={labelCls}>{label}{required && <span className="ml-0.5 text-red-500">*</span>}</label>
    <div className="flex items-stretch rounded border border-stroke overflow-hidden dark:border-dark-3">
      <span className="flex items-center justify-center bg-gray-100 px-2.5 border-r border-stroke text-gray-500 dark:bg-gray-700 dark:border-dark-3">
        {icon}
      </span>
      {children}
    </div>
  </div>
);

const inputCls  = "flex-1 min-w-0 px-3 py-1.5 text-sm text-dark bg-transparent outline-none dark:text-white";
const selectCls = "flex-1 min-w-0 px-3 py-1.5 text-sm text-dark bg-white outline-none dark:bg-gray-dark dark:text-white";

const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

const DEPARTMENTS = ["ADMIN", "MARKETING", "FINANCE", "EXPORT", "PRODUCTION", "EDP", "PURCHASE"];
const SECTIONS: Record<string, string[]> = {
  ADMIN:      ["EDP", "GENERAL", "ESTABLISHMENT"],
  MARKETING:  ["RETAIL", "EXPORT", "WHOLESALE"],
  FINANCE:    ["ACCOUNTS", "AUDIT", "BUDGET"],
  EXPORT:     ["Export"],
  PRODUCTION: ["WEAVING", "DYEING", "PRINTING"],
  EDP:        ["SOFTWARE", "HARDWARE"],
  PURCHASE:   ["LOCAL", "IMPORT"],
};

/* Pre-populated with existing record (simulating a selected row) */
export default function EditFileNumberingPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fileName:   "InfoTex",
    department: "ADMIN",
    section:    "EDP",
    remarks:    "",
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const sections = form.department ? (SECTIONS[form.department] ?? []) : [];

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit File Numbering</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit File Numbering</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">File Numbering</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* ── Fields ── */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            {/* File Name */}
            <InputBox label="File Name" required icon={<FileIcon />}>
              <input type="text" value={form.fileName} onChange={set("fileName")}
                placeholder="Enter file name" className={inputCls} />
            </InputBox>

            {/* Department */}
            <InputBox label="Department" required icon={<BuildingIcon />}>
              <select value={form.department}
                onChange={e => { setForm(f => ({ ...f, department: e.target.value, section: "" })); }}
                className={selectCls}>
                <option value="">Select</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </InputBox>

            {/* Section */}
            <InputBox label="Section" required icon={<BuildingIcon />}>
              <select value={form.section} onChange={set("section")} className={selectCls}
                disabled={!form.department}>
                <option value="">Select</option>
                {sections.map(s => <option key={s}>{s}</option>)}
              </select>
            </InputBox>
          </div>

          {/* Remarks */}
          <div className="mt-4">
            <label className={labelCls}>Remarks</label>
            <textarea value={form.remarks} onChange={set("remarks")} rows={4}
              placeholder="Enter remarks (optional)"
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:text-white resize-none" />
          </div>

          {/* ── Bottom actions ── */}
          <div className="mt-5 flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/admin/tapal/file-numbering/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.16"/>
              </svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
