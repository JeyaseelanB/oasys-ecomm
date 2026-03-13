"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const SectionIcon = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#2d8f7b]">{value || "—"}</p>
  </div>
);

interface RelieveRecord {
  referenceNumber: string;
  employee: { pfNumber: string; name: string; department: string; transactionType: string; };
  transferFrom: { horo: string; entityType: string; entity: string; section: string; };
  transferRequested: { category: string; horo: string; entityType: string; entity: string; section: string; reason: string; };
}

const RELIEVE_DATA: Record<number, RelieveRecord> = {
  1: {
    referenceNumber: "TFR747",
    employee:          { pfNumber: "3544", name: "VAIRAMUTHU",  department: "TECHNICAL", transactionType: "Other region" },
    transferFrom:      { horo: "SALEM",              entityType: "D & P Office", entity: "D&P Office Salem",     section: "Procurement" },
    transferRequested: { category: "Transfer", horo: "THANJAVUR",   entityType: "D & P Office", entity: "D&P OFFICE THANJAVUR", section: "Procurement", reason: "Administrative reasons" },
  },
  2: {
    referenceNumber: "TFR746",
    employee:          { pfNumber: "3601", name: "MURUGAN",     department: "TECHNICAL", transactionType: "Other region" },
    transferFrom:      { horo: "D&P OFFICE THANJAVUR", entityType: "D & P Office", entity: "D&P OFFICE THANJAVUR", section: "Procurement" },
    transferRequested: { category: "Transfer", horo: "COIMBATORE", entityType: "D & P Office", entity: "D&P Office Erode",     section: "Procurement", reason: "Due to administrative reasons" },
  },
  3: {
    referenceNumber: "TFR745",
    employee:          { pfNumber: "3577", name: "LALITHA S",   department: "TECHNICAL", transactionType: "Other region" },
    transferFrom:      { horo: "COIMBATORE",         entityType: "D & P Office", entity: "D&P Office Erode",     section: "Procurement" },
    transferRequested: { category: "Transfer", horo: "SALEM",      entityType: "D & P Office", entity: "D&P Office Salem",     section: "Procurement", reason: "Personnel requirement" },
  },
};

function RelieveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 2;
  const record = RELIEVE_DATA[id] ?? RELIEVE_DATA[2];

  const [transferAvailability, setTransferAvailability]   = useState("");
  const [availabilityFromDate, setAvailabilityFromDate]   = useState("");
  const [noOfPositions, setNoOfPositions]                 = useState("");
  const [relievingDate, setRelievingDate]                 = useState("");
  const [remarks, setRemarks]                             = useState("");

  const handleSubmit = () => {
    router.push("/personnel/human-resource/transfer-deputation/list");
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Relieve</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Relieve</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Transfer / Deputation Request</h3>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* Reference */}
          <div className="mb-4 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reference No:</span>
              <span className="text-sm font-semibold text-[#2d8f7b]">{record.referenceNumber}</span>
            </div>
          </div>

          {/* Employee Details */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="PF Number"        value={record.employee.pfNumber} />
              <Field label="Employee Name"    value={record.employee.name} />
              <Field label="Department"       value={record.employee.department} />
              <Field label="Transaction Type" value={record.employee.transactionType} />
            </div>
          </div>

          {/* Transfer From */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transfer From</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="HO/RO"       value={record.transferFrom.horo} />
              <Field label="Entity Type" value={record.transferFrom.entityType} />
              <Field label="Entity"      value={record.transferFrom.entity} />
              <Field label="Section"     value={record.transferFrom.section} />
            </div>
          </div>

          {/* Transfer Requested */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transfer Requested</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Category"    value={record.transferRequested.category} />
              <Field label="HO/RO"       value={record.transferRequested.horo} />
              <Field label="Entity Type" value={record.transferRequested.entityType} />
              <Field label="Entity"      value={record.transferRequested.entity} />
              <Field label="Section"     value={record.transferRequested.section} />
              <Field label="Reason"      value={record.transferRequested.reason} />
            </div>
          </div>

          {/* Relieve Details (editable) */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Relieve Details</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  Transfer Availability <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </IconBox>
                  <select value={transferAvailability} onChange={(e) => setTransferAvailability(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  Transfer Availability From Date <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </IconBox>
                  <input type="date" value={availabilityFromDate} onChange={(e) => setAvailabilityFromDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  No. of Availability Position <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  </IconBox>
                  <input type="number" min="0" value={noOfPositions} onChange={(e) => setNoOfPositions(e.target.value)} placeholder="0" className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                  Relieving Date <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </IconBox>
                  <input type="date" value={relievingDate} onChange={(e) => setRelievingDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Enter remarks"
                className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>

        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/transfer-deputation/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-1.5 rounded bg-[#fd7e14] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Submit Relieve
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RelieveTransferDeputationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <RelieveContent />
    </Suspense>
  );
}
