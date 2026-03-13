"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── Field wrapper ─── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#212529]">
        {label}
        {required && <span className="ml-0.5 text-[#dc3545]"> *</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Bootstrap-style input group ─── */
function IG({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex overflow-hidden rounded border border-[#ced4da] bg-white text-sm">
      <span className="flex min-w-[36px] items-center justify-center border-r border-[#ced4da] bg-[#e9ecef] text-[#6c757d]">
        {icon}
      </span>
      {children}
    </div>
  );
}

const inputCls = "flex-1 bg-white px-2.5 py-[7px] text-sm text-[#495057] outline-none placeholder:text-[#6c757d]";
const selectCls = "flex-1 bg-white px-2.5 py-[7px] text-sm text-[#495057] outline-none cursor-pointer";

/* ─── Icons ─── */
const PersonIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.337 0-10 1.676-10 5v1h20v-1c0-3.324-6.663-5-10-5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v11z" />
  </svg>
);

const BadgeIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
);

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" />
  </svg>
);

const HierarchyIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 15v4h16v-4H4zm7-13H4v4h7V2zm9 0h-7v4h7V2zM4 9v4h7V9H4zm9 0v4h7V9h-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DESIGNATIONS = ["JUNIOR ASSISTANT", "SENIOR ASSISTANT", "SUPERINTENDENT", "MANAGER", "SENIOR MANAGER", "REGIONAL MANAGER", "SENIOR REGIONAL MANAGER", "ENGINEER", "SYSTEM ANALYST", "ACCOUNTANT"];
const DEPARTMENTS = ["ADMIN", "FINANCE", "IT", "HR", "MARKETING", "PRODUCTION", "QUALITY", "STORES", "TRANSPORT", "TECHNICAL", "LEGAL", "AUDIT", "MEDICAL", "PURCHASE", "SECURITY"];
const SECTIONS = ["GENERAL", "ACCOUNTS", "STORES", "PRODUCTION", "MARKETING", "HR", "IT", "LEGAL", "AUDIT", "PURCHASE"];
const REGIONS = ["HEAD OFFICE", "CHENNAI", "MADURAI", "COIMBATORE", "THANJAVUR", "HYDERABAD", "NEW DELHI", "KOLKATA", "BANGALORE", "MUMBAI"];

export default function CreateRetiredEmployeeRegisterPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", mobileNumber: "", pfNumber: "",
    designation: "", department: "", section: "", region: "",
    dateOfRetirement: "", basicPay: "", da: "", hra: "", cca: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Retired Employee Register
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Retired Employee Register</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Retired Employee Register</span>
          <span className="text-xs text-white/90">( * Mandatory Fields)</span>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Row 1 */}
            <Field label="First Name" required>
              <IG icon={<PersonIcon />}>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={set("firstName")}
                  className={inputCls}
                />
              </IG>
            </Field>

            <Field label="Last Name" required>
              <IG icon={<PersonIcon />}>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={set("lastName")}
                  className={inputCls}
                />
              </IG>
            </Field>

            <Field label="Mobile Number" required>
              <IG icon={<PhoneIcon />}>
                <input
                  type="text"
                  value={form.mobileNumber}
                  onChange={set("mobileNumber")}
                  className={inputCls}
                  maxLength={10}
                />
              </IG>
            </Field>

            <Field label="PF Number" required>
              <IG icon={<span className="text-sm font-bold">#</span>}>
                <input
                  type="text"
                  value={form.pfNumber}
                  onChange={set("pfNumber")}
                  className={inputCls}
                />
              </IG>
            </Field>

            {/* Row 2 */}
            <Field label="Designation" required>
              <IG icon={<BadgeIcon />}>
                <select value={form.designation} onChange={set("designation")} className={selectCls}>
                  <option value="">Select</option>
                  {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </IG>
            </Field>

            <Field label="Department" required>
              <IG icon={<BuildingIcon />}>
                <select value={form.department} onChange={set("department")} className={selectCls}>
                  <option value="">Select</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </IG>
            </Field>

            <Field label="Section" required>
              <IG icon={<GridIcon />}>
                <select value={form.section} onChange={set("section")} className={selectCls}>
                  <option value="">Select</option>
                  {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </IG>
            </Field>

            <Field label="Region" required>
              <IG icon={<HierarchyIcon />}>
                <select value={form.region} onChange={set("region")} className={selectCls}>
                  <option value="">Select</option>
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </IG>
            </Field>

            {/* Row 3 */}
            <Field label="Date of Retirement" required>
              <div className="flex overflow-hidden rounded border border-[#ced4da] bg-white text-sm">
                <input
                  type="text"
                  placeholder="dd-MMM-yyyy"
                  value={form.dateOfRetirement}
                  onChange={set("dateOfRetirement")}
                  className="flex-1 bg-white px-2.5 py-[7px] text-sm text-[#495057] outline-none placeholder:text-[#6c757d]"
                />
                <button
                  type="button"
                  className="flex items-center justify-center bg-[#17a2b8] px-2.5 text-white"
                >
                  <CalendarIcon />
                </button>
              </div>
            </Field>

            <Field label="Basic Pay" required>
              <IG icon={<span className="text-sm font-semibold">&#8377;</span>}>
                <input
                  type="number"
                  value={form.basicPay}
                  onChange={set("basicPay")}
                  className={inputCls}
                  min={0}
                />
              </IG>
            </Field>

            <Field label="DA" required>
              <IG icon={<span className="text-sm font-semibold">&#8377;</span>}>
                <input
                  type="number"
                  value={form.da}
                  onChange={set("da")}
                  className={inputCls}
                  min={0}
                />
              </IG>
            </Field>

            <Field label="HRA" required>
              <IG icon={<span className="text-sm font-semibold">&#8377;</span>}>
                <input
                  type="number"
                  value={form.hra}
                  onChange={set("hra")}
                  className={inputCls}
                  min={0}
                />
              </IG>
            </Field>

            {/* Row 4 */}
            <Field label="CCA" required>
              <IG icon={<span className="text-sm font-semibold">&#8377;</span>}>
                <input
                  type="number"
                  value={form.cca}
                  onChange={set("cca")}
                  className={inputCls}
                  min={0}
                />
              </IG>
            </Field>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <Link href="/personnel/human-resource/retired-employee-register/list">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded bg-[#343a40] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
            </Link>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20,6 9,17 4,12" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
