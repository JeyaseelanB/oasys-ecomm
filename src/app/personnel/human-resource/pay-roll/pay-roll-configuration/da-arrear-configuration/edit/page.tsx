"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CalendarIcon() {
  return (
    <svg className="size-4 shrink-0 text-[#2d8f7b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

// Pre-filled from edit screenshot (row 1: 5.0 / 4 / 24-Jul-2024 / 24-Jul-2024)
const INITIAL = {
  percentage: "5.0",
  numberOfInstallments: "4",
  withEffectFrom: "2024-07-24",
  toBeApplied: "2024-07-24",
};

export default function EditDAArrearConfigPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.percentage) e.percentage = "Required";
    if (!form.numberOfInstallments) e.numberOfInstallments = "Required";
    if (!form.withEffectFrom) e.withEffectFrom = "Required";
    if (!form.toBeApplied) e.toBeApplied = "Required";
    return e;
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls = "mt-0.5 text-xs text-red-500";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Edit DA Arrear Configuration
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit DA Arrear Configuration</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">DA Arrear Configuration</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Percentage */}
            <div>
              <label className={labelCls}>
                Percentage <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center rounded border ${errors.percentage ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark overflow-hidden`}>
                <span className="flex items-center justify-center w-9 h-full border-r border-stroke bg-gray-100 px-2 py-2 dark:border-dark-3 dark:bg-gray-700">
                  <span className="text-sm font-bold text-gray-500">%</span>
                </span>
                <input
                  type="number"
                  step="0.1"
                  value={form.percentage}
                  onChange={e => set("percentage", e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white"
                />
              </div>
              {errors.percentage && <p className={errCls}>{errors.percentage}</p>}
            </div>

            {/* Number of Installments */}
            <div>
              <label className={labelCls}>
                Number of Installment(s) <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center rounded border ${errors.numberOfInstallments ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark overflow-hidden`}>
                <span className="flex items-center justify-center w-9 h-full border-r border-stroke bg-gray-100 px-2 py-2 dark:border-dark-3 dark:bg-gray-700">
                  <span className="text-sm font-bold text-gray-500">#</span>
                </span>
                <input
                  type="number"
                  min="1"
                  value={form.numberOfInstallments}
                  onChange={e => set("numberOfInstallments", e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white"
                />
              </div>
              {errors.numberOfInstallments && <p className={errCls}>{errors.numberOfInstallments}</p>}
            </div>

            {/* With Effect From */}
            <div>
              <label className={labelCls}>
                With Effect From <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center rounded border ${errors.withEffectFrom ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark overflow-hidden`}>
                <input
                  type="date"
                  value={form.withEffectFrom}
                  onChange={e => set("withEffectFrom", e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white"
                />
                <span className="pr-2"><CalendarIcon /></span>
              </div>
              {errors.withEffectFrom && <p className={errCls}>{errors.withEffectFrom}</p>}
            </div>

            {/* To be Applied */}
            <div>
              <label className={labelCls}>
                To be Applied <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center rounded border ${errors.toBeApplied ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark overflow-hidden`}>
                <input
                  type="date"
                  value={form.toBeApplied}
                  onChange={e => set("toBeApplied", e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white"
                />
                <span className="pr-2"><CalendarIcon /></span>
              </div>
              {errors.toBeApplied && <p className={errCls}>{errors.toBeApplied}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.96"/>
              </svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
