"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RECORD = {
  refNo:          "CIR/2024/001",
  type:           "Circular",
  circularFor:    "All Staff",
  hoRo:           "Head Office",
  entityTypeCode: "HO",
  entityCode:     "Head Office",
  department:     "ADMIN",
  section:        "Admin",
  status:         "INITIATED",
  subject:        "Annual Policy Update – All Staff",
  description:    "This circular is to inform all staff members about the upcoming policy changes effective from the new financial year. Please review and acknowledge receipt.",
  uploadFileName: "circular_2024_001.pdf",
  createdDate:    "01-Jan-2024",
  createdBy:      "Admin User",
};

const MEETING = {
  type:        "Board Meeting",
  venue:       "Conference Hall A",
  date:        "15-Jan-2024",
  startTime:   "10:00 AM",
  endTime:     "12:00 PM",
  reminder:    "1 Day Before",
  initiatedBy: "Admin Officer",
  section:     "Admin",
  required:    "Yes",
};

const RECIPIENTS = [
  { id: 1, entityType: "HO", entity: "Head Office",  dept: "ADMIN",   section: "Admin"   },
  { id: 2, entityType: "RO", entity: "Chennai RO",   dept: "FINANCE", section: "Finance" },
];

const NOTES = [
  { id: 1, text: "Please review this circular and provide feedback by end of week.", name: "HR Manager", designation: "Manager", date: "02-Jan-2024" },
];

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="pb-4">
    <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="pt-0.5 text-sm font-medium text-[#2d8f7b] dark:text-[#5bc4a8]">{value || "—"}</p>
  </div>
);

const statusCls = (s: string) =>
  s === "FINAL APPROVED" ? "bg-[#28a745]" :
  s === "SUBMITTED"      ? "bg-[#fd7e14]" : "bg-[#6c757d]";

