"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STEPS = [
  "Receive Requisition Letter",
  "Supporting Document Collection",
  "Field Verification",
  "Head Office Approval",
  "Board Approval",
  "Society Code Allotment",
];

const SOCIETY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "muru", label: "muru" },
  { value: "abc-society", label: "abc society" },
  { value: "tedsaddd", label: "tedsaddd" },
];

const SOCIETY_INFO: Record<string, { regNumber: string; address: string; regDate: string; productionDate: string }> = {
  "muru": {
    regNumber: "4466464",
    address: "sdfsf, sfsf, SALEM, SALEM, TAMIL NADU - 436464",
    regDate: "21-Feb-2025",
    productionDate: "21-Feb-2025",
  },
  "abc-society": {
    regNumber: "1234",
    address: "def street, asdf nagar, SALEM, OMALUR, SALEM, TAMIL NADU - 600012",
    regDate: "01-Apr-2022",
    productionDate: "01-Jun-2022",
  },
  "tedsaddd": {
    regNumber: "757",
    address: "SDFS, FSFSSFSF, SFSFSFFS, SALEM, SALEM, TAMIL NADU - 464646",
    regDate: "14-Feb-2025",
    productionDate: "21-Feb-2025",
  },
};

const ENTITY_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "head-office", label: "Head Office" },
  { value: "regional-office", label: "Regional Office" },
  { value: "district-office", label: "District Office" },
];

const ENTITY_CODE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  "head-office": [
    { value: "", label: "Select" },
    { value: "10-head-office", label: "10 / HEAD OFFICE" },
  ],
  "regional-office": [
    { value: "", label: "Select" },
    { value: "11-coimbatore", label: "11 / COIMBATORE" },
    { value: "18-salem", label: "18 / SALEM" },
  ],
  "district-office": [
    { value: "", label: "Select" },
    { value: "09-erode", label: "09 / ERODE" },
    { value: "05-salem", label: "05 / SALEM" },
  ],
};

const EMPLOYEE_OPTIONS: Record<string, { value: string; label: string; designation: string }[]> = {
  "10-head-office": [
    { value: "", label: "Select", designation: "" },
    { value: "3200", label: "3200 / SAMINATHAN S", designation: "DEPUTY GENERAL MANAGER" },
    { value: "623", label: "623 / VAASU R", designation: "GENERAL MANAGER" },
  ],
  "11-coimbatore": [
    { value: "", label: "Select", designation: "" },
    { value: "1853", label: "1853 / RAJENDRAN V K", designation: "MANAGER GRADE - III" },
  ],
  "18-salem": [
    { value: "", label: "Select", designation: "" },
    { value: "3693", label: "3693 / MOHANAMBAL T", designation: "e Commerce and Spl Projects" },
  ],
};

interface CommitteeMember {
  id: number;
  employeePf: string;
  designation: string;
  entityCode: string;
}

interface LoomMember {
  id: number;
  memberName: string;
  memberAddress: string;
  industryAddress: string;
  numberOfLooms: string;
  rationCard: string;
  aadhaar: string;
}

interface AddressForm {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  localAddressLine1: string;
  localAddressLine2: string;
  localAddressLine3: string;
  country: string;
  state: string;
  district: string;
  city: string;
  postalCode: string;
  taluk: string;
  landmark: string;
}

const emptyAddress: AddressForm = {
  addressLine1: "", addressLine2: "", addressLine3: "",
  localAddressLine1: "", localAddressLine2: "", localAddressLine3: "",
  country: "", state: "", district: "", city: "", postalCode: "", taluk: "", landmark: "",
};

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/>
    <rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/>
  </svg>
);

const MicIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

