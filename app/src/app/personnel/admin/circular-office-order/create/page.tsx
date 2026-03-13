"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const TYPE_OPTIONS        = ["Circular", "Office Order"];
const CIRCULAR_FOR_OPTIONS= ["All Staff", "Officers", "Managers", "Directors", "Specific Department"];
const HO_RO_OPTIONS       = ["Head Office", "Chennai RO", "Coimbatore RO", "Madurai RO", "Salem RO", "Trichy RO", "Vellore RO", "Erode RO"];
const ENTITY_TYPE_OPTIONS = ["HO", "RO", "Branch", "Society", "Cooperative"];
const ENTITY_OPTIONS      = ["Head Office", "Chennai RO", "Coimbatore RO", "Madurai RO", "Salem RO"];
const DEPT_OPTIONS        = ["ADMIN", "FINANCE", "HR", "MARKETING", "TECHNICAL", "OPERATIONS"];
const SECTION_OPTIONS     = ["Admin", "Finance", "HR", "Marketing", "Technical", "Operations"];
const MEETING_TYPE_OPTIONS= ["Board Meeting", "General Meeting", "Review Meeting", "Committee Meeting"];
const REMINDER_OPTIONS    = ["1 Day Before", "2 Days Before", "3 Days Before", "1 Week Before"];
const INITIATED_OPTIONS   = ["Admin Officer", "HR Manager", "Finance Manager", "Director"];
const FWD_TO_OPTIONS      = ["Director", "Manager", "Officer", "Supervisor"];
const FWD_FOR_OPTIONS     = ["Approval", "Information", "Action", "Review"];

type FormField = "type"|"circularFor"|"hoRo"|"entityTypeCode"|"entityCode"|"department"|"section"|
  "meetingType"|"meetingVenue"|"meetingDate"|"startTime"|"endTime"|"reminderMail"|"initiatedBy"|
  "meetingSection"|"meetingRequired"|"subject"|"forwardTo"|"forwardFor";

