"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEPARTMENTS = ["ADMIN", "MARKETING", "FINANCE", "HR", "OPERATIONS", "IT"];
const DESIGNATIONS = ["SUPERINTENDENT", "JUNIOR ASSISTANT", "SENIOR ASSISTANT", "MANAGER", "SYSTEM ANALYST", "CLERK"];

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/>
    <rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/>
    <rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/>
    <rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="10" y="17" width="4" height="4" rx="0.5"/>
    <rect x="17" y="17" width="4" height="4" rx="0.5"/>
  </svg>
);

const BuildingIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

export default function EditInterchangePage() {
  const router = useRouter();

  // Pre-filled with existing record data
  const [interchangeDepartment, setInterchangeDepartment] = useState("ADMIN");
  const [interchangeDesignation, setInterchangeDesignation] = useState("JUNIOR ASSISTANT");
  const [reason, setReason] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [signatureFile, setSignatureFile] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const icoBox = "flex size-9 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2";
  const selectCls = "h-9 w-full rounded-r border border-stroke bg-transparent px-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const labelCls = "mb-1 block text-sm font-medium text-dark dark:text-white";

  const handleUpdate = () => {
    const errs: Record<string, string> = {};
    if (!interchangeDepartment) errs.interchangeDepartment = "Interchange Department is required";
    if (!interchangeDesignation) errs.interchangeDesignation = "Interchange Designation is required";
    if (!reason.trim()) errs.reason = "Reason is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    router.push("/personnel/employee-self-service/interchange/list");
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Interchange Request</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Interchange Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Interchange Request</span>
        </div>

        <div className="p-5">
          {/* Current Statistics */}
          <div className="mb-5 border-b border-stroke pb-5 dark:border-dark-3">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon /> Current Statistics
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Head / Regional Office</p>
                <p className="text-sm font-semibold text-[#17a2b8]">HEAD OFFICE</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Entity Type</p>
                <p className="text-sm font-semibold text-[#17a2b8]">Head Office</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Entity</p>
                <p className="text-sm font-semibold text-[#17a2b8]">HEAD OFFICE</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Current Department</p>
                <p className="text-sm font-semibold text-[#17a2b8]">ADMIN</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Current Designation</p>
                <p className="text-sm font-semibold text-[#17a2b8]">SUPERINTENDENT</p>
              </div>
            </div>
          </div>

          {/* Interchange Request Form */}
          <div className="mb-5">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon /> Interchange Request
            </h4>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* Col 1: Department + Designation */}
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Interchange Department <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className={icoBox}><BuildingIcon /></span>
                    <select className={`${selectCls} ${errors.interchangeDepartment ? "border-red-400" : ""}`}
                      value={interchangeDepartment} onChange={(e) => setInterchangeDepartment(e.target.value)}>
                      <option value="">Select</option>
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  {errors.interchangeDepartment && <p className="mt-1 text-xs text-red-500">{errors.interchangeDepartment}</p>}
                </div>
                <div>
                  <label className={labelCls}>Interchange Designation <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className={icoBox}><BuildingIcon /></span>
                    <select className={`${selectCls} ${errors.interchangeDesignation ? "border-red-400" : ""}`}
                      value={interchangeDesignation} onChange={(e) => setInterchangeDesignation(e.target.value)}>
                      <option value="">Select</option>
                      {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  {errors.interchangeDesignation && <p className="mt-1 text-xs text-red-500">{errors.interchangeDesignation}</p>}
                </div>
              </div>

              {/* Col 2: Reason */}
              <div>
                <label className={labelCls}>Reason <span className="text-red-500">*</span></label>
                <textarea
                  rows={5}
                  className={`w-full rounded border ${errors.reason ? "border-red-400" : "border-stroke"} bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white`}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                {errors.reason && <p className="mt-1 text-xs text-red-500">{errors.reason}</p>}
              </div>

              {/* Col 3: Supporting Documents */}
              <div>
                <label className={labelCls}>Supporting Documents</label>
                <div className="min-h-[120px] rounded border border-stroke p-3 dark:border-dark-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                    Upload
                  </button>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Upload Documents:</p>
                  {uploadedFile && <p className="mt-1 text-xs text-[#17a2b8]">{uploadedFile}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/employee-self-service/interchange/list")} className="flex items-center gap-1.5 rounded bg-[#4b5563] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleUpdate} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            Update
          </button>
        </div>
      </div>

      {/* Document Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Document Upload</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-white hover:opacity-75">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <label className="w-24 shrink-0 text-sm font-medium text-dark dark:text-white">Signature</label>
                <div className="flex flex-1 items-center gap-2">
                  <input type="text" readOnly className="h-9 flex-1 rounded border border-stroke bg-gray-50 px-3 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" value={signatureFile} placeholder="" />
                  <label className="flex cursor-pointer items-center gap-1 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                    Choose
                    <input type="file" className="hidden" accept=".png,.jpeg,.jpg,.pdf,.doc"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) { setSignatureFile(f.name); setUploadedFile(f.name); }
                      }} />
                  </label>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">File format: png, jpeg, pdf, doc and file size should be less than 250 KB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
