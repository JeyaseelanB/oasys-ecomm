"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

interface EmployeeRow {
  id: number;
  horo: string;
  entityType: string;
  entity: string;
  department: string;
  employeeCode: string;
  employeeName: string;
  designation: string;
  dateOfBirth: string;
  dateOfRetirement: string;
  pendingDisposal: string;
  punishmentInForce: string;
}

interface NoteHistory {
  status: string;
  name: string;
  designation: string;
  date: string;
}

interface RetirementRecord {
  referenceNumber: string;
  employees: EmployeeRow[];
  noteText: string;
  noteHistory: NoteHistory[];
}

const RETIREMENT_DATA: Record<number, RetirementRecord> = {
  1: {
    referenceNumber: "RETY2541",
    employees: [
      { id: 1, horo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "TECHNICAL", employeeCode: "262", employeeName: "VAASU R", designation: "GENERAL MANAGER", dateOfBirth: "23-Jan-1965", dateOfRetirement: "31-Jan-2025", pendingDisposal: "Yes", punishmentInForce: "No" },
    ],
    noteText: "approve",
    noteHistory: [
      { status: "SUBMITTED",      name: "LAVANYA M",           designation: "MANAGER GRADE – II", date: "21-Aug-2024" },
      { status: "FINAL-APPROVED", name: "SANKARANARAYANAN C",  designation: "SUPERINTENDENT",     date: "21-Aug-2024" },
    ],
  },
  2: {
    referenceNumber: "RETY2440",
    employees: [
      { id: 1, horo: "D&P OFFICE ERODE", entityType: "D & P Office", entity: "D&P OFFICE ERODE", department: "ADMIN", employeeCode: "374", employeeName: "LAKSHMI PRABHA", designation: "JUNIOR ASSISTANT", dateOfBirth: "11-Sep-1980", dateOfRetirement: "30-Sep-2040", pendingDisposal: "No", punishmentInForce: "No" },
    ],
    noteText: "Pending review",
    noteHistory: [
      { status: "SUBMITTED", name: "KARTHIK R", designation: "ASSISTANT MANAGER", date: "02-Sep-2024" },
    ],
  },
  3: {
    referenceNumber: "RETY2438",
    employees: [
      { id: 1, horo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE", department: "SALES", employeeCode: "457", employeeName: "JAYALAKSHMI M", designation: "SALES ASSISTANT", dateOfBirth: "02-Jun-1980", dateOfRetirement: "30-Jun-2040", pendingDisposal: "No", punishmentInForce: "No" },
    ],
    noteText: "Approved by superintendent",
    noteHistory: [
      { status: "SUBMITTED",      name: "LAVANYA M",          designation: "MANAGER GRADE – II", date: "21-Aug-2024" },
      { status: "FINAL-APPROVED", name: "SANKARANARAYANAN C", designation: "SUPERINTENDENT",     date: "21-Aug-2024" },
    ],
  },
  5: {
    referenceNumber: "RETY2323",
    employees: [
      { id: 1, horo: "HEAD OFFICE",      entityType: "Head Office",  entity: "HEAD OFFICE",      department: "TECHNICAL", employeeCode: "262", employeeName: "VAASU R",        designation: "GENERAL MANAGER",  dateOfBirth: "23-Jan-1965", dateOfRetirement: "31-Jan-2025", pendingDisposal: "Yes", punishmentInForce: "No" },
      { id: 2, horo: "ISSR - CHENNAI",   entityType: "Head Office",  entity: "ISSR - CHENNAI",   department: "ADMIN",     employeeCode: "910", employeeName: "HASSAN FAROOK S", designation: "SENIOR OFFICER",   dateOfBirth: "02-Jun-1981", dateOfRetirement: "30-Jun-2041", pendingDisposal: "No",  punishmentInForce: "No" },
      { id: 3, horo: "D&P OFFICE ERODE", entityType: "D & P Office", entity: "D&P OFFICE ERODE", department: "ADMIN",     employeeCode: "374", employeeName: "LAKSHMI PRABHA", designation: "JUNIOR ASSISTANT", dateOfBirth: "11-Sep-1980", dateOfRetirement: "30-Sep-2040", pendingDisposal: "No",  punishmentInForce: "No" },
    ],
    noteText: "Batch retirement submission",
    noteHistory: [
      { status: "SUBMITTED", name: "MURUGAN K", designation: "DEPUTY MANAGER", date: "08-Aug-2023" },
    ],
  },
};

function ViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const record = RETIREMENT_DATA[id] ?? RETIREMENT_DATA[1];

  const [showViewNote, setShowViewNote]         = useState(false);
  const [noteHistoryIndex, setNoteHistoryIndex] = useState(0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Normal Retirement</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Retirement</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Normal Retirement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Normal Retirement</h3>
        </div>

        <div className="p-5">
          {/* Reference */}
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reference No:</span>
            <span className="text-sm font-semibold text-[#2d8f7b]">{record.referenceNumber}</span>
          </div>

          {/* Employees List section header */}
          <div className="mb-3 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Employees List</h4>
          </div>

          {/* Employees Table */}
          <div className="mb-5 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">HO/RO</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Entity Type</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Entity</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Department</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Employee Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Date of Birth</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Date of Retirement</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Pending Disposal of Charges</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Punishment in Force</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Generate Info</th>
                </tr>
              </thead>
              <tbody>
                {record.employees.map((emp, idx) => (
                  <tr key={emp.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{emp.horo}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{emp.entityType}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{emp.entity}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{emp.department}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{emp.employeeCode} / {emp.employeeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{emp.designation}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{emp.dateOfBirth}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{emp.dateOfRetirement}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{emp.pendingDisposal}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{emp.punishmentInForce}</td>
                    <td className="px-3 py-3 text-center">
                      <button className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90" title="Generate Info">
                        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setNoteHistoryIndex(0); setShowViewNote(true); }}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
                View Note
              </button>
              <button className="inline-flex items-center justify-center rounded bg-[#6c757d] p-2 text-white hover:opacity-90" title="Comment">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button onClick={() => router.push("/personnel/human-resource/retirement/normal-retirement/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showViewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-xl rounded-[10px] border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-70">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Note text */}
            <div className="px-5 pt-5">
              <div className="min-h-[120px] rounded border border-stroke bg-white p-3 text-sm text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                {record.noteText}
              </div>

              {/* Pagination dots */}
              {record.noteHistory.length > 1 && (
                <div className="mt-3 flex items-center justify-end gap-2">
                  <div className="flex items-center gap-1.5">
                    {record.noteHistory.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setNoteHistoryIndex(i)}
                        className={`size-2.5 rounded-full transition-colors ${noteHistoryIndex === i ? "bg-[#2d8f7b]" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>
                  <button onClick={() => setNoteHistoryIndex((p) => Math.max(0, p - 1))} disabled={noteHistoryIndex === 0} className="flex size-6 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40">&#8249;</button>
                  <button onClick={() => setNoteHistoryIndex((p) => Math.min(record.noteHistory.length - 1, p + 1))} disabled={noteHistoryIndex === record.noteHistory.length - 1} className="flex size-6 items-center justify-center rounded border border-stroke text-xs hover:bg-gray-100 disabled:opacity-40">&#8250;</button>
                </div>
              )}
            </div>

            {/* Workflow status cards */}
            <div className="px-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                {record.noteHistory.map((entry, i) => (
                  <div
                    key={i}
                    className={`rounded border-2 p-4 ${i === noteHistoryIndex ? "border-[#2d8f7b]" : "border-[#e0e0e0]"}`}
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-dark dark:text-white">{entry.status}</p>
                    <p className="mb-0.5 text-xs text-gray-600 dark:text-gray-400">Name : {entry.name}</p>
                    <p className="mb-0.5 text-xs text-gray-600 dark:text-gray-400">Designation : {entry.designation}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Date : {entry.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowViewNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ViewNormalRetirementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
