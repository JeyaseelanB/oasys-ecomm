"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const labelCls  = "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1";
const inputCls  = "w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none transition focus:border-[#2d8f7b] dark:border-strokedark dark:text-white dark:focus:border-[#2d8f7b]";
const selectCls = "w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none transition focus:border-[#2d8f7b] dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-[#2d8f7b]";

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-5">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

/* InputBox: left icon + field — matches the infotex portal style */
const InputBox = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex overflow-hidden rounded border border-stroke dark:border-strokedark focus-within:border-[#2d8f7b]">
    <span className="flex shrink-0 items-center justify-center border-r border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-gray-300">
      {icon}
    </span>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
);

const HashIcon   = () => <span className="text-sm font-semibold">#</span>;
const ListIcon   = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const GridSmIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const PersonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const LocIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const FwdIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/>
  </svg>
);
const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);

const iboxField = "w-full px-2.5 py-2 text-sm text-dark dark:text-white bg-transparent outline-none";
const iboxSelect = "w-full px-2.5 py-2 text-sm text-dark dark:text-white bg-white dark:bg-boxdark outline-none";

const INDIAN_STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
const DISTRICTS: Record<string, string[]> = {
  "Tamil Nadu":  ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Vellore","Erode"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Thane","Nashik","Aurangabad"],
  "Karnataka":   ["Bengaluru","Mysuru","Hubballi","Mangaluru","Belagavi"],
};

