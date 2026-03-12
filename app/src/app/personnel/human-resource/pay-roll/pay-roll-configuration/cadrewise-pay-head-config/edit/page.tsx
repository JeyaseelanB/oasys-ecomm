"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CADRE_OPTIONS = ["FINANCE MANAGER", "ACCOUNTANT", "MANAGER", "CLERK", "SUPERVISOR", "SENIOR MANAGER", "OFFICER"];
const HEAD_CODE_OPTIONS = ["255/COMPUTER ADVAN", "101/BASIC PAY", "202/HRA", "303/DA", "404/TA", "505/MEDICAL ALLOW"];
const PERC_HEAD_CODE_OPTIONS = ["255/COMPUTER ADVAN", "101/BASIC PAY", "202/HRA", "303/DA"];
const PAY_ASPECT_OPTIONS = ["Allowance", "Deduction", "Earnings", "Statutory"];

// Pre-filled from the edit screenshot
const INITIAL = {
  cadre: "FINANCE MANAGER",
  headCode: "255/COMPUTER ADVAN",
  percHeadCode: "",
  percentage: "5.0",
  payAspect: "Allowance",
  probationPeriod: "No",
  applicable: "Yes",
  displayOrder: "1",
};

export default function CadrewisePayHeadConfigEditPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.cadre) e.cadre = "Required";
    if (!form.headCode) e.headCode = "Required";
    if (!form.percentage) e.percentage = "Required";
    if (!form.payAspect) e.payAspect = "Required";
    if (!form.probationPeriod) e.probationPeriod = "Required";
    if (!form.applicable) e.applicable = "Required";
    if (!form.displayOrder) e.displayOrder = "Required";
    return e;
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/cadrewise-pay-head-config/list");
  };

  const labelCls = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1";
  const inputCls = "w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const selectCls = inputCls;
  const errCls = "mt-0.5 text-xs text-red-500";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Edit Cadrewise Pay Head Configuration
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
            <li>
              <Link href="/personnel/human-resource/pay-roll/pay-roll-configuration/cadrewise-pay-head-config/list"
                className="text-gray-500 hover:text-primary dark:text-gray-400">
                Cadrewise Pay Head Configuration List
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Cadrewise Pay Head Configuration</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Cadrewise Pay Head Configuration</h3>
          <span className="text-xs text-white/80">* Mandatory Fields</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Cadre <span className="text-red-500">*</span></label>
              <select value={form.cadre} onChange={e => set("cadre", e.target.value)} className={selectCls}>
                <option value="">-- Select --</option>
                {CADRE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.cadre && <p className={errCls}>{errors.cadre}</p>}
            </div>
            <div>
              <label className={labelCls}>Head Code <span className="text-red-500">*</span></label>
              <select value={form.headCode} onChange={e => set("headCode", e.target.value)} className={selectCls}>
                <option value="">-- Select --</option>
                {HEAD_CODE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.headCode && <p className={errCls}>{errors.headCode}</p>}
            </div>
            <div>
              <label className={labelCls}>Percentage Head Code</label>
              <select value={form.percHeadCode} onChange={e => set("percHeadCode", e.target.value)} className={selectCls}>
                <option value="">-- Select --</option>
                {PERC_HEAD_CODE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Percentage <span className="text-red-500">*</span></label>
              <input type="number" step="0.01" value={form.percentage} onChange={e => set("percentage", e.target.value)}
                className={inputCls} />
              {errors.percentage && <p className={errCls}>{errors.percentage}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Pay Aspect <span className="text-red-500">*</span></label>
              <select value={form.payAspect} onChange={e => set("payAspect", e.target.value)} className={selectCls}>
                <option value="">-- Select --</option>
                {PAY_ASPECT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.payAspect && <p className={errCls}>{errors.payAspect}</p>}
            </div>
            <div>
              <label className={labelCls}>Probation Period <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 pt-1">
                {["Yes", "No"].map(v => (
                  <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm text-dark dark:text-white">
                    <input type="radio" name="probationPeriod" value={v}
                      checked={form.probationPeriod === v}
                      onChange={() => set("probationPeriod", v)}
                      className="accent-[#2d8f7b]" />
                    {v}
                  </label>
                ))}
              </div>
              {errors.probationPeriod && <p className={errCls}>{errors.probationPeriod}</p>}
            </div>
            <div>
              <label className={labelCls}>Applicable <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 pt-1">
                {["Yes", "No"].map(v => (
                  <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm text-dark dark:text-white">
                    <input type="radio" name="applicable" value={v}
                      checked={form.applicable === v}
                      onChange={() => set("applicable", v)}
                      className="accent-[#2d8f7b]" />
                    {v}
                  </label>
                ))}
              </div>
              {errors.applicable && <p className={errCls}>{errors.applicable}</p>}
            </div>
            <div>
              <label className={labelCls}>Display Order <span className="text-red-500">*</span></label>
              <input type="number" value={form.displayOrder} onChange={e => set("displayOrder", e.target.value)}
                className={inputCls} />
              {errors.displayOrder && <p className={errCls}>{errors.displayOrder}</p>}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/cadrewise-pay-head-config/list")}
              className="rounded border border-stroke px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-dark-3 dark:text-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:bg-[#267a68]"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
