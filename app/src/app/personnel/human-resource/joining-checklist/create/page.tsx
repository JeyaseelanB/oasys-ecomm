"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateJoiningChecklistPage() {
  const router = useRouter();
  const [appointmentOrderNo, setAppointmentOrderNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("0.00");
  const [document, setDocument] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");

  const [attachments, setAttachments] = useState<{ id: number; docName: string; uploaded: string }[]>([]);

  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  const handleAddAttachment = () => {
    if (document && uploadFile) {
      setAttachments([...attachments, { id: attachments.length + 1, docName: document, uploaded: uploadFile }]);
      setDocument("");
      setUploadFile("");
    }
  };

  const handleSearch = () => {
    if (appointmentOrderNo) {
      setEmployeeName("SANKARANARAYANAN");
      setDesignation("ASSISTANT SALES MAN");
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Joining Checklist</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Joining Checklist</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Joining Checklist Header */}
        <div className="rounded-t-[10px] px-5 py-3" style={{ backgroundColor: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Joining Checklist</h3>
        </div>

        <div className="p-5">
          {/* Appointment Order No */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Appointment Order No.</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>
                </span>
                <input
                  type="text"
                  value={appointmentOrderNo}
                  onChange={(e) => setAppointmentOrderNo(e.target.value)}
                  className="w-64 rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
              <button
                onClick={() => { setAppointmentOrderNo(""); setEmployeeName(""); setDesignation(""); }}
                className="flex items-center gap-1.5 rounded px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                style={{ backgroundColor: "#6c757d" }}
              >
                Clear
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center gap-1.5 rounded px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                style={{ backgroundColor: "#17a2b8" }}
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Search
              </button>
            </div>
          </div>

          {/* Employee Details */}
          <div className="mb-5 border-t border-stroke pt-5 grid grid-cols-1 gap-4 md:grid-cols-3 dark:border-dark-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Employee Name</label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input type="text" value={employeeName} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Designation</label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                </span>
                <input type="text" value={designation} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Security Deposit</label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-500 dark:border-dark-3 dark:bg-dark-2">&#8377;</span>
                <input
                  type="text"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  className="w-full rounded-r border border-stroke px-3 py-2.5 text-right text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Attachments
            </h4>

            <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-end">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Document <span className="text-[#dc3545]">*</span></label>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                  </span>
                  <select value={document} onChange={(e) => setDocument(e.target.value)} className="w-full rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    <option value="">Select</option>
                    <option value="Appointment Order">Appointment Order</option>
                    <option value="ID Proof">ID Proof</option>
                    <option value="Address Proof">Address Proof</option>
                    <option value="Educational Certificate">Educational Certificate</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#495057]">Upload Documents <span className="text-[#dc3545]">*</span></label>
                <input
                  type="text"
                  value={uploadFile}
                  onChange={(e) => setUploadFile(e.target.value)}
                  className="w-full rounded border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
                <p className="mt-1 text-xs text-primary">File format:pdf,doc,xlsx. File size should be less than 5 MB</p>
              </div>
              <div className="flex items-end gap-4">
                <button className="flex items-center gap-1.5 rounded px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#17a2b8" }}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Upload
                </button>
                <button className="flex items-center gap-1.5 rounded px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#6c757d" }}>
                  Clear
                </button>
                <button
                  onClick={handleAddAttachment}
                  className="flex items-center gap-1.5 rounded px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                  style={{ backgroundColor: "#28a745" }}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  Add
                </button>
              </div>
            </div>

            {/* Attachments Table */}
            <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left text-sm font-semibold text-white" style={{ backgroundColor: "#26A69A" }}>
                    <th className="px-4 py-2.5 text-center w-12">#</th>
                    <th className="px-4 py-2.5">Document Name</th>
                    <th className="px-4 py-2.5">Uploaded Documents</th>
                    <th className="px-4 py-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attachments.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-4 text-sm text-gray-500">No records found.</td></tr>
                  ) : (
                    attachments.map((a, idx) => (
                      <tr key={a.id} className="border-t border-stroke text-sm dark:border-dark-3">
                        <td className="px-4 py-2.5 text-center text-dark dark:text-white">{idx + 1}</td>
                        <td className="px-4 py-2.5 text-dark dark:text-white">{a.docName}</td>
                        <td className="px-4 py-2.5 text-dark dark:text-white">{a.uploaded}</td>
                        <td className="px-4 py-2.5 text-center">
                          <button onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))} className="text-[#dc3545] hover:opacity-80">
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Process Section */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Payment Process
            </h4>

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Mode of Payment</label>
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 py-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </span>
                <select value={modeOfPayment} onChange={(e) => setModeOfPayment(e.target.value)} className="w-64 rounded-r border border-stroke px-3 py-2.5 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="DD">DD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Forward Section */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward to <span className="text-[#dc3545]">*</span></label>
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
              <p className="mt-1 text-xs text-gray-500">(Please Type PF Number (or) Name (or) Designation)</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#495057]">Forward for <span className="text-[#dc3545]">*</span></label>
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
              onClick={() => router.push("/personnel/human-resource/joining-checklist/list")}
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
                placeholder="Enter text ..."
                className="mb-4 min-h-[140px] w-full rounded border border-stroke p-3 text-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />

              {/* Created By Card */}
              <div className="mb-4 flex items-center gap-3">
                <button className="text-gray-400 hover:text-dark dark:hover:text-white">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                <div className="w-64 rounded border border-[#FFA70B] p-3">
                  <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : <span className="font-semibold">SANKARANARAYANAN</span></p>
                  <p className="text-xs text-dark dark:text-white">Designation : <span className="font-semibold text-[#17a2b8]">ASSISTANT SALES MAN</span></p>
                  <p className="text-xs text-dark dark:text-white">Date : <span className="font-semibold">13-Mar-2026</span></p>
                </div>
                <button className="text-gray-400 hover:text-dark dark:hover:text-white">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>

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