export default function CreateOutgoingTapalPage() {
  const router = useRouter();

  const [sendingDate,   setSendingDate]   = useState("");
  const [deliveryType,  setDeliveryType]  = useState("");
  const [noOfLetters,   setNoOfLetters]   = useState("");
  const [tapalRefNo,    setTapalRefNo]    = useState("");
  const [referenceDate, setReferenceDate] = useState("");
  const [department,    setDepartment]    = useState("");
  const [section,       setSection]       = useState("");
  const [subject,       setSubject]       = useState("");

  const [tapalFor,      setTapalFor]      = useState("");
  const [name,          setName]          = useState("");
  const [address1,      setAddress1]      = useState("");
  const [address2,      setAddress2]      = useState("");
  const [state,         setState]         = useState("");
  const [district,      setDistrict]      = useState("");
  const [pincode,       setPincode]       = useState("");
  const [payDetails,    setPayDetails]    = useState<"Yes"|"No">("No");
  const [incomingRef,   setIncomingRef]   = useState("");

  const [attachFile,    setAttachFile]    = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [skipApproval,  setSkipApproval]  = useState("No");
  const [forwardTo,     setForwardTo]     = useState("");
  const [forwardFor,    setForwardFor]    = useState("");

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle,     setNoteTitle]     = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<{ title: string; date: string }[]>([]);

  const districts = state && DISTRICTS[state] ? DISTRICTS[state] : [];

  const execCmd = (cmd: string) => { document.execCommand(cmd, false); editorRef.current?.focus(); };

  const handleSaveNote = () => {
    const content = editorRef.current?.innerHTML || "";
    if (!noteTitle.trim() && !content.trim()) return;
    setNotes(prev => [...prev, { title: noteTitle, date: new Date().toLocaleDateString("en-IN") }]);
    setNoteTitle(""); if (editorRef.current) editorRef.current.innerHTML = "";
    setShowNoteModal(false);
  };

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Outgoing Tapal</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Outgoing Tapal</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Outgoing Tapal</h3>
          <span className="text-xs text-white/80">(- Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* ── Row 1 ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className={labelCls}>Sending Date <span className="text-red-500">*</span></label>
              <InputBox icon={<GridSmIcon />}>
                <input type="date" className={iboxField} value={sendingDate} onChange={e => setSendingDate(e.target.value)} placeholder="dd-MMM-yyyy" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Delivery Type <span className="text-red-500">*</span></label>
              <InputBox icon={<ListIcon />}>
                <select className={iboxSelect} value={deliveryType} onChange={e => setDeliveryType(e.target.value)}>
                  <option value="">Select</option>
                  <option>Courier</option><option>Speed Post</option><option>Registered Post</option>
                  <option>COVER</option><option>PARCEL</option><option>Hand Delivery</option><option>Fax</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>No of Letters</label>
              <InputBox icon={<HashIcon />}>
                <input className={iboxField} type="number" min="0" value={noOfLetters} onChange={e => setNoOfLetters(e.target.value)} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Tapal Reference Number</label>
              <InputBox icon={<HashIcon />}>
                <input className={iboxField} value={tapalRefNo} onChange={e => setTapalRefNo(e.target.value)} />
              </InputBox>
            </div>
          </div>

          {/* ── Row 2 ── */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className={labelCls}>Reference Date</label>
              <InputBox icon={<GridSmIcon />}>
                <input type="date" className={iboxField} value={referenceDate} onChange={e => setReferenceDate(e.target.value)} placeholder="dd-MMM-yyyy" />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Department <span className="text-red-500">*</span></label>
              <InputBox icon={<GridSmIcon />}>
                <select className={iboxSelect} value={department} onChange={e => setDepartment(e.target.value)}>
                  <option value="">Select</option>
                  <option>MARKETING</option><option>ADMINISTRATION</option><option>FINANCE</option>
                  <option>PROCUREMENT</option><option>HR</option><option>IT</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Section <span className="text-red-500">*</span></label>
              <InputBox icon={<GridSmIcon />}>
                <select className={iboxSelect} value={section} onChange={e => setSection(e.target.value)}>
                  <option value="">Select</option>
                  <option>Export</option><option>Retail</option><option>Accounts</option>
                  <option>General</option><option>Legal</option>
                </select>
              </InputBox>
            </div>
          </div>

          {/* ── Subject ── */}
          <div className="mt-4">
            <label className={labelCls}>Subject <span className="text-red-500">*</span></label>
            <InputBox icon={<ListIcon />}>
              <input className={iboxField} value={subject} onChange={e => setSubject(e.target.value)} />
            </InputBox>
          </div>

          {/* ── Receiver Details ── */}
          <SubHeader title="Receiver Details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className={labelCls}>Tapal For <span className="text-red-500">*</span></label>
              <InputBox icon={<MailIcon />}>
                <select className={iboxSelect} value={tapalFor} onChange={e => setTapalFor(e.target.value)}>
                  <option value="">Select</option>
                  <option>Individual</option><option>Entity</option><option>Department</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Name <span className="text-red-500">*</span></label>
              <InputBox icon={<PersonIcon />}>
                <input className={iboxField} value={name} onChange={e => setName(e.target.value)} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Address Line 1 <span className="text-red-500">*</span></label>
              <InputBox icon={<LocIcon />}>
                <input className={iboxField} value={address1} onChange={e => setAddress1(e.target.value)} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Address Line 2</label>
              <InputBox icon={<LocIcon />}>
                <input className={iboxField} value={address2} onChange={e => setAddress2(e.target.value)} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>State</label>
              <InputBox icon={<LocIcon />}>
                <select className={iboxSelect} value={state} onChange={e => { setState(e.target.value); setDistrict(""); }}>
                  <option value="">Select</option>
                  {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>District</label>
              <InputBox icon={<LocIcon />}>
                <select className={iboxSelect} value={district} onChange={e => setDistrict(e.target.value)}>
                  <option value="">Select</option>
                  {districts.map(d => <option key={d}>{d}</option>)}
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Pincode</label>
              <InputBox icon={<LocIcon />}>
                <input className={iboxField} maxLength={6} value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, ""))} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Payment Details</label>
              <div className="mt-2.5 flex items-center gap-5">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white cursor-pointer">
                  <input type="radio" name="payDet" value="Yes" checked={payDetails === "Yes"} onChange={() => setPayDetails("Yes")} className="accent-[#17a2b8]" /> Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white cursor-pointer">
                  <input type="radio" name="payDet" value="No" checked={payDetails === "No"} onChange={() => setPayDetails("No")} className="accent-[#17a2b8]" /> No
                </label>
              </div>
            </div>
            <div>
              <label className={labelCls}>Incoming Tapal Reference No.</label>
              <InputBox icon={<HashIcon />}>
                <select className={iboxSelect} value={incomingRef} onChange={e => setIncomingRef(e.target.value)}>
                  <option value="">Select</option>
                  <option>R10Y2024-00002</option><option>R10Y2024-00001</option>
                  <option>R10Y2022-01346</option><option>R10Y2022-01345</option>
                </select>
              </InputBox>
            </div>
          </div>

          {/* ── Attachments ── */}
          <SubHeader title="Attachments" />
          <div className="flex items-start gap-3 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <input
                type="text"
                readOnly
                className={inputCls + " cursor-pointer"}
                value={attachFile ? attachFile.name : ""}
                placeholder=""
                onClick={() => fileRef.current?.click()}
              />
              <p className="mt-1 text-xs text-gray-400">File format pdf,doc,xlsx. File size should be less than 5 MB</p>
            </div>
            <input type="file" className="hidden" ref={fileRef} accept=".pdf,.doc,.docx,.xlsx"
              onChange={e => setAttachFile(e.target.files?.[0] ?? null)} />
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
              Upload
            </button>
          </div>
          {attachFile && (
            <div className="mt-2 flex items-center gap-2 text-xs text-[#2d8f7b]">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              {attachFile.name}
              <button onClick={() => setAttachFile(null)} className="text-red-500 hover:text-red-700 font-bold text-sm leading-none">×</button>
            </div>
          )}

          {/* ── Workflow ── */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className={labelCls}>Skip Approval</label>
              <InputBox icon={<FwdIcon />}>
                <select className={iboxSelect} value={skipApproval} onChange={e => setSkipApproval(e.target.value)}>
                  <option>No</option><option>Yes</option>
                </select>
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Forward To <span className="text-red-500">*</span></label>
              <InputBox icon={<FwdIcon />}>
                <input className={iboxField} value={forwardTo} onChange={e => setForwardTo(e.target.value)} />
              </InputBox>
            </div>
            <div>
              <label className={labelCls}>Forward For <span className="text-red-500">*</span></label>
              <InputBox icon={<FwdIcon />}>
                <select className={iboxSelect} value={forwardFor} onChange={e => setForwardFor(e.target.value)}>
                  <option value="">Select</option>
                  <option>Approval</option><option>Information</option><option>Action</option><option>Review</option>
                </select>
              </InputBox>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              + Create Note
            </button>
            {notes.length > 0 && <span className="text-xs text-gray-500">{notes.length} note(s) added</span>}
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={() => router.push("/personnel/admin/tapal/outgoing-tapal/list")}
          className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Cancel
        </button>
        <button onClick={() => router.push("/personnel/admin/tapal/outgoing-tapal/list")}
          className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>
          Submit
        </button>
      </div>

      {/* ── Create Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl mx-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] px-5 py-3" style={{ background: "#2d8f7b" }}>
              <h4 className="text-sm font-semibold text-white">Create Note</h4>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-70 text-xl leading-none">×</button>
            </div>
            <div className="p-5">
              <div className="mb-3">
                <label className={labelCls}>Note Title</label>
                <input className={inputCls} placeholder="Enter title..." value={noteTitle} onChange={e => setNoteTitle(e.target.value)} />
              </div>
              <div className="mb-2 flex flex-wrap gap-1 rounded border border-stroke bg-gray-50 p-2 dark:border-dark-3 dark:bg-gray-800">
                {[{l:"B",c:"bold"},{l:"I",c:"italic"},{l:"U",c:"underline"},{l:"S",c:"strikeThrough"}].map(b => (
                  <button key={b.c} onMouseDown={e => { e.preventDefault(); execCmd(b.c); }}
                    className="flex h-7 w-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-200 dark:border-dark-3 dark:text-white">{b.l}</button>
                ))}
                <div className="mx-1 h-7 w-px bg-stroke dark:bg-dark-3" />
                <button onMouseDown={e => { e.preventDefault(); execCmd("insertOrderedList"); }}
                  className="h-7 rounded border border-stroke px-2 text-xs hover:bg-gray-200 dark:border-dark-3 dark:text-white">OL</button>
                <button onMouseDown={e => { e.preventDefault(); execCmd("insertUnorderedList"); }}
                  className="h-7 rounded border border-stroke px-2 text-xs hover:bg-gray-200 dark:border-dark-3 dark:text-white">UL</button>
              </div>
              <div ref={editorRef} contentEditable suppressContentEditableWarning
                className="min-h-[120px] rounded border border-stroke p-3 text-sm text-dark outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:text-white"
                style={{ lineHeight: 1.6 }} />
              <div className="mt-3 rounded border-2 border-[#fd7e14] bg-orange-50 p-3 dark:bg-gray-800">
                <p className="mb-1 text-xs font-semibold text-[#fd7e14]">Created By</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fd7e14] text-xs font-bold text-white">AD</div>
                  <div>
                    <p className="text-xs font-medium text-dark dark:text-white">Admin User</p>
                    <p className="text-xs text-gray-500">{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-stroke pt-3 dark:border-dark-3">
                <button onClick={() => setShowNoteModal(false)} className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Cancel</button>
                <button onClick={handleSaveNote} className="rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
