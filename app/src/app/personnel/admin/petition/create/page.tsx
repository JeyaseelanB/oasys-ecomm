"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const SOURCE_OPTIONS   = ["POST", "EMAIL", "ONLINE", "WALK-IN", "FAX"];
const TYPE_OPTIONS     = ["RTI", "MINISTER", "CM-CELL", "MLA", "MP", "COURT"];
const GROUP_OPTIONS    = ["Individual", "Group", "Organization", "Association"];
const HO_RO_OPTIONS    = ["HEAD OFFICE", "BANGALORE", "CHENNAI", "COIMBATORE", "MADURAI", "SALEM", "TRICHY", "VELLORE"];
const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

type FormField =
  | "sourceOfPetition" | "typeOfPetition" | "referenceNumber" | "groupOfPetitions"
  | "petitionerName"   | "contactNumber"  | "emailId"         | "dateOfPetition"
  | "dateOfReceipt"    | "priorityOfPetition" | "hoRo"         | "actionDueDate"
  | "forwardTo";

const CalIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const SourceIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
);
const ListIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const HashIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const GridIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const UserIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const PhoneIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10a2 2 0 012-2.18h3a2 2 0 012 1.72 12.5 12.5 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 15a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45 12.5 12.5 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const DeviceIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const OrgIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="8" y="2" width="8" height="4" rx="1"/><rect x="1" y="16" width="8" height="4" rx="1"/>
    <rect x="15" y="16" width="8" height="4" rx="1"/>
    <path d="M4 20v-4"/><path d="M20 20v-4"/><path d="M12 6v4M4 16v-4h16v4"/>
  </svg>
);
const ArrowIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
  </svg>
);

