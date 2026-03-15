"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type TransferStatus =
  | "RELIEVING_SUBMITTED"
  | "AVAILABILITY_FINAL_APPROVED"
  | "JOINED_ON_FINAL_APPROVED"
  | "JOINING_FINAL_APPROVED"
  | "REQUEST_FINAL_APPROVED"
  | "REQUEST_REJECTED";

interface TransferRecord {
  referenceNumber: string;
  status: TransferStatus;
  employee: {
    pfNumber: string;
    name: string;
    department: string;
    designation: string;
  };
  transferFrom: {
    horo: string;
    entityType: string;
    entity: string;
    section: string;
  };
  transferTo: {
    category: string;
    transferType: string;
    horo: string;
    entityType: string;
    entity: string;
    section: string;
    designation: string;
    relievingDate: string;
    reason: string;
  };
}

const TRANSFER_DATA: Record<number, TransferRecord> = {
  1: {
    referenceNumber: "TFR747",
    status: "RELIEVING_SUBMITTED",
    employee: { pfNumber: "3544", name: "VAIRAMUTHU", department: "TECHNICAL", designation: "PROCUREMENT QUALITY CONTROL SUPERVISOR" },
    transferFrom: { horo: "SALEM", entityType: "D & P Office", entity: "D&P Office Salem", section: "Procurement" },
    transferTo: { category: "Transfer", transferType: "Other region", horo: "THANJAVUR", entityType: "D & P Office", entity: "D&P OFFICE THANJAVUR", section: "Procurement", designation: "PROCUREMENT QUALITY CONTROL SUPERVISOR", relievingDate: "04-Mar-2026", reason: "Administrative reasons" },
  },
  2: {
    referenceNumber: "TFR746",
    status: "AVAILABILITY_FINAL_APPROVED",
    employee: { pfNumber: "3601", name: "MURUGAN", department: "TECHNICAL", designation: "PROCUREMENT QUALITY CONTROL SUPERVISOR" },
    transferFrom: { horo: "D&P OFFICE THANJAVUR", entityType: "D & P Office", entity: "D&P OFFICE THANJAVUR", section: "Procurement" },
    transferTo: { category: "Transfer", transferType: "Other region", horo: "COIMBATORE", entityType: "D & P Office", entity: "D&P Office Erode", section: "Procurement", designation: "PROCUREMENT QUALITY CONTROL SUPERVISOR", relievingDate: "10-Mar-2026", reason: "Due to administrative reasons" },
  },
  3: {
    referenceNumber: "TFR745",
    status: "JOINED_ON_FINAL_APPROVED",
    employee: { pfNumber: "3577", name: "LALITHA S", department: "TECHNICAL", designation: "SALES ASSISTANT" },
    transferFrom: { horo: "COIMBATORE", entityType: "D & P Office", entity: "D&P Office Erode", section: "Procurement" },
    transferTo: { category: "Transfer", transferType: "Other region", horo: "SALEM", entityType: "D & P Office", entity: "D&P Office Salem", section: "Procurement", designation: "SALES ASSISTANT", relievingDate: "10-Mar-2026", reason: "Personnel requirement" },
  },
  4: {
    referenceNumber: "TFR744",
    status: "JOINING_FINAL_APPROVED",
    employee: { pfNumber: "3253", name: "SARAVANAN P", department: "ADMIN", designation: "MANAGER GRADE I" },
    transferFrom: { horo: "VIJAYAWADA", entityType: "Head Office", entity: "VIJAYAWADA", section: "Administration" },
    transferTo: { category: "Transfer", transferType: "Other region", horo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", section: "Administration", designation: "MANAGER GRADE I", relievingDate: "02-Mar-2026", reason: "Promotion and transfer" },
  },
  5: {
    referenceNumber: "TFR743",
    status: "JOINED_ON_FINAL_APPROVED",
    employee: { pfNumber: "3451", name: "GANESAN K", department: "OPERATIONS", designation: "WAREHOUSE SUPERVISOR" },
    transferFrom: { horo: "CUDDALORE", entityType: "Warehouse", entity: "DWH - CUDDALORE", section: "Operations" },
    transferTo: { category: "Transfer", transferType: "Within region", horo: "CUDDALORE", entityType: "Warehouse", entity: "DWH - CUDDALORE", section: "Procurement", designation: "WAREHOUSE SUPERVISOR", relievingDate: "02-Mar-2026", reason: "Section realignment" },
  },
  6: {
    referenceNumber: "TFR742",
    status: "REQUEST_FINAL_APPROVED",
    employee: { pfNumber: "3451", name: "GANESAN K", department: "OPERATIONS", designation: "WAREHOUSE SUPERVISOR" },
    transferFrom: { horo: "CUDDALORE", entityType: "Warehouse", entity: "DWH - CUDDALORE", section: "Operations" },
    transferTo: { category: "Transfer", transferType: "Within region", horo: "CUDDALORE", entityType: "Warehouse", entity: "DWH - CUDDALORE", section: "Procurement", designation: "WAREHOUSE SUPERVISOR", relievingDate: "02-Mar-2026", reason: "Section realignment" },
  },
  7: {
    referenceNumber: "TFR741",
    status: "REQUEST_REJECTED",
    employee: { pfNumber: "3451", name: "GANESAN K", department: "OPERATIONS", designation: "WAREHOUSE SUPERVISOR" },
    transferFrom: { horo: "CUDDALORE", entityType: "Warehouse", entity: "DWH - CUDDALORE", section: "Operations" },
    transferTo: { category: "Transfer", transferType: "Within region", horo: "CUDDALORE", entityType: "Warehouse", entity: "DWH - CUDDALORE", section: "Procurement", designation: "WAREHOUSE SUPERVISOR", relievingDate: "02-Mar-2026", reason: "Request rejected by authority" },
  },
};

const STATUS_STYLES: Record<TransferStatus, string> = {
  RELIEVING_SUBMITTED:         "bg-[#fd7e14]",
  AVAILABILITY_FINAL_APPROVED: "bg-[#28a745]",
  JOINED_ON_FINAL_APPROVED:    "bg-[#17a2b8]",
  JOINING_FINAL_APPROVED:      "bg-[#17a2b8]",
  REQUEST_FINAL_APPROVED:      "bg-[#28a745]",
  REQUEST_REJECTED:            "bg-[#dc3545]",
};

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

function ViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const record = TRANSFER_DATA[id] ?? TRANSFER_DATA[1];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Transfer / Deputation Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Transfer / Deputation Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Transfer / Deputation Request</h3>
        </div>

        <div className="divide-y divide-stroke p-5 dark:divide-dark-3">

          {/* Reference + Status */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reference No:</span>
              <span className="text-sm font-semibold text-[#2d8f7b]">{record.referenceNumber}</span>
            </div>
            <span className={`inline-block rounded-sm px-3 py-1 text-xs font-semibold text-white ${STATUS_STYLES[record.status]}`}>
              {record.status}
            </span>
          </div>

          {/* Employee Details */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="PF Number"      value={record.employee.pfNumber} />
              <Field label="Employee Name"  value={record.employee.name} />
              <Field label="Department"     value={record.employee.department} />
              <Field label="Designation"    value={record.employee.designation} />
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

          {/* Transfer To */}
          <div className="py-5">
            <div className="mb-3 flex items-center gap-2">
              <SectionIcon />
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transfer To</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <Field label="Category"      value={record.transferTo.category} />
              <Field label="Transfer Type" value={record.transferTo.transferType} />
              <Field label="HO/RO"         value={record.transferTo.horo} />
              <Field label="Entity Type"   value={record.transferTo.entityType} />
              <Field label="Entity"        value={record.transferTo.entity} />
              <Field label="Section"       value={record.transferTo.section} />
              <Field label="Designation"   value={record.transferTo.designation} />
              <Field label="Relieving Date" value={record.transferTo.relievingDate} />
            </div>
            <div className="mt-4">
              <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Reason</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{record.transferTo.reason || "—"}</p>
            </div>
          </div>

        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button
            onClick={() => router.push(`/personnel/human-resource/transfer-deputation/relieve?id=${id}`)}
            className="flex items-center gap-1.5 rounded bg-[#fd7e14] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Relieve
          </button>
          <button onClick={() => router.push("/personnel/human-resource/transfer-deputation/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ViewTransferDeputationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
