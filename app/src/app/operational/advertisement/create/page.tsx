"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Icon helpers ── */
const ListIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const MediaIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
  </svg>
);
const ArrowIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);
const DocIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);
const GlobeIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
  </svg>
);
const PencilIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);
const HourIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);
const CalIco = () => (
  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);
const CalIcoGray = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);
const RupIco = () => <span className="text-gray-500 text-xs font-bold leading-none">₹</span>;

/* ── Field wrapper ── */
const F = ({ label, required, icon, children }: { label: string; required?: boolean; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-700">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
    <div className="flex border border-gray-300 rounded overflow-hidden h-8">
      <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">{icon}</div>
      {children}
    </div>
  </div>
);

const Sel = ({ label, required, icon, options, value, onChange }: { label: string; required?: boolean; icon: React.ReactNode; options: string[]; value: string; onChange: (v: string) => void }) => (
  <F label={label} required={required} icon={icon}>
    <select className="flex-1 px-2 text-sm focus:outline-none bg-white" value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </F>
);

const Inp = ({ label, required, icon, value, onChange, readOnly, placeholder }: { label: string; required?: boolean; icon: React.ReactNode; value: string; onChange?: (v: string) => void; readOnly?: boolean; placeholder?: string }) => (
  <F label={label} required={required} icon={icon}>
    <input readOnly={readOnly} placeholder={placeholder} className={`flex-1 px-2 text-sm focus:outline-none ${readOnly ? "bg-gray-50 text-gray-500" : "bg-white"}`} value={value} onChange={e => onChange?.(e.target.value)} />
  </F>
);

const DateF = ({ label, required, value, onChange }: { label: string; required?: boolean; value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-700">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
    <div className="flex border border-gray-300 rounded overflow-hidden h-8">
      <input type="text" placeholder="dd-MMM-yyyy" className="flex-1 px-2 text-sm focus:outline-none bg-white" value={value} onChange={e => onChange(e.target.value)} />
      <div className="px-2 flex items-center border-l border-gray-300 cursor-pointer" style={{ backgroundColor: "#17a2b8" }}><CalIco /></div>
    </div>
  </div>
);

const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" /><rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);

/* ── Rich text toolbar buttons ── */
const RtBtn = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <button title={title} className="px-1 py-0.5 text-xs border border-gray-300 rounded bg-white hover:bg-gray-100 leading-none">{children}</button>
);

export default function CreateAdvertisementPage() {
  const router = useRouter();

  const [adCategory, setAdCategory] = useState("");
  const [adType, setAdType] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaStatus, setMediaStatus] = useState("");

  // Television details
  const [tvCode, setTvCode] = useState("");
  const [language, setLanguage] = useState("");
  const [trpRating, setTrpRating] = useState("");
  const [duration, setDuration] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [noDays] = useState("");
  const [totalRate] = useState("");

  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");

  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteIdx, setNoteIdx] = useState(0);

  return (
    <div className="p-4">
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="text-gray-700">Create Advertisement</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">Create Advertisement</h1>

      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        {/* Section header */}
        <div className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold rounded-t" style={{ backgroundColor: "#2d8f7b" }}>
          <span>Advertisement</span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-normal opacity-90">(* Mandatory Fields)</span>
            <span className="cursor-pointer font-bold">—</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Sel label="Advertisement Category" icon={<MediaIco />} options={["Category A", "Category B"]} value={adCategory} onChange={setAdCategory} />
            <Sel label="Advertisement Type" icon={<ListIco />} options={["Type A", "Type B"]} value={adType} onChange={setAdType} />
            <Sel label="Media Type" required icon={<MediaIco />} options={["Television", "Radio", "Print", "Digital"]} value={mediaType} onChange={setMediaType} />
            <Sel label="Media Status" required icon={<MediaIco />} options={["Active", "Inactive"]} value={mediaStatus} onChange={setMediaStatus} />
          </div>
        </div>
      </div>

      {/* Dynamic Television Details section */}
      {mediaType === "Television" && (
        <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Television Details</span>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Sel label="Television Code / Name" required icon={<DocIco />} options={["1234 / Coptex TV", "5678 / Sun TV"]} value={tvCode} onChange={setTvCode} />
              <Sel label="Language" required icon={<GlobeIco />} options={["Tamil", "Telugu", "Hindi", "English"]} value={language} onChange={setLanguage} />
              <Inp label="TRP Rating" required icon={<PencilIco />} value={trpRating} onChange={setTrpRating} placeholder="0.0" />
              <Inp label="Duration (in sec)" required icon={<HourIco />} value={duration} onChange={setDuration} placeholder="0.0" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <DateF label="From Date" required value={fromDate} onChange={setFromDate} />
              <DateF label="To Date" required value={toDate} onChange={setToDate} />
              <Inp label="No. of days" icon={<CalIcoGray />} value={noDays} readOnly placeholder="0" />
              <Inp label="Total Rate" required icon={<RupIco />} value={totalRate} readOnly placeholder="0.00" />
            </div>
          </div>
        </div>
      )}

      {/* Forward + Create Note */}
      <div className="bg-white rounded shadow-sm border border-gray-200">
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ maxWidth: 600 }}>
            <Inp label="Forward To" required icon={<ArrowIco />} value={forwardTo} onChange={setForwardTo} />
            <Sel label="Forward For" required icon={<ArrowIco />} options={["Approval", "Review", "Information"]} value={forwardFor} onChange={setForwardFor} />
          </div>
          <div>
            <button className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded" style={{ backgroundColor: "#28a745" }} onClick={() => setShowNote(true)}>
              <span className="text-base leading-none font-bold">+</span> Create Note
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded" style={{ backgroundColor: "#6c757d" }} onClick={() => router.push("/operational/advertisement/list")}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            Cancel
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded" style={{ backgroundColor: "#28a745" }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-full max-w-3xl mx-4">
            <div className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between" style={{ backgroundColor: "#2d8f7b" }}>
              <span>Create Note</span>
              <button className="text-white hover:opacity-70 text-lg leading-none" onClick={() => setShowNote(false)}>✕</button>
            </div>
            <div className="p-4 space-y-3">
              {/* Rich text toolbar */}
              <div className="flex flex-wrap gap-1 border border-gray-200 rounded p-1.5 bg-gray-50">
                <select className="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white"><option>Sans Serif</option><option>Arial</option><option>Times New Roman</option><option>Courier New</option></select>
                <select className="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white"><option>Normal</option><option>Heading 1</option><option>Heading 2</option><option>Heading 3</option></select>
                <div className="flex gap-0.5 ml-1">
                  <RtBtn title="Bold"><span className="font-bold">B</span></RtBtn>
                  <RtBtn title="Italic"><span className="italic">I</span></RtBtn>
                  <RtBtn title="Underline"><span className="underline">U</span></RtBtn>
                  <RtBtn title="Strikethrough"><span className="line-through">S</span></RtBtn>
                </div>
                <div className="flex gap-0.5">
                  <RtBtn title="Font Color"><span>A</span></RtBtn>
                  <RtBtn title="Highlight"><span className="bg-yellow-200">A</span></RtBtn>
                </div>
                <div className="flex gap-0.5">
                  <RtBtn title="Subscript">X₂</RtBtn>
                  <RtBtn title="Superscript">X²</RtBtn>
                </div>
                <div className="flex gap-0.5">
                  <RtBtn title="Heading 1">H₁</RtBtn>
                  <RtBtn title="Heading 2">H₂</RtBtn>
                </div>
                <div className="flex gap-0.5">
                  <RtBtn title="Blockquote">"</RtBtn>
                  <RtBtn title="Code">`</RtBtn>
                </div>
                <div className="flex gap-0.5">
                  <RtBtn title="Ordered List">≡</RtBtn>
                  <RtBtn title="Unordered List">≡</RtBtn>
                  <RtBtn title="Indent">≡</RtBtn>
                  <RtBtn title="Outdent">≡</RtBtn>
                </div>
                <div className="flex gap-0.5">
                  <RtBtn title="Insert Link">🔗</RtBtn>
                  <RtBtn title="Insert Image">🖼</RtBtn>
                  <RtBtn title="Insert Video">🎬</RtBtn>
                </div>
                <RtBtn title="Clear Format">Fx</RtBtn>
              </div>

              {/* Text area */}
              <div className="border border-gray-200 rounded min-h-28 p-2 bg-white">
                <textarea
                  rows={5}
                  className="w-full resize-none focus:outline-none text-sm"
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder="Enter note content..."
                />
              </div>

              {/* Created By card with nav arrows */}
              <div className="flex items-center gap-3">
                <button
                  disabled={noteIdx === 0}
                  onClick={() => setNoteIdx(i => i - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 disabled:opacity-30 flex-shrink-0"
                >
                  ◀
                </button>
                <div className="border-2 rounded p-3 flex-1" style={{ borderColor: "#e67e22" }}>
                  <p className="text-xs font-semibold text-gray-600 mb-1 text-center">Created By</p>
                  <p className="text-xs text-gray-700">Name :</p>
                  <p className="text-xs text-gray-700">Designation :</p>
                  <p className="text-xs text-gray-700">Date : 11-Mar-2026</p>
                </div>
                <button
                  disabled
                  onClick={() => setNoteIdx(i => i + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 disabled:opacity-30 flex-shrink-0"
                >
                  ▶
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
              <button className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded" style={{ backgroundColor: "#6c757d" }} onClick={() => setShowNote(false)}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded" style={{ backgroundColor: "#28a745" }} onClick={() => setShowNote(false)}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
