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
  { value: "sivas", label: "sivas" },
  { value: "muru", label: "muru" },
  { value: "tedsaddd", label: "tedsaddd" },
  { value: "harshath", label: "harshath" },
];

const SOCIETY_DATA: Record<string, { type: string; regNumber: string }> = {
  sivas: { type: "HANDLOOM", regNumber: "14787" },
  muru: { type: "HANDLOOM", regNumber: "4466464" },
  tedsaddd: { type: "HANDLOOM", regNumber: "757" },
  harshath: { type: "POWERLOOM", regNumber: "23456" },
};

const TITLE_OPTIONS = ["Mr", "Mrs", "Ms", "Dr"];

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

interface AttachmentRow {
  id: number;
  fileName: string;
  filePath: string;
}

const INITIAL_ATTACHMENTS: AttachmentRow[] = [
  { id: 1, fileName: "Form No.16 duly filled by the society to admit the society as Co-optex member.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 2, fileName: "List of members attested by the deputy director of Handlooms and textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 3, fileName: "List of board members of the society.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 4, fileName: "Declaration of society.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 5, fileName: "By-law of the society duly attested by the Deputy Director of Handlooms and Textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 6, fileName: "D.D. for Rs.550/- for share capital.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 7, fileName: "Society Resolution to join as member in Co-optex.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 8, fileName: "Requisition of the society to admit as member in Co-optex.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 9, fileName: "Recommendation letter from concerned Deputy Director of Handlooms and Textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 10, fileName: "Certificate of Registration issued by the Deputy Director of Handlooms & Textiles.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 11, fileName: "Proceedings issued by the Deputy Director of Handlooms & Textiles, to commence the business of the society.", filePath: "/fileserver/INFOTEX-FILES/OPERATION/SOCIETY/ENROLLMENT/uploaded/GodownWiseStock.pdf" },
  { id: 12, fileName: "Copy of society registration certificate.", filePath: "" },
];

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/>
    <rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/>
    <rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/>
    <rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="10" y="17" width="4" height="4" rx="0.5"/>
    <rect x="17" y="17" width="4" height="4" rx="0.5"/>
  </svg>
);

const MicIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
    <path d="M19 10v2a7 7 0 01-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

