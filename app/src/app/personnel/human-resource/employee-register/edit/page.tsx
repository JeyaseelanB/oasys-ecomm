"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Step = "personal" | "career" | "leave" | "others";

/* ─── Step definitions ─── */
const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  {
    key: "personal",
    label: "Personal Information",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.337 0-10 1.676-10 5v2h20v-2c0-3.324-6.663-5-10-5z" />
      </svg>
    ),
  },
  {
    key: "career",
    label: "Career Profile",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-1 14l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
      </svg>
    ),
  },
  {
    key: "leave",
    label: "Leave Details",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-2 .9-2 2v3.8h1.5C4.99 10.8 6.2 12.01 6.2 13.5S4.99 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
      </svg>
    ),
  },
  {
    key: "others",
    label: "Others",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    ),
  },
];

/* ─── Pre-filled employee data (RAJ MOHAN R) ─── */
const EMP = {
  employeeType: "Permanent",
  salutation: "Mr",
  firstName: "RAJ MOHAN",
  middleName: "",
  lastName: "R",
  firstNameTamil: "ராஜ் மோகன்",
  middleNameTamil: "",
  lastNameTamil: "ரா",
  displayName: "",
  dob: "21-Jul-1981",
  age: "43",
  gender: "Male",
  mobile: "9841605909",
  email: "rrajmohan1981@gmail.com",
  status: "Active",
  joinedDept: "ADMIN",
  joinedDesignation: "JUNIOR ASSISTANT",
  joinedRegion: "HEAD OFFICE",
};

/* ─── Field wrapper ─── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#495057]">
        {label} {required && <span className="text-[#dc3545]">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Input group: icon prefix ─── */
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

/* ─── Shared icons ─── */
const IcoPerson = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.337 0-10 1.676-10 5v2h20v-2c0-3.324-6.663-5-10-5z" />
  </svg>
);
const IcoList = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
  </svg>
);
const IcoPhone = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.08 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const IcoEmail = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IcoDoc = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);
const IcoBriefcase = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
);
const IcoBldg = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M9 21V9" />
  </svg>
);
const IcoCalendar = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M7 1.75a.75.75 0 01.75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 011.5 0v.827c.26.02.506.045.739.076 1.172.158 2.121.49 2.87 1.238.748.749 1.08 1.698 1.238 2.87.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433-.158 1.172-.49 2.121-1.238 2.87-.749.748-1.698 1.08-2.87 1.238-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153-1.172-.158-2.121-.49-2.87-1.238-.748-.749-1.08-1.698-1.238-2.87C3.25 15.294 3.25 13.838 3.25 12v-2.112c0-1.838 0-3.294.153-4.433.158-1.172.49-2.121 1.238-2.87.749-.748 1.698-1.08 2.87-1.238.233-.031.48-.056.739-.076V2.5A.75.75 0 017 1.75z" />
  </svg>
);

