"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HO_RO_OPTIONS = ["HEAD OFFICE", "REGIONAL OFFICE - NORTH", "REGIONAL OFFICE - SOUTH", "REGIONAL OFFICE - EAST", "REGIONAL OFFICE - WEST"];
const ENTITY_TYPE_OPTIONS = ["Head Office", "Regional Office", "Branch Office", "Production Unit"];
const ENTITY_OPTIONS = ["HEAD OFFICE", "COIMBATORE UNIT", "CHENNAI UNIT", "BANGALORE UNIT"];
const DEPT_OPTIONS = ["ADMIN", "ACCOUNTS", "PRODUCTION", "HR", "IT", "SALES"];
const SECTION_OPTIONS = ["Admin", "Accounts", "HR Admin", "Finance", "Operations"];
const YEAR_OPTIONS = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
const MONTH_OPTIONS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const STATUS_OPTIONS = ["Active", "Inactive"];

// Pre-filled from edit screenshot (row 1: HEAD OFFICE / Head Office / HEAD OFFICE / ADMIN / Admin / 2022 / January / Active)
const INITIAL = {
  hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE",
  department: "ADMIN", section: "Admin", year: "2022", month: "January", status: "Active",
};

const BuildingIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12.01"/>
  </svg>
);
const ListIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
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
const SectionIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M9 3H5a2 2 0 00-2 2v4"/><path d="M9 3h6"/><path d="M15 3h4a2 2 0 012 2v4"/>
    <path d="M3 9v6"/><path d="M21 9v6"/><path d="M3 15v2a2 2 0 002 2h4"/><path d="M21 15v2a2 2 0 01-2 2h-4"/>
    <path d="M9 21h6"/>
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

type FormField = "hoRo" | "entityType" | "entity" | "department" | "section" | "year" | "month" | "status";

export default function EditOTRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<FormField, string>>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: FormField, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.hoRo) e.hoRo = "Required";
    if (!form.entityType) e.entityType = "Required";
    if (!form.entity) e.entity = "Required";
    if (!form.department) e.department = "Required";
    if (!form.year) e.year = "Required";
    if (!form.status) e.status = "Required";
    return e;
  };

  const handleUpdate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/ot-register/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls = "mt-0.5 text-xs text-red-500";

  const IconSelect = ({ icon, field, options }: { icon: React.ReactNode; field: FormField; options: string[] }) => (
    <div className={`flex items-center overflow-hidden rounded border ${errors[field] ? "border-red-400" : "border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] text-gray-500 dark:border-dark-3 dark:bg-gray-700">{icon}</span>
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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit OT Register</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll Configuration</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit OT Register</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">OT Register</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>HO/RO <span className="text-red-500">*</span></label>
              <IconSelect icon={<BuildingIcon />} field="hoRo" options={HO_RO_OPTIONS} />
              {errors.hoRo && <p className={errCls}>{errors.hoRo}</p>}
            </div>
            <div>
              <label className={labelCls}>Entity Type <span className="text-red-500">*</span></label>
              <IconSelect icon={<ListIcon />} field="entityType" options={ENTITY_TYPE_OPTIONS} />
              {errors.entityType && <p className={errCls}>{errors.entityType}</p>}
            </div>
            <div>
              <label className={labelCls}>Entity <span className="text-red-500">*</span></label>
              <IconSelect icon={<BuildingIcon />} field="entity" options={ENTITY_OPTIONS} />
              {errors.entity && <p className={errCls}>{errors.entity}</p>}
            </div>
            <div>
              <label className={labelCls}>Department <span className="text-red-500">*</span></label>
              <IconSelect icon={<OrgIcon />} field="department" options={DEPT_OPTIONS} />
              {errors.department && <p className={errCls}>{errors.department}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Section</label>
              <IconSelect icon={<SectionIcon />} field="section" options={SECTION_OPTIONS} />
              {/* chip tag */}
              {form.section && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <span className="flex items-center gap-1 rounded bg-[#17a2b8] px-2 py-0.5 text-xs font-medium text-white">
                    {form.section}
                    <button onClick={() => set("section", "")} className="ml-0.5 hover:opacity-70">×</button>
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className={labelCls}>Year <span className="text-red-500">*</span></label>
              <IconSelect icon={<CalendarIcon />} field="year" options={YEAR_OPTIONS} />
              {errors.year && <p className={errCls}>{errors.year}</p>}
            </div>
            <div>
              <label className={labelCls}>Month</label>
              <IconSelect icon={<CalendarIcon />} field="month" options={MONTH_OPTIONS} />
              {/* chip tag */}
              {form.month && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <span className="flex items-center gap-1 rounded bg-[#17a2b8] px-2 py-0.5 text-xs font-medium text-white">
                    {form.month}
                    <button onClick={() => set("month", "")} className="ml-0.5 hover:opacity-70">×</button>
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className={labelCls}>Status <span className="text-red-500">*</span></label>
              <IconSelect icon={<DocIcon />} field="status" options={STATUS_OPTIONS} />
              {errors.status && <p className={errCls}>{errors.status}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/human-resource/pay-roll/pay-roll-configuration/ot-register/list")}
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