export default function FieldVerificationAddPage() {
  const router = useRouter();

  // Society
  const [societyName, setSocietyName] = useState("");
  const [societyInfo, setSocietyInfo] = useState<typeof SOCIETY_INFO[string] | null>(null);

  // Committee Members
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [entityType, setEntityType] = useState("");
  const [entityCode, setEntityCode] = useState("");
  const [employeePf, setEmployeePf] = useState("");
  const [designation, setDesignation] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [committeeErrors, setCommitteeErrors] = useState<Record<string, string>>({});

  // Loom Verification
  const [memberName, setMemberName] = useState("");
  const [numberOfLooms, setNumberOfLooms] = useState("");
  const [rationCard, setRationCard] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [memberAddress, setMemberAddress] = useState("");
  const [industryAddress, setIndustryAddress] = useState("");
  const [loomMembers, setLoomMembers] = useState<LoomMember[]>([]);
  const [loomErrors, setLoomErrors] = useState<Record<string, string>>({});

  // Bottom
  const [isRecommended, setIsRecommended] = useState<"yes" | "no" | "">("");
  const [bottomErrors, setBottomErrors] = useState<Record<string, string>>({});

  // Address Modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressTarget, setAddressTarget] = useState<"member" | "industry">("member");
  const [addressForm, setAddressForm] = useState<AddressForm>({ ...emptyAddress });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  const handleSocietyChange = (val: string) => {
    setSocietyName(val);
    setSocietyInfo(val ? SOCIETY_INFO[val] || null : null);
  };

  const handleEntityTypeChange = (val: string) => {
    setEntityType(val);
    setEntityCode("");
    setEmployeePf("");
    setDesignation("");
  };

  const handleEntityCodeChange = (val: string) => {
    setEntityCode(val);
    setEmployeePf("");
    setDesignation("");
  };

  const handleEmployeeChange = (val: string) => {
    setEmployeePf(val);
    const opts = EMPLOYEE_OPTIONS[entityCode] || [];
    const emp = opts.find((e) => e.value === val);
    setDesignation(emp?.designation || "");
  };

  const handleCommitteeAdd = () => {
    const errors: Record<string, string> = {};
    if (!entityType) errors.entityType = "Entity type code / name is required";
    if (!entityCode) errors.entityCode = "Entity code / name is required";
    if (!employeePf) errors.employeePf = "Staff code / name is required";
    setCommitteeErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const opts = EMPLOYEE_OPTIONS[entityCode] || [];
    const emp = opts.find((e) => e.value === employeePf);
    const entityOpts = ENTITY_CODE_OPTIONS[entityType] || [];
    const ec = entityOpts.find((e) => e.value === entityCode);

    setCommitteeMembers((prev) => [
      ...prev,
      { id: Date.now(), employeePf: emp?.label || employeePf, designation, entityCode: ec?.label || entityCode },
    ]);
    setEntityType(""); setEntityCode(""); setEmployeePf(""); setDesignation(""); setCommitteeErrors({});
  };

  const handleCommitteeClear = () => {
    setEntityType(""); setEntityCode(""); setEmployeePf(""); setDesignation(""); setCommitteeErrors({});
  };

  const handleLoomAdd = () => {
    const errors: Record<string, string> = {};
    if (!memberName) errors.memberName = "Member name is required";
    if (!numberOfLooms) errors.numberOfLooms = "Number of looms is required";
    if (!aadhaarNumber) errors.aadhaar = "Aadhar number is required";
    if (!memberAddress) errors.memberAddress = "Member address is required";
    if (!industryAddress) errors.industryAddress = "Industry address is required";
    setLoomErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoomMembers((prev) => [
      ...prev,
      { id: Date.now(), memberName, memberAddress, industryAddress, numberOfLooms, rationCard, aadhaar: aadhaarNumber },
    ]);
    setMemberName(""); setNumberOfLooms(""); setRationCard(""); setAadhaarNumber("");
    setMemberAddress(""); setIndustryAddress(""); setLoomErrors({});
  };

  const handleLoomClear = () => {
    setMemberName(""); setNumberOfLooms(""); setRationCard(""); setAadhaarNumber("");
    setMemberAddress(""); setIndustryAddress(""); setLoomErrors({});
  };

  const openAddressModal = (target: "member" | "industry") => {
    setAddressTarget(target);
    setAddressForm({ ...emptyAddress });
    setAddressErrors({});
    setShowAddressModal(true);
  };

  const handleAddressSubmit = () => {
    const errors: Record<string, string> = {};
    if (!addressForm.addressLine1) errors.addressLine1 = "Address Line 1 is required";
    if (!addressForm.country) errors.country = "Country is required";
    setAddressErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const formatted = [addressForm.addressLine1, addressForm.addressLine2, addressForm.addressLine3, addressForm.city, addressForm.state].filter(Boolean).join(", ");
    if (addressTarget === "member") setMemberAddress(formatted);
    else setIndustryAddress(formatted);
    setShowAddressModal(false);
  };

  const handleSubmit = () => {
    const errors: Record<string, string> = {};
    if (!isRecommended) errors.isRecommended = "Is the committee recommended to allot the society code is required";
    setBottomErrors(errors);
    if (Object.keys(errors).length > 0) return;
    router.push("/weavers/society-enrollment/field-verification/list");
  };

  const inputCls = "h-10 w-full rounded border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white";
  const icoBox = "flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2";

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Field Verification</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Society Enrollment</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Field Verification</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const done = i < 2;
              const active = i === 2;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && <div className={`h-0.5 flex-1 ${done || active ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />}
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      done ? "border-green-500 bg-green-500 text-white"
                      : active ? "border-orange-400 bg-white text-orange-400"
                      : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                    }`}>
                      {done ? <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20,6 9,17 4,12"/></svg> : i + 1}
                    </div>
                    {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 ${done ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "font-bold text-dark dark:text-white" : done ? "text-gray-500" : "text-gray-400"}`}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Field Verification Section */}
        <div>
          <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
            <span className="text-sm font-semibold text-white">Field Verification</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
              <button className="text-lg font-bold text-white hover:opacity-70">−</button>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Society Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                  Society Name <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 004 4h12"/></svg>
                  </span>
                  <select className={inputCls} value={societyName} onChange={(e) => handleSocietyChange(e.target.value)}>
                    {SOCIETY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Society Registration Number */}
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Society Registration Number</label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                  </span>
                  <input type="text" readOnly className={`${inputCls} bg-gray-50`} value={societyInfo?.regNumber || ""} />
                </div>
              </div>

              {/* Society Address */}
              <div className="lg:row-span-2">
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Society Address</label>
                <textarea readOnly rows={4} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" value={societyInfo?.address || ""} />
              </div>

              {/* Society Registration Date */}
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Society Registration Date</label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </span>
                  <input type="text" readOnly className={`${inputCls} bg-gray-50`} value={societyInfo?.regDate || ""} placeholder="dd-MMM-yyyy" />
                </div>
              </div>

              {/* Society Production Start Date */}
              <div>
                <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Society Production Start Date</label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </span>
                  <input type="text" readOnly className={`${inputCls} bg-gray-50`} value={societyInfo?.productionDate || ""} placeholder="dd-MMM-yyyy" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Committee Members List */}
        <div className="border-t border-stroke px-5 py-4 dark:border-dark-3">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon /> Committee Members List
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {/* Date of Visit */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Date of Visit to the Society <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="dd-MMM-yyyy" className={inputCls} value={dateOfVisit} onChange={(e) => setDateOfVisit(e.target.value)} />
                <span className={`${icoBox} cursor-pointer`}>
                  <svg className="size-4 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
            </div>

            {/* Entity Type Code / Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Entity Type Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </span>
                <select className={inputCls} value={entityType} onChange={(e) => handleEntityTypeChange(e.target.value)}>
                  {ENTITY_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              {committeeErrors.entityType && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth={2}/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth={2}/></svg>
                  {committeeErrors.entityType}
                </p>
              )}
            </div>

            {/* Entity Code / Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Entity Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="4" height="4" rx="1"/><rect x="10" y="2" width="4" height="4" rx="1"/><rect x="2" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/></svg>
                </span>
                <select className={inputCls} value={entityCode} onChange={(e) => handleEntityCodeChange(e.target.value)}>
                  {(ENTITY_CODE_OPTIONS[entityType] || [{ value: "", label: "Select" }]).map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              {committeeErrors.entityCode && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth={2}/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth={2}/></svg>
                  {committeeErrors.entityCode}
                </p>
              )}
            </div>

            {/* Employee PF Number / Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Employee PF Number / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <select className={inputCls} value={employeePf} onChange={(e) => handleEmployeeChange(e.target.value)}>
                  {(EMPLOYEE_OPTIONS[entityCode] || [{ value: "", label: "Select", designation: "" }]).map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              {committeeErrors.employeePf && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth={2}/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth={2}/></svg>
                  {committeeErrors.employeePf}
                </p>
              )}
            </div>

            {/* Designation */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Designation</label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                </span>
                <input type="text" readOnly className={`${inputCls} bg-gray-50`} value={designation} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-2 lg:col-span-3">
              <button onClick={handleCommitteeClear} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                Clear
              </button>
              <button onClick={handleCommitteeAdd} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Add
              </button>
            </div>
          </div>

          {/* Committee Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Employee PF Number / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Entity Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {committeeMembers.length === 0 ? (
                  <tr><td colSpan={5} className="py-6 text-center text-sm text-gray-400">No records found.</td></tr>
                ) : (
                  committeeMembers.map((m, i) => (
                    <tr key={m.id} className={i % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"}>
                      <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{i + 1}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{m.employeePf}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{m.designation}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{m.entityCode}</td>
                      <td className="border-b border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <button onClick={() => setCommitteeMembers((p) => p.filter((x) => x.id !== m.id))} className="rounded bg-[#dc3545] p-1 text-white hover:opacity-80">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3,0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loom Verification List */}
        <div className="border-t border-stroke px-5 py-4 dark:border-dark-3">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon /> Loom Verification List
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Member Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Member Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input type="text" className={`${inputCls} ${loomErrors.memberName ? "border-red-400" : ""}`} value={memberName} onChange={(e) => setMemberName(e.target.value)} />
              </div>
              {loomErrors.memberName && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth={2}/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth={2}/></svg>
                  {loomErrors.memberName}
                </p>
              )}
            </div>

            {/* Number of Looms */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Number of Looms <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                </span>
                <input type="text" className={`${inputCls} ${loomErrors.numberOfLooms ? "border-red-400" : ""}`} value={numberOfLooms} onChange={(e) => setNumberOfLooms(e.target.value)} />
              </div>
              {loomErrors.numberOfLooms && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth={2}/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth={2}/></svg>
                  {loomErrors.numberOfLooms}
                </p>
              )}
            </div>

            {/* Member Address */}
            <div className="lg:row-span-2">
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Member Address <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <textarea rows={4} readOnly className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" value={memberAddress} />
                <button onClick={() => openAddressModal("member")} className="flex shrink-0 items-center gap-1 self-start rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Add
                </button>
              </div>
            </div>

            {/* Ration Card Number */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Ration Card Number</label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                </span>
                <input type="text" className={inputCls} value={rationCard} onChange={(e) => setRationCard(e.target.value)} />
              </div>
            </div>

            {/* Industry Address */}
            <div className="lg:row-span-2">
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Industry Address <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <textarea rows={4} readOnly className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" value={industryAddress} />
                <button onClick={() => openAddressModal("industry")} className="flex shrink-0 items-center gap-1 self-start rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Add
                </button>
              </div>
            </div>

            {/* Aadhaar Number */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Aadhaar Number <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                </span>
                <input type="text" className={`${inputCls} ${loomErrors.aadhaar ? "border-red-400" : ""}`} value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} />
              </div>
              {loomErrors.aadhaar && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth={2}/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth={2}/></svg>
                  {loomErrors.aadhaar}
                </p>
              )}
            </div>
          </div>

          {/* Loom Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={handleLoomClear} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
              Clear
            </button>
            <button onClick={handleLoomAdd} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Add
            </button>
          </div>

          {/* Loom Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Member Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Member Address</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Industry Address</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">Number of Looms</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Ration Card Number</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-xs font-semibold">Aadhaar Number</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center text-xs font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {loomMembers.length === 0 ? (
                  <tr><td colSpan={8} className="py-6 text-center text-sm text-gray-400">No records found.</td></tr>
                ) : (
                  loomMembers.map((l, i) => (
                    <tr key={l.id} className={i % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"}>
                      <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{i + 1}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.memberName}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-xs dark:border-dark-3">{l.memberAddress.length > 20 ? l.memberAddress.slice(0, 20) + "......." : l.memberAddress}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-xs dark:border-dark-3">{l.industryAddress.length > 20 ? l.industryAddress.slice(0, 20) + "......." : l.industryAddress}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 text-center dark:border-dark-3">{l.numberOfLooms}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.rationCard}</td>
                      <td className="border-b border-r border-stroke px-3 py-2 dark:border-dark-3">{l.aadhaar}</td>
                      <td className="border-b border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <button onClick={() => setLoomMembers((p) => p.filter((x) => x.id !== l.id))} className="rounded bg-[#dc3545] p-1 text-white hover:opacity-80">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3,0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Is committee recommended */}
        <div className="border-t border-stroke px-5 py-4 dark:border-dark-3">
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Is the committee recommended to allot the society code <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
              <input type="radio" name="isRecommended" value="yes" checked={isRecommended === "yes"} onChange={() => setIsRecommended("yes")} className="size-4 accent-primary" />
              Yes
            </label>
            <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
              <input type="radio" name="isRecommended" value="no" checked={isRecommended === "no"} onChange={() => setIsRecommended("no")} className="size-4 accent-primary" />
              No
            </label>
          </div>
          {bottomErrors.isRecommended && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth={2}/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth={2}/></svg>
              {bottomErrors.isRecommended}
            </p>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/weavers/society-enrollment/field-verification/list")} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Submit
          </button>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Add Address</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Address Line 1 */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Address Line 1 <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={`${inputCls} ${addressErrors.addressLine1 ? "border-red-400" : ""}`} value={addressForm.addressLine1} onChange={(e) => setAddressForm((f) => ({ ...f, addressLine1: e.target.value }))} />
                  </div>
                  {addressErrors.addressLine1 && <p className="mt-1 text-xs text-red-500">{addressErrors.addressLine1}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Address Line 2</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={inputCls} value={addressForm.addressLine2} onChange={(e) => setAddressForm((f) => ({ ...f, addressLine2: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Address Line 3</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={inputCls} value={addressForm.addressLine3} onChange={(e) => setAddressForm((f) => ({ ...f, addressLine3: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Local Address Line 1</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={inputCls} value={addressForm.localAddressLine1} onChange={(e) => setAddressForm((f) => ({ ...f, localAddressLine1: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Local Address Line 2</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={inputCls} value={addressForm.localAddressLine2} onChange={(e) => setAddressForm((f) => ({ ...f, localAddressLine2: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Local Address Line 3</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={inputCls} value={addressForm.localAddressLine3} onChange={(e) => setAddressForm((f) => ({ ...f, localAddressLine3: e.target.value }))} />
                  </div>
                </div>
                {/* Country */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Country <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}>
                      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    </span>
                    <select className={`${inputCls} ${addressErrors.country ? "border-red-400" : ""}`} value={addressForm.country} onChange={(e) => setAddressForm((f) => ({ ...f, country: e.target.value }))}>
                      <option value="">Select</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                  {addressErrors.country && <p className="mt-1 text-xs text-red-500">{addressErrors.country}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">State</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}>
                      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    </span>
                    <select className={inputCls} value={addressForm.state} onChange={(e) => setAddressForm((f) => ({ ...f, state: e.target.value }))}>
                      <option value="">Select</option>
                      <option value="TAMIL NADU">TAMIL NADU</option>
                      <option value="KERALA">KERALA</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">District</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}>
                      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    </span>
                    <select className={inputCls} value={addressForm.district} onChange={(e) => setAddressForm((f) => ({ ...f, district: e.target.value }))}>
                      <option value="">Select</option>
                      <option value="SALEM">SALEM</option>
                      <option value="ERODE">ERODE</option>
                      <option value="COIMBATORE">COIMBATORE</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">City</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}>
                      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    </span>
                    <select className={inputCls} value={addressForm.city} onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}>
                      <option value="">Select</option>
                      <option value="SALEM">SALEM</option>
                      <option value="OMALUR">OMALUR</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Postal Code</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={inputCls} value={addressForm.postalCode} onChange={(e) => setAddressForm((f) => ({ ...f, postalCode: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Taluk</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}>
                      <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    </span>
                    <select className={inputCls} value={addressForm.taluk} onChange={(e) => setAddressForm((f) => ({ ...f, taluk: e.target.value }))}>
                      <option value="">Select</option>
                      <option value="OMALUR">OMALUR</option>
                      <option value="EDAPPADI">EDAPPADI</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-sm font-medium text-dark dark:text-white">Landmark</label>
                  <div className="flex items-center gap-2">
                    <span className={icoBox}><MicIcon /></span>
                    <input type="text" className={inputCls} value={addressForm.landmark} onChange={(e) => setAddressForm((f) => ({ ...f, landmark: e.target.value }))} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowAddressModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={handleAddressSubmit} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
