"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ALLOWANCE_TYPE_OPTIONS = ["Allowance", "Deduction", "Other"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const DocIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
  </svg>
);

type FormField = "code" | "name" | "nameTamil" | "allowanceType" | "status";

export default function CreateGradewisePayConfigPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<FormField, string>>({
    code: "", name: "", nameTamil: "", allowanceType: "", status: "Active",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: FormField, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.code)          e.code = "Required";
    if (!form.name)          e.name = "Required";
    if (!form.nameTamil)     e.nameTamil = "Required";
    if (!form.allowanceType) e.allowanceType = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-pay-config/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls   = "mt-0.5 text-xs text-red-500";
  const inputCls = (field: string) =>
    `w-full rounded border ${errors[field] ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark px-3 py-2 text-sm text-dark focus:outline-none focus:border-[#2d8f7b] dark:text-white`;

  const IconSelect = ({ field, options }: { field: FormField; options: string[] }) => (
    <div className={`flex items-center overflow-hidden rounded border ${errors[field] ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><DocIcon /></span>
      <select value={form[field]} onChange={e => set(field, e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
        <option value="">Select</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Gradewise Pay Config</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Gradewise Pay Config</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Gradewise Pay Config</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Row 1: Code / Name / Name(In Tamil) / Allowance Type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Code <span className="text-red-500">*</span></label>
              <input value={form.code} onChange={e => set("code", e.target.value)}
                placeholder="Enter code" className={inputCls("code")} />
              {errors.code && <p className={errCls}>{errors.code}</p>}
            </div>
            <div>
              <label className={labelCls}>Name <span className="text-red-500">*</span></label>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="Enter name" className={inputCls("name")} />
              {errors.name && <p className={errCls}>{errors.name}</p>}
            </div>
            <div>
              <label className={labelCls}>Name (In Tamil) <span className="text-red-500">*</span></label>
              <input value={form.nameTamil} onChange={e => set("nameTamil", e.target.value)}
                placeholder="தமிழில் பெயர்" className={inputCls("nameTamil")} />
              {errors.nameTamil && <p className={errCls}>{errors.nameTamil}</p>}
            </div>
            <div>
              <label className={labelCls}>Allowance Type <span className="text-red-500">*</span></label>
              <IconSelect field="allowanceType" options={ALLOWANCE_TYPE_OPTIONS} />
              {errors.allowanceType && <p className={errCls}>{errors.allowanceType}</p>}
            </div>
          </div>

          {/* Row 2: Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Status</label>
              <IconSelect field="status" options={STATUS_OPTIONS} />
            </div>
            <div /><div /><div />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-pay-config/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
