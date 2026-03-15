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

interface TransferRecord {
  pfNumber: string;
  employeeName: string;
  horo: string;
  entityType: string;
  entity: string;
  department: string;
  designation: string;
  category: string;
  transferType: string;
  toHoro: string;
  toEntityType: string;
  toEntity: string;
  toSection: string;
  toDesignation: string;
  relievingDate: string;
  reason: string;
}

const TRANSFER_DATA: Record<number, TransferRecord> = {
  1: { pfNumber: "3544", employeeName: "VAIRAMUTHU R",  horo: "SALEM",     entityType: "D & P Office", entity: "D&P Office Salem",     department: "TECHNICAL", designation: "PROCUREMENT QUALITY CONTROL SUPERVISOR", category: "Transfer", transferType: "Other region", toHoro: "THANJAVUR", toEntityType: "D & P Office", toEntity: "D&P OFFICE THANJAVUR", toSection: "Procurement", toDesignation: "PROCUREMENT QUALITY CONTROL SUPERVISOR", relievingDate: "2026-03-04", reason: "Administrative reasons" },
  2: { pfNumber: "3601", employeeName: "MURUGAN K",     horo: "THANJAVUR", entityType: "D & P Office", entity: "D&P OFFICE THANJAVUR", department: "TECHNICAL", designation: "PROCUREMENT QUALITY CONTROL SUPERVISOR", category: "Transfer", transferType: "Other region", toHoro: "COIMBATORE", toEntityType: "D & P Office", toEntity: "D&P Office Erode",     toSection: "Procurement", toDesignation: "PROCUREMENT QUALITY CONTROL SUPERVISOR", relievingDate: "2026-03-10", reason: "Due to administrative reasons" },
  3: { pfNumber: "3577", employeeName: "LALITHA S",     horo: "COIMBATORE",entityType: "D & P Office", entity: "D&P Office Erode",     department: "TECHNICAL", designation: "SALES ASSISTANT",                            category: "Transfer", transferType: "Other region", toHoro: "SALEM",     toEntityType: "D & P Office", toEntity: "D&P Office Salem",     toSection: "Procurement", toDesignation: "SALES ASSISTANT",                            relievingDate: "2026-03-10", reason: "Personnel requirement" },
};

function EditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const initial = TRANSFER_DATA[id] ?? TRANSFER_DATA[1];

  const [category, setCategory]           = useState(initial.category);
  const [transferType, setTransferType]   = useState(initial.transferType);
  const [toHoro, setToHoro]               = useState(initial.toHoro);
  const [toEntityType, setToEntityType]   = useState(initial.toEntityType);
  const [toEntity, setToEntity]           = useState(initial.toEntity);
  const [toSection, setToSection]         = useState(initial.toSection);
  const [toDesignation, setToDesignation] = useState(initial.toDesignation);
  const [relievingDate, setRelievingDate] = useState(initial.relievingDate);
  const [reason, setReason]               = useState(initial.reason);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Transfer / Deputation Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Transfer / Deputation Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Transfer / Deputation Request</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* ── Employee Details (read-only) ── */}
          <div className="pb-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "PF Number",   value: initial.pfNumber },
                { label: "Employee Name", value: initial.employeeName },
                { label: "Department",  value: initial.department },
                { label: "Designation", value: initial.designation },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
                  <div className="flex">
                    <IconBox>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </IconBox>
                    <input type="text" readOnly value={value} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Transfer From (read-only) ── */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transfer From</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "HO/RO",       value: initial.horo },
                { label: "Entity Type", value: initial.entityType },
                { label: "Entity",      value: initial.entity },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label}</label>
                  <div className="flex">
                    <IconBox>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                    </IconBox>
                    <input type="text" readOnly value={value} className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Transfer To (editable) ── */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transfer To</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Category <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Deputation">Deputation</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Transfer Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                  <select value={transferType} onChange={(e) => setTransferType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Within region">Within region</option>
                    <option value="Other region">Other region</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg></IconBox>
                  <select value={toHoro} onChange={(e) => setToHoro(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="HEAD OFFICE">HEAD OFFICE</option>
                    <option value="SALEM">SALEM</option>
                    <option value="THANJAVUR">THANJAVUR</option>
                    <option value="COIMBATORE">COIMBATORE</option>
                    <option value="CUDDALORE">CUDDALORE</option>
                    <option value="VIJAYAWADA">VIJAYAWADA</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Type Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                  <select value={toEntityType} onChange={(e) => setToEntityType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Head Office">Head Office</option>
                    <option value="D & P Office">D &amp; P Office</option>
                    <option value="Showroom">Showroom</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg></IconBox>
                  <select value={toEntity} onChange={(e) => setToEntity(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="HEAD OFFICE">HEAD OFFICE</option>
                    <option value="D&P Office Salem">D&P Office Salem</option>
                    <option value="D&P OFFICE THANJAVUR">D&P OFFICE THANJAVUR</option>
                    <option value="D&P Office Erode">D&P Office Erode</option>
                    <option value="DWH - CUDDALORE">DWH - CUDDALORE</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg></IconBox>
                  <select value={toDesignation} onChange={(e) => setToDesignation(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="PROCUREMENT QUALITY CONTROL SUPERVISOR">PROCUREMENT QUALITY CONTROL SUPERVISOR</option>
                    <option value="SALES ASSISTANT">SALES ASSISTANT</option>
                    <option value="MANAGER GRADE I">MANAGER GRADE I</option>
                    <option value="WAREHOUSE SUPERVISOR">WAREHOUSE SUPERVISOR</option>
                    <option value="SENIOR SALES OFFICER">SENIOR SALES OFFICER</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Section Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                  <select value={toSection} onChange={(e) => setToSection(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Procurement">Procurement</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Administration">Administration</option>
                    <option value="Sales">Sales</option>
                    <option value="Accounts">Accounts</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Relieving Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                  <input type="date" value={relievingDate} onChange={(e) => setRelievingDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Reason</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/transfer-deputation/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={() => router.push("/personnel/human-resource/transfer-deputation/list")} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditTransferDeputationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <EditContent />
    </Suspense>
  );
}
