"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const VF = ({ label, value }: { label: string; value: string }) => (
  <div className="py-2">
    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-0.5 text-sm font-medium text-[#17a2b8]">{value || "—"}</p>
  </div>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const SubHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-5">
    <GridIcon />
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

const MEETING = {
  referenceNumber: "M111287", meetingType: "INTERNAL", department: "ADMIN", section: "",
  venue: "CONFERENCEHALL", agenda: "6th Board Meeting", meetingDate: "20-Oct-2020",
  startTime: "10:00", endTime: "14:00", totalAttendees: "46",
};

const ATTENDEES_DATA = [
  { id: 1,  name: "RAJESH KUMAR N",       designation: "SUPERINTENDENT",                    dept: "ADMIN", section: "EDP",                  type: "INTERNAL" },
  { id: 2,  name: "MYTHILI RAJENDRAN",     designation: "MANAGING DIRECTOR",                 dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 3,  name: "TINAKUMARI P",          designation: "GENERAL MANAGER (ADMIN)",           dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 4,  name: "SHAKILA K",             designation: "JUNIOR ASSISTANT",                  dept: "ADMIN", section: "Accounts",              type: "INTERNAL" },
  { id: 5,  name: "SAMINATHAN S",          designation: "ASSISTANT GENERAL MANAGER ACCOUNTS",dept: "ADMIN", section: "Accounts",              type: "INTERNAL" },
  { id: 6,  name: "AHEMED BASHA R",        designation: "ATTENDER(SG)",                      dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 7,  name: "SHANTHI K",             designation: "SUPERINTENDENT",                    dept: "ADMIN", section: "Marketing",             type: "INTERNAL" },
  { id: 8,  name: "PASKALANJALA L",        designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Society payment",       type: "INTERNAL" },
  { id: 9,  name: "NAGARAJAN C",           designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Credit Sales",          type: "INTERNAL" },
  { id: 10, name: "THANGARAJ L",           designation: "ATTENDER",                          dept: "ADMIN", section: "Tapal",                 type: "INTERNAL" },
  { id: 11, name: "RAVI B",                designation: "ASST GENERAL MANAGER(AUDIT)",       dept: "ADMIN", section: "Internal Audit Wing",   type: "INTERNAL" },
  { id: 12, name: "LAKSHMI PRABHA RJ",     designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 13, name: "SARAVANAN D",           designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Public Relation",       type: "INTERNAL" },
  { id: 14, name: "LOORTHU MARY S",        designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Marketing",             type: "INTERNAL" },
  { id: 15, name: "ROHINI N",              designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Marketing",             type: "INTERNAL" },
  { id: 16, name: "JEEVA S",               designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Accounts",              type: "INTERNAL" },
  { id: 17, name: "USHA M",                designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Accounts",              type: "INTERNAL" },
  { id: 18, name: "KATHIRESAN D",          designation: "DRIVER (SG)",                       dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 19, name: "SAKTHIVEL D",           designation: "JUNIOR ASSISTANT",                  dept: "ADMIN", section: "Internal Audit Wing",   type: "INTERNAL" },
  { id: 20, name: "VIJAYAKUMAR J",         designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Society payment",       type: "INTERNAL" },
  { id: 21, name: "RAJ MOHAN R",           designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "MD Chamber",            type: "INTERNAL" },
  { id: 22, name: "RAJESWARI G",           designation: "SENIOR ASSISTANT SG",               dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 23, name: "ANURADHA S",            designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Contract",              type: "INTERNAL" },
  { id: 24, name: "BHUVANA P",             designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "SILK AND COTTON",       type: "INTERNAL" },
  { id: 25, name: "BALU N",                designation: "DRIVER",                            dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 26, name: "CAUVERI D",             designation: "JUNIOR ASSISTANT",                  dept: "ADMIN", section: "Banking",               type: "INTERNAL" },
  { id: 27, name: "GOVINDAN S",            designation: "JUNIOR ASSISTANT",                  dept: "ADMIN", section: "UNIFORMS AND SCHEMES",  type: "INTERNAL" },
  { id: 28, name: "LAVANYA M",             designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 29, name: "MARISAMY R",            designation: "TECHNICAL ASSISTANT (CIVIL)",       dept: "ADMIN", section: "Building",              type: "INTERNAL" },
  { id: 30, name: "ARUNA DEVI R",          designation: "SENIOR ASSISTANT SG",               dept: "ADMIN", section: "Tapal",                 type: "INTERNAL" },
  { id: 31, name: "KALIAPERUMAL T",        designation: "DRIVER (Spl.Gr)",                   dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 32, name: "SATHIYA PRIYA C",       designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Building",              type: "INTERNAL" },
  { id: 33, name: "JEGAN T",               designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 34, name: "GOVINDASAMY N",         designation: "SCAVENGER",                         dept: "ADMIN", section: "Building",              type: "INTERNAL" },
  { id: 35, name: "BALAJI L",              designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Banking",               type: "INTERNAL" },
  { id: 36, name: "VELMURUGAN S",          designation: "ATTENDER(SG)",                      dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 37, name: "KANDANSAMY SS",         designation: "DEPUTY GENERAL MANAGER BUILDINGS",  dept: "ADMIN", section: "Building",              type: "INTERNAL" },
  { id: 38, name: "NIRMALA M",             designation: "ASSISTANT GENERAL MANAGER (SPS)",   dept: "ADMIN", section: "Society payment",       type: "INTERNAL" },
  { id: 39, name: "ALOK BABELAY",          designation: "CHIEF GENERAL MANAGER",             dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 40, name: "KUMARESAN R",           designation: "ASSISTANT GENERAL MANAGER (ADMIN)", dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 41, name: "RAMAKRISHNAN M",        designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Banking",               type: "INTERNAL" },
  { id: 42, name: "JOHNSON C",             designation: "JUNIOR ASSISTANT",                  dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 43, name: "MANGALAM K",            designation: "JUNIOR ASSISTANT",                  dept: "ADMIN", section: "EDP",                   type: "INTERNAL" },
  { id: 44, name: "KANNIAPPAN M",          designation: "DRIVER (Spl.Gr)",                   dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 45, name: "NAVANEETHA KRISHNAN S", designation: "ATTENDER",                          dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
  { id: 46, name: "BHAVANI S",             designation: "SENIOR ASSISTANT",                  dept: "ADMIN", section: "Admin",                 type: "INTERNAL" },
];

interface ExtRow { id: number; name: string; org: string; mobile: string; email: string }

export default function EditMeetingReportPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [attendance,  setAttendance]  = useState<Record<number, boolean>>(
    Object.fromEntries(ATTENDEES_DATA.map(a => [a.id, true]))
  );
  const [allChecked,  setAllChecked]  = useState(true);

  const [extRows,     setExtRows]     = useState<ExtRow[]>([{ id: 1, name: "", org: "", mobile: "", email: "" }]);
  const [nextExtId,   setNextExtId]   = useState(2);
  const [fileName,    setFileName]    = useState("");

  const toggleAll = (checked: boolean) => {
    setAllChecked(checked);
    setAttendance(Object.fromEntries(ATTENDEES_DATA.map(a => [a.id, checked])));
  };
  const toggleOne = (id: number) => {
    const next = { ...attendance, [id]: !attendance[id] };
    setAttendance(next);
    setAllChecked(ATTENDEES_DATA.every(a => next[a.id]));
  };

  const addExtRow = () => { setExtRows(r => [...r, { id: nextExtId, name: "", org: "", mobile: "", email: "" }]); setNextExtId(n => n + 1); };
  const removeExtRow = (id: number) => setExtRows(r => r.filter(x => x.id !== id));
  const updateExtRow = (id: number, k: keyof ExtRow, v: string) =>
    setExtRows(r => r.map(x => x.id === id ? { ...x, [k]: v } : x));

  const thCls = "border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0";
  const inputCls = "w-full rounded border border-stroke px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-transparent dark:text-white";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Meeting Report</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Meeting</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Meeting Report</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">Meeting Report</h3>
        </div>

        <div className="p-5">
          {/* Meeting info */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 border-b border-stroke dark:border-dark-3 pb-1">
            <VF label="Reference Number"   value={MEETING.referenceNumber} />
            <VF label="Meeting Type"       value={MEETING.meetingType} />
            <VF label="Department"         value={MEETING.department} />
            <VF label="Section"            value={MEETING.section} />
          </div>
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 border-b border-stroke dark:border-dark-3 pb-1 pt-1">
            <VF label="Venue"                value={MEETING.venue} />
            <VF label="Agenda of the Meeting" value={MEETING.agenda} />
            <VF label="Meeting Date"         value={MEETING.meetingDate} />
            <VF label="Meeting Start Time"   value={MEETING.startTime} />
          </div>
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 pt-1">
            <VF label="Meeting End Time" value={MEETING.endTime} />
            <VF label="Total Attendees"  value={MEETING.totalAttendees} />
          </div>

          {/* Attendees — edit has Action column + Attendance */}
          <SubHeader title="Attendees" />
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className={thCls + " w-10"}>#</th>
                  <th className={thCls}>Name</th>
                  <th className={thCls}>Designation</th>
                  <th className={thCls}>Department</th>
                  <th className={thCls}>Section</th>
                  <th className={thCls}>Type</th>
                  <th className={thCls + " w-16 text-center"}>Action</th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-white w-24">
                    Attendance
                    <input type="checkbox" checked={allChecked} onChange={e => toggleAll(e.target.checked)}
                      className="ml-1 accent-white align-middle" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {ATTENDEES_DATA.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{row.id}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.name}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.designation}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.dept}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.section}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.type}</td>
                    <td className="px-3 py-2 text-center">
                      <button className="flex h-6 w-6 items-center justify-center rounded bg-[#dc3545] text-white hover:opacity-90 mx-auto">
                        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                      </button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input type="checkbox" checked={!!attendance[row.id]} onChange={() => toggleOne(row.id)}
                        className="accent-[#2d8f7b]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Attendees */}
          <SubHeader title="Add Attendees" />
          <div className="flex flex-wrap items-end gap-3 mb-3">
            <div className="min-w-[200px]">
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Designation</p>
              <div className="flex items-stretch rounded border border-stroke overflow-hidden dark:border-dark-3">
                <span className="flex min-w-[34px] items-center justify-center bg-gray-100 border-r border-stroke text-gray-500 dark:bg-gray-700 dark:border-dark-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <select className="flex-1 px-3 py-1.5 text-sm text-dark bg-white outline-none dark:bg-gray-dark dark:text-white">
                  <option>(0) Selected</option>
                </select>
              </div>
            </div>
            <div className="min-w-[200px]">
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Employee</p>
              <div className="flex items-stretch rounded border border-stroke overflow-hidden dark:border-dark-3">
                <span className="flex min-w-[34px] items-center justify-center bg-gray-100 border-r border-stroke text-gray-500 dark:bg-gray-700 dark:border-dark-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <select className="flex-1 px-3 py-1.5 text-sm text-dark bg-white outline-none dark:bg-gray-dark dark:text-white">
                  <option>(0) Selected</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 mb-0.5">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
          </div>
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className={thCls + " w-10"}>#</th>
                  <th className={thCls}>Employee Name</th>
                  <th className={thCls}>Designation</th>
                  <th className={thCls}>Department</th>
                  <th className={thCls}>Section</th>
                  <th className={thCls + " w-20 text-center"}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-dark">
                  <td colSpan={6} className="px-3 py-4 text-xs text-gray-400">No records found</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* External */}
          <SubHeader title="External" />
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className={thCls + " w-10"}>#</th>
                  <th className={thCls}>Name</th>
                  <th className={thCls}>Organization Name</th>
                  <th className={thCls}>Mobile Number</th>
                  <th className={thCls}>Email ID</th>
                  <th className={thCls + " w-20 text-center"}>Action</th>
                </tr>
              </thead>
              <tbody>
                {extRows.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{idx + 1}</td>
                    <td className="px-2 py-1.5"><input value={row.name} onChange={e => updateExtRow(row.id, "name", e.target.value)} className={inputCls} /></td>
                    <td className="px-2 py-1.5"><input value={row.org} onChange={e => updateExtRow(row.id, "org", e.target.value)} className={inputCls} /></td>
                    <td className="px-2 py-1.5"><input value={row.mobile} onChange={e => updateExtRow(row.id, "mobile", e.target.value)} className={inputCls} /></td>
                    <td className="px-2 py-1.5"><input value={row.email} onChange={e => updateExtRow(row.id, "email", e.target.value)} className={inputCls} /></td>
                    <td className="px-2 py-1.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="flex h-6 w-6 items-center justify-center rounded bg-[#28a745] text-white hover:opacity-90">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button onClick={() => removeExtRow(row.id)}
                          className="flex h-6 w-6 items-center justify-center rounded bg-[#dc3545] text-white hover:opacity-90">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={addExtRow} className="mt-2 text-xs text-[#17a2b8] hover:underline">+ Add Row</button>

          {/* Minutes Upload */}
          <div className="mt-5">
            <p className="mb-1 text-xs font-medium text-dark dark:text-white">Minutes Upload <span className="text-red-500">*</span></p>
            <div className="flex items-center gap-3">
              <input type="text" value={fileName} readOnly
                className="w-48 rounded border border-stroke bg-gray-50 px-3 py-1.5 text-sm text-dark outline-none dark:border-dark-3 dark:bg-gray-700 dark:text-white cursor-pointer"
                onClick={() => fileRef.current?.click()} />
              <input type="file" ref={fileRef} className="hidden" onChange={e => setFileName(e.target.files?.[0]?.name ?? "")} />
              <button onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                Upload
              </button>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="mt-5 flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/admin/meeting/meeting-report/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
