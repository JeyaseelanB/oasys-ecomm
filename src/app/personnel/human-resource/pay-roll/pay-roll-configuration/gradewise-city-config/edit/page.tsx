"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GRADE_OPTIONS = [
  "Grade I", "Grade I / HRA", "Grade I / DA", "Grade I / TA",
  "Grade II", "Grade II / HRA", "Grade II / DA", "Grade II / TA",
  "Grade III", "Grade III / HRA", "GradeI", "GradeIB", "GradeIB / HRA",
];
const CITY_OPTIONS = [
  "CHENNAI", "COIMBATORE", "MADURAI", "TRICHY", "SALEM", "TIRUPPUR",
  "TUTICORIN", "SRIKAKULAM", "KANCHIPURAM", "KAROLBAGH", "DELHI",
  "MUMBAI", "KOLKATA", "BANGALORE", "HYDERABAD",
];

const INITIAL = {
  grade: "Grade II / HRA",
  city:  "TUTICORIN",
};

const GradeIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

type FormField = "grade" | "city";

export default function EditGradewiseCityConfigPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<FormField, string>>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: FormField, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.grade) e.grade = "Required";
    if (!form.city)  e.city  = "Required";
    return e;
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-city-config/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls   = "mt-0.5 text-xs text-red-500";

  const IconSelect = ({
    icon, field, options,
  }: { icon: React.ReactNode; field: FormField; options: string[] }) => (
    <div className={`flex items-center overflow-hidden rounded border ${errors[field] ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Gradewise City Config</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Gradewise City Config</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Gradewise City Config</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Fields row: Grade / City */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Grade <span className="text-red-500">*</span></label>
              <IconSelect icon={<GradeIcon />} field="grade" options={GRADE_OPTIONS} />
              {errors.grade && <p className={errCls}>{errors.grade}</p>}
            </div>
            <div>
              <label className={labelCls}>City <span className="text-red-500">*</span></label>
              <IconSelect icon={<LocationIcon />} field="city" options={CITY_OPTIONS} />
              {errors.city && <p className={errCls}>{errors.city}</p>}
            </div>
            <div /><div />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-city-config/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button onClick={handleUpdate}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.96"/></svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
