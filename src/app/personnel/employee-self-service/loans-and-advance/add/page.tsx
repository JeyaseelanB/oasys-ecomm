"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LOAN_TYPES = ["LOAN", "ADVANCE"];
const LOAN_TYPE_DETAILS = ["BTF-2", "HBA", "FESTIVAL", "COMPUTER", "VEHICLE", "MEDICAL"];
const FORWARD_TO = ["Section Officer", "Assistant Director", "Deputy Director", "Director"];
const FORWARD_FOR = ["Verification", "Approval", "Final Approval"];

interface DocRow {
  id: number;
  name: string;
}

const ArrowIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
  </svg>
);

const ListIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

export default function AddLoanAdvancePage() {
  const router = useRouter();

  const [loanType, setLoanType] = useState("");
  const [loanTypeDetail, setLoanTypeDetail] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [noteText, setNoteText] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const icoBox = "flex size-9 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2";
  const selectCls = "h-9 w-full rounded-r border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const labelCls = "mb-1 block text-sm font-medium text-dark dark:text-white";
  const thCls = "border border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white";
  const tdCls = "border border-stroke px-3 py-2 text-sm text-dark dark:border-dark-3 dark:text-white";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setDocs((prev) => [...prev, { id: Date.now(), name: f.name }]);
    }
    e.target.value = "";
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!loanType) errs.loanType = "Type is required";
    if (!forwardTo) errs.forwardTo = "Forward To is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    router.push("/personnel/employee-self-service/loans-and-advance/list");
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Loans &amp; Advance Request</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Loans &amp; Advance Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Loans &amp; Advance Request</span>
          <span className="text-xs text-white/80">(Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Select Financial Requirement */}
          <div className="mb-5">
            <h4 className="mb-4 text-sm font-semibold text-dark dark:text-white">Select Financial Requirement</h4>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelCls}>Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className={icoBox}><ListIcon /></span>
                  <select className={`${selectCls} ${errors.loanType ? "border-red-400" : ""}`}
                    value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                    <option value="">Select</option>
                    {LOAN_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                {errors.loanType && <p className="mt-1 text-xs text-red-500">{errors.loanType}</p>}
              </div>
              {loanType && (
                <div>
                  <label className={labelCls}>Loan / Advance Type</label>
                  <div className="flex">
                    <span className={icoBox}><ListIcon /></span>
                    <select className={selectCls} value={loanTypeDetail} onChange={(e) => setLoanTypeDetail(e.target.value)}>
                      <option value="">Select</option>
                      {LOAN_TYPE_DETAILS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Documents */}
            <div className="mb-4">
              <label className={labelCls}>Upload Documents <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <input type="text" readOnly placeholder="No file chosen"
                  className="h-9 flex-1 rounded border border-stroke bg-gray-50 px-3 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <label className="flex cursor-pointer items-center gap-2 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                  Upload
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">File format: png, jpeg, pdf, doc and file size should be less than 2 MB</p>

              {/* Uploaded docs table */}
              {docs.length > 0 && (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#2d8f7b]">
                        <th className={thCls}>#</th>
                        <th className={thCls}>Document Name</th>
                        <th className={thCls}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((doc, idx) => (
                        <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-dark-2"}>
                          <td className={tdCls}>{idx + 1}</td>
                          <td className={tdCls}>{doc.name}</td>
                          <td className={tdCls}>
                            <button onClick={() => setDocs((d) => d.filter((x) => x.id !== doc.id))}
                              className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:opacity-90">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Forward To / Forward For */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelCls}>Forward To <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className={icoBox}><ArrowIcon /></span>
                  <select className={`${selectCls} ${errors.forwardTo ? "border-red-400" : ""}`}
                    value={forwardTo} onChange={(e) => setForwardTo(e.target.value)}>
                    <option value="">Select</option>
                    {FORWARD_TO.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                {errors.forwardTo && <p className="mt-1 text-xs text-red-500">{errors.forwardTo}</p>}
              </div>
              <div>
                <label className={labelCls}>Forward For</label>
                <div className="flex">
                  <span className={icoBox}><ArrowIcon /></span>
                  <select className={selectCls} value={forwardFor} onChange={(e) => setForwardFor(e.target.value)}>
                    <option value="">Select</option>
                    {FORWARD_FOR.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Create Note button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-2 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/employee-self-service/loans-and-advance/list")}
            className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-1 border-b border-stroke px-4 py-2 text-xs text-gray-400 dark:border-dark-3">
              {["Sans Serif", "Normal", "B", "I", "U", "S"].map((t, i) => <span key={i} className="cursor-pointer rounded px-1.5 py-0.5 hover:bg-gray-100">{t}</span>)}
            </div>
            <div className="p-4">
              <textarea className="h-32 w-full rounded border border-stroke bg-transparent p-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" placeholder="Enter text ..." value={noteText} onChange={(e) => setNoteText(e.target.value)} />
              <div className="mt-3 w-64 rounded border border-orange-300 p-3 text-xs text-dark dark:text-white">
                <p className="mb-1.5 text-center font-semibold">Created By</p>
                <p>Name : SANKARANARAYANAN</p>
                <p>Designation : SUPERINTENDENT</p>
                <p>Date : 13-Mar-2026</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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
