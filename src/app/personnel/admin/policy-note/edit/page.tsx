"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const GOV_REF_OPTIONS  = ["11035","11034","11023","11020","11091","11090","11089","11079","11006","11075"];
const PERIOD_OPTIONS   = ["2025-2026","2024-2025","2023-2024","2022-2023","2021-2022","2020-2021","2019-2020","2018-2019"];
const DEPT_OPTIONS     = ["ADMIN","MARKETING","TECHNICAL","FINANCE","HR","OPERATIONS"];
const SECTION_OPTIONS  = ["Admin","Finance","Marketing","Technical","HR","Operations"];

const INITIAL = {
  govRefNo: "11035", govRefDate: "2025-04-18", period: "2025-2026",
  dueDate: "2025-04-18", department: "ADMIN", section: "",
  policyDesc: "cvcvc", uploadFileName: "cooptext_icon.png",
};

const CalIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const HashIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const OrgIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="8" y="2" width="8" height="4" rx="1"/><rect x="1" y="16" width="8" height="4" rx="1"/>
    <rect x="15" y="16" width="8" height="4" rx="1"/>
    <path d="M4 20v-4"/><path d="M20 20v-4"/><path d="M12 6v4M4 16v-4h16v4"/>
  </svg>
);

type FormField = "govRefNo"|"govRefDate"|"period"|"dueDate"|"department"|"section"|"policyDesc"|"uploadFileName";

export default function EditPolicyNotePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Record<FormField, string>>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: FormField, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n={...e}; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.govRefNo)   e.govRefNo   = "Required";
    if (!form.govRefDate) e.govRefDate = "Required";
    if (!form.period)     e.period     = "Required";
    if (!form.dueDate)    e.dueDate    = "Required";
    if (!form.department) e.department = "Required";
    if (!form.section)    e.section    = "Required";
    return e;
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/admin/policy-note/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls   = "mt-0.5 text-xs text-red-500";

  const SelectWithIcon = ({ icon, field, options }: { icon: React.ReactNode; field: FormField; options: string[] }) => (
    <div className={`flex items-center overflow-hidden rounded border ${errors[field]?"border-red-400":"border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      <select value={form[field]} onChange={e=>set(field,e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
        <option value="">Select</option>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Policy Note</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Policy Note</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Policy Note</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="space-y-4 p-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Government Reference No. <span className="text-red-500">*</span></label>
              <SelectWithIcon icon={<HashIcon />} field="govRefNo" options={GOV_REF_OPTIONS} />
              {errors.govRefNo && <p className={errCls}>{errors.govRefNo}</p>}
            </div>
            <div>
              <label className={labelCls}>Government Reference Date <span className="text-red-500">*</span></label>
              <div className={`flex items-center overflow-hidden rounded border ${errors.govRefDate?"border-red-400":"border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
                <input type="date" value={form.govRefDate} onChange={e=>set("govRefDate",e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                <span className="flex w-9 shrink-0 items-center justify-center border-l border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
              </div>
              {errors.govRefDate && <p className={errCls}>{errors.govRefDate}</p>}
            </div>
            <div>
              <label className={labelCls}>Period <span className="text-red-500">*</span></label>
              <SelectWithIcon icon={<CalIcon />} field="period" options={PERIOD_OPTIONS} />
              {errors.period && <p className={errCls}>{errors.period}</p>}
            </div>
            <div>
              <label className={labelCls}>Due Date <span className="text-red-500">*</span></label>
              <div className={`flex items-center overflow-hidden rounded border ${errors.dueDate?"border-red-400":"border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
                <input type="date" value={form.dueDate} onChange={e=>set("dueDate",e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                <span className="flex w-9 shrink-0 items-center justify-center border-l border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
              </div>
              {errors.dueDate && <p className={errCls}>{errors.dueDate}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Department <span className="text-red-500">*</span></label>
              <SelectWithIcon icon={<OrgIcon />} field="department" options={DEPT_OPTIONS} />
              {errors.department && <p className={errCls}>{errors.department}</p>}
            </div>
            <div>
              <label className={labelCls}>Section <span className="text-red-500">*</span></label>
              <SelectWithIcon icon={<OrgIcon />} field="section" options={SECTION_OPTIONS} />
              {errors.section && <p className={errCls}>{errors.section}</p>}
            </div>
            <div /><div />
          </div>

          {/* Policy Description */}
          <div>
            <label className={labelCls}>Policy Description <span className="text-red-500">*</span></label>
            <div className="rounded border border-stroke dark:border-dark-3">
              <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800">
                {["B","I","U","abc","x₂","x²","T↑","T↑","H1","T↓","T↑","I"].map((t,i)=>(
                  <button key={i} type="button" className="rounded px-1.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{t}</button>
                ))}
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {["≡","≡","←→","←→","←","→"].map((t,i)=>(
                  <button key={`a${i}`} type="button" className="rounded px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{t}</button>
                ))}
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {["↩","↪","=","▦","🔗","✂","📋","🖨","💾"].map((t,i)=>(
                  <button key={`b${i}`} type="button" className="rounded px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{t}</button>
                ))}
              </div>
              <div contentEditable suppressContentEditableWarning
                className="min-h-[160px] px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                {form.policyDesc}
              </div>
            </div>
          </div>

          {/* Upload Document */}
          <div>
            <label className={labelCls}>Upload Document <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <input type="text" readOnly value={form.uploadFileName}
                className="w-56 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white" />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                Upload
              </button>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.xlsx,.png,.jpg,.gif" className="hidden"
                onChange={e => { if (e.target.files?.[0]) set("uploadFileName", e.target.files[0].name); }} />
            </div>
            <p className="mt-1 text-[11px] text-gray-400">File format:pdf,doc,xlsx,png,jpg,gif. File size should be less than 100 Mb</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/admin/policy-note/list")}
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
