"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Read-only field ── */
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

/* ── Static record ── */
const RECORD = {
  horo:           "HO",
  entityTypeCode: "HO",
  entityTypeName: "Head Office",
  entityCode:     "HO001",
  entityName:     "Head Office",
  deptCode:       "ADMIN",
  deptName:       "Administration",
  attDate:        "01-Mar-2026",
};

const STMT_ROWS = [
  { pf: "PF001234", name: "SADIQUE ALI S",   date: "01-Mar-2026", inTime: "09:00", outTime: "18:00", workDur: "09:00", ot: "00:00", total: "09:00", attType: "Present", shiftType: "General" },
  { pf: "PF001235", name: "VIJAYAKUMAR V.R", date: "01-Mar-2026", inTime: "09:05", outTime: "18:10", workDur: "09:05", ot: "00:10", total: "09:15", attType: "Present", shiftType: "General" },
  { pf: "PF001236", name: "RAVI A P",        date: "01-Mar-2026", inTime: "09:00", outTime: "18:00", workDur: "09:00", ot: "00:00", total: "09:00", attType: "Present", shiftType: "General" },
  { pf: "PF001237", name: "VAIRAMUTHU R",    date: "01-Mar-2026", inTime: "08:55", outTime: "18:05", workDur: "09:10", ot: "00:05", total: "09:15", attType: "Present", shiftType: "General" },
  { pf: "PF001238", name: "MANGALAM K",      date: "01-Mar-2026", inTime: "—",     outTime: "—",     workDur: "—",     ot: "—",     total: "—",     attType: "Absent",  shiftType: "General" },
  { pf: "PF001239", name: "ANITHA G",        date: "01-Mar-2026", inTime: "09:00", outTime: "18:00", workDur: "09:00", ot: "00:00", total: "09:00", attType: "Present", shiftType: "General" },
];

interface NoteItem { title: string; content: string; date: string; author: string; initials: string }
const NOTES: NoteItem[] = [
  { title: "Attendance Note", content: "Manual attendance submitted for Admin department on 01-Mar-2026.", date: "01 Mar 2026", author: "Admin Officer", initials: "AO" },
];

export default function ViewManualAttendancePage() {
  const router = useRouter();
  const [showNote,   setShowNote]   = useState(false);
  const [activeNote, setActiveNote] = useState(0);

  const thCls = "border-r border-[#3aa88f] px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0 whitespace-nowrap";

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Manual Attendance</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Attendance</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Manual Attendance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] px-5 py-2.5" style={{ background: "#17a2b8" }}>
          <h3 className="text-sm font-semibold text-white">View Manual Attendance</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO + Entity Type Code + Entity Type Name + Entity Code */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 border-b border-stroke dark:border-dark-3 pb-1">
            <VF label="HO / RO"          value={RECORD.horo} />
            <VF label="Entity Type Code" value={RECORD.entityTypeCode} />
            <VF label="Entity Type Name" value={RECORD.entityTypeName} />
            <VF label="Entity Code"      value={RECORD.entityCode} />
          </div>
          {/* Row 2: Entity Name + Department Code + Department Name + Attendance Date */}
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-4 pt-1">
            <VF label="Entity Name"     value={RECORD.entityName} />
            <VF label="Department Code" value={RECORD.deptCode} />
            <VF label="Department Name" value={RECORD.deptName} />
            <VF label="Attendance Date" value={RECORD.attDate} />
          </div>

          {/* ── Manual Attendance Statement ── */}
          <SubHeader title="Manual Attendance Statement" />
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b]">
                  <th className={thCls + " w-10"}>#</th>
                  <th className={thCls}>PF Number</th>
                  <th className={thCls}>Employee Name</th>
                  <th className={thCls}>Date</th>
                  <th className={thCls}>In-Time</th>
                  <th className={thCls}>Out-Time</th>
                  <th className={thCls}>Work Duration</th>
                  <th className={thCls}>Over Time</th>
                  <th className={thCls}>Total Duration</th>
                  <th className={thCls}>Attendance Type</th>
                  <th className={thCls}>Shift Type</th>
                </tr>
              </thead>
              <tbody>
                {STMT_ROWS.map((row, idx) => (
                  <tr key={idx} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}`}>
                    <td className="px-3 py-2 text-center text-xs text-gray-500">{idx + 1}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.pf}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.name}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.date}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.inTime}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.outTime}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.workDur}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.ot}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.total}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.attType}</td>
                    <td className="px-3 py-2 text-xs text-dark dark:text-white">{row.shiftType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Bottom actions ── */}
          <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/personnel/human-resource/attendance/manual-attendance/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ── View Note Modal ── */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl mx-4 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] px-5 py-3" style={{ background: "#17a2b8" }}>
              <h4 className="text-sm font-semibold text-white">View Note</h4>
              <button onClick={() => setShowNote(false)} className="text-white hover:opacity-70 text-xl leading-none">×</button>
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
                <button onClick={() => setShowNote(false)}
                  className="rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