export default function CreatePetitionPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Record<FormField, string>>({
    sourceOfPetition: "", typeOfPetition: "", referenceNumber: "", groupOfPetitions: "",
    petitionerName: "", contactNumber: "", emailId: "", dateOfPetition: "",
    dateOfReceipt: "", priorityOfPetition: "", hoRo: "", actionDueDate: "", forwardTo: "",
  });
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  const [showNoteModal, setShowNoteModal]   = useState(false);
  const [noteText, setNoteText]             = useState("");

  const set = (k: FormField, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n={...e}; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.sourceOfPetition)    e.sourceOfPetition    = "Required";
    if (!form.typeOfPetition)      e.typeOfPetition      = "Required";
    if (!form.referenceNumber)     e.referenceNumber     = "Required";
    if (!form.groupOfPetitions)    e.groupOfPetitions    = "Required";
    if (!form.petitionerName)      e.petitionerName      = "Required";
    if (!form.contactNumber)       e.contactNumber       = "Required";
    if (!form.emailId)             e.emailId             = "Required";
    if (!form.dateOfPetition)      e.dateOfPetition      = "Required";
    if (!form.dateOfReceipt)       e.dateOfReceipt       = "Required";
    if (!form.priorityOfPetition)  e.priorityOfPetition  = "Required";
    if (!form.hoRo)                e.hoRo                = "Required";
    if (!form.actionDueDate)       e.actionDueDate       = "Required";
    if (!form.forwardTo)           e.forwardTo           = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/admin/petition/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls   = "mt-0.5 text-xs text-red-500";
  const bordCls  = (k: string) => errors[k] ? "border-red-400" : "border-stroke dark:border-dark-3";

  const SelectBox = ({ icon, field, options }: { icon: React.ReactNode; field: FormField; options: string[] }) => (
    <div className={`flex items-center overflow-hidden rounded border ${bordCls(field)} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      <select value={form[field]} onChange={e=>set(field, e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
        <option value="">Select</option>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const InputBox = ({ icon, field, type="text", placeholder="" }: { icon: React.ReactNode; field: FormField; type?: string; placeholder?: string }) => (
    <div className={`flex items-center overflow-hidden rounded border ${bordCls(field)} bg-white dark:bg-gray-dark`}>
      <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      <input type={type} value={form[field]} onChange={e=>set(field, e.target.value)} placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
    </div>
  );

  const DateBox = ({ field, placeholder="dd-MMM-yyyy" }: { field: FormField; placeholder?: string }) => (
    <div className={`flex items-center overflow-hidden rounded border ${bordCls(field)} bg-white dark:bg-gray-dark`}>
      <input type="date" value={form[field]} onChange={e=>set(field, e.target.value)} placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
      <span className="flex w-9 shrink-0 items-center justify-center border-l border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><CalIcon /></span>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Petition</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Petition</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Create Petition</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="space-y-4 p-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Source of Petition <span className="text-red-500">*</span></label>
              <SelectBox icon={<SourceIcon />} field="sourceOfPetition" options={SOURCE_OPTIONS} />
              {errors.sourceOfPetition && <p className={errCls}>{errors.sourceOfPetition}</p>}
            </div>
            <div>
              <label className={labelCls}>Type of Petition <span className="text-red-500">*</span></label>
              <SelectBox icon={<ListIcon />} field="typeOfPetition" options={TYPE_OPTIONS} />
              {errors.typeOfPetition && <p className={errCls}>{errors.typeOfPetition}</p>}
            </div>
            <div>
              <label className={labelCls}>Reference Number <span className="text-red-500">*</span></label>
              <InputBox icon={<HashIcon />} field="referenceNumber" />
              {errors.referenceNumber && <p className={errCls}>{errors.referenceNumber}</p>}
            </div>
            <div>
              <label className={labelCls}>Group of Petitions <span className="text-red-500">*</span></label>
              <SelectBox icon={<GridIcon />} field="groupOfPetitions" options={GROUP_OPTIONS} />
              {errors.groupOfPetitions && <p className={errCls}>{errors.groupOfPetitions}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Petitioner Name <span className="text-red-500">*</span></label>
              <InputBox icon={<UserIcon />} field="petitionerName" />
              {errors.petitionerName && <p className={errCls}>{errors.petitionerName}</p>}
            </div>
            <div>
              <label className={labelCls}>Contact Number <span className="text-red-500">*</span></label>
              <InputBox icon={<PhoneIcon />} field="contactNumber" type="tel" />
              {errors.contactNumber && <p className={errCls}>{errors.contactNumber}</p>}
            </div>
            <div>
              <label className={labelCls}>Email ID <span className="text-red-500">*</span></label>
              <InputBox icon={<MailIcon />} field="emailId" type="email" />
              {errors.emailId && <p className={errCls}>{errors.emailId}</p>}
            </div>
            <div>
              <label className={labelCls}>Date of Petition <span className="text-red-500">*</span></label>
              <DateBox field="dateOfPetition" />
              {errors.dateOfPetition && <p className={errCls}>{errors.dateOfPetition}</p>}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Date of receipt of Petition <span className="text-red-500">*</span></label>
              <DateBox field="dateOfReceipt" />
              {errors.dateOfReceipt && <p className={errCls}>{errors.dateOfReceipt}</p>}
            </div>
            <div>
              <label className={labelCls}>Priority of Petition <span className="text-red-500">*</span></label>
              <SelectBox icon={<DeviceIcon />} field="priorityOfPetition" options={PRIORITY_OPTIONS} />
              {errors.priorityOfPetition && <p className={errCls}>{errors.priorityOfPetition}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description of the petition <span className="text-red-500">*</span></label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4}
              className="w-full resize-y rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
          </div>

          {/* To Details Section */}
          <div className="border-t border-stroke pt-4 dark:border-dark-3">
            <div className="mb-3 flex items-center gap-2">
              <GridIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">To Details</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>HO/RO <span className="text-red-500">*</span></label>
                <SelectBox icon={<OrgIcon />} field="hoRo" options={HO_RO_OPTIONS} />
                {errors.hoRo && <p className={errCls}>{errors.hoRo}</p>}
              </div>
              <div>
                <label className={labelCls}>Action due date <span className="text-red-500">*</span></label>
                <DateBox field="actionDueDate" />
                {errors.actionDueDate && <p className={errCls}>{errors.actionDueDate}</p>}
              </div>
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className={labelCls}>Upload Documents</label>
            <div className="flex items-center gap-2">
              <input type="text" readOnly value={uploadFileName}
                className="w-56 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-gray-800 dark:text-white" />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                Upload
              </button>
              <input ref={fileRef} type="file" accept=".png,.jpeg,.pdf,.doc" className="hidden"
                onChange={e => { if (e.target.files?.[0]) setUploadFileName(e.target.files[0].name); }} />
            </div>
            <p className="mt-1 text-[11px] text-red-400">File format: png, jpeg, pdf, doc and file size should be less than 100MB</p>
          </div>

          {/* Forward To */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className={labelCls}>Forward To <span className="text-red-500">*</span></label>
              <div className={`flex items-center overflow-hidden rounded border ${bordCls("forwardTo")} bg-white dark:bg-gray-dark`}>
                <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700"><ArrowIcon /></span>
                <input type="text" value={form.forwardTo} onChange={e=>set("forwardTo", e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </div>
              {errors.forwardTo && <p className={errCls}>{errors.forwardTo}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button type="button" onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex gap-2">
              <button onClick={() => router.push("/personnel/admin/petition/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[640px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} rows={8}
                className="w-full resize-none rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              {/* Created By Card */}
              <div className="inline-block rounded border border-red-300 p-4 text-sm">
                <p className="mb-2 font-semibold text-dark dark:text-white">
                  <span className="text-red-500">*</span>Created By
                </p>
                <p className="text-dark dark:text-white">Name : SANKARANARAYANAN</p>
                <p className="text-dark dark:text-white">Designation : SUPERINTENDENT</p>
                <p className="text-dark dark:text-white">Date : 11-Mar-2026</p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
