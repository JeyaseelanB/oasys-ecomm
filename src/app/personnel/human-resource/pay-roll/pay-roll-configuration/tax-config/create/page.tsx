"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATE_OPTIONS = ["PUDUCHERRY", "TAMIL NADU", "KERALA", "KARNATAKA", "ANDHRA PRADESH", "TELANGANA", "MAHARASHTRA", "GUJARAT", "RAJASTHAN", "DELHI"];
const FINANCIAL_YEAR_OPTIONS = ["2018 - 2019", "2019 - 2020", "2020 - 2021", "2021 - 2022", "2022 - 2023", "2023 - 2024", "2024 - 2025"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const LocationIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const CalendarIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const DocIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
  </svg>
);

type FormField = "state" | "financialYear" | "taxableStartValue" | "taxableEndValue" | "totalTax" | "status";

export default function CreateTaxConfigPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<FormField, string>>({
    state: "", financialYear: "",
    taxableStartValue: "0.00", taxableEndValue: "0.00",
    totalTax: "0.00", status: "Active",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: FormField, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.state) e.state = "Required";
    if (!form.financialYear) e.financialYear = "Required";
    if (!form.taxableStartValue || Number(form.taxableStartValue) < 0) e.taxableStartValue = "Required";
    if (!form.taxableEndValue || Number(form.taxableEndValue) < 0) e.taxableEndValue = "Required";
    if (!form.totalTax || Number(form.totalTax) < 0) e.totalTax = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/tax-config/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls = "mt-0.5 text-xs text-red-500";

  const IconSelect = ({ icon, field, options }: { icon: React.ReactNode; field: FormField; options: string[] }) => (
    <div className={`flex items-center overflow-hidden rounded border ${errors[field] ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      <select value={form[field]} onChange={e => set(field, e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
        <option value="">Select</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const RupeeInput = ({ field }: { field: FormField }) => (
    <div className={`flex items-center overflow-hidden rounded border ${errors[field] ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 items-center justify-center border-r border-stroke bg-gray-100 py-2 text-sm font-semibold text-gray-500 dark:border-dark-3 dark:bg-gray-700">₹</span>
      <input type="number" step="0.01" min="0" value={form[field]} onChange={e => set(field, e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Tax Config</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Tax Config</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tax Config</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Row 1: State / Financial Year / Taxable Start Value / Taxable End Value */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>State <span className="text-red-500">*</span></label>
              <IconSelect icon={<LocationIcon />} field="state" options={STATE_OPTIONS} />
              {errors.state && <p className={errCls}>{errors.state}</p>}
            </div>
            <div>
              <label className={labelCls}>Financial Year <span className="text-red-500">*</span></label>
              <IconSelect icon={<CalendarIcon />} field="financialYear" options={FINANCIAL_YEAR_OPTIONS} />
              {errors.financialYear && <p className={errCls}>{errors.financialYear}</p>}
            </div>
            <div>
              <label className={labelCls}>Taxable Start Value <span className="text-red-500">*</span></label>
              <RupeeInput field="taxableStartValue" />
              {errors.taxableStartValue && <p className={errCls}>{errors.taxableStartValue}</p>}
            </div>
            <div>
              <label className={labelCls}>Taxable End Value <span className="text-red-500">*</span></label>
              <RupeeInput field="taxableEndValue" />
              {errors.taxableEndValue && <p className={errCls}>{errors.taxableEndValue}</p>}
            </div>
          </div>

          {/* Row 2: Total Tax (Per Month) / Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Total Tax (Per Month) <span className="text-red-500">*</span></label>
              <RupeeInput field="totalTax" />
              {errors.totalTax && <p className={errCls}>{errors.totalTax}</p>}
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <IconSelect icon={<DocIcon />} field="status" options={STATUS_OPTIONS} />
            </div>
            <div /><div />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/tax-config/list")}
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
