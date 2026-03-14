"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);
const BuildingIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="1"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
  </svg>
);
const PersonIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const HashIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const CalendarIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ForwardIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>
  </svg>
);

interface EDRRecord {
  horo: string; entityType: string; entity: string; employeeName: string;
  pfNumber: string; designation: string; dateOfJoining: string; dateOfRetirement: string;
  natureOfDeath: string; dateOfDeath: string; fileName: string; forwardTo: string; forwardFor: string;
  noteText: string;
}

const EDR_DATA: Record<number, EDRRecord> = {
  1: { horo: "HEAD OFFICE",  entityType: "Head Office",     entity: "HEAD OFFICE",  employeeName: "NAGARAJAN C / 3265",   pfNumber: "3265", designation: "DEPUTY GENERAL MANAGER CREDIT SALES", dateOfJoining: "08-Jul-1993", dateOfRetirement: "30-Jun-2034", natureOfDeath: "Covid-19",         dateOfDeath: "01-Sep-2024", fileName: "sample.pdf",         forwardTo: "", forwardFor: "Final Approval", noteText: "Requesting for final approval" },
  2: { horo: "21/VELLORE",   entityType: "Regional Office", entity: "21/VELLORE",   employeeName: "SUJATHA V / 3560",     pfNumber: "3560", designation: "REGIONAL MANAGER INCHARGE",           dateOfJoining: "03-May-2013", dateOfRetirement: "31-Jul-2040", natureOfDeath: "Covid-19",         dateOfDeath: "02-Sep-2024", fileName: "cooptext-icon.png",  forwardTo: "", forwardFor: "Final Approval", noteText: "Sending for final approval." },
  3: { horo: "21/VELLORE",   entityType: "Regional Office", entity: "21/VELLORE",   employeeName: "MADHAVI V / 1503",     pfNumber: "1503", designation: "SENIOR OFFICER",                     dateOfJoining: "10-Jun-2000", dateOfRetirement: "30-Jun-2030", natureOfDeath: "Natural Death",    dateOfDeath: "03-Sep-2024", fileName: "doc_1503.pdf",       forwardTo: "", forwardFor: "Approval",       noteText: "" },
};

const NATURE_OPTIONS = ["Covid-19", "Natural Death", "Accidental Death", "Illness"];
const FORWARD_FOR    = ["Final Approval", "Approval", "Review", "Information"];

function EditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id") ?? "1");
  const rec = EDR_DATA[id] ?? EDR_DATA[1];

  const [horo]            = useState(rec.horo);
  const [entityType]      = useState(rec.entityType);
  const [entity]          = useState(rec.entity);
  const [employeeName]    = useState(rec.employeeName);
  const [pfNumber]        = useState(rec.pfNumber);
  const [designation]     = useState(rec.designation);
  const [dateOfJoining]   = useState(rec.dateOfJoining);
  const [dateOfRetirement]= useState(rec.dateOfRetirement);
  const [natureOfDeath, setNatureOfDeath] = useState(rec.natureOfDeath);
  const [dateOfDeath, setDateOfDeath]     = useState(rec.dateOfDeath);
  const [fileName, setFileName]           = useState(rec.fileName);
  const [forwardTo, setForwardTo]         = useState(rec.forwardTo);
  const [forwardFor, setForwardFor]       = useState(rec.forwardFor);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText]           = useState(rec.noteText);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Employee Death Registration</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Retirement</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Employee Death Registration</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Death Registration</h3>
          <span className="text-xs text-white opacity-80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5 space-y-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Employee Name — pre-populated selects */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "HO/RO *",         value: horo },
              { label: "Entity Type *",   value: entityType },
              { label: "Entity *",        value: entity },
              { label: "Employee Name *", value: employeeName },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
                <div className="flex">
                  <IconBox><BuildingIcon /></IconBox>
                  <div className="flex w-full items-center rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#2d8f7b] dark:border-dark-3 dark:bg-dark-2">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Read-only employee details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Provident Fund Number</label>
              <div className="flex"><IconBox><HashIcon /></IconBox>
                <input readOnly value={pfNumber} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#2d8f7b] outline-none dark:border-dark-3 dark:bg-dark-2" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation</label>
              <div className="flex"><IconBox><PersonIcon /></IconBox>
                <input readOnly value={designation} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#2d8f7b] outline-none dark:border-dark-3 dark:bg-dark-2" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Joining</label>
              <div className="flex"><IconBox><CalendarIcon /></IconBox>
                <input readOnly value={dateOfJoining} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#2d8f7b] outline-none dark:border-dark-3 dark:bg-dark-2" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Retirement</label>
              <div className="flex"><IconBox><CalendarIcon /></IconBox>
                <input readOnly value={dateOfRetirement} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#2d8f7b] outline-none dark:border-dark-3 dark:bg-dark-2" />
              </div>
            </div>
          </div>

          {/* Row 3: Nature of Death, Date of Death, Document Upload */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Nature of Death <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><PersonIcon /></IconBox>
                <select value={natureOfDeath} onChange={e => setNatureOfDeath(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {NATURE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Death <span className="text-red-500">*</span></label>
              <div className="flex items-center rounded border border-stroke bg-transparent focus-within:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark">
                <input type="text" value={dateOfDeath} onChange={e => setDateOfDeath(e.target.value)} placeholder="dd-MMM-yyyy" className="w-full bg-transparent px-3 py-2 text-sm outline-none dark:text-white" />
                <button className="flex size-10 shrink-0 items-center justify-center rounded-r bg-[#17a2b8] text-white"><CalendarIcon /></button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Document Upload <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <input readOnly value={fileName} className="flex-1 rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <label className="flex cursor-pointer items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                  Upload
                  <input type="file" className="hidden" accept=".png,.jpg,.JPG,.jpeg,.gif,.pdf,.doc,.docx,.xls,.xlsx" onChange={e => setFileName(e.target.files?.[0]?.name ?? fileName)} />
                </label>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>
                  Download
                </button>
              </div>
              <p className="mt-1 text-[11px] text-gray-400">File format:png,jpg,JPG,jpeg,gif,pdf,doc,docx,xls,xlsx. <span className="text-red-400">File size should be less than 5 MB</span></p>
            </div>
          </div>

          {/* Row 4: Forward To, Forward For */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><ForwardIcon /></IconBox>
                <input value={forwardTo} onChange={e => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><ForwardIcon /></IconBox>
                <select value={forwardFor} onChange={e => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {FORWARD_FOR.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#007bff] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Note
            </button>
            <div className="flex gap-3">
              <button onClick={() => router.push("/personnel/human-resource/retirement/employee-death-registration/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={() => router.push("/personnel/human-resource/retirement/employee-death-registration/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl rounded-[10px] bg-white shadow-lg dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Edit Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-70">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-1 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="rounded border border-stroke bg-white px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-dark dark:text-white"><option>Sans Serif</option></select>
                <select className="rounded border border-stroke bg-white px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-dark dark:text-white"><option>Normal</option></select>
                {["B", "I", "U", "S"].map(t => <button key={t} className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs font-semibold hover:bg-gray-100 dark:border-dark-3 dark:bg-dark dark:text-white">{t}</button>)}
                <span className="mx-1 text-gray-300">|</span>
                <button className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-dark dark:text-white">A</button>
                <button className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-dark dark:text-white">≡</button>
              </div>
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                rows={5}
                className="w-full rounded-b border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
              <div className="mt-4 flex items-center gap-3">
                <button className="flex size-8 items-center justify-center rounded-full border border-stroke bg-gray-100 text-gray-500 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">‹</button>
                <div className="w-52 rounded border border-stroke p-3 text-xs text-dark dark:border-dark-3 dark:text-white">
                  <p className="mb-1.5 text-center font-semibold">Created By</p>
                  <p>Name : SANKARANARAYANAN</p>
                  <p>Designation : SUPERINTENDENT</p>
                  <p>Date : 13-Mar-2026</p>
                </div>
                <button className="flex size-8 items-center justify-center rounded-full border border-stroke bg-gray-100 text-gray-500 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">›</button>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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

export default function EditEDRPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <EditContent />
    </Suspense>
  );
}
