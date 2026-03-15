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

interface ResignationRecord {
  pfNumber: string; name: string; horo: string; designation: string;
  dateOfAppointment: string; dateOfBirth: string; dateOfRetirement: string;
  dateOfJoining: string; entity: string; department: string; entityType: string;
  age: string; actualService: string;
  dateOfResignation: string; pendingDisposal: string; punishmentInForce: string; reason: string;
}

const RESIGNATION_DATA: Record<number, ResignationRecord> = {
  1: { pfNumber: "374", name: "LAKSHMI PRABHA S", horo: "COIMBATORE",  designation: "JUNIOR ASSISTANT", dateOfAppointment: "02-May-2013", dateOfBirth: "11-Sep-1980", dateOfRetirement: "30-Sep-2040", dateOfJoining: "02-May-2013", entity: "D&P OFFICE ERODE", department: "ADMIN",    entityType: "D & P Office", age: "45 Years 6 Months 2 Days",  actualService: "12 Years 10 Months 11 Days", dateOfResignation: "2026-02-17", pendingDisposal: "No", punishmentInForce: "No", reason: "Personal reasons" },
  2: { pfNumber: "457", name: "JAYALAKSHMI M",   horo: "HEAD OFFICE",  designation: "SALES ASSISTANT",  dateOfAppointment: "01-Jun-2010", dateOfBirth: "02-Jun-1980", dateOfRetirement: "30-Jun-2040", dateOfJoining: "01-Jun-2010", entity: "HEAD OFFICE",    department: "SALES",    entityType: "Head Office",  age: "44 Years 9 Months 11 Days", actualService: "15 Years 9 Months 12 Days", dateOfResignation: "2024-08-26", pendingDisposal: "No", punishmentInForce: "No", reason: "Better opportunity" },
  3: { pfNumber: "187", name: "BHUVANA P",       horo: "HEAD OFFICE",  designation: "ACCOUNTS OFFICER", dateOfAppointment: "15-Mar-2008", dateOfBirth: "02-Jan-1980", dateOfRetirement: "31-Jan-2040", dateOfJoining: "15-Mar-2008", entity: "HEAD OFFICE",    department: "ACCOUNTS", entityType: "Head Office",  age: "45 Years 2 Months 11 Days", actualService: "17 Years 2 Months",         dateOfResignation: "2024-08-16", pendingDisposal: "No", punishmentInForce: "No", reason: "Family reasons" },
  4: { pfNumber: "910", name: "HASSAN FAROOK S", horo: "ISSR-CHENNAI", designation: "SENIOR OFFICER",   dateOfAppointment: "10-Jul-2009", dateOfBirth: "02-Jun-1981", dateOfRetirement: "30-Jun-2041", dateOfJoining: "10-Jul-2009", entity: "ISSR - CHENNAI", department: "ADMIN",    entityType: "Head Office",  age: "43 Years 9 Months 11 Days", actualService: "16 Years 8 Months 3 Days",  dateOfResignation: "2024-08-13", pendingDisposal: "No", punishmentInForce: "No", reason: "Personal reasons" },
};

function EditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const initial = RESIGNATION_DATA[id] ?? RESIGNATION_DATA[1];

  const [dateOfResignation, setDateOfResignation] = useState(initial.dateOfResignation);
  const [pendingDisposal, setPendingDisposal]     = useState(initial.pendingDisposal);
  const [punishmentInForce, setPunishmentInForce] = useState(initial.punishmentInForce);
  const [punishmentDetails, setPunishmentDetails] = useState("");
  const [reason, setReason]                       = useState(initial.reason);

  const ReadField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
      <div className="flex">
        <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
        <input type="text" readOnly value={value} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Resignation</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Resignation</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Resignation</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* Employee Details (read-only) */}
          <div className="pb-5">
            <div className="mb-3 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ReadField label="PF Number"             value={initial.pfNumber} />
              <ReadField label="Employee Name"         value={initial.name} />
              <ReadField label="HO/RO"                 value={initial.horo} />
              <ReadField label="Designation"           value={initial.designation} />
              <ReadField label="Date of Appointment"   value={initial.dateOfAppointment} />
              <ReadField label="Date of Birth"         value={initial.dateOfBirth} />
              <ReadField label="Date of Retirement"    value={initial.dateOfRetirement} />
              <ReadField label="Date of Joining"       value={initial.dateOfJoining} />
              <ReadField label="Entity"                value={initial.entity} />
              <ReadField label="Department"            value={initial.department} />
              <ReadField label="Entity Type"           value={initial.entityType} />
              <ReadField label="Age (as on Date)"      value={initial.age} />
              <ReadField label="Actual Service"        value={initial.actualService} />
            </div>
          </div>

          {/* Resignation Details (editable) */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Resignation Details</h4></div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Resignation <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                  <input type="date" value={dateOfResignation} onChange={(e) => setDateOfResignation(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Pending Disposal of Charges <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                  <select value={pendingDisposal} onChange={(e) => setPendingDisposal(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Punishment in Force <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                  <select value={punishmentInForce} onChange={(e) => setPunishmentInForce(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {punishmentInForce === "Yes" && (
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Punishment Details <span className="text-red-500">*</span></label>
                <textarea value={punishmentDetails} onChange={(e) => setPunishmentDetails(e.target.value)} rows={2} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            )}

            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Reason for Resignation <span className="text-red-500">*</span></label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/resignation/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={() => router.push("/personnel/human-resource/resignation/list")} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditResignationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <EditContent />
    </Suspense>
  );
}
