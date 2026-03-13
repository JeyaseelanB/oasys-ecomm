"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* Read-only field */
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

interface NoteItem { title: string; content: string; date: string; author: string; initials: string }

const RECORD = {
  referenceNumber:  "M111297",
  meetingType:      "INTERNAL",
  venue:            "Chennai",
  requestedDate:    "27-Feb-2026",
  agendaOfMeeting:  "Testing",
  meetingDate:      "28-Feb-2026",
  startTime:        "03:00",
  endTime:          "04:00",
  totalAttendees:   "6",
  additionalReqs:   "Testing Meeting Request",
  agendaPoints:     "Testing Agenda",
};

const INTERNAL_ATTENDEES = [
  { id: 1, name: "SADIQUE ALI S",   designation: "ART DESIGNER",              department: "TECHNICAL", section: "Product Development" },
  { id: 2, name: "VIJAYAKUMAR V.R", designation: "DEPUTY MANAGER(D&P)",       department: "TECHNICAL", section: "Procurement" },
  { id: 3, name: "RAVI A P",        designation: "GENERAL MANAGER (MARKETING)",department: "TECHNICAL", section: "Contract" },
  { id: 4, name: "VAIRAMUTHU R",    designation: "PRODUCTION SUPERVISOR",      department: "TECHNICAL", section: "Procurement" },
  { id: 5, name: "MANGALAM K",      designation: "",                           department: "TECHNICAL", section: "Product Development" },
  { id: 6, name: "ANITHA G",        designation: "MANAGER P AND D",            department: "TECHNICAL", section: "Procurement" },
];

const EXTERNAL_ATTENDEES: { id: number; name: string; org: string; mobile: string; email: string }[] = [];

const NOTES: NoteItem[] = [
  { title: "Meeting Setup Note", content: "Meeting request submitted and forwarded for approval.", date: "27 Feb 2026", author: "Admin Officer", initials: "AO" },
];

export default function ViewMeetingRequestPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [activeNote,    setActiveNote]    = useState(0);

  const thCls = "border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0";

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Meeting Request</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Meeting</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Meeting Request</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">View Meeting Request</h3>
        </div>

        <div className="p-5">
          {/* Row 1: 4 fields */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 border-b border-stroke dark:border-dark-3 pb-1">
            <VF label="Reference Number"  value={RECORD.referenceNumber} />
            <VF label="Meeting Type"      value={RECORD.meetingType} />
            <VF label="Venue"             value={RECORD.venue} />
            <VF label="Requested Date"    value={RECORD.requestedDate} />
          </div>
          {/* Row 2: 4 fields */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 border-b border-stroke dark:border-dark-3 pb-1 pt-1">
            <VF label="Agenda of the Meeting" value={RECORD.agendaOfMeeting} />
            <VF label="Meeting Date"          value={RECORD.meetingDate} />
            <VF label="Meeting Start Time"    value={RECORD.startTime} />
            <VF label="Meeting End Time"      value={RECORD.endTime} />
          </div>
          {/* Row 3: Total Attendees */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 border-b border-stroke dark:border-dark-3 pb-1 pt-1">
            <VF label="Total Attendees" value={RECORD.totalAttendees} />
          </div>
          {/* Row 4: Additional Reqs + Agenda Points */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 pt-1">
            <VF label="Additional Requirements" value={RECORD.additionalReqs} />
            <VF label="Agenda Points"           value={RECORD.agendaPoints} />
          </div>

          {/* ── Internal Attendees ── */}
          <SubHeader title="Internal Attendees" />
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className={thCls + " w-10"}>#</th>
                  <th className={thCls}>Name</th>
                  <th className={thCls}>Designation</th>
                  <th className={thCls}>Department</th>
                  <th className={thCls}>Section</th>
                </tr>
              </thead>
              <tbody>
                {INTERNAL_ATTENDEES.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.name}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.designation}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.department}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── External Attendees ── */}
          <SubHeader title="External Attendees" />
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className={thCls + " w-10"}>#</th>
                  <th className={thCls}>Name</th>
                  <th className={thCls}>Organization Name</th>
                  <th className={thCls}>Mobile Number</th>
                  <th className={thCls}>Email ID</th>
                </tr>
              </thead>
              <tbody>
                {EXTERNAL_ATTENDEES.length === 0 ? (
                  <tr className="bg-white dark:bg-gray-dark">
                    <td colSpan={5} className="px-3 py-4 text-xs text-gray-400">No records found.</td>
                  </tr>
                ) : EXTERNAL_ATTENDEES.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.name}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.org}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.mobile}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <button onClick={() => router.push("/personnel/admin/meeting/meeting-request/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ── View Note Modal ── */}
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
