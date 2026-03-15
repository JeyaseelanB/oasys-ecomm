"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

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

// Mock generated employees based on HO/RO + date range
const MOCK_EMPLOYEES: EmployeeRow[] = [
  { id: 1, horo: "HEAD OFFICE",       entityType: "Head Office",  entity: "HEAD OFFICE",       department: "TECHNICAL",  employeeCode: "262", employeeName: "VAASU R",       designation: "GENERAL MANAGER",             dateOfBirth: "23-Jan-1965", dateOfRetirement: "31-Jan-2025", pendingDisposal: "Yes", punishmentInForce: "No" },
  { id: 2, horo: "D&P OFFICE ERODE",  entityType: "D & P Office", entity: "D&P OFFICE ERODE",  department: "ADMIN",      employeeCode: "374", employeeName: "LAKSHMI PRABHA", designation: "JUNIOR ASSISTANT",            dateOfBirth: "11-Sep-1980", dateOfRetirement: "30-Sep-2040", pendingDisposal: "No",  punishmentInForce: "No" },
  { id: 3, horo: "HEAD OFFICE",       entityType: "Head Office",  entity: "HEAD OFFICE",       department: "SALES",      employeeCode: "457", employeeName: "JAYALAKSHMI M",  designation: "SALES ASSISTANT",             dateOfBirth: "02-Jun-1980", dateOfRetirement: "30-Jun-2040", pendingDisposal: "No",  punishmentInForce: "No" },
  { id: 4, horo: "ISSR - CHENNAI",    entityType: "Head Office",  entity: "ISSR - CHENNAI",    department: "ADMIN",      employeeCode: "910", employeeName: "HASSAN FAROOK S", designation: "SENIOR OFFICER",             dateOfBirth: "02-Jun-1981", dateOfRetirement: "30-Jun-2041", pendingDisposal: "No",  punishmentInForce: "No" },
];

const HORO_OPTIONS = ["HEAD OFFICE", "D&P OFFICE ERODE", "D&P OFFICE SALEM", "D&P OFFICE THANJAVUR", "ISSR - CHENNAI", "COIMBATORE", "CUDDALORE"];
const FORWARD_FOR_OPTIONS = ["Approval", "Review", "Verification", "Information"];

export default function CreateNormalRetirementPage() {
  const router = useRouter();

  const [selectedHoro, setSelectedHoro] = useState<string[]>([]);
  const [horoDropdownOpen, setHoroDropdownOpen] = useState(false);
  const [fromDate, setFromDate]     = useState("");
  const [toDate, setToDate]         = useState("");
  const [employees, setEmployees]   = useState<EmployeeRow[]>([]);
  const [generated, setGenerated]   = useState(false);
  const [forwardTo, setForwardTo]   = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteText, setNoteText]     = useState("");

  const toggleHoro = (val: string) => {
    setSelectedHoro((prev) =>
      prev.includes(val) ? prev.filter((h) => h !== val) : [...prev, val]
    );
  };

  const handleGenerate = () => {
    if (!fromDate || !toDate) return;
    // Filter mock employees whose horo matches selection (or all if none selected)
    const filtered = selectedHoro.length === 0
      ? MOCK_EMPLOYEES
      : MOCK_EMPLOYEES.filter((e) => selectedHoro.includes(e.horo));
    setEmployees(filtered);
    setGenerated(true);
    setHoroDropdownOpen(false);
  };

  const handleClear = () => {
    setSelectedHoro([]);
    setFromDate("");
    setToDate("");
    setEmployees([]);
    setGenerated(false);
  };

  const handleSubmit = () => router.push("/personnel/human-resource/retirement/normal-retirement/list");

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Normal Retirement</h2>
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
            <li className="font-medium text-primary">Create Normal Retirement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Form Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Normal Retirement</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">

          {/* Filter Row */}
          <div className="mb-5 flex flex-wrap items-end gap-4">
            {/* HO/RO multi-select */}
            <div className="min-w-[220px] flex-1">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO <span className="text-red-500">*</span></label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setHoroDropdownOpen((o) => !o)}
                  className="flex w-full items-center gap-2 rounded border border-stroke bg-transparent px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                >
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                  </IconBox>
                  <span className="flex-1 text-left text-sm">
                    {selectedHoro.length === 0 ? `(0) Regions Selected` : `(${selectedHoro.length}) Region${selectedHoro.length > 1 ? "s" : ""} Selected`}
                  </span>
                  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 12,15 18,9"/></svg>
                </button>
                {horoDropdownOpen && (
                  <div className="absolute left-0 top-full z-10 mt-1 w-full rounded border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark">
                    {HORO_OPTIONS.map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-dark-2">
                        <input type="checkbox" checked={selectedHoro.includes(opt)} onChange={() => toggleHoro(opt)} className="size-4 accent-primary" />
                        <span className="text-dark dark:text-white">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* From Date */}
            <div className="min-w-[180px]">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">From Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>

            {/* To Date */}
            <div className="min-w-[180px]">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">To Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Clear
              </button>
              <button onClick={handleGenerate} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                Generate
              </button>
            </div>
          </div>

          {/* Employee Grid */}
          <div className="mb-5 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">HO/RO</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Entity Type</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Entity</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Department</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Employee Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Date of Birth</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Date of Retirement</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Pending Disposal of Charges</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Punishment in Force</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Generate Info</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="px-3 py-4 text-sm text-gray-400">No records found</td>
                  </tr>
                ) : (
                  employees.map((emp, idx) => (
                    <tr key={emp.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{emp.horo}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{emp.entityType}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{emp.entity}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{emp.department}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{emp.employeeCode} / {emp.employeeName}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{emp.designation}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{emp.dateOfBirth}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center font-medium text-[#2d8f7b] dark:border-dark-3">{emp.dateOfRetirement}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{emp.pendingDisposal}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{emp.punishmentInForce}</td>
                      <td className="border-r border-stroke px-2 py-2.5 text-center dark:border-dark-3">
                        <button className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90" title="Generate Info">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
                        </button>
                      </td>
                      <td className="px-2 py-2.5 text-center">
                        <button onClick={() => setEmployees((prev) => prev.filter((e) => e.id !== emp.id))} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90" title="Remove">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Forward section */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="5,12 12,5 19,12"/><polyline points="5,19 12,12 19,19"/></svg>
                </IconBox>
                <input
                  type="text"
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                  placeholder="Enter recipient"
                  className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="5,12 12,5 19,12"/><polyline points="5,19 12,12 19,19"/></svg>
                </IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {FORWARD_FOR_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Create Note button */}
          <div className="mb-2">
            <button onClick={() => setShowCreateNote(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
          </div>

        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/human-resource/retirement/normal-retirement/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
            Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showCreateNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-[10px] border border-stroke bg-white shadow-2xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowCreateNote(false)} className="text-white hover:opacity-70">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={5} placeholder="Enter note..." className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            </div>
            <div className="flex justify-end gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Cancel</button>
              <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Save Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