export default function EditEmployeeRegisterPage() {
  const [activeStep, setActiveStep] = useState<Step>("personal");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { const r = new FileReader(); r.onload = (ev) => setPhotoPreview(ev.target?.result as string); r.readAsDataURL(f); }
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Edit Employee Service Register
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400"><Link href="/personnel/human-resource/employee-register/list" className="hover:underline">Employee Service Register List</Link></li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Employee Service Register</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* ── Stepper ── */}
        <div className="bg-[#17a2b8] px-4 py-5 sm:px-8">
          <div className="relative flex items-start justify-between">
            {/* connector line */}
            <div className="absolute left-[5%] right-[5%] top-[22px] h-px bg-white/40" />
            {STEPS.map((step) => {
              const isActive = step.key === activeStep;
              return (
                <button
                  key={step.key}
                  onClick={() => setActiveStep(step.key)}
                  className="relative z-10 flex flex-col items-center gap-2"
                >
                  <div
                    className={`flex size-11 items-center justify-center rounded-full border-2 border-white transition-colors ${
                      isActive ? "bg-[#1a6fc4] text-white" : "bg-transparent text-white/80"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className={`hidden text-xs font-medium sm:block ${isActive ? "text-white" : "text-white/75"}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Form body ── */}
        <div className="p-5">
          {activeStep === "personal" && (
            <>
              <p className="mb-4 text-right text-xs text-[#6c757d]">( * Mandatory Fields )</p>
              <div className="flex flex-col gap-5 lg:flex-row">

                {/* ── Fields grid ── */}
                <div className="min-w-0 flex-1">
                  <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Row 1 */}
                    <Field label="Employee Type" required>
                      <IG icon={<IcoList />}>
                        <select defaultValue={EMP.employeeType} className={selectCls}>
                          <option value="">Select</option>
                          <option>Permanent</option>
                          <option>Contract</option>
                          <option>Temporary</option>
                        </select>
                      </IG>
                    </Field>
                    <Field label="Salutation" required>
                      <IG icon={<IcoPerson />}>
                        <select defaultValue={EMP.salutation} className={selectCls}>
                          <option value="">Select</option>
                          <option>Mr</option>
                          <option>Mrs</option>
                          <option>Ms</option>
                          <option>Dr</option>
                        </select>
                      </IG>
                    </Field>
                    <Field label="First Name" required>
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.firstName} className={inputCls} />
                      </IG>
                    </Field>
                    <Field label="Middle Name">
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.middleName} className={inputCls} />
                      </IG>
                    </Field>

                    {/* Row 2 */}
                    <Field label="Last Name" required>
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.lastName} className={inputCls} />
                      </IG>
                    </Field>
                    <Field label="First Name (In Tamil)">
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.firstNameTamil} className={inputCls} />
                      </IG>
                    </Field>
                    <Field label="Middle Name (In Tamil)">
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.middleNameTamil} className={inputCls} />
                      </IG>
                    </Field>
                    <Field label="Last Name (In Tamil)">
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.lastNameTamil} className={inputCls} />
                      </IG>
                    </Field>

                    {/* Row 3 */}
                    <Field label="Employee Display Name">
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.displayName} className={inputCls} />
                      </IG>
                    </Field>
                    <Field label="Date of Birth" required>
                      <div className="flex overflow-hidden rounded border border-[#ced4da] bg-white text-sm">
                        <input defaultValue={EMP.dob} placeholder="dd-MMM-yyyy" className="flex-1 bg-white px-2.5 py-[7px] text-sm text-[#495057] outline-none placeholder:text-[#6c757d]" />
                        <button type="button" className="flex items-center bg-[#17a2b8] px-2.5 text-white">
                          <IcoCalendar />
                        </button>
                      </div>
                    </Field>
                    <Field label="Age">
                      <IG icon={<IcoPerson />}>
                        <input defaultValue={EMP.age} readOnly className={inputCls} />
                      </IG>
                    </Field>
                    <Field label="Gender" required>
                      <IG icon={<IcoPerson />}>
                        <select defaultValue={EMP.gender} className={selectCls}>
                          <option value="">Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </IG>
                    </Field>

                    {/* Row 4 */}
                    <Field label="Mobile Number" required>
                      <div className="flex overflow-hidden rounded border border-[#ced4da] bg-white text-sm">
                        <span className="flex items-center gap-1 border-r border-[#ced4da] bg-[#e9ecef] px-2.5 text-[#6c757d]">
                          <IcoPhone />
                          <span className="text-xs font-medium">+91</span>
                        </span>
                        <input type="tel" defaultValue={EMP.mobile} className={inputCls} />
                      </div>
                    </Field>
                    <Field label="Personal Email" required>
                      <IG icon={<IcoEmail />}>
                        <input type="email" defaultValue={EMP.email} className={inputCls} />
                      </IG>
                    </Field>
                    <Field label="Status" required>
                      <IG icon={<IcoDoc />}>
                        <select defaultValue={EMP.status} className={selectCls}>
                          <option value="">Select</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </IG>
                    </Field>
                    <Field label="Joined Department">
                      <IG icon={<IcoBldg />}>
                        <select defaultValue={EMP.joinedDept} className={selectCls}>
                          <option value="">Select</option>
                          <option>ADMIN</option>
                          <option>FINANCE</option>
                          <option>IT</option>
                          <option>HR</option>
                          <option>PRODUCTION</option>
                        </select>
                      </IG>
                    </Field>

                    {/* Row 5 */}
                    <Field label="Joined Designation">
                      <IG icon={<IcoBriefcase />}>
                        <select defaultValue={EMP.joinedDesignation} className={selectCls}>
                          <option value="">Select</option>
                          <option>JUNIOR ASSISTANT</option>
                          <option>SENIOR ASSISTANT</option>
                          <option>MANAGER</option>
                          <option>SUPERINTENDENT</option>
                        </select>
                      </IG>
                    </Field>
                    <Field label="Joined Region">
                      <IG icon={<IcoBriefcase />}>
                        <select defaultValue={EMP.joinedRegion} className={selectCls}>
                          <option value="">Select</option>
                          <option>HEAD OFFICE</option>
                          <option>REGIONAL OFFICE</option>
                          <option>FIELD OFFICE</option>
                        </select>
                      </IG>
                    </Field>
                  </div>
                </div>

                {/* ── Photo upload ── */}
                <div className="flex shrink-0 flex-col items-center gap-2 lg:w-44">
                  <p className="self-start text-sm text-[#495057]">
                    Upload Photo <span className="text-[#dc3545]">*</span>
                  </p>
                  <div className="flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded border border-[#ced4da] bg-[#f5f5f5]">
                    {photoPreview ? (
                      <img src={photoPreview} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="size-20 text-[#adb5bd]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.337 0-10 1.676-10 5v2h20v-2c0-3.324-6.663-5-10-5z" />
                      </svg>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png" onChange={handlePhoto} className="hidden" />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <polyline points="16,16 12,12 8,16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                    </svg>
                    BROWSE
                  </button>
                  <p className="text-center text-[11px] leading-snug text-[#6c757d]">
                    FILE FORMAT: JPG, PNG<br />SIZE : 100KB
                  </p>
                </div>
              </div>
            </>
          )}

          {(activeStep === "career" || activeStep === "leave" || activeStep === "others") && (
            <div className="py-12 text-center text-[#6c757d]">
              <p className="text-sm">
                {activeStep === "career" ? "Career Profile" : activeStep === "leave" ? "Leave Details" : "Others"} — content goes here.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <Link href="/personnel/human-resource/employee-register/list">
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
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="23,4 23,10 17,10" />
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
