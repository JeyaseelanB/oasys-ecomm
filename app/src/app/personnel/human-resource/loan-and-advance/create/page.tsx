"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DocumentRow {
  id: number;
  name: string;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function CreateLoanAndAdvancePage() {
  const router = useRouter();

  // Select Employee
  const [selectBy, setSelectBy]       = useState<"employeeId" | "entity">("employeeId");
  const [employeeId, setEmployeeId]   = useState("");
  const [entityCode, setEntityCode]   = useState("");

  // Financial Requirement
  const [finType, setFinType]         = useState("");
  const [docFileName, setDocFileName] = useState("");
  const [documents, setDocuments]     = useState<DocumentRow[]>([]);

  // Forward
  const [forwardTo, setForwardTo]     = useState("");
  const [forwardFor, setForwardFor]   = useState("Approval");

  const handleUpload = () => {
    if (!docFileName.trim()) return;
    setDocuments((prev) => [...prev, { id: Date.now(), name: docFileName.trim() }]);
    setDocFileName("");
  };

  const handleDeleteDoc = (id: number) => setDocuments((prev) => prev.filter((d) => d.id !== id));

  const handleSubmit = () => {
    router.push("/personnel/human-resource/loan-and-advance/list");
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Loans &amp; Advance</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Loans &amp; Advance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Form Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Loans &amp; Advance Request</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* ── Select Employee ── */}
          <div className="pb-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Select Employee</h4>
            </div>

            <div className="mb-4 flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-dark dark:text-white">
                <input type="radio" name="selectBy" checked={selectBy === "employeeId"} onChange={() => setSelectBy("employeeId")} className="size-4 accent-primary" />
                By Employee Id
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-dark dark:text-white">
                <input type="radio" name="selectBy" checked={selectBy === "entity"} onChange={() => setSelectBy("entity")} className="size-4 accent-primary" />
                By Entity
              </label>
            </div>

            {selectBy === "employeeId" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Employee ID <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <IconBox>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </IconBox>
                    <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Enter Employee ID" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Code / Name <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <IconBox><span className="text-sm font-bold">#</span></IconBox>
                    <input type="text" value={entityCode} onChange={(e) => setEntityCode(e.target.value)} placeholder="Enter Entity Code" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Select Financial Requirement ── */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Select Financial Requirement</h4>
            </div>

            {/* Type */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </IconBox>
                  <select value={finType} onChange={(e) => setFinType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="MARRIAGE LOAN 2">MARRIAGE LOAN 2</option>
                    <option value="BTF 1EDUCATION">BTF 1EDUCATION</option>
                    <option value="CSD1">CSD1</option>
                    <option value="CSD2">CSD2</option>
                    <option value="CRS2">CRS2</option>
                    <option value="VEHICLE LOAN">VEHICLE LOAN</option>
                    <option value="HOUSE LOAN">HOUSE LOAN</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Upload Documents */}
            <div className="mb-4">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Upload Documents <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={docFileName}
                  onChange={(e) => setDocFileName(e.target.value)}
                  placeholder="Choose file..."
                  readOnly
                  className="w-full max-w-xs rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
                <label className="flex cursor-pointer items-center gap-1.5 rounded bg-[#007bff] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                  Upload
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xlsx,.png,.jpg,.gif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) { setDocFileName(file.name); }
                    }}
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-400">File format: pdf, doc, xlsx, png, jpg, gif. File size should be less than 2 Mb</p>
              {docFileName && (
                <button onClick={handleUpload} className="mt-2 flex items-center gap-1 rounded bg-[#28a745] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Document
                </button>
              )}

              {/* Documents table */}
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="w-10 border border-[#3aa88f] px-3 py-2 text-center font-semibold">#</th>
                      <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Document Name</th>
                      <th className="w-20 border border-[#3aa88f] px-3 py-2 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.length === 0 ? (
                      <tr><td colSpan={3} className="border border-stroke px-3 py-3 text-left text-sm text-gray-400 dark:border-dark-3">No records found.</td></tr>
                    ) : (
                      documents.map((doc, idx) => (
                        <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                          <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                          <td className="border border-stroke px-3 py-2 dark:border-dark-3">{doc.name}</td>
                          <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                            <button onClick={() => handleDeleteDoc(doc.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90">
                              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Forward ── */}
          <div className="pt-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward to <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="5,12 12,5 19,12"/><polyline points="5,19 12,12 19,19"/></svg>
                  </IconBox>
                  <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} placeholder="Enter recipient" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward for <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="5,12 12,5 19,12"/><polyline points="5,19 12,12 19,19"/></svg>
                  </IconBox>
                  <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="Approval">Approval</option>
                    <option value="Review">Review</option>
                    <option value="Verification">Verification</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/loan-and-advance/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
