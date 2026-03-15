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

const ATTACHMENT_FILES = [
  "Form No.16 duly filled by the society to admit the society as Co-optex member.",
  "List of members attested by the deputy director of Handlooms and textiles.",
  "List of board members of the society.",
  "Declaration of society.",
  "By-law of the society duly attested by the Deputy Director of Handlooms and Textiles.",
  "D.D. for Rs.550/- for share capital.",
  "Society Resolution to join as member in Co-optex.",
  "Requisition of the society to admit as member in Co-optex.",
  "Recommendation letter from concerned Deputy Director of Handlooms and Textiles.",
  "Certificate of Registration issued by the Deputy Director of Handlooms & Textiles.",
  "Proceedings issued by the Deputy Director of Handlooms & Textiles, to commence the business of the society.",
  "Any other document.",
];

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

interface AttachmentEntry {
  fileName: string;
  file: File | null;
}

export default function SocietyEnrollmentAddPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    societyName: "",
    societyNameTamil: "",
    societyType: "",
    societyRegistrationNumber: "",
    societyPresidentSalutation: "",
    societyPresidentName: "",
    societyResolutionDate: "",
    totalMembersInSociety: "",
    gstinNumber: "",
    presidentAadhaarNumber: "",
    demandDraftNumber: "",
    demandDraftDate: "",
    demandDraftAmount: "",
    numberOfLoomsAvailable: "",
  });

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Society Address
  const [societyAddress, setSocietyAddress] = useState<AddressForm | null>(null);
  const [showSocietyAddressModal, setShowSocietyAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressForm>({
    addressLine1: "", addressLine2: "", addressLine3: "",
    localAddressLine1: "", localAddressLine2: "", localAddressLine3: "",
    country: "", state: "", district: "", city: "", postalCode: "", taluk: "", landmark: "",
  });

  // President Address
  const [presidentAddress, setPresidentAddress] = useState<AddressForm | null>(null);
  const [showPresidentAddressModal, setShowPresidentAddressModal] = useState(false);
  const [presidentAddressForm, setPresidentAddressForm] = useState<AddressForm>({
    addressLine1: "", addressLine2: "", addressLine3: "",
    localAddressLine1: "", localAddressLine2: "", localAddressLine3: "",
    country: "", state: "", district: "", city: "", postalCode: "", taluk: "", landmark: "",
  });

  // Attachments
  const [attachments, setAttachments] = useState<AttachmentEntry[]>(
    ATTACHMENT_FILES.map((f) => ({ fileName: f, file: null }))
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.societyName) newErrors.societyName = "Society name is required";
    if (!form.societyPresidentSalutation) newErrors.societyPresidentSalutation = "Salutation is required";
    if (!form.societyPresidentName) newErrors.societyPresidentName = "Society president name is required";
    if (!form.totalMembersInSociety) newErrors.totalMembersInSociety = "Total member in society is required";
    if (!form.gstinNumber) newErrors.gstinNumber = "GSTIN Number is required";
    if (!form.demandDraftNumber) newErrors.demandDraftNumber = "Demand draft number is required";
    if (!form.demandDraftDate) newErrors.demandDraftDate = "Demand draft date is required";
    if (!form.demandDraftAmount) newErrors.demandDraftAmount = "Demand draft amount is required";
    if (!form.numberOfLoomsAvailable) newErrors.numberOfLoomsAvailable = "Number of looms available is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    alert("Form submitted successfully!");
  };

  const handleSave = () => {
    alert("Form saved!");
  };

  const handleUpdate = () => {
    alert("Form updated!");
  };

  const handleAddressSubmit = (type: "society" | "president") => {
    if (type === "society") {
      setSocietyAddress({ ...addressForm });
      setShowSocietyAddressModal(false);
    } else {
      setPresidentAddress({ ...presidentAddressForm });
      setShowPresidentAddressModal(false);
    }
  };

  const openSocietyAddressModal = () => {
    if (societyAddress) setAddressForm({ ...societyAddress });
    setShowSocietyAddressModal(true);
  };

  const openPresidentAddressModal = () => {
    if (presidentAddress) setPresidentAddressForm({ ...presidentAddress });
    setShowPresidentAddressModal(true);
  };

  const formatAddress = (addr: AddressForm) =>
    [addr.addressLine1, addr.city, addr.state, addr.district, addr.postalCode]
      .filter(Boolean)
      .join(", ");

  const attachedCount = attachments.filter((a) => a.file !== null).length;
  const remainingCount = attachments.length - attachedCount;

  const inputCls =
    "w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white";
  const selectCls =
    "w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const labelCls =
    "mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300";
  const requiredStar = <span className="text-red-500">*</span>;
  const errorCls = "mt-0.5 flex items-center gap-1 text-xs text-red-500";

  const iconPrefix = (icon: React.ReactNode) => (
    <span className="flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
      {icon}
    </span>
  );

  const hashIcon = <span className="text-sm text-gray-500">#</span>;
  const userIcon = (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
  const buildingIcon = (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
  const listIcon = (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
  const groupIcon = (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
  const calendarIcon = (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
  const rupeeIcon = <span className="text-sm text-gray-500">₹</span>;

  // Address Modal Component
  const AddressModal = ({
    show,
    title,
    form: addrForm,
    onChange,
    onSubmit,
    onClose,
  }: {
    show: boolean;
    title: string;
    form: AddressForm;
    onChange: (key: keyof AddressForm, value: string) => void;
    onSubmit: () => void;
    onClose: () => void;
  }) => {
    if (!show) return null;
    const micIcon = (
      <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    );
    const rowInput = (label: string, key: keyof AddressForm, required?: boolean) => (
      <div>
        <label className={labelCls}>{label}{required && requiredStar}</label>
        <div className="flex items-center gap-1">
          <span className="flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">{micIcon}</span>
          <input type="text" className={inputCls} value={addrForm[key]} onChange={(e) => onChange(key, e.target.value)} />
        </div>
      </div>
    );
    const rowSelect = (label: string, key: keyof AddressForm, required?: boolean) => (
      <div>
        <label className={labelCls}>{label}{required && requiredStar}</label>
        <div className="flex items-center gap-1">
          <span className="flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
            <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </span>
          <select className={selectCls} value={addrForm[key]} onChange={(e) => onChange(key, e.target.value)}>
            <option value="">Select</option>
            {key === "country" && <option value="INDIA">INDIA</option>}
            {key === "state" && <>
              <option value="TAMIL NADU">TAMIL NADU</option>
              <option value="KERALA">KERALA</option>
              <option value="KARNATAKA">KARNATAKA</option>
            </>}
            {key === "district" && <>
              <option value="SALEM">SALEM</option>
              <option value="ERODE">ERODE</option>
              <option value="COIMBATORE">COIMBATORE</option>
            </>}
            {key === "city" && <>
              <option value="SALEM">SALEM</option>
              <option value="ERODE">ERODE</option>
            </>}
            {key === "taluk" && <>
              <option value="SALEM">SALEM</option>
              <option value="ATTUR">ATTUR</option>
            </>}
          </select>
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-4xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
          <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <button onClick={onClose} className="text-white hover:opacity-75">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="p-5">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rowInput("Address Line 1", "addressLine1", true)}
              {rowInput("Address Line 2", "addressLine2")}
              {rowInput("Address Line 3", "addressLine3")}
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rowInput("Local Address Line 1", "localAddressLine1")}
              {rowInput("Local Address Line 2", "localAddressLine2")}
              {rowInput("Local Address Line 3", "localAddressLine3")}
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rowSelect("Country", "country", true)}
              {rowSelect("State", "state")}
              {rowSelect("District", "district")}
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rowSelect("City", "city")}
              <div>
                <label className={labelCls}>Postal Code</label>
                <div className="flex items-center gap-1">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">{micIcon}</span>
                  <input type="text" className={inputCls} value={addrForm.postalCode} onChange={(e) => onChange("postalCode", e.target.value)} />
                </div>
              </div>
              {rowSelect("Taluk", "taluk")}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rowInput("Landmark", "landmark")}
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
            <button onClick={onClose} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button onClick={onSubmit} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Society Enrollment
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Society Enrollment</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const completed = i === 0;
              const active = i === 1;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && (
                      <div className={`h-0.5 flex-1 ${completed || i <= 1 ? "bg-[#17a2b8]" : "bg-gray-200 dark:bg-dark-3"}`} />
                    )}
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                        completed
                          ? "border-[#28a745] bg-[#28a745] text-white"
                          : active
                          ? "border-orange-400 bg-white text-orange-400"
                          : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                      }`}
                    >
                      {completed ? (
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
                      ) : (i + 1)}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="h-0.5 flex-1 bg-gray-200 dark:bg-dark-3" />
                    )}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "text-dark dark:text-white font-bold" : completed ? "text-[#28a745]" : "text-gray-400"}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Society Enrollment</span>
          <span className="text-xs text-white opacity-90">* Mandatory Fields</span>
        </div>

        {/* Form Body */}
        <div className="p-5">

          {/* Row 1: Society Name, Society Name (Tamil), Society Address */}
          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <label className={labelCls}>Society Name {requiredStar}</label>
              <div className="flex items-center gap-1">
                {iconPrefix(buildingIcon)}
                <select
                  className={`${selectCls} ${errors.societyName ? "border-red-400" : ""}`}
                  value={form.societyName}
                  onChange={(e) => set("societyName", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="SOCIETY A">SOCIETY A</option>
                  <option value="SOCIETY B">SOCIETY B</option>
                </select>
              </div>
              {errors.societyName && (
                <p className={errorCls}>
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  {errors.societyName}
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>Society Name (In Tamil)</label>
              <div className="flex items-center gap-1">
                {iconPrefix(buildingIcon)}
                <input type="text" className={inputCls} placeholder="Society Name in Tamil" value={form.societyNameTamil} onChange={(e) => set("societyNameTamil", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Society Address {requiredStar}</label>
              <div className="flex items-start gap-2">
                <div className="flex-1 min-h-[60px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
                  {societyAddress ? formatAddress(societyAddress) : ""}
                </div>
                <button
                  onClick={openSocietyAddressModal}
                  className="flex shrink-0 items-center gap-1 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Society Type, Society Registration Number */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={labelCls}>Society Type</label>
              <div className="flex items-center gap-1">
                {iconPrefix(listIcon)}
                <input type="text" className={inputCls} placeholder="Society Type" value={form.societyType} onChange={(e) => set("societyType", e.target.value)} readOnly />
              </div>
            </div>
            <div>
              <label className={labelCls}>Society Registration Number</label>
              <div className="flex items-center gap-1">
                {iconPrefix(hashIcon)}
                <input type="text" className={inputCls} placeholder="Registration Number" value={form.societyRegistrationNumber} onChange={(e) => set("societyRegistrationNumber", e.target.value)} readOnly />
              </div>
            </div>
          </div>

          {/* Row 3: President Name, Resolution Date, President Address */}
          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <label className={labelCls}>Society President Name {requiredStar}</label>
              <div className="flex items-center gap-1">
                {iconPrefix(userIcon)}
                <select
                  className={`w-28 rounded border px-2 py-2 text-sm outline-none dark:bg-gray-dark dark:text-white dark:border-dark-3 ${errors.societyPresidentSalutation ? "border-red-400" : "border-stroke"}`}
                  value={form.societyPresidentSalutation}
                  onChange={(e) => set("societyPresidentSalutation", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                </select>
                <input
                  type="text"
                  className={`${inputCls} ${errors.societyPresidentName ? "border-red-400" : ""}`}
                  placeholder="President Name"
                  value={form.societyPresidentName}
                  onChange={(e) => set("societyPresidentName", e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                {errors.societyPresidentSalutation && (
                  <p className={errorCls}>
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {errors.societyPresidentSalutation}
                  </p>
                )}
                {errors.societyPresidentName && (
                  <p className={errorCls}>
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {errors.societyPresidentName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className={labelCls}>Society Resolution Date</label>
              <div className="flex items-center gap-1">
                {iconPrefix(calendarIcon)}
                <input type="text" className={inputCls} placeholder="dd-MMM-YYYY" value={form.societyResolutionDate} onChange={(e) => set("societyResolutionDate", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Society President Address</label>
              <div className="flex items-start gap-2">
                <div className="flex-1 min-h-[60px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
                  {presidentAddress ? formatAddress(presidentAddress) : ""}
                </div>
                <button
                  onClick={openPresidentAddressModal}
                  className="flex shrink-0 items-center gap-1 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Row 4: Total Members, GSTIN */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={labelCls}>Total Members in Society {requiredStar}</label>
              <div className="flex items-center gap-1">
                {iconPrefix(groupIcon)}
                <input
                  type="number"
                  className={`${inputCls} ${errors.totalMembersInSociety ? "border-red-400" : ""}`}
                  placeholder="Total Members"
                  value={form.totalMembersInSociety}
                  onChange={(e) => set("totalMembersInSociety", e.target.value)}
                />
              </div>
              {errors.totalMembersInSociety && (
                <p className={errorCls}>
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  {errors.totalMembersInSociety}
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>GSTIN Number {requiredStar}</label>
              <div className="flex items-center gap-1">
                {iconPrefix(hashIcon)}
                <input
                  type="text"
                  className={`${inputCls} ${errors.gstinNumber ? "border-red-400" : ""}`}
                  placeholder="GSTIN Number"
                  value={form.gstinNumber}
                  onChange={(e) => set("gstinNumber", e.target.value)}
                />
              </div>
              {errors.gstinNumber && (
                <p className={errorCls}>
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  {errors.gstinNumber}
                </p>
              )}
            </div>
          </div>

          {/* Row 5: President Aadhaar */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={labelCls}>President Aadhaar Number</label>
              <div className="flex items-center gap-1">
                {iconPrefix(hashIcon)}
                <input type="text" className={inputCls} placeholder="Aadhaar Number" value={form.presidentAadhaarNumber} onChange={(e) => set("presidentAadhaarNumber", e.target.value)} />
              </div>
            </div>
          </div>

          {/* DD Details */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/>
                <rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/>
                <rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/>
              </svg>
              DD Details
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Demand Draft Number {requiredStar}</label>
                <div className="flex items-center gap-1">
                  {iconPrefix(hashIcon)}
                  <input
                    type="text"
                    className={`${inputCls} ${errors.demandDraftNumber ? "border-red-400" : ""}`}
                    placeholder="DD Number"
                    value={form.demandDraftNumber}
                    onChange={(e) => set("demandDraftNumber", e.target.value)}
                  />
                </div>
                {errors.demandDraftNumber && (
                  <p className={errorCls}>
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {errors.demandDraftNumber}
                  </p>
                )}
              </div>
              <div>
                <label className={labelCls}>Demand Draft Date {requiredStar}</label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    className={`${inputCls} ${errors.demandDraftDate ? "border-red-400" : ""}`}
                    placeholder="dd-MMM-YYYY"
                    value={form.demandDraftDate}
                    onChange={(e) => set("demandDraftDate", e.target.value)}
                  />
                  <button className="flex size-8 shrink-0 items-center justify-center rounded bg-[#17a2b8] text-white">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </button>
                </div>
                {errors.demandDraftDate && (
                  <p className={errorCls}>
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {errors.demandDraftDate}
                  </p>
                )}
              </div>
              <div>
                <label className={labelCls}>Demand Draft Amount {requiredStar}</label>
                <div className="flex items-center gap-1">
                  {iconPrefix(rupeeIcon)}
                  <input
                    type="number"
                    className={`${inputCls} ${errors.demandDraftAmount ? "border-red-400" : ""}`}
                    placeholder="Amount"
                    value={form.demandDraftAmount}
                    onChange={(e) => set("demandDraftAmount", e.target.value)}
                  />
                </div>
                {errors.demandDraftAmount && (
                  <p className={errorCls}>
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {errors.demandDraftAmount}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/>
                <rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/>
                <rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/>
              </svg>
              Product Details
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Number of Looms Available {requiredStar}</label>
                <div className="flex items-center gap-1">
                  {iconPrefix(hashIcon)}
                  <input
                    type="number"
                    className={`${inputCls} ${errors.numberOfLoomsAvailable ? "border-red-400" : ""}`}
                    placeholder="Number of Looms"
                    value={form.numberOfLoomsAvailable}
                    onChange={(e) => set("numberOfLoomsAvailable", e.target.value)}
                  />
                </div>
                {errors.numberOfLoomsAvailable && (
                  <p className={errorCls}>
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {errors.numberOfLoomsAvailable}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="mb-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/>
                  <rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/>
                  <rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/>
                </svg>
                Attachments
                <span className="text-xs font-normal text-gray-400">Note:(File format: pdf, doc, xlsx and file size should be less than 2 MB)</span>
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 rounded border border-stroke px-2.5 py-1 dark:border-dark-3">
                  Total Files <span className="flex size-5 items-center justify-center rounded-full bg-[#17a2b8] text-[10px] font-bold text-white">{attachments.length}</span>
                </span>
                <span className="flex items-center gap-1 rounded border border-stroke px-2.5 py-1 dark:border-dark-3">
                  Attached <span className="flex size-5 items-center justify-center rounded-full bg-[#28a745] text-[10px] font-bold text-white">{attachedCount}</span>
                </span>
                <span className="flex items-center gap-1 rounded border border-stroke px-2.5 py-1 dark:border-dark-3">
                  Remaining <span className="flex size-5 items-center justify-center rounded-full bg-[#dc3545] text-[10px] font-bold text-white">{remainingCount}</span>
                </span>
              </div>
            </div>
            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#17a2b8]">
                    <th className="w-12 px-4 py-2.5 text-center text-xs font-semibold text-white">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-white">File Name</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-white">Upload Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {attachments.map((att, idx) => (
                    <tr key={idx} className="border-t border-stroke dark:border-dark-3">
                      <td className="px-4 py-2.5 text-center text-gray-500">{idx + 1}</td>
                      <td className="px-4 py-2.5 text-dark dark:text-white">{att.fileName}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className="flex-1 rounded border border-stroke bg-gray-50 px-3 py-1.5 text-sm text-gray-500 outline-none dark:border-dark-3 dark:bg-dark-2"
                            placeholder="No file chosen"
                            readOnly
                            value={att.file ? att.file.name : ""}
                          />
                          <label className="flex size-8 cursor-pointer items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.xlsx"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setAttachments((prev) => prev.map((a, i) => i === idx ? { ...a, file } : a));
                              }}
                            />
                          </label>
                          <button
                            onClick={() => setAttachments((prev) => prev.map((a, i) => i === idx ? { ...a, file: null } : a))}
                            className="flex size-8 items-center justify-center rounded bg-[#dc3545] text-white hover:opacity-90"
                          >
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/weavers/society-enrollment/list")}
              className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
              Save
            </button>
            <button
              onClick={handleUpdate}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,11 16,11"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 11"/></svg>
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Society Address Modal */}
      <AddressModal
        show={showSocietyAddressModal}
        title="Add Address"
        form={addressForm}
        onChange={(key, value) => setAddressForm((f) => ({ ...f, [key]: value }))}
        onSubmit={() => handleAddressSubmit("society")}
        onClose={() => setShowSocietyAddressModal(false)}
      />

      {/* President Address Modal */}
      <AddressModal
        show={showPresidentAddressModal}
        title="Add Address"
        form={presidentAddressForm}
        onChange={(key, value) => setPresidentAddressForm((f) => ({ ...f, [key]: value }))}
        onSubmit={() => handleAddressSubmit("president")}
        onClose={() => setShowPresidentAddressModal(false)}
      />
    </div>
  );
}