export default function EditSocietyEnrollmentStep2Page() {
  const router = useRouter();

  // Society Section
  const [societyName, setSocietyName] = useState("sivas");
  const [societyType, setSocietyType] = useState("HANDLOOM");
  const [societyRegNumber, setSocietyRegNumber] = useState("14787");
  const [societyNameTamil, setSocietyNameTamil] = useState("anbu");
  const [societyAddress, setSocietyAddress] = useState("13 no, cv z, xc x, zxc, x cx, xc x, COIMBATORE, COIMBATORE, TAMIL NADU - 621456");
  const [presidentTitle, setPresidentTitle] = useState("Mr");
  const [presidentName, setPresidentName] = useState("siva");
  const [societyResolutionDate, setSocietyResolutionDate] = useState("19-Feb-2025");
  const [presidentAddress, setPresidentAddress] = useState("");
  const [totalMembers, setTotalMembers] = useState("65");
  const [gstinNumber, setGstinNumber] = useState("23ASDJC6213A4Z3");
  const [presidentAadhaar, setPresidentAadhaar] = useState("");

  // DD Details
  const [ddNumber, setDdNumber] = useState("456321");
  const [ddDate, setDdDate] = useState("19-Feb-2025");
  const [ddAmount, setDdAmount] = useState("654.00");

  // Product Details
  const [numberOfLooms, setNumberOfLooms] = useState("5");

  // Attachments
  const [attachments, setAttachments] = useState<AttachmentRow[]>(INITIAL_ATTACHMENTS);

  // Address Modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressTarget, setAddressTarget] = useState<"society" | "president">("society");
  const [addressForm, setAddressForm] = useState<AddressForm>({ ...emptyAddress });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSocietyChange = (val: string) => {
    setSocietyName(val);
    const data = SOCIETY_DATA[val];
    if (data) { setSocietyType(data.type); setSocietyRegNumber(data.regNumber); }
    else { setSocietyType(""); setSocietyRegNumber(""); }
  };

  const openAddressModal = (target: "society" | "president") => {
    setAddressTarget(target);
    setAddressForm({ ...emptyAddress });
    setAddressErrors({});
    setShowAddressModal(true);
  };

  const handleAddressSubmit = () => {
    const errs: Record<string, string> = {};
    if (!addressForm.addressLine1) errs.addressLine1 = "Address Line 1 is required";
    if (!addressForm.country) errs.country = "Country is required";
    setAddressErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const formatted = [addressForm.addressLine1, addressForm.addressLine2, addressForm.addressLine3, addressForm.city, addressForm.state, `${addressForm.district} - ${addressForm.postalCode}`].filter(Boolean).join(", ");
    if (addressTarget === "society") setSocietyAddress(formatted);
    else setPresidentAddress(formatted);
    setShowAddressModal(false);
  };

  const attachedCount = attachments.filter((a) => a.filePath !== "").length;
  const remainingCount = attachments.length - attachedCount;

  const handleUpdate = () => {
    const errs: Record<string, string> = {};
    if (!societyName) errs.societyName = "Society Name is required";
    if (!societyAddress) errs.societyAddress = "Society Address is required";
    if (!presidentName) errs.presidentName = "President Name is required";
    if (!totalMembers) errs.totalMembers = "Total Members is required";
    if (!gstinNumber) errs.gstinNumber = "GSTIN Number is required";
    if (!ddNumber) errs.ddNumber = "Demand Draft Number is required";
    if (!ddDate) errs.ddDate = "Demand Draft Date is required";
    if (!ddAmount) errs.ddAmount = "Demand Draft Amount is required";
    if (!numberOfLooms) errs.numberOfLooms = "Number of Looms is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    router.push("/weavers/society-enrollment/request-for-society-enrollment/list");
  };

  const handleSave = () => {
    router.push("/weavers/society-enrollment/request-for-society-enrollment/list");
  };

  const inputCls = "h-10 w-full rounded border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white";
  const icoBox = "flex size-8 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2";
  const labelCls = "mb-1 block text-sm font-medium text-dark dark:text-white";

  return (
    <div className="mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Society Enrollment</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Society Enrollment</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Stepper */}
        <div className="overflow-x-auto border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div className="flex min-w-max items-start justify-between gap-2">
            {STEPS.map((step, i) => {
              const done = i < 1;
              const active = i === 1;
              return (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="relative flex w-full items-center">
                    {i > 0 && <div className={`h-0.5 flex-1 ${done ? "bg-green-400" : "bg-gray-200 dark:bg-dark-3"}`} />}
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      done ? "border-green-500 bg-green-500 text-white"
                      : active ? "border-orange-400 bg-white text-orange-400"
                      : "border-gray-300 bg-white text-gray-400 dark:border-dark-3 dark:bg-gray-dark"
                    }`}>
                      {done ? <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20,6 9,17 4,12"/></svg> : i + 1}
                    </div>
                    {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 bg-gray-200 dark:bg-dark-3`} />}
                  </div>
                  <span className={`mt-1.5 text-center text-[11px] font-medium ${active ? "font-bold text-dark dark:text-white" : done ? "text-gray-500" : "text-gray-400"}`}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Society Enrollment Section */}
        <div>
          <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
            <span className="text-sm font-semibold text-white">Society Enrollment</span>
            <span className="text-xs text-white opacity-90">* Mandatory Fields</span>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Society Name */}
              <div>
                <label className={labelCls}>Society Name <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 004 4h12"/></svg>
                  </span>
                  <select className={`${inputCls} ${errors.societyName ? "border-red-400" : ""}`} value={societyName} onChange={(e) => handleSocietyChange(e.target.value)}>
                    {SOCIETY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                {errors.societyName && <p className="mt-1 text-xs text-red-500">{errors.societyName}</p>}
              </div>

              {/* Society Name (In Tamil) */}
              <div>
                <label className={labelCls}>Society Name (In Tamil)</label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  </span>
                  <input type="text" className={inputCls} value={societyNameTamil} onChange={(e) => setSocietyNameTamil(e.target.value)} />
                </div>
              </div>

              {/* Society Address — row-span-2 */}
              <div className="lg:row-span-2">
                <label className={`${labelCls} flex items-center gap-1`}>
                  Society Address <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <textarea rows={5} readOnly className={`w-full rounded border ${errors.societyAddress ? "border-red-400" : "border-stroke"} bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white`} value={societyAddress} />
                  <button onClick={() => openAddressModal("society")} className="flex shrink-0 items-center gap-1 self-start rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    Add
                  </button>
                </div>
                {errors.societyAddress && <p className="mt-1 text-xs text-red-500">{errors.societyAddress}</p>}
              </div>

              {/* Society Type */}
              <div>
                <label className={labelCls}>Society Type</label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  </span>
                  <input type="text" readOnly className={`${inputCls} bg-gray-50`} value={societyType} />
                </div>
              </div>

              {/* Society Registration Number */}
              <div>
                <label className={labelCls}>Society Registration Number</label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}><span className="text-sm text-gray-500">#</span></span>
                  <input type="text" readOnly className={`${inputCls} bg-gray-50`} value={societyRegNumber} />
                </div>
              </div>

              {/* Society President Name */}
              <div>
                <label className={labelCls}>Society President Name <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <select className="h-10 rounded border border-stroke bg-transparent px-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={presidentTitle} onChange={(e) => setPresidentTitle(e.target.value)}>
                    {TITLE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input type="text" className={`${inputCls} ${errors.presidentName ? "border-red-400" : ""} flex-1`} value={presidentName} onChange={(e) => setPresidentName(e.target.value)} />
                </div>
                {errors.presidentName && <p className="mt-1 text-xs text-red-500">{errors.presidentName}</p>}
              </div>

              {/* Society Resolution Date */}
              <div>
                <label className={labelCls}>Society Resolution Date</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="dd-MMM-yyyy" className={inputCls} value={societyResolutionDate} onChange={(e) => setSocietyResolutionDate(e.target.value)} />
                  <span className={`${icoBox} cursor-pointer`}>
                    <svg className="size-4 text-[#17a2b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </span>
                </div>
              </div>

              {/* Society President Address — row-span-2 */}
              <div className="lg:row-span-2">
                <label className={labelCls}>Society President Address</label>
                <div className="flex gap-2">
                  <textarea rows={5} readOnly className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" value={presidentAddress} />
                  <button onClick={() => openAddressModal("president")} className="flex shrink-0 items-center gap-1 self-start rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    Add
                  </button>
                </div>
              </div>

              {/* Total Members */}
              <div>
                <label className={labelCls}>Total Members in Society <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  </span>
                  <input type="text" className={`${inputCls} ${errors.totalMembers ? "border-red-400" : ""}`} value={totalMembers} onChange={(e) => setTotalMembers(e.target.value)} />
                </div>
                {errors.totalMembers && <p className="mt-1 text-xs text-red-500">{errors.totalMembers}</p>}
              </div>

              {/* GSTIN Number */}
              <div>
                <label className={labelCls}>GSTIN Number <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}><span className="text-sm text-gray-500">#</span></span>
                  <input type="text" className={`${inputCls} ${errors.gstinNumber ? "border-red-400" : ""}`} value={gstinNumber} onChange={(e) => setGstinNumber(e.target.value)} />
                </div>
                {errors.gstinNumber && <p className="mt-1 text-xs text-red-500">{errors.gstinNumber}</p>}
              </div>

              {/* President Aadhaar Number */}
              <div>
                <label className={labelCls}>President Aadhaar Number</label>
                <div className="flex items-center gap-2">
                  <span className={icoBox}><span className="text-sm text-gray-500">#</span></span>
                  <input type="text" className={inputCls} value={presidentAadhaar} onChange={(e) => setPresidentAadhaar(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DD Details */}
        <div className="border-t border-stroke px-5 py-4 dark:border-dark-3">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon /> DD Details
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Demand Draft Number */}
            <div>
              <label className={labelCls}>Demand Draft Number <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <span className={icoBox}><span className="text-sm text-gray-500">#</span></span>
                <input type="text" className={`${inputCls} ${errors.ddNumber ? "border-red-400" : ""}`} value={ddNumber} onChange={(e) => setDdNumber(e.target.value)} />
              </div>
              {errors.ddNumber && <p className="mt-1 text-xs text-red-500">{errors.ddNumber}</p>}
            </div>

            {/* Demand Draft Date */}
            <div>
              <label className={labelCls}>Demand Draft Date <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="dd-MMM-yyyy" className={`${inputCls} ${errors.ddDate ? "border-red-400" : ""}`} value={ddDate} onChange={(e) => setDdDate(e.target.value)} />
                <span className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded bg-[#17a2b8]">
                  <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
              </div>
              {errors.ddDate && <p className="mt-1 text-xs text-red-500">{errors.ddDate}</p>}
            </div>

            {/* Demand Draft Amount */}
            <div>
              <label className={labelCls}>Demand Draft Amount <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <span className={icoBox}>
                  <span className="text-sm font-semibold text-gray-500">₹</span>
                </span>
                <input type="text" className={`${inputCls} ${errors.ddAmount ? "border-red-400" : ""}`} value={ddAmount} onChange={(e) => setDdAmount(e.target.value)} />
              </div>
              {errors.ddAmount && <p className="mt-1 text-xs text-red-500">{errors.ddAmount}</p>}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="border-t border-stroke px-5 py-4 dark:border-dark-3">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon /> Product Details
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <label className={labelCls}>Number of Looms Available <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <span className={icoBox}><span className="text-sm text-gray-500">#</span></span>
                <input type="text" className={`${inputCls} ${errors.numberOfLooms ? "border-red-400" : ""}`} value={numberOfLooms} onChange={(e) => setNumberOfLooms(e.target.value)} />
              </div>
              {errors.numberOfLooms && <p className="mt-1 text-xs text-red-500">{errors.numberOfLooms}</p>}
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="border-t border-stroke px-5 py-4 dark:border-dark-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon /> Attachments
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                Note:(File format: pdf, doc, xlsx and file size should be less than 2 MB)
              </span>
            </h4>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1 text-xs font-semibold dark:border-dark-3 dark:bg-gray-dark">
                Total Files <span className="ml-1 rounded bg-[#17a2b8] px-1.5 py-0.5 text-[11px] text-white">{attachments.length}</span>
              </span>
              <span className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1 text-xs font-semibold dark:border-dark-3 dark:bg-gray-dark">
                Attached <span className="ml-1 rounded bg-[#28a745] px-1.5 py-0.5 text-[11px] text-white">{attachedCount}</span>
              </span>
              <span className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1 text-xs font-semibold dark:border-dark-3 dark:bg-gray-dark">
                Remaining <span className="ml-1 rounded bg-[#dc3545] px-1.5 py-0.5 text-[11px] text-white">{remainingCount}</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#17a2b8] text-white">
                  <th className="w-10 border border-[#1ab8d0] px-3 py-2.5 text-center text-xs font-semibold">#</th>
                  <th className="border border-[#1ab8d0] px-3 py-2.5 text-left text-xs font-semibold">File Name</th>
                  <th className="border border-[#1ab8d0] px-3 py-2.5 text-left text-xs font-semibold">Upload Documents</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((att, i) => (
                  <tr key={att.id} className={i % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-[#1a2232]"}>
                    <td className="border-b border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{i + 1}</td>
                    <td className="border-b border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{att.fileName}</td>
                    <td className="border-b border-stroke px-3 py-2.5 dark:border-dark-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          className="h-8 flex-1 rounded border border-stroke bg-gray-50 px-2 text-xs text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                          value={att.filePath}
                          placeholder="No file chosen"
                        />
                        <button
                          className="flex size-8 shrink-0 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90 disabled:opacity-40"
                          disabled={!att.filePath}
                          title="Download"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                        </button>
                        <button
                          className="flex size-8 shrink-0 items-center justify-center rounded bg-[#dc3545] text-white hover:opacity-90"
                          onClick={() => setAttachments((prev) => prev.map((a) => a.id === att.id ? { ...a, filePath: "" } : a))}
                          title="Delete"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3,0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/weavers/society-enrollment/request-for-society-enrollment/list")} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSave} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
            Save
          </button>
          <button onClick={handleUpdate} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            Update
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
                      <option value="COIMBATORE">COIMBATORE</option>
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
