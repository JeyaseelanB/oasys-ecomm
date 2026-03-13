"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CITY_GRADE_OPTIONS = [
  "CCA - Grade I / CHENNAI",
  "CCA - Grade I / BANGALORE",
  "CCA - Grade I / BHILAI",
  "CCA - Grade II / MUMBAI",
  "CCA - Grade II / DELHI",
  "CCA - Grade III / HYDERABAD",
  "CCA - Grade III / PUNE",
];
const EMPLOYEE_TYPE_OPTIONS = ["Permanent", "Contract", "Temporary", "Probationer"];
const STATUS_OPTIONS = ["Active", "Inactive"];

// Pre-filled from row 1 of the list (CCA - Grade I / CHENNAI, 0.00–20600.00, 360.00)
const INITIAL = {
  payRangeFrom: "0.00",
  payRangeTo: "20600.00",
  allowanceCityGrade: "CCA - Grade I / CHENNAI",
  amount: "360.00",
  employeeType: "Permanent",
  withEffectFrom: "2025-02-02",
  status: "Active",
};

function CalendarIcon() {
  return (
    <svg className="size-4 shrink-0 text-[#2d8f7b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

export default function EditGradeWisePayAllowancePage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.payRangeFrom) e.payRangeFrom = "Required";
    if (!form.payRangeTo) e.payRangeTo = "Required";
    if (!form.allowanceCityGrade) e.allowanceCityGrade = "Required";
    if (!form.amount) e.amount = "Required";
    if (!form.employeeType) e.employeeType = "Required";
    if (!form.withEffectFrom) e.withEffectFrom = "Required";
    return e;
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/grade-wise-pay-allowance/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls = "mt-0.5 text-xs text-red-500";

  const PrefixInput = ({ prefix, value, onChange, error }: {
    prefix: string; value: string; onChange: (v: string) => void; error?: string;
  }) => (
    <div className={`flex items-center overflow-hidden rounded border ${error ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 items-center justify-center border-r border-stroke bg-gray-100 py-2 text-sm font-semibold text-gray-500 dark:border-dark-3 dark:bg-gray-700">
        {prefix}
      </span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
    </div>
  );

  const IconSelect = ({ icon, value, onChange, options, error }: {
    icon: React.ReactNode; value: string; onChange: (v: string) => void; options: string[]; error?: string;
  }) => (
    <div className={`flex items-center overflow-hidden rounded border ${error ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 items-center justify-center border-r border-stroke bg-gray-100 py-2 text-gray-500 dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
        <option value="">Select</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const OrgIcon = () => (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="9" y="1" width="6" height="4" rx="1"/><rect x="1" y="17" width="6" height="4" rx="1"/>
      <rect x="9" y="17" width="6" height="4" rx="1"/><rect x="17" y="17" width="6" height="4" rx="1"/>
      <line x1="12" y1="5" x2="12" y2="10"/><line x1="4" y1="17" x2="4" y2="13"/>
      <line x1="12" y1="17" x2="12" y2="13"/><line x1="20" y1="17" x2="20" y2="13"/>
      <line x1="4" y1="13" x2="20" y2="13"/>
    </svg>
  );
  const ListIcon = () => (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
  const DocIcon = () => (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
    </svg>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Grade Wise Pay Allowance</h2>
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
            <li className="font-medium text-primary">Edit Grade Wise Pay Allowance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Grade Wise Pay Allowance</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Pay Range From <span className="text-red-500">*</span></label>
              <PrefixInput prefix="₹" value={form.payRangeFrom} onChange={v => set("payRangeFrom", v)} error={errors.payRangeFrom} />
              {errors.payRangeFrom && <p className={errCls}>{errors.payRangeFrom}</p>}
            </div>
            <div>
              <label className={labelCls}>Pay Range To <span className="text-red-500">*</span></label>
              <PrefixInput prefix="₹" value={form.payRangeTo} onChange={v => set("payRangeTo", v)} error={errors.payRangeTo} />
              {errors.payRangeTo && <p className={errCls}>{errors.payRangeTo}</p>}
            </div>
            <div>
              <label className={labelCls}>Allowance City Grade <span className="text-red-500">*</span></label>
              <IconSelect icon={<OrgIcon />} value={form.allowanceCityGrade} onChange={v => set("allowanceCityGrade", v)}
                options={CITY_GRADE_OPTIONS} error={errors.allowanceCityGrade} />
              {errors.allowanceCityGrade && <p className={errCls}>{errors.allowanceCityGrade}</p>}
            </div>
            <div>
              <label className={labelCls}>Amount <span className="text-red-500">*</span></label>
              <PrefixInput prefix="₹" value={form.amount} onChange={v => set("amount", v)} error={errors.amount} />
              {errors.amount && <p className={errCls}>{errors.amount}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Employee Type <span className="text-red-500">*</span></label>
              <IconSelect icon={<ListIcon />} value={form.employeeType} onChange={v => set("employeeType", v)}
                options={EMPLOYEE_TYPE_OPTIONS} error={errors.employeeType} />
              {errors.employeeType && <p className={errCls}>{errors.employeeType}</p>}
            </div>
            <div>
              <label className={labelCls}>With Effect From <span className="text-red-500">*</span></label>
              <div className={`flex items-center overflow-hidden rounded border ${errors.withEffectFrom ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
                <input type="date" value={form.withEffectFrom} onChange={e => set("withEffectFrom", e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                <span className="pr-2"><CalendarIcon /></span>
              </div>
              {errors.withEffectFrom && <p className={errCls}>{errors.withEffectFrom}</p>}
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <IconSelect icon={<DocIcon />} value={form.status} onChange={v => set("status", v)} options={STATUS_OPTIONS} />
            </div>
            <div />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/grade-wise-pay-allowance/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.96"/></svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
