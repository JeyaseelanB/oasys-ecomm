"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateInterchangePage() {
  const router = useRouter();
  const [hoRo, setHoRo] = useState("");
  const [entityType, setEntityType] = useState("");
  const [entity, setEntity] = useState("");
  const [employeeCodeName, setEmployeeCodeName] = useState("");
  const [currentDepartment, setCurrentDepartment] = useState("");
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [interchangeDepartment, setInterchangeDepartment] = useState("");
  const [interchangeDesignation, setInterchangeDesignation] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");

  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Interchange</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Interchange</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Interchange</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Employee Code/Name */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">HO/RO <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </span>
                <select value={hoRo} onChange={(e) => setHoRo(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="DWH - SALEM">DWH - SALEM</option>
                  <option value="DWH - COIMBATORE">DWH - COIMBATORE</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Entity Type <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </span>
                <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="Distribution Warehouse">Distribution Warehouse</option>
                  <option value="D & P Office">D & P Office</option>
                  <option value="Showroom">Showroom</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Entity <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </span>
                <select value={entity} onChange={(e) => setEntity(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="DWH - SALEM">DWH - SALEM</option>
                  <option value="DWH - COIMBATORE">DWH - COIMBATORE</option>
                  <option value="ETHNICA - ANNA NAGAR">ETHNICA - ANNA NAGAR</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Employee Code / Name <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>
                </span>
                <select value={employeeCodeName} onChange={(e) => setEmployeeCodeName(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="572/KANNAN">572/KANNAN</option>
                  <option value="332/RAMANATHAN">332/RAMANATHAN</option>
                  <option value="861/SUNDAR RAJAN">861/SUNDAR RAJAN</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Current Department, Current Designation, Interchange Department, Interchange Designation */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Current Department</label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <input type="text" value={currentDepartment} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Current Designation</label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input type="text" value={currentDesignation} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Interchange Department <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={interchangeDepartment} onChange={(e) => setInterchangeDepartment(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MARKETING">MARKETING</option>
                  <option value="TECHNICAL">TECHNICAL</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Interchange Designation <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <select value={interchangeDesignation} onChange={(e) => setInterchangeDesignation(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="SUPERINTENDENT">SUPERINTENDENT</option>
                  <option value="ASSISTANT SALES MAN">ASSISTANT SALES MAN</option>
                  <option value="JUNIOR ASSISTANT">JUNIOR ASSISTANT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-[#495057]">Upload Documents <span className="text-[#dc3545]">*</span></label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={uploadFile}
                onChange={(e) => setUploadFile(e.target.value)}
                className="w-72 rounded border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
              <button className="flex items-center gap-1.5 rounded px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#17a2b8" }}>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
              </button>
            </div>
            <p className="mt-1 text-xs text-primary">File format: png, jpeg, pdf, doc and file size should be less than 2MB</p>
          </div>

          {/* Forward Section */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward To <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <input
                  type="text"
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                  className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward For <span className="text-[#dc3545]">*</span></label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                </span>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="Approval">Approval</option>
                  <option value="Review">Review</option>
                  <option value="Verification">Verification</option>
                </select>
              </div>
            </div>
          </div>

          {/* Create Note Button */}
          <div className="mb-5">
            <button
              onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: "#28a745" }}
            >
              <span className="text-base leading-none">+</span> Create Note
            </button>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/interchange/list")}
              className="flex items-center gap-1.5 rounded px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: "#6c757d" }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded px-5 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#28a745" }}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Rich text toolbar */}
              <div className="mb-3 flex flex-wrap gap-1 rounded border border-stroke bg-gray-50 p-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="rounded border border-gray-300 px-1 py-0.5 text-xs"><option>Sans Serif</option></select>
                <select className="rounded border border-gray-300 px-1 py-0.5 text-xs"><option>Normal</option></select>
                {["B", "I", "U", "S", "A", "A\u0332"].map((b) => (
                  <button key={b} className="rounded border border-gray-300 px-2 py-0.5 text-xs font-bold hover:bg-gray-200">{b}</button>
                ))}
                {["X\u2082", "X\u00B2", "H\u2081", "H\u2082", "\u201C", "\u201D", "{}"].map((b) => (
                  <button key={b} className="rounded border border-gray-300 px-2 py-0.5 text-xs hover:bg-gray-200">{b}</button>
                ))}
                {["\u2261", "\u2261", "\u2261", "\u2261", "\u00B6", "\u2261"].map((b, i) => (
                  <button key={`fmt-${i}`} className="rounded border border-gray-300 px-2 py-0.5 text-xs hover:bg-gray-200">{b}</button>
                ))}
                {["\uD83D\uDD17", "\uD83D\uDDBC", "\uD83D\uDCF7", "\uD83D\uDCD0"].map((b, i) => (
                  <button key={`media-${i}`} className="rounded border border-gray-300 px-2 py-0.5 text-xs hover:bg-gray-200">{b}</button>
                ))}
                <button className="rounded border border-gray-300 px-2 py-0.5 text-xs italic hover:bg-gray-200">fx</button>
              </div>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter your content"
                className="mb-4 min-h-[140px] w-full rounded border border-stroke p-3 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowNote(false)} className="flex items-center gap-1.5 rounded px-5 py-2 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#6c757d" }}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => setShowNote(false)} className="flex items-center gap-1.5 rounded px-5 py-2 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#28a745" }}>
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