const CalIcon = () => (
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
const OrgIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="8" y="2" width="8" height="4" rx="1"/><rect x="1" y="16" width="8" height="4" rx="1"/>
    <rect x="15" y="16" width="8" height="4" rx="1"/>
    <path d="M4 20v-4"/><path d="M20 20v-4"/><path d="M12 6v4M4 16v-4h16v4"/>
  </svg>
);
const UserIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function CreateCircularOfficeOrderPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Record<FormField, string>>({
    type: "", circularFor: "", hoRo: "", entityTypeCode: "", entityCode: "",
    department: "", section: "", meetingType: "", meetingVenue: "", meetingDate: "",
    startTime: "", endTime: "", reminderMail: "", initiatedBy: "", meetingSection: "",
    meetingRequired: "Yes", subject: "", forwardTo: "", forwardFor: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadFileName, setUploadFileName] = useState("");
  const [description, setDescription] = useState("");

  const [recipients, setRecipients] = useState<{id:number; entityType:string; entity:string; dept:string; section:string}[]>([]);
  const [rEntityType, setREntityType] = useState("");
  const [rEntity,     setREntity]     = useState("");
  const [rDept,       setRDept]       = useState("");
  const [rSection,    setRSection]    = useState("");

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText]           = useState("");
  const [noteFont, setNoteFont]           = useState("Arial");
  const [noteFontSize, setNoteFontSize]   = useState("12");

  const set = (k: FormField, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n={...e}; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.type)        e.type        = "Required";
    if (!form.circularFor) e.circularFor = "Required";
    if (!form.hoRo)        e.hoRo        = "Required";
    if (!form.department)  e.department  = "Required";
    if (!form.section)     e.section     = "Required";
    if (!form.subject)     e.subject     = "Required";
    return e;
  };

  const addRecipient = () => {
    if (!rEntityType || !rEntity) return;
    setRecipients(r => [...r, { id: Date.now(), entityType: rEntityType, entity: rEntity, dept: rDept, section: rSection }]);
    setREntityType(""); setREntity(""); setRDept(""); setRSection("");
  };
  const removeRecipient = (id: number) => setRecipients(r => r.filter(x => x.id !== id));

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/admin/circular-office-order/list");
  };

  const labelCls = "block text-sm font-medium text-dark dark:text-white mb-1";
  const errCls   = "mt-0.5 text-xs text-red-500";
  const inputCls = (k: string) =>
    `flex items-center overflow-hidden rounded border ${errors[k]?"border-red-400":"border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`;

  const SelectWithIcon = ({ icon, field, options, placeholder="Select" }: { icon: React.ReactNode; field: FormField; options: string[]; placeholder?: string }) => (
    <div className={inputCls(field)}>
      <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
      <select value={form[field]} onChange={e=>set(field, e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
        <option value="">{placeholder}</option>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const InputWithIcon = ({ icon, field, type="text" }: { icon: React.ReactNode; field: FormField; type?: string }) => (
    <div className={inputCls(field)}>
      <input type={type} value={form[field]} onChange={e=>set(field, e.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
      <span className="flex w-9 shrink-0 items-center justify-center border-l border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">{icon}</span>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Circular / Office Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Circular / Office Order</li>
          </ol>
        </nav>
      </div>

      <div className="space-y-5">
        {/* Main Form Card */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Circular / Office Order</h3>
            <span className="text-xs text-white/80">(* Mandatory Fields)</span>
          </div>
          <div className="space-y-4 p-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>Type <span className="text-red-500">*</span></label>
                <SelectWithIcon icon={<DocIcon />} field="type" options={TYPE_OPTIONS} />
                {errors.type && <p className={errCls}>{errors.type}</p>}
              </div>
              <div>
                <label className={labelCls}>Circular / Office Order For <span className="text-red-500">*</span></label>
                <SelectWithIcon icon={<UserIcon />} field="circularFor" options={CIRCULAR_FOR_OPTIONS} />
                {errors.circularFor && <p className={errCls}>{errors.circularFor}</p>}
              </div>
              <div>
                <label className={labelCls}>H.O / R.O <span className="text-red-500">*</span></label>
                <SelectWithIcon icon={<OrgIcon />} field="hoRo" options={HO_RO_OPTIONS} />
                {errors.hoRo && <p className={errCls}>{errors.hoRo}</p>}
              </div>
              <div>
                <label className={labelCls}>Entity Type Code / Name</label>
                <SelectWithIcon icon={<DocIcon />} field="entityTypeCode" options={ENTITY_TYPE_OPTIONS} />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>Entity Code / Name</label>
                <SelectWithIcon icon={<DocIcon />} field="entityCode" options={ENTITY_OPTIONS} />
              </div>
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
              <div className="flex items-end">
                <button type="button" onClick={addRecipient}
                  className="flex w-full items-center justify-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add
                </button>
              </div>
            </div>

            {/* Recipients Table */}
            {recipients.length > 0 && (
              <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
                <table className="w-full text-xs">
                  <thead className="bg-[#2d8f7b] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">#</th>
                      <th className="px-3 py-2 text-left">Entity Type</th>
                      <th className="px-3 py-2 text-left">Entity</th>
                      <th className="px-3 py-2 text-left">Department</th>
                      <th className="px-3 py-2 text-left">Section</th>
                      <th className="px-3 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipients.map((r, i) => (
                      <tr key={r.id} className={i%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                        <td className="px-3 py-1.5 text-gray-500">{i+1}</td>
                        <td className="px-3 py-1.5">{r.entityType}</td>
                        <td className="px-3 py-1.5">{r.entity}</td>
                        <td className="px-3 py-1.5">{r.dept}</td>
                        <td className="px-3 py-1.5">{r.section}</td>
                        <td className="px-3 py-1.5 text-center">
                          <button onClick={() => removeRecipient(r.id)} className="text-red-500 hover:text-red-600">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Meeting Details Card */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Meeting Details</h3>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>Type of Meeting</label>
                <SelectWithIcon icon={<DocIcon />} field="meetingType" options={MEETING_TYPE_OPTIONS} />
              </div>
              <div>
                <label className={labelCls}>Venue</label>
                <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                  <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <input type="text" value={form.meetingVenue} onChange={e=>set("meetingVenue",e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Date</label>
                <InputWithIcon icon={<CalIcon />} field="meetingDate" type="date" />
              </div>
              <div>
                <label className={labelCls}>Start Time</label>
                <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                  <input type="time" value={form.startTime} onChange={e=>set("startTime",e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>End Time</label>
                <div className="flex items-center overflow-hidden rounded border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                  <input type="time" value={form.endTime} onChange={e=>set("endTime",e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Reminder by Mail</label>
                <SelectWithIcon icon={<CalIcon />} field="reminderMail" options={REMINDER_OPTIONS} />
              </div>
              <div>
                <label className={labelCls}>Initiated By</label>
                <SelectWithIcon icon={<UserIcon />} field="initiatedBy" options={INITIATED_OPTIONS} />
              </div>
              <div>
                <label className={labelCls}>Section</label>
                <SelectWithIcon icon={<OrgIcon />} field="meetingSection" options={SECTION_OPTIONS} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>Meeting Required</label>
                <div className="flex gap-4 pt-1">
                  {["Yes","No"].map(v => (
                    <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm text-dark dark:text-white">
                      <input type="radio" name="meetingRequired" value={v} checked={form.meetingRequired===v}
                        onChange={() => set("meetingRequired",v)} className="accent-[#2d8f7b]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload & Content Card */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Content</h3>
          </div>
          <div className="space-y-4 p-5">
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
                <input ref={fileRef} type="file" accept=".pdf,.doc,.xlsx,.png,.jpg,.gif" className="hidden"
                  onChange={e => { if (e.target.files?.[0]) setUploadFileName(e.target.files[0].name); }} />
              </div>
              <p className="mt-1 text-[11px] text-gray-400">File format: pdf, doc, xlsx, png, jpg, gif. File size should be less than 100 MB</p>
            </div>

            {/* Subject */}
            <div>
              <label className={labelCls}>Subject <span className="text-red-500">*</span></label>
              <input type="text" value={form.subject} onChange={e=>set("subject",e.target.value)}
                className={`w-full rounded border ${errors.subject?"border-red-400":"border-stroke dark:border-dark-3"} bg-white px-3 py-2 text-sm text-dark focus:outline-none dark:bg-gray-dark dark:text-white`} />
              {errors.subject && <p className={errCls}>{errors.subject}</p>}
            </div>

            {/* Description RTE */}
            <div>
              <label className={labelCls}>Circular / Office Order Description</label>
              <div className="rounded border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800">
                  {["B","I","U","abc","x₂","x²","T↑","H1","T↓","↩","↪","≡","≡","🔗","✂","🖨"].map((t,i)=>(
                    <button key={i} type="button" className="rounded px-1.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{t}</button>
                  ))}
                </div>
                <div contentEditable suppressContentEditableWarning
                  onInput={e=>setDescription((e.target as HTMLDivElement).innerText)}
                  className="min-h-[160px] px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Card */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Workflow</h3>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelCls}>Forward To</label>
                <SelectWithIcon icon={<UserIcon />} field="forwardTo" options={FWD_TO_OPTIONS} />
              </div>
              <div>
                <label className={labelCls}>Forward For</label>
                <SelectWithIcon icon={<DocIcon />} field="forwardFor" options={FWD_FOR_OPTIONS} />
              </div>
              <div className="flex items-end">
                <button type="button" onClick={() => setShowNoteModal(true)}
                  className="flex w-full items-center justify-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Create Note
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
              <button onClick={() => router.push("/personnel/admin/circular-office-order/list")}
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
          <div className="w-[560px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Font selectors */}
              <div className="flex items-center gap-2">
                <select value={noteFont} onChange={e=>setNoteFont(e.target.value)}
                  className="rounded border border-stroke px-2 py-1.5 text-xs text-dark focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {["Arial","Times New Roman","Courier New","Georgia","Verdana"].map(f=><option key={f} value={f}>{f}</option>)}
                </select>
                <select value={noteFontSize} onChange={e=>setNoteFontSize(e.target.value)}
                  className="w-16 rounded border border-stroke px-2 py-1.5 text-xs text-dark focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {["8","10","12","14","16","18","20","24","28","32"].map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* RTE */}
              <div className="rounded border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800">
                  {["B","I","U","S","↩","↪"].map((t,i)=>(
                    <button key={i} type="button" className="rounded px-1.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{t}</button>
                  ))}
                </div>
                <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} rows={5}
                  className="w-full resize-none px-3 py-2 text-sm text-dark focus:outline-none dark:bg-gray-dark dark:text-white"
                  style={{ fontFamily: noteFont, fontSize: `${noteFontSize}px` }} />
              </div>
              {/* Created By card */}
              <div className="rounded border border-stroke bg-gray-50 p-3 dark:border-dark-3 dark:bg-gray-800">
                <p className="text-xs font-semibold text-dark dark:text-white">Created By</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div><p className="text-gray-500">Name</p><p className="font-medium text-dark dark:text-white">Admin User</p></div>
                  <div><p className="text-gray-500">Designation</p><p className="font-medium text-dark dark:text-white">System Admin</p></div>
                  <div><p className="text-gray-500">Date</p><p className="font-medium text-dark dark:text-white">13-Mar-2026</p></div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNoteModal(false)}
                  className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Cancel</button>
                <button onClick={() => setShowNoteModal(false)}
                  className="rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
