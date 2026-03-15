"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

/* ── Icons ─────────────────────────────────────────── */
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
);
const SectionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const ForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 004 4h12"/>
  </svg>
);

/* ── Constants ──────────────────────────────────────── */
const LOCATION_OPTIONS      = ["HEAD OFFICE", "CHENNAI", "TIRUNELVELI", "TRICHY", "VIJAYAWADA"];
const ENTITY_TYPE_OPTIONS   = ["Head Office", "Regional Office", "Branch Office", "Warehouse"];
const SECTION_OPTIONS       = ["Admin", "EDP", "Accounts", "Banking", "Marketing", "Computer Wing"];
const TRANSFER_TYPE_OPTIONS = ["IntraRegion", "InterRegion", "Deputation"];
const FORWARD_FOR_OPTIONS   = ["Approval", "Review", "Information"];
const MAX_REASON_CHARS      = 2000;

/* ── Reusable icon-prefixed select ──────────────────── */
const IconSelect = ({ icon, value, onChange, options, required }: {
  icon: React.ReactNode; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean;
}) => (
  <div className="flex items-center overflow-hidden rounded border border-gray-300">
    <span className="flex h-full items-center border-r border-gray-300 bg-gray-50 px-2 py-2 text-gray-500">{icon}</span>
    <select value={value} onChange={e => onChange(e.target.value)} required={required}
      className="flex-1 bg-white px-2 py-2 text-sm text-gray-700 outline-none">
      <option value="">Select</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

/* ── Rich-text toolbar button ───────────────────────── */
const ToolBtn = ({ label, cmd, arg }: { label: string; cmd: string; arg?: string }) => (
  <button type="button" title={label} onMouseDown={e => { e.preventDefault(); document.execCommand(cmd, false, arg); }}
    className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-sm hover:bg-gray-200 text-gray-700">
    {label}
  </button>
);

/* ── Create Note Modal ──────────────────────────────── */
function CreateNoteModal({ onClose }: { onClose: () => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [font, setFont]     = useState("Sans Serif");
  const [fontSize, setFontSize] = useState("Normal");

  const handleSubmit = () => { onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-3xl rounded shadow-2xl bg-white" style={{ minHeight: 480 }}>

        {/* Modal header */}
        <div className="flex items-center justify-between rounded-t px-4 py-2" style={{ backgroundColor: "#17a2b8" }}>
          <span className="font-semibold text-white text-sm">Create Note</span>
          <button onClick={onClose} className="text-white text-lg font-bold leading-none hover:opacity-80">×</button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-white px-2 py-1">
          {/* Font family */}
          <select value={font} onChange={e => { setFont(e.target.value); document.execCommand("fontName", false, e.target.value); }}
            className="h-7 rounded border border-gray-300 bg-white px-1 text-xs text-gray-700 outline-none mr-1">
            {["Sans Serif","Arial","Georgia","Courier New","Times New Roman"].map(f => <option key={f}>{f}</option>)}
          </select>
          {/* Font size */}
          <select value={fontSize} onChange={e => { setFontSize(e.target.value); document.execCommand("fontSize", false, e.target.value === "Normal" ? "3" : e.target.value === "Small" ? "2" : "4"); }}
            className="h-7 rounded border border-gray-300 bg-white px-1 text-xs text-gray-700 outline-none mr-1">
            {["Small","Normal","Large","Huge"].map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <ToolBtn label="B" cmd="bold" /><ToolBtn label="I" cmd="italic" /><ToolBtn label="U" cmd="underline" /><ToolBtn label="S̶" cmd="strikeThrough" />
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <ToolBtn label="x₂" cmd="subscript" /><ToolBtn label="x²" cmd="superscript" />
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <ToolBtn label="H₁" cmd="formatBlock" arg="h1" /><ToolBtn label="H₂" cmd="formatBlock" arg="h2" />
          <ToolBtn label="❝" cmd="formatBlock" arg="blockquote" /><ToolBtn label="</>" cmd="formatBlock" arg="pre" />
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <ToolBtn label="≡" cmd="insertUnorderedList" /><ToolBtn label="1." cmd="insertOrderedList" />
          <ToolBtn label="⇤" cmd="outdent" /><ToolBtn label="⇥" cmd="indent" />
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <ToolBtn label="«»" cmd="justifyLeft" /><ToolBtn label="≡" cmd="justifyCenter" />
          <div className="mx-1 h-5 w-px bg-gray-300" />
          <ToolBtn label="🔗" cmd="createLink" arg="#" /><ToolBtn label="🖼" cmd="insertImage" arg="" />
          <ToolBtn label="⊞" cmd="insertHTML" arg="<table border='1'><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>" />
          <ToolBtn label="Tx" cmd="removeFormat" />
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Enter text ..."
          className="min-h-[200px] px-4 py-3 text-sm text-gray-700 outline-none empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)]"
          style={{ minHeight: 200 }}
        />

        {/* Created By card */}
        <div className="px-4 pb-3">
          <div className="inline-block rounded border border-gray-300 px-4 py-3 text-sm text-gray-700">
            <div className="mb-1 font-semibold text-gray-600">Created By</div>
            <div>Name : BHAVANI</div>
            <div>Designation : e Commerce and Spl Projects</div>
            <div>Date : 13-Mar-2026</div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex justify-end gap-2 rounded-b border-t border-gray-200 px-4 py-3">
          <button onClick={onClose}
            className="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#343a40" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#28a745" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────── */
export default function CreateTransferPage() {
  const router = useRouter();

  const FROM = { headOffice: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", section: "Admin" };

  const [toForm, setToForm]     = useState({ transferType: "", headOffice: "", entityType: "", entity: "", section: "" });
  const [reason, setReason]     = useState("");
  const [forwardTo, setForwardTo]   = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showNote, setShowNote] = useState(false);

  const remaining = MAX_REASON_CHARS - reason.length;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Create Note Modal */}
      {showNote && <CreateNoteModal onClose={() => setShowNote(false)} />}

      <h1 className="text-xl font-semibold text-gray-700 mb-1">Create Transfer / Deputation Request</h1>
      <p className="text-sm text-gray-500 mb-4">
        <span className="text-gray-400">Home / Personnel / Employee Self Service / </span>Create Transfer / Deputation Request
      </p>

      <div className="bg-white rounded shadow">
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 py-2 rounded-t" style={{ backgroundColor: "#17a2b8" }}>
          <span className="text-white font-semibold text-sm">Transfer / Deputation Request</span>
          <span className="text-white text-xs opacity-90">( * Mandatory Fields)</span>
        </div>

        <div className="px-4 py-4">
          {/* Transfer From */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Transfer From</span>
          </div>
          <div className="grid grid-cols-4 gap-x-6 mb-1">
            <div className="text-xs text-gray-500">Head / Regional Office</div>
            <div className="text-xs text-gray-500">Entity Type</div>
            <div className="text-xs text-gray-500">Entity</div>
            <div className="text-xs text-gray-500">Section</div>
          </div>
          <div className="grid grid-cols-4 gap-x-6 pb-4 mb-4 border-b border-gray-100">
            <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{FROM.headOffice}</div>
            <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{FROM.entityType}</div>
            <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{FROM.entity}</div>
            <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{FROM.section}</div>
          </div>

          {/* Transfer To */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Transfer To</span>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-1">
            <div className="text-xs text-gray-500">Transfer Type <span className="text-red-500">*</span></div>
            <div className="text-xs text-gray-500">Head / Regional Office <span className="text-red-500">*</span></div>
            <div className="text-xs text-gray-500">Entity Type <span className="text-red-500">*</span></div>
            <div className="text-xs text-gray-500">Entity <span className="text-red-500">*</span></div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <IconSelect icon={<ListIcon />}     value={toForm.transferType} onChange={v => setToForm(f => ({ ...f, transferType: v }))} options={TRANSFER_TYPE_OPTIONS} required />
            <IconSelect icon={<BuildingIcon />} value={toForm.headOffice}   onChange={v => setToForm(f => ({ ...f, headOffice: v }))}   options={LOCATION_OPTIONS}      required />
            <IconSelect icon={<ListIcon />}     value={toForm.entityType}   onChange={v => setToForm(f => ({ ...f, entityType: v }))}   options={ENTITY_TYPE_OPTIONS}   required />
            <IconSelect icon={<BuildingIcon />} value={toForm.entity}       onChange={v => setToForm(f => ({ ...f, entity: v }))}       options={LOCATION_OPTIONS}      required />
          </div>

          <div className="mb-1 text-xs text-gray-500">Section <span className="text-red-500">*</span></div>
          <div className="mb-4 w-1/4">
            <IconSelect icon={<SectionIcon />} value={toForm.section} onChange={v => setToForm(f => ({ ...f, section: v }))} options={SECTION_OPTIONS} required />
          </div>

          {/* Reason */}
          <div className="mb-1 text-xs text-gray-500">Reason</div>
          <textarea value={reason} onChange={e => setReason(e.target.value.slice(0, MAX_REASON_CHARS))}
            placeholder="Moving to marketing department from admin" rows={3}
            className="mb-1 w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#17a2b8]" />
          <div className="mb-4 text-xs text-gray-500">{remaining} characters remaining.</div>

          {/* Forward To | Forward For */}
          <div className="grid grid-cols-4 gap-x-4 mb-1">
            <div className="text-xs text-gray-500">Forward To <span className="text-red-500">*</span></div>
            <div className="text-xs text-gray-500">Forward For <span className="text-red-500">*</span></div>
          </div>
          <div className="grid grid-cols-4 gap-x-4">
            <div className="flex items-center overflow-hidden rounded border border-gray-300">
              <span className="flex h-full items-center border-r border-gray-300 bg-gray-50 px-2 py-2 text-gray-500"><ForwardIcon /></span>
              <input type="text" value={forwardTo} onChange={e => setForwardTo(e.target.value)}
                className="flex-1 bg-white px-2 py-2 text-sm text-gray-700 outline-none" />
            </div>
            <div className="flex items-center overflow-hidden rounded border border-gray-300">
              <span className="flex h-full items-center border-r border-gray-300 bg-gray-50 px-2 py-2 text-gray-500"><ForwardIcon /></span>
              <select value={forwardFor} onChange={e => setForwardFor(e.target.value)}
                className="flex-1 bg-white px-2 py-2 text-sm text-gray-700 outline-none">
                <option value="">Select</option>
                {FORWARD_FOR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <button onClick={() => setShowNote(true)}
            className="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#28a745" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create Note
          </button>
          <div className="flex gap-2">
            <button onClick={() => router.back()}
              className="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: "#343a40" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1 rounded px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "#28a745" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
