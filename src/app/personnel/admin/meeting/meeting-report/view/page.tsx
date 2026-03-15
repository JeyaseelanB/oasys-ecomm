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
  startTime: "10:00", endTime: "14:00", totalAttendees: "0",
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

interface NoteItem { title: string; content: string; date: string; author: string; initials: string }

const NOTES: NoteItem[] = [
  { title: "Meeting Report Note", content: "Meeting report submitted for approval.", date: "21 Oct 2020", author: "Admin Officer", initials: "AO" },
];

export default function ViewMeetingReportPage() {
  const router = useRouter();
  const downloadRef = useRef<HTMLInputElement>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [activeNote,    setActiveNote]    = useState(0);
  const [downloadDoc,   setDownloadDoc]   = useState("");

  const thCls = "border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Meeting Report</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Meeting</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Meeting Report</li>
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

          {/* ── Attendees ── */}
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
                  <th className={thCls}>Status</th>
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
                    <td className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">Not Present</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Download Document ── */}
          <div className="mt-5">
            <p className="mb-1 text-xs font-medium text-dark dark:text-white">
              Download Document <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center gap-3">
              <input type="text" value={downloadDoc} onChange={e => setDownloadDoc(e.target.value)}
                className="w-48 rounded border border-stroke bg-transparent px-3 py-1.5 text-sm text-dark outline-none dark:border-dark-3 dark:text-white" />
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.11"/></svg>
                Download
              </button>
            </div>
          </div>

          {/* ── Bottom actions ── */}
          <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowNoteModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                View Note
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90" title="Message">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
            <button onClick={() => router.push("/personnel/admin/meeting/meeting-report/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl mx-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] px-5 py-3" style={{ background: "#17a2b8" }}>
              <h4 className="text-sm font-semibold text-white">View Note</h4>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-70 text-xl leading-none">×</button>
            </div>
            <div className="p-5">
              {NOTES.length === 0 ? (
                <p className="py-4 text-center text-sm text-gray-400">No notes available.</p>
              ) : (
                <>
                  <h5 className="text-sm font-semibold text-dark dark:text-white">{NOTES[activeNote].title}</h5>
                  <p className="mt-0.5 mb-3 text-xs text-gray-400">{NOTES[activeNote].date}</p>
                  <p className="text-sm leading-relaxed text-dark dark:text-white">{NOTES[activeNote].content}</p>
                  <div className="mt-4 rounded border-2 border-[#fd7e14] bg-orange-50 p-3 dark:bg-gray-800">
                    <p className="mb-1 text-xs font-semibold text-[#fd7e14]">Created By</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fd7e14] text-xs font-bold text-white">
                        {NOTES[activeNote].initials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-dark dark:text-white">{NOTES[activeNote].author}</p>
                        <p className="text-xs text-gray-400">{NOTES[activeNote].date}</p>
                      </div>
                    </div>
                  </div>
                  {NOTES.length > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
                      {NOTES.map((_, i) => (
                        <button key={i} onClick={() => setActiveNote(i)}
                          className="h-2.5 w-2.5 rounded-full transition-colors"
                          style={{ background: i === activeNote ? "#17a2b8" : "#d1d5db" }} />
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="mt-4 flex justify-end border-t border-stroke pt-3 dark:border-dark-3">
                <button onClick={() => setShowNoteModal(false)}
                  className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