export default function ViewCircularOfficeOrderPage() {
  const router = useRouter();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote]   = useState<typeof NOTES[0] | null>(null);

  const openNote = (note: typeof NOTES[0]) => { setSelectedNote(note); setShowNoteModal(true); };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Circular / Office Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Circular / Office Order</li>
          </ol>
        </nav>
      </div>

      <div className="space-y-5">
        {/* Main Details */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Circular / Office Order Details</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              <Field label="Reference Number"      value={RECORD.refNo} />
              <Field label="Type"                  value={RECORD.type} />
              <Field label="Circular / Order For"  value={RECORD.circularFor} />
              <Field label="H.O / R.O"             value={RECORD.hoRo} />
            </div>
            <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              <Field label="Entity Type Code / Name" value={RECORD.entityTypeCode} />
              <Field label="Entity Code / Name"      value={RECORD.entityCode} />
              <Field label="Department"              value={RECORD.department} />
              <Field label="Section"                 value={RECORD.section} />
            </div>
            <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              <div className="pb-4">
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Status</p>
                <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${statusCls(RECORD.status)}`}>{RECORD.status}</span>
              </div>
              <Field label="Created Date" value={RECORD.createdDate} />
              <Field label="Created By"   value={RECORD.createdBy} />
            </div>

            {/* Recipients */}
            <div className="mb-4">
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Recipients</p>
              <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
                <table className="w-full text-xs">
                  <thead className="bg-[#2d8f7b] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">#</th>
                      <th className="px-3 py-2 text-left">Entity Type</th>
                      <th className="px-3 py-2 text-left">Entity</th>
                      <th className="px-3 py-2 text-left">Department</th>
                      <th className="px-3 py-2 text-left">Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECIPIENTS.map((r, i) => (
                      <tr key={r.id} className={i%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}>
                        <td className="px-3 py-1.5 text-gray-500">{i+1}</td>
                        <td className="px-3 py-1.5 text-dark dark:text-white">{r.entityType}</td>
                        <td className="px-3 py-1.5 text-dark dark:text-white">{r.entity}</td>
                        <td className="px-3 py-1.5 text-dark dark:text-white">{r.dept}</td>
                        <td className="px-3 py-1.5 text-dark dark:text-white">{r.section}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Meeting Details</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              <Field label="Type of Meeting" value={MEETING.type} />
              <Field label="Venue"           value={MEETING.venue} />
              <Field label="Date"            value={MEETING.date} />
              <Field label="Start Time"      value={MEETING.startTime} />
            </div>
            <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              <Field label="End Time"        value={MEETING.endTime} />
              <Field label="Reminder by Mail" value={MEETING.reminder} />
              <Field label="Initiated By"    value={MEETING.initiatedBy} />
              <Field label="Section"         value={MEETING.section} />
            </div>
            <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              <Field label="Meeting Required" value={MEETING.required} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Content</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
              <div className="pb-4">
                <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Uploaded Document</p>
                <div className="flex items-center gap-2">
                  <a href="#" className="text-sm font-medium text-[#17a2b8] underline">{RECORD.uploadFileName}</a>
                  <button className="flex items-center gap-1 rounded bg-[#17a2b8] px-2 py-0.5 text-[10px] font-medium text-white hover:opacity-90">
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download
                  </button>
                </div>
              </div>
              <Field label="Subject" value={RECORD.subject} />
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Description</p>
              <div className="rounded border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800 opacity-60 pointer-events-none">
                  {["B","I","U","abc","x₂","x²","T↑","H1","T↓","↩","↪","≡","≡","🔗","✂","🖨"].map((t,i)=>(
                    <span key={i} className="rounded px-1.5 py-0.5 text-xs font-medium text-gray-500">{t}</span>
                  ))}
                </div>
                <div className="min-h-[120px] px-3 py-2 text-sm text-dark dark:text-white">
                  {RECORD.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {NOTES.length > 0 && (
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Notes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-dark dark:text-white">#</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-dark dark:text-white">Note</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-dark dark:text-white">Created By</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-dark dark:text-white">Date</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-dark dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {NOTES.map((note, i) => (
                    <tr key={note.id} className={`border-b border-stroke dark:border-dark-3 ${i%2===0?"bg-white dark:bg-gray-dark":"bg-gray-50 dark:bg-gray-800"}`}>
                      <td className="px-3 py-2 text-gray-500">{i+1}</td>
                      <td className="px-3 py-2 text-dark dark:text-white max-w-[300px] truncate">{note.text}</td>
                      <td className="px-3 py-2 text-dark dark:text-white">{note.name}</td>
                      <td className="px-3 py-2 text-dark dark:text-white">{note.date}</td>
                      <td className="px-3 py-2 text-center">
                        <button onClick={() => openNote(note)}
                          className="flex items-center gap-1 rounded bg-[#2d8f7b] px-2 py-0.5 text-[10px] font-medium text-white hover:opacity-90 mx-auto">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          View Note
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="flex justify-end">
          <button onClick={() => router.push("/personnel/admin/circular-office-order/list")}
            className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showNoteModal && selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[480px] max-w-[95vw] rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="rounded border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-800 opacity-60 pointer-events-none">
                  {["B","I","U","S","↩","↪"].map((t,i)=>(
                    <span key={i} className="rounded px-1.5 py-0.5 text-xs font-medium text-gray-500">{t}</span>
                  ))}
                </div>
                <div className="min-h-[100px] px-3 py-2 text-sm text-dark dark:text-white">
                  {selectedNote.text}
                </div>
              </div>
              <div className="rounded border border-stroke bg-gray-50 p-3 dark:border-dark-3 dark:bg-gray-800">
                <p className="text-xs font-semibold text-dark dark:text-white">Created By</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div><p className="text-gray-500">Name</p><p className="font-medium text-dark dark:text-white">{selectedNote.name}</p></div>
                  <div><p className="text-gray-500">Designation</p><p className="font-medium text-dark dark:text-white">{selectedNote.designation}</p></div>
                  <div><p className="text-gray-500">Date</p><p className="font-medium text-dark dark:text-white">{selectedNote.date}</p></div>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setShowNoteModal(false)}
                  className="rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
