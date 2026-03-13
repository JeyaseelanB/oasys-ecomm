"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const FORWARD_FOR_OPTIONS = ["Review","Approval","Information","Action","Comments"];

const RECORD = {
  govRefNo:   "11035",
  govRefDate: "18-Apr-2025",
  period:     "2025-2026",
  dueDate:    "18-Apr-2025",
  department: "ADMIN",
  policyDesc: "cvcvc",
  uploadedDoc:"cooptext_icon.png",
};

export default function PolicyNoteProcessPage() {
  const router = useRouter();
  const uploadRef = useRef<HTMLInputElement>(null);
  const noteEditorRef = useRef<HTMLDivElement>(null);

  const [comments,    setComments]    = useState("");
  const [uploadFile,  setUploadFile]  = useState("");
  const [forwardTo,   setForwardTo]   = useState("");
  const [forwardFor,  setForwardFor]  = useState("");
  const [errors,      setErrors]      = useState<Record<string,string>>({});
  const [showNoteModal, setShowNoteModal] = useState(false);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!comments)    e.comments   = "Required";
    if (!uploadFile)  e.uploadFile = "Required";
    if (!forwardTo)   e.forwardTo  = "Required";
    if (!forwardFor)  e.forwardFor = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    router.push("/personnel/admin/policy-note/list");
  };

  const labelCls = "block text-xs text-gray-500 dark:text-gray-400 mb-0.5";
  const errCls   = "mt-0.5 text-xs text-red-500";

  const ForwardIcon = () => (
    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="15,14 20,9 15,4"/><path d="M4 20v-7a4 4 0 014-4h12"/>
    </svg>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Policy Note Process</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Policy Note Process</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Policy Note Process</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="space-y-4 p-5">
          {/* Read-only header info */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            {[
              ["Government Reference No.",  RECORD.govRefNo],
              ["Government Reference Date", RECORD.govRefDate],
              ["Period",                    RECORD.period],
              ["Due Date",                  RECORD.dueDate],
            ].map(([label, value]) => (
              <div key={label} className="pb-2">
                <p className={labelCls}>{label}</p>
                <p className="text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value}</p>
              </div>
            ))}
          </div>
          <div className="pb-2">
            <p className={labelCls}>Department</p>
            <p className="text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{RECORD.department}</p>
          </div>

          {/* Policy Description (read-only rich text look) */}
          <div>
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Policy Description</p>
            <div className="rounded border border-stroke dark:border-dark-3">
              <div className="flex flex-wrap gap-0.5 border-b border-stroke bg-gray-50 px-2 py-1.5 opacity-60 pointer-events-none dark:border-dark-3 dark:bg-gray-800">
                {["B","I","U","abc","x₂","H1","↩","↪","≡","≡","🔗","✂","🖨"].map((t,i)=>(
                  <span key={i} className="rounded px-1.5 py-0.5 text-xs font-medium text-gray-500">{t}</span>
                ))}
              </div>
              <div className="min-h-[120px] px-3 py-2 text-sm text-dark dark:text-white">{RECORD.policyDesc}</div>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-1">
              Comments <span className="text-red-500">*</span>
            </label>
            <textarea rows={3} value={comments} onChange={e=>{setComments(e.target.value);if(errors.comments)setErrors(v=>({...v,comments:""}));}}
              className={`w-full rounded border ${errors.comments?"border-red-400":"border-stroke dark:border-dark-3"} bg-white px-3 py-2 text-sm text-dark focus:outline-none dark:bg-gray-dark dark:text-white`} />
            {errors.comments && <p className={errCls}>{errors.comments}</p>}
          </div>

          {/* Upload + Downloaded doc */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                Policy Note Process Upload Document <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={uploadFile}
                  className={`flex-1 rounded border ${errors.uploadFile?"border-red-400":"border-stroke dark:border-dark-3"} bg-gray-50 px-3 py-2 text-sm dark:bg-gray-800 dark:text-white`} />
                <button type="button" onClick={() => uploadRef.current?.click()}
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                  Upload
                </button>
                <input ref={uploadRef} type="file" className="hidden"
                  onChange={e=>{if(e.target.files?.[0]){setUploadFile(e.target.files[0].name);setErrors(v=>({...v,uploadFile:""}));}}} />
              </div>
              {errors.uploadFile && <p className={errCls}>{errors.uploadFile}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                Policy Note Uploaded Document
              </label>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={RECORD.uploadedDoc}
                  className="flex-1 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm dark:border-dark-3 dark:bg-gray-800 dark:text-white" />
                <button type="button"
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Forward to / Forward for */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                Forward to <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center overflow-hidden rounded border ${errors.forwardTo?"border-red-400":"border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
                <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">
                  <ForwardIcon />
                </span>
                <input type="text" value={forwardTo} onChange={e=>{setForwardTo(e.target.value);if(errors.forwardTo)setErrors(v=>({...v,forwardTo:""}));}}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white" />
              </div>
              {errors.forwardTo && <p className={errCls}>{errors.forwardTo}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                Forward for <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center overflow-hidden rounded border ${errors.forwardFor?"border-red-400":"border-stroke dark:border-dark-3"} bg-white dark:bg-gray-dark`}>
                <span className="flex w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-100 py-[9px] dark:border-dark-3 dark:bg-gray-700">
                  <ForwardIcon />
                </span>
                <select value={forwardFor} onChange={e=>{setForwardFor(e.target.value);if(errors.forwardFor)setErrors(v=>({...v,forwardFor:""}));}}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-dark focus:outline-none dark:text-white">
                  <option value="">Select</option>
                  {FORWARD_FOR_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              {errors.forwardFor && <p className={errCls}>{errors.forwardFor}</p>}
            </div>
          </div>

          {/* Create Note + bottom buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button type="button" onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex gap-2">
              <button onClick={() => router.push("/personnel/admin/policy-note/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            {/* Modal header */}
            <div className="flex items-center justify-between bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="p-5">
              {/* Rich text toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-1 rounded border border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800">
                <select className="rounded border border-gray-300 bg-white px-2 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-700 dark:text-white">
                  <option>Sans Serif</option><option>Serif</option><option>Monospace</option>
                </select>
                <select className="rounded border border-gray-300 bg-white px-2 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-700 dark:text-white">
                  <option>Normal</option><option>H1</option><option>H2</option><option>H3</option>
                </select>
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {[
                  {label:"B",cmd:"bold"},{label:"I",cmd:"italic"},{label:"U",cmd:"underline"},
                  {label:"S",cmd:"strikeThrough"},
                ].map(({label,cmd})=>(
                  <button key={label} type="button"
                    onMouseDown={e=>{e.preventDefault();document.execCommand(cmd);}}
                    className="rounded px-1.5 py-0.5 text-xs font-bold text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{label}</button>
                ))}
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {["A","Ā","x₂","x²","H₁","H₂","❝","<>","≡","≣","⇤","⇥","↵","↕"].map((t,i)=>(
                  <button key={i} type="button" className="rounded px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{t}</button>
                ))}
                <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-600" />
                {["🔗","🖼","▶","⇔"].map((t,i)=>(
                  <button key={i} type="button" className="rounded px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">{t}</button>
                ))}
              </div>

              {/* Editor area */}
              <div
                ref={noteEditorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[150px] rounded border border-stroke px-3 py-2 text-sm text-dark focus:outline-none dark:border-dark-3 dark:text-white"
              >
                <span className="text-gray-400">Enter text ...</span>
              </div>

              {/* Created By card */}
              <div className="mt-4 flex items-center gap-4">
                <button type="button" className="flex size-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300">‹</button>
                <div className="rounded border border-red-300 px-5 py-3 text-sm">
                  <p className="mb-1 text-xs font-semibold text-gray-600 dark:text-gray-300">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : PREMKUMAR</p>
                  <p className="text-xs text-dark dark:text-white">Designation : JUNIOR ASSISTANT</p>
                  <p className="text-xs text-dark dark:text-white">Date : 13-Mar-2026</p>
                </div>
                <button type="button" className="flex size-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300">›</button>
              </div>

              {/* Modal buttons */}
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => setShowNoteModal(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12"/></svg>
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
