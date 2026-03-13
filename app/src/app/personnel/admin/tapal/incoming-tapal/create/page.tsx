"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const labelCls = "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1";
const inputCls = "w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none transition focus:border-[#2d8f7b] dark:border-strokedark dark:text-white dark:focus:border-[#2d8f7b]";
const selectCls = "w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none transition focus:border-[#2d8f7b] dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-[#2d8f7b]";

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-5">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

interface DocRow { id: number; name: string; file: File | null }

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const DISTRICTS: Record<string, string[]> = {
  "Tamil Nadu":   ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Cuddalore"],
  "Maharashtra":  ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  "Karnataka":    ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
};

export default function CreateIncomingTapalPage() {
  const router = useRouter();

  const [receivedDate,    setReceivedDate]    = useState("");
  const [deliveryType,    setDeliveryType]    = useState("");
  const [noOfLetters,     setNoOfLetters]     = useState("");
  const [toWhom,          setToWhom]          = useState("");
  const [senderType,      setSenderType]      = useState("");
  const [senderName,      setSenderName]      = useState("");
  const [tapalRefNo,      setTapalRefNo]      = useState("");
  const [referenceDate,   setReferenceDate]   = useState("");
  const [addressLine1,    setAddressLine1]    = useState("");
  const [addressLine2,    setAddressLine2]    = useState("");
  const [state,           setState]           = useState("");
  const [district,        setDistrict]        = useState("");
  const [pincode,         setPincode]         = useState("");
  const [paymentDetails,  setPaymentDetails]  = useState<"Yes" | "No">("No");
  const [skipApproval,    setSkipApproval]    = useState("No");
  const [forwardTo,       setForwardTo]       = useState("");
  const [forwardFor,      setForwardFor]      = useState("");

  const [docs, setDocs] = useState<DocRow[]>([{ id: 1, name: "", file: null }]);
  const nextDocId = useRef(2);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle,     setNoteTitle]     = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<{ title: string; date: string }[]>([]);

  const districts = state && DISTRICTS[state] ? DISTRICTS[state] : [];

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  const handleSaveNote = () => {
    const content = editorRef.current?.innerHTML || "";
    if (!noteTitle.trim() && !content.trim()) return;
    setNotes(prev => [...prev, { title: noteTitle, date: new Date().toLocaleDateString("en-IN") }]);
    setNoteTitle("");
    if (editorRef.current) editorRef.current.innerHTML = "";
    setShowNoteModal(false);
  };

  const handleFileSelect = (id: number, file: File | null) => {
    if (!file) return;
    setDocs(prev => prev.map(d => d.id === id ? { ...d, name: file.name, file } : d));
  };

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Incoming Tapal</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Tapal</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Incoming Tapal</li>
          </ol>
        </nav>
      </div>

      {/* ── Main card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] px-5 py-3" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Incoming Tapal</h3>
          <span className="text-xs text-white/80">( Mandatory Fields )</span>
        </div>

        <div className="p-5">
          {/* ── Incoming Tapal Details ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className={labelCls}>Received Date <span className="text-red-500">*</span></label>
              <input type="date" className={inputCls} value={receivedDate} onChange={e => setReceivedDate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Delivery Type <span className="text-red-500">*</span></label>
              <select className={selectCls} value={deliveryType} onChange={e => setDeliveryType(e.target.value)}>
                <option value="">Select</option>
                <option>Courier</option>
                <option>Registered Post</option>
                <option>Speed Post</option>
                <option>Hand Delivery</option>
                <option>Fax</option>
                <option>Email</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>No of Letters</label>
              <input type="number" className={inputCls} min="0" placeholder="" value={noOfLetters} onChange={e => setNoOfLetters(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>To Whom <span className="text-red-500">*</span></label>
              <select className={selectCls} value={toWhom} onChange={e => setToWhom(e.target.value)}>
                <option value="">Select</option>
                <option>Individual</option>
                <option>Department</option>
                <option>Committee</option>
                <option>Board</option>
              </select>
            </div>
          </div>

          {/* ── Sender Details ── */}
          <SubHeader title="Sender Details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className={labelCls}>Sender Type <span className="text-red-500">*</span></label>
              <select className={selectCls} value={senderType} onChange={e => setSenderType(e.target.value)}>
                <option value="">Select</option>
                <option>Individual</option>
                <option>Government Department</option>
                <option>Private Organization</option>
                <option>Bank</option>
                <option>Court</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Sender Name <span className="text-red-500">*</span></label>
              <input className={inputCls} placeholder="" value={senderName} onChange={e => setSenderName(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Tapal Reference Number</label>
              <input className={inputCls} placeholder="" value={tapalRefNo} onChange={e => setTapalRefNo(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Reference Date</label>
              <input type="date" className={inputCls} value={referenceDate} onChange={e => setReferenceDate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Address Line 1</label>
              <input className={inputCls} placeholder="" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Address Line 2</label>
              <input className={inputCls} placeholder="" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>State</label>
              <select className={selectCls} value={state} onChange={e => { setState(e.target.value); setDistrict(""); }}>
                <option value="">Select</option>
                {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>District</label>
              <select className={selectCls} value={district} onChange={e => setDistrict(e.target.value)}>
                <option value="">Select</option>
                {districts.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Pincode</label>
              <input className={inputCls} placeholder="" maxLength={6} value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, ""))} />
            </div>
            <div>
              <label className={labelCls}>Payment Details</label>
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white cursor-pointer">
                  <input type="radio" name="payDet" value="Yes" checked={paymentDetails === "Yes"} onChange={() => setPaymentDetails("Yes")} className="accent-[#17a2b8]" /> Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-dark dark:text-white cursor-pointer">
                  <input type="radio" name="payDet" value="No" checked={paymentDetails === "No"} onChange={() => setPaymentDetails("No")} className="accent-[#17a2b8]" /> No
                </label>
              </div>
            </div>
          </div>

          {/* ── Document Upload ── */}
          <SubHeader title="Document Upload" />
          <div className="overflow-x-auto mb-2">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white w-12">#</th>
                  <th className="border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white">Document Name</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-white w-32">Action</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, idx) => (
                  <tr key={doc.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        className="w-full bg-transparent text-sm text-dark dark:text-white outline-none border-b border-stroke dark:border-strokedark focus:border-[#17a2b8] py-0.5"
                        value={doc.name}
                        onChange={e => setDocs(prev => prev.map(d => d.id === doc.id ? { ...d, name: e.target.value } : d))}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => fileInputRefs.current[doc.id]?.click()}
                          className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold text-white" style={{ background: "#17a2b8" }}>↑</button>
                        <input type="file" className="hidden" ref={el => { fileInputRefs.current[doc.id] = el; }}
                          onChange={e => handleFileSelect(doc.id, e.target.files?.[0] ?? null)} />
                        <button className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold text-white" style={{ background: "#28a745" }}>↓</button>
                        <button onClick={() => setDocs(prev => prev.filter(d => d.id !== doc.id))}
                          className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold text-white" style={{ background: "#dc3545" }}>✕</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => setDocs(prev => [...prev, { id: nextDocId.current++, name: "", file: null }])}
            className="text-xs font-medium text-[#17a2b8] hover:underline">+ Add Row</button>

          {/* ── Workflow ── */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className={labelCls}>Skip Approval</label>
              <select className={selectCls} value={skipApproval} onChange={e => setSkipApproval(e.target.value)}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Forward To <span className="text-red-500">*</span></label>
              <input className={inputCls} placeholder="" value={forwardTo} onChange={e => setForwardTo(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Forward For <span className="text-red-500">*</span></label>
              <select className={selectCls} value={forwardFor} onChange={e => setForwardFor(e.target.value)}>
                <option value="">Select</option>
                <option>Approval</option>
                <option>Information</option>
                <option>Action</option>
                <option>Review</option>
              </select>
            </div>
          </div>

          {/* Create Note */}
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
        <button onClick={() => router.push("/personnel/admin/tapal/incoming-tapal/list")}
          className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Cancel
        </button>
        <button onClick={() => router.push("/personnel/admin/tapal/incoming-tapal/list")}
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

              {/* Toolbar */}
              <div className="mb-2 flex flex-wrap gap-1 rounded border border-stroke bg-gray-50 p-2 dark:border-dark-3 dark:bg-gray-800">
                {[{ l: "B", c: "bold" }, { l: "I", c: "italic" }, { l: "U", c: "underline" }, { l: "S", c: "strikeThrough" }].map(b => (
                  <button key={b.c} onMouseDown={e => { e.preventDefault(); execCmd(b.c); }}
                    className="flex h-7 w-7 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-200 dark:border-dark-3 dark:text-white">
                    {b.l}
                  </button>
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

              {/* Created By card */}
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
                <button onClick={() => setShowNoteModal(false)}
                  className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Cancel</button>
                <button onClick={handleSaveNote}
                  className="rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
