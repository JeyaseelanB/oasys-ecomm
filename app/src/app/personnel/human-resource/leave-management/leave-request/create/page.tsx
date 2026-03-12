"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </div>
);

const CalendarIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const EMPLOYEES: Record<string, { code: string; name: string }[]> = {
  "HEAD OFFICE": [
    { code: "3191", name: "ALOK BABELAY" },
    { code: "3596", name: "ANITHA G" },
    { code: "3587", name: "ANURADHA S" },
    { code: "140",  name: "ARULRAJAN" },
    { code: "242",  name: "ANURADHA" },
  ],
  "REGIONAL OFFICE - CHENNAI": [
    { code: "4012", name: "KUMAR S" },
    { code: "2875", name: "LAKSHMI R" },
  ],
};

export default function CreateLeaveRequestPage() {
  const router = useRouter();

  // Select Employee
  const [hoRo, setHoRo]           = useState("");
  const [entityType, setEntityType] = useState("");
  const [entityCode, setEntityCode] = useState("");
  const [department, setDepartment] = useState("");
  const [empPf, setEmpPf]           = useState("");
  const [empCode, setEmpCode]       = useState("");

  const availableEmps = hoRo ? (EMPLOYEES[hoRo] ?? []) : [];

  const handleEmpPfChange = (val: string) => {
    setEmpPf(val);
    const emp = availableEmps.find((e) => e.code === val);
    setEmpCode(emp?.name ?? "");
  };

  // Leave Request
  const [typeOfLeave,     setTypeOfLeave]     = useState("");
  const [leaveEligibility, setLeaveEligibility] = useState("");
  const [leaveConsumed,   setLeaveConsumed]   = useState("");
  const [leaveBalance,    setLeaveBalance]    = useState("");
  const [fromDate,        setFromDate]        = useState("");
  const [toDate,          setToDate]          = useState("");
  const [totalDays,       setTotalDays]       = useState("");
  const [leaveType,       setLeaveType]       = useState("");
  const [session,         setSession]         = useState("");

  // Reason + upload
  const [reason, setReason]           = useState("");
  const [fileName, setFileName]       = useState("");

  // Forward
  const [forwardTo,  setForwardTo]  = useState("");
  const [forwardFor, setForwardFor] = useState("");

  // Note modal
  const [showNote,       setShowNote]       = useState(false);
  const [noteText,       setNoteText]       = useState("");
  const [noteFontFamily, setNoteFontFamily] = useState("Arial");
  const [noteFontSize,   setNoteFontSize]   = useState("14");

  const selectCls = "flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const inputCls  = "w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const readCls   = "flex-1 rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-400";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Leave Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Leave Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Leave Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Leave Request</h3>
          <span className="text-xs text-white/80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5 space-y-6">
          {/* Select Employee */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Select Employee</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
              {/* HO/RO */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">HO/RO <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></IconBox>
                  <select value={hoRo} onChange={(e) => { setHoRo(e.target.value); setEmpPf(""); setEmpCode(""); }} className={selectCls}>
                    <option value="">Select</option>
                    <option>HEAD OFFICE</option>
                    <option>REGIONAL OFFICE - CHENNAI</option>
                    <option>REGIONAL OFFICE - COIMBATORE</option>
                  </select>
                </div>
              </div>
              {/* Entity Type */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Entity Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                  <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    <option>Head Office</option>
                    <option>Regional Office</option>
                    <option>Branch Office</option>
                  </select>
                </div>
              </div>
              {/* Entity Code / Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Entity Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg></IconBox>
                  <select value={entityCode} onChange={(e) => setEntityCode(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    <option>HO-001 / Head Office</option>
                    <option>BR-010 / Chennai Branch</option>
                    <option>BR-012 / Coimbatore Branch</option>
                  </select>
                </div>
              </div>
              {/* Department */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Department <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></IconBox>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    <option>ADMIN</option>
                    <option>HR</option>
                    <option>ACCOUNTS</option>
                    <option>IT</option>
                    <option>MARKETING</option>
                    <option>SALES</option>
                  </select>
                </div>
              </div>
              {/* Employee PF / Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Employee PF / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                  <select value={empPf} onChange={(e) => handleEmpPfChange(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    {availableEmps.map((e) => <option key={e.code} value={e.code}>{e.code} / {e.name}</option>)}
                  </select>
                </div>
              </div>
              {/* Employee Code / Name (auto-fill) */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Employee Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                  <input type="text" value={empCode} readOnly className={readCls} placeholder="Auto-filled" />
                </div>
              </div>
            </div>
          </div>

          {/* Leave Request Details */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Leave Request</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
              {/* Type of Leave */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Type of Leave <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></IconBox>
                  <select value={typeOfLeave} onChange={(e) => setTypeOfLeave(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    <option>Casual Leave</option>
                    <option>Medical Leave</option>
                    <option>Earned Leave</option>
                    <option>Maternity Leave</option>
                    <option>Paternity Leave</option>
                  </select>
                </div>
              </div>
              {/* Leave Eligibility */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Leave Eligibility <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                  <input type="text" value={leaveEligibility} readOnly className={readCls} placeholder="Auto-filled" />
                </div>
              </div>
              {/* Leave Consumed */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Leave Consumed <span className="text-red-500">*</span></label>
                <input type="text" value={leaveConsumed} readOnly className={`${inputCls} bg-gray-50 dark:bg-gray-700`} placeholder="Auto-filled" />
              </div>
              {/* Leave Balance */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Leave Balance <span className="text-red-500">*</span></label>
                <input type="text" value={leaveBalance} readOnly className={`${inputCls} bg-gray-50 dark:bg-gray-700`} placeholder="Auto-filled" />
              </div>
              {/* From Date */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">From Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="flex-1 rounded-l border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700"><CalendarIco /></div>
                </div>
              </div>
              {/* To Date */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">To Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="flex-1 rounded-l border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700"><CalendarIco /></div>
                </div>
              </div>
              {/* Total No. of Days */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Total No. of days <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></IconBox>
                  <input type="number" value={totalDays} readOnly className={readCls} placeholder="0" />
                </div>
              </div>
              {/* Type */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></IconBox>
                  <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    <option>Full Day</option>
                    <option>Half Day</option>
                  </select>
                </div>
              </div>
              {/* Session */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Session</label>
                <div className="flex">
                  <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></IconBox>
                  <select value={session} onChange={(e) => setSession(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Reason + Upload */}
          <div className="grid grid-cols-1 gap-6 border-b border-stroke pb-5 lg:grid-cols-2 dark:border-dark-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Reason <span className="text-red-500">*</span></label>
              <textarea
                value={reason}
                onChange={(e) => { if (e.target.value.length <= 250) setReason(e.target.value); }}
                rows={4}
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                placeholder="Enter reason..."
              />
              <p className="mt-1 text-xs text-[#2d8f7b]">Should be maximum 250 characters ({250 - reason.length} remaining)</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Documents</label>
              <div className="flex items-center gap-2">
                <input type="text" value={fileName} readOnly className="flex-1 rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-500 dark:border-dark-3 dark:bg-gray-700" placeholder="No file chosen" />
                <label className="flex cursor-pointer items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Uploads
                  <input type="file" accept=".pdf,.doc,.docx,.xlsx,.jpg,.png" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">File format: PDF, DOC, DOCX, XLSX, JPG and PNG&nbsp;&nbsp;File size should be less than 100KB</p>
            </div>
          </div>

          {/* Forward To / For */}
          <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 dark:border-dark-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Forward to <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 004 4h12"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" placeholder="Enter name" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Forward for <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,10 20,15 15,20"/><path d="M4 4v7a4 4 0 004 4h12"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  <option>Approval</option>
                  <option>Review</option>
                  <option>Information</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/personnel/human-resource/leave-management/leave-request/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-2 flex flex-wrap items-center gap-1.5 rounded border border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-gray-700">
                <button className="flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark" title="Undo">↩</button>
                <button className="flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark" title="Redo">↪</button>
                <select value={noteFontFamily} onChange={(e) => setNoteFontFamily(e.target.value)} className="rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  {["Paragraph","Arial","Times New Roman","Courier New","Georgia"].map((f) => <option key={f}>{f}</option>)}
                </select>
                {["B","I","🔗","⬛","❝","▶"].map((fmt) => (
                  <button key={fmt} className="flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs font-bold hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark">{fmt}</button>
                ))}
                {["•","1.","←","→"].map((fmt) => (
                  <button key={fmt} className="flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark">{fmt}</button>
                ))}
              </div>
              <textarea
                rows={8}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type your note here..."
                style={{ fontFamily: noteFontFamily }}
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
              {/* Created By */}
              <div className="mt-3 rounded border border-orange-300 p-4">
                <p className="text-xs text-gray-500">Created by</p>
                <p className="text-sm font-semibold text-dark dark:text-white">Name : SANKARANARAYANAN</p>
                <p className="text-xs text-gray-500">Designation : SUPERINTENDENT</p>
                <p className="text-xs text-gray-500">Date: 12-03-2026</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => { setNoteText(""); setShowNote(false); }} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
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
