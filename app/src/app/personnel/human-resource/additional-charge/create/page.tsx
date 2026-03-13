"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function CreateAdditionalChargePage() {
  const router = useRouter();
  const [hoRo, setHoRo] = useState("");
  const [entityType, setEntityType] = useState("");
  const [entity, setEntity] = useState("");
  const [department, setDepartment] = useState("");
  const [employeePfName, setEmployeePfName] = useState("");
  const [designation, setDesignation] = useState("");
  const [additionalCharge, setAdditionalCharge] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [assignHoRo, setAssignHoRo] = useState("");
  const [assignEntityType, setAssignEntityType] = useState("");
  const [additionalChargeWorkLocation, setAdditionalChargeWorkLocation] = useState("");
  const [remarks, setRemarks] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Additional Charge</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Additional Charge</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Additional Charge</h3>
          <span className="text-xs text-white">( <span className="text-red-300">*</span> Mandatory Fields) &#8212;</span>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Department */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={hoRo} onChange={(e) => setHoRo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="CHENNAI">CHENNAI</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="6" width="6" height="12" rx="1"/><rect x="10" y="3" width="6" height="18" rx="1"/><rect x="18" y="8" width="4" height="8" rx="1"/></svg></IconBox>
                <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Regional Office">Regional Office</option>
                  <option value="Showroom">Showroom</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select value={entity} onChange={(e) => setEntity(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="CHENNAI">CHENNAI</option>
                  <option value="T.NAGAR">T.NAGAR</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Department <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></IconBox>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="PRODUCTION">PRODUCTION</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Employee PF Number / Name + Clear/Generate */}
          <div className="mb-4 flex flex-wrap items-end gap-4">
            <div className="w-72">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Employee PF Number / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select value={employeePfName} onChange={(e) => setEmployeePfName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="242/ANURADHA">242/ANURADHA</option>
                  <option value="243/BHAVANI">243/BHAVANI</option>
                  <option value="462/KUMAR">462/KUMAR</option>
                  <option value="302/JAYAKUMAR">302/JAYAKUMAR</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-0.5">
              <button className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Clear
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assigning Additional Charge Section */}
      <div className="mt-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Assigning Additional Charge</h4>
          </div>

          {/* Row 1: Designation, Additional Charge, From Date, HO/RO */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="6" width="6" height="12" rx="1"/><rect x="10" y="3" width="6" height="18" rx="1"/><rect x="18" y="8" width="4" height="8" rx="1"/></svg></IconBox>
                <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Additional Charge <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select value={additionalCharge} onChange={(e) => setAdditionalCharge(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="DEPUTY GENERAL MANAGER">DEPUTY GENERAL MANAGER</option>
                  <option value="PRODUCT MANAGER">PRODUCT MANAGER</option>
                  <option value="SENIOR SALES MANAGER">SENIOR SALES MANAGER</option>
                  <option value="REGIONAL MANAGER INCHARGE">REGIONAL MANAGER INCHARGE</option>
                  <option value="ART DESIGNER">ART DESIGNER</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">From Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select value={assignHoRo} onChange={(e) => setAssignHoRo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="CHENNAI">CHENNAI</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Entity Type, Additional Charge Work Location */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select value={assignEntityType} onChange={(e) => setAssignEntityType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Regional Office">Regional Office</option>
                  <option value="Showroom">Showroom</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Additional Charge Work Location <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select value={additionalChargeWorkLocation} onChange={(e) => setAdditionalChargeWorkLocation(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="CHENNAI">CHENNAI</option>
                  <option value="AMBASAMUDRAM">AMBASAMUDRAM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="mb-1">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remarks <span className="text-red-500">*</span></label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            <p className="mb-4 text-xs text-red-400">Should be maximum 250 characters.</p>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward for <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Approval">Approval</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/personnel/human-resource/additional-charge/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <button className="rounded px-1.5 py-0.5 text-sm hover:bg-gray-200 dark:hover:bg-dark-3">&#8592;</button>
                <button className="rounded px-1.5 py-0.5 text-sm hover:bg-gray-200 dark:hover:bg-dark-3">&#8594;</button>
                <select className="rounded border border-stroke bg-transparent px-1.5 py-0.5 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Paragraph</option></select>
                <button className="rounded px-1.5 py-0.5 text-sm font-bold hover:bg-gray-200 dark:hover:bg-dark-3">B</button>
                <button className="rounded px-1.5 py-0.5 text-sm italic hover:bg-gray-200 dark:hover:bg-dark-3">I</button>
                <button className="rounded px-1.5 py-0.5 text-sm hover:bg-gray-200 dark:hover:bg-dark-3">&#128279;</button>
                <button className="rounded px-1.5 py-0.5 text-sm hover:bg-gray-200 dark:hover:bg-dark-3">&#128247;</button>
                <button className="rounded px-1.5 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-dark-3">&#8220;&#8221;</button>
              </div>
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={8} className="mb-4 w-full rounded-b border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />

              {/* Created By info */}
              <div className="mb-4 flex items-center justify-start">
                <div className="rounded border border-[#dc3545] px-8 py-4">
                  <p className="mb-2 text-sm font-semibold text-dark dark:text-white">Created by</p>
                  <p className="text-sm text-dark dark:text-white">Name : ALOK</p>
                  <p className="text-xs text-dark dark:text-white">Designation :CHIEF GENERAL MANAGER</p>
                  <p className="text-xs text-dark dark:text-white">Date: 12-03-2026</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
                </button>
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
